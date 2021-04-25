import React from "react";

function ProductInformation({ ...props }) {
  const { productInfo } = props;
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div className="card">
            <div class="card flex-md-row shadow-sm h-md-250">
              <div class="card-body d-flex flex-column align-items-start">
                <strong class="d-inline-block mb-2 text-primary">
                  Name: {productInfo.product_name}
                </strong>

                <p class="card-text mb-2">
                  {" "}
                  SKU Code:{" "}
                  <strong class="d-inline-block mb-2 text-primary">
                    {productInfo.product_sku}
                  </strong>
                </p>
                <p class="card-text mb-2">
                  Qty:{" "}
                  <strong class="d-inline-block mb-2 text-primary">
                    {" "}
                    {productInfo.product_quantity}
                  </strong>
                </p>
                <p class="card-text mb-2">
                  Category:{" "}
                  <strong class="d-inline-block mb-2 text-primary">
                    {productInfo.product_category}
                  </strong>
                </p>
                <p class="card-text mb-2">
                  Sub Category:{" "}
                  <strong class="d-inline-block mb-2 text-primary">
                    {productInfo.product_sub_category}
                  </strong>
                </p>
              </div>
              <img
                class="card-img-right flex-auto d-none d-lg-block"
                alt="Thumbnail [200x250]"
                src={`http://localhost:5000/${productInfo.product_image}`}
                style={{ width: 200 }}
              />
            </div>
          </div>{" "}
          </div>
          <div class="col-md-6">
            <div className="card">
              <div class="card flex-md-row shadow-sm h-md-250">
                <div class="card-body d-flex flex-column align-items-start">
                  <img
                    class="card-img-right flex-auto d-none d-lg-block"
                    alt="Thumbnail [200x250]"
                    src={`http://localhost:5000/${productInfo.product_qr_code_image}`}
                    style={{ width: 200 }}
                  />
                </div>
              </div>{" "}
            </div>
          </div> 
      </div>
    </div>
  );
}

export default ProductInformation;
