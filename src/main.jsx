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
  Code2,
  Cpu,
  CreditCard,
  Crown,
  Database,
  ExternalLink,
  FileText,
  FolderKanban,
  Gauge,
  Globe2,
  Home,
  Image,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  Lock,
  Mail,
  Menu,
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
    price: 499,
    priceText: "$499+",
    timeline: "3–5 days",
    icon: LayoutTemplate,
    tone: "starter",
    label: "One-page credibility site",
    headline: "A professional site customers can trust immediately.",
    pitch: "Best when the business needs a clean online presence, service explanation, trust signals, and a direct way to contact or call.",
    visualGoal: "Simple, clean, focused on contact.",
    business: "BrightStart Mobile Detailing",
    pageType: "Landing page",
    sections: ["Hero", "Services", "Why Us", "Reviews", "FAQ", "Contact"],
    includes: [
      "One-page responsive site",
      "Service overview",
      "Review/trust section",
      "FAQ and contact area",
      "Click-to-call and email buttons",
      "Basic SEO setup"
    ],
    boundaries: [
      "No login system",
      "No database workflow",
      "No admin dashboard",
      "No payment/booking automation unless added"
    ]
  },
  intermediate: {
    slug: "intermediate",
    name: "Intermediate",
    price: 999,
    priceText: "$999+",
    timeline: "1–2 weeks",
    icon: Rocket,
    tone: "growth",
    label: "Multi-page growth website",
    headline: "A complete business site built to generate higher-quality leads.",
    pitch: "Best when the business needs service pages, proof, galleries, FAQ, stronger lead forms, and a more complete buying journey.",
    visualGoal: "More pages, more proof, stronger lead flow.",
    business: "Iron Ridge Contractors",
    pageType: "Multi-page business website",
    sections: ["Home", "Services", "Gallery", "Process", "FAQ", "Quote"],
    includes: [
      "3–6 page website",
      "Service detail pages",
      "Gallery or portfolio",
      "Lead capture form",
      "Testimonials and FAQ",
      "SEO-ready page structure"
    ],
    boundaries: [
      "Light admin only unless added",
      "No customer portal by default",
      "No advanced database workflows by default",
      "Payments/bookings are add-ons"
    ]
  },
  pro: {
    slug: "pro",
    name: "Pro",
    price: 1999,
    priceText: "$1,999+",
    timeline: "2–5 weeks",
    icon: Crown,
    tone: "pro",
    label: "Custom platform / web app",
    headline: "A website that runs the business workflow, not just the brochure.",
    pitch: "Best when the business needs logins, dashboards, payments, bookings, uploads, notifications, and database-backed operations.",
    visualGoal: "Portal, dashboard, automation, and workflows.",
    business: "Apex Coaching Portal",
    pageType: "Custom web app",
    sections: ["Portal", "Requests", "Payments", "Uploads", "Admin", "Reports"],
    includes: [
      "Frontend + backend",
      "Customer accounts",
      "Admin dashboards",
      "Payments or quote flows",
      "Database records",
      "Notifications and statuses"
    ],
    boundaries: [
      "Third-party fees are separate",
      "Unscoped integrations need review",
      "Ongoing support requires hosting plan",
      "Future features are quoted separately"
    ]
  }
};

const addOns = [
  {
    key: "booking",
    label: "Booking / Scheduling",
    price: 300,
    icon: CalendarDays,
    why: "Clients can request appointments without texting back and forth.",
    demoTitle: "Try booking a service",
    demoAction: "Open calendar",
    outcome: "Shows available services, preferred dates, and confirmation status."
  },
  {
    key: "payments",
    label: "Payments / Deposits",
    price: 350,
    icon: WalletCards,
    why: "Customers can pay deposits, quotes, invoices, or checkout directly online.",
    demoTitle: "Try a checkout card",
    demoAction: "View payment",
    outcome: "Shows itemized total, deposit option, and secure payment CTA."
  },
  {
    key: "portal",
    label: "Customer Portal",
    price: 500,
    icon: UserRound,
    why: "Customers can log in, view history, manage requests, and upload info.",
    demoTitle: "Open customer account",
    demoAction: "View portal",
    outcome: "Shows profile, saved requests, status timeline, and account actions."
  },
  {
    key: "admin",
    label: "Admin Dashboard",
    price: 650,
    icon: LayoutDashboard,
    why: "The business can manage leads, orders, requests, content, and users privately.",
    demoTitle: "Open admin dashboard",
    demoAction: "View admin",
    outcome: "Shows metrics, task queue, leads, orders, and management buttons."
  },
  {
    key: "database",
    label: "Database Workflows",
    price: 500,
    icon: Database,
    why: "The site can store customers, messages, quotes, orders, uploads, and statuses.",
    demoTitle: "View live records",
    demoAction: "Open records",
    outcome: "Shows saved customer records and workflow statuses."
  },
  {
    key: "uploads",
    label: "File / PDF / Video Uploads",
    price: 450,
    icon: UploadCloud,
    why: "Customers can submit documents, photos, videos, forms, or project files.",
    demoTitle: "Try upload area",
    demoAction: "View uploader",
    outcome: "Shows drag-and-drop style upload area and accepted file types."
  },
  {
    key: "notifications",
    label: "Notifications",
    price: 300,
    icon: Bell,
    why: "Users and admins can see unread messages, new requests, payments, or status changes.",
    demoTitle: "Trigger a notification",
    demoAction: "Show alert",
    outcome: "Shows badges, alerts, and activity feed updates."
  },
  {
    key: "seo",
    label: "Extra SEO Pages",
    price: 250,
    icon: Search,
    why: "Service and location pages help explain offerings and improve search coverage.",
    demoTitle: "View SEO pages",
    demoAction: "Show pages",
    outcome: "Shows service/location page cards and search-focused content sections."
  },
  {
    key: "integrations",
    label: "Custom Integrations*",
    price: 750,
    icon: Workflow,
    why: "Connects the website to tools like CRM, email, APIs, forms, maps, or automations.",
    demoTitle: "Connect tools",
    demoAction: "View integrations",
    outcome: "Shows connected tools and automated workflow examples."
  }
];

const portfolio = [
  {
    title: "Goodman Pickleball Coaching",
    tier: "Pro Web App",
    url: "https://www.goodmanpickleball.com",
    summary: "Coaching platform with accounts, coach dashboards, admin controls, custom quotes, payments, notifications, and video/PDF submissions.",
    tags: ["React", "Node", "MongoDB", "Stripe", "Railway"]
  },
  {
    title: "Big Papa Joe Septic",
    tier: "Business Website + Admin Tools",
    url: "#",
    summary: "Service-business website with services, contact flow, payments, FAQ, testimonials, marketplace-style pages, and admin management.",
    tags: ["React", "Express", "MongoDB", "Tailwind"]
  }
];

function App() {
  const route = window.location.pathname.replace("/", "").toLowerCase() || "home";

  if (route === "beginner") return <Shell><TierDemo tier={tiers.beginner} /></Shell>;
  if (route === "intermediate") return <Shell><TierDemo tier={tiers.intermediate} /></Shell>;
  if (route === "pro") return <Shell><TierDemo tier={tiers.pro} /></Shell>;
  if (route === "builder" || route === "build-your-dream-website") return <Shell><DreamBuilder /></Shell>;

  return (
    <Shell>
      <Hero />
      <ProofStrip />
      <TierIndex />
      <DifferenceSection />
      <DreamBuilderTeaser />
      <WorkShowcase />
      <HostingSection />
      <Process />
      <FinalCTA />
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div className="app-shell">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Nav() {
  const [mobile, setMobile] = useState(false);
  return (
    <header className="nav-shell">
      <nav className="nav">
        <a className="brand" href="/">
          <span className="brand-orb"><Code2 size={20} /></span>
          <span><strong>LaunchLine</strong><small>Studio</small></span>
        </a>
        <div className={`nav-links ${mobile ? "open" : ""}`}>
          <a href="/beginner">Beginner</a>
          <a href="/intermediate">Intermediate</a>
          <a href="/pro">Pro</a>
          <a href="/builder">Dream Builder</a>
          <a href="/#contact">Contact</a>
        </div>
        <a className="nav-cta" href="/builder">Build My Site <ArrowRight size={16} /></a>
        <button className="mobile-toggle" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="section hero">
      <div className="hero-grid">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="eyebrow"><Sparkles size={16} /> Interactive website package demos</div>
          <h1>Show clients what each website tier actually does.</h1>
          <p className="hero-text">
            This sales hub lets business owners open full tier demos, compare the differences, and use a clickable Dream Builder to understand why add-ons like payments, booking, dashboards, portals, and uploads are worth buying.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="/builder">Open Dream Builder <ArrowRight size={18} /></a>
            <a className="btn secondary" href="#tiers">Compare Tiers</a>
          </div>
          <div className="micro-proof">
            <span><MousePointerClick size={16} /> Clickable demos</span>
            <span><Cpu size={16} /> Web-app style previews</span>
            <span><Gauge size={16} /> Quote estimates</span>
          </div>
        </motion.div>

        <motion.div className="hero-console" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }}>
          <div className="console-head"><span /><span /><span /><p>launchline.preview</p></div>
          <div className="console-body">
            <div className="console-sidebar">
              <strong>Tier Mode</strong>
              <span>Beginner</span>
              <span className="active">Intermediate</span>
              <span>Pro</span>
            </div>
            <div className="console-screen">
              <div className="screen-hero">
                <p>Live Demo</p>
                <h3>Features change the experience, not just the layout.</h3>
              </div>
              <div className="screen-modules">
                <Module icon={CalendarDays} text="Booking" />
                <Module icon={WalletCards} text="Payments" />
                <Module icon={LayoutDashboard} text="Admin" />
                <Module icon={UploadCloud} text="Uploads" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Module({ icon: Icon, text }) {
  return <div><Icon size={18} /><span>{text}</span></div>;
}

function ProofStrip() {
  return (
    <section className="proof-strip">
      <div><strong>3</strong><span>full tier demo pages</span></div>
      <div><strong>9</strong><span>clickable add-on examples</span></div>
      <div><strong>Live</strong><span>quote estimate</span></div>
      <div><strong>Unique</strong><span>non-pickleball UI</span></div>
    </section>
  );
}

function TierIndex() {
  return (
    <section id="tiers" className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Tier demo pages</p>
          <h2>Each package opens into a full page example.</h2>
        </div>
        <p>
          The tiers are intentionally different: Beginner is a landing page, Intermediate is a multi-page lead site, and Pro is a platform/dashboard experience.
        </p>
      </div>
      <div className="tier-grid">
        {Object.values(tiers).map((tier, index) => <TierCard key={tier.slug} tier={tier} index={index} />)}
      </div>
    </section>
  );
}

function TierCard({ tier, index }) {
  const Icon = tier.icon;
  return (
    <motion.article className={`tier-card ${tier.tone}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .45, delay: index * .08 }}>
      <div className="tier-icon"><Icon size={24} /></div>
      <small>{tier.pageType}</small>
      <h3>{tier.name}</h3>
      <p>{tier.pitch}</p>
      <div className="tier-meta"><strong>{tier.priceText}</strong><span>{tier.timeline}</span></div>
      <a className="btn-card" href={`/${tier.slug}`}>Open full {tier.name} demo <ChevronRight size={17} /></a>
    </motion.article>
  );
}

function DifferenceSection() {
  return (
    <section className="section difference-section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Clear tier differences</p>
          <h2>The tiers are separated by what the website can do.</h2>
        </div>
      </div>
      <div className="difference-grid">
        <DifferenceCard tier={tiers.beginner} title="Beginner = presence" bullets={["One page", "Simple sections", "Contact-focused", "No backend workflow"]} />
        <DifferenceCard tier={tiers.intermediate} title="Intermediate = lead engine" bullets={["Multiple pages", "Gallery/proof", "Better forms", "Service SEO structure"]} />
        <DifferenceCard tier={tiers.pro} title="Pro = business system" bullets={["Logins", "Dashboards", "Payments", "Database workflows"]} />
      </div>
    </section>
  );
}

function DifferenceCard({ tier, title, bullets }) {
  const Icon = tier.icon;
  return (
    <article className={`difference-card ${tier.tone}`}>
      <Icon size={28} />
      <h3>{title}</h3>
      <ul>{bullets.map((item) => <li key={item}><Check size={15} /> {item}</li>)}</ul>
    </article>
  );
}

function TierDemo({ tier }) {
  const Icon = tier.icon;
  return (
    <>
      <section className={`tier-demo-hero ${tier.tone}`}>
        <div className="section tier-demo-grid">
          <div>
            <div className="eyebrow"><Icon size={16} /> {tier.name} full demo</div>
            <h1>{tier.business}</h1>
            <p className="hero-text">{tier.headline}</p>
            <p className="tier-line">{tier.pitch}</p>
            <div className="hero-actions">
              <a className="btn primary" href="/builder">Customize This Tier</a>
              <a className="btn secondary" href="#sample">View Sample Page</a>
            </div>
          </div>
          <div className="tier-price-panel">
            <span>{tier.label}</span>
            <strong>{tier.priceText}</strong>
            <small>{tier.timeline}</small>
            <p>{tier.visualGoal}</p>
          </div>
        </div>
      </section>

      <section id="sample" className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow small">Full sample experience</p>
            <h2>This is what the {tier.name} base package feels like.</h2>
          </div>
          <p>{tier.pageType} built around the features included in this package.</p>
        </div>
        <TierVisual tier={tier} />
      </section>

      <section className="section">
        <div className="details-grid">
          <article className="detail-card">
            <h3>Included by default</h3>
            <ul>{tier.includes.map((item) => <li key={item}><Check size={16} /> {item}</li>)}</ul>
          </article>
          <article className="detail-card muted-card">
            <h3>Not included by default</h3>
            <ul>{tier.boundaries.map((item) => <li key={item}><X size={16} /> {item}</li>)}</ul>
          </article>
          <article className="detail-card action-card">
            <h3>Want more?</h3>
            <p>Add-ons can turn this tier into a more advanced website. Open the Dream Builder to see what each add-on changes.</p>
            <a className="btn-card" href="/builder">Open Dream Builder <ArrowRight size={16} /></a>
          </article>
        </div>
      </section>

      <HostingSection />
      <FinalCTA />
    </>
  );
}

function TierVisual({ tier }) {
  if (tier.slug === "beginner") return <BeginnerVisual tier={tier} />;
  if (tier.slug === "intermediate") return <IntermediateVisual tier={tier} />;
  return <ProVisual tier={tier} />;
}

function BeginnerVisual({ tier }) {
  return (
    <div className="visual-shell beginner-visual">
      <div className="visual-nav"><strong>{tier.business}</strong><div><span>Services</span><span>Reviews</span><span>Contact</span></div></div>
      <div className="beginner-hero">
        <div><p>Simple local service site</p><h3>{tier.headline}</h3><small>Focused on trust, services, and a direct contact path.</small></div>
        <button>Call Today</button>
      </div>
      <div className="beginner-sections">
        <InfoBlock title="Services" />
        <InfoBlock title="Why Choose Us" />
        <InfoBlock title="Customer Reviews" />
        <InfoBlock title="Contact Form" />
      </div>
    </div>
  );
}

function IntermediateVisual({ tier }) {
  return (
    <div className="visual-shell intermediate-visual">
      <div className="visual-nav"><strong>{tier.business}</strong><div>{tier.sections.map((s) => <span key={s}>{s}</span>)}</div></div>
      <div className="intermediate-layout">
        <aside>
          <strong>Site Map</strong>
          {tier.sections.map((s, index) => <span key={s} className={index === 1 ? "active" : ""}>{s}</span>)}
        </aside>
        <main>
          <div className="intermediate-hero">
            <p>Multi-page business website</p>
            <h3>{tier.headline}</h3>
            <button>Request Estimate</button>
          </div>
          <div className="lead-grid">
            <InfoBlock title="Service Detail Page" />
            <InfoBlock title="Project Gallery" />
            <InfoBlock title="Testimonials" />
            <InfoBlock title="Lead Capture Form" />
          </div>
        </main>
      </div>
    </div>
  );
}

function ProVisual({ tier }) {
  return (
    <div className="visual-shell pro-visual">
      <div className="visual-nav"><strong>{tier.business}</strong><div>{tier.sections.map((s) => <span key={s}>{s}</span>)}</div></div>
      <div className="pro-app-grid">
        <aside>
          <strong>App Menu</strong>
          <span className="active">Dashboard</span>
          <span>Customers</span>
          <span>Payments</span>
          <span>Uploads</span>
          <span>Admin</span>
        </aside>
        <main>
          <div className="dashboard-stats">
            <InfoBlock title="Active Requests" metric="24" />
            <InfoBlock title="Revenue" metric="$8.4k" />
            <InfoBlock title="Unread Alerts" metric="7" />
          </div>
          <div className="workflow-board">
            <InfoBlock title="Customer Portal" />
            <InfoBlock title="Payment Workflow" />
            <InfoBlock title="Admin Controls" />
            <InfoBlock title="File Submissions" />
          </div>
        </main>
      </div>
    </div>
  );
}

function InfoBlock({ title, metric }) {
  return (
    <div className="info-block">
      <span />
      <strong>{metric || title}</strong>
      {metric ? <small>{title}</small> : <small>Preview section</small>}
    </div>
  );
}

function DreamBuilderTeaser() {
  return (
    <section className="section">
      <div className="builder-teaser">
        <div>
          <p className="eyebrow small">Build your dream website</p>
          <h2>Add-ons now have clickable demos.</h2>
          <p>
            Instead of just adding blocks, the builder explains why each feature matters and lets clients click through mini examples inside the preview.
          </p>
        </div>
        <a className="btn primary" href="/builder">Open Builder <ArrowRight size={18} /></a>
      </div>
    </section>
  );
}

function DreamBuilder() {
  const [tierSlug, setTierSlug] = useState("intermediate");
  const [selected, setSelected] = useState(["booking"]);
  const [activeDemo, setActiveDemo] = useState("booking");
  const [hosting, setHosting] = useState("managed");

  const tier = tiers[tierSlug];
  const total = useMemo(() => tier.price + selected.reduce((sum, key) => sum + (addOns.find((item) => item.key === key)?.price || 0), 0), [tier.price, selected]);

  const toggle = (key) => {
    setSelected((current) => {
      const next = current.includes(key) ? current.filter((item) => item !== key) : [...current, key];
      if (!next.includes(activeDemo) && next.length) setActiveDemo(next[0]);
      if (!current.includes(key)) setActiveDemo(key);
      return next;
    });
  };

  const mailtoHref = `mailto:${ownerEmail}?subject=${encodeURIComponent("Dream website quote request")}&body=${encodeURIComponent(`Tier: ${tier.name}\nEstimated starting total: $${total.toLocaleString()}+\nSelected add-ons: ${selected.map(k => addOns.find(a => a.key === k)?.label).filter(Boolean).join(", ") || "None"}\nHosting: ${hosting === "managed" ? "Managed hosting" : "File handoff"}\n\nBusiness details:\n`)}`;

  return (
    <>
      <section className="section builder-page">
        <div className="section-head">
          <div>
            <p className="eyebrow small">Interactive sales tool</p>
            <h1>Build your dream website.</h1>
          </div>
          <p>Click add-ons to see what they do, why they matter, and how they change the website experience.</p>
        </div>

        <div className="dream-grid">
          <aside className="builder-controls">
            <div className="control-group">
              <h3>1. Choose base tier</h3>
              <div className="tier-picker">
                {Object.values(tiers).map((item) => <button key={item.slug} className={tierSlug === item.slug ? "active" : ""} onClick={() => setTierSlug(item.slug)}><strong>{item.name}</strong><span>{item.label}</span></button>)}
              </div>
            </div>

            <div className="control-group">
              <h3>2. Add custom functionality</h3>
              <div className="addon-list">
                {addOns.map((feature) => {
                  const Icon = feature.icon;
                  const active = selected.includes(feature.key);
                  const focused = activeDemo === feature.key;
                  return (
                    <button key={feature.key} className={`addon-row ${active ? "active" : ""} ${focused ? "focused" : ""}`} onClick={() => { toggle(feature.key); setActiveDemo(feature.key); }}>
                      <span><Icon size={18} /></span>
                      <div><strong>{feature.label}</strong><small>+${feature.price.toLocaleString()}{feature.key === "integrations" ? "*" : ""}</small><p>{feature.why}</p></div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="control-group">
              <h3>3. After launch</h3>
              <div className="hosting-choice">
                <button className={hosting === "managed" ? "active" : ""} onClick={() => setHosting("managed")}>Managed hosting</button>
                <button className={hosting === "handoff" ? "active" : ""} onClick={() => setHosting("handoff")}>File handoff</button>
              </div>
            </div>
          </aside>

          <main className="builder-preview-area">
            <div className="quote-console">
              <div><span>Estimated starting total</span><strong>${total.toLocaleString()}+</strong></div>
              <small>*Final pricing depends on exact scope, integrations, revisions, content readiness, and development time.</small>
            </div>
            <LivePreview tier={tier} selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo} hosting={hosting} />
            <FeatureDemoPanel activeDemo={activeDemo} selected={selected} />
            <a className="btn primary full" href={mailtoHref}>Request This Website Quote <ArrowRight size={18} /></a>
          </main>
        </div>
      </section>
      <HostingSection />
    </>
  );
}

function LivePreview({ tier, selected, activeDemo, setActiveDemo, hosting }) {
  const has = (key) => selected.includes(key);
  return (
    <div className={`live-preview-shell ${tier.tone}`}>
      <div className="live-topbar"><span /><span /><span /><small>{tier.name.toLowerCase()}-dream-preview.app</small></div>

      {tier.slug === "beginner" && <BeginnerBuilderPreview tier={tier} selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo} />}
      {tier.slug === "intermediate" && <IntermediateBuilderPreview tier={tier} selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo} />}
      {tier.slug === "pro" && <ProBuilderPreview tier={tier} selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo} />}

      <div className="hosting-tag">
        {hosting === "managed" ? <><Server size={18} /> Managed hosting + maintenance selected</> : <><FileText size={18} /> Self-hosted file handoff selected</>}
      </div>
    </div>
  );
}

function AddonButton({ addonKey, selected, activeDemo, setActiveDemo, children }) {
  const enabled = selected.includes(addonKey);
  return (
    <button disabled={!enabled} onClick={() => setActiveDemo(addonKey)} className={`${enabled ? "enabled" : "disabled"} ${activeDemo === addonKey ? "active" : ""}`}>
      {children}
    </button>
  );
}

function BeginnerBuilderPreview({ tier, selected, activeDemo, setActiveDemo }) {
  return (
    <>
      <div className="preview-nav simple"><strong>{tier.business}</strong><div><span>Services</span><span>Reviews</span><span>Contact</span></div></div>
      <div className="landing-preview">
        <div className="landing-hero">
          <p>Starter website</p>
          <h3>{tier.headline}</h3>
          <button>Call Today</button>
        </div>
        <div className="landing-actions">
          <AddonButton addonKey="booking" selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo}><CalendarDays size={16}/> Add booking CTA</AddonButton>
          <AddonButton addonKey="payments" selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo}><CreditCard size={16}/> Add deposit CTA</AddonButton>
          <AddonButton addonKey="seo" selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo}><Search size={16}/> Add service pages</AddonButton>
        </div>
        <div className="landing-section-grid">
          <InfoBlock title="Services" />
          <InfoBlock title="Reviews" />
          <InfoBlock title="FAQ" />
          <InfoBlock title="Contact" />
        </div>
      </div>
    </>
  );
}

function IntermediateBuilderPreview({ tier, selected, activeDemo, setActiveDemo }) {
  return (
    <>
      <div className="preview-nav multi"><strong>{tier.business}</strong><div>{tier.sections.map((s) => <span key={s}>{s}</span>)}</div></div>
      <div className="multi-page-preview">
        <aside>
          <strong>Pages</strong>
          <span className="active">Services</span>
          <span>Gallery</span>
          <span>Reviews</span>
          <span>Quote Form</span>
          {selected.includes("seo") && <span>City Pages</span>}
        </aside>
        <main>
          <div className="multi-hero">
            <p>Growth website</p>
            <h3>{tier.headline}</h3>
          </div>
          <div className="conversion-row">
            <AddonButton addonKey="booking" selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo}><CalendarDays size={16}/> Schedule estimate</AddonButton>
            <AddonButton addonKey="payments" selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo}><WalletCards size={16}/> Take deposit</AddonButton>
            <AddonButton addonKey="notifications" selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo}><Bell size={16}/> Lead alerts</AddonButton>
          </div>
          <div className="lead-layout">
            <InfoBlock title="Service Page" />
            <InfoBlock title="Before / After Gallery" />
            <InfoBlock title="Lead Form" />
            <InfoBlock title="Reviews" />
          </div>
        </main>
      </div>
    </>
  );
}

function ProBuilderPreview({ tier, selected, activeDemo, setActiveDemo }) {
  return (
    <>
      <div className="preview-nav app"><strong>{tier.business}</strong><div><span>Portal</span><span>Payments</span><span>Uploads</span><span>Admin</span></div></div>
      <div className="app-preview">
        <aside>
          <strong>App Menu</strong>
          <AddonButton addonKey="portal" selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo}><UserRound size={15}/> Portal</AddonButton>
          <AddonButton addonKey="booking" selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo}><CalendarDays size={15}/> Requests</AddonButton>
          <AddonButton addonKey="payments" selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo}><WalletCards size={15}/> Payments</AddonButton>
          <AddonButton addonKey="uploads" selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo}><UploadCloud size={15}/> Uploads</AddonButton>
          <AddonButton addonKey="admin" selected={selected} activeDemo={activeDemo} setActiveDemo={setActiveDemo}><LayoutDashboard size={15}/> Admin</AddonButton>
        </aside>
        <main>
          <div className="app-metrics">
            <button onClick={() => setActiveDemo("database")} className={selected.includes("database") ? "enabled" : "disabled"}><strong>128</strong><span>Records</span></button>
            <button onClick={() => setActiveDemo("payments")} className={selected.includes("payments") ? "enabled" : "disabled"}><strong>$8.4k</strong><span>Payments</span></button>
            <button onClick={() => setActiveDemo("notifications")} className={selected.includes("notifications") ? "enabled" : "disabled"}><strong>7</strong><span>Alerts</span></button>
          </div>
          <div className="workflow-grid">
            <WorkflowCard title="Customer Request" active={activeDemo === "booking"} />
            <WorkflowCard title="Quote / Payment" active={activeDemo === "payments"} />
            <WorkflowCard title="Upload Review" active={activeDemo === "uploads"} />
            <WorkflowCard title="Admin Action" active={activeDemo === "admin"} />
          </div>
        </main>
      </div>
    </>
  );
}

function WorkflowCard({ title, active }) {
  return <div className={`workflow-card ${active ? "active" : ""}`}><span /><strong>{title}</strong><small>{active ? "Currently selected" : "Workflow step"}</small></div>;
}

function FeatureDemoPanel({ activeDemo, selected }) {
  const addon = addOns.find((item) => item.key === activeDemo);
  if (!addon || !selected.includes(activeDemo)) {
    return (
      <div className="feature-panel empty">
        <h3>Select an add-on to see the actual feature demo.</h3>
        <p>The preview explains what each add-on does and gives the client something clickable so they understand the value.</p>
      </div>
    );
  }

  const Icon = addon.icon;

  return (
    <div className="feature-panel">
      <div className="feature-panel-head">
        <span><Icon size={22} /></span>
        <div>
          <h3>{addon.demoTitle}</h3>
          <p>{addon.why}</p>
        </div>
      </div>
      <InteractiveAddonDemo addon={addon} />
      <div className="feature-outcome">
        <strong>Why this matters:</strong>
        <p>{addon.outcome}</p>
      </div>
    </div>
  );
}

function InteractiveAddonDemo({ addon }) {
  const [step, setStep] = useState(0);

  if (addon.key === "booking") {
    return <DemoBox step={step} setStep={setStep} steps={["Choose service", "Pick date", "Request confirmed"]} icon={CalendarDays} />;
  }
  if (addon.key === "payments") {
    return <DemoBox step={step} setStep={setStep} steps={["Review total", "Pay deposit", "Receipt sent"]} icon={WalletCards} />;
  }
  if (addon.key === "portal") {
    return <DemoBox step={step} setStep={setStep} steps={["Login", "View request history", "Update profile"]} icon={UserRound} />;
  }
  if (addon.key === "admin") {
    return <DemoBox step={step} setStep={setStep} steps={["View leads", "Update status", "Manage customer"]} icon={LayoutDashboard} />;
  }
  if (addon.key === "database") {
    return <RecordsDemo step={step} setStep={setStep} />;
  }
  if (addon.key === "uploads") {
    return <DemoBox step={step} setStep={setStep} steps={["Drop file", "Upload complete", "Admin notified"]} icon={UploadCloud} />;
  }
  if (addon.key === "notifications") {
    return <DemoBox step={step} setStep={setStep} steps={["New request", "Badge appears", "Admin opens alert"]} icon={Bell} />;
  }
  if (addon.key === "seo") {
    return <DemoBox step={step} setStep={setStep} steps={["Service page", "Location page", "Search-ready content"]} icon={Search} />;
  }
  return <DemoBox step={step} setStep={setStep} steps={["Connect tool", "Sync data", "Automation runs"]} icon={Workflow} />;
}

function DemoBox({ step, setStep, steps, icon: Icon }) {
  return (
    <div className="interactive-demo">
      <div className="demo-screen">
        <Icon size={28} />
        <strong>{steps[step]}</strong>
        <p>Click through to understand the customer/admin experience.</p>
      </div>
      <div className="demo-steps">
        {steps.map((item, index) => (
          <button key={item} className={step === index ? "active" : ""} onClick={() => setStep(index)}>
            {index + 1}. {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function RecordsDemo({ step, setStep }) {
  const rows = ["Customer submitted quote", "Deposit received", "Admin changed status"];
  return (
    <div className="interactive-demo">
      <div className="records-table">
        {rows.map((row, index) => <button key={row} onClick={() => setStep(index)} className={step === index ? "active" : ""}><span>{row}</span><strong>{step === index ? "Open" : "Saved"}</strong></button>)}
      </div>
      <div className="demo-screen compact"><Database size={28} /><strong>{rows[step]}</strong><p>This is why database workflows cost more than a static website.</p></div>
    </div>
  );
}

function InfoBlock({ title, metric }) {
  return <div className="info-block"><span /><strong>{metric || title}</strong><small>{metric ? title : "Preview section"}</small></div>;
}

function WorkShowcase() {
  return (
    <section className="section">
      <div className="section-head"><div><p className="eyebrow small">Proof of work</p><h2>Real work supporting the package examples.</h2></div></div>
      <div className="work-grid">
        {portfolio.map((item) => (
          <article className="work-card" key={item.title}>
            <div className="work-visual"><div className="work-window"><span /><span /><span /></div><div className="work-screen"><Globe2 size={38} /><strong>{item.title}</strong><small>{item.tier}</small></div></div>
            <div className="work-copy"><span>{item.tier}</span><h3>{item.title}</h3><p>{item.summary}</p><div className="tag-row">{item.tags.map((tag) => <em key={tag}>{tag}</em>)}</div>{item.url !== "#" ? <a href={item.url} target="_blank" rel="noreferrer">View live example <ExternalLink size={15} /></a> : <a href="/builder">Ask to see demo <ExternalLink size={15} /></a>}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HostingSection() {
  return (
    <section className="section hosting-section">
      <div className="section-head">
        <div><p className="eyebrow small">Hosting and support</p><h2>Clear after-launch options.</h2></div>
        <p>Clients can either pay for managed hosting/support or take the files and manage the site themselves.</p>
      </div>
      <div className="hosting-grid">
        <article className="hosting-card managed">
          <Server size={28} />
          <h3>Managed Hosting & Maintenance</h3>
          <p>For clients who prefer a hands-off experience, I provide ongoing hosting, monitoring, maintenance, deployment support, and technical issue resolution for a monthly service fee.</p>
          <ul><li><Check size={16} /> Hosting and deployment support</li><li><Check size={16} /> Uptime and general monitoring</li><li><Check size={16} /> Routine technical maintenance</li><li><Check size={16} /> Basic support if something breaks</li></ul>
        </article>
        <article className="hosting-card">
          <FileText size={28} />
          <h3>Self-Hosted File Handoff</h3>
          <p>Clients who do not want monthly hosting through me receive the completed files and launch documentation. Future hosting, updates, bug fixes, and new features are quoted separately.</p>
          <ul><li><Check size={16} /> Complete website file package</li><li><Check size={16} /> Initial launch assistance</li><li><Check size={16} /> Client manages future hosting</li><li><Check size={16} /> Future work quoted separately</li></ul>
        </article>
      </div>
    </section>
  );
}

function Process() {
  const steps = [["Discovery", "Define business goals and needed functionality.", MousePointerClick], ["Scope", "Estimate based on complexity, integrations, and content.", BarChart3], ["Build", "Develop, review, revise, and prepare for launch.", Wrench], ["Launch", "Deploy and either manage or hand off the site.", Zap]];
  return <section className="section"><div className="section-head center"><p className="eyebrow small">Process</p><h2>From idea to launched website.</h2></div><div className="process-grid">{steps.map(([title,text,Icon],i) => <article className="process-card" key={title}><span>0{i+1}</span><Icon size={26}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>;
}

function FinalCTA() {
  return (
    <section id="contact" className="section">
      <div className="contact-card">
        <div><p className="eyebrow small">Start the project</p><h2>Pick a tier, test add-ons, then request the quote.</h2><p>The Dream Builder provides a starting estimate. Final pricing depends on real scope, integrations, revisions, content readiness, and development time.</p><div className="hero-actions"><a className="btn primary" href={`mailto:${ownerEmail}`}><Mail size={18}/> Email Me</a><a className="btn secondary" href="/builder">Build Estimate</a></div></div>
        <form className="lead-form" onSubmit={(e) => { e.preventDefault(); const data = new FormData(e.currentTarget); const subject = encodeURIComponent("Website project request"); const body = encodeURIComponent(`Name: ${data.get("name")}\nBusiness: ${data.get("business")}\nTier: ${data.get("tier")}\nHosting: ${data.get("hosting")}\nMessage: ${data.get("message")}`); window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`; }}>
          <label>Name<input name="name" required placeholder="Your name" /></label>
          <label>Business<input name="business" required placeholder="Business name" /></label>
          <label>Tier interest<select name="tier" defaultValue="Intermediate"><option>Beginner</option><option>Intermediate</option><option>Pro</option><option>Not sure yet</option></select></label>
          <label>Hosting preference<select name="hosting" defaultValue="Managed hosting"><option>Managed hosting / maintenance</option><option>Self-hosted file handoff</option><option>Not sure yet</option></select></label>
          <label>What should the website do?<textarea name="message" rows="4" placeholder="Payments, booking, dashboard, portal, uploads, integrations, etc." /></label>
          <button type="submit">Send Website Request <ArrowRight size={17}/></button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="footer"><a className="brand" href="/"><span className="brand-orb"><Code2 size={20}/></span><span><strong>LaunchLine</strong><small>Studio</small></span></a><p>Interactive website package demos for businesses that need more than a generic template.</p></footer>;
}

createRoot(document.getElementById("root")).render(<App />);
