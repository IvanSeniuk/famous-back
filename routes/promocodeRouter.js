const Router = require("express");
const router = new Router();
const promocodeController = require("../controllers/promocodeController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.post("/", checkRole("ADMIN"), promocodeController.create);
router.get("/", checkRole("ADMIN"), promocodeController.getAll);
router.get("/:promo", promocodeController.getOne);
router.put("/:promo", promocodeController.update);
router.delete("/:id", checkRole("ADMIN"), promocodeController.delete);

module.exports = router;
