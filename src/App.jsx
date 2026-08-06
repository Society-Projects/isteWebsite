import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavbarFooter from "./Components/NavbarFooter";

// Lazy-loaded page components for optimization
const Home = lazy(() => import("./Components/Home"));
const Team = lazy(() => import("./Components/Teams/pages/Team"));
const EventPage = lazy(() => import("./Components/Events/EventPage"));
const Sponsors = lazy(() => import("./Components/Sponsors/SponsorsPage"));
const AlumniPage = lazy(() => import("./Components/Alumni/AlumniPage"));
const ProjectsPage = lazy(() => import("./Components/Projects/ProjectsPage"));
const ContactPage = lazy(() => import("./Components/ContactPage").then(module => ({ default: module.ContactPage })));

// Loading placeholder component
const PageLoader = () => (
  <div className="flex min-h-[60vh] w-full items-center justify-center bg-transparent">
    <div className="relative h-16 w-16">
      {/* Outer spinning ring */}
      <div className="absolute inset-0 rounded-full border-2 border-[#00F0FF]/20 border-t-[#00F0FF] animate-spin" />
      {/* Inner pulsing core */}
      <div className="absolute inset-2 rounded-full bg-[#0D1524] border border-[#00F0FF]/10 flex items-center justify-center animate-pulse">
        <span className="text-[9px] font-bold text-[#00F0FF] uppercase tracking-widest font-mono">ISTE</span>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="bg-transparent min-h-screen text-gray-200 antialiased selection:bg-[#00F0FF]/20">
      <NavbarFooter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/alumni" element={<AlumniPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </NavbarFooter>
    </div>
  );
}
