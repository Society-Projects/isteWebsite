import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import teamsData from '../data/teams.json';
import { TeamMember, TeamSection } from '../types';
import { Linkedin, Github, Mail, Building, Award, GraduationCap } from 'lucide-react';

const sections: { id: TeamSection | 'all'; label: string }[] = [
  { id: 'all', label: 'All Teams' },
  { id: 'faculty', label: 'Faculty Advisors' },
  { id: 'eb', label: 'Executive Board' },
  { id: 'core', label: 'Core Members' },
  { id: 'alumni', label: 'Alumni Network' },
];

export default function Teams() {
  const [activeSection, setActiveSection] = useState<TeamSection | 'all'>('all');

  const members: TeamMember[] = teamsData as TeamMember[];

  const facultyMembers = members.filter((m) => m.section === 'faculty');
  const ebMembers = members.filter((m) => m.section === 'eb');
  const coreMembers = members.filter((m) => m.section === 'core');
  const alumniMembers = members.filter((m) => m.section === 'alumni');

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="The Minds Behind ISTE"
        title="Faculty, Leadership & Alumni"
        description="Meet the dedicated mentors, executive board officers, core developers, and distinguished alumni driving technological excellence."
      />

      {/* Section Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold font-mono transition-all border ${
              activeSection === sec.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* ================= 1. FACULTY ADVISORS ================= */}
      {(activeSection === 'all' || activeSection === 'faculty') && (
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white font-heading">Faculty Advisors</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facultyMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl glass-card border border-cyan-500/30 p-6 flex flex-col sm:flex-row gap-6 items-center"
              >
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-cyan-500/40 shadow-xl">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
                    {member.department}
                  </span>
                  <h4 className="text-xl font-bold text-white font-heading">{member.name}</h4>
                  <p className="text-cyan-400 text-sm font-medium">{member.role}</p>
                  {member.bio && <p className="text-slate-400 text-xs leading-relaxed">{member.bio}</p>}
                  <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-slate-400 hover:text-cyan-400">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 2. EXECUTIVE BOARD (EB) ================= */}
      {(activeSection === 'all' || activeSection === 'eb') && (
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
            <div className="p-2 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white font-heading">Executive Board (EB)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ebMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl glass-card border border-slate-800 p-5 flex flex-col justify-between group hover:border-purple-500/40"
              >
                <div>
                  <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4 bg-slate-900">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-purple-950/90 border border-purple-500/40 text-purple-300 font-mono text-xs font-semibold">
                      {member.role}
                    </div>
                  </div>

                  <h4 className="text-white font-bold text-lg font-heading group-hover:text-purple-400 transition-colors">
                    {member.name}
                  </h4>
                  {member.department && (
                    <p className="text-slate-400 text-xs font-mono mb-2">{member.department}</p>
                  )}
                  {member.bio && (
                    <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">{member.bio}</p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 3. CORE TEAM ================= */}
      {(activeSection === 'all' || activeSection === 'core') && (
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white font-heading">Core Team Members</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {coreMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl glass-card border border-slate-800 p-4 text-center group hover:border-emerald-500/40"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden mb-3 border-2 border-slate-700 group-hover:border-emerald-400 transition-colors">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-white font-bold text-sm sm:text-base font-heading group-hover:text-emerald-400 transition-colors">
                  {member.name}
                </h4>
                <p className="text-emerald-400 text-xs font-mono mb-2">{member.role}</p>

                <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-800/80">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 4. ALUMNI NETWORK ================= */}
      {(activeSection === 'all' || activeSection === 'alumni') && (
        <div>
          <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
            <div className="p-2 rounded-lg bg-blue-950/80 border border-blue-500/40 text-blue-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white font-heading">Alumni Network</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumniMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl glass-card border border-slate-800 p-5 flex items-center gap-4 group hover:border-blue-500/40"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden">
                  <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/30 text-blue-300 font-mono text-[10px]">
                    {member.batch}
                  </span>
                  <h4 className="text-white font-bold text-base font-heading truncate mt-1">{member.name}</h4>
                  <p className="text-slate-400 text-xs font-mono">{member.role}</p>
                  <p className="text-cyan-400 text-xs font-medium truncate mt-0.5">
                    {member.position} @ {member.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
