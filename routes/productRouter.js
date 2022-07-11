const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.post("/", checkRole("ADMIN"), productController.create);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.put("/:id", checkRole("ADMIN"), productController.update);
router.delete("/:id", checkRole("ADMIN"), productController.delete);

module.exports = router;
