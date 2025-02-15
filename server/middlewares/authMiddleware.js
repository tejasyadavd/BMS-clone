const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    console.log("req header ", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log("token:", token);
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified token ", verifiedToken);
    req.body.userId = verifiedToken.userId;
    console.log("req.body._id: ", req.body.userId);
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = auth;
