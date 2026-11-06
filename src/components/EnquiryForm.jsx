import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, Mail } from 'lucide-react';
import { instituteData } from '../data/instituteData';

export default function EnquiryForm({ dark = true, defaultProgramme = 'MBA' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    programme: defaultProgramme,
    message: '',
    consent: true,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.consent) {
      errs.consent = 'Please agree to contact terms';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    // Client-side intake confirmation
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      programme: defaultProgramme,
      message: '',
      consent: true,
    });
  };

  if (submitted) {
    return (
      <div className={`rounded-2xl p-8 text-center space-y-4 border ${
        dark 
          ? 'bg-brand-navy-light/60 border-brand-yellow/30 text-white' 
          : 'bg-white border-slate-200 text-brand-slate shadow-soft'
      }`}>
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold">
          Enquiry Form Completed
        </h3>
        <p className={`text-sm leading-relaxed max-w-md mx-auto ${dark ? 'text-slate-300' : 'text-brand-body'}`}>
          Thank you, <strong className={dark ? 'text-white' : 'text-brand-slate'}>{formData.fullName}</strong>. Your enquiry regarding the{' '}
          <strong className="text-brand-yellow">{formData.programme}</strong> programme has been validated and recorded locally.
        </p>

        <div className={`p-4 rounded-xl text-xs text-left max-w-md mx-auto space-y-2 border ${
          dark ? 'bg-brand-navy border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center gap-2 font-semibold text-brand-yellow">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Official Admission Information:</span>
          </div>
          <p>
            • <strong>MBA Admissions:</strong> Conducted centrally via <strong>OJEE</strong> counselling rounds.
          </p>
          <p>
            • <strong>HDCM Diploma:</strong> Direct institutional applications (30 seats) under NCCT norms.
          </p>
          <p className="pt-1 border-t border-slate-700/40 text-[11px]">
            To speak directly with the admissions desk, call <strong className="text-brand-yellow">{instituteData.phone}</strong> or email <strong className="text-brand-yellow">{instituteData.email}</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-4 px-6 py-2.5 rounded-lg bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-2xl p-6 sm:p-8 space-y-4 border ${
      dark 
        ? 'bg-brand-navy text-white border-brand-navy-light/60 shadow-xl' 
        : 'bg-white text-brand-slate border-slate-200 shadow-soft'
    }`}>
      <div>
        <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
          dark ? 'text-slate-200' : 'text-brand-slate'
        }`}>
          Full Name *
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="e.g. Ramesh Chandra Das"
          className={`w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
            dark 
              ? 'bg-brand-navy-light/80 text-white placeholder-slate-400 border border-slate-700 focus:bg-brand-navy-light' 
              : 'bg-slate-50 text-brand-slate placeholder-slate-400 border border-slate-200 focus:bg-white'
          } ${errors.fullName ? 'border-rose-500' : ''}`}
        />
        {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
            dark ? 'text-slate-200' : 'text-brand-slate'
          }`}>
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@domain.com"
            className={`w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
              dark 
                ? 'bg-brand-navy-light/80 text-white placeholder-slate-400 border border-slate-700 focus:bg-brand-navy-light' 
                : 'bg-slate-50 text-brand-slate placeholder-slate-400 border border-slate-200 focus:bg-white'
            } ${errors.email ? 'border-rose-500' : ''}`}
          />
          {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
            dark ? 'text-slate-200' : 'text-brand-slate'
          }`}>
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className={`w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
              dark 
                ? 'bg-brand-navy-light/80 text-white placeholder-slate-400 border border-slate-700 focus:bg-brand-navy-light' 
                : 'bg-slate-50 text-brand-slate placeholder-slate-400 border border-slate-200 focus:bg-white'
            } ${errors.phone ? 'border-rose-500' : ''}`}
          />
          {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
          dark ? 'text-slate-200' : 'text-brand-slate'
        }`}>
          Programme Interested In *
        </label>
        <select
          value={formData.programme}
          onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow cursor-pointer ${
            dark 
              ? 'bg-brand-navy-light text-white border border-slate-700' 
              : 'bg-slate-50 text-brand-slate border border-slate-200'
          }`}
        >
          <option value="MBA" className="text-brand-slate bg-white">
            MBA — Master of Business Administration (2 Years, AICTE / BPUT)
          </option>
          <option value="HDCM" className="text-brand-slate bg-white">
            HDCM — Higher Diploma in Co-operative Management (36 Weeks, NCCT)
          </option>
        </select>
      </div>

      <div>
        <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
          dark ? 'text-slate-200' : 'text-brand-slate'
        }`}>
          Message / Specific Query
        </label>
        <textarea
          rows="3"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Enter details regarding eligibility criteria, batch schedule, or hostel facilities..."
          className={`w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none ${
            dark 
              ? 'bg-brand-navy-light/80 text-white placeholder-slate-400 border border-slate-700 focus:bg-brand-navy-light' 
              : 'bg-slate-50 text-brand-slate placeholder-slate-400 border border-slate-200 focus:bg-white'
          }`}
        ></textarea>
      </div>

      <div className="flex items-start gap-2 pt-1">
        <input
          type="checkbox"
          id="consent-check"
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 rounded text-brand-navy focus:ring-brand-yellow"
        />
        <label htmlFor="consent-check" className={`text-xs leading-relaxed ${dark ? 'text-slate-300' : 'text-brand-body'}`}>
          I authorize MICM Bhubaneswar to contact me via phone or email regarding admission counselling and academic schedules.
        </label>
      </div>
      {errors.consent && <p className="text-xs text-rose-400">{errors.consent}</p>}

      <button
        type="submit"
        className="w-full py-4 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wider mt-4"
      >
        <span>Submit Enquiry</span>
        <Send className="w-4 h-4" />
      </button>

      <p className="text-[11px] text-center text-slate-400 pt-1">
        Front-end enquiry intake. Official admissions are finalized strictly through OJEE counselling & NCCT guidelines.
      </p>
    </form>
  );
}
