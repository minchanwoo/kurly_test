import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

import models from "./";

class Order extends Model {}

Order.init(
  {
    item_list: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue("item_list"));
      },
      set(val) {
        return this.setDataValue("item_list", JSON.stringify(val));
      }
    }
  },
  {
    sequelize,
    modelName: "order",
    paranoid: true
  }
);

export const relationOrder = () => {
  Order.belongsTo(models.User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
};

export default Order;
