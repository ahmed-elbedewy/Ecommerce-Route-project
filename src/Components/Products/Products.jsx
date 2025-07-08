// import { toast } from "react-toastify"; // TODO: Implement toast notifications
import useProducts from "../../Hooks/useProducts";

// import ProductCard from "../Home/Components/ProductCard";
import FilterSide from "./FilterSide";
import useBrands from "../../Hooks/useBrands";
import useCategories from "../../Hooks/useCategories";
import { useEffect, useState } from "react";
export default function Products() {
  const { products, isLoading, isError } = useProducts(); // Removed unused TopProducts

  // const { handleAddToCart } = useCart();

  const { brands } = useBrands();
  const { Categories } = useCategories();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [rangePrice, setRangePrice] = useState({ min: 0, max: 1e10 });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleBrandChange = (brandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((name) => name !== brandName)
        : [...prev, brandName]
    );
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setRangePrice((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };
  // console.log(products ? products[0] : "No products found");

  // const renderStars = (rating) => {
  //   const stars = [];
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;

  //   for (let i = 0; i < fullStars; i++) {
  //     stars.push(
  //       <span key={`full-${i}`} className="text-yellow-400 text-sm">
  //         ★
  //       </span>
  //     );
  //   }

  //   if (hasHalfStar) {
  //     stars.push(
  //       <span key="half" className="text-yellow-400 text-sm">
  //         ☆
  //       </span>
  //     );
  //   }

  //   const emptyStars = 5 - Math.ceil(rating);
  //   for (let i = 0; i < emptyStars; i++) {
  //     stars.push(
  //       <span key={`empty-${i}`} className="text-gray-300 text-sm">
  //         ★
  //       </span>
  //     );
  //   }

  //   return stars;
  // };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleFilteredProducts() {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category.name);
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand.name);
      const matchesPrice =
        product.price >= rangePrice.min && product.price <= rangePrice.max;
      return matchesCategory && matchesBrand && matchesPrice;
    });
  }
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    setFilteredProducts(handleFilteredProducts());
  }, [selectedCategories, selectedBrands, rangePrice, products, handleFilteredProducts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{"Something went wrong"}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
            Our Products
          </h1>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
              </svg>
              <span className="font-medium text-gray-700">Filters</span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div
            className={`
            lg:w-80 lg:flex-shrink-0
            ${isFilterOpen ? "block" : "hidden lg:block"}
          `}
          >
            <div className="lg:sticky lg:top-4">
              <FilterSide
                brands={brands}
                Categories={Categories}
                handleBrandChange={handleBrandChange}
                handlePriceChange={handlePriceChange}
                handleCategoryChange={handleCategoryChange}
                selectedCategories={selectedCategories}
                selectedBrands={selectedBrands}
                rangePrice={rangePrice}
              />
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1 min-w-0">
            {/* Results Info */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

                        {/* Products Grid */}
                        {filteredProducts.length === 0 ? (
                          <div className="text-center py-16">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                              No products found
                            </h3>
                            <p className="text-gray-600">
                              {products.length === 0
                                ? "Try refreshing the page"
                                : "Try adjusting your filters"}
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                              <div key={product._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                                <img
                                  src={product.imageCover}
                                  alt={product.title}
                                  className="w-full h-48 object-cover rounded mb-4"
                                />
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
                                <p className="text-gray-600 mb-2">{product.category?.name}</p>
                                <p className="text-gray-800 font-bold mb-2">${product.price}</p>
                                <p className="text-yellow-500 mb-2">Rating: {product.ratingsAverage}</p>
                                {/* Add to cart button or other actions can go here */}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

