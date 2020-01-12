import { Model } from "sequelize";
import { sequelize } from "./sequelize";

import models from "./";

class ProductQuestionRead extends Model {}

ProductQuestionRead.init(
  {},
  {
    sequelize,
    modelName: "product_question_read",
    paranoid: true
  }
);

export const relationProductQuestionRead = () => {
  ProductQuestionRead.belongsTo(models.ProductQuestion, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
};

export default ProductQuestionRead;
