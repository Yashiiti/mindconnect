// src/pages/TherapistBooking.jsx
import React, { useState } from 'react';
import './TherapistBooking.css'; // Import CSS

const TherapistBooking = () => {
  const [therapists, setTherapists] = useState([
    {
      id: 1,
      name: 'Dr. Emily Carter',
      specialization: 'Cognitive Behavioral Therapy',
      image: 'https://via.placeholder.com/150', // Placeholder image
      available: true,
    },
    {
      id: 2,
      name: 'Dr. David Lee',
      specialization: 'Family Therapy',
      image: 'https://via.placeholder.com/150', // Placeholder image
      available: false,
    },
    {
      id: 3,
      name: 'Dr. Sarah Jones',
      specialization: 'Anxiety Management',
      image: 'https://via.placeholder.com/150', // Placeholder image
      available: true,
    },
    // Add more therapists here...
  ]);

  const [selectedTherapist, setSelectedTherapist] = useState(null); // State for selected therapist
  const [showBookingForm, setShowBookingForm] = useState(false); // State to show/hide booking form

  const handleBookClick = (therapist) => {
    setSelectedTherapist(therapist); // Set the selected therapist
    setShowBookingForm(true); // Show the booking form
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false); // Hide the form
    setSelectedTherapist(null); // Reset selected therapist
  };


  return (
    <div className="therapist-booking-page">
      <h1>Therapist Booking</h1>

      <div className="therapist-list">
        {therapists.map((therapist) => (
          <div key={therapist.id} className={`therapist-card ${therapist.available ? '' : 'unavailable'}`}>
            <img src={therapist.image} alt={therapist.name} className="therapist-image" />
            <div className="therapist-details">
              <h3>{therapist.name}</h3>
              <p>{therapist.specialization}</p>
              <button onClick={() => handleBookClick(therapist)} disabled={!therapist.available}>
                {therapist.available ? 'Book' : 'Unavailable'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form (Conditional Rendering) */}
      {showBookingForm && selectedTherapist && (
        <div className="booking-form">
          <h2>Book an Appointment with {selectedTherapist.name}</h2>
          {/* Add your booking form elements here (e.g., date, time, message) */}
            <form>
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" required /><br />

                <label htmlFor="time">Time:</label>
                <input type="time" id="time" name="time" required /><br />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="4" cols="50" required></textarea><br />

                <button type="submit">Submit Booking Request</button>
            </form>
          <button onClick={handleCloseBookingForm}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TherapistBooking;