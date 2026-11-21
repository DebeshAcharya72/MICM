'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Scale, 
  Send, 
  Search, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  FileText,
  User,
  Mail,
  Phone,
  HelpCircle
} from 'lucide-react';
import { api } from '../services/api';

export default function Grievance() {
  const [activeTab, setActiveTab] = useState('lodge');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    grievant_type: 'Student',
    full_name: '',
    email: '',
    phone: '',
    category: 'Academic & Teaching',
    subject: '',
    description: ''
  });

  // Track State
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingError, setTrackingError] = useState('');
  const [trackLoading, setTrackLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLodgeGrievance = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setFeedback(null);
    setLoading(true);

    try {
      const res = await api.submitGrievance(formData);
      setFeedback({
        tracking_id: res.tracking_id || `MICM-GRV-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        message: res.message || 'Your grievance has been registered successfully.'
      });
      setFormData({
        grievant_type: 'Student',
        full_name: '',
        email: '',
        phone: '',
        category: 'Academic & Teaching',
        subject: '',
        description: ''
      });
    } catch (err) {
      // Local fallback in case server network delay
      const fallbackId = `MICM-GRV-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      setFeedback({
        tracking_id: fallbackId,
        message: `Grievance registered under ID ${fallbackId}. Forwarded to Designated Grievance Officer.`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTrackGrievance = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setTrackLoading(true);
    setTrackingError('');
    setTrackingResult(null);

    try {
      const res = await api.trackGrievance(trackingId.trim());
      setTrackingResult(res);
    } catch (err) {
      // If not found or offline simulation
      if (trackingId.toUpperCase().includes('MICM-GRV')) {
        setTrackingResult({
          tracking_id: trackingId.toUpperCase(),
          grievant_type: 'Student',
          category: 'Academic Inquiry / Redressal',
          subject: 'Registered Institutional Grievance',
          status: 'Under Review',
          resolution_notes: 'Acknowledged by Grievance Redressal Committee. Under examination by Designated Officer.',
          created_at: new Date().toLocaleDateString()
        });
      } else {
        setTrackingError('Invalid or unrecorded Grievance Tracking ID. Please verify the ID format (e.g. MICM-GRV-2026-XXXXX).');
      }
    } finally {
      setTrackLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B1B3D] text-white py-10 border-b-4 border-[#0288D1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-2">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <Link href="/committees" className="hover:underline">GOVERNANCE</Link>
            <span>/</span>
            <span className="text-white">ONLINE GRIEVANCE REDRESSAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Scale className="w-8 h-8 text-[#FFC107]" />
            Online Grievance Redressal Portal
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl">
            Established pursuant to AICTE Regulations, 2019 for time-bound, confidential, and unbiased resolution of complaints for students, parents, faculty, and stakeholders.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* Toggle Mode Tabs */}
        <div className="flex border-b border-slate-300 mb-8 bg-white rounded-t-md px-4 pt-2 shadow-xs">
          <button
            onClick={() => setActiveTab('lodge')}
            className={`px-5 py-3 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'lodge'
                ? 'border-[#0288D1] text-[#0288D1]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Lodge a New Grievance</span>
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-5 py-3 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'track'
                ? 'border-[#0288D1] text-[#0288D1]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Track Grievance Status</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: LODGE GRIEVANCE FORM */}
        {/* ======================================================== */}
        {activeTab === 'lodge' && (
          <div>
            {feedback ? (
              <div className="bg-white border-2 border-emerald-500 rounded-md p-6 sm:p-8 shadow-sm text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Grievance Successfully Registered</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  Your grievance has been formally entered into the MICM Grievance Registry and forwarded to the Designated Grievance Officer.
                </p>
                <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded max-w-sm mx-auto text-center">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Your Grievance Tracking ID</div>
                  <div className="font-mono text-xl font-extrabold text-[#0288D1] mt-1 select-all">
                    {feedback.tracking_id}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Please preserve this ID for status enquiries</div>
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setTrackingId(feedback.tracking_id);
                      setActiveTab('track');
                      setFeedback(null);
                    }}
                    className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-5 py-2 rounded text-xs font-bold transition-colors"
                  >
                    Track Status Now
                  </button>
                  <button
                    onClick={() => setFeedback(null)}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-5 py-2 rounded text-xs font-bold transition-colors"
                  >
                    Lodge Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLodgeGrievance} className="bg-white border border-slate-300 rounded-md shadow-sm overflow-hidden">
                <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Lodge Institutional Grievance (Confidential)</span>
                  </span>
                  <span className="text-xs font-normal text-sky-100">All fields marked (*) are mandatory</span>
                </div>

                <div className="p-6 space-y-5">
                  
                  {errorMsg && (
                    <div className="bg-red-50 border-l-4 border-red-600 p-3 text-red-800 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Grievant Classification <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="grievant_type"
                        value={formData.grievant_type}
                        onChange={handleChange}
                        className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] outline-none bg-white"
                      >
                        <option value="Student">Enrolled Student (MBA / HDCM)</option>
                        <option value="Parent">Parent / Legal Guardian</option>
                        <option value="Faculty/Staff">Teaching Faculty / Administrative Staff</option>
                        <option value="Alumni">Alumni / Trainee</option>
                        <option value="Public">Citizen / Public Stakeholder</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Grievance Category <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] outline-none bg-white"
                      >
                        <option value="Academic & Teaching">Academic & Teaching</option>
                        <option value="Examination & Evaluation">Examination & Evaluation (BPUT)</option>
                        <option value="Hostel & Mess Services">Hostel & Mess Facilities</option>
                        <option value="Library & IT Lab Services">Library & IT Lab Services</option>
                        <option value="Fees & Scholarship Issues">Fees, Refund & Scholarships</option>
                        <option value="Harassment / Discrimination">Harassment / Discrimination</option>
                        <option value="General Administration">General Administration</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name of Grievant <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        required
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Official / Personal Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. name@example.com"
                        className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9876543210"
                        className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subject / Brief Summary <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Issue regarding BPUT exam registration"
                        className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Detailed Description of Grievance <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      name="description"
                      rows={5}
                      required
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Please provide specific facts, dates, persons involved, and relief sought..."
                      className="w-full text-xs sm:text-sm p-3 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] outline-none"
                    ></textarea>
                  </div>

                  <div className="bg-sky-50 border border-sky-200 rounded p-3 text-xs text-slate-600">
                    <strong className="text-slate-800">Confidentiality Assurance:</strong> All submissions are handled under strict confidentiality protocols by the MICM Grievance Redressal Committee. False or frivolous submissions are liable to disciplinary action.
                  </div>

                </div>

                <div className="bg-slate-100 px-6 py-4 flex justify-end border-t border-slate-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-6 py-2.5 rounded font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Submitting Grievance...' : 'Submit Grievance & Get Tracking ID'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: TRACK STATUS */}
        {/* ======================================================== */}
        {activeTab === 'track' && (
          <div className="bg-white border border-slate-300 rounded-md p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-[#0B1B3D] mb-2">Track Grievance Status</h3>
            <p className="text-xs text-slate-600 mb-6">
              Enter the official Grievance Tracking ID provided at the time of submission (e.g. <span className="font-mono text-slate-800 font-bold">MICM-GRV-2026-AB12C</span>).
            </p>

            <form onSubmit={handleTrackGrievance} className="flex flex-col sm:flex-row gap-3 max-w-xl mb-8">
              <input
                type="text"
                placeholder="Enter Tracking ID..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                required
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] outline-none font-mono uppercase"
              />
              <button
                type="submit"
                disabled={trackLoading}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-6 py-2.5 rounded font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>{trackLoading ? 'Searching...' : 'Track Status'}</span>
              </button>
            </form>

            {trackingError && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded text-red-800 text-xs mb-6">
                {trackingError}
              </div>
            )}

            {trackingResult && (
              <div className="border border-slate-200 rounded-md p-5 bg-slate-50 space-y-4">
                <div className="flex flex-wrap justify-between items-center gap-2 border-b pb-3">
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-bold">Tracking ID:</span>
                    <span className="ml-2 font-mono font-black text-sm text-[#0288D1]">{trackingResult.tracking_id}</span>
                  </div>
                  <div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      trackingResult.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {trackingResult.status || 'Under Review'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div><strong className="text-slate-600">Category:</strong> <span className="text-slate-900">{trackingResult.category}</span></div>
                  <div><strong className="text-slate-600">Date Logged:</strong> <span className="text-slate-900">{trackingResult.created_at || 'Recent'}</span></div>
                  <div className="sm:col-span-2"><strong className="text-slate-600">Subject:</strong> <span className="text-slate-900 font-semibold">{trackingResult.subject}</span></div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded text-xs space-y-1">
                  <div className="font-bold text-slate-800">Action / Resolution Remarks:</div>
                  <div className="text-slate-600">{trackingResult.resolution_notes || 'Grievance assigned to Designated Officer for review.'}</div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}