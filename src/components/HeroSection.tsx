import React from 'react';
import { Heart, Shield, Sparkles, Smile, ArrowDown, Star, Award, Compass, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export const HeroSection: React.FC = () => {
  const triggerBlessing = () => {
    soundManager.playCelebrationChord();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#3b82f6', '#10b981'],
    });
  };

  return (
    <section id="hero" className="relative pt-10 pb-16 md:pt-16 md:pb-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headline */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold tracking-wider uppercase mb-4">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Dedicated with love &amp; respect</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-slate-900 tracking-tight leading-tight mb-4">
            To My Sister, <span className="text-rose-600 italic">Prachi</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            A simple, permanent website from your brother <span className="font-semibold text-slate-900">Mandip</span>. Built to celebrate your presence in my life, your kindness, and our lifelong sibling journey.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={triggerBlessing}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-sm flex items-center gap-2 transition-all cursor-pointer hover:shadow-md"
            >
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
              <span>Send Sibling Blessing</span>
            </button>

            <a
              href="#letter"
              className="px-5 py-2.5 rounded-xl font-medium text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Read Mandip's Letter</span>
              <ArrowDown className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Beautiful, Clean Centerpiece Card (Replaced 3D) */}
        <div className="white-card rounded-3xl p-6 sm:p-10 md:p-12 mb-12 border border-slate-200/90 shadow-sm relative overflow-hidden bg-gradient-to-b from-white via-rose-50/20 to-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Column: Monogram & Sister Quote */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium mb-3">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>The Brother &amp; Sister Bond</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-slate-900 leading-snug mb-3">
                “Side by side or miles apart, siblings are always connected by the heart.”
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-lg">
                Having a sister like Prachi means having a built-in best friend, a constant source of inspiration, and a lifelong bond that only grows stronger with time.
              </p>

              {/* Sibling Duo Badge */}
              <div className="inline-flex items-center gap-3 p-2 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span>Mandip (Brother)</span>
                </div>
                <span className="text-slate-300 font-light">&amp;</span>
                <div className="flex items-center gap-1.5 font-bold text-rose-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                  <span>Prachi (Sister)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Emblem & Stats Grid */}
            <div className="w-full md:w-80 shrink-0">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Sibling Code
                  </span>
                  <span className="text-xs font-bold text-rose-600 font-mono">100% UNBREAKABLE</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-blue-600" />
                      <span>Brotherly Protection</span>
                    </span>
                    <span className="font-semibold text-slate-800">Guaranteed</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-purple-600" />
                      <span>Pride in Her Wins</span>
                    </span>
                    <span className="font-semibold text-slate-800">Infinite</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Gift className="w-3.5 h-3.5 text-rose-600" />
                      <span>Sister VIP Privileges</span>
                    </span>
                    <span className="font-semibold text-slate-800">Lifetime</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Distance / Time</span>
                    </span>
                    <span className="font-semibold text-slate-800">Never Fades</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Simple Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="white-card white-card-hover p-4 rounded-2xl flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-editorial text-sm font-bold text-slate-900">Your Protector</span>
            <span className="text-[11px] text-slate-500 mt-1">Ready to support and protect you at any hour</span>
          </div>

          <div className="white-card white-card-hover p-4 rounded-2xl flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5">
              <Smile className="w-4 h-4" />
            </div>
            <span className="font-editorial text-sm font-bold text-slate-900">Endless Laughter</span>
            <span className="text-[11px] text-slate-500 mt-1">Inside jokes, shared teasing, and silliness</span>
          </div>

          <div className="white-card white-card-hover p-4 rounded-2xl flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2.5">
              <Star className="w-4 h-4" />
            </div>
            <span className="font-editorial text-sm font-bold text-slate-900">Biggest Fan</span>
            <span className="text-[11px] text-slate-500 mt-1">Cheering on every success and goal you chase</span>
          </div>

          <div className="white-card white-card-hover p-4 rounded-2xl flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-editorial text-sm font-bold text-slate-900">Forever Bond</span>
            <span className="text-[11px] text-slate-500 mt-1">A lifelong connection that never fades</span>
          </div>
        </div>
      </div>
    </section>
  );
};
