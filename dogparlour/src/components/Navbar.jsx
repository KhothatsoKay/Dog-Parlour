import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../services/AuthService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = AuthService.getToken();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MDP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={toggleMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services" onClick={toggleMenu}>
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={toggleMenu}>
                Contact
              </Link>
            </li>
            <li className="nav-item">
              {!token ? (
                <Link className="nav-link" to="/login" onClick={toggleMenu}>
                  Sign In
                </Link>
              ) : (
                <Link
                  className="nav-link"
                  to="/"
                  onClick={() => {
                    AuthService.logout(); 
                    toggleMenu();
                  }}
                >
                  Sign Out
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
