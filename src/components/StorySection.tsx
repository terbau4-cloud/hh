import React from 'react';
import { Heart, Sun, Shield, Sparkles, Compass } from 'lucide-react';

export const StorySection: React.FC = () => {
  const chapters = [
    {
      era: 'Chapter 1',
      title: 'Growing Up Together',
      subtitle: 'Where it all began',
      description: 'Fighting over television remotes, competing for snacks, and creating chaotic childhood adventures. Those everyday moments built the foundation of our trust.',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      bgIcon: 'bg-amber-50',
    },
    {
      era: 'Chapter 2',
      title: 'The Elder Brother Shield',
      subtitle: 'Silent protection',
      description: 'As we grew older, Mandip took pride in watching out for Prachi. Being there whenever school, friends, or life got complicated, offering a safe space to talk.',
      icon: <Shield className="w-4 h-4 text-blue-500" />,
      bgIcon: 'bg-blue-50',
    },
    {
      era: 'Chapter 3',
      title: 'Celebrating Her Achievements',
      subtitle: 'Pride and joy',
      description: 'Seeing Prachi work hard, overcome obstacles, and flourish into a smart, confident person has been Mandip’s absolute happiest privilege.',
      icon: <Sparkles className="w-4 h-4 text-rose-500" />,
      bgIcon: 'bg-rose-50',
    },
    {
      era: 'Chapter 4',
      title: 'A Lifetime Ahead',
      subtitle: 'Unshakable roots',
      description: 'Wherever life, careers, or continents take us in the future, the bond between brother and sister remains rock solid. Always one phone call away.',
      icon: <Compass className="w-4 h-4 text-emerald-500" />,
      bgIcon: 'bg-emerald-50',
    },
  ];

  return (
    <section id="story" className="py-16 md:py-20 bg-[#f8fafc] border-y border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-wider font-semibold text-rose-600 block mb-1">
            Our Journey
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-slate-900">
            The Story of <span className="text-rose-600">Mandip &amp; Prachi</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Key chapters in an extraordinary brother and sister friendship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.map((ch, idx) => (
            <div
              key={idx}
              className="white-card white-card-hover rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                    {ch.era}
                  </span>
                  <div className={`w-8 h-8 rounded-xl ${ch.bgIcon} flex items-center justify-center`}>
                    {ch.icon}
                  </div>
                </div>

                <h3 className="font-editorial text-lg font-bold text-slate-900 mb-1">
                  {ch.title}
                </h3>
                <span className="text-xs text-rose-600 font-medium block mb-2.5">
                  {ch.subtitle}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {ch.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Brother Mandip</span>
                <span className="font-medium text-slate-700">Sister Prachi</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
