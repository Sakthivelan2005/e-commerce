import { useCart } from './CartContext';
import { useEffect, useState } from 'react';
import './Cart.css';
import apiRequest from '../apiRequest';
import { useNavigate } from 'react-router-dom';

function CartList({ selectedCountry, countryToCurrency, countryToCurrencySymbol, API_USER, isAuthenticated }) {
  const { cartItems, removeFromCart, setCartItems  } = useCart();
  const [exchangeRate, setExchangeRate] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const API_Currency = 'https://v6.exchangerate-api.com/v6/bc074b7ceb0708ddab718f71/latest/USD';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const currency = await apiRequest(API_Currency);
        setExchangeRate(currency.data.conversion_rates);
       } catch (error) {
        console.error('Currency API error:', error);
      }
    };
    fetchCurrency();
  }, []);

  const currencyCode = countryToCurrency[selectedCountry] || 'INR';
  const currencySymbol = countryToCurrencySymbol[selectedCountry] || '₹';
  const rate = exchangeRate && exchangeRate[currencyCode] ? exchangeRate[currencyCode] : 1;

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price * rate,
    0
  ).toFixed(2);

  const handleLogin = () => {
    navigate('/Authentication')
  }

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token")
    console.log(token);
    const orderData = {
      country: selectedCountry,
      items: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: (item.price * rate).toFixed(2),
        currencySymbol: currencySymbol,
        quantity: item.quantity,
        subtotal:(item.quantity * item.price * rate).toFixed(2)
      })),
      total: total,
      DeliveryAddress: `${deliveryAddress}`,
      PinCode: pinCode,
      placedAt: new Date().toISOString()
    };

    const PostOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    }

    try {
      const reqAPI = `${API_USER}/Orders`;
      const Result = await apiRequest(reqAPI, PostOption);
      console.log("Google user POST result:", Result);
      if (Result.error === true){
        alert(`${Result.message}`)
      }
      else{
      setIsPlaceOrder(true);
      setCartItems([]);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('❌ Failed to place the order.');
    }
  };
 
  useEffect(() => {
  if (isPlaceOrder) {
    const timer = setTimeout(() => {
      setIsPlaceOrder(false);
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [isPlaceOrder]);
localStorage.getItem('Items');
  return (
    <>
     {isPlaceOrder ? 
     (<div className='alert'>
      <div className="alert alert-success d-flex align-items-center" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
        <symbol id="check-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
         </symbol>
        </svg>
        <div>
          {'✅ Order placed successfully...!'}
        </div>
      </div>
      </div>) : (null)}
      <div className="cart-container">
        <h2 className="cart-title">🧾 Your Cart Summary</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <table className='cart-table'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td data-label="S.No">{index + 1}</td>
                  <td data-label="Product">{item.title}</td>
                  <td data-label="Unit Price">{currencySymbol} {(item.price * rate).toFixed(2)}</td>
                  <td data-label="Qty">{item.quantity}</td>
                  <td data-label="Subtotal">{currencySymbol} {(item.quantity * item.price * rate).toFixed(2)}</td>
                  <td data-label="Remove">
                    <button onClick={() => removeFromCart(item.id)}>−</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="cart-total">
          <h3>Total: {`${currencySymbol} ${total}`}</h3>
        </div>
      </div>
      {(cartItems.length > 0 ) ?(
        <div className='PlaceOrder'>
         { !isAuthenticated? (<p>Please <button onClick={() => handleLogin()}>login / Sign Up</button> to place your Orders</p>)
          :
          (<form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }} style={{textAlign:'center'}}>
            <div className='PlaceOrder'>
          <label htmlFor='DeliveryDelatils'>Delivery Address</label>
          <input type='text'  required name='DeliveryAddress' value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder='' /> 
          <label htmlFor='DeliveryDelatils'>PIN Code</label>
          <input type='number'  required name='PINcode' value={pinCode} onChange={(e) => setPinCode(e.target.value)} /> 
          </div>
      <button type='submit' 
      style={{
        placeSelf:'center',
        backgroundColor: '#ff5252',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        fontSize: '1rem'
        }}>
        Place order
        </button>
      </form>)}
      </div>
      )
      :(null)}
    </>
  );
}

export default CartList;
