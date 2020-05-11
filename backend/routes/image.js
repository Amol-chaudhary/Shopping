var express = require("express");
var ImageRouter = express.Router();
const multer = require("multer");
var Product = require("../models/items");
var fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var name = require("../controllers/Products").product;
    const dir = `../src/assets/Images/${name}`;
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

ImageRouter.route("/uploadmulter/:productId").post(
  upload.single("imageData"),
  async (req, res, next) => {
    const product = await Product.findOne({ _id: req.params.productId });
    product.imageData = req.file.path;
    product
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          success: true,
          document: result,
        });
      })
      .catch((err, res) => next(err));
  }
);

module.exports = ImageRouter;
