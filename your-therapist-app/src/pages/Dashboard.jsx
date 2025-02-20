// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="options-bar"> {/* Options at the top */}
          <div className="option" onClick={() => navigate('/ai-chatbot')}>
            <i className="fas fa-robot"></i>
            <span>AI Chatbot</span>
          </div>
          <div className="option" onClick={() => navigate('/community-forum')}>
            <i className="fas fa-users"></i>
            <span>Community Forum</span>
          </div>
          <div className="option" onClick={() => navigate('/therapist-booking')}>
            <i className="fas fa-calendar-alt"></i>
            <span>Therapist Booking</span>
          </div>
        </div>

        <div className="home-content"> {/* Home page content area */}
          <h1>Welcome to MindConnect, {user ? user.name : 'User'}!</h1>
          <p>
            This is the home page content of your MindConnect application.  You can
            add welcome text, information about your services, testimonials,
            or any other relevant content here.  This is where users will land
            after logging in.
          </p>

          {/* Example: Add some more home page content */}
          <h2>Our Mission</h2>
          <p>
            At MindConnect, our mission is to provide accessible and affordable
            mental health support to everyone. We believe that everyone deserves
            access to quality care, and we're committed to making that a reality.
          </p>

          <h2>Get Started</h2>
          <p>
              Explore our services using the options above.  Whether you're looking
              for AI-powered support, a supportive community, or to book a session
              with a therapist, we're here to help.
          </p>

        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;