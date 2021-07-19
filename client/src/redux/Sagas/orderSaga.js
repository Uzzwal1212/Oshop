import gql from "graphql-tag";
import { put } from "redux-saga/effects";
import { client } from "../../component/AolloClient";

import { orderPlaceFailure, orderPlaceSuccess } from "../Actions/order";

export function* createOrderSaga({ payload }) {
  try {
    const createOrder = gql`
      mutation fields(
        $orderDetails: OrderDetailsInput!
        $totalPrice: Float!
        $items: JSON!
      ) {
        createOrder(
          orderInput: {
            orderDetails: $orderDetails
            totalPrice: $totalPrice
            items: $items
          }
        ) {
          orderDetails {
            userId
            name
            phone
            address
            pincode
          }
          totalPrice
          items
        }
      }
    `;
    const result = yield client.mutate({
      mutation: createOrder,
      variables: payload,
    });
    yield put(orderPlaceSuccess(result.data.createOrder));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(orderPlaceFailure(errorString));
  }
}
