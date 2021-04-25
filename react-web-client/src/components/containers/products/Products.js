import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { API_CONSTANTS } from "../../shared/constants/api.constants";
import Header from "../../layouts/Header";
import ProductList from "./ProductList";
import GlobalLoader from "../../common/GlobalLoader";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products({ history, ...props }) {
  const [allList, setAllList] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      let resdata = await Axios.get(`${API_CONSTANTS.PRODUCT.ALL}`);

      const {
        data: { data },
      } = resdata;

      setAllList(data);
      setLoading(false);

      //toast("Product Retrieve Successfully", { type: "success" });
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      let resdata = await Axios.delete(
        `${API_CONSTANTS.PRODUCT.DELETE_BY_ID}/${id}`
      );

      const {
        data: { data },
      } = resdata;

      getProducts();
      setLoading(false);

      toast("Product Deleted Successfully", { type: "success" });
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  return (
    <div>
      <Header />

      <main className="wrapper">
        <section className="spacing-py-20">
          <div className="container-fluid">
            <div
              className="row"
              style={{ justifyContent: "flex-end", margin: 10 }}
            >
              <Link to="/add-product" className="btn btn-sm btn-primary">
                Add Product
              </Link>
              <Link
                to="/product-scanner"
                className="btn btn-sm btn-info"
                style={{ marginLeft: 5 }}
              >
                Qr Product Scanner
              </Link>
            </div>
            <div className="row">
              <ProductList
                data={allList}
                deleteProduct={deleteProduct}
                loading={loading}
                setLoading={setLoading}
              />
            </div>
          </div>
        </section>

        <GlobalLoader loadStatus={loading} />
      </main>
    </div>
  );
}

export default withRouter(Products);
