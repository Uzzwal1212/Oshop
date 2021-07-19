import React from "react";

const OrderHistory = ({ totalCartProducts, cartProductsData, totalPrice }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Order Summary</h5>
        <p className="card-text">
          You have {totalCartProducts} items in your order
        </p>
        <ul className="list-group list-group-flush">
          {cartProductsData.map((item) => (
            <li className="list-group-item">
              {item.quantity} x {item.title}
              <div className="float-right">{`$${
                item.price * item.quantity
              }`}</div>
            </li>
          ))}
          <li className="list-group-item font-weight-bold">
            Total
            <div className="float-right">{`$${totalPrice}`}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderHistory;
