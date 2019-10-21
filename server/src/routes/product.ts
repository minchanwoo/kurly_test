import { Router } from "express";
import Product from "../models/product";

const router = Router();

router.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.send({ products });
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const products = await Product.findByPk(id);
  res.send({ products });
});

export default router;
