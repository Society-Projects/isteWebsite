import { motion } from "framer-motion";

/**
 * Portfolio-style masonry card for the core team. `aspect` varies the
 * image's height so the CSS-columns masonry grid reads as hand-curated
 * rather than uniform.
 */
function CoreCard({ core, index = 0, aspect = "aspect-[3/4]", isBlurred = false }) {
  const { image, name, linkedin, github } = core;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: "easeOut" }}
      className={`glow-border group overflow-hidden rounded-xl bg-surface w-full h-full flex flex-col transition-all duration-500 ${
        isBlurred ? "blur-[3px] opacity-30 scale-[0.97] saturate-50 pointer-events-none" : ""
      }`}
    >
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        {image ? (
          <img
            src={image}
            alt={`Portrait of ${name}`}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div
            role="img"
            aria-label={`Portrait placeholder for ${name}`}
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-darkblue-700/40 to-surface font-display text-2xl text-white/20"
          >
            {name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </div>
        )}

        {/* bottom gradient + info, always visible */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 pt-10">
          <h3 className="font-display text-sm font-semibold text-white sm:text-base">
            {name}
          </h3>
          <div className="mt-2.5 flex gap-3 h-8 items-center">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${name}'s LinkedIn profile`}
                className="group/btn flex items-center h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-2.5 hover:px-3 transition-all duration-300 text-white/70 hover:text-neon-blue"
                title="LinkedIn"
              >
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="flex-shrink-0"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
                <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out group-hover/btn:max-w-[80px] group-hover/btn:opacity-100 group-hover/btn:ml-1.5 text-[9px] font-bold tracking-wider uppercase">
                  LinkedIn
                </span>
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${name}'s GitHub profile`}
                className="group/btn flex items-center h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-2.5 hover:px-3 transition-all duration-300 text-white/70 hover:text-neon-blue"
                title="GitHub"
              >
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out group-hover/btn:max-w-[80px] group-hover/btn:opacity-100 group-hover/btn:ml-1.5 text-[9px] font-bold tracking-wider uppercase">
                  GitHub
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default CoreCard;
