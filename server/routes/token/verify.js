const express = require("express");
const { verifyToken } = require("../../utils/generateToken");
const { User } = require("../../model/User");

const router = express.Router();

router.post("/", async (req, res) => {
  const result = verifyToken(req.body.token);
  if (result) {
    const user = await User.findOne(
      {
        _id: result._id,
      },
      {
        password: 0,
      }
    ).lean();
    return res.send(user);
  }

  res.send(null);
});

module.exports = router;
