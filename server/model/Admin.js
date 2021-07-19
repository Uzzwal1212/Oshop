const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    trim: true,
    required: true,
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
  userType: {
    type: String,
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

const Admin = mongoose.model("Admin", adminSchema);

exports.Admin = Admin;
