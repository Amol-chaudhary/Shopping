const _ = require('lodash');
const Products = require('../models/Products');

exports.ProductsById = (req, res, next, id) => {
  Products.findById(id).exec((err, pro) => {
    if (err || !pro) {
      return res.status(400).json({
        error: 'Products not found'
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
      error: 'User is not authorized to perform this action'
    });
  }
};

exports.allProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.send(products);
  } catch (error) {
    res.status(500);
  }
};

exports.getProducts = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  exports.product = req.profile.name;
  return res.json(req.profile);
};

exports.updateProducts = async (req, res, next) => {
  let id = req.params.productsId;
  var data = {
    name: req.body.name,
    description: req.body.description
  };
  Products.findByIdAndUpdate(id, data, function(err, products) {
    if (err) throw err;
    res.json({ products });
  });
};

exports.deleteProducts = (req, res, next) => {
  let products = req.profile;
  Products.remove((err, products) => {
    if (err) {
      return res.status(400).json({
        error: 'Not access'
      });
    }
    res.json({ message: 'Products delete successfully' });
  });
};

exports.create = async (req, res) => {
  const products = await new Products(req.body);
  await products.save();
  res.status(200).json({ products });
};
