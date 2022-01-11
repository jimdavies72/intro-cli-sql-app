const { Sequelize, DataTypes, Op } = require("sequelize");

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

    // (build then save) Create then save in 2 steps
    // const stuffy_doll = Card.build({
    //   name: "Stuffy Doll",
    //   cost: 5,
    //   description: "Indestructible",
    // });

    // await stuffy_doll.save();

    // Create then save in 1 step
    // await Card.create({
    //   name: "Meteor Golumn",
    //   cost: 7,
    //   description: "Destroys Target",
    // });

    //equivelent to select * FROM Cards
    // add { where: { name: "Stuffy Doll" } } for a where clause...
    // for (let card of await Card.findAll({ where: { name: "Stuffy Doll" } })) {
    //   console.log(`Card: ${card.name} -> ${card.description}`);
    // }

    const results = await Card.findAll({
      attributes: ["name", "description"],
      where: {
        [Op.or]: [{ name: "Stuffy Doll" }, { cost: 7 }],
      },
    });

    for (let card of results) {
      console.log(`Card: ${card.name} -> ${card.description}`);
    }

    console.log("Connection has successfully established");
  } catch (error) {
    console.error("Unable to connect ", error);
  }
  await connection.close();
  process.exit();
};

main();
