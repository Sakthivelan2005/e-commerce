import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import loading from './Animations/Loading.gif';
import './ProductDetails.css';
import { useCart } from './CartContext';
function ProductDetails({selectedCountry,countryToCurrency, countryToCurrencySymbol}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, SetExchangeRate] = useState(null);
  const API_Currency = 'https://v6.exchangerate-api.com/v6/bc074b7ceb0708ddab718f71/latest/USD';
  const { addToCart } = useCart();

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
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const getCurrency = (country) => {
    return countryToCurrency[country] || 'INR';
     } 
    
     const getSymbol = (country) => {
       return countryToCurrencySymbol[country] || '₹';
     }

  const currencyCode = getCurrency(selectedCountry);
  const currencySymbol = getSymbol(selectedCountry);
  const rate = exchangeRate ? exchangeRate[currencyCode] : 1;

  if (!product) return <img src={loading} alt='Loading...' /> ;

  return (isLoading === true)? <img src={loading} alt='Loading...' /> : (
    <div className="product-container">
    <h2 className="product-title">{product.title}</h2>
    <img
      src={product.image}
      alt={product.title}
      className="product-image"
      width={200}
      height={300}
    />
    <p className="product-price">
      <strong>Price:</strong> {currencySymbol} {(product.price * rate).toFixed(2)}
    </p>
    <p className="product-description">
      <strong>Description:</strong> {product.description}
    </p>
    <p className="product-category">
      <strong>Category:</strong> {product.category}
    </p>
    <p className="product-rating">
      <strong>Rating:</strong> {product.rating?.rate} ({product.rating?.count} reviews)
    </p>
    <button
  onClick={() => {
      addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price ,
      currencySymbol,
    });
    alert(`${product.title} is added to Cart`);
  }}
>
  Add To Cart
</button>
  </div>
  );
}

export default ProductDetails;
