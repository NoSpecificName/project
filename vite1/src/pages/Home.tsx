import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ProfileDropdown: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#ccc',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#003366',
          border: '3px solid gray',
        }}
      >
        U
      </div>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '0',
            backgroundColor: '#003366',
            color: 'white',
            padding: '1rem',
            borderRadius: '4px',
            minWidth: '200px',
            zIndex: 1000,
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Profile</h4>
          <p style={{ margin: '0.5rem 0' }}>Username: {localStorage.getItem('username') || 'User'}</p>
          <Link to="/settings" style={{ textDecoration: 'none', color: 'white', display: 'block', marginBottom: '0.5rem' }}>Profile Settings</Link>
          <button
            onClick={onLogout}
            style={{
              backgroundColor: 'white',
              color: '#003366',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brandLogos, setBrandLogos] = useState({});
  const [activeCategory, setActiveCategory] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    window.location.reload(); // Refresh to update navbar
  };

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    setIsLoggedIn(!!userId);
  }, []);

  const handleSearch = async (searchQuery?: string) => {
    const queryToUse = searchQuery || query;
    try {
      const response = await axios.get(`https://api.techspecs.io/v5.0/search?query=${encodeURIComponent(queryToUse)}&api_key=vggdi2am3kh9mkm`);
      setResults(response.data.products || []);
    } catch (error) {
      console.error('Error searching products:', error);
      setResults([]);
    }
  };

  const handleCategorySearch = (category: string) => {
    setActiveCategory(category);
    handleSearch(category);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`https://api.techspecs.io/v5.0/categories?api_key=vggdi2am3kh9mkm`);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrandLogo = async (brand: string) => {
    try {
      const response = await axios.get(`https://api.techspecs.io/v5.0/brands/${encodeURIComponent(brand)}/logo?api_key=vggdi2am3kh9mkm`);
      setBrandLogos(prev => ({ ...prev, [brand]: response.data.logo }));
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={{ backgroundColor: '#003366', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <h1 className="site-title" style={{ margin: 0, fontSize: '1.5rem', flexShrink: 1 }}>
          SpecificationsPicker
        </h1>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', flexShrink: 1 }}>
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} style={{ margin: '0' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
          {isLoggedIn ? (
            <ProfileDropdown onLogout={handleLogout} />
          ) : (
            <Link to="/auth" style={{ textDecoration: 'none', border: '1px solid black', backgroundColor: 'black', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>Get Started</Link>
          )}
        </div>
      </nav>
      <main style={{ padding: '2.3rem', textAlign: 'center', flex: 1 }}>
        <h2 className="fade-in">Welcome to SpecificationsPicker - Tech Specs Hub</h2>
        <p className="fade-in">Your go-to place for picking specifications.</p>
        <Link to="/auth" className="fade-in" style={{ display: 'inline-block', padding: '0.575rem 1.15rem', fontSize: '1.15rem', backgroundColor: 'white', color: '#003366', textDecoration: 'none', borderRadius: '4px', border: '2px solid white', transition: 'color 0.3s ease, border-color 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'gray'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#003366'; e.currentTarget.style.borderColor = 'white'; }}>Get Started</Link>
        <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', gap: '1cm', marginTop: '2.3rem', flexWrap: 'wrap' }}>
          <Link to="/laptops" style={{ textDecoration: 'none' }}>
            <div style={{ border: '1px solid white', padding: '0.8rem', textAlign: 'center', minWidth: '180px', borderRadius: '25px', boxShadow: '0 4px 8px rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.3s ease, box-shadow 0.3s ease', backgroundColor: '#003366', color: 'white', transform: 'scale(1)', animation: 'pulse 2s infinite' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.8)'; e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 8px rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}>
              <img src="/laptop2.jpg" alt="Laptop" style={{ width: '100px', height: 'auto', marginBottom: '0.5rem' }} />
              <h3>Laptops</h3>
              <p>Explore laptop specifications.</p>
            </div>
          </Link>
          <Link to="/desktops" style={{ textDecoration: 'none' }}>
            <div style={{ border: '1px solid white', padding: '0.8rem', textAlign: 'center', minWidth: '180px', borderRadius: '25px', boxShadow: '0 4px 8px rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.3s ease, box-shadow 0.3s ease', color: 'white', height: 'auto', transform: 'scale(1)', animation: 'pulse 2s infinite' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.8)'; e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 8px rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}>
              <img src="/pc.jpg" alt="Desktop" style={{ width: '100px', height: 'auto', marginBottom: '0.5rem' }} />
              <h3>Desktops</h3>
              <p>Explore desktop specifications.</p>
            </div>
          </Link>
          <Link to="/mobile" style={{ textDecoration: 'none' }}>
            <div style={{ border: '1px solid white', padding: '0.8rem', textAlign: 'center', minWidth: '180px', borderRadius: '25px', boxShadow: '0 4px 8px rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.3s ease, box-shadow 0.3s ease', color: 'white', transform: 'scale(1)', animation: 'pulse 2s infinite' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.8)'; e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 8px rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}>
              <img src="/phone.png" alt="Mobile" style={{ width: '100px', height: 'auto', marginBottom: '0.5rem' }} />
              <h3>Mobile</h3>
              <p>Explore mobile specifications.</p>
            </div>
          </Link>
        </div>
        {results.length > 0 && (
          <div style={{ marginTop: '2.3rem' }}>
            <h3>Search Results</h3>
            {results.map((product: any) => (
              <div key={product.id} style={{ margin: '1.15rem 0', padding: '1.15rem', border: '1px solid white', borderRadius: '4px' }}>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                {product.images && product.images.map((img: any, idx: number) => (
                  <img key={idx} src={img.url} alt={product.name} style={{ width: '230px', height: 'auto', margin: '0.575rem' }} />
                ))}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;