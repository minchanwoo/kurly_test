import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

import models from "./";

class User extends Model {}

User.init(
  {
    nick: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "user",
    paranoid: true
  }
);

export const relationUser = () => {
  User.hasMany(models.Cart, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  User.hasMany(models.ProductQuestion, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });

  User.hasMany(models.ProductReview, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });

  User.hasMany(models.Point, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });

  User.hasMany(models.Order, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });

  User.hasMany(models.OrderSheet, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
};

export default User;
