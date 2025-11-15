import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const response = await axios.post('http://localhost:5000/signup', {
          username,
          email,
          password,
        });
        setMessage(`${response.data.message} Account Code: ${response.data.account_code}`);
         if (response.status === 201) {
           setIsSignUp(false); // Switch to login mode
         }
      } else {
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
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Action failed');
    }
  };

  return (
    <div style={{ minHeight: '120vh', display: 'flex', flexDirection: 'column', padding: '2rem', width: '100%', backgroundColor: '#003366', color: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <button onClick={() => setIsSignUp(false)} style={{ padding: '0.5rem 1rem', backgroundColor: isSignUp ? '#ccc' : '#003366', color: isSignUp ? '#333' : 'white', border: 'none', borderRadius: '4px' }}>Login</button>
          <button onClick={() => setIsSignUp(true)} style={{ padding: '0.5rem 1rem', backgroundColor: isSignUp ? '#003366' : '#ccc', color: isSignUp ? 'white' : '#333', border: 'none', borderRadius: '4px' }}>Sign Up</button>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ flex: 1, maxWidth: '400px', margin: '0 auto' }}>
        {isSignUp && (
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
        )}
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
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: '#003366', border: 'none', borderRadius: '4px', width: '100%' }}>{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
      {!isSignUp && <p style={{ textAlign: 'center' }}><Link to="/forgot-password" style={{ color: 'white' }}>Forgot Password?</Link></p>}
    </div>
  );
};

export default Auth;