const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
require('express-async-errors');

const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const authRouter = require('./routes/auth-routes');
const productRouter = require('./routes/product-routes');
const cartRouter = require('./routes/cart-routes');

const connectDB = require('./db/connect');

const app = express();

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(
      process.env.PORT,
      console.log(
        `server up and running at http://localhost:${process.env.PORT}`,
      ),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
