import { useState, useRef, useEffect } from "react";
import { Shield, ChevronDown, Check } from "lucide-react";
import { useTheme } from "@/utils/theme";

// Inline Custom SVGs for Dr. Doom & Iron Man to avoid external asset dependency
const DoomMaskIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ width: size, height: size }}
  >
    <path d="M12 2C6.5 2 4 6 4 11c0 3.5 1.5 6.5 4 8v3h8v-3c2.5-1.5 4-4.5 4-8 0-5-2.5-9-8-9z" fill="currentColor" fillOpacity="0.1" />
    <path d="M8 10h8" />
    <path d="M7 11.5l2.5-.5M17 11.5l-2.5-.5" />
    <circle cx="8.5" cy="11.25" r="0.6" fill="currentColor" />
    <circle cx="15.5" cy="11.25" r="0.6" fill="currentColor" />
    <path d="M12 10.5v2.5M10.5 13h3L12 10.5z" />
    <path d="M9 16.5h6" />
    <path d="M10 16.5v2M12 16.5v2M14 16.5v2" />
  </svg>
);

const ArcReactorIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ width: size, height: size }}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" fill="currentColor" fillOpacity="0.05" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isDoom = theme === "doom";
  const isIronman = theme === "ironman";

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themeList = [
    {
      id: "default",
      name: "Default Protocol",
      icon: <Shield size={16} className="text-sky-400" />,
      colorClass: "text-sky-400"
    },
    {
      id: "ironman",
      name: "Stark Protocol",
      icon: <ArcReactorIcon size={16} className="text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]" />,
      colorClass: "text-red-500"
    },
    {
      id: "doom",
      name: "Latverian Regime",
      icon: <DoomMaskIcon size={16} className="text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]" />,
      colorClass: "text-emerald-400"
    }
  ];

  const currentThemeItem = themeList.find((t) => t.id === theme) || themeList[0];

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#0F172A]/90 hover:bg-[#1E293B] hover:border-white/20 text-white/90 hover:text-white transition-all duration-200 text-xs md:text-sm font-medium backdrop-blur-md shadow-lg"
        title="Configure System Protocol"
      >
        <span className="flex items-center gap-1.5">
          {currentThemeItem.icon}
          <span className="hidden sm:inline font-space-grotesk tracking-wide">{currentThemeItem.name}</span>
        </span>
        <ChevronDown size={14} className={`opacity-60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2.5 w-48 rounded-xl border p-1 shadow-2xl backdrop-blur-2xl z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-2 ${
          isDoom 
            ? "bg-zinc-950/95 border-emerald-500/20 text-white" 
            : isIronman 
              ? "bg-zinc-950/95 border-red-500/20 text-white" 
              : "bg-zinc-950/95 border-white/10 text-white"
        }`}>
          <div className="px-2.5 py-1.5 text-[10px] font-bold font-share-tech uppercase tracking-widest text-white/40 border-b border-white/5 mb-1">
            SYSTEM INTERFACES
          </div>
          {themeList.map((t) => {
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-space-grotesk transition-all duration-150 mb-0.5 ${
                  isActive 
                    ? isDoom 
                      ? "bg-emerald-500/10 text-emerald-400 font-bold" 
                      : isIronman 
                        ? "bg-red-500/10 text-red-500 font-bold" 
                        : "bg-sky-500/10 text-sky-400 font-bold"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2">
                  {t.icon}
                  <span>{t.name.split(" ")[0]}</span>
                </span>
                {isActive && <Check size={12} className="opacity-80" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
