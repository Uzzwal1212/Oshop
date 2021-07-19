const { Order } = require("../model/order");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const orderResolvers = {
  Mutation: {
    createOrder: async (
      _,
      { orderInput: { orderDetails, totalPrice, items } },
      context
    ) => {
      let user = {};
      const authHeader = context.req.headers.authorization;
      const token = authHeader.split("Bearer ")[1];
      if (token) {
        user = jwt.verify(token, JWT_SECRET);
      }
      try {
        let order = new Order({
          orderDetails,
          totalPrice,
          items,
        });
        return await order.save();
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = orderResolvers;
