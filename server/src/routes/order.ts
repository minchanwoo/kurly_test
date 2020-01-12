import { Router } from "express";

import _ from "lodash";

import Order from "../models/order";
import { onlyLoggedIn } from "../middlewares";
import Product from "../models/product";

const router = Router();

router.get("/my", onlyLoggedIn, async (req, res) => {
  const { user } = req.session;

  const orders = await Order.findAll({
    order: [["ID", "DESC"]],
    where: { userId: user.id }
  });

  const productIds = _.flattenDeep(
    orders.map((order: any) =>
      order.item_list.map((item: any) => item.productId)
    )
  ) as any;

  const product = await Product.findAll({ where: { id: productIds } });
  res.send({ orders, product });
});

router.get("/:id", onlyLoggedIn, async (req, res) => {
  const { user } = req.session;

  const order = await Order.findOne({
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

export default router;
