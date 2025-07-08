import React from "react";
import ProductCard from "./ProductCard";

interface FeaturedProductsSectionProps {
  products: any[];
  onAddToCart: (productId: any) => void;
  renderStars: (rating: number) => React.ReactElement[];
}

export default function FeaturedProductsSection({
  products,
  onAddToCart,
  renderStars,
}: FeaturedProductsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 text-lg">
            Check out our most popular items
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
              renderStars={renderStars}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
