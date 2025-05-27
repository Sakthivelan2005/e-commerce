import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function Provider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(p => p.id === item.id);
   
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1, image: item.image, direction: 'in' }];
      }
    });
  };

const removeFromCart = (id) => {
  setCartItems(prevItems => {
    
  
    const item = prevItems.find(p => p.id === id);
    if (item.quantity > 1) {
      return prevItems.map(p =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p
      );
    } else {
      return prevItems.filter(p => p.id !== id);
    }
  });

  
  localStorage.setItem('Items', cartItems)
};

  const CartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart,CartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
