const axios = require("axios");

const { handleResponse, handleError } = require("../utils/requestHandlers"); 

const { productPlatformListRequest } = require("../helper/utilopa");

exports.getProducts = async (req, res, next) => {
  try {
    let productResData = await productPlatformListRequest();

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
