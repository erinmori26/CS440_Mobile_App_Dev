const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = function(req, res, next) {
  if (req.headers && req.headers.authorization) {
    try {
      req.user = jwt.verify(
        req.headers.authorization.split(" ")[1], // authorization token (after bearer)
        config.JWT_SECRET // verify same token (in config.js)
      );
    } catch (error) {
      return res.status(401).json({
        error: {
          msg: "Failed to authenticate token!"
        }
      });
    }
  } else {
    return res.status(401).json({
      error: {
        msg: "No token!"
      }
    });
  }

  return next();
};
