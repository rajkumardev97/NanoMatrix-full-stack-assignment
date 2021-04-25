const Product = require("../models/ProductModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.save = (data) => new Product(data).save();

exports.getProductList = async () => {
  try {
    let result = await Product.find({});

    return result;
  } catch (error) {
    throw error;
  }
};

exports.getById = async (productId) => {
  try {
    let result = await Product.findOne({
      _id: ObjectId(productId),
    });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.getBySku = async (sku) => {
  try {
    let result = await Product.findOne({
      product_sku: sku,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.isProductExists = (sku) =>
  Research.countDocuments({ product_sku: sku });

exports.removeProductWithId = async (id) => {
  try {
    let result = await Product.deleteOne({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.removeProductWithSku = async (sku) => {
  try {
    let result = await Research.deleteOne({ product_sku: sku });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.updateProductById = async (productId, data) => {
  try {
    let result = await Product.findOneAndUpdate(
      {
        _id: ObjectId(productId),
      },
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

exports.updateProductBySku = async (sku, data) => {
  try {
    let result = await Product.findOneAndUpdate(
      {
        product_sku: sku,
      },
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
};
