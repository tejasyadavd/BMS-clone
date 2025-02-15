const Show = require("../model/showModel");

const addShowMovie = async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();

    return res.status(200).send({
      success: true,
      data: newShow,
      message: "Show added successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add show",
    });
  }
};

const getAllShowsByTheater = async (req, res) => {
  try {
    const getAllShows = await Show.find({
      theater: req.params.theaterId,
    }).populate("movie");
    res.status(200).send({
      success: true,
      data: getAllShows,
      message: "Fetched shows successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Failed to fetch shows",
    });
  }
};

const getAllTheatersByMovie = async (req, res) => {
  try {
    const { movie, date } = req.params;
    const shows = await Show.find({ movie, date }).populate("theater");

    const uniqueTheaters = [];
    shows.forEach((show) => {
      const isTheater = uniqueTheaters.find(
        (theater) => theater._id.toString() === show.theater._id.toString()
      );
      if (!isTheater) {
        const showOfThisTheater = shows.filter(
          (showObj) =>
            showObj.theater._id.toString() == show.theater._id.toString()
        );
        uniqueTheaters.push({ ...show.theater._doc, shows: showOfThisTheater });
      }
    });
    res.status(200).send({
      success: true,
      data: uniqueTheaters,
      message: "Fetched theaters successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Failed to fetch theaters",
    });
  }
};

const getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId)
      .populate("movie")
      .populate("theater");

    return res.status(200).send({
      success: true,
      message: "Fetched show successfully",
      data: show,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Failed to fetch show",
    });
  }
};

const updateShowMovie = async (req, res) => {
  try {
    const updateShow = await Show.findByIdAndUpdate(req.body.showId, req.body);
    res.status(200).send({
      success: true,
      data: updateShow,
      message: "Show updated successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Failed to update show",
    });
  }
};

const deleteShowMovie = async (req, res) => {
  try {
    const deleteShow = await Show.findByIdAndDelete(req.params.showId);
    res.status(200).send({
      success: true,
      data: deleteShow,
      message: "Show deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Failed to delete show",
    });
  }
};

module.exports = {
  addShowMovie,
  getAllShowsByTheater,
  getAllTheatersByMovie,
  getShowById,
  updateShowMovie,
  deleteShowMovie,
};
