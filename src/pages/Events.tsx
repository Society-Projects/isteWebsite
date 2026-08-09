import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import LightboxModal from '../components/common/LightboxModal';
import eventsData from '../data/events.json';
import { EventItem, EventCategory } from '../types';
import { Calendar, MapPin, Users, ExternalLink, X, Tag } from 'lucide-react';

const categories: (EventCategory | 'All')[] = [
  'All',
  'Workshops',
  'Hackathons',
  'Competitions',
  'Technical Sessions',
  'Guest Lectures',
  'Collaborations',
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const events: EventItem[] = eventsData as EventItem[];

  const filteredEvents = events.filter((e) => {
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesTiming =
      activeTab === 'all'
        ? true
        : activeTab === 'upcoming'
        ? e.isUpcoming
        : !e.isUpcoming;
    return matchesCategory && matchesTiming;
  });

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="ISTE Initiatives & Activities"
        title="Events & Technical Workshops"
        description="Immerse yourself in competitive coding, technical symposiums, hands-on masterclasses, and national hackathons."
      />

      {/* Timing Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-slate-800">
          {[
            { id: 'all', label: 'All Events' },
            { id: 'upcoming', label: 'Upcoming Events' },
            { id: 'past', label: 'Past Archives' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold font-mono transition-all ${
                activeTab === t.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold font-mono transition-all border ${
              selectedCategory === cat
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Cards Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 p-8 glass-panel rounded-2xl max-w-md mx-auto">
          <p className="text-slate-400 text-sm font-mono">No events found matching this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl glass-card border border-slate-800 overflow-hidden flex flex-col group cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="relative h-52 bg-slate-900 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent opacity-60" />
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
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-mono mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  <h3 className="text-white text-xl font-bold font-heading mb-2 group-hover:text-cyan-400 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                    {event.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {event.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[11px] font-mono border border-slate-800">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 group-hover:underline">
                    View Speakers & Details →
                  </span>
                  {event.registrationUrl && event.isUpcoming && (
                    <span className="px-3 py-1 rounded-lg bg-cyan-500 text-black text-xs font-bold font-mono">
                      Register
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= EVENT DETAILS MODAL ================= */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0b1220] border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl my-8">
            {/* Modal Header Image */}
            <div className="relative h-64 bg-slate-900">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-black/40 to-transparent" />
              <button
                onClick={() => setSelectedEvent(null)}
                aria-label="Close Event Modal"
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-400 text-cyan-300 font-mono text-xs font-semibold mb-2 inline-block">
                  {selectedEvent.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">{selectedEvent.title}</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Event Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>{selectedEvent.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-400" />
                  <span>{selectedEvent.isUpcoming ? 'Status: Upcoming' : 'Status: Concluded'}</span>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h4 className="text-white font-semibold text-sm font-heading mb-2">About Event</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{selectedEvent.description}</p>
              </div>

              {/* Speakers */}
              {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold text-sm font-heading mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>Featured Speakers & Mentors</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedEvent.speakers.map((s, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-xs font-mono">
                          {s.name[0]}
                        </div>
                        <div>
                          <div className="text-white font-semibold text-xs">{s.name}</div>
                          <div className="text-slate-400 text-[11px]">{s.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Gallery */}
              {selectedEvent.galleryImages && selectedEvent.galleryImages.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold text-sm font-heading mb-3">Event Photo Highlights</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {selectedEvent.galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxImage(img)}
                        className="h-20 rounded-lg overflow-hidden bg-slate-900 cursor-pointer border border-slate-800 hover:border-cyan-400 transition-colors"
                      >
                        <img src={img} alt="Event highlight" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800"
                >
                  Close
                </button>
                {selectedEvent.registrationUrl && selectedEvent.isUpcoming && (
                  <a
                    href={selectedEvent.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold font-mono hover:shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                  >
                    <span>Register Now</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Event Gallery Images */}
      {lightboxImage && (
        <LightboxModal
          isOpen={true}
          imageSrc={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
}
