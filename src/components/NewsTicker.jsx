import React from 'react';
import { Link } from 'react-router-dom';
import { Volume2, ChevronRight } from 'lucide-react';

export default function NewsTicker() {
  const tickerItems = [
    { text: "Recruitment for the Post of Registrar, Finance Officer & Assistant Director 2026", link: "/contact", isNew: true },
    { text: "MBA 2026-28 Admissions: Centralized Counselling through OJEE Rank List", link: "/programmes", isNew: true },
    { text: "Admission Open for 36-Week Higher Diploma in Co-operative Management (HDCM Batch 2026-27)", link: "/programmes", isNew: true },
    { text: "MICM Bhubaneswar signs MoU with National Forensic Sciences University (NFSU)", link: "/collaboration/mous", isNew: false },
    { text: "ISO 9001:2015 Certification Awarded to MICM by STQC, Ministry of Electronics & IT", link: "/about", isNew: false },
  ];

  return (
    <div className="w-full bg-[#f1f5f9] border-b border-slate-300 flex items-center overflow-hidden h-9">
      {/* Green Label (Exact VAMNICOM Style) */}
      <div className="bg-[#107c41] text-white text-xs font-bold px-4 py-2 shrink-0 flex items-center gap-1.5 shadow-xs uppercase tracking-wide">
        <Volume2 className="w-3.5 h-3.5" />
        <span>Latest News</span>
      </div>

      {/* Marquee Content */}
      <div className="overflow-hidden whitespace-nowrap flex-1 px-3">
        <div className="inline-block animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
          <div className="flex items-center space-x-10 text-xs text-slate-800">
            {tickerItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="inline-flex items-center gap-2 hover:text-[#0288D1] transition-colors"
              >
                {item.isNew && (
                  <span className="bg-red-600 text-white font-black text-[9px] px-1.5 py-0.2 rounded-xs uppercase tracking-tighter animate-pulse">
                    NEW
                  </span>
                )}
                <span className="font-medium">{item.text}</span>
                <span className="text-slate-400">|</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
