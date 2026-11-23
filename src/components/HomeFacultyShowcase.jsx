'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Building2, 
  Award, 
  ChevronRight, 
  BookOpen, 
  Users 
} from 'lucide-react';
import { api } from '@/services/api';

export default function HomeFacultyShowcase() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const data = await api.getFaculty();
        if (Array.isArray(data) && data.length > 0) {
          setFacultyList(data);
        }
      } catch (err) {
        console.warn('Could not load faculty showcase data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'FM';
    const parts = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s*/i, '').trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  };

  const isLeadership = (designation) => {
    if (!designation) return false;
    const d = designation.toLowerCase();
    return d.includes('director') || d.includes('principal') || d.includes('dean') || d.includes('head');
  };

  // Slice to show only the top 3-4 senior faculty members
  const showcaseMembers = facultyList.slice(0, 4);

  return (
    <section className="bg-white border-y border-slate-200 py-10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0288D1] uppercase tracking-wider mb-1">
              <Users className="w-4 h-4" />
              <span>Academic Leadership &amp; Faculty</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Distinguished Faculty &amp; Mentors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Experienced academicians, researchers, and cooperative management specialists guiding our students towards professional excellence.
            </p>
          </div>

          <Link
            href="/faculty"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0288D1] hover:text-[#0277bd] transition-colors shrink-0 group self-start md:self-end"
          >
            <span>View Full Faculty Directory</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {showcaseMembers.map((member) => {
            const leadership = isLeadership(member.designation);
            return (
              <div
                key={member.id}
                className="bg-slate-50 border border-slate-300 rounded-xl p-5 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Leadership Accent */}
                {leadership && (
                  <div className="absolute top-3 right-3 bg-amber-400/20 text-amber-900 border border-amber-300/60 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-700" />
                    <span>Leadership</span>
                  </div>
                )}

                {/* Faculty Portrait / Fallback Monogram */}
                <div className="mt-2 mb-3 relative">
                  {member.image_url ? (
                    <div className="w-24 h-24 rounded-full border-3 border-amber-400 p-1 bg-white shadow-md overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
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
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-slate-800 text-amber-300 border-3 border-amber-400 flex items-center justify-center font-serif font-black text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                      {getInitials(member.name)}
                    </div>
                  )}

                  <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-md">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Faculty Details */}
                <div className="space-y-1.5 w-full flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#0288D1] transition-colors leading-snug">
                      {member.name}
                    </h3>
                    <div className="mt-1 inline-block px-2.5 py-0.5 bg-[#0288D1]/10 text-[#0288D1] rounded-full text-xs font-bold border border-[#0288D1]/20">
                      {member.designation}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-2 flex items-center justify-center gap-1 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{member.department || 'Management Studies'}</span>
                    </p>
                  </div>

                  {member.qualifications && (
                    <div className="pt-3 border-t border-slate-200/80 mt-2">
                      <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1 font-mono truncate" title={member.qualifications}>
                        <BookOpen className="w-3 h-3 text-amber-600 shrink-0" />
                        <span className="truncate">{member.qualifications}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout / Full Directory Link */}
        <div className="pt-2 text-center">
          <Link
            href="/faculty"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1B3D] hover:bg-slate-900 text-white rounded-md text-xs font-bold shadow-xs hover:shadow-md transition-all group"
          >
            <span>Explore All Faculty &amp; Academic Profiles</span>
            <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
