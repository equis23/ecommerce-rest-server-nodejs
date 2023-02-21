const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');

const createCart = async (req, res) => {
  const items = req.body;
  if (!items || !Array.isArray(items)) items = [];
  const products = [];
  for (const item of items) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id: ${item.product}`,
      );
    }
    let singleProduct = {
      product: dbProduct._id,
      qty: item.qty ? item.qty : 1,
    };
    products.push(singleProduct);
  }
  const cart = await Cart.create({ products });
  res.status(StatusCodes.CREATED).json({ cart });
};

const getSingleCart = async (req, res) => {
  const cid = req.params.cid;
  const cart = await Cart.findOne({ _id: cid });
  if (cart) res.status(StatusCodes.OK).json({ cart });
  throw new CustomError.NotFoundError(`No cart with id: ${cid}`);
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await Cart.findOne({ _id: cid });
  const product = await Product.findOne({ _id: cid });
  if (!cart) throw new CustomError.NotFoundError(`No cart with id: ${cid}`);
  if (!product)
    throw new CustomError.NotFoundError(`No product with id: ${pid}`);
};

const getAllCarts = async (req, res) => {
  const carts = await Cart.find({});
  res.status(StatusCodes.OK).json({ count: carts.length, carts });
};

module.exports = {
  createCart,
  getSingleCart,
  addProductToCart,
  getAllCarts,
};
