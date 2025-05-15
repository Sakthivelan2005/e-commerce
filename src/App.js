import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingCartIcon from './components/FloatingCartIcon';
import ProductList from './Pages/ProductList';
import CartList from './Pages/Cart';
import Home from './Home/Home';
import { useState } from 'react';
import ProductDetails from './Pages/ProductDetails';
import Authentication from './components/Authentication';
import Footer from './Footer';
import './App.css'
function App({Title}) {

   const API_URL = 'https://fakestoreapi.com/products';
   const API_USER = 'http://localhost';   
  const [country, setCountry] = useState('India');
  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
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
  return (
    <Router>
      <div style={{display: 'flex', alignItems: 'center', background: 'lightblue', height:'55px', width:'100%',position:'fixed',zIndex:'1', marginTop:'0px' }}>
    <Navbar />
    <select name="country" id="country" onChange={handleCountry}>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="China">China</option>
        <option value="Australia">Australia</option>
        <option value="Japan">Japan</option>
        <option value="Germany">Germany</option>
        <option value="UK">UK</option>
        <option value="Canada">Canada</option>
        <option value="UAE">UAE</option>
        <option value="Singapore">Singapore</option>
      </select>
    <FloatingCartIcon />
    </div>
      <Routes>
        <Route path="/" element={<Home 
         Title={Title}
         selectedCountry = {country} 
         countryToCurrency = {countryToCurrency}
         countryToCurrencySymbol = {countryToCurrencySymbol}
         API_URL = {API_URL}/>} />
        <Route path="/products" element={ 
          <ProductList
          selectedCountry = {country} 
          countryToCurrency = {countryToCurrency}
          countryToCurrencySymbol = {countryToCurrencySymbol} 
          API_URL={API_URL}/>
          } />
        <Route path="/cart" element={
          <CartList 
          selectedCountry={country}
          countryToCurrency={countryToCurrency}
          countryToCurrencySymbol={countryToCurrencySymbol}
          API_USER = {API_USER} />
          } />
        <Route path='/product/:id' element={
          <ProductDetails 
          selectedCountry = {country}
          countryToCurrency = {countryToCurrency}
          countryToCurrencySymbol = {countryToCurrencySymbol} />
          } />
          <Route path='/Authentication' element={
            <Authentication 
             API_USER = {API_USER} />} />
       </Routes>
       <Footer />
    </Router>
  );
}

export default App;
