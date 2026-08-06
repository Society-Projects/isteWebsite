import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
// 🖼️ LOCAL PHOTO ASSETS INTEGRATION
const teamPhoto = "/team.jpg";
const orientationPhoto = "/orientation.JPG";

// 🛠️ INTERNAL CLASSNAMES JOINER
const cn = (...classes) => classes.filter(Boolean).join(" ");

// 📝 DATA LAYER
const defaultSections = [
  {
    id: "hero",
    title: "ISTE",
    subtitle: "Thapar Chapter",
    description: "We are a dynamic community dedicated to fostering technical prowess, hosting rigorous algorithmic challenges, and building a bridge between academic learning and software innovation.",
    align: "left",
    actions: [
      { label: "Begin Journey", variant: "primary", href: "/#about" },
      { label: "Our Team", variant: "secondary", href: "/team" },
    ]
  },
  {
    id: "about",
    badge: "About Us",
    title: "About Us",
    description: "A vibrant student chapter dedicated to fostering innovation, collaboration, and technical excellence. Our mission is to empower students through workshops, events, and hands-on projects, building a strong community of future leaders in technology.",
    align: "center",
    isAboutSection: true,
    highlights: [
      { title: "💡 INNOVATION HUB" },
      { title: "</> HANDS ON CODING" },
      { title: "👥 COMMUNITY DRIVEN" }
    ],
    actions: [
      { label: "Meet Our Team", variant: "primary", href: "/team" }
    ]
  },
  {
    id: "events",
    badge: "Events",
    title: "Upcoming Events",
    description: "Join our exciting events designed to enhance your technical skills, expand your network, and provide hands-on experience with the latest technologies.",
    align: "center",
    isEventsSection: true,
    eventsList: [
      {
        title: "ORIENTATION 2026",
        description: "Welcome to the ISTE Community!\nThe orientation welcomed our new members into the ISTE family, introducing them to our vision, initiatives, and exciting projects. Together, we look forward to fostering innovation, collaboration, and growth as we shape the future of technology."
      }
    ],
    actions: [
      { label: "View All Events", variant: "primary", href: "/events" }
    ]
  },
  {
    id: "projects",
    badge: "Projects",
    title: "Our Innovations &",
    subtitle: "Repositories",
    description: "Explore the wide spectrum of robust web platforms built natively by our core development teams.",
    align: "center",
    isGrid: true,
    features: [
      { title: "Fairfare", tag: "WEB PLATFORM", description: "Fair-fare is a web platform that lets users compare real-time taxi fares across different apps." },
      { title: "Time Capsule", tag: "UTILITY APP", description: "Write messages to yourself or friends that only become viewable after X days." },
      { title: "Society Sphere", tag: "MANAGEMENT PORTAL", description: "Streamlined web platform built to empower student societies by simplifying event workflows." },
      { title: "FinTech", tag: "FINANCE SYSTEM", description: "Track spending, income, and expenses; monitor investments with personalized advice." }
    ]
  }
];

export default function HomeGauri({ sections = defaultSections, className }) {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});

  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const animationFrameId = useRef(null);

  // 🌊 BUTTERY SMOOTH SCROLLING — native smooth scroll for anchor jumps
  useEffect(() => {
    const prevBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prevBehavior;
    };
  }, []);

  // ✨ SCROLL-REVEAL — sections gently fade + rise into view as you scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.dataset.sectionId]: true }));
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const updateScrollPosition = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
    setScrollProgress(progress);

    const viewportCenter = window.innerHeight / 2;
    let newActiveSection = 0;
    let minDistance = Infinity;

    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          newActiveSection = index;
        }
      }
    });
    setActiveSection(newActiveSection);
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

  return (
    /* 🌌 MAIN BACKGROUND: Pure Pitch Black */
    <div
      ref={containerRef}
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
      className={cn("relative w-full overflow-x-hidden min-h-screen bg-transparent text-gray-200 antialiased selection:bg-[#00F0FF]/20", className)}
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-[15%] left-[5%] w-[30rem] h-[30rem] bg-[#0B3D91]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[60%] right-[5%] w-[35rem] h-[35rem] bg-[#00F0FF]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* 🧭 TOP PROGRESS LINE (#00F0FF Glow Accent) */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-black/40 z-50">
        <div
          className="h-full bg-[#00F0FF] shadow-[0_0_12px_#00F0FF]"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: 'left center',
            transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        />
      </div>

      {/* ================= SECTIONS CANVAS ================= */}
      <div className="relative z-10 w-full">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            data-section-id={section.id}
            ref={(el) => { sectionRefs.current[index] = el; }}
            className={cn(
              "min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-32 pt-24 pb-20 border-b border-white/5 scroll-mt-16",
              "transition-all duration-1000 ease-out",
              visibleSections[section.id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              section.align === 'center' ? "items-center text-center" : "items-start text-left md:pl-28"
            )}
          >
            <div className={cn("w-full space-y-8", section.id === "hero" ? "max-w-6xl" : (section.align === 'center' ? "max-w-4xl mx-auto" : "max-w-4xl"))}>

              {/* HERO SPECIFIC CUSTOM LAYOUT */}
              {section.id === "hero" ? (
                <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
                  {/* Left Column: Indian Society for Technical Education */}
                  <div className="flex-1 flex flex-col items-start select-none w-full">
                    <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.4rem] font-extrabold tracking-tight leading-[1.02] text-white uppercase flex flex-col">
                      <span className="text-white">Indian</span>
                      <span className="text-[#00F0FF]">Society for</span>
                      <span className="text-white">Technical</span>
                      <span className="text-[#00F0FF]">Education</span>
                    </h1>

                    {/* ✍️ THAPAR CHAPTER Tag */}
                    <div className="flex justify-start mt-4 pl-1">
                      <span
                        className="block font-display font-bold text-lg sm:text-2xl text-[#00F0FF] tracking-[0.15em] uppercase drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                      >
                        THAPAR CHAPTER
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Welcome Batch, Description, Actions */}
                  <div className="flex-1 flex flex-col items-start space-y-6 text-left select-none w-full lg:pt-4">
                    <div className="pt-2">
                      <h2 className="font-display text-lg sm:text-2xl font-bold tracking-[0.12em] uppercase text-[#00F0FF]">
                        WELCOME BATCH OF 2030
                      </h2>
                    </div>

                    <p className="text-slate-300 font-normal leading-relaxed text-base md:text-lg tracking-normal max-w-xl">
                      {section.description}
                    </p>

                    {/* Actions / Buttons */}
                    {section.actions && (
                      <div className="flex flex-wrap gap-4 pt-2">
                        {section.actions.map((act) => (
                          act.href ? (
                            act.href.startsWith("http") || act.href.includes("#") ? (
                              <a key={act.label} href={act.href} className="btn-primary-glow inline-block">
                                {act.label}
                              </a>
                            ) : (
                              <Link key={act.label} to={act.href} className="btn-primary-glow inline-block">
                                {act.label}
                              </Link>
                            )
                          ) : (
                            <button key={act.label} className="btn-primary-glow">
                              {act.label}
                            </button>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>

                  {section.subtitle && (
                    <h2 className="page-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white uppercase">
                      <span className="block mb-1">{section.title}</span>
                      <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-[#00B4D8] to-[#0B3D91]">
                        {section.subtitle}
                      </span>
                    </h2>
                  )}
                  {!section.subtitle && (
                    <div className={cn("w-full space-y-3", section.align === 'center' ? "flex flex-col items-center" : "")}>
                      <h2 className="page-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
                        {section.title}
                      </h2>
                      <div className={cn("h-[3px] bg-gradient-to-r from-[#00F0FF] via-[#00B4D8] to-[#0B3D91] rounded-full", section.align === 'center' ? "w-20 mx-auto" : "w-16")} />
                    </div>
                  )}
                </>
              )}

              {/* ABOUT SECTION PHOTOGRAPHY */}
              {section.id !== "hero" && section.isAboutSection && (
                <div className="w-full max-w-lg mx-auto rounded-2xl overflow-hidden border border-[#00F0FF]/20 bg-[#0D1524] p-1.5 shadow-2xl my-6">
                  <img loading="lazy" src={teamPhoto} alt="Core Team" className="w-full h-auto rounded-xl object-cover max-h-[220px]" />
                </div>
              )}

              {section.id !== "hero" && (
                <p className={cn("text-slate-300 font-normal leading-relaxed text-base md:text-lg tracking-normal", section.align === 'center' ? "max-w-2xl mx-auto" : "max-w-2xl")}>
                  {section.description}
                </p>
              )}

              {/* EVENTS SECTION LAYOUT */}
              {section.isEventsSection && section.eventsList && (
                <div className="w-full max-w-3xl mx-auto bg-gradient-to-tr from-[#041C4A] via-[#00B4D8] to-[#0B3D91] p-[1.5px] rounded-2xl shadow-2xl mt-10 transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,240,255,0.18)] group">
                  <div className="w-full bg-[#0D1524] rounded-[15px] p-6 md:p-8 flex flex-col items-center justify-center gap-6 text-center">
                    <div className="w-full max-w-sm aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-slate-950">
                      <img loading="lazy" src={orientationPhoto} alt="Orientation session" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                    </div>
                    <div className="w-full space-y-3">
                      <span className="font-display inline-block px-3 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[#02040A] text-[#00F0FF] border border-[#00F0FF]/30 rounded-full">Featured Milestone</span>
                      <h3 className="font-display text-xl font-bold tracking-wide text-white uppercase">{section.eventsList[0].title}</h3>
                      <p className="text-slate-300 font-normal text-sm md:text-base leading-relaxed tracking-normal">{section.eventsList[0].description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* DYNAMIC METRICS HOVER CLIPS */}
              {section.highlights && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl pt-2 mx-auto">
                  {section.highlights.map((high) => (
                    <div key={high.title} className="p-4 rounded-xl bg-[#0D1524] backdrop-blur-sm text-center flex items-center justify-center gap-3 shadow-md border border-[#00F0FF]/15 hover:border-[#00F0FF]/40 transition-all duration-300">
                      <span className="text-[#00F0FF] text-sm">{high.title.includes("CODING") ? "</>" : (high.title.includes("HUB") ? "💡" : "👥")}</span>
                      <span className="font-display text-slate-200 font-bold text-xs tracking-widest uppercase">{high.title.replace("💡 ", "").replace("</> ", "").replace("👥 ", "")}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* PROJECTS GRID SYSTEM */}
              {section.features && !section.isEventsSection && (
                <div className={cn("grid gap-5 pt-2 w-full", section.isGrid ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1")}>
                  {section.features.map((feat) => (
                    <div key={feat.title} className="p-[1.5px] rounded-2xl bg-gradient-to-b from-[#0B3D91] via-[#00B4D8] to-[#041C4A] shadow-xl group transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.18)]">
                      <div className="p-6 md:p-8 rounded-[14px] bg-[#0D1524] relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[190px]">
                        {feat.tag && <span className="font-display text-[9px] font-bold text-[#00F0FF] tracking-[0.2em] uppercase mb-2 block">{feat.tag}</span>}
                        <h3 className="font-display text-lg font-bold tracking-wide text-white group-hover:text-[#00F0FF] transition-colors mb-2.5 uppercase">{feat.title}</h3>
                        <p className="text-slate-300 font-normal text-sm leading-relaxed tracking-normal">{feat.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* GENERIC TRIGGER BUTTONS */}
              {section.id !== "hero" && section.actions && (
                <div className={cn("flex flex-wrap gap-4 pt-4 w-full", section.align === 'center' ? "justify-center" : "justify-start")}>
                  {section.actions.map((act) => {
                    return act.href ? (
                      act.href.startsWith("http") || act.href.includes("#") ? (
                        <a key={act.label} href={act.href} className="btn-primary-glow inline-block">
                          {act.label}
                        </a>
                      ) : (
                        <Link key={act.label} to={act.href} className="btn-primary-glow inline-block">
                          {act.label}
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
