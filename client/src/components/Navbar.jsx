import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const navLinks = [
  { to: '/listings', label: 'Find Rooms' },
  { to: '/flatmates', label: 'Flatmate Finder' },
  { to: '/post-listing', label: 'Post Listing' },
  { to: '/dashboard', label: 'Dashboard' },
];

export default function Navbar({ currentRole, onRoleChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="navbar__logo-text">
            Room<span className="gradient-text">Match</span>
            <span className="navbar__logo-ai"> AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar__links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="navbar__actions">
          {/* Role toggle demo pill */}
          <div className="navbar__role-toggle" title="Demo: switch role">
            <button
              className={`role-btn ${currentRole === 'tenant' ? 'role-btn--active' : ''}`}
              onClick={() => onRoleChange('tenant')}
            >
              Tenant
            </button>
            <button
              className={`role-btn ${currentRole === 'owner' ? 'role-btn--active' : ''}`}
              onClick={() => onRoleChange('owner')}
            >
              Owner
            </button>
          </div>

          {isLoggedIn ? (
            <div className="navbar__user">
              <span className="navbar__user-name">👋 {user?.name?.split(' ')[0]}</span>
              <button id="navbar-logout-btn" className="btn btn-outline btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          id="navbar-menu-btn"
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__mobile-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="navbar__mobile-auth">
            {isLoggedIn ? (
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
