import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Settings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      navigate('/auth');
      return;
    }

    if (storedUsername) {
      setUsername(storedUsername);
      // Determine account type based on username starting letter
      const firstLetter = storedUsername.charAt(0).toLowerCase();
      if (firstLetter === 'y') {
        setAccountType('Premium');
      } else if (firstLetter === 'f') {
        setAccountType('Free');
      } else {
        setAccountType('Standard');
      }
    }
  }, [navigate]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/change_password', {
        user_id: localStorage.getItem('user_id'),
        current_password: currentPassword,
        new_password: newPassword,
      });
      setMessage(response.data.message);
      if (response.status === 200) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Failed to change password');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#003366', color: 'white', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Settings</h1>

        {/* Profile Section */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', backgroundColor: '#004080', padding: '1rem', borderRadius: '8px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#003366',
              marginRight: '1rem',
            }}
          >
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ margin: '0 0 0.5rem 0' }}>{username}</h2>
            <p style={{ margin: 0, color: '#ccc' }}>Account Type: {accountType}</p>
          </div>
        </div>

        {/* Change Password Section */}
        <div style={{ backgroundColor: '#004080', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Current Password:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  color: '#003366',
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  color: '#003366',
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Confirm New Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  color: '#003366',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                color: '#003366',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Change Password
            </button>
          </form>
          {message && <p style={{ color: 'red', marginTop: '1rem' }}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Settings;