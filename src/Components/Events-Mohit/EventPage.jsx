import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import styles from "./EventPage.module.css";
import GalleryModal from './GalleryModal';

/* ─── Orientation ─── */
import o1 from "../../assets/Events/Orientation/o-1.JPG";
import o2 from "../../assets/Events/Orientation/o-2.JPG";
import o3 from "../../assets/Events/Orientation/o-3.jpg";
import o4 from "../../assets/Events/Orientation/o-4.jpg";
import o5 from "../../assets/Events/Orientation/o-5.jpg";
/* ─── Tech Unplugged ─── */
import t1 from "../../assets/Events/Tech Unplugged/t-1.JPG";
import t2 from "../../assets/Events/Tech Unplugged/t-2.JPG";
import t3 from "../../assets/Events/Tech Unplugged/t-3.JPG";
import t4 from "../../assets/Events/Tech Unplugged/t-4.JPG";
import t5 from "../../assets/Events/Tech Unplugged/t-5.JPG";
/* ─── Colloquium ─── */
import c1 from "../../assets/Events/Colloquium/c-1.JPG";
import c2 from "../../assets/Events/Colloquium/c-2.JPG";
import c3 from "../../assets/Events/Colloquium/c-3.JPG";
import c4 from "../../assets/Events/Colloquium/c-4.JPG";
import c5 from "../../assets/Events/Colloquium/c-5.JPG";
/* ─── Overthrone ─── */
import ot1 from "../../assets/Events/Overthrone/ot-1.JPG";
import ot2 from "../../assets/Events/Overthrone/ot-2.JPG";
import ot3 from "../../assets/Events/Overthrone/ot-3.jpg";
import ot4 from "../../assets/Events/Overthrone/ot-4.jpg";
import ot5 from "../../assets/Events/Overthrone/ot-5.JPG";

/* ─── Society Fair ─── */
import sf1 from "../../assets/Events/Society Fair/sf-1.png";
/* ─── Hackathon ─── */
import h1 from "../../assets/Events/Hackathon/h-1.png";


/* ─── Placeholder used only for Society Fair & Hackathon, which don't have
   real photos yet. Colloquium, Tech Unplugged, Overthrone, and Orientation
   now load real images imported directly from src/assets/Events. ─── */
const placeholderImg = (text) =>
  `https://placehold.co/800x450/0f0f1a/4b5563?text=${encodeURIComponent(text)}`;

/* ─── Per-card accent palette – one unique color per event ─── */
const GLOWS = [
  { color: '#3b82f6', shadow: '0 0 30px rgba(59,130,246,0.4), 0 0 60px rgba(59,130,246,0.2)' },   // blue   – Society Fair
  { color: '#a855f7', shadow: '0 0 30px rgba(168,85,247,0.4), 0 0 60px rgba(168,85,247,0.2)' },   // purple – Orientation
  { color: '#22c55e', shadow: '0 0 30px rgba(34,197,94,0.4),  0 0 60px rgba(34,197,94,0.2)' },    // green  – Tech Unplugged
  { color: '#f97316', shadow: '0 0 30px rgba(249,115,22,0.4), 0 0 60px rgba(249,115,22,0.2)' },   // orange – Colloquium
  { color: '#ec4899', shadow: '0 0 30px rgba(236,72,153,0.4), 0 0 60px rgba(236,72,153,0.2)' },   // pink   – Overthrone
  { color: '#06b6d4', shadow: '0 0 30px rgba(6,182,212,0.4),  0 0 60px rgba(6,182,212,0.2)' },    // cyan   – Hackathon
];


/* ─── Sub-event poster lookup ─── */
const SUB_EVENT_ICONS = {
  'Web Warp': <img src={placeholderImg('Web Warp')} alt="Web Warp" draggable="false" />,
  'Cryptix': <img src={placeholderImg('Cryptix')} alt="Cryptix" draggable="false" />,
  'Kaggle Royale': <img src={placeholderImg('Kaggle Royale')} alt="Kaggle Royale" draggable="false" />,
};

/* ─── Single Event Card ─── */
function EventCard({ event, index, onViewPhotos, disableGallery }) {
  const glow = GLOWS[index % GLOWS.length];
  const [subEventsOpen, setSubEventsOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.article
      className={styles.eventCard}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      style={{
        '--glow-color': glow.color,
        ...(subEventsOpen && {
          zIndex: 10,
        }),
      }}
      data-testid={`featured-card-${event.id}`}
      role="article"
      aria-label={event.title}
    >
      <div className={styles.cardInner}>
        {/* Glowing border accent */}
        <div className={styles.glowBorder} style={{ '--glow-color': glow.color }} aria-hidden="true" />

        {/* Cover image container */}
        <div className={styles.cardImageWrap}>
          <img
            src={event.photos[0]?.src}
            alt={event.title}
            className={`${styles.cardCoverImg} ${imgLoaded ? styles.imgLoaded : ''}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            data-testid={`event-image-${event.id}`}
            draggable="false"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/800x450/0f0f1a/4b5563?text=${encodeURIComponent(event.title)}`;
              setImgLoaded(true);
            }}
          />
          <div className={styles.imgGradient} />
        </div>

        {/* Category badge */}
        <div
          className={styles.categoryBadge}
          style={{ '--badge-color': glow.color }}
          data-testid={`event-category-${event.id}`}
        >
          {event.category}
        </div>

        {/* Card body */}
        <div className={styles.cardBody}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardTitle} data-testid={`event-title-${event.id}`}>
              {event.title}
            </h3>
            {event.subEvents && (
              <button
                className={styles.subEventsChip}
                style={{ '--btn-color': glow.color }}
                onClick={() => setSubEventsOpen((o) => !o)}
                aria-expanded={subEventsOpen}
                data-testid={`sub-events-toggle-${event.id}`}
                title="View sub-events"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zM5 15l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3zM19 15l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
                </svg>
                <span>{event.subEvents.length} sub-events</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                  style={{ transform: subEventsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', width: '11px', height: '11px', fill: 'rgba(255,255,255,0.5)', flexShrink: 0 }}
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </button>
            )}
          </div>

          <div className={styles.cardMeta}>
            <span className={styles.metaItem}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" /></svg>
              {event.location.split(',')[0]}
            </span>
            <span className={styles.metaItem}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" /></svg>
              {event.date}
            </span>
            <span className={styles.attendeeChip} style={{ '--chip-color': glow.color }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
              <strong>{event.attendees.toLocaleString()}</strong> attended
            </span>
          </div>

          <p className={styles.cardDescription} data-testid={`event-description-${event.id}`}>
            {event.description}
          </p>
        </div>

        {/* Sub-events accordion panel */}
        {event.subEvents && (
          <div
            className={`${styles.subEventsPanel} ${subEventsOpen ? styles.subEventsExpanded : ''}`}
            style={{ '--glow-color': glow.color }}
          >
            {event.subEvents.map((sub) => (
              <div
                key={sub.title}
                className={styles.subEventCard}
                style={{ '--btn-color': glow.color }}
              >
                <span className={styles.subEventTitle}>
                  {SUB_EVENT_ICONS[sub.title] && (
                    <span className={styles.subEventIcon} style={{ '--icon-color': glow.color }}>
                      {SUB_EVENT_ICONS[sub.title]}
                    </span>
                  )}
                  {sub.title}
                </span>
                <span className={styles.subEventDate}>{sub.date}</span>
              </div>
            ))}
          </div>
        )}

        {/* Card footer with View Gallery button */}
        <div className={styles.cardFooter}>
          <button
            className={styles.photosBtn}
            style={{ '--btn-color': glow.color }}
            onClick={() => onViewPhotos(event, glow.color)}
            data-testid={`photos-btn-${event.id}`}
            aria-label={`View photos for ${event.title}`}
          >
            <span>View Gallery</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* PhotoModal replaced by GalleryModal (see GalleryModal.jsx) */

import SEO from "../SEO/SEO";

/* ─── Participant Statistics Counter ─── */
const CountUp = ({ end }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const match = end.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!isInView || targetNum === 0) return;
    const duration = 2000;
    const fps = 60;
    const interval = 1000 / fps;
    const totalFrames = Math.round(duration / interval);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutQuad = progress * (2 - progress);
      const current = Math.round(targetNum * easeOutQuad);
      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(targetNum);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, targetNum]);

  return (
    <span ref={ref}>
      {count === 0 ? end : `${count.toLocaleString()}${suffix}`}
    </span>
  );
};

/* ─── Main Component ─── */
const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedGlowColor, setSelectedGlowColor] = useState('#3b82f6');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredEvents = [
    {
      id: 1,
      title: "Society Fair 2025",
      date: "August 23, 2025",
      location: "Fete Area, Thapar University",
      category: "Fair",
      description: "An engaging fair showcasing all university societies, clubs, and student groups. Students explored opportunities, interacted with members, and registered for activities.",
      attendees: 5000,
      photos: [
        { src: sf1, alt: "Explore our society stall" },
        { src: placeholderImg("Society Fair 2"), alt: "Memory chart display" },
        { src: placeholderImg("Society Fair 3"), alt: "Students interacting with club members" },
        { src: placeholderImg("Society Fair 4"), alt: "Information booths at society fair" },
        { src: placeholderImg("Society Fair 5"), alt: "Stall showcasing creative society projects" },
      ],
    },
    {
      id: 2,
      title: "Orientation 2025",
      date: "August 25, 2025",
      location: "Main Auditorium, Thapar University",
      category: "Orientation",
      description: "A welcome event for the incoming batch, featuring sessions from faculty, student leaders, and alumni to guide freshers through campus life and academic resources.",
      attendees: 600,
      photos: [
        { src: o1, alt: "Our Society Orientation" },
        { src: o2, alt: "Speaker addressing orientation attendees" },
        { src: o3, alt: "Red bull competition" },
        { src: o4, alt: "Students interacting" },
        { src: o5, alt: "Panel discussion during orientation" },
      ],
    },
    {
      id: 3,
      title: "Tech Unplugged 2025",
      date: "November 15, 2025",
      location: "Main Auditorium, Thapar University",
      category: "Speaker Session",
      description: "An engaging session focused on innovative insights, where attendees explored dynamic problem-solving strategies through interactive discussions and real-world case studies.",
      attendees: 450,
      photos: [
        { src: t1, alt: "Playnnovate interactive problem-solving games" },
        { src: t2, alt: "Participants engaging in competition" },
        { src: t3, alt: "Team strategy planning" },
        { src: t4, alt: "Creative Gameplay Begins!" },
        { src: t5, alt: "ISTE team after event" },
      ],
    },
    {
      id: 4,
      title: "Colloquium 2026",
      date: "February 19–21, 2026",
      location: "Activity Space, Thapar University",
      category: "Festival",
      description: "A multi-day flagship technical fest featuring exciting competitions, workshops, and sub-events attracting talent from across the region.",
      attendees: 1000,
      photos: [
        { src: c1, alt: "Colloquium multi-day flagship technical fest" },
        { src: c2, alt: "Team based competition" },
        { src: c3, alt: "Gaming zone" },
        { src: c4, alt: "Team strategy planning" },
        { src: c5, alt: "ISTE team after colloquium" },
      ],
      subEvents: [
        { title: "Web Warp", date: "February 19, 2026" },
        { title: "Cryptix", date: "February 20, 2026" },
        { title: "Kaggle Royale", date: "February 21, 2026" },
      ],
    },
    {
      id: 5,
      title: "Overthrone 2026",
      date: "April 19, 2026",
      location: "Activity Space, Thapar University",
      category: "Competition",
      description: "A competitive, team-based challenge where participants tackled complex problems, strategically earning points based on the difficulty level of each question.",
      attendees: 500,
      photos: [
        { src: ot1, alt: "Overthrone competition" },
        { src: ot2, alt: "Teams in action" },
        { src: ot3, alt: "Problem solving round" },
        { src: ot4, alt: "Scoring board" },
        { src: ot5, alt: "Winners on stage" },
      ],
    },
    {
      id: 6,
      title: "Intra Society Hackathon 2026",
      date: "June 20, 2026",
      location: "Computer Science Department, Thapar University",
      category: "Hackathon",
      description: "An internal hackathon for society members to collaborate, innovate, and build creative solutions in a single intense day of coding and design.",
      attendees: 60,
      photos: [
        { src: h1, alt: "Hackathon teams coding" },
      ],
    },
  ];

  const handleViewPhotos = (event, glowColor) => {
    // Gallery is disabled for Hackathon events
    if (event.category === 'Hackathon') return;
    setSelectedEvent(event);
    setSelectedGlowColor(glowColor || '#3b82f6');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: (i) => ({
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    }),
  };

  const stats = [
    { number: '10+', label: 'Events Last Year', testId: 'stat-events' },
    { number: '1000+', label: 'Participants', testId: 'stat-participants' },
    { number: '2', label: 'Speaker Sessions', testId: 'stat-speakers' },
  ];

  const eventsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "ISTE TIET Events & Workshops",
    "itemListElement": featuredEvents.map((evt, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Event",
        "name": evt.title,
        "startDate": evt.date,
        "location": {
          "@type": "Place",
          "name": evt.location,
          "address": "Thapar Institute of Engineering and Technology, Patiala"
        },
        "description": evt.description,
        "organizer": {
          "@type": "Organization",
          "name": "ISTE TIET",
          "url": "https://istetiet.com"
        }
      }
    }))
  };

  return (
    <main className={styles.eventSection}>
      <SEO
        title="Events & Hackathons | ISTE TIET"
        description="Explore technical workshops, hackathons, guest lectures, orientations, and society events organized by ISTE TIET at Thapar University."
        canonicalPath="/events"
        schema={eventsSchema}
      />


      {/* Cinematic ambient background lighting */}
      <div className={styles.ambientGlows} aria-hidden="true">
        <div className={styles.glowOrange} />
        <div className={styles.glowPurple} />
        <div className={styles.glowBlue} />
        <div className={styles.glowOverlay} />
        <div className={styles.vignetteOverlay} />
      </div>

      <div className={styles.eventContainer}>

        {/* ── Hero ── */}
        <section className={styles.heroSection}>
          {/* Geometric accent shapes */}
          <div className={styles.heroGeoRing1} aria-hidden="true" />
          <div className={styles.heroGeoRing2} aria-hidden="true" />
          <div className={styles.heroGeoCorner} aria-hidden="true" />
          {/* Volumetric ambient orbs */}
          <div className={styles.heroOrb1} aria-hidden="true" />
          <div className={styles.heroOrb2} aria-hidden="true" />
          <div className={styles.heroOrb3} aria-hidden="true" />
          {/* Light streaks */}
          <div className={styles.heroStreak1} aria-hidden="true" />
          <div className={styles.heroStreak2} aria-hidden="true" />
          {/* Glass reflection sheen */}
          <div className={styles.heroGlassSheen} aria-hidden="true" />
          {/* Dark readability overlay */}
          <div className={styles.heroReadOverlay} aria-hidden="true" />

          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30, scale: 0.98, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              ISTE Thapar Chapter
            </div>

            <h1 className={styles.heroTitle} data-testid="hero-title">
              Our&nbsp;
              <span className={styles.heroGradientWord}>Events</span>
            </h1>

            <div className={styles.heroGlassBox}>
              <p className={styles.heroSubtitle} data-testid="hero-subtitle">
                Explore the successful events organized by ISTE Thapar Chapter.
                Our society has conducted numerous workshops, conferences, and competitions
                to foster technical excellence.
              </p>
            </div>

            <div className={styles.heroStats}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={styles.stat}
                  custom={i}
                  variants={statsVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <span className={styles.statNumber} data-testid={s.testId}>
                    <CountUp end={s.number} />
                  </span>
                  <span className={styles.statLabel}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Events Grid ── */}
        <section className={styles.featuredEvents}>
          <motion.div
            className={styles.sectionHeadingWrap}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <h2 className={styles.sectionTitle} data-testid="featured-events-title">
              Past Events
            </h2>
            <p className={styles.sectionSubtitle}>
              A glimpse of the moments we created together
            </p>
            <div className={styles.titleUnderline} aria-hidden="true" />
          </motion.div>

          <div className={styles.featuredGrid}>
            {featuredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                onViewPhotos={handleViewPhotos}
                disableGallery={event.category === 'Hackathon'}
              />
            ))}
          </div>
        </section>
      </div>

      {/* ── Gallery Modal (Portal – renders into document.body) ── */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
          <GalleryModal
            event={selectedEvent}
            glowColor={selectedGlowColor}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default EventsPage;