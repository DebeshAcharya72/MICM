import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

export default function PortalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [collabDropdownOpen, setCollabDropdownOpen] = useState(false);
  const [progDropdownOpen, setProgDropdownOpen] = useState(false);
  const location = useLocation();

  const isAboutActive = location.pathname.startsWith('/about');
  const isCollabActive = location.pathname.startsWith('/collaboration') || location.pathname.startsWith('/mous');
  const isProgActive = location.pathname.startsWith('/programmes');

  return (
    <nav className="w-full bg-[#f8fafc] border-y border-slate-300 shadow-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center flex-wrap">
            
            {/* Home Tab */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3.5 py-2.5 text-xs sm:text-[13px] font-bold tracking-tight transition-colors ${
                  isActive
                    ? 'bg-[#0288D1] text-white shadow-xs'
                    : 'text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]'
                }`
              }
            >
              Home
            </NavLink>

            {/* About Us Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                type="button"
                className={`px-3 py-2.5 text-xs sm:text-[13px] font-bold tracking-tight flex items-center gap-1 transition-colors ${
                  isAboutActive
                    ? 'bg-[#0288D1] text-white'
                    : 'text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]'
                }`}
              >
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute left-0 top-full w-56 bg-white border border-slate-300 shadow-lg py-1 z-50 text-xs">
                  <Link
                    to="/about"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    History & Heritage
                  </Link>
                  <Link
                    to="/about#mandate"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Mandate of MICM
                  </Link>
                  <Link
                    to="/about#centres"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Centres at MICM
                  </Link>
                  <Link
                    to="/about#vision"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Vision, Mission and Focus
                  </Link>
                  <Link
                    to="/faculty"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white transition-colors"
                  >
                    Leadership & Administration
                  </Link>
                </div>
              )}
            </div>

            {/* Collaboration Dropdown (NEW TAB REQUESTED!) */}
            <div 
              className="relative"
              onMouseEnter={() => setCollabDropdownOpen(true)}
              onMouseLeave={() => setCollabDropdownOpen(false)}
            >
              <button
                type="button"
                className={`px-3 py-2.5 text-xs sm:text-[13px] font-bold tracking-tight flex items-center gap-1 transition-colors ${
                  isCollabActive
                    ? 'bg-[#0288D1] text-white'
                    : 'text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]'
                }`}
              >
                <span>Collaboration</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {collabDropdownOpen && (
                <div className="absolute left-0 top-full w-56 bg-white border border-slate-300 shadow-lg py-1 z-50 text-xs">
                  <Link
                    to="/collaboration/mous"
                    onClick={() => setCollabDropdownOpen(false)}
                    className="block px-4 py-2 font-bold text-[#0288D1] bg-sky-50 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    MoU's (National & International)
                  </Link>
                  <Link
                    to="/collaboration/mous#national"
                    onClick={() => setCollabDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    National Collaborations
                  </Link>
                  <Link
                    to="/collaboration/mous#international"
                    onClick={() => setCollabDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white transition-colors"
                  >
                    International Partnerships
                  </Link>
                </div>
              )}
            </div>

            {/* Academic Programmes Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProgDropdownOpen(true)}
              onMouseLeave={() => setProgDropdownOpen(false)}
            >
              <button
                type="button"
                className={`px-3 py-2.5 text-xs sm:text-[13px] font-bold tracking-tight flex items-center gap-1 transition-colors ${
                  isProgActive
                    ? 'bg-[#0288D1] text-white'
                    : 'text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]'
                }`}
              >
                <span>Programmes</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {progDropdownOpen && (
                <div className="absolute left-0 top-full w-60 bg-white border border-slate-300 shadow-lg py-1 z-50 text-xs">
                  <Link
                    to="/programmes"
                    onClick={() => setProgDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    All Academic Programmes
                  </Link>
                  <Link
                    to="/programmes#mba-section"
                    onClick={() => setProgDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    MBA (2-Year Full Time)
                  </Link>
                  <Link
                    to="/programmes#hdcm-section"
                    onClick={() => setProgDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white transition-colors"
                  >
                    HDCM (36-Week Diploma)
                  </Link>
                </div>
              )}
            </div>

            {/* Faculty Tab */}
            <NavLink
              to="/faculty"
              className={({ isActive }) =>
                `px-3 py-2.5 text-xs sm:text-[13px] font-bold tracking-tight transition-colors ${
                  isActive
                    ? 'bg-[#0288D1] text-white'
                    : 'text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]'
                }`
              }
            >
              Faculty
            </NavLink>

            {/* Facilities Tab */}
            <NavLink
              to="/facilities"
              className={({ isActive }) =>
                `px-3 py-2.5 text-xs sm:text-[13px] font-bold tracking-tight transition-colors ${
                  isActive
                    ? 'bg-[#0288D1] text-white'
                    : 'text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]'
                }`
              }
            >
              Facilities
            </NavLink>

            {/* Library Tab (NEW TAB REQUESTED!) */}
            <NavLink
              to="/library"
              className={({ isActive }) =>
                `px-3.5 py-2.5 text-xs sm:text-[13px] font-bold tracking-tight transition-colors ${
                  isActive
                    ? 'bg-[#0288D1] text-white shadow-xs'
                    : 'text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]'
                }`
              }
            >
              Library
            </NavLink>

            {/* Newsletter Tab (NEW TAB REQUESTED!) */}
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                `px-3.5 py-2.5 text-xs sm:text-[13px] font-bold tracking-tight transition-colors ${
                  isActive
                    ? 'bg-[#0288D1] text-white shadow-xs'
                    : 'text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]'
                }`
              }
            >
              Newsletter
            </NavLink>

            {/* Contact Tab */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2.5 text-xs sm:text-[13px] font-bold tracking-tight transition-colors ${
                  isActive
                    ? 'bg-[#0288D1] text-white'
                    : 'text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]'
                }`
              }
            >
              Contact
            </NavLink>

          </div>

          {/* Right: Quick Portal Action */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/programmes"
              className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs rounded transition-colors shadow-xs"
            >
              Admission 2026-27
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center justify-between w-full py-2">
            <span className="text-xs font-bold text-[#0288D1] uppercase">
              Portal Menu
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded bg-slate-200 text-slate-800"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-300 py-2 space-y-1 text-xs font-semibold">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-800 hover:bg-[#0288D1] hover:text-white rounded"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-800 hover:bg-[#0288D1] hover:text-white rounded"
            >
              About Us (History & Mandate)
            </Link>
            <Link
              to="/collaboration/mous"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-[#0288D1] font-bold bg-sky-50 rounded"
            >
              Collaboration — MoU's
            </Link>
            <Link
              to="/programmes"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-800 hover:bg-[#0288D1] hover:text-white rounded"
            >
              Programmes (MBA & HDCM)
            </Link>
            <Link
              to="/faculty"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-800 hover:bg-[#0288D1] hover:text-white rounded"
            >
              Faculty Directory
            </Link>
            <Link
              to="/facilities"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-800 hover:bg-[#0288D1] hover:text-white rounded"
            >
              Facilities & Campus
            </Link>
            <Link
              to="/library"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-[#0288D1] font-bold bg-sky-50 rounded"
            >
              Library (Central Knowledge Resource)
            </Link>
            <Link
              to="/newsletter"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-[#0288D1] font-bold bg-sky-50 rounded"
            >
              Newsletter (MICM Sahakar Varta)
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-800 hover:bg-[#0288D1] hover:text-white rounded"
            >
              Contact Us
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
}
