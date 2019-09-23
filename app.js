const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Xray");
});

app.listen(5000, () => {
  console.log("Xray server started at port 5000");
});
