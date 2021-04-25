const mongoose = require("mongoose");
Schema = mongoose.Schema;
mongoose.Promise = Promise;
const db = require("../connections/dbMaster");

// Define our Research schema
const ProductSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_image: { type: String, required: false, default: "" },
  product_quantity: { type: Number, required: true },
  product_sku: { type: String, required: true },
  product_category: { type: String, required: true },
  product_sub_category: { type: String, required: true },
  product_qr_code_image: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

module.exports = db.model("Product", ProductSchema);
