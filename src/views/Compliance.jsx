'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  Calendar, 
  Award, 
  Building, 
  CheckCircle,
  ExternalLink,
  Info
} from 'lucide-react';

export default function Compliance() {
  const [activeTab, setActiveTab] = useState('aicte');

  const aicteApprovals = [
    { year: '2025-26', title: 'AICTE Extension of Approval (EOA) Letter for MBA Programme', ref: 'F.No. Eastern/1-3829104821/2025/EOA', date: '30-Apr-2025', size: '1.4 MB' },
    { year: '2024-25', title: 'AICTE Extension of Approval (EOA) Letter for MBA Programme', ref: 'F.No. Eastern/1-3651982142/2024/EOA', date: '28-Apr-2024', size: '1.2 MB' },
    { year: '2023-24', title: 'AICTE Extension of Approval (EOA) Letter for MBA Programme', ref: 'F.No. Eastern/1-3419204851/2023/EOA', date: '15-May-2023', size: '1.3 MB' },
    { year: '2022-23', title: 'AICTE Extension of Approval (EOA) Letter for MBA Programme', ref: 'F.No. Eastern/1-2918402941/2022/EOA', date: '02-Jun-2022', size: '1.1 MB' },
    { year: '2021-22', title: 'AICTE Extension of Approval (EOA) Letter for MBA Programme', ref: 'F.No. Eastern/1-2651048291/2021/EOA', date: '25-Jun-2021', size: '1.0 MB' },
  ];

  const bputAffiliations = [
    { year: '2025-26', title: 'BPUT Annual Institutional Affiliation Notification', ref: 'BPUT/AFF/1042/2025', date: '12-Jul-2025', size: '890 KB' },
    { year: '2024-25', title: 'BPUT Annual Institutional Affiliation Notification', ref: 'BPUT/AFF/0921/2024', date: '05-Jul-2024', size: '820 KB' },
    { year: '2023-24', title: 'BPUT Annual Institutional Affiliation Notification', ref: 'BPUT/AFF/0814/2023', date: '18-Jul-2023', size: '780 KB' },
    { year: '2022-23', title: 'BPUT Annual Institutional Affiliation Notification', ref: 'BPUT/AFF/0733/2022', date: '22-Jun-2022', size: '750 KB' },
  ];

  const mandatoryDisclosures = [
    { section: '1. Institute Details', desc: 'Name, AICTE Permanent ID (1-4752941), Address, Coordinates, Status (Promoted by NCCT, Ministry of Cooperation, GoI)' },
    { section: '2. Governance', desc: 'Management Committee, Academic Advisory Council, Frequency of Meetings, Organizational Chart' },
    { section: '3. Programmes & Intake', desc: 'MBA (Full Time) - 60 Seats, HDCM (Correspondence) - 30 Seats' },
    { section: '4. Faculty Profile', desc: 'Director, Dy. Director, Guest Lecturers, Research Fellows, Student-Teacher Ratio (1:15)' },
    { section: '5. Fee Structure', desc: 'MBA ₹1,22,400 across 4 Semesters; HDCM ₹22,500; Hostel fees approved by Govt. Committee' },
    { section: '6. Campus Infrastructure', desc: '3.4 Acres Campus, 74 Computer Nodes, 17,000+ Library Books, High-Speed NKN 1 Gbps Bandwidth' },
    { section: '7. Mandatory Committees', desc: 'Internal Complaints Committee, Anti-Ragging Committee, SC/ST Cell, Online Grievance Redressal Mechanism' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Banner */}
      <div className="bg-[#0B1B3D] text-white py-10 border-b-4 border-[#0288D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-2">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <span className="text-white">STATUTORY COMPLIANCE & DISCLOSURES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#FFC107]" />
            Statutory Disclosures & Regulatory Approvals Hub
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl">
            In compliance with AICTE Regulations and BPUT Statutes, Madhusudan Institute of Co-operative Management (MICM) publishes all statutory approval orders, affiliations, and mandatory disclosures for public transparency.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-300 mb-8 bg-white rounded-t-md px-4 pt-2">
          <button
            onClick={() => setActiveTab('aicte')}
            className={`px-4 py-2.5 font-bold text-xs sm:text-sm border-b-2 transition-colors ${
              activeTab === 'aicte'
                ? 'border-[#0288D1] text-[#0288D1]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            AICTE Approvals (EOA by Year)
          </button>
          <button
            onClick={() => setActiveTab('bput')}
            className={`px-4 py-2.5 font-bold text-xs sm:text-sm border-b-2 transition-colors ${
              activeTab === 'bput'
                ? 'border-[#0288D1] text-[#0288D1]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            BPUT University Affiliations
          </button>
          <button
            onClick={() => setActiveTab('disclosure')}
            className={`px-4 py-2.5 font-bold text-xs sm:text-sm border-b-2 transition-colors ${
              activeTab === 'disclosure'
                ? 'border-[#0288D1] text-[#0288D1]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            AICTE Mandatory Disclosure
          </button>
        </div>

        {/* TAB 1: AICTE APPROVALS */}
        {activeTab === 'aicte' && (
          <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
            <div className="bg-slate-100 p-4 border-b border-slate-300 flex justify-between items-center text-xs">
              <div>
                <strong className="text-slate-900 text-sm">All India Council for Technical Education (AICTE), New Delhi</strong>
                <div className="text-slate-500">Eastern Regional Office • AICTE Permanent Institute ID: 1-4752941</div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-bold text-xs">Active Approval</span>
            </div>

            <div className="divide-y divide-slate-200 text-xs">
              {aicteApprovals.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#0288D1] text-white rounded font-bold text-[11px] font-mono">
                        AY {item.year}
                      </span>
                      <span className="font-extrabold text-sm text-slate-900">{item.title}</span>
                    </div>
                    <div className="text-slate-600 text-xs">
                      Official Reference: <span className="font-mono text-slate-800">{item.ref}</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">Date of AICTE Notification: {item.date} • File Size: {item.size}</div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading AICTE EOA Letter for Academic Year ${item.year}`)}
                    className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-[#0288D1] hover:bg-[#0277bd] text-white rounded font-bold text-xs shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download EOA (PDF)</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: BPUT AFFILIATIONS */}
        {activeTab === 'bput' && (
          <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
            <div className="bg-slate-100 p-4 border-b border-slate-300 flex justify-between items-center text-xs">
              <div>
                <strong className="text-slate-900 text-sm">Biju Patnaik University of Technology (BPUT), Rourkela, Odisha</strong>
                <div className="text-slate-500">Government State Affiliating University for Technical & Management Education</div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-bold text-xs">Affiliated College</span>
            </div>

            <div className="divide-y divide-slate-200 text-xs">
              {bputAffiliations.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#0B1B3D] text-white rounded font-bold text-[11px] font-mono">
                        AY {item.year}
                      </span>
                      <span className="font-extrabold text-sm text-slate-900">{item.title}</span>
                    </div>
                    <div className="text-slate-600 text-xs">
                      Notification Reference: <span className="font-mono text-slate-800">{item.ref}</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">Issued by Registrar, BPUT: {item.date} • File Size: {item.size}</div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading BPUT Affiliation Letter for ${item.year}`)}
                    className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-[#0288D1] hover:bg-[#0277bd] text-white rounded font-bold text-xs shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Order (PDF)</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MANDATORY DISCLOSURE */}
        {activeTab === 'disclosure' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0B1B3D]">AICTE Mandatory Disclosure 2025-26</h3>
                  <p className="text-xs text-slate-500">Updated in compliance with AICTE Approval Process Handbook (APH)</p>
                </div>
                <button
                  onClick={() => alert("Downloading Complete AICTE Mandatory Disclosure Document (PDF)")}
                  className="bg-[#FFC107] hover:bg-amber-400 text-[#0B1B3D] font-extrabold text-xs px-4 py-2 rounded flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Disclosure (PDF - 3.2 MB)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mandatoryDisclosures.map((d, i) => (
                  <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded">
                    <div className="font-bold text-xs text-[#0288D1] uppercase tracking-wide mb-1">{d.section}</div>
                    <div className="text-xs text-slate-700 leading-relaxed">{d.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}