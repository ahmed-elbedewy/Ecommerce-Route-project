import { useContext } from "react";
import { CartContext } from "../Contexts/CartContextProvider/CartContextProvider";

export default function useCart() {
  const context = useContext(CartContext);
  return context;
}
