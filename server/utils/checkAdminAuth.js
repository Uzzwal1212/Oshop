const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.userType === "admin") {
          const admin = jwt.verify(token, JWT_SECRET);
          return admin;
        } else {
          throw new AuthenticationError("Invalid/Expired token");
        }
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authenticaton token must be `Bearer [token]");
  }
  throw new Error("Authorizaton token must be provided");
};
