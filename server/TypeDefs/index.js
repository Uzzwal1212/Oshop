const { gql } = require("apollo-server-express");
const GraphQLJSON = require("graphql-type-json");

const typedefs = gql`
  scalar JSON
  scalar JSONObject

  type UserAndToken {
    user: User!
    admin: Admin!
    token: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Admin {
    _id: ID!
    name: String!
    email: String!
    password: String!
    userType: String!
  }

  type Product {
    _id: ID!
    title: String!
    price: Float!
    category: String!
    imageUrl: String!
  }

  type OrderDetails {
    userId: String!
    name: String!
    phone: String!
    address: String!
    city: String!
    pincode: String!
  }

  type Order {
    orderDetails: OrderDetails!
    totalPrice: Float!
    items: JSON!
  }

  type CartProducts {
    _id: ID!
    title: String!
    price: Float!
    category: String!
    quantity: Int!
    imageUrl: String!
  }

  type Category {
    _id: ID!
    name: String!
    createdOn: String!
  }

  type Products {
    productId: String
    quantity: Int
  }

  type Cart {
    userId: String!
    products: JSON!
  }

  input ProductInput {
    title: String!
    price: Float!
    category: String!
    imageUrl: String!
  }
  
  input OrderDetailsInput {
    userId: String!
    name: String!
    phone: String!
    address: String!
    city: String!
    pincode: String!
  }

  input OrderInput {
    orderDetails: OrderDetailsInput!
    totalPrice: Float!
    items: JSON!
  }

  type Query {
    getPageProducts(page: Int): [Product]
    getProducts: [Product]
    getProduct(productId: ID!): Product
    getCategories: [Category]
    getProductsCount: Int!
    getCart: Cart!
    getCartProducts(cartData: JSON!): [CartProducts]!
  }

  type Subscription {
    productCreated: Product!
    productUpdated: Product!
    productDeleted: Product!
    productUpdatedCount: Int!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createAdmin(
      name: String!
      email: String!
      password: String!
      userType: String!
    ): Admin!
    userLogin(email: String!, password: String!): UserAndToken!
    adminLogin(email: String!, password: String!): UserAndToken!
    addNewProduct(productInput: ProductInput): Product!
    updateProduct(_id: ID!, productInput: ProductInput): Product!
    deleteProduct(id: ID!): Product!
    updateCart(products: JSON!): Cart!
    removeCartData(userId: ID!): Cart!
    createOrder(orderInput: OrderInput!): Order!
  }
`;

module.exports = typedefs;
