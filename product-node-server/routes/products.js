var express = require("express");
var router = express.Router();
const axios = require("axios");
var fs = require("fs");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); //save the file
  } else {
    cb(null, false); //not save file
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //it allow only 5 mb file
  },
  fileFilter: fileFilter,
});

const { addProduct } = require("../controllers/addProductsController");
const { getProducts } = require("../controllers/getProductsController");
const { getProductInfo } = require("../controllers/getProductController");
const { getProductSkuInfo } = require("../controllers/getProductSkuController");
const { updateProduct } = require("../controllers/updateProductsController");
const { removeProduct } = require("../controllers/removeProductsController");

router.get("/test", async (req, res) => {
  res.json({ msg: "test working!!" });
});

router.get("/list", getProducts);
router.post(
  "/add",
  upload.fields([
    {
      name: "product_image",
      maxCount: 1,
    },
    {
      name: "product_qr_code_image",
      maxCount: 1,
    },
  ]),
  addProduct
);

router.get("/info/:id", getProductInfo);
router.get("/skuinfo/:id", getProductSkuInfo);

router.put("/update", updateProduct);
router.delete("/remove/:id", removeProduct);

module.exports = router;
