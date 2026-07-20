import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { IconBuilding, IconBook, IconHeart, IconPulse, IconMonitor, IconExternalLink } from '../components/icons.jsx';
import './sitePages.css';

const CATEGORIES = [
  {
    icon: IconBuilding,
    iconClass: 'sp-cat-icon--gov',
    title: 'Government & Policy',
    resources: [
      { source: 'ai.gov', title: 'U.S. National Artificial Intelligence Initiative', desc: 'Official U.S. government site with AI strategies, trustworthy AI, and youth education initiatives.', href: 'https://www.ai.gov/' },
      { source: 'ai.gov', title: 'Presidential AI Challenge', desc: 'White House-backed national challenge for K–12 kids and educators to build positive, responsible AI projects solving real problems.', href: 'https://www.ai.gov/initiatives/presidential-challenge' },
      { source: 'whitehouse.gov', title: 'Advancing AI Education for American Youth', desc: 'Executive Order promoting AI education, professional development, and access for American students.', href: 'https://www.whitehouse.gov/presidential-actions/2025/04/advancing-artificial-intelligence-education-for-american-youth/' },
      { source: 'ed.gov', title: 'U.S. Department of Education: AI Guidance', desc: 'Federal resources on safe, innovative, and responsible AI use in education.', href: 'https://www.ed.gov/about/ed-overview/artificial-intelligence-ai-guidance' },
    ],
  },
  {
    icon: IconBook,
    iconClass: 'sp-cat-icon--edu',
    title: 'Learning & Education',
    resources: [
      { source: 'khanacademy.org', title: 'Khan Academy: AI for Education', desc: 'Free lessons, videos, and tools on AI basics, ethics, biases, and responsible teaching and learning.', href: 'https://www.khanacademy.org/college-careers-more/ai-for-education' },
      { source: 'khanacademy.org', title: "Khan Academy's Framework for Responsible AI in Education", desc: 'Clear principles for safe, fair, and equitable AI in schools and learning environments.', href: 'https://blog.khanacademy.org/khan-academys-framework-for-responsible-ai-in-education/' },
      { source: 'commonsense.org', title: 'Common Sense Education: AI Literacy Lessons', desc: 'Quick, fun lessons on AI ethics, biases, and responsible use for grades 6–12.', href: 'https://www.commonsense.org/education/collections/ai-literacy-lessons-for-grades-6-12' },
      { source: 'code.org', title: 'Code.org: Teach and Learn AI', desc: 'Hands-on projects teaching kids ethical and thoughtful AI development and thinking.', href: 'https://code.org/en-US/artificial-intelligence' },
      { source: 'media.mit.edu', title: 'MIT Media Lab: AI + Ethics for Middle School', desc: 'Free lessons on fairness, biases, and ethical AI thinking designed for middle schoolers.', href: 'https://www.media.mit.edu/projects/ai-ethics-for-middle-school/overview/' },
      { source: 'teachai.org', title: 'TeachAI: AI Guidance for Schools Toolkit', desc: 'Practical resources for educators and administrators promoting responsible AI in schools.', href: 'https://www.teachai.org/toolkit' },
    ],
  },
  {
    icon: IconHeart,
    iconClass: 'sp-cat-icon--fam',
    title: 'Families & Students',
    resources: [
      { source: 'fosi.org', title: 'Family Online Safety Institute: Teaching Kids About AI', desc: "A parent's guide to exploring AI safely, building curiosity, and encouraging critical thinking at home.", href: 'https://fosi.org/teaching-kids-about-ai-a-parents-guide-to-curiosity-and-critical-thinking/' },
      { source: 'understood.org', title: 'Understood.org: How to Use AI Responsibly', desc: 'Kid- and family-friendly tips on using AI honestly, safely, and fairly in everyday learning.', href: 'https://www.understood.org/en/articles/ai-responsible-use-students' },
    ],
  },
  {
    icon: IconPulse,
    iconClass: 'sp-cat-icon--fam',
    title: 'Mental Health & Loneliness Research',
    resources: [
      { source: 'news-medical.net', title: 'Global Burden of Disease Study (2026) — The Lancet', desc: 'Mental disorders have surpassed cardiovascular disease as the leading cause of global disability, with Major Depressive Disorder rising by 24% since 2019.', href: 'https://www.news-medical.net/news/20260522/Mental-disorders-surpass-other-conditions-as-leading-global-cause-of-disability.aspx' },
      { source: 'hhs.gov', title: 'Our Epidemic of Loneliness and Isolation — Surgeon General (2023)', desc: "U.S. Surgeon General's Advisory on the loneliness and social isolation epidemic and its impacts on health and community well-being.", href: 'https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf' },
      { source: 'nationalacademies.org', title: 'Social Isolation and Loneliness in Older Adults — National Academies (2020)', desc: 'Comprehensive report exploring opportunities for the health care system to address social isolation and loneliness in older adults.', href: 'https://www.nationalacademies.org/publications/25663' },
      { source: 'pubmed.ncbi.nlm.nih.gov', title: 'Social Isolation and AI-Enabled Electrocardiography — JACC/Mayo Clinic (2024)', desc: 'Research linking social isolation to accelerated biological aging as measured by AI-enabled ECG analysis. Rajai, N., Lerman, A., et al.', href: 'https://pubmed.ncbi.nlm.nih.gov/39372468/' },
      { source: 'aarp.org', title: 'AARP Loneliness Epidemic Survey (2025)', desc: '40 percent of older adults report experiencing loneliness, underscoring the scale of the social connection crisis in America.', href: 'https://www.aarp.org/family-relationships/loneliness-epidemic-survey/' },
    ],
  },
  {
    icon: IconMonitor,
    iconClass: 'sp-cat-icon--edu',
    title: 'Screen Time & Youth Mental Health',
    resources: [
      { source: 'pmc.ncbi.nlm.nih.gov', title: 'Screen Time and Mental Health: ABCD Study — BMC Public Health (2024)', desc: 'Prospective analysis linking screen time to mental health outcomes in adolescents across the Adolescent Brain Cognitive Development study. Nagata, J. M., et al.', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11457456/' },
      { source: 'nature.com', title: 'Screen Time, Physical Activity, Sleep & Mental Health in Youth — Nature (2026)', desc: "Structural equation modeling of screen time, physical activity, sleep loss, and mental health risks in youth from the U.S. National Survey of Children's Health.", href: 'https://www.nature.com/articles/s41599-026-06609-1' },
      { source: 'pmc.ncbi.nlm.nih.gov', title: 'Screen Time and Mental Health Profiles Among U.S. Adolescents — CDC (2025)', desc: 'CDC National Health Interview Survey findings on screen time patterns and mental health profiles among U.S. teenagers. Public Health Reports.', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12249308/' },
      { source: 'pmc.ncbi.nlm.nih.gov', title: 'Addictive Screen Use & Cognitive Difficulties — ABCD Consortium/NIH (2024)', desc: 'Study on problematic media use and its association with cognitive difficulties in adolescents from the National Institutes of Health ABCD Consortium.', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10624397/' },
      { source: 'jmir.org', title: 'Screen Time, Internet Gaming Disorder & Mental Health in Adolescents — JMIR (2026)', desc: 'Large-scale cross-sectional study examining leisure screen time and internet gaming disorder among Chinese adolescents. Yin, X., et al.', href: 'https://www.jmir.org/2026/1/e80737' },
    ],
  },
];

export default function Resources() {
  return (
    <div className="sp-page sp-page-mint">
      <Header variant="home" />

      <main className="sp-main">
        <section className="sp-section">
          <div className="sp-wrap sp-wrap--narrow">
            <div className="sp-header sp-animate">
              <span className="sp-tag">Resources</span>
              <h1 className="sp-title">AI Resources for Education &amp; Responsibility</h1>
              <p className="sp-subtitle">
                Explore trusted tools, guides, and programs curated to help students, families, and educators
                learn about AI safely, responsibly, and creatively.
              </p>
            </div>
          </div>
        </section>

        <section className="sp-section sp-section--top-border">
          <div className="sp-wrap sp-wrap--wide">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="sp-cat">
                <div className="sp-cat-header">
                  <div className={`sp-cat-icon ${cat.iconClass}`}><cat.icon /></div>
                  <h2>{cat.title}</h2>
                </div>
                <div className="sp-grid">
                  {cat.resources.map((r) => (
                    <a key={r.title} href={r.href} target="_blank" rel="noopener noreferrer" className="sp-card">
                      <span className="sp-source">{r.source}</span>
                      <h3 className="sp-card-title">{r.title}</h3>
                      <p className="sp-card-desc">{r.desc}</p>
                      <span className="sp-card-cta">Visit Resource <IconExternalLink /></span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="sp-footer-fixed">
        <Footer />
      </div>
    </div>
  );
}
