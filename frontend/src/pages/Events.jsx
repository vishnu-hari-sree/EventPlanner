import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { deleteEvent } from '../services/eventService';
import EventList from '../components/EventList';
import Loading from '../components/Loading';

export const Events = () => {
  const { events, loading, error, refresh, removeEvent } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    if (!searchTerm.trim()) return events;
    const term = searchTerm.toLowerCase();
    return events.filter(
      (e) =>
        e.name.toLowerCase().includes(term) ||
        (e.details && e.details.toLowerCase().includes(term))
    );
  }, [events, searchTerm]);

  const handleDelete = async (id) => {
    await deleteEvent(id);
    removeEvent(id);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Events</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Manage and view all registered events ({events.length} total)
          </p>
        </div>

        <Link to="/events/create" className="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Event
        </Link>
      </div>

      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search events by name or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button onClick={refresh} className="btn btn-secondary" title="Refresh event list">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>Failed to load events: {error}</span>
          <button onClick={refresh} className="btn btn-secondary btn-sm">
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <Loading text="Retrieving events from server..." />
      ) : (
        <EventList
          events={filteredEvents}
          onDelete={handleDelete}
          isFiltered={Boolean(searchTerm.trim())}
        />
      )}
    </div>
  );
};

export default Events;
