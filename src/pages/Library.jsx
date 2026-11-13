import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink, ChevronRight, CheckCircle2, ShieldCheck, Database, Search } from 'lucide-react';
import { portalData } from '../data/portalData';

export default function Library() {
  const { library } = portalData;

  return (
    <div className="bg-white min-h-[70vh]">
      
      {/* Panoramic Bookshelf Banner (Exact VAMNICOM Style) */}
      <div className="w-full h-48 sm:h-64 lg:h-72 overflow-hidden relative bg-slate-900">
        <img
          src={library.bannerImg}
          alt="MICM Central Knowledge Resource Centre Library"
          className="w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 sm:left-8 text-white">
          <span className="text-[11px] uppercase tracking-widest text-amber-300 font-bold block">
            Central Knowledge Resource Centre
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Library & Information System
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-3">
          <Link to="/" className="hover:text-[#0288D1]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0288D1] font-bold">Library</span>
        </nav>

        {/* SECTION 1: About Library:- */}
        <div className="border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
          <div className="bg-[#e9ecef] border-b border-slate-300 px-4 py-2 font-bold text-xs sm:text-sm text-slate-900">
            About Library:-
          </div>
          <div className="p-4 sm:p-6 text-xs sm:text-[13px] text-slate-800 leading-relaxed space-y-3 whitespace-pre-line bg-white">
            {library.about}
          </div>
        </div>

        {/* SECTION 2: Library Services :- */}
        <div className="border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
          <div className="bg-[#e9ecef] border-b border-slate-300 px-4 py-2 font-bold text-xs sm:text-sm text-slate-900">
            Library Services :-
          </div>
          <div className="p-4 sm:p-6 text-xs sm:text-[13px] text-slate-800 leading-relaxed space-y-4 bg-white">
            <ul className="space-y-2 list-disc list-inside text-slate-800">
              {library.services.map((srv, idx) => (
                <li key={idx} className="font-medium">
                  {srv}
                </li>
              ))}
            </ul>

            {/* Anti-Plagiarism Software Box */}
            <div className="pt-3 border-t border-slate-200">
              <p className="font-semibold text-slate-900">
                • <strong className="text-slate-900">{library.antiPlagiarism.title}</strong> : {library.antiPlagiarism.desc}
              </p>
              <div className="mt-1.5 pl-3">
                <span className="text-slate-600 font-semibold">URL : </span>
                <a 
                  href={library.antiPlagiarism.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>{library.antiPlagiarism.url}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: E-Library */}
        <div className="border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
          <div className="bg-[#e9ecef] border-b border-slate-300 px-4 py-2 font-bold text-xs sm:text-sm text-slate-900">
            E-Library
          </div>
          <div className="p-4 sm:p-6 text-xs sm:text-[13px] text-slate-800 leading-relaxed space-y-6 bg-white">
            <p className="font-bold text-slate-900 text-xs sm:text-sm border-b border-slate-200 pb-2">
              The E-Resource Holdings of the library :-
            </p>

            <div className="space-y-5">
              {library.eResources.map((res, idx) => (
                <div key={idx} className="space-y-1.5 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="font-semibold text-slate-900 flex items-start gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span>
                      <strong className="text-slate-900 font-bold">{res.title} :-</strong> {res.desc}
                    </span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-600 font-bold">URL : </span>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>{res.url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Working Hours & Librarian Desk */}
        <div className="bg-sky-50 border border-sky-200 p-4 rounded text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 block">Library Timings:</span>
            <span>Monday – Saturday: 9:30 AM – 6:30 PM &nbsp;|&nbsp; Reading Hall open until 8:00 PM during examination terms.</span>
          </div>
          <a
            href="mailto:micmbbs@gmail.com"
            className="px-3 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold rounded text-xs shrink-0"
          >
            Contact Librarian
          </a>
        </div>

      </div>
    </div>
  );
}
