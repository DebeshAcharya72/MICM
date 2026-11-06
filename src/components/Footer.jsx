import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Twitter, 
  CheckCircle2, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { instituteData } from '../data/instituteData';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setError('Please provide a valid email address');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <footer className="bg-brand-navy text-slate-300 border-t border-brand-navy-light/40">
      {/* Top Footer Banner / Affiliation Ticker */}
      <div className="border-b border-brand-navy-light/30 py-6 px-4 sm:px-6 lg:px-8 bg-brand-navy-dark/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-yellow shrink-0" />
            <span>
              Promoted by <strong className="text-white">Ministry of Co-operation, Govt. of India</strong> & Unit of <strong className="text-white">NCCT, New Delhi</strong>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-yellow" />
              <span>AICTE Approved</span>
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-yellow" />
              <span>Affiliated to BPUT, Rourkela</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main 5-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Institute Information (col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-brand-yellow text-brand-navy flex items-center justify-center font-bold shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif font-black text-2xl text-white block tracking-tight">
                  MICM
                </span>
                <span className="text-[11px] text-slate-400 font-medium block">
                  Bhubaneswar, Odisha
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Madhusudan Institute of Co-operative Management (MICM), established in 1955-56, is an apex management education and training institute under NCCT, New Delhi, Ministry of Co-operation, Govt. of India.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href={instituteData.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-yellow hover:text-brand-navy text-slate-300 flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={instituteData.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-yellow hover:text-brand-navy text-slate-300 flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={instituteData.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-yellow hover:text-brand-navy text-slate-300 flex items-center justify-center transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={instituteData.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-yellow hover:text-brand-navy text-slate-300 flex items-center justify-center transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={instituteData.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-yellow hover:text-brand-navy text-slate-300 flex items-center justify-center transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif font-bold text-white text-base tracking-wide border-b border-brand-navy-light pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-yellow/70" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-yellow/70" />
                  <span>About MICM</span>
                </Link>
              </li>
              <li>
                <Link to="/programmes" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-yellow/70" />
                  <span>Programmes</span>
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-yellow/70" />
                  <span>Faculty Directory</span>
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-yellow/70" />
                  <span>Campus Facilities</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-yellow/70" />
                  <span>Contact & Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic & Support (col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif font-bold text-white text-base tracking-wide border-b border-brand-navy-light pb-2">
              Academic & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/programmes" className="hover:text-brand-yellow transition-colors block">
                  <span className="text-white font-medium block">BPUT Affiliation</span>
                  <span className="text-[11px] text-slate-400">Curriculum & Exam Framework</span>
                </Link>
              </li>
              <li>
                <Link to="/programmes" className="hover:text-brand-yellow transition-colors block">
                  <span className="text-white font-medium block">AICTE Recognition</span>
                  <span className="text-[11px] text-slate-400">Approved MBA Institution</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-yellow transition-colors block">
                  <span className="text-white font-medium block">NCCT Guidelines</span>
                  <span className="text-[11px] text-slate-400">National Council Regulations</span>
                </Link>
              </li>
              <li>
                <Link to="/programmes" className="hover:text-brand-yellow transition-colors block">
                  <span className="text-white font-medium block">OJEE Counselling</span>
                  <span className="text-[11px] text-slate-400">State MBA Admission Process</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information (col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif font-bold text-white text-base tracking-wide border-b border-brand-navy-light pb-2">
              Contact Info
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-yellow shrink-0 mt-0.5" />
                <span>Unit-8, Nayapalli, Bhubaneswar, Odisha - 751012</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-yellow shrink-0" />
                <a href={`tel:${instituteData.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-brand-yellow">
                  {instituteData.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-yellow shrink-0" />
                <a href={`mailto:${instituteData.email}`} className="hover:text-brand-yellow">
                  {instituteData.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-brand-yellow shrink-0" />
                <span>Mon – Sat: 9:30 AM – 5:30 PM</span>
              </div>
            </div>
          </div>

          {/* Column 5: Newsletter (col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-white text-base tracking-wide border-b border-brand-navy-light pb-2">
              Newsletter
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to official academic notifications, OJEE counselling updates, and conference announcements from MICM.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Thank you! You are subscribed to MICM updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter official email..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-brand-navy-light text-white placeholder-slate-400 border border-brand-navy-light focus:outline-none focus:border-brand-yellow"
                  />
                  <button
                    type="submit"
                    className="mt-2 w-full py-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Subscribe to Updates</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-[11px] text-rose-400">{error}</p>}
                <p className="text-[10px] text-slate-500">
                  We respect institutional privacy. No spam.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-brand-navy-light/40 py-5 px-4 sm:px-6 lg:px-8 bg-brand-navy-dark text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} Madhusudan Institute of Co-operative Management (MICM), Bhubaneswar. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs">
            <Link to="/about" className="hover:text-brand-yellow transition-colors">
              About Institute
            </Link>
            <span className="text-slate-600">•</span>
            <Link to="/contact" className="hover:text-brand-yellow transition-colors">
              Admissions
            </Link>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500">NCCT / Ministry of Co-operation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
