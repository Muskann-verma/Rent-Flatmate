import { Link } from 'react-router-dom';
import './Footer.css';

const footerLinks = {
  Product: [
    { label: 'Find Rooms', to: '/listings' },
    { label: 'Flatmate Finder', to: '/flatmates' },
    { label: 'Post a Listing', to: '/post-listing' },
    { label: 'AI Matching', to: '/listings' },
  ],
  Company: [
    { label: 'About Us', to: '/' },
    { label: 'Blog', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Press', to: '/' },
  ],
  Support: [
    { label: 'Help Center', to: '/' },
    { label: 'Safety Tips', to: '/' },
    { label: 'Report Issue', to: '/' },
    { label: 'Contact', to: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Room<span className="gradient-text">Match</span> AI</span>
            </div>
            <p className="footer__tagline">
              India&apos;s smartest platform for finding rooms and compatible flatmates. Powered by AI.
            </p>
            {/* Social */}
            <div className="footer__social">
              {['Twitter', 'Instagram', 'LinkedIn'].map(s => (
                <a key={s} href="/" className="footer__social-link" aria-label={s}>
                  {s === 'Twitter' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  )}
                  {s === 'Instagram' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  )}
                  {s === 'LinkedIn' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer__col">
              <h4 className="footer__col-title">{category}</h4>
              <ul className="footer__col-links">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer__link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© 2024 RoomMatch AI. All rights reserved.</p>
          <div className="footer__legal">
            <a href="/" className="footer__legal-link">Privacy Policy</a>
            <a href="/" className="footer__legal-link">Terms of Service</a>
            <a href="/" className="footer__legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
