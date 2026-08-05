import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GalleryModal.module.css';

/* ═══════════════════════════════════════════════════════════════
   LIGHTBOX — fullscreen single-image viewer with prev/next,
   keyboard nav, mouse wheel, swipe gestures, thumbnail strip
═══════════════════════════════════════════════════════════════ */
function Lightbox({ photos, startIndex, glowColor, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const total = photos.length;

  const goPrev = useCallback(() => setIndex(i => (i - 1 + total) % total), [total]);
  const goNext = useCallback(() => setIndex(i => (i + 1) % total), [total]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, goPrev, goNext]);

  /* Mouse wheel navigation */
  useEffect(() => {
    let wheelTimeout = null;
    const onWheel = (e) => {
      if (wheelTimeout) return; // debounce
      if (Math.abs(e.deltaY) > 30) {
        e.deltaY > 0 ? goNext() : goPrev();
        wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 350);
      }
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [goPrev, goNext]);

  /* Touch swipe */
  const handleTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx > 0 ? goPrev() : goNext();
    } else if (dy > 80) {
      onClose(); // swipe down to close
    }
  };

  const photo = photos[index];

  return createPortal(
    <motion.div
      className={styles.lightboxOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen image viewer"
      data-testid="lightbox-overlay"
      style={{ '--lb-glow': glowColor }}
    >
      {/* Counter */}
      <div className={styles.lbCounter} aria-live="polite">
        <span className={styles.lbCounterCurrent}>{index + 1}</span>
        <span className={styles.lbCounterSep}>/</span>
        <span>{total}</span>
      </div>

      {/* Close */}
      <button
        className={styles.lbClose}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close lightbox"
        data-testid="lightbox-close"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        className={`${styles.lbArrow} ${styles.lbArrowLeft}`}
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        aria-label="Previous image"
        data-testid="lightbox-prev"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={styles.lbImgWrap}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          data-testid={`lightbox-image-${index}`}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            draggable="false"
            className={styles.lbImg}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/1200x800/0f0f1a/4b5563?text=Photo+${index + 1}`;
            }}
          />
          <p className={styles.lbCaption}>{photo.alt}</p>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        className={`${styles.lbArrow} ${styles.lbArrowRight}`}
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        aria-label="Next image"
        data-testid="lightbox-next"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Thumbnail strip */}
      <div className={styles.lbThumbs} onClick={(e) => e.stopPropagation()}>
        {photos.map((p, i) => (
          <button
            key={i}
            className={`${styles.lbThumb} ${i === index ? styles.lbThumbActive : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
          >
            <img src={p.src} alt="" draggable="false" loading="lazy"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x56/0f0f1a/4b5563?text=${i + 1}`; }}
            />
          </button>
        ))}
      </div>
    </motion.div>,
    document.body
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY MODAL — responsive grid view, portal into body.
   Close button floats OUTSIDE the scrollable panel to guarantee
   it is always clickable regardless of scroll position.
═══════════════════════════════════════════════════════════════ */
export default function GalleryModal({ event, glowColor, onClose }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const panelRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const scrollPosRef = useRef(0);

  /* Save & lock body scroll on mount, restore on unmount */
  useEffect(() => {
    scrollPosRef.current = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosRef.current}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollPosRef.current);
    };
  }, []);

  /* Escape to close (only when lightbox is not open) */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && lightboxIndex === null) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, lightboxIndex]);

  /* Auto-focus the panel */
  useEffect(() => {
    if (panelRef.current) panelRef.current.focus();
  }, []);

  /* Swipe down to close on mobile */
  const handleTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e) => {
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (dy > 100) onClose();
  };

  return createPortal(
    <>
      {/* Lightbox layer */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={event.photos}
            startIndex={lightboxIndex}
            glowColor={glowColor}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>

      {/* Gallery overlay */}
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        role="dialog"
        aria-modal="true"
        aria-label={`${event.title} Photo Gallery`}
        data-testid="gallery-modal-overlay"
        style={{ '--glow-color': glowColor }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ── Panel ── */}
        <motion.div
          ref={panelRef}
          className={styles.panel}
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 28 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          data-testid="gallery-modal-panel"
          style={{ '--glow-color': glowColor }}
        >
          {/* ── Header with close button ── */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <h3 className={styles.title} data-testid="gallery-modal-title">
                {event.title}
              </h3>
              <span className={styles.subtitle}>
                Photo Gallery · {event.photos.length} photos
              </span>
            </div>
            <button
              className={styles.closeBtn}
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              aria-label="Close gallery"
              data-testid="gallery-close-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── Scrollable grid ── */}
          <div className={styles.body}>
            <div className={styles.grid} data-testid="gallery-grid">
              {event.photos.map((photo, idx) => (
                <motion.button
                  key={idx}
                  className={styles.gridItem}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.055, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Open photo: ${photo.alt}`}
                  data-testid={`gallery-item-${idx}`}
                >
                  <div className={styles.imgWrap}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      draggable="false"
                      className={styles.img}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x400/0f0f1a/4b5563?text=Photo+${idx + 1}`;
                      }}
                    />
                    <div className={styles.imgOverlay} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.overlayIcon}>
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-4.35-4.35" />
                        <path d="M8 11h6M11 8v6" />
                      </svg>
                      <span className={styles.overlayLabel}>Click to Preview</span>
                    </div>
                  </div>
                  <p className={styles.caption}>{photo.alt}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.body
  );
}
