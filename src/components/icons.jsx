function Svg({ children, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  );
}

export function IconExternalLink(props) {
  return (
    <Svg {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </Svg>
  );
}

export function IconLink(props) {
  return (
    <Svg {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l2-2a5 5 0 0 0-7.07-7.07l-1.14 1.13" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-2 2a5 5 0 0 0 7.07 7.07l1.13-1.14" />
    </Svg>
  );
}

export function IconMail(props) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 6 9 7 9-7" />
    </Svg>
  );
}

export function IconTrophy(props) {
  return (
    <Svg {...props}>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5H4v1a4 4 0 0 0 4 4" />
      <path d="M16 5h4v1a4 4 0 0 1-4 4" />
      <path d="M10 15v2h4v-2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </Svg>
  );
}

export function IconMedal(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="15" r="6" />
      <path d="m9 10-3-7" />
      <path d="m15 10 3-7" />
      <path d="M9 3h6" />
      <path d="M12 12v6" />
    </Svg>
  );
}

export function IconSparkle(props) {
  return (
    <Svg {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </Svg>
  );
}

export function IconBuilding(props) {
  return (
    <Svg {...props}>
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M4 21h16" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 9h.01M12 9h.01M15 9h.01M9 13h.01M12 13h.01M15 13h.01" />
    </Svg>
  );
}

export function IconBook(props) {
  return (
    <Svg {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </Svg>
  );
}

export function IconHeart(props) {
  return (
    <Svg {...props}>
      <path d="M12 20.5s-7.2-4.5-9.7-8.7C.7 8.6 1.9 4.9 5.2 3.6c2.3-.9 4.6.1 6.8 2.4 2.2-2.3 4.5-3.3 6.8-2.4 3.3 1.3 4.5 5 2.9 8.2C19.2 16 12 20.5 12 20.5Z" />
    </Svg>
  );
}

export function IconPulse(props) {
  return (
    <Svg {...props}>
      <path d="M22 12h-4l-3 8-6-16-3 8H2" />
    </Svg>
  );
}

export function IconMonitor(props) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M8 20h8M12 17v3" />
    </Svg>
  );
}

export function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.35C16.24 4.32 15.36 4.24 14.33 4.24c-2.14 0-3.6 1.31-3.6 3.71V10.5H8.2v3h2.53V21h2.77z" />
    </svg>
  );
}

export function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
