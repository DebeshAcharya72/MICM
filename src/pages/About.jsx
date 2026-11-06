import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  History, 
  Users, 
  Target, 
  Compass, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  GraduationCap, 
  CheckCircle2, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { instituteData } from '../data/instituteData';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

export default function About() {
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'About MICM', icon: Building2 },
    { id: 'history', label: 'Institute History', icon: History },
    { id: 'vision-mission', label: 'Vision & Mission', icon: Target },
    { id: 'leadership', label: 'Administration & Leadership', icon: Users },
    { id: 'affiliations', label: 'Affiliations & Approvals', icon: ShieldCheck },
  ];

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-300 mb-4">
            <Link to="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-brand-yellow">About MICM</span>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            About MICM
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            A pioneering management education and cooperative training institution established in 1955-56 in Bhubaneswar, Odisha.
          </p>
        </div>
      </section>


      {/* ========================================================
          MAIN SECTION: 2-COLUMN LAYOUT WITH UNIVET SIDEBAR
      ======================================================== */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Sidebar Navigation (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-brand-light p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Navigation
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-slate mt-0.5">
                  Institute Overview
                </h3>
              </div>

              <div className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left ${
                        isActive
                          ? 'bg-brand-navy text-white shadow-md'
                          : 'text-brand-slate hover:bg-white hover:text-brand-navy'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-brand-yellow' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-brand-yellow' : 'opacity-40'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Quick Contact Card */}
              <div className="pt-4 border-t border-slate-200">
                <div className="p-4 rounded-xl bg-brand-navy text-white text-xs space-y-2">
                  <div className="flex items-center gap-2 text-brand-yellow font-bold">
                    <GraduationCap className="w-4 h-4" />
                    <span>Admission Enquiries</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Contact our administration for session details and entrance counselling.
                  </p>
                  <p className="text-brand-yellow font-bold pt-1">{instituteData.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-16">

            {/* Sub-Section 1: Overview & Asymmetrical Image Composition */}
            <div id="overview" className="scroll-mt-32 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-navy text-xs font-bold uppercase tracking-wider mb-3">
                  <span>Institutional Heritage</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-slate">
                  Legacy of Academic & Sectoral Leadership
                </h2>
              </div>

              {/* Univet Asymmetrical Two-Image Composition */}
              <div className="relative pt-4 pb-8 pr-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Students Image */}
                  <div className="sm:col-span-7 rounded-2xl overflow-hidden shadow-premium border-4 border-white aspect-[4/3] bg-brand-navy">
                    <img
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                      alt="Management Students Collaborating"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Campus Image */}
                  <div className="sm:col-span-5 rounded-2xl overflow-hidden shadow-lg border-4 border-white aspect-[3/4] bg-brand-navy sm:-ml-6 z-10 hidden sm:block">
                    <img
                      src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80"
                      alt="MICM Campus Grounds"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Decorative Academic Icon Badge */}
                <div className="absolute -bottom-2 sm:bottom-2 left-6 bg-brand-navy border-2 border-brand-yellow text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="p-2 bg-brand-yellow text-brand-navy rounded-lg">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-300 block">Unit of</span>
                    <span className="font-serif font-black text-sm text-brand-yellow">NCCT, New Delhi</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-base text-brand-body leading-relaxed pt-4">
                <p>
                  <strong className="text-brand-slate">Madhusudan Institute of Co-operative Management (MICM)</strong>, Bhubaneswar, is one of India's premier management education and cooperative development institutes. Established in the academic year <strong>1955-56</strong>, the institute carries nearly seven decades of dedication to fostering administrative capacity, corporate stewardship, and cooperative governance.
                </p>
                <p>
                  Promoted by the <strong>Ministry of Co-operation, Government of India</strong>, and functioning under the administrative oversight of the <strong>National Council for Cooperative Training (NCCT), New Delhi</strong>, MICM bridges academic excellence with sectoral demands across Odisha and the eastern region.
                </p>
                <p>
                  The institute is affiliated to <strong>Biju Patnaik University of Technology (BPUT), Rourkela</strong>, and its post-graduate management curriculum is approved by the <strong>All India Council for Technical Education (AICTE), New Delhi</strong>.
                </p>
              </div>
            </div>


            {/* Sub-Section 2: History */}
            <div id="history" className="scroll-mt-32 pt-8 border-t border-slate-200 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy text-white text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Foundational Journey</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-slate">
                Institute History & Milestone Years
              </h3>
              
              <div className="p-6 rounded-2xl bg-brand-light border border-slate-200 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-yellow flex items-center justify-center font-serif font-bold text-lg shrink-0">
                    55
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-brand-slate">
                      1955-56: Historic Establishment
                    </h4>
                    <p className="text-sm text-brand-body mt-1 leading-relaxed">
                      Founded to develop professional administrative competencies for cooperative institutions, state federations, and public credit organizations during India's formative post-independence planning era.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-slate-200">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow text-brand-navy flex items-center justify-center font-serif font-bold text-lg shrink-0">
                    PG
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-brand-slate">
                      Expansion into Full-Time Management Degree
                    </h4>
                    <p className="text-sm text-brand-body mt-1 leading-relaxed">
                      Evolved to introduce the flagship 2-year full-time MBA programme approved by AICTE and affiliated to BPUT, while sustaining executive correspondence training through the 36-week HDCM diploma.
                    </p>
                  </div>
                </div>
              </div>
            </div>


            {/* Sub-Section 3: Vision & Mission */}
            <div id="vision-mission" className="scroll-mt-32 pt-8 border-t border-slate-200 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-navy text-xs font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-brand-navy" />
                <span>Guiding Philosophy</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-slate">
                Vision & Mission
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vision Box */}
                <div className="bg-brand-navy text-white p-8 rounded-2xl shadow-lg border-t-4 border-brand-yellow flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-brand-yellow text-brand-navy flex items-center justify-center mb-4">
                      <Target className="w-5 h-5" />
                    </div>
                    <span className="text-xs uppercase font-bold tracking-widest text-brand-yellow block">
                      Our Vision
                    </span>
                    <p className="font-serif text-lg sm:text-xl font-medium text-slate-100 mt-3 leading-relaxed italic">
                      "{instituteData.vision}"
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-300">
                    Sustainable Development for State, Region & Nation
                  </div>
                </div>

                {/* Mission Box */}
                <div className="bg-brand-light text-brand-slate p-8 rounded-2xl shadow-soft border border-slate-200 border-t-4 border-brand-navy flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-yellow flex items-center justify-center mb-4">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="text-xs uppercase font-bold tracking-widest text-brand-navy block">
                      Our Mission
                    </span>
                    <p className="font-serif text-lg sm:text-xl font-semibold text-brand-slate mt-3 leading-relaxed italic">
                      "{instituteData.mission}"
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-brand-body">
                    Capacity Building & Innovative Skill Training
                  </div>
                </div>
              </div>
            </div>


            {/* Sub-Section 4: Administration & Leadership */}
            <div id="leadership" className="scroll-mt-32 pt-8 border-t border-slate-200 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-navy text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-brand-navy" />
                <span>Executive Leadership</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-slate">
                Message from the Director
              </h3>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
                  {/* Portrait Placeholder */}
                  <div className="w-24 h-24 rounded-full bg-brand-navy text-brand-yellow border-4 border-brand-yellow/50 flex items-center justify-center font-serif font-black text-2xl shrink-0 shadow-md">
                    PK
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-xs uppercase font-bold text-brand-navy bg-brand-yellow/20 px-2.5 py-0.5 rounded-full">
                      Institutional Head
                    </span>
                    <h4 className="font-serif text-2xl font-bold text-brand-slate mt-1">
                      {instituteData.director.name}
                    </h4>
                    <p className="text-sm font-semibold text-brand-navy">
                      {instituteData.director.designation}
                    </p>
                    <p className="text-xs text-brand-body mt-0.5">
                      Madhusudan Institute of Co-operative Management
                    </p>
                  </div>
                </div>

                <div className="pt-6 space-y-3.5 text-sm sm:text-base text-brand-body leading-relaxed">
                  {instituteData.director.messagePoints.map((point, idx) => (
                    <p key={idx}>{point}</p>
                  ))}
                </div>
              </div>
            </div>


            {/* Sub-Section 5: Affiliations & Approvals (3 Attractive Cards) */}
            <div id="affiliations" className="scroll-mt-32 pt-8 border-t border-slate-200 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-navy text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-navy" />
                <span>Statutory Standing</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-slate">
                Affiliations & Regulatory Approvals
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {instituteData.affiliations.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-brand-light border border-slate-200 hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-yellow flex items-center justify-center font-bold text-xs mb-4">
                        {item.abbr}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        {item.badge}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-brand-slate group-hover:text-brand-navy transition-colors mt-1">
                        {item.title}
                      </h4>
                      <p className="mt-3 text-xs text-brand-body leading-relaxed">
                        {item.body}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Compliant & Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
