const Router = require("express");
const router = new Router();
const restaurantsController = require("../controllers/restaurantsController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.post("/", checkRole("ADMIN"), restaurantsController.create);
router.get("/", restaurantsController.getAll);

module.exports = router;
