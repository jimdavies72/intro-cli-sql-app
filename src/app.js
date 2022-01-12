require("dotenv").config();
const yargs = require("yargs");
const connection = require("./conn");
const { Movie } = require("./models/models");
const {
  createMovie,
  listMovies,
  listSingleMovie,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
} = require("./utils/index.js");

const command = yargs.argv._[0];

const app = async (args) => {
  try {
    await connection.authenticate();
    await Movie.sync({ alter: true });

    if (command === "create") {
      // npm start -- "create" --title="moviename" --actor="actorname" --rating="18"
      await createMovie({
        title: args.title,
        actor: args.actor,
        rating: args.rating,
      });
    } else if (command === "list") {
      // npm start -- "list"
      await listMovies();
    } else if (command === "single") {
      // npm start -- "single" --title="moviename"
      await listSingleMovie(args.title);
    } else if (command === "update") {
      // npm start -- "update" --search="alien" --title="aliens"
      await updateMovie(args);
    } else if (command === "delete") {
      // npm start -- "delete" --title="moviename"
      await deleteMovie(args.title);
    } else if (command === "deleteall") {
      if (args.confirm === "y") {
        await deleteAllMovies();
      }
    }
  } catch (error) {
    console.log("Unable to connect \n", error);
  }
  await connection.close();
  process.exit();
};

app(yargs.argv);
