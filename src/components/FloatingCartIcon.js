import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Pages/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingCartIcon = () => {
  const { CartCount, cartItems } = useCart();
  console.log(cartItems)
  const iconSize = 40 + Math.min(CartCount * 5, 35);
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
    }}>
      <Link to="/cart" style={{ textDecoration: 'none' }}>
        <div style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          borderRadius: '50%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${iconSize - 10}px`,
          position: 'relative',
        }}>
          🛒
          <AnimatePresence>
            {cartItems.map((image) => 
              <motion.img
                key={image.id}
                src={image.image}
                alt="Item"
                style={{
                  position: 'absolute',
                  width: '15px',
                  height: '15px',
                  objectFit: 'contain',
                  zIndex: -1
                }}
                initial={image.direction === 'in' ? { y: -50, opacity: 0 } : { y: 0, opacity: 1 }}
                animate={image.direction === 'in' ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>

          {CartCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: 'red',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001,
            }}>
              {CartCount}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default FloatingCartIcon;
