import React from "react";

const projects = [
  {
    id: "society-tracker",
    title: "Society Tracker",
    tag: "MANAGEMENT PORTAL",
    description: "Streamlined web platform built to empower student societies by simplifying event workflows, recruitment pipelines, and announcement dispatches.",
    tech: ["React.js", "PostgreSQL", "TailwindCSS"],
    website: "https://soc-tracker.netlify.app/",
    github: "https://github.com/Armaan-debug-1/society-tracker",
    testId: "test@test.com",
    password: "test123"
  },
  {
    id: "fairfare",
    title: "Fairfare",
    tag: "WEB PLATFORM",
    description: "Fair-fare is a web platform that lets users compare real-time taxi fares across different ride-hailing services instantly to find the best rate.",
    tech: ["React", "Node.js", "TailwindCSS", "REST API"],
    website: "#",
    github: "#",
    testId: "",
    password: ""
  },
  {
    id: "time-capsule",
    title: "Time Capsule",
    tag: "UTILITY APP",
    description: "Write digital messages and memories to yourself or friends that remain locked and only become viewable after a specified target date.",
    tech: ["React", "Express", "MongoDB", "Framer Motion"],
    website: "#",
    github: "#",
    testId: "",
    password: ""
  },
  {
    id: "fintech",
    title: "FinTech Dashboard",
    tag: "FINANCE SYSTEM",
    description: "Personal finance and investment tracker enabling users to monitor spending, track income, and receive personalized portfolio advice.",
    tech: ["React", "TypeScript", "Chart.js", "Firebase"],
    website: "#",
    github: "#",
    testId: "",
    password: ""
  },
  {
    id: "project-five",
    title: "Project Five",
    tag: "TAG HERE",
    description: "Add a short description of this project here.",
    tech: ["Tech 1", "Tech 2", "Tech 3"],
    website: "#",
    github: "#",
    testId: "",
    password: ""
  },
  {
    id: "project-six",
    title: "Project Six",
    tag: "TAG HERE",
    description: "Add a short description of this project here.",
    tech: ["Tech 1", "Tech 2", "Tech 3"],
    website: "#",
    github: "#",
    testId: "",
    password: ""
  }
];

export default function ProjectsPage() {
  return (
    <section className="relative w-full min-h-screen bg-transparent text-white pt-32 pb-24 px-6 md:px-16 lg:px-24">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[10%] left-[10%] w-[25rem] h-[25rem] bg-[#0B3D91]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[50%] right-[10%] w-[30rem] h-[30rem] bg-[#00F0FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-display px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#0D1524] text-[#00F0FF] rounded-full border border-[#00F0FF]/20 shadow-sm">
            Our Repositories & Products
          </span>
          <h1 className="page-heading text-4xl sm:text-5xl md:text-6xl tracking-tight">
            OUR PROJECTS
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00F0FF] via-[#0B3D91] to-[#041C4A] rounded-full" />
          <p className="text-slate-300 font-normal text-base md:text-lg leading-relaxed">
            Explore the wide spectrum of robust web platforms, mobile utilities, and developer tools natively designed and built by our core development teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-[1.5px] rounded-2xl bg-gradient-to-b from-[#0B3D91] via-[#00B4D8] to-[#041C4A] shadow-xl group transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,240,255,0.2)]"
            >
              <div className="p-6 rounded-[14px] bg-[#0D1524] relative overflow-hidden flex flex-col justify-between h-full space-y-4">
                <div className="space-y-2.5">
                  <span className="font-display text-[8px] font-bold text-[#00F0FF] tracking-[0.2em] uppercase block">
                    {project.tag}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors uppercase">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {project.description}
                  </p>

                  {(project.testId || project.password) && (
                    <div className="pt-1 space-y-1 text-[10px] text-slate-400">
                      {project.testId && (
                        <p>
                          <span className="text-slate-500 font-semibold uppercase tracking-wide">Test ID: </span>
                          {project.testId}
                        </p>
                      )}
                      {project.password && (
                        <p>
                          <span className="text-slate-500 font-semibold uppercase tracking-wide">Password: </span>
                          {project.password}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-semibold px-2 py-0.5 rounded bg-[#02040A] text-slate-300 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href={project.website}
                      className="btn-primary-glow w-full text-center inline-block text-xs py-2"
                    >
                      View Website
                    </a>
                    <a
                      href={project.github}
                      className="w-full text-center inline-block text-xs py-2 rounded-md border border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
                    >
                      View Repository
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
