const { errorResponse } = require('../utils/response');

/**
 * Validates request payload for creating/updating an event
 */
const validateEventPayload = (req, res, next) => {
  const { name, date, details } = req.body;
  const errors = [];

  // Validate Name
  if (name === undefined || name === null || typeof name !== 'string' || name.trim() === '') {
    errors.push('Event name is required and cannot be empty');
  } else if (name.trim().length > 200) {
    errors.push('Event name must not exceed 200 characters');
  }

  // Validate Date
  if (date === undefined || date === null || String(date).trim() === '') {
    errors.push('Event date is required');
  } else {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Event date must be a valid date format (e.g. YYYY-MM-DD or ISO 8601)');
    }
  }

  // Validate Details
  if (details === undefined || details === null || typeof details !== 'string' || details.trim() === '') {
    errors.push('Event details are required and cannot be empty');
  }

  if (errors.length > 0) {
    return errorResponse(res, 400, 'Validation failed', errors);
  }

  // Sanitize trimmed values onto request
  req.body.name = name.trim();
  req.body.details = details.trim();
  req.body.parsedDate = new Date(date);

  next();
};

/**
 * Validates route parameter :id as a positive integer
 */
const validateEventId = (req, res, next) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId) || parsedId <= 0 || String(parsedId) !== String(id)) {
    return errorResponse(res, 400, 'Invalid event ID. ID must be a positive integer');
  }

  req.params.parsedId = parsedId;
  next();
};

module.exports = {
  validateEventPayload,
  validateEventId,
};
