import { useRef } from "react";
import SEO from "../SEO/SEO";
import "./Sponsors.css";

// 🖼️ STATIC IMPORT OF SPONSOR LOGOS
import surreyImg from "../../assets/Sponsor Images/surrey.png";
import plasmidImg from "../../assets/Sponsor Images/plasmid.png";
import hoverrobotixImg from "../../assets/Sponsor Images/hoverrobotix.png";
import bakingoImg from "../../assets/Sponsor Images/bakingo.png";
import stockedgeImg from "../../assets/Sponsor Images/stockedge.jpg";
import mentorxImg from "../../assets/Sponsor Images/mentorx.jpeg";
import oatleyImg from "../../assets/Sponsor Images/oatley.jpg";
import echoesImg from "../../assets/Sponsor Images/echoes.jpg";
import interviewImg from "../../assets/Sponsor Images/interview.jpg";
import xyzImg from "../../assets/Sponsor Images/xyz.jpg";

/**
 * SPONSORS DATA
 */
const sponsors = [
  {
    name: "Surrey Immigration Consultancy",
    tier: "title",
    role: "Title Sponsor",
    blurb:
      "Leading our lineup as Title Sponsor — fueling every event we run and helping students navigate opportunities abroad.",
    logo: surreyImg,
  },
  {
    name: "Plasmid",
    tier: "power",
    role: "Power Sponsor",
    blurb: "Providing core sponsorship resources and mentorship for young technical creators.",
    logo: plasmidImg,
  },
  {
    name: "Hoverrobotix",
    tier: "power",
    role: "Power Sponsor",
    blurb: "Leading sponsorship partner providing AI and robotics solutions and hands-on guidance.",
    logo: hoverrobotixImg,
  },
  {
    name: "Bakingo",
    tier: "associate",
    role: "Associate Sponsor",
    blurb: "Delightful baking partner sweetening ISTE events with exceptional catering and support.",
    logo: bakingoImg,
  },
  {
    name: "StockEdge",
    tier: "associate",
    role: "Associate Sponsor",
    blurb: "Empowering students with comprehensive tools and education for financial literacy.",
    logo: stockedgeImg,
  },
  {
    name: "MentorX",
    tier: "associate",
    role: "Associate Sponsor",
    blurb: "Connecting student builders with global mentors for career acceleration.",
    logo: mentorxImg,
  },
  {
    name: "Oatley",
    tier: "sponsor",
    logo: oatleyImg,
  },
  {
    name: "Echoes",
    tier: "sponsor",
    logo: echoesImg,
  },
  {
    name: "Interview Buddy",
    tier: "sponsor",
    logo: interviewImg,
  },
  {
    name: "XYZ",
    tier: "sponsor",
    logo: xyzImg,
  },
];

const TIER_LABEL = {
  title: "Title Sponsor",
  power: "Power Sponsor",
  associate: "Associate Sponsor",
};

const TIER_ICON = {
  title: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 8l4 3 6-7 6 7 4-3-2 11H4L2 8z" strokeLinejoin="round" />
    </svg>
  ),
  power: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  associate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 12h8M12 8v8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
};

function useTilt() {
  const ref = useRef(null);

  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none), (pointer: coarse)").matches;

  const handleMove = (e) => {
    if (isTouchDevice()) return;
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    card.style.setProperty("--rx", `${-((y - midY) / midY) * 6}deg`);
    card.style.setProperty("--ry", `${((x - midX) / midX) * 6}deg`);
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  const handleLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  // Resets any residual tilt after a tap, since touch devices don't fire
  // a real mouseleave once the finger lifts.
  const handleTouchEnd = handleLeave;

  return { ref, handleMove, handleLeave, handleTouchEnd };
}

/** Helper component for logo image with SVG initials fallback */
function LogoImage({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.onerror = null;
        // SVG inline data URL for clean fallback icon
        e.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="%2300F0FF" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/></svg>`;
      }}
    />
  );
}

/** Full card used for title / power / associate tiers */
function SponsorCard({ sponsor, index }) {
  const { ref, handleMove, handleLeave, handleTouchEnd } = useTilt();

  return (
    <div
      ref={ref}
      className={`sponsor-card sponsor-card--${sponsor.tier}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="sponsor-card__glow" />
      <span className="sponsor-card__index">{String(index + 1).padStart(2, "0")}</span>

      <span className="sponsor-card__ribbon">
        {TIER_ICON[sponsor.tier]}
        {sponsor.role || TIER_LABEL[sponsor.tier]}
      </span>

      <div className="sponsor-card__logo-wrap">
        <LogoImage src={sponsor.logo} alt={sponsor.name} className="sponsor-card__logo" />
      </div>

      <h3 className="sponsor-card__name">{sponsor.name}</h3>

      {sponsor.blurb && <p className="sponsor-card__blurb">{sponsor.blurb}</p>}

      {sponsor.link && (
        <a
          href={sponsor.link}
          target="_blank"
          rel="noreferrer"
          className="sponsor-card__visit"
          onClick={(e) => e.stopPropagation()}
        >
          Visit
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
    </div>
  );
}

/** Compact tile used for the plain "Sponsors" tier */
function SponsorTile({ sponsor }) {
  const { ref, handleMove, handleLeave, handleTouchEnd } = useTilt();

  return (
    <div
      ref={ref}
      className="sponsor-tile"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      title={sponsor.name}
    >
      <div className="sponsor-tile__glow" />
      <LogoImage src={sponsor.logo} alt={sponsor.name} className="sponsor-tile__logo" />
      <span className="sponsor-tile__name">{sponsor.name}</span>
    </div>
  );
}

export default function Sponsors() {
  const byTier = (tier) => sponsors.filter((s) => s.tier === tier);

  const titleSponsors = byTier("title");
  const powerSponsors = byTier("power");
  const associateSponsors = byTier("associate");
  const generalSponsors = byTier("sponsor");

  return (
    <section className="sponsors" id="sponsors">
      <SEO
        title="Our Sponsors & Corporate Partners | ISTE TIET"
        description="Discover the corporate sponsors, industry partners, and organizations supporting ISTE TIET's hackathons, technical events, and student development."
        canonicalPath="/sponsors"
      />

      <div className="sponsors__bg-glow" aria-hidden="true" />
      <div className="sponsors__bg-grid" aria-hidden="true" />

      <div className="sponsors__header">
        <span className="sponsors__eyebrow">Backed by</span>
        <h2 className="sponsors__title">Our Sponsors</h2>
        <p className="sponsors__subtitle">
          The people and brands who fuel our events, projects, and the next generation of tech
          leaders — one collaboration at a time.
        </p>
      </div>

      {titleSponsors.length > 0 && (
        <div className="sponsors__row sponsors__row--title">
          {titleSponsors.map((s, i) => (
            <SponsorCard key={s.name} sponsor={s} index={i} />
          ))}
        </div>
      )}

      {powerSponsors.length > 0 && (
        <div className="sponsors__tier">
          <h3 className="sponsors__tier-label">Power Sponsors</h3>
          <div className="sponsors__row sponsors__row--power">
            {powerSponsors.map((s, i) => (
              <SponsorCard key={s.name} sponsor={s} index={i} />
            ))}
          </div>
        </div>
      )}

      {associateSponsors.length > 0 && (
        <div className="sponsors__tier">
          <h3 className="sponsors__tier-label">Associate Sponsors</h3>
          <div className="sponsors__row sponsors__row--associate">
            {associateSponsors.map((s, i) => (
              <SponsorCard key={s.name} sponsor={s} index={i} />
            ))}
          </div>
        </div>
      )}

      {generalSponsors.length > 0 && (
        <div className="sponsors__tier">
          <h3 className="sponsors__tier-label">Sponsors</h3>
          <div className="sponsors__row sponsors__row--tiles">
            {generalSponsors.map((s, i) => (
              <SponsorTile key={`${s.name}-${i}`} sponsor={s} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
