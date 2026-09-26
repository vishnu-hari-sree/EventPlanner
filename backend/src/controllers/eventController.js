const eventService = require('../services/eventService');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * Controller handling Event HTTP operations
 */
class EventController {
  /**
   * GET /api/events
   * Get all events
   */
  async getEvents(req, res, next) {
    try {
      const events = await eventService.getAllEvents();
      return successResponse(res, 200, 'Events retrieved successfully', events, {
        count: events.length,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/events/:id
   * Get a single event by ID
   */
  async getEventById(req, res, next) {
    try {
      const { parsedId } = req.params;
      const event = await eventService.getEventById(parsedId);

      if (!event) {
        return errorResponse(res, 404, `Event with ID ${parsedId} not found`);
      }

      return successResponse(res, 200, 'Event retrieved successfully', event);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/events
   * Create a new event
   */
  async createEvent(req, res, next) {
    try {
      const { name, parsedDate, details } = req.body;
      const newEvent = await eventService.createEvent({
        name,
        date: parsedDate,
        details,
      });

      return successResponse(res, 201, 'Event created successfully', newEvent);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/events/:id
   * Update an existing event
   */
  async updateEvent(req, res, next) {
    try {
      const { parsedId } = req.params;
      const { name, parsedDate, details } = req.body;

      // Check existence first
      const existing = await eventService.getEventById(parsedId);
      if (!existing) {
        return errorResponse(res, 404, `Event with ID ${parsedId} not found`);
      }

      const updatedEvent = await eventService.updateEvent(parsedId, {
        name,
        date: parsedDate,
        details,
      });

      return successResponse(res, 200, 'Event updated successfully', updatedEvent);
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/events/:id
   * Delete an event
   */
  async deleteEvent(req, res, next) {
    try {
      const { parsedId } = req.params;

      // Check existence first
      const existing = await eventService.getEventById(parsedId);
      if (!existing) {
        return errorResponse(res, 404, `Event with ID ${parsedId} not found`);
      }

      await eventService.deleteEvent(parsedId);

      return successResponse(res, 200, 'Event deleted successfully', { id: parsedId });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EventController();
