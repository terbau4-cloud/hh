import React, { useState, useEffect } from 'react';
import { Gift, Heart, Sparkles, X, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export const GiftPopupModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpened, setIsOpened] = useState(false);

  // Big realistic fireworks / pataka blast
  const launchPatakas = () => {
    soundManager.playCelebrationChord();

    // Stage 1: Central firework explosion
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
      ticks: 300,
    });

    // Stage 2: Left rocket pataka
    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 80,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#ff0055', '#ffaa00', '#ffff00', '#00ffcc'],
        ticks: 300,
      });
    }, 250);

    // Stage 3: Right rocket pataka
    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 80,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#a855f7', '#ec4899', '#f97316', '#3b82f6'],
        ticks: 300,
      });
    }, 450);

    // Stage 4: Star shower finale
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.4 },
        shapes: ['circle'],
        scalar: 1.2,
        colors: ['#ffd700', '#ff69b4', '#00e5ff', '#ff3366'],
        ticks: 350,
      });
    }, 700);
  };

  const handleOpenGift = () => {
    setIsOpened(true);
    launchPatakas();
  };

  const handleReplayPataka = () => {
    launchPatakas();
  };

  if (!isOpen) {
    // Show a small cute floating trigger button on bottom-right so she can reopen anytime
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setIsOpened(false);
        }}
        className="fixed bottom-5 right-5 z-40 px-4 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        title="Open Mandip's Gift Surprise"
      >
        <Gift className="w-4 h-4 animate-bounce" />
        <span>Mandip's Gift 🎁</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 text-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {!isOpened ? (
          /* STEP 1: Gift Box Ready to Open */
          <div className="py-4">
            {/* Animated Gift Icon Box */}
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-rose-100/70 animate-ping opacity-30" />
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-600 to-amber-500 flex items-center justify-center shadow-xl shadow-rose-500/25">
                <Gift className="w-10 h-10 text-white animate-bounce" />
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Special Surprise</span>
            </span>

            {/* Exact Requested Text */}
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-slate-900 mb-2">
              Mandip has sent a gift for you 🎁
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto mb-8">
              A heartfelt surprise waiting exclusively for sister <span className="font-semibold text-rose-600">Prachi</span> from your brother <span className="font-semibold text-slate-900">Mandip</span>.
            </p>

            {/* OPEN Button */}
            <button
              onClick={handleOpenGift}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Gift className="w-4 h-4" />
              <span>Open Gift ✨</span>
            </button>
          </div>
        ) : (
          /* STEP 2: REVEAL WITH LOVE & PATAKA FIREWORKS */
          <div className="py-4 animate-in zoom-in-95 duration-300">
            {/* Celebration Icon */}
            <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shadow-md">
              <Heart className="w-10 h-10 fill-rose-600 text-rose-600 animate-pulse" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 font-mono block mb-1">
              🎆 Pataka &amp; Fireworks Celebration! 🎆
            </span>

            {/* Exact Requested Message */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-slate-900 mb-3 leading-tight">
              I love you <span className="text-rose-600">prachi sister</span> ❤️
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto mb-6 leading-relaxed">
              You are the most precious, caring, and wonderful sister in the world. Always remember your brother <span className="font-semibold text-slate-900">Mandip</span> is right here cheering for you and protecting you forever!
            </p>

            <div className="flex flex-col gap-2.5">
              {/* Replay Fireworks / Pataka */}
              <button
                onClick={handleReplayPataka}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Shoot More Pataka (Fireworks) 🎆</span>
              </button>

              {/* Continue to Website */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md cursor-pointer transition-colors"
              >
                Explore Your Website, Prachi ✨
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
