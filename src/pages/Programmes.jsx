import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Award, 
  IndianRupee, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  Briefcase,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { programmesData } from '../data/programmeData';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import ApplyModal from '../components/ApplyModal';

export default function Programmes() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState('MBA');
  const [activeTab, setActiveTab] = useState('all');

  const mba = programmesData.find(p => p.id === 'mba');
  const hdcm = programmesData.find(p => p.id === 'hdcm');

  const handleApply = (code) => {
    setSelectedProgramme(code);
    setApplyModalOpen(true);
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
            backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/80"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <nav className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-300 mb-4">
            <Link to="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-brand-yellow">Academic Programmes</span>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Our Academic Programmes
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Rigorous post-graduate and executive qualifications designed for tomorrow's business leaders and cooperative administrators.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#mba-section"
              className="px-4 py-2 rounded-lg bg-brand-yellow text-brand-navy font-bold text-xs hover:bg-brand-yellow-hover transition-colors shadow-sm"
            >
              MBA (2 Years)
            </a>
            <a
              href="#hdcm-section"
              className="px-4 py-2 rounded-lg bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
            >
              HDCM (36 Weeks)
            </a>
          </div>
        </div>
      </section>


      {/* ========================================================
          PROGRAMME 1: MBA FULL DETAILS & FEE STRUCTURE
      ======================================================== */}
      <section id="mba-section" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="space-y-12">
          
          {/* Header & Badges */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-brand-yellow text-brand-navy text-xs font-black uppercase px-3 py-1 rounded-full shadow-sm">
                  Postgraduate Degree
                </span>
                <span className="bg-brand-light text-brand-slate border border-slate-300 text-xs font-semibold px-3 py-1 rounded-full">
                  AICTE Approved • BPUT Affiliated
                </span>
                <span className="bg-brand-navy text-white text-xs font-semibold px-3 py-1 rounded-full">
                  OJEE Admission
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-slate">
                MBA — Master of Business Administration
              </h2>

              <p className="text-base text-brand-body mt-3 max-w-3xl leading-relaxed">
                A rigorous two-year full-time post-graduate management curriculum designed to build analytical decision-making, strategic leadership, and functional management acumen across modern business and institutional domains.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                type="button"
                onClick={() => handleApply('MBA')}
                className="px-6 py-3.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>Apply for MBA</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-2xl bg-brand-light border border-slate-200">
              <Clock className="w-6 h-6 text-brand-navy mb-2" />
              <span className="text-[11px] uppercase font-bold text-slate-400 block">Duration</span>
              <span className="font-serif font-bold text-lg text-brand-slate mt-0.5 block">2 Years</span>
              <span className="text-xs text-brand-body">Full-Time Academic Program</span>
            </div>

            <div className="p-5 rounded-2xl bg-brand-light border border-slate-200">
              <Calendar className="w-6 h-6 text-brand-navy mb-2" />
              <span className="text-[11px] uppercase font-bold text-slate-400 block">Semesters</span>
              <span className="font-serif font-bold text-lg text-brand-slate mt-0.5 block">4 Semesters</span>
              <span className="text-xs text-brand-body">16 Weeks per Semester</span>
            </div>

            <div className="p-5 rounded-2xl bg-brand-light border border-slate-200">
              <Briefcase className="w-6 h-6 text-brand-navy mb-2" />
              <span className="text-[11px] uppercase font-bold text-slate-400 block">Summer Internship</span>
              <span className="font-serif font-bold text-lg text-brand-slate mt-0.5 block">7 Weeks</span>
              <span className="text-xs text-brand-body">Hands-on Industry Project</span>
            </div>

            <div className="p-5 rounded-2xl bg-brand-navy text-white">
              <IndianRupee className="w-6 h-6 text-brand-yellow mb-2" />
              <span className="text-[11px] uppercase font-bold text-slate-300 block">Total Investment</span>
              <span className="font-serif font-black text-2xl text-brand-yellow mt-0.5 block">₹1,22,400</span>
              <span className="text-xs text-slate-300">Complete 2-Year Program</span>
            </div>
          </div>

          {/* Eligibility & Admission Procedure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-brand-slate mb-3">
                <GraduationCap className="w-5 h-5 text-brand-navy" />
                <span>Eligibility Requirements</span>
              </div>
              <p className="text-sm text-brand-body leading-relaxed">
                Candidates must hold a Bachelor’s degree in any discipline from a recognized University or Institute with the minimum requisite marks as stipulated by state technical education norms.
              </p>
              <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Valid <strong>OJEE Rank</strong> is mandatory for participating in centralized admission.</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-brand-slate mb-3">
                <FileCheck className="w-5 h-5 text-brand-navy" />
                <span>Admission Framework</span>
              </div>
              <p className="text-sm text-brand-body leading-relaxed">
                Admissions are governed strictly through the <strong>Odisha Joint Entrance Examination (OJEE)</strong> central counselling process. Selected candidates must complete document verification and fee deposition as per OJEE scheduling.
              </p>
              <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-brand-navy flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-navy shrink-0" />
                <span>Affiliated to Biju Patnaik University of Technology (BPUT), Rourkela.</span>
              </div>
            </div>
          </div>

          {/* MBA Fee Structure Table */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-slate">
                  MBA Comprehensive Fee Structure
                </h3>
                <p className="text-xs sm:text-sm text-brand-body mt-1">
                  Verified institutional fee schedule across both academic years.
                </p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-brand-light text-brand-navy border border-slate-200 text-xs font-semibold">
                Approved by BPUT / AICTE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Year 1 Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
                <div className="bg-brand-navy px-6 py-4 text-white flex items-center justify-between">
                  <span className="font-serif font-bold text-lg">First Year (Year 1)</span>
                  <span className="text-xs bg-brand-yellow text-brand-navy px-2.5 py-0.5 rounded-full font-bold">
                    Total: ₹66,400
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Fee Component</th>
                        <th className="px-6 py-3 font-semibold text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mba.feeStructure.firstYear.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-6 py-3.5 text-brand-slate font-medium">{item.component}</td>
                          <td className="px-6 py-3.5 text-brand-slate font-semibold text-right">{item.formatted}</td>
                        </tr>
                      ))}
                      <tr className="bg-brand-light font-bold text-brand-navy border-t-2 border-slate-200">
                        <td className="px-6 py-4">{mba.feeStructure.firstYearTotal.component}</td>
                        <td className="px-6 py-4 text-right text-brand-navy text-base">{mba.feeStructure.firstYearTotal.formatted}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Year 2 Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
                <div className="bg-brand-navy px-6 py-4 text-white flex items-center justify-between">
                  <span className="font-serif font-bold text-lg">Second Year (Year 2)</span>
                  <span className="text-xs bg-brand-yellow text-brand-navy px-2.5 py-0.5 rounded-full font-bold">
                    Total: ₹56,000
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Fee Component</th>
                        <th className="px-6 py-3 font-semibold text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mba.feeStructure.secondYear.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-6 py-3.5 text-brand-slate font-medium">{item.component}</td>
                          <td className="px-6 py-3.5 text-brand-slate font-semibold text-right">{item.formatted}</td>
                        </tr>
                      ))}
                      <tr className="bg-brand-light font-bold text-brand-navy border-t-2 border-slate-200">
                        <td className="px-6 py-4">{mba.feeStructure.secondYearTotal.component}</td>
                        <td className="px-6 py-4 text-right text-brand-navy text-base">{mba.feeStructure.secondYearTotal.formatted}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Grand Total Highlight Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-navy to-brand-navy-light text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-yellow text-brand-navy rounded-xl font-bold">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-300 font-bold block">
                    Two-Year Cumulative Cost
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-yellow">
                    Grand Total: ₹1,22,400
                  </h4>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleApply('MBA')}
                className="px-6 py-3 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow"
              >
                Apply for MBA 2026-27
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          PROGRAMME 2: HDCM FULL DETAILS & SPECIFICATIONS
      ======================================================== */}
      <section id="hdcm-section" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          {/* Header & Badges */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-brand-yellow text-brand-navy text-xs font-black uppercase px-3 py-1 rounded-full shadow-sm">
                  Professional Diploma
                </span>
                <span className="bg-brand-light text-brand-slate border border-slate-300 text-xs font-semibold px-3 py-1 rounded-full">
                  NCCT, New Delhi
                </span>
                <span className="bg-brand-navy text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Sanctioned Intake: 30 Seats
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-slate">
                HDCM — Higher Diploma in Co-operative Management
              </h2>

              <p className="text-base text-brand-body mt-3 max-w-3xl leading-relaxed">
                A prestigious 36-week professional diploma conducted in correspondence mode tailored for working professionals, cooperative functionaries, and graduates seeking sectoral expertise in institutional governance.
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => handleApply('HDCM')}
                className="px-6 py-3.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>Apply for HDCM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-2xl bg-brand-light border border-slate-200">
              <Clock className="w-6 h-6 text-brand-navy mb-2" />
              <span className="text-[11px] uppercase font-bold text-slate-400 block">Duration</span>
              <span className="font-serif font-bold text-lg text-brand-slate mt-0.5 block">36 Weeks</span>
              <span className="text-xs text-brand-body">Flexible Schedule</span>
            </div>

            <div className="p-5 rounded-2xl bg-brand-light border border-slate-200">
              <BookOpen className="w-6 h-6 text-brand-navy mb-2" />
              <span className="text-[11px] uppercase font-bold text-slate-400 block">Learning Mode</span>
              <span className="font-serif font-bold text-lg text-brand-slate mt-0.5 block">Correspondence</span>
              <span className="text-xs text-brand-body">With Contact Classes</span>
            </div>

            <div className="p-5 rounded-2xl bg-brand-light border border-slate-200">
              <GraduationCap className="w-6 h-6 text-brand-navy mb-2" />
              <span className="text-[11px] uppercase font-bold text-slate-400 block">Intake Capacity</span>
              <span className="font-serif font-bold text-lg text-brand-slate mt-0.5 block">30 Seats</span>
              <span className="text-xs text-brand-body">Batch: 2026-27</span>
            </div>

            <div className="p-5 rounded-2xl bg-brand-navy text-white">
              <IndianRupee className="w-6 h-6 text-brand-yellow mb-2" />
              <span className="text-[11px] uppercase font-bold text-slate-300 block">Comprehensive Fee</span>
              <span className="font-serif font-black text-2xl text-brand-yellow mt-0.5 block">₹22,500</span>
              <span className="text-xs text-slate-300">Boarding & Lodging Included</span>
            </div>
          </div>

          {/* Detailed Course Highlights & Boarding Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Left: Critical Inclusions Note */}
            <div className="p-8 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Important Fee Inclusions Notice</span>
                </div>
                <h4 className="font-serif text-xl font-bold text-brand-slate mb-3">
                  Course Fee Inclusions (₹22,500)
                </h4>
                <p className="text-sm text-brand-body leading-relaxed">
                  The comprehensive course fee of <strong>₹22,500</strong> includes tuition, instructional course materials, and <strong>full boarding and lodging arrangements</strong> at the MICM campus during scheduled contact sessions and examinations.
                </p>
                <p className="text-xs text-slate-600 mt-3">
                  This inclusive residential facility ensures outstation and working participants have hassle-free stay and focus during their intensive training phases.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200 text-xs font-semibold text-amber-900">
                Conducted under the National Council for Cooperative Training (NCCT), New Delhi.
              </div>
            </div>

            {/* Right: Eligibility & Intake */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-soft flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-navy bg-brand-yellow/20 px-3 py-1 rounded-full">
                  Eligibility Criteria
                </span>
                <h4 className="font-serif text-xl font-bold text-brand-slate mt-3 mb-2">
                  Graduate Eligibility
                </h4>
                <p className="text-sm text-brand-body leading-relaxed">
                  Candidates must be graduates in any discipline from a recognized University. Preferred for personnel working in cooperative societies, banking institutions, and developmental sectors.
                </p>
                
                <div className="mt-4 space-y-2 text-xs text-brand-slate">
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Target Batch: <strong>2026-27</strong></span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Total Sanctioned Intake: <strong>30 Candidates</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleApply('HDCM')}
                  className="px-5 py-2.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold rounded-lg text-xs transition-colors"
                >
                  Apply for HDCM Batch
                </button>
                <Link to="/contact" className="text-xs text-brand-navy font-bold hover:underline">
                  Contact Admissions
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Reusable Apply Modal */}
      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        defaultProgramme={selectedProgramme}
      />
    </div>
  );
}
