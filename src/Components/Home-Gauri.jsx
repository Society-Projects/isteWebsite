import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Code, Users, Lightbulb, Cpu, ShieldCheck, Palette, Layers, Award, CheckCircle2 } from "lucide-react";

import SEO from "./SEO/SEO";

// 🖼️ LOCAL PHOTO ASSETS INTEGRATION
import teamPhoto from "../assets/team.jpg";
import orientationPhoto from "../assets/orientation.JPG";

// 🛠️ INTERNAL CLASSNAMES JOINER
const cn = (...classes) => classes.filter(Boolean).join(" ");

import { Gamepad2 } from "lucide-react";

const DOMAINS = [
  {
    title: "Software Engineering & Web Dev",
    icon: Code,
    desc: "Architecting modern full-stack web applications, REST/GraphQL APIs, and open-source tools.",
    badge: "Technical Core"
  },
  {
    title: "Artificial Intelligence & ML",
    icon: Cpu,
    desc: "Exploring neural networks, natural language models, and data-driven intelligent algorithms.",
    badge: "Research & ML"
  },
  {
    title: "Game Dev & Interactive Media",
    icon: Gamepad2,
    desc: "Building immersive 3D games, real-time physics engines, interactive graphics, and multi-platform experiences.",
    badge: "Game Dev"
  },
  {
    title: "Design & Media Aesthetics",
    icon: Palette,
    desc: "Crafting intuitive visual systems, brand identities, motion graphics, and UI/UX design components.",
    badge: "Creative"
  }
];

const STATS = [
  { value: "150+", label: "Active Members", desc: "Engineers across batch cohorts" },
  { value: "15+", label: "Core Repositories", desc: "Production-ready open source projects" },
  { value: "100%", label: "Student Driven", desc: "Built & managed natively by students" }
];

// 📝 DATA LAYER
const defaultSections = [
  {
    id: "hero",
    title: "ISTE",
    subtitle: "Thapar Chapter",
    description: "A premier student-led technical society committed to fostering software engineering excellence, technical innovation, algorithmic problem-solving, and leadership at Thapar Institute.",
    align: "left",
    actions: [
      { label: "Explore About Us", variant: "primary", href: "/#about" },
      { label: "Meet Our Team", variant: "secondary", href: "/team" },
    ]
  },
  {
    id: "about",
    badge: "Who We Are",
    title: "INNOVATING AT THE INTERSECTION OF TECHNOLOGY & LEADERSHIP",
    description: "Indian Society for Technical Education (ISTE) Thapar Chapter empowers students through hands-on technical workshops, national hackathons, developer mentorship, and industry-grade engineering projects.",
    align: "center",
    isAboutSection: true,
    highlights: [
      { title: "INNOVATION HUB", icon: Lightbulb },
      { title: "HANDS ON CODING", icon: Code },
      { title: "COMMUNITY DRIVEN", icon: Users }
    ],
    actions: [
      { label: "Meet Our Team", variant: "primary", href: "/team" }
    ]
  },
  {
    id: "events",
    badge: "Flagship Events",
    title: "UPCOMING & PAST KEY MILESTONES",
    description: "Join our signature hackathons, orientation sessions, and expert-led tech bootcamps built to accelerate your engineering career.",
    align: "center",
    isEventsSection: true,
    eventsList: [
      {
        title: "ORIENTATION 2026",
        badge: "Featured Event",
        description: " Welcoming our newest cohort into the ISTE family. Introducing students to our engineering verticals, open-source projects, and collaborative technical community."
      }
    ],
    actions: [
      { label: "View All Events", variant: "primary", href: "/events" }
    ]
  },
  {
    id: "projects",
    badge: "Our Ecosystem",
    title: "INNOVATIONS & DEVELOPER REPOSITORIES",
    description: "Discover robust web platforms, financial tools, and campus management utilities built by our core technical team.",
    align: "center",
    isGrid: true,
    features: [
      { title: "Society Tracker", tag: "MANAGEMENT PORTAL", description: "Streamlined web platform simplifying event workflows and recruitment pipelines for campus societies." },
      { title: "Fairfare", tag: "WEB PLATFORM", description: "Real-time taxi and ride-hailing fare aggregator enabling instant route fare comparisons." },
      { title: "Time Capsule", tag: "UTILITY APP", description: "Encrypted memory-vault web application locking digital messages until a designated date." },
      { title: "FinTech Dashboard", tag: "FINANCE SYSTEM", description: "Comprehensive personal finance monitor with spending telemetry and portfolio tracking." }
    ]
  }
];

export default function HomeGauri({ sections = defaultSections, className }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef(null);
  const animationFrameId = useRef(null);

  const updateScrollPosition = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        animationFrameId.current = requestAnimationFrame(() => {
          updateScrollPosition();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollPosition();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [updateScrollPosition]);

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ISTE Students' Chapter TIET",
    "alternateName": ["ISTE TIET", "Indian Society for Technical Education Thapar"],
    "url": "https://istetiet.com",
    "logo": "https://istetiet.com/istelogo.png",
    "description": "Official Students' Chapter of Indian Society for Technical Education at Thapar Institute of Engineering and Technology, Patiala.",
    "sameAs": [
      "https://www.instagram.com/iste_tiet/",
      "https://www.linkedin.com/company/iste-tiet/",
      "https://github.com/iste-tiet"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Patiala",
      "addressRegion": "Punjab",
      "postalCode": "147004",
      "addressCountry": "IN"
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-x-hidden min-h-screen bg-transparent text-gray-200 antialiased selection:bg-[#00F0FF]/25", className)}
    >
      <SEO
        title="ISTE TIET - Indian Society for Technical Education | Thapar Chapter"
        description="Official site of ISTE Students' Chapter, Thapar Institute of Engineering & Technology. Fostering technical excellence, software engineering, hackathons, and innovation."
        canonicalPath="/"
        schema={homeSchema}
      />

      {/* 🧭 Smooth Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-900 z-[10000]">
        <div
          className="h-full bg-sky-500"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: 'left center',
            transition: 'transform 0.1s ease-out'
          }}
        />
      </div>

      {/* ================= SECTIONS CANVAS ================= */}
      <div className="relative z-10 w-full">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={cn(
              "min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-28 pt-28 pb-20 border-b border-white/5 scroll-mt-16",
              section.id === "hero"
                ? "items-center lg:items-start text-center lg:text-left"
                : section.align === 'center'
                ? "items-center text-center"
                : "items-start text-left"
            )}
          >
            <div className={cn("w-full space-y-8", section.id === "hero" ? "max-w-6xl mx-auto" : (section.align === 'center' ? "max-w-4xl mx-auto" : "max-w-4xl"))}>

              {/* HERO SPECIFIC CUSTOM LAYOUT */}
              {section.id === "hero" ? (
                <motion.div 
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
                >
                  {/* Left Column: Heading in ALL CAPS */}
                  <div className="flex-1 flex flex-col items-center lg:items-start select-none w-full text-center lg:text-left">
                    <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.8rem] font-black tracking-tight leading-[1.08] text-white uppercase flex flex-col gap-1">
                      <span>INDIAN SOCIETY FOR</span>
                      <span className="text-sky-400">TECHNICAL EDUCATION</span>
                    </h1>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 mt-6 mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      <span className="text-xs font-semibold tracking-wider text-sky-400 uppercase">Thapar Chapter</span>
                    </div>

                    <p className="text-sky-400 font-bold text-sm sm:text-base tracking-[0.2em] uppercase">
                      INNOVATE • BUILD • EXCEL
                    </p>
                  </div>

                  {/* Right Column: Clean Welcome Batch (No Box, Centered) */}
                  <div className="flex-1 flex flex-col items-center text-center w-full">
                    <div className="w-full space-y-6 relative overflow-hidden flex flex-col items-center">
                      <div className="space-y-3 flex flex-col items-center">
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-sky-400 tracking-tight uppercase text-center">
                          WELCOME BATCH OF 2030
                        </h2>
                        <p className="text-slate-300 font-normal leading-relaxed text-sm sm:text-base max-w-xl mx-auto text-center">
                          We are a dynamic community dedicated to fostering technical prowess, hosting rigorous algorithmic challenges, and building a bridge between academic learning and software innovation.
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-4 pt-1">
                        <Link to="/events" className="btn-primary-glow text-xs uppercase tracking-wider font-bold">
                          <span>BEGIN JOURNEY</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link to="/team" className="btn-secondary-glow text-xs uppercase tracking-wider font-bold">
                          <span>OUR TEAM</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 w-full"
                >
                  {section.badge && (
                    <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider text-sky-400 bg-slate-800/80 border border-slate-700 uppercase">
                      {section.badge}
                    </span>
                  )}
                  <h2 className="page-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight uppercase">
                    {section.title}
                  </h2>
                  <div className={cn("h-1 bg-sky-500 rounded-full", section.align === 'center' ? "w-20 mx-auto" : "w-16")} />
                </motion.div>
              )}

              {/* ABOUT SECTION PHOTOGRAPHY */}
              {section.id !== "hero" && section.isAboutSection && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden border border-slate-800 bg-[#0F172A] p-2 shadow-xl my-6"
                >
                  <img src={teamPhoto} alt="Core Team" className="w-full h-auto rounded-xl object-cover max-h-[320px] object-top" />
                </motion.div>
              )}

              {section.id !== "hero" && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className={cn("text-slate-300 font-normal leading-relaxed text-base md:text-lg tracking-normal", section.align === 'center' ? "max-w-2xl mx-auto" : "max-w-2xl")}
                >
                  {section.description}
                </motion.p>
              )}

              {/* 🌟 IMPACT STATS & DOMAIN VERTICALS SHOWCASE */}
              {section.id === "about" && (
                <div className="w-full max-w-5xl mx-auto pt-8 space-y-12">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {STATS.map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, delay: idx * 0.08 }}
                        whileHover={{ y: -3 }}
                        className="p-5 rounded-xl bg-[#0F172A] border border-slate-800 text-center shadow-md hover:border-slate-700 transition-all duration-300"
                      >
                        <span className="font-display text-3xl sm:text-4xl font-extrabold text-sky-400 block">
                          {stat.value}
                        </span>
                        <span className="font-display text-xs font-bold text-white uppercase tracking-wider block mt-1">
                          {stat.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal block mt-0.5">
                          {stat.desc}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Technical Verticals Showcase */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="text-center space-y-2"
                    >
                      <span className="text-[10px] font-bold text-sky-400 tracking-widest uppercase px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700">
                        Our Engineering Verticals
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white uppercase">Areas of Specialized Focus</h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      {DOMAINS.map((domain, idx) => {
                        const Icon = domain.icon;
                        return (
                          <motion.div
                            key={domain.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, delay: idx * 0.08 }}
                            whileHover={{ y: -3 }}
                            className="p-6 rounded-xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-all duration-300 flex items-start gap-4 group cursor-default"
                          >
                            <div className="p-3 rounded-lg bg-slate-800 text-sky-400 shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[9px] font-bold text-sky-400 uppercase tracking-wider block">{domain.badge}</span>
                              <h4 className="font-display text-base font-bold text-white group-hover:text-sky-400 transition-colors">{domain.title}</h4>
                              <p className="text-xs text-slate-300 leading-relaxed font-normal">{domain.desc}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* EVENTS SECTION LAYOUT */}
              {section.isEventsSection && section.eventsList && (
                <motion.div 
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55 }}
                  className="w-full max-w-3xl mx-auto rounded-xl border border-slate-800 bg-[#0F172A] p-6 md:p-8 shadow-xl mt-8"
                >
                  <div className="flex flex-col items-center justify-center gap-6 text-center">
                    <div className="w-full max-w-md aspect-[16/9] rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                      <img src={orientationPhoto} alt="Orientation session" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="w-full space-y-3">
                      <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-widest bg-slate-800 text-sky-400 border border-slate-700 rounded-full">
                        {section.eventsList[0].badge}
                      </span>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-white uppercase">{section.eventsList[0].title}</h3>
                      <p className="text-slate-300 font-normal text-sm md:text-base leading-relaxed">{section.eventsList[0].description}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* DYNAMIC HIGHLIGHTS */}
              {section.highlights && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl pt-4 mx-auto">
                  {section.highlights.map((high, idx) => {
                    const Icon = high.icon || Sparkles;
                    return (
                      <motion.div
                        key={high.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4, delay: idx * 0.08 }}
                        whileHover={{ y: -3 }}
                        className="p-5 rounded-xl bg-[#0F172A] text-center flex items-center justify-center gap-3 shadow-md border border-slate-800 hover:border-slate-700 transition-all duration-300"
                      >
                        <div className="p-2 rounded-lg bg-slate-800 text-sky-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-display text-slate-200 font-bold text-xs tracking-wider uppercase">{high.title}</span>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* PROJECTS GRID SYSTEM */}
              {section.features && !section.isEventsSection && (
                <div className={cn("grid gap-6 pt-4 w-full", section.isGrid ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1")}>
                  {section.features.map((feat, idx) => (
                    <motion.div
                      key={feat.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: idx * 0.1 }}
                      whileHover={{ y: -3 }}
                      className="p-6 md:p-8 rounded-xl bg-[#0F172A] border border-slate-800 shadow-md group transition-all duration-300 hover:border-slate-700 text-left"
                    >
                      <div>
                        {feat.tag && <span className="text-[10px] font-bold text-sky-400 tracking-wider uppercase mb-2 block">{feat.tag}</span>}
                        <h3 className="font-display text-xl font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors mb-2 uppercase">{feat.title}</h3>
                        <p className="text-slate-300 font-normal text-sm leading-relaxed">{feat.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* ACTION BUTTONS */}
              {section.id !== "hero" && section.actions && (
                <div className={cn("flex flex-wrap gap-4 pt-6 w-full", section.align === 'center' ? "justify-center" : "justify-start")}>
                  {section.actions.map((act) => {
                    return act.href ? (
                      act.href.startsWith("http") || act.href.includes("#") ? (
                        <a key={act.label} href={act.href} className="btn-primary-glow">
                          {act.label}
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <Link key={act.label} to={act.href} className="btn-primary-glow">
                          {act.label}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )
                    ) : (
                      <button key={act.label} className="btn-primary-glow">
                        {act.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

