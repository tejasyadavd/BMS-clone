const express = require("express");
const theaterRouter = express.Router();
const {
  addTheater,
  getAllTheater,
  getAllTheatersForOwner,
  getTheaterById,
  updateTheater,
  deleteTheater,
} = require("../controllers/theaterController");

theaterRouter.post("/add-theater", addTheater);
theaterRouter.get("/getAll-theater", getAllTheater);
theaterRouter.get("/get-theater/:id", getTheaterById);
theaterRouter.put("/update-theater", updateTheater);
theaterRouter.delete("/delete-theater/:theaterId", deleteTheater);
theaterRouter.post("/delete-theater/:theaterId", deleteTheater);
theaterRouter.post("/getAll-theater-by-owner/:ownerId", getAllTheatersForOwner);

module.exports = theaterRouter;
