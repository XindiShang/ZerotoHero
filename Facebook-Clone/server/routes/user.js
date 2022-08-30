const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// UPDATE USER 
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      });
      res.status(200).json("account has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only update your own account");
  }
});
// DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("account has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only delete your own account");
  }
});
// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {password, createdAt, updatedAt, ...otherUserInfo} = user._doc;
    res.status(200).json(otherUserInfo);
  } catch (err) {
    res.status(500).json(err);
  }
})
// FOLLOW USER 
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("You are now following this user");
      } else {
        return res.status(403).json("You are already following this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
    
  } else {
    res.status(403).json("You can't follow your own account");
  }
})
// UNFOLLOW USER
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        return res.status(403).json("You haven't followed this user yet");
      }
    } catch (err) {
      res.status(500).json(err);
    }
    
  } else {
    res.status(403).json("You can't unfollow your own account");
  }
})

module.exports = router;