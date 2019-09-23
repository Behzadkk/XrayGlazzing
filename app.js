const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const seedDB = require("./seeds");
const apiRouter = require("./api");

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
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
// });
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello Xray");
});

app.listen(5000, () => {
  console.log("Xray server started at port 5000");
});
