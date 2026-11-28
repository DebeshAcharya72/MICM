"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  GraduationCap,
  Briefcase,
  Newspaper,
  Bell,
} from "lucide-react";
import { api } from "../services/api";
import { portalData } from "../data/portalData";

export default function Home() {
  const [activeNewsTab, setActiveNewsTab] = useState("coop");

  // Initialize bannerSlides as an empty array
  const [bannerSlides, setBannerSlides] = useState([]);
  const [bannerSlide, setBannerSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Dynamic CMS Data States
  const [trainings, setTrainings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [notices, setNotices] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [coopNews, setCoopNews] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);

  // Fetch dynamic homepage datasets from API
  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const [bannersRes, trRes, anRes, plRes, cnRes, qlRes, notRes] =
          await Promise.allSettled([
            api.getBanners(true),
            api.getTrainings(),
            api.getAnnouncements(),
            api.getPlacements(),
            api.getCoopNews(),
            api.getQuickLinks(),
            api.getNotices(false),
          ]);

        if (
          bannersRes.status === "fulfilled" &&
          Array.isArray(bannersRes.value)
        ) {
          setBannerSlides(bannersRes.value);
        }
        if (trRes.status === "fulfilled" && Array.isArray(trRes.value)) {
          setTrainings(trRes.value);
        }
        if (anRes.status === "fulfilled" && Array.isArray(anRes.value)) {
          setAnnouncements(anRes.value);
        }
        if (plRes.status === "fulfilled" && Array.isArray(plRes.value)) {
          setPlacements(plRes.value);
        }
        if (cnRes.status === "fulfilled" && Array.isArray(cnRes.value)) {
          setCoopNews(cnRes.value);
        }
        if (qlRes.status === "fulfilled" && Array.isArray(qlRes.value)) {
          setQuickLinks(qlRes.value);
        }
        if (notRes.status === "fulfilled" && Array.isArray(notRes.value)) {
          setNotices(notRes.value);
        }
      } catch (err) {
        console.warn("Could not load dynamic homepage data:", err);
      }
    };

    fetchHomepageData();
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

  // Safely get the current banner. If no banners exist, this is undefined.
  const currentBanner = bannerSlides[bannerSlide];

  return (
    <div className="bg-[#f4f6f9] pb-12">
      {/* ========================================================
          HERO BANNER SLIDER (Only renders if API returns data)
      ======================================================== */}
      {bannerSlides.length > 0 && (
        <section
          className="relative w-full overflow-hidden shadow-md border-b-2 border-amber-400 select-none group bg-[#0B1B3D]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full overflow-hidden bg-slate-900">
            {bannerSlides.map((slide, idx) => (
              <div
                key={slide.id || idx}
                className={`transition-opacity duration-700 ease-in-out ${
                  bannerSlide === idx
                    ? "opacity-100 relative"
                    : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              >
                {/* Desktop & Tablet (Auto-height maintaining ratio) */}
                <img
                  src={slide.image_url}
                  alt={`Hero Banner ${idx + 1}`}
                  className="hidden md:block w-full h-auto object-contain"
                />

                {/* Mobile (Content-fit / centered crop preserving readability) */}
                <img
                  src={slide.image_url}
                  alt={`Hero Banner ${idx + 1}`}
                  className="block md:hidden w-full object-contain object-center"
                />
              </div>
            ))}

            {/* Slider Controls (Arrows & Dots) */}
            {bannerSlides.length > 1 && (
              <>
                {/* Left Arrow */}
                <div className="absolute inset-y-0 left-0 flex items-center z-10 pl-2 sm:pl-4 pointer-events-none">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/75 text-white transition-all shadow-md group-hover:scale-105"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Right Arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center z-10 pr-2 sm:pr-4 pointer-events-none">
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/75 text-white transition-all shadow-md group-hover:scale-105"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Slider Dots / Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-full">
                  {bannerSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBannerSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        bannerSlide === idx
                          ? "w-6 bg-amber-400"
                          : "w-2 bg-white/60 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* ========================================================
          MAIN HOMEPAGE SECTION (12-Column Dashboard Layout)
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* ======================================================
            ROW 1 (Top Section): 2 | 3 | 4 | 3 Grid Layout
        ====================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Col 1 (Left) col-span-12 lg:col-span-2: Dignitaries (Left) */}
          <div className="col-span-12 lg:col-span-2 space-y-3 order-1 lg:order-none">
            {portalData.dignitaries.left.map((d, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-md p-1 text-center shadow-xs hover:shadow-sm transition-shadow flex flex-col items-center justify-between"
              >
                <div className="w-20 h-24 rounded-t-md border border-slate-200 bg-slate-100 overflow-hidden shadow-2xs mb-2">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2 text-center leading-tight">
                    {d.name}
                  </h4>
                  <p className="text-[10px] text-orange-600 font-semibold text-center px-2 pb-2 mt-1 leading-snug">
                    {d.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Col 2 (Middle-Left) col-span-12 lg:col-span-3: Quick Links */}
          <div className="col-span-12 lg:col-span-3 bg-white border border-slate-200 rounded-md shadow-xs flex flex-col order-3 lg:order-none">
            <div className="border-b border-slate-200 px-4 py-3 bg-slate-50 flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-red-700 tracking-wide flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4 text-red-700" />
                <span>Quick Links</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Portals
              </span>
            </div>

            <div className="p-3 divide-y divide-slate-100 max-h-[400px] overflow-y-auto text-xs flex-1">
              {quickLinks.map((ql, idx) => (
                <div key={ql.id || idx} className="py-2.5 px-1.5">
                  <a
                    href={ql.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 text-slate-800 hover:text-[#0288D1] transition-colors group"
                  >
                    <span className="flex items-center gap-2 font-medium leading-snug group-hover:underline">
                      <span className="text-slate-400 font-bold group-hover:text-[#0288D1] shrink-0">
                        {">"}
                      </span>
                      <span>{ql.title}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0288D1] shrink-0" />
                  </a>
                </div>
              ))}
              {quickLinks.length === 0 && (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No quick links configured.
                </div>
              )}
            </div>
          </div>

          {/* Col 3 (Middle-Right) col-span-12 lg:col-span-4: Announcements */}
          <div className="col-span-12 lg:col-span-5 bg-white border border-slate-200 rounded-md shadow-xs flex flex-col order-4 lg:order-none">
            <div className="border-b border-slate-200 px-4 py-3 bg-slate-50 flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-red-700 tracking-wide flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-red-700" />
                <span>Announcements</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Circulars
              </span>
            </div>

            <div className="p-3 divide-y divide-slate-100 max-h-[400px] overflow-y-auto text-xs flex-1">
              {(announcements.length > 0 ? announcements : notices).map(
                (item, idx) => (
                  <div key={item.id || idx} className="py-2.5 px-1.5 space-y-1">
                    <a
                      href={item.pdf_url || item.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 text-slate-800 hover:text-[#0288D1] transition-colors group"
                    >
                      <span className="text-slate-400 font-bold group-hover:text-[#0288D1] shrink-0 mt-0.5">
                        {">"}
                      </span>
                      <span className="flex-1 font-semibold leading-snug group-hover:underline">
                        {item.title}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0288D1] shrink-0 mt-0.5" />
                    </a>
                    <div className="pl-4 flex items-center gap-2 text-[10px] text-slate-500">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.date}</span>
                      {Boolean(item.is_new) && (
                        <span className="bg-red-600 text-white font-bold text-[8px] px-1.5 py-0.2 rounded-xs uppercase">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>
                ),
              )}
              {announcements.length === 0 && notices.length === 0 && (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No active announcements found.
                </div>
              )}
            </div>
          </div>

          {/* Col 4 (Right) col-span-12 lg:col-span-3: Dignitaries (Right) */}
          <div className="col-span-12 lg:col-span-2 space-y-3 order-2 lg:order-none">
            {portalData.dignitaries.right.map((d, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-md p-1 text-center shadow-xs hover:shadow-sm transition-shadow flex flex-col items-center justify-between"
              >
                <div className="w-20 h-24 rounded-t-md border border-slate-200 bg-slate-100 overflow-hidden shadow-2xs mb-2">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2 text-center leading-tight">
                    {d.name}
                  </h4>
                  <p className="text-[10px] text-orange-600 font-semibold text-center px-2 pb-2 mt-1 leading-snug">
                    {d.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================
            ROW 2 (Bottom Section): 2 | 7 | 3 Grid Layout
        ====================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Col 3 (Right) col-span-12 lg:col-span-3: Cooperative News / What's New */}
          <div className="col-span-12 lg:col-span-3 bg-white border border-slate-200 rounded-md shadow-xs">
            <div className="flex border-b border-slate-200 text-xs font-bold bg-slate-50">
              <div
                onClick={() => setActiveNewsTab("coop")}
                className={`flex-1 py-3 px-2 text-center transition-colors border-r border-slate-200 ${
                  activeNewsTab === "coop"
                    ? "text-red-700 font-serif font-extrabold border-b-2 border-red-700 bg-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Cooperative News
              </div>
            </div>

            <div className="p-3 divide-y divide-slate-100 text-xs max-h-[380px] overflow-y-auto">
              {coopNews.map((item, idx) => (
                <div key={item.id || idx} className="py-2.5 px-1 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 block">
                    {item.date}
                  </span>
                  <p className="text-slate-800 font-medium leading-snug">
                    {item.title}
                  </p>
                  {item.link && item.link !== "#" ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0288D1] text-[11px] font-bold hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>KNOW MORE</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : null}
                </div>
              ))}
              {coopNews.length === 0 && (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No cooperative news updates found.
                </div>
              )}
            </div>
          </div>

          {/* Col 2 (Middle) col-span-12 lg:col-span-7: Upcoming Training Programmes at MICM */}
          <div className="col-span-12 lg:col-span-7 bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="w-full text-center">
                <h3 className="font-serif font-bold text-base text-red-700 tracking-wide inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-700" />
                  <span>Upcoming Training Programmes at MICM</span>
                </h3>
              </div>
              <Link
                href="/programmes"
                className="text-xs font-bold text-[#0288D1] hover:underline whitespace-nowrap shrink-0 ml-2"
              >
                View Calendar
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#0288D1] text-white text-[11px] uppercase font-bold">
                    <th className="py-2.5 px-2.5 text-center border-r border-sky-400 w-10">
                      S.No.
                    </th>
                    <th className="py-2.5 px-3 border-r border-sky-400">
                      Title
                    </th>
                    <th className="py-2.5 px-2 border-r border-sky-400 whitespace-nowrap">
                      From Date
                    </th>
                    <th className="py-2.5 px-2 border-r border-sky-400 whitespace-nowrap">
                      To Date
                    </th>
                    <th className="py-2.5 px-2 border-r border-sky-400 whitespace-nowrap">
                      Venue
                    </th>
                    <th className="py-2.5 px-2 text-center whitespace-nowrap">
                      Know More
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {trainings.map((tr, idx) => (
                    <tr
                      key={tr.id || idx}
                      className="hover:bg-sky-50/60 transition-colors"
                    >
                      <td className="py-2.5 px-2 text-center font-bold text-slate-600 border-r border-slate-200">
                        {idx + 1}
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
                        {tr.link && tr.link !== "#" ? (
                          <a
                            href={tr.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0288D1] font-bold hover:underline inline-flex items-center gap-0.5 text-[11px]"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>PDF</span>
                          </a>
                        ) : (
                          <span className="text-slate-400 text-[11px]">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {trainings.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-slate-400 text-xs"
                      >
                        No upcoming training programmes scheduled at this
                        moment.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Col 1 (Left) col-span-12 lg:col-span-2: Notice Board */}
          <div className="col-span-12 lg:col-span-2 bg-white border border-slate-200 rounded-md shadow-xs flex flex-col">
            <div className="border-b border-slate-200 px-3 py-3 bg-slate-50 flex items-center justify-between">
              <h3 className="font-serif font-bold text-xs sm:text-sm text-red-700 tracking-wide flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-red-700 shrink-0" />
                <span className="truncate">Notice Board</span>
              </h3>
            </div>

            <div className="p-2.5 divide-y divide-slate-100 max-h-[400px] overflow-y-auto text-xs flex-1">
              {notices.map((item, idx) => (
                <div key={item.id || idx} className="py-2.5 px-1 space-y-1">
                  <a
                    href={item.link || "#"}
                    target={
                      item.link && item.link.startsWith("http")
                        ? "_blank"
                        : "_self"
                    }
                    rel="noopener noreferrer"
                    className="block text-slate-800 font-semibold text-[11px] leading-snug hover:text-[#0288D1] transition-colors"
                  >
                    {item.title}
                  </a>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{item.date}</span>
                    {Boolean(item.is_new) && (
                      <span className="bg-red-600 text-white font-bold text-[8px] px-1.5 py-0.2 rounded-xs uppercase ml-auto">
                        NEW
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {notices.length === 0 && (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No active notices found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
