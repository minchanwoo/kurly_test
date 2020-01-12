import { sequelize } from "./sequelize";

import Product, { relationProduct } from "./product";
import User, { relationUser } from "./user";
import Cart, { relationCart } from "./cart";
import ProductQuestion, { relationProductQuestion } from "./product_question";
import ProductQuestionRead, {
  relationProductQuestionRead
} from "./product_question_read";
import ProductReview, { relationProductReview } from "./product_review";
import Point, { relationPoint } from "./point";
import Order, { relationOrder } from "./order";
import OrderSheet, { relationOrderSheet } from "./order_sheet";

export default {
  sequelize,
  Product,
  User,
  Cart,
  ProductQuestion,
  ProductQuestionRead,
  ProductReview,
  Point,
  Order,
  OrderSheet
};

relationUser();
relationProduct();
relationCart();
relationProductQuestion();
relationProductQuestionRead();
relationProductReview();
relationPoint();
relationOrder();
relationOrderSheet();
