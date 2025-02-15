const { Schema, model } = require("mongoose");

const movieShowSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: "Movies",
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: Array,
      default: [],
    },
    theater: {
      type: Schema.Types.ObjectId,
      ref: "Theaters",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const movieShowModel = model("MovieShows", movieShowSchema);

module.exports = movieShowModel;
