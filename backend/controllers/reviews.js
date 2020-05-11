const _ = require("lodash");
const Review = require("../models/reviews");
const Items = require("../models/items");

exports.ReviewById = (req, res, next, id) => {
  Review.findById(id).exec((err, pro) => {
    if (err || !pro) {
      return res.status(400).json({
        error: "item not found",
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

exports.allReview = async (req, res) => {
  try {
    const review = await Review.find({});
    res.send(review);
  } catch (error) {
    res.status(500);
  }
};

exports.create = async (req, res) => {
  const items = await Items.findOne({ _id: req.params.itemId });
  const reviews = await new Review(req.body);
  reviews.product = items._id;
  await reviews.save();
  items.review.push(reviews._id);
  await items.save();
  res.status(200).json({ reviews });
};

exports.allproductreview = async (req, res) => {
  try {
    const id = await Items.findOne({ _id: req.params.itemId });
    const review = await Review.find({ product: id._id });
    res.send(review);
  } catch (error) {
    res.status(500);
  }
};

exports.deletereview = (req, res) => {
  Review.findByIdAndRemove(req.params.reviewId, (err, product) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "review Deleted",
      id: product._id,
    };
    return res.status(200).send(response);
  });
};
