const axios = require("axios");

const { handleResponse, handleError } = require("../utils/requestHandlers");

const { productUpdateRequest } = require("../helper/utilopa");

exports.updateProduct = async (req, res, next) => {
  try {
    const {
      product_id,
      product_image,
      product_name,
      product_quantity,
      product_sku,
      product_category,
      product_sub_category,
      product_qr_code_image,
    } = req.body;

    let stockField = {
      product_image,
      product_name,
      product_quantity,
      product_sku,
      product_category,
      product_sub_category,
      product_qr_code_image,
    };

    let productResData = await productUpdateRequest(product_id, stockField);

    if (productResData) {
      res.json(productResData);
    } else {
      console.log("productResData is not set!!");
      throw "productResData is not set!!";
    }
  } catch (err) {
    console.log("catch error is : ", err);
    return res.status(400).json({ error: err });
  }
};
