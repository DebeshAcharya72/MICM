import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, GraduationCap, CheckCircle2, ArrowRight, IndianRupee, Users } from 'lucide-react';
import Button from './Button';

export default function ProgrammeCard({ programme, onApplyClick }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Image Header with Univet-style Overlay */}
      <div className="relative h-64 overflow-hidden bg-brand-navy">
        <img
          src={programme.image}
          alt={programme.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="bg-brand-yellow text-brand-navy font-bold text-xs px-3 py-1 rounded-full shadow-sm">
            {programme.badge}
          </span>
          {programme.seats && (
            <span className="bg-white/90 text-brand-navy font-semibold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
              <Users className="w-3.5 h-3.5 text-brand-navy" />
              <span>{programme.seats} Seats</span>
            </span>
          )}
        </div>

        {/* Floating Fee Tag */}
        <div className="absolute bottom-4 right-4 bg-brand-navy/95 border border-brand-yellow/40 text-white px-3.5 py-1.5 rounded-xl shadow-lg backdrop-blur-md">
          <span className="text-[10px] uppercase font-bold text-slate-300 block">Total Fee</span>
          <span className="font-serif font-black text-lg text-brand-yellow">
            {programme.totalFee}
          </span>
        </div>

        {/* Code Overlay */}
        <div className="absolute bottom-4 left-4 text-white">
          <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold block">
            Programme Code
          </span>
          <span className="font-serif font-black text-2xl text-white tracking-tight">
            {programme.code}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-2xl font-bold text-brand-slate group-hover:text-brand-navy transition-colors">
            {programme.title}
          </h3>
          
          <p className="text-xs font-semibold text-brand-yellow bg-brand-navy px-3 py-1 rounded-md inline-block mt-2">
            {programme.affiliation}
          </p>

          <p className="mt-4 text-sm text-brand-body leading-relaxed">
            {programme.shortDescription}
          </p>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-brand-slate font-medium">
              <Clock className="w-4 h-4 text-brand-navy shrink-0" />
              <span><strong>Duration:</strong> {programme.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-slate font-medium">
              <GraduationCap className="w-4 h-4 text-brand-navy shrink-0" />
              <span><strong>Level:</strong> {programme.level}</span>
            </div>
          </div>

          {/* Highlights checklist */}
          <div className="mt-5 space-y-2">
            {programme.highlights.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-brand-body">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
          <Link
            to="/programmes"
            className="text-xs font-bold text-brand-navy hover:text-brand-yellow-hover flex items-center gap-1 group/link"
          >
            <span>View Syllabus & Fees</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>

          <button
            type="button"
            onClick={() => onApplyClick && onApplyClick(programme.code)}
            className="px-4 py-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold text-xs rounded-lg transition-all shadow-sm hover:shadow"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
}
