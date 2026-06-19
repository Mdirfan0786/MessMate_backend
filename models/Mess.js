const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Mess = sequelize.define(
  "Mess",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1000,
      },
    },

    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    tableName: "messes",
    timestamps: true,
  },
);

module.exports = Mess;
