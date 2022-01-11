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
    await Card.sync({ alter: true });

    //Create then save in 2 steps
    // const stuffy_doll = Card.build({
    //   name: "Stuffy Doll",
    //   cost: 5,
    //   description: "Indestructible",
    // });

    // await stuffy_doll.save();

    // Create then save in 1 step
    await Card.create({
      name: "Meteor Golumn",
      cost: 7,
      description: "Destroys Target",
    });

    console.log("Connection has successfully established");
  } catch (error) {
    console.error("Unable to connect ", error);
  }
  await connection.close();
  process.exit();
};

main();
