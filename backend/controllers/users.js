const _ = require("lodash");
const User = require("../models/users");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
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

exports.allUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    res.status(500);
  }
};

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = async (req, res, next) => {
  let id = req.params.userId;
  var data = {
    first: req.body.first,
    last: req.body.last,
    nickname: req.body.nickname,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    phone: req.body.phone,
    city: req.body.city,
    address_1: req.body.address_1,
    address_2: req.body.address_2,
    state: req.body.state,
    pincode: req.body.pincode,
    phone: req.body.phone,
  };
  User.findByIdAndUpdate(id, data, function (err, users) {
    if (err) throw err;
    res.json({ users });
  });
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Not access",
      });
    }
    res.json({ message: "User delete successfully" });
  });
};

exports.create = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      error: "Email is taken!",
    });
  const user = await new User(req.body);
  user.access_role = "view";
  await user.save();
  res.status(200).json({ user });
};
