import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-between  items-center  w-full bg-gray-50">
        <Navbar />

        <div className="w-full ">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}
