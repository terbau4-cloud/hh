import React, { useState, useEffect } from 'react';
import { CouponItem } from '../types';
import { Gift, CheckCircle, Clock, IceCream, MessageCircle, ShieldCheck, Coffee, Wrench, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

const INITIAL_COUPONS: CouponItem[] = [
  {
    id: 'coup-1',
    title: 'Emergency Ice Cream / Sweet Run',
    description: 'Valid for 1 instant delivery of your favorite dessert or sweet treat. Mandip covers 100% of the cost.',
    code: 'PRACHI-SWEET',
    icon: 'IceCream',
    isRedeemed: false,
  },
  {
    id: 'coup-2',
    title: 'Unconditional Vent & Listen Session',
    description: '1 hour of undivided brotherly attention. You vent about anything with zero judgment and total support.',
    code: 'PRACHI-LISTEN',
    icon: 'MessageCircle',
    isRedeemed: false,
  },
  {
    id: 'coup-3',
    title: 'The "Prachi Wins The Argument" Pass',
    description: 'Instantly win any disagreement with Mandip. Show this voucher and he must concede defeat immediately.',
    code: 'PRACHI-WIN',
    icon: 'ShieldCheck',
    isRedeemed: false,
  },
  {
    id: 'coup-4',
    title: 'Emergency Brother Pickup / Ride',
    description: 'Need a ride in the rain, a lift from the station, or company? Brother Mandip is on his way.',
    code: 'PRACHI-RIDE',
    icon: 'Coffee',
    isRedeemed: false,
  },
  {
    id: 'coup-5',
    title: 'Tech Support & Problem Solver',
    description: 'Phone glitching, laptop issues, or app setup? Mandip fixes your tech problems without complaining.',
    code: 'PRACHI-TECH',
    icon: 'Wrench',
    isRedeemed: false,
  },
  {
    id: 'coup-6',
    title: 'Favorite Meal / Takeout Feast',
    description: 'Order your favorite meal, snacks, or takeout on a lazy weekend, paid for by brother Mandip.',
    code: 'PRACHI-FEAST',
    icon: 'Utensils',
    isRedeemed: false,
  },
];

export const SisterCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<CouponItem[]>(INITIAL_COUPONS);

  useEffect(() => {
    const saved = localStorage.getItem('mandip_prachi_coupons');
    if (saved) {
      try {
        setCoupons(JSON.parse(saved));
      } catch {
        // Fallback
      }
    }
  }, []);

  const handleRedeem = (id: string) => {
    const updated = coupons.map((c) => {
      if (c.id === id) {
        const nextState = !c.isRedeemed;
        return {
          ...c,
          isRedeemed: nextState,
          redeemedDate: nextState
            ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : undefined,
        };
      }
      return c;
    });

    setCoupons(updated);
    localStorage.setItem('mandip_prachi_coupons', JSON.stringify(updated));

    soundManager.playCelebrationChord();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fbbf24', '#3b82f6'],
    });
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'IceCream':
        return <IceCream className="w-4 h-4 text-pink-500" />;
      case 'MessageCircle':
        return <MessageCircle className="w-4 h-4 text-amber-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4 text-blue-500" />;
      case 'Wrench':
        return <Wrench className="w-4 h-4 text-purple-500" />;
      case 'Utensils':
      default:
        return <Utensils className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <section id="coupons" className="py-16 md:py-20 bg-[#f8fafc] border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-wider font-semibold text-rose-600 block mb-1">
            Brotherly Perks
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-slate-900">
            Prachi's Sister Vouchers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Non-expiring sibling coupons Prachi can redeem with Mandip anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((c) => (
            <div
              key={c.id}
              className={`white-card rounded-2xl p-5 transition-all flex flex-col justify-between ${
                c.isRedeemed ? 'bg-slate-50/80 opacity-75' : 'hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {renderIcon(c.icon)}
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    {c.code}
                  </span>
                </div>

                <h3 className="font-editorial text-sm font-bold text-slate-900 mb-1.5">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {c.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  {c.isRedeemed ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Redeemed ({c.redeemedDate})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      Available
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleRedeem(c.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    c.isRedeemed
                      ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                  }`}
                >
                  {c.isRedeemed ? 'Undo' : 'Redeem'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
