const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const productPRouter = require("./productPRouter");
const typeRouter = require("./typeRouter");
const categoryRouter = require("./categoryRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/product_p", productPRouter);

module.exports = router;
