'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Mail, 
  Phone, 
  ArrowLeft, 
  Award, 
  ShieldCheck, 
  Briefcase, 
  Calendar, 
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { facultyData } from '../data/facultyData';

export default function FacultyProfile({ facultyId: propFacultyId }) {
  const params = useParams();
  const idOrSlug = propFacultyId || (params?.id ? decodeURIComponent(params.id) : null);

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idOrSlug) {
      setLoading(false);
      setError("No faculty identifier specified.");
      return;
    }

    const fetchMember = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Try remote API first
        const remote = await api.getFacultyMember(idOrSlug);
        if (remote && (remote.id || remote.name)) {
          setMember(remote);
          setLoading(false);
          return;
        }

        // 2. Fallback to static facultyData by slug or id or name match
        const clean = String(idOrSlug).toLowerCase().trim();
        const found = facultyData.find(
          f => f.slug === clean || 
               String(f.id).toLowerCase() === clean || 
               (f.name && f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === clean)
        );

        if (found) {
          setMember(found);
        } else {
          setError("Faculty member profile not found.");
        }
      } catch (err) {
        console.warn("Error fetching faculty member, checking fallback:", err);
        const clean = String(idOrSlug).toLowerCase().trim();
        const found = facultyData.find(
          f => f.slug === clean || String(f.id).toLowerCase() === clean
        );
        if (found) {
          setMember(found);
        } else {
          setError("Unable to load faculty profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [idOrSlug]);

  const getInitials = (name) => {
    if (!name) return 'FM';
    const parts = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s*/i, '').trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 py-20">
        <div className="w-12 h-12 border-4 border-[#0288D1]/30 border-t-[#0288D1] rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-semibold text-slate-600">Loading faculty profile...</p>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4 border border-red-100">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-slate-800">Faculty Member Not Found</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md">
          {error || "The requested faculty member does not exist or may have been updated."}
        </p>
        <Link
          href="/faculty"
          className="mt-6 inline-flex items-center gap-2 bg-[#0288D1] hover:bg-[#0277bd] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Faculty Directory</span>
        </Link>
      </div>
    );
  }

  const isLeadership = member.isLeadership || (member.designation && (
    member.designation.toLowerCase().includes('director') || 
    member.designation.toLowerCase().includes('principal') ||
    member.designation.toLowerCase().includes('dean')
  ));

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Banner Navigation */}
      <section className="bg-[#0B1B3D] text-white py-10 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/faculty"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-[#FFC107] transition-colors py-1 px-3 rounded bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Faculty Directory</span>
            </Link>

            <nav className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <Link href="/faculty" className="hover:text-white transition-colors">Faculty</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-amber-300 font-semibold truncate max-w-[200px] sm:max-w-xs">{member.name}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Profile Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================
              LEFT COLUMN: Photo & Quick Contact Card
          ======================================================== */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col items-center text-center">
            {/* Large Photo Portrait */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-4 border-amber-400/80 shadow-md bg-slate-100 mb-6 group">
              {member.image_url ? (
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                style={{ display: member.image_url ? 'none' : 'flex' }}
                className="w-full h-full bg-gradient-to-br from-[#0B1B3D] to-slate-900 text-amber-300 flex items-center justify-center font-serif font-black text-4xl"
              >
                {getInitials(member.name)}
              </div>
              {isLeadership && (
                <div className="absolute top-2 right-2 bg-amber-400 text-[#0B1B3D] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded shadow">
                  Leadership
                </div>
              )}
            </div>

            {/* Name & Title Summary */}
            <h1 className="font-serif text-2xl font-bold text-slate-900">
              {member.name}
            </h1>
            <div className="mt-1.5 inline-block px-3 py-1 bg-amber-50 text-[#0B1B3D] rounded-full text-xs font-bold border border-amber-200/60">
              {member.designation}
            </div>
            <p className="mt-2 text-xs font-medium text-slate-500">
              {member.department || 'Department of Management Studies'}
            </p>

            {/* Contact Details List */}
            <div className="w-full mt-6 pt-6 border-t border-slate-100 space-y-3 text-left">
              <div className="flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0288D1] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Official Email</p>
                  <a 
                    href={`mailto:${member.email || 'micmbbs@gmail.com'}`}
                    className="font-medium text-slate-700 hover:text-[#0288D1] break-all transition-colors"
                  >
                    {member.email || 'micmbbs@gmail.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Contact Phone</p>
                  <a 
                    href={`tel:${(member.phone || '+91 674 2562826').replace(/\s+/g, '')}`}
                    className="font-medium text-slate-700 hover:text-emerald-700 transition-colors"
                  >
                    {member.phone || '+91 674 2562826'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Office Location</p>
                  <p className="text-slate-700 font-medium">
                    Academic Block, MICM Campus, Unit-VIII, Bhubaneswar - 751012, Odisha
                  </p>
                </div>
              </div>
            </div>

            {/* Institutional Seal / Norms */}
            <div className="w-full mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>NCCT &amp; BPUT Recognized Faculty</span>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Academic Qualifications & Profile Details
          ======================================================== */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Overview Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0288D1] mb-2">
                <Award className="w-4 h-4 text-[#0288D1]" />
                <span>Faculty Biography &amp; Academic Overview</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
                {member.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                {member.designation} &bull; {member.department || 'Management Studies'}
              </p>

              <div className="mt-5 text-sm text-slate-600 leading-relaxed space-y-3">
                <p>
                  {member.name} serves as a key academic mentor and faculty member at the <strong>Madhusudan Institute of Co-operative Management (MICM), Bhubaneswar</strong>. Dedicated to advancing analytical rigor, cooperative governance, and managerial competencies among post-graduate MBA scholars and in-service cooperative leaders.
                </p>
                <p>
                  With rich expertise across cooperative institutions, public policy, and contemporary management practices, {member.name.split(' ')[0]} actively leads postgraduate classroom pedagogy, executive training modules, and field-oriented syndicate studies.
                </p>
              </div>

              {/* Badges / Highlights */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                <span className="bg-sky-50 text-[#0288D1] border border-sky-100 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  Post-Graduate &amp; Executive Mentorship
                </span>
                <span className="bg-amber-50 text-amber-800 border border-amber-100 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  National Council for Cooperative Training (NCCT)
                </span>
              </div>
            </div>

            {/* Academic Qualifications & Specialization Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Qualifications */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-3">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span>Educational Qualifications</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Academic Background
                </h3>
                <div className="mt-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm font-bold text-slate-800">
                    {member.qualifications || 'Ph.D., Master of Business Administration'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Conferred by premier recognized universities in compliance with UGC/AICTE &amp; NCCT academic standards.
                  </p>
                </div>
              </div>

              {/* Specialization / Expertise */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0288D1] mb-3">
                  <Sparkles className="w-4 h-4 text-[#0288D1]" />
                  <span>Research &amp; Teaching Focus</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Areas of Specialization
                </h3>
                <div className="mt-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm font-bold text-slate-800">
                    {member.expertise || 'Cooperative Management, Strategic Governance, Public Policy'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Includes curriculum design, seminar guidance, and consulting for cooperative federations and rural banks.
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Responsibilities & Programmes Taught */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0288D1]" />
                <span>Programmes &amp; Institutional Portfolio</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                  <div className="font-bold text-slate-800 text-sm">MBA (Master of Business Administration)</div>
                  <p className="text-slate-500 mt-1">
                    Core management subjects, specialized electives, student mentorship, and summer internship project evaluations.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                  <div className="font-bold text-slate-800 text-sm">HDCM (Higher Diploma in Cooperative Management)</div>
                  <p className="text-slate-500 mt-1">
                    Cooperative law, accountancy, banking operations, and supervisory frameworks for in-service candidates.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                  <div className="font-bold text-slate-800 text-sm">In-Service MDPs &amp; PACS Workshops</div>
                  <p className="text-slate-500 mt-1">
                    Hands-on modules for PACS secretaries, auditors, and cooperative bank executives across Odisha.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                  <div className="font-bold text-slate-800 text-sm">Academic Administration &amp; Committees</div>
                  <p className="text-slate-500 mt-1">
                    Active participation in institutional statutory committees, library development, and anti-ragging councils.
                  </p>
                </div>
              </div>

              {/* Bottom Action / Return button */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/faculty"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0288D1] hover:text-[#0B1B3D] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Full Faculty Directory</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0288D1] transition-colors"
                >
                  <span>Schedule Consultation</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
