import { Router } from "express";
import ProductReview from "../models/product_review";
import User from "../models/user";
import Product from "../models/product";
import { onlyLoggedIn } from "../middlewares";

const router = Router();

router.get("/", async (req, res) => {
  const result = await ProductReview.findAll({
    where: { productId: req.query.productId },
    order: [["ID", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["nick"]
      },
      {
        model: Product,
        attributes: ["name"]
      }
    ]
  });
  result.forEach((re: any) => {
    re.user.nick = re.user.nick.slice(0, 1) + "*" + re.user.nick.slice(2);
  });
  res.send({ result });
});

router.post("/create", onlyLoggedIn, async (req, res) => {
  const { title, text, rating, productId } = req.body;

  const result = await ProductReview.create({
    title,
    text,
    rating,
    userId: req.session.user.id,
    productId
  });
  res.send({ result });
});

router.delete("/:id", onlyLoggedIn, async (req, res) => {
  const result = await ProductReview.destroy({
    where: { id: req.params.id, userId: req.session.user.id }
  });
  if (!result) {
    res
      .status(500)
      .send({ errorMessage: "본인이 작성한 글만 삭제가 가능합니다." });
    return;
  }
  res.send({ result });
});

export default router;
