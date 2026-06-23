import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Code2,
  CreditCard,
  Crown,
  Database,
  ExternalLink,
  FileText,
  FolderKanban,
  Globe2,
  Hammer,
  Home,
  Image,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  MousePointerClick,
  Paintbrush,
  Phone,
  Rocket,
  Search,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  UploadCloud,
  UserRound,
  WalletCards,
  Workflow,
  Wrench,
  X,
  Zap
} from "lucide-react";
import "./styles.css";

const ownerEmail = "rcolton640@gmail.com";

const tiers = {
  beginner: {
    slug: "beginner",
    name: "Beginner",
    label: "Clean one-page website",
    basePrice: 499,
    priceText: "$499+",
    timeline: "3-5 days",
    icon: LayoutTemplate,
    sampleBusiness: "Spark & Shine Mobile Detailing",
    promise: "A polished one-page site that helps a local business look legitimate and turn visitors into calls, texts, or quote requests.",
    bestFor: "New businesses, solo services, portfolios, and local companies that need a credible online presence fast.",
    notFor: "Accounts, payments, private dashboards, database workflows, or heavy automation unless those features are added.",
    cta: "View Beginner Demo",
    purpose: "I need a clean site that makes my business look professional and gets people to contact me.",
    includes: [
      "Responsive one-page layout",
      "Hero, services, about, reviews, FAQ, and contact sections",
      "Click-to-call button",
      "Simple quote/contact form",
      "Basic SEO title and page description",
      "No login, payments, admin dashboard, or database workflow by default"
    ]
  },
  intermediate: {
    slug: "intermediate",
    name: "Intermediate",
    label: "Multi-page business website",
    basePrice: 999,
    priceText: "$999+",
    timeline: "1-2 weeks",
    icon: Rocket,
    sampleBusiness: "Iron Ridge Home Services",
    promise: "A complete business website with stronger service pages, proof, project examples, FAQs, and a better lead flow.",
    bestFor: "Contractors, septic companies, med spas, gyms, restaurants, landscapers, coaches, and service businesses with more to explain.",
    notFor: "Businesses that need customer accounts, staff tools, or app-style workflows as the core product.",
    cta: "View Intermediate Demo",
    purpose: "I need more than a landing page. I need a real business website that explains my services and generates better leads.",
    includes: [
      "Homepage plus multiple service pages",
      "Gallery or portfolio section",
      "Testimonials, process, FAQ, and lead form",
      "Service-area or SEO page examples",
      "Stronger conversion layout",
      "Booking, payments, and saved lead workflows available as add-ons"
    ]
  },
  pro: {
    slug: "pro",
    name: "Pro",
    label: "Custom web app or platform",
    basePrice: 1999,
    priceText: "$1,999+",
    timeline: "2-5 weeks",
    icon: Crown,
    sampleBusiness: "Apex Performance Portal",
    promise: "A business platform with customer accounts, dashboards, payments, uploads, requests, notifications, and management tools.",
    bestFor: "Coaching portals, booking platforms, contractor client portals, training systems, marketplaces, and workflow-heavy service businesses.",
    notFor: "Simple brochure websites that only need information pages and a contact button.",
    cta: "View Pro Demo",
    purpose: "I need my website to run part of my business, not just display information.",
    includes: [
      "Login and customer portal screens",
      "Admin dashboard and management buttons",
      "Request, booking, quote, or payment workflows",
      "Uploads, notifications, and status tracking",
      "Database-style records table",
      "Scope review required for integrations and complex dashboards"
    ]
  }
};

const tierOrder = [tiers.beginner, tiers.intermediate, tiers.pro];

const addOns = [
  {
    key: "booking",
    name: "Booking / Scheduling",
    shortName: "Booking",
    price: 300,
    icon: CalendarDays,
    business: "Let customers request appointments, inspections, lessons, calls, or service windows without a long back-and-forth.",
    technical: "Adds service selection, date or time preference fields, confirmation states, and a request summary that can connect to email or a backend workflow.",
    steps: ["Choose service", "Pick a time", "Request confirmed"],
    effects: {
      beginner: "Adds a schedule appointment call-to-action and a compact service request section.",
      intermediate: "Adds a dedicated booking tab with project type, preferred date, and contact details.",
      pro: "Adds request scheduling, assignment status, appointment history, and admin follow-up actions."
    }
  },
  {
    key: "payments",
    name: "Payments / Deposits",
    shortName: "Payments",
    price: 350,
    icon: WalletCards,
    business: "Collect deposits, invoices, quote payments, or checkout payments directly through the website.",
    technical: "Adds checkout-ready screens, itemized totals, paid/unpaid states, receipt messaging, and integration space for providers like Stripe.",
    steps: ["Review total", "Pay deposit", "Receipt saved"],
    effects: {
      beginner: "Adds a pay deposit section for simple services or appointment holds.",
      intermediate: "Adds estimate deposit or invoice payment panels to the lead flow.",
      pro: "Adds invoice status, checkout preview, payment history, and admin controls."
    }
  },
  {
    key: "portal",
    name: "Customer Portal",
    shortName: "Portal",
    price: 500,
    icon: UserRound,
    business: "Give customers a private place to log in, view requests, update details, and track progress.",
    technical: "Adds account screens, saved request history, profile fields, private routing, and role-aware customer views.",
    steps: ["Sign in", "View history", "Track progress"],
    effects: {
      beginner: "Adds a small account-access concept, usually better suited for a Pro build.",
      intermediate: "Adds a customer account preview next to the quote flow.",
      pro: "Adds full customer dashboard tabs, profile details, request history, and saved documents."
    }
  },
  {
    key: "admin",
    name: "Admin Dashboard",
    shortName: "Admin",
    price: 650,
    icon: LayoutDashboard,
    business: "Manage business activity from one private dashboard instead of hunting through emails, texts, and spreadsheets.",
    technical: "Adds private management screens, status controls, metrics, tables, and action buttons for the business owner or staff.",
    steps: ["View activity", "Update status", "Send follow-up"],
    effects: {
      beginner: "Adds a private owner view concept for incoming form requests.",
      intermediate: "Adds a lead manager preview with quote statuses and next actions.",
      pro: "Adds a complete admin dashboard with metrics, records, workflow buttons, and team-facing tools."
    }
  },
  {
    key: "database",
    name: "Saved Customer Requests",
    shortName: "Records",
    price: 500,
    icon: Database,
    business: "Store customer requests, orders, uploads, and messages so nothing gets lost.",
    technical: "Adds database-backed records, saved states, request IDs, activity history, and structured retrieval for admin or customer screens.",
    steps: ["Save request", "Update status", "Find history"],
    effects: {
      beginner: "Stores form submissions instead of only sending an email.",
      intermediate: "Adds a submitted lead list with names, services, status, and follow-up priority.",
      pro: "Adds searchable records for customers, requests, payments, uploads, and status changes."
    }
  },
  {
    key: "uploads",
    name: "File / PDF / Video Uploads",
    shortName: "Uploads",
    price: 450,
    icon: UploadCloud,
    business: "Let customers send photos, PDFs, documents, videos, forms, or project materials through the site.",
    technical: "Adds upload fields, accepted file states, progress messaging, storage planning, and admin/customer review states.",
    steps: ["Attach file", "Upload complete", "Ready for review"],
    effects: {
      beginner: "Adds a simple send photos or documents field to the quote form.",
      intermediate: "Adds project photo upload inside the request quote workflow.",
      pro: "Adds file submission areas, review status, file history, and admin download actions."
    }
  },
  {
    key: "notifications",
    name: "Notifications",
    shortName: "Alerts",
    price: 300,
    icon: Bell,
    business: "Alert customers or admins when new leads, messages, payments, uploads, or status changes happen.",
    technical: "Adds alert badges, activity feed entries, unread states, status messages, and email/SMS-ready event hooks.",
    steps: ["New activity", "Badge appears", "Follow-up sent"],
    effects: {
      beginner: "Shows form or quote alerts, useful when connected to a real form workflow.",
      intermediate: "Adds a new lead received alert and follow-up reminder.",
      pro: "Adds notification badge, customer activity feed, admin alerts, and status-change messages."
    }
  },
  {
    key: "seo",
    name: "Extra SEO Pages",
    shortName: "SEO Pages",
    price: 250,
    icon: Search,
    business: "Add service or location pages so customers can find and understand specific offerings.",
    technical: "Adds structured page content, metadata, headings, internal links, and search-focused sections for services or locations.",
    steps: ["Choose topic", "Add local copy", "Publish page"],
    effects: {
      beginner: "Adds a small set of service or location tabs to support search visibility.",
      intermediate: "Adds dedicated service-area and location page examples.",
      pro: "Adds public marketing/service pages in addition to the private app."
    }
  },
  {
    key: "integrations",
    name: "Custom Integrations*",
    shortName: "Integrations*",
    price: 750,
    icon: Workflow,
    business: "Connect the website to tools your business already uses, such as email, CRM, maps, forms, APIs, calendars, or automations.",
    technical: "Adds third-party API connections, sync states, credentials planning, error states, automation steps, and custom workflow logic.",
    steps: ["Connect tool", "Sync data", "Automation runs"],
    effects: {
      beginner: "Adds lightweight handoff to an email, form, CRM, or calendar tool when the scope is simple.",
      intermediate: "Adds CRM, map, calendar, or lead-routing integrations to the site workflow.",
      pro: "Adds connected tools, automated events, sync status, and workflow history."
    }
  }
];

const hostingOptions = {
  managed: {
    label: "Managed Hosting & Maintenance",
    monthly: 99,
    short: "Hands-off monthly support",
    description: "For clients who prefer a hands-off experience, I provide ongoing hosting, deployment support, monitoring, maintenance, and technical assistance for a monthly service fee."
  },
  handoff: {
    label: "Self-Hosted File Handoff",
    monthly: 0,
    short: "Client-owned hosting",
    description: "Clients who prefer to manage their own hosting receive the completed project files, assets, and basic deployment instructions after launch."
  }
};

const portfolio = [
  {
    title: "Goodman Pickleball Coaching",
    type: "Full Pro platform",
    url: "https://www.goodmanpickleball.com",
    summary: "A custom coaching platform with customer accounts, coach dashboards, admin controls, custom quote flow, payments, notifications, and uploads.",
    alignment: "Best aligned with the Pro tier because the website supports real business operations, not just marketing pages.",
    tags: ["Customer accounts", "Coach dashboards", "Admin controls", "Payments", "Uploads"]
  },
  {
    title: "Big Papa Joe Septic",
    type: "Business/service website",
    url: "",
    summary: "A service-business website concept with service pages, contact flow, payments, FAQ, testimonials, and admin tools.",
    alignment: "Shows the path from Intermediate business site to Pro-style operations when payments and admin tools are added.",
    tags: ["Service pages", "Contact flow", "Payments", "FAQ", "Admin tools"]
  }
];

const packageComparison = [
  ["Beginner", "Simple presence", "One-page site with core content and contact flow."],
  ["Intermediate", "Lead generation", "Multiple pages, deeper proof, and stronger service explanations."],
  ["Pro", "Business system", "Portals, dashboards, payments, records, uploads, and workflows."]
];

function App() {
  const route = window.location.pathname.replace(/^\/+/, "").toLowerCase() || "home";

  if (route === "beginner") return <Shell><BeginnerPage /></Shell>;
  if (route === "intermediate") return <Shell><IntermediatePage /></Shell>;
  if (route === "pro") return <Shell><ProPage /></Shell>;
  if (route === "builder" || route === "build-your-dream-website") return <Shell compactFooter><DreamBuilder /></Shell>;

  return (
    <Shell>
      <HomePage />
    </Shell>
  );
}

function Shell({ children, compactFooter = false }) {
  return (
    <div className="app">
      <Nav />
      <main>{children}</main>
      {!compactFooter && <Footer />}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-shell">
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="LaunchLine Studio home">
          <span className="brand-mark"><Code2 size={20} /></span>
          <span><strong>LaunchLine</strong><small>Studio</small></span>
        </a>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <a href="/beginner">Beginner</a>
          <a href="/intermediate">Intermediate</a>
          <a href="/pro">Pro</a>
          <a href="/builder">Builder</a>
          <a href="/#contact">Contact</a>
        </div>

        <a className="nav-cta" href="/builder">Build My Website <ArrowRight size={16} /></a>
        <button className="mobile-toggle" type="button" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <ValueSection />
      <PackageCards />
      <BuilderCallout />
      <PortfolioProof />
      <HostingSection />
      <FuturePolicy />
      <ProcessSection />
      <ContactSection />
    </>
  );
}

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-window hero-window-main">
          <div className="window-bar"><span /><span /><span /></div>
          <div className="hero-window-content">
            <div className="visual-nav"><b>Service Co.</b><i>Services</i><i>Reviews</i><i>Quote</i></div>
            <div className="visual-hero">
              <p>Local business website</p>
              <strong>Clean pages. Clear calls. Better leads.</strong>
            </div>
            <div className="visual-grid">
              <span>Services</span>
              <span>Booking</span>
              <span>Payments</span>
              <span>Reviews</span>
            </div>
          </div>
        </div>
        <div className="hero-window hero-window-side">
          <div className="metric-pill"><BarChart3 size={17} /> Quote estimate</div>
          <div className="mini-dashboard">
            <span><strong>18</strong> new leads</span>
            <span><strong>$2.1k</strong> deposits</span>
            <span><strong>7</strong> uploads</span>
          </div>
        </div>
        <div className="hero-window hero-window-mobile">
          <div className="phone-top" />
          <strong>Book service</strong>
          <span>Today, 3:30 PM</span>
          <button>Request quote</button>
        </div>
      </div>

      <div className="hero-content">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="eyebrow"><BadgeCheck size={16} /> Website packages for real small businesses</p>
          <h1>Websites that help businesses get found, trusted, and contacted.</h1>
          <p className="hero-text">
            LaunchLine Studio builds polished websites and custom web platforms for business owners who need more than a generic template. Choose a simple one-page site, a deeper business website, or a platform that runs real workflows.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="/builder">Build Your Dream Website <ArrowRight size={18} /></a>
            <a className="btn secondary" href="#packages">View Packages</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ValueSection() {
  return (
    <section className="section value-section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Choose the right starting point</p>
          <h2>Beginner, Intermediate, and Pro are built for different business needs.</h2>
        </div>
        <p>
          A business owner should be able to understand what they are buying before they ever ask for a quote. Each package has a full demo, realistic content, clear limits, and optional add-ons.
        </p>
      </div>
      <div className="comparison-row">
        {packageComparison.map(([name, title, text]) => (
          <article className="comparison-card" key={name}>
            <span>{name}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PackageCards() {
  return (
    <section id="packages" className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Website packages</p>
          <h2>Open a tier to see the actual kind of website a client receives.</h2>
        </div>
      </div>
      <div className="tier-grid">
        {tierOrder.map((tier, index) => (
          <PackageCard tier={tier} index={index} key={tier.slug} />
        ))}
      </div>
    </section>
  );
}

function PackageCard({ tier, index }) {
  const Icon = tier.icon;

  return (
    <motion.article className="package-card" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.06 }}>
      <div className="package-top">
        <span className="icon-box"><Icon size={24} /></span>
        <span>{tier.timeline}</span>
      </div>
      <h3>{tier.name}</h3>
      <p className="package-label">{tier.label}</p>
      <p>{tier.promise}</p>
      <div className="price-row">
        <strong>{tier.priceText}</strong>
        <small>{tier.purpose}</small>
      </div>
      <a className="btn primary package-btn" href={`/${tier.slug}`}>{tier.cta} <ChevronRight size={17} /></a>
    </motion.article>
  );
}

function BuilderCallout() {
  return (
    <section className="builder-band">
      <div className="section builder-band-inner">
        <div>
          <p className="eyebrow small">Build Your Dream Website</p>
          <h2>Pick a base tier, add business features, and see the estimate update live.</h2>
          <p>
            The builder shows how booking, payments, portals, admin tools, uploads, notifications, SEO pages, saved records, and integrations change the website experience.
          </p>
        </div>
        <a className="btn primary" href="/builder">Open Builder <ArrowRight size={18} /></a>
      </div>
    </section>
  );
}

function PortfolioProof() {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Portfolio proof</p>
          <h2>Real project examples tied back to the package tiers.</h2>
        </div>
        <p>
          Beginner creates simple presence, Intermediate expands a business website, and Pro turns a website into a platform with workflows.
        </p>
      </div>
      <div className="portfolio-grid">
        {portfolio.map((item) => (
          <article className="portfolio-card" key={item.title}>
            <div className="portfolio-visual">
              <Globe2 size={38} />
              <strong>{item.title}</strong>
              <span>{item.type}</span>
            </div>
            <div className="portfolio-copy">
              <span>{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <p className="alignment-copy">{item.alignment}</p>
              <div className="tag-row">
                {item.tags.map((tag) => <em key={tag}>{tag}</em>)}
              </div>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer">View live example <ExternalLink size={15} /></a>
              ) : (
                <a href="/builder">Build a similar quote <ArrowRight size={15} /></a>
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
    <section className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Hosting and support</p>
          <h2>Two clear options after launch.</h2>
        </div>
        <p>
          Some clients want ongoing help. Others want the project files and prefer to manage their own hosting. Both paths are clear before launch.
        </p>
      </div>
      <div className="hosting-grid">
        <article className="hosting-card">
          <Server size={28} />
          <h3>Managed Hosting & Maintenance</h3>
          <p>{hostingOptions.managed.description} This helps keep the website online, updated, and operating smoothly while the business focuses on its customers.</p>
          <ul>
            <li><Check size={16} /> Hosting setup</li>
            <li><Check size={16} /> Deployment support</li>
            <li><Check size={16} /> General uptime monitoring</li>
            <li><Check size={16} /> Technical issue resolution</li>
            <li><Check size={16} /> Minor maintenance</li>
            <li><Check size={16} /> Backups and security-conscious updates</li>
            <li><Check size={16} /> Optional small content updates depending on plan</li>
          </ul>
        </article>
        <article className="hosting-card">
          <FileText size={28} />
          <h3>Self-Hosted File Handoff</h3>
          <p>{hostingOptions.handoff.description} I will assist with the initial setup, but future hosting, updates, maintenance, bug fixes, and new features become the client's responsibility unless separately quoted.</p>
          <ul>
            <li><Check size={16} /> Full project files</li>
            <li><Check size={16} /> Initial deployment help</li>
            <li><Check size={16} /> Basic instructions</li>
            <li><Check size={16} /> No ongoing support unless paid</li>
            <li><Check size={16} /> Future changes billed separately</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function FuturePolicy() {
  return (
    <section className="section policy-section">
      <div className="policy-layout">
        <div>
          <p className="eyebrow small">Future Updates & Enhancements</p>
          <h2>Scope stays clear after launch.</h2>
        </div>
        <div>
          <p>
            After the original project scope is completed, additional features, redesign requests, integrations, bug fixes, or workflow changes may be completed under a separate fixed-price quote or hourly development agreement.
          </p>
          <ul className="policy-list">
            <li><Check size={16} /> New features are quoted separately.</li>
            <li><Check size={16} /> Bug fixes after handoff may require a flat fee if not under maintenance.</li>
            <li><Check size={16} /> New integrations are separate work.</li>
            <li><Check size={16} /> Design changes after approval may increase cost.</li>
            <li><Check size={16} /> Ongoing maintenance is available through monthly support.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    ["Discovery", "Clarify goals, pages, features, audience, content readiness, and must-have business workflows.", MousePointerClick],
    ["Scope", "Turn the idea into a clear package, add-on list, hosting choice, timeline, and starting estimate.", ClipboardCheck],
    ["Build", "Design, develop, revise, and prepare the website or platform for launch.", Wrench],
    ["Launch", "Deploy with managed support or provide the completed files and handoff instructions.", Zap]
  ];

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">What happens next</p>
          <h2>A simple path from idea to launch.</h2>
        </div>
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

function ContactSection({ compact = false }) {
  return (
    <section id="contact" className={`section ${compact ? "compact-contact" : ""}`}>
      <div className="contact-layout">
        <div>
          <p className="eyebrow small">Request a quote</p>
          <h2>Tell me what your website needs to do.</h2>
          <p>
            Share the tier you are considering, the features you want, and whether you prefer managed hosting or a file handoff. The first estimate is a starting point, then final pricing is scoped around the real project.
          </p>
          <div className="contact-points">
            <span><Mail size={16} /> {ownerEmail}</span>
            <span><ShieldCheck size={16} /> Clear scope before build</span>
            <span><LifeBuoy size={16} /> Monthly support available</span>
          </div>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}

function LeadForm({ presetTier = "Intermediate" }) {
  return (
    <form className="lead-form" onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const subject = encodeURIComponent("Website project request");
      const body = encodeURIComponent(
        `Name: ${data.get("name")}\nBusiness: ${data.get("business")}\nEmail: ${data.get("email")}\nTier: ${data.get("tier")}\nHosting: ${data.get("hosting")}\nMessage: ${data.get("message")}`
      );
      window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
    }}>
      <label>Name<input name="name" required placeholder="Your name" /></label>
      <label>Business<input name="business" required placeholder="Business name" /></label>
      <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
      <label>Tier interest
        <select name="tier" defaultValue={presetTier}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Pro</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label>Hosting preference
        <select name="hosting" defaultValue="Managed hosting / maintenance">
          <option>Managed hosting / maintenance</option>
          <option>Self-hosted file handoff</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label>What should the website do?
        <textarea name="message" rows="4" placeholder="Tell me about pages, booking, payments, dashboards, uploads, SEO pages, or integrations." />
      </label>
      <button type="submit">Send Website Request <Send size={17} /></button>
    </form>
  );
}

function TierIntro({ tier }) {
  const Icon = tier.icon;

  return (
    <section className="tier-intro">
      <div className="section tier-intro-grid">
        <div>
          <p className="eyebrow"><Icon size={16} /> {tier.name} package demo</p>
          <h1>{tier.sampleBusiness}</h1>
          <p className="hero-text">{tier.promise}</p>
          <div className="hero-actions">
            <a className="btn primary" href="/builder">Customize This Tier</a>
            <a className="btn secondary" href="#demo">View Demo Page</a>
          </div>
        </div>
        <aside className="tier-summary-panel">
          <span>{tier.label}</span>
          <strong>{tier.priceText}</strong>
          <small>{tier.timeline}</small>
          <p>{tier.purpose}</p>
        </aside>
      </div>
    </section>
  );
}

function PackageDetails({ tier }) {
  return (
    <section className="section">
      <div className="details-grid">
        <article className="detail-card">
          <h3>Included by default</h3>
          <ul>{tier.includes.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
        </article>
        <article className="detail-card">
          <h3>Best fit</h3>
          <p>{tier.bestFor}</p>
          <h3 className="detail-subhead">Not the right fit when</h3>
          <p>{tier.notFor}</p>
        </article>
        <article className="detail-card action-detail">
          <h3>Add features live</h3>
          <p>The builder shows how optional features change the site preview and starting estimate.</p>
          <a className="btn primary" href="/builder">Open Builder <ArrowRight size={16} /></a>
        </article>
      </div>
    </section>
  );
}

function BeginnerPage() {
  const tier = tiers.beginner;

  return (
    <>
      <TierIntro tier={tier} />
      <section id="demo" className="sample-page beginner-sample">
        <BusinessHeader business="Spark & Shine Mobile Detailing" links={["Services", "Reviews", "FAQ", "Contact"]} phone="(555) 281-4400" />
        <section className="sample-hero two-column">
          <div>
            <p className="sample-kicker">Mobile detailing in Lakeland, FL</p>
            <h2>Fresh, careful detailing brought straight to your driveway.</h2>
            <p>
              Spark & Shine helps busy car owners protect their vehicle, restore the interior, and keep a clean ride without losing half a day at a shop.
            </p>
            <div className="sample-actions">
              <a className="sample-btn primary" href="tel:+15552814400"><Phone size={17} /> Call Now</a>
              <a className="sample-btn" href="#beginner-quote">Request Quote</a>
            </div>
          </div>
          <div className="detail-visual">
            <div className="shine-card">
              <Sparkles size={30} />
              <strong>Same-week openings</strong>
              <span>Interior, exterior, and full detail packages</span>
            </div>
          </div>
        </section>

        <section className="sample-section">
          <div className="sample-section-head">
            <p>Services</p>
            <h3>Simple packages customers can understand quickly.</h3>
          </div>
          <div className="service-grid">
            {[
              ["Express Wash", "Foam wash, wheels, windows, tire shine, and a hand dry for a clean weekly reset."],
              ["Interior Refresh", "Vacuum, wipe down, cup holders, plastics, glass, mats, and odor treatment."],
              ["Full Detail", "Interior refresh plus exterior wash, paint-safe decontamination, and protective spray sealant."]
            ].map(([title, text]) => <ServiceCard title={title} text={text} key={title} />)}
          </div>
        </section>

        <section className="sample-section two-column trust-section">
          <div>
            <p className="sample-kicker">About</p>
            <h3>Locally owned, fully mobile, and careful with every vehicle.</h3>
            <p>
              Customers choose Spark & Shine because appointments are easy, pricing is clear, and the work is done with professional products that protect the vehicle.
            </p>
          </div>
          <div className="trust-list">
            <span><ShieldCheck size={18} /> Insured service</span>
            <span><BadgeCheck size={18} /> Satisfaction check before leaving</span>
            <span><MapPin size={18} /> Serving Lakeland and nearby neighborhoods</span>
          </div>
        </section>

        <section className="sample-section">
          <div className="sample-section-head">
            <p>Reviews</p>
            <h3>Real trust signals for a simple local service site.</h3>
          </div>
          <div className="review-grid">
            {[
              ["Maya R.", "My SUV looked new again, and booking was incredibly easy."],
              ["Jordan P.", "Showed up on time, explained the packages, and did excellent work."],
              ["Tanya W.", "The interior refresh was worth every dollar. I booked the full detail next."]
            ].map(([name, text]) => <ReviewCard name={name} text={text} key={name} />)}
          </div>
        </section>

        <section className="sample-section two-column">
          <div>
            <p className="sample-kicker">FAQ</p>
            <h3>Answers that reduce hesitation before someone calls.</h3>
          </div>
          <div className="faq-list">
            <FaqItem question="Do you bring your own supplies?" answer="Yes. We bring professional products, tools, and water when needed." />
            <FaqItem question="How long does a full detail take?" answer="Most full details take 2-4 hours depending on vehicle size and condition." />
            <FaqItem question="Can I book at my office?" answer="Yes. Mobile appointments can be scheduled at home or work when the location is accessible." />
          </div>
        </section>

        <section id="beginner-quote" className="sample-section quote-section">
          <div>
            <p className="sample-kicker">Contact</p>
            <h3>Request a detailing quote.</h3>
            <p>Beginner sites keep the contact path obvious: call, text, or send a short form.</p>
          </div>
          <form className="sample-form">
            <input placeholder="Name" />
            <input placeholder="Vehicle" />
            <select defaultValue="Full Detail">
              <option>Express Wash</option>
              <option>Interior Refresh</option>
              <option>Full Detail</option>
            </select>
            <textarea rows="3" placeholder="Tell us what you need cleaned." />
            <button type="button">Request Quote</button>
          </form>
        </section>
      </section>
      <PackageDetails tier={tier} />
      <ContactSection compact />
    </>
  );
}

function IntermediatePage() {
  const tier = tiers.intermediate;

  return (
    <>
      <TierIntro tier={tier} />
      <section id="demo" className="sample-page intermediate-sample">
        <BusinessHeader business="Iron Ridge Home Services" links={["Home", "Services", "Gallery", "Areas", "Quote"]} phone="(555) 664-9108" />
        <section className="sample-hero contractor-hero">
          <div>
            <p className="sample-kicker">Roofing, siding, and exterior repairs</p>
            <h2>Reliable exterior work for homes that need strong first impressions.</h2>
            <p>
              Iron Ridge helps homeowners plan repairs, compare service options, view project examples, and request a clear estimate.
            </p>
            <div className="sample-actions">
              <a className="sample-btn primary" href="#intermediate-quote">Request Estimate</a>
              <a className="sample-btn" href="#gallery">View Projects</a>
            </div>
          </div>
          <div className="stats-panel">
            <span><strong>14+</strong> years experience</span>
            <span><strong>260</strong> completed projects</span>
            <span><strong>4.9</strong> average rating</span>
          </div>
        </section>

        <section className="sample-section">
          <div className="sample-section-head">
            <p>Services</p>
            <h3>Dedicated service pages make the business easier to understand.</h3>
          </div>
          <div className="service-grid four">
            {[
              ["Roof Repair", "Leak checks, storm damage repairs, flashing, vents, and shingle replacement."],
              ["Siding Replacement", "Modern siding options, trim, weather barriers, and color guidance."],
              ["Gutter Systems", "Seamless gutters, guards, downspouts, and drainage corrections."],
              ["Exterior Inspections", "Photo-based reports with priority recommendations and repair timelines."]
            ].map(([title, text]) => <ServiceCard title={title} text={text} key={title} />)}
          </div>
        </section>

        <section id="gallery" className="sample-section">
          <div className="sample-section-head">
            <p>Gallery</p>
            <h3>Project proof helps visitors trust the business before they submit a lead.</h3>
          </div>
          <div className="gallery-grid">
            {[
              ["Storm repair", "Wind-damaged shingles replaced in one day."],
              ["Modern siding", "Full exterior refresh with updated trim."],
              ["Gutter upgrade", "Improved drainage for a low-slope roofline."]
            ].map(([title, text], index) => <ProjectCard title={title} text={text} index={index} key={title} />)}
          </div>
        </section>

        <section className="sample-section process-sample">
          <div className="sample-section-head">
            <p>Process</p>
            <h3>A stronger conversion flow sets expectations before the quote.</h3>
          </div>
          <div className="step-row">
            {[
              ["1", "Request", "Send project details and photos."],
              ["2", "Inspect", "Get a clear recommendation."],
              ["3", "Approve", "Confirm scope and schedule."],
              ["4", "Complete", "Review finished work and warranty notes."]
            ].map(([num, title, text]) => <StepCard num={num} title={title} text={text} key={title} />)}
          </div>
        </section>

        <section className="sample-section two-column">
          <div>
            <p className="sample-kicker">Service Areas</p>
            <h3>SEO-style location pages help local customers find the right service.</h3>
            <p>
              Example pages can target roofing repair in Lakeland, siding replacement in Winter Haven, and gutter installation in Plant City.
            </p>
          </div>
          <div className="area-list">
            <span>Lakeland roof repair</span>
            <span>Winter Haven siding</span>
            <span>Plant City gutters</span>
            <span>Auburndale exterior inspections</span>
          </div>
        </section>

        <section className="sample-section">
          <div className="review-grid">
            <ReviewCard name="Chris M." text="The website made it easy to understand which repair I needed before I called." />
            <ReviewCard name="Elena S." text="The gallery and process page helped us feel confident requesting a quote." />
            <ReviewCard name="Nathan B." text="Clear service pages, fast response, and a smooth estimate process." />
          </div>
        </section>

        <section className="sample-section two-column">
          <div>
            <p className="sample-kicker">FAQ</p>
            <h3>Deeper content handles common sales objections.</h3>
          </div>
          <div className="faq-list">
            <FaqItem question="Do you work with insurance claims?" answer="We provide photo documentation and repair estimates that homeowners can share with their carrier." />
            <FaqItem question="Can I send project photos first?" answer="Yes. Photos help us understand urgency and prepare better questions before the inspection." />
            <FaqItem question="Do you offer maintenance plans?" answer="Seasonal inspection options are available for homeowners who want recurring exterior checks." />
          </div>
        </section>

        <section id="intermediate-quote" className="sample-section quote-section">
          <div>
            <p className="sample-kicker">Request Quote</p>
            <h3>Lead forms can collect better project details.</h3>
            <p>Intermediate sites can ask smarter questions and route stronger leads to the business.</p>
          </div>
          <form className="sample-form">
            <input placeholder="Name" />
            <input placeholder="Project address" />
            <select defaultValue="Roof Repair">
              <option>Roof Repair</option>
              <option>Siding Replacement</option>
              <option>Gutter Systems</option>
              <option>Exterior Inspection</option>
            </select>
            <textarea rows="3" placeholder="Describe the issue or project." />
            <button type="button">Request Estimate</button>
          </form>
        </section>
      </section>
      <PackageDetails tier={tier} />
      <ContactSection compact />
    </>
  );
}

function ProPage() {
  const tier = tiers.pro;

  return (
    <>
      <TierIntro tier={tier} />
      <section id="demo" className="sample-page pro-sample">
        <BusinessHeader business="Apex Performance Portal" links={["Portal", "Requests", "Payments", "Uploads", "Admin"]} phone="Client platform" />
        <section className="platform-hero">
          <div>
            <p className="sample-kicker">Custom coaching operations platform</p>
            <h2>A private portal that manages clients, requests, payments, uploads, and coaching activity.</h2>
            <p>
              Pro builds are for businesses that need the website to run part of the business: customer accounts, staff views, admin actions, status tracking, and database-backed workflows.
            </p>
          </div>
          <div className="login-panel">
            <UserRound size={26} />
            <strong>Client Login</strong>
            <input placeholder="client@email.com" />
            <input placeholder="Password" type="password" />
            <button>Open Portal</button>
          </div>
        </section>

        <section className="platform-grid">
          <aside className="platform-sidebar">
            <strong>Apex Admin</strong>
            <span className="active"><LayoutDashboard size={16} /> Dashboard</span>
            <span><CalendarDays size={16} /> Requests</span>
            <span><WalletCards size={16} /> Payments</span>
            <span><UploadCloud size={16} /> Uploads</span>
            <span><Bell size={16} /> Notifications</span>
          </aside>
          <div className="platform-main">
            <div className="metric-row">
              <MetricCard label="Active clients" value="42" />
              <MetricCard label="Open requests" value="18" />
              <MetricCard label="Paid this month" value="$8.4k" />
              <MetricCard label="Unread alerts" value="7" />
            </div>

            <div className="dashboard-split">
              <section className="dashboard-panel">
                <div className="panel-head">
                  <h3>Customer Dashboard</h3>
                  <span>Portal preview</span>
                </div>
                <div className="portal-list">
                  <span><Check size={16} /> Training plan updated</span>
                  <span><CalendarDays size={16} /> Next session requested</span>
                  <span><UploadCloud size={16} /> Swing video uploaded</span>
                  <span><WalletCards size={16} /> Invoice deposit paid</span>
                </div>
              </section>
              <section className="dashboard-panel">
                <div className="panel-head">
                  <h3>Admin Dashboard</h3>
                  <span>Management tools</span>
                </div>
                <div className="action-list">
                  <button>Approve Request</button>
                  <button>Send Quote</button>
                  <button>Mark Paid</button>
                  <button>Notify Client</button>
                </div>
              </section>
            </div>

            <section className="dashboard-panel">
              <div className="panel-head">
                <h3>Saved Records</h3>
                <span>Database-style workflow</span>
              </div>
              <div className="records-table">
                <div><b>Client</b><b>Request</b><b>Status</b><b>Total</b></div>
                <div><span>Jamie R.</span><span>Video review</span><em>In review</em><span>$180</span></div>
                <div><span>Marcus T.</span><span>Private session</span><em>Scheduled</em><span>$240</span></div>
                <div><span>Priya S.</span><span>Training plan</span><em>Paid</em><span>$320</span></div>
              </div>
            </section>

            <section className="dashboard-panel workflow-panel">
              <div className="panel-head">
                <h3>Request Workflow</h3>
                <span>Booking, payment, uploads, and notifications</span>
              </div>
              <div className="workflow-lane">
                <span>Request received</span>
                <span>Quote sent</span>
                <span>Deposit paid</span>
                <span>File uploaded</span>
                <span>Coach notified</span>
              </div>
            </section>
          </div>
        </section>
      </section>
      <PackageDetails tier={tier} />
      <ContactSection compact />
    </>
  );
}

function BusinessHeader({ business, links, phone }) {
  return (
    <header className="business-header">
      <a href="#demo" className="business-brand">{business}</a>
      <nav>
        {links.map((link) => <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} key={link}>{link}</a>)}
      </nav>
      <span>{phone}</span>
    </header>
  );
}

function ServiceCard({ title, text }) {
  return (
    <article className="service-card">
      <h4>{title}</h4>
      <p>{text}</p>
    </article>
  );
}

function ReviewCard({ name, text }) {
  return (
    <article className="review-card">
      <div className="stars" aria-label="Five star review">
        {[0, 1, 2, 3, 4].map((item) => <Star size={15} fill="currentColor" key={item} />)}
      </div>
      <p>"{text}"</p>
      <strong>{name}</strong>
    </article>
  );
}

function FaqItem({ question, answer }) {
  return (
    <article className="faq-item">
      <h4>{question}</h4>
      <p>{answer}</p>
    </article>
  );
}

function ProjectCard({ title, text, index }) {
  return (
    <article className="project-card">
      <div className={`project-visual visual-${index + 1}`}>
        <Home size={34} />
      </div>
      <h4>{title}</h4>
      <p>{text}</p>
    </article>
  );
}

function StepCard({ num, title, text }) {
  return (
    <article className="step-card">
      <span>{num}</span>
      <h4>{title}</h4>
      <p>{text}</p>
    </article>
  );
}

function MetricCard({ label, value }) {
  return (
    <article className="metric-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function DreamBuilder() {
  const [tierSlug, setTierSlug] = useState("intermediate");
  const [selected, setSelected] = useState(["booking", "seo"]);
  const [activeAddon, setActiveAddon] = useState("booking");
  const [hosting, setHosting] = useState("managed");
  const tier = tiers[tierSlug];

  const selectedAddOns = useMemo(() => addOns.filter((item) => selected.includes(item.key)), [selected]);
  const buildTotal = useMemo(() => {
    return tier.basePrice + selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  }, [tier.basePrice, selectedAddOns]);
  const hostingMonthly = hostingOptions[hosting].monthly;

  const toggleAddon = (key) => {
    setSelected((current) => {
      const exists = current.includes(key);
      const next = exists ? current.filter((item) => item !== key) : [...current, key];
      if (!exists) setActiveAddon(key);
      if (exists && activeAddon === key) setActiveAddon(next[0] || "");
      return next;
    });
  };

  const selectedText = selectedAddOns.map((item) => item.name).join(", ");
  const quoteHref = `mailto:${ownerEmail}?subject=${encodeURIComponent("Dream website quote request")}&body=${encodeURIComponent(
    `Tier: ${tier.name}\nEstimated starting build price: $${buildTotal.toLocaleString()}+\nHosting preference: ${hostingOptions[hosting].label}${hostingMonthly ? ` - $${hostingMonthly}/mo starting support` : ""}\nSelected add-ons: ${selectedText || "None"}\n\nBusiness details:\n`
  )}`;

  return (
    <section className="builder-page">
      <div className="builder-layout">
        <aside className="builder-panel">
          <a className="back-link" href="/">Back to packages</a>
          <h1>Build your dream website.</h1>
          <p>Choose a base website, add business features, pick hosting, review the estimate, and request a quote.</p>

          <BuilderStep number="1" title="Choose base website">
            <div className="tier-picker">
              {tierOrder.map((item) => (
                <button type="button" key={item.slug} className={tierSlug === item.slug ? "active" : ""} onClick={() => setTierSlug(item.slug)}>
                  <strong>{item.name}</strong>
                  <span>{item.label}</span>
                  <em>{item.priceText}</em>
                </button>
              ))}
            </div>
          </BuilderStep>

          <BuilderStep number="2" title="Add business features">
            <div className="addon-picker">
              {addOns.map((addon) => {
                const Icon = addon.icon;
                const active = selected.includes(addon.key);
                const focused = activeAddon === addon.key;
                return (
                  <button
                    type="button"
                    key={addon.key}
                    className={`${active ? "active" : ""} ${focused ? "focused" : ""}`}
                    onClick={() => {
                      toggleAddon(addon.key);
                      setActiveAddon(addon.key);
                    }}
                  >
                    <span><Icon size={18} /></span>
                    <div>
                      <strong>{addon.name}</strong>
                      <small>+${addon.price.toLocaleString()}{addon.name.includes("*") ? "*" : ""}</small>
                      <p>{addon.business}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </BuilderStep>

          <BuilderStep number="3" title="Choose hosting preference">
            <div className="hosting-toggle">
              {Object.entries(hostingOptions).map(([key, option]) => (
                <button type="button" key={key} className={hosting === key ? "active" : ""} onClick={() => setHosting(key)}>
                  <strong>{option.short}</strong>
                  <span>{option.monthly ? `$${option.monthly}/mo starting` : "No monthly hosting fee"}</span>
                </button>
              ))}
            </div>
          </BuilderStep>
        </aside>

        <main className="builder-stage">
          <div className="quote-bar">
            <div>
              <span>Estimated starting build price</span>
              <strong>${buildTotal.toLocaleString()}+</strong>
            </div>
            <p>{hostingMonthly ? `Managed hosting starts around $${hostingMonthly}/mo after launch.` : "Self-hosted handoff has no monthly service fee from LaunchLine Studio."}</p>
          </div>

          <WebsitePreview tier={tier} selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon} hosting={hosting} />
          <AddonDemo key={activeAddon || "empty"} addonKey={activeAddon} selected={selected} tier={tier} />

          <div className="builder-disclaimer">
            <strong>Estimated starting price only.</strong>
            <p>Final pricing depends on exact scope, number of pages, content readiness, custom workflows, third-party integrations, revisions, and development time.</p>
            <p>Items marked with an asterisk may require a custom quote because pricing depends on the complexity of the request.</p>
            <div className="asterisk-list">
              <span>Custom Integrations*</span>
              <span>Advanced Automation*</span>
              <span>Complex Dashboards*</span>
              <span>Large Content Migration*</span>
            </div>
          </div>

          <div className="builder-request">
            <div>
              <h2>Step 5: Request quote</h2>
              <p>Send the selected package and add-ons so the final scope can be reviewed.</p>
            </div>
            <a className="btn primary" href={quoteHref}>Request This Website Quote <ArrowRight size={18} /></a>
          </div>
        </main>
      </div>
    </section>
  );
}

function BuilderStep({ number, title, children }) {
  return (
    <section className="builder-step">
      <h2><span>{number}</span>{title}</h2>
      {children}
    </section>
  );
}

function WebsitePreview({ tier, selected, activeAddon, setActiveAddon, hosting }) {
  if (tier.slug === "beginner") {
    return <BeginnerBuilderPreview tier={tier} selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon} hosting={hosting} />;
  }
  if (tier.slug === "intermediate") {
    return <IntermediateBuilderPreview tier={tier} selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon} hosting={hosting} />;
  }
  return <ProBuilderPreview tier={tier} selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon} hosting={hosting} />;
}

function PreviewShell({ tier, selected, activeAddon, setActiveAddon, hosting, children }) {
  return (
    <section className={`live-preview ${tier.slug}-preview`}>
      <header className="live-preview-head">
        <div>
          <span>{tier.name} live preview</span>
          <strong>{tier.sampleBusiness}</strong>
        </div>
        <HostingBadge hosting={hosting} />
      </header>
      <div className="preview-tabs">
        {selected.length ? selected.map((key) => {
          const addon = addOns.find((item) => item.key === key);
          if (!addon) return null;
          const Icon = addon.icon;
          return (
            <button type="button" key={key} className={activeAddon === key ? "active" : ""} onClick={() => setActiveAddon(key)}>
              <Icon size={15} /> {addon.shortName}
            </button>
          );
        }) : <span>No add-ons selected</span>}
      </div>
      {children}
    </section>
  );
}

function BeginnerBuilderPreview({ tier, selected, activeAddon, setActiveAddon, hosting }) {
  return (
    <PreviewShell tier={tier} selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon} hosting={hosting}>
      <div className="preview-site beginner-live">
        <nav><strong>Spark & Shine</strong><span>Home</span><span>Services</span><span>Reviews</span><span>FAQ</span><span>Contact</span></nav>
        <section className="preview-hero">
          <p>Mobile detailing</p>
          <h3>Professional one-page site with a direct path to contact.</h3>
          <button>{selected.includes("booking") ? "Schedule Appointment" : selected.includes("payments") ? "Pay Deposit" : "Call Today"}</button>
        </section>
        <div className="preview-content-grid">
          <ImpactCard title="Services" text="Wash, interior refresh, full detail." />
          <ImpactCard title="Reviews" text="Short trust-building testimonials." />
          <ImpactCard title="FAQ" text="Answers before visitors call." />
          <ImpactCard title="Contact" text="Phone number and simple form." />
        </div>
        <SelectedImpacts tier={tier} selected={selected} activeAddon={activeAddon} />
      </div>
    </PreviewShell>
  );
}

function IntermediateBuilderPreview({ tier, selected, activeAddon, setActiveAddon, hosting }) {
  return (
    <PreviewShell tier={tier} selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon} hosting={hosting}>
      <div className="preview-site intermediate-live">
        <nav><strong>Iron Ridge</strong><span>Home</span><span>Services</span><span>Gallery</span><span>Reviews</span><span>Contact</span>{selected.includes("booking") && <span>Booking</span>}</nav>
        <div className="multipage-preview">
          <aside>
            <strong>Pages</strong>
            <span className="active">Services</span>
            <span>Gallery</span>
            <span>Process</span>
            <span>FAQ</span>
            {selected.includes("seo") && <span>Location Pages</span>}
            {selected.includes("database") && <span>Submitted Leads</span>}
          </aside>
          <main>
            <section className="preview-hero">
              <p>Multi-page business site</p>
              <h3>Service pages, project proof, and stronger quote flow.</h3>
              <button>{selected.includes("booking") ? "Book Estimate" : "Request Quote"}</button>
            </section>
            <div className="preview-content-grid">
              <ImpactCard title="Roof Repair" text="Dedicated service page." />
              <ImpactCard title="Project Gallery" text="Before and after proof." />
              <ImpactCard title="Testimonials" text="Local trust signals." />
              <ImpactCard title="Lead Form" text="Better project details." />
            </div>
          </main>
        </div>
        <SelectedImpacts tier={tier} selected={selected} activeAddon={activeAddon} />
      </div>
    </PreviewShell>
  );
}

function ProBuilderPreview({ tier, selected, activeAddon, setActiveAddon, hosting }) {
  return (
    <PreviewShell tier={tier} selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon} hosting={hosting}>
      <div className="preview-app">
        <aside>
          <strong>Apex Portal</strong>
          <button type="button" className={selected.includes("portal") ? "active" : ""} onClick={() => setActiveAddon("portal")}><UserRound size={15} /> Customer Portal</button>
          <button type="button" className={selected.includes("booking") ? "active" : ""} onClick={() => setActiveAddon("booking")}><CalendarDays size={15} /> Requests</button>
          <button type="button" className={selected.includes("payments") ? "active" : ""} onClick={() => setActiveAddon("payments")}><WalletCards size={15} /> Payments</button>
          <button type="button" className={selected.includes("uploads") ? "active" : ""} onClick={() => setActiveAddon("uploads")}><UploadCloud size={15} /> Uploads</button>
          <button type="button" className={selected.includes("admin") ? "active" : ""} onClick={() => setActiveAddon("admin")}><LayoutDashboard size={15} /> Admin</button>
        </aside>
        <main>
          <div className="metric-row">
            <button type="button" onClick={() => setActiveAddon("database")} className={selected.includes("database") ? "active" : ""}><strong>128</strong><span>Records</span></button>
            <button type="button" onClick={() => setActiveAddon("payments")} className={selected.includes("payments") ? "active" : ""}><strong>$8.4k</strong><span>Payments</span></button>
            <button type="button" onClick={() => setActiveAddon("notifications")} className={selected.includes("notifications") ? "active" : ""}><strong>7</strong><span>Alerts</span></button>
          </div>
          <div className="app-workflow-grid">
            <ImpactCard title="Customer request" text={selected.includes("booking") ? "Scheduled and assigned." : "Ready for booking add-on."} active={activeAddon === "booking"} />
            <ImpactCard title="Quote payment" text={selected.includes("payments") ? "Deposit collected." : "Ready for payment add-on."} active={activeAddon === "payments"} />
            <ImpactCard title="Upload review" text={selected.includes("uploads") ? "Files waiting for approval." : "Ready for upload add-on."} active={activeAddon === "uploads"} />
            <ImpactCard title="Admin action" text={selected.includes("admin") ? "Status updated by staff." : "Ready for admin dashboard."} active={activeAddon === "admin"} />
          </div>
        </main>
      </div>
      <SelectedImpacts tier={tier} selected={selected} activeAddon={activeAddon} />
    </PreviewShell>
  );
}

function SelectedImpacts({ tier, selected, activeAddon }) {
  if (!selected.length) {
    return (
      <div className="impact-strip">
        <ImpactCard title="Base package" text={tier.promise} active />
      </div>
    );
  }

  return (
    <div className="impact-strip">
      {selected.map((key) => {
        const addon = addOns.find((item) => item.key === key);
        if (!addon) return null;
        const Icon = addon.icon;
        return (
          <article className={`impact-card ${activeAddon === key ? "active" : ""}`} key={key}>
            <Icon size={18} />
            <h4>{addon.shortName}</h4>
            <p>{addon.effects[tier.slug]}</p>
          </article>
        );
      })}
    </div>
  );
}

function ImpactCard({ title, text, active = false }) {
  return (
    <article className={`impact-card ${active ? "active" : ""}`}>
      <h4>{title}</h4>
      <p>{text}</p>
    </article>
  );
}

function HostingBadge({ hosting }) {
  return (
    <span className="hosting-badge">
      {hosting === "managed" ? <Server size={16} /> : <FileText size={16} />}
      {hostingOptions[hosting].short}
    </span>
  );
}

function AddonDemo({ addonKey, selected, tier }) {
  const [step, setStep] = useState(0);
  const addon = addOns.find((item) => item.key === addonKey);

  if (!addon || !selected.includes(addonKey)) {
    return (
      <section className="addon-demo empty">
        <h2>Add-on demo</h2>
        <p>Select any business feature to see a plain-English explanation, technical scope, mini demo, price, and preview change.</p>
      </section>
    );
  }

  const Icon = addon.icon;

  return (
    <section className="addon-demo">
      <div className="addon-demo-head">
        <span><Icon size={24} /></span>
        <div>
          <h2>{addon.name}</h2>
          <p>{addon.business}</p>
          <small>Starting add-on price: +${addon.price.toLocaleString()}{addon.name.includes("*") ? "*" : ""}</small>
        </div>
      </div>
      <div className="demo-grid">
        <div className="demo-screen">
          <Icon size={32} />
          <strong>{addon.steps[step]}</strong>
          <p>{addon.effects[tier.slug]}</p>
        </div>
        <div className="demo-steps">
          {addon.steps.map((item, index) => (
            <button type="button" key={item} className={step === index ? "active" : ""} onClick={() => setStep(index)}>
              <span>{index + 1}</span>{item}
            </button>
          ))}
        </div>
      </div>
      <div className="technical-note">
        <strong>Technical scope</strong>
        <p>{addon.technical}</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a className="brand" href="/"><span className="brand-mark"><Code2 size={20} /></span><span><strong>LaunchLine</strong><small>Studio</small></span></a>
      <p>Professional websites, business sites, and custom platforms with clear scope, demos, and support options.</p>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
