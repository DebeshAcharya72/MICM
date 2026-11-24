"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  GraduationCap,
} from "lucide-react";
import { portalData } from "../data/portalData";

export default function PortalHeader({ onSearchClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [selectedLang, setSelectedLang] = useState("English");
  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchClick) {
      onSearchClick(searchQuery);
    } else {
      router.push(`/programmes?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleFontChange = (delta) => {
    const newOffset = Math.max(-2, Math.min(4, fontSizeOffset + delta));
    setFontSizeOffset(newOffset);
    if (newOffset === 0) {
      document.documentElement.style.fontSize = "";
    } else {
      document.documentElement.style.fontSize = `${100 + newOffset * 6}%`;
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 relative z-40">
      {/* Top Floating / Right Social Strip (Exactly like VAMNICOM screenshot) */}
      <div className="fixed right-0 top-1/3 z-50 hidden lg:flex flex-col shadow-lg rounded-l-md overflow-hidden text-white text-xs font-bold">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          className="w-9 h-9 bg-[#3b5998] hover:opacity-90 flex items-center justify-center transition-opacity"
        >
          <Facebook className="w-4 h-4" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
          className="w-9 h-9 bg-[#00acee] hover:opacity-90 flex items-center justify-center transition-opacity"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="w-9 h-9 bg-[#0077b5] hover:opacity-90 flex items-center justify-center transition-opacity"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          className="w-9 h-9 bg-[#cd201f] hover:opacity-90 flex items-center justify-center transition-opacity"
        >
          <Youtube className="w-4 h-4" />
        </a>
      </div>

      {/* Main Official Header Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left: Official Emblem + Bilingual Name & Ministry Details */}
          <Link
            href="/"
            className="flex items-center gap-3.5 sm:gap-5 text-left group"
          >
            {/* Official MICM Logo Image */}
            <div className="shrink-0 bg-white p-1 rounded-full border border-slate-200 shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center">
              <img
                src="/micm-logo.png"
                alt="Madhusudan Institute of Co-operative Management (MICM) Logo"
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-full"
              />
            </div>

            {/* Typography Stack (Exact VAMNICOM Style) */}
            <div className="flex flex-col">
              <h2 className="font-serif text-emerald-800 font-bold text-sm sm:text-base lg:text-lg leading-tight">
                {portalData.instituteHindi}
              </h2>
              <h1 className="font-serif text-emerald-800 font-black text-base sm:text-lg lg:text-xl leading-tight">
                {portalData.instituteEnglish}
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-700 font-semibold leading-tight mt-0.5">
                {portalData.subHindi}
              </p>
              <p className="text-[10px] sm:text-xs text-slate-700 font-medium leading-tight">
                {portalData.subEnglish}
              </p>
              <p className="text-[9px] sm:text-[11px] text-slate-600 font-medium leading-tight mt-0.5">
                सहकारिता मंत्रालय, Ministry of Cooperation, भारत सरकार,
                Government of India
              </p>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-wide mt-0.5">
                GSTIN No. : {portalData.gstin} &nbsp;|&nbsp; PAN :{" "}
                {portalData.pan}
              </p>
            </div>
          </Link>

          {/* Right: Search, Language, Font Resizer, Azadi 75 Logo */}
          <div className="flex flex-col items-center sm:items-end gap-2.5 shrink-0 w-full sm:w-auto">
            {/* Top Utility Controls: Search, Lang, Font */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-xs">
              {/* Search Bar with Blue Button */}
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Portal..."
                    className="w-36 sm:w-44 px-2.5 py-1 text-xs border border-r-0 border-slate-300 rounded-l focus:outline-none focus:border-[#0288D1] bg-slate-50"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Search"
                  className="px-2.5 py-1 bg-[#0288D1] hover:bg-[#0277bd] text-white rounded-r flex items-center justify-center transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Language Selector */}
              {/* <div className="border border-slate-300 rounded px-2 py-0.5 bg-slate-50 text-[11px] text-slate-700 flex items-center gap-1">
                <span>Select Language</span>
                <span className="text-[9px]">▼</span>
              </div> */}

              {/* Font Resizer [ - A + ] */}
              <div className="flex items-center border border-[#0288D1] rounded overflow-hidden text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => handleFontChange(-1)}
                  className="px-1.5 py-0.5 bg-[#0288D1] text-white hover:bg-[#0277bd] transition-colors"
                  title="Decrease Font Size"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => handleFontChange(0)}
                  className="px-2 py-0.5 bg-[#0288D1] text-white border-x border-[#0277bd] hover:bg-[#0277bd] transition-colors"
                  title="Reset Font Size"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => handleFontChange(1)}
                  className="px-1.5 py-0.5 bg-[#0288D1] text-white hover:bg-[#0277bd] transition-colors"
                  title="Increase Font Size"
                >
                  +
                </button>
              </div>
            </div>

            {/* Azadi Ka Amrit Mahotsav 75 Logo & National Emblem */}
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className="block text-amber-700 font-black text-sm tracking-wider font-serif">
                    75
                  </span>
                  <span className="block text-[8px] font-bold text-slate-800 uppercase tracking-tighter -mt-1">
                    Azadi Ka Amrit Mahotsav
                  </span>
                </div>
                <div className="h-8 w-12 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded flex items-center justify-center shadow-xs border border-slate-200">
                  <div className="w-3.5 h-3.5 rounded-full border border-blue-900 flex items-center justify-center text-[5px] text-blue-900 font-bold">
                    ☸
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
