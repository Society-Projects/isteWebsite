import React from "react";
import { projectsData } from "./projectsData";

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

        <div className="flex flex-wrap justify-center gap-6">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="p-[1.5px] rounded-2xl bg-gradient-to-b from-[#0B3D91]/60 via-[#00B4D8]/45 to-[#041C4A]/80 shadow-[0_15px_35px_rgba(0,0,0,0.5)] group transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,240,255,0.25)] hover:scale-[1.01] w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] max-w-[380px] flex"
            >
              <div className="p-7 rounded-[14px] bg-[#0A0F1D]/90 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between h-full space-y-5 w-full">
                {/* Ambient hover glows */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-[#00F0FF]/10 to-transparent rounded-full blur-2xl group-hover:scale-120 transition-all duration-700 pointer-events-none" />
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-tr from-[#0B3D91]/5 to-transparent rounded-full blur-2xl group-hover:scale-120 transition-all duration-700 pointer-events-none" />

                <div className="space-y-3.5 z-10">
                  <span className="font-display text-[9px] font-bold text-[#00F0FF] tracking-[0.22em] uppercase block">
                    {project.tag}
                  </span>
                  <h3 className="font-display text-xl font-black text-white group-hover:text-[#00F0FF] transition-colors uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {(project.testId || project.password) && (
                    <div className="p-3 rounded-xl bg-[#030712]/50 border border-white/5 space-y-1.5 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5 mb-1 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#00F0FF]">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        Demo Access
                      </div>
                      {project.testId && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Test ID:</span>
                          <code className="text-slate-300 font-mono select-all bg-[#090d16] px-2 py-0.5 rounded border border-white/5">{project.testId}</code>
                        </div>
                      )}
                      {project.password && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Password:</span>
                          <code className="text-slate-300 font-mono select-all bg-[#090d16] px-2 py-0.5 rounded border border-white/5">{project.password}</code>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-1 z-10">
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-cyan-950/20 text-[#00F0FF] border border-[#00F0FF]/10 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#005CFF] text-white shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer"
                    >
                      Explore Live
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 duration-200">
                        <path d="M5 12h14m-7-7 7 7-7 7"/>
                      </svg>
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#030712]/60 border border-white/10 hover:border-[#00F0FF]/50 hover:bg-slate-900 text-slate-400 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                        title="View Codebase"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                    )}
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
