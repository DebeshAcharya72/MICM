import React from 'react';
import { GraduationCap, Award, Building2 } from 'lucide-react';

export default function FacultyCard({ member }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Respectful Academic Portrait Placeholder Area */}
      <div className={`relative h-60 bg-gradient-to-br ${member.avatarBg || 'from-slate-800 to-brand-navy'} flex flex-col items-center justify-center p-6 text-white overflow-hidden`}>
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Dignified Avatar Crest / Monogram Placeholder */}
        <div className="relative z-10 w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border-2 border-brand-yellow/60 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
          <span className="font-serif font-black text-2xl text-brand-yellow tracking-wider">
            {member.initials}
          </span>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-yellow text-brand-navy flex items-center justify-center shadow">
            <GraduationCap className="w-4 h-4" />
          </div>
        </div>

        {/* Leadership Tag */}
        {member.isLeadership && (
          <div className="absolute top-4 right-4 bg-brand-yellow/90 text-brand-navy text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span>Leadership</span>
          </div>
        )}

        <div className="absolute bottom-3 left-4 right-4 text-center">
          <span className="text-[11px] text-slate-300 font-medium tracking-wide">
            Madhusudan Institute of Co-operative Management
          </span>
        </div>
      </div>

      {/* Faculty Details */}
      <div className="p-6 text-center flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3 className="font-serif text-xl font-bold text-brand-slate group-hover:text-brand-navy transition-colors">
            {member.name}
          </h3>
          <div className="mt-1.5 inline-block px-3 py-1 bg-brand-yellow/15 text-brand-navy rounded-full text-xs font-bold border border-brand-yellow/30">
            {member.designation}
          </div>
          <p className="mt-3 text-xs text-brand-body leading-relaxed flex items-center justify-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{member.department}</span>
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center">
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
            Faculty Member • MICM
          </span>
        </div>
      </div>
    </div>
  );
}
