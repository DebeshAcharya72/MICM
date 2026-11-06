import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Send, GraduationCap } from 'lucide-react';

export default function ApplyModal({ isOpen, onClose, defaultProgramme = 'MBA' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    programme: defaultProgramme,
    qualification: '',
    message: '',
    consent: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

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
      errs.consent = 'Please confirm consent to be contacted regarding admission';
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
    // Honest client-side state notification
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      programme: 'MBA',
      qualification: '',
      message: '',
      consent: true
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/75 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-navy p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2.5 text-brand-yellow mb-2 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Admission Enquiry</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">Apply for Admission</h3>
          <p className="text-xs text-slate-300 mt-1">
            Madhusudan Institute of Co-operative Management, Bhubaneswar
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-brand-slate">
                Application Enquiry Logged
              </h4>
              <p className="text-sm text-brand-body max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-brand-slate">{formData.fullName}</strong>. Your interest in the{' '}
                <strong className="text-brand-navy">{formData.programme}</strong> programme has been recorded.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left text-brand-body space-y-2">
                <div className="flex items-center gap-2 font-semibold text-brand-slate">
                  <AlertCircle className="w-4 h-4 text-brand-yellow shrink-0" />
                  <span>Important Admission Procedures:</span>
                </div>
                <p>
                  <strong>MBA:</strong> Admissions are conducted centrally via <strong>OJEE</strong> counselling.
                </p>
                <p>
                  <strong>HDCM:</strong> Sanctioned intake of 30 seats through direct institutional application.
                </p>
                <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                  You may also contact the MICM admission desk directly at <strong>+91 674 2562826</strong> or email <strong>micmbbs@gmail.com</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 bg-brand-navy hover:bg-brand-navy-light text-white font-bold rounded-lg transition-colors text-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Priyaranjan Mohanty"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                    errors.fullName ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                      errors.email ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                      errors.phone ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1">
                  Programme Interested In *
                </label>
                <select
                  value={formData.programme}
                  onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-yellow bg-white"
                >
                  <option value="MBA">MBA — Master of Business Administration (2 Years, AICTE / BPUT / OJEE)</option>
                  <option value="HDCM">HDCM — Higher Diploma in Co-operative Management (36 Weeks, NCCT)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1">
                  Message / Query (Optional)
                </label>
                <textarea
                  rows="2"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ask about eligibility, OJEE cutoffs, or hostel accommodation..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none"
                ></textarea>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="modal-consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 rounded text-brand-navy focus:ring-brand-yellow"
                />
                <label htmlFor="modal-consent" className="text-xs text-brand-body leading-tight">
                  I agree to receive admission updates from MICM Bhubaneswar at the provided contact details.
                </label>
              </div>
              {errors.consent && <p className="text-xs text-red-500">{errors.consent}</p>}

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm mt-3"
              >
                <span>Submit Admission Enquiry</span>
                <Send className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Notice: Frontend intake demo. For urgent inquiries, please call +91 674 2562826.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
