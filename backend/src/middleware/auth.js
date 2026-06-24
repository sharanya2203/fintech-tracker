const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    console.log("PATH:", req.originalUrl);
    const authHeader = req.header("Authorization");

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    console.log("TOKEN:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (error) {
    console.log("JWT ERROR:", error.message);

    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = auth;