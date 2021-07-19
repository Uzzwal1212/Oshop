import { cartAction } from "../actionTypes";

export const createCartInitiate = (data) => ({
  type: cartAction.CREATE_CART_INITIATE,
  payload: data,
});
export const createCartSuccess = (data) => ({
  type: cartAction.CREATE_CART_SUCCESS,
  payload: data,
});
export const createCartFailure = (data) => ({
  type: cartAction.CREATE_CART_FAILURE,
  payload: data,
});
export const getCartInitiate = (data) => ({
  type: cartAction.GET_CART_INITIATE,
  payload: data,
});
export const getCartSuccess = (data) => ({
  type: cartAction.GET_CART_SUCCESS,
  payload: data,
});
export const getCartFailure = (data) => ({
  type: cartAction.GET_CART_FAILURE,
  payload: data,
});

export const storeCartData = (data) => ({
  type: cartAction.STORE_CART_DATA,
  payload: data,
});

export const getCartProductsInitiate = (data) => ({
  type: cartAction.GET_CART_PRODUCTS_INITITATE,
  payload: data,
});

export const getCartProductsSuccess = (data) => ({
  type: cartAction.GET_CART_PRODUCTS_SUCCESS,
  payload: data,
});

export const getCartProductsFailure = (data) => ({
  type: cartAction.GET_CART_PRODUCTS_FAILURE,
  payload: data,
});

export const clearCartData = () => ({
  type: cartAction.CLEAR_CART_DATA,
});

export const removeCartInitiate = (data) => ({
  type: cartAction.REMOVE_CART_DATA_INITIATE,
  payload: data,
});
export const removeCartSuccess = (data) => ({
  type: cartAction.REMOVE_CART_DATA_SUCCESS,
  payload: data,
});
export const removeCartFailure = (data) => ({
  type: cartAction.REMOVE_CART_DATA_FAILURE,
  payload: data,
});
