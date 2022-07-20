const Router = require("express");
const router = new Router();
const creditCardsController = require("../controllers/creditCardsController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.post("/", checkRole("ADMIN"), creditCardsController.create);
router.get("/", creditCardsController.getAll);
router.put("/:id", checkRole("ADMIN"), creditCardsController.update);
router.delete("/:id", checkRole("ADMIN"), creditCardsController.delete);

module.exports = router;
