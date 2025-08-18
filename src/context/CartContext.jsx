// src/context/CartContext.jsx
'use client';

import React, { createContext, useState, useEffect, } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedColor="default", selectedSize="oneSize",quantity=1) => {
    console.log("Adding to cart:", product.name, selectedColor, selectedSize, quantity);
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.productId === product.id &&
          item.color === selectedColor &&
          item.size === selectedSize,
      );

      if (existingItemIndex >= 0) {
  const updatedItems = [...prevItems];
  updatedItems[existingItemIndex].quantity += quantity;
  return updatedItems;
}

      return [
        ...prevItems,
        {
          id: `${product.id}-${selectedColor}-${selectedSize}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          color: selectedColor,
          size: selectedSize,
          quantity,
          imageUrl: product.imageUrl,
        },
      ];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setCartItems([]);

  

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
