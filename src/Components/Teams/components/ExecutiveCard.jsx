import { motion } from "framer-motion";

/**
 * NFT-collectible-styled executive card: square portrait, thin gradient
 * border, holographic hover glow, LinkedIn as the card's primary action.
 */
function ExecutiveCard({ executive, index = 0, isBlurred = false }) {
  const { image, name, position, linkedin, github } = executive;

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: "easeOut" }}
      className={`group relative rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-1.5 w-full h-full flex flex-col ${
        isBlurred ? "blur-[3px] opacity-30 scale-[0.97] saturate-50 pointer-events-none" : ""
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(0,180,216,0.5), rgba(0,240,255,0.3))",
      }}
    >
      <div className="glass-panel relative flex h-full flex-col overflow-hidden rounded-2xl">
        {/* corner ticks, collectible framing */}
        <span
          aria-hidden="true"
          className="absolute left-3 top-3 h-3 w-3 border-l border-t border-neon-blue/50"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 h-3 w-3 border-r border-t border-neon-blue/50"
        />

        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-darkblue-900/40 to-surface">
          {image ? (
            <img
              src={image}
              alt={`Portrait of ${name}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div
              role="img"
              aria-label={`Portrait placeholder for ${name}`}
              className="flex h-full w-full items-center justify-center font-display text-3xl text-white/20"
            >
              {name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(120deg, rgba(11,61,145,0.5), rgba(0,240,255,0.4))",
            }}
          />
        </div>

        <div className="flex flex-1 flex-col gap-1 p-5">
          <h3 className="font-display text-lg font-semibold text-white">
            {name}
          </h3>
          <p className="font-mono text-xs uppercase tracking-wide text-neon-blue/80">
            {position}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${name}'s LinkedIn profile`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 transition-colors duration-300 hover:border-neon-blue/60 hover:text-neon-blue focus-visible:border-neon-blue/60 focus-visible:text-neon-blue"
              >
                <svg
                  aria-hidden="true"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
                LinkedIn
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${name}'s GitHub profile`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 transition-colors duration-300 hover:border-neon-blue/60 hover:text-neon-blue focus-visible:border-neon-blue/60 focus-visible:text-neon-blue"
              >
                <svg
                  aria-hidden="true"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ExecutiveCard;
