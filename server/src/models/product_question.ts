import { Model, DataTypes } from "sequelize";

import { sequelize } from "./sequelize";

import models from "./";

class ProductQuestion extends Model {}

ProductQuestion.init(
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "product_question",
    paranoid: true
  }
);

export const relationProductQuestion = () => {
  ProductQuestion.hasMany(models.ProductQuestionRead, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });

  ProductQuestion.belongsTo(models.User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  ProductQuestion.belongsTo(models.Product, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
};

export default ProductQuestion;
