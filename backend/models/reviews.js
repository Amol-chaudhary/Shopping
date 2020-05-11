const mongoonse = require("mongoose");

const ReviewSchema = new mongoonse.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  product: {
    type: mongoonse.Schema.Types.ObjectId,
    ref: "Items",
  },
  feedback: {
    type: String,
    trim: true,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
 
  updated: Date,
});

module.exports = mongoonse.model("Review", ReviewSchema);
