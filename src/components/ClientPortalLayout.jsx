'use client';

import React, { useState } from 'react';
import PortalHeader from './PortalHeader';
import PortalNavbar from './PortalNavbar';
import NewsTicker from './NewsTicker';
import PortalFooter from './PortalFooter';
import MobileActionBar from './MobileActionBar';
import SearchModal from './SearchModal';

export default function ClientPortalLayout({ children }) {
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