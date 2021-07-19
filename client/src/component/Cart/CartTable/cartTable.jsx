import React from "react";

const CartTable = ({
  cartProductsData,
  onRemoveProduct,
  onProductIncrement,
  totalPrice,
}) => {
  return (
    <div className="row col-10">
      <table className="table" style={{ marginTop: "30px" }}>
        <thead>
          <tr>
            <th style={{width:"150px"}}></th>
            <th>Product</th>
            <th className="text-center" style={{ width: "230px" }}>
              Quantity
            </th>
            <th className="text-right" style={{ width: "200px" }}>
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {cartProductsData.map((item) => (
            <tr key={item._id}>
              <td><div style={{backgroundImage:`url("${item.imageUrl}")`}} className="thumbnail"></div></td>
              <td>{item.title}</td>
              <td>
                <div className="row no-gutters">
                  <div className="col-2">
                    <button
                      className="btn btn-secondary btn-block"
                      onClick={() => onRemoveProduct(item)}
                    >
                      -
                    </button>
                  </div>
                  <div className="col text-center">{item.quantity} in cart</div>
                  <div className="col-2">
                    <button
                      className="btn btn-secondary btn-block"
                      onClick={() => onProductIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </td>
              <td className="text-right">{`$${item.price * item.quantity}`}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th className="text-right">{`$${totalPrice}`}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartTable;
