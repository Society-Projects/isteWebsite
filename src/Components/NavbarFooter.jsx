import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import isteLogo from "../assets/iste-logo.png";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./SocialIcons";

// Navbar links (Removed 'About')
const navItems = ["Home", "Events", "Team", "Sponsors", "Projects", "Time Table", "Contact"];

// Footer Quick Links (Removed 'About')
const footerQuickLinks = [
  { label: "Home", key: "home" },
  { label: "Team", key: "team" },
  { label: "Events", key: "events" },
  { label: "Sponsors", key: "sponsors" },
  { label: "Projects", key: "projects" },
  { label: "Time Table", key: "timetable" },
  { label: "Alumni", key: "alumni" },
  { label: "Contact Us", key: "contact" },
];

const socials = [
  { icon: GithubIcon, label: "GitHub", url: "https://github.com/ISTE-Thapar-Chapter" },
  { icon: LinkedinIcon, label: "LinkedIn", url: "https://www.linkedin.com/company/iste-thapar/" },
  { icon: InstagramIcon, label: "Instagram", url: "https://www.instagram.com/iste_tiet/" },
];

function NavbarFooter({ children }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Explicit route navigation for dedicated pages
  const navigateToPage = (itemLabel) => {
    setMobileMenuOpen(false);
    const key = itemLabel.toLowerCase().replace(/\s+/g, "");

    if (key === "home") {
      if (location.pathname !== "/") {
        navigate("/");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (key === "events" || key === "event") {
      navigate("/events");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (key === "team") {
      navigate("/team");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (key === "sponsors" || key === "sponsers") {
      navigate("/sponsors");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (key === "projects") {
      navigate("/projects");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (key === "alumni" || key === "alumini") {
      navigate("/alumni");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (key === "timetable") {
      window.location.href = "https://timetable.istetiet.com";
      return;
    }

    if (key === "contact" || key === "contactus") {
      navigate("/contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  };

  const scrollToTop = () => {
    if (location.pathname !== "/") {
      navigate("/");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const styles = {
    page: {
      background: "transparent",
      color: "white",
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
      WebkitFontSmoothing: "antialiased",
    },
    progressBar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: `${scrollProgress}%`,
      height: "3px",
      background: "#0EA5E9",
      zIndex: 10000,
      transition: "width 0.1s linear",
    },
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 40px",
      height: scrolled ? "70px" : "88px",
      background: scrolled ? "#070D19" : "rgba(7, 13, 25, 0.8)",
      backdropFilter: "blur(18px)",
      borderBottom: scrolled ? "1px solid #1E293B" : "1px solid rgba(255, 255, 255, 0.05)",
      boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.8)" : "none",
      boxSizing: "border-box",
      zIndex: 9999,
      transition: "all 0.3s ease-in-out",
    },
    // EXTREME LEFT LOGO & BRAND
    brand: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      cursor: "pointer",
      userSelect: "none",
    },
    logo: {
      width: scrolled ? "120px" : "140px",
      height: scrolled ? "44px" : "52px",
      objectFit: "contain",
      transition: "all 0.3s ease",
    },
    brandText: {
      display: "flex",
      flexDirection: "column",
      lineHeight: 1.1,
    },
    brandTitle: {
      fontWeight: 800,
      fontSize: "1.2rem",
      letterSpacing: "0.06em",
      color: "#ffffff",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    brandSub: {
      fontStyle: "italic",
      fontWeight: 600,
      fontSize: "0.75rem",
      color: "#38BDF8",
      letterSpacing: "0.05em",
    },
    navList: {
      display: "flex",
      gap: "8px",
      listStyle: "none",
      margin: 0,
      padding: 0,
      alignItems: "center",
    },
    link: {
      color: "#e2e8f0",
      textDecoration: "none",
      fontSize: "0.92rem",
      fontWeight: 600,
      letterSpacing: "0.03em",
      padding: "8px 16px",
      borderRadius: "9999px",
      transition: "all 0.25s ease",
      cursor: "pointer",
      textTransform: "capitalize",
      userSelect: "none",
      WebkitUserSelect: "none",
      caretColor: "transparent",
      outline: "none",
    },
    mainContent: {
      width: "100%",
    },
    footer: {
      background: "#070D19",
      borderTop: "1px solid #1E293B",
      padding: "44px 40px 24px",
    },
    footerInner: {
      maxWidth: "1180px",
      margin: "0 auto",
    },
    footerBrand: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "14px",
    },
    footerLogo: {
      width: "88px",
      height: "88px",
      objectFit: "contain",
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "1.3fr 1fr 1fr",
      gap: "36px",
    },
    heading: {
      color: "#38BDF8",
      marginBottom: "14px",
      fontWeight: 800,
      fontSize: "0.88rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    text: {
      color: "#94a3b8",
      lineHeight: 1.6,
      fontSize: "0.82rem",
    },
    footerLink: {
      display: "block",
      color: "#cbd5e1",
      textDecoration: "none",
      marginBottom: "8px",
      transition: "all 0.3s ease",
      cursor: "pointer",
      fontSize: "0.82rem",
      fontWeight: 600,
    },
    socialContainer: {
      display: "flex",
      gap: "8px",
      marginTop: "14px",
    },
    social: {
      width: "34px",
      height: "34px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "rgba(255,255,255,0.06)",
      color: "#94a3b8",
      fontSize: "0.68rem",
      fontWeight: 700,
      letterSpacing: "0.05em",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "1px solid rgba(255,255,255,0.1)",
    },
    bottom: {
      position: "relative",
      marginTop: "26px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      paddingTop: "16px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
    },
    bottomText: {
      color: "#64748b",
      fontSize: "0.8rem",
      margin: 0,
      textAlign: "center",
    },
    topButton: {
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      border: "1px solid rgba(0, 240, 255, 0.35)",
      background: "rgba(0, 240, 255, 0.1)",
      color: "#00F0FF",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.page}>
      <style>{`
        .nav-link:hover {
          color: #00F0FF !important;
          background: rgba(0, 240, 255, 0.12) !important;
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
        }
        .footer-link:hover {
          color: #00F0FF !important;
          transform: translateX(6px);
        }
        .social-icon:hover {
          background: rgba(0, 240, 255, 0.2) !important;
          color: #00F0FF !important;
          border-color: rgba(0, 240, 255, 0.5) !important;
          transform: translateY(-4px);
        }
        .top-btn:hover {
          background: rgba(0, 240, 255, 0.25) !important;
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
        }
        @media (max-width: 960px) {
          .iste-nav-list { display: none !important; }
          .iste-mobile-toggle { display: flex !important; }
          .iste-footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 640px) {
          .iste-navbar { padding: 0 16px !important; }
          .iste-footer { padding: 32px 16px 20px !important; }
          .iste-mobile-menu { padding: 16px 16px !important; }
          .iste-bottom { flex-direction: column !important; gap: 14px !important; }
          .iste-top-btn { position: static !important; margin-top: 4px; }
      `}</style>



      <div style={styles.progressBar}></div>

      {/* 🧭 NAVBAR WITH DEDICATED PAGE ROUTING */}
      <nav style={styles.navbar} className="iste-navbar">
        <div style={styles.brand} onClick={scrollToTop} title="ISTE Thapar Chapter Home">
          <img src={isteLogo} alt="ISTE Thapar Chapter logo" style={styles.logo} />
        </div>

        {/* Desktop Navigation Links */}
        <ul style={styles.navList} className="iste-nav-list">
          {navItems.map((item) => (
            <li key={item}>
              <a
                className="nav-link"
                onClick={() => navigateToPage(item)}
                style={styles.link}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          className="iste-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            color: "#00F0FF",
            fontSize: "24px",
            cursor: "pointer",
          }}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="iste-mobile-menu"
            style={{
              position: "fixed",
              top: "70px",
              left: 0,
              width: "100%",
              background: "#030712",
              borderBottom: "1px solid rgba(0, 240, 255, 0.2)",
              padding: "20px 40px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              zIndex: 9998,
            }}
          >
            {navItems.map((item) => (
              <a
                key={item}
                className="nav-link"
                onClick={() => navigateToPage(item)}
                style={{ ...styles.link, fontSize: "1.1rem" }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* 🖥️ PAGE CONTENT */}
      <main style={styles.mainContent}>
        {children}
      </main>

      {/* 🧾 FOOTER */}
      <footer id="contact" style={styles.footer} className="iste-footer">
        <div style={styles.footerInner}>
          <div style={styles.footerGrid} className="iste-footer-grid">
            <div>
              <div style={styles.footerBrand}>
                <img src={isteLogo} alt="ISTE logo" style={styles.footerLogo} />
               
              </div>
              <p style={styles.text}>
                Indian Society for Technical Education — Thapar Institute of
                Engineering & Technology chapter, building a community of
                curious engineers and technical leaders.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h2 style={styles.heading}>Quick Links</h2>
              {footerQuickLinks.map((item) => (
                <a
                  key={item.key}
                  className="footer-link"
                  style={styles.footerLink}
                  onClick={() => navigateToPage(item.label)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div>
              <h2 style={styles.heading}>Connect With Us</h2>
              <div className="flex flex-col gap-3 mt-3">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-300 shadow-sm"
                      title={s.label}
                    >
                      <Icon className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-xs font-semibold tracking-wide">{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={styles.bottom} className="iste-bottom">
            <p style={styles.bottomText}>© 2026 ISTE Thapar Chapter. All rights reserved.</p>
            <button
              className="top-btn iste-top-btn"
              style={{ ...styles.topButton, position: "absolute", right: 0 }}
              onClick={scrollToTop}
              title="Back to top"
            >
              ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NavbarFooter;