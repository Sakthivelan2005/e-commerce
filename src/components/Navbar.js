import { Link } from "react-router-dom";
function Navbar(){
    return (
        <nav style={{padding: '10px', color: 'white' }}>
             <Link to="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Home</Link>
             <Link to="/products" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Products</Link>
        </nav>
    );
}
export default Navbar; 