const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Handle HTTP responses and parse standard API envelopes
 */
async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage =
      data?.errors?.join(', ') ||
      data?.message ||
      `HTTP error ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return data;
}

/**
 * Fetch all events
 */
export const getEvents = async () => {
  const response = await fetch(`${API_BASE}/events`, {
    headers: { 'Accept': 'application/json' },
  });
  const result = await handleResponse(response);
  return result.data || [];
};

/**
 * Fetch single event by ID
 * @param {string|number} id
 */
export const getEvent = async (id) => {
  const response = await fetch(`${API_BASE}/events/${id}`, {
    headers: { 'Accept': 'application/json' },
  });
  const result = await handleResponse(response);
  return result.data;
};

/**
 * Create a new event
 * @param {{ name: string, date: string, details: string }} eventData
 */
export const createEvent = async (eventData) => {
  const response = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  const result = await handleResponse(response);
  return result.data;
};

/**
 * Update an existing event
 * @param {string|number} id
 * @param {{ name: string, date: string, details: string }} eventData
 */
export const updateEvent = async (id, eventData) => {
  const response = await fetch(`${API_BASE}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  const result = await handleResponse(response);
  return result.data;
};

/**
 * Delete an event
 * @param {string|number} id
 */
export const deleteEvent = async (id) => {
  const response = await fetch(`${API_BASE}/events/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json' },
  });
  const result = await handleResponse(response);
  return result.data;
};
