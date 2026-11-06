import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Search, 
  Menu, 
  X, 
  GraduationCap, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Twitter,
  ChevronRight
} from 'lucide-react';
import { instituteData } from '../data/instituteData';
import SearchModal from './SearchModal';
import ApplyModal from './ApplyModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programmes', path: '/programmes' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="w-full z-40 top-0 left-0">
        {/* A. Top Contact Bar (Slim Navy Blue #0B1B3D) */}
        <div className="bg-brand-navy text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-brand-navy-light/40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            {/* Left: Contact Info */}
            <div className="flex items-center space-x-6">
              <a 
                href={`mailto:${instituteData.email}`} 
                className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-brand-yellow group-hover:scale-110 transition-transform" />
                <span className="font-medium">{instituteData.email}</span>
              </a>
              <span className="hidden sm:inline text-slate-500">|</span>
              <a 
                href={`tel:${instituteData.phone.replace(/[^0-9+]/g, '')}`} 
                className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors group"
              >
                <Phone className="w-3.5 h-3.5 text-brand-yellow group-hover:scale-110 transition-transform" />
                <span className="font-medium">{instituteData.phone}</span>
              </a>
            </div>

            {/* Right: Social Media Icons */}
            <div className="flex items-center space-x-3 text-slate-300">
              <span className="text-[11px] text-slate-400 hidden md:inline">Follow MICM:</span>
              <a 
                href={instituteData.socialLinks.facebook} 
                target="_blank" 
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-brand-yellow transition-colors p-1 hover:bg-white/5 rounded"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a 
                href={instituteData.socialLinks.instagram} 
                target="_blank" 
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-brand-yellow transition-colors p-1 hover:bg-white/5 rounded"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href={instituteData.socialLinks.youtube} 
                target="_blank" 
                rel="noreferrer"
                aria-label="YouTube"
                className="hover:text-brand-yellow transition-colors p-1 hover:bg-white/5 rounded"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a 
                href={instituteData.socialLinks.linkedin} 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-brand-yellow transition-colors p-1 hover:bg-white/5 rounded"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href={instituteData.socialLinks.twitter} 
                target="_blank" 
                rel="noreferrer"
                aria-label="Twitter / X"
                className="hover:text-brand-yellow transition-colors p-1 hover:bg-white/5 rounded"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* B. Main Sticky Navigation */}
        <nav 
          className={`w-full bg-white transition-all duration-300 sticky top-0 z-40 ${
            isScrolled 
              ? 'shadow-md py-3 border-b border-slate-100' 
              : 'py-4 border-b border-slate-200/80 shadow-soft'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left: Branding */}
            <Link to="/" className="flex items-center gap-3.5 group">
              {/* Academic Crest / Emblem */}
              <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center text-brand-yellow shadow-md group-hover:scale-105 transition-transform shrink-0 border border-brand-yellow/30">
                <GraduationCap className="w-7 h-7" />
              </div>

              {/* Text Identity */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-black text-2xl tracking-tight text-brand-navy group-hover:text-brand-navy-light transition-colors">
                    MICM
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-yellow/20 text-brand-navy border border-brand-yellow/50 uppercase tracking-widest hidden sm:inline-block">
                    Estd. 1955-56
                  </span>
                </div>
                <span className="text-xs font-semibold text-brand-body leading-tight hidden lg:block tracking-wide">
                  Madhusudan Institute of Co-operative Management
                </span>
                <span className="text-[11px] text-slate-500 font-medium block lg:hidden">
                  Bhubaneswar, Odisha
                </span>
              </div>
            </Link>

            {/* Center: Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${
                      isActive
                        ? 'text-brand-navy font-bold bg-brand-light shadow-sm'
                        : 'text-brand-slate hover:text-brand-navy hover:bg-slate-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-brand-yellow rounded-full"></span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right: Search & Apply Button */}
            <div className="flex items-center space-x-3">
              {/* Functional Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search website"
                className="p-2.5 rounded-lg text-brand-navy hover:text-brand-navy-muted hover:bg-brand-light transition-all duration-200 flex items-center justify-center border border-slate-200/70"
                title="Search (Programs, Faculty, Facilities)"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Yellow Apply Now Button */}
              <button
                type="button"
                onClick={() => setApplyOpen(true)}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>Apply Now</span>
              </button>

              {/* Mobile Hamburger Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 rounded-lg text-brand-navy hover:bg-brand-light transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
              <div className="px-4 pt-3 pb-6 space-y-1.5">
                <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Navigation
                </div>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-brand-navy text-white'
                          : 'text-brand-slate hover:bg-brand-light hover:text-brand-navy'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </NavLink>
                ))}

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setApplyOpen(true);
                    }}
                    className="w-full py-3 rounded-lg bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold text-sm text-center shadow-sm"
                  >
                    Apply Now for Admission
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSearchOpen(true);
                    }}
                    className="w-full py-2.5 rounded-lg border border-slate-300 text-brand-navy font-semibold text-xs text-center flex items-center justify-center gap-2"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search Entire Catalog</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Functional Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ApplyModal isOpen={applyOpen} onClose={() => setApplyOpen(false)} />
    </>
  );
}
