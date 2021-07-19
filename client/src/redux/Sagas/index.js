import { takeLatest } from "redux-saga/effects";
import { userActions } from "../actionTypes";
import { adminActions } from "../actionTypes";
import { productAction } from "../actionTypes";
import { cartAction } from "../actionTypes";
import { orderAction } from "../actionTypes";
import { userLoginSaga, userSignUpSaga } from "./usersSaga";
import { adminLoginSaga, adminSignUpSaga } from "./adminSaga";
import {
  newProductSaga,
  getCategoriesSaga,
  getPagedProductSaga,
  updateProductSaga,
  getProductSaga,
  deleteProductSaga,
  getProductsCount,
  getAllProductSaga,
} from "./productSaga";
import { createCartSaga, getCartSaga, getCartProductsSaga, removeCartSaga } from "./cartSaga";
import { createOrderSaga } from "./orderSaga";

export default function* watcherSaga() {
  // ---------------------------------------User---------------------------------------------//
  yield takeLatest(userActions.USER_SIGN_UP_INITIATE, userSignUpSaga);
  yield takeLatest(userActions.USER_LOGIN_INITIATE, userLoginSaga);
  // ---------------------------------------Admin---------------------------------------------//
  yield takeLatest(adminActions.ADMIN_SIGN_UP_INITIATE, adminSignUpSaga);
  yield takeLatest(adminActions.ADMIN_LOGIN_INITIATE, adminLoginSaga);
  // ---------------------------------------Product---------------------------------------------//
  yield takeLatest(productAction.NEW_PRODUCT_INITIATE, newProductSaga);
  yield takeLatest(productAction.GET_CATEGORIES_INITIATE, getCategoriesSaga);
  yield takeLatest(
    productAction.GET_PAGEDPRODUCTSDATA_INITIATE,
    getPagedProductSaga
  );
  yield takeLatest(productAction.GET_PRODUCTDATA_INITIATE, getProductSaga);
  yield takeLatest(productAction.GET_PRODUCTSDATA_INITIATE, getAllProductSaga);
  yield takeLatest(productAction.GET_PRODUCTSCOUNT_INITIATE, getProductsCount);
  yield takeLatest(productAction.UPDATE_PRODUCT_INITIATE, updateProductSaga);
  yield takeLatest(productAction.DELETE_PRODUCT_INITIATE, deleteProductSaga);
  // ---------------------------------------Cart---------------------------------------------//
  yield takeLatest(cartAction.CREATE_CART_INITIATE, createCartSaga);
  yield takeLatest(cartAction.GET_CART_INITIATE, getCartSaga);
  yield takeLatest(cartAction.GET_CART_PRODUCTS_INITITATE, getCartProductsSaga);
  yield takeLatest(cartAction.REMOVE_CART_DATA_INITIATE, removeCartSaga);
  // ---------------------------------------Order---------------------------------------------//
  yield takeLatest(orderAction.ORDER_PLACE_INITIATE, createOrderSaga);

}
