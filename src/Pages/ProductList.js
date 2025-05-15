import { useEffect, useState } from 'react';
import loading from './Animations/Loading.gif';
import './ProductList.css';
import { Link } from 'react-router-dom';
function ProductList({selectedCountry, countryToCurrency, countryToCurrencySymbol, API_URL}) {
 const URL = API_URL;
  const getCurrency = (country) => {
 return countryToCurrency[country] || 'INR';
  } 
 
  const getSymbol = (country) => {
    return countryToCurrencySymbol[country] || '₹';
  }

  const [exchangeRate, setExchangeRate] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_Currency = 'https://v6.exchangerate-api.com/v6/bc074b7ceb0708ddab718f71/latest/USD';
  useEffect(() => {
    const fetchCurency = async () =>{
        try{
        const response = await fetch(API_Currency);
        if(!response.ok) throw Error ("Data not received")
        const currency = await response.json();
        setExchangeRate(currency.conversion_rates);
    } catch(err){
       console.log(err.message);
    }
   }
   (async () => await fetchCurency())()
  }, []);

  useEffect(() => {
    const fetchItem = async () =>{
        try{
        const response = await fetch(URL);
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
  }, [URL]);
  const currencyCode = getCurrency(selectedCountry);
  const currencySymbol = getSymbol(selectedCountry);
  const rate = exchangeRate ? exchangeRate[currencyCode] : 1;
  const UniqueCategory = [...new Set(products.map(p => p.category))];
  
  return (isLoading === true)? <img src={loading} alt='Loading...' /> : (
    <div style={{paddingTop: '55px'}}>
     {UniqueCategory.map((category)=> 
     <div key={category}> 
          <h2>{category}</h2>
          <div className='category'>
      <ul>
        {products.filter(p => p.category === category).map((product) => {
          const ProductRate = (product.price * rate).toFixed(2);
          return(
            <div key={product.id}>
            <Link  to={`/product/${product.id}`} className='products'>
      <div className='category-block'>
           <div className={`${product.category}`}>
            <img src={`${product.image}`} alt={`${product.title}`} width= {200} height={300} />
            <h3>{product.title.slice(0,30)}...</h3>
            <br />
              <h5>{currencySymbol} {ProductRate}</h5> 
              </div>
           </div>
         </Link>
         </div>
)})}
      </ul>
      </div>
      </div>
      )}
    </div>
  );
}

export default ProductList;
