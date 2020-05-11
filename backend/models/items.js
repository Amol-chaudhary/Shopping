const mongoonse = require("mongoose");

const ItemsSchema = new mongoonse.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: String,
    trim: true,
    required: true,
  },
  imageData: {
    type: String,
    trim: true,
  },
  rating: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
  features: {
    type: String,
    trim: true,
    required: true,
  },
  products: {
    type: mongoonse.Schema.Types.ObjectId,
    ref: "Products",
  },
  review: [
    {
      type: mongoonse.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  comments: [
    {
      type: mongoonse.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

module.exports = mongoonse.model("Items", ItemsSchema);
