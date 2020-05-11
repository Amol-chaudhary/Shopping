const express = require("express");
const {
  CommentById,
  allComment,
  create,
  allproductcomment,
  updateComment,
  deleteComment,
} = require("../controllers/comment");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.get("/comment", allComment);
router.post("/comment/create/:itemId", create);
router.put("/comment/:commentId", updateComment);
router.delete("/comment/:commentId", deleteComment);
router.get("/comment/data/:itemId", allproductcomment);

router.param("productId", CommentById);

module.exports = router;
