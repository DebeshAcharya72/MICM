'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  FileText, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck,
  Building2,
  Users,
  GraduationCap
} from 'lucide-react';
import { portalData } from '../data/portalData';
import { api } from '../services/api';

const DEFAULT_BANNER_SLIDES = [
  {
    id: 1,
    title: "CONGRATULATIONS",
    subtitle: "FOR SECURING TOP HONOURS IN THE EASTERN REGION COOPERATIVE MANAGEMENT CONCLAVE",
    location: "AT NATIONAL COOPERATIVE SUMMIT",
    students: [
      { name: "ADARSH MOHANTY", batch: "MBA (2025-27)", rank: "First Rank" },
      { name: "GURU PRASAD DAS", batch: "MBA (2025-27)", rank: "Distinction" },
      { name: "SUBHASHREE NAYAK", batch: "HDCM (2025-26)", rank: "Top Merit" }
    ],
    bg: "from-[#0c2a5c] via-[#103a7d] to-[#0c2a5c]",
    image_url: null
  },
  {
    id: 2,
    title: "PIONEERING LEGACY",
    subtitle: "SERVING COOPERATIVE MANAGEMENT AND ADMINISTRATIVE CAPACITY BUILDING SINCE 1955-56",
    location: "MINISTRY OF CO-OPERATION, GOVT. OF INDIA",
    students: [
      { name: "AICTE APPROVED", batch: "2-Year MBA", rank: "BPUT Affiliated" },
      { name: "NCCT UNIT", batch: "New Delhi", rank: "Apex Body" },
      { name: "3.4 ACRES", batch: "Nayapalli, BBSR", rank: "Green Campus" }
    ],
    bg: "from-[#093a47] via-[#0288D1] to-[#093a47]",
    image_url: null
  }
];

export default function Home() {
  const [activeNewsTab, setActiveNewsTab] = useState('coop');
  const [bannerSlides, setBannerSlides] = useState(DEFAULT_BANNER_SLIDES);
  const [bannerSlide, setBannerSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch dynamic banners from backend API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await api.getBanners(true);
        if (data && Array.isArray(data) && data.length > 0) {
          setBannerSlides(data);
        }
      } catch (err) {
        console.warn('Could not load dynamic banners, using preloaded slides:', err);
      }
    };
    fetchBanners();
  }, []);

  // Auto-scroll banner slides every 5 seconds (pausing on hover)
  useEffect(() => {
    if (bannerSlides.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setBannerSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerSlides.length, isPaused]);

  const handlePrevSlide = () => {
    setBannerSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setBannerSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const currentBanner = bannerSlides[bannerSlide] || DEFAULT_BANNER_SLIDES[0];

  return (
    <div className="bg-[#f4f6f9] pb-12">
      
      {/* ========================================================
          HERO BANNER SLIDER (Exact VAMNICOM Blue Banner from Image 1)
          Now fully auto-scrollable & CMS customizable by Admin
      ======================================================== */}
      <section 
        className="relative overflow-hidden shadow-md border-b-2 border-amber-400 select-none group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className={`py-8 sm:py-12 px-4 sm:px-8 relative transition-all duration-700 ${
            currentBanner.image_url ? 'bg-[#0B1B3D]' : `bg-gradient-to-r ${currentBanner.bg || 'from-[#0c2a5c] via-[#103a7d] to-[#0c2a5c]'}`
          }`}
          style={currentBanner.image_url ? {
            backgroundImage: `url('${currentBanner.image_url}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : {}}
        >
          {/* Custom Image Dark Gradient Overlay for contrast and readability */}
          {currentBanner.image_url && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c2a5c]/95 via-[#0c2a5c]/85 to-[#0c2a5c]/90 backdrop-blur-[1px]"></div>
          )}
          
          {/* Subtle Watermark Crest */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
            <GraduationCap className="w-96 h-96 text-white" />
          </div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left Banner Title Area */}
            <div className="text-center lg:text-left space-y-2.5 max-w-xl">
              {/* Official MICM Logo Badge in Hero Banner */}
              <div className="inline-flex items-center gap-2 bg-white py-1 px-3 rounded-md shadow-md border border-amber-300">
                <img
                  src="/micm-logo.png"
                  alt="MICM Bhubaneswar"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                <span>Madhusudan Institute of Co-operative Management (MICM)</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400 tracking-tight leading-tight uppercase drop-shadow-sm">
                {currentBanner.title}
              </h1>

              <p className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
                {currentBanner.subtitle}
              </p>

              <div className="pt-2">
                <span className="inline-block bg-white/15 px-3 py-1 rounded text-xs font-black tracking-widest text-amber-300 border border-white/20">
                  {currentBanner.location}
                </span>
              </div>
            </div>

            {/* Right: Round Scholar Badges (Exact VAMNICOM Style) */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              {(currentBanner.students || []).map((student, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-amber-400 bg-white shadow-lg overflow-hidden flex items-center justify-center p-1">
                    <div className="w-full h-full rounded-full bg-slate-800 text-amber-300 flex flex-col items-center justify-center p-1">
                      <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8" />
                      <span className="text-[8px] font-black uppercase text-amber-400 tracking-tighter mt-0.5">
                        {student.rank}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-xs sm:text-[13px] text-white mt-2 block tracking-tight">
                    {student.name}
                  </span>
                  <span className="text-[10px] text-amber-200 font-semibold block">
                    {student.batch}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Banner Slider Controls */}
          {bannerSlides.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/75 text-white transition-all shadow-md group-hover:scale-105 z-20"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/75 text-white transition-all shadow-md group-hover:scale-105 z-20"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Slider Dots / Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                {bannerSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setBannerSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      bannerSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}

        </div>
      </section>


      {/* ========================================================
          MAIN HOMEPAGE 4-COLUMN SECTION (Image 1 Layout)
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* ROW 1: Dignitaries (Left) | Quick Links | Announcements | Dignitaries (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Column 1: Left Dignitaries (Ministers) - lg:col-span-2 */}
          <div className="lg:col-span-2 space-y-3.5">
            {portalData.dignitaries.left.map((dig, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-300 rounded p-3 text-center shadow-2xs hover:shadow-xs transition-shadow flex flex-col items-center justify-between min-h-[160px]"
              >
                <div className="w-16 h-20 rounded border border-slate-300 bg-slate-100 overflow-hidden shadow-2xs mb-2">
                  <img
                    src={dig.image}
                    alt={dig.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 leading-tight">
                    {dig.name}
                  </h4>
                  <p className="text-[10px] text-red-700 font-semibold mt-1 leading-snug">
                    {dig.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Quick Links Box - lg:col-span-4 */}
          <div className="lg:col-span-4 bg-white border border-slate-300 rounded shadow-2xs flex flex-col">
            <div className="border-b border-slate-200 px-4 py-3 bg-slate-50 flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-red-700 tracking-wide">
                Quick Links
              </h3>
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Resources
              </span>
            </div>

            <div className="p-3 divide-y divide-slate-100 max-h-[500px] overflow-y-auto text-xs flex-1">
              {portalData.quickLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="py-2 px-1.5 flex items-start gap-2 text-slate-800 hover:text-[#0288D1] hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-slate-400 font-bold group-hover:text-[#0288D1]">{'>'}</span>
                  <span className="flex-1 font-medium leading-snug">{item.title}</span>
                  {item.isNew && (
                    <span className="bg-red-600 text-white font-bold text-[8px] px-1 py-0.2 rounded-xs uppercase shrink-0">
                      NEW
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Announcements Box - lg:col-span-4 */}
          <div className="lg:col-span-4 bg-white border border-slate-300 rounded shadow-2xs flex flex-col">
            <div className="border-b border-slate-200 px-4 py-3 bg-slate-50 flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-red-700 tracking-wide">
                Announcements
              </h3>
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Updates
              </span>
            </div>

            <div className="p-3 divide-y divide-slate-100 max-h-[500px] overflow-y-auto text-xs flex-1">
              {portalData.announcements.map((item, idx) => (
                <div key={idx} className="py-2.5 px-1.5 space-y-1">
                  <Link
                    href={item.link}
                    className="flex items-start gap-2 text-slate-800 hover:text-[#0288D1] transition-colors group"
                  >
                    <span className="text-slate-400 font-bold group-hover:text-[#0288D1]">{'>'}</span>
                    <span className="flex-1 font-semibold leading-snug">{item.title}</span>
                  </Link>
                  <div className="pl-4 flex items-center gap-2 text-[10px] text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{item.date}</span>
                    {item.isNew && (
                      <span className="bg-amber-500 text-slate-900 font-bold px-1 rounded text-[8px] uppercase">
                        Notice
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Right Dignitaries (Secretaries & Director) - lg:col-span-2 */}
          <div className="lg:col-span-2 space-y-3.5">
            {portalData.dignitaries.right.map((dig, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-300 rounded p-3 text-center shadow-2xs hover:shadow-xs transition-shadow flex flex-col items-center justify-between min-h-[160px]"
              >
                <div className="w-16 h-20 rounded border border-slate-300 bg-slate-100 overflow-hidden shadow-2xs mb-2">
                  <img
                    src={dig.image}
                    alt={dig.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 leading-tight">
                    {dig.name}
                  </h4>
                  <p className="text-[10px] text-red-700 font-semibold mt-1 leading-snug">
                    {dig.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>


        {/* ROW 2: Reports (Left) | Upcoming Training Programmes (Center) | Cooperative News (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left: Reports Box (lg:col-span-3) */}
          <div className="lg:col-span-3 bg-white border border-slate-300 rounded shadow-2xs">
            <div className="border-b border-slate-200 px-4 py-3 bg-slate-50">
              <h3 className="font-serif font-bold text-base text-red-700 tracking-wide">
                Reports
              </h3>
            </div>
            <div className="p-3 divide-y divide-slate-100 text-xs">
              {portalData.reports.map((rep, idx) => (
                <Link
                  key={idx}
                  href={rep.link}
                  className="py-2.5 px-1 flex items-start gap-2 text-slate-800 hover:text-[#0288D1] transition-colors group"
                >
                  <span className="text-slate-400 font-bold group-hover:text-[#0288D1]">{'>'}</span>
                  <span className="font-semibold leading-snug">{rep.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Upcoming Training Programmes at MICM (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-white border border-slate-300 rounded shadow-2xs overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-red-700 tracking-wide">
                Upcoming Training Programmes at MICM
              </h3>
              <Link href="/programmes" className="text-xs font-bold text-[#0288D1] hover:underline">
                View Calendar
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#0288D1] text-white text-[11px] uppercase font-bold">
                    <th className="py-2 px-2.5 text-center border-r border-sky-400 w-10">S.No.</th>
                    <th className="py-2 px-3 border-r border-sky-400">Title</th>
                    <th className="py-2 px-2 border-r border-sky-400 whitespace-nowrap">From Date</th>
                    <th className="py-2 px-2 border-r border-sky-400 whitespace-nowrap">To Date</th>
                    <th className="py-2 px-2 border-r border-sky-400 whitespace-nowrap">Venue</th>
                    <th className="py-2 px-2 text-center whitespace-nowrap">Know More</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {portalData.upcomingTrainings.map((tr) => (
                    <tr key={tr.sno} className="hover:bg-sky-50/60 transition-colors">
                      <td className="py-2.5 px-2 text-center font-bold text-slate-600 border-r border-slate-200">
                        {tr.sno}
                      </td>
                      <td className="py-2.5 px-3 text-slate-900 font-semibold leading-tight border-r border-slate-200">
                        {tr.title}
                      </td>
                      <td className="py-2.5 px-2 text-slate-700 border-r border-slate-200 whitespace-nowrap text-[11px]">
                        {tr.fromDate}
                      </td>
                      <td className="py-2.5 px-2 text-slate-700 border-r border-slate-200 whitespace-nowrap text-[11px]">
                        {tr.toDate}
                      </td>
                      <td className="py-2.5 px-2 text-slate-700 border-r border-slate-200 whitespace-nowrap text-[11px]">
                        {tr.venue}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <Link
                          href={tr.link}
                          className="text-[#0288D1] font-bold hover:underline inline-flex items-center gap-0.5 text-[11px]"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Cooperative News / What's New Tabbed Panel (lg:col-span-3) */}
          <div className="lg:col-span-3 bg-white border border-slate-300 rounded shadow-2xs">
            <div className="flex border-b border-slate-200 text-xs font-bold bg-slate-50">
              <button
                type="button"
                onClick={() => setActiveNewsTab('coop')}
                className={`flex-1 py-3 px-2 text-center transition-colors border-r border-slate-200 ${
                  activeNewsTab === 'coop'
                    ? 'text-red-700 font-serif font-extrabold border-b-2 border-red-700 bg-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cooperative News
              </button>
              <button
                type="button"
                onClick={() => setActiveNewsTab('whatsnew')}
                className={`flex-1 py-3 px-2 text-center transition-colors ${
                  activeNewsTab === 'whatsnew'
                    ? 'text-red-700 font-serif font-extrabold border-b-2 border-red-700 bg-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Whats New
              </button>
            </div>

            <div className="p-3 divide-y divide-slate-100 text-xs max-h-[380px] overflow-y-auto">
              {portalData.cooperativeNews.map((item, idx) => (
                <div key={idx} className="py-2.5 px-1 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 block">
                    {item.date}
                  </span>
                  <p className="text-slate-800 font-medium leading-snug">
                    {item.title}
                  </p>
                  <Link
                    href={item.link}
                    className="text-[#0288D1] text-[11px] font-bold hover:underline inline-block uppercase tracking-wider"
                  >
                    KNOW MORE
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
