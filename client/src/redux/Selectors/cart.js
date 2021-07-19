import { createSelector } from "reselect";

export const getMemoizedCartData = createSelector(
  (state) => state.cart,
  (cartState) => {
    const {
      error,
      cartData,
      cartSuccess,
      userCartData,
      cartProductsData,
      cartProductLoader,
    } = cartState;
    return {
      error,
      cartData,
      cartSuccess,
      userCartData,
      cartProductsData,
      cartProductLoader,
    };
  }
);
