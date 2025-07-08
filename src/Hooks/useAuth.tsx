import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

export default function useAuth() {
  const { token, setToken } = useContext(AuthContext);
  return {
    isAuthenticated: !!token,
    token,
    setToken,
  };
}
