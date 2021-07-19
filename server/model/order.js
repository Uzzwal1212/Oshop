const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderDetails: {
    userId: String,
    name: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
  },
  items: { type: [Object] },
  totalPrice: { type: Number },
  createdOn: {
    type: Number,
    default: Date.now,
  },
  lastUpdatedOn: {
    type: Number,
  },
});

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
