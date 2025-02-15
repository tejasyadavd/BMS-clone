const Theater = require("../model/theaterModel");

const addTheater = async (req, res) => {
  try {
    const newTheater = new Theater(req.body);
    await newTheater.save();
    res.status(200).send({
      success: true,
      message: "New Theater added successfully",
      data: newTheater,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllTheater = async (req, res) => {
  try {
    const getTheater = await Theater.find().populate("owner");
    if (getTheater) {
      res.status(200).send({
        success: true,
        message: "All Theaters fetched successfully",
        data: getTheater,
      });
    } else {
      res.send({
        success: false,
        message: "No Theaters Found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllTheatersForOwner = async (req, res) => {
  try {
    const allTheaters = await Theater.find({ owner: req.params.ownerId });
    res.status(200).send({
      success: true,
      message: "All theaters fetched successfully",
      data: allTheaters,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getTheaterById = async (req, res) => {
  try {
    const getTheaterId = await Theater.findById(req.body.id);
    if (getTheaterId) {
      res.status(200).send({
        success: true,
        message: "Fetched theaterId successfully",
        data: getTheaterId,
      });
    } else {
      res.send({
        success: false,
        success: "TheaterId not found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const updateTheater = async (req, res) => {
  try {
    const updateTheaters = await Theater.findByIdAndUpdate(
      req.body.theaterId,
      req.body
    );
    if (updateTheaters) {
      res.status(200).send({
        success: true,
        message: "Theater details updated successfully",
        data: updateTheaters,
      });
    } else {
      res.send({
        success: false,
        message: "Can't update the theater details",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteTheater = async (req, res) => {
  try {
    const deleteTheaters = await Theater.findByIdAndDelete(
      req.params.theaterId
    );
    res.send({
      success: false,
      message: "Theater deleted successfully",
      data: deleteTheaters,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addTheater,
  getAllTheater,
  getAllTheatersForOwner,
  getTheaterById,
  updateTheater,
  deleteTheater,
};
