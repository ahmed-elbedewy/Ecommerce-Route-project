import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useCart from "../../Hooks/useCart";

export default function ProductDetails() {
  const { id } = useParams();
  const { handleAddToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  function getProductDetails(id: string) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Product", id],
    queryFn: () => getProductDetails(id!),
    gcTime: 100000000,
    select: (res) => res.data.data,
    enabled: !!id, // Only run query if id exists
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={
                selectedImage === 0
                  ? data.imageCover
                  : data.images[selectedImage - 1]
              }
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            <button
              onClick={() => setSelectedImage(0)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                selectedImage === 0 ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <img
                src={data.imageCover}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </button>
            {data.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index + 1)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index + 1
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
            <p className="text-gray-600 mt-2">
              {data.category.name} • {data.brand.name}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-green-600">
              ${data.price}
            </span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(data.ratingsAverage)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">
                ({data.ratingsQuantity} reviews)
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">Description</h3>
              <p className="text-gray-600 mt-1 whitespace-pre-line">
                {data.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Stock:</span>
                <span
                  className={`ml-2 ${
                    data.quantity > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.quantity > 0
                    ? `${data.quantity} available`
                    : "Out of stock"}
                </span>
              </div>
              <div>
                <span className="font-semibold">Sold:</span>
                <span className="ml-2 text-gray-600">{data.sold} units</span>
              </div>
            </div>

            {data.subcategory.length > 0 && (
              <div>
                <span className="font-semibold">Category:</span>
                <span className="ml-2 text-gray-600">
                  {data.subcategory[0].name}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <button
              disabled={data.quantity === 0}
              onClick={async () => await handleAddToCart(id)}
              className={`w-full py-3 px-6 rounded-lg font-semibold ${
                data.quantity > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {data.quantity > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            <button className="w-full py-3 px-6 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
