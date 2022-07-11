const Router = require("express");
const router = new Router();
const actionsController = require("../controllers/actionsController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.post("/", checkRole("ADMIN"), actionsController.create);
router.get("/", actionsController.getActions);
router.get("/:id", actionsController.getOne);
router.put("/:id", checkRole("ADMIN"), actionsController.update);
router.delete("/:id", checkRole("ADMIN"), actionsController.delete);

module.exports = router;
