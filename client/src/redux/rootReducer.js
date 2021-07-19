import { combineReducers } from "redux";
import users from "./Reducer/users";
import admin from "./Reducer/admin";
import product from "./Reducer/product";
import cart from "./Reducer/cart";
import order from "./Reducer/order";

const rootReducer = combineReducers({
  users,
  admin,
  product,
  cart,
  order,
});

export default rootReducer;
