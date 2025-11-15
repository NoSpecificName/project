import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
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
        <h2>About SpecificationsPicker</h2>
        <p>SpecificationsPicker is your go-to platform for selecting and comparing product specifications. We help users make informed decisions by providing detailed specs and easy-to-use tools.</p>
        <p>Our mission is to simplify the process of picking the right specifications for your needs.</p>
        <Link to="/" style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: 'white', color: '#003366', textDecoration: 'none', borderRadius: '4px' }}>Back to Home</Link>
      </main>
    </div>
  );
};

export default About;