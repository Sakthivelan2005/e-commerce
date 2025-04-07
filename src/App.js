import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './Pages/ProductList';
import CartList from './Pages/Cart';
import { useState } from 'react';
function App() {
  const [country, setCountry] = useState('India');

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
  return (
    <Router>
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
    <Navbar />
      <Routes>
        <Route path="/" element={<h1>Welcome to Kirana fashion</h1>} />
        <Route path="/products" element={ 
          <ProductList
          selectedCountry = {country} />  
          } />
        <Route path="/cart" element={<CartList />} />
       </Routes>
    </Router>
  );
}

export default App;
