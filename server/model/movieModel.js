const { Schema, model } = require("mongoose");

const MovieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  language: {
    type: [String],
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const movieModel = model("Movies", MovieSchema);
module.exports = movieModel;
