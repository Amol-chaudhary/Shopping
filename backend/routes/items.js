const express = require("express");
const {
  ItemById,
  allItem,
  getItem,
  updateItem,
  deleteItem,
  create,
  allproductsitem,
  allproductsitemitem,
  search,
} = require("../controllers/items");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.get("/items", allItem);
router.post("/items/create/:productsId", create);
router.get("/items/:itemsId", getItem);
router.get("/items/data/:productsId", allproductsitem);
router.get("/items/data/:productsId/:type", allproductsitemitem);
router.put("/items/:itemsId", updateItem);
router.delete("/items/:itemsId", deleteItem);
router.post("/items/search", search);

router.param("productId", ItemById);

module.exports = router;
