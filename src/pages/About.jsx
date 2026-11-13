import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  History as HistoryIcon, 
  Users, 
  Target, 
  ShieldCheck, 
  ChevronRight, 
  Award, 
  CheckCircle2, 
  Cpu, 
  BookOpen, 
  Briefcase, 
  HeartHandshake, 
  Compass,
  FileText
} from 'lucide-react';
import { instituteData } from '../data/instituteData';

export default function About() {
  const [activeTab, setActiveTab] = useState('history');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setActiveTab(id);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  const sidebarLinks = [
    { id: 'history', label: 'History' },
    { id: 'madhusudan', label: 'Utkal Gourav Madhusudan Das' },
    { id: 'director', label: "Director's Desk" },
    { id: 'vision', label: 'Vision, Mission and Focus' },
    { id: 'structure', label: 'Organization Structure' },
    { id: 'centres', label: 'Centres at MICM' },
    { id: 'mandate', label: 'Mandate of MICM' },
    { id: 'management', label: 'Management Committee' },
  ];

  const centres = [
    { name: "Centre for Information Technology", icon: Cpu, color: "bg-teal-600", desc: "Digital PACS, ERP and Computing Infrastructure" },
    { name: "Centre for Cooperative Management", icon: HeartHandshake, color: "bg-emerald-600", desc: "Cooperative governance, credit unions and banking" },
    { name: "Centre for Management Education", icon: BookOpen, color: "bg-sky-600", desc: "Full-time MBA & Higher Diploma Programmes" },
    { name: "Centre for Research, Consultancy & Publication", icon: FileText, color: "bg-amber-600", desc: "Sectoral studies, field evaluations & research journals" },
    { name: "Centre for Entrepreneurship Development", icon: Briefcase, color: "bg-indigo-600", desc: "FPO incubation, agri-business & collective enterprise" },
    { name: "Centre for Training Information System", icon: Compass, color: "bg-blue-700", desc: "Curriculum tracking & national training databases" },
  ];

  return (
    <div className="bg-white min-h-[70vh] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-3">
          <Link to="/" className="hover:text-[#0288D1]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700">About Us</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0288D1] font-bold capitalize">{activeTab}</span>
        </nav>

        {/* 2-Column VAMNICOM Style Layout (Image 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar (Dark Teal / Cyan Menu) */}
          <div className="lg:col-span-3 bg-[#00171f] text-white rounded overflow-hidden shadow-sm">
            <div className="bg-[#0288D1] px-4 py-3 font-bold text-sm tracking-wide text-white uppercase">
              About MICM
            </div>
            <div className="divide-y divide-slate-800 text-xs font-semibold">
              {sidebarLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-4 py-3 transition-colors flex items-center justify-between ${
                    activeTab === item.id
                      ? 'bg-[#004e64] text-white font-bold border-l-4 border-amber-400'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Main Content Pane */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Title: Green Serif (Exact VAMNICOM Style) */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-800">
                History
              </h1>
              <div className="w-16 h-1 bg-emerald-700 mt-1"></div>
            </div>

            {/* Box 1: About MICM History Content */}
            <div id="history" className="border border-slate-300 rounded p-5 sm:p-6 text-xs sm:text-[13px] text-slate-800 leading-relaxed space-y-4 bg-white shadow-2xs">
              <h2 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                About MICM
              </h2>
              
              <p>
                In the historic academic year <strong>1955-56</strong>, a high-level committee appointed by the Government of India recommended the establishment of apex regional institutes to assess and address the training needs of the co-operative sector. It was recommended to set up specialized training institutes to undertake the training of senior personnel in co-operative institutions/departments, conduct fundamental and applied research, and provide consultancy services.
              </p>
              
              <p>
                Named after the legendary statesman and pioneer of Odisha’s industrial, constitutional, and cooperative movement, <strong>Utkal Gourav Madhusudan Das</strong>, the institute was established as a premier seat of cooperative management education. Functioning as an apex unit of the <strong>National Council for Cooperative Training (NCCT), New Delhi</strong>, promoted by the <strong>Ministry of Co-operation, Government of India</strong>, the institute caters to the training needs of senior and middle-level cooperative functionaries and management scholars across Odisha and Eastern India.
              </p>

              <p>
                The institute's post-graduate 2-year full-time <strong>MBA programme</strong> is approved by the <strong>All India Council for Technical Education (AICTE), New Delhi</strong> and affiliated to the prestigious <strong>Biju Patnaik University of Technology (BPUT), Rourkela</strong>.
              </p>
            </div>

            {/* Box 2: Centres at MICM (Flowchart Infographic from Image 2) */}
            <div id="centres" className="border border-slate-300 rounded p-5 sm:p-6 bg-white shadow-2xs space-y-5">
              <div className="bg-emerald-800 text-white text-center py-2.5 px-4 font-bold text-sm tracking-wider uppercase rounded-xs">
                CENTRES AT MICM
              </div>

              <p className="text-xs text-slate-600 text-center max-w-xl mx-auto">
                MICM has established six dedicated centres to conduct short-duration Executive and Management Development Programmes for Senior/Top Level Officials and non-officials of the cooperative sector.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
                {centres.map((c, idx) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded p-4 bg-slate-50 hover:bg-sky-50 transition-colors flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded text-white ${c.color} shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 leading-tight">
                            {c.name}
                          </h4>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                            {c.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Box 3: Mandate of MICM (Exact VAMNICOM Style from Image 2) */}
            <div id="mandate" className="border border-slate-300 rounded p-5 sm:p-6 bg-white shadow-2xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-emerald-800 border-b border-slate-200 pb-2">
                Mandate of MICM
              </h3>

              <div className="space-y-3.5 text-xs sm:text-[13px] text-slate-800 leading-relaxed">
                <div>
                  <strong className="text-slate-900 font-bold uppercase tracking-wide text-xs">TRAINING :</strong>
                  <span className="ml-1 text-slate-700">
                    Capacity Building and empowering the cooperatives and collectives across Odisha and eastern state federations.
                  </span>
                </div>

                <div>
                  <strong className="text-slate-900 font-bold uppercase tracking-wide text-xs">EDUCATION :</strong>
                  <span className="ml-1 text-slate-700">
                    Fostering and nurturing the managerial and entrepreneurial skill in budding managers in the area of agri business, cooperation, banking, and rural development through AICTE-approved MBA & NCCT Higher Diploma.
                  </span>
                </div>

                <div>
                  <strong className="text-slate-900 font-bold uppercase tracking-wide text-xs">CONSULTANCY :</strong>
                  <span className="ml-1 text-slate-700">
                    Consultancy services for cooperatives - banking, sugar, dairy, and IT/PACS ERP implementation, recruitment of qualified professional manpower, defining job responsibilities of personnel in cooperative institutions.
                  </span>
                </div>

                <div>
                  <strong className="text-slate-900 font-bold uppercase tracking-wide text-xs">RESEARCH :</strong>
                  <span className="ml-1 text-slate-700">
                    Formulate policy to nurture research culture and develop research plans/proposals in the field of agri business, cooperation, financial inclusion, and rural development.
                  </span>
                </div>

                <div>
                  <strong className="text-slate-900 font-bold uppercase tracking-wide text-xs">POLICY SUPPORT :</strong>
                  <span className="ml-1 text-slate-700">
                    Policy support, data collection and analysis and documentation for various programmes and schemes of the Ministry of Cooperation and for various cooperative federations.
                  </span>
                </div>
              </div>
            </div>

            {/* Box 4: Vision & Mission */}
            <div id="vision" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#0288D1] rounded p-5 bg-sky-50/50">
                <span className="text-xs font-bold uppercase text-[#0288D1] tracking-wider block mb-1">
                  Our Vision
                </span>
                <p className="font-serif text-sm font-semibold text-slate-900 italic leading-relaxed">
                  "{instituteData.vision}"
                </p>
              </div>

              <div className="border border-emerald-600 rounded p-5 bg-emerald-50/50">
                <span className="text-xs font-bold uppercase text-emerald-800 tracking-wider block mb-1">
                  Our Mission
                </span>
                <p className="font-serif text-sm font-semibold text-slate-900 italic leading-relaxed">
                  "{instituteData.mission}"
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
