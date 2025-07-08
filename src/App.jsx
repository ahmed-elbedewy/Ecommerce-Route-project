import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/NotFound/Notfound";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import AuthContextProvider from "./Contexts/AuthContextProvider";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute"; 
import CartContextProvider from "./Contexts/CartContextProvider/CartContextProvider";
import Cart from "./Components/Cart/Cart";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout />
      </>
    ),

    children: [
      {
        path: "products",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <PrivateRoute>
            <Brands />
          </PrivateRoute>
        ),
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  { path: "*", element: <NotFound /> },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <RouterProvider router={router} />

            <ToastContainer position="bottom-right" />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
