const AWS = require("aws-sdk");
const axios = require("axios");
const convert = require("xml-js");
const FormData = require("form-data");
const fs = require("fs");
const config = require("../config/config");

const BUCKET_NAME = config.BUCKET_NAME;
const IAM_USER_KEY = config.IAM_USER_KEY;
const IAM_USER_SECRET = config.IAM_USER_SECRET;

const signedUrlExpireSeconds = 360;

const {
  save,
  getProductList,
  getById,
  getBySku,
  isProductExists,
  updateProductById,
  removeProductWithId,
} = require("../dbServices/product");

module.exports.productPlatformListRequest = async () => {
  try {
    let result = await getProductList();

    return {
      statusCode: 200,
      result: 1,
      msg: "products is recieved",
      data: result,
    };
  } catch (err) {
    return { statusCode: 500, result: 0, msg: err };
  }
};

module.exports.productInfo = async (Id) => {
  try {
    let result = await getById(Id);

    return {
      statusCode: 200,
      result: 1,
      msg: "products is recieved",
      data: result,
    };
  } catch (err) {
    return { statusCode: 500, result: 0, msg: err };
  }
};

module.exports.productSkuInfo = async (Id) => {
  try {
    let result = await getBySku(Id);

    return {
      statusCode: 200,
      result: 1,
      msg: "products is recieved",
      data: result,
    };
  } catch (err) {
    return { statusCode: 500, result: 0, msg: err };
  }
};

module.exports.productAddRequest = async (data) => {
  try {
    let result = await save(data);

    return {
      statusCode: 200,
      result: 1,
      msg: "product is added",
      data: result,
    };
  } catch (err) {
    return { statusCode: 500, result: 0, msg: err };
  }
};

module.exports.productUpdateRequest = async (id, data) => {
  try {
    let result = await updateProductById(id, data);

    return {
      statusCode: 200,
      result: 1,
      msg: "product is updated",
      data: result,
    };
  } catch (err) {
    return { statusCode: 500, result: 0, msg: err };
  }
};

module.exports.productRemoveRequest = async (id) => {
  try {
    let result = await removeProductWithId(id);

    return {
      statusCode: 200,
      result: 1,
      msg: "product is deleted",
      data: result,
    };
  } catch (err) {
    return { statusCode: 500, result: 0, msg: err };
  }
};
