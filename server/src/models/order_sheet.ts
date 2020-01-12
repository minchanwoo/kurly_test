import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

import models from ".";

class OrderSheet extends Model {}

OrderSheet.init(
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
    modelName: "order_sheet",
    paranoid: true
  }
);

export const relationOrderSheet = () => {
  OrderSheet.belongsTo(models.User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
};

export default OrderSheet;
