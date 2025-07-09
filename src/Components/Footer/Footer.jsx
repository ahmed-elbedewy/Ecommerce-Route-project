import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/freshcart-logo.svg"; // Adjust the path as necessary

export default function Footer() {
  const socialLinks = [
    { icon: faFacebook, href: "#", color: "hover:text-blue-600" },
    { icon: faTwitter, href: "#", color: "hover:text-blue-400" },
    { icon: faInstagram, href: "#", color: "hover:text-pink-500" },
    { icon: faLinkedin, href: "#", color: "hover:text-blue-700" },
  ];

  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src={Logo}
                alt="FreshCart Logo"
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted online grocery store delivering fresh products.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                <span className="text-sm">+20 1144045412</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                <span className="text-sm">ahmedelbedewy21@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-green-400 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-green-400 text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-green-400 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-green-400 text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-colors duration-300`}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 FreshCart. All rights reserved. Made with ❤️ by Ahmed abdelaziz
          </p>
        </div>
      </div>
    </footer>
  );
}
