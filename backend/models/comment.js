const mongoonse = require("mongoose");

const CommentSchema = new mongoonse.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  product: {
    type: mongoonse.Schema.Types.ObjectId,
    ref: "Items",
  },
  question: {
    type: String,
    trim: true,
    required: true,
  },
  answer: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now,
  },
 
  updated: Date,
});

module.exports = mongoonse.model("Comment", CommentSchema);
