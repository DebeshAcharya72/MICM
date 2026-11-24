"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  FileText,
  User,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { instituteData } from "../data/instituteData";

export default function About() {
  const [activeTab, setActiveTab] = useState("history");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setActiveTab(id);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const sidebarLinks = [
    { id: "history", label: "History" },
    { id: "madhusudan", label: "Utkal Gourav Madhusudan Das" },
    { id: "director", label: "Director's Desk" },
    { id: "vision", label: "Vision, Mission and Focus" },
    { id: "structure", label: "Organization Structure" },
    { id: "centres", label: "Centres at MICM" },
    { id: "mandate", label: "Mandate of MICM" },
    { id: "management", label: "Management Committee" },
  ];

  const centres = [
    {
      name: "Centre for Information Technology",
      icon: Cpu,
      color: "bg-teal-600",
      desc: "Digital PACS, ERP and Computing Infrastructure",
    },
    {
      name: "Centre for Cooperative Management",
      icon: HeartHandshake,
      color: "bg-emerald-600",
      desc: "Cooperative governance, credit unions and banking",
    },
    {
      name: "Centre for Management Education",
      icon: BookOpen,
      color: "bg-sky-600",
      desc: "Full-time MBA & Higher Diploma Programmes",
    },
    {
      name: "Centre for Research, Consultancy & Publication",
      icon: FileText,
      color: "bg-amber-600",
      desc: "Sectoral studies, field evaluations & research journals",
    },
    {
      name: "Centre for Entrepreneurship Development",
      icon: Briefcase,
      color: "bg-indigo-600",
      desc: "FPO incubation, agri-business & collective enterprise",
    },
    {
      name: "Centre for Training Information System",
      icon: Compass,
      color: "bg-blue-700",
      desc: "Curriculum tracking & national training databases",
    },
  ];

  const handleSidebarClick = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-[70vh] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 border-b border-slate-200 pb-3">
          <Link href="/" className="hover:text-[#0288D1]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700">About Us</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0288D1] font-bold capitalize">
            {sidebarLinks.find((l) => l.id === activeTab)?.label || "History"}
          </span>
        </nav>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 bg-[#00171f] text-white rounded overflow-hidden shadow-sm">
            <div className="bg-[#0288D1] px-4 py-3 font-bold text-sm tracking-wide text-white uppercase">
              About MICM
            </div>
            <div className="divide-y divide-slate-800 text-xs font-semibold">
              {sidebarLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSidebarClick(item.id)}
                  className={`w-full text-left px-4 py-3 transition-colors flex items-center justify-between ${
                    activeTab === item.id
                      ? "bg-[#004e64] text-white font-bold border-l-4 border-amber-400"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
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
            {/* Dynamic Title */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-800">
                {sidebarLinks.find((l) => l.id === activeTab)?.label ||
                  "History"}
              </h1>
              <div className="w-16 h-1 bg-emerald-700 mt-1"></div>
            </div>

            {/* ========================================================
                SECTION: HISTORY (Existing)
            ======================================================== */}
            <div
              id="history"
              className="border border-slate-300 rounded p-5 sm:p-6 text-xs sm:text-[13px] text-slate-800 leading-relaxed space-y-4 bg-white shadow-2xs"
            >
              <h2 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                About MICM
              </h2>
              <p>
                In the historic academic year <strong>1955-56</strong>, a
                high-level committee appointed by the Government of India
                recommended the establishment of apex regional institutes to
                assess and address the training needs of the co-operative
                sector. It was recommended to set up specialized training
                institutes to undertake the training of senior personnel in
                co-operative institutions/departments, conduct fundamental and
                applied research, and provide consultancy services.
              </p>
              <p>
                Named after the legendary statesman and pioneer of Odisha’s
                industrial, constitutional, and cooperative movement,{" "}
                <strong>Utkal Gourav Madhusudan Das</strong>, the institute was
                established as a premier seat of cooperative management
                education. Functioning as an apex unit of the{" "}
                <strong>
                  National Council for Cooperative Training (NCCT), New Delhi
                </strong>
                , promoted by the{" "}
                <strong>Ministry of Co-operation, Government of India</strong>,
                the institute caters to the training needs of senior and
                middle-level cooperative functionaries and management scholars
                across Odisha and Eastern India.
              </p>
              <p>
                The institute's post-graduate 2-year full-time{" "}
                <strong>MBA programme</strong> is approved by the{" "}
                <strong>
                  All India Council for Technical Education (AICTE), New Delhi
                </strong>{" "}
                and affiliated to the prestigious{" "}
                <strong>
                  Biju Patnaik University of Technology (BPUT), Rourkela
                </strong>
                .
              </p>
            </div>

            {/* ========================================================
                SECTION: MADHUSUDAN DAS (Image removed)
            ======================================================== */}
            <div
              id="madhusudan"
              className="border border-slate-300 rounded p-5 sm:p-6 bg-white shadow-2xs space-y-4"
            >
              <h2 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                Utkal Gourav Madhusudan Das
              </h2>
              <div className="text-xs sm:text-[13px] text-slate-800 leading-relaxed space-y-3">
                <p>
                  <strong>Madhusudan Das</strong> (28 April 1848 – 4 February
                  1934), popularly known as <strong>Utkal Gourav</strong> (Pride
                  of Utkal), was a prominent lawyer, social reformer, and the
                  first graduate and advocate of Odisha. He was a visionary who
                  fought for the separate identity of Odisha as a state and
                  pioneered the industrial and cooperative movements in the
                  region.
                </p>
                <p>
                  He recognized that the economic upliftment of rural Odisha
                  could only be achieved through collective effort. He
                  established the first cooperative societies in the region,
                  laying the foundation for the cooperative movement that
                  continues to empower millions today.
                </p>
                <p>
                  Naming the institute after this great visionary is a testament
                  to the institute's commitment to his ideals of self-reliance,
                  education, and collective economic empowerment through the
                  cooperative model.
                </p>
              </div>
            </div>

            {/* ========================================================
                SECTION: DIRECTOR'S DESK (Image removed)
            ======================================================== */}
            <div
              id="director"
              className="border border-slate-300 rounded p-5 sm:p-6 bg-white shadow-2xs space-y-4"
            >
              <h2 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                Director's Message
              </h2>
              <div className="text-xs sm:text-[13px] text-slate-800 leading-relaxed space-y-3">
                <p>
                  It gives me immense pleasure to welcome you to the Madhusudan
                  Institute of Co-operative Management (MICM), Bhubaneswar—one
                  of the premier institutions dedicated to strengthening the
                  cooperative movement and nurturing professional excellence in
                  the sector. Since its inception, MICM has been committed to
                  empowering individuals and organizations through high-quality
                  education, capacity-building, research, and consultancy
                  services.
                </p>
                <p>
                  Under the visionary guidance of the{" "}
                  <strong>Ministry of Cooperation, Government of India</strong>,
                  the cooperative sector is witnessing unprecedented growth,
                  transformation, and national significance. The dynamic
                  leadership of{" "}
                  <strong>
                    Hon'ble Union Home Minister & Minister of Cooperation, Shri
                    Amit Shah ji
                  </strong>
                  , has infused new energy into the cooperative movement by
                  promoting transparency, modernization, digital empowerment,
                  and democratic strengthening of cooperative institutions. His
                  strategic initiatives have paved the way for a more robust,
                  people-centric, and future-ready cooperative landscape in the
                  country.
                </p>
                <p>
                  At MICM, we align our mission with this national vision by
                  continuously upgrading our programmes, enhancing skill-based
                  learning, and fostering innovation in cooperative management.
                  Our curriculum integrates traditional cooperative values with
                  modern managerial practices to prepare leaders who can
                  effectively address emerging challenges in agriculture,
                  finance, marketing, rural development, and social
                  entrepreneurship.
                </p>
                <p>
                  We work in close collaboration with government departments,
                  cooperative organizations, national federations, and community
                  institutions to ensure practical relevance and impactful
                  learning. Education, we believe, must serve not only as a tool
                  for professional competence but also as a catalyst for social
                  responsibility, inclusive growth, and sustainable development.
                </p>
                <p>
                  I warmly invite students, professionals, cooperative
                  functionaries, and stakeholders to engage with MICM and join
                  us in contributing to a vibrant, responsible, and
                  transformative cooperative sector that plays a vital role in
                  nation-building—echoing the national vision of{" "}
                  <strong>"Sahakar Se Samriddhi."</strong>
                </p>
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <p className="font-bold text-slate-900 text-sm">
                    {instituteData.director.name}
                  </p>
                  <p className="text-xs text-slate-600 font-semibold">
                    {instituteData.director.designation}, MICM Bhubaneswar
                  </p>
                </div>
              </div>
            </div>

            {/* ========================================================
                SECTION: VISION & MISSION
            ======================================================== */}
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

            {/* ========================================================
                SECTION: ORGANIZATION STRUCTURE
            ======================================================== */}
            <div
              id="structure"
              className="border border-slate-300 rounded p-5 sm:p-6 bg-white shadow-2xs space-y-4"
            >
              <h2 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                Organization Structure
              </h2>
              <div className="text-xs sm:text-[13px] text-slate-800 leading-relaxed space-y-4">
                <p>
                  MICM operates as a national institute under the aegis of the
                  National Council for Cooperative Training (NCCT), New Delhi,
                  which functions under the Ministry of Cooperation, Government
                  of India.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded text-center">
                    <ShieldCheck className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
                    <h4 className="font-bold text-slate-900">Governing Body</h4>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Apex policy-making body comprising officials from the
                      Ministry and NCCT.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded text-center">
                    <Users className="w-8 h-8 text-sky-700 mx-auto mb-2" />
                    <h4 className="font-bold text-slate-900">
                      Management Committee
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Executive committee overseeing day-to-day administration
                      and academics.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded text-center">
                    <Target className="w-8 h-8 text-amber-700 mx-auto mb-2" />
                    <h4 className="font-bold text-slate-900">
                      Director & Faculty
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Responsible for implementing academic programmes,
                      research, and training.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================
                SECTION: CENTRES AT MICM
            ======================================================== */}
            <div
              id="centres"
              className="border border-slate-300 rounded p-5 sm:p-6 bg-white shadow-2xs space-y-5"
            >
              <div className="bg-emerald-800 text-white text-center py-2.5 px-4 font-bold text-sm tracking-wider uppercase rounded-xs">
                CENTRES AT MICM
              </div>
              <p className="text-xs text-slate-600 text-center max-w-xl mx-auto">
                MICM has established six dedicated centres to conduct
                short-duration Executive and Management Development Programmes
                for Senior/Top Level Officials and non-officials of the
                cooperative sector.
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
                        <div
                          className={`p-2 rounded text-white ${c.color} shrink-0`}
                        >
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

            {/* ========================================================
                SECTION: MANDATE OF MICM
            ======================================================== */}
            <div
              id="mandate"
              className="border border-slate-300 rounded p-5 sm:p-6 bg-white shadow-2xs space-y-4"
            >
              <h3 className="font-serif text-lg font-bold text-emerald-800 border-b border-slate-200 pb-2">
                Mandate of MICM
              </h3>
              <div className="space-y-3.5 text-xs sm:text-[13px] text-slate-800 leading-relaxed">
                <div>
                  <strong className="text-slate-900 font-bold uppercase tracking-wide text-xs">
                    TRAINING :
                  </strong>
                  <span className="ml-1 text-slate-700">
                    Capacity Building and empowering the cooperatives and
                    collectives across Odisha and eastern state federations.
                  </span>
                </div>
                <div>
                  <strong className="text-slate-900 font-bold uppercase tracking-wide text-xs">
                    EDUCATION :
                  </strong>
                  <span className="ml-1 text-slate-700">
                    Fostering and nurturing the managerial and entrepreneurial
                    skill in budding managers in the area of agri business,
                    cooperation, banking, and rural development through
                    AICTE-approved MBA & NCCT Higher Diploma.
                  </span>
                </div>
                <div>
                  <strong className="text-slate-900 font-bold uppercase tracking-wide text-xs">
                    CONSULTANCY :
                  </strong>
                  <span className="ml-1 text-slate-700">
                    Consultancy services for cooperatives - banking, sugar,
                    dairy, and IT/PACS ERP implementation, recruitment of
                    qualified professional manpower, defining job
                    responsibilities of personnel in cooperative institutions.
                  </span>
                </div>
                <div>
                  <strong className="text-slate-900 font-bold uppercase tracking-wide text-xs">
                    RESEARCH :
                  </strong>
                  <span className="ml-1 text-slate-700">
                    Formulate policy to nurture research culture and develop
                    research plans/proposals in the field of agri business,
                    cooperation, financial inclusion, and rural development.
                  </span>
                </div>
                <div>
                  <strong className="text-slate-900 font-bold uppercase tracking-wide text-xs">
                    POLICY SUPPORT :
                  </strong>
                  <span className="ml-1 text-slate-700">
                    Policy support, data collection and analysis and
                    documentation for various programmes and schemes of the
                    Ministry of Cooperation and for various cooperative
                    federations.
                  </span>
                </div>
              </div>
            </div>

            {/* ========================================================
                SECTION: MANAGEMENT COMMITTEE
            ======================================================== */}
            <div
              id="management"
              className="border border-slate-300 rounded p-5 sm:p-6 bg-white shadow-2xs space-y-4"
            >
              <h2 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                Management Committee
              </h2>
              <div className="text-xs sm:text-[13px] text-slate-800 leading-relaxed">
                <p className="mb-4">
                  The Management Committee is responsible for the overall
                  administration, academic planning, and financial management of
                  the institute. It meets quarterly to review progress and
                  formulate strategies.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-slate-300">
                    <thead>
                      <tr className="bg-slate-100 text-slate-800">
                        <th className="border border-slate-300 p-2 font-bold">
                          S.No.
                        </th>
                        <th className="border border-slate-300 p-2 font-bold">
                          Name
                        </th>
                        <th className="border border-slate-300 p-2 font-bold">
                          Designation
                        </th>
                        <th className="border border-slate-300 p-2 font-bold">
                          Role in Committee
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-2">1</td>
                        <td className="border border-slate-300 p-2">
                          {instituteData.director.name}
                        </td>
                        <td className="border border-slate-300 p-2">
                          Director, MICM
                        </td>
                        <td className="border border-slate-300 p-2 font-semibold text-emerald-700">
                          Chairman
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border border-slate-300 p-2">2</td>
                        <td className="border border-slate-300 p-2">
                          Dr. Sanjib Kumar Hota
                        </td>
                        <td className="border border-slate-300 p-2">
                          Dy. Director, MICM
                        </td>
                        <td className="border border-slate-300 p-2">
                          Member Secretary
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">3</td>
                        <td className="border border-slate-300 p-2">
                          Shri Siddharth Jain, IAS
                        </td>
                        <td className="border border-slate-300 p-2">
                          Addl. Secretary, Ministry of Cooperation
                        </td>
                        <td className="border border-slate-300 p-2">Member</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border border-slate-300 p-2">4</td>
                        <td className="border border-slate-300 p-2">
                          Dr. Ashish Kumar Bhutani, IAS
                        </td>
                        <td className="border border-slate-300 p-2">
                          Secretary, Ministry of Cooperation
                        </td>
                        <td className="border border-slate-300 p-2">Member</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">5</td>
                        <td className="border border-slate-300 p-2">
                          Registrar of Cooperative Societies, Odisha
                        </td>
                        <td className="border border-slate-300 p-2">
                          Govt. of Odisha
                        </td>
                        <td className="border border-slate-300 p-2">Member</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
