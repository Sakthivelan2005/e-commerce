import { useCart } from './CartContext';
import { useEffect, useState } from 'react';
import './Cart.css';
import apiRequest from '../apiRequest';

function CartList({ selectedCountry, countryToCurrency, countryToCurrencySymbol, API_URL }) {
  const { cartItems, removeFromCart, setCartItems  } = useCart();
  const [exchangeRate, setExchangeRate] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [pinCode, setPinCode] = useState(null);
  const API_Currency = 'https://v6.exchangerate-api.com/v6/bc074b7ceb0708ddab718f71/latest/USD';

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const currency = await apiRequest(API_Currency);
        setExchangeRate(currency.conversion_rates);
      } catch (error) {
        console.error('Currency API error:', error);
      }
    };
    fetchCurrency();
  }, []);

  const currencyCode = countryToCurrency[selectedCountry] || 'INR';
  const currencySymbol = countryToCurrencySymbol[selectedCountry] || '₹';
  const rate = exchangeRate ? exchangeRate[currencyCode] : 1;

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price * rate,
    0
  ).toFixed(2);

  const handlePlaceOrder = async () => {
    const orderData = {
      country: selectedCountry,
      items: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: `${currencySymbol} ${(item.price * rate).toFixed(2)}`,
        quantity: item.quantity,
        subtotal:`${currencySymbol} ${(item.quantity * item.price * rate).toFixed(2)}`
      })),
      total:`${currencyCode} ${total}`,
      DeliveryAddress: `${deliveryAddress}`,
      PinCode: `${pinCode}`,
      placedAt: new Date().toISOString()
    };

    const PostOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    }

    try {
      const reqAPI = `${API_URL}/Orders`;
      const Result = await apiRequest(reqAPI, PostOption);
      console.log("Google user POST result:", Result);
      alert('✅ Order placed successfully!');
      setCartItems([])
    } catch (error) {
      console.error('Error placing order:', error);
      alert('❌ Failed to place the order.');
    }
  };

console.log(deliveryAddress, pinCode)
  return (
    <>
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
      {(cartItems.length > 0 ) ? (
        <div className='PlaceOrder'>
          <label htmlFor='DeliveryDelatils'>Delivery Address</label>
          <input type='text'  required name='DeliveryAddress' value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder='' /> 
          <label htmlFor='DeliveryDelatils'>PIN Code</label>
          <input type='number'  required name='DeliveryAddress' value={pinCode} onChange={(e) => setPinCode(e.target.value)} /> 

      <button onClick={handlePlaceOrder}>Place order</button>
      </div>
      )
      :(null)}
    </>
  );
}

export default CartList;
