const { Sequelize, DataTypes } = require("sequelize");

const connection = new Sequelize("master32", "root", "Password01", {
  host: "localhost",
  dialect: "mysql",
});

const Card = connection.define(
  "Card",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexed: [{ unique: true, fields: ["name"] }],
  }
);

const main = async () => {
  try {
    await connection.authenticate();
    console.log("Connection has successfully established");
  } catch (error) {
    console.error("Unable to connect ", error);
  }
};

main();
