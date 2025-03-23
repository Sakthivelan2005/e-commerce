import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './Pages/ProductList';
function App() {
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<h1>Welcome to Rakshitha Collection!</h1>} />
        <Route path="/products" element={ <ProductList />  } />
        <Route path="/cart" element={<h1>Cart Page</h1>} />
       </Routes>
    </Router>
  );
}

export default App;
