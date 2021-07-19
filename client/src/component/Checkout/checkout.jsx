import React, { useEffect, useState } from "react";
import OrderHistory from "./OrderHistory/orderHistory";
import { HistoryCard, CheckoutWrapper } from "./styles";
import { getMemoizedCartData } from "../../redux/Selectors/cart";
import { useDispatch, useSelector } from "react-redux";
import { orderPlaceInitiate } from "../../redux/Actions/order";
import {
  getCartInitiate,
  getCartProductsInitiate,
} from "../../redux/Actions/cart";
import validations from "../../common/validations/index";

const { requiredValidate } = validations;

const Checkout = () => {
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const user = JSON.parse(localStorage.getItem("userData"));
  const admin = JSON.parse(localStorage.getItem("adminData"));

  let id = "";

  if (user) {
    id = user._id;
  } else {
    id = admin._id;
  }

  const { cartData, cartProductsData } = useSelector(getMemoizedCartData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartInitiate());
    dispatch(getCartProductsInitiate({ cartData }));
  }, [cartData, dispatch]);

  let totalCartProducts = cartData.reduce((memo, currentvalue) => {
    return memo + currentvalue.productCount;
  }, 0);

  let totalPrice = cartProductsData.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const handleDetailChange = ({ target }) => {
    const { name, value } = target;
    setDetails({ ...details, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, phone, address, city, pincode } = details;
    const errorsObject = {
      name: requiredValidate(name),
      phone: requiredValidate(phone),
      address: requiredValidate(address),
      city: requiredValidate(city),
      pincode: requiredValidate(pincode),
    };
    if (
      !errorsObject.name &&
      !errorsObject.phone &&
      !errorsObject.address &&
      !errorsObject.city &&
      !errorsObject.pincode
    ) {
      dispatch(
        orderPlaceInitiate({
          orderDetails: { ...details, userId: id },
          totalPrice,
          items: cartProductsData,
        })
      );
    }

    setErrors(errorsObject);
  };

  return (
    <CheckoutWrapper>
      <div className="row">
        <div className="col-6">
          <form
            style={{ marginTop: "20px", marginLeft: "60px" }}
            onSubmit={onSubmit}
          >
            <h2>Shipping</h2>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={details.name}
                onChange={handleDetailChange}
              />
            </div>
            <div className="form-group">
              <label>Mobile Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={details.phone}
                onChange={handleDetailChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={details.address}
                onChange={handleDetailChange}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={details.city}
                onChange={handleDetailChange}
              />
            </div>
            <div className="form-group">
              <label>Zip code</label>
              <input
                type="text"
                className="form-control"
                name="pincode"
                value={details.pincode}
                onChange={handleDetailChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Order
            </button>
          </form>
        </div>
        <HistoryCard className="col-6">
          <OrderHistory
            totalCartProducts={totalCartProducts}
            cartProductsData={cartProductsData}
            totalPrice={totalPrice}
          />
        </HistoryCard>
      </div>
    </CheckoutWrapper>
  );
};

export default Checkout;
