/**
 * Standard Success Response Helper
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {any} data
 * @param {object} meta
 */
const successResponse = (res, statusCode = 200, message = 'Success', data = null, meta = {}) => {
  const payload = {
    success: true,
    message,
    ...(data !== null && { data }),
    ...meta,
  };
  return res.status(statusCode).json(payload);
};

/**
 * Standard Error Response Helper
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {Array|null} errors
 */
const errorResponse = (res, statusCode = 500, message = 'An error occurred', errors = null) => {
  const payload = {
    success: false,
    message,
    ...(errors && { errors }),
  };
  return res.status(statusCode).json(payload);
};

module.exports = {
  successResponse,
  errorResponse,
};
