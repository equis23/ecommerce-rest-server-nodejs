const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title can not be more than 100 characters'],
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description can not be more than 1000 characters'],
  },
  code: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Please provide a code'],
    maxlength: [20, 'Code  can not be more than 20 characters'],
  },
  price: {
    type: mongoose.Schema.Types.Number,
    required: [true, 'Please provide a price'],
    default: 0,
  },
  status: {
    type: mongoose.Schema.Types.Boolean,
    default: true,
    required: [true, 'Please provide an status'],
  },
  stock: {
    type: mongoose.Schema.Types.Number,
    required: [true, 'Please provide stock qty number'],
    defaultl: 0,
  },
  category: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Please provide a category'],
  },
  thumbnails: {
    type: [mongoose.Schema.Types.String],
    default: [],
  },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
