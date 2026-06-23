import React from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowRight, BadgeCheck, BriefcaseBusiness, Check, ChevronRight, Code2,
  Crown, ExternalLink, Gauge, Globe2, LayoutTemplate, Mail, MessageSquareText,
  Rocket, ShieldCheck, Sparkles, Star, Store, Wrench, Zap
} from "lucide-react";
import "./styles.css";

const packages = [
  {
    name: "Beginner",
    badge: "Starter presence",
    price: "$499+",
    timeline: "3–5 days",
    icon: LayoutTemplate,
    description: "A clean, professional one-page website for businesses that need to look legitimate fast.",
    bestFor: "new businesses, solo services, simple portfolios",
    features: ["1-page responsive landing site", "Hero, services, about, contact", "Mobile-friendly design", "Basic SEO structure", "Contact form or click-to-call", "Social links and Google Maps"],
    sections: ["Home", "Services", "About", "Contact"]
  },
  {
    name: "Intermediate",
    badge: "Business growth",
    price: "$999+",
    timeline: "1–2 weeks",
    icon: Rocket,
    description: "A multi-page business website built to explain services, collect leads, and show credibility.",
    bestFor: "local businesses, coaching, contractors, restaurants",
    features: ["3–6 page website", "Homepage, services, gallery, FAQ, contact", "Lead capture form", "Testimonials/reviews section", "Stronger SEO page structure", "Basic admin-editable content options"],
    sections: ["Home", "Services", "Gallery", "FAQ", "Contact"]
  },
  {
    name: "Pro",
    badge: "Custom platform",
    price: "$1,999+",
    timeline: "2–5 weeks",
    icon: Crown,
    description: "A custom web app style build with login, dashboards, payments, bookings, and business workflows.",
    bestFor: "coaches, booking platforms, marketplaces, businesses with operations",
    features: ["Custom frontend + backend", "User accounts and role dashboards", "Booking, quote, or request workflows", "Stripe payment integration", "Admin dashboard", "Database-backed content and submissions"],
    sections: ["Portal", "Bookings", "Payments", "Admin", "Dashboard"]
  }
];

const portfolio = [
  {
    title: "Goodman Pickleball Coaching",
    type: "Pro Web App",
    summary: "Coaching marketplace with customers, coaches, admin controls, quote workflows, payments, and video/PDF submissions.",
    tags: ["React", "Node", "MongoDB", "Stripe", "Railway"],
    url: "https://www.goodmanpickleball.com"
  },
  {
    title: "Big Papa Joe Septic",
    type: "Intermediate Business Site",
    summary: "Service-business website with services, contact, payments, FAQ, testimonials, marketplace, and admin tools.",
    tags: ["React", "Express", "MongoDB", "Tailwind"],
    url: "#"
  }
];

function App() {
  return (
    <div className="app-shell">
      <Nav />
      <main>
        <Hero />
        <Packages />
        <Work />
        <Process />
        <Compare />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="nav-wrap">
      <nav className="nav">
        <a className="brand" href="#top"><span className="brand-mark"><Code2 size={20}/></span><span><strong>LaunchLine</strong><small>Websites</small></span></a>
        <div className="nav-links">
          <a href="#templates">Templates</a><a href="#work">Work</a><a href="#process">Process</a><a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="#contact">Start a Website <ArrowRight size={16}/></a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero section">
      <div className="hero-grid">
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.55}}>
          <div className="eyebrow"><Sparkles size={16}/> Websites built from real client projects</div>
          <h1>Pick the website level that fits your business.</h1>
          <p className="hero-text">Show clients three clear choices: Beginner, Intermediate, and Pro. Each option explains what they get, how fast it can launch, and what type of business it fits best.</p>
          <div className="hero-actions">
            <a className="btn primary" href="#templates">Browse Templates <ArrowRight size={18}/></a>
            <a className="btn secondary" href="#work">See Example Work</a>
          </div>
          <div className="trust-row">
            <span><BadgeCheck size={17}/> Responsive Design</span><span><ShieldCheck size={17}/> Business Ready</span><span><Gauge size={17}/> Fast Launch</span>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:18,scale:.98}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.65,delay:.12}} className="hero-card">
          <div className="browser-bar"><span/><span/><span/><p>template-preview.com</p></div>
          <div className="mock-site">
            <div className="mock-hero"><div><p>Premium Local Service</p><h3>Clean, modern websites that sell.</h3></div><button>Get Quote</button></div>
            <div className="mock-grid">
              <MockCard icon={Store} title="Services"/><MockCard icon={MessageSquareText} title="Lead Form"/><MockCard icon={Star} title="Reviews"/>
            </div>
            <div className="mock-dashboard"><div><small>Template Level</small><strong>Beginner → Pro</strong></div><div className="bars"><span/><span/><span/></div></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MockCard({icon:Icon,title}) { return <div className="mock-card"><Icon size={20}/><span>{title}</span></div>; }

function Packages() {
  return (
    <section id="templates" className="section">
      <div className="section-head">
        <div><p className="eyebrow small">Template choices</p><h2>Three clear packages for every business stage.</h2></div>
        <p>Use these as sales options when a business asks, “What kind of website can you build for me?”</p>
      </div>
      <div className="packages-grid">{packages.map((p,i)=><PackageCard key={p.name} pkg={p} index={i}/>)}</div>
    </section>
  );
}

function PackageCard({pkg,index}) {
  const Icon = pkg.icon;
  return (
    <motion.article initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:.45,delay:index*.08}} className={`package-card ${pkg.name.toLowerCase()}`}>
      <div className="package-top"><div className="package-icon"><Icon size={24}/></div><span>{pkg.badge}</span></div>
      <h3>{pkg.name}</h3><p className="package-desc">{pkg.description}</p>
      <div className="price-row"><strong>{pkg.price}</strong><small>{pkg.timeline}</small></div>
      <div className="best-for"><span>Best for</span><p>{pkg.bestFor}</p></div>
      <ul>{pkg.features.map(f=><li key={f}><Check size={16}/>{f}</li>)}</ul>
      <div className="section-pills">{pkg.sections.map(s=><span key={s}>{s}</span>)}</div>
      <a className="package-link" href="#contact">View {pkg.name} Option <ChevronRight size={17}/></a>
    </motion.article>
  );
}

function Work() {
  return (
    <section id="work" className="section">
      <div className="section-head"><div><p className="eyebrow small">Proof of work</p><h2>Use real builds to help clients choose a level.</h2></div><p>These examples let a client see the difference between a simple business site and a full platform.</p></div>
      <div className="work-grid">{portfolio.map(item=><article className="work-card" key={item.title}>
        <div className="work-preview"><div className="preview-header"><span/><span/><span/></div><div className="preview-body"><Globe2 size={34}/><strong>{item.title}</strong><small>{item.type}</small></div></div>
        <div className="work-content"><span className="work-type">{item.type}</span><h3>{item.title}</h3><p>{item.summary}</p><div className="tag-row">{item.tags.map(t=><span key={t}>{t}</span>)}</div><a href={item.url} target={item.url==="#" ? "_self" : "_blank"} rel="noreferrer">View example <ExternalLink size={15}/></a></div>
      </article>)}</div>
    </section>
  );
}

function Process() {
  const steps = [
    ["Pick a level", "Beginner, Intermediate, or Pro depending on what the business needs.", LayoutTemplate],
    ["Gather details", "Logo, services, photos, pages, colors, domain, and contact info.", BriefcaseBusiness],
    ["Build and review", "Create the site, send a preview, adjust wording and visuals.", Wrench],
    ["Launch", "Deploy to Railway, connect the domain, and hand off instructions.", Zap]
  ];
  return <section id="process" className="section"><div className="section-head center"><p className="eyebrow small">Sales process</p><h2>A simple path from idea to launched website.</h2></div><div className="process-grid">{steps.map(([title,text,Icon],i)=><article className="process-card" key={title}><span className="step-num">0{i+1}</span><Icon size={24}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>;
}

function Compare() {
  const rows = [["Responsive website","Yes","Yes","Yes"],["Multiple pages","Limited","Yes","Yes"],["Lead forms","Basic","Advanced","Advanced"],["Payments / bookings","No","Optional","Yes"],["Admin dashboard","No","Optional","Yes"],["Database workflows","No","Light","Yes"]];
  return <section className="section"><div className="section-head"><div><p className="eyebrow small">Quick comparison</p><h2>Help business owners choose faster.</h2></div></div><div className="comparison-table"><div className="table-row table-head"><span>Feature</span><span>Beginner</span><span>Intermediate</span><span>Pro</span></div>{rows.map(r=><div className="table-row" key={r[0]}>{r.map(c=><span key={c}>{c}</span>)}</div>)}</div></section>;
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="contact-card">
        <div><p className="eyebrow small">Ready to pitch</p><h2>Use this as your main selling page for website clients.</h2><p>Send this page to a business owner and ask which level they want to start with. Then customize the site around their brand, services, and features.</p><div className="contact-actions"><a className="btn primary" href="mailto:rcolton640@gmail.com"><Mail size={18}/> Email Me</a><a className="btn secondary" href="#templates">Compare Packages</a></div></div>
        <form className="lead-form" onSubmit={(e)=>{e.preventDefault(); const d=new FormData(e.currentTarget); const subject=encodeURIComponent("Website project request"); const body=encodeURIComponent(`Name: ${d.get("name")}\\nBusiness: ${d.get("business")}\\nPackage: ${d.get("package")}\\nMessage: ${d.get("message")}`); window.location.href=`mailto:rcolton640@gmail.com?subject=${subject}&body=${body}`;}}>
          <label>Name<input name="name" required placeholder="Your name"/></label>
          <label>Business<input name="business" required placeholder="Business name"/></label>
          <label>Package interest<select name="package" defaultValue="Intermediate"><option>Beginner</option><option>Intermediate</option><option>Pro</option><option>Not sure yet</option></select></label>
          <label>What do you need?<textarea name="message" rows="4" placeholder="Tell me what the website should do..."/></label>
          <button type="submit">Send Request <ArrowRight size={17}/></button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="footer"><a className="brand" href="#top"><span className="brand-mark"><Code2 size={20}/></span><span><strong>LaunchLine</strong><small>Websites</small></span></a><p>Beginner, Intermediate, and Pro websites for small businesses.</p></footer>;
}

createRoot(document.getElementById("root")).render(<App />);
