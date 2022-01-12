const { Movie } = require("../models/models");

const createMovie = async (movieObj) => {
  try {
    await Movie.create({
      title: movieObj.title,
      actor: movieObj.actor,
      rating: movieObj.rating,
    });
  } catch (error) {
    console.log(error);
  }
};

const listMovies = async () => {
  try {
    for (let movie of await Movie.findAll()) {
      console.log(
        `Title: ${movie.title} featuring ${movie.actor} : Rated: ${movie.rating}`
      );
    }
  } catch (error) {}
};

const listSingleMovie = async (title) => {
  try {
    for (let movie of await Movie.findAll({ where: { title: title } })) {
      console.log(
        `Title: ${movie.title} featuring ${movie.actor} : Rated: ${movie.rating}`
      );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMovie,
  listMovies,
  listSingleMovie,
};

//module.exports = {
//   createMovie,
//   addMovie,
//   listMovies,
//   updateMovie,
//   deleteMovie,
//   listSingleMovie,
// };
