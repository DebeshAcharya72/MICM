import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { instituteData } from '../data/instituteData';

// Custom 4-dot diamond constellation icon seen in Univet's button
function UnivetDiamondIcon({ className = "w-4 h-4" }) {
  return (
    <svg 
      viewBox="0 0 20 20" 
      fill="currentColor" 
      className={className} 
      aria-hidden="true"
    >
      <circle cx="10" cy="3" r="1.8" />
      <circle cx="3" cy="10" r="1.8" />
      <circle cx="17" cy="10" r="1.8" />
      <circle cx="10" cy="17" r="1.8" />
      <circle cx="10" cy="10" r="1" />
    </svg>
  );
}

export default function HeroBanner({ onApplyClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      eyebrow: "WELCOME TO MICM BHUBANESWAR",
      line1: "Foundation",
      line2: "of your future",
      line3: "starts here",
      subtext: "A premier Management Institute established in 1955-56, promoted by the Ministry of Co-operation, Government of India.",
      buttonText: "View Our Programs",
      buttonLink: "/programmes",
      // High-resolution graduation portrait on right with academic regalia
      image: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&w=2200&q=90",
      secondaryAction: "Apply Now"
    },
    {
      id: 1,
      eyebrow: "ESTABLISHED IN 1955-56 • NCCT NEW DELHI",
      line1: "Excellence",
      line2: "in management",
      line3: "education",
      subtext: "AICTE approved MBA and NCCT Higher Diploma in Co-operative Management (HDCM) on a 3.4-acre green campus.",
      buttonText: "Explore MICM",
      buttonLink: "/about",
      // Academic seminar / university campus life
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=90",
      secondaryAction: "Campus Tour"
    }
  ];

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const active = slides[currentSlide];

  return (
    <section className="relative min-h-[82vh] md:min-h-[88vh] lg:min-h-[92vh] flex items-center bg-[#060E21] overflow-hidden select-none">
      
      {/* Background Image Carousel with Smooth Fade Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('${active.image}')`,
            backgroundPosition: 'right 20% center',
          }}
        />
      </AnimatePresence>

      {/* Univet Exact Deep-Navy Left Gradient Overlay */}
      {/* Heavy dark on the left for crisp text contrast, transparent on the right so the graduate shines through */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, 
            rgba(6, 14, 33, 0.96) 0%, 
            rgba(11, 27, 61, 0.94) 30%, 
            rgba(11, 27, 61, 0.78) 55%, 
            rgba(11, 27, 61, 0.35) 75%, 
            rgba(11, 27, 61, 0.15) 100%)`
        }}
      />

      {/* Subtle top & bottom edge vignettes */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#060E21]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#060E21]/80 via-[#0B1B3D]/30 to-transparent pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Eyebrow Label (Univet Mustard Yellow Capitalized) */}
              <div className="inline-block">
                <span className="text-brand-yellow font-bold uppercase tracking-[0.2em] text-xs sm:text-sm drop-shadow-sm">
                  {active.eyebrow}
                </span>
              </div>

              {/* Exact Univet Editorial Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.75rem] font-medium text-white tracking-tight leading-[1.05] drop-shadow-md">
                <span className="block font-serif">{active.line1}</span>
                <span className="block font-serif lowercase italic sm:not-italic">{active.line2}</span>
                <span className="block font-serif lowercase">{active.line3}</span>
              </h1>

              {/* Supporting Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl font-normal leading-relaxed pt-1">
                {active.subtext}
              </p>

              {/* Buttons: Univet Pill Button with 4-Dot Diamond Constellation Icon */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to={active.buttonLink}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{active.buttonText}</span>
                  <UnivetDiamondIcon className="w-4 h-4 text-brand-navy" />
                </Link>

                {onApplyClick && (
                  <button
                    type="button"
                    onClick={() => onApplyClick('MBA')}
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md border border-white/25 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span>Apply Now</span>
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Univet Slide Dots (Vertical Stacked on the Right Edge) */}
      <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
        {slides.map((s, idx) => {
          const isSelected = idx === currentSlide;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 focus:outline-none ${
                isSelected 
                  ? 'w-3.5 h-3.5 rounded-full bg-brand-yellow shadow-md ring-2 ring-brand-yellow/50 scale-110' 
                  : 'w-3 h-3 rounded-full border-2 border-white/80 bg-transparent hover:border-brand-yellow hover:scale-110'
              }`}
            />
          );
        })}
      </div>

    </section>
  );
}
