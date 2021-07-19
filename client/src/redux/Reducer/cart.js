import { cartAction } from "../actionTypes";

const initialState = {
  cartData: [],
  cartDataLoader: false,
  cartProductLoader: false,
  cartProductsData: [],
  error: "",
  cartSuccess: false,
  removeCartLoader: false,
  userCartData: {},
};

export default function cartReducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case cartAction.STORE_CART_DATA:
      return {
        ...state,
        cartData: payload,
      };

    case cartAction.CREATE_CART_INITIATE:
      return {
        ...state,
      };

    case cartAction.CREATE_CART_SUCCESS:
      return {
        ...state,
        cartData: payload.products,
      };
    case cartAction.CREATE_CART_FAILURE:
      return {
        ...state,
        error: payload,
      };

    case cartAction.GET_CART_INITIATE:
      return {
        ...state,
        cartDataLoader: true,
      };

    case cartAction.GET_CART_SUCCESS:
      return {
        ...state,
        cartSuccess: true,
        cartData: payload.products,
        cartDataLoader: false,
      };
    case cartAction.GET_CART_FAILURE:
      return {
        ...state,
        cartDataLoader: false,
        error: payload,
      };

    case cartAction.GET_CART_PRODUCTS_INITITATE:
      return {
        ...state,
        cartProductLoader: true,
      };

    case cartAction.GET_CART_PRODUCTS_SUCCESS:
      return {
        ...state,
        cartProductLoader: false,
        cartProductsData: payload,
      };

    case cartAction.GET_CART_PRODUCTS_FAILURE:
      return {
        ...state,
        cartProductLoader: false,
        error: payload,
      };

    case cartAction.CLEAR_CART_DATA:
      return {
        cartData: [],
        userCartData: {},
        cartProductsData:[],
        cartSuccess: false,
      };

    case cartAction.REMOVE_CART_DATA_INITIATE:
      return {
        ...state,
        removeCartLoader: true,
      };
    case cartAction.REMOVE_CART_DATA_SUCCESS:
      return {
        ...state,
        removeCartLoader: false,
      };
    case cartAction.REMOVE_CART_DATA_FAILURE:
      return {
        ...state,
        removeCartLoader: false,
      };
    default:
      return state;
  }
}
