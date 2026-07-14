const STEPS = [
  {
    num: 1,
    icon: '📷',
    title: 'Explore',
    text: 'Snap a photo, record a voice note, or type a message about an everyday object—like a coffee mug, a stack of books, or even a random sandal!',
    color: 'var(--km-orange)',
  },
  {
    num: 2,
    icon: '✨',
    title: 'Discover',
    text: 'Click "Kindness Search," and our digital guide, Professor Juju, will give you fun, totally unique kindness ideas based on your photo.',
    color: 'var(--km-purple)',
  },
  {
    num: 3,
    icon: '🤝',
    title: 'Connect',
    text: 'Pick your favorite idea, put your phone away, and bring that small act of kindness to life in your community.',
    color: 'var(--km-teal)',
  },
];

function CollapseIcon({ flipped }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: flipped ? 'rotate(180deg)' : 'none' }}>
      <polyline points="15 6 9 12 15 18" />
      <polyline points="19 6 13 12 19 18" />
    </svg>
  );
}

export default function Sidebar({ open, onToggle }) {
  return (
    <aside className={`km-sidebar ${open ? 'km-sidebar-open' : 'km-sidebar-collapsed'}`}>
      <div className="km-sidebar-top">
        {open && <span className="km-sidebar-welcome">👋 Welcome!</span>}
        <button className="km-sidebar-collapse-btn" title={open ? 'Close sidebar' : 'Open sidebar'} onClick={onToggle}>
          {open ? (
            <CollapseIcon flipped={false} />
          ) : (
            <>
              <span className="km-sidebar-ai-icon">✨</span>
              <span className="km-sidebar-arrow-icon"><CollapseIcon flipped={true} /></span>
            </>
          )}
        </button>
      </div>
      {open && (
        <div className="km-sidebar-body">
          {STEPS.map((s) => (
            <div key={s.num} className="km-step-card" style={{ '--step-color': s.color }}>
              <div className="km-step-num">{s.num}</div>
              <div className="km-step-title">{s.icon} {s.title}</div>
              <div className="km-step-text">{s.text}</div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
