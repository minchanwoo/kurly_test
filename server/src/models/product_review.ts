import { Model, DataTypes } from "sequelize";

import { sequelize } from "./sequelize";

import models from "./";

class ProductReview extends Model {}

ProductReview.init(
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "product_review",
    paranoid: true
  }
);

export const relationProductReview = () => {
  ProductReview.belongsTo(models.Product, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });

  ProductReview.belongsTo(models.User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
};

export default ProductReview;
