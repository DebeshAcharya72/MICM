import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, User, Building2, MapPin, ArrowUpRight } from 'lucide-react';
import { programmesData } from '../data/programmeData';
import { facultyData } from '../data/facultyData';
import { facilitiesData } from '../data/facilitiesData';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search items
  const staticItems = [
    { title: "About MICM", desc: "History, Vision, Mission, and Affiliations since 1955-56", path: "/about", category: "About", icon: Building2 },
    { title: "Director's Message", desc: "Institutional address from Dr. P. Kannaiah", path: "/about", category: "Leadership", icon: User },
    { title: "Admission & Eligibility", desc: "MBA through OJEE & HDCM Correspondence batch", path: "/programmes", category: "Admissions", icon: BookOpen },
    { title: "Fee Structure", desc: "Detailed breakdown of MBA (₹1,22,400) and HDCM (₹22,500)", path: "/programmes", category: "Finance", icon: BookOpen },
    { title: "Campus Location & Map", desc: "Unit-8, Nayapalli, Bhubaneswar, Odisha - 751012", path: "/contact", category: "Contact", icon: MapPin },
    { title: "Enquiry & Admissions Desk", desc: "Reach MICM by email micmbbs@gmail.com and phone +91 674 2562826", path: "/contact", category: "Contact", icon: MapPin },
  ];

  const matchedProgrammes = programmesData.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.code.toLowerCase().includes(q) || 
    p.shortDescription.toLowerCase().includes(q)
  ).map(p => ({
    title: `${p.code} – ${p.title}`,
    desc: `${p.duration} • Total Fee: ${p.totalFee} • ${p.badge}`,
    path: `/programmes`,
    category: "Programme",
    icon: BookOpen
  }));

  const matchedFaculty = facultyData.filter(f => 
    f.name.toLowerCase().includes(q) || 
    f.designation.toLowerCase().includes(q) || 
    f.department.toLowerCase().includes(q)
  ).map(f => ({
    title: f.name,
    desc: `${f.designation} — ${f.department}`,
    path: `/faculty`,
    category: "Faculty",
    icon: User
  }));

  const matchedFacilities = facilitiesData.filter(f => 
    f.title.toLowerCase().includes(q) || 
    f.subtitle.toLowerCase().includes(q) || 
    f.category.toLowerCase().includes(q)
  ).map(f => ({
    title: f.title,
    desc: `${f.subtitle} • ${f.category}`,
    path: `/facilities`,
    category: "Facility",
    icon: Building2
  }));

  const matchedStatic = staticItems.filter(s => 
    s.title.toLowerCase().includes(q) || 
    s.desc.toLowerCase().includes(q) || 
    s.category.toLowerCase().includes(q)
  );

  const results = q ? [...matchedProgrammes, ...matchedFaculty, ...matchedFacilities, ...matchedStatic] : staticItems;

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-brand-navy/70 backdrop-blur-sm transition-all duration-300">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-200 bg-brand-light">
          <Search className="w-5 h-5 text-brand-navy shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programmes, faculty, facilities, admissions..."
            autoFocus
            className="w-full bg-transparent text-brand-slate text-base md:text-lg focus:outline-none placeholder-slate-400"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-brand-slate mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-brand-navy bg-slate-200/60 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-slate-100">
          {results.length > 0 ? (
            results.map((item, idx) => {
              const Icon = item.icon || BookOpen;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.path)}
                  className="w-full text-left p-3.5 rounded-xl hover:bg-slate-50 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-brand-navy/5 text-brand-navy rounded-lg group-hover:bg-brand-yellow/20 group-hover:text-brand-navy transition-colors shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                          {item.category}
                        </span>
                        <h4 className="font-semibold text-brand-slate group-hover:text-brand-navy transition-colors text-sm md:text-base">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-brand-body mt-1 line-clamp-1">{item.desc}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-navy shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              );
            })
          ) : (
            <div className="py-12 text-center">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-brand-slate">No matching results found for "{query}"</p>
              <p className="text-xs text-brand-body mt-1">Try searching for MBA, HDCM, Library, Faculty, or Admission.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-brand-body">
          <span>Search Madhusudan Institute of Co-operative Management</span>
          <span className="font-medium text-brand-navy">MICM Bhubaneswar</span>
        </div>
      </div>
    </div>
  );
}
