import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ExternalLink, Search, Key, ShieldCheck, Code, Layers, Globe, Star, Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "../SocialIcons";
import { projects, CATEGORIES } from "./projectsData.js";
import SEO from "../SEO";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Smooth scroll progress indicator bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const featuredProject = useMemo(() => projects.find((p) => p.id === "society-tracker") || projects[0], []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="relative w-full min-h-screen bg-transparent text-white pt-32 pb-24 px-6 md:px-16 lg:px-24">
      <SEO
        title="Projects"
        description="Discover cutting-edge open-source software, web apps, and tech initiatives engineered by members of ISTE Thapar Chapter (TIET)."
        keywords="tiet, iste, college society, thapar chapter, projects, student projects, open source, web development"
      />
      {/* 🧭 Smooth Scroll Progress Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-sky-500 origin-left z-[10000] shadow-[0_0_10px_#0EA5E9]"
        style={{ scaleX }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Page Header with Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs font-semibold tracking-wider text-sky-400 uppercase">Innovations & Open Source</span>
          </div>

          <h1 className="page-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-white">
            PROJECTS SHOWCASE
          </h1>
          <div className="h-1 w-20 bg-sky-500 rounded-full" />
          <p className="text-slate-300 font-normal text-base md:text-lg leading-relaxed">
            Explore web platforms, mobile utilities, and campus infrastructure engineered natively by ISTE Thapar software development teams.
          </p>
        </motion.div>

        {/* 🌟 FEATURED SPOTLIGHT HERO CARD */}
        {featuredProject && !searchQuery && selectedCategory === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl overflow-hidden"
          >
            <div className="w-full p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-left relative overflow-hidden">
              <div className="flex-1 space-y-4 z-10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> Flagship Product
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{featuredProject.metrics}</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                  {featuredProject.title}
                </h2>

                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl font-normal">
                  {featuredProject.description}
                </p>

                {/* Demo Credentials Box */}
                {featuredProject.testId && (
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 max-w-md space-y-2 text-xs font-mono">
                    <div className="flex items-center gap-2 text-sky-400 font-semibold">
                      <Key className="w-3.5 h-3.5" />
                      <span>Live Test Account</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Test ID: <strong className="text-white">{featuredProject.testId}</strong></span>
                      <button
                        onClick={() => handleCopy("hero-id", featuredProject.testId)}
                        className="text-[10px] text-sky-400 hover:underline"
                      >
                        {copiedId === "hero-id" ? "Copied!" : "Copy ID"}
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Password: <strong className="text-white">{featuredProject.password}</strong></span>
                      <button
                        onClick={() => handleCopy("hero-pass", featuredProject.password)}
                        className="text-[10px] text-sky-400 hover:underline"
                      >
                        {copiedId === "hero-pass" ? "Copied!" : "Copy Pass"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredProject.tech.map((t) => (
                    <span key={t} className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href={featuredProject.website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary-glow"
                  >
                    <span>Launch Application</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary-glow"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#0F172A] border border-slate-800 shadow-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
                    active
                      ? "bg-sky-600 text-white shadow-sm"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid with Scroll Reveal Effects */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, delay: (index % 2) * 0.1 }}
                whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
                onClick={() => setActiveModalProject(project)}
                className="group p-6 rounded-xl bg-[#0F172A] border border-slate-800 shadow-lg hover:border-sky-400/60 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-5 text-left relative overflow-hidden"
              >
                <div className="space-y-3.5">
                  {/* Top Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-sky-400 tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                      {project.tag}
                    </span>
                    <div className="p-1.5 rounded-md bg-slate-900 text-slate-400 group-hover:text-sky-400 group-hover:bg-slate-800 transition-colors">
                      <Layers className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-sky-400 transition-colors uppercase">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-300 text-xs leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Credentials Box */}
                  {(project.testId || project.password) && (
                    <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 text-[11px] font-mono">
                      <div className="flex items-center justify-between text-sky-400 font-semibold mb-1">
                        <div className="flex items-center gap-1.5">
                          <Key className="w-3 h-3 text-sky-400" />
                          <span>Demo Credentials</span>
                        </div>
                        <span className="text-[9px] text-emerald-400 font-mono">Active</span>
                      </div>
                      {project.testId && (
                        <div className="flex items-center justify-between text-slate-300">
                          <span>ID: <strong className="text-white">{project.testId}</strong></span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleCopy(project.id + "-id", project.testId); }}
                            className="text-[9px] text-sky-400 hover:underline font-bold"
                          >
                            {copiedId === project.id + "-id" ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      )}
                      {project.password && (
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Pass: <strong className="text-white">{project.password}</strong></span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleCopy(project.id + "-pass", project.password); }}
                            className="text-[9px] text-sky-400 hover:underline font-bold"
                          >
                            {copiedId === project.id + "-pass" ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-2 border-t border-slate-800/80">
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    {project.website && project.website !== "#" && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-primary-glow flex-1 text-center py-2 text-xs"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.github && project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-secondary-glow flex-1 text-center py-2 text-xs"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Code Repo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-base font-semibold">No projects match your search query.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-3 text-xs text-sky-400 underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 🔍 INTERACTIVE PROJECT MODAL */}
      {activeModalProject && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-2xl bg-[#0F172A] border border-slate-700 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative text-left"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">{activeModalProject.tag}</span>
                <h3 className="font-display text-2xl font-extrabold text-white uppercase">{activeModalProject.title}</h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {activeModalProject.description}
            </p>

            {/* Test Credentials */}
            {activeModalProject.testId && (
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-sky-400 font-semibold">
                  <Key className="w-3.5 h-3.5" />
                  <span>Test Credentials</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>ID: <strong className="text-white">{activeModalProject.testId}</strong></span>
                  <button onClick={() => handleCopy("modal-id", activeModalProject.testId)} className="text-sky-400 hover:underline">
                    {copiedId === "modal-id" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Password: <strong className="text-white">{activeModalProject.password}</strong></span>
                  <button onClick={() => handleCopy("modal-pass", activeModalProject.password)} className="text-sky-400 hover:underline">
                    {copiedId === "modal-pass" ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}

            {/* Tech Specs */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white uppercase block">Technologies Used:</span>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tech.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-slate-900 text-sky-400 border border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
              {activeModalProject.website && activeModalProject.website !== "#" && (
                <a
                  href={activeModalProject.website}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary-glow flex-1 text-center py-2.5 text-xs"
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {activeModalProject.github && activeModalProject.github !== "#" && (
                <a
                  href={activeModalProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary-glow flex-1 text-center py-2.5 text-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Source Code</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
