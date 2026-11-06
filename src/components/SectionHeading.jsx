import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3.5 ${
          dark 
            ? 'bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30' 
            : 'bg-brand-yellow/20 text-brand-navy border border-brand-yellow/40'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse"></span>
          {eyebrow}
        </div>
      )}
      
      <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
        dark ? 'text-white' : 'text-brand-slate'
      }`}>
        {title}
      </h2>

      {description && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${
          dark ? 'text-slate-300' : 'text-brand-body'
        }`}>
          {description}
        </p>
      )}

      {/* Subtle decorative gold accent line */}
      <div className={`mt-5 flex items-center gap-1.5 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <span className="w-10 h-1 bg-brand-yellow rounded-full"></span>
        <span className="w-2.5 h-1 bg-brand-yellow/50 rounded-full"></span>
        <span className="w-1 h-1 bg-brand-yellow/30 rounded-full"></span>
      </div>
    </div>
  );
}
