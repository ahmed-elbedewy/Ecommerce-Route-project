import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
interface ProductCardProps {
  product: any;
  onAddToCart: (product: any) => void;
  renderStars: (rating: number) => React.ReactElement[];
}

export default function ProductCard({
  product,
  onAddToCart,
  renderStars,
}: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative h-48 bg-gray-200 group">
          <img
            src={product.imageCover}
            alt={product.title.split(" ").splice(0, 2).join(" ")}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.category && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                {product.category.name}
              </span>
            )}
            {product.priceAfterDiscount && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                SALE
              </span>
            )}
          </div>

          {/* Sold Count Badge */}
          {product.sold > 0 && (
            <div className="absolute top-2 right-2">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                {product.sold.toLocaleString()} sold
              </span>
            </div>
          )}

          {/* Stock Status */}
          {product.quantity < 10 && product.quantity > 0 && (
            <div className="absolute bottom-2 right-2">
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                Only {product.quantity} left
              </span>
            </div>
          )}
          {product.quantity === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>
      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <div className="mb-2">
            <span className="text-xs text-gray-500 font-medium uppercase">
              {product.brand.name}
            </span>
          </div>
        )}

        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
          {product.title.split(" ").splice(0, 3).join(" ")}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description.length > 60
            ? product.description.substring(0, 40) + "..."
            : product.description}
        </p>

        {/* Rating with quantity */}
        {product.ratingsAverage && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {renderStars(product.ratingsAverage)}
            </div>
            <span className="text-sm text-gray-600">
              ({product.ratingsAverage.toFixed(1)})
            </span>
            {product.ratingsQuantity && (
              <span className="text-xs text-gray-400">
                · {product.ratingsQuantity} reviews
              </span>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-xl font-bold text-red-600">
                  ${product.priceAfterDiscount}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price}
                </span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                  {Math.round(
                    ((product.price - product.priceAfterDiscount) /
                      product.price) *
                      100
                  )}
                  % OFF
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-green-600">
                ${product.price}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        {isAuthenticated && (
          <button
            onClick={() => onAddToCart(product._id)}
            disabled={product.quantity === 0}
            className={`w-full py-2 px-4 rounded transition-colors text-sm font-medium ${
              product.quantity === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}
