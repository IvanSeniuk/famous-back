const Router = require("express");
const router = new Router();
const orderPosterController = require("../controllers/orderPosterController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.post("/", orderPosterController.create);
router.get("/", checkRole("ADMIN" || "USER"), orderPosterController.getAll);
router.get("/:id", checkRole("ADMIN" || "USER"), orderPosterController.getOne);
//router.put("/:id", checkRole("ADMIN"), orderPosterController.update);
//router.delete("/:id", checkRole("ADMIN"), orderPosterController.delete);

module.exports = router;
