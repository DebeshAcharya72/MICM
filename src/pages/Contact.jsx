import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap,
  Building2,
  ExternalLink
} from 'lucide-react';
import { instituteData } from '../data/instituteData';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First Name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please provide a valid phone number';
    }
    if (!formData.message.trim()) {
      errs.message = 'Message content is required';
    }
    if (!formData.consent) {
      errs.consent = 'You must accept the communication consent to proceed';
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
    // Client-side validated submission confirmation
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      consent: false,
    });
  };

  return (
    <div className="bg-white">
      {/* ========================================================
          HERO BANNER
      ======================================================== */}
      <section className="relative py-24 sm:py-28 bg-brand-navy overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/80"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <nav className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-300 mb-4">
            <Link to="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-brand-yellow">Contact</span>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Contact MICM
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Reach out to Madhusudan Institute of Co-operative Management, Bhubaneswar for academic counselling, correspondence diploma admissions, and official correspondence.
          </p>
        </div>
      </section>


      {/* ========================================================
          FOUR CONTACT INFORMATION CARDS (Univet Layout)
      ======================================================== */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Support Email */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-premium transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-yellow flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Official Email
            </span>
            <h3 className="font-serif text-lg font-bold text-brand-slate mt-1 mb-2">
              Support Email
            </h3>
            <a 
              href={`mailto:${instituteData.email}`}
              className="text-sm font-semibold text-brand-navy hover:text-brand-yellow-hover transition-colors break-all"
            >
              {instituteData.email}
            </a>
            <p className="text-xs text-brand-body mt-2">
              For general inquiries, admissions, and institutional verification.
            </p>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-premium transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-yellow flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Direct Telephone
            </span>
            <h3 className="font-serif text-lg font-bold text-brand-slate mt-1 mb-2">
              Institute Office
            </h3>
            <a 
              href={`tel:${instituteData.phone.replace(/[^0-9+]/g, '')}`}
              className="text-sm font-bold text-brand-navy hover:text-brand-yellow-hover transition-colors"
            >
              {instituteData.phone}
            </a>
            <p className="text-xs text-brand-body mt-2">
              Mon – Sat: 9:30 AM – 5:30 PM (Except official government holidays).
            </p>
          </div>

          {/* Card 3: Address */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-premium transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-yellow flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Campus Location
            </span>
            <h3 className="font-serif text-lg font-bold text-brand-slate mt-1 mb-2">
              Institute Address
            </h3>
            <p className="text-sm font-medium text-brand-slate leading-relaxed">
              Unit-8, Nayapalli, Bhubaneswar, Odisha - 751012, India.
            </p>
            <p className="text-xs text-brand-body mt-2">
              3.4-Acre campus situated in prime Bhubaneswar institutional enclave.
            </p>
          </div>

          {/* Card 4: Admissions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-premium transition-all duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-brand-yellow text-brand-navy flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Admissions Desk
            </span>
            <h3 className="font-serif text-lg font-bold text-brand-slate mt-1 mb-2">
              MBA & HDCM Intake
            </h3>
            <p className="text-sm font-medium text-brand-slate leading-relaxed">
              Official Phone: {instituteData.phone}
            </p>
            <p className="text-xs text-brand-body mt-2">
              Contact the institute using official telephone and email for authentic counselling guidance.
            </p>
          </div>

        </div>
      </section>


      {/* ========================================================
          GET IN TOUCH: 2-COLUMN FORM & MAP EMBED
      ======================================================== */}
      <section className="pb-20 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left: Navy-Blue Form Container (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-brand-navy rounded-2xl p-6 sm:p-10 text-white shadow-premium relative border border-brand-navy-light/60">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow bg-brand-yellow/15 px-3 py-1 rounded-full border border-brand-yellow/30">
                Official Correspondence
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Fill in the form below. For immediate admission or administrative queries, please use our direct office phone.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-brand-navy-light/80 border border-brand-yellow/40 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Message Details Logged
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{formData.firstName} {formData.lastName}</strong>. Your correspondence inquiry has been validated and recorded locally.
                </p>

                <div className="p-4 rounded-xl bg-brand-navy border border-slate-700 text-xs text-left text-slate-300 space-y-1.5">
                  <p className="font-semibold text-brand-yellow flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Communication Details:</span>
                  </p>
                  <p>• <strong>Email:</strong> {formData.email}</p>
                  <p>• <strong>Phone:</strong> {formData.phone}</p>
                  <p className="text-slate-400 text-[11px] pt-1">
                    Notice: This is a front-end demonstration intake interface. Official institutional responses are issued via micmbbs@gmail.com.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-lg bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. Soumya"
                      className={`w-full px-4 py-3 rounded-xl text-sm bg-brand-navy-light/80 text-white placeholder-slate-400 border transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                        errors.firstName ? 'border-rose-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.firstName && <p className="text-xs text-rose-400 mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Nayak"
                      className={`w-full px-4 py-3 rounded-xl text-sm bg-brand-navy-light/80 text-white placeholder-slate-400 border transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                        errors.lastName ? 'border-rose-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.lastName && <p className="text-xs text-rose-400 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="soumya@domain.com"
                      className={`w-full px-4 py-3 rounded-xl text-sm bg-brand-navy-light/80 text-white placeholder-slate-400 border transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                        errors.email ? 'border-rose-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 rounded-xl text-sm bg-brand-navy-light/80 text-white placeholder-slate-400 border transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                        errors.phone ? 'border-rose-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your inquiry, admission queries, or institutional visit..."
                    className={`w-full px-4 py-3 rounded-xl text-sm bg-brand-navy-light/80 text-white placeholder-slate-400 border transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none ${
                      errors.message ? 'border-rose-500' : 'border-slate-700'
                    }`}
                  ></textarea>
                  {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="contact-consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 rounded text-brand-navy focus:ring-brand-yellow"
                  />
                  <label htmlFor="contact-consent" className="text-xs text-slate-300 leading-relaxed">
                    I confirm that the details provided are accurate and consent to being contacted by MICM Bhubaneswar regarding this inquiry.
                  </label>
                </div>
                {errors.consent && <p className="text-xs text-rose-400">{errors.consent}</p>}

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wider mt-4"
                >
                  <span>Submit Now</span>
                  <Send className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-400 pt-1">
                  Note: Client-side submission validation. Urgent enquiries can be directed to +91 674 2562826.
                </p>
              </form>
            )}
          </div>

          {/* Right: Google Maps Embedded Location (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-premium overflow-hidden">
              <div className="p-5 bg-brand-light border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-brand-slate">
                    Campus Location Map
                  </h3>
                  <p className="text-xs text-brand-body">
                    Unit-8, Nayapalli, Bhubaneswar, Odisha - 751012
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Madhusudan+Institute+of+Co-operative+Management+Bhubaneswar"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-brand-navy hover:text-brand-yellow transition-colors"
                  title="Open in Google Maps"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              {/* Responsive Iframe Container */}
              <div className="relative w-full h-[440px] sm:h-[480px] bg-slate-100">
                <iframe
                  src={instituteData.googleMapsEmbedUrl}
                  title="MICM Bhubaneswar Google Maps Location"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Transit & Landmark Guide */}
              <div className="p-5 bg-white border-t border-slate-100 text-xs text-brand-body space-y-2">
                <div className="flex items-center gap-2 font-semibold text-brand-slate">
                  <Building2 className="w-4 h-4 text-brand-navy" />
                  <span>Landmark & Accessibility:</span>
                </div>
                <p>
                  Located in the prominent administrative area of Unit-8, Nayapalli, Bhubaneswar, adjacent to major state government directorates and easily accessible via public transit from Bhubaneswar Railway Station (approx. 5 km) and Biju Patnaik International Airport (approx. 6 km).
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
