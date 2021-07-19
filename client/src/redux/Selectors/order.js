import { createSelector } from "reselect";

export const getMemoizedOrders = createSelector(
  (state) => state.order,
  (orderState) => {
    const {
      error,
      order
    } = orderState;
    return {
      error,
      order
    };
  }
);
