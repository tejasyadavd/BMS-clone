const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = verifiedToken.userId;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = auth;
