import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PortalHeader from './components/PortalHeader';
import PortalNavbar from './components/PortalNavbar';
import NewsTicker from './components/NewsTicker';
import PortalFooter from './components/PortalFooter';
import ScrollToTop from './components/ScrollToTop';
import SearchModal from './components/SearchModal';
import MobileActionBar from './components/MobileActionBar';

// Core Pages
import Home from './pages/Home';
import About from './pages/About';
import Mous from './pages/Mous';
import Programmes from './pages/Programmes';
import Faculty from './pages/Faculty';
import Facilities from './pages/Facilities';
import Library from './pages/Library';
import Newsletter from './pages/Newsletter';
import Contact from './pages/Contact';

// SOW Detailed Feature Pages
import ApplyOnline from './pages/ApplyOnline';
import Placements from './pages/Placements';
import Downloads from './pages/Downloads';
import Compliance from './pages/Compliance';
import Committees from './pages/Committees';
import Grievance from './pages/Grievance';
import TrainingCalendar from './pages/TrainingCalendar';
import AdmissionFaqs from './pages/AdmissionFaqs';
import Alumni from './pages/Alumni';
import RtiCareers from './pages/RtiCareers';
import Admin from './pages/Admin';

export default function App() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-[#0288D1] selection:text-white pb-14 lg:pb-0">
        
        {/* Official National Portal Header (Bilingual Hindi/English + Azadi 75 + Social) */}
        <PortalHeader onSearchClick={() => setSearchModalOpen(true)} />
        
        {/* Main Portal Navigation Bar */}
        <PortalNavbar />
        
        {/* Latest News Scrolling Marquee Ticker */}
        <NewsTicker />

        {/* Dynamic Page Views */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            {/* Collaboration & MoUs */}
            <Route path="/collaboration" element={<Navigate to="/collaboration/mous" replace />} />
            <Route path="/collaboration/mous" element={<Mous />} />
            <Route path="/mous" element={<Mous />} />
            
            {/* Admissions & Online Multi-Step Form */}
            <Route path="/apply" element={<ApplyOnline />} />
            <Route path="/apply-online" element={<ApplyOnline />} />
            <Route path="/admission-faqs" element={<AdmissionFaqs />} />
            
            {/* Academics & Training */}
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/training-calendar" element={<TrainingCalendar />} />
            <Route path="/downloads" element={<Downloads />} />
            
            {/* Placements & Recruiter Wall */}
            <Route path="/placements" element={<Placements />} />
            
            {/* Statutory Compliance & Committees */}
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/committees" element={<Committees />} />
            <Route path="/grievance" element={<Grievance />} />
            <Route path="/rti-careers" element={<RtiCareers />} />
            
            {/* Faculty & Campus Life */}
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/library" element={<Library />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Secure Admin Portal CMS */}
            <Route path="/admin" element={<Admin />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Official Portal Footer (Cyan compliance strip + dark navy statutory bar) */}
        <PortalFooter />

        {/* Global Interactive Search Modal */}
        <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

        {/* Mobile Action Bar (Sticky bottom on small devices: Apply, Call, WhatsApp) */}
        <MobileActionBar />
      </div>
    </Router>
  );
}