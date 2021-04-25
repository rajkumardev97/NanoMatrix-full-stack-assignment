import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import { API_CONSTANTS } from "../../shared/constants/api.constants";

import TextFieldGroup from "../../common/TextFieldGroup";
import Header from "../../layouts/Header";
import GlobalLoader from "../../common/GlobalLoader";

import "react-toastify/dist/ReactToastify.css";

function EditProduct({ history, ...props }) {
  const [product, setProduct] = useState({
    product_id: "",
    product_name: "",
    product_image: "",
    product_quantity: "",
    product_sku: "",
    product_category: "",
    product_sub_category: "",
    product_qr_code_image: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductByID();
  }, []);

  const getProductByID = async () => {
    try {
      setLoading(true);

      let id = props.match.params.id;
      let resdata = await Axios.get(`${API_CONSTANTS.PRODUCT.GET_BY_ID}/${id}`);

      const {
        data: { data },
      } = resdata;

      setProduct({
        product_id: data._id,
        product_name: data.product_name,
        product_image: data.product_image,
        product_quantity: data.product_quantity,
        product_sku: data.product_sku,
        product_category: data.product_category,
        product_sub_category: data.product_sub_category,
        product_qr_code_image: data.product_qr_code_image,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const onChangeProduct = async (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    let file = e.target.files[0];
    if (e.target.name === "product_image") {
      //need to update on server and db
    } else if (e.target.name === "product_qr_code_image") {
      //need to update on server and db
    }
  };

  const saveSubmit = async () => {
    try {
      setLoading(true);

      let payload = {
        product_id: product.product_id,
        product_image: product.product_image,
        product_name: product.product_name,
        product_quantity: product.product_quantity,
        product_sku: product.product_sku,
        product_category: product.product_category,
        product_sub_category: product.product_sub_category,
        product_qr_code_image: product.product_qr_code_image,
      };

      const resdata = await Axios.put(
        `${API_CONSTANTS.PRODUCT.UPDATE_BY_ID}`,
        payload
      );
      if (resdata) {
        getProductByID();
        toast(resdata.data.msg, { type: "success" });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast("Something went wrong", { type: "error" });
    }
  };

  return (
    <div className="container-fluid">
      <Header />
      <nav aria-label="breadcrumb" className="breadcrumb__menu">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Products</Link>
          </li>
          <li className="breadcrumb-item">Edit Product</li>
        </ol>
      </nav>
      <main className="wrapper">
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
                <div className="row">
                  <div className="col-6">
                    <img
                      class="card-img-right flex-auto d-none d-lg-block"
                      alt="Thumbnail [200x250]"
                      src={`http://localhost:5000/${product.product_image}`}
                      style={{ width: 200 }}
                    />
                  </div>
                  <div className="col-6">
                    <img
                      class="card-img-right flex-auto d-none d-lg-block"
                      alt="Thumbnail [200x250]"
                      src={`http://localhost:5000/${product.product_qr_code_image}`}
                      style={{ width: 200 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GlobalLoader loadStatus={loading} />
      </main>
    </div>
  );
}

export default withRouter(EditProduct);
