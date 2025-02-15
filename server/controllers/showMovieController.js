const Show = require("../model/showModel");

const addShowMovie = async (req, res) => {
  try {
    console.log("Request body for add shows: ", req.body);
    const newShow = new Show(req.body);
    await newShow.save();

    return res.status(200).send({
      success: true,
      data: newShow,
      message: "Show added successfully",
    });
  } catch (err) {
    console.error("Error adding shows:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to add show",
    });
  }
};

const getAllShowsByTheater = async (req, res) => {
  try {
    console.log(" theather Id: ", req.params.theaterId);
    const getAllShows = await Show.find({
      theater: req.params.theaterId,
    }).populate("movie");
    console.log("getAllshows", getAllShows);
    res.status(200).send({
      success: true,
      data: getAllShows,
      message: "Fetched all shows by theater",
    });
  } catch (err) {
    console.error("Error fetching shows by theater:", err);
    res.status(500).send({
      success: false,
      message: "Failed to get all shows by theater",
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
        console.log("is Theater: ", isTheater);
        const showOfThisTheater = shows.filter(
          (showObj) =>
            showObj.theater._id.toString() == show.theater._id.toString()
        );
        console.log("Show of this theater: ", showOfThisTheater);
        uniqueTheaters.push({ ...show.theater._doc, shows: showOfThisTheater });
      }
      console.log("Unique theaters: ", uniqueTheaters);
    });
    res.status(200).send({
      success: true,
      data: uniqueTheaters,
      message: "Fetched all theaters by movie",
    });
  } catch (err) {
    console.error("Error fetching all theaters by movie:", err);
    res.status(500).send({
      success: false,
      message: "Failed to get all theaters by movie",
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
      message: "Fetched show by id successfully",
      data: show,
    });
  } catch (err) {
    console.error("Error fetching shows by Id:", err);
    return res.status(500).send({
      success: false,
      message: "Failed to get show by id",
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
    console.error("Error updating shows:", err);
    res.status(500).send({
      success: false,
      message: "Error fetching show movies",
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
    console.error("Error deleting shows:", err);
    res.status(500).send({
      success: false,
      message: "Error fetching show movies",
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
