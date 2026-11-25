'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Calendar, 
  Users, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  Building2, 
  Laptop, 
  BookOpen, 
  ShieldCheck, 
  TrendingUp, 
  Download,
  PhoneCall
} from 'lucide-react';

export default function Training() {
  const trainingStreams = [
    {
      title: "PACS Computerization & Digital ERP",
      category: "Priority National Mission",
      description: "Equipping Primary Agricultural Credit Society (PACS) secretaries, accountants, and staff with hands-on ERP navigation, cyber resilience, accounting standards, and e-governance.",
      icon: Laptop,
      color: "from-blue-600 to-indigo-700",
      stats: "350+ PACS Trained"
    },
    {
      title: "Cooperative Banking & Financial Management",
      category: "BFSI & StCB / DCCB",
      description: "Advanced banking operations, NPA recovery, regulatory compliance under RBI & NABARD directives, treasury management, and risk evaluation for cooperative bank personnel.",
      icon: TrendingUp,
      color: "from-emerald-600 to-teal-700",
      stats: "45+ Banking Batches"
    },
    {
      title: "Leadership & Cooperative Governance",
      category: "Senior Management & Board",
      description: "Strategic planning, board effectiveness, legal compliance under Odisha Cooperative Societies Act, and ethical leadership for board directors and chief executives.",
      icon: Users,
      color: "from-amber-500 to-orange-600",
      stats: "1,200+ Executives"
    },
    {
      title: "Directorate General Resettlement (DGR)",
      category: "Defense Personnel Rehabilitation",
      description: "Dedicated certificate programs in retail, agribusiness, and cooperative entrepreneurship empowering retired and transitioning Indian Armed Forces personnel.",
      icon: ShieldCheck,
      color: "from-red-600 to-rose-700",
      stats: "National Recognition"
    },
    {
      title: "Management Development Programmes (MDP)",
      category: "Customized Executive Training",
      description: "Tailor-made capacity building for apex cooperative federations (MARKFED, OMFED, BOYANKA) focusing on marketing, supply chain, and brand positioning.",
      icon: Award,
      color: "from-purple-600 to-indigo-800",
      stats: "Custom Modules"
    },
    {
      title: "Statutory Audit & Legal Compliance",
      category: "Cooperative Inspectors & Registrars",
      description: "Specialized in-service workshops for cooperative auditors, departmental inspectors, and assistant registrars on inspection standards, enquiry protocols, and fraud detection.",
      icon: BookOpen,
      color: "from-cyan-600 to-blue-700",
      stats: "Annual Refresher"
    }
  ];

  const facilities = [
    {
      name: "Smart Air-Conditioned Classrooms",
      desc: "Equipped with high-definition digital smart boards, surround audio, and hybrid video conferencing facilities."
    },
    {
      name: "74-Node Dedicated Computer Laboratory",
      desc: "Gigabit-connected computing center pre-loaded with cooperative ERP software, accounting packages, and banking simulation tools."
    },
    {
      name: "On-Campus Executive Guest House",
      desc: "Comfortable air-conditioned lodging and dining arrangements for participating delegates from across India."
    },
    {
      name: "Cooperative Reference Library",
      desc: "Over 17,000 catalogued volumes, journals, and case studies on national and global cooperative movements."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* ========================================================
          HERO BANNER
      ======================================================== */}
      <section className="relative py-20 sm:py-28 bg-[#0B1B3D] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B3D] via-[#0B1B3D]/95 to-[#0B1B3D]/85" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <nav className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-300 mb-4">
            <Link href="/" className="hover:text-[#FFC107] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300">Training Wing</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#FFC107]">Overview</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC107]/10 border border-[#FFC107]/20 text-[#FFC107] text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>National Council for Cooperative Training (NCCT)</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Centre for Executive & Cooperative Training
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            The Madhusudan Institute of Co-operative Management (MICM) stands as Odisha's premier training academy for cooperative enterprises, financial institutions, and grassroots rural development organizations.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/training-calendar"
              className="px-6 py-3 bg-[#FFC107] hover:bg-[#ffcd38] text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2 text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Explore Training Calendar 2024-25</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="/contact"
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-lg border border-white/20 transition-all duration-200 inline-flex items-center gap-2 text-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#FFC107]" />
              <span>Nominate Delegates / Inquire</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-8 text-white">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FFC107]">500+</div>
              <div className="text-xs text-slate-400 mt-1">Training Programmes Hosted</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FFC107]">15,000+</div>
              <div className="text-xs text-slate-400 mt-1">Personnel Trained</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FFC107]">30+</div>
              <div className="text-xs text-slate-400 mt-1">Districts of Odisha Covered</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FFC107]">100%</div>
              <div className="text-xs text-slate-400 mt-1">NCCT / Ministry Sponsored Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          MISSION & ROLE
      ======================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0288D1]">
              Capacity Building Mandate
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Transforming the Cooperative Landscape with Specialized Knowledge
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Established under the administrative aegis of the National Council for Cooperative Training (NCCT), New Delhi (Ministry of Cooperation, Govt. of India), MICM's Training Wing serves as the knowledge catalyst for Odisha's cooperative movement.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              From equipping Primary Agricultural Credit Societies (PACS) with seamless digital accounting under the National PACS Computerization Project, to conducting rigorous statutory compliance modules for cooperative departmental officers, our curriculum bridges grassroots operational reality with modern managerial best practices.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Government of India & NCCT Sponsored Modules",
                "Hands-on Computerized Simulation & Case Studies",
                "Dedicated Faculty & Industry Guest Lecturers",
                "Post-Training Performance Evaluation & Certificates"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Upcoming Programme Highlights</h3>
                <p className="text-xs text-slate-500">Live batches open for institutional nominations</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
                <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-bold uppercase mb-1">
                  PACS Computerization
                </span>
                <h4 className="text-xs font-bold text-slate-800">
                  Digital ERP Implementation for Primary Agricultural Societies
                </h4>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>Duration: 3 Days</span>
                  <span className="text-emerald-700 font-semibold">Nomination Open</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
                <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold uppercase mb-1">
                  Banking & Credit
                </span>
                <h4 className="text-xs font-bold text-slate-800">
                  NPA Management & Recovery Protocols for DCCBs
                </h4>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>Duration: 5 Days</span>
                  <span className="text-emerald-700 font-semibold">Nomination Open</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-center">
              <Link
                href="/training-calendar"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0288D1] hover:text-[#01579b]"
              >
                <span>View Full Month-Wise Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          TRAINING STREAMS GRID
      ======================================================== */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0288D1]">
              Specialized Portfolios
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Core Training Programmes & Streams
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Carefully engineered modules addressing the evolving compliance, technology, and managerial needs of the cooperative sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingStreams.map((st, i) => {
              const Icon = st.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${st.color} text-white flex items-center justify-center shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {st.stats}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-[#0288D1] uppercase tracking-wide">
                      {st.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-1 mb-2">
                      {st.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {st.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/training-calendar"
                      className="text-xs font-bold text-slate-700 hover:text-[#0288D1] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Check schedule</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          CAMPUS TRAINING INFRASTRUCTURE
      ======================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0288D1]">
            World-Class Amenities
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Training Infrastructure & Delegate Facilities
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Comfortable, residential, and technologically advanced learning environments designed for focused professional immersion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all duration-200">
              <Building2 className="w-7 h-7 text-[#0288D1] mb-3" />
              <h3 className="font-bold text-slate-900 text-sm mb-2">{fac.name}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{fac.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA BANNER */}
        <div className="mt-16 bg-gradient-to-r from-[#0c2a5c] via-[#103a7d] to-[#0c2a5c] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold">
              Looking for institutional training or calendar nominations?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Download the official annual training brochure or contact our Training Coordinator directly for batch reservations and customized MDPs.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/training-calendar"
              className="px-5 py-2.5 bg-[#FFC107] hover:bg-[#ffcd38] text-slate-900 font-bold rounded-lg text-xs shadow-md transition-all inline-flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Training Calendar</span>
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg text-xs border border-white/20 transition-all inline-flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
