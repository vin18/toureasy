import ErrorHandler from '../utils/error-handler';
import { StatusCodes } from 'http-status-codes';

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  let error = { ...err };
  error.message = err.message;

  // Handle wrong mongoose object id error 
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
  }

  // Handle mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(value => value.message);
    error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
  }

  res.status(err.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack
  })
}