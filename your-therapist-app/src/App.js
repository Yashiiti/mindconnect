import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './pages/Dashboard';
import AIChatbot from './pages/AIChatbot'; // Import new components
import CommunityForum from './pages/CommunityForum';
import TherapistBooking from './pages/TherapistBooking';
import './App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('user');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/ai-chatbot" element={isAuthenticated ? <AIChatbot /> : <Navigate to="/" />} /> {/* New routes */}
        <Route path="/community-forum" element={isAuthenticated ? <CommunityForum /> : <Navigate to="/" />} />
        <Route path="/therapist-booking" element={isAuthenticated ? <TherapistBooking /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;