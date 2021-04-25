const axios = require("axios");

const { handleResponse, handleError } = require("../utils/requestHandlers"); 

const { productInfo } = require("../helper/utilopa");

exports.getProductInfo = async (req, res, next) => {
  try {
    const product_Id = req.params.id;
    console.log(product_Id)
    let productResData = await productInfo(product_Id);

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
