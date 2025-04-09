import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ Title, selectedCountry, countryToCurrency, countryToCurrencySymbol }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);

  const API_Currency = 'https://v6.exchangerate-api.com/v6/bc074b7ceb0708ddab718f71/latest/USD';
  const API = 'https://fakestoreapi.com/products';

  const getCurrency = (country) => {
    return countryToCurrency[country] || 'INR';
  };

  const getSymbol = (country) => {
    return countryToCurrencySymbol[country] || '₹';
  };

  const currencyCode = getCurrency(selectedCountry);
  const currencySymbol = getSymbol(selectedCountry);
  const rate = exchangeRate ? exchangeRate[currencyCode] : 1;

  // Fetch exchange rates
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch(API_Currency);
        if (!response.ok) throw new Error("Currency data not received");
        const data = await response.json();
        setExchangeRate(data.conversion_rates);
      } catch (error) {
        console.error("Currency fetch error:", error.message);
      }
    };
    fetchCurrency();
  }, []);

  // Fetch products and categories
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(API);
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
      const uniqueCategories = [...new Set(data.map(p => p.category))];
      setCategories(uniqueCategories);
    };
    fetchProducts();
  }, []);

  // Filter products by search
  useEffect(() => {
    const results = products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(results);
  }, [search, products]);

  // Handle category click
  const handleCategoryClick = (category) => {
    const results = category === 'All'
      ? products
      : products.filter(p => p.category === category);
    setFilteredProducts(results);
  };

  return (
    <div className="home-container">
      <header className="hero-banner">
        <h1>{Title}</h1>
        <p>Shop the latest trends with ease and joy ✨</p>
        <Link to="/products" className="shop-btn">Explore All Products</Link>
      </header>

      <section className="search-section">
        <input
          type="text"
          placeholder="🔍 Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="categories">
        <button onClick={() => handleCategoryClick('All')}>All</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => handleCategoryClick(cat)}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </section>

      <section className="product-grid">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title.slice(0, 30)}...</h3>
            <p className='price'>{currencySymbol}{(product.price * rate).toFixed(2)}</p>
            <div className="hover-details">View Details →</div>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default Home;
