const mongoonse = require('mongoose');

const TransactionSchema = new mongoonse.Schema({
    user:{
        type: mongoonse.Schema.Types.ObjectId,
        ref: 'User'
      },
    product:{
      type: mongoonse.Schema.Types.ObjectId,
      ref: 'Product'
    },
    cost:{
        type: String,
        trim: true,
        required: true
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: Date
});

module.exports = mongoonse.model('Transaction', TransactionSchema);
