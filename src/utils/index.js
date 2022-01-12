const { Movie } = require("../models/models");

const createMovie = async (movieObj) => {
  try {
    await Movie.create({
      title: movieObj.title,
      actor: movieObj.actor,
      rating: movieObj.rating,
    }).then(
      displayInfo(
        `${movieObj.title} was successfully inserted into the database.`
      )
    );
  } catch (error) {
    displayInfo(error.message);
  }
};

const listMovies = async () => {
  try {
    for (let movie of await Movie.findAll()) {
      console.log(
        `Title: ${movie.title}, featuring ${movie.actor} : Rated: ${movie.rating}`
      );
    }
  } catch (error) {
    displayInfo(error.message);
  }
};

const listSingleMovie = async (title) => {
  try {
    for (let movie of await Movie.findAll({ where: { title: title } })) {
      displayInfo(
        `Title: ${movie.title}, featuring ${movie.actor} : Rated: ${movie.rating}`
      );
    }
  } catch (error) {
    displayInfo(error.message);
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
    }).then((results) => {
      if (results[0] > 0) {
        displayInfo(
          `Movie: '${cliArguments.search}' has successfully been updated.`
        );
      } else {
        displayInfo(
          `Movie: '${cliArguments.search}' not found. No records have been updated.`
        );
      }
    });
  } catch (error) {
    displayInfo(error.message);
  }
};

const deleteMovie = async (title) => {
  try {
    await Movie.destroy({
      where: {
        title: title,
      },
    }).then((results) => {
      if (results > 0) {
        displayInfo(`Movie: ${title} has been removed from the database.`);
      } else {
        displayInfo(
          `Movie: ${title} was not found and not removed from the database.`
        );
      }
    });
  } catch (error) {
    displayInfo(error.message);
  }
};

const deleteAllMovies = async () => {
  try {
    // Warning - clears the entire table!!
    await Movie.truncate().then(
      displayInfo("All Movies have been removed from the database.")
    );
  } catch (error) {
    displayInfo(error);
  }
};

const displayInfo = (message, clear = true) => {
  if (clear === true) {
    console.clear();
  }
  console.log(message);
  console.log("\n");
};

module.exports = {
  createMovie,
  listMovies,
  listSingleMovie,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
};
