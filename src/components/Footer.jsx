import { IconLinkedIn, IconFacebook, IconInstagram } from './icons.jsx';

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: IconLinkedIn, brandClass: 'km-footer-social-linkedin', href: 'https://www.linkedin.com/company/americasmilesorg', label: 'LinkedIn' },
  { icon: IconFacebook, brandClass: 'km-footer-social-facebook', href: 'https://www.facebook.com/people/America-Smiles/61560429853169/', label: 'Facebook' },
  { icon: IconInstagram, brandClass: 'km-footer-social-instagram', href: 'https://www.instagram.com/americasmilesorg/', label: 'Instagram' },
];

export default function Footer() {
  return (
    <div className="km-footer-block">
      <p className="km-disclaimer">
        AI Transparency Note: This app uses AI, and AI can make mistakes. Always use your best judgment, be safe, and have fun!
      </p>
      <div className="km-footer-email-row">
        <a href="mailto:info@americasmiles.org" className="km-footer-email"><MailIcon /> info@americasmiles.org</a>
        <div className="km-footer-social-row">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className={`km-footer-social-icon ${s.brandClass}`} aria-label={s.label} title={s.label}>
              <s.icon />
            </a>
          ))}
        </div>
      </div>
      <p className="km-footer-copyright">
        © America Smiles is a 501(c)(3) nonprofit organization focused on fighting the loneliness epidemic.

        © 2026 America Smiles. All rights reserved.
      </p>
    </div>
  );
}
