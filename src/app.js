const express = require('express');
const httpStatus = require('http-status');
const morgan = require('./config/morgan');
const config = require('./config/config');
const ApiError = require('./utils/ApiError');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

//  parse json request body
app.use(express.json());

app.use(express.static('public'));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// v1 api routes
app.use('/v1', routes);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
