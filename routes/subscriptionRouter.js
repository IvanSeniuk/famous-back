const Router = require("express");
const router = new Router();
const subscriptionController = require("../controllers/subscriptionController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.post("/", subscriptionController.create);
router.get("/", checkRole("ADMIN"), subscriptionController.getAll);

module.exports = router;
