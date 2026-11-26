"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, FileText, Lock } from "lucide-react";

export default function PortalNavbar() {
  const pathname = usePathname() || "/";

  // Desktop Dropdown States
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [admissionsDropdownOpen, setAdmissionsDropdownOpen] = useState(false);
  const [academicsTrainingDropdownOpen, setAcademicsTrainingDropdownOpen] =
    useState(false);
  const [studentLifeDropdownOpen, setStudentLifeDropdownOpen] = useState(false);

  // Mobile Drawer & Collapsible States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileAdmissionsOpen, setMobileAdmissionsOpen] = useState(false);
  const [mobileAcademicsTrainingOpen, setMobileAcademicsTrainingOpen] =
    useState(false);
  const [mobileStudentLifeOpen, setMobileStudentLifeOpen] = useState(false);

  // Active Route Checks
  const isAboutActive =
    pathname.startsWith("/about") ||
    pathname.startsWith("/collaboration") ||
    pathname.startsWith("/mous") ||
    pathname.startsWith("/directors-desk");

  const isAdmissionsActive =
    pathname.startsWith("/apply") || pathname.startsWith("/admission-faqs");

  const isAcademicsTrainingActive =
    pathname.startsWith("/programmes") ||
    pathname.startsWith("/training") ||
    pathname.startsWith("/training-calendar") ||
    pathname.startsWith("/downloads");

  const isStudentLifeActive =
    pathname.startsWith("/placements") || pathname.startsWith("/campus-events");

  const isFacultyActive = pathname.startsWith("/faculty");
  const isFacilitiesActive = pathname.startsWith("/facilities");
  const isAlumniActive = pathname.startsWith("/alumni");
  const isContactActive = pathname.startsWith("/contact");

  const navItemClass = (active) =>
    `px-2.5 xl:px-3 py-2.5 text-xs font-bold tracking-tight transition-colors whitespace-nowrap block ${
      active
        ? "bg-[#0288D1] text-white shadow-xs"
        : "text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]"
    }`;

  const dropdownTriggerClass = (active) =>
    `px-2.5 xl:px-3 py-2.5 text-xs font-bold tracking-tight flex items-center gap-1 transition-colors whitespace-nowrap ${
      active
        ? "bg-[#0288D1] text-white shadow-xs"
        : "text-slate-800 hover:bg-[#e2e8f0] hover:text-[#0288D1]"
    }`;

  return (
    <nav className="w-full bg-[#f8fafc] border-y border-slate-300 shadow-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* ========================================================
              DESKTOP NAVIGATION (Merged Academics & Training)
          ======================================================== */}
          <div className="hidden lg:flex items-center flex-wrap">
            {/* 1. Home */}
            <Link href="/" className={navItemClass(pathname === "/")}>
              Home
            </Link>

            {/* 2. About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                type="button"
                className={dropdownTriggerClass(isAboutActive)}
              >
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute left-0 top-full w-56 bg-white border border-slate-300 shadow-xl py-1 z-50 text-xs rounded-b-md">
                  <Link
                    href="/about#history"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    History
                  </Link>
                  <Link
                    href="/about#vision"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Vision
                  </Link>
                  <Link
                    href="/about#director"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Director's Desk
                  </Link>
                  <Link
                    href="/about#management"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Management
                  </Link>
                  <Link
                    href="/collaboration/mous"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white transition-colors"
                  >
                    MoUs
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Admissions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAdmissionsDropdownOpen(true)}
              onMouseLeave={() => setAdmissionsDropdownOpen(false)}
            >
              <button
                type="button"
                className={dropdownTriggerClass(isAdmissionsActive)}
              >
                <span>Admissions</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {admissionsDropdownOpen && (
                <div className="absolute left-0 top-full w-56 bg-white border border-slate-300 shadow-xl py-1 z-50 text-xs rounded-b-md">
                  <Link
                    href="/apply-online"
                    onClick={() => setAdmissionsDropdownOpen(false)}
                    className="block px-4 py-2 font-bold text-[#0B1B3D] bg-amber-50 hover:bg-[#FFC107] border-b border-slate-100 transition-colors flex items-center justify-between"
                  >
                    <span>Apply Online</span>
                    <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded font-black">
                      2026-27
                    </span>
                  </Link>
                  {/* <Link
                    href="/admission-faqs#fees"
                    onClick={() => setAdmissionsDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Fees & Eligibility
                  </Link> */}
                  <Link
                    href="/admission-faqs"
                    onClick={() => setAdmissionsDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white transition-colors"
                  >
                    Admission FAQs
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Academics & Training Dropdown (Merged) */}
            <div
              className="relative"
              onMouseEnter={() => setAcademicsTrainingDropdownOpen(true)}
              onMouseLeave={() => setAcademicsTrainingDropdownOpen(false)}
            >
              <button
                type="button"
                className={dropdownTriggerClass(isAcademicsTrainingActive)}
              >
                <span>Academics & Training</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {academicsTrainingDropdownOpen && (
                <div className="absolute left-0 top-full w-60 bg-white border border-slate-300 shadow-xl py-1 z-50 text-xs rounded-b-md">
                  <Link
                    href="/programmes#mba-section"
                    onClick={() => setAcademicsTrainingDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    <span className="notranslate">MBA</span> Programme
                  </Link>
                  <Link
                    href="/programmes#hdcm-section"
                    onClick={() => setAcademicsTrainingDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    <span className="notranslate">HDCM</span> Programme
                  </Link>
                  <Link
                    href="/training-calendar"
                    onClick={() => setAcademicsTrainingDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors font-semibold"
                  >
                    Training Calendar
                  </Link>
                  <Link
                    href="/training-calendar#past"
                    onClick={() => setAcademicsTrainingDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Past Programmes
                  </Link>
                  <Link
                    href="/downloads"
                    onClick={() => setAcademicsTrainingDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white transition-colors"
                  >
                    Download Syllabi
                  </Link>
                </div>
              )}
            </div>

            {/* 5. Student Life Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setStudentLifeDropdownOpen(true)}
              onMouseLeave={() => setStudentLifeDropdownOpen(false)}
            >
              <button
                type="button"
                className={dropdownTriggerClass(isStudentLifeActive)}
              >
                <span>Student Life</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {studentLifeDropdownOpen && (
                <div className="absolute left-0 top-full w-52 bg-white border border-slate-300 shadow-xl py-1 z-50 text-xs rounded-b-md">
                  <Link
                    href="/placements"
                    onClick={() => setStudentLifeDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white border-b border-slate-100 transition-colors"
                  >
                    Placements
                  </Link>
                  <Link
                    href="/campus-events"
                    onClick={() => setStudentLifeDropdownOpen(false)}
                    className="block px-4 py-2 text-slate-700 hover:bg-[#0288D1] hover:text-white transition-colors"
                  >
                    Campus Events
                  </Link>
                </div>
              )}
            </div>

            {/* 6. Faculty */}
            <Link href="/faculty" className={navItemClass(isFacultyActive)}>
              Faculty
            </Link>

            {/* 7. Facilities */}
            <Link
              href="/facilities"
              className={navItemClass(isFacilitiesActive)}
            >
              Facilities
            </Link>

            {/* 8. Alumni (Direct Link to /alumni) */}
            <Link href="/alumni" className={navItemClass(isAlumniActive)}>
              Alumni
            </Link>

            {/* 9. Contact */}
            <Link href="/contact" className={navItemClass(isContactActive)}>
              Contact
            </Link>
          </div>

          {/* Right Action: Apply Now & Admin CMS Link */}
          <div className="hidden lg:flex items-center gap-2 py-1.5">
            <Link
              href="/apply-online"
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

          {/* Mobile Menu Header Toggle */}
          <div className="lg:hidden flex items-center justify-between w-full py-2.5">
            <span className="font-extrabold text-xs text-[#0B1B3D] tracking-wider uppercase">
              MICM Menu
            </span>
            <div className="flex items-center gap-2">
              <Link
                href="/apply-online"
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

      {/* ========================================================
          MOBILE COLLAPSIBLE MENU
      ======================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-300 px-4 pt-2 pb-6 space-y-1 text-sm shadow-xl max-h-[80vh] overflow-y-auto">
          {/* 1. Home */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Home
          </Link>

          {/* 2. About Us Collapsible */}
          <div className="border-b border-slate-100 pb-1">
            <button
              type="button"
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              className="w-full flex items-center justify-between py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded text-left"
            >
              <span>About Us</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileAboutOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileAboutOpen && (
              <div className="pl-5 pr-2 py-1 space-y-1 bg-slate-50 rounded mb-1 text-xs">
                <Link
                  href="/about#history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  History
                </Link>
                <Link
                  href="/about#vision"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  Vision
                </Link>
                <Link
                  href="/about#director"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  Director's Desk
                </Link>
                <Link
                  href="/about#management"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  Management
                </Link>
                <Link
                  href="/collaboration/mous"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  MoUs
                </Link>
              </div>
            )}
          </div>

          {/* 3. Admissions Collapsible */}
          <div className="border-b border-slate-100 pb-1">
            <button
              type="button"
              onClick={() => setMobileAdmissionsOpen(!mobileAdmissionsOpen)}
              className="w-full flex items-center justify-between py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded text-left"
            >
              <span>Admissions</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileAdmissionsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileAdmissionsOpen && (
              <div className="pl-5 pr-2 py-1 space-y-1 bg-slate-50 rounded mb-1 text-xs">
                <Link
                  href="/apply-online"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 font-bold text-[#0B1B3D] text-[#0288D1]"
                >
                  Apply Online (2026-27)
                </Link>
                {/* <Link
                  href="/admission-faqs#fees"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  Fees & Eligibility
                </Link> */}
                <Link
                  href="/admission-faqs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  Admission FAQs
                </Link>
              </div>
            )}
          </div>

          {/* 4. Academics & Training Collapsible (Merged) */}
          <div className="border-b border-slate-100 pb-1">
            <button
              type="button"
              onClick={() =>
                setMobileAcademicsTrainingOpen(!mobileAcademicsTrainingOpen)
              }
              className="w-full flex items-center justify-between py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded text-left"
            >
              <span>Academics & Training</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileAcademicsTrainingOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileAcademicsTrainingOpen && (
              <div className="pl-5 pr-2 py-1 space-y-1 bg-slate-50 rounded mb-1 text-xs">
                <Link
                  href="/programmes#mba-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  <span className="notranslate">MBA</span> Programme
                </Link>
                <Link
                  href="/programmes#hdcm-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  <span className="notranslate">HDCM</span> Programme
                </Link>
                <Link
                  href="/training-calendar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1] font-semibold"
                >
                  Training Calendar
                </Link>
                <Link
                  href="/training-calendar#past"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  Past Programmes
                </Link>
                <Link
                  href="/downloads"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  Download Syllabi
                </Link>
              </div>
            )}
          </div>

          {/* 5. Student Life Collapsible */}
          <div className="border-b border-slate-100 pb-1">
            <button
              type="button"
              onClick={() => setMobileStudentLifeOpen(!mobileStudentLifeOpen)}
              className="w-full flex items-center justify-between py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded text-left"
            >
              <span>Student Life</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileStudentLifeOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileStudentLifeOpen && (
              <div className="pl-5 pr-2 py-1 space-y-1 bg-slate-50 rounded mb-1 text-xs">
                <Link
                  href="/placements"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  Placements
                </Link>
                <Link
                  href="/campus-events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 px-2 text-slate-700 hover:text-[#0288D1]"
                >
                  Campus Events
                </Link>
              </div>
            )}
          </div>

          {/* 6. Faculty */}
          <Link
            href="/faculty"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Faculty
          </Link>

          {/* 7. Facilities */}
          <Link
            href="/facilities"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Facilities
          </Link>

          {/* 8. Alumni (Direct Link to /alumni) */}
          <Link
            href="/alumni"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Alumni
          </Link>

          {/* 9. Contact */}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-slate-800 font-bold hover:bg-slate-100 rounded"
          >
            Contact
          </Link>

          {/* Admin CMS Portal Link */}
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
