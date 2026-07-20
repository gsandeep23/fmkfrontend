import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { IconMail, IconLinkedIn, IconFacebook, IconInstagram } from '../components/icons.jsx';
import './sitePages.css';

const CONTACT_CARDS = [
  { icon: IconMail, brandClass: 'sp-brand-mail', title: 'Email Us', href: 'mailto:info@americasmiles.org', label: 'info@americasmiles.org' },
  { icon: IconLinkedIn, brandClass: 'sp-brand-linkedin', title: 'LinkedIn', href: 'https://www.linkedin.com/company/americasmilesorg', label: 'america smiles org' },
  { icon: IconFacebook, brandClass: 'sp-brand-facebook', title: 'Facebook', href: 'https://www.facebook.com/people/America-Smiles/61560429853169/', label: 'America Smiles' },
  { icon: IconInstagram, brandClass: 'sp-brand-instagram', title: 'Instagram', href: 'https://www.instagram.com/americasmilesorg/', label: '@americasmilesorg' },
];

const COLLAB_TAGS = ['Mental Wellness', 'Education', 'AI', 'Community Outreach', 'Social Impact'];

const SOCIAL_LINKS = [
  { icon: IconLinkedIn, brandClass: 'sp-brand-linkedin', href: 'https://www.linkedin.com/company/americasmilesorg', label: 'LinkedIn' },
  { icon: IconFacebook, brandClass: 'sp-brand-facebook', href: 'https://www.facebook.com/people/America-Smiles/61560429853169/', label: 'Facebook' },
  { icon: IconInstagram, brandClass: 'sp-brand-instagram', href: 'https://www.instagram.com/americasmilesorg/', label: 'Instagram' },
];

export default function Contact() {
  return (
    <div className="sp-page">
      <Header variant="home" />

      <main className="sp-main">
        <section className="sp-section">
          <div className="sp-wrap sp-wrap--narrow">
            <div className="sp-header sp-animate">
              <span className="sp-tag">Contact America Smiles</span>
              <h1 className="sp-title">We'd love to hear from you!</h1>
              <p className="sp-subtitle">
                Whether you want to team up with us, ask a question, or just tell us a story about spreading
                kindness in your own neighborhood, our team is excited to connect.
              </p>
            </div>

            <div className="sp-grid sp-animate sp-animate-delay-1">
              {CONTACT_CARDS.map((c) => (
                <a key={c.title} href={c.href} target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={c.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="sp-card sp-contact-card">
                  <div className={`sp-card-icon ${c.brandClass}`}><c.icon /></div>
                  <div>
                    <div className="sp-card-title">{c.title}</div>
                    <div className="sp-card-link">{c.label}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="sp-section sp-section--top-border">
          <div className="sp-wrap sp-wrap--narrow">
            <div className="sp-header sp-animate">
              <span className="sp-tag">Collaborations</span>
              <h2 className="sp-title">Let's Build a Healthier Community Together</h2>
              <p className="sp-subtitle">
                We love teaming up with schools, local businesses, and neighborhood clubs who want to make the
                world a friendlier place. If you believe in the power of small acts to create a kinder world,
                we'd be thrilled to partner with you.
              </p>
            </div>

            <div className="sp-collab-tags">
              {COLLAB_TAGS.map((tag) => <span key={tag} className="sp-collab-tag">{tag}</span>)}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <a href="mailto:info@americasmiles.org" className="sp-cta-btn">
                Get in Touch <IconMail />
              </a>
            </div>

            <div className="sp-social-row">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`sp-social-icon ${s.brandClass}`} aria-label={s.label} title={s.label}>
                  <s.icon />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="sp-footer-fixed">
        <Footer />
      </div>
    </div>
  );
}
