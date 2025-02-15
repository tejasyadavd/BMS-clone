const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    show: {
      type: Schema.Types.ObjectId,
      ref: "MovieShows",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    seats: {
      type: Array,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const bookingModel = model("Bookings", bookingSchema);

module.exports = bookingModel;
