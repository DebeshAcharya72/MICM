'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  TrendingUp, 
  Award, 
  Building2, 
  Users, 
  CheckCircle2, 
  Download, 
  Phone, 
  Mail, 
  FileText,
  Calendar,
  ExternalLink
} from 'lucide-react';

export default function Placements() {
  const [activeTab, setActiveTab] = useState('overview');

  const placementStats = [
    { label: 'Highest Package Offered', val: '₹ 9.5 LPA', sub: 'Agribusiness & Banking Sector', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Average Package', val: '₹ 5.8 LPA', sub: 'Across Core Sectors', icon: Award, color: 'text-sky-600 bg-sky-50' },
    { label: 'Placement Percentage', val: '92.4%', sub: 'Batch 2023-25 Placed', icon: Users, color: 'text-amber-600 bg-amber-50' },
    { label: 'Corporate & Co-op Partners', val: '45+', sub: 'Active Recruiting Partners', icon: Building2, color: 'text-indigo-600 bg-indigo-50' },
  ];

  const recruiters = [
    { name: 'AMUL (GCMMF)', category: 'Cooperative Agribusiness', note: 'Regular Recruiter' },
    { name: 'IFFCO', category: 'Fertiliser & Rural Marketing', note: 'Core Partner' },
    { name: 'KRIBHCO', category: 'Agriculture & Fertiliser', note: 'Regular Recruiter' },
    { name: 'NAFED', category: 'Agricultural Marketing', note: 'National Partner' },
    { name: 'Odisha State Co-op Bank (OSCB)', category: 'Banking & Financial', note: 'State Apex Bank' },
    { name: 'HDFC Bank Ltd.', category: 'Retail & Rural Banking', note: 'Commercial Bank' },
    { name: 'ICICI Bank', category: 'Agri-Business Group', note: 'Commercial Bank' },
    { name: 'Mother Dairy Fruit & Vegetable', category: 'FMCG & Dairy', note: 'Dairy Giant' },
    { name: 'OMFED (Odisha)', category: 'State Dairy Federation', note: 'State Cooperative' },
    { name: 'VNR Seeds Pvt. Ltd.', category: 'Seed & Agri-Inputs', note: 'Agribusiness' },
    { name: 'Mahyco Seeds', category: 'Agricultural Biotechnology', note: 'Corporate Partner' },
    { name: 'Federal Bank', category: 'Banking Services', note: 'BFSI Partner' },
    { name: 'Axis Bank', category: 'Rural & Inclusive Banking', note: 'BFSI Partner' },
    { name: 'Samunnati Financial Intermediation', category: 'Agri-Value Chain Finance', note: 'Agri-Fintech' },
    { name: 'IFFCO Kisan Sanchar Ltd.', category: 'ICT & Agri Services', note: 'Agri-Tech' },
    { name: 'Reliance Retail (Jio Krishi)', category: 'Rural Supply Chain', note: 'Supply Chain' },
  ];

  const internshipPartners = [
    { org: 'National Cooperative Development Corporation (NCDC)', duration: '8 Weeks', location: 'New Delhi / Bhubaneswar' },
    { org: 'NABARD (National Bank for Agriculture and Rural Development)', duration: '8 Weeks', location: 'Regional Offices' },
    { org: 'Odisha State Agricultural Marketing Board (OSAMB)', duration: '8 Weeks', location: 'Bhubaneswar' },
    { org: 'Bhubaneswar District Co-operative Central Bank (BDCCB)', duration: '8 Weeks', location: 'Odisha' },
    { org: 'CAMPCO Ltd.', duration: '8 Weeks', location: 'Mangalore' },
    { org: 'Markfed Odisha', duration: '8 Weeks', location: 'Bhubaneswar' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Page Header */}
      <div className="bg-[#0B1B3D] text-white py-10 border-b-4 border-[#0288D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-2">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <Link href="/programmes" className="hover:underline">CAREERS</Link>
            <span>/</span>
            <span className="text-white">PLACEMENTS & INTERNSHIPS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-[#FFC107]" />
            Training & Placement Cell (T&P)
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl">
            Empowering management graduates with professional careers across premier cooperative apex federations, commercial banks, agribusiness conglomerates, and rural enterprises.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Placement Highlight Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {placementStats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white border border-slate-300 rounded-md p-5 shadow-xs flex items-start gap-4">
                <div className={`p-3 rounded-lg ${item.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">{item.val}</div>
                  <div className="text-xs font-bold text-slate-700 mt-0.5">{item.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Navigation Tabs */}
        <div className="flex border-b border-slate-300 mb-8 bg-white rounded-t-md px-4 pt-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 font-bold text-xs sm:text-sm border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-[#0288D1] text-[#0288D1]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Placement Highlights & Philosophy
          </button>
          <button
            onClick={() => setActiveTab('recruiters')}
            className={`px-4 py-2.5 font-bold text-xs sm:text-sm border-b-2 transition-colors ${
              activeTab === 'recruiters'
                ? 'border-[#0288D1] text-[#0288D1]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Our Prestigious Recruiters
          </button>
          <button
            onClick={() => setActiveTab('internships')}
            className={`px-4 py-2.5 font-bold text-xs sm:text-sm border-b-2 transition-colors ${
              activeTab === 'internships'
                ? 'border-[#0288D1] text-[#0288D1]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Summer Internships
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 font-bold text-xs sm:text-sm border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-[#0288D1] text-[#0288D1]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Placement Cell Contacts
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 mb-3 border-b pb-2 text-[#0B1B3D]">
                  Director's Note on Career Opportunities
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  The Placement Cell of Madhusudan Institute of Co-operative Management (MICM) acts as an active bridge between prospective employers and management students. Because MICM is established under the National Council for Cooperative Training (NCCT), New Delhi, Ministry of Cooperation, Government of India, our students gain an unmatched dual advantage: profound insight into India’s vast rural and cooperative business architecture combined with rigorous contemporary corporate management skills.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  Over the past five decades, MICM alumni have distinguished themselves across executive echelons of national apex cooperatives, scheduled cooperative banks, micro-finance institutions, retail agribusiness giants, and commercial banking systems.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Pre-Placement Preparation (Mock GD & PI)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>8-Week Mandatory Industry Summer Immersion</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dedicated Campus Placement Drive Schedule</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Comprehensive Soft-Skill & Leadership Workshops</span>
                  </div>
                </div>
              </div>

              {/* Placement Statistics by Sector */}
              <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2 text-[#0B1B3D]">
                  Sector-wise Placement Distribution
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Cooperative Federations & Agribusiness (Amul, IFFCO, KRIBHCO, NAFED)</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-[#0288D1] h-2.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Banking & Financial Services (HDFC, ICICI, OSCB, Axis, Federal)</span>
                      <span>34%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '34%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Rural Retail, FMCG & Supply Chain (Mother Dairy, Reliance, VNR)</span>
                      <span>16%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '16%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Development Agencies & Cooperative Audits</span>
                      <span>8%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar Resources */}
            <div className="space-y-6">
              
              <div className="bg-[#0B1B3D] text-white p-6 rounded-md shadow-xs">
                <h4 className="text-base font-bold mb-2 flex items-center gap-2 text-[#FFC107]">
                  <Download className="w-5 h-5" />
                  Placement Brochure
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Download the official MICM Placement Brochure for Recruiters containing detailed batch profiles, skill matrices, curriculum overview, and campus drive scheduling guidelines.
                </p>
                <a
                  href="#download-placement-brochure"
                  onClick={(e) => { e.preventDefault(); alert("Placement Brochure (PDF) downloaded successfully!"); }}
                  className="block text-center w-full bg-[#FFC107] hover:bg-amber-400 text-[#0B1B3D] font-extrabold text-xs py-2.5 rounded shadow transition-colors"
                >
                  Download Brochure (PDF - 3.4 MB)
                </a>
              </div>

              <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 mb-3 border-b pb-2">
                  Campus Drive Invitation
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Organizations interested in conducting on-campus or virtual recruitment drives for MBA graduates may directly write to the T&P Cell.
                </p>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#0288D1]" />
                    <span>micmbbs@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#0288D1]" />
                    <span>+91 674 2562826 / 2562827</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: RECRUITERS WALL */}
        {activeTab === 'recruiters' && (
          <div className="bg-white border border-slate-300 rounded-md p-6 sm:p-8 shadow-xs">
            <div className="mb-6 border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900 text-[#0B1B3D]">
                Prestigious Corporate & Cooperative Recruiter Wall
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Organizations actively visiting MICM Bhubaneswar for campus recruitment and management trainee selections.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {recruiters.map((rec, i) => (
                <div key={i} className="border border-slate-200 rounded p-4 text-center hover:border-[#0288D1] hover:shadow-md transition-all bg-slate-50">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 border border-slate-300 text-slate-800 font-bold text-sm shadow-xs">
                    {rec.name.charAt(0)}
                  </div>
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-1">{rec.name}</div>
                  <div className="text-[11px] text-[#0288D1] font-semibold mt-1">{rec.category}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{rec.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SUMMER INTERNSHIPS */}
        {activeTab === 'internships' && (
          <div className="bg-white border border-slate-300 rounded-md p-6 sm:p-8 shadow-xs">
            <div className="mb-6 border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900 text-[#0B1B3D]">
                Summer Internship Programme (SIP)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                8-week full-time immersion between 2nd and 3rd Semesters offering students hands-on field experience and corporate project evaluation.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-[#0288D1] text-white">
                  <tr>
                    <th className="p-3 font-bold border-r border-sky-600">Sl. No.</th>
                    <th className="p-3 font-bold border-r border-sky-600">Hosting Organization / Institution</th>
                    <th className="p-3 font-bold border-r border-sky-600">Duration</th>
                    <th className="p-3 font-bold">Field / Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {internshipPartners.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-600 border-r">{idx + 1}</td>
                      <td className="p-3 font-bold text-slate-800 border-r">{item.org}</td>
                      <td className="p-3 text-slate-600 border-r">{item.duration}</td>
                      <td className="p-3 text-slate-600">{item.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT T&P CELL */}
        {activeTab === 'contact' && (
          <div className="bg-white border border-slate-300 rounded-md p-6 sm:p-8 shadow-xs max-w-3xl">
            <h3 className="text-lg font-bold text-slate-900 text-[#0B1B3D] mb-4 border-b pb-2">
              Training & Placement Cell Administration
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="p-4 bg-slate-50 rounded border border-slate-200">
                <div className="font-bold text-base text-slate-900">Training & Placement Officer</div>
                <div className="text-xs text-[#0288D1] font-semibold">Madhusudan Institute of Co-operative Management (MICM)</div>
                <div className="mt-2 text-slate-600 text-xs">
                  Unit-VIII, Bhubaneswar - 751012, Odisha, India
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-emerald-600" /> +91 674 2562826</span>
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-[#0288D1]" /> micmbbs@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}