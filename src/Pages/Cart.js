import { useCart } from './CartContext';
import { useEffect, useState } from 'react';
import './Cart.css';

function CartList({ selectedCountry, countryToCurrency, countryToCurrencySymbol }) {
  const { cartItems, removeFromCart } = useCart();
  const [exchangeRate, setExchangeRate] = useState(null);
  const API_Currency = 'https://v6.exchangerate-api.com/v6/bc074b7ceb0708ddab718f71/latest/USD';

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch(API_Currency);
        const currency = await response.json();
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

  return (
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
  <h3>Total: {`             ${currencySymbol} ${total}`}</h3>
</div>
    </div>
  );
}

export default CartList;
