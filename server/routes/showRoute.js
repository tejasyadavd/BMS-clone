const express = require("express");
const showMovieRouter = express.Router();
const {
  addShowMovie,
  updateShowMovie,
  deleteShowMovie,
  getAllShowsByTheater,
  getAllTheatersByMovie,
  getShowById,
} = require("../controllers/showMovieController");

showMovieRouter.post("/add-shows", addShowMovie);
showMovieRouter.put("/update-shows", updateShowMovie);
showMovieRouter.delete("/delete-shows/:showId", deleteShowMovie);
showMovieRouter.get(
  "/getAll-shows-by-theater/:theaterId",
  getAllShowsByTheater
);
showMovieRouter.get(
  "/getAll-theaters-by-movie/:movie/:date",
  getAllTheatersByMovie
);
showMovieRouter.get("/get-show-by-id/:showId", getShowById);

module.exports = showMovieRouter;
