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

mongoose.connect("mongodb://localhost:27017/xray_glazzing", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// handle HTTP POST requests
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "frontend/build")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
seedDB();

app.use(formData.parse());
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
// });
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello Xray");
});

app.post("/image-upload", (req, res) => {
  const values = Object.values(req.files);
  const images = [];
  const promises = values.map(image => {
    const fileName =
      Math.floor(Math.random() * 1000000) +
      "_" +
      helper.escapeRegex(image.name);
    fs.readFile(image.path, (err, data) => {
      const newPath = __dirname + "/frontend/public/images/" + fileName;
      fs.writeFile(newPath, data, error => {
        if (error) {
          console.error(error);
          res.end();
        } else {
          images.push(fileName);
          res.send(images);
          //here you can save the file name to db, if needed
        }
      });
    });
  });
});

// app.post("/image-upload", (req, res) => {
//   const images = [];
//   const values = Object.values(req.files);
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
//           res.end(images);
//           //here you can save the file name to db, if needed
//         }
//       });
//     });
//   });

//   Promise.all(promises).then(results => res.json(results));
// });

app.listen(5000, () => {
  console.log("Xray server started at port 5000");
});
