'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Image as ImageIcon, 
  Film, 
  ChevronRight, 
  Maximize2, 
  X, 
  ExternalLink,
  Sparkles,
  Play
} from 'lucide-react';
import { api } from '../services/api';

// Helper to format YouTube URLs into proper embed URLs
function getYouTubeEmbedUrl(url) {
  if (!url) return '';
  if (url.includes('/embed/')) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return url;
}

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'photo' | 'video'
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchGallery() {
      try {
        const data = await api.getGallery();
        if (isMounted && Array.isArray(data)) {
          setItems(data);
        }
      } catch (err) {
        console.error("Failed to load gallery items:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  const photos = items.filter(item => item.type === 'image');
  const videos = items.filter(item => item.type === 'video');

  const filteredItems = filter === 'photo' 
    ? photos 
    : filter === 'video' 
    ? videos 
    : items;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* ========================================================
          HERO BANNER
      ======================================================== */}
      <section className="relative py-16 sm:py-20 bg-[#0B1B3D] overflow-hidden text-white border-b-4 border-[#0288D1]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B3D] via-[#0B1B3D]/95 to-[#0B1B3D]/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <nav className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-sky-300 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300">Media &amp; Campus</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#FFC107]">Photo &amp; Video Gallery</span>
          </nav>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 text-sky-200 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 border border-sky-400/30">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                Institutional Media Archive
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-white">
                MICM Campus Gallery
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Explore our dynamic visual journey: state-level cooperative conferences, annual convocations, classroom training sessions, and campus life at Bhubaneswar.
              </p>
            </div>

            {/* Quick Stat Counter */}
            <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-lg border border-white/15 text-xs">
              <div className="text-center">
                <div className="text-lg font-black text-white">{photos.length}</div>
                <div className="text-[10px] text-slate-300 uppercase font-semibold">Photos</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-lg font-black text-[#FFC107]">{videos.length}</div>
                <div className="text-[10px] text-slate-300 uppercase font-semibold">Videos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          MEDIA TABS & GALLERY GRID
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* Filter Navigation Bar */}
        <div className="bg-white rounded-lg shadow-md border border-slate-200 p-2 sm:p-3 mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md font-bold text-xs transition-all flex items-center gap-1.5 ${
                filter === 'all'
                  ? 'bg-[#0288D1] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>All Media</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {items.length}
              </span>
            </button>

            <button
              onClick={() => setFilter('photo')}
              className={`px-4 py-2 rounded-md font-bold text-xs transition-all flex items-center gap-1.5 ${
                filter === 'photo'
                  ? 'bg-[#0288D1] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photos</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filter === 'photo' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {photos.length}
              </span>
            </button>

            <button
              onClick={() => setFilter('video')}
              className={`px-4 py-2 rounded-md font-bold text-xs transition-all flex items-center gap-1.5 ${
                filter === 'video'
                  ? 'bg-[#0288D1] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Videos</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filter === 'video' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {videos.length}
              </span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
            Showing {filteredItems.length} of {items.length} total entries
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs animate-pulse">
                <div className="aspect-4/3 bg-slate-200" />
                <div className="p-3.5 space-y-2">
                  <div className="h-3.5 bg-slate-200 rounded w-4/5" />
                  <div className="h-2.5 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid Display */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredItems.map((item) => {
              if (item.type === 'video') {
                const embedUrl = getYouTubeEmbedUrl(item.url);
                return (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="aspect-video bg-black relative">
                      <iframe
                        src={embedUrl}
                        title={item.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-3.5 bg-white">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600 uppercase tracking-wider mb-1">
                        <Play className="w-3 h-3 fill-rose-600" />
                        <span>YouTube Video</span>
                      </div>
                      <h3 className="font-bold text-xs text-slate-800 line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              }

              // Image Card
              return (
                <div 
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  className="group bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="aspect-4/3 bg-slate-100 overflow-hidden relative">
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 text-slate-900 rounded-full font-bold text-xs shadow-md">
                        <Maximize2 className="w-3.5 h-3.5 text-[#0288D1]" />
                        <span>View Photo</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-3.5 bg-white">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#0288D1] uppercase tracking-wider mb-1">
                      <ImageIcon className="w-3 h-3" />
                      <span>Campus Photo</span>
                    </div>
                    <h3 className="font-bold text-xs text-slate-800 line-clamp-2 leading-snug group-hover:text-[#0288D1] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No Media Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              There are currently no {filter === 'all' ? 'gallery items' : filter === 'photo' ? 'photos' : 'videos'} listed in this category.
            </p>
          </div>
        )}

      </div>

      {/* ========================================================
          FULL SCREEN LIGHTBOX MODAL
      ======================================================== */}
      {lightboxItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxItem(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-lg overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 text-white border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#0288D1]" />
                <span className="font-bold text-xs truncate max-w-md">{lightboxItem.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={lightboxItem.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                  title="Open Original Image"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => setLightboxItem(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Preview Container */}
            <div className="max-h-[75vh] flex items-center justify-center bg-black p-2">
              <img 
                src={lightboxItem.url} 
                alt={lightboxItem.title} 
                className="max-h-[70vh] w-auto max-w-full object-contain rounded"
              />
            </div>

            {/* Bottom Caption Bar */}
            <div className="px-4 py-3 bg-slate-950 text-slate-300 text-xs border-t border-slate-800 flex justify-between items-center">
              <span className="text-white font-medium">{lightboxItem.title}</span>
              <span className="text-[11px] text-slate-400">MICM Institutional Photo</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
