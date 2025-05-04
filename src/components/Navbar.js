import { Link, useLocation } from "react-router-dom";
import { FaHome, FaShoppingBag, FaUser } from "react-icons/fa";
import "./Navbar.css"; 

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link
        to="/"
        className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
      >
        <FaHome className="icon" display={'none'}/>
        <span>Home</span>
      </Link>
      <Link
        to="/products"
        className={`nav-link ${location.pathname === "/products" ? "active" : ""}`}
      >
        <FaShoppingBag className="icon" display={'none'}/>
        <span>Products</span>
      </Link>
      <Link
        to="/Authentication"
        className={`nav-link ${location.pathname === "/Authentication" ? "active" : ""}`}
      >
        <FaUser className="icon" display={'none'}/>
        <span>Login</span>
      </Link>
    </nav>
  );
}

export default Navbar;
