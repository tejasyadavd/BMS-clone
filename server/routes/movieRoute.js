const express = require("express");
const movieRouter = express.Router();

const {
  addMovie,
  getAllMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

movieRouter.post("/add-Movies", addMovie);
movieRouter.get("/getAll-Movies", getAllMovie);
movieRouter.get("/get-Movie/:id", getMovieById);
movieRouter.put("/update-Movies", updateMovie);
movieRouter.post("/delete-Movies", deleteMovie);

module.exports = movieRouter;
