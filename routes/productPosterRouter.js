const Router = require("express");
const router = new Router();
const productPosterController = require("../controllers/productPosterController");
//const checkRole = require("../middlewere/checkRoleMiddlewere");

//router.post("/", checkRole("ADMIN"), productPosterController.create);
router.get("/", productPosterController.getAllPoster);
router.get("/:id", productPosterController.getOne);
//router.put("/:id", checkRole("ADMIN"), productPosterController.update);
//router.delete("/:id", checkRole("ADMIN"), productPosterController.delete);

module.exports = router;
