const _ = require("lodash");
const Comment = require("../models/comment");
const Items = require("../models/items");

exports.CommentById = (req, res, next, id) => {
  Comment.findById(id).exec((err, pro) => {
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

exports.allComment = async (req, res) => {
  try {
    const comment = await Comment.find({});
    res.send(comment);
  } catch (error) {
    res.status(500);
  }
};

exports.create = async (req, res) => {
  const items = await Items.findOne({ _id: req.params.itemId });
  const comment = await new Comment(req.body);
  comment.product = items._id;
  await comment.save();
  items.comments.push(comment._id);
  await items.save();
  res.status(200).json({ comment });
};

exports.allproductcomment = async (req, res) => {
  try {
    const id = await Items.findOne({ _id: req.params.itemId });
    const comment = await Comment.find({ product: id._id });
    res.send(comment);
  } catch (error) {
    res.status(500);
  }
};
exports.updateComment = async (req, res, next) => {
    let id = req.params.commentId;
    var data = {
        username: req.body.username,
        question: req.body.question,
        answer: req.body.answer
    };
    Comment.findByIdAndUpdate(id, data, function(err, products) {
      if (err) throw err;
      res.json({ products });
    });
  };

  exports.deleteComment = (req,res)=>{
    Comment.findByIdAndRemove(req.params.commentId, (err, product) => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "card Deleted",
        id: product._id,
      };
      return res.status(200).send(response);
    });
  }
