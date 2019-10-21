import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

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

export default Product;
