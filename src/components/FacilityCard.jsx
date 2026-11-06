import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function FacilityCard({ facility }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* High-res campus photo with hover zoom */}
      <div className="relative h-60 overflow-hidden bg-brand-navy">
        <img
          src={facility.image}
          alt={facility.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent"></div>

        <div className="absolute top-4 left-4">
          <span className="bg-brand-navy/90 border border-brand-yellow/40 text-brand-yellow text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
            {facility.category}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif text-xl font-bold text-white leading-tight">
            {facility.title}
          </h3>
          <p className="text-xs text-brand-yellow font-medium mt-1">
            {facility.subtitle}
          </p>
        </div>
      </div>

      {/* Description & Features */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <p className="text-xs sm:text-sm text-brand-body leading-relaxed">
          {facility.description}
        </p>

        {facility.features && facility.features.length > 0 && (
          <div className="mt-5 pt-5 border-t border-slate-100 space-y-2">
            {facility.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-brand-slate font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
