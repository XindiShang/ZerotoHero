const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

dotenv.config();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to mongo");
}

const app = express();
const port = process.env.PORT || 8800;

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`server starts on port ${port}`);
})