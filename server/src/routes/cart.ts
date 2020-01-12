import { Router } from "express";
import Cart from "../models/cart";
import Product from "../models/product";

const router = Router();

router.post("/add", async (req, res) => {
  const { productId, quantity } = req.body;
  const { user = {} } = req.session;
  const { id: userId } = user;

  const cart = await Cart.findOne({ where: { productId, userId } });
  if (cart) {
    await Cart.update(
      { quantity: cart.quantity + quantity },
      { where: { id: cart.id } }
    );
  } else {
    await Cart.create({ productId, userId, quantity });
  }
  res.send({ success: true });
});

router.get("/count", async (req, res) => {
  if (!req.session || !req.session.user) {
    return res.send({ count: 0 });
  }
  const carts = await Cart.findAll({ where: { userId: req.session.user.id } });
  let count = 0;
  carts.forEach((cart: any) => {
    count += cart.quantity;
  });
  res.send({ count });
});

router.get("/my", async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      throw new Error("로그인 후 이용하세요");
    } else {
      const carts = await Cart.findAll({
        where: { userId: req.session.user.id },
        attributes: ["id", "quantity"],
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price", "image_url"]
          }
        ],
        order: [["ID", "DESC"]]
      });
      res.send({ carts });
    }
  } catch (e) {
    res.status(500).send({ errorMessage: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  const result = await Cart.findOne({ where: { userId: user.id } });
  if (!result) {
    return res
      .status(500)
      .send({ errorMessage: "본인의 장바구니상품만 삭제가능합니다." });
  }
  await Cart.destroy({ where: { id } });
  res.send({ success: true });
});

export default router;
