import React, { useState } from 'react';
import { Shield, PhoneCall, Lock, Award, Heart, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';

const PROMISES = [
  {
    id: 1,
    title: 'Unconditional Protection',
    description: 'I promise to stand by you and protect you from any disrespect, unfairness, or hardship life throws your way.',
    icon: <Shield className="w-5 h-5 text-blue-600" />,
    badgeColor: 'bg-blue-50 text-blue-700',
  },
  {
    id: 2,
    title: 'Always One Call Away',
    description: 'Whether it is 2:00 PM or 2:00 AM, if you ever feel stressed, upset, or lost, you can call your brother without hesitation.',
    icon: <PhoneCall className="w-5 h-5 text-emerald-600" />,
    badgeColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 3,
    title: 'Secret Keeper for Life',
    description: 'Whatever you share with me stays between us forever. No lectures, no betrayal—just pure sibling trust.',
    icon: <Lock className="w-5 h-5 text-amber-600" />,
    badgeColor: 'bg-amber-50 text-amber-700',
  },
  {
    id: 4,
    title: 'Your Biggest Supporter',
    description: 'I promise to cheer for every dream, career ambition, and personal milestone you chase. I believe in your capabilities 100%.',
    icon: <Award className="w-5 h-5 text-purple-600" />,
    badgeColor: 'bg-purple-50 text-purple-700',
  },
  {
    id: 5,
    title: 'Forever Your Safe Space',
    description: 'No matter what mistakes happen or how busy our schedules become, my door, my advice, and my care are permanently yours.',
    icon: <Heart className="w-5 h-5 text-rose-600" />,
    badgeColor: 'bg-rose-50 text-rose-700',
  },
];

export const PromisesSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section id="promises" className="py-16 md:py-20 bg-[#f8fafc] border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-wider font-semibold text-rose-600 block mb-1">
            Lifelong Commitments
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-slate-900">
            Mandip's <span className="text-rose-600">5 Promises</span> to Prachi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Pledges from an elder brother that will never expire
          </p>
        </div>

        {/* 5 Clean White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
          {PROMISES.map((p) => {
            const isSelected = activeId === p.id;
            return (
              <div
                key={p.id}
                onClick={() => {
                  setActiveId(p.id);
                  soundManager.playChime(480 + p.id * 40, 0.4);
                }}
                className={`white-card rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'ring-2 ring-rose-500/80 shadow-md'
                    : 'hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">
                      0{p.id}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                      {p.icon}
                    </div>
                  </div>

                  <h3 className="font-editorial text-sm font-bold text-slate-900 mb-2">
                    {p.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>Mandip's Word</span>
                  <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-rose-500' : 'bg-slate-300'}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
