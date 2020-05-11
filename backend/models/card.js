const mongoonse = require('mongoose');

const CardSchema = new mongoonse.Schema({
    user:{
        type: mongoonse.Schema.Types.ObjectId,
        ref: 'User'
      },
    product:{
      type: mongoonse.Schema.Types.ObjectId,
      ref: 'Product'
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: Date
});

module.exports = mongoonse.model('Card', CardSchema);
