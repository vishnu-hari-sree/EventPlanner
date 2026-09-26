import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';

export const EventList = ({ events, onDelete, isFiltered = false }) => {
  if (events.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <h3>{isFiltered ? 'No matching events found' : 'No events scheduled yet'}</h3>
        <p>
          {isFiltered
            ? 'Try changing your search query or clear the filter.'
            : 'Get started by creating your very first event in the system.'}
        </p>
        {!isFiltered && (
          <Link to="/events/create" className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create Event
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="events-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default EventList;
