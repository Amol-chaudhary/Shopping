const mongoonse = require('mongoose');

const ProductsSchema = new mongoonse.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  product: [
    {
      type: mongoonse.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

module.exports = mongoonse.model('Products', ProductsSchema);
