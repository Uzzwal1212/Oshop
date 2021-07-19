const mongoose = require("mongoose");
const { Category } = require("./model/category");

const category = {
  Bread: "bread",
  Dairy: "dairy",
  Fruits: "fruits",
  Vegitables: "vegitables",
};

const insertValues = () => {
  Object.values(category).forEach((value) => {
    const category = new Category({
      name: value,
    });
    category.save()
  });
}

module.exports = {
  insertValues
}
