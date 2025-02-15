const Movie = require("../model/movieModel");

const addMovie = async (req, res) => {
  try {
    console.log("request Body:", req.body);
    const newMovie = new Movie(req.body);
    await newMovie.save();

    res.send({
      success: true,
      message: "New movie added successfully",
      data: newMovie,
    });
  } catch (err) {
    console.log("Error adding movie:", err);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getAllMovie = async (req, res) => {
  try {
    const allMovie = await Movie.find();
    if (!allMovie) {
      res.send({
        success: false,
        message: "Movies not found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "All movies fetched successfully",
        data: allMovie,
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      res.status(200).send({
        success: true,
        message: "Movie fetched successfully",
        data: movie,
      });
    } else {
      res.send({
        success: false,
        message: `Movie not found`,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const updateMovies = await Movie.findByIdAndUpdate(
      req.body.movieId,
      req.body
    );
    if (!updateMovie) {
      console.log("UpdateMovie: ", updateMovies.movieName);
      res.send({
        success: false,
        message: `${updateMovies.movieName} not found`,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Movie updated successfully",
        data: updateMovies,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    console.log("req.body: ", req.body.movieId);
    const deleteMovies = await Movie.findByIdAndDelete(req.body.movieId);

    res.status(200).send({
      success: true,
      message: "Movie deleted successfully",
      data: deleteMovies,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addMovie,
  getAllMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
};
