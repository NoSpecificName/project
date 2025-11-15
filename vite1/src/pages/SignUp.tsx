import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password,
      });
      setMessage(`${response.data.message} Account Code: ${response.data.account_code}`);
      if (response.status === 201) {
        navigate('/auth'); // Navigate to auth page which has login
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Sign up failed');
    }
  };

  return (
    <div style={{ minHeight: '120vh', display: 'flex', flexDirection: 'column', padding: '2rem', width: '100%', backgroundColor: '#003366', color: 'white' }}>
      <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{ flex: 1, maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
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
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: '#003366', border: 'none', borderRadius: '4px', width: '100%' }}>Sign Up</button>
      </form>
      {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
      <p style={{ textAlign: 'center' }}>Already have an account? <Link to="/auth" style={{ color: 'white' }}>Login</Link></p>
    </div>
  );
};

export default SignUp;