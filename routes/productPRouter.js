const Router = require("express");
const router = new Router();
const productPController = require("../controllers/productPController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.post("/", checkRole("ADMIN"), productPController.create);
router.get("/", productPController.getAll);
router.get("/:id", productPController.getOne);
router.put("/:id", checkRole("ADMIN"), productPController.update);
router.delete("/:id", checkRole("ADMIN"), productPController.delete);

module.exports = router;
