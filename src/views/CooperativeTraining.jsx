"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  Award,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Laptop,
  BookOpen,
  ShieldCheck,
  TrendingUp,
  Download,
  Briefcase,
  FileCheck2,
  Compass,
  PhoneCall,
  MapPin,
  Mail,
  Sparkles,
  Layers,
  GraduationCap,
} from "lucide-react";

export default function CooperativeTraining() {
  const targetAudiences = [
    {
      title: "Primary Agricultural Credit Societies (PACS)",
      desc: "Secretaries, accountants, cashiers, and core operational staff of grassroots credit cooperatives seeking digital proficiency and accounting rigor.",
      icon: Laptop,
      badge: "Grassroots Focus",
    },
    {
      title: "LAMPS & Farmers Service Societies (FSS)",
      desc: "Executives and managers of Large-Sized Adivasi Multipurpose Cooperative Societies managing tribal produce, credit, and agro-inputs.",
      icon: Users,
      badge: "Tribal & Rural Multi-purpose",
    },
    {
      title: "Cooperative Banking Cadres (StCB & DCCBs)",
      desc: "Branch managers, loan officers, and inspection personnel across Odisha State Cooperative Bank and District Central Cooperative Banks.",
      icon: TrendingUp,
      badge: "Banking & Financial Services",
    },
    {
      title: "Government Officials & Regulators",
      desc: "Assistant Registrars (ARCS), cooperative inspectors, auditors, and departmental executives from the Directorate of Cooperation, Govt. of Odisha.",
      icon: ShieldCheck,
      badge: "Statutory & Governance",
    },
    {
      title: "Apex Federations & Commodity Cooperatives",
      desc: "Managerial cadres from state-level federations including MARKFED, OMFED (Milk Union), BOYANKA (Handloom), and FISHFED.",
      icon: Building2,
      badge: "Supply Chain & Marketing",
    },
    {
      title: "Elected Boards of Directors (BoDs)",
      desc: "Presidents, vice-presidents, and directors of cooperative boards navigating policy formulation, member equity, and strategic leadership.",
      icon: Award,
      badge: "Elected Leadership",
    },
  ];

  const methodologies = [
    {
      step: "01",
      title: "Interactive Classroom & Discourse",
      desc: "Concept-driven lectures delivered by eminent academic faculty, senior cooperative registrars, and banking practitioners utilizing multimedia smart classrooms.",
      icon: BookOpen,
    },
    {
      step: "02",
      title: "Hands-on ERP & Lab Simulations",
      desc: "Practical sessions in MICM's 74-terminal air-conditioned Computer Laboratory featuring live national PACS Computerization ERP software simulations.",
      icon: Laptop,
    },
    {
      step: "03",
      title: "Case Studies & Syndicate Discussions",
      desc: "Critical analysis of real-world cooperative successes and turnaround case studies, encouraging peer problem-solving and participatory leadership.",
      icon: Users,
    },
    {
      step: "04",
      title: "Field Immersion & Best-Practice Visits",
      desc: "Exposure visits to premier model PACS, modern dairy processing complexes, cold chain hubs, and DCCB branches across Odisha and neighbouring regions.",
      icon: Compass,
    },
    {
      step: "05",
      title: "Impact Assessment & NCCT Certification",
      desc: "Structured pre- and post-training diagnostics, project submissions, and authorized certification recognized by NCCT and the Ministry of Cooperation.",
      icon: FileCheck2,
    },
  ];

  const keyProgrammes = [
    {
      title: "Digital PACS ERP & Computerization",
      tagline: "National Priority Initiative",
      description:
        "Comprehensive training on the Government of India standard ERP software for PACS secretaries and data operators covering member registries, day-book, ledger, and digital credit disbursement.",
      duration: "3 to 5 Days (Residential)",
      intake: "30 Participants / Batch",
      highlights: [
        "National ERP Architecture",
        "Cybersecurity & Data Backups",
        "Audit Trail & Direct Benefit Transfers (DBT)",
      ],
    },
    {
      title: "Leadership & Strategic Governance for BoDs",
      tagline: "Board Empowerment Series",
      description:
        "Empowering elected board members on corporate governance, rights and duties under the Odisha Cooperative Societies Act, strategic financial oversight, and business diversification.",
      duration: "2 to 3 Days",
      intake: "25 Directors / Batch",
      highlights: [
        "Fiduciary Responsibilities",
        "Bylaw Reforms & Compliance",
        "Conflict Resolution & Member Trust",
      ],
    },
    {
      title: "Credit Appraisal, NPA Recovery & Risk Mitigation",
      tagline: "Cooperative Banking Excellence",
      description:
        "Rigorous training for lending officers on KCC assessment, agri-allied project appraisal, early warning delinquency tracking, SARFAESI provisions, and legal recovery proceedings.",
      duration: "3 Days",
      intake: "30 Officers / Batch",
      highlights: [
        "Credit Risk Scoring",
        "Recovery Mechanisms & Lok Adalats",
        "NABARD Norms & Refinancing",
      ],
    },
    {
      title: "Statutory Audit, Inspection & Legal Compliance",
      tagline: "Institutional Accountability",
      description:
        "In-depth workshop for cooperative auditors and inspectors on accounting principles, forensic audit, detection of irregularities, and framing statutory inspection reports.",
      duration: "3 to 5 Days",
      intake: "35 Departmental Auditors",
      highlights: [
        "Statutory Audit Protocols",
        "Voucher Verification & Bank Reconciliation",
        "Statutory Penalties & Surcharge",
      ],
    },
    {
      title: "Agri-Value Chain, FPO Integration & Cooperative Marketing",
      tagline: "Market Linkage & Value Addition",
      description:
        "Guiding cooperatives to establish custom hiring centres, grain storage, multi-service hubs, and market linkages with apex bodies like MARKFED and NAFED.",
      duration: "3 Days",
      intake: "30 Managers / Batch",
      highlights: [
        "Post-Harvest Storage & Warehousing",
        "e-NAM & Direct Trade Linkages",
        "Packaging, Branding & Cold Chain",
      ],
    },
    {
      title: "Women Empowerment & Micro-Enterprise Cooperatives",
      tagline: "Inclusive Cooperative Development",
      description:
        "Capacity building for leaders of Women Self-Help Groups (WSHGs) transitioning into registered cooperatives, focusing on book-keeping, micro-credit, and value-added enterprise.",
      duration: "3 Days",
      intake: "30 Women Entrepreneurs",
      highlights: [
        "Microfinance Best Practices",
        "Group Dynamics & Credit Rotation",
        "Government Subsidies & Cluster Schemes",
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ========================================================
          HERO BANNER
      ======================================================== */}
      <section className="relative py-20 sm:py-24 bg-[#0B1B3D] text-white overflow-hidden">
        {/* Subtle patterned overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B3D] via-[#0B1B3D]/95 to-[#0288D1]/80"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-5">
            <Link href="/" className="hover:text-[#FFC107] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300">Academics &amp; Training</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#FFC107]">Cooperative Training</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-amber-300 mb-4 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>
                National Council for Cooperative Training (NCCT) Mandate
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Cooperative Training &amp; Capacity Building
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Empowering grassroots cooperatives, banking functionaries, and
              departmental cadres across Eastern India through professional
              development, digital transformation, and ethical governance under
              the vision of <em>&ldquo;Sahakar Se Samriddhi&rdquo;</em>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold">
              <Link
                href="/training-calendar"
                className="bg-[#FFC107] hover:bg-amber-400 text-[#0B1B3D] px-5 py-2.5 rounded shadow-sm font-bold flex items-center gap-2 transition-transform hover:scale-102"
              >
                <Download className="w-4 h-4" />
                <span>View Annual Training Calendar</span>
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded flex items-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-300" />
                <span>Enquire for Custom MDP</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          1. INTRODUCTION: OVERVIEW OF CAPACITY BUILDING
      ======================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#0288D1] bg-sky-50 border border-sky-200 px-3 py-1 rounded-md mb-3">
                Institutional Mandate
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] tracking-tight">
                Catalyzing Excellence in Cooperative Management
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                As a premier training institution operating under the aegis of
                the{" "}
                <strong>
                  National Council for Cooperative Training (NCCT)
                </strong>
                , Ministry of Cooperation, Government of India,{" "}
                <strong>
                  Madhusudan Institute of Co-operative Management (MICM)
                </strong>{" "}
                serves as the focal hub for cooperative human resource
                development across Odisha and eastern states.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
                Our short-term, medium-term, and modular capacity-building
                interventions are specifically designed to bridge the
                operational gap between grassroots traditional cooperatives and
                the emerging digital economy. From onboarding computerised
                accounting for Primary Agricultural Credit Societies to guiding
                apex directors on regulatory compliance under NABARD and RBI
                frameworks, MICM equips stakeholders to build self-reliant,
                transparent, and economically vibrant cooperative enterprises.
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-2xl font-black text-[#0288D1]">50+</div>
                  <div className="text-xs text-slate-600 font-medium mt-0.5">
                    Annual Programmes
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-2xl font-black text-[#0288D1]">
                    2,500+
                  </div>
                  <div className="text-xs text-slate-600 font-medium mt-0.5">
                    Officials Trained / Yr
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-2xl font-black text-[#0288D1]">100%</div>
                  <div className="text-xs text-slate-600 font-medium mt-0.5">
                    NCCT Certified
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80"
                  alt="MICM Training Classroom Discussion"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    Ministry of Cooperation Focus
                  </p>
                  <p className="text-sm font-bold mt-1">
                    Strengthening Cooperative Federalism &amp; Grassroots
                    Sustainability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TARGET AUDIENCE: WHOM WE TRAIN
      ======================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0288D1] bg-sky-100/70 px-3 py-1 rounded-full">
              Participants &amp; Stakeholders
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] mt-3">
              Target Audience &amp; Beneficiaries
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our specialized training tracks are curated for operational
              cadres, executive leadership, and supervisory authorities across
              the cooperative spectrum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudiences.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0288D1] flex items-center justify-center group-hover:bg-[#0288D1] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#0B1B3D] group-hover:text-[#0288D1] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] text-[#0288D1] font-semibold">
                    <span>Tailored curriculum &amp; practical labs</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. TRAINING METHODOLOGY & PEDAGOGY
      ======================================================== */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0288D1] bg-sky-100/70 px-3 py-1 rounded-full">
              Academic Rigor
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] mt-3">
              Comprehensive Training Methodology
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Combining theoretical foundations with experiential learning,
              technology labs, and ground-level immersion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {methodologies.map((method, idx) => {
              const Icon = method.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 flex flex-col justify-between relative group hover:bg-sky-50/50 hover:border-sky-300 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-slate-400 group-hover:text-[#0288D1]">
                        STEP {method.step}
                      </span>
                      <Icon className="w-4 h-4 text-[#0288D1]" />
                    </div>
                    <h3 className="font-bold text-sm text-[#0B1B3D] leading-snug">
                      {method.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {method.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Infrastructure highlight bar */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-slate-900 to-[#0B1B3D] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-amber-300">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base">
                  State-of-the-Art 74-Node PACS Computerization Lab
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  High-speed enterprise LAN, dedicated training servers, and
                  live deployment testing environment for ERP users.
                </p>
              </div>
            </div>
            <Link
              href="/facilities"
              className="shrink-0 bg-white hover:bg-slate-100 text-[#0B1B3D] px-4 py-2 rounded text-xs font-bold transition-colors"
            >
              Tour Campus Facilities
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. KEY PROGRAMMES
      ======================================================== */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0288D1] bg-sky-100/70 px-3 py-1 rounded-full">
                Curriculum Portfolio
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] mt-3">
                Flagship Training Programmes
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Representative examples of structured training modules regularly
                scheduled throughout the academic and operational calendar.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="/training-calendar"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0288D1] hover:text-[#0B1B3D] transition-colors"
              >
                <span>View Full Training Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyProgrammes.map((prog, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-extrabold text-[#0288D1] uppercase tracking-wide">
                      {prog.tagline}
                    </span>
                    <span className="text-slate-500 font-medium">
                      {prog.duration}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0B1B3D] leading-snug">
                    {prog.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Key Modules Covered:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {prog.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">Intake: {prog.intake}</span>
                  <Link
                    href="/contact"
                    className="font-bold text-[#0288D1] hover:underline"
                  >
                    Nominate Batch &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. CTA & ENQUIRY FOR SPONSORING ORGANISATIONS
      ======================================================== */}
      <section className="py-14 bg-gradient-to-r from-[#0B1B3D] to-[#0288D1] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Require a Custom Training Module for Your Cooperative Federation?
            </h3>
            <p className="text-sm text-slate-200 mt-1 max-w-2xl">
              MICM organizes customized on-campus and in-situ Management
              Development Programmes (MDPs) customized to your
              organization&apos;s operational priorities.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contact"
              className="bg-[#FFC107] hover:bg-amber-400 text-[#0B1B3D] font-extrabold px-5 py-2.5 rounded text-xs transition-transform hover:scale-102 shadow"
            >
              Contact Training Division
            </Link>
            <Link
              href="/downloads"
              className="bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 px-5 py-2.5 rounded text-xs transition-colors"
            >
              Download Brochures
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
