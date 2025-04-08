import { useEffect, useState } from 'react';
import loading from './Animations/Loading.gif';
import './ProductList.css';
function ProductList({selectedCountry}) {

  const countryToCurrency = {
    India: 'INR',
    USA: 'USD',
    Japan: 'JPY',
    UK: 'GBP',
    Germany: 'EUR',
    Australia: 'AUD',
    Canada: 'CAD',
    China: 'CNY',
    UAE: 'AED',
    Singapore: 'SGD',
  };
  const countryToCurrencySymbol = {
    India: '₹',       // Indian Rupee
    USA: '$',         // US Dollar
    Japan: '¥',       // Japanese Yen
    UK: '£',          // British Pound
    Germany: '€',     // Euro
    Australia: 'A$',  // Australian Dollar
    Canada: 'C$',     // Canadian Dollar
    China: '¥',       // Chinese Yuan
    UAE: 'د.إ',       // UAE Dirham
    Singapore: 'S$',  // Singapore Dollar
  };

 const getCurrency = (country) => {
 return countryToCurrency[country] || 'USD';
  } 
 

  const getSymbol = (country) => {
    return countryToCurrencySymbol[country] || '$';
  }

  const [exchangeRate, SetExchangeRate] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_Currency = 'https://v6.exchangerate-api.com/v6/bc074b7ceb0708ddab718f71/latest/USD';
  const API_URL = 'https://fakestoreapi.com/products';
  useEffect(() => {
    const fetchCurency = async () =>{
        try{
        const response = await fetch(API_Currency);
        if(!response.ok) throw Error ("Data not received")
        const currency = await response.json();
        SetExchangeRate(currency.conversion_rates);
    } catch(err){
       console.log(err.message);
    }
   }
   (async () => await fetchCurency())()
  }, []);

  useEffect(() => {
    const fetchItem = async () =>{
        try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error ("Data not received")
        const listItems = await response.json();
        console.log(listItems);
    setProducts(listItems);
    } catch(err){
       console.log(err.message);
    } finally {
        setIsLoading(false);
    }
   }
   (async () => await fetchItem())()
  }, []);

  const currencyCode = getCurrency(selectedCountry);
  const currencySymbol = getSymbol(selectedCountry);
  const rate = exchangeRate ? exchangeRate[currencyCode] : 1;
  const UniqueCategory = [...new Set(products.map(p => p.category))];
  
  return (isLoading === true)? <img src={loading} alt='Loading...' /> : (
    <div>
     {UniqueCategory.map((category)=> 
     <div> 
          <h2>{category}</h2>
          <div className='category'>
      <ul>
        {products.filter(p => p.category === category).map((product) => (
          <div key={product.id}>
         <div className='products'>
           <div className={`${product.category}`}>
            <img src={`${product.image}`} alt={`${product.title}`} width= {200} height={300} />
            <h3>{product.title}</h3>
            <br />
              <h5>{currencySymbol} {(product.price * rate).toFixed(2)}</h5> 
              </div>
           </div>
          </div>
        ))}
      </ul>
      </div>
      </div>
      )}
    </div>
  );
}

export default ProductList;
