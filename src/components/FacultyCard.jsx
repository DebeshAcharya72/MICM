import React from 'react';
import Link from 'next/link';
import { GraduationCap, Award, Building2, BookOpen, ChevronRight } from 'lucide-react';

export default function FacultyCard({ member }) {
  const getInitials = (name) => {
    if (member.initials) return member.initials;
    if (!name) return 'FM';
    const parts = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s*/i, '').trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  };

  const isLeadership = member.isLeadership || (member.designation && (
    member.designation.toLowerCase().includes('director') || 
    member.designation.toLowerCase().includes('principal') ||
    member.designation.toLowerCase().includes('dean')
  ));

  const facultyHref = `/faculty/${member.slug || member.id}`;

  return (
    <Link 
      href={facultyHref}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col group hover:-translate-y-1 block cursor-pointer"
    >
      {/* Respectful Academic Portrait Header */}
      <div className={`relative h-64 bg-gradient-to-br ${member.avatarBg || 'from-slate-900 via-brand-navy to-slate-950'} flex flex-col items-center justify-center p-6 text-white overflow-hidden`}>
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Faculty Portrait (Uploaded Photo or Monogram Placeholder) */}
        {member.image_url ? (
          <div className="relative z-10 w-28 h-28 rounded-full border-3 border-amber-400 p-1 bg-white shadow-xl group-hover:scale-105 transition-transform duration-300 overflow-hidden">
            <img
              src={member.image_url}
              alt={member.name}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                // Graceful fallback to monogram on broken image link
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              style={{ display: 'none' }}
              className="w-full h-full rounded-full bg-slate-800 text-amber-300 flex items-center justify-center font-serif font-black text-xl"
            >
              {getInitials(member.name)}
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-brand-yellow text-brand-navy flex items-center justify-center shadow">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
        ) : (
          <div className="relative z-10 w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border-2 border-brand-yellow/60 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <span className="font-serif font-black text-2xl text-brand-yellow tracking-wider">
              {getInitials(member.name)}
            </span>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-yellow text-brand-navy flex items-center justify-center shadow">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Leadership Tag */}
        {isLeadership && (
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
            <span>{member.department || 'Management & Cooperative Studies'}</span>
          </p>

          {member.qualifications && (
            <p className="mt-2 text-xs text-slate-600 bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-100 flex items-center justify-center gap-1 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{member.qualifications}</span>
            </p>
          )}

          {member.expertise && (
            <p className="mt-2 text-[11px] text-slate-500 italic">
              Specialization: {member.expertise}
            </p>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-medium uppercase tracking-wider text-slate-500">
            View Profile
          </span>
          <span className="text-brand-navy font-semibold flex items-center gap-1 group-hover:text-[#0288D1] transition-colors">
            <span>MICM BBSR</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
