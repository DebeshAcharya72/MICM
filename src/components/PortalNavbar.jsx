"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, FileText, Lock } from "lucide-react";

export default function PortalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [collabDropdownOpen, setCollabDropdownOpen] = useState(false);
  const [academicsDropdownOpen, setAcademicsDropdownOpen] = useState(false);
  const [committeesDropdownOpen, setCommitteesDropdownOpen] = useState(false);
  const pathname = usePathname() || "/";

  const isAboutActive = pathname.startsWith("/about");
  const isCollabActive =
    pathname.startsWith("/collaboration") || pathname.startsWith("/mous");
  const isAcademicsActive =
    pathname.startsWith("/programmes") ||
    pathname.startsWith("/apply") ||
    pathname.startsWith("/training-calendar") ||
    pathname.startsWith("/downloads") ||
    pathname.startsWith("/admission-faqs");
  const isCommitteesActive =
    pathname.startsWith("/committees") ||
    pathname.startsWith("/grievance") ||
    pathname.startsWith("/compliance");

  const navItemClass = (active) =>
    `px-3 py-2.5 text-xs font-bold tracking-tight transition-colors ${
      active
        ? "bg-[#0288D1] text-white shadow-xs"
        : "text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]"
    }`;

  return (
    <nav className="w-full bg-[#f8fafc] border-y border-slate-300 shadow-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center flex-wrap">
            {/* Home Tab */}
            <Link href="/" className={navItemClass(pathname === "/")}>
              Home
            </Link>

            {/* About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                type="button"
                className={`px-3 py-2.5 text-xs font-bold tracking-tight flex items-center gap-1 transition-colors ${
                  isAboutActive
                    ? "bg-[#0288D1] text-white"
                    : "text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]"
                }`}
              >
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute left-0 top-full w-56 bg-white border border-slate-300 shadow-lg py-1 z-50 text-xs">
                  <Link
                    href="/about"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    History & Heritage (1955-56)
                  </Link>
                  <Link
                    href="/about#mandate"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Mandate of MICM
                  </Link>
                  <Link
                    href="/about#centres"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Centres at MICM
                  </Link>
                  <Link
                    href="/about#vision"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Vision, Mission and Focus
                  </Link>
                  <Link
                    href="/faculty"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white transition-colors"
                  >
                    Leadership & Administration
                  </Link>
                </div>
              )}
            </div>

            {/* Collaboration Dropdown (MoU's) */}
            {/* <div
              className="relative"
              onMouseEnter={() => setCollabDropdownOpen(true)}
              onMouseLeave={() => setCollabDropdownOpen(false)}
            >
              <button
                type="button"
                className={`px-3 py-2.5 text-xs font-bold tracking-tight flex items-center gap-1 transition-colors ${
                  isCollabActive
                    ? "bg-[#0288D1] text-white"
                    : "text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]"
                }`}
              >
                <span>Collaboration</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {collabDropdownOpen && (
                <div className="absolute left-0 top-full w-56 bg-white border border-slate-300 shadow-lg py-1 z-50 text-xs">
                  <Link
                    href="/collaboration/mous"
                    onClick={() => setCollabDropdownOpen(false)}
                    className="block px-4 py-2 font-bold text-[#0288D1] bg-sky-50 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    MoU's (National & International)
                  </Link>
                  <Link
                    href="/collaboration/mous#national"
                    onClick={() => setCollabDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    National Collaborations
                  </Link>
                  <Link
                    href="/collaboration/mous#international"
                    onClick={() => setCollabDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white transition-colors"
                  >
                    International Partnerships
                  </Link>
                </div>
              )}
            </div> */}

            {/* Academics & Admissions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAcademicsDropdownOpen(true)}
              onMouseLeave={() => setAcademicsDropdownOpen(false)}
            >
              <button
                type="button"
                className={`px-3 py-2.5 text-xs font-bold tracking-tight flex items-center gap-1 transition-colors ${
                  isAcademicsActive
                    ? "bg-[#0288D1] text-white"
                    : "text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]"
                }`}
              >
                <span>Academics & Admissions</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {academicsDropdownOpen && (
                <div className="absolute left-0 top-full w-64 bg-white border border-slate-300 shadow-lg py-1 z-50 text-xs">
                  <Link
                    href="/apply"
                    onClick={() => setAcademicsDropdownOpen(false)}
                    className="block px-4 py-2 font-bold text-[#0B1B3D] bg-amber-50 hover:bg-[#FFC107] border-b border-slate-100 transition-colors flex items-center justify-between"
                  >
                    <span>📝 Online Application Form</span>
                    <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black">
                      2026-27
                    </span>
                  </Link>
                  <Link
                    href="/programmes#mba-section"
                    onClick={() => setAcademicsDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    MBA (2-Year Full-Time)
                  </Link>
                  <Link
                    href="/programmes#hdcm-section"
                    onClick={() => setAcademicsDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    HDCM (36-Week Diploma)
                  </Link>
                  {/* <Link
                    href="/training-calendar"
                    onClick={() => setAcademicsDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Training Calendar & Nominations
                  </Link>
                  <Link
                    href="/downloads"
                    onClick={() => setAcademicsDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Downloads Centre (Syllabi & Circulars)
                  </Link> */}
                  <Link
                    href="/admission-faqs"
                    onClick={() => setAcademicsDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white transition-colors"
                  >
                    Admission FAQs (Eligibility & Fees)
                  </Link>
                </div>
              )}
            </div>

            {/* Placements Tab */}
            <Link
              href="/placements"
              className={navItemClass(pathname.startsWith("/placements"))}
            >
              Placements
            </Link>

            {/* Committees & Compliance Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCommitteesDropdownOpen(true)}
              onMouseLeave={() => setCommitteesDropdownOpen(false)}
            >
              <button
                type="button"
                className={`px-3 py-2.5 text-xs font-bold tracking-tight flex items-center gap-1 transition-colors ${
                  isCommitteesActive
                    ? "bg-[#0288D1] text-white"
                    : "text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]"
                }`}
              >
                <span>Committees</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {committeesDropdownOpen && (
                <div className="absolute left-0 top-full w-60 bg-white border border-slate-300 shadow-lg py-1 z-50 text-xs">
                  <Link
                    href="/committees"
                    onClick={() => setCommitteesDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Statutory Committees (ICC, Ragging)
                  </Link>
                  {/* <Link
                    href="/compliance"
                    onClick={() => setCommitteesDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    AICTE Approvals & Disclosures
                  </Link> */}
                  <Link
                    href="/grievance"
                    onClick={() => setCommitteesDropdownOpen(false)}
                    className="block px-4 py-2 font-bold text-[#0288D1] hover:bg-[#0288D1] hover:text-white transition-colors"
                  >
                    Online Grievance Redressal
                  </Link>
                </div>
              )}
            </div>

            {/* Faculty Tab */}
            <Link
              href="/faculty"
              className={navItemClass(pathname.startsWith("/faculty"))}
            >
              Faculty
            </Link>

            {/* Facilities Tab */}
            <Link
              href="/facilities"
              className={navItemClass(pathname.startsWith("/facilities"))}
            >
              Facilities
            </Link>

            {/* Library Tab */}
            <Link
              href="/library"
              className={navItemClass(pathname.startsWith("/library"))}
            >
              Library
            </Link>

            {/* Newsletter Tab */}
            {/* <Link
              href="/newsletter"
              className={navItemClass(pathname.startsWith("/newsletter"))}
            >
              Newsletter
            </Link> */}

            {/* Alumni Tab */}
            {/* <Link
              href="/alumni"
              className={navItemClass(pathname.startsWith("/alumni"))}
            >
              Alumni
            </Link> */}

            {/* RTI & Careers Tab */}
            {/* <Link
              href="/rti-careers"
              className={navItemClass(pathname.startsWith('/rti-careers'))}
            >
              Careers/RTI
            </Link> */}

            {/* Contact Tab */}
            <Link
              href="/contact"
              className={navItemClass(pathname.startsWith("/contact"))}
            >
              Contact
            </Link>
          </div>

          {/* Right Action: Apply Now & Admin CMS Link */}
          <div className="hidden lg:flex items-center gap-2 py-1.5">
            <Link
              href="/apply"
              className="bg-[#FFC107] hover:bg-amber-400 text-[#0B1B3D] text-xs font-extrabold px-3.5 py-1.5 rounded shadow-xs flex items-center gap-1.5 transition-transform hover:scale-102"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Apply Online</span>
            </Link>

            <Link
              href="/admin"
              title="Admin Portal CMS"
              className="p-1.5 text-slate-500 hover:text-[#0288D1] hover:bg-slate-200 rounded transition-colors"
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center justify-between w-full py-2.5">
            <span className="font-extrabold text-xs text-[#0B1B3D] tracking-wider uppercase">
              MICM Menu
            </span>
            <div className="flex items-center gap-2">
              <Link
                href="/apply"
                className="bg-[#FFC107] text-[#0B1B3D] text-[11px] font-bold px-2.5 py-1 rounded"
              >
                Apply
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-slate-800 hover:bg-slate-200 rounded"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-300 px-4 pt-2 pb-6 space-y-1 text-sm shadow-xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            About Us (History & Centres)
          </Link>
          <Link
            href="/collaboration/mous"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-[#0288D1] font-bold hover:bg-sky-50 rounded"
          >
            Collaboration & MoU's
          </Link>
          <Link
            href="/apply"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-amber-900 font-black bg-amber-50 rounded"
          >
            📝 Apply Online (MBA / HDCM)
          </Link>
          <Link
            href="/programmes"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Academic Programmes
          </Link>
          <Link
            href="/placements"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Placements & Recruiters
          </Link>
          <Link
            href="/training-calendar"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Training Calendar & Nominations
          </Link>
          <Link
            href="/downloads"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Downloads Centre
          </Link>
          <Link
            href="/compliance"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            AICTE Approvals & Compliance
          </Link>
          <Link
            href="/committees"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Committees (ICC, Anti-Ragging)
          </Link>
          <Link
            href="/grievance"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-rose-700 font-bold hover:bg-rose-50 rounded"
          >
            Online Grievance Redressal
          </Link>
          <Link
            href="/faculty"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Faculty Directory
          </Link>
          <Link
            href="/facilities"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Campus & Facilities
          </Link>
          <Link
            href="/library"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Library & E-Resources
          </Link>
          <Link
            href="/newsletter"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Newsletter
          </Link>
          <Link
            href="/alumni"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Alumni Association
          </Link>
          <Link
            href="/rti-careers"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Careers & RTI
          </Link>
          <Link
            href="/admission-faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Admission FAQs
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Contact Us
          </Link>
          <div className="pt-2 border-t border-slate-200">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-[#0288D1] font-bold hover:bg-sky-50 rounded"
            >
              🔒 Admin CMS Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
