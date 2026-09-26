/**
 * Format date for display: "15 October 2026"
 * @param {string|Date} dateStr
 * @returns {string}
 */
export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Invalid Date';

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

/**
 * Format date for HTML date input: "YYYY-MM-DD"
 * @param {string|Date} dateStr
 * @returns {string}
 */
export const formatInputDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format timestamp with time: "26 Sep 2026, 10:30 AM"
 * @param {string|Date} dateStr
 * @returns {string}
 */
export const formatDateTime = (dateStr) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Invalid Date';

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Check if date is in the future
 * @param {string|Date} dateStr
 * @returns {boolean}
 */
export const isUpcoming = (dateStr) => {
  if (!dateStr) return false;
  const target = new Date(dateStr);
  const now = new Date();
  return target.getTime() >= now.setHours(0, 0, 0, 0);
};
