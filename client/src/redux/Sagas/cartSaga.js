import gql from "graphql-tag";
import { put } from "redux-saga/effects";
import { client } from "../../component/AolloClient";

import {
  createCartFailure,
  createCartSuccess,
  getCartFailure,
  getCartSuccess,
  getCartProductsFailure,
  getCartProductsSuccess,
  removeCartFailure,
  removeCartSuccess,
} from "../Actions/cart";

export function* createCartSaga({ payload }) {
  try {
    const createCart = gql`
      mutation fields($products: JSON!) {
        updateCart(products: $products) {
          userId
          products
        }
      }
    `;
    const result = yield client.mutate({
      mutation: createCart,
      variables: payload,
    });
    yield put(createCartSuccess(result.data.updateCart));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(createCartFailure(errorString));
  }
}

export function* getCartSaga() {
  try {
    const getCart = gql`
      query {
        getCart {
          userId
          products
        }
      }
    `;
    const result = yield client.query({
      query: getCart,
      fetchPolicy: "network-only",
    });
    yield put(getCartSuccess(result.data.getCart));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(getCartFailure(errorString));
  }
}

export function* getCartProductsSaga({ payload }) {
  try {
    const getCartProducts = gql`
      query fields($cartData: JSON!) {
        getCartProducts(cartData: $cartData) {
          _id
          title
          price
          category
          quantity
          imageUrl
        }
      }
    `;
    const result = yield client.query({
      query: getCartProducts,
      variables: payload,
      fetchPolicy: "network-only",
    });
    yield put(getCartProductsSuccess(result.data.getCartProducts));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(getCartProductsFailure(errorString));
  }
}

export function* removeCartSaga({ payload }) {
  try {
    const removeCartData = gql`
      mutation fields($userId: ID!) {
        removeCartData(userId: $userId) {
          userId
          products
        }
      }
    `;
    const result = yield client.mutate({
      mutation: removeCartData,
      variables: payload,
    });
    yield put(removeCartSuccess(result.data.removeCartData))
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(removeCartFailure(errorString));
  }
}
