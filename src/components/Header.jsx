import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logot from '../pages/assets/logo.png';

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/newsroom', label: 'Newsroom' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact Us' },
];

function NavMenu({ open, onClose }) {
  if (!open) return null;
  return (
    <>
      <div className="km-nav-menu-overlay" onClick={onClose} />
      <div className="km-nav-menu">
        {NAV_LINKS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onClose}
            className={({ isActive }) => `km-nav-menu-item${isActive ? ' km-nav-menu-item-active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default function Header({ variant = 'home', onLogoClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const hamburger = (
    <div className="km-hamburger-wrap">
      <button className="km-hamburger-btn" title="Menu" onClick={() => setMenuOpen((o) => !o)}>
        <HamburgerIcon />
      </button>
      <NavMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );

  if (variant === 'chat') {
    return (
      <div className="km-chat-header">
        <div className="km-chat-logo" onClick={onLogoClick}>
          <img className="km-chat-logo-img" src={logot} alt="Kindness Matrix" />
          <span className="km-word1">Kindness</span> <span className="km-word2">Matrix</span>
        </div>
        {hamburger}
      </div>
    );
  }

  return (
    <>
      <div className="km-home-header-bar">
        {hamburger}
      </div>
      <Link to="/" className="km-logo-block" onClick={onLogoClick}>
        <img className="km-logo-img" src={logot} alt="Kindness Matrix" />
        <div className="km-logo">
          <span className="km-word1">Kindness</span> <span className="km-word2">Matrix</span>
        </div>
      </Link>
    </>
  );
}
