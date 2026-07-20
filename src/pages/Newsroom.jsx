import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { IconTrophy, IconMedal, IconSparkle, IconLink, IconExternalLink } from '../components/icons.jsx';
import './sitePages.css';

const ACHIEVEMENTS = [
  {
    icon: IconTrophy,
    badge: 'Presidential AI Challenge',
    badgeClass: 'sp-badge--gold',
    cardClass: 'sp-achievement-card',
    title: '1st Place — Middle School Technical Division',
    desc: 'Lisette and Leonie proudly represented Connecticut and secured 1st place in the Middle School Technical Division of the Presidential AI Challenge. Their project reflects innovation, compassion, and a strong commitment to using technology for good.',
  },
  {
    icon: IconMedal,
    badge: 'National Scrabble Championship',
    badgeClass: 'sp-badge--silver',
    cardClass: 'sp-achievement-card sp-achievement-card--silver',
    title: 'Silver Medal — North American School Scrabble Championship',
    desc: 'Lisette and Leonie, known as the "Pink Fluffy Unicorns", earned a Silver Medal at the prestigious North American School Scrabble Championship held in Washington, D.C.',
  },
];

const LEARN_MORE_LINKS = [
  { href: 'https://www.scrabblechampionship.com/standings', label: 'Championship Standings' },
  { href: 'https://en.wikipedia.org/wiki/North_American_School_Scrabble_Championship', label: 'History of the Championship' },
  { href: 'https://www.yahoo.com/lifestyle/articles/westport-twin-sisters-create-app-100000010.html', label: 'Yahoo Lifestyle Article' },
  { href: 'https://www.msn.com/en-us/lifestyle/parenting/westport-twin-sisters-create-app-that-uses-ai-to-create-ideas-on-how-to-connect-with-others/ar-AA21y7BV', label: 'MSN Lifestyle Article' },
];

const NEWS_ITEMS = [
  { pub: 'CT Insider', headline: 'Westport Smiles App Tackles Loneliness and Connections', cta: 'Read Article', href: 'https://www.ctinsider.com/westport/article/westport-smiles-app-loneliness-connections-22218628.php' },
  { pub: 'News 12', headline: '12-Year-Old Westport Twins Create AI Website to Combat Loneliness Epidemic', cta: 'Watch Story', href: 'https://news12.com/11-year-old-westport-twins-create-ai-website-to-combat-loneliness-epidemic-help-spread-kindness' },
  { pub: 'Westport Journal', headline: "Westport's Kalra Twins Advance in AI Challenge with Kindness App", cta: 'Read Article', href: 'https://westportjournal.com/community/westports-kalra-twins-advance-in-ai-challenge-with-kindness-app/' },
  { pub: 'WICC Radio — Melissa in the Morning', headline: 'Interview: Westport Smiles on Audioboom', cta: 'Listen Now', href: 'https://audioboom.com/posts/8895942-melissa-in-the-morning-westport-smiles' },
  { pub: 'Yahoo Lifestyle', headline: 'Westport Twin Sisters Create App', cta: 'Read Article', href: 'https://www.yahoo.com/lifestyle/articles/westport-twin-sisters-create-app-100000010.html' },
  { pub: 'MSN Lifestyle', headline: 'Westport Twin Sisters Create App That Uses AI to Create Ideas on How to Connect with Others', cta: 'Read Article', href: 'https://www.msn.com/en-us/lifestyle/parenting/westport-twin-sisters-create-app-that-uses-ai-to-create-ideas-on-how-to-connect-with-others/ar-AA21y7BV' },
  { pub: 'Inklings News', headline: 'Screens into Smiles: 12-Year-Old Twins Use AI to Fight Loneliness', cta: 'Read Article', href: 'https://www.inklingsnews.com/b/2026/05/15/screens-into-smiles-11-year-old-twins-use-ai-to-fight-loneliness/' },
];

export default function Newsroom() {
  return (
    <div className="sp-page sp-page-cool">
      <Header variant="home" />

      <main className="sp-main">
        <section className="sp-section">
          <div className="sp-wrap">
            <div className="sp-header sp-animate">
              <span className="sp-tag">America Smiles Newsroom</span>
              <h1 className="sp-title">The America Smiles Newsroom</h1>
              <p className="sp-subtitle">
                Explore recent news coverage, media mentions, interviews, and updates related to Lisette,
                Leonie, Professor Juju, and our mission to spread community kindness.
              </p>
            </div>

            <div className="sp-hero-banner sp-animate sp-animate-delay-1">
              <div className="sp-hero-icon"><IconSparkle /></div>
              <span className="sp-hero-label">Proud Moments</span>
              <h2 className="sp-hero-heading">Celebrating Lisette &amp; Leonie</h2>
              <p className="sp-hero-desc">
                We are incredibly proud of the hard work, creativity, and impact Lisette and Leonie are making
                in their community.
              </p>
            </div>

            <div className="sp-grid sp-animate sp-animate-delay-2">
              {ACHIEVEMENTS.map((a) => (
                <div key={a.title} className={`sp-card ${a.cardClass}`}>
                  <div className="sp-card-icon"><a.icon /></div>
                  <span className={`sp-badge ${a.badgeClass}`}>{a.badge}</span>
                  <h3 className="sp-card-title">{a.title}</h3>
                  <p className="sp-card-desc">{a.desc}</p>
                </div>
              ))}
            </div>

            <div className="sp-links-block">
              <h3><IconLink /> Learn More</h3>
              <p>Visit the official Championship Standings and read up on the history of the events, or explore media coverage of their work:</p>
              <div className="sp-pill-row">
                {LEARN_MORE_LINKS.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="sp-pill">
                    <IconLink /> {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sp-section sp-section--top-border">
          <div className="sp-wrap">
            <div className="sp-header sp-animate">
              <span className="sp-tag">Media Coverage &amp; Press</span>
              <h2 className="sp-title">Featured Articles and Interviews</h2>
            </div>

            <div className="sp-grid">
              {NEWS_ITEMS.map((n) => (
                <a key={n.headline} href={n.href} target="_blank" rel="noopener noreferrer" className="sp-card">
                  <span className="sp-news-pub">{n.pub}</span>
                  <h3 className="sp-news-headline">{n.headline}</h3>
                  <span className="sp-card-cta">{n.cta} <IconExternalLink /></span>
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
