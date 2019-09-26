const mongoose = require("mongoose");
const Product = require("./models/product");

const data = [
  {
    group: "rooflights",
    subCat: "fixed_rooflight",
    description:
      "Laboris in duis id adipisicing nostrud qui reprehenderit non non quis enim fugiat tempor ut."
  },
  {
    group: "rooflights",
    subCat: "electric_rooflight",
    description:
      "Laboris in duis id adipisicing nostrud qui reprehenderit non non quis enim fugiat tempor ut."
  },
  {
    group: "rooflights",
    subCat: "walk_on_glass",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "windows",
    subCat: "aluminium_windows",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "windows",
    subCat: "upvc_windows",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "doors",
    subCat: "aluminium_bifold_doors",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "doors",
    subCat: "aluminium_doors",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "doors",
    subCat: "aluminium_sliding_doors",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "doors",
    subCat: "steel_crittal_doors",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "doors",
    subCat: "upvc_french_doors",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "doors",
    subCat: "upvc_composite_doors",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "other",
    subCat: "shower_screens",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "other",
    subCat: "glass_balustrade",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "other",
    subCat: "shop_fronts",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "other",
    subCat: "glass_partitions",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "other",
    subCat: "spalsh_back",
    description:
      "Mollit duis duis ullamco dolor id. In magna excepteur dolor elit et do id excepteur magna anim sit eiusmod adipisicing cillum. Dolor ullamco officia ad occaecat fugiat ipsum excepteur dolore minim nulla in adipisicing consectetur."
  },
  {
    group: "other",
    subCat: "mirrors",
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
