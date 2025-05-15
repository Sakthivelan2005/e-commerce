import { useEffect, useState } from 'react';
import loading from './Animations/Loading.gif';
import './ProductList.css';
import { Link } from 'react-router-dom';

function ProductList({ selectedCountry, countryToCurrency, countryToCurrencySymbol, API_URL }) {
  const URL = API_URL;

  const getCurrency = (country) => countryToCurrency[country] || 'INR';
  const getSymbol = (country) => countryToCurrencySymbol[country] || '₹';

  const [exchangeRate, setExchangeRate] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_Currency = 'https://v6.exchangerate-api.com/v6/bc074b7ceb0708ddab718f71/latest/USD';

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch(API_Currency);
        if (!response.ok) throw Error("Data not received");
        const currency = await response.json();
        setExchangeRate(currency.conversion_rates);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCurrency();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) throw Error("Data not received");
        const listItems = await response.json();
        console.log(listItems);
        setProducts(listItems);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, [URL]);

  const currencyCode = getCurrency(selectedCountry);
  const currencySymbol = getSymbol(selectedCountry);
  const rate = exchangeRate ? exchangeRate[currencyCode] : 1;
  const UniqueCategory = [...new Set(products.map(p => p.category))];

  return isLoading ? (
    <img src={loading} alt='Loading...' />
  ) : (
    <div style={{ paddingTop: '55px' }}>
      {UniqueCategory.map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <div className='category'>
            <ul>
              {products.filter(p => p.category === category).map((product) => {
                const ProductRate = (product.price * rate).toFixed(2);
                return (
                    <Link to={`/product/${product.id}`} className="products">
                  <li key={product.id} className="product-card">
                      <div className="category-block">
                        <div className="product-labels">
                          <span className="label category-label">{product.category}</span>
                          {product.rating.count > 100 && <span className="label popular-label">🔥 Popular</span>}
                          {product.id > 15 && <span className="label new-label">🆕 New Arrival</span>}
                        </div>

                        <div className={`${product.category}`}>
                          <img src={product.image} alt={product.title} width={200} height={300} />
                          <h3>{product.title.slice(0, )}...</h3>
                          <h5>{currencySymbol} {ProductRate}</h5>

                          <div className="product-details-icons">
                            <p>⭐ {product.rating.rate} &nbsp;&nbsp; 🗨️ {product.rating.count} reviews</p>
                            <p>📄 {product.description.slice(0, 40)}...</p>
                          </div>
                        </div>
                      </div>
                       </li>
                    </Link>
                 
                );
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
