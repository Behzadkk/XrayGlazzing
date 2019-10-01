const express = require("express");
const router = express.Router();

const productController = require("../controllers/products-controller");
const photoController = require("../controllers/photos-controller");
const drawingController = require("../controllers/drawing-controllers");
const projectController = require("../controllers/projects-controller");

router.get("/products", productController.getAllProduct);
router.post("/products", productController.createAProduct);
router.put("/products/:productType", productController.editAProduct);
router.delete("/products/:productType", productController.deleteAProduct);

router.get("/gallery", photoController.getAllPhotos);
router.get("/gallery/:productType", photoController.getPhotos);
router.post("/gallery", photoController.uploadAPhoto);
router.put("/gallery/:id", photoController.editAPhoto);
router.delete("/gallery/:id", photoController.deleteAPhoto);

router.get("/drawings", drawingController.getAllDrawings);
router.post("/drawings", drawingController.uploadADrawing);
router.put("/drawings/:id", drawingController.editADrawing);
router.delete("/drawings/:id", drawingController.deleteADrawing);

router.get("/projects", projectController.getAllProjects);
router.post("/projects", projectController.uploadAProject);
router.put("/projects/:id", projectController.editAProject);
router.delete("/projects/:id", projectController.deleteAProject);

module.exports = router;
