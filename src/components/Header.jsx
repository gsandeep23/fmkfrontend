import logo from '../pages/assets/logo.jpeg';

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export default function Header({ variant = 'home', onLogoClick, onMenuClick }) {
  if (variant === 'chat') {
    return (
      <div className="km-chat-header">
        <div className="km-chat-logo" onClick={onLogoClick}>
          <img className="km-chat-logo-img" src={logo} alt="Kindness Matrix" />
          <span className="km-word1">Kindness</span> <span className="km-word2">Matrix</span>
        </div>
        <div className="km-chat-header-right">
          <button className="km-icon-btn" title="Menu" onClick={onMenuClick}><HamburgerIcon /></button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="km-home-header-bar">
        <img className="km-logo-img" src={logo} alt="Kindness Matrix" onClick={onLogoClick} />
        <button className="km-icon-btn" title="Menu" onClick={onMenuClick}><HamburgerIcon /></button>
      </div>
      <div className="km-logo">
        <span className="km-word1">Kindness</span> <span className="km-word2">Matrix</span>
      </div>
    </>
  );
}
