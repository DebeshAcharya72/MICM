import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  BookOpen, 
  Monitor, 
  Home, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  ChevronRight, 
  Wifi, 
  ArrowRight,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { facilitiesData } from '../data/facilitiesData';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import FacilityCard from '../components/FacilityCard';

export default function Facilities() {
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
            <span className="text-brand-yellow">Campus & Facilities</span>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Campus & Facilities
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            A 3.4-acre green academic sanctuary in Unit-8, Nayapalli, Bhubaneswar equipped with modern learning infrastructure, computing facilities, and student residences.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold text-slate-200">
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              3.4 Acres Campus Area
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              17,000+ Library Books
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              74 Computer Nodes
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              150-Boarder Hostel Capacity
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          DETAILED ALTERNATING CAMPUS INFRASTRUCTURE SECTIONS
      ======================================================== */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {facilitiesData.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div 
              key={item.id}
              id={item.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              {/* Image Column */}
              <div className={`lg:col-span-6 ${!isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-premium group border-4 border-slate-100 aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-navy/90 text-brand-yellow text-xs font-bold px-3 py-1 rounded-full border border-brand-yellow/30 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs uppercase tracking-wider text-brand-yellow font-bold">
                      Verified Infrastructure
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Text Column */}
              <div className={`lg:col-span-6 space-y-5 ${!isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-navy text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
                  <span>{item.category}</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-slate leading-tight">
                  {item.title}
                </h3>

                <p className="text-base font-semibold text-brand-navy">
                  {item.subtitle}
                </p>

                <p className="text-sm sm:text-base text-brand-body leading-relaxed">
                  {item.description}
                </p>

                {/* Feature Bullet Points */}
                <div className="space-y-2.5 pt-2">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-slate font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ========================================================
          CAMPUS GALLERY OVERVIEW
      ======================================================== */}
      <section className="py-20 lg:py-28 bg-brand-light border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Campus Life"
            title="Infrastructure at a Glance"
            description="Explore our well-planned learning spaces, high-density computing lab, and expansive library resources in Nayapalli, Bhubaneswar."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilitiesData.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>

          <div className="mt-14 p-8 rounded-2xl bg-brand-navy text-white text-center max-w-3xl mx-auto space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Experience the MICM Campus
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Prospective students and administrative delegations are welcome to visit our 3.4-acre Nayapalli campus during working hours (Monday – Saturday: 9:30 AM – 5:30 PM).
            </p>
            <div className="pt-2">
              <Button to="/contact" variant="primary" size="md">
                Schedule a Visit or Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
