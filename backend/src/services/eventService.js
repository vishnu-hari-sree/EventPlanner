const prisma = require('../config/database');

/**
 * Service handling all Event database operations via Prisma
 */
class EventService {
  /**
   * Fetch all events ordered by event date ascending
   */
  async getAllEvents() {
    return await prisma.event.findMany({
      orderBy: {
        date: 'asc',
      },
    });
  }

  /**
   * Fetch a single event by ID
   * @param {number} id
   */
  async getEventById(id) {
    return await prisma.event.findUnique({
      where: { id },
    });
  }

  /**
   * Create a new event
   * @param {{ name: string, date: Date, details: string }} data
   */
  async createEvent(data) {
    return await prisma.event.create({
      data: {
        name: data.name,
        date: data.date,
        details: data.details,
      },
    });
  }

  /**
   * Update an existing event by ID
   * @param {number} id
   * @param {{ name: string, date: Date, details: string }} data
   */
  async updateEvent(id, data) {
    return await prisma.event.update({
      where: { id },
      data: {
        name: data.name,
        date: data.date,
        details: data.details,
      },
    });
  }

  /**
   * Delete an event by ID
   * @param {number} id
   */
  async deleteEvent(id) {
    return await prisma.event.delete({
      where: { id },
    });
  }
}

module.exports = new EventService();
