import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import {
  Menu,
  X,
  Book,
  Search,
  BookOpen,
  User,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const auth = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const signOutRedirect = () => {
    auth.removeUser();
    const clientId = "13koksudrnp3vsjifbkaq7jmb8";
    const logoutUri = "http://localhost:5173";
    const cognitoDomain =
      "https://eu-north-123hehoa3c.auth.eu-north-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Active link styles
  const getLinkStyles = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center px-3 py-2 rounded-xl text-sm font-medium transition duration-300 
      ${
        isActive
          ? "bg-blue-600 text-white"
          : "hover:bg-blue-50 hover:text-blue-600 text-gray-700"
      }`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Book className="h-8 w-8 mr-2 text-blue-600" />
              <Link
                to="/"
                className="font-bold text-2xl text-gray-800 hover:text-blue-600 transition duration-300"
              >
                BiblioCloud
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <Link to="/catalog" className={getLinkStyles("/catalog")}>
                <BookOpen className="h-4 w-4 mr-2" />
                Catalogue
              </Link>

              <Link to="/search" className={getLinkStyles("/search")}>
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Link>

              {!auth.isAuthenticated ? (
                <button
                  onClick={() => auth.signinRedirect()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                >
                  <User className="h-4 w-4 mr-2" />
                  Se connecter
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/profile" className={getLinkStyles("/profile")}>
                    <User className="h-4 w-4 mr-2" />
                    Mon Compte
                  </Link>

                  <Link to="/dashboard" className={getLinkStyles("/dashboard")}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>

                  <button
                    onClick={signOutRedirect}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition duration-300"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu principal</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with animation */}
      <div
        className={`md:hidden absolute w-full transition-all duration-300 transform ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-xl">
          <Link
            to="/catalog"
            className="flex items-center hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-xl text-base font-medium transition duration-300"
          >
            <BookOpen className="h-5 w-5 mr-3" />
            Catalogue
          </Link>
          <Link
            to="/search"
            className="flex items-center hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-xl text-base font-medium transition duration-300"
          >
            <Search className="h-5 w-5 mr-3" />
            Rechercher
          </Link>

          {!auth.isAuthenticated ? (
            <button
              onClick={() => auth.signinRedirect()}
              className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-base font-medium flex items-center transition duration-300"
            >
              <User className="h-5 w-5 mr-3" />
              Se connecter
            </button>
          ) : (
            <>
              <Link
                to="/profile"
                className="flex items-center hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-xl text-base font-medium transition duration-300"
              >
                <User className="h-5 w-5 mr-3" />
                Mon Compte
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-xl text-base font-medium transition duration-300"
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
              <button
                onClick={signOutRedirect}
                className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-base font-medium flex items-center transition duration-300"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
