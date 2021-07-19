const { AuthenticationError, PubSub } = require("apollo-server-express");
const { Product } = require("../model/product");
const { Category } = require("../model/category");
const { Cart } = require("../model/cart");
const jwt = require("jsonwebtoken");
const pubsub = new PubSub();
const checkAdminAuth = require("../utils/checkAdminAuth")
const JWT_SECRET = process.env.JWT_SECRET;

const productResolver = {
  Query: {
    getProduct: async (_, { productId }) => {
      try {
        const product = await Product.findById(productId);
        if (product) {
          return product;
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    getProducts: async (_, args) => {
      try {
        return await Product.find();
      } catch (error) {
        throw new Error(error);
      }
    },

    getPageProducts: async (_, { page }) => {
      const pages = page > 1 ? page : 1;
      const limit = 5;
      try {
        if (pages === 1) {
          return await Product.find().sort("_id").limit(limit);
        } else {
          return await Product.find()
            .sort("_id")
            .limit(limit)
            .skip(limit * (pages - 1));
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    getProductsCount: async (_, args) => {
      try {
        const count = await Product.estimatedDocumentCount();
        pubsub.publish("PRODUCT_UPDATED_COUNT", { productUpdatedCount: count });
        return count;
      } catch (error) {
        throw new Error(error);
      }
    },

    getCategories: async (_, args) => {
      try {
        return await Category.find();
      } catch (err) {
        throw new Error(err);
      }
    },

    getCart: async (_, args, context) => {
      let user = {};
      const authHeader = context.req.headers.authorization;
      const token = authHeader.split("Bearer ")[1];
      if (token) {
        user = jwt.verify(token, JWT_SECRET);
      }
      try {
        if (user._id) {
          const cart = await Cart.findOne({ userId: user._id });
          if (!cart) throw new Error("Cart not found");
          else return cart;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    getCartProducts: async (_, { cartData }) => {
      let productIds = [];
      let CartProducts = [];
      cartData.forEach((data) => {
        productIds.push(data.productId);
      });
      try {
        const records = await Product.find({ _id: { $in: productIds } });
        cartData.forEach((data) => {
          records.forEach((record) => {
            if (data.productId == record._id) {
              let tempObj = {
                _id: record._id,
                title: record.title,
                price: record.price,
                category: record.category,
                quantity: data.productCount,
                imageUrl: record.imageUrl,
              };
              CartProducts.push(tempObj);
            }
          });
        });
        return CartProducts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    addNewProduct: async (
      _,
      { productInput: { title, price, category, imageUrl } },
      context
    ) => {
      try {
        const admin = checkAdminAuth(context);
        if (!admin) {
          throw new AuthenticationError("Access denied");
        } else {
          let newProduct = new Product({
            title,
            price,
            category,
            imageUrl,
          });
          newProduct = await newProduct.save();
          const count = await Product.estimatedDocumentCount();
          pubsub.publish("PRODUCT_CREATED", { productCreated: newProduct });
          pubsub.publish("PRODUCT_UPDATED_COUNT", {
            productUpdatedCount: count,
          });
          return newProduct;
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    updateProduct: async (
      _,
      { _id, productInput: { title, price, category, imageUrl } },
      context
    ) => {
      try {
        const admin = checkAdminAuth(context);
        if (!admin) {
          throw new AuthenticationError("Access denied");
        } else {
          const product = await Product.findOneAndUpdate(
            { _id },
            {
              title,
              price,
              category,
              imageUrl,
            },
            { new: true }
          );
          pubsub.publish("PRODUCT_UPDATED", { productUpdated: product });
          return product;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    deleteProduct: async (_, { id }, context) => {
      try {
        const admin = checkAdminAuth(context);
        if (!admin) {
          throw new AuthenticationError("Access denied");
        } else {
          const product = await Product.findOneAndDelete({ _id: id });
          const count = await Product.estimatedDocumentCount();
          pubsub.publish("PRODUCT_DELETED", { productDeleted: product });
          pubsub.publish("PRODUCT_UPDATED_COUNT", {
            productUpdatedCount: count,
          });
          return product;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    updateCart: async (_, { products }, context) => {
      let user = {};
      const authHeader = context.req.headers.authorization;
      const token = authHeader.split("Bearer ")[1];
      if (token) {
        user = jwt.verify(token, JWT_SECRET);
      }
      try {
        const cartData = await Cart.findOneAndUpdate(
          { userId: user._id || admin._id },
          {
            userId: user._id,
            products,
          },
          { new: true, upsert: true }
        );
        return cartData;
      } catch (error) {
        throw new Error(error);
      }
    },

    removeCartData: async (_, { userId }) => {
      try {
        return await Cart.findOneAndDelete({ userId: userId });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Subscription: {
    productCreated: {
      subscribe: (_, __, { connection }) => {
        if (!connection.context.res) {
          throw new Error("Not Authorized");
        }
        return pubsub.asyncIterator(["PRODUCT_CREATED"]);
      },
    },
    productUpdated: {
      subscribe: (_, __, { connection }) => {
        if (!connection.context.res) {
          throw new Error("Not Authorized");
        }
        return pubsub.asyncIterator(["PRODUCT_UPDATED"]);
      },
    },
    productDeleted: {
      subscribe: (_, __, { connection }) => {
        if (!connection.context.res) {
          throw new Error("Not Authorized");
        }
        return pubsub.asyncIterator(["PRODUCT_DELETED"]);
      },
    },

    productUpdatedCount: {
      subscribe: (_, __, { connection }) => {
        if (!connection.context.res) {
          throw new Error("Not Authorized");
        }
        return pubsub.asyncIterator(["PRODUCT_UPDATED_COUNT"]);
      },
    },
  },
};

module.exports = productResolver;
