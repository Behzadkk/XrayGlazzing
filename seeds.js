const mongoose = require("mongoose");
const Product = require("./models/product");

const data = [
  {
    group: "rooflights",
    subCat: "Fixed",
    description:
      "Laboris in duis id adipisicing nostrud qui reprehenderit non non quis enim fugiat tempor ut."
  },
  {
    group: "rooflights",
    subCat: "electric Rooflights",
    description:
      "Laboris in duis id adipisicing nostrud qui reprehenderit non non quis enim fugiat tempor ut."
  },
  {
    group: "rooflights",
    subCat: "Fixed Rooflights",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  }
];

function seedDB() {
  Product.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed products!");
  });
  data.forEach(function(seed) {
    Product.create(seed, function(err, product) {
      if (err) {
        console.log(err);
      } else {
        console.log("added a product");
      }
    });
  });
}

module.exports = seedDB;
