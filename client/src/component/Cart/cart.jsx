import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemoizedCartData } from "../../redux/Selectors/cart";
import CartTable from "./CartTable/cartTable";
import Loader from "../comman/Loader";
import {
  createCartInitiate,
  getCartInitiate,
  getCartProductsInitiate,
  storeCartData,
  removeCartInitiate,
  clearCartData,
} from "../../redux/Actions/cart";

import { CartHeading, ItemsHeading, LoaderWrapper } from "./styles";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { cartData, cartProductsData, cartProductLoader } =
    useSelector(getMemoizedCartData);
  const user = JSON.parse(localStorage.getItem("userData"));
  const admin = JSON.parse(localStorage.getItem("adminData"));

  let id = "";

  if (user) {
    id = user._id;
  } else if (admin) {
    id = admin._id;
  }

  let totalCartProducts = cartData.reduce((memo, currentvalue) => {
    return memo + currentvalue.productCount;
  }, 0);

  useEffect(() => {
    dispatch(getCartInitiate());
    dispatch(getCartProductsInitiate({ cartData }));
  }, [cartData, dispatch]);

  function updateLocalCart(type, product) {
    let products = cartData.slice();
    let existingProduct = products.find(
      (prod) => prod.productId === product._id
    );
    if (!existingProduct) {
      products.push({ productId: product._id, productCount: 0 });
    }
    products = products.map((prod) => {
      if (prod.productId === product._id) {
        return {
          ...prod,
          productCount:
            type === "plus" ? prod.productCount + 1 : prod.productCount - 1,
        };
      }
      return {
        ...prod,
      };
    });

    products = products.filter((prod) => prod.productCount > 0);

    if (!user || !admin) {
      localStorage.setItem("cartProducts", JSON.stringify(products));
    }

    dispatch(storeCartData(products));
    dispatch(createCartInitiate({ products }));
  }

  const handleRemoveProduct = (item) => {
    updateLocalCart("minus", item);
    dispatch(getCartInitiate());
  };

  const handleProductIncrement = (item) => {
    updateLocalCart("plus", item);
    dispatch(getCartInitiate());
  };

  const handleClearCart = () => {
    if (user || admin) {
      dispatch(clearCartData());
      dispatch(removeCartInitiate({ userId: id }));
    } else {
      dispatch(clearCartData());
    }
  };

  let totalPrice = cartProductsData.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  return (
    <div className="container">
      {cartProductLoader ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <>
          <CartHeading>Shopping Cart</CartHeading>
          <ItemsHeading>
            {totalCartProducts
              ? `There are ${totalCartProducts} products in cart`
              : "Cart is empty"}
          </ItemsHeading>
          <CartTable
            cartProductsData={cartProductsData}
            onProductIncrement={handleProductIncrement}
            onRemoveProduct={handleRemoveProduct}
            totalPrice={totalPrice}
          />
          <button
            className="btn btn-danger"
            disabled={totalCartProducts < 1}
            onClick={handleClearCart}
          >
            Clear All Products
          </button>
          <Link className="btn btn-info m-3" to="/checkout">
            Checkout
          </Link>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
