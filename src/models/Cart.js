const mongoose = require('mongoose');

const SingleProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide an id product'],
  },
  qty: {
    type: mongoose.Schema.Types.Number,
    default: 1,
    required: [true, 'Please provide a qty for product'],
  },
});

const CartSchema = new mongoose.Schema({
  products: {
    type: [SingleProductSchema],
    default: [],
  },
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
