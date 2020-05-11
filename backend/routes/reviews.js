const express = require("express");
const {
  ReviewById,
  allReview,
  create,
  allproductreview,
  deletereview
} = require("../controllers/reviews");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.get("/review", allReview);
router.post("/review/create/:itemId", create);
router.get("/review/data/:itemId", allproductreview);
router.delete("/review/:reviewId", deletereview);


router.param("productId", ReviewById);

module.exports = router;
