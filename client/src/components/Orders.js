import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = ({ API_USER}) => {
  const [orders, setOrders] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_USER}/Orders`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchOrders();
    return () => window.removeEventListener('resize', handleResize);
  }, [API_USER]);
console.log(orders)
  return (
    <div className="orders-container">
        {orders.length === 0 ? (null) :(
            <>
      <h1 className="orders-title">Your Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-details">
            <div className="order-row"><span className="order-label">Order ID:</span> <span className="order-value">{order._id}</span></div>
            <div className="order-row"><span className="order-label">User:</span> <span className="order-value">{order.user.name}</span></div>
            <div className="order-row"><span className="order-label">Country:</span> <span className="order-value">{order.country}</span></div>
            <div className="order-row"><span className="order-label">Total:</span> <span className="order-value">{order.currency} {order.total}</span></div>
            <div className="order-row"><span className="order-label">Address:</span> <span className="order-value">{order.DeliveryAddress}</span></div>
            <div className="order-row"><span className="order-label">PIN Code:</span> <span className="order-value">{order.PinCode}</span></div>
            <div className="order-row"><span className="order-label">Placed At:</span> <span className="order-value">{new Date(order.placedAt).toLocaleString()}</span></div>
          </div>


          <h2 className="items-title">Items</h2>

          {isMobile ? (
            <div className="mobile-table">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map(item => (
                    <React.Fragment key={item._id}>
                      <tr>
                        <td><strong>Title</strong></td>
                        <td>{item.title}</td>
                      </tr>
                      <tr>
                        <td><strong>Quantity</strong></td>
                        <td>{item.quantity}</td>
                      </tr>
                      <tr>
                        <td><strong>Price</strong></td>
                        <td>{order.currency} {item.price}</td>
                      </tr>
                      <tr>
                        <td><strong>Subtotal</strong></td>
                        <td>{order.currency} {item.subtotal}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    <td>{order.currency} {order.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map(item => (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{order.currency}{item.price}</td>
                      <td>{order.currency}{item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
      </>
      )}
    </div>
  );
};

export default Orders;
