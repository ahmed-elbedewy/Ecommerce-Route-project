import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProducts() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (response) => response.data.data,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 5,
    retryDelay: 1000, // 1 second
  });

  function TopProducts(numberOfProducts: number) {
    // Sort by Sold Count
    const sortedProducts = products?.sort((a: any, b: any) => b.sold - a.sold);
    return sortedProducts?.slice(0, numberOfProducts);
  }

  return {
    products: products || [],
    isError,
    isLoading,
    TopProducts,
  };
}
