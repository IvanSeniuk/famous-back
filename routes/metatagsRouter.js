const Router = require("express");
const router = new Router();
const metatagsController = require("../controllers/metatagsController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.post("/", checkRole("ADMIN"), metatagsController.create);
router.get("/:id", metatagsController.getOne);

module.exports = router;
