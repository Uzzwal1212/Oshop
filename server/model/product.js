const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  imageUrl: {
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

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
