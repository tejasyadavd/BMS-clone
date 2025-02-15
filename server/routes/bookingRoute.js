const express = require("express");
const bookingRouter = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  makePayment,
  bookShow,
  getAllBookings,
} = require("../controllers/bookingController");

bookingRouter.post("/make-payment", auth, makePayment);
bookingRouter.post("/book-show", auth, bookShow);
bookingRouter.get("/getAll-bookings/:userId", auth, getAllBookings);

module.exports = bookingRouter;
