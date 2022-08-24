const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const userRoute = require("./routes/users");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.PORT || 4000;

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose
  .connect(process.env.MY_URL, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDb"))
  .catch((e) => console.log(e));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);

app.post("/backend/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(process.env.PORT || port, () => {
  console.log(`Port is listening on port: ${port}`);
});
