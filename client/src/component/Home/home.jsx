import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../comman/Loader";
import Card from "../comman/Card";
import {
  getAllProductsInitiate,
  getCategoriesInitiate,
} from "../../redux/Actions/product";
import {
  getCartInitiate,
  createCartInitiate,
} from "../../redux/Actions/cart";
import ListGroup from "../comman/ListGroup";
import { getMemoizedProductData } from "../../redux/Selectors/product";
import { getMemoizedCartData } from "../../redux/Selectors/cart";
import { ListWrapper, ProductWrapper, LoaderWrapper } from "./styles";

const Home = () => {
  const [selectedCategory, setCategory] = useState("All Categories");
  const [Categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const { allProductsData, allProductsLoader, categoriesData, categoryLoader } =
    useSelector(getMemoizedProductData);

  const { cartDataLoader } = useSelector(getMemoizedCartData);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("cartProducts"));
    if (products) {
      dispatch(createCartInitiate({ products }));
      localStorage.removeItem("cartProducts");
    } else {
      dispatch(getCartInitiate());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProductsInitiate());
    dispatch(getCategoriesInitiate());
    setCategories([{ id: "", name: "All Categories" }, ...categoriesData]);
  }, [dispatch, categoriesData]);

  const handleCategorySelect = (category) => {
    setCategory(category.name);
  };

  const filteredData =
    selectedCategory === "All Categories"
      ? allProductsData
      : allProductsData.filter(
          (product) => product.category === selectedCategory
        );
  return (
    <div className="container">
      {allProductsLoader || categoryLoader || cartDataLoader ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <div className="row">
          <ListWrapper className="col-3">
            <ListGroup
              data={Categories}
              selectedItem={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </ListWrapper>
          <ProductWrapper className="col-9">
            <div className="row">
              {filteredData.length === 0 ? (
                <h4>{`${selectedCategory} are out of Stock`}</h4>
              ) : (
                filteredData.map((product) => (
                  <div className="col" key={product._id}>
                    <Card product={product} button="Add To Cart" />
                  </div>
                ))
              )}
            </div>
          </ProductWrapper>
        </div>
      )}
    </div>
  );
};

export default Home;
