import React from 'react';
import Link from 'next/link';
import { FileText, Phone, MessageCircle } from 'lucide-react';

export default function MobileActionBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B1B3D] border-t-2 border-[#FFC107] shadow-2xl px-2 py-1.5 flex items-center justify-around">
      {/* Apply Online Button */}
      <Link
        href="/apply"
        className="flex-1 flex flex-col items-center justify-center py-1 px-2 mx-1 rounded bg-[#FFC107] text-[#0B1B3D] font-bold text-xs shadow-xs active:scale-95 transition-transform"
      >
        <FileText className="w-4 h-4 mb-0.5" />
        <span>Apply Now</span>
      </Link>

      {/* Call Admission Desk */}
      <a
        href="tel:+916742562826"
        className="flex-1 flex flex-col items-center justify-center py-1 px-2 mx-1 rounded bg-slate-800 text-white hover:bg-slate-700 font-semibold text-xs active:scale-95 transition-transform"
      >
        <Phone className="w-4 h-4 mb-0.5 text-sky-400" />
        <span>Call</span>
      </a>

      {/* WhatsApp Chat Support */}
      <a
        href="https://wa.me/916742562826?text=Hello%20MICM%20Bhubaneswar%20Admissions%20Team,%20I%20would%20like%20to%20enquire%20about%20admissions."
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1 px-2 mx-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-xs active:scale-95 transition-transform"
      >
        <MessageCircle className="w-4 h-4 mb-0.5 text-emerald-200" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}