const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { validateEventPayload, validateEventId } = require('../middleware/validateEvent');

/**
 * Event Routes
 * Base: /api/events
 */

// GET /api/events - List all events
router.get('/', eventController.getEvents);

// GET /api/events/:id - Get single event by id
router.get('/:id', validateEventId, eventController.getEventById);

// POST /api/events - Create new event
router.post('/', validateEventPayload, eventController.createEvent);

// PUT /api/events/:id - Update existing event
router.put('/:id', validateEventId, validateEventPayload, eventController.updateEvent);

// DELETE /api/events/:id - Delete an event
router.delete('/:id', validateEventId, eventController.deleteEvent);

module.exports = router;
