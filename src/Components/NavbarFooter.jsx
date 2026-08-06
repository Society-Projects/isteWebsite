import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Inline social SVGs for maximum reliability
const LinkedInIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GitHubIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

// Navbar links (Removed 'About')
const navItems = ["Home", "Events", "Team", "Sponsors", "Projects", "Contact"];

// Footer Quick Links (Removed 'About')
const footerQuickLinks = [
  { label: "Home", key: "home" },
  { label: "Team", key: "team" },
  { label: "Events", key: "events" },
  { label: "Sponsors", key: "sponsors" },
  { label: "Projects", key: "projects" },
  { label: "Alumni", key: "alumni" },
  { label: "Contact Us", key: "contact" },
];

const socials = [
  { icon: <LinkedInIcon size={18} />, label: "LinkedIn", url: import.meta.env.VITE_LINKEDIN || "https://www.linkedin.com/company/iste-thapar" },
  { icon: <InstagramIcon size={18} />, label: "Instagram", url: import.meta.env.VITE_INSTAGRAM || "https://instagram.com/iste_tiet" },
  { icon: <GitHubIcon size={18} />, label: "GitHub", url: import.meta.env.VITE_GITHUB || "https://github.com/ISTE-Thapar-Chapter" }
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
      fontFamily: "'Poppins', 'Inter', sans-serif",
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
      background: "linear-gradient(90deg, #00F0FF, #005CFF)",
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
      padding: "0 32px",
      height: scrolled ? "70px" : "88px",
      background: scrolled ? "rgba(0, 0, 0, 0.94)" : "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(18px)",
      borderBottom: scrolled ? "1px solid rgba(0, 240, 255, 0.18)" : "1px solid rgba(255, 255, 255, 0.05)",
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
      width: scrolled ? "44px" : "54px",
      height: scrolled ? "44px" : "54px",
      objectFit: "contain",
      transition: "all 0.3s ease",
      filter: "drop-shadow(0 0 8px rgba(0, 240, 255, 0.2))",
    },
    brandText: {
      display: "flex",
      flexDirection: "column",
      lineHeight: 1.0,
      marginLeft: "14px",
      alignItems: "flex-start",
      justifyContent: "center",
    },
    brandTitle: {
      fontWeight: 800,
      fontSize: scrolled ? "1.5rem" : "1.85rem",
      letterSpacing: "0.06em",
      color: "#ffffff",
      fontFamily: "'Poppins', sans-serif",
      transition: "all 0.3s ease",
      lineHeight: 1.0,
    },
    brandSub: {
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: scrolled ? "0.62rem" : "0.72rem",
      color: "#94a3b8",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      transition: "all 0.3s ease",
      marginTop: "4px",
      display: "block",
      verticalAlign: "baseline",
      lineHeight: 1.0,
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
    },
    mainContent: {
      width: "100%",
    },
    footer: {
      background: "#030712",
      borderTop: "1px solid rgba(0, 240, 255, 0.2)",
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
      color: "#00F0FF",
      marginBottom: "14px",
      fontWeight: 800,
      fontSize: "0.88rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontFamily: "'Poppins', sans-serif",
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
          <img src="/istelogo.png" alt="ISTE Logo" style={styles.logo} />
          <div style={styles.brandText}>
            <span style={styles.brandTitle}>ISTE</span>
            <sub style={styles.brandSub}>Thapar Chapter</sub>
          </div>
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
                <img src="/istelogo.png" alt="ISTE logo" style={styles.footerLogo} />
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
              <h2 style={styles.heading}>Contact Us</h2>
              <p style={styles.text}>
                Thapar Institute of Engineering & Technology, Patiala, Punjab
              </p>
              <div style={styles.socialContainer}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="social-icon"
                    style={styles.social}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
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