import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      setMessage(response.data.message);
      if (response.status === 200) {
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('username', username);
        navigate('/');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '120vh', display: 'flex', flexDirection: 'column', padding: '2rem', width: '100%', backgroundColor: '#003366', color: 'white' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
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
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: '#003366', border: 'none', borderRadius: '4px', width: '100%' }}>Login</button>
      </form>
      {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
      <p style={{ textAlign: 'center' }}>Don't have an account? <Link to="/auth" style={{ color: 'white' }}>Sign Up</Link></p>
      <p style={{ textAlign: 'center' }}><Link to="/forgot-password" style={{ color: 'white' }}>Forgot Password?</Link></p>
    </div>
  );
};

export default Login;