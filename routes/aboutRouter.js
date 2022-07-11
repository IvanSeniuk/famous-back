const Router = require("express");
const router = new Router();
const aboutController = require("../controllers/aboutController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.post("/", checkRole("ADMIN"), aboutController.create);
router.get("/:id", aboutController.getOne);
router.put("/:id", checkRole("ADMIN"), aboutController.update);

module.exports = router;
