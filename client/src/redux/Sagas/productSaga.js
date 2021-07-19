import gql from "graphql-tag";
import { put } from "redux-saga/effects";
import { client } from "../../component/AolloClient/index";
import {
  newProductSuccess,
  newProductFailure,
  getCategoriesSuccess,
  getCategoriesFailure,
  getPagedProductsDataSuccess,
  getPagedProductsDataFailure,
  getProductDataSuccess,
  getProductDataFailure,
  updateProductSuccess,
  updateProductFailure,
  deleteProductSuccess,
  deleteProductFailure,
  getProductCountSuccess,
  getProductCountFailure,
  getAllProductsSuccess,
  getAllProductsFailure,
} from "../Actions/product";

export function* newProductSaga({ payload }) {
  try {
    const addNewProduct = gql`
      mutation fields(
        $title: String!
        $price: Float!
        $category: String!
        $imageUrl: String!
      ) {
        addNewProduct(
          productInput: {
            title: $title
            price: $price
            category: $category
            imageUrl: $imageUrl
          }
        ) {
          _id
          title
          price
          category
          imageUrl
        }
      }
    `;
    const result = yield client.mutate({
      mutation: addNewProduct,
      variables: payload,
    });
    yield put(newProductSuccess(result.data.addNewProduct));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(newProductFailure(errorString));
  }
}

export function* updateProductSaga({ payload }) {
  try {
    const updateProduct = gql`
      mutation fields(
        $_id: ID!
        $title: String!
        $price: Float!
        $category: String!
        $imageUrl: String!
      ) {
        updateProduct(
          _id: $_id
          productInput: {
            title: $title
            price: $price
            category: $category
            imageUrl: $imageUrl
          }
        ) {
          _id
          title
          price
          category
          imageUrl
        }
      }
    `;
    const result = yield client.mutate({
      mutation: updateProduct,
      variables: payload,
    });
    yield put(updateProductSuccess(result.data.updateProduct));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(updateProductFailure(errorString));
  }
}

export function* deleteProductSaga({ payload }) {
  try {
    const deleteProduct = gql`
      mutation fields($id: ID!) {
        deleteProduct(id: $id) {
          _id
          title
          price
          category
          imageUrl
        }
      }
    `;
    const result = yield client.mutate({
      mutation: deleteProduct,
      variables: payload,
    });
    yield put(deleteProductSuccess(result.data.deleteProduct));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(deleteProductFailure(errorString));
  }
}

export function* getCategoriesSaga() {
  try {
    const getCategories = gql`
      query {
        getCategories {
          _id
          name
          createdOn
        }
      }
    `;
    const result = yield client.query({
      query: getCategories,
    });
    yield put(getCategoriesSuccess(result.data.getCategories));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(getCategoriesFailure(errorString));
  }
}

export function* getPagedProductSaga({ payload }) {
  try {
    const getPagedProductData = gql`
      query fields($page: Int) {
        getPageProducts(page: $page) {
          _id
          title
          price
          category
          imageUrl
        }
      }
    `;
    const result = yield client.query({
      query: getPagedProductData,
      fetchPolicy: "network-only",
      variables: payload,
    });
    yield put(getPagedProductsDataSuccess(result.data.getPageProducts));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(getPagedProductsDataFailure(errorString));
  }
}

export function* getProductsCount() {
  try {
    const getProductsCount = gql`
      query {
        getProductsCount
      }
    `;
    const result = yield client.query({
      query: getProductsCount,
      fetchPolicy: "network-only",
    });
    yield put(getProductCountSuccess(result.data.getProductsCount));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(getProductCountFailure(errorString));
  }
}

export function* getProductSaga({ payload }) {
  try {
    const getProductData = gql`
      query fields($productId: ID!) {
        getProduct(productId: $productId) {
          _id
          title
          price
          category
          imageUrl
        }
      }
    `;
    const result = yield client.query({
      query: getProductData,
      variables: payload,
    });
    yield put(getProductDataSuccess(result.data.getProduct));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(getProductDataFailure(errorString));
  }
}

export function* getAllProductSaga() {
  try {
    const getAllProducts = gql`
      query {
        getProducts {
          _id
          title
          price
          category
          imageUrl
        }
      }
    `;
    const result = yield client.query({
      query: getAllProducts,
      fetchPolicy: "network-only",
    });
    yield put(getAllProductsSuccess(result.data.getProducts));
  } catch (error) {
    const errorString = error.graphQLErrors[0].message;
    yield put(getAllProductsFailure(errorString));
  }
}
