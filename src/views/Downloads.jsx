'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Download, 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  ExternalLink,
  BookOpen,
  FileCheck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';

export default function Downloads() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [downloads, setDownloads] = useState([
    {
      id: 1,
      title: "MBA 2-Year Full-Time Course Curriculum & Syllabus (BPUT Regulations)",
      category: "Syllabi & Curriculum",
      file_size: "2.4 MB",
      upload_date: "10-Jan-2026",
      file_type: "PDF"
    },
    {
      id: 2,
      title: "Higher Diploma in Co-operative Management (HDCM) 36-Week Scheme of Study",
      category: "Syllabi & Curriculum",
      file_size: "1.8 MB",
      upload_date: "15-Dec-2025",
      file_type: "PDF"
    },
    {
      id: 3,
      title: "Academic Rules, Examination Guidelines & Attendance Regulations",
      category: "Rules & Regulations",
      file_size: "950 KB",
      upload_date: "04-Nov-2025",
      file_type: "PDF"
    },
    {
      id: 4,
      title: "MICM Offline Admission Application Form (MBA & HDCM 2026-27)",
      category: "Application Forms",
      file_size: "1.1 MB",
      upload_date: "02-Feb-2026",
      file_type: "PDF"
    },
    {
      id: 5,
      title: "Cooperative Training Nomination Form (For Sponsoring Organizations)",
      category: "Application Forms",
      file_size: "820 KB",
      upload_date: "20-Jan-2026",
      file_type: "PDF"
    },
    {
      id: 6,
      title: "Anti-Ragging Undertaking Format for Students & Guardians (UGC Regulations)",
      category: "Rules & Regulations",
      file_size: "640 KB",
      upload_date: "12-Sep-2025",
      file_type: "PDF"
    },
    {
      id: 7,
      title: "AICTE Mandatory Disclosure (Form A & B) 2025-26",
      category: "Institutional Circulars",
      file_size: "3.2 MB",
      upload_date: "28-Aug-2025",
      file_type: "PDF"
    },
    {
      id: 8,
      title: "Internal Complaints Committee (ICC) Policy & Guidelines on Workplace Safety",
      category: "Institutional Circulars",
      file_size: "780 KB",
      upload_date: "14-Jul-2025",
      file_type: "PDF"
    },
    {
      id: 9,
      title: "Hostel Rules, Mess Bye-Laws and Code of Conduct",
      category: "Rules & Regulations",
      file_size: "520 KB",
      upload_date: "01-Jun-2025",
      file_type: "PDF"
    },
    {
      id: 10,
      title: "BPUT Semester Exam Fee & Registration Circular (Even Semester 2026)",
      category: "Institutional Circulars",
      file_size: "610 KB",
      upload_date: "08-Feb-2026",
      file_type: "PDF"
    }
  ]);

  useEffect(() => {
    // Fetch live downloads from Next.js API
    api.getDownloads().then(data => {
      if (data && data.length > 0) {
        setDownloads(data);
      }
    }).catch(() => {});
  }, []);

  const categories = ['All', 'Syllabi & Curriculum', 'Rules & Regulations', 'Application Forms', 'Institutional Circulars'];

  const filteredDownloads = downloads.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (title) => {
    alert(`Starting download for: "${title}". A verified institutional document package will be downloaded.`);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Page Header Banner */}
      <div className="bg-[#0B1B3D] text-white py-10 border-b-4 border-[#0288D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-2">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <Link href="/programmes" className="hover:underline">ACADEMICS</Link>
            <span>/</span>
            <span className="text-white">DOWNLOADS CENTRE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Download className="w-8 h-8 text-[#FFC107]" />
            Official Downloads Centre
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl">
            Access syllabi, academic regulations, official forms, circulars, and BPUT examination guidelines in one centralized institutional repository.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Filter and Search Bar */}
        <div className="bg-white border border-slate-300 rounded-md p-4 mb-6 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#0288D1] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search downloads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
            />
          </div>

        </div>

        {/* Downloads Table */}
        <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
          <div className="bg-slate-100 px-6 py-3 border-b border-slate-300 flex justify-between items-center text-xs font-bold text-slate-700">
            <span>Showing {filteredDownloads.length} Institutional Documents</span>
            <span className="text-slate-500">Official PDF format</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0288D1] text-white">
                <tr>
                  <th className="p-3.5 font-bold w-12 text-center border-r border-sky-600">#</th>
                  <th className="p-3.5 font-bold border-r border-sky-600">Document Title & Description</th>
                  <th className="p-3.5 font-bold border-r border-sky-600 w-44">Category</th>
                  <th className="p-3.5 font-bold border-r border-sky-600 w-28 text-center">Date</th>
                  <th className="p-3.5 font-bold border-r border-sky-600 w-24 text-center">Size</th>
                  <th className="p-3.5 font-bold w-32 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDownloads.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-sky-50/50 transition-colors">
                    <td className="p-3.5 text-center font-bold text-slate-500 border-r">{idx + 1}</td>
                    <td className="p-3.5 border-r">
                      <div className="flex items-start gap-2.5">
                        <FileText className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm hover:text-[#0288D1]">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Format: {item.file_type || 'PDF'} • Madhusudan Institute of Co-operative Management
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 border-r">
                      <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold text-[11px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3.5 text-center text-slate-600 border-r font-mono">
                      {item.upload_date}
                    </td>
                    <td className="p-3.5 text-center text-slate-600 border-r font-mono">
                      {item.file_size}
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleDownload(item.title)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white rounded font-bold text-xs shadow-xs transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDownloads.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500">
                      No documents found matching "{searchTerm}" in category "{activeCategory}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Fast Link for BPUT Official Results & Schedule */}
        <div className="mt-8 bg-sky-50 border border-sky-200 rounded-md p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0288D1] text-white rounded-full flex items-center justify-center shrink-0">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Biju Patnaik University of Technology (BPUT) Examination Portal</div>
              <div className="text-xs text-slate-600">Access semester results, admit cards, academic calendars and exam schedule notifications directly.</div>
            </div>
          </div>
          <a
            href="https://bput.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#0B1B3D] hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded shadow-xs flex items-center gap-2 transition-colors"
          >
            <span>Visit BPUT Result Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}