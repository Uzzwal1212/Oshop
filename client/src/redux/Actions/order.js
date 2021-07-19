import { orderAction } from "../actionTypes";

export const orderPlaceInitiate = (data) => ({
  type: orderAction.ORDER_PLACE_INITIATE,
  payload: data,
});

export const orderPlaceSuccess = (data) => ({
  type: orderAction.ORDER_PLACE_SUCCESS,
  payload: data,
});

export const orderPlaceFailure = (data) => ({
  type: orderAction.ORDER_PLACE_FAILURE,
  payload: data,
});
