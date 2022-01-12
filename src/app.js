require("dotenv").config();
const connection = require("./conn");
const { Movie } = require("./models/models");
const {
  createMovie,
  //   addMovie,
  listMovies,
  listSingleMovie,
  //   updateMovie,
  //   deleteMovie,
} = require("./utils/index.js");
//const { command } = require("yargs");

const app = async () => {
  try {
    await connection.authenticate();
    await Movie.sync({ alter: true });

    // await createMovie({
    //   title: "Alien",
    //   actor: "Sigourney Weaver",
    //   rating: 18,
    // });

    //await listMovies();

    await listSingleMovie("Alien");

    // if (command === "create") {
    //   await createMovie({
    //     title: "Alien",
    //     actor: "Sigourney Weaver",
    //     rating: 18,
    //   });
    // } else if (command === "listMovies") {
    //   await listMovies();
    // }
  } catch (error) {
    console.log(error);
  }

  await connection.close();
  process.exit();
};

app();
