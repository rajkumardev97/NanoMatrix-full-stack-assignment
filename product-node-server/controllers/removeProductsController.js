const axios = require("axios");

const { handleResponse, handleError } = require("../utils/requestHandlers"); 

const { productRemoveRequest } = require("../helper/utilopa");

exports.removeProduct = async (req, res, next) => {
  try {
    const product_Id = req.params.id;

    let productResData = await productRemoveRequest(product_Id);

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
