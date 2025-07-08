import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faTrash,
  faMinus,
  faPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import StarRating from "../Home/Components/StarRating";

/** @typedef {object} CartItem
  count: number;
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: {
      name: string;
    };
    brand: {
      name: string;
    };
    ratingsAverage: number;
    id: string;
  };
  price: number;
*/

export default function Cart() {
  const {
    cartData,
    isLoadingCart,
    isErrorCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
    isUpdatingQuantity,
    isRemovingItem,
    isClearingCart,
  } = useCart();

  if (isLoadingCart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="h-8 w-8 text-green-600 animate-spin mx-auto mb-4"
          />
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (isErrorCart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="h-24 w-24 text-gray-400 mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Error Loading Cart
          </h2>
          <p className="text-gray-600">
            There was an error loading your cart. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (!cartData?.data?.products || cartData.data.products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="h-24 w-24 text-gray-400 mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to get started with your shopping
          </p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const cartItems = /** @type {CartItem[]} */ (cartData.data.products);
  const totalPrice = cartData.data.totalCartPrice;

  const handleQuantityChange = (productId, newCount) => {
    if (newCount < 1) return;
    handleUpdateQuantity(productId, newCount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {cartData.numOfCartItems} item
            {cartData.numOfCartItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Clear Cart Button */}
              <div className="p-6 border-b border-gray-200">
                <button
                  onClick={handleClearCart}
                  disabled={isClearingCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isClearingCart ? "Clearing..." : "Clear Cart"}
                </button>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item._id} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {item.product.title}
                        </h3>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <span>Category: {item.product.category.name}</span>
                          <span>•</span>
                          <span>Brand: {item.product.brand.name}</span>
                        </div>

                        <div className="flex items-center mb-3">
                          <StarRating rating={item.product.ratingsAverage} />
                          <span className="ml-2 text-sm text-gray-600">
                            ({item.product.ratingsAverage})
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-700">
                            Quantity:
                          </span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.count - 1
                                )
                              }
                              disabled={item.count <= 1 || isUpdatingQuantity}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FontAwesomeIcon
                                icon={faMinus}
                                className="h-4 w-4"
                              />
                            </button>
                            <span className="px-4 py-2 text-center min-w-[60px]">
                              {item.count}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.count + 1
                                )
                              }
                              disabled={isUpdatingQuantity}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FontAwesomeIcon
                                icon={faPlus}
                                className="h-4 w-4"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price and Remove */}
                      <div className="flex flex-col items-end space-y-2">
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            ${item.price}
                          </p>
                          <p className="text-sm text-gray-500">
                            Total: ${(item.price * item.count).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          disabled={isRemovingItem}
                          className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Remove item"
                        >
                          <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartData.numOfCartItems} items)</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 mt-6">
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="w-full text-center text-green-600 hover:text-green-700 font-medium py-3 px-4 rounded-lg border border-green-600 hover:bg-green-50 transition-colors duration-200 mt-3 block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
