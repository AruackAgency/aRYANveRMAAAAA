import React, { useState } from 'react';
import { Sparkles, Cookie, RefreshCw, Trophy, Crown, Heart, Gift } from 'lucide-react';
import { BIRTHDAY_FORTUNES } from '../data/initialData';
import { soundManager } from '../utils/soundEffects';
import { triggerGoldenShower, triggerBirthdayConfetti } from '../utils/confetti';

export const ComplimentWheel: React.FC = () => {
  const [fortuneIndex, setFortuneIndex] = useState(0);
  const [isCracking, setIsCracking] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const compliments = [
    { text: 'Your smile is literally pure sunshine on a cloudy day.', icon: '☀️' },
    { text: 'You possess a grace that cannot be taught—it just radiates from your soul.', icon: '✨' },
    { text: 'Your laugh is the sweetest melody anyone could ever hear.', icon: '🎶' },
    { text: 'You inspire people to be kinder just by being in the room.', icon: '💖' },
    { text: 'Queen Swetakshi: You have the beauty of the moon and the fire of the sun.', icon: '👑' },
    { text: 'Being around you makes every ordinary moment feel magical.', icon: '🪄' },
  ];

  const [activeCompliment, setActiveCompliment] = useState(compliments[0]);

  const handleCrackCookie = () => {
    if (isCracking) return;
    setIsCracking(true);
    soundManager.playWaxSealSnap();

    setTimeout(() => {
      const nextIdx = (fortuneIndex + 1) % BIRTHDAY_FORTUNES.length;
      setFortuneIndex(nextIdx);
      setIsCracking(false);
      setIsRevealed(true);
      soundManager.playRomanticChord();
      triggerGoldenShower();
    }, 400);
  };

  const handleRandomCompliment = () => {
    soundManager.playSparkle();
    const nextComp = compliments[Math.floor(Math.random() * compliments.length)];
    setActiveCompliment(nextComp);
    setSpinCount((prev) => prev + 1);
    if ((spinCount + 1) % 4 === 0) {
      triggerBirthdayConfetti();
    }
  };

  const currentFortune = BIRTHDAY_FORTUNES[fortuneIndex];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-pink-400/30 text-rose-200 text-xs font-semibold tracking-wider uppercase mb-3">
          <Gift className="h-3.5 w-3.5 text-amber-300" />
          <span>Fortunes & Sweet Truths</span>
          <Gift className="h-3.5 w-3.5 text-amber-300" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-200 mb-3">
          Swetakshi&apos;s Birthday Magic Box 🥠
        </h2>

        <p className="text-sm sm:text-base text-rose-100/70 font-light">
          Crack open your birthday fortune cookie or generate an instant heartfelt compliment!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Box 1: Birthday Fortune Cookie */}
        <div className="glass-panel-dark rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-xl flex flex-col justify-between text-center relative overflow-hidden group">
          <div>
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300 mb-4">
              <Cookie className="h-7 w-7 animate-bounce" />
            </div>

            <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2">
              Birthday Fortune Cookie
            </h3>
            <p className="text-xs text-rose-200/70 mb-6">
              Crack the golden cookie to reveal the cosmic prediction for your new year of life!
            </p>

            {/* Cookie / Fortune Display */}
            <div
              onClick={handleCrackCookie}
              className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                isRevealed
                  ? 'bg-gradient-to-br from-amber-950/50 to-pink-950/50 border-amber-400/40 shadow-lg'
                  : 'bg-white/5 border-white/10 hover:border-amber-400/40 hover:bg-white/10'
              }`}
            >
              {isRevealed ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-1.5 text-amber-300 text-xs font-bold tracking-wider uppercase">
                    <Crown className="h-3.5 w-3.5" />
                    <span>Fortune #{fortuneIndex + 1}</span>
                  </div>
                  <p className="font-serif-luxury italic text-base sm:text-lg text-rose-100 leading-snug">
                    &ldquo;{currentFortune.fortune}&rdquo;
                  </p>
                  <p className="text-xs text-pink-300/80 font-light">
                    {currentFortune.blessing}
                  </p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-around text-xs text-amber-200/90 font-medium">
                    <span>✨ Lucky No: {currentFortune.luckyNumber}</span>
                    <span>🎨 Lucky Shade: {currentFortune.luckyColor}</span>
                  </div>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center">
                  <span className="text-5xl mb-3 group-hover:scale-125 transition-transform">🥠</span>
                  <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Tap Cookie to Crack</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={handleCrackCookie}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>{isRevealed ? 'Crack Another Birthday Fortune' : 'Crack Open Now'}</span>
            </button>
          </div>
        </div>

        {/* Box 2: Instant Sweet Compliment Generator */}
        <div className="glass-panel-dark rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-xl flex flex-col justify-between text-center relative overflow-hidden group">
          <div>
            <div className="inline-flex p-3 rounded-2xl bg-rose-500/20 border border-pink-400/30 text-pink-300 mb-4">
              <Trophy className="h-7 w-7 animate-pulse" />
            </div>

            <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2">
              Crown Compliment Generator
            </h3>
            <p className="text-xs text-rose-200/70 mb-6">
              Just a tiny reminder of how stunning, intelligent, and lovely you are.
            </p>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/50 to-purple-950/50 border border-pink-400/40 shadow-lg min-h-[140px] flex flex-col items-center justify-center">
              <span className="text-3xl mb-2">{activeCompliment.icon}</span>
              <p className="font-handwriting text-2xl sm:text-3xl text-pink-200 leading-snug">
                &ldquo;{activeCompliment.text}&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={handleRandomCompliment}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-pink-500 shadow-md shadow-rose-600/30 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <Heart className="h-3.5 w-3.5 fill-white" />
              <span>Generate Another Compliment ({spinCount} generated)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
