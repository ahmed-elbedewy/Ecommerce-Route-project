import useBrands from "../../Hooks/useBrands";

export default function Brands() {
  const { brands, isError, isLoading } = useBrands();

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Brands</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 animate-pulse"
            >
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Our Brands</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <div className="text-red-600 mb-2">⚠️</div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Something went wrong
            </h3>
            <p className="text-red-600">
              Unable to load brands. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Our Brands
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover premium quality products from trusted brands around the world
        </p>
        <div className="mt-5">
          <span className="inline-block bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
            {brands.length} Brands Available
          </span>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer p-4"
          >
            <div className="relative h-20 flex items-center justify-center group">
              <img
                src={brand.image}
                alt={brand.name}
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="text-center mt-3">
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                {brand.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {brands.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">
            No brands found
          </h3>
          <p className="text-gray-500">Check back later for more brands.</p>
        </div>
      )}
    </div>
  );
}
