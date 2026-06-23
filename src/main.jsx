import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
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
  Home,
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
    subtitle: "Starter website",
    price: 499,
    priceText: "$499+",
    timeline: "3–5 days",
    icon: LayoutTemplate,
    theme: "starter",
    short: "A polished one-page website for a business that needs credibility fast.",
    clientLine: "You get a clean landing page that explains your business and gives customers a clear way to contact you.",
    includes: [
      "One-page responsive website",
      "Hero section with call-to-action",
      "Services overview",
      "About / trust section",
      "Reviews or credibility section",
      "FAQ section",
      "Contact form or click-to-call",
      "Google Map / service area block",
      "Social links"
    ],
    notIncluded: [
      "Customer logins",
      "Online payments",
      "Admin dashboard",
      "Database workflows",
      "Complex booking systems"
    ],
    sampleBusiness: "ClearPath Cleaning Co.",
    sampleHeadline: "Professional home cleaning that keeps your week stress-free.",
    sampleSubtext: "A simple site focused on trust, services, reviews, and contact.",
    sections: ["Hero", "Services", "About", "Reviews", "FAQ", "Contact"],
  },
  intermediate: {
    slug: "intermediate",
    name: "Intermediate",
    subtitle: "Growth website",
    price: 999,
    priceText: "$999+",
    timeline: "1–2 weeks",
    icon: Rocket,
    theme: "growth",
    short: "A multi-page website made to explain services, show proof, and collect stronger leads.",
    clientLine: "You get a complete business website with multiple pages, stronger content structure, and better lead capture.",
    includes: [
      "3–6 responsive pages",
      "Dedicated services page",
      "Gallery / portfolio / before-after page",
      "Testimonials and proof sections",
      "FAQ and process sections",
      "Lead form with service-interest fields",
      "SEO-friendly page structure",
      "Optional lightweight editable content"
    ],
    notIncluded: [
      "Full customer portal",
      "Advanced admin dashboard",
      "Complex payment workflows",
      "Custom software logic"
    ],
    sampleBusiness: "Iron Ridge Contractors",
    sampleHeadline: "Reliable repairs, remodels, and property improvements.",
    sampleSubtext: "A full business site focused on service pages, proof, gallery, and lead conversion.",
    sections: ["Home", "Services", "Gallery", "Process", "FAQ", "Quote"],
  },
  pro: {
    slug: "pro",
    name: "Pro",
    subtitle: "Custom platform",
    price: 1999,
    priceText: "$1,999+",
    timeline: "2–5 weeks",
    icon: Crown,
    theme: "pro",
    short: "A custom web app with accounts, dashboards, payments, quotes, uploads, and business workflows.",
    clientLine: "You get a website that actually runs part of the business, not just a brochure.",
    includes: [
      "Custom frontend and backend",
      "Customer accounts and profiles",
      "Role-based dashboards",
      "Admin dashboard",
      "Payments or quote workflows",
      "Booking/request system",
      "File, PDF, or video uploads",
      "Database-backed records",
      "Notifications and statuses"
    ],
    notIncluded: [
      "Unlimited future features",
      "Third-party fees",
      "Ongoing hosting unless selected",
      "Unscoped integrations"
    ],
    sampleBusiness: "Apex Coaching Portal",
    sampleHeadline: "A client portal for bookings, payments, uploads, and coach feedback.",
    sampleSubtext: "A platform-style build with dashboards, roles, payment workflows, and client submissions.",
    sections: ["Portal", "Requests", "Payments", "Uploads", "Admin", "Reports"],
  }
};

const addOns = [
  { key: "booking", label: "Booking / Scheduling", price: 300, icon: CalendarDays, description: "Adds appointment or service request scheduling.", preview: "A booking panel appears with available service choices and time options." },
  { key: "payments", label: "Payments / Deposits", price: 350, icon: WalletCards, description: "Adds Stripe checkout, deposits, or invoice-style payments.", preview: "A payment checkout card appears with order totals and secure checkout CTA." },
  { key: "portal", label: "Customer Portal", price: 500, icon: UserRound, description: "Adds login, account area, saved requests, and customer history.", preview: "A customer portal card appears with profile, request history, and status tracking." },
  { key: "admin", label: "Admin Dashboard", price: 650, icon: LayoutDashboard, description: "Adds a private dashboard to manage business data.", preview: "An admin metrics panel appears with customers, orders, requests, and revenue." },
  { key: "database", label: "Database Workflows", price: 500, icon: Database, description: "Stores submissions, requests, messages, orders, or records.", preview: "A live records table appears to show stored customer activity." },
  { key: "uploads", label: "File / PDF / Video Uploads", price: 450, icon: UploadCloud, description: "Adds uploads for files, videos, photos, documents, or forms.", preview: "An upload dropzone appears with PDF/video file examples." },
  { key: "notifications", label: "Notifications", price: 300, icon: MessageSquareText, description: "Adds alerts, badges, statuses, and activity updates.", preview: "Notification badges appear on dashboard and request cards." },
  { key: "seo", label: "Extra SEO Pages", price: 250, icon: Search, description: "Adds service/location pages for stronger search coverage.", preview: "SEO service cards appear with location/service page examples." },
  { key: "integrations", label: "Custom Integrations*", price: 750, icon: Globe2, description: "Adds CRM, email, API, automation, or third-party tools.", preview: "Integration cards appear showing connected business tools." }
];

const portfolio = [
  {
    title: "Goodman Pickleball Coaching",
    tier: "Pro",
    url: "https://www.goodmanpickleball.com",
    summary: "Custom coaching platform with customer accounts, coach dashboards, admin controls, quotes, payments, notifications, and video/PDF submissions.",
    tags: ["React", "Node", "MongoDB", "Stripe", "Railway"]
  },
  {
    title: "Big Papa Joe Septic",
    tier: "Intermediate / Pro",
    url: "#",
    summary: "Service-business website with service pages, contact flow, payments, FAQ, testimonials, marketplace-style pages, and admin tools.",
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
      <TrustStrip />
      <TierCards />
      <FullPagePreviewSection />
      <DreamBuilderCompact />
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
          <span className="brand-icon"><Code2 size={20} /></span>
          <span><strong>LaunchLine</strong><small>Websites</small></span>
        </a>
        <div className={`nav-links ${mobile ? "open" : ""}`}>
          <a href="/beginner">Beginner Demo</a>
          <a href="/intermediate">Intermediate Demo</a>
          <a href="/pro">Pro Demo</a>
          <a href="/builder">Dream Builder</a>
          <a href="/#contact">Contact</a>
        </div>
        <a className="nav-button" href="/builder">Build Dream Site <ArrowRight size={16} /></a>
        <button className="mobile-toggle" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="section hero">
      <div className="hero-grid">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="eyebrow"><Sparkles size={16} /> Full demo pages for every package</div>
          <h1>Let clients open each tier and see exactly what they would get.</h1>
          <p className="hero-text">
            Beginner, Intermediate, and Pro are no longer just cards. Each package has a full sample page so a business owner can visually compare a simple website, a growth website, and a custom platform.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="/builder">Build Your Dream Website <ArrowRight size={18} /></a>
            <a className="btn secondary" href="#tier-pages">View Tier Demo Pages</a>
          </div>
          <div className="micro-proof">
            <span><BadgeCheck size={16} /> Visual examples</span>
            <span><ShieldCheck size={16} /> Clear scope</span>
            <span><Gauge size={16} /> Quote estimates</span>
          </div>
        </motion.div>

        <motion.div className="hero-showcase" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }}>
          <div className="browser-bar"><span /><span /><span /><p>dream-site-builder.com</p></div>
          <div className="builder-preview-mini">
            <div className="mini-sidebar">
              <strong>Package</strong>
              <span>Beginner</span>
              <span className="active">Intermediate</span>
              <span>Pro</span>
            </div>
            <div className="mini-preview">
              <div className="mini-hero">
                <p>Live Preview</p>
                <h3>Website grows as add-ons are selected.</h3>
              </div>
              <div className="mini-grid">
                <div><CalendarDays size={18}/><span>Booking</span></div>
                <div><WalletCards size={18}/><span>Payments</span></div>
                <div><LayoutDashboard size={18}/><span>Dashboard</span></div>
                <div><UploadCloud size={18}/><span>Uploads</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip">
      <div><strong>3</strong><span>full tier pages</span></div>
      <div><strong>Live</strong><span>dream builder</span></div>
      <div><strong>Visual</strong><span>add-on previews</span></div>
      <div><strong>Clear</strong><span>hosting terms</span></div>
    </section>
  );
}

function TierCards() {
  return (
    <section id="tier-pages" className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Open the full examples</p>
          <h2>Each tier has its own full demo page.</h2>
        </div>
        <p>
          A client can click into each package and see the page structure, included sections, what is not included, and what the finished site could feel like.
        </p>
      </div>
      <div className="tiers-grid">
        {Object.values(tiers).map((tier, index) => <TierCard key={tier.slug} tier={tier} index={index} />)}
      </div>
    </section>
  );
}

function TierCard({ tier, index }) {
  const Icon = tier.icon;
  return (
    <motion.article className={`tier-card ${tier.theme}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .45, delay: index * .08 }}>
      <div className="tier-top">
        <span className="tier-icon"><Icon size={24}/></span>
        <span className="tier-badge">{tier.timeline}</span>
      </div>
      <h3>{tier.name}</h3>
      <p className="tier-subtitle">{tier.subtitle}</p>
      <p className="tier-full">{tier.short}</p>
      <div className="price-line"><strong>{tier.priceText}</strong><small>{tier.timeline}</small></div>
      <ul>{tier.includes.slice(0, 6).map((item) => <li key={item}><Check size={16}/>{item}</li>)}</ul>
      <a className="card-cta" href={`/${tier.slug}`}>Open {tier.name} Demo Page <ChevronRight size={17}/></a>
    </motion.article>
  );
}

function FullPagePreviewSection() {
  return (
    <section className="section sample-section">
      <div className="section-head">
        <div>
          <p className="eyebrow small">Side-by-side visual preview</p>
          <h2>Show the real difference between packages.</h2>
        </div>
      </div>
      <div className="sample-grid">
        {Object.values(tiers).map((tier) => <SampleSite key={tier.slug} tier={tier}/>)}
      </div>
    </section>
  );
}

function TierDemo({ tier }) {
  const Icon = tier.icon;
  return (
    <>
      <section className={`tier-demo-hero ${tier.theme}`}>
        <div className="section tier-demo-grid">
          <div>
            <div className="eyebrow"><Icon size={16}/> {tier.name} package demo</div>
            <h1>{tier.sampleBusiness}</h1>
            <p className="hero-text">{tier.sampleHeadline}</p>
            <p className="tier-client-line">{tier.clientLine}</p>
            <div className="hero-actions">
              <a className="btn primary" href="/builder">Customize This Tier</a>
              <a className="btn secondary" href="#demo-page">View Full Page</a>
            </div>
          </div>
          <div className="tier-info-card">
            <strong>{tier.priceText}</strong>
            <span>{tier.timeline}</span>
            <p>{tier.short}</p>
          </div>
        </div>
      </section>

      <section id="demo-page" className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow small">What the client sees</p>
            <h2>Example base page for the {tier.name} tier.</h2>
          </div>
          <p>{tier.sampleSubtext}</p>
        </div>
        <DemoWebsite tier={tier} large />
      </section>

      <section className="section">
        <div className="tier-details-grid">
          <article className="detail-card">
            <h3>What this tier includes</h3>
            <ul>{tier.includes.map((item) => <li key={item}><Check size={16}/>{item}</li>)}</ul>
          </article>
          <article className="detail-card warning">
            <h3>What this tier does not include by default</h3>
            <ul>{tier.notIncluded.map((item) => <li key={item}><X size={16}/>{item}</li>)}</ul>
          </article>
          <article className="detail-card">
            <h3>Recommended add-ons</h3>
            <p>
              Add-ons can be selected in the Dream Website Builder. If a client wants features outside this tier, the builder shows how the price and preview changes.
            </p>
            <a className="card-cta" href="/builder">Open Dream Builder <ArrowRight size={16}/></a>
          </article>
        </div>
      </section>

      <HostingSection />
      <FinalCTA />
    </>
  );
}

function SampleSite({ tier }) {
  return (
    <article className={`sample-window ${tier.theme}`}>
      <div className="sample-browser"><span /><span /><span /><small>{tier.name.toLowerCase()}-preview.com</small></div>
      <div className="sample-nav">
        <strong>{tier.sampleBusiness}</strong>
        <div>{tier.sections.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
      </div>
      <div className="sample-hero">
        <p>{tier.name} Example</p>
        <h3>{tier.sampleHeadline}</h3>
        <button>{tier.slug === "pro" ? "Login" : tier.slug === "intermediate" ? "Get Estimate" : "Contact"}</button>
      </div>
      <div className="sample-blocks">
        {tier.sections.slice(0, 5).map((block, index) => (
          <div key={block} className={index === 0 ? "wide" : ""}><span/><strong>{block}</strong></div>
        ))}
      </div>
      <div className="sample-footer">{tier.short}</div>
    </article>
  );
}

function DemoWebsite({ tier, large = false }) {
  const isPro = tier.slug === "pro";
  const isIntermediate = tier.slug === "intermediate";
  return (
    <div className={`demo-website ${tier.theme} ${large ? "large" : ""}`}>
      <div className="demo-nav">
        <strong>{tier.sampleBusiness}</strong>
        <div>{tier.sections.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
      <div className="demo-hero">
        <div>
          <p>{tier.subtitle}</p>
          <h3>{tier.sampleHeadline}</h3>
          <small>{tier.sampleSubtext}</small>
        </div>
        <button>{isPro ? "Open Dashboard" : isIntermediate ? "Request Estimate" : "Call Today"}</button>
      </div>
      <div className="demo-content-grid">
        <section className="demo-panel wide">
          <h4>{isPro ? "Client Portal" : isIntermediate ? "Featured Services" : "Main Services"}</h4>
          <div className="demo-card-row">
            <MiniPanel title={isPro ? "Active Requests" : "Service 1"} />
            <MiniPanel title={isPro ? "Payment Status" : "Service 2"} />
            <MiniPanel title={isPro ? "Uploaded Files" : "Service 3"} />
          </div>
        </section>

        <section className="demo-panel">
          <h4>{isPro ? "Dashboard Metrics" : isIntermediate ? "Gallery Proof" : "Trust Builder"}</h4>
          <div className="stat-lines"><span/><span/><span/></div>
        </section>

        <section className="demo-panel">
          <h4>{isPro ? "Notifications" : isIntermediate ? "Lead Form" : "Contact Form"}</h4>
          <div className="fake-form"><span/><span/><button>{isPro ? "View Alerts" : "Submit"}</button></div>
        </section>

        {isIntermediate && (
          <section className="demo-panel wide">
            <h4>Before / After Gallery</h4>
            <div className="gallery-strip"><span/><span/><span/><span/></div>
          </section>
        )}

        {isPro && (
          <>
            <section className="demo-panel wide">
              <h4>Admin Dashboard</h4>
              <div className="dashboard-grid"><MiniPanel title="Users"/><MiniPanel title="Orders"/><MiniPanel title="Quotes"/><MiniPanel title="Revenue"/></div>
            </section>
            <section className="demo-panel wide">
              <h4>Uploads + Workflow Status</h4>
              <div className="upload-preview"><UploadCloud size={22}/><span>Video / PDF upload area with status tracking</span></div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function MiniPanel({ title }) {
  return <div className="mini-panel"><span/><strong>{title}</strong><small>Preview block</small></div>;
}

function DreamBuilderCompact() {
  return (
    <section className="section builder-compact">
      <div className="compact-card">
        <div>
          <p className="eyebrow small">Build your dream website</p>
          <h2>Let clients select add-ons and see the website preview change.</h2>
          <p>
            This is the sales tool: clients can click features like payments, booking, uploads, admin dashboards, and portals to understand what each add-on actually brings.
          </p>
        </div>
        <a className="btn primary" href="/builder">Open Dream Builder <ArrowRight size={18}/></a>
      </div>
    </section>
  );
}

function DreamBuilder() {
  const [tierSlug, setTierSlug] = useState("intermediate");
  const [selected, setSelected] = useState(["booking"]);
  const [hosting, setHosting] = useState("managed");
  const tier = tiers[tierSlug];

  const total = useMemo(() => {
    return tier.price + selected.reduce((sum, key) => sum + (addOns.find((item) => item.key === key)?.price || 0), 0);
  }, [tier.price, selected]);

  const toggle = (key) => {
    setSelected((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  };

  const selectedFeatureText = selected.map((key) => addOns.find((item) => item.key === key)?.label).filter(Boolean).join(", ");
  const mailtoHref = `mailto:${ownerEmail}?subject=${encodeURIComponent("Dream website quote request")}&body=${encodeURIComponent(`Tier: ${tier.name}\nEstimated starting total: $${total.toLocaleString()}+\nSelected add-ons: ${selectedFeatureText || "None"}\nHosting preference: ${hosting === "managed" ? "Managed hosting / maintenance" : "Self-hosted handoff"}\n\nBusiness details:\n`)}`;

  return (
    <>
      <section className="section builder-page">
        <div className="section-head">
          <div>
            <p className="eyebrow small">Interactive build preview</p>
            <h1>Build your dream website.</h1>
          </div>
          <p>
            Pick a tier and click customizations. The preview changes immediately so the client can understand what each feature adds before requesting the final quote.
          </p>
        </div>

        <div className="dream-grid">
          <aside className="builder-controls">
            <div className="control-group">
              <h3>1. Choose a base tier</h3>
              <div className="tier-buttons">
                {Object.values(tiers).map((item) => (
                  <button key={item.slug} className={tierSlug === item.slug ? "active" : ""} onClick={() => setTierSlug(item.slug)}>
                    <strong>{item.name}</strong>
                    <span>{item.priceText}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <h3>2. Add custom features</h3>
              <div className="addon-list">
                {addOns.map((feature) => {
                  const Icon = feature.icon;
                  const active = selected.includes(feature.key);
                  return (
                    <button key={feature.key} className={`addon-toggle ${active ? "active" : ""}`} onClick={() => toggle(feature.key)}>
                      <span><Icon size={18}/></span>
                      <div>
                        <strong>{feature.label}</strong>
                        <small>+${feature.price.toLocaleString()}{feature.key === "integrations" ? "*" : ""}</small>
                        <p>{feature.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="control-group">
              <h3>3. Hosting preference</h3>
              <div className="hosting-choice">
                <button className={hosting === "managed" ? "active" : ""} onClick={() => setHosting("managed")}>Managed hosting</button>
                <button className={hosting === "handoff" ? "active" : ""} onClick={() => setHosting("handoff")}>File handoff</button>
              </div>
            </div>
          </aside>

          <main className="builder-preview-area">
            <div className="live-quote">
              <span>Estimated starting total</span>
              <strong>${total.toLocaleString()}+</strong>
              <small>*Final pricing depends on exact scope, complexity, integrations, content, and revisions.</small>
            </div>
            <LivePreview tier={tier} selected={selected} hosting={hosting} />
            <div className="feature-explainer">
              <h3>What selected add-ons bring</h3>
              {selected.length === 0 ? (
                <p>No add-ons selected. The preview is showing the base {tier.name} website.</p>
              ) : (
                <div className="explainer-grid">
                  {selected.map((key) => {
                    const item = addOns.find((feature) => feature.key === key);
                    if (!item) return null;
                    const Icon = item.icon;
                    return (
                      <article key={key}>
                        <Icon size={20}/>
                        <strong>{item.label}</strong>
                        <p>{item.preview}</p>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
            <a className="btn primary full" href={mailtoHref}>Request This Website Quote <ArrowRight size={18}/></a>
          </main>
        </div>
      </section>
      <HostingSection />
    </>
  );
}

function LivePreview({ tier, selected, hosting }) {
  const has = (key) => selected.includes(key);
  return (
    <div className={`live-site-preview ${tier.theme}`}>
      <div className="live-topbar"><span/><span/><span/><small>{tier.name.toLowerCase()}-custom-preview.com</small></div>
      <div className="live-nav">
        <strong>{tier.sampleBusiness}</strong>
        <div>
          <span>Home</span>
          <span>Services</span>
          {has("booking") && <span>Book</span>}
          {has("portal") && <span>Portal</span>}
          {has("admin") && <span>Admin</span>}
        </div>
      </div>
      <div className="live-hero">
        <div>
          <p>{tier.name} + Custom Add-ons</p>
          <h3>{tier.sampleHeadline}</h3>
          <small>{tier.clientLine}</small>
        </div>
        <button>{has("payments") ? "Pay / Deposit" : has("booking") ? "Book Now" : "Request Info"}</button>
      </div>

      <div className="live-modules">
        <BaseModule title="Services" icon={Store} text="Business services and core offers." />
        {has("booking") && <BaseModule title="Booking" icon={CalendarDays} text="Appointment and request scheduling." />}
        {has("payments") && <BaseModule title="Payments" icon={WalletCards} text="Checkout, deposits, and order totals." />}
        {has("portal") && <BaseModule title="Customer Portal" icon={UserRound} text="Login, profile, saved requests, and history." />}
        {has("admin") && <BaseModule title="Admin Dashboard" icon={LayoutDashboard} text="Business management area with metrics." />}
        {has("database") && <BaseModule title="Database Records" icon={Database} text="Stored customers, requests, orders, and messages." />}
        {has("uploads") && <BaseModule title="Uploads" icon={UploadCloud} text="PDF, video, photo, or document uploads." />}
        {has("notifications") && <BaseModule title="Notifications" icon={MessageSquareText} text="Badges, alerts, and status updates." />}
        {has("seo") && <BaseModule title="SEO Pages" icon={Search} text="Additional service and location pages." />}
        {has("integrations") && <BaseModule title="Integrations*" icon={Globe2} text="Third-party tools, APIs, or automations." />}
      </div>

      {(has("admin") || has("database") || has("payments")) && (
        <div className="live-dashboard">
          <div><strong>128</strong><span>Leads</span></div>
          <div><strong>$4.8k</strong><span>Payments</span></div>
          <div><strong>32</strong><span>Requests</span></div>
        </div>
      )}

      <div className="live-hosting">
        {hosting === "managed" ? (
          <><Server size={18}/><span>Managed hosting and maintenance selected</span></>
        ) : (
          <><FileText size={18}/><span>Self-hosted file handoff selected</span></>
        )}
      </div>
    </div>
  );
}

function BaseModule({ title, icon: Icon, text }) {
  return (
    <article className="base-module">
      <Icon size={20}/>
      <strong>{title}</strong>
      <p>{text}</p>
    </article>
  );
}

function WorkShowcase() {
  return (
    <section className="section work-section">
      <div className="section-head">
        <div><p className="eyebrow small">Proof of work</p><h2>Real builds that show the tiers in action.</h2></div>
      </div>
      <div className="work-grid">
        {portfolio.map((item) => (
          <article className="work-card" key={item.title}>
            <div className="work-visual"><div className="work-window"><span/><span/><span/></div><div className="work-screen"><Globe2 size={38}/><strong>{item.title}</strong><small>{item.tier}</small></div></div>
            <div className="work-copy">
              <span className="work-type">{item.tier}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="stack-row">{item.tags.map((tag) => <em key={tag}>{tag}</em>)}</div>
              {item.url !== "#" ? <a href={item.url} target="_blank" rel="noreferrer">View live example <ExternalLink size={15}/></a> : <a href="/builder">Ask to see demo <ExternalLink size={15}/></a>}
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
        <div><p className="eyebrow small">Hosting and support</p><h2>Choose managed support or a clean handoff.</h2></div>
        <p>This makes expectations clear after launch and protects against unlimited unpaid updates.</p>
      </div>
      <div className="hosting-grid">
        <article className="hosting-card managed">
          <div className="hosting-icon"><Server size={26}/></div>
          <h3>Managed Hosting & Maintenance</h3>
          <p>For clients who prefer a hands-off experience, I provide ongoing hosting, monitoring, maintenance, deployment support, and technical issue resolution for a monthly service fee.</p>
          <ul>
            <li><Check size={16}/> Website hosting and deployment support</li>
            <li><Check size={16}/> Uptime and general site monitoring</li>
            <li><Check size={16}/> Routine technical maintenance</li>
            <li><Check size={16}/> Security-conscious updates and backups</li>
            <li><Check size={16}/> Basic support if something breaks</li>
          </ul>
          <div className="hosting-note">Recommended for businesses that want me to help keep the site online and operating smoothly.</div>
        </article>
        <article className="hosting-card">
          <div className="hosting-icon"><FileText size={26}/></div>
          <h3>Self-Hosted File Handoff</h3>
          <p>Clients who do not want monthly hosting through me receive the project files, assets, and deployment instructions after launch.</p>
          <ul>
            <li><Check size={16}/> Complete website file package</li>
            <li><Check size={16}/> Initial launch assistance</li>
            <li><Check size={16}/> Basic deployment documentation</li>
            <li><Check size={16}/> Client manages future hosting and accounts</li>
            <li><Check size={16}/> Future work quoted separately</li>
          </ul>
          <div className="hosting-note">After handoff, future hosting, updates, bug fixes, and additional features are the client’s responsibility unless quoted separately.</div>
        </article>
      </div>
      <div className="future-work">
        <div><LifeBuoy size={28}/><h3>Future Updates & Enhancements</h3></div>
        <p>Additional features, modifications, integrations, design changes, and bug fixes requested after project completion can be handled through a separate fixed-price quote or hourly development agreement depending on scope.</p>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["Discovery", "Define business goals, pages, features, audience, and must-have functionality.", MousePointerClick],
    ["Quote", "Scope the project based on time, complexity, integrations, content, and launch needs.", BarChart3],
    ["Build", "Develop, review, revise, and prepare the site or app for deployment.", Wrench],
    ["Launch", "Deploy to hosting with either managed support or a clean project handoff.", Zap]
  ];
  return (
    <section className="section">
      <div className="section-head center"><p className="eyebrow small">Process</p><h2>From idea to launched website.</h2></div>
      <div className="process-grid">{steps.map(([title,text,Icon], i) => <article className="process-card" key={title}><span>0{i+1}</span><Icon size={26}/><h3>{title}</h3><p>{text}</p></article>)}</div>
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
          <p>The quote builder helps start the conversation, but the final quote is based on the real scope, exact features, integrations, content, and revision needs.</p>
          <div className="contact-actions"><a className="btn primary" href={`mailto:${ownerEmail}`}><Mail size={18}/> Email Me</a><a className="btn secondary" href="/builder">Build Estimate</a></div>
        </div>
        <form className="lead-form" onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const subject = encodeURIComponent("Website project request");
          const body = encodeURIComponent(`Name: ${data.get("name")}\nBusiness: ${data.get("business")}\nPackage: ${data.get("package")}\nHosting: ${data.get("hosting")}\nMessage: ${data.get("message")}`);
          window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
        }}>
          <label>Name<input name="name" required placeholder="Your name"/></label>
          <label>Business<input name="business" required placeholder="Business name"/></label>
          <label>Package interest<select name="package" defaultValue="Intermediate"><option>Beginner</option><option>Intermediate</option><option>Pro</option><option>Not sure yet</option></select></label>
          <label>Hosting preference<select name="hosting" defaultValue="Managed hosting"><option>Managed hosting / maintenance</option><option>Self-hosted file handoff</option><option>Not sure yet</option></select></label>
          <label>What should the website do?<textarea name="message" rows="4" placeholder="Pages, payments, booking, admin tools, customer portal, integrations, etc."/></label>
          <button type="submit">Send Website Request <ArrowRight size={17}/></button>
        </form>
      </div>
    </section>
  );
}

function Industries() {
  const industries = ["Contractors","Restaurants","Coaches","Gyms","Auto services","Cleaning services","Landscapers","Barbers","Med spas","Consultants","Local shops","Creators"];
  return <section className="section industries"><div className="section-head center"><p className="eyebrow small">Who this works for</p><h2>Built for businesses that need more than a social media page.</h2></div><div className="industry-grid">{industries.map((industry) => <span key={industry}>{industry}</span>)}</div></section>;
}

function Footer() {
  return <footer className="footer"><a className="brand" href="/"><span className="brand-icon"><Code2 size={20}/></span><span><strong>LaunchLine</strong><small>Websites</small></span></a><p>Beginner, Intermediate, and Pro websites with full tier demos and a dream website builder.</p></footer>;
}

createRoot(document.getElementById("root")).render(<App />);
