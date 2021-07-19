import React from "react";
import { capitalizeFirstLetter } from "../../../common/utilities";

const ListGroup = ({ data, selectedItem, onCategorySelect }) => {
  
  return (
    <ul className="list-group sticky-top" style={{ zIndex: 0 }}>
      {data.map((category) => (
        <li
          className={
            category.name === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          key={category.name}
          onClick={() => onCategorySelect(category)}
          style={{ cursor: "pointer" }}
        >
          {capitalizeFirstLetter(category.name)}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
