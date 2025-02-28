const express = require("express");
const {
  register,
  login,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/get-current-user", auth, getCurrentUser);
userRouter.patch("/forgotpassword", forgotPassword);
userRouter.patch("/resetpassword/:email", resetPassword);

module.exports = userRouter;
