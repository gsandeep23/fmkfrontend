import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="km-footer-block">
      <p className="km-footer-copyright">
        © America Smiles is a 501(c)(3) nonprofit organization focused on fighting the loneliness epidemic.
        <br/>
        © 2026 America Smiles. All rights reserved.{' '}
        <Link to="/legal-disclaimer" className="km-footer-legal">Legal Disclaimer</Link>
      </p>
    </div>
  );
}
