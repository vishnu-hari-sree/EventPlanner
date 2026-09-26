import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEvent, updateEvent } from '../services/eventService';
import EventForm from '../components/EventForm';
import Loading from '../components/Loading';

export const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleUpdate = async (formData) => {
    await updateEvent(id, formData);
    navigate(`/events/${id}`);
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

  return (
    <div style={{ maxWidth: 650, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to={`/events/${id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            marginBottom: '0.5rem',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to Event Details
        </Link>
        <h1 className="page-title">Edit Event</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
          Update the event parameters below. Changes will be saved directly to the database.
        </p>
      </div>

      <EventForm
        initialData={event}
        onSubmit={handleUpdate}
        submitText="Save Changes"
      />
    </div>
  );
};

export default EditEvent;
