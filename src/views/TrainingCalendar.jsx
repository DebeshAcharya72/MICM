'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar as CalendarIcon, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  Download, 
  FileCheck, 
  CheckCircle, 
  X, 
  Search,
  Building,
  Award,
  Send
} from 'lucide-react';

export default function TrainingCalendar() {
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [nominationModal, setNominationModal] = useState(null); // holds selected programme for modal
  const [nominationSubmitted, setNominationSubmitted] = useState(false);
  const [nominationData, setNominationData] = useState({
    org_name: '',
    contact_person: '',
    designation: '',
    email: '',
    phone: '',
    nominee_name: '',
    nominee_designation: '',
    remarks: ''
  });

  const months = ['All', 'June 2026', 'July 2026', 'August 2026', 'September 2026', 'October 2026'];
  const programmeTypes = ['All', 'NCCT Sponsored', 'PMFBY / Agriculture', 'DGR Certificate', 'MDP / In-Service'];

  const programmes = [
    {
      id: 1,
      title: "Training programme for Inspector of CS / Sub Assistant Registrar of Cooperative Societies of Odisha State",
      code: "TRG-2026-CS01",
      type: "NCCT Sponsored",
      month: "June 2026",
      from_date: "01-06-2026",
      to_date: "05-06-2026",
      duration: "5 Days",
      venue: "MICM Main Campus, Bhubaneswar",
      target_group: "Cooperative Department Inspectors & Assistant Registrars",
      seats: 30,
      fee: "Sponsored by NCCT / Govt. of Odisha",
      coordinator: "Dr. Sanjib Kumar Hota, Dy. Director",
      description: "Comprehensive training on statutory cooperative audit, compliance inspection, and legal procedures under the Odisha Cooperative Societies Act."
    },
    {
      id: 2,
      title: "Digital PACS Computerization & ERP Implementation for Primary Agricultural Co-op Societies",
      code: "TRG-2026-PACS02",
      type: "PMFBY / Agriculture",
      month: "June 2026",
      from_date: "02-06-2026",
      to_date: "04-06-2026",
      duration: "3 Days",
      venue: "Advanced IT Lab, MICM Campus",
      target_group: "PACS Secretaries, Accountants & System Managers",
      seats: 35,
      fee: "Ministry of Cooperation Sponsored",
      coordinator: "Centre for Information Technology, MICM",
      description: "Hands-on ERP software training for national digital PACS transformation, common accounting system (CAS), and MIS reporting."
    },
    {
      id: 3,
      title: "Training Programme for Presidents / Board of Directors of PACS & LAMPS of Odisha State",
      code: "TRG-2026-BOD03",
      type: "NCCT Sponsored",
      month: "June 2026",
      from_date: "02-06-2026",
      to_date: "06-06-2026",
      duration: "5 Days",
      venue: "Conference Hall, MICM Campus",
      target_group: "Elected Board Members & Presidents of PACS/LAMPS",
      seats: 40,
      fee: "State Govt. Sponsored",
      coordinator: "Dr. P. Kannaiah, Director",
      description: "Leadership governance, cooperative bye-laws, financial prudence, and member empowerment training for grassroots cooperative leaders."
    },
    {
      id: 4,
      title: "Programme on Cooperative Business Competitiveness & Agri-Value Chain Development",
      code: "TRG-2026-VCD04",
      type: "MDP / In-Service",
      month: "June 2026",
      from_date: "03-06-2026",
      to_date: "05-06-2026",
      duration: "3 Days",
      venue: "Seminar Hall, MICM Bhubaneswar",
      target_group: "Senior Executives of Milk Federations, Fishery & Agro Co-ops",
      seats: 25,
      fee: "₹ 4,500 + GST (Residential)",
      coordinator: "Management Faculty Team",
      description: "Modern market linkages, cold-chain logistics management, branding, and farmer producer organization (FPO) synergies."
    },
    {
      id: 5,
      title: "DGR Certificate Course in Business Management for Defence Ex-Servicemen & Officers",
      code: "TRG-2026-DGR05",
      type: "DGR Certificate",
      month: "July 2026",
      from_date: "01-07-2026",
      to_date: "25-09-2026",
      duration: "12 Weeks (Full-Time)",
      venue: "Executive Classroom, MICM",
      target_group: "Retiring Defence Officers (Army, Navy, Airforce)",
      seats: 35,
      fee: "Funded by Directorate General Resettlement (MoD)",
      coordinator: "DGR Course Director",
      description: "Specialized 12-week certificate course equipping defence veterans with corporate management acumen, finance, operations, and HR systems."
    },
    {
      id: 6,
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY) Crop Loss Assessment & Claim Settlement",
      code: "TRG-2026-PMFBY06",
      type: "PMFBY / Agriculture",
      month: "July 2026",
      from_date: "14-07-2026",
      to_date: "17-07-2026",
      duration: "4 Days",
      venue: "MICM Main Campus",
      target_group: "Agriculture Officers, Co-op Bank Field Managers, Surveyors",
      seats: 30,
      fee: "Sponsored Training",
      coordinator: "Centre for Research & Agriculture",
      description: "Technical training on remote sensing integration, crop-cutting experiment (CCE) verification, and speedier grievance handling under PMFBY."
    },
    {
      id: 7,
      title: "Cooperative Banking & Statutory Audit Norms under RBI / NABARD Guidelines",
      code: "TRG-2026-BANK07",
      type: "MDP / In-Service",
      month: "August 2026",
      from_date: "05-08-2026",
      to_date: "08-08-2026",
      duration: "4 Days",
      venue: "MICM Bhubaneswar",
      target_group: "DCCB & Urban Cooperative Bank Branch Managers, Auditors",
      seats: 25,
      fee: "₹ 5,000 + GST (Residential)",
      coordinator: "Dy. Director & Banking Guest Experts",
      description: "Prudential exposure limits, asset classification, NPA provisioning, and Cyber Security frameworks for cooperative banks."
    }
  ];

  const filtered = programmes.filter(p => {
    const matchesMonth = selectedMonth === 'All' || p.month === selectedMonth;
    const matchesType = selectedType === 'All' || p.type === selectedType;
    return matchesMonth && matchesType;
  });

  const handleNominationChange = (e) => {
    setNominationData({
      ...nominationData,
      [e.target.name]: e.target.value
    });
  };

  const handleNominationSubmit = (e) => {
    e.preventDefault();
    setNominationSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B1B3D] text-white py-10 border-b-4 border-[#0288D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-2">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <Link href="/programmes" className="hover:underline">TRAINING</Link>
            <span>/</span>
            <span className="text-white">TRAINING CALENDAR (2026-27)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-[#FFC107]" />
            Annual Training Programmes Calendar
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl">
            Promoted by the National Council for Cooperative Training (NCCT), New Delhi, Ministry of Cooperation, Govt. of India. Organizing specialized capacity building courses for state cooperative departments, PACS, and corporate executives.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Filter Controls */}
        <div className="bg-white border border-slate-300 rounded-md p-4 mb-6 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#0288D1]" /> Month:
            </span>
            {months.map(m => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  selectedMonth === m
                    ? 'bg-[#0288D1] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-700">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] outline-none bg-white font-semibold"
            >
              {programmeTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Programmes Grid */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white border border-slate-300 rounded-md p-5 shadow-xs hover:border-[#0288D1] transition-all">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b pb-3 mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-sky-100 text-[#0288D1] rounded font-bold text-[11px] font-mono">
                      {item.code}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold text-[11px]">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0B1B3D]">
                    {item.title}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    setNominationModal(item);
                    setNominationSubmitted(false);
                  }}
                  className="shrink-0 bg-[#FFC107] hover:bg-amber-400 text-[#0B1B3D] font-extrabold text-xs px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Nominate / Apply Online</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-700 mb-3 bg-slate-50 p-3 rounded">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-[#0288D1] shrink-0" />
                  <span><strong>Dates:</strong> {item.from_date} to {item.to_date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Duration:</strong> {item.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                  <span><strong>Venue:</strong> {item.venue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-600 shrink-0" />
                  <span><strong>Seats:</strong> {item.seats} Participants</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed mb-3">
                <p><strong>Course Focus:</strong> {item.description}</p>
                <div className="mt-1">
                  <strong>Target Group:</strong> {item.target_group} • <strong>Fee:</strong> {item.fee}
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center text-[11px] text-slate-500 border-t pt-2">
                <span>Course Coordinator: <strong>{item.coordinator}</strong></span>
                <button
                  onClick={() => alert(`Course Brochure for "${item.title}" will be downloaded.`)}
                  className="text-[#0288D1] hover:underline font-bold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Course Circular</span>
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white border border-slate-300 rounded-md p-10 text-center text-slate-500">
              No training programmes scheduled for the selected filter combination.
            </div>
          )}
        </div>

      </div>

      {/* ======================================================== */}
      {/* ONLINE NOMINATION MODAL POPUP */}
      {/* ======================================================== */}
      {nominationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md max-w-xl w-full border border-slate-300 shadow-2xl overflow-hidden my-8">
            
            <div className="bg-[#0B1B3D] text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-bold text-[#FFC107]">Training Programme Nomination Form</h4>
                <div className="text-xs text-slate-300 mt-0.5 line-clamp-1">{nominationModal.title}</div>
              </div>
              <button 
                onClick={() => setNominationModal(null)}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {nominationSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Nomination Received Successfully!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you for nominating personnel from <strong>{nominationData.org_name || 'your organization'}</strong>. A confirmation email and logistical details have been dispatched.
                </p>
                <div className="p-3 bg-slate-50 border rounded text-xs text-slate-700 font-mono">
                  Programme Code: {nominationModal.code} | Date: {nominationModal.from_date}
                </div>
                <button
                  onClick={() => setNominationModal(null)}
                  className="mt-4 bg-[#0288D1] text-white font-bold text-xs px-6 py-2 rounded"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleNominationSubmit} className="p-6 space-y-4 text-xs">
                
                <div className="bg-sky-50 border border-sky-200 p-2.5 rounded text-slate-700">
                  <strong>Selected Course:</strong> {nominationModal.title} ({nominationModal.duration})
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Sponsoring Organization / Department <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="org_name"
                      required
                      value={nominationData.org_name}
                      onChange={handleNominationChange}
                      placeholder="e.g. Directorate of Fisheries, Odisha / PACS"
                      className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Sponsoring Officer / Contact Person <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="contact_person"
                      required
                      value={nominationData.contact_person}
                      onChange={handleNominationChange}
                      placeholder="e.g. Deputy Registrar / HR Manager"
                      className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Official Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={nominationData.email}
                      onChange={handleNominationChange}
                      placeholder="e.g. hr@organization.gov.in"
                      className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={nominationData.phone}
                      onChange={handleNominationChange}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                    />
                  </div>
                </div>

                <div className="border-t pt-3">
                  <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">Nominee Candidate Particulars</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Nominee Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="nominee_name"
                        required
                        value={nominationData.nominee_name}
                        onChange={handleNominationChange}
                        placeholder="e.g. Sri Ramesh Dash"
                        className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Designation & Station <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="nominee_designation"
                        required
                        value={nominationData.nominee_designation}
                        onChange={handleNominationChange}
                        placeholder="e.g. Inspector CS, Cuttack"
                        className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Hostel / Accommodation Required?
                  </label>
                  <select
                    name="remarks"
                    value={nominationData.remarks}
                    onChange={handleNominationChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded outline-none bg-white"
                  >
                    <option value="Yes - Campus Hostel Accommodation Required">Yes - Residential Campus Hostel Required</option>
                    <option value="No - Local Commuter / Self Arrangement">No - Local Commuter / Non-Residential</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setNominationModal(null)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded font-semibold hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0288D1] hover:bg-[#0277bd] text-white rounded font-bold flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Official Nomination</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}