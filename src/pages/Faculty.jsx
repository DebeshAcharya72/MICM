import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, ChevronRight, ShieldCheck, Award, BookOpen } from 'lucide-react';
import { facultyData } from '../data/facultyData';
import FacultyCard from '../components/FacultyCard';

export default function Faculty() {
  return (
    <div className="bg-white">
      {/* ========================================================
          HERO BANNER
      ======================================================== */}
      <section className="relative py-24 sm:py-28 bg-brand-navy overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/80"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <nav className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-300 mb-4">
            <Link to="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-brand-yellow">Faculty Directory</span>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Our Faculty Members
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            The distinguished academic leadership and teaching fraternity at Madhusudan Institute of Co-operative Management, Bhubaneswar.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Users className="w-4 h-4 text-brand-yellow" />
              Institutional Faculty Directory
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-brand-yellow" />
              NCCT & BPUT Academic Norms
            </span>
          </div>
        </div>
      </section>


      {/* ========================================================
          FACULTY DIRECTORY GRID (Responsive 3-Column Grid)
      ======================================================== */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-navy bg-brand-yellow/20 px-3.5 py-1 rounded-full">
            Academic Mentorship
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-slate mt-3">
            Academic & Administrative Staff
          </h2>
          <p className="text-sm sm:text-base text-brand-body mt-3 leading-relaxed">
            Committed to fostering analytical depth, managerial responsibility, and cooperative governance across all academic endeavors.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyData.map((member) => (
            <FacultyCard key={member.id} member={member} />
          ))}
        </div>

        {/* Note on Academic Standards */}
        <div className="mt-16 p-6 rounded-2xl bg-brand-light border border-slate-200 text-center max-w-3xl mx-auto">
          <p className="text-xs text-brand-body leading-relaxed">
            Faculty positions and departmental responsibilities at MICM are established in conformity with the guidelines of the <strong>National Council for Cooperative Training (NCCT)</strong>, Ministry of Co-operation, Government of India, and <strong>Biju Patnaik University of Technology (BPUT)</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
