import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import projectsData from '../data/projects.json';
import { ProjectItem } from '../types';
import { Github, ExternalLink, Code2, Star, Search } from 'lucide-react';

const categories = ['All', 'Web Dev', 'AI & ML', 'Cyber Security', 'Mobile Apps', 'IoT & Hardware'];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const projects: ProjectItem[] = projectsData as ProjectItem[];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Open Source & Lab Creations"
        title="Student Projects & Hardware"
        description="Innovative technical systems, AI models, mobile applications, and embedded hardware engineered by ISTE chapter members."
      />

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-mono transition-all border ${
                selectedCategory === cat
                  ? 'bg-purple-950/80 border-purple-400 text-purple-300 shadow-md shadow-purple-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack or title..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-full text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 p-8 glass-panel rounded-2xl max-w-md mx-auto">
          <p className="text-slate-400 text-sm font-mono">No projects found matching your query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl glass-card border border-slate-800 overflow-hidden flex flex-col justify-between group"
            >
              {/* Image Preview */}
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent opacity-70" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-xs font-semibold">
                  {project.category}
                </div>
                {project.stars && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-amber-300 font-mono text-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>{project.stars}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-xl font-bold font-heading mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded bg-slate-900 text-slate-300 text-[11px] font-mono border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Contributors */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">Built by:</span>
                      <div className="flex -space-x-2">
                        {project.contributors.map((c, idx) => (
                          <img
                            key={idx}
                            src={c.avatar || '/istelogo.png'}
                            alt={c.name}
                            title={`${c.name} (${c.role})`}
                            className="w-7 h-7 rounded-full border-2 border-[#080c14] object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold font-mono flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold font-mono flex items-center justify-center gap-1.5 transition-all shadow-md shadow-purple-600/20"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
