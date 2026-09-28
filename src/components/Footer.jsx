import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="km-footer-block">
      <p className="km-footer-copyright">
        © 2026 Kindness Grid. All rights reserved.{' '}
        <Link to="/legal-disclaimer" className="km-footer-legal">Legal Disclaimer</Link>
        {' '}·{' '}
        <a href="https://americasmiles.org/" target="_blank" rel="noopener noreferrer" className="km-footer-legal">America Smiles</a>
      </p>
    </div>
  );
}
