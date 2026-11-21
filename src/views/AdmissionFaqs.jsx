'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  GraduationCap, 
  IndianRupee, 
  Home as HomeIcon, 
  Briefcase, 
  FileText,
  Phone,
  Mail,
  CheckCircle2
} from 'lucide-react';

export default function AdmissionFaqs() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Eligibility & Entrance', 'Fee Structure', 'Hostel & Campus', 'Placements & Careers'];

  const faqs = [
    {
      q: "What are the eligibility criteria for admission into the 2-Year Full-Time MBA programme?",
      category: "Eligibility & Entrance",
      a: "Candidate must have passed recognized Bachelor’s Degree in any discipline (Arts, Science, Commerce, BBA, B.Tech, BCA, Agriculture, etc.) with a minimum of 50% marks in aggregate (45% for candidates belonging to SC/ST reserved categories). Final year appearing graduation candidates are also eligible to apply provisionally."
    },
    {
      q: "Which entrance exam scores are accepted for MBA admission at MICM Bhubaneswar?",
      category: "Eligibility & Entrance",
      a: "Admission to MBA is primarily conducted through the Odisha Joint Entrance Examination (OJEE) state quota web counselling. Valid scores from National level tests including CAT, MAT, CMAT, XAT and ATMA are also accepted for institutional quota counselling."
    },
    {
      q: "Is the MBA programme AICTE approved and affiliated with a recognized university?",
      category: "Eligibility & Entrance",
      a: "Yes. The MBA programme at Madhusudan Institute of Co-operative Management (MICM) is approved by the All India Council for Technical Education (AICTE), Ministry of Education, Government of India, and permanently affiliated with Biju Patnaik University of Technology (BPUT), Rourkela, Odisha."
    },
    {
      q: "What is the total fee structure for the 2-Year Full-Time MBA programme?",
      category: "Fee Structure",
      a: "The total composite academic fee for the 2-year MBA programme is ₹1,22,400 (distributed across 4 semesters at ₹30,600 per semester). This is highly affordable and subsidized compared to private business schools, in line with Government of India cooperative education guidelines."
    },
    {
      q: "Are Government scholarships available for SC/ST and OBC students?",
      category: "Fee Structure",
      a: "Yes! Eligible candidates can avail Post-Matric Scholarships through the Govt. of Odisha PRERANA portal, National Scholarship Portal (NSP), and Ministry of Social Justice & Empowerment schemes. Full tuition fee waiver is available for qualifying candidates as per state government rules."
    },
    {
      q: "What is the Higher Diploma in Co-operative Management (HDCM) and who can join?",
      category: "Eligibility & Entrance",
      a: "HDCM is a 36-week professional diploma recognized by the National Council for Cooperative Training (NCCT), New Delhi. It is designed for graduates working in cooperative banks, marketing societies, PACS, or fresh graduates seeking careers in the cooperative sector. Total course fee is ₹22,500."
    },
    {
      q: "Is hostel accommodation available on campus for boys and girls?",
      category: "Hostel & Campus",
      a: "Yes. MICM provides fully-furnished on-campus residential hostel facilities with a capacity of 150 beds (separate wings for boys and girls). Facilities include 24x7 security, hygienic cooperative mess, high-speed Wi-Fi, recreation hall, and clean drinking water (RO filtration)."
    },
    {
      q: "What are the IT Lab and Library facilities available for students?",
      category: "Hostel & Campus",
      a: "MICM has a modern air-conditioned Computer Centre with 74 desktop nodes connected to 1 Gbps NKN high-speed leased line. The library houses over 17,000 physical volumes, 70+ national & international research journals, and online subscriptions to DELNET, EBSCO, and Indiastat databases."
    },
    {
      q: "What is the placement record of MICM MBA graduates?",
      category: "Placements & Careers",
      a: "MICM has a dedicated Training & Placement (T&P) Cell with over 92% placement success. Top recruiters include national apex federations (Amul, IFFCO, KRIBHCO, NAFED), commercial banks (HDFC Bank, ICICI Bank, Axis Bank, Federal Bank), scheduled cooperative banks (Odisha State Co-op Bank), and agribusiness enterprises. The highest package is ₹9.5 LPA and average package is ₹5.8 LPA."
    },
    {
      q: "How can I apply for admission?",
      category: "Eligibility & Entrance",
      a: "You can apply directly online through our website at '/apply' by filling out the multi-step application form and uploading required details. Alternatively, you can participate in OJEE Counselling by selecting MICM Bhubaneswar (College Code) as your preference."
    }
  ];

  const filteredFaqs = faqs.filter(item => {
    return activeCategory === 'All' || item.category === activeCategory;
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B1B3D] text-white py-10 border-b-4 border-[#0288D1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-2">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <Link href="/programmes" className="hover:underline">ADMISSIONS</Link>
            <span>/</span>
            <span className="text-white">FAQS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-[#FFC107]" />
            Frequently Asked Questions (Admission FAQs)
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl">
            Find prompt answers regarding MBA & HDCM admission eligibility, OJEE cutoffs, fee structure, hostel facilities, scholarships, and placements at MICM Bhubaneswar.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-3 rounded-md border border-slate-300 shadow-xs">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                activeCategory === cat
                  ? 'bg-[#0288D1] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-sky-100 text-[#0288D1] font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      Q
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <div className="shrink-0 text-slate-400">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#0288D1]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-sky-50/30 leading-relaxed">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        A
                      </span>
                      <p>{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? Help Card */}
        <div className="mt-10 bg-[#0B1B3D] text-white p-6 sm:p-8 rounded-md shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-[#FFC107]">Still have queries regarding admissions?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Our Admission Helpdesk is ready to assist you regarding OJEE registration, document verification, hostel booking, and scholarships.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-sky-400" /> +91 674 2562826 / 2562827</span>
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-sky-400" /> micmbbs@gmail.com</span>
            </div>
          </div>

          <Link href="/apply"
            className="shrink-0 bg-[#FFC107] hover:bg-amber-400 text-[#0B1B3D] font-extrabold text-xs sm:text-sm px-6 py-3 rounded shadow-md transition-colors"
          >
            Apply Online Now
          </Link>
        </div>

      </div>
    </div>
  );
}