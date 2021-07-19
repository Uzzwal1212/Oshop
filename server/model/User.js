const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    trim: true,
    required: true,
  },
  googleId: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  createdOn: {
    type: Number,
    default: Date.now,
  },
  lastUpdatedOn: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

exports.User = User;
