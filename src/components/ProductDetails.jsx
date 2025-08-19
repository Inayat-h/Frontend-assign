// components/ProductDetails.js
import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

const ProductDetails = ({
  product,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
  onAddToCart,
  availableSizesForColor,
}) => {
  // Null check ---fixed
  if (!product) {
    return (
      <div className="p-6 text-center text-red-600 font-medium">
        Product not found.
      </div>
    );
  }

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor
  );

  // Safe image handling ---fixed
  let safeImageUrl = null;

if (product?.imageUrl && product.imageUrl.trim() !== "") {
  if (product.imageUrl.includes("placehold.co")) {
    
    safeImageUrl = product.imageUrl.includes("?")
      ? product.imageUrl
      : `${product.imageUrl}.png`;
  } else {
    safeImageUrl = product.imageUrl;
  }
}


  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <div className="md:w-1/2 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden shadow-md">
        {safeImageUrl ? (
          <Image
            src={safeImageUrl}
            alt={product?.name || "Product image"}
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            unoptimized={safeImageUrl.includes("placehold.co")}
          />
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center text-gray-400 text-lg">
            No image available
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {product.name}
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          {product.description}
        </p>

        {/*Price with decimals */}
        <p className="text-5xl font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </p>

        {/* Color Selector */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Color: {selectedColor}
          </h3>
          <div className="flex gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.color}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === variant.color
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200`}
                style={{ backgroundColor: variant.hex }}
                onClick={() => onColorSelect(variant.color)}
                title={variant.color}
              ></button>
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Size: {selectedSize || "Select a size"}
          </h3>
          <div className="flex flex-wrap gap-3">
            {availableSizesForColor.map((size) => (
              <button
                key={size}
                className={`px-5 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                  selectedSize === size
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                onClick={() => onSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

//Prop validation --fixed
ProductDetails.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string.isRequired,
        hex: PropTypes.string.isRequired,
        sizes: PropTypes.arrayOf(PropTypes.string),
      })
    ).isRequired,
  }),
  selectedColor: PropTypes.string,
  selectedSize: PropTypes.string,
  onColorSelect: PropTypes.func.isRequired,
  onSizeSelect: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  availableSizesForColor: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductDetails;
