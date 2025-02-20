import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import your CSS file

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (response) => {
    try {
      const decoded = JSON.parse(atob(response.credential.split('.')[1]));
      setUser(decoded);
      localStorage.setItem('user', JSON.stringify(decoded));
      navigate('/dashboard');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <div className="login-page">
      <div className="login-container"> {/* Container for content */}
        <h1 className="app-title">MindConnect</h1>
        <p className="tagline">Connecting Minds, Empowering Growth</p> {/* Add a tagline */}

        {!user ? (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
          />
        ) : (
          <div>
            <p>Welcome, {user.name}!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;