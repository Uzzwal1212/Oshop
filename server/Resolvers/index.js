const authResolvers = require("./auth");
const productResolver = require("./product");
const orderResolvers = require("./order");

module.exports = {
  Query: {
    ...productResolver.Query,
    ...orderResolvers.Query,
  },

  Mutation: {
    ...authResolvers.Mutation,
    ...productResolver.Mutation,
    ...orderResolvers.Mutation,
  },

  Subscription: {
    ...productResolver.Subscription,
  },
};
