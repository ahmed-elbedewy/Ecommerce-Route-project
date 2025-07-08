// import React from "react"; // Not needed in React 17+ with JSX transform

export default function FilterSide({
  brands,
  Categories,
  handleBrandChange,
  handlePriceChange,
  handleCategoryChange,
  selectedCategories,
  selectedBrands,
  rangePrice,
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 h-fit">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <svg
          className="w-5 h-5 text-blue-600"
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
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">Filters</h1>
      </div>

      {/* Categories Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14-7l2 8-2 8H5l-2-8 2-8h14z"
            />
          </svg>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Categories
          </h2>
        </div>
        <div className="space-y-2 sm:space-y-3 max-h-40 sm:max-h-48 overflow-y-auto custom-scrollbar">
          {Categories?.data.map((category) => (
            <label
              key={category.id}
              className="group flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                />
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-all ${
                    selectedCategories.includes(category.name)
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300 group-hover:border-blue-400"
                  }`}
                >
                  {selectedCategories.includes(category.name) && (
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm sm:text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Brands
          </h2>
        </div>
        <div className="space-y-2 sm:space-y-3 max-h-40 sm:max-h-48 overflow-y-auto custom-scrollbar">
          {brands?.map((brand) => (
            <label
              key={brand.id}
              className="group flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => handleBrandChange(brand.name)}
                />
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-all ${
                    selectedBrands.includes(brand.name)
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300 group-hover:border-blue-400"
                  }`}
                >
                  {selectedBrands.includes(brand.name) && (
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm sm:text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                {brand.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Price Range
          </h2>
        </div>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                $
              </span>
              <input
                type="number"
                name="min"
                placeholder="Min"
                value={rangePrice.min}
                onChange={handlePriceChange}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
              />
            </div>
            <div className="text-gray-400 font-medium text-sm">to</div>
            <div className="relative flex-1 w-full">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                $
              </span>
              <input
                type="number"
                name="max"
                placeholder="Max"
                value={rangePrice.max}
                onChange={handlePriceChange}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            Showing products from ${rangePrice.min} to ${rangePrice.max}
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(selectedCategories.length > 0 ||
        selectedBrands.length > 0 ||
        rangePrice.min > 0 ||
        rangePrice.max < 1000) && (
        <button
          onClick={() => {
            // This would need to be passed as a prop or handled differently
            // For now, just show the button as a UI enhancement
          }}
          className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Clear All Filters
        </button>
      )}
    </div>
  );
}
