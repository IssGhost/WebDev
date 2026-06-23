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
  CreditCard,
  Crown,
  Database,
  ExternalLink,
  FileText,
  FolderKanban,
  Globe2,
  Home,
  Image,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  Mail,
  Menu,
  MessageSquareText,
  MousePointerClick,
  Paintbrush,
  Rocket,
  Search,
  Server,
  ShieldCheck,
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
    label: "Professional one-page site",
    price: 499,
    priceText: "$499+",
    timeline: "3–5 days",
    icon: LayoutTemplate,
    sampleBusiness: "BrightStart Mobile Detailing",
    headline: "A polished one-page website that makes your business look legitimate and easy to contact.",
    short: "Best for businesses that need a clean online presence, service explanation, trust signals, and direct contact options.",
    goal: "Look professional and turn visitors into calls, emails, or quote requests.",
    ideal: "New businesses, solo services, simple local businesses, portfolios, and anyone who needs a credible link fast.",
    notIdeal: "Projects needing accounts, payments, admin dashboards, automated workflows, or heavy custom features.",
    sections: ["Hero", "Services", "About", "Reviews", "FAQ", "Contact"],
    includes: ["Responsive one-page design", "Clear service overview", "Trust/review section", "FAQ", "Contact form or click-to-call", "Basic SEO title/description"],
    limits: ["No login area", "No database records", "No admin dashboard", "No automated booking/payment workflow unless added"]
  },
  intermediate: {
    slug: "intermediate",
    name: "Intermediate",
    label: "Multi-page business website",
    price: 999,
    priceText: "$999+",
    timeline: "1–2 weeks",
    icon: Rocket,
    sampleBusiness: "Iron Ridge Contractors",
    headline: "A complete business website built to explain services, show proof, and capture better leads.",
    short: "Best for businesses that need multiple pages, stronger service explanations, galleries, reviews, and a more serious lead flow.",
    goal: "Help customers understand your services and feel confident enough to request a quote.",
    ideal: "Contractors, restaurants, gyms, med spas, cleaning companies, landscapers, coaching businesses, and service companies.",
    notIdeal: "Businesses needing a full customer portal, custom admin system, payment workflow, or software-style platform by default.",
    sections: ["Home", "Services", "Gallery", "Process", "Reviews", "Quote"],
    includes: ["3–6 responsive pages", "Dedicated service pages", "Gallery or portfolio", "Testimonials", "Lead form", "SEO-friendly page structure"],
    limits: ["No full app dashboard by default", "No customer login by default", "Payments/bookings are add-ons", "Complex automations require Pro/custom quote"]
  },
  pro: {
    slug: "pro",
    name: "Pro",
    label: "Custom web platform",
    price: 1999,
    priceText: "$1,999+",
    timeline: "2–5 weeks",
    icon: Crown,
    sampleBusiness: "Apex Coaching Portal",
    headline: "A website that can run part of the business with portals, dashboards, payments, uploads, and workflows.",
    short: "Best when the website needs to do actual business operations, not just display information.",
    goal: "Turn your website into a system customers, staff, coaches, or admins can use.",
    ideal: "Coaching platforms, booking businesses, marketplaces, service businesses with quotes, customer portals, and workflow-heavy operations.",
    notIdeal: "Simple brochure websites that only need information pages and contact buttons.",
    sections: ["Portal", "Requests", "Payments", "Uploads", "Admin", "Reports"],
    includes: ["Frontend + backend", "User accounts", "Role dashboards", "Payments or quotes", "Database records", "Notifications/statuses"],
    limits: ["Third-party fees separate", "Unscoped integrations need review", "Hosting/support require a plan", "Future features quoted separately"]
  }
};

const addOns = [
  {
    key: "booking",
    label: "Booking / Scheduling",
    price: 300,
    icon: CalendarDays,
    plain: "Let customers request appointments, inspections, lessons, calls, or service windows without endless texting.",
    technical: "Adds service selection, date/time preference, customer info fields, and confirmation/status UI.",
    steps: ["Choose a service", "Pick a date", "Request confirmed"]
  },
  {
    key: "payments",
    label: "Payments / Deposits",
    price: 350,
    icon: WalletCards,
    plain: "Collect deposits, invoices, quote payments, or checkout payments directly through the site.",
    technical: "Adds Stripe-style checkout, itemized totals, paid/unpaid states, and receipt/status UI.",
    steps: ["Review total", "Pay deposit", "Receipt sent"]
  },
  {
    key: "portal",
    label: "Customer Portal",
    price: 500,
    icon: UserRound,
    plain: "Give customers a place to log in, view their history, manage requests, and track progress.",
    technical: "Adds account screens, saved requests, profile details, progress cards, and private customer views.",
    steps: ["Login", "View request history", "Track progress"]
  },
  {
    key: "admin",
    label: "Admin Dashboard",
    price: 650,
    icon: LayoutDashboard,
    plain: "Manage leads, orders, quotes, bookings, customers, content, or submissions from one private area.",
    technical: "Adds private management screens, tables, status controls, metrics, and action buttons.",
    steps: ["View leads", "Update status", "Manage customer"]
  },
  {
    key: "database",
    label: "Database Workflows",
    price: 500,
    icon: Database,
    plain: "Store customer requests, orders, uploads, messages, and statuses so nothing gets lost.",
    technical: "Adds database-backed records, saved states, customer activity, and workflow history.",
    steps: ["Save record", "Update status", "Retrieve history"]
  },
  {
    key: "uploads",
    label: "File / PDF / Video Uploads",
    price: 450,
    icon: UploadCloud,
    plain: "Let customers submit photos, PDFs, documents, forms, videos, or project materials.",
    technical: "Adds upload UI, file type handling, status indicators, and admin/customer review states.",
    steps: ["Drop file", "Upload complete", "Admin notified"]
  },
  {
    key: "notifications",
    label: "Notifications",
    price: 300,
    icon: Bell,
    plain: "Alert customers or admins when messages, requests, payments, uploads, or status changes happen.",
    technical: "Adds badges, unread states, activity feeds, alert cards, and status messaging.",
    steps: ["New activity", "Badge appears", "Open alert"]
  },
  {
    key: "seo",
    label: "Extra SEO Pages",
    price: 250,
    icon: Search,
    plain: "Add service or location pages so customers can better find and understand specific offerings.",
    technical: "Adds structured service/location pages, headings, page metadata, and search-focused content sections.",
    steps: ["Service page", "Location page", "Search-ready copy"]
  },
  {
    key: "integrations",
    label: "Custom Integrations*",
    price: 750,
    icon: Workflow,
    plain: "Connect the site to tools your business already uses, such as email, CRM, maps, APIs, or automations.",
    technical: "Adds third-party API connections, sync states, automation steps, and custom workflow logic.",
    steps: ["Connect tool", "Sync data", "Automation runs"]
  }
];

const portfolio = [
  {
    title: "Goodman Pickleball Coaching",
    type: "Pro Web App",
    url: "https://www.goodmanpickleball.com",
    summary: "A full coaching platform with customer accounts, coach dashboards, admin controls, custom quote flow, Stripe payments, notifications, and video/PDF submissions.",
    tags: ["Accounts", "Dashboards", "Payments", "Uploads", "Admin"]
  },
  {
    title: "Big Papa Joe Septic",
    type: "Business Website + Admin Tools",
    url: "#",
    summary: "A service-business website with service pages, contact flow, payments, FAQ, testimonials, marketplace-style pages, and admin management tools.",
    tags: ["Services", "Contact Flow", "Payments", "FAQ", "Admin"]
  }
];

function App() {
  const route = window.location.pathname.replace("/", "").toLowerCase() || "home";

  if (route === "beginner") return <Shell><TierPage tier={tiers.beginner} /></Shell>;
  if (route === "intermediate") return <Shell><TierPage tier={tiers.intermediate} /></Shell>;
  if (route === "pro") return <Shell><TierPage tier={tiers.pro} /></Shell>;
  if (route === "builder" || route === "build-your-dream-website") return <Shell><DreamBuilder /></Shell>;

  return (
    <Shell>
      <Hero />
      <TrustStrip />
      <TierOverview />
      <TierDifference />
      <DreamBuilderCTA />
      <Portfolio />
      <Hosting />
      <Process />
      <FinalCTA />
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div className="app">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-shell">
      <nav className="nav">
        <a className="brand" href="/">
          <span className="brand-mark"><Code2 size={20} /></span>
          <span><strong>LaunchLine</strong><small>Studio</small></span>
        </a>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <a href="/beginner">Beginner</a>
          <a href="/intermediate">Intermediate</a>
          <a href="/pro">Pro</a>
          <a href="/builder">Dream Builder</a>
          <a href="/#contact">Contact</a>
        </div>

        <a className="nav-cta" href="/builder">Build My Website <ArrowRight size={16} /></a>
        <button className="mobile-toggle" onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="section hero">
      <div className="hero-grid">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="eyebrow"><BadgeCheck size={16} /> Website packages clients can actually understand</div>
          <h1>Show business owners exactly what they can buy.</h1>
          <p className="hero-text">
            A refined sales hub with full tier demo pages, a professional quote builder, clickable add-on previews, hosting options, and clear expectations for future support.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="/builder">Build Your Dream Website <ArrowRight size={18} /></a>
            <a className="btn secondary" href="#tiers">Compare Packages</a>
          </div>
          <div className="micro-proof">
            <span><LayoutTemplate size={16} /> Full tier demos</span>
            <span><MousePointerClick size={16} /> Clickable add-ons</span>
            <span><BarChart3 size={16} /> Starting estimate</span>
          </div>
        </motion.div>

        <motion.div className="hero-preview" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }}>
          <div className="browser-bar"><span /><span /><span /><p>launchline.studio</p></div>
          <div className="browser-body">
            <div className="mock-nav"><strong>Website Preview</strong><span>Home</span><span>Services</span><span>Quote</span></div>
            <div className="mock-hero">
              <p>Professional service website</p>
              <h3>From a simple site to a full business platform.</h3>
              <button>Request quote</button>
            </div>
            <div className="mock-grid">
              <FeatureMini icon={CalendarDays} title="Booking" />
              <FeatureMini icon={WalletCards} title="Payments" />
              <FeatureMini icon={LayoutDashboard} title="Dashboard" />
              <FeatureMini icon={UploadCloud} title="Uploads" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureMini({ icon: Icon, title }) {
  return <div className="feature-mini"><Icon size={18} /><strong>{title}</strong><small>Optional add-on</small></div>;
}

function TrustStrip() {
  return (
    <section className="trust-strip">
      <div><strong>3</strong><span>clear package tiers</span></div>
      <div><strong>9</strong><span>custom add-on demos</span></div>
      <div><strong>2</strong><span>portfolio proof examples</span></div>
      <div><strong>100%</strong><span>mobile-friendly sales flow</span></div>
    </section>
  );
}

function TierOverview() {
  return (
    <section id="tiers" className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Package demo pages</p>
          <h2>Each tier opens into a full website example.</h2>
        </div>
        <p>
          The tiers are separated by purpose, not just color. Beginner is a credibility site, Intermediate is a lead-generation site, and Pro is a custom platform.
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
    <motion.article className="tier-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08 }}>
      <div className="tier-card-top">
        <span className="tier-icon"><Icon size={24} /></span>
        <span>{tier.timeline}</span>
      </div>
      <h3>{tier.name}</h3>
      <p className="tier-label">{tier.label}</p>
      <p>{tier.short}</p>
      <div className="price-row"><strong>{tier.priceText}</strong><small>{tier.goal}</small></div>
      <a className="card-link" href={`/${tier.slug}`}>Open full {tier.name} demo <ChevronRight size={17} /></a>
    </motion.article>
  );
}

function TierDifference() {
  return (
    <section className="section difference">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Clear separation</p>
          <h2>The difference is what the website can do.</h2>
        </div>
      </div>
      <div className="difference-grid">
        <DifferenceCard tier={tiers.beginner} title="Beginner = Online presence" items={["One-page layout", "Contact-focused", "Service overview", "No business workflow by default"]} />
        <DifferenceCard tier={tiers.intermediate} title="Intermediate = Lead engine" items={["Multiple pages", "Proof and gallery", "Stronger forms", "Service/SEO structure"]} />
        <DifferenceCard tier={tiers.pro} title="Pro = Business system" items={["Customer portal", "Admin dashboard", "Payments", "Database workflows"]} />
      </div>
    </section>
  );
}

function DifferenceCard({ tier, title, items }) {
  const Icon = tier.icon;
  return (
    <article className="difference-card">
      <Icon size={28} />
      <h3>{title}</h3>
      <ul>{items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
    </article>
  );
}

function TierPage({ tier }) {
  const Icon = tier.icon;

  return (
    <>
      <section className="tier-hero">
        <div className="section tier-hero-grid">
          <div>
            <div className="eyebrow"><Icon size={16} /> {tier.name} package demo</div>
            <h1>{tier.sampleBusiness}</h1>
            <p className="hero-text">{tier.headline}</p>
            <p className="tier-explain">{tier.short}</p>
            <div className="hero-actions">
              <a className="btn primary" href="/builder">Customize This Tier</a>
              <a className="btn secondary" href="#sample">View Sample</a>
            </div>
          </div>
          <div className="tier-price-panel">
            <span>{tier.label}</span>
            <strong>{tier.priceText}</strong>
            <small>{tier.timeline}</small>
            <p>{tier.goal}</p>
          </div>
        </div>
      </section>

      <section id="sample" className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow small">Full tier preview</p>
            <h2>What the {tier.name} base package looks like.</h2>
          </div>
          <p>{tier.ideal}</p>
        </div>
        <TierVisual tier={tier} />
      </section>

      <section className="section">
        <div className="details-grid">
          <article className="detail-card">
            <h3>Included by default</h3>
            <ul>{tier.includes.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
          </article>
          <article className="detail-card">
            <h3>Not included by default</h3>
            <ul>{tier.limits.map((item) => <li key={item}><X size={16} />{item}</li>)}</ul>
          </article>
          <article className="detail-card action-card">
            <h3>Need more?</h3>
            <p>Add-ons can expand this tier. The Dream Builder shows how each feature changes the website experience and the starting estimate.</p>
            <a className="card-link" href="/builder">Open Dream Builder <ArrowRight size={16} /></a>
          </article>
        </div>
      </section>

      <Hosting />
      <FinalCTA />
    </>
  );
}

function TierVisual({ tier }) {
  if (tier.slug === "beginner") return <BeginnerVisual tier={tier} />;
  if (tier.slug === "intermediate") return <IntermediateVisual tier={tier} />;
  return <ProVisual tier={tier} />;
}

function BrowserShell({ children, label }) {
  return (
    <div className="website-shell">
      <div className="browser-bar"><span /><span /><span /><p>{label}</p></div>
      {children}
    </div>
  );
}

function BeginnerVisual({ tier }) {
  return (
    <BrowserShell label="beginner-business-site.com">
      <div className="site-nav"><strong>{tier.sampleBusiness}</strong><div>{tier.sections.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div></div>
      <div className="landing-hero">
        <div><p>Starter business site</p><h3>{tier.headline}</h3><small>{tier.goal}</small></div>
        <button>Call Today</button>
      </div>
      <div className="landing-grid">
        <PreviewBlock title="Services" />
        <PreviewBlock title="Reviews" />
        <PreviewBlock title="FAQ" />
        <PreviewBlock title="Contact" />
      </div>
    </BrowserShell>
  );
}

function IntermediateVisual({ tier }) {
  return (
    <BrowserShell label="intermediate-business-site.com">
      <div className="site-nav"><strong>{tier.sampleBusiness}</strong><div>{tier.sections.map((item) => <span key={item}>{item}</span>)}</div></div>
      <div className="multi-site">
        <aside>
          <strong>Pages</strong>
          {tier.sections.map((item, index) => <span className={index === 1 ? "active" : ""} key={item}>{item}</span>)}
        </aside>
        <main>
          <div className="multi-hero"><p>Multi-page lead site</p><h3>{tier.headline}</h3><button>Request Estimate</button></div>
          <div className="multi-grid">
            <PreviewBlock title="Service Page" />
            <PreviewBlock title="Gallery" />
            <PreviewBlock title="Testimonials" />
            <PreviewBlock title="Lead Form" />
          </div>
        </main>
      </div>
    </BrowserShell>
  );
}

function ProVisual({ tier }) {
  return (
    <BrowserShell label="custom-business-platform.app">
      <div className="site-nav"><strong>{tier.sampleBusiness}</strong><div>{tier.sections.map((item) => <span key={item}>{item}</span>)}</div></div>
      <div className="app-site">
        <aside>
          <strong>App Menu</strong>
          <span className="active">Dashboard</span>
          <span>Customers</span>
          <span>Payments</span>
          <span>Uploads</span>
          <span>Admin</span>
        </aside>
        <main>
          <div className="metric-row">
            <PreviewBlock metric="24" title="Active Requests" />
            <PreviewBlock metric="$8.4k" title="Payments" />
            <PreviewBlock metric="7" title="Alerts" />
          </div>
          <div className="workflow-grid">
            <PreviewBlock title="Customer Portal" />
            <PreviewBlock title="Payment Workflow" />
            <PreviewBlock title="Admin Controls" />
            <PreviewBlock title="File Uploads" />
          </div>
        </main>
      </div>
    </BrowserShell>
  );
}

function PreviewBlock({ title, metric }) {
  return (
    <div className="preview-block">
      <span />
      <strong>{metric || title}</strong>
      <small>{metric ? title : "Example section"}</small>
    </div>
  );
}

function DreamBuilderCTA() {
  return (
    <section className="section">
      <div className="builder-cta">
        <div>
          <p className="eyebrow small">Build your dream website</p>
          <h2>Let clients click features and see why they matter.</h2>
          <p>The builder changes by tier and gives each add-on its own interactive mini-demo, not just another block on the page.</p>
        </div>
        <a className="btn primary" href="/builder">Open Dream Builder <ArrowRight size={18} /></a>
      </div>
    </section>
  );
}

function DreamBuilder() {
  const [tierSlug, setTierSlug] = useState("intermediate");
  const [selected, setSelected] = useState(["booking"]);
  const [activeAddon, setActiveAddon] = useState("booking");
  const [hosting, setHosting] = useState("managed");

  const tier = tiers[tierSlug];

  const total = useMemo(() => {
    return tier.price + selected.reduce((sum, key) => sum + (addOns.find((item) => item.key === key)?.price || 0), 0);
  }, [tier.price, selected]);

  const toggleAddon = (key) => {
    setSelected((current) => {
      const next = current.includes(key) ? current.filter((item) => item !== key) : [...current, key];
      if (!current.includes(key)) setActiveAddon(key);
      if (current.includes(key) && activeAddon === key && next.length) setActiveAddon(next[0]);
      return next;
    });
  };

  const selectedText = selected.map((key) => addOns.find((item) => item.key === key)?.label).filter(Boolean).join(", ");
  const quoteHref = `mailto:${ownerEmail}?subject=${encodeURIComponent("Dream website quote request")}&body=${encodeURIComponent(`Tier: ${tier.name}\nEstimated starting total: $${total.toLocaleString()}+\nSelected add-ons: ${selectedText || "None"}\nHosting preference: ${hosting === "managed" ? "Managed hosting / maintenance" : "Self-hosted file handoff"}\n\nBusiness details:\n`)}`;

  return (
    <>
      <section className="builder-page">
        <div className="builder-layout">
          <aside className="builder-panel">
            <a className="back-link" href="/">← Back to packages</a>
            <h1>Build your dream website.</h1>
            <p>Choose a base tier, add features, click the preview, and see why each add-on changes the value of the website.</p>

            <div className="builder-step">
              <h3>1. Base package</h3>
              <div className="tier-picker">
                {Object.values(tiers).map((item) => (
                  <button key={item.slug} className={tierSlug === item.slug ? "active" : ""} onClick={() => setTierSlug(item.slug)}>
                    <strong>{item.name}</strong>
                    <span>{item.label}</span>
                    <em>{item.priceText}</em>
                  </button>
                ))}
              </div>
            </div>

            <div className="builder-step">
              <h3>2. Custom add-ons</h3>
              <div className="addon-picker">
                {addOns.map((addon) => {
                  const Icon = addon.icon;
                  const active = selected.includes(addon.key);
                  const focused = activeAddon === addon.key;
                  return (
                    <button
                      key={addon.key}
                      className={`${active ? "active" : ""} ${focused ? "focused" : ""}`}
                      onClick={() => {
                        toggleAddon(addon.key);
                        setActiveAddon(addon.key);
                      }}
                    >
                      <span><Icon size={18} /></span>
                      <div>
                        <strong>{addon.label}</strong>
                        <small>+${addon.price.toLocaleString()}{addon.key === "integrations" ? "*" : ""}</small>
                        <p>{addon.plain}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="builder-step">
              <h3>3. Hosting preference</h3>
              <div className="hosting-toggle">
                <button className={hosting === "managed" ? "active" : ""} onClick={() => setHosting("managed")}>Managed hosting</button>
                <button className={hosting === "handoff" ? "active" : ""} onClick={() => setHosting("handoff")}>File handoff</button>
              </div>
            </div>
          </aside>

          <main className="builder-stage">
            <div className="quote-bar">
              <div><span>Estimated starting total</span><strong>${total.toLocaleString()}+</strong></div>
              <p>*Final pricing depends on exact scope, pages, integrations, content readiness, revisions, and development time.</p>
            </div>

            <InteractivePreview tier={tier} selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon} hosting={hosting} />
            <AddonDemo addonKey={activeAddon} selected={selected} />
            <a className="btn primary full" href={quoteHref}>Request This Website Quote <ArrowRight size={18} /></a>
          </main>
        </div>
      </section>

      <Hosting />
    </>
  );
}

function InteractivePreview({ tier, selected, activeAddon, setActiveAddon, hosting }) {
  if (tier.slug === "beginner") return <BeginnerBuilder tier={tier} selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon} hosting={hosting} />;
  if (tier.slug === "intermediate") return <IntermediateBuilder tier={tier} selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon} hosting={hosting} />;
  return <ProBuilder tier={tier} selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon} hosting={hosting} />;
}

function AddonTab({ addonKey, selected, activeAddon, setActiveAddon, children }) {
  const enabled = selected.includes(addonKey);
  return (
    <button disabled={!enabled} onClick={() => setActiveAddon(addonKey)} className={`${enabled ? "enabled" : "disabled"} ${activeAddon === addonKey ? "active" : ""}`}>
      {children}
    </button>
  );
}

function BeginnerBuilder({ tier, selected, activeAddon, setActiveAddon, hosting }) {
  return (
    <div className="live-frame beginner-frame">
      <div className="live-nav"><strong>{tier.sampleBusiness}</strong><div><span>Services</span><span>Reviews</span><span>Contact</span></div></div>
      <div className="builder-landing">
        <div className="builder-hero-simple">
          <p>One-page credibility site</p>
          <h3>{tier.headline}</h3>
          <button>{selected.includes("booking") ? "Schedule Service" : selected.includes("payments") ? "Pay Deposit" : "Call Today"}</button>
        </div>
        <div className="simple-feature-row">
          <AddonTab addonKey="booking" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><CalendarDays size={16} /> Schedule CTA</AddonTab>
          <AddonTab addonKey="payments" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><CreditCard size={16} /> Deposit CTA</AddonTab>
          <AddonTab addonKey="seo" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><Search size={16} /> Service pages</AddonTab>
          <AddonTab addonKey="uploads" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><UploadCloud size={16} /> Send photos</AddonTab>
        </div>
        <div className="preview-grid">
          <PreviewBlock title="Services" />
          <PreviewBlock title="Reviews" />
          <PreviewBlock title="FAQ" />
          <PreviewBlock title="Contact Form" />
        </div>
      </div>
      <HostingTag hosting={hosting} />
    </div>
  );
}

function IntermediateBuilder({ tier, selected, activeAddon, setActiveAddon, hosting }) {
  return (
    <div className="live-frame intermediate-frame">
      <div className="live-nav"><strong>{tier.sampleBusiness}</strong><div><span>Home</span><span>Services</span><span>Gallery</span><span>Quote</span>{selected.includes("booking") && <span>Booking</span>}</div></div>
      <div className="builder-multipage">
        <aside>
          <strong>Pages</strong>
          <span className="active">Services</span>
          <span>Gallery</span>
          <span>Reviews</span>
          <span>Quote Form</span>
          {selected.includes("seo") && <span>Location Pages</span>}
          {selected.includes("database") && <span>Submitted Leads</span>}
        </aside>
        <main>
          <div className="builder-hero-multi">
            <p>Lead-generation website</p>
            <h3>{tier.headline}</h3>
          </div>
          <div className="conversion-tabs">
            <AddonTab addonKey="booking" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><CalendarDays size={16} /> Schedule estimate</AddonTab>
            <AddonTab addonKey="payments" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><WalletCards size={16} /> Deposit</AddonTab>
            <AddonTab addonKey="notifications" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><Bell size={16} /> Lead alert</AddonTab>
            <AddonTab addonKey="uploads" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><UploadCloud size={16} /> Project photos</AddonTab>
          </div>
          <div className="preview-grid">
            <PreviewBlock title="Service Page" />
            <PreviewBlock title="Gallery Proof" />
            <PreviewBlock title="Lead Form" />
            <PreviewBlock title="Testimonials" />
          </div>
        </main>
      </div>
      <HostingTag hosting={hosting} />
    </div>
  );
}

function ProBuilder({ tier, selected, activeAddon, setActiveAddon, hosting }) {
  return (
    <div className="live-frame pro-frame">
      <div className="live-nav"><strong>{tier.sampleBusiness}</strong><div><span>Portal</span><span>Payments</span><span>Uploads</span><span>Admin</span></div></div>
      <div className="builder-app">
        <aside>
          <strong>Platform Menu</strong>
          <AddonTab addonKey="portal" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><UserRound size={15} /> Portal</AddonTab>
          <AddonTab addonKey="booking" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><CalendarDays size={15} /> Requests</AddonTab>
          <AddonTab addonKey="payments" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><WalletCards size={15} /> Payments</AddonTab>
          <AddonTab addonKey="uploads" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><UploadCloud size={15} /> Uploads</AddonTab>
          <AddonTab addonKey="admin" selected={selected} activeAddon={activeAddon} setActiveAddon={setActiveAddon}><LayoutDashboard size={15} /> Admin</AddonTab>
        </aside>
        <main>
          <div className="metric-row">
            <button onClick={() => setActiveAddon("database")} className={selected.includes("database") ? "enabled" : "disabled"}><strong>128</strong><span>Records</span></button>
            <button onClick={() => setActiveAddon("payments")} className={selected.includes("payments") ? "enabled" : "disabled"}><strong>$8.4k</strong><span>Payments</span></button>
            <button onClick={() => setActiveAddon("notifications")} className={selected.includes("notifications") ? "enabled" : "disabled"}><strong>7</strong><span>Alerts</span></button>
          </div>
          <div className="workflow-grid">
            <WorkflowCard title="Customer Request" active={activeAddon === "booking"} />
            <WorkflowCard title="Quote / Payment" active={activeAddon === "payments"} />
            <WorkflowCard title="Upload Review" active={activeAddon === "uploads"} />
            <WorkflowCard title="Admin Action" active={activeAddon === "admin"} />
          </div>
        </main>
      </div>
      <HostingTag hosting={hosting} />
    </div>
  );
}

function WorkflowCard({ title, active }) {
  return <div className={`workflow-card ${active ? "active" : ""}`}><span /><strong>{title}</strong><small>{active ? "Selected workflow" : "Workflow preview"}</small></div>;
}

function HostingTag({ hosting }) {
  return <div className="hosting-tag">{hosting === "managed" ? <><Server size={18} /> Managed hosting and maintenance selected</> : <><FileText size={18} /> Self-hosted file handoff selected</>}</div>;
}

function AddonDemo({ addonKey, selected }) {
  const addon = addOns.find((item) => item.key === addonKey);
  const [step, setStep] = useState(0);

  if (!addon || !selected.includes(addonKey)) {
    return (
      <div className="addon-demo empty">
        <h3>Select an add-on to see the feature in action.</h3>
        <p>Each add-on includes a mini demo and a business explanation so customers understand why it costs more than a basic website.</p>
      </div>
    );
  }

  const Icon = addon.icon;

  return (
    <div className="addon-demo">
      <div className="addon-demo-head">
        <span><Icon size={22} /></span>
        <div>
          <h3>{addon.label}</h3>
          <p>{addon.plain}</p>
        </div>
      </div>

      <div className="demo-click-area">
        <div className="demo-screen">
          <Icon size={30} />
          <strong>{addon.steps[step]}</strong>
          <p>{addon.technical}</p>
        </div>
        <div className="demo-steps">
          {addon.steps.map((item, index) => (
            <button key={item} className={step === index ? "active" : ""} onClick={() => setStep(index)}>
              {index + 1}. {item}
            </button>
          ))}
        </div>
      </div>

      <div className="why-box">
        <strong>Why this matters:</strong>
        <p>{addon.plain}</p>
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <section className="section">
      <div className="section-head">
        <div><p className="eyebrow small">Proof of work</p><h2>Real projects that support the packages.</h2></div>
      </div>
      <div className="work-grid">
        {portfolio.map((item) => (
          <article className="work-card" key={item.title}>
            <div className="work-visual"><Globe2 size={42} /><strong>{item.title}</strong><span>{item.type}</span></div>
            <div className="work-copy">
              <span>{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="tag-row">{item.tags.map((tag) => <em key={tag}>{tag}</em>)}</div>
              {item.url !== "#" ? <a href={item.url} target="_blank" rel="noreferrer">View live example <ExternalLink size={15} /></a> : <a href="/builder">Ask to see demo <ExternalLink size={15} /></a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Hosting() {
  return (
    <section className="section">
      <div className="section-head">
        <div><p className="eyebrow small">Hosting and maintenance</p><h2>Two clear options after launch.</h2></div>
        <p>Clients can choose a hands-off managed plan or take the files and manage the site themselves.</p>
      </div>
      <div className="hosting-grid">
        <article className="hosting-card featured">
          <Server size={28} />
          <h3>Managed Hosting & Maintenance</h3>
          <p>For clients who prefer a hands-off experience, I provide ongoing hosting, deployment support, monitoring, maintenance, and technical assistance for a monthly service fee.</p>
          <ul>
            <li><Check size={16} /> Website hosting and deployment support</li>
            <li><Check size={16} /> General uptime monitoring</li>
            <li><Check size={16} /> Routine technical maintenance</li>
            <li><Check size={16} /> Basic support if something breaks</li>
          </ul>
        </article>

        <article className="hosting-card">
          <FileText size={28} />
          <h3>Self-Hosted File Handoff</h3>
          <p>Clients who prefer to manage their own hosting receive the completed project files, assets, and deployment instructions after launch.</p>
          <ul>
            <li><Check size={16} /> Complete project file package</li>
            <li><Check size={16} /> Initial launch assistance</li>
            <li><Check size={16} /> Client manages future hosting/accounts</li>
            <li><Check size={16} /> Future work quoted separately</li>
          </ul>
        </article>
      </div>
      <div className="future-policy">
        <LifeBuoy size={26} />
        <div>
          <h3>Future Updates & Enhancements</h3>
          <p>After the original project scope is completed, additional features, redesign requests, integrations, bug fixes, or workflow changes may be completed under a separate fixed-price quote or hourly development agreement.</p>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["Discovery", "Define business goals, pages, features, audience, and must-have functionality.", MousePointerClick],
    ["Scope", "Estimate based on complexity, integrations, content, and launch needs.", BarChart3],
    ["Build", "Develop, review, revise, and prepare the website or platform.", Wrench],
    ["Launch", "Deploy with managed support or complete project handoff.", Zap]
  ];

  return (
    <section className="section">
      <div className="section-head center"><p className="eyebrow small">Process</p><h2>From idea to launch.</h2></div>
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

function FinalCTA() {
  return (
    <section id="contact" className="section">
      <div className="contact-card">
        <div>
          <p className="eyebrow small">Start the project</p>
          <h2>Pick a tier, test add-ons, then request a quote.</h2>
          <p>The quote builder gives a starting estimate. Final pricing depends on exact scope, integrations, revisions, content readiness, and development time.</p>
          <div className="hero-actions">
            <a className="btn primary" href={`mailto:${ownerEmail}`}><Mail size={18} /> Email Me</a>
            <a className="btn secondary" href="/builder">Build Estimate</a>
          </div>
        </div>
        <form className="lead-form" onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const subject = encodeURIComponent("Website project request");
          const body = encodeURIComponent(`Name: ${data.get("name")}\nBusiness: ${data.get("business")}\nTier: ${data.get("tier")}\nHosting: ${data.get("hosting")}\nMessage: ${data.get("message")}`);
          window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
        }}>
          <label>Name<input name="name" required placeholder="Your name" /></label>
          <label>Business<input name="business" required placeholder="Business name" /></label>
          <label>Tier interest<select name="tier" defaultValue="Intermediate"><option>Beginner</option><option>Intermediate</option><option>Pro</option><option>Not sure yet</option></select></label>
          <label>Hosting preference<select name="hosting" defaultValue="Managed hosting"><option>Managed hosting / maintenance</option><option>Self-hosted file handoff</option><option>Not sure yet</option></select></label>
          <label>What should the website do?<textarea name="message" rows="4" placeholder="Payments, booking, dashboard, portal, uploads, integrations, etc." /></label>
          <button type="submit">Send Website Request <ArrowRight size={17} /></button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a className="brand" href="/"><span className="brand-mark"><Code2 size={20} /></span><span><strong>LaunchLine</strong><small>Studio</small></span></a>
      <p>Professional website packages, interactive demos, and clear project scopes for growing businesses.</p>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
