import { productAction } from "../actionTypes";

export const newProductInitiate = (data) => ({
  type: productAction.NEW_PRODUCT_INITIATE,
  payload: data,
});
export const newProductSuccess = (data) => ({
  type: productAction.NEW_PRODUCT_SUCCESS,
  payload: data,
});
export const newProductFailure = (data) => ({
  type: productAction.NEW_PRODUCT_FAILURE,
  payload: data,
});

export const addProductSubscription = (data) => ({
  type: productAction.ADD_PRODUCT_SUBSCRIPTION,
  payload: data,
});

export const clearNewProductData = () => ({
  type: productAction.CLEAR_NEW_PRODUCT_DATA,
});

export const getCategoriesInitiate = (data) => ({
  type: productAction.GET_CATEGORIES_INITIATE,
  payload: data,
});

export const getCategoriesSuccess = (data) => ({
  type: productAction.GET_CATEGORIES_SUCCESS,
  payload: data,
});

export const getCategoriesFailure = (data) => ({
  type: productAction.GET_CATEGORIES_FAILURE,
  payload: data,
});

export const getAllProductsInitiate = () => ({
  type: productAction.GET_PRODUCTSDATA_INITIATE,
});
export const getAllProductsSuccess = (data) => ({
  type: productAction.GET_PRODUCTSDATA_SUCCESS,
  payload: data,
});
export const getAllProductsFailure = (data) => ({
  type: productAction.GET_PRODUCTSDATA_FAILURE,
  payload: data,
});

export const getPagedProductsDataInitiate = (data) => ({
  type: productAction.GET_PAGEDPRODUCTSDATA_INITIATE,
  payload: data,
});

export const getPagedProductsDataSuccess = (data) => ({
  type: productAction.GET_PAGEDPRODUCTSDATA_SUCCESS,
  payload: data,
});

export const getPagedProductsDataFailure = (data) => ({
  type: productAction.GET_PAGEDPRODUCTSDATA_FAILURE,
  payload: data,
});

export const getProductDataInitiate = (data) => ({
  type: productAction.GET_PRODUCTDATA_INITIATE,
  payload: data,
});

export const getProductDataSuccess = (data) => ({
  type: productAction.GET_PRODUCTDATA_SUCCESS,
  payload: data,
});

export const getProductDataFailure = (data) => ({
  type: productAction.GET_PRODUCTDATA_FAILURE,
  payload: data,
});

export const getProductCountInitiate = () => ({
  type: productAction.GET_PRODUCTSCOUNT_INITIATE,
});
export const getProductCountSuccess = (data) => ({
  type: productAction.GET_PRODUCTSCOUNT_SUCCESS,
  payload: data,
});
export const getProductCountFailure = (data) => ({
  type: productAction.GET_PRODUCTSCOUNT_FAILURE,
  payload: data,
});

export const updateProductInitiate = (data) => ({
  type: productAction.UPDATE_PRODUCT_INITIATE,
  payload: data,
});
export const updateProductSuccess = (data) => ({
  type: productAction.UPDATE_PRODUCT_SUCCESS,
  payload: data,
});
export const updateProductFailure = (data) => ({
  type: productAction.UPDATE_PRODUCT_FAILURE,
  payload: data,
});

export const updateProductSubscription = (data) => ({
  type: productAction.UPDATE_PRODUCT_SUBSCRIPTION,
  payload: data,
});

export const deleteProductInitiate = (data) => ({
  type: productAction.DELETE_PRODUCT_INITIATE,
  payload: data,
});
export const deleteProductSuccess = (data) => ({
  type: productAction.DELETE_PRODUCT_SUCCESS,
  payload: data,
});
export const deleteProductFailure = (data) => ({
  type: productAction.DELETE_PRODUCT_FAILURE,
  payload: data,
});

export const deleteProductSubscription = (data) => ({
  type: productAction.DELETE_PRODUCT_SUBSCRIPTION,
  payload: data,
});
export const productUpdatedCountSubscription = (data) => ({
  type: productAction.UPDATE_PRODUCTS_COUNT_SUBSCRIPTION,
  payload: data,
});
