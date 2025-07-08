import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const CartContext = createContext<any>({});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth();
  const [cartData, setCartData] = useState<any>(null);

  // --------- 1. Add to Cart ---------
  const addToCart = (productId: number) => {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token,
        },
      }
    );
  };

  const cartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: async (response) => {
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 3000,
      });
      await refetchCart();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleAddToCart(productId: number) {
    cartMutation.mutate(productId);
  }

  // --------- 2. Get Cart ---------
  const getCart = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token },
    });

  const {
    data,
    isLoading: isLoadingCart,
    isError: isErrorCart,
    error: errorCart,
    refetch: refetchCart,
  } = useQuery({
    queryKey: ["Cart"],
    queryFn: getCart,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    retryDelay: 1000,
    select: (res) => res.data,
  });

  // --------- 3. Update Cart Item Quantity ---------
  const updateCartQuantity = (productId: string, count: number) => {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      {
        headers: { token },
      }
    );
  };

  const updateQuantityMutation = useMutation({
    mutationFn: ({ productId, count }: { productId: string; count: number }) =>
      updateCartQuantity(productId, count),
    onSuccess: () => {
      toast.success("Cart updated successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
      refetchCart();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update cart");
    },
  });

  function handleUpdateQuantity(productId: string, count: number) {
    updateQuantityMutation.mutate({ productId, count });
  }

  // --------- 4. Remove Cart Item ---------
  const removeCartItem = (productId: string) => {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: { token },
      }
    );
  };

  const removeItemMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      toast.success("Item removed from cart", {
        position: "bottom-right",
        autoClose: 2000,
      });
      refetchCart();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove item");
    },
  });

  function handleRemoveItem(productId: string) {
    removeItemMutation.mutate(productId);
  }

  // --------- 5. Clear Cart ---------
  const clearCart = () => {
    return axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token },
    });
  };

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("Cart cleared successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
      refetchCart();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to clear cart");
    },
  });

  function handleClearCart() {
    clearCartMutation.mutate();
  }

  useEffect(() => {
    setCartData(data);
  }, [data]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveItem,
        handleClearCart,
        isLoadingCart,
        isErrorCart,
        errorCart,
        numOfCartItems: cartData?.numOfCartItems || 0,
        isUpdatingQuantity: updateQuantityMutation.isPending,
        isRemovingItem: removeItemMutation.isPending,
        isClearingCart: clearCartMutation.isPending,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
