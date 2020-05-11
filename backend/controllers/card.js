const _ = require("lodash");
const Card = require("../models/card");
const User = require("../models/users");

exports.cardById = (req, res, next, id) => {
  Card.findById(id).exec((err, card) => {
    if (err || !card) {
      return res.status(400).json({
        error: "Card not found",
      });
    }
    req.profile = card;
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

exports.allcard = async (req, res) => {
  try {
    const card = await Card.find({});
    res.send(card);
  } catch (error) {
    res.status(500);
  }
};

exports.getcard = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.deletecard = async (req, res, next) => {
  const card = await Card.findOne({ _id: req.params.cardId });
  User.findByIdAndUpdate(
    card.user,
    { $pull: { card: card._id } },
    { safe: true, upsert: true },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        Card.findByIdAndRemove(card._id, (err, product) => {
          if (err) return res.status(500).send(err);
          const response = {
            message: "card Deleted",
            id: product._id,
          };
          return res.status(200).send(response);
        });
      }
    }
  );
};

exports.create = async (req, res) => {
  const card = await new Card(req.body);
  await card.save();
  const user = await User.findOne({ _id: req.body.user });
  user.card.push(card._id);
  user.save();
  res.status(200).json({ card });
};
