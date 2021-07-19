const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  archived: {
    type: Boolean,
  },
  createdOn: {
    type: Number,
    default: Date.now,
  },
  lastUpdatedOn: {
    type: Number,
  },
});

const Category = mongoose.model("Category", categorySchema);

exports.Category = Category;
