import React, { Suspense, lazy } from 'react';
import { Sparkles, Calendar, Code, ArrowRight, ShieldCheck, Cpu, Users, Globe, Terminal, ExternalLink } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import eventsData from '../data/events.json';
import projectsData from '../data/projects.json';
import sponsorsData from '../data/sponsors.json';
import { EventItem, ProjectItem, Sponsor } from '../types';

// Lazy load 3D Canvas
const HeroCanvas = lazy(() => import('../components/Three/HeroCanvas'));

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export default function Home({ setActiveTab }: HomeProps) {
  const featuredEvents: EventItem[] = (eventsData as EventItem[]).filter((e) => e.featured).slice(0, 3);
  const featuredProjects: ProjectItem[] = (projectsData as ProjectItem[]).filter((p) => p.featured).slice(0, 3);
  const sponsors: Sponsor[] = sponsorsData as Sponsor[];

  return (
    <div className="min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* 3D Three.js Hero Canvas */}
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-[#080c14] flex items-center justify-center text-cyan-400 font-mono text-sm">
              <span className="animate-pulse">Loading 3D Visualizer...</span>
            </div>
          }
        >
          <HeroCanvas />
        </Suspense>

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080c14]/60 to-[#080c14] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-6 shadow-xl animate-float">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ISTE STUDENT CHAPTER 2026</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight font-heading max-w-5xl mx-auto leading-[1.1] mb-6">
            Pioneering Innovation Through{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500 bg-clip-text text-transparent glow-cyan">
              Technological Excellence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            The premier student-led technology organization fostering artificial intelligence, full-stack engineering, competitive coding, robotics, and creative design leadership.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <span>Join ISTE Chapter</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveTab('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full glass-panel hover:bg-slate-800/80 text-slate-200 border border-slate-700/80 font-semibold text-sm tracking-wide hover:border-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Explore Events</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full glass-panel hover:bg-slate-800/80 text-slate-200 border border-slate-700/80 font-semibold text-sm tracking-wide hover:border-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <Code className="w-4 h-4 text-purple-400" />
              <span>View Projects</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= STATS COUNTER SECTION ================= */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 rounded-2xl glass-panel border border-cyan-500/20 shadow-2xl">
          {[
            { label: 'Active Members', value: '500+', icon: Users, color: 'text-cyan-400' },
            { label: 'Events Organized', value: '45+', icon: Calendar, color: 'text-purple-400' },
            { label: 'Projects Built', value: '30+', icon: Code, color: 'text-emerald-400' },
            { label: 'Years Excellence', value: '10+', icon: ShieldCheck, color: 'text-blue-400' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-slate-400 text-xs sm:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ISTE SECTION ================= */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image Graphic */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden glass-panel border border-slate-800">
                <img
                  src="/team.jpg"
                  alt="ISTE Core Team"
                  className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-slate-700/60">
                  <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">ISTE Core Leadership</p>
                  <p className="text-white text-sm font-semibold">Fostering technical innovation & student empowerment.</p>
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="space-y-6">
              <SectionHeader
                eyebrow="Who We Are"
                title="Building the Engineers & Leaders of Tomorrow"
                centered={false}
              />

              <p className="text-slate-300 text-base leading-relaxed">
                The **International Society for Technology in Education (ISTE)** Student Chapter is a vibrant community of passionate developers, researchers, designers, and innovators. We organize technical workshops, hackathons, guest lectures, and collaborative projects.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    title: 'Hands-on Workshops',
                    desc: 'Master AI, Cloud Native, IoT, CyberSecurity, and Web Development.',
                    icon: Cpu,
                  },
                  {
                    title: 'Hackathons & Contests',
                    desc: '24-hour coding sprints with real-world problems and cash rewards.',
                    icon: Terminal,
                  },
                  {
                    title: 'Industry Mentorship',
                    desc: 'Connect with alumni and tech leads from Google, Meta, and Microsoft.',
                    icon: Globe,
                  },
                  {
                    title: 'Community Projects',
                    desc: 'Build open-source applications that solve campus & societal challenges.',
                    icon: ShieldCheck,
                  },
                ].map((pillar, idx) => (
                  <div key={idx} className="p-4 rounded-xl glass-card border border-slate-800">
                    <pillar.icon className="w-5 h-5 text-cyan-400 mb-2" />
                    <h3 className="text-white font-semibold text-sm font-heading mb-1">{pillar.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED EVENTS SECTION ================= */}
      <section className="py-20 bg-slate-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Flagship Activities"
            title="Featured Events & Workshops"
            description="Participate in our upcoming technical challenges and learn from industry pioneers."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl glass-card border border-slate-800 overflow-hidden flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold">
                    {event.category}
                  </div>
                  {event.isUpcoming && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold animate-pulse">
                      Upcoming
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-2">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{event.date}</span>
                    </div>
                    <h3 className="text-white text-xl font-bold font-heading mb-2 group-hover:text-cyan-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                      {event.shortDescription}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('events');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black border border-slate-800 text-slate-200 text-xs font-semibold font-mono transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setActiveTab('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-sm font-semibold transition-all"
            >
              <span>Explore All Events & Past Archives</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROJECTS SECTION ================= */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Student Innovation"
            title="Featured Technical Projects"
            description="Explore software applications, IoT hardware, and AI tools crafted by ISTE members."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <div key={project.id} className="rounded-2xl glass-card border border-slate-800 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs">
                      {project.category}
                    </span>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <h3 className="text-white text-xl font-bold font-heading mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded bg-slate-900 text-slate-300 text-[11px] font-mono border border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contributors */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500">Contributors:</span>
                    <div className="flex -space-x-2">
                      {project.contributors.map((c, idx) => (
                        <img
                          key={idx}
                          src={c.avatar || '/istelogo.png'}
                          alt={c.name}
                          className="w-7 h-7 rounded-full border-2 border-[#080c14] object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setActiveTab('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel hover:bg-slate-800 text-purple-400 border border-purple-500/30 text-sm font-semibold transition-all"
            >
              <span>Browse Full Project Repository</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= SPONSORS MARQUEE SECTION ================= */}
      <section className="py-16 bg-slate-950/60 border-y border-slate-800/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-8">
          <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Proudly Supported By Industry Partners</p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee gap-12 items-center">
            {[...sponsors, ...sponsors].map((sponsor, idx) => (
              <div
                key={idx}
                className="h-16 px-6 py-3 rounded-xl glass-panel border border-slate-800 flex items-center justify-center shrink-0 hover:border-cyan-500/40 transition-colors"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-10 w-auto max-w-[140px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="py-24 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10 glass-panel p-12 rounded-3xl border border-cyan-500/30 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading mb-4">
            Ready to shape the future of technology?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Become part of ISTE Student Chapter to level up your skills, participate in regional hackathons, and connect with inspiring mentors.
          </p>
          <button
            onClick={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>Apply For Membership</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
