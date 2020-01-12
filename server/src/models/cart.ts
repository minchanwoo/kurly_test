import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

import models from "./";

class Cart extends Model {}

Cart.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "cart",
    paranoid: true
  }
);

export const relationCart = () => {
  Cart.belongsTo(models.User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  Cart.belongsTo(models.Product, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
};

export default Cart;
