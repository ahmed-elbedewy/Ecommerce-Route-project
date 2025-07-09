import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faBars,
  faTimes,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faBehance,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../assets/images/freshcart-logo.svg";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContextProvider";
import useCart from "../../Hooks/useCart";
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { numOfCartItems } = useCart();

  // Close mobile menu when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Brands", path: "/brands" },
  ];

  const socialLinks = [
    { icon: faFacebook, href: "#", color: "hover:text-blue-600" },
    { icon: faTwitter, href: "#", color: "hover:text-blue-400" },
    { icon: faInstagram, href: "#", color: "hover:text-pink-500" },

    // Behance
    { icon: faBehance, href: "#", color: "hover:text-purple-600" },
    // LinkedIn
    { icon: faLinkedin, href: "#", color: "hover:text-blue-700" },
    // YouTube
    { icon: faYoutube, href: "#", color: "hover:text-red-600" },
  ];

  const { token, setToken } = useContext(AuthContext);

  function handleLogout() {
    setToken("");
  }
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100">
      {/* Top Bar */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-4 text-gray-600">
              <span>📞 +20 1144045412</span>
              <span>✉️ ahmedelbedewy21@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-all duration-300 hover:-translate-y-0.5`}
                  aria-label={`Follow us on social media`}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center transition-all duration-300 hover:scale-105 hover:brightness-110"
            >
              <img
                src={Logo}
                alt="FreshCart Logo"
                className="h-8 lg:h-10 w-auto transition-transform duration-200 hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-green-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600"
                      : "text-gray-700 hover:text-green-600 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-green-600 hover:after:scale-x-100"
                  } after:transition-transform after:duration-200 after:scale-x-0 hover:after:scale-x-100`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              {" "}
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] transition-all duration-200"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors duration-200">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200 relative">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-gray-600 hover:text-red-500 transition-colors duration-200"
              />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200 relative group hover:animate-cart-bounce"
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-gray-600 group-hover:text-green-600 transition-colors duration-200 text-lg"
              />
              {numOfCartItems > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-500 rounded-full animate-badge-pulse">
                  {numOfCartItems}
                </span>
              )}
            </Link>

            {/* Authentication */}
            <div className="hidden md:flex items-center space-x-3">
              {!token ? (
                <>
                  <NavLink
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200 relative overflow-hidden before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-green-600 to-green-700 rounded-full hover:from-green-700 hover:to-green-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 relative overflow-hidden before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_0_3px_rgba(16,185,129,0.2)]">
                    <FontAwesomeIcon icon={faUser} className="text-green-600" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-red-600 to-red-700 rounded-full hover:from-red-700 hover:to-red-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 relative overflow-hidden before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className="text-gray-600 text-lg"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          } overflow-hidden`}
        >
          <div className="py-4 space-y-4 border-t border-gray-200">
            {/* Mobile Search */}
            <div className="px-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] p-3"
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-base font-medium transition-all duration-300 p-4 border-l-4 border-transparent hover:bg-gray-50 hover:border-l-green-600 hover:translate-x-1 ${
                      isActive
                        ? "text-green-600 bg-green-50 border-l-green-600"
                        : "text-gray-700 hover:text-green-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Mobile Authentication */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              {!token ? (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-all duration-300 rounded-lg my-1 hover:translate-x-1"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block mx-4 px-4 py-3 text-base font-medium text-white bg-gradient-to-br from-green-600 to-green-700 rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 text-center relative overflow-hidden before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <button className="block w-full text-left px-4 py-3 text-base font-medium text-white bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 rounded-lg mx-4 my-2 hover:translate-x-1 relative overflow-hidden before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full">
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Social Links */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-all duration-300 text-lg hover:-translate-y-0.5`}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
