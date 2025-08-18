'use client';

import { useState, useContext, useEffect,useMemo } from 'react';
import ProductDetails from '@/components/ProductDetails';
import RecentlyViewed from '@/components/RecentlyViewed';
import { CartContext } from '@/context/CartContext';

export default function ProductDetailsWrapper({ product }) {
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (product) {
      let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      
      
      viewed = viewed.filter((p) => p.id !== product.id);

      
      viewed.unshift({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl
      });

      if (viewed.length > 3) {
        viewed = viewed.slice(0, 3);
      }

      localStorage.setItem("recentlyViewed", JSON.stringify(viewed));
    }
  }, [product]);

  // BUG 1: No default color selected
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color ||'');
  const [selectedSize, setSelectedSize] = useState('');

  // BUG 2: Always shows first variant's sizes regardless of selected color
  const availableSizesForColor = useMemo(() => {
    const variant = product.variants.find(v => v.color === selectedColor);
    return variant ? variant.sizes : [];
  }, [product.variants, selectedColor]);


  // BUG 6: Empty dependency array - won't reset when color changes
  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

  // BUG 5: Only checks size, not color
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
     if (!selectedColor) {
      alert('Please select a color.');
      return;
    }
    addToCart(product, selectedColor, selectedSize);
  };

  return (
    <>
      <ProductDetails
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorSelect={setSelectedColor}
        onSizeSelect={setSelectedSize}
        onAddToCart={handleAddToCart}
        availableSizesForColor={availableSizesForColor}
      />
      <RecentlyViewed />
    </>
  );
}
