import React from 'react';
import '../App.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#about">About Us</a>
        <a href="#terms">Terms of Service</a>
        <a href="#faq">FAQ</a>
      </div>
      <p>&copy; 2025 SpecificationsPicker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;