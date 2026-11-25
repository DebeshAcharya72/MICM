'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  MapPin, 
  Share2, 
  ArrowRight,
  PartyPopper
} from 'lucide-react';
import { api } from '../services/api';

export default function CampusEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchEvents() {
      try {
        const data = await api.getCampusEvents();
        if (isMounted && Array.isArray(data)) {
          setEvents(data);
        }
      } catch (err) {
        console.error("Failed to load campus events:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ========================================================
          HERO BANNER
      ======================================================== */}
      <section className="relative py-20 sm:py-24 bg-brand-navy overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/85" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <nav className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-300 mb-4">
            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300">Student Life</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-brand-yellow">Campus Events</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Vibrancy & Happenings</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Campus Events & Activities
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Discover life at MICM beyond the classroom — national cooperative symposiums, industry leadership conclaves, annual cultural celebrations, and student initiatives.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold text-slate-200">
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-yellow" />
              Year-Round Seminars & Workshops
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 flex items-center gap-1.5">
              <PartyPopper className="w-3.5 h-3.5 text-emerald-400" />
              Annual Fest 'SAMANWAYA'
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              MICM Campus Auditorium & Lawns
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          EVENTS GRID
      ======================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0288D1]">
              Recent & Upcoming
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Event Gallery & Highlights
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-xs sm:text-right">
            Curated photographic highlights and updates from recent institute gatherings.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm animate-pulse">
                <div className="h-52 bg-slate-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-16 bg-slate-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loaded Events Grid */}
        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((ev, index) => (
              <article 
                key={ev.id || index}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Event Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  {ev.image_url ? (
                    <img
                      src={ev.image_url}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0c2a5c] to-[#103a7d] flex flex-col items-center justify-center text-white/40 p-4">
                      <Sparkles className="w-12 h-12 mb-2 text-white/30" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/60">MICM Event</span>
                    </div>
                  )}

                  {/* Date Badge Overlay */}
                  <div className="absolute top-3 left-3 bg-[#0B1B3D]/90 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 shadow-md border border-white/10">
                    <Calendar className="w-3 h-3 text-[#FFC107]" />
                    <span>{ev.date}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#0288D1] transition-colors line-clamp-2 mb-3">
                    {ev.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-4 flex-1">
                    {ev.description || "Join us at the Madhusudan Institute of Cooperative Management for engaging student activities, academic discussions, and professional growth opportunities."}
                  </p>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      MICM Bhubaneswar
                    </span>
                    <span className="text-[#0288D1] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Events Scheduled</h3>
            <p className="text-xs text-slate-500 mt-1">
              Campus event schedules and celebrations are updated regularly. Please check back soon or visit our Notice Board.
            </p>
            <div className="mt-6">
              <Link 
                href="/" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0288D1] hover:underline"
              >
                Return to Homepage <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
