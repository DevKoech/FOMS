import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth.jsx';
import './Navbar.css';
import octadecagon from '../assets/octadecagon.jpg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navlinks = [
    { name: 'Home', href: '#home' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Profile', href: '#profile' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <Link to="/" className="navbar-brand-link">
            Pollinate
          </Link>
        </div>

        <div className="navbar-links">
          {navlinks.map(link => (
            <Link key={link.name} to={link.href} className="navbar-link">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="navbar-auth">
          {!user ? (
            <>
              <Link to="#login" className="navbar-button navbar-button-login">
                Login
              </Link>
              <Link to="#register" className="navbar-button navbar-button-register">
                Register
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="navbar-button navbar-logout-button">
              Logout
            </button>
          )}
        </div>

        <div className="navbar-mobile-toggle">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="navbar-menu-button"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`navbar-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="navbar-mobile-links">
            {navlinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className="navbar-mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="navbar-mobile-actions">
            <Link
              to="#login"
              className="navbar-mobile-button navbar-mobile-button-login"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="#register"
              className="navbar-mobile-button navbar-mobile-button-register"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
