import React from "react";
import { Link } from "react-router-dom";
import { Table } from "./styles";
import { capitalizeFirstLetter } from "../../../common/utilities/index";

const ProductList = ({ pagedProductData }) => {
  return (
    <Table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {pagedProductData.map((product) => (
          <tr key={product._id}>
            <td>{product.title}</td>
            <td>{`$${product.price}`}</td>
            <td>{capitalizeFirstLetter(product.category)}</td>
            <td>
              <Link to={`/admin/product/${product._id}`}>Edit</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;
