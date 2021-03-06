import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

import models from "./";

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "product",
    paranoid: true
  }
);

export const relationProduct = () => {
  Product.hasMany(models.Cart, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });

  Product.hasMany(models.ProductQuestion, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });

  Product.hasMany(models.ProductReview, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
};

export default Product;
