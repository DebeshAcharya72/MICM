import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Youtube, Lock } from "lucide-react";

export default function PortalFooter() {
  return (
    <footer className="w-full mt-auto">
      {/* Top Cyan / Blue Government Portal Utility Strip (Exact VAMNICOM Style) */}
      <div className="bg-[#0288D1] text-white py-2.5 px-4 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          {/* Quick Compliance Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-[11px] sm:text-xs">
            {/* <Link href="/downloads" className="hover:underline">
              Tender Documents
            </Link> */}
            {/* <span className="text-white/60">|</span> */}
            {/* <Link href="/rti-careers" className="hover:underline">
              Right To Information (RTI)
            </Link> */}
            {/* <span className="text-white/60">|</span> */}
            <Link href="/compliance" className="hover:underline">
              Mandatory Disclosures
            </Link>
            <span className="text-white/60">|</span>
            <Link href="/committees" className="hover:underline">
              Citizen Charter & ICC
            </Link>
            <span className="text-white/60">|</span>
            <Link href="/grievance" className="hover:underline">
              Grievance Redressal
            </Link>
            <span className="text-white/60">|</span>
            {/* <Link href="/rti-careers" className="hover:underline">
              Recruitment & Careers
            </Link> */}
            {/* <span className="text-white/60">|</span> */}
            <Link href="/admission-faqs" className="hover:underline">
              Admission FAQs
            </Link>
            <span className="text-white/60">|</span>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-3 text-white text-xs">
            <span className="text-white/80 text-[10px] hidden sm:inline">
              Connect:
            </span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-amber-200"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="hover:text-amber-200"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-amber-200"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="hover:text-amber-200"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Dark Navy Government Bar */}
      <div className="bg-[#0b1b3d] text-slate-300 py-3.5 px-4 text-[11px] border-t border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>
            Copyright © {new Date().getFullYear()}{" "}
            <strong>
              Madhusudan Institute of Co-operative Management (MICM)
            </strong>
            , Bhubaneswar.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400">
            <span>Last Update : 18-November-2026</span>
            {/* <span className="text-slate-600">|</span> */}
            {/* <span>Visitor Count <strong className="text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">534,892</strong></span> */}
            {/* <span className="text-slate-600">|</span> */}
            {/* <Link
              href="/admin"
              className="text-sky-300 hover:text-white flex items-center gap-1 font-semibold"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Login</span>
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
