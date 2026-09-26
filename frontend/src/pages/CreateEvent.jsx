import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createEvent } from '../services/eventService';
import EventForm from '../components/EventForm';

export const CreateEvent = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    await createEvent(formData);
    navigate('/events');
  };

  return (
    <div style={{ maxWidth: 650, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/events"
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
          Back to Events
        </Link>
        <h1 className="page-title">Create New Event</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
          Fill in the information below to schedule and save a new event.
        </p>
      </div>

      <EventForm onSubmit={handleCreate} submitText="Create Event" />
    </div>
  );
};

export default CreateEvent;
