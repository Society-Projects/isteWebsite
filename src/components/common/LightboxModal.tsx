import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  imageSrc: string;
  title?: string;
  description?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function LightboxModal({
  isOpen,
  imageSrc,
  title,
  description,
  onClose,
  onPrev,
  onNext,
}: LightboxModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background Overlay Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close Preview"
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Left */}
      {onPrev && (
        <button
          onClick={onPrev}
          aria-label="Previous Image"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Navigation Right */}
      {onNext && (
        <button
          onClick={onNext}
          aria-label="Next Image"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div className="relative z-10 max-w-5xl max-h-[85vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden glass-panel border border-slate-700/60 p-2">
        <img
          src={imageSrc}
          alt={title || 'Gallery Preview'}
          className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl"
        />
        {(title || description) && (
          <div className="w-full p-4 text-center bg-slate-950/80 mt-2 rounded-xl">
            {title && <h4 className="text-white font-semibold text-lg font-heading">{title}</h4>}
            {description && <p className="text-slate-400 text-sm mt-1">{description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
