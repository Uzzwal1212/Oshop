const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String },
  products: { type: [Object] },

  createdOn: {
    type: Number,
    default: Date.now,
  },
  lastUpdatedOn: {
    type: Number,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

exports.Cart = Cart;
