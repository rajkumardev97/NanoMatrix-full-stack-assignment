import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import { API_CONSTANTS } from "../../shared/constants/api.constants";

import TextFieldGroup from "../../common/TextFieldGroup";
import Header from "../../layouts/Header";
import QRGenerator from "../qr-code-generator/QRGenerator";
import GlobalLoader from "../../common/GlobalLoader";

import "react-toastify/dist/ReactToastify.css";

function AddProduct({ history, ...props }) {
  const [product, setProduct] = useState({
    product_name: "",
    product_image: "",
    product_quantity: "",
    product_sku: "",
    product_category: "",
    product_sub_category: "",
    product_qr_code_image: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeProduct = async (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    let file = e.target.files[0];
    if (e.target.name === "product_image") {
      setProduct({
        ...product,
        product_image: file,
      });
    } else if (e.target.name === "product_qr_code_image") {
      setProduct({
        ...product,
        product_qr_code_image: file,
      });
    }
  };

  const saveSubmit = async () => {
    try {
      let validStatus = await validateStates();
      if (validStatus) {
        setLoading(true);

        let stockData = new FormData();

        stockData.append("product_name", product.product_name);
        stockData.append("product_image", product.product_image);
        stockData.append("product_quantity", product.product_quantity);
        stockData.append("product_sku", product.product_sku);
        stockData.append("product_category", product.product_category);
        stockData.append("product_sub_category", product.product_sub_category);
        stockData.append(
          "product_qr_code_image",
          product.product_qr_code_image
        );

        const resdata = await Axios.post(
          `${API_CONSTANTS.PRODUCT.ADD}`,
          stockData
        );
        if (resdata) {
          handleResetState();
          toast(resdata.data.msg, { type: "success" });
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast("Something went wrong", { type: "error" });
    }
  };

  const validateStates = () => {
    if (
      product.product_name &&
      product.product_image &&
      product.product_quantity &&
      product.product_sku &&
      product.product_category &&
      product.product_sub_category &&
      product.product_qr_code_image
    ) {
      return true;
    } else {
      toast("Please enter information in all fields", { type: "error" });
      return false;
    }
  };

  const handleResetState = () => {
    setProduct({
      product_name: "",
      product_image: "",
      product_quantity: "",
      product_sku: "",
      product_category: "",
      product_sub_category: "",
      product_qr_code_image: "",
    });
  };

  return (
    <div className="container-fluid">
      <div>
        <Header />

        <main className="wrapper">
          <nav aria-label="breadcrumb" className="breadcrumb__menu">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Products</Link>
              </li>
              <li className="breadcrumb-item">Add Product</li>
            </ol>
          </nav>
          <section className="spacing-py-20 mycarSection">
            <div className="container-fluid">
              <div className="row">
                <div className="col-6">
                  <form enctype="multipart/form-data">
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <TextFieldGroup
                          placeholder="Name"
                          name="product_name"
                          value={product.product_name}
                          onChange={onChangeProduct}
                          info=""
                        />
                      </div>
                      <div class="form-group col-md-4">
                        <TextFieldGroup
                          placeholder="SKU"
                          name="product_sku"
                          value={product.product_sku}
                          onChange={onChangeProduct}
                          info=""
                        />
                      </div>
                      <div class="form-group col-md-4">
                        <TextFieldGroup
                          type="number"
                          placeholder="Quantity"
                          name="product_quantity"
                          value={product.product_quantity}
                          onChange={onChangeProduct}
                          info=""
                        />
                      </div>
                      <div class="form-group col-md-4">
                        <TextFieldGroup
                          placeholder="Category"
                          name="product_category"
                          value={product.product_category}
                          onChange={onChangeProduct}
                          info=""
                        />
                      </div>
                      <div class="form-group col-md-4">
                        <TextFieldGroup
                          placeholder="Sub Category"
                          name="product_sub_category"
                          value={product.product_sub_category}
                          onChange={onChangeProduct}
                          info=""
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <p>Product Image</p>
                        <input
                          type="file"
                          name="product_image"
                          onChange={(e) => handleFileUpload(e)}
                          required
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <p>Product QR Code</p>
                        <input
                          type="file"
                          name="product_qr_code_image"
                          onChange={(e) => handleFileUpload(e)}
                          required
                        />
                      </div>
                      <input
                        type="button"
                        value="Submit"
                        className="btn btn-info btn-block mt-4"
                        onClick={saveSubmit}
                      />
                    </div>
                  </form>
                </div>
                <div className="col-6">
                  <QRGenerator sku_code={product.product_sku} />
                </div>
              </div>
            </div>
          </section>

          <GlobalLoader loadStatus={loading} />
        </main>
      </div>
    </div>
  );
}

export default withRouter(AddProduct);
