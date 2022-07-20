const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const productPRouter = require("./productPRouter");
const typeRouter = require("./typeRouter");
const categoryRouter = require("./categoryRouter");
const aboutRouter = require("./aboutRouter");
const bannerRouter = require("./bannerRouter");
const actionsRouter = require("./actionsRouter");
const productPosterRouter = require("./productPosterRouter");
const orderPosterRouter = require("./orderPosterRouter");
const categoryPosterRouter = require("./categoryPosterRouter");
const contactsRouter = require("./contactsRouter");
const promocodeRouter = require("./promocodeRouter");
const userPosterRouter = require("./userPosterRouter");
const subscriptionRouter = require("./subscriptionRouter");
const creditCardsRouter = require("./creditCardsRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/product_p", productPRouter);
router.use("/about", aboutRouter);
router.use("/banner", bannerRouter);
router.use("/actions", actionsRouter);
router.use("/contacts", contactsRouter);
router.use("/product_poster", productPosterRouter);
router.use("/order", orderPosterRouter);
router.use("/category_poster", categoryPosterRouter);
router.use("/promocode", promocodeRouter);
router.use("/user_poster", userPosterRouter);
router.use("/subscription", subscriptionRouter);
router.use("/credit_cards", creditCardsRouter);

module.exports = router;
