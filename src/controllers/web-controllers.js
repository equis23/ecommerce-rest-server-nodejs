const Product = require('../models/Product');

const index = async (req, res) => {
  const data = await Product.find({});
  const products = data.map((doc) => doc.toObject());
  res.render('index', {
    products,
    title: 'index page',
    layout: 'main',
  });
};

const realtime = async (req, res) => {
  res.render('realTimeProducts', {
    title: 'real time page',
    layout: 'main',
  });
};

module.exports = {
  index,
  realtime,
};
