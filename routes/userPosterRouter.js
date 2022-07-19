const Router = require("express");
const router = new Router();
const userPosterController = require("../controllers/userPosterController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.get("/", checkRole("ADMIN"), userPosterController.getUsers);

module.exports = router;
