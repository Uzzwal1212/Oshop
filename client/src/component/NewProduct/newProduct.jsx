import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { getMemoizedProductData } from "../../redux/Selectors/product";
import Loader from "../comman/Loader";
import Card from "../comman/Card";
import validations from "../../common/validations/index";
import { capitalizeFirstLetter } from "../../common/utilities/index";
import {
  newProductInitiate,
  getCategoriesInitiate,
  clearNewProductData,
  getProductDataInitiate,
  updateProductInitiate,
  deleteProductInitiate,
} from "../../redux/Actions/product";
import { FormWrapper, LoaderWrapper } from "./styles";
import { toast } from "react-toastify";

const {
  requiredValidate,
  rateSubmitValidate,
  rateChangeValidate,
} = validations;

const NewProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    categoriesData,
    categoryLoader,
    newProductLoader,
    newProductData,
    editProductLoader,
    getProductById,
    updateSuccess,
    deleteSuccess,
  } = useSelector(getMemoizedProductData);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCategoriesInitiate());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getProductDataInitiate({ productId: id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (Object.keys(getProductById).length > 0) {
      const updatedProduct = {
        title: getProductById.title,
        price: getProductById.price,
        category: getProductById.category,
        imageUrl: getProductById.imageUrl,
      };
      setNewProduct(updatedProduct);
    }
  }, [getProductById]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Product updated successfully");
      history.push("/admin/products");
    }
    if (Object.keys(newProductData).length > 0) {
      toast.success("New product added successfully");
      history.push("/admin/products");
    }
    if (deleteSuccess) {
      toast.success("Product deleted successfuly");
      history.push("/admin/products");
    }
  }, [newProductData, history, updateSuccess, deleteSuccess]);

  useEffect(
    () => () => {
      dispatch(clearNewProductData());
      setNewProduct({});
    },
    [dispatch]
  );

  const handleClose = () => setShow(false);
  const handleModal = () => setShow(true);
  const handleDelete = () => {
    dispatch(deleteProductInitiate({ id }));
    setShow(false);
  };

  const handleChange = ({ target, data }) => {
    const { name, value } = data || target;

    if (name === "price") {
      if (rateChangeValidate(value)) {
        setNewProduct({ ...newProduct, price: value });
      }
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { title, price, category, imageUrl } = newProduct;
    const errorsObject = {
      title: requiredValidate(title),
      price: rateSubmitValidate(price),
      category: requiredValidate(category),
      imageUrl: requiredValidate(imageUrl),
    };

    if (
      !errorsObject.title &&
      !errorsObject.price &&
      !errorsObject.category &&
      !errorsObject.imageUrl &&
      id
    ) {
      dispatch(
        updateProductInitiate({
          _id: id,
          ...newProduct,
          price: parseFloat(price),
        })
      );
    } else if (
      !errorsObject.title &&
      !errorsObject.price &&
      !errorsObject.category &&
      !errorsObject.imageUrl
    ) {
      dispatch(newProductInitiate({ ...newProduct, price: parseFloat(price) }));
    }
    setErrors(errorsObject);
  };

  return (
    <div className="container">
      {categoryLoader || newProductLoader || editProductLoader ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <div className="row">
          <div className="col-md-7">
            <FormWrapper onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="Title">Title</label>
                <input
                  type="text"
                  name="title"
                  className={
                    errors.title ? "form-control validation" : "form-control"
                  }
                  onChange={handleChange}
                  value={newProduct.title}
                />
                {errors.title ? (
                  <div style={{ color: "red" }}>{errors.title}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="Price">Price</label>
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                  <input
                    type="text"
                    name="price"
                    className={
                      errors.price ? "form-control validation" : "form-control"
                    }
                    onChange={handleChange}
                    value={newProduct.price}
                  />
                </div>
                {errors.price ? (
                  <div style={{ color: "red" }}>{errors.price}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="Category">Category</label>
                <select
                  className={
                    errors.category ? "form-control validation" : "form-control"
                  }
                  name="category"
                  onChange={handleChange}
                  value={newProduct.category}
                >
                  <option value="">Select</option>
                  {categoriesData.length &&
                    categoriesData.map((category) => (
                      <option key={category._id} value={category.name}>
                        {capitalizeFirstLetter(category.name)}
                      </option>
                    ))}
                </select>
                {errors.category ? (
                  <div style={{ color: "red" }}>{errors.category}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="ImageUrl">Image Url</label>
                <input
                  type="text"
                  name="imageUrl"
                  className={
                    errors.imageUrl ? "form-control validation" : "form-control"
                  }
                  onChange={handleChange}
                  value={newProduct.imageUrl}
                />
                {errors.imageUrl ? (
                  <div style={{ color: "red" }}>{errors.imageUrl}</div>
                ) : null}
              </div>
              <button type="submit" className="btn btn-secondary btn-md">
                Save
              </button>
              <Button
                className="btn btn-danger m-2"
                onClick={handleModal}
                disabled={!id}
              >
                Delete
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </FormWrapper>
          </div>
          <Card product={newProduct} />
        </div>
      )}
    </div>
  );
};

export default NewProduct;
