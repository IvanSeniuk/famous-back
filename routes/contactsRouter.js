const Router = require("express");
const router = new Router();
const contactsController = require("../controllers/contactsController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.post("/", checkRole("ADMIN"), contactsController.create);
router.get("/:id", contactsController.getOne);
router.put("/:id", checkRole("ADMIN"), contactsController.update);

module.exports = router;
