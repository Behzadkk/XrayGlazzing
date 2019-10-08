require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const seedDB = require("./seeds");
const apiRouter = require("./api");

const helper = require("./helper/helper");
const formData = require("express-form-data");

var cloudinary = require("cloudinary").v2;
var multer = require("multer");
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });

cloudinary.config({
  cloud_name: "dadhpknsf",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose
  .connect(
    `mongodb+srv://xrayDeveloper:${process.env.MONGODB_PASS_XRAY}@cluster0-afjtw.mongodb.net/Xray_Glazing?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => console.log("connected to mongo server"))
  .catch(err => console.log(err.message));

// mongoose.connect("mongodb://localhost:27017/xray_glazzing", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// });

// handle HTTP POST requests
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
// seedDB();

app.use(formData.parse());
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello Xray");
});

// app.post("/image-upload", (req, res) => {
//   const values = Object.values(req.files);
//   const images = [];
//   const promises = values.map(image => {
//     const fileName =
//       Math.floor(Math.random() * 1000000) +
//       "_" +
//       helper.escapeRegex(image.name);
//     fs.readFile(image.path, (err, data) => {
//       const newPath = __dirname + "/frontend/public/images/" + fileName;
//       fs.writeFile(newPath, data, error => {
//         if (error) {
//           console.error(error);
//           res.end();
//         } else {
//           images.push(fileName);
//           res.send("/images/"+images[0]);
//           //here you can save the file name to db, if needed
//         }
//       });
//     });
//   });
// });

app.post("/image-upload", (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  Promise.all(promises)
    .then(results => results[0].secure_url)
    .then(url => res.json(url));
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Xray server started at port " + port);
});
