import React, { useState } from 'react';
import { ReasonItem } from '../types';
import { REASONS_LIST } from '../data/initialData';
import { Sparkles, Heart, Crown, Eye, CheckCircle } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { triggerGoldenShower, triggerBirthdayConfetti } from '../utils/confetti';

export const ReasonsDeck: React.FC = () => {
  const [reasons] = useState<ReasonItem[]>(REASONS_LIST);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [flippedIds, setFlippedIds] = useState<number[]>([]);

  const handleCardClick = (id: number) => {
    soundManager.playSparkle();
    if (flippedIds.includes(id)) {
      setFlippedIds(flippedIds.filter((item) => item !== id));
    } else {
      setFlippedIds([...flippedIds, id]);
      if (flippedIds.length + 1 === reasons.length) {
        triggerBirthdayConfetti();
        soundManager.playBirthdayFanfare();
      } else {
        triggerGoldenShower();
      }
    }
  };

  const revealAll = () => {
    soundManager.playRomanticChord();
    setFlippedIds(reasons.map((r) => r.id));
    triggerBirthdayConfetti();
  };

  const filteredReasons = selectedCategory === 'all'
    ? reasons
    : reasons.filter((r) => r.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Reasons' },
    { id: 'radiance', label: 'Her Radiance ✨' },
    { id: 'heart', label: 'Her Golden Heart 💖' },
    { id: 'magic', label: 'Her Magic 🪄' },
    { id: 'quirks', label: 'Cute Quirks 🥰' },
  ];

  return (
    <section id="reasons" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-pink-400/30 text-rose-200 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>Infinite Reasons to Admire You</span>
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-200 mb-3">
          Why Swetakshi Is One in a Billion 💎
        </h2>

        <p className="text-sm sm:text-base text-rose-100/70 font-light">
          Tap each card to flip and uncover what makes you the most extraordinary person.
        </p>

        {/* Progress & Quick Reveal */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-rose-200 flex items-center gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-pink-400" />
            <span>
              Unlocked: <strong className="text-pink-300">{flippedIds.length}</strong> / {reasons.length}
            </span>
          </div>

          <button
            onClick={revealAll}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-xs font-semibold text-rose-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5 text-pink-300" />
            <span>Reveal All Secrets</span>
          </button>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playSparkle();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                  : 'bg-white/5 text-rose-200/80 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Flip Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {filteredReasons.map((reason) => {
          const isFlipped = flippedIds.includes(reason.id);
          return (
            <div
              key={reason.id}
              onClick={() => handleCardClick(reason.id)}
              className="perspective-1000 h-56 w-full cursor-pointer group select-none"
            >
              <div
                className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Card Front (Mystery / Sealed side) */}
                <div className="absolute inset-0 backface-hidden glass-panel-dark rounded-2xl p-6 border border-pink-500/20 shadow-xl flex flex-col items-center justify-between text-center group-hover:border-pink-400/50 group-hover:shadow-[0_0_25px_rgba(244,63,94,0.3)] transition-all">
                  <div className="w-full flex items-center justify-between text-[11px] text-rose-300/60 font-semibold">
                    <span>REASON #{reason.number}</span>
                    <Crown className="h-3.5 w-3.5 text-amber-300" />
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-rose-500/20 to-amber-500/20 border border-pink-400/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {reason.emoji}
                    </div>
                    <h4 className="font-serif-luxury font-bold text-base text-white">
                      {reason.title}
                    </h4>
                  </div>

                  <div className="text-[11px] text-pink-300/70 font-medium flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-300" />
                    <span>Tap to reveal magic</span>
                  </div>
                </div>

                {/* Card Back (Revealed Romantic Note side) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-6 bg-gradient-to-br from-rose-950 via-pink-950 to-purple-950 border-2 border-pink-400/50 shadow-2xl flex flex-col justify-between text-center">
                  <div className="flex items-center justify-between text-[11px] text-amber-300 font-semibold">
                    <span>REASON #{reason.number}</span>
                    <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
                  </div>

                  <p className="font-handwriting text-xl sm:text-2xl text-rose-100 leading-snug px-1">
                    &ldquo;{reason.text}&rdquo;
                  </p>

                  <div className="text-[10px] text-rose-300/70 uppercase tracking-widest font-semibold">
                    ✨ Swetakshi Singh
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
