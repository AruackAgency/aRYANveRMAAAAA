import React from 'react';
import { Sparkles, Heart, Gift, Cake, BookOpen, Crown, Star } from 'lucide-react';
import { triggerBirthdayConfetti, triggerGoldenShower } from '../utils/confetti';
import { soundManager } from '../utils/soundEffects';

interface HeroSectionProps {
  onOpenPhotoManager: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPhotoManager }) => {
  const handleCelebrate = () => {
    soundManager.playRomanticChord();
    triggerBirthdayConfetti();
    triggerGoldenShower(0.5, 0.3);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Decorative atmospheric light orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-600/20 via-rose-500/20 to-amber-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Crown Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 rounded-full bg-rose-500/15 border border-pink-400/30 px-5 py-2 text-xs sm:text-sm font-semibold tracking-wider text-rose-200 backdrop-blur-md shadow-lg shadow-rose-950/40 mb-6 animate-float-slow">
        <Crown className="h-4 w-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        <span>A MAGICAL TRIBUTE TO QUEEN SWETAKSHI</span>
        <Sparkles className="h-4 w-4 text-amber-300" />
      </div>

      {/* Main Title Heading */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-3">
        <p className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-pink-300 tracking-wide">
          Happy Birthday, Most Beautiful
        </p>

        <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-200 drop-shadow-[0_10px_25px_rgba(244,63,94,0.4)]">
          Swetakshi Singh
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-rose-100/80 font-light leading-relaxed pt-2">
          To the girl whose smile outshines a thousand suns and whose laughter turns ordinary days into sweet poetry. Here is a handcrafted celebration made entirely to honor <span className="text-pink-300 font-medium">you</span>. ✨
        </p>
      </div>

      {/* Quick Action CTA Buttons */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 max-w-xl mx-auto">
        <a
          href="#photos"
          onClick={() => soundManager.playRomanticChord()}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-400 hover:to-pink-400 shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span>Explore 4 Memories</span>
        </a>

        <a
          href="#cake"
          onClick={() => soundManager.playSparkle()}
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm sm:text-base font-semibold text-rose-100 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Cake className="h-4 w-4 text-pink-400" />
          <span>Blow Candles</span>
        </a>

        <a
          href="#letter"
          onClick={() => soundManager.playSparkle()}
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm sm:text-base font-semibold text-rose-100 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <BookOpen className="h-4 w-4 text-amber-300" />
          <span>Read Love Letter</span>
        </a>

        <button
          onClick={handleCelebrate}
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm sm:text-base font-semibold text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Gift className="h-4 w-4 text-amber-300" />
          <span>Shower Confetti 🎉</span>
        </button>
      </div>

      {/* Birthday Highlights / Stat Badges */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl w-full mt-14">
        {[
          { label: 'Radiance Level', value: '100% Infinite', icon: Star, color: 'from-amber-500 to-yellow-300' },
          { label: 'Magical Chapters', value: '4 Special Photos', icon: Heart, color: 'from-rose-500 to-pink-400' },
          { label: 'Precious Moments', value: 'Uncountable', icon: Sparkles, color: 'from-pink-500 to-purple-400' },
          { label: 'Queen Status', value: 'Forever Royalty', icon: Crown, color: 'from-amber-400 to-orange-400' },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="glass-panel-dark rounded-2xl p-4 text-center border border-pink-500/15 hover:border-pink-400/40 transition-all duration-300 hover:scale-102 group"
            >
              <div className="inline-flex p-2 rounded-xl bg-white/5 border border-white/10 mb-2 group-hover:rotate-6 transition-transform">
                <Icon className="h-5 w-5 text-pink-300" />
              </div>
              <div className="font-serif-luxury font-bold text-lg sm:text-xl text-white">
                {item.value}
              </div>
              <div className="text-xs text-rose-200/60 font-medium mt-0.5">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Small Helper hint to upload photos */}
      <div className="relative z-10 mt-6 flex items-center justify-center gap-2 text-xs text-rose-300/70">
        <span>📸 Have your 4 favorite photos of Swetakshi?</span>
        <button
          onClick={onOpenPhotoManager}
          className="text-pink-300 hover:text-pink-200 underline font-semibold cursor-pointer"
        >
          Click here to customize them anytime!
        </button>
      </div>
    </section>
  );
};
