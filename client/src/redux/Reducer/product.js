import { productAction } from "../actionTypes";

const initialState = {
  newProductLoader: false,
  pagedProductsLoader: false,
  allProductsLoader: false,
  allProductsData: [],
  error: "",
  categoriesData: [],
  newProductData: {},
  categoryLoader: false,
  pagedProductData: [],
  getProductById: {},
  editProductLoader: false,
  updateSuccess: false,
  deleteProductLoader: false,
  deletedProductId: "",
  deleteSuccess: false,
  productsCount: 0,
};

export default function manageProduct(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case productAction.NEW_PRODUCT_INITIATE:
      return {
        ...state,
        newProductLoader: true,
      };
    case productAction.NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        newProductLoader: false,
        newProductData: payload,
      };

    case productAction.NEW_PRODUCT_FAILURE:
      return {
        ...state,
        newProductLoader: false,
        error: payload,
      };

    case productAction.ADD_PRODUCT_SUBSCRIPTION:
      let updatedProductList = [...state.pagedProductData];
      updatedProductList.push(payload);
      return {
        ...state,
        pagedProductData: updatedProductList,
      };

    case productAction.CLEAR_NEW_PRODUCT_DATA:
      return {
        ...state,
        newProductLoader: false,
        editProductLoader: false,
        error: "",
        updateSuccess: false,
        newProductData: {},
        getProductById: {},
        deleteSuccess: false,
      };

    case productAction.GET_CATEGORIES_INITIATE:
      return {
        ...state,
        categoryLoader: true,
      };
    case productAction.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoryLoader: false,
        categoriesData: payload,
      };

    case productAction.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        categoryLoader: false,
        error: payload,
      };

    case productAction.GET_PAGEDPRODUCTSDATA_INITIATE:
      return {
        ...state,
        pagedProductsLoader: true,
      };

    case productAction.GET_PAGEDPRODUCTSDATA_SUCCESS:
      return {
        ...state,
        pagedProductsLoader: false,
        pagedProductData: payload,
      };

    case productAction.GET_PAGEDPRODUCTSDATA_FAILURE:
      return {
        ...state,
        pagedProductsLoader: false,
        error: payload,
      };

    case productAction.GET_PRODUCTDATA_INITIATE:
      return {
        ...state,
        editProductLoader: true,
      };

    case productAction.GET_PRODUCTDATA_SUCCESS:
      return {
        ...state,
        editProductLoader: false,
        getProductById: payload,
      };

    case productAction.GET_PRODUCTDATA_FAILURE:
      return {
        ...state,
        editProductLoader: false,
        error: payload,
      };

    case productAction.GET_PRODUCTSDATA_INITIATE:
      return {
        ...state,
        allProductsLoader: true,
      };

    case productAction.GET_PRODUCTSDATA_SUCCESS:
      return {
        ...state,
        allProductsLoader: false,
        allProductsData: payload,
      };

    case productAction.GET_PRODUCTSDATA_FAILURE:
      return {
        ...state,
        allProductsLoader: false,
        error: payload,
      };

    case productAction.GET_PRODUCTSCOUNT_INITIATE:
      return {
        ...state,
      };
    case productAction.GET_PRODUCTSCOUNT_SUCCESS:
      return {
        ...state,
        productsCount: payload,
      };
    case productAction.GET_PRODUCTSCOUNT_FAILURE:
      return {
        ...state,
        error: payload,
      };

    case productAction.UPDATE_PRODUCT_INITIATE:
      return {
        ...state,
        editProductLoader: true,
      };

    case productAction.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        editProductLoader: false,
        updateSuccess: true,
      };

    case productAction.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        editProductLoader: false,
        error: payload,
      };

    case productAction.UPDATE_PRODUCT_SUBSCRIPTION:
      const updatedData = [...state.pagedProductData].map((data, index) => {
        if (data._id === payload._id) {
          return payload;
        } else {
          return data;
        }
      });
      return {
        ...state,
        pagedProductData: updatedData,
      };

    case productAction.DELETE_PRODUCT_INITIATE:
      return {
        ...state,
        deleteProductLoader: true,
      };

    case productAction.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteProductLoader: false,
        deleteSuccess: true,
      };

    case productAction.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        deleteProductLoader: false,
        error: payload,
      };

    case productAction.DELETE_PRODUCT_SUBSCRIPTION:
      let newData = [...state.pagedProductData].filter(
        (product) => product._id !== payload._id
      );
      return {
        ...state,
        pagedProductData: newData,
      };

    case productAction.UPDATE_PRODUCTS_COUNT_SUBSCRIPTION:
      return {
        ...state,
        productsCount: payload,
      };
    default:
      return state;
  }
}
