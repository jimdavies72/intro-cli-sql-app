//require("dotenv").config();
const connection = require("../conn");
const { Sequelize, DataTypes, Op } = require("sequelize");

const Movie = connection.define(
  "Movie",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    actor: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexed: [{ unique: true, fields: ["title"] }],
  }
);

module.exports = { Movie };
