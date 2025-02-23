require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
//const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");

const connectDB = require("./config/dbconfig");
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(helmet());
app.use(mongoSanitize());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://checkout.stripe.com"],
      frameSrc: ["'self'", "https://checkout.stripe.com"],
      connectSrc: ["'self'", "https://api.stripe.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.set("trust proxy", 1);

// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many request from this IP, please try again after 15 minutes",
// });
// app.use(apiLimiter);

const userRoutes = require("./routes/userRoute");
const movieRoutes = require("./routes/movieRoute");
const theaterRoutes = require("./routes/theaterRoute");
const showRoutes = require("./routes/showRoute");
const auth = require("./middlewares/authMiddleware");
const bookingRoutes = require("./routes/bookingRoute");
const { Script } = require("vm");

const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));

// app.use("/api/", apiLimiter);
app.use("/api/users", userRoutes);
app.use("/api/movies", auth, movieRoutes);
app.use("/api/theaters", auth, theaterRoutes);
app.use("/api/shows", auth, showRoutes);
app.use("/api/bookings", auth, bookingRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT);
