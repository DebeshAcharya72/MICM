'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2 } from "lucide-react";
import { api } from "../services/api";

export default function NewsTicker() {
  const [tickerItems, setTickerItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data if backend is offline
  const fallbackItems = [
    {
      id: 1,
      title: "Recruitment for the Post of Registrar, Finance Officer & Assistant Director 2026",
      link: "/rti-careers",
      is_new: 1,
    },
    {
      id: 2,
      title: "MBA 2026-28 Admissions: Centralized Counselling through OJEE Rank List",
      link: "/programmes",
      is_new: 1,
    },
    {
      id: 3,
      title: "Admission Open for 36-Week Higher Diploma in Co-operative Management (HDCM Batch 2026-27)",
      link: "/programmes",
      is_new: 1,
    },
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await api.getNotices(true);
        if (data && data.length > 0) {
          setTickerItems(data);
        } else {
          setTickerItems(fallbackItems);
        }
      } catch (error) {
        console.error("Failed to load notices", error);
        setTickerItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading || tickerItems.length === 0) {
    return (
      <div className="w-full bg-[#f1f5f9] border-b border-slate-300 flex items-center overflow-hidden h-9">
        <div className="bg-[#107c41] text-white text-xs font-bold px-4 py-2 shrink-0 flex items-center gap-1.5 shadow-xs uppercase tracking-wide">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Latest News</span>
        </div>
        <div className="px-4 text-xs text-slate-500">Loading updates...</div>
      </div>
    );
  }

  const scrollItems = [...tickerItems, ...tickerItems];

  return (
    <div className="w-full bg-[#f1f5f9] border-b border-slate-300 flex items-center overflow-hidden h-9">
      {/* Fixed Green "Latest News" Label */}
      <div className="bg-[#107c41] text-white text-xs font-bold px-4 py-2 shrink-0 flex items-center gap-1.5 shadow-xs uppercase tracking-wide z-10">
        <Volume2 className="w-3.5 h-3.5" />
        <span>Latest News</span>
      </div>

      {/* Marquee Container */}
      <div className="overflow-hidden whitespace-nowrap flex-1 px-3 group flex items-center">
        <div
          className="flex items-center w-max group-hover:[animation-play-state:paused]"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          <div className="flex items-center space-x-8 text-xs text-slate-800 pr-8">
            {scrollItems.map((item, idx) => (
              <Link
                key={`${item.id}-${idx}`}
                href={item.link || "#"}
                className="inline-flex items-center gap-2 hover:text-[#0288D1] transition-colors"
              >
                {item.is_new === 1 && (
                  <span className="bg-red-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-tighter animate-pulse">
                    NEW
                  </span>
                )}

                <span className="font-medium">{item.title}</span>
                <span className="text-slate-400 ml-6">|</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}