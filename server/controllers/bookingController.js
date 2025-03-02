const Booking = require("../model/bookingModel");
const Show = require("../model/showModel");
const EmailHelper = require("../utils/emailHelper");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const makePayment = async (req, res) => {
  try {
    const { token, amount, seats, showId } = req.body;

    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    const alreadyBookedSeats = seats.filter((seat) =>
      show.bookedSeats.includes(seat)
    );

    if (alreadyBookedSeats.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Seats ${alreadyBookedSeats.join(
          ", "
        )} are no longer available.`,
      });
    }

    const customer = await stripe.customers.create({
      source: token.id,
      email: token.email,
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      description: "Payment for booking",
      payment_method_types: ["card"],
      receipt_email: token.email,
    });
    const transactionId = paymentIntent.id;
    res.status(200).send({
      success: true,
      message: "Payment Successful",
      data: transactionId,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Failed to make payment",
    });
  }
};

const bookShow = async (req, res) => {
  try {
    // Fetch the latest show details with booked seats
    const show = await Show.findById(req.body.show).populate("movie");

    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show not found.",
      });
    }

    // Check if any selected seat is already booked
    const alreadyBookedSeats = req.body.seats.filter((seat) =>
      show.bookedSeats.includes(seat)
    );

    if (alreadyBookedSeats.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Seats ${alreadyBookedSeats.join(
          ", "
        )} are no longer available.`,
      });
    }

    // Proceed with booking
    const newBooking = new Booking(req.body);
    await newBooking.save();

    //Update booked seats in the show document
    const updateBookingSeats = [...show.bookedSeats, ...req.body.seats];
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updateBookingSeats,
    });

    const populateBookingInfo = await Booking.findById(newBooking._id)
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "Movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theater",
          model: "Theaters",
        },
      });

    await EmailHelper("ticketTemplate.html", populateBookingInfo.user.email, {
      name: populateBookingInfo.user.name,
      movie: populateBookingInfo.show.movie.name,
      theater: populateBookingInfo.show.theater.name,
      date: populateBookingInfo.show.date,
      time: populateBookingInfo.show.time,
      seats: populateBookingInfo.seats,
      amount:
        populateBookingInfo.seats.length * populateBookingInfo.show.ticketPrice,
      transactionid: populateBookingInfo.transactionId,
    });

    res.send({
      success: true,
      message: "Show booked successfully",
      data: newBooking,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "Movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theater",
          model: "Theaters",
        },
      });

    res.status(200).json({
      success: true,
      data: bookings,
      message: "Successfully fetched all bookings",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { makePayment, bookShow, getAllBookings };
