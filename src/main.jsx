import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  Code2,
  Crown,
  Database,
  ExternalLink,
  FileText,
  Gauge,
  Globe2,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  Lock,
  Mail,
  MessageSquareText,
  MousePointerClick,
  Paintbrush,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  UploadCloud,
  UserRound,
  WalletCards,
  Wrench,
  Zap
} from "lucide-react";
import "./styles.css";

const ownerEmail = "rcolton640@gmail.com";

const tiers = [
  {
    name: "Beginner",
    subtitle: "Starter website",
    badge: "Fast launch",
    basePrice: 499,
    price: "$499+",
    timeline: "3–5 days",
    icon: LayoutTemplate,
    theme: "starter",
    short:
      "A clean one-page website for businesses that need a professional online presence fast.",
    full:
      "The Beginner option is designed for businesses that need to look legitimate online without needing a complex system. This is best when the goal is simple: explain who you are, show services, display contact information, and give customers a place to reach you.",
    bestFor:
      "New businesses, solo service providers, small portfolios, simple local services, and anyone who needs a professional link to send customers.",
    notFor:
      "Businesses needing payments, logins, admin dashboards, custom forms with lots of logic, or multi-page SEO campaigns.",
    includes: [
      "One-page responsive landing website",
      "Hero section with clear call-to-action",
      "Service overview section",
      "About / credibility section",
      "Basic FAQ section",
      "Contact form or click-to-call buttons",
      "Social links and map/contact area",
      "Basic SEO title and description setup"
    ],
    sample: {
      label: "Starter service site",
      nav: ["Home", "Services", "Contact"],
      hero: "Professional local service website",
      cta: "Call Now",
      blocks: ["Services", "About", "Reviews", "Contact"],
      footer: "Simple footer + social links"
    }
  },
  {
    name: "Intermediate",
    subtitle: "Growth website",
    badge: "Most popular",
    basePrice: 999,
    price: "$999+",
    timeline: "1–2 weeks",
    icon: Rocket,
    theme: "growth",
    short:
      "A multi-page business website built to explain services, build trust, and capture higher-quality leads.",
    full:
      "The Intermediate option is for businesses that want more than a basic landing page. This gives the business room to explain each service, show past work, answer common questions, display reviews, and guide visitors toward contacting or booking.",
    bestFor:
      "Contractors, restaurants, gyms, coaches, med spas, cleaning companies, landscaping companies, and local service businesses.",
    notFor:
      "Businesses that need full software workflows like user accounts, payments, advanced bookings, or database-backed dashboards.",
    includes: [
      "3–6 page responsive website",
      "Homepage plus dedicated service pages",
      "Gallery / portfolio / before-after section",
      "Testimonials and review proof",
      "FAQ and trust-building sections",
      "Lead form with service interest fields",
      "Stronger SEO page structure",
      "Optional lightweight editable content areas"
    ],
    sample: {
      label: "Multi-page business site",
      nav: ["Home", "Services", "Gallery", "FAQ", "Contact"],
      hero: "Services, proof, and lead capture",
      cta: "Get a Free Estimate",
      blocks: ["Service cards", "Gallery", "Testimonials", "FAQ", "Lead form"],
      footer: "Footer with service areas"
    }
  },
  {
    name: "Pro",
    subtitle: "Custom platform",
    badge: "Full system",
    basePrice: 1999,
    price: "$1,999+",
    timeline: "2–5 weeks",
    icon: Crown,
    theme: "pro",
    short:
      "A custom web app with logins, dashboards, payments, bookings, submissions, and business workflows.",
    full:
      "The Pro option is for businesses that need the website to do actual work. This is where the site becomes a platform with customer accounts, admin dashboards, quote systems, booking flows, payments, uploads, notifications, or database-driven operations.",
    bestFor:
      "Coaching platforms, marketplaces, booking businesses, service businesses with quotes, customer portals, and businesses with repeat workflows.",
    notFor:
      "A business that only needs a basic informational website and does not need accounts, payments, dashboards, or ongoing workflows.",
    includes: [
      "Custom frontend and backend",
      "User accounts and role-based dashboards",
      "Customer portal or admin dashboard",
      "Stripe payments or quote checkout",
      "Booking, request, or order workflows",
      "File/video/document upload flows",
      "Database-backed content and records",
      "Notifications, status updates, and management tools"
    ],
    sample: {
      label: "Web app / platform",
      nav: ["Portal", "Bookings", "Payments", "Dashboard", "Admin"],
      hero: "Login, payments, and business workflows",
      cta: "Open Dashboard",
      blocks: ["Customer portal", "Admin metrics", "Payments", "Uploads", "Notifications"],
      footer: "Secure app footer"
    }
  }
];

const customFeatures = [
  { key: "booking", label: "Booking or appointment flow", price: 300, icon: CalendarDays, note: "Scheduling, service choices, calendar-style requests, and confirmations." },
  { key: "payments", label: "Stripe payments / deposits", price: 350, icon: WalletCards, note: "Checkout, deposits, quote payments, order tracking, or payment links." },
  { key: "portal", label: "Customer login portal", price: 500, icon: UserRound, note: "Customer accounts, profiles, saved requests, upload areas, and history." },
  { key: "admin", label: "Admin dashboard", price: 650, icon: LayoutDashboard, note: "Manage customers, requests, quotes, orders, content, and business activity." },
  { key: "database", label: "Database-backed workflows", price: 500, icon: Database, note: "MongoDB records for services, orders, messages, submissions, or content." },
  { key: "uploads", label: "File / video / PDF uploads", price: 450, icon: UploadCloud, note: "Upload flows for documents, photos, customer files, videos, or review materials." },
  { key: "notifications", label: "Notifications / status system", price: 300, icon: MessageSquareText, note: "Status updates, customer alerts, admin badges, and workflow notifications." },
  { key: "seo", label: "Extra SEO service pages", price: 250, icon: Search, note: "Additional location or service pages for search visibility." },
  { key: "integrations", label: "Custom integrations*", price: 750, icon: Globe2, note: "CRM, email, maps, APIs, automations, or third-party business tools." }
];

const portfolio = [
  {
    title: "Goodman Pickleball Coaching",
    type: "Pro Web App",
    url: "https://www.goodmanpickleball.com",
    summary:
      "A full coaching platform with customer accounts, coach dashboards, admin controls, quote workflows, payments, notifications, and video/PDF submissions.",
    highlights: ["Role dashboards", "Custom quotes", "Stripe payments", "Video/PDF uploads", "Admin controls"],
    stack: ["React", "Node", "MongoDB", "Stripe", "Railway"]
  },
  {
    title: "Big Papa Joe Septic",
    type: "Intermediate Business Site + Admin Tools",
    url: "#",
    summary:
      "A service-business website built around services, contact, payments, FAQ, testimonials, marketplace-style pages, and admin management.",
    highlights: ["Service pages", "Contact flow", "Payment area", "Testimonials", "Admin pages"],
    stack: ["React", "Express", "MongoDB", "Tailwind"]
  }
];

const industries = [
  "Contractors",
  "Restaurants",
  "Coaches",
  "Gyms",
  "Auto services",
  "Cleaning services",
  "Landscapers",
  "Barbers",
  "Med spas",
  "Consultants",
  "Local shops",
  "Creators"
];

function App() {
  return (
    <div className="app-shell">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <TierExplanations />
        <SampleWebsites />
        <LiveQuoteBuilder />
        <CustomOptions />
        <WorkShowcase />
        <HostingSection />
        <Process />
        <Comparison />
        <Industries />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="nav-shell">
      <nav className="nav">
        <a className="brand" href="#top">
          <span className="brand-icon"><Code2 size={20} /></span>
          <span><strong>LaunchLine</strong><small>Websites</small></span>
        </a>
        <div className="nav-links">
          <a href="#tiers">Tiers</a>
          <a href="#examples">Examples</a>
          <a href="#quote">Quote</a>
          <a href="#hosting">Hosting</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-button" href="#quote">Build Quote <ArrowRight size={16} /></a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="section hero">
      <div className="hero-grid">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="eyebrow"><Sparkles size={16} /> Websites that match the business, not generic templates</div>
          <h1>Pick a website package, preview the difference, and build a real-time quote.</h1>
          <p className="hero-text">
            A sales hub for business owners to compare Beginner, Intermediate, and Pro websites, understand what each tier includes, preview sample layouts, and estimate custom features before starting a project.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#quote">Build Live Quote <ArrowRight size={18} /></a>
            <a className="btn secondary" href="#examples">View Sample Websites</a>
          </div>
          <div className="micro-proof">
            <span><BadgeCheck size={16} /> Clear package options</span>
            <span><ShieldCheck size={16} /> Professional handoff terms</span>
            <span><Gauge size={16} /> Railway-ready builds</span>
          </div>
        </motion.div>

        <motion.div className="hero-showcase" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }}>
          <div className="browser-bar"><span /><span /><span /><p>client-website-preview.com</p></div>
          <div className="site-preview">
            <div className="preview-hero">
              <div>
                <p>Business Website System</p>
                <h3>From simple site to full business platform.</h3>
              </div>
              <button>Request Quote</button>
            </div>
            <div className="preview-cards">
              <PreviewTile icon={Store} title="Services" text="Explain offers" />
              <PreviewTile icon={WalletCards} title="Payments" text="Sell online" />
              <PreviewTile icon={LayoutDashboard} title="Dashboard" text="Manage work" />
            </div>
            <div className="preview-dashboard">
              <div><small>Website Level</small><strong>Beginner → Intermediate → Pro</strong></div>
              <div className="bar-stack"><span /><span /><span /></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PreviewTile({ icon: Icon, title, text }) {
  return (
    <div className="preview-tile">
      <Icon size={20} />
      <strong>{title}</strong>
      <small>{text}</small>
    </div>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip">
      <div><strong>3</strong><span>website tiers</span></div>
      <div><strong>Live</strong><span>quote builder</span></div>
      <div><strong>Real</strong><span>project proof</span></div>
      <div><strong>Managed</strong><span>hosting option</span></div>
    </section>
  );
}

function TierExplanations() {
  return (
    <section id="tiers" className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Website tiers explained</p>
          <h2>No guessing. Each tier tells the client exactly what they are buying.</h2>
        </div>
        <p>
          The goal is to make the sales conversation easier: clients can start with the tier that matches their business needs and upgrade only when features require more time or custom development.
        </p>
      </div>
      <div className="tiers-grid">
        {tiers.map((tier, index) => <TierCard key={tier.name} tier={tier} index={index} />)}
      </div>
      <p className="scope-note">
        *Pricing shown is a starting estimate. Requests involving complex workflows, third-party integrations, custom logic, unusually large content loads, or extended revisions may require a custom quote.
      </p>
    </section>
  );
}

function TierCard({ tier, index }) {
  const Icon = tier.icon;
  return (
    <motion.article className={`tier-card ${tier.theme}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-90px" }} transition={{ duration: 0.45, delay: index * 0.08 }}>
      <div className="tier-top">
        <span className="tier-icon"><Icon size={24} /></span>
        <span className="tier-badge">{tier.badge}</span>
      </div>
      <h3>{tier.name}</h3>
      <p className="tier-subtitle">{tier.subtitle}</p>
      <p className="tier-full">{tier.full}</p>
      <div className="price-line"><strong>{tier.price}</strong><small>{tier.timeline}</small></div>
      <div className="tier-fit">
        <div><small>Best for</small><p>{tier.bestFor}</p></div>
        <div><small>Not ideal for</small><p>{tier.notFor}</p></div>
      </div>
      <ul>
        {tier.includes.map((item) => <li key={item}><Check size={16} />{item}</li>)}
      </ul>
      <a className="card-cta" href="#quote">Estimate {tier.name} <ChevronRight size={17} /></a>
    </motion.article>
  );
}

function SampleWebsites() {
  return (
    <section id="examples" className="section sample-section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Visual examples</p>
          <h2>See what each tier could look like before buying.</h2>
        </div>
        <p>
          These preview cards show the practical difference between a simple one-page site, a multi-page business website, and a full web app.
        </p>
      </div>
      <div className="sample-grid">
        {tiers.map((tier) => <SampleSite key={tier.name} tier={tier} />)}
      </div>
    </section>
  );
}

function SampleSite({ tier }) {
  const sample = tier.sample;
  return (
    <article className={`sample-window ${tier.theme}`}>
      <div className="sample-browser"><span /><span /><span /><small>{tier.name.toLowerCase()}-preview.com</small></div>
      <div className="sample-nav">
        <strong>{sample.label}</strong>
        <div>{sample.nav.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
      <div className="sample-hero">
        <p>{tier.name} Example</p>
        <h3>{sample.hero}</h3>
        <button>{sample.cta}</button>
      </div>
      <div className="sample-blocks">
        {sample.blocks.map((block, index) => (
          <div key={block} className={index === 0 ? "wide" : ""}>
            <span />
            <strong>{block}</strong>
          </div>
        ))}
      </div>
      <div className="sample-footer">{sample.footer}</div>
    </article>
  );
}

function LiveQuoteBuilder() {
  const [tierName, setTierName] = useState("Intermediate");
  const [selected, setSelected] = useState(["booking"]);
  const [maintenance, setMaintenance] = useState("managed");

  const tier = tiers.find((item) => item.name === tierName) || tiers[1];

  const featureTotal = selected.reduce((sum, key) => {
    const item = customFeatures.find((feature) => feature.key === key);
    return sum + (item?.price || 0);
  }, 0);

  const estimatedTotal = tier.basePrice + featureTotal;

  const selectedFeatureText = selected
    .map((key) => customFeatures.find((feature) => feature.key === key)?.label)
    .filter(Boolean)
    .join(", ");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Website quote request");
    const body = encodeURIComponent(
      `Website tier: ${tier.name}\nEstimated starting quote: $${estimatedTotal.toLocaleString()}+\nSelected features: ${selectedFeatureText || "None"}\nHosting preference: ${maintenance === "managed" ? "Managed monthly hosting/maintenance" : "Self-hosted handoff"}\n\nTell me about your business:\n`
    );
    return `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
  }, [tier.name, estimatedTotal, selectedFeatureText, maintenance]);

  const toggleFeature = (key) => {
    setSelected((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  };

  return (
    <section id="quote" className="section quote-section">
      <div className="quote-card">
        <div className="quote-copy">
          <p className="eyebrow small">Real-time quote builder</p>
          <h2>Build a starting estimate before the call.</h2>
          <p>
            This is not a locked final price. It gives the client a realistic starting point, then marks features with an asterisk when the final cost depends on time, workflow complexity, integrations, or custom requirements.
          </p>
          <div className="estimate-box">
            <span>Estimated starting investment</span>
            <strong>${estimatedTotal.toLocaleString()}+</strong>
            <small>*Final price may vary after project review.</small>
          </div>
          <div className="hosting-choice">
            <button className={maintenance === "managed" ? "active" : ""} onClick={() => setMaintenance("managed")}>
              Managed hosting
            </button>
            <button className={maintenance === "handoff" ? "active" : ""} onClick={() => setMaintenance("handoff")}>
              File handoff
            </button>
          </div>
        </div>

        <div className="quote-builder">
          <label>
            Website tier
            <select value={tierName} onChange={(e) => setTierName(e.target.value)}>
              {tiers.map((item) => <option key={item.name}>{item.name}</option>)}
            </select>
          </label>

          <div className="feature-picker">
            {customFeatures.map((feature) => {
              const Icon = feature.icon;
              const active = selected.includes(feature.key);
              return (
                <button key={feature.key} type="button" className={`feature-toggle ${active ? "active" : ""}`} onClick={() => toggleFeature(feature.key)}>
                  <span><Icon size={18} /></span>
                  <div>
                    <strong>{feature.label}</strong>
                    <small>+${feature.price.toLocaleString()}{feature.key === "integrations" ? "*" : ""}</small>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="quote-summary">
            <div><span>{tier.name} base</span><strong>${tier.basePrice.toLocaleString()}</strong></div>
            {selected.map((key) => {
              const item = customFeatures.find((feature) => feature.key === key);
              if (!item) return null;
              return <div key={key}><span>{item.label}{item.key === "integrations" ? "*" : ""}</span><strong>${item.price.toLocaleString()}</strong></div>;
            })}
            <div className="total"><span>Estimated starting total</span><strong>${estimatedTotal.toLocaleString()}+</strong></div>
          </div>

          <a className="btn primary full" href={mailtoHref}>Send This Quote Request <ArrowRight size={18} /></a>
          <p className="quote-disclaimer">
            *This quote builder is for planning only. Exact pricing depends on number of pages, revisions, design complexity, custom features, integrations, content readiness, and development time.
          </p>
        </div>
      </div>
    </section>
  );
}

function CustomOptions() {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Custom website options</p>
          <h2>More than pages. Add business tools when needed.</h2>
        </div>
        <p>
          These are the features that move a client from Beginner to Intermediate or Pro because they take additional planning, development, testing, and support.
        </p>
      </div>
      <div className="addon-grid">
        {customFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <article className="addon-card" key={feature.key}>
              <Icon size={26} />
              <h3>{feature.label}</h3>
              <p>{feature.note}</p>
              <strong>Starts around +${feature.price.toLocaleString()}{feature.key === "integrations" ? "*" : ""}</strong>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function WorkShowcase() {
  return (
    <section id="work" className="section work-section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Proof of work</p>
          <h2>Real builds that prove the difference between a website and a platform.</h2>
        </div>
        <p>
          These projects show that the packages are based on actual work, not just theoretical templates.
        </p>
      </div>
      <div className="work-grid">
        {portfolio.map((item) => (
          <article className="work-card" key={item.title}>
            <div className="work-visual">
              <div className="work-window"><span /><span /><span /></div>
              <div className="work-screen">
                <Globe2 size={38} />
                <strong>{item.title}</strong>
                <small>{item.type}</small>
              </div>
            </div>
            <div className="work-copy">
              <span className="work-type">{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="highlight-grid">
                {item.highlights.map((highlight) => <span key={highlight}><Check size={14} />{highlight}</span>)}
              </div>
              <div className="stack-row">{item.stack.map((tag) => <em key={tag}>{tag}</em>)}</div>
              {item.url !== "#" ? (
                <a href={item.url} target="_blank" rel="noreferrer">View live example <ExternalLink size={15} /></a>
              ) : (
                <a href="#contact">Ask to see this demo <ExternalLink size={15} /></a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HostingSection() {
  return (
    <section id="hosting" className="section hosting-section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Hosting and support</p>
          <h2>Choose managed support or a complete handoff.</h2>
        </div>
        <p>
          This makes expectations clear after launch and protects you from unlimited free updates.
        </p>
      </div>

      <div className="hosting-grid">
        <article className="hosting-card managed">
          <div className="hosting-icon"><Server size={26} /></div>
          <h3>Managed Hosting & Maintenance</h3>
          <p>
            For clients who prefer a hands-off experience, I can provide ongoing hosting, monitoring, maintenance, deployment support, and technical issue resolution for a monthly service fee.
          </p>
          <ul>
            <li><Check size={16} /> Website hosting and deployment support</li>
            <li><Check size={16} /> Uptime and general site monitoring</li>
            <li><Check size={16} /> Routine technical maintenance</li>
            <li><Check size={16} /> Security-conscious updates and backups</li>
            <li><Check size={16} /> Basic support if something breaks</li>
          </ul>
          <div className="hosting-note">
            Recommended for businesses that want me to help keep the site online and operating smoothly.
          </div>
        </article>

        <article className="hosting-card">
          <div className="hosting-icon"><FileText size={26} /></div>
          <h3>Self-Hosted File Handoff</h3>
          <p>
            Clients who do not want monthly hosting through me can receive the completed project files, assets, and deployment instructions after the initial launch.
          </p>
          <ul>
            <li><Check size={16} /> Complete website file package</li>
            <li><Check size={16} /> Initial launch assistance</li>
            <li><Check size={16} /> Basic deployment documentation</li>
            <li><Check size={16} /> Client manages future hosting and accounts</li>
            <li><Check size={16} /> Future work quoted separately</li>
          </ul>
          <div className="hosting-note">
            After handoff, future hosting, updates, bug fixes, and additional features are the client’s responsibility unless quoted separately.
          </div>
        </article>
      </div>

      <div className="future-work">
        <div>
          <LifeBuoy size={28} />
          <h3>Future Updates & Enhancements</h3>
        </div>
        <p>
          Additional features, modifications, integrations, design changes, and bug fixes requested after project completion can be handled through a separate fixed-price quote or hourly development agreement, depending on the scope.
        </p>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["Discovery", "We define the business goal, pages, features, audience, and must-have functionality.", MousePointerClick],
    ["Quote", "The project gets scoped based on time, complexity, content, integrations, and launch needs.", BarChart3],
    ["Build", "The website or web app is developed, reviewed, revised, and prepared for deployment.", Wrench],
    ["Launch", "The site goes live on hosting, with either managed support or a clean project handoff.", Zap]
  ];

  return (
    <section className="section">
      <div className="section-head center">
        <p className="eyebrow small">Process</p>
        <h2>From rough idea to launched website.</h2>
      </div>
      <div className="process-grid">
        {steps.map(([title, text, Icon], index) => (
          <article className="process-card" key={title}>
            <span>0{index + 1}</span>
            <Icon size={26} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Comparison() {
  const rows = [
    ["Primary goal", "Online presence", "Lead generation", "Business platform"],
    ["Pages", "1 page", "3–6 pages", "Custom app/pages"],
    ["Forms", "Basic", "Advanced", "Workflow-based"],
    ["Payments/bookings", "Not included", "Optional", "Included/custom"],
    ["Login/dashboard", "Not included", "Optional/light", "Included/custom"],
    ["Database", "No", "Optional/light", "Yes"],
    ["Best fit", "Simple launch", "Growing business", "Operations + automation"]
  ];

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Comparison</p>
          <h2>Choose based on what the website needs to do.</h2>
        </div>
      </div>
      <div className="comparison-table">
        <div className="table-row table-head"><span>Feature</span><span>Beginner</span><span>Intermediate</span><span>Pro</span></div>
        {rows.map((row) => <div className="table-row" key={row[0]}>{row.map((cell) => <span key={`${row[0]}-${cell}`}>{cell}</span>)}</div>)}
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="section industries">
      <div className="section-head center">
        <p className="eyebrow small">Who this works for</p>
        <h2>Built for businesses that need more than a social media page.</h2>
      </div>
      <div className="industry-grid">{industries.map((industry) => <span key={industry}>{industry}</span>)}</div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contact" className="section">
      <div className="contact-card">
        <div>
          <p className="eyebrow small">Start the project</p>
          <h2>Tell me what kind of website you need and I’ll help choose the right tier.</h2>
          <p>
            Use the form to explain your business, your ideal package, and any custom features. The quote builder helps start the conversation, but the final quote is based on the real scope.
          </p>
          <div className="contact-actions">
            <a className="btn primary" href={`mailto:${ownerEmail}`}><Mail size={18} /> Email Me</a>
            <a className="btn secondary" href="#quote">Build Estimate</a>
          </div>
        </div>
        <form
          className="lead-form"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const subject = encodeURIComponent("Website project request");
            const body = encodeURIComponent(
              `Name: ${data.get("name")}\nBusiness: ${data.get("business")}\nPackage: ${data.get("package")}\nHosting: ${data.get("hosting")}\nMessage: ${data.get("message")}`
            );
            window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
          }}
        >
          <label>Name<input name="name" required placeholder="Your name" /></label>
          <label>Business<input name="business" required placeholder="Business name" /></label>
          <label>Package interest<select name="package" defaultValue="Intermediate"><option>Beginner</option><option>Intermediate</option><option>Pro</option><option>Not sure yet</option></select></label>
          <label>Hosting preference<select name="hosting" defaultValue="Managed hosting"><option>Managed hosting / maintenance</option><option>Self-hosted file handoff</option><option>Not sure yet</option></select></label>
          <label>What should the website do?<textarea name="message" rows="4" placeholder="Pages, payments, booking, admin tools, customer portal, integrations, etc." /></label>
          <button type="submit">Send Website Request <ArrowRight size={17} /></button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a className="brand" href="#top"><span className="brand-icon"><Code2 size={20} /></span><span><strong>LaunchLine</strong><small>Websites</small></span></a>
      <p>Beginner, Intermediate, and Pro websites for businesses that want to grow.</p>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
