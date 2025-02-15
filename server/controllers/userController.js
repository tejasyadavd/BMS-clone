const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const EmailHelper = require("../utils/emailHelper");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    console.log("userExists: ", userExists);
    if (userExists) {
      return res.status(409).send({
        success: false,
        message: "User already exists",
      });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      const newUser = new User({
        ...req.body,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(200).send({
        success: true,
        message: "User registered successfully, Please login",
        user: newUser,
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    console.log("usercontroller login: ", user);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found, please register",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("token", token);

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Sorry, Invalid password",
      });
    }

    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: user,
      data: token,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (email === undefined) {
      return res.status(400).send({
        success: false,
        message: "Please enter the email for forget password",
      });
    }

    const user = await User.findOne({ email: email });
    if (user === null) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user?.otp && Date.now() < user?.otpExpiry) {
      return res.status(401).json({
        success: false,
        message: "OTP exists, check your mail",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await EmailHelper("otp.html", email, { name: user.name, otp: user.otp });
    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (err) {
    console.log("Unable to generate OTP: ", err);
    res.status(500).send({
      success: false,
      message: "Unable to send OTP",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetDetails = req.body;
    if (resetDetails.password == undefined || resetDetails.otp == undefined) {
      return res.status(400).json({
        success: false,
        message: "Password and OTP is required",
      });
    }
    console.log("resetDetails: ", resetDetails);
    const user = await User.findOne({ otp: resetDetails.otp });
    if (user === null) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (user.otp !== resetDetails.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.password = resetDetails.password;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.log("Unable to reset the password: ", err);
    res.status(500).send({
      success: false,
      message: "Unable to reset the password",
    });
  }
};

const getCurrentUser = async (req, res) => {
  console.log(req.url, req.method);

  try {
    console.log("header token ", req.headers["authorization"]);

    const user = await User.findById(req.body.userId).select("-password");
    console.log("getcurrentuser controller: ", user);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    }
    res.send({
      success: true,
      message: "User is authenticated",
      data: user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};
