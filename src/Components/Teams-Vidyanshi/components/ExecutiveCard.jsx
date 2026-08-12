import { motion } from "framer-motion";
import { LinkedinIcon } from "../../SocialIcons";
import { ExternalLink, Shield } from "lucide-react";

function ExecutiveCard({ executive, index = 0 }) {
  const { image, name, position, linkedin } = executive;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-[#0F172A] p-4 text-center space-y-3.5 hover:border-slate-700 transition-all duration-300 w-full max-w-[280px] shadow-md"
    >
      {/* Top Header: Centered Position Badge */}
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-sky-400 uppercase tracking-wider">
          <Shield className="w-3 h-3" />
          <span>{position}</span>
        </span>
      </div>

      {/* Photo Frame Container - Padded frame ring with object-top */}
      <div className="relative w-full rounded-xl overflow-hidden bg-[#070D19] border border-slate-800 p-1 group-hover:border-slate-700 transition-colors">
        <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-slate-900">
          {image ? (
            <img
              src={image}
              alt={`Portrait of ${name}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              role="img"
              aria-label={`Portrait placeholder for ${name}`}
              className="flex h-full w-full items-center justify-center font-display text-4xl font-extrabold text-slate-500"
            >
              {name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </div>
          )}
        </div>
      </div>

      {/* Info & LinkedIn Link */}
      <div className="space-y-2.5">
        <div>
          <h3 className="font-display text-base font-bold text-white tracking-tight group-hover:text-sky-400 transition-colors">
            {name}
          </h3>
          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Executive Board Member</span>
        </div>

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${name}'s LinkedIn profile`}
            className="btn-secondary-glow w-full text-center py-1.5 text-[11px] flex items-center justify-center gap-1.5 group/btn"
          >
            <LinkedinIcon className="w-3 h-3 text-sky-400" />
            <span>Connect on LinkedIn</span>
            <ExternalLink className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default ExecutiveCard;
