import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // For demo, just log the data. In real app, send to backend
      console.log({ name, email, message });
      setResponse('Thank you for your message! We will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error: any) {
      setResponse('Failed to send message. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '2rem', backgroundColor: '#003366', color: 'white' }}>
      <nav style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <h1 className="site-title" style={{ margin: 0, fontSize: '1.5rem', flexShrink: 1 }}>
          SpecificationsPicker
        </h1>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', flexShrink: 1 }}>
          <form onSubmit={(e) => { e.preventDefault(); }} style={{ margin: '0' }}>
            <input
              type="text"
              placeholder="Search for products"
              style={{ padding: '0.4rem 0.6rem', fontSize: '1rem', width: '280px', backgroundColor: '#f5f5f5', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button type="submit" style={{ padding: '0.4rem 0.8rem', fontSize: '1rem', marginLeft: '0.4rem' }}>Search</button>
          </form>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', flexShrink: 1 }}>
          <Link to="/about" style={{ textDecoration: 'none', border: '1px solid black', backgroundColor: 'black', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>About Us</Link>
          <Link to="/contact" style={{ textDecoration: 'none', border: '1px solid black', backgroundColor: 'black', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>Contact Us</Link>
          <a href="https://www.paypal.com/donate" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', border: '1px solid black', backgroundColor: 'black', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>Donate by PayPal</a>
          <Link to="/auth" style={{ textDecoration: 'none', border: '1px solid black', backgroundColor: 'black', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>Get Started</Link>
        </div>
      </nav>
      <main style={{ padding: '2rem', textAlign: 'center', flex: 1 }}>
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: '#003366', border: 'none', borderRadius: '4px', width: '100%' }}>Send Message</button>
        </form>
        {response && <p style={{ marginTop: '1rem', color: 'lightgreen' }}>{response}</p>}
        <Link to="/" style={{ display: 'inline-block', marginTop: '2rem', padding: '0.5rem 1rem', backgroundColor: 'white', color: '#003366', textDecoration: 'none', borderRadius: '4px' }}>Back to Home</Link>
      </main>
      <footer style={{ backgroundColor: '#000000', color: 'white', padding: '1rem', textAlign: 'center', width: '100%', marginLeft: 0, marginRight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#about" style={{ color: 'white', textDecoration: 'none' }}>About Us</a>
          <a href="#terms" style={{ color: 'white', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#faq" style={{ color: 'white', textDecoration: 'none' }}>FAQ</a>
        </div>
        <p>&copy; 2025 SpecificationsPicker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;