'use client';

import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">
                    {item.color} | {item.size}
                  </p>
                  <p className="font-bold">${item.price}</p>
                </div>

                
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-gray-100 rounded">
                    Qty: {item.quantity}
                  </span>
                </div>

                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

        
          <div className="mt-8 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
            <button
              onClick={clearCart}
              className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}