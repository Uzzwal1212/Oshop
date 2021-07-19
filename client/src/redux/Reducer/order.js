import { orderAction } from "../actionTypes";

const initialState = {
  order: {},
  error: "",
};

export default function orderReducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case orderAction.ORDER_PLACE_INITIATE:
      return {
        ...state,
      };

    case orderAction.ORDER_PLACE_SUCCESS:
      return {
        order: payload,
      };

    case orderAction.ORDER_PLACE_FAILURE:
      return {
        error: payload,
      };

    default:
      return state;
  }
}
