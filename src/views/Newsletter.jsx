'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Newspaper, Download, FileText, Calendar, CheckCircle2, ChevronRight, Mail, Send } from 'lucide-react';
import { portalData } from '../data/portalData';

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="bg-white min-h-[70vh] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-3">
          <Link href="/" className="hover:text-[#0288D1]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0288D1] font-bold">Newsletter</span>
        </nav>

        {/* Title Header */}
        <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0288D1] bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
              Official Institutional Publication
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              MICM Sahakar Varta — Newsletter
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Quarterly publication documenting academic milestones, cooperative management MDPs, research initiatives, and national sector news at MICM Bhubaneswar.
            </p>
          </div>

          <div className="shrink-0 bg-slate-50 border border-slate-200 p-3 rounded text-xs text-slate-700">
            <span className="font-bold block text-slate-900">ISSN Registered</span>
            <span>Quarterly Periodical &nbsp;|&nbsp; NCCT / Govt. of India</span>
          </div>
        </div>

        {/* Current & Recent Issues Grid */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-slate-900">
            Recent Published Editions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portalData.newsletters.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-300 rounded overflow-hidden shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-[#0288D1] text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                      {item.period}
                    </span>
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900 hover:text-[#0288D1] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                      Key Highlights:
                    </span>
                    {item.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="text-slate-700 flex items-start gap-1.5">
                        <span className="text-[#0288D1]">•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Format: PDF Document
                  </span>
                  <button
                    type="button"
                    onClick={() => alert(`Downloading "${item.title}" [PDF].\n\nPreserved in MICM Institutional Repository.`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold text-xs rounded transition-colors shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription Box */}
        <div className="bg-gradient-to-r from-[#0b1b3d] to-[#142754] text-white p-6 sm:p-8 rounded shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-lg">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Free Digital Subscription</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Receive MICM Sahakar Varta in Your Inbox
            </h3>
            <p className="text-xs text-slate-300">
              Stay informed on upcoming training schedules, policy announcements from the Ministry of Cooperation, and academic articles.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            {subscribed ? (
              <div className="bg-emerald-900/80 border border-emerald-500 text-emerald-200 px-4 py-3 rounded text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thank you! Your email is registered for quarterly issues.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter official email address..."
                  required
                  className="px-3.5 py-2 text-xs rounded bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs rounded transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
