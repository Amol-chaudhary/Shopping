const _ = require('lodash');
const Transaction = require('../models/transaction');

exports.transactionById = (req, res, next, id) => {
    Transaction.findById(id).exec((err, pro) => {
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

exports.alltransaction = async (req, res) => {
  try {
    const transaction = await Transaction.find({});
    res.send(transaction);
  } catch (error) {
    res.status(500);
  }
};

exports.gettransaction = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updatetransaction = async (req, res, next) => {
  let id = req.params.transactionId;
  var data = {
    cost: req.body.cost
  };
  Transaction.findByIdAndUpdate(id, data, function(err, products) {
    if (err) throw err;
    res.json({ products });
  });
};

exports.deletetransaction = (req, res, next) => {
  let products = req.profile;
  Transaction.remove((err, products) => {
    if (err) {
      return res.status(400).json({
        error: 'Not access'
      });
    }
    res.json({ message: 'Transaction delete successfully' });
  });
};

exports.create = async (req, res) => {
  const transaction = await new Transaction(req.body);
  await transaction.save();
  res.status(200).json({ transaction });
};
