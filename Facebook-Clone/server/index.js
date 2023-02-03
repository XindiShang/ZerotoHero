const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

dotenv.config();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to mongo");
}

const app = express();
const port = process.env.PORT || 8800;

app.use("/images", express.static(path.join(__dirname, "public/images")));

// middleware
app.use(express.json());
app.use(helmet({
  // this is to allow cross origin resource sharing, so that the frontend can access the backend
  crossOriginResourcePolicy: {
    policy: "cross-origin"
  }
}));
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
});

const upload = multer({
  storage,
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (err) {
    console.error(err);
  }
})

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`server starts on port ${port}`);
})