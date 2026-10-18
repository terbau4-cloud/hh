import React, { useState, useEffect } from 'react';
import { Heart, Edit3, Check, Printer, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

const DEFAULT_LETTER = `Dear Prachi,

No matter how old we grow or how busy our lives become, you will always be my little sister. From the silly childhood fights over the smallest things to the quiet moments when you needed someone who would simply listen and understand—having you as my sister is something I am forever grateful for.

I want you to know how deeply proud I am of you. Your kindness, your determination, and the good energy you bring wherever you go make me proud to say that you are my sister.

Whenever life gets tough or stressful, never forget that your brother is always here for you. You don't have to face anything alone. My support, my time, and my care for you will never change.

Thank you for being such an awesome sister, Prachi. Keep shining and smiling!

With love always,
Your Brother,
Mandip`;

export const LetterSection: React.FC = () => {
  const [letterText, setLetterText] = useState<string>(DEFAULT_LETTER);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('mandip_prachi_letter');
    if (saved) {
      setLetterText(saved);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('mandip_prachi_letter', letterText);
    setIsEditing(false);
    soundManager.playCelebrationChord();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24'],
    });
  };

  const handleReset = () => {
    setLetterText(DEFAULT_LETTER);
    localStorage.removeItem('mandip_prachi_letter');
    setIsEditing(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="letter" className="py-16 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-wider font-semibold text-rose-600 block mb-1">
            Personal Note
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-slate-900">
            A Letter to <span className="text-rose-600">Prachi</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            From Mandip's heart to his sister
          </p>
        </div>

        {/* Clean White Stationery Card */}
        <div className="white-card rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-slate-200 relative">
          {/* Header Controls */}
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Quote className="w-3.5 h-3.5 text-rose-500" />
              <span>Brother's Letter to Prachi</span>
            </div>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-2 py-1 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Reset
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  title="Edit letter words"
                >
                  <Edit3 className="w-3 h-3 text-slate-500" />
                  <span>Edit Note</span>
                </button>
              )}

              <button
                onClick={handlePrint}
                className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                title="Print as card"
              >
                <Printer className="w-3 h-3 text-slate-500" />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>

          {/* Letter Body */}
          {isEditing ? (
            <textarea
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              rows={12}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm md:text-base font-editorial leading-relaxed focus:outline-none focus:ring-1 focus:ring-rose-400"
            />
          ) : (
            <div className="space-y-4 text-slate-700 text-sm sm:text-base font-editorial leading-relaxed">
              {letterText.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {/* Signoff */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 font-bold font-display text-xs">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Written by</span>
                <span className="text-xs font-bold text-slate-800">Mandip</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-rose-600 font-medium font-editorial">Always Your Brother</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
