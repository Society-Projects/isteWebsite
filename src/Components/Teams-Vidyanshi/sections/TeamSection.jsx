import { useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Search, Shield, Users, Award, Sparkles } from "lucide-react";

import TeamTabs from "../components/TeamTabs.jsx";
import FacultyList from "../components/FacultyList.jsx";
import ExecutiveGrid from "../components/ExecutiveGrid.jsx";
import CoreMasonry from "../components/CoreMasonry.jsx";

import defaultFaculty from "../data/faculty.js";
import defaultExecutive from "../data/executive.js";
import defaultCore from "../data/core.js";

const GROUP_RENDERERS = {
  faculty: FacultyList,
  executive: ExecutiveGrid,
  core: CoreMasonry,
};

function TeamSection({
  faculty = defaultFaculty,
  executive = defaultExecutive,
  core = defaultCore,
  defaultTab = "faculty",
  className = "",
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeKey, setActiveKey] = useState(defaultTab);

  // Smooth scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Filter datasets based on search query
  const filteredFaculty = useMemo(() => {
    if (!searchQuery.trim()) return faculty;
    return faculty.filter(f => 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.position.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [faculty, searchQuery]);

  const filteredExecutive = useMemo(() => {
    if (!searchQuery.trim()) return executive;
    return executive.filter(e => 
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.position.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [executive, searchQuery]);

  const filteredCore = useMemo(() => {
    if (!searchQuery.trim()) return core;
    return core.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [core, searchQuery]);

  const groups = useMemo(
    () => ({
      faculty: { label: "Faculty Advisors", data: filteredFaculty, total: faculty.length },
      executive: { label: "Executive Board", data: filteredExecutive, total: executive.length },
      core: { label: "Core Team", data: filteredCore, total: core.length },
    }),
    [filteredFaculty, filteredExecutive, filteredCore, faculty.length, executive.length, core.length]
  );

  const tabKeys = Object.keys(groups);

  const tabs = tabKeys.map((key) => ({
    key,
    label: groups[key].label,
    count: groups[key].total,
  }));

  const ActiveGroup = GROUP_RENDERERS[activeKey];
  const activeData = groups[activeKey]?.data ?? [];

  return (
    <section
      aria-labelledby="team-section-heading"
      className={`relative w-full overflow-hidden bg-transparent pt-32 pb-24 px-6 md:px-16 lg:px-24 ${className}`}
    >
      {/* 🧭 Smooth Scroll Progress Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-sky-500 origin-left z-[10000] shadow-[0_0_10px_#0EA5E9]"
        style={{ scaleX }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10">
        {/* Section Header with Scroll Entrance */}
        <motion.div
          id="team-section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-5 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs font-semibold tracking-wider text-sky-400 uppercase">Leadership & Core</span>
          </div>

          <h1 className="page-heading text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
            THE TEAM
          </h1>
          <div className="h-1 w-20 bg-sky-500 rounded-full" />

          <p className="text-slate-300 font-normal text-base md:text-lg leading-relaxed">
            Working across disciplines to create a collaborative space that nurtures engineering visions, ideas, and technical leadership.
          </p>

          {/* Search + Tab Switcher Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full mt-4 p-3 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-xl">
            <TeamTabs tabs={tabs} activeKey={activeKey} onChange={setActiveKey} />

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search member by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Dynamic Active Group Panel with Scroll Fade */}
        <motion.div
          id={`panel-${activeKey}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeKey}`}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="min-h-[300px] pt-4"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey + searchQuery}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeData.length > 0 ? (
                <ActiveGroup data={activeData} />
              ) : (
                <div className="text-center py-16 text-slate-400">
                  <p className="text-sm font-semibold">No team members match "{searchQuery}" in this category.</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-2 text-xs text-sky-400 underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default TeamSection;
