import { createSelector } from "reselect";

export const getMemoizedProductData = createSelector(
  (state) => state.product,

  (productState) => {
    const {
      newProductLoader,
      error,
      categoriesData,
      categoryLoader,
      newProductData,
      pagedProductsLoader,
      pagedProductData,
      editProductLoader,
      getProductById,
      updateSuccess,
      deletedProductId,
      deleteProductLoader,
      deleteSuccess,
      productsCount,
      allProductsData,
      allProductsLoader,
    } = productState;

    return {
      newProductLoader,
      error,
      categoriesData,
      categoryLoader,
      newProductData,
      pagedProductsLoader,
      pagedProductData,
      editProductLoader,
      getProductById,
      updateSuccess,
      deletedProductId,
      deleteProductLoader,
      deleteSuccess,
      productsCount,
      allProductsData,
      allProductsLoader,
    };
  }
);
