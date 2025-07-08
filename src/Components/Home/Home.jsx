import React from "react";
import useProducts from "../../Hooks/useProducts";
import useBrands from "../../Hooks/useBrands";
import HeroSection from "./Components/HeroSection";
import FeaturesSection from "./Components/FeaturesSection";
import CategoriesSection from "./Components/CategoriesSection";
import FeaturedProductsSection from "./Components/FeaturedProductsSection";
import BrandsSection from "./Components/BrandsSection";
import NewsletterSection from "./Components/NewsletterSection";
import StatsSection from "./Components/StatsSection";
import useCategories from "../../Hooks/useCategories";
import useCart from "../../Hooks/useCart";

export default function Home() {
  const { TopProducts } = useProducts();
  const {
    TopBrands,
    isLoading: brandsLoading,
    isError: brandsError,
  } = useBrands();

  const { handleAddToCart } = useCart();
  const {
    isLoading: categoriesLoading,
    isError: categoriesError,
    Categories,
  } = useCategories();

  const featuredProducts = TopProducts(4) || [];
  const featuredBrands = TopBrands(6) || [];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400 text-sm">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-sm">
          ☆
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-sm">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection
        categories={Categories}
        isLoading={categoriesLoading}
        isError={categoriesError}
      />
      <FeaturedProductsSection
        products={featuredProducts}
        onAddToCart={handleAddToCart}
        renderStars={renderStars}
      />
      <BrandsSection
        brands={featuredBrands}
        isLoading={brandsLoading}
        isError={brandsError}
      />
      <NewsletterSection />
      <StatsSection />
    </div>
  );
}
