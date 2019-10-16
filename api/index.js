const express = require("express");
const router = express.Router();

const productController = require("../controllers/products-controller");
const photoController = require("../controllers/photos-controller");
const drawingController = require("../controllers/drawing-controllers");
const projectController = require("../controllers/projects-controller");
const userController = require("../controllers/user-controller");

router.get("/products", productController.getAllProduct);
router.get("/category/:category", productController.getACategory);
router.get("/products/:productType", productController.getAProduct);
router.post("/products", productController.createAProduct);
router.put("/products/:productType", productController.editAProduct);
router.delete("/products/:id", productController.deleteAProduct);

router.get("/gallery", photoController.getAllPhotos);
router.get("/gallery/:productType", photoController.getPhotos);
router.post("/gallery", photoController.uploadPhotos);
router.put("/gallery/:id", photoController.editAPhoto);
router.delete("/gallery/:id", photoController.deleteAPhoto);

router.get("/drawings", drawingController.getAllDrawings);
router.post("/drawings", drawingController.uploadADrawing);
router.put("/drawings/:id", drawingController.editADrawing);
router.delete("/drawings/:id", drawingController.deleteADrawing);

router.get("/projects", projectController.getAllProjects);
router.get("/:productType/projects", projectController.getProjects);
router.get("/projects/:id", projectController.showAProject);
router.post("/projects", projectController.uploadAProject);
router.put("/projects/:id", projectController.editAProject);
router.delete("/projects/:id", projectController.deleteAProject);

router.post("/users", userController.createAUser);
router.post("/login", userController.userLogin);

module.exports = router;
