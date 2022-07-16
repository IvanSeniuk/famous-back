const Router = require("express");
const router = new Router();
const categoryPosterController = require("../controllers/categoryPosterController");
//const checkRole = require("../middlewere/checkRoleMiddlewere");

//router.post("/", checkRole("ADMIN"), categoryPosterController.create);
router.get("/", categoryPosterController.getAll);
//router.get("/:id", categoryPosterController.getOne);
//router.put("/:id", checkRole("ADMIN"), categoryPosterController.update);
//router.delete("/:id", checkRole("ADMIN"), categoryPosterController.delete);

module.exports = router;
