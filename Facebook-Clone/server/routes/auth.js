const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  

  try {
    // generate new salt for each user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // create new user
    const newUser = await new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword
    })

    // save user to database
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;