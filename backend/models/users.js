const mongoonse = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoonse.Schema({
  first: {
    type: String,
    trim: true,
    required: true
  },
  last: {
    type: String,
    trim: true,
    required: true
  },
  nickname: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  gender: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: String,
    trim: true,
    required: true
  },
  city: {
    type: String,
    trim: true,
    required: true
  },
  state: {
    type: String,
    trim: true,
    required: true
  },
  address_1: {
    type: String,
    trim: true,
    required: true
  },
  address_2: {
    type: String,
    trim: true,
    required: true
  },
  pincode: {
    type: String,
    trim: true,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  access_role: {
    type: String,
    required: true
  },
  card:[
  {
    type: mongoonse.Schema.Types.ObjectId,
    ref: 'Card'
  }
],
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

userSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });
userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }
};

module.exports = mongoonse.model('User', userSchema);
