import { Router } from "express";

import ProductQuestion from "../models/product_question";
import User from "../models/user";
import ProductQuestionRead from "../models/product_question_read";

const router = Router();

router.get("/", async (req, res) => {
  const { productId } = req.query;

  const result = await ProductQuestion.findAll({
    order: [["ID", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["id", "nick"]
      },
      {
        model: ProductQuestionRead,
        attributes: ["id", "productQuestionId"]
      }
    ],
    where: { productId: Number(productId) }
  });
  result.forEach((question: any) => {
    question.user.nick =
      question.user.nick.slice(0, 1) + "*" + question.user.nick.slice(2);
  });
  res.send({ result });
});

router.post("/create", async (req, res) => {
  const { title, text, productId } = req.body;
  const { user } = req.session;

  if (!user || !user.id) {
    res
      .status(500)
      .send({ errorMessage: "게시글작성은 로그인 후 이용가능합니다." });
    return;
  }
  if (!title) {
    res.status(500).send({ errorMessage: "제목을 입력해주세요" });
    return;
  }
  if (!text) {
    res.status(500).send({ errorMessage: "본문 내용을 입력해주세요" });
    return;
  }
  await ProductQuestion.create({
    title,
    text,
    userId: user.id,
    productId
  });
  res.send({ success: true });
});

router.post("/:productQuestionId/read", async (req, res) => {
  const { productQuestionId } = req.params;
  const result = await ProductQuestionRead.create({
    productQuestionId
  });
  res.send({ result });
});

export default router;
