import { Router } from "express";
const router = Router();

import OrderSheet from "../models/order_sheet";
import Product from "../models/product";
import Point from "../models/point";
import { onlyLoggedIn } from "../middlewares";
import Order from "../models/order";

router.post("/", onlyLoggedIn, async (req, res) => {
  const { item_list } = req.body;
  const { user } = req.session;

  const result = await OrderSheet.create({
    item_list,
    userId: user.id
  });

  res.send({ result });
});

router.get("/:id", onlyLoggedIn, async (req, res) => {
  const { user } = req.session;

  const order = await OrderSheet.findOne({
    where: { id: req.params.id, userId: user.id }
  });
  if (!order) {
    res.status(500).send({ errorMessag: "접근에 실패하였습니다." });
    return;
  }
  const productIds = order.item_list.map((item: any) => item.productId);

  const products = await Product.findAll({ where: { id: productIds } });

  res.send({ order, products });
});

router.post("/:id", onlyLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;

  const order = await OrderSheet.findOne({ where: { id, userId: user.id } });

  if (!order) {
    res
      .status(500)
      .send({ errorMessage: "접속에 실패햐였습니다. 다시 시도해주세요" });
  }

  const productIds = order.item_list.map((item: any) => item.productId);

  const products = await Product.findAll({ where: { id: productIds } });

  let price = 0;
  order.item_list.forEach(item => {
    const product = products.find(
      (product: any) => product.id === item.productId
    );
    price += item.quantity * product.price;
  });

  const points = await Point.sum("amount" as any, {
    where: { userId: user.id }
  });

  if (price > points) {
    res.status(500).send({ errorMessage: "잔액이 부족합니다." });
    return;
  }
  await Order.create({ item_list: order.item_list, userId: user.id });

  await Point.create({ userId: user.id, amount: -price });
  res.send({ result: "success" });
});

export default router;
