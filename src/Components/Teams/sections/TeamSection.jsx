import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SectionHeading from "../components/SectionHeading.jsx";
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
  eyebrow = "Our people",
  title = "THE TEAM",
  subtitle = "Working across disciplines to create a space that caters visions, ideas and relations.",
  faculty = defaultFaculty,
  executive = defaultExecutive,
  core = defaultCore,
  defaultTab = "faculty",
  className = "",
}) {
  const groups = useMemo(
    () => ({
      faculty: { label: "Faculty", data: faculty },
      executive: { label: "Executive Board", data: executive },
      core: { label: "Core Team", data: core },
    }),
    [faculty, executive, core]
  );

  const tabKeys = Object.keys(groups);
  const initialTab = tabKeys.includes(defaultTab) ? defaultTab : tabKeys[0];
  const [activeKey, setActiveKey] = useState(initialTab);

  const tabs = tabKeys.map((key) => ({
    key,
    label: groups[key].label,
    count: groups[key].data?.length ?? 0,
  }));

  const ActiveGroup = GROUP_RENDERERS[activeKey];
  const activeData = groups[activeKey]?.data ?? [];

  return (
    <section
      aria-labelledby="team-section-heading"
      className={`relative w-full overflow-hidden bg-transparent py-28 sm:py-32 ${className}`}
    >
      {/* Ambient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-lines bg-[size:56px_56px] opacity-45 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-fade opacity-70"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6">
        <div
          id="team-section-heading"
          className="flex flex-col items-center gap-8 text-center"
        >
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            align="center"
            titleClassName="page-heading text-4xl sm:text-5xl md:text-6xl text-white font-black uppercase tracking-tight"
          />
          <TeamTabs tabs={tabs} activeKey={activeKey} onChange={setActiveKey} />
        </div>

        <div
          id={`panel-${activeKey}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeKey}`}
          className="min-h-[200px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ActiveGroup data={activeData} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
