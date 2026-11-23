'use client';

import React, { useState } from 'react';
import PortalHeader from '../../components/PortalHeader';
import PortalNavbar from '../../components/PortalNavbar';
import NewsTicker from '../../components/NewsTicker';
import PortalFooter from '../../components/PortalFooter';
import MobileActionBar from '../../components/MobileActionBar';
import SearchModal from '../../components/SearchModal';

export default function PublicLayout({ children }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-[#0288D1] selection:text-white pb-14 lg:pb-0">
      {/* Official National Portal Header */}
      <PortalHeader onSearchClick={() => setSearchModalOpen(true)} />

      {/* Main Portal Navigation Bar */}
      <PortalNavbar />

      {/* Latest News Scrolling Marquee Ticker */}
      <NewsTicker />

      {/* Dynamic View Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Official Portal Footer */}
      <PortalFooter />

      {/* Global Interactive Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      {/* Mobile Action Bar */}
      <MobileActionBar />
    </div>
  );
}
