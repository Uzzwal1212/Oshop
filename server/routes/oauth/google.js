const axios = require("axios");
const express = require("express");
const { v4: uuid } = require("uuid");
require("dotenv").config();
const { User } = require("../../model/User");
const { generateToken } = require("../../utils/generateToken");

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const data = {
      token_uri: process.env.token_uri,
      grant_type: process.env.grant_type,
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      redirect_uri: process.env.redirect_uri,
      code: req.query.code,
    };

    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      data
    );

    const result = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      }
    );

    console.log(result.data);

    const userWithId = await User.findOne({ googleId: result.data.id });
    const userWithEmail = await User.findOne({ email: result.data.email });

    let user = null;

    if (
      userWithId &&
      userWithEmail &&
      userWithId._id.toString() !== userWithEmail._id.toString()
    ) {
      throw new Error("User with this email already exists");
    }

    if (
      userWithId &&
      userWithEmail &&
      userWithId._id.toString() === userWithEmail._id.toString()
    ) {
      user = userWithId;
    }

    if (userWithId && !userWithEmail) {
      user = await User.findOneAndUpdate(
        { _id: userWithId._id },
        { email: result.data.email }
      );
    }

    if (!userWithId && userWithEmail) {
      user = await User.findOneAndUpdate(
        { _id: userWithEmail._id },
        { googleId: result.data.id }
      );
    }

    if (!userWithId && !userWithEmail) {
      user = await new User({
        name: result.data.name,
        email: result.data.email,
        password: uuid(),
        googleId: result.data.id,
      }).save();
    }
    const token = generateToken(user);

    res.redirect(`http://localhost:3000/login/google?jwt=${token}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
