import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { API_CONSTANTS } from "../../shared/constants/api.constants";

import Header from "../../layouts/Header";

import "react-toastify/dist/ReactToastify.css";

import GlobalLoader from "../../common/GlobalLoader";
import ProductInformation from "../../layouts/ProductInformation";

function ProductDetail({ history, ...props }) {
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(false);

  const getProductById = async () => {
    try {
      setLoading(true);

      let id = props.match.params.id;
      let resdata = await Axios.get(`${API_CONSTANTS.PRODUCT.GET_BY_ID}/${id}`);

      const {
        data: { data },
      } = resdata;

      setProduct(data);
      setLoading(false);
      toast("Product Retrieve Successfully", { type: "success" });
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  let productCont;

  if (product) {
    productCont = <ProductInformation productInfo={product} />;
  }

  return (
    <div>
      <Header />

      <main className="wrapper">
        <nav aria-label="breadcrumb" className="breadcrumb__menu">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Products</Link>
            </li>
            <li className="breadcrumb-item">
              Product / {props.match.params.id}
            </li>
          </ol>
        </nav>

        {productCont}

        <GlobalLoader loadStatus={loading} />
      </main>
    </div>
  );
}

export default withRouter(ProductDetail);
