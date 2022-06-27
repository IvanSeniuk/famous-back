const Router = require("express");
const router = new Router();
const authMiddlewere = require("../middlewere/authMiddlewere");
const userController = require("../controllers/userController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddlewere, userController.check);
router.put("/:id", userController.update);

module.exports = router;
