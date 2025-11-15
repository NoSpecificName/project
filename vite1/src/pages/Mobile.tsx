import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Mobile: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brandLogos, setBrandLogos] = useState({});

  const handleSearch = async (searchQuery?: string) => {
    const queryToUse = searchQuery || query;
    try {
      const response = await axios.get(`https://api.techspecs.io/v5.0/search?query=${encodeURIComponent(queryToUse)}&category=mobile&api_key=vggdi2am3kh9mkm`);
      setResults(response.data.products || []);
    } catch (error) {
      console.error('Error searching products:', error);
      setResults([]);
    }
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
    handleSearch('mobile');
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
              placeholder="Search for mobile devices"
              style={{ padding: '0.4rem 0.6rem', fontSize: '1rem', width: '280px', backgroundColor: '#f5f5f5', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button type="submit" style={{ padding: '0.4rem 0.8rem', fontSize: '1rem', marginLeft: '0.4rem' }}>Search</button>
          </form>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', flexShrink: 1 }}>
          <Link to="/about" style={{ textDecoration: 'none', border: '1px solid white', backgroundColor: 'white', color: '#003366', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>About Us</Link>
          <Link to="/contact" style={{ textDecoration: 'none', border: '1px solid white', backgroundColor: 'white', color: '#003366', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>Contact Us</Link>
          <a href="https://www.paypal.com/donate" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', border: '1px solid white', backgroundColor: 'white', color: '#003366', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>Donate by PayPal</a>
          <Link to="/auth" style={{ textDecoration: 'none', border: '1px solid white', backgroundColor: 'white', color: '#003366', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>Get Started</Link>
        </div>
      </nav>
      <main style={{ padding: '2.3rem', textAlign: 'center', flex: 1 }}>
        <h2>Mobile - Tech Specs Hub</h2>
        <p>Explore detailed specifications for mobile devices.</p>
        <Link to="/" style={{ display: 'inline-block', padding: '0.575rem 1.15rem', fontSize: '1.15rem', backgroundColor: 'white', color: '#003366', textDecoration: 'none', borderRadius: '4px', marginBottom: '2rem' }}>Back to Home</Link>
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

export default Mobile;