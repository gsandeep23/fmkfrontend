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

export default function Header({ variant = 'home', onLogoClick }) {
  if (variant === 'chat') {
    return (
      <div className="km-chat-header">
        <div className="km-chat-logo" onClick={onLogoClick}>
          <img className="km-chat-logo-img" src={logot} alt="Kindness Matrix" />
          <span className="km-word1">Kindness</span> <span className="km-word2">Matrix</span>
        </div>
        <button className="km-hamburger-btn">
          <HamburgerIcon />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="km-home-header-bar">
        <button className="km-hamburger-btn">
          <HamburgerIcon />
        </button>
      </div>
      <div className="km-logo-block">
        <img className="km-logo-img" src={logot} alt="Kindness Matrix" onClick={onLogoClick} />
        <div className="km-logo">
          <span className="km-word1">Kindness</span> <span className="km-word2">Matrix</span>
        </div>
      </div>
    </>
  );
}
