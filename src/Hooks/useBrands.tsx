import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useBrands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const {
    data: brands,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    select: (response) => response.data.data,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 5,
    retryDelay: 1000, // 1 second
  });

  function TopBrands(numberOfBrands: number) {
    return brands?.slice(0, numberOfBrands);
  }

  return {
    brands: brands || [],
    isError,
    isLoading,
    TopBrands,
  };
}
