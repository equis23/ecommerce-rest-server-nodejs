const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Please provide a name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Please provide an email'],
    validate: {
      message: 'Please provide a valid email',
      validator: validator.isEmail,
    },
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Please provide password'],
  },
  role: {
    type: mongoose.Schema.Types.String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidate) {
  const isMatch = await bcrypt.compare(candidate, this.password);
  return isMatch;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
