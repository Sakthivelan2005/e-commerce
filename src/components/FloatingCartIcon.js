import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Pages/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import './FloatingCartIcon.css'; 

const FloatingCartIcon = () => {
  const { CartCount, cartItems } = useCart();
  const iconSize = 35 + Math.min(CartCount * 5, 35);

  return (
    <div className="floating-cart-container">
      <Link to="/cart" style={{ textDecoration: 'none' }}>
        <div
          className="cart-icon-wrapper"
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            fontSize: `${iconSize - 10}px`,
          }}
        >
          🛒
          <AnimatePresence>
            {cartItems.map((image) => (
              <motion.img
                key={image.id}
                src={image.image}
                alt="Item"
                style={{
                  position: 'absolute',
                  width: '15px',
                  height: '15px',
                  objectFit: 'contain',
                  zIndex: -1,
                }}
                initial={image.direction === 'in' ? { y: -50, opacity: 0 } : { y: 0, opacity: 1 }}
                animate={image.direction === 'in' ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            ))}
          </AnimatePresence>

          {CartCount > 0 && (
            <div className="cart-badge">{CartCount}</div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default FloatingCartIcon;
