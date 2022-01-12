require("dotenv").config();
const connection = require("./conn");
// const {
//   createMovie,
//   addMovie,
//   listMovies,
//   updateMovie,
//   deleteMovie,
//   listSingleMovie,
//} = require("./utils/index.js");
//const { command } = require("yargs");

const app = async () => {
  try {
    await connection.authenticate();

    await connection.close();
    //await Movie.sync({ alter: true });
    // if (command === "create") {
    //   await createMovie({});
    // }
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

app();
