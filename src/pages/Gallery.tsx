import React, { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader';
import LightboxModal from '../components/common/LightboxModal';
import galleryData from '../data/gallery.json';
import { GalleryItem } from '../types';
import { Maximize2, Sparkles } from 'lucide-react';

const categories = ['All', 'Events', 'Workshops', 'Team', 'Projects', 'Achievements'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const items: GalleryItem[] = galleryData as GalleryItem[];

  const filteredItems = items.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const activeItem = activeImageIndex !== null ? filteredItems[activeImageIndex] : null;

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Chapter Chronicles"
        title="Photo Gallery & Moments"
        description="Capturing memories from hackathons, technical symposiums, orientation ceremonies, and team achievements."
      />

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold font-mono transition-all border ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setActiveImageIndex(idx)}
            className="group relative rounded-2xl overflow-hidden glass-card border border-slate-800 cursor-pointer h-72"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Top Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-semibold">
                {item.category}
              </span>
            </div>

            {/* Hover Expand Icon */}
            <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize2 className="w-4 h-4" />
            </div>

            {/* Bottom Content Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <Sparkles className="w-3 h-3" />
                <span>{item.date}</span>
              </div>
              <h3 className="text-white font-bold text-lg font-heading line-clamp-1">{item.title}</h3>
              {item.description && (
                <p className="text-slate-400 text-xs line-clamp-2 mt-1">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && activeImageIndex !== null && (
        <LightboxModal
          isOpen={true}
          imageSrc={activeItem.image}
          title={activeItem.title}
          description={activeItem.description}
          onClose={() => setActiveImageIndex(null)}
          onPrev={
            activeImageIndex > 0
              ? () => setActiveImageIndex(activeImageIndex - 1)
              : undefined
          }
          onNext={
            activeImageIndex < filteredItems.length - 1
              ? () => setActiveImageIndex(activeImageIndex + 1)
              : undefined
          }
        />
      )}
    </div>
  );
}
