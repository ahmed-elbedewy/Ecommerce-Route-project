interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface BrandsSectionProps {
  brands: Brand[];
  isLoading: boolean;
  isError: boolean;
}

export default function BrandsSection({
  brands,
  isLoading,
  isError,
}: BrandsSectionProps) {
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Featured Brands
            </h2>
            <p className="text-gray-600 text-lg">
              Shop from your favorite brands
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || brands.length === 0) {
    return null; // Don't show brands section if there's an error or no brands
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Featured Brands
          </h2>
          <p className="text-gray-600 text-lg">
            Shop from your favorite brands
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
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
      </div>
    </section>
  );
}
