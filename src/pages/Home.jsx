import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Building2, 
  Monitor, 
  Users, 
  CheckCircle2, 
  Calendar, 
  ChevronRight,
  ExternalLink,
  ChevronLeft,
  Quote
} from 'lucide-react';
import { instituteData } from '../data/instituteData';
import { programmesData } from '../data/programmeData';
import { facultyData } from '../data/facultyData';
import { facilitiesData } from '../data/facilitiesData';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import ProgrammeCard from '../components/ProgrammeCard';
import FacultyCard from '../components/FacultyCard';
import EnquiryForm from '../components/EnquiryForm';
import ApplyModal from '../components/ApplyModal';

export default function Home() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState('MBA');
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const handleOpenApply = (progCode = 'MBA') => {
    setSelectedProgramme(progCode);
    setApplyModalOpen(true);
  };

  // The 3 featured faculty members requested for homepage
  const homeFaculty = facultyData.slice(0, 3);

  // Gallery items for Campus Life & Facilities
  const featuredFacilities = facilitiesData.slice(0, 5);

  return (
    <div className="overflow-hidden bg-white">
      {/* ========================================================
          SECTION 1: HERO BANNER
      ======================================================== */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-brand-navy overflow-hidden">
        {/* Full-width University Campus Photo Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />

        {/* Deep Navy Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-yellow/10 via-transparent to-transparent" />

        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* Small Eyebrow Label */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping"></span>
              <span>Premier Management Institute • Estd. 1955-56</span>
            </div>

            {/* Large Serif Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
              {instituteData.tagline}
            </h1>

            {/* Supporting Description */}
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl">
              {instituteData.subheading}
            </p>

            {/* Affiliation Badges Line */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                <ShieldCheck className="w-4 h-4 text-brand-yellow" />
                AICTE Approved
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                <Award className="w-4 h-4 text-brand-yellow" />
                Affiliated to BPUT, Rourkela
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                <GraduationCap className="w-4 h-4 text-brand-yellow" />
                NCCT, New Delhi
              </span>
            </div>

            {/* Two CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleOpenApply('MBA')}
              >
                Apply Now
              </Button>

              <Button
                to="/about"
                variant="outlineWhite"
                size="lg"
              >
                Explore MICM
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom subtle divider ribbon */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-brand-yellow via-amber-400 to-brand-yellow"></div>
      </section>


      {/* ========================================================
          SECTION 2: ABOUT MICM (Univet-style Asymmetrical Collage)
      ======================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Asymmetrical Image Collage */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              {/* Univet decorative yellow frame border accent */}
              <div className="relative pr-6 pb-6">
                {/* Main Large Campus Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-premium border-4 border-white aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1000&q=80"
                    alt="MICM Campus Environment"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent"></div>
                </div>

                {/* Smaller Overlapping Student Image (Univet Style) */}
                <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-2 w-3/5 sm:w-1/2 rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-brand-navy hidden sm:block">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
                    alt="Management Scholars Collaborating"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Decorative Experience Badge (Established 1955-56) */}
                <div className="absolute -top-4 -left-4 sm:top-6 sm:-left-6 bg-brand-yellow text-brand-navy p-4 sm:p-5 rounded-2xl shadow-xl border-2 border-white flex items-center gap-3">
                  <div className="p-2.5 bg-brand-navy text-brand-yellow rounded-xl">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-brand-navy">
                      Pioneering Legacy
                    </span>
                    <span className="font-serif font-black text-xl sm:text-2xl text-brand-navy block leading-none mt-0.5">
                      Established 1955-56
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 text-brand-navy text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-brand-yellow"></span>
                <span>Institutional Profile</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-slate leading-tight">
                Welcome to Madhusudan Institute of Co-operative Management
              </h2>

              <p className="text-base sm:text-lg text-brand-body leading-relaxed">
                Established during the historic 1955-56 academic year, Madhusudan Institute of Co-operative Management (MICM), Bhubaneswar stands as a vanguard institution in professional management education and cooperative institutional training.
              </p>

              <p className="text-sm sm:text-base text-brand-body leading-relaxed">
                Functioning under the aegis of the National Council for Cooperative Training (NCCT), New Delhi, and promoted by the Ministry of Co-operation, Government of India, the institute is dedicated to nurturing dynamic leaders equipped with strategic vision, governance acumen, and ethical commitment.
              </p>

              {/* Three Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-brand-light border border-slate-200 hover:border-brand-yellow transition-colors">
                  <ShieldCheck className="w-6 h-6 text-brand-navy mb-2" />
                  <h4 className="font-serif font-bold text-sm text-brand-slate">AICTE Approved</h4>
                  <p className="text-xs text-brand-body mt-1">Rigorous quality governance for MBA curriculum.</p>
                </div>

                <div className="p-4 rounded-xl bg-brand-light border border-slate-200 hover:border-brand-yellow transition-colors">
                  <Award className="w-6 h-6 text-brand-navy mb-2" />
                  <h4 className="font-serif font-bold text-sm text-brand-slate">BPUT Affiliated</h4>
                  <p className="text-xs text-brand-body mt-1">Conducted under state technical university norms.</p>
                </div>

                <div className="p-4 rounded-xl bg-brand-light border border-slate-200 hover:border-brand-yellow transition-colors">
                  <Building2 className="w-6 h-6 text-brand-navy mb-2" />
                  <h4 className="font-serif font-bold text-sm text-brand-slate">NCCT Unit</h4>
                  <p className="text-xs text-brand-body mt-1">National Council for Cooperative Training, New Delhi.</p>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Button to="/about" variant="primary" size="md">
                  Explore More
                </Button>
                <Link 
                  to="/programmes" 
                  className="text-sm font-bold text-brand-navy hover:text-brand-yellow-hover flex items-center gap-1.5 py-2 px-3 transition-colors"
                >
                  <span>View All Academic Programmes</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 3: INSTITUTIONAL HIGHLIGHTS (Navy Statistics)
      ======================================================== */}
      <section className="py-16 lg:py-20 bg-brand-navy text-white relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-navy-light/30 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-yellow/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest">
              Institutional Heritage & Infrastructure
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Verified Institutional Highlights
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {instituteData.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-brand-navy-light/60 border border-brand-navy-light/90 rounded-2xl p-6 sm:p-8 text-center relative hover:border-brand-yellow/60 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-brand-yellow tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {stat.value}{stat.suffix}
                </div>
                <div className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">
                  {stat.label}
                </div>
                <div className="w-8 h-0.5 bg-brand-yellow/40 mx-auto mt-4 group-hover:w-14 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 4: OUR PROGRAMMES (2 Large Verified Cards)
      ======================================================== */}
      <section className="py-20 lg:py-28 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Academic Offerings"
            title="Our Academic Programmes"
            description="Explore our AICTE-approved MBA and NCCT-promoted Higher Diploma in Co-operative Management (HDCM), structured to empower visionary management leaders."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {programmesData.map((programme) => (
              <ProgrammeCard
                key={programme.id}
                programme={programme}
                onApplyClick={handleOpenApply}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button to="/programmes" variant="secondary" size="md">
              View Detailed Curriculum & Fee Schedules
            </Button>
          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 5: CAMPUS LIFE & FACILITIES (Univet Collage)
      ======================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Campus Environment"
            title="Campus Life & Modern Infrastructure"
            description="Spread over 3.4 acres in Unit-8, Nayapalli, Bhubaneswar, MICM offers an intellectually vibrant and resource-rich atmosphere for scholarly pursuit."
          />

          {/* Univet-inspired gallery composition: 1 large featured + 4 smaller grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Featured Left Card (lg:col-span-6) */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden relative shadow-premium group min-h-[360px] lg:min-h-[480px]">
              <img
                src={featuredFacilities[0].image}
                alt={featuredFacilities[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent"></div>
              
              <div className="absolute top-4 left-4 bg-brand-yellow text-brand-navy text-xs font-black uppercase px-3 py-1 rounded-full shadow-sm">
                Featured Infrastructure
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-wider text-brand-yellow font-bold block">
                  {featuredFacilities[0].category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {featuredFacilities[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 line-clamp-2">
                  {featuredFacilities[0].description}
                </p>
                <div className="mt-4">
                  <Link
                    to="/facilities"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-yellow hover:text-white transition-colors"
                  >
                    <span>Explore Campus Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 4 Smaller Grid Cards (lg:col-span-6: 2x2) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredFacilities.slice(1, 5).map((fac) => (
                <div 
                  key={fac.id}
                  className="rounded-2xl overflow-hidden relative shadow-md group min-h-[220px]"
                >
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/50 to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold text-brand-yellow tracking-wider block">
                      {fac.category}
                    </span>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-white mt-0.5 line-clamp-1">
                      {fac.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">
                      {fac.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button to="/facilities" variant="primary" size="md">
              View All Campus Facilities
            </Button>
          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 6: OUR FACULTY (Dark Navy Background)
      ======================================================== */}
      <section className="py-20 lg:py-28 bg-brand-navy text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Distinguished Mentors"
            title="Our Dedicated Faculty"
            description="Guided by experienced academicians and practitioners dedicated to imparting rigorous management insights and cooperative administration ethics."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeFaculty.map((member) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button to="/faculty" variant="outlineWhite" size="md">
              View All Faculty Members
            </Button>
          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 7: DIRECTOR'S MESSAGE (Visually Attractive Split)
      ======================================================== */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left: Dignified Director Placeholder / Crest Presentation */}
            <div className="lg:col-span-5">
              <div className="relative max-w-md mx-auto">
                <div className="rounded-2xl overflow-hidden bg-brand-navy shadow-premium border-4 border-slate-100 p-8 sm:p-12 text-center text-white relative">
                  {/* Background subtle radial */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>

                  <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/10 border-4 border-brand-yellow mx-auto flex items-center justify-center shadow-inner">
                    <span className="font-serif font-black text-4xl text-brand-yellow">
                      PK
                    </span>
                  </div>

                  <div className="relative z-10 mt-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow block">
                      Leadership
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      {instituteData.director.name}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300 mt-1">
                      {instituteData.director.designation}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      Madhusudan Institute of Co-operative Management
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-brand-yellow">
                    <Award className="w-4 h-4" />
                    <span>NCCT, New Delhi / Govt. of India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Editorial Welcome Message */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 text-brand-navy text-xs font-bold uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Institutional Address</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-slate">
                Message from the Director
              </h2>

              <div className="space-y-4 text-base text-brand-body leading-relaxed">
                {instituteData.director.messagePoints.map((paragraph, idx) => (
                  <p key={idx} className="relative pl-4 border-l-2 border-brand-yellow">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Button to="/about" variant="primary" size="md">
                  Read More About Administration
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 8: INSTITUTIONAL RECOGNITION & STANDARDS (Univet Feedback Inspiration)
      ======================================================== */}
      <section className="py-20 lg:py-28 bg-brand-navy text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Academic Credibility"
            title="Institutional Accreditation & Benchmarks"
            description="MICM maintains uncompromising standards across curriculum design, professional ethics, and public sector governance."
          />

          {/* 3 Sophisticated Neutral Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instituteData.editorialReviewCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-brand-navy-light/70 border border-brand-navy-light/90 rounded-2xl p-8 hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-brand-yellow px-2.5 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/20">
                      {card.tag}
                    </span>
                    <ShieldCheck className="w-5 h-5 text-brand-yellow" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-brand-yellow transition-colors">
                    {card.title}
                  </h3>

                  <span className="text-xs font-semibold text-slate-300 block mt-1">
                    {card.subtitle}
                  </span>

                  <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-brand-navy-light/80 flex items-center gap-2 text-xs text-brand-yellow">
                  <CheckCircle2 className="w-4 h-4 text-brand-yellow" />
                  <span>Verified Institutional Compliance</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 9: APPLICATION ENQUIRY SECTION
      ======================================================== */}
      <section className="py-20 lg:py-28 bg-brand-light" id="enquiry">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Explanatory Context */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-yellow/20 border border-brand-yellow/40 text-brand-navy text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-brand-navy" />
                <span>Admissions 2026-27</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-slate leading-tight">
                Submit an Admission Enquiry
              </h2>

              <p className="text-base text-brand-body leading-relaxed">
                Connect with our academic advisory team for guidance on eligibility, entrance criteria, and course specifications for the MBA and HDCM programmes.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200">
                  <div className="p-2 bg-brand-yellow/20 rounded-lg text-brand-navy shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-brand-slate">MBA (2 Years)</h4>
                    <p className="text-xs text-brand-body mt-0.5">
                      Graduation + valid OJEE Rank. Total Fee: ₹1,22,400. AICTE approved.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200">
                  <div className="p-2 bg-brand-yellow/20 rounded-lg text-brand-navy shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-brand-slate">HDCM (36 Weeks)</h4>
                    <p className="text-xs text-brand-body mt-0.5">
                      Graduate eligibility. Correspondence mode with contact boarding included. Total Fee: ₹22,500.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Validated Interactive Form */}
            <div className="lg:col-span-7">
              <EnquiryForm dark={true} defaultProgramme="MBA" />
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 10: NEWS & UPDATES (Editorial Cards)
      ======================================================== */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-navy text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 text-brand-navy" />
                <span>Notice Board</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-slate">
                Official News & Announcements
              </h2>
            </div>
            <Link
              to="/programmes"
              className="text-sm font-bold text-brand-navy hover:text-brand-yellow-hover flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Academic Calendars</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instituteData.newsAnnouncements.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-soft hover:shadow-premium transition-all duration-300 p-6 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-brand-body mb-3">
                    <span className="font-bold text-brand-navy bg-brand-yellow/20 px-2.5 py-0.5 rounded-full">
                      {news.category}
                    </span>
                    <span className="text-slate-400 font-medium">{news.readTime}</span>
                  </div>

                  <span className="text-xs text-slate-500 font-medium block mb-2">
                    {news.date}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-brand-slate group-hover:text-brand-navy transition-colors line-clamp-2">
                    {news.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-brand-body leading-relaxed line-clamp-3">
                    {news.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to="/contact"
                    className="text-xs font-bold text-brand-navy hover:text-brand-yellow flex items-center gap-1"
                  >
                    <span>Enquire Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Official Notice
                  </span>
                </div>
              </div>
            ))}
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
