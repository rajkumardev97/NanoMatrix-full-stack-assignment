import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import QrScan from "react-qr-reader";
import { toast } from "react-toastify";
import { API_CONSTANTS } from "../../shared/constants/api.constants";
import Header from "../../layouts/Header";
import GlobalLoader from "../../common/GlobalLoader";
import "react-toastify/dist/ReactToastify.css";

function QRScanner({ history, ...props }) {
  const [qrscan, setQrscan] = useState("No Result");
  const [loading, setLoading] = useState(false);

  const handleQRCodeScan = (data) => {
    console.log(data);
    if (data) {
      setQrscan(data);
      handleVehicleInfo(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const handleVehicleInfo = async (sku_code) => {
    try {
      setLoading(true);

      const resdata = await Axios.get(
        `${API_CONSTANTS.PRODUCT.GET_BY_SKU_CODE}/${sku_code}`
      );
      const {
        data: { data },
      } = resdata;
      if (data) {
        history.push(`/detail-product/${data._id}`);
      } else {
        toast("Product is not exist in system", { type: "info" });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast("Something went wrong", { type: "error" });
    }
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
              <li className="breadcrumb-item">QR Scanner</li>
            </ol>
          </nav>
          <div className="container-fluid">
            <div className="row" style={{ justifyContent: "center" }}>
              <div style={{ marginTop: 30 }}>
                SKU Code: <span class="badge badge-warning">{qrscan}</span>
                <QrScan
                  delay={300}
                  onError={handleError}
                  onScan={handleQRCodeScan}
                  style={{ height: 240, width: 320 }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <GlobalLoader loadStatus={loading} />
    </div>
  );
}

export default QRScanner;
