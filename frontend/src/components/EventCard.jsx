import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDisplayDate, isUpcoming } from '../utils/dateFormatter';

export const EventCard = ({ event, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(`Are you sure you want to delete "${event.name}"?`);
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await onDelete(event.id);
    } catch (err) {
      alert(`Failed to delete event: ${err.message}`);
      setIsDeleting(false);
    }
  };

  const upcoming = isUpcoming(event.date);

  return (
    <article className="event-card">
      <div className="event-card-header">
        <span
          className="event-date-badge"
          style={{
            backgroundColor: upcoming ? 'var(--primary-light)' : '#f1f5f9',
            color: upcoming ? 'var(--primary-text)' : '#64748b',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {formatDisplayDate(event.date)}
        </span>
        <h3 className="event-card-title">{event.name}</h3>
      </div>

      <p className="event-card-details">{event.details}</p>

      <div className="event-card-actions">
        <Link to={`/events/${event.id}`} className="btn btn-secondary btn-sm" title="View details">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          View
        </Link>

        <Link to={`/events/${event.id}/edit`} className="btn btn-secondary btn-sm" title="Edit event">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
          Edit
        </Link>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="btn btn-danger btn-sm"
          style={{ marginLeft: 'auto' }}
          title="Delete event"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </article>
  );
};

export default EventCard;
