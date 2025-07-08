import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const {
    isLoading,
    isError,
    data: Categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data.data,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 3,
  });

  return {
    isLoading,
    isError,
    Categories,
  };
}
