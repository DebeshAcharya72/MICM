'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Award, 
  Building, 
  MapPin, 
  Send, 
  Users, 
  CheckCircle, 
  Calendar, 
  Briefcase,
  HeartHandshake
} from 'lucide-react';

export default function Alumni() {
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    batch_year: '2020',
    programme: 'MBA',
    current_company: '',
    designation: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  const notableAlumni = [
    {
      name: "Sri Debasis Mohapatra",
      batch: "Batch 1998 (MBA)",
      role: "General Manager",
      org: "Odisha State Cooperative Bank (OSCB)",
      location: "Bhubaneswar",
      quote: "The cooperative ethos and rigorous analytical grounding at MICM prepared me for three decades of leadership across scheduled banking networks."
    },
    {
      name: "Ms. Priyanka Samal",
      batch: "Batch 2012 (MBA)",
      role: "Deputy Zonal Manager (Agri-Business)",
      org: "HDFC Bank Ltd.",
      location: "Kolkata / Eastern Zone",
      quote: "MICM gave me both the commercial acumen and practical rural field insight that set me apart in agricultural finance."
    },
    {
      name: "Sri Soumyaranjan Jena",
      batch: "Batch 2016 (MBA)",
      role: "Regional Marketing Manager",
      org: "AMUL (GCMMF)",
      location: "Guwahati / North-East",
      quote: "Understanding the grassroots cooperative framework at MICM remains the greatest asset of my professional career at Amul."
    },
    {
      name: "Sri Prasanna Kumar Nayak",
      batch: "Batch 2004 (HDCM)",
      role: "Managing Director",
      org: "District Central Cooperative Bank (DCCB)",
      location: "Balasore",
      quote: "HDCM from MICM was the catalyst that accelerated my promotion and mastery over cooperative audit and credit delivery."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B1B3D] text-white py-10 border-b-4 border-[#0288D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-2">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <span className="text-white">ALUMNI RELATIONS & NETWORK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-[#FFC107]" />
            MICM Alumni Association & Network
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl">
            Connecting five decades of distinguished alumni leaders across national apex cooperatives, commercial banks, civil services, and agribusiness enterprises.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Notable Alumni Showcase */}
        <div className="mb-12">
          <div className="border-b pb-3 mb-6">
            <h2 className="text-xl font-bold text-[#0B1B3D]">Distinguished Alumni in Leadership Roles</h2>
            <p className="text-xs text-slate-500 mt-1">Celebrating our graduates who lead cooperative federations and corporate institutions across India.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {notableAlumni.map((alum, i) => (
              <div key={i} className="bg-white border border-slate-300 rounded-md p-5 shadow-xs flex flex-col justify-between hover:border-[#0288D1] transition-all">
                <div>
                  <div className="w-14 h-14 bg-sky-100 text-[#0288D1] rounded-full flex items-center justify-center font-bold text-lg mb-3">
                    {alum.name.split(' ')[1] ? alum.name.split(' ')[1].charAt(0) : alum.name.charAt(0)}
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">{alum.name}</h3>
                  <div className="text-[11px] text-[#0288D1] font-semibold">{alum.batch}</div>
                  <div className="mt-2 text-xs font-bold text-slate-800">{alum.role}</div>
                  <div className="text-xs text-slate-600">{alum.org}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{alum.location}</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded border border-slate-100">
                    "{alum.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout: Alumni Registration & Alumni Chapter Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Alumni Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
              <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Alumni Registration & Database Enrollment</span>
              </div>

              {registered ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Alumni Registration Recorded!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you <strong>{formData.full_name}</strong> for reconnecting with your alma mater. You have been added to the MICM Alumni Directory and will receive quarterly alumni newsletters and reunion invitations.
                  </p>
                  <button
                    onClick={() => setRegistered(false)}
                    className="mt-4 bg-[#0288D1] text-white font-bold text-xs px-6 py-2 rounded"
                  >
                    Register Another Alumnus
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        placeholder="e.g. Priyabrata Mohanty"
                        className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Programme Completed <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={formData.programme}
                        onChange={(e) => setFormData({...formData, programme: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded outline-none bg-white"
                      >
                        <option value="MBA">MBA (Master of Business Administration)</option>
                        <option value="HDCM">HDCM (Higher Diploma in Co-op Management)</option>
                        <option value="DGR">DGR Certificate Course</option>
                        <option value="InService">In-Service Training Diploma</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Passing Batch Year <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        min="1956"
                        max="2025"
                        required
                        value={formData.batch_year}
                        onChange={(e) => setFormData({...formData, batch_year: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Current Organization / Employer <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.current_company}
                        onChange={(e) => setFormData({...formData, current_company: e.target.value})}
                        placeholder="e.g. IFFCO / State Co-op Dept."
                        className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Current Designation <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.designation}
                        onChange={(e) => setFormData({...formData, designation: e.target.value})}
                        placeholder="e.g. Senior Manager / Assistant Registrar"
                        className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Current City & State <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="e.g. Bhubaneswar, Odisha"
                        className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="e.g. alumni@example.com"
                        className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Message to Alma Mater / Mentorship Interests
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Share your memories, willingness to conduct guest lectures, or offer internship slots..."
                      className="w-full p-2.5 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-6 py-2.5 rounded font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Alumni Profile</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Sidebar: Annual Alumni Meet */}
          <div className="space-y-6">
            <div className="bg-[#0B1B3D] text-white p-6 rounded-md shadow-xs">
              <div className="flex items-center gap-2 text-[#FFC107] font-bold text-xs uppercase mb-2">
                <Calendar className="w-4 h-4" />
                <span>Upcoming Event</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">Annual Alumni Reunion "Sammilani" 2026</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Mark your calendars for the Golden Jubilee Alumni Get-Together scheduled at the MICM Bhubaneswar campus auditorium.
              </p>
              <div className="text-xs text-slate-300 space-y-1 mb-4 border-t border-slate-700 pt-3">
                <div>📅 <strong>Date:</strong> 18th December 2026</div>
                <div>📍 <strong>Venue:</strong> Main Auditorium, MICM Campus</div>
                <div>⏰ <strong>Time:</strong> 10:00 AM onwards</div>
              </div>
              <button
                onClick={() => alert("RSVP registered for Annual Alumni Meet 2026. Official invitation will be sent to your email.")}
                className="w-full bg-[#FFC107] hover:bg-amber-400 text-[#0B1B3D] font-extrabold text-xs py-2 rounded shadow transition-colors"
              >
                RSVP for Alumni Meet
              </button>
            </div>

            <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs text-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900 border-b pb-2">Alumni Mentorship Initiative</h4>
              <p className="text-slate-600 leading-relaxed">
                MICM Alumni actively mentor final-year MBA students through mock interviews, CV reviews, and guest lecture sessions on emerging trends in rural banking and agricultural tech.
              </p>
              <div className="p-3 bg-sky-50 rounded border border-sky-200 text-slate-700 font-semibold">
                Interested in conducting a guest masterclass? Email us at <strong>micmbbs@gmail.com</strong>.
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}