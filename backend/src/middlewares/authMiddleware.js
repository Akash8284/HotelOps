const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

  try {

    const token = req.headers.authorization;

    if (!token) {

      return res.status(401).json({
        message: "Token missing"
      });

    }

    const decoded = jwt.verify(
      token,
      "secretkey"
    );

    req.user = decoded;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      message: "Invalid token"
    });

  }

};

module.exports = authMiddleware;