import { motion } from "framer-motion";

/**
 * Generic tab switcher. Renders whatever tabs it's given — nothing about
 * "faculty/executive/core" is hardcoded here, so it can drive any group
 * switcher elsewhere on the site.
 *
 * tabs: [{ key, label, count }]
 */
function TeamTabs({ tabs, activeKey, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Team group"
      className="glass-panel inline-flex items-center gap-1 rounded-full border border-neon-blue/10 p-1"
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <button
            key={tab.key}
            role="tab"
            type="button"
            id={`tab-${tab.key}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.key}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.key)}
            className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-none sm:px-5 ${
              isActive
                ? "border-neon-blue/30 text-white"
                : "border-white/10 text-white/50 hover:border-neon-blue/30 hover:text-white/80"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="team-tab-pill"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-darkblue-900 via-darkblue-500 to-neon-blue shadow-glow-blue"
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.label}
              {typeof tab.count === "number" && (
                <span className="font-mono text-[10px] text-white/50">
                  {String(tab.count).padStart(2, "0")}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default TeamTabs;
