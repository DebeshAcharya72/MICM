import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PortalHeader from './components/PortalHeader';
import PortalNavbar from './components/PortalNavbar';
import NewsTicker from './components/NewsTicker';
import PortalFooter from './components/PortalFooter';
import ScrollToTop from './components/ScrollToTop';
import SearchModal from './components/SearchModal';

import Home from './pages/Home';
import About from './pages/About';
import Mous from './pages/Mous';
import Programmes from './pages/Programmes';
import Faculty from './pages/Faculty';
import Facilities from './pages/Facilities';
import Library from './pages/Library';
import Newsletter from './pages/Newsletter';
import Contact from './pages/Contact';

export default function App() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-[#0288D1] selection:text-white">
        
        {/* Official National Portal Header */}
        <PortalHeader onSearchClick={() => setSearchModalOpen(true)} />
        
        {/* Main Portal Navigation Bar */}
        <PortalNavbar />
        
        {/* Latest News Scrolling Ticker */}
        <NewsTicker />

        {/* Main Dynamic View Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            {/* NEW: Collaboration -> MoU's */}
            <Route path="/collaboration" element={<Navigate to="/collaboration/mous" replace />} />
            <Route path="/collaboration/mous" element={<Mous />} />
            <Route path="/mous" element={<Mous />} />
            
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/facilities" element={<Facilities />} />
            
            {/* NEW: Library */}
            <Route path="/library" element={<Library />} />
            
            {/* NEW: Newsletter */}
            <Route path="/newsletter" element={<Newsletter />} />
            
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Official Portal Footer */}
        <PortalFooter />

        {/* Global Interactive Search Modal */}
        <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
      </div>
    </Router>
  );
}
