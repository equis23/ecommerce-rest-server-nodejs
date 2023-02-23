const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
require('express-async-errors');

const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const authRouter = require('./routes/auth-routes');
const productRouter = require('./routes/product-routes');
const cartRouter = require('./routes/cart-routes');
const webRouter = require('./routes/web-routes');

const connectDB = require('./db/connect');
const websockets = require('./utils');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const realtime = io.of('realtime');
websockets(realtime);

app.engine('handlebars', exphbs.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);
app.use(express.json());
app.use(cors());

app.use('/', webRouter);
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(
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
