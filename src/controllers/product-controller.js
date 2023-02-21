const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getSingleProduct = async (req, res) => {
  const pid = req.params.pid;
  const product = await Product.findOne({ _id: pid });
  if (product) res.status(StatusCodes.OK).json({ product });
  throw new CustomError.NotFoundError(`No product with id: ${pid}`);
};

const updateProduct = async (req, res) => {
  const pid = req.params.pid;
  const product = await Product.findOneAndUpdate({ _id: pid }, req.body, {
    new: true,
    runValidators: true,
  });
  if (product) res.status(StatusCodes.OK).json({ product });
  throw new CustomError.NotFoundError(`No product with id: ${pid}`);
};

const deleteProduct = async (req, res) => {
  const pid = req.params.pid;
  const product = await Product.findOne({ _id: pid });
  if (!product)
    throw new CustomError.NotFoundError(`No product with id: ${pid}`);
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: 'Product removed successfully' });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ count: products.length, products });
};

module.exports = {
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
