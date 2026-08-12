import { motion } from "framer-motion";
import { ShieldCheck, Award } from "lucide-react";

function FacultyCard({ faculty, index = 0 }) {
  const { image, name, position, description } = faculty;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -2 }}
      className="group relative rounded-xl border border-slate-800 bg-[#0F172A] p-6 md:p-8 shadow-lg hover:border-slate-700 transition-all duration-200 mb-6 text-left"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        {/* Avatar Container */}
        <div className="relative shrink-0">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-[#070D19] border border-slate-700 p-1 shadow-md">
            <div className="w-full h-full rounded-lg overflow-hidden bg-slate-900">
              {image ? (
                <img
                  src={image}
                  alt={`Portrait of ${name}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`Portrait placeholder for ${name}`}
                  className="flex h-full w-full items-center justify-center font-display text-3xl font-bold text-slate-500"
                >
                  {name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Container */}
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-sky-400 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{position}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-sky-400 transition-colors">
              {name}
            </h3>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
            <p className="text-slate-300 font-normal text-sm leading-relaxed">
              "{description}"
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default FacultyCard;
