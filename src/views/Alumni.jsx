'use client';

import React, { useState, useEffect } from 'react';
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
  HeartHandshake,
  Linkedin,
  ExternalLink,
  Camera,
  Loader2
} from 'lucide-react';
import { api } from '../services/api';

export default function Alumni() {
  const [alumniList, setAlumniList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    batch_year: '2020',
    programme: 'MBA',
    current_company: '',
    designation: '',
    email: '',
    phone: '',
    city: '',
    message: '',
    image_url: '',
    linkedin_url: ''
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchAlumni() {
      try {
        const data = await api.getAlumni();
        if (isMounted && Array.isArray(data)) {
          setAlumniList(data);
        }
      } catch (err) {
        console.error("Failed to load alumni:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchAlumni();
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoPreview(URL.createObjectURL(file));
    setUploadingPhoto(true);
    setSubmitError('');

    try {
      const res = await api.uploadImage(file);
      if (res && res.url) {
        setFormData((prev) => ({ ...prev, image_url: res.url }));
      }
    } catch (err) {
      console.error("Photo upload error:", err);
      setSubmitError(err.message || "Failed to upload photo. Please try again.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      await api.submitAlumniRequest(formData);
      setRegistered(true);
    } catch (err) {
      console.error("Alumni request submission failed:", err);
      setSubmitError(err.message || 'Failed to submit registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
        
        {/* Dynamic Alumni Showcase */}
        <div className="mb-12">
          <div className="border-b pb-3 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
            <div>
              <h2 className="text-xl font-bold text-[#0B1B3D]">Distinguished Alumni in Leadership Roles</h2>
              <p className="text-xs text-slate-500 mt-1">Celebrating our graduates who lead cooperative federations, banking institutions, and enterprises across India.</p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
              {alumniList.length} Profile{alumniList.length === 1 ? '' : 's'} Showcased
            </span>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white border border-slate-200 rounded-md p-5 shadow-xs animate-pulse space-y-3">
                  <div className="w-16 h-16 bg-slate-200 rounded-full" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                  <div className="h-3 bg-slate-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          )}

          {/* Loaded Alumni Cards */}
          {!loading && alumniList.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {alumniList.map((alum, i) => {
                const initials = alum.name
                  ? alum.name
                      .split(' ')
                      .filter(Boolean)
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()
                  : 'AL';

                return (
                  <div 
                    key={alum.id || i} 
                    className="bg-white border border-slate-300 rounded-md p-5 shadow-xs flex flex-col justify-between hover:border-[#0288D1] hover:shadow-md transition-all group"
                  >
                    <div>
                      {/* Photo / Fallback Monogram */}
                      <div className="mb-4">
                        {alum.image_url ? (
                          <img
                            src={alum.image_url}
                            alt={alum.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-[#0288D1] shadow-xs group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-sky-100 text-[#0288D1] rounded-full flex items-center justify-center font-bold text-lg border-2 border-sky-200 shadow-xs">
                            {initials}
                          </div>
                        )}
                      </div>

                      {/* Name & Batch */}
                      <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#0288D1] transition-colors">
                        {alum.name}
                      </h3>
                      {alum.batch && (
                        <div className="text-[11px] text-[#0288D1] font-semibold mt-0.5">
                          {alum.batch}
                        </div>
                      )}

                      {/* Current Role & Company */}
                      {alum.current_role && (
                        <div className="mt-2.5 text-xs font-bold text-slate-800 flex items-start gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{alum.current_role}</span>
                        </div>
                      )}

                      {alum.company && (
                        <div className="text-xs text-slate-600 font-medium flex items-start gap-1.5 mt-1">
                          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{alum.company}</span>
                        </div>
                      )}
                    </div>

                    {/* LinkedIn Button */}
                    {alum.linkedin_url && (
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <a
                          href={alum.linkedin_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0077b5] hover:bg-[#005f93] text-white rounded text-[11px] font-bold shadow-2xs transition-colors w-full justify-center"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>Connect on LinkedIn</span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && alumniList.length === 0 && (
            <div className="bg-white border border-dashed border-slate-300 rounded-md p-10 text-center text-slate-500">
              <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No Alumni Profiles Listed Yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Alumni profiles can be added directly via the Admin Panel CMS.
              </p>
            </div>
          )}
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
                    Thank you <strong>{formData.full_name}</strong> for reconnecting with your alma mater. Your profile has been sent to the Institute Administrator for review and directory listing.
                  </p>
                  <button
                    onClick={() => {
                      setRegistered(false);
                      setPhotoPreview('');
                      setFormData({
                        full_name: '',
                        batch_year: '2020',
                        programme: 'MBA',
                        current_company: '',
                        designation: '',
                        email: '',
                        phone: '',
                        city: '',
                        message: '',
                        image_url: '',
                        linkedin_url: ''
                      });
                    }}
                    className="mt-4 bg-[#0288D1] text-white font-bold text-xs px-6 py-2 rounded"
                  >
                    Register Another Alumnus
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
                  {/* Photo Upload */}
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Alumni Profile Photo (Optional)
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-300 bg-white flex items-center justify-center overflow-hidden shrink-0">
                        {photoPreview || formData.image_url ? (
                          <img
                            src={photoPreview || formData.image_url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded cursor-pointer border border-slate-300 text-xs transition-colors">
                          <Camera className="w-3.5 h-3.5 text-[#0288D1]" />
                          <span>{uploadingPhoto ? "Uploading to ImgBB..." : "Upload Photo"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoUpload}
                            disabled={uploadingPhoto}
                          />
                        </label>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Square photo, max 5MB. Will be displayed on your verified alumni card.
                        </p>
                      </div>
                    </div>
                  </div>

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
                        Current Role / Designation <span className="text-red-600">*</span>
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

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        LinkedIn Profile URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.linkedin_url}
                        onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                        placeholder="https://linkedin.com/in/yourprofile"
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

                  {submitError && (
                    <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200 text-xs font-semibold">
                      {submitError}
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={submitting || uploadingPhoto}
                      className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-6 py-2.5 rounded font-bold text-xs flex items-center gap-2 shadow-xs transition-colors disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Alumni Profile</span>
                        </>
                      )}
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
