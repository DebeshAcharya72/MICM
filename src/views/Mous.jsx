'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ExternalLink, ShieldCheck, Download, ChevronRight } from 'lucide-react';
import { portalData } from '../data/portalData';

export default function Mous() {
  return (
    <div className="bg-white min-h-[70vh] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-3">
          <Link href="/" className="hover:text-[#0288D1]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700">Collaboration</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0288D1] font-bold">MoU's</span>
        </nav>

        {/* Page Title (Exact VAMNICOM Style) */}
        <div className="text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            MoU's
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
            Strategic Memoranda of Understanding (MoUs) executed by Madhusudan Institute of Co-operative Management (MICM) with Apex National and International Organizations.
          </p>
        </div>

        {/* SECTION 1: MoU's at National level */}
        <section id="national" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              MoU's at National level
            </h2>
            <span className="text-xs font-semibold text-[#0288D1] bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              {portalData.mousNational.length} National Partnerships
            </span>
          </div>

          <div className="border border-[#0288D1] rounded-xs overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs sm:text-[13px] border-collapse">
              <thead>
                <tr className="bg-[#0288D1] text-white">
                  <th className="py-2.5 px-4 font-bold text-center w-12 border-r border-sky-400">
                    S.No.
                  </th>
                  <th className="py-2.5 px-4 font-bold">
                    Name of the Institution
                  </th>
                  <th className="py-2.5 px-4 font-bold text-center w-28 border-l border-sky-400">
                    Document
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {portalData.mousNational.map((mou, idx) => (
                  <tr 
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white hover:bg-sky-50/60" : "bg-slate-50 hover:bg-sky-50/60"}
                  >
                    <td className="py-3 px-4 text-center font-semibold text-slate-600 border-r border-slate-200">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 text-slate-800 font-medium leading-relaxed">
                      {mou}
                    </td>
                    <td className="py-3 px-4 text-center border-l border-slate-200">
                      <button
                        type="button"
                        onClick={() => alert(`Official Record: ${mou}\n\nPreserved in the MICM Academic Registry.`)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0288D1] hover:underline"
                        title="View MoU Record"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: MoU's at International level */}
        <section id="international" className="space-y-3 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              MoU's at International level
            </h2>
            <span className="text-xs font-semibold text-[#0288D1] bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
              {portalData.mousInternational.length} International Partnerships
            </span>
          </div>

          <div className="border border-[#0288D1] rounded-xs overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs sm:text-[13px] border-collapse">
              <thead>
                <tr className="bg-[#0288D1] text-white">
                  <th className="py-2.5 px-4 font-bold text-center w-12 border-r border-sky-400">
                    S.No.
                  </th>
                  <th className="py-2.5 px-4 font-bold">
                    Name of the Institution
                  </th>
                  <th className="py-2.5 px-4 font-bold text-center w-28 border-l border-sky-400">
                    Document
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {portalData.mousInternational.map((mou, idx) => (
                  <tr 
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white hover:bg-sky-50/60" : "bg-slate-50 hover:bg-sky-50/60"}
                  >
                    <td className="py-3 px-4 text-center font-semibold text-slate-600 border-r border-slate-200">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 text-slate-800 font-medium leading-relaxed">
                      {mou}
                    </td>
                    <td className="py-3 px-4 text-center border-l border-slate-200">
                      <button
                        type="button"
                        onClick={() => alert(`International Partnership Record:\n${mou}\n\nAdministered under the auspices of NCCT, Ministry of Cooperation, Govt. of India.`)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0288D1] hover:underline"
                        title="View International MoU"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Institutional Compliance Footer Note */}
        <div className="bg-amber-50 border border-amber-200 rounded p-4 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">
              Official Note on Institutional Collaborations:
            </span>
            All collaborations are entered into in strict compliance with the statutory framework of the National Council for Cooperative Training (NCCT), New Delhi, Ministry of Co-operation, Government of India, to advance cooperative management training, student internships, and research publications.
          </div>
        </div>

      </div>
    </div>
  );
}
