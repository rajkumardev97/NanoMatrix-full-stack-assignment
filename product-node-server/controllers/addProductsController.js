const axios = require("axios");

const { handleResponse, handleError } = require("../utils/requestHandlers");

const { productAddRequest } = require("../helper/utilopa");

exports.addProduct = async (req, res, next) => {
  try {
    const {
      product_name,
      product_image,
      product_quantity,
      product_sku,
      product_category,
      product_sub_category,
      product_qr_code_image,
    } = req.body;

    console.log(req.files);

    let stockField = {
      product_name,
      product_image: `uploads/${req.files.product_image[0].filename}`,
      product_quantity,
      product_sku,
      product_category,
      product_sub_category,
      product_qr_code_image: `uploads/${req.files.product_qr_code_image[0].filename}`,
    };

    let productResData = await productAddRequest(stockField);

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
