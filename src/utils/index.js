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

const updateMovie = async (cliArguments) => {
  try {
    let update = {};

    cliArguments.title && (update["title"] = cliArguments.title);
    cliArguments.actor && (update["actor"] = cliArguments.actor);
    cliArguments.actor && (update["rating"] = cliArguments.rating);

    await Movie.update(update, {
      where: {
        title: cliArguments.search,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteMovie = async (title) => {
  try {
    await Movie.destroy({
      where: {
        title: title,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteAllMovies = async () => {
  try {
    // Warning - clears the entire table!!
    await Movie.truncate();
  } catch (error) {
    console.log(error);
  }
};

//[Op.or]: [{ name: "Stuffy Doll" }, { name: "Precursor Golem" }],

module.exports = {
  createMovie,
  listMovies,
  listSingleMovie,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
};
