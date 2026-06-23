import React, { useState } from "react";
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
  Mail,
  MessageSquareText,
  MousePointerClick,
  Paintbrush,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  UserRound,
  WalletCards,
  Wrench,
  Zap
} from "lucide-react";
import "./styles.css";

const ownerEmail = "rcolton640@gmail.com";

const packages = [
  {
    name: "Beginner",
    badge: "Starter presence",
    price: "$499+",
    timeline: "3–5 days",
    icon: LayoutTemplate,
    gradient: "starter",
    description: "A clean one-page site that gives a business instant credibility and a place to send customers.",
    bestFor: "new businesses, solo services, simple portfolios, quick launches",
    promise: "Look legitimate, explain services, and collect leads fast.",
    features: [
      "One-page responsive landing site",
      "Hero, services, about, contact, FAQ",
      "Mobile-first layout",
      "Basic SEO title/description setup",
      "Click-to-call, email, and contact form",
      "Google Maps and social links"
    ],
    sections: ["Home", "Services", "About", "Contact"],
    deliverables: ["Live site", "Mobile version", "Basic handoff notes"]
  },
  {
    name: "Intermediate",
    badge: "Business growth",
    price: "$999+",
    timeline: "1–2 weeks",
    icon: Rocket,
    gradient: "growth",
    description: "A larger multi-page site built to explain services, show proof, capture leads, and build trust.",
    bestFor: "contractors, restaurants, coaching, local services, field businesses",
    promise: "Turn a simple online presence into a real sales tool.",
    features: [
      "3–6 page website",
      "Dedicated service pages",
      "Gallery, FAQ, testimonials, and contact",
      "Lead capture form and sales CTA layout",
      "Stronger local SEO structure",
      "Optional lightweight admin-editable content"
    ],
    sections: ["Home", "Services", "Gallery", "FAQ", "Contact"],
    deliverables: ["Live site", "SEO-ready pages", "Launch checklist"]
  },
  {
    name: "Pro",
    badge: "Custom platform",
    price: "$1,999+",
    timeline: "2–5 weeks",
    icon: Crown,
    gradient: "pro",
    description: "A full custom web app with logins, dashboards, payments, bookings, submissions, and operations.",
    bestFor: "coaches, marketplaces, booking platforms, businesses with workflows",
    promise: "Build the actual system behind the business, not just the brochure.",
    features: [
      "Custom frontend and backend",
      "User accounts and role dashboards",
      "Stripe payments and quote workflows",
      "Admin dashboard and database-backed content",
      "Bookings, forms, uploads, and notifications",
      "Railway deployment and connected business tools"
    ],
    sections: ["Portal", "Bookings", "Payments", "Admin", "Dashboard"],
    deliverables: ["Live web app", "Admin tools", "Deployment handoff"]
  }
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
    type: "Business Website + Admin Tools",
    url: "#",
    summary:
      "A service-business website built around services, contact, payments, FAQ, testimonials, marketplace-style pages, and admin management.",
    highlights: ["Service pages", "Contact flow", "Payment area", "Testimonials", "Admin pages"],
    stack: ["React", "Express", "MongoDB", "Tailwind"]
  }
];

const addOns = [
  ["Online payments", WalletCards, "Stripe checkout, payment pages, deposits, invoices, or order flows."],
  ["Booking system", CalendarDays, "Scheduling, appointment requests, service selections, and confirmation flows."],
  ["Admin dashboard", LayoutDashboard, "Manage users, content, requests, quotes, orders, and customer activity."],
  ["Customer portal", UserRound, "Logins, account pages, submissions, uploads, history, and profile settings."],
  ["SEO structure", Search, "Clean page structure, metadata, headings, service pages, and local search basics."],
  ["Database workflows", Database, "MongoDB-backed records for requests, messages, products, services, or submissions."]
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
        <TemplatePackages />
        <LiveWork />
        <InteractiveBuilder />
        <FeatureAddOns />
        <SalesProcess />
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
          <span>
            <strong>LaunchLine</strong>
            <small>Websites</small>
          </span>
        </a>
        <div className="nav-links">
          <a href="#templates">Packages</a>
          <a href="#work">Work</a>
          <a href="#builder">Builder</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-button" href="#contact">
          Start a Project <ArrowRight size={16} />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="section hero">
      <div className="hero-grid">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="eyebrow">
            <Sparkles size={16} />
            Website packages built from real client work
          </div>
          <h1>Choose the website that matches where your business is going.</h1>
          <p className="hero-text">
            Beginner, Intermediate, and Pro website packages make it easy for a business owner to understand what they need, what it costs, and what level of site will actually help them sell.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#templates">
              Compare Website Options <ArrowRight size={18} />
            </a>
            <a className="btn secondary" href="#work">
              See My Work
            </a>
          </div>
          <div className="micro-proof">
            <span><BadgeCheck size={16} /> Responsive builds</span>
            <span><ShieldCheck size={16} /> Business-ready</span>
            <span><Gauge size={16} /> Railway deployment</span>
          </div>
        </motion.div>

        <motion.div className="hero-showcase" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }}>
          <div className="browser-bar">
            <span />
            <span />
            <span />
            <p>business-preview.com</p>
          </div>
          <div className="site-preview">
            <div className="preview-hero">
              <div>
                <p>Local Business Website</p>
                <h3>Convert visitors into real customers.</h3>
              </div>
              <button>Request Quote</button>
            </div>
            <div className="preview-cards">
              <PreviewTile icon={Store} title="Services" text="Clear packages" />
              <PreviewTile icon={MessageSquareText} title="Leads" text="Contact form" />
              <PreviewTile icon={Star} title="Proof" text="Reviews" />
            </div>
            <div className="preview-dashboard">
              <div>
                <small>Build level</small>
                <strong>Beginner → Intermediate → Pro</strong>
              </div>
              <div className="bar-stack">
                <span />
                <span />
                <span />
              </div>
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
      <div>
        <strong>3</strong>
        <span>clear website levels</span>
      </div>
      <div>
        <strong>2</strong>
        <span>real project examples</span>
      </div>
      <div>
        <strong>100%</strong>
        <span>mobile-focused layouts</span>
      </div>
      <div>
        <strong>Railway</strong>
        <span>ready to deploy</span>
      </div>
    </section>
  );
}

function TemplatePackages() {
  return (
    <section id="templates" className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Website packages</p>
          <h2>Three options your clients can understand instantly.</h2>
        </div>
        <p>
          Each level gives you a clean sales conversation: start simple, grow into a full business site, or build a custom web platform.
        </p>
      </div>
      <div className="packages-grid">
        {packages.map((pkg, index) => (
          <PackageCard key={pkg.name} pkg={pkg} index={index} />
        ))}
      </div>
    </section>
  );
}

function PackageCard({ pkg, index }) {
  const Icon = pkg.icon;
  return (
    <motion.article className={`package-card ${pkg.gradient}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-90px" }} transition={{ duration: 0.45, delay: index * 0.08 }}>
      <div className="package-top">
        <span className="package-icon"><Icon size={24} /></span>
        <span className="package-badge">{pkg.badge}</span>
      </div>
      <h3>{pkg.name}</h3>
      <p className="package-description">{pkg.description}</p>
      <div className="price-line">
        <strong>{pkg.price}</strong>
        <small>{pkg.timeline}</small>
      </div>
      <div className="promise-box">
        <small>Goal</small>
        <p>{pkg.promise}</p>
      </div>
      <div className="best-for">
        <small>Best for</small>
        <p>{pkg.bestFor}</p>
      </div>
      <ul>
        {pkg.features.map((feature) => (
          <li key={feature}>
            <Check size={16} />
            {feature}
          </li>
        ))}
      </ul>
      <div className="pill-row">
        {pkg.sections.map((section) => (
          <span key={section}>{section}</span>
        ))}
      </div>
      <a className="card-cta" href="#contact">
        Ask for {pkg.name} <ChevronRight size={17} />
      </a>
    </motion.article>
  );
}

function LiveWork() {
  return (
    <section id="work" className="section work-section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Proof of work</p>
          <h2>Real builds that show what each level can become.</h2>
        </div>
        <p>
          Use these projects as talking points when a business is deciding between a simple site and a full platform.
        </p>
      </div>

      <div className="work-grid">
        {portfolio.map((item) => (
          <article className="work-card" key={item.title}>
            <div className="work-visual">
              <div className="work-window">
                <span />
                <span />
                <span />
              </div>
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
                {item.highlights.map((highlight) => (
                  <span key={highlight}>
                    <Check size={14} />
                    {highlight}
                  </span>
                ))}
              </div>
              <div className="stack-row">
                {item.stack.map((tag) => (
                  <em key={tag}>{tag}</em>
                ))}
              </div>
              {item.url !== "#" ? (
                <a href={item.url} target="_blank" rel="noreferrer">
                  View live example <ExternalLink size={15} />
                </a>
              ) : (
                <a href="#contact">
                  Ask to see this demo <ExternalLink size={15} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function InteractiveBuilder() {
  const [selected, setSelected] = useState("Intermediate");
  const [payments, setPayments] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [booking, setBooking] = useState(true);

  const base = selected === "Beginner" ? 499 : selected === "Intermediate" ? 999 : 1999;
  const estimate = base + (payments ? 350 : 0) + (admin ? 600 : 0) + (booking ? 300 : 0);

  return (
    <section id="builder" className="section builder-section">
      <div className="builder-card">
        <div className="builder-copy">
          <p className="eyebrow small">Website fit check</p>
          <h2>Help the business pick the right level.</h2>
          <p>
            This section acts like a quick sales tool. A business owner can select what they need and see why the project moves from Beginner to Pro.
          </p>
          <div className="estimate-box">
            <span>Starting estimate</span>
            <strong>${estimate.toLocaleString()}+</strong>
            <small>Final quote depends on content, integrations, and complexity.</small>
          </div>
        </div>
        <div className="builder-form">
          <label>
            Website level
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Pro</option>
            </select>
          </label>
          <Toggle checked={booking} setChecked={setBooking} label="Booking or request flow" />
          <Toggle checked={payments} setChecked={setPayments} label="Payments or checkout" />
          <Toggle checked={admin} setChecked={setAdmin} label="Admin dashboard" />
          <a className="btn primary full" href="#contact">
            Request this build <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Toggle({ checked, setChecked, label }) {
  return (
    <button type="button" className={`toggle ${checked ? "active" : ""}`} onClick={() => setChecked(!checked)}>
      <span>{checked ? <Check size={16} /> : null}</span>
      {label}
    </button>
  );
}

function FeatureAddOns() {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Add-on features</p>
          <h2>Features that turn a website into a business tool.</h2>
        </div>
        <p>These are the features that separate a basic website from a web app that actually runs part of the business.</p>
      </div>
      <div className="addon-grid">
        {addOns.map(([title, Icon, text]) => (
          <article className="addon-card" key={title}>
            <Icon size={26} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SalesProcess() {
  const steps = [
    ["Discovery", "Figure out what the business needs the website to do.", MousePointerClick],
    ["Design", "Match the brand, audience, service type, and sales goal.", Paintbrush],
    ["Build", "Create the pages, forms, dashboards, payments, or content system.", Wrench],
    ["Launch", "Deploy to Railway, connect the domain, and hand off instructions.", Zap]
  ];

  return (
    <section id="process" className="section">
      <div className="section-head center">
        <p className="eyebrow small">Process</p>
        <h2>A simple path from idea to launch.</h2>
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
    ["Responsive website", "Yes", "Yes", "Yes"],
    ["Multiple pages", "Limited", "Yes", "Yes"],
    ["Lead forms", "Basic", "Advanced", "Advanced"],
    ["Payments/bookings", "No", "Optional", "Yes"],
    ["Login/dashboard", "No", "Optional", "Yes"],
    ["Database workflows", "No", "Light", "Yes"],
    ["Best use", "Presence", "Growth", "Operations"]
  ];

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Comparison</p>
          <h2>Make the decision obvious.</h2>
        </div>
      </div>
      <div className="comparison-table">
        <div className="table-row table-head">
          <span>Feature</span>
          <span>Beginner</span>
          <span>Intermediate</span>
          <span>Pro</span>
        </div>
        {rows.map((row) => (
          <div className="table-row" key={row[0]}>
            {row.map((cell) => (
              <span key={`${row[0]}-${cell}`}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="section industries">
      <div className="section-head center">
        <p className="eyebrow small">Who this works for</p>
        <h2>Built for local businesses that need more than a Facebook page.</h2>
      </div>
      <div className="industry-grid">
        {industries.map((industry) => (
          <span key={industry}>{industry}</span>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contact" className="section">
      <div className="contact-card">
        <div>
          <p className="eyebrow small">Start selling websites</p>
          <h2>Send this page to a business owner and ask what level they want.</h2>
          <p>
            This page gives you a professional way to explain your work, show package options, and start a website sales conversation.
          </p>
          <div className="contact-actions">
            <a className="btn primary" href={`mailto:${ownerEmail}`}>
              <Mail size={18} /> Email Me
            </a>
            <a className="btn secondary" href="#templates">
              Compare Packages
            </a>
          </div>
        </div>
        <form
          className="lead-form"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const subject = encodeURIComponent("Website project request");
            const body = encodeURIComponent(
              `Name: ${data.get("name")}\nBusiness: ${data.get("business")}\nPackage: ${data.get("package")}\nMessage: ${data.get("message")}`
            );
            window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
          }}
        >
          <label>Name<input name="name" required placeholder="Your name" /></label>
          <label>Business<input name="business" required placeholder="Business name" /></label>
          <label>Package interest<select name="package" defaultValue="Intermediate"><option>Beginner</option><option>Intermediate</option><option>Pro</option><option>Not sure yet</option></select></label>
          <label>What should the website do?<textarea name="message" rows="4" placeholder="Tell me about pages, payments, booking, admin tools, or anything custom..." /></label>
          <button type="submit">Send Website Request <ArrowRight size={17} /></button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a className="brand" href="#top">
        <span className="brand-icon"><Code2 size={20} /></span>
        <span><strong>LaunchLine</strong><small>Websites</small></span>
      </a>
      <p>Beginner, Intermediate, and Pro websites for businesses that want to grow.</p>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
