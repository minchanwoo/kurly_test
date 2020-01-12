import { Router } from "express";
import productRouter from "./product";
import userRouter from "./user";
import cartRouter from "./cart";
import productQuestionRouter from "./product_question";
import productReviewRouter from "./product_review";
import pointRouter from "./point";
import orderRouter from "./order";
import orderSheetRouter from "./order_sheet";

const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/carts", cartRouter);
router.use("/product_questions", productQuestionRouter);
router.use("/product_reviews", productReviewRouter);
router.use("/points", pointRouter);
router.use("/orders", orderRouter);
router.use("/order_sheets", orderSheetRouter);

export default router;
