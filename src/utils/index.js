const Movie = require("../models/models.js");

const createMovie = async (movieObj) => {
  try {
    await Card.create({
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
    for (let card of await Movie.findAll({ where: { name: "Stuffy Doll" } })) {
      console.log(`Card: ${card.name} -> ${card.description}`);
    }
  } catch (error) {}
};

module.exports = {
  createMovie,
  listMovies,
};

// module.exports = {
//   createMovie,
//   addMovie,
//   listMovies,
//   updateMovie,
//   deleteMovie,
//   listSingleMovie,
// };
