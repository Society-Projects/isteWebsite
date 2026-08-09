import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Projects from './pages/Projects';
import Teams from './pages/Teams';
import Contact from './pages/Contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'events':
        return <Events />;
      case 'gallery':
        return <Gallery />;
      case 'projects':
        return <Projects />;
      case 'teams':
        return <Teams />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between overflow-x-hidden">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1">{renderActivePage()}</main>
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
