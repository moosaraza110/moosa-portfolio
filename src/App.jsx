import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";

// ─── ICONS (inline SVG to avoid react-icons dependency issues) ───────────────
const Icons = {
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
    </svg>
  ),
  Location: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  ExternalLink: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/>
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <polyline points="6,9 12,15 18,9"/>
    </svg>
  ),
};

// ─── SCROLL REVEAL HOOK ──────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px", amount: threshold });
  return [ref, inView];
}

// ─── FADE IN VARIANTS ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({ opacity: 1, transition: { duration: 0.55, delay: i * 0.08 } }),
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
const navItems = ["Home", "About", "Education", "Skills", "Projects", "Contact"];

function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems.map(n => document.getElementById(n.toLowerCase()));
      const idx = sections.reduce((acc, s, i) => {
        if (s && window.scrollY >= s.offsetTop - 120) return i;
        return acc;
      }, 0);
      setActive(navItems[idx]);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-2xl" : ""}`}
      style={{
        background: scrolled
          ? "rgba(5, 10, 30, 0.97)"
          : "rgba(5, 10, 30, 0.85)",
        backdropFilter: "blur(18px)",
        borderBottom: scrolled ? "1px solid rgba(99,102,241,0.18)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm text-white"
              style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
              MR
            </div>
            <span className="font-bold text-white text-sm hidden sm:block tracking-wide">Moosa Raza</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md group"
                style={{ color: active === item ? "#facc15" : "rgba(203,213,225,0.85)" }}
              >
                {item}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${active === item ? "w-full" : "w-0 group-hover:w-3/4"}`}
                  style={{ background: active === item ? "#facc15" : "#6366f1" }} />
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", boxShadow: "0 0 16px rgba(99,102,241,0.35)" }}>
              Hire Me
            </button>
          </div>

          {/* Mobile menu btn */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-slate-300 hover:text-white p-1">
            {menuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(5,10,30,0.98)", borderTop: "1px solid rgba(99,102,241,0.2)" }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                  className="py-2.5 px-3 text-sm font-medium text-left rounded-md transition-colors"
                  style={{ color: active === item ? "#facc15" : "rgba(203,213,225,0.85)", background: active === item ? "rgba(99,102,241,0.1)" : "transparent" }}>
                  {item}
                </button>
              ))}
              <button onClick={() => scrollTo("contact")}
                className="mt-2 py-2.5 px-3 rounded-lg text-sm font-semibold text-white text-center"
                style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #020818 0%, #050a1e 50%, #080520 100%)" }}>
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 -right-24 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }} />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-16 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border"
              style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for New Projects
            </motion.div>

            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}>
              <span className="text-white">Muhammad</span><br />
              <span style={{ background: "linear-gradient(90deg, #6366f1, #a855f7, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Moosa Raza
              </span><br />
              <span className="text-white">Zaidi</span>
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-xl sm:text-2xl font-bold mb-3"
              style={{ color: "#facc15" }}>
              Helping Businesses Build, Automate &amp; Grow Online
            </motion.p>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="text-base text-slate-400 mb-3 font-medium tracking-widest uppercase text-sm">
              Websites • Ecommerce Stores • Shopify • Automations • Digital Marketing
            </motion.p>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base">
              I help businesses create modern websites, ecommerce stores, Shopify solutions, workflow automations, and digital marketing systems that improve online presence, save time, and generate more leads.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}>
                Get a Free Consultation
              </button>
              <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 rounded-xl font-bold text-sm text-white border transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                style={{ borderColor: "rgba(99,102,241,0.5)", background: "rgba(99,102,241,0.08)", boxShadow: "0 0 18px rgba(99,102,241,0.1)" }}>
                View My Work
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6}
              className="flex gap-8 mt-10 justify-center lg:justify-start">
              {[["10+", "Projects Done"], ["3+", "Years Learning"], ["100%", "Client Focus"]].map(([n, l]) => (
                <div key={l} className="text-center lg:text-left">
                  <div className="text-xl font-black" style={{ color: "#a5b4fc" }}>{n}</div>
                  <div className="text-xs text-slate-500 font-medium">{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div initial={{ opacity: 0, scale: 0.8, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="flex-shrink-0 relative">
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full blur-2xl opacity-40 scale-110"
                style={{ background: "radial-gradient(circle, #6366f1 0%, #a855f7 50%, transparent 80%)" }} />
              {/* Decorative ring */}
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full relative"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3))", padding: "3px" }}>
                <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #0d1340, #140b2e)" }}>
                  {/* Placeholder — replace src with actual photo path */}
                  <img src="/moosa-profile.jpg" alt="Muhammad Moosa Raza Zaidi"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                  <div className="w-full h-full rounded-full hidden flex-col items-center justify-center text-center p-6"
                    style={{ background: "linear-gradient(135deg, #0d1340, #140b2e)" }}>
                    <div className="text-6xl font-black" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>MR</div>
                    <div className="text-xs text-slate-500 mt-1">Add your photo</div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 top-1/4 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-xl"
                style={{ background: "rgba(15,20,50,0.9)", border: "1px solid rgba(99,102,241,0.4)", backdropFilter: "blur(10px)" }}>
                🚀 Web Dev
              </motion.div>
              <motion.div animate={{ x: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-4 bottom-1/4 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-xl"
                style={{ background: "rgba(15,20,50,0.9)", border: "1px solid rgba(168,85,247,0.4)", backdropFilter: "blur(10px)" }}>
                ⚡ Automation
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs">
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <Icons.ChevronDown />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
function Section({ id, children, className = "", style = {} }) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`} style={style}>
      {children}
    </section>
  );
}

function SectionHeader({ badge, title, highlight, subtitle }) {
  const [ref, inView] = useScrollReveal();
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
      className="text-center mb-14">
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border"
          style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.25)", color: "#a5b4fc" }}>
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
        {title} {highlight && <span style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{highlight}</span>}
      </h2>
      {subtitle && <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">{subtitle}</p>}
      <div className="mt-4 mx-auto w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)" }} />
    </motion.div>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useScrollReveal();
  const details = [
    { icon: <Icons.Mail />, label: "Email", value: "moosaraza.dev@gmail.com" },
    { icon: <Icons.Location />, label: "Location", value: "Karachi, Pakistan" },
    { icon: <Icons.Phone />, label: "Contact", value: "+92 330 3904588" },
    { icon: <Icons.Code />, label: "Education", value: "BS Software Engineering" },
  ];
  return (
    <Section id="about" style={{ background: "linear-gradient(180deg, #020818 0%, #030d25 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Who I Am" title="About" highlight="Me" />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: visual */}
          <motion.div ref={ref} initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-start">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              <div className="absolute inset-0 rounded-2xl opacity-30 blur-xl"
                style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }} />
              <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0d1340, #140b2e)", border: "1px solid rgba(99,102,241,0.25)" }}>
                <img src="/moosa-profile.jpg" alt="Muhammad Moosa Raza Zaidi"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                <div className="w-full h-full hidden flex-col items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #0d1340, #140b2e)" }}>
                  <div className="text-7xl font-black" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>MR</div>
                  <div className="text-xs text-slate-500 mt-2">Muhammad Moosa Raza</div>
                </div>
              </div>
              {/* Decorative corner accent */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl opacity-60"
                style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", zIndex: -1 }} />
            </div>
          </motion.div>

          {/* Right: text + details */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <h3 className="text-2xl font-black text-white mb-4">
              Software Engineer &amp; <span style={{ color: "#a5b4fc" }}>Web Developer</span>
            </h3>
            <p className="text-slate-400 leading-relaxed mb-3 text-sm sm:text-base">
              I am Muhammad Moosa Raza Zaidi, a Software Engineer and Web Developer based in Karachi, Pakistan. I create professional websites, ecommerce stores, automation systems, and digital marketing solutions for businesses.
            </p>
            <p className="text-slate-400 leading-relaxed mb-7 text-sm sm:text-base">
              I focus on building clean, responsive, user-friendly, and business-focused digital solutions that help clients grow online and manage their work more efficiently.
            </p>
            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
              {details.map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)" }}>
                  <span className="text-indigo-400">{icon}</span>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">{label}</div>
                    <div className="text-xs sm:text-sm text-slate-300 font-semibold">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="/Moosa_Raza_CV.pdf.pdf" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", boxShadow: "0 0 24px rgba(99,102,241,0.35)" }}>
              <Icons.ExternalLink /> View Resume
            </a>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ─── EDUCATION ────────────────────────────────────────────────────────────────
function Education() {
  const edu = [
    { school: "Al Hadi Academy", degree: "Matriculation, Science", period: "Aug 2011 – Jul 2021", icon: "🏫", color: "#3b82f6" },
    { school: "DJ Sindh Government Science College", degree: "Engineering", period: "Jul 2021 – Oct 2023", icon: "🏛️", color: "#a855f7" },
    { school: "Sir Syed University of Engineering & Technology", degree: "Bachelor's Degree, Software Engineering", period: "Oct 2023 – Nov 2027", icon: "🎓", color: "#6366f1" },
  ];
  return (
    <Section id="education" style={{ background: "linear-gradient(180deg, #030d25 0%, #020818 100%)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Academic Background" title="My" highlight="Education" />
        <div className="relative">
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 opacity-30"
            style={{ background: "linear-gradient(180deg, #6366f1, #a855f7, #3b82f6)" }} />
          <div className="space-y-8">
            {edu.map((e, i) => {
              const [ref, inView] = useScrollReveal();
              return (
                <motion.div key={e.school} ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i}
                  className="flex gap-6 sm:gap-8">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl z-10 relative"
                    style={{ background: `linear-gradient(135deg, ${e.color}22, ${e.color}44)`, border: `1px solid ${e.color}55` }}>
                    {e.icon}
                  </div>
                  <div className="flex-1 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.15)", backdropFilter: "blur(10px)" }}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-white">{e.school}</h3>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0"
                        style={{ background: `${e.color}18`, color: e.color, border: `1px solid ${e.color}33` }}>
                        {e.period}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 font-medium">{e.degree}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────
function Skills() {
  const categories = [
    { title: "Web Development", icon: "🌐", color: "#3b82f6",
      skills: ["Business Websites", "Landing Pages", "Portfolio Websites", "WordPress Development", "Responsive Design", "Website Maintenance"] },
    { title: "Ecommerce", icon: "🛒", color: "#a855f7",
      skills: ["Shopify Store Creation", "Ecommerce Store Setup", "Product Uploading", "Store Customization", "Conversion Optimization"] },
    { title: "Automation", icon: "⚡", color: "#6366f1",
      skills: ["N8N Automations", "AI Automations", "Workflow Automation", "Lead Automation", "CRM Integration"] },
    { title: "Digital Marketing", icon: "📈", color: "#ec4899",
      skills: ["Social Media Marketing", "Facebook Ads", "Instagram Ads", "Google Ads", "Lead Generation", "Content Strategy"] },
    { title: "Technical Skills", icon: "💻", color: "#10b981",
      skills: ["Python", "Java OOP", "SQL", "Power BI", "WordPress", "Shopify"] },
  ];
  return (
    <Section id="skills" style={{ background: "linear-gradient(180deg, #020818 0%, #030d25 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="What I Know" title="My" highlight="Skills" subtitle="A broad range of skills to help your business succeed online." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const [ref, inView] = useScrollReveal();
            return (
              <motion.div key={cat.title} ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i % 3}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 rounded-2xl group transition-all duration-300 cursor-default"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${cat.color}22`, backdropFilter: "blur(10px)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}33` }}>
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-white text-base">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-lg text-xs font-semibold transition-colors duration-200"
                      style={{ background: `${cat.color}10`, color: cat.color, border: `1px solid ${cat.color}25` }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    { icon: "🌐", title: "Professional Website Development", desc: "Modern, fast, and responsive websites that represent your brand and convert visitors." },
    { icon: "🛍️", title: "Shopify Store Setup", desc: "Complete Shopify store creation, theme customization, and product setup." },
    { icon: "🛒", title: "Ecommerce Store Creation", desc: "Full-featured online stores with seamless payment and product management." },
    { icon: "⚡", title: "N8N Workflow Automation", desc: "Automate repetitive tasks and connect your tools with powerful N8N workflows." },
    { icon: "🤖", title: "AI Business Automation", desc: "Integrate AI-powered systems to save time and scale your business operations." },
    { icon: "📱", title: "Social Media Marketing", desc: "Strategic content and campaigns to grow your audience and brand." },
    { icon: "📊", title: "Paid Ads Campaigns", desc: "Facebook, Instagram, and Google Ads designed to maximize your ROI." },
    { icon: "🎯", title: "Lead Generation Systems", desc: "Automated pipelines to capture, qualify, and nurture business leads." },
    { icon: "🔧", title: "Website Support & Maintenance", desc: "Ongoing updates, security, and performance optimization for your site." },
  ];
  return (
    <Section id="services" style={{ background: "linear-gradient(180deg, #030d25 0%, #020818 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="What I Offer" title="How I Can Help Your" highlight="Business" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const [ref, inView] = useScrollReveal();
            return (
              <motion.div key={s.title} ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i % 3}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(99,102,241,0.15)" }}
                className="p-5 rounded-2xl transition-all duration-300 group"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.12)", backdropFilter: "blur(10px)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}>
                  {s.icon}
                </div>
                <h3 className="font-bold text-white text-sm mb-2 group-hover:text-indigo-300 transition-colors">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const projects = [
    {
      title: "N8N AI Lead Generation Workflow",
      desc: "I built an AI-based system that handles lead generation and email outreach from start to finish, including data cleaning, AI message generation, email sending, follow-ups, reply tracking, and Google Sheets logging.",
      category: "Automation",
      img: "/project-n8n.png",
      live: "#",
    },
    {
      title: "Tuksy Automotive Web Portal",
      desc: "A car garage website and web portal for car listings, servicing, repairs, diagnostics, and customer inquiries in Newport.",
      category: "Website Development",
      img: "/project-tuksy.png",
      live: "https://tuksyautocentre.com/",
    },
    {
      title: "Reckons Marketing Website",
      desc: "A professional digital marketing website created to showcase services, build brand trust, and generate client leads online.",
      category: "Digital Marketing",
      img: "/project-reckons.png",
      live: "https://reckonsmarketing.com/",
    },
    {
      title: "Mecimart Mobile Accessories Store",
      desc: "An ecommerce store for mobile accessories, screen protectors, phone cases, replacement parts, and mobile repair services.",
      category: "Ecommerce",
      img: "/project-mecimart.png",
      live: "https://mecimart.se/",
    },
    {
      title: "Facebook Ads Performance Campaign",
      desc: "Managed paid social media campaigns with strong reach and engagement results, including thousands of views and improved audience growth.",
      category: "Digital Marketing",
      img: "/project-ads.png",
      live: "#",
    },
  ];

  const colors = {
    "Website Development": "#3b82f6",
    "Shopify Store": "#a855f7",
    Ecommerce: "#ec4899",
    Automation: "#6366f1",
    "Digital Marketing": "#10b981",
  };

  return (
    <Section id="projects" style={{ background: "linear-gradient(180deg, #020818 0%, #030d25 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="My Work"
          title="Recent"
          highlight="Projects"
          subtitle="A selection of real websites, ecommerce stores, automation workflows, and marketing results."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => {
            const [ref, inView] = useScrollReveal();
            const color = colors[p.category] || "#6366f1";
            return (
              <motion.div
                key={p.title}
                ref={ref}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i % 3}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-2xl overflow-hidden transition-all duration-300 group"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.12)" }}
              >
                
                  <div className="relative h-72 overflow-hidden bg-slate-900">
                  {p.img
                    ? (
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-40">
                      <div className="text-4xl">🖼️</div>
                      <div className="text-xs text-slate-500">Project Screenshot</div>
                    </div>
                  )}

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
                    style={{ background: "rgba(5,10,30,0.85)", backdropFilter: "blur(4px)" }}
                  >
                    {p.live && p.live !== "#" ? (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:scale-105"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
                      >
                        <Icons.ExternalLink /> Live Preview
                      </a>
                    ) : (
                      <span
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
                      >
                        <Icons.ExternalLink /> Case Study
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-bold mb-3 inline-block"
                    style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
                  >
                    {p.category}
                  </span>
                  <h3 className="font-bold text-white text-sm mb-2 group-hover:text-indigo-300 transition-colors">{p.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", service: "", details: "" });
  const [sent, setSent] = useState(false);
  const services = ["Website Development", "Shopify Store Setup", "Ecommerce Store", "N8N Automation", "AI Automation", "Social Media Marketing", "Paid Ads Campaign", "Lead Generation", "Website Maintenance", "Other"];
  const [ref, inView] = useScrollReveal();

  const handleSubmit = () => {
    // In production, connect to a form service (Formspree, EmailJS, etc.)
    if (form.name && form.email) setSent(true);
  };

  return (
    <Section id="contact" style={{ background: "linear-gradient(180deg, #030d25 0%, #020818 100%)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Work With Me" title="Let's Discuss Your" highlight="Project" subtitle="Need a website, ecommerce store, automation system, or digital marketing support? Send your project details and I will get back to you." />
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left info */}
          <motion.div ref={ref} initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }} className="lg:col-span-2 space-y-5">
            {[
              { icon: <Icons.Mail />, label: "Email", value: "moosaraza.dev@gmail.com", href: "mailto:moosaraza.dev@gmail.com" },
              { icon: <Icons.Phone />, label: "Phone", value: "+92 330 3904588", href: "tel:+923303904588" },
              { icon: <Icons.LinkedIn />, label: "LinkedIn", value: "Muhammad Moosa Raza", href: "https://www.linkedin.com/in/muhammad-moosa-raza" },
            ].map(({ icon, label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] group"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-indigo-400"
                  style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}>
                  {icon}
                </div>
                <div>
                  <div className="text-xs text-slate-500">{label}</div>
                  <div className="text-sm font-semibold text-slate-300 group-hover:text-indigo-300 transition-colors">{value}</div>
                </div>
              </a>
            ))}
            <div className="p-5 rounded-2xl mt-4" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
              <p className="text-xs text-slate-400 leading-relaxed">
                📅 I typically respond within <strong className="text-indigo-400">24 hours</strong>. Let's discuss your project and find the best solution for your business.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }} className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.15)" }}>
              {sent ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400 text-sm">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-5 px-5 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: "name", placeholder: "Full Name *", type: "text" },
                      { key: "business", placeholder: "Business Name", type: "text" },
                    ].map(({ key, placeholder, type }) => (
                      <input key={key} type={type} placeholder={placeholder}
                        value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-indigo-500"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(99,102,241,0.18)" }} />
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="email" placeholder="Email Address *"
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-indigo-500"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(99,102,241,0.18)" }} />
                    <input type="tel" placeholder="Phone Number"
                      value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-indigo-500"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(99,102,241,0.18)" }} />
                  </div>
                  <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-1 focus:ring-indigo-500"
                    style={{ background: "rgba(10,15,40,0.95)", border: "1px solid rgba(99,102,241,0.18)", color: form.service ? "white" : "#64748b" }}>
                    <option value="" disabled>Service Required</option>
                    {services.map(s => <option key={s} value={s} style={{ background: "#0a0f28" }}>{s}</option>)}
                  </select>
                  <textarea placeholder="Project Details — tell me about your project, goals, and timeline"
                    rows={4} value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-indigo-500 resize-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(99,102,241,0.18)" }} />
                  <button onClick={handleSubmit}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", boxShadow: "0 0 30px rgba(99,102,241,0.35)" }}>
                    Get My Free Quote ✨
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ background: "#020818", borderTop: "1px solid rgba(99,102,241,0.15)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm text-white"
                style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>MR</div>
              <span className="font-bold text-white">Moosa Raza Zaidi</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">Web Developer • Ecommerce • Automation • Digital Marketing</p>
            <div className="flex gap-3">
              {[
                { icon: <Icons.LinkedIn />, href: "https://www.linkedin.com/in/muhammad-moosa-raza" },
                { icon: <Icons.GitHub />, href: "https://github.com/moosaraza110" },
                { icon: <Icons.Facebook />, href: "https://www.facebook.com/moosa.raza.740615" },
                { icon: <Icons.Instagram />, href: "https://www.instagram.com/moosa_raza.110/" },
              ].map(({ icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
            <div className="space-y-2">
              {navItems.map(item => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                  className="block text-slate-500 hover:text-indigo-400 text-sm transition-colors duration-200 text-left">
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Get In Touch</h4>
            <div className="space-y-2 text-sm text-slate-500">
              <p>moosaraza.dev@gmail.com</p>
              <p>+92 330 3904588</p>
              <p>Karachi, Pakistan</p>
            </div>
            <button onClick={() => scrollTo("contact")}
              className="mt-4 px-5 py-2 rounded-lg text-xs font-bold text-white transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
              Start a Project
            </button>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2" style={{ borderTop: "1px solid rgba(99,102,241,0.1)" }}>
          <p className="text-slate-600 text-xs">© 2025 Muhammad Moosa Raza Zaidi. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: "'Outfit', 'DM Sans', sans-serif", overflowX: "hidden" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020818; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#6366f1, #a855f7); border-radius: 2px; }
        ::selection { background: rgba(99,102,241,0.3); }
      `}</style>
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}