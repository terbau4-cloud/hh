import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerLove = () => {
    soundManager.playCelebrationChord();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#fbbf24', '#3b82f6'],
    });
  };

  return (
    <footer className="border-t border-slate-200/90 bg-white py-12 text-slate-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold font-display text-xs">
              M&amp;P
            </div>
            <div>
              <span className="font-editorial text-sm font-bold text-slate-800 block">
                Mandip &amp; Prachi
              </span>
              <span className="text-[11px] text-slate-400">
                Brother &amp; Sister Forever
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs text-slate-600">
            <a href="#hero" className="hover:text-slate-900 transition-colors">Home</a>
            <a href="#story" className="hover:text-slate-900 transition-colors">Story</a>
            <a href="#letter" className="hover:text-slate-900 transition-colors">Letter</a>
            <a href="#promises" className="hover:text-slate-900 transition-colors">Promises</a>
            <a href="#memories" className="hover:text-slate-900 transition-colors">Memories</a>
            <a href="#coupons" className="hover:text-slate-900 transition-colors">Vouchers</a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs flex items-center gap-1 cursor-pointer transition-colors"
            title="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            Created with love and respect by <span className="font-semibold text-slate-800">Mandip</span> for his sister <span className="font-semibold text-rose-600">Prachi</span>.
          </p>

          <button
            onClick={triggerLove}
            className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-medium cursor-pointer transition-colors"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-600" />
            <span>Send Love to Prachi</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
