const { errorResponse } = require('../utils/response');

/**
 * 404 Route Not Found Middleware
 */
const notFoundHandler = (req, res, next) => {
  return errorResponse(res, 404, `Route ${req.method} ${req.originalUrl} not found`);
};

/**
 * Global Exception Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.name || 'UnknownError'}: ${err.message}`);

  // Handle Bad JSON syntax in request body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return errorResponse(res, 400, 'Invalid JSON payload received');
  }

  // Handle Prisma Known Request Errors
  if (err.code === 'P2025') {
    return errorResponse(res, 404, 'The requested record was not found');
  }

  if (err.code === 'P2002') {
    return errorResponse(res, 409, 'A record with this unique field already exists');
  }

  // Default Internal Server Error
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' && statusCode === 500
    ? 'Internal server error'
    : err.message || 'Internal server error';

  return errorResponse(res, statusCode, message);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
