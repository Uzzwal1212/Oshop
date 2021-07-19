const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports.verifyToken = (token) => {
  const result = jwt.verify(token,process.env.JWT_SECRET);
  return result
};
