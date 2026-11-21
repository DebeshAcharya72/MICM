'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Briefcase, 
  Download, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

export default function RtiCareers() {
  const [activeTab, setActiveTab] = useState('careers');

  const careerVacancies = [
    {
      id: 1,
      title: "Recruitment for the Post of Guest Faculty in Agribusiness & Rural Marketing",
      advt_no: "MICM/ESTT/REC/02/2026",
      post_type: "Academic Contract / Guest Lecturer",
      closing_date: "15-June-2026",
      eligibility: "Master’s Degree in Business Administration (MBA) / Agribusiness with First Class. Ph.D. or UGC-NET qualified preferred.",
      pay_scale: "As per UGC / NCCT Norms for Guest Faculty",
      status: "Active"
    },
    {
      id: 2,
      title: "Engagement of Junior Research Fellow (JRF) for Cooperative Banking Research Study",
      advt_no: "MICM/RES/JRF/01/2026",
      post_type: "Research Project Fellow",
      closing_date: "30-May-2026",
      eligibility: "Post Graduate in Economics / Commerce / Management with minimum 55% marks and data analysis skills in SPSS / R.",
      pay_scale: "₹ 31,000/- p.m. consolidated + HRA",
      status: "Active"
    },
    {
      id: 3,
      title: "Recruitment for Computer Lab Assistant & Network Technician",
      advt_no: "MICM/ESTT/IT/03/2025",
      post_type: "Technical Staff (Contractual)",
      closing_date: "Closed (Archived)",
      eligibility: "Diploma in Computer Science / BCA with 2 years experience in network administration and LAN management.",
      pay_scale: "Consolidated ₹ 22,000/- p.m.",
      status: "Closed"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Page Header */}
      <div className="bg-[#0B1B3D] text-white py-10 border-b-4 border-[#0288D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-2">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <span className="text-white">RTI & CAREERS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-[#FFC107]" />
            Careers & Right to Information (RTI) Disclosures
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl">
            Official recruitment advertisements, vacancy circulars, and statutory RTI disclosures under Section 4(1)(b) of the Right to Information Act, 2005.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Tab Selection */}
        <div className="flex border-b border-slate-300 mb-8 bg-white rounded-t-md px-4 pt-2 shadow-xs">
          <button
            onClick={() => setActiveTab('careers')}
            className={`px-5 py-3 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'careers'
                ? 'border-[#0288D1] text-[#0288D1]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Careers & Current Vacancies</span>
          </button>
          <button
            onClick={() => setActiveTab('rti')}
            className={`px-5 py-3 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'rti'
                ? 'border-[#0288D1] text-[#0288D1]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Right to Information (RTI)</span>
          </button>
        </div>

        {/* TAB 1: CAREERS */}
        {activeTab === 'careers' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs">
              <h2 className="text-lg font-bold text-[#0B1B3D] border-b pb-2 mb-4">
                Current Employment Opportunities & Recruitment Circulars
              </h2>
              
              <div className="space-y-4">
                {careerVacancies.map(job => (
                  <div key={job.id} className="border border-slate-200 rounded p-5 bg-slate-50 hover:bg-white hover:border-[#0288D1] transition-all">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-sky-100 text-[#0288D1] font-mono text-[11px] font-bold rounded">
                            {job.advt_no}
                          </span>
                          <span className={`px-2 py-0.5 text-[11px] font-bold rounded ${
                            job.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {job.status === 'Active' ? 'Open for Applications' : 'Closed'}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1">
                          {job.title}
                        </h3>
                        <div className="text-xs text-[#0288D1] font-semibold">{job.post_type}</div>
                      </div>

                      {job.status === 'Active' && (
                        <button
                          onClick={() => alert(`Downloading Application Format for ${job.title}`)}
                          className="shrink-0 bg-[#0288D1] hover:bg-[#0277bd] text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Application Form</span>
                        </button>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 space-y-1.5">
                      <div><strong>Eligibility:</strong> {job.eligibility}</div>
                      <div><strong>Emoluments / Remuneration:</strong> {job.pay_scale}</div>
                      <div className="text-red-700 font-bold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Closing Date for Receipt of Applications: {job.closing_date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RTI */}
        {activeTab === 'rti' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-300 rounded-md p-6 sm:p-8 shadow-xs">
              <div className="border-b pb-4 mb-6">
                <h2 className="text-lg font-bold text-[#0B1B3D]">Right to Information Act, 2005 (Statutory Disclosure)</h2>
                <p className="text-xs text-slate-600 mt-1">
                  In compliance with Section 4(1)(b) of the Right to Information Act, 2005, the following officers have been designated as Public Information Officers (PIO) and First Appellate Authority for MICM Bhubaneswar.
                </p>
              </div>

              {/* Designated Officers Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                
                {/* PIO */}
                <div className="border border-slate-200 rounded p-5 bg-slate-50">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0288D1] mb-2">Central Public Information Officer (CPIO)</div>
                  <h3 className="text-sm font-extrabold text-slate-900">Dr. Sanjib Kumar Hota</h3>
                  <div className="text-xs text-slate-600 font-semibold">Deputy Director</div>
                  <div className="text-xs text-slate-500 mt-2 space-y-1">
                    <div>Madhusudan Institute of Co-operative Management (MICM)</div>
                    <div>Unit-VIII, Bhubaneswar - 751012, Odisha</div>
                    <div>Tel: +91 674 2562826</div>
                    <div>Email: micmbbs@gmail.com</div>
                  </div>
                </div>

                {/* Appellate Authority */}
                <div className="border border-slate-200 rounded p-5 bg-sky-50/50">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0B1B3D] mb-2">First Appellate Authority (FAA)</div>
                  <h3 className="text-sm font-extrabold text-slate-900">Dr. P. Kannaiah</h3>
                  <div className="text-xs text-slate-600 font-semibold">Director</div>
                  <div className="text-xs text-slate-500 mt-2 space-y-1">
                    <div>Madhusudan Institute of Co-operative Management (MICM)</div>
                    <div>Unit-VIII, Bhubaneswar - 751012, Odisha</div>
                    <div>Tel: +91 674 2562826 / 2562827</div>
                    <div>Email: micmbbs@gmail.com</div>
                  </div>
                </div>

              </div>

              {/* RTI Application Procedure */}
              <div className="bg-slate-50 border border-slate-200 rounded p-5 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-slate-900 text-sm">Procedure to File an RTI Application:</div>
                <p>1. Applications under the RTI Act, 2005 can be submitted in writing or by post along with prescribed application fee of ₹10/- through Postal Order / Demand Draft drawn in favour of <strong>"Director, MICM Bhubaneswar"</strong>.</p>
                <p>2. Online RTI applications may also be routed through the National RTI Online Portal (rtionline.gov.in) selecting the parent authority: <strong>Ministry of Cooperation / NCCT</strong>.</p>
                <p>3. Information will be provided within statutory time limits as specified under the RTI Act.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}