const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../model/User");
const { Admin } = require("../model/Admin");
const { generateToken } = require("../utils/generateToken");

const authResolvers = {
  Mutation: {
    createUser: async (parent, args) => {
      let user = new User({
        name: args.name,
        email: args.email,
        password: args.password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      return user.save();
    },

    createAdmin: async (parent, args) => {
      let admin = new Admin({
        name: args.name,
        email: args.email,
        password: args.password,
        userType: args.userType,
      });
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(admin.password, salt);
      return admin.save();
    },

    userLogin: async (parent, args) => {
      let user = await User.findOne({ email: args.email });
      if (!user) throw new Error("Invalid email or password");

      const validPassword = await bcrypt.compare(args.password, user.password);
      if (!validPassword) throw new Error("Invalid email or password");

      const token = generateToken(user);
      return { token, user };
    },

    adminLogin: async (parent, args) => {
      let admin = await Admin.findOne({ email: args.email });
      if (!admin) throw new Error("Invalid email or password");

      const validPassword = await bcrypt.compare(args.password, admin.password);
      if (!validPassword) throw new Error("Invalid email or password");
      const token = jwt.sign(
        { _id: admin._id, userType: admin.userType },
        process.env.JWT_SECRET
      );
      return { token, admin };
    },
  },
};

module.exports = authResolvers;
