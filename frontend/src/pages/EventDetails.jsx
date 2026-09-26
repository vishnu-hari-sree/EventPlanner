import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEvent, deleteEvent } from '../services/eventService';
import { formatDisplayDate, formatDateTime, isUpcoming } from '../utils/dateFormatter';
import Loading from '../components/Loading';

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await getEvent(id);
        setEvent(data);
      } catch (err) {
        setError(err.message || 'Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to permanently delete "${event.name}"?`);
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deleteEvent(id);
      navigate('/events');
    } catch (err) {
      alert(`Failed to delete event: ${err.message}`);
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <Loading text="Loading event details..." />;
  }

  if (error || !event) {
    return (
      <div className="alert alert-error" style={{ maxWidth: 650, margin: '2rem auto' }}>
        <span>{error || 'Event not found'}</span>
        <Link to="/events" className="btn btn-secondary btn-sm">
          Return to Events
        </Link>
      </div>
    );
  }

  const upcoming = isUpcoming(event.date);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Link
        to="/events"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          marginBottom: '1rem',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Events
      </Link>

      <div className="details-card">
        <div style={{ marginBottom: '1.25rem' }}>
          <span
            className="event-date-badge"
            style={{
              backgroundColor: upcoming ? 'var(--primary-light)' : '#f1f5f9',
              color: upcoming ? 'var(--primary-text)' : '#64748b',
              fontSize: '0.85rem',
            }}
          >
            {upcoming ? 'Upcoming Event' : 'Past Event'}
          </span>
          <h1 className="details-title">{event.name}</h1>
        </div>

        <div className="details-meta-row">
          <div className="meta-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <div>
              <strong>Date:</strong> {formatDisplayDate(event.date)}
            </div>
          </div>

          <div className="meta-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <div>
              <strong>Event ID:</strong> #{event.id}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            Details
          </h3>
          <div className="details-body">{event.details}</div>
        </div>

        <div className="details-timestamps">
          <div>
            Created: {formatDateTime(event.createdAt)}
          </div>
          {event.updatedAt && (
            <div>
              Last Updated: {formatDateTime(event.updatedAt)}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <Link to={`/events/${id}/edit`} className="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            Edit Event
          </Link>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn btn-danger"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            {isDeleting ? 'Deleting...' : 'Delete Event'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
