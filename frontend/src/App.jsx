import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import EventDetails from './pages/EventDetails';

export const App = () => {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/edit" element={<EditEvent />} />
          <Route
            path="*"
            element={
              <div className="empty-state">
                <h3>404 - Page Not Found</h3>
                <p>The page you are looking for does not exist.</p>
                <Link to="/" className="btn btn-primary">
                  Go to Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>
          EventHub — Event Management System &copy; {new Date().getFullYear()}. Built with React, Vite, Node.js, Express & Prisma.
        </p>
      </footer>
    </div>
  );
};

export default App;
