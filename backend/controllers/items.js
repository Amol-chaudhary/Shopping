const _ = require("lodash");
const Items = require("../models/items");
const Products = require("../models/Products");
const Review = require("../models/reviews");
const Comment = require("../models/comment");

exports.ItemById = (req, res, next, id) => {
  Items.findById(id).exec((err, pro) => {
    if (err || !pro) {
      return res.status(400).json({
        error: "Products not found",
      });
    }
    req.profile = pro;
    next();
  });
};

exports.hasAuthotization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action",
    });
  }
};

exports.allItem = async (req, res) => {
  try {
    const items = await Items.find({});
    res.send(items);
  } catch (error) {
    res.status(500);
  }
};

exports.getItem = async (req, res) => {
  const items = await Items.findOne({ _id: req.params.itemsId });
  return res.json(items);
};

exports.updateItem = async (req, res, next) => {
  let id = req.params.ItemId;
  var data = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
    features: req.body.features,
    gender: req.body.gender,
  };
  Items.findByIdAndUpdate(id, data, function (err, products) {
    if (err) throw err;
    res.json({ products });
  });
};

exports.deleteItem = async (req, res, next) => {
  const items = await Items.findOne({ _id: req.params.itemsId });
  Products.findByIdAndUpdate(
    items.products,
    { $pull: { product: items._id } },
    { safe: true, upsert: true },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        var review = items.review;
        for (var i = 0; i < review.length; i++) {
          Review.findByIdAndRemove(review[i], (err, product) => {
            if (err) return res.status(500).send(err);
          });
        }
        var comment = items.comments;
        for (var i = 0; i < comment.length; i++) {
          Comment.findByIdAndRemove(review[i], (err, product) => {
            if (err) return res.status(500).send(err);
          });
        }
        Items.findByIdAndRemove(items._id, (err, product) => {
          if (err) return res.status(500).send(err);
          const response = {
            message: "Item Deleted",
            id: product._id,
          };
          return res.status(200).send(response);
        });
      }
    }
  );
};

exports.create = async (req, res) => {
  const products = await Products.findOne({ _id: req.params.productsId });
  const items = await new Items(req.body);
  items.products = products._id;
  await items.save();
  products.product.push(items._id);
  await products.save();
  res.status(200).json({ items });
};

exports.allproductsitem = async (req, res) => {
  try {
    const product = await Products.findOne({ _id: req.params.productsId });
    const items = await Items.find({ products: product._id });
    res.send(items);
  } catch (error) {
    res.status(500);
  }
};

exports.allproductsitemitem = async (req, res) => {
  try {
    const product = await Products.findOne({ _id: req.params.productsId });
    const items = await Items.find({
      products: product._id,
      type: req.params.type,
    });
    res.send(items);
  } catch (error) {
    res.status(500);
  }
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

exports.search = async (req, res) => {
  try {
    if (req.body.name != null) {
      const regex = new RegExp(escapeRegex(req.body.name), "gi");
      const items = await Items.find({ name: regex });
      res.send(items);
    } else {
      const items = await Items.find({});
      res.send(items);
    }
  } catch (error) {
    res.status(500);
  }
};
