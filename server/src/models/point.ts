import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

import models from "./";

class Point extends Model {}

Point.init(
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "point",
    paranoid: true
  }
);

export const relationPoint = () => {
  Point.belongsTo(models.User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
};

export default Point;
