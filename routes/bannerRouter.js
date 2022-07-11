const Router = require("express");
const router = new Router();
const bannerController = require("../controllers/bannerController");
const checkRole = require("../middlewere/checkRoleMiddlewere");

router.post("/", checkRole("ADMIN"), bannerController.create);
router.get("/", bannerController.getBanners);
router.put("/:id", checkRole("ADMIN"), bannerController.update);
router.delete("/:id", checkRole("ADMIN"), bannerController.delete);

module.exports = router;
