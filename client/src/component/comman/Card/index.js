import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardWrapper } from "./styles";
import { getMemoizedCartData } from "../../../redux/Selectors/cart";
import {
  createCartInitiate,
  storeCartData,
  getCartInitiate,
} from "../../../redux/Actions/cart";

const Card = ({ product, button }) => {
  const [productCount, setProdcutCount] = useState(0);
  const dispatch = useDispatch();
  let { cartData } = useSelector(getMemoizedCartData);
  const user = JSON.parse(localStorage.getItem("userData"));
  const admin = JSON.parse(localStorage.getItem("adminData"));

  function updateLocalCart(type) {
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

    if (!user && !admin) {
      localStorage.setItem("cartProducts", JSON.stringify(products));
    }

    dispatch(storeCartData(products));
    dispatch(createCartInitiate({ products }));
  }

  const handleAddProduct = () => {
    setProdcutCount(productCount + 1);
    updateLocalCart("plus");
    dispatch(getCartInitiate());
  };

  const handleRemoveProduct = () => {
    setProdcutCount(productCount - 1);
    updateLocalCart("minus");
    dispatch(getCartInitiate());
  };

  const handleProductIncrement = () => {
    setProdcutCount(productCount + 1);
    updateLocalCart("plus");
    dispatch(getCartInitiate());
  };

  return (
    <CardWrapper>
      <div className="card" style={{ width: "22rem" }}>
        <div
          style={{ backgroundImage: `url("${product.imageUrl}")` }}
          className="homeImage"
        ></div>
        <div className="card-body">
          <h4 className="card-title">{product.title}</h4>
          <h6 className="card-text">{product.price && `$${product.price}`}</h6>
        </div>
        {button && productCount === 0 ? (
          <div className="card-footer" style={{ padding: 0 }}>
            <button
              className="btn btn-secondary btn-block"
              onClick={() => handleAddProduct(product)}
            >
              {button}
            </button>
          </div>
        ) : button && productCount !== 0 ? (
          <div className="row no-gutters">
            <div className="col-2">
              <button
                className="btn btn-secondary btn-block"
                onClick={() => handleRemoveProduct(product)}
              >
                -
              </button>
            </div>
            <div className="col text-center">{productCount} in cart</div>
            <div className="col-2">
              <button
                className="btn btn-secondary btn-block"
                onClick={() => handleProductIncrement(product)}
              >
                +
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </CardWrapper>
  );
};

export default Card;
