import React, { useState } from 'react';
import { Heart, Music, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Navbar: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const playing = soundManager.toggleAmbient();
    setIsMusicPlaying(playing);
    if (!playing) {
      soundManager.playChime(440, 0.3);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Monogram */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold font-display shadow-sm group-hover:scale-105 transition-transform">
            M&amp;P
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-base font-bold tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
              Mandip &amp; Prachi
            </span>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium">
              Brother &amp; Sister Tribute
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-600">
          <a href="#story" className="hover:text-slate-900 transition-colors">The Story</a>
          <a href="#letter" className="hover:text-slate-900 transition-colors">Brother's Letter</a>
          <a href="#promises" className="hover:text-slate-900 transition-colors">5 Promises</a>
          <a href="#memories" className="hover:text-slate-900 transition-colors">Memories</a>
          <a href="#coupons" className="hover:text-slate-900 transition-colors flex items-center gap-1">
            <span>Sister Vouchers</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 font-semibold">VIP</span>
          </a>
          <a href="#messages" className="hover:text-slate-900 transition-colors">Leave Note</a>
        </nav>

        {/* Action controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleSound}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 cursor-pointer transition-all ${
              isMusicPlaying
                ? 'bg-rose-50 border-rose-300 text-rose-700 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
            title="Toggle gentle background acoustic melody"
          >
            <Music className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">{isMusicPlaying ? 'Melody Playing' : 'Sister Melody'}</span>
            {isMusicPlaying ? <Volume2 className="w-3.5 h-3.5 text-rose-600" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          <a
            href="#letter"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-all cursor-pointer shadow-xs"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Read Letter</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-3 text-xs font-medium text-slate-700">
          <a href="#story" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-rose-600">
            The Story
          </a>
          <a href="#letter" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-rose-600">
            Brother's Letter
          </a>
          <a href="#promises" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-rose-600">
            Mandip's 5 Promises
          </a>
          <a href="#memories" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-rose-600">
            Memories
          </a>
          <a href="#coupons" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-rose-600">
            Prachi's Sister Vouchers
          </a>
          <a href="#messages" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-rose-600">
            Leave Note for Mandip
          </a>
        </div>
      )}
    </header>
  );
};
