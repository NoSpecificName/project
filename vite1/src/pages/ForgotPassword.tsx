import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/forgot_password', {
        email,
      });
      setMessage(response.data.message);
      setResetToken(response.data.reset_token);
      setStep(2);
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Request failed');
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/reset_password', {
        reset_token: resetToken,
        new_password: newPassword,
      });
      setMessage(response.data.message);
      setStep(1);
      setEmail('');
      setResetToken('');
      setNewPassword('');
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Reset failed');
    }
  };

  return (
    <div style={{ minHeight: '120vh', display: 'flex', flexDirection: 'column', padding: '2rem', width: '100%', backgroundColor: '#003366', color: 'white' }}>
      <h2 style={{ textAlign: 'center' }}>Forgot Password</h2>
      {step === 1 ? (
        <form onSubmit={handleForgot} style={{ flex: 1, maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: '#003366', border: 'none', borderRadius: '4px', width: '100%' }}>Send Reset Token</button>
        </form>
      ) : (
        <form onSubmit={handleReset} style={{ flex: 1, maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Reset Token:</label>
            <input
              type="text"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: '#003366', border: 'none', borderRadius: '4px', width: '100%' }}>Reset Password</button>
        </form>
      )}
      {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
      <p style={{ textAlign: 'center' }}><Link to="/auth" style={{ color: 'white' }}>Back to Login</Link></p>
    </div>
  );
};

export default ForgotPassword;