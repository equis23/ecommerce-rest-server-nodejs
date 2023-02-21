const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Looks like there is a problem, try again fella!',
  };
  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
  }
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue,
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
