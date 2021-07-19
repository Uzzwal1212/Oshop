import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { range } from "lodash";
import { getMemoizedProductData } from "../../redux/Selectors/product";
import {
  getPagedProductsDataInitiate,
  getProductCountInitiate,
} from "../../redux/Actions/product";
import Loader from "../comman/Loader/index";
import ProductList from "./ProductList/productList";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsCount,
} from "../../subscriptions/index";
import { LinkWrapper, LoaderWrapper, SearchInput } from "./styles";
import Paginate from "../comman/Pagination";

const ManageProducts = () => {
  const [search, setSearch] = useState("");
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { pagedProductData, pagedProductsLoader, productsCount } = useSelector(
    getMemoizedProductData
  );

  const totalPages = Math.ceil(productsCount / pageSize);
  const pages = range(1, totalPages + 1);

  useEffect(() => {
    dispatch(getProductCountInitiate());
    addProduct(dispatch);
    updateProduct(dispatch);
    deleteProduct(dispatch);
    getProductsCount(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (currentPage) {
      dispatch(getPagedProductsDataInitiate({ page: currentPage }));
    }
  }, [currentPage, dispatch]);

  const handleChange = ({ target, data }) => {
    const { value } = data || target;
    setSearch(value);
  };

  function getfilteredData() {
    let filterd = [...pagedProductData];
    if (search) {
      return filterd.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.price.toString().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return filterd;
    }
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
    dispatch(getPagedProductsDataInitiate(page));
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    dispatch(getPagedProductsDataInitiate(currentPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    dispatch(getPagedProductsDataInitiate(currentPage + 1));
  };

  return (
    <>
      {pagedProductsLoader ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <div className="container">
          <LinkWrapper>
            <Link className="btn btn-secondary large" to="/admin/product/new">
              New Product
            </Link>
          </LinkWrapper>
          <SearchInput
            placeholder="Search.."
            name="search"
            value={search}
            type="text"
            className="form-control col-md-8"
            onChange={handleChange}
          />
          <ProductList pagedProductData={getfilteredData()} />
          <Paginate
            pages={pages}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </div>
      )}
    </>
  );
};

export default ManageProducts;
