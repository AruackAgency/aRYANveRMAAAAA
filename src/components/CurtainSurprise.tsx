import React, { useState } from 'react';
import { Sparkles, Gift, Heart, Crown, Music } from 'lucide-react';
import { triggerBirthdayConfetti } from '../utils/confetti';
import { soundManager } from '../utils/soundEffects';

interface CurtainSurpriseProps {
  onOpen: () => void;
}

export const CurtainSurprise: React.FC<CurtainSurpriseProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isUnwrapped, setIsUnwrapped] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    soundManager.playWaxSealSnap();
    soundManager.playSparkle();

    setTimeout(() => {
      triggerBirthdayConfetti();
      soundManager.playBirthdayFanfare();
      soundManager.startBackgroundMelody();
      setIsUnwrapped(true);
      setTimeout(() => {
        onOpen();
      }, 700);
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#120719] via-[#240c2e] to-[#0c0414] transition-all duration-1000 ${
        isUnwrapped ? 'pointer-events-none opacity-0 scale-105' : 'opacity-100'
      }`}
    >
      {/* Background ambient glow circles */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-rose-600/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />

      {/* Floating sparkles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-300/60 blur-[1px] animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Center Gift Box / Invitation card */}
      <div
        className={`relative z-10 mx-4 max-w-lg w-full rounded-3xl p-8 sm:p-10 text-center transition-all duration-700 transform ${
          isOpening ? 'scale-90 opacity-70 rotate-1' : 'scale-100 opacity-100'
        } glass-panel-dark shadow-[0_0_60px_rgba(244,63,94,0.35)] border border-pink-400/30`}
      >
        {/* Crown Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-rose-500/20 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-200 border border-amber-400/30 shadow-inner mb-6">
          <Crown className="h-4 w-4 text-amber-400 animate-bounce" />
          <span>A ROYAL BIRTHDAY INVITATION</span>
          <Crown className="h-4 w-4 text-amber-400 animate-bounce" />
        </div>

        {/* Dedication Text */}
        <p className="font-handwriting text-2xl sm:text-3xl text-pink-300 mb-1">
          Handcrafted with pure love for
        </p>

        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 drop-shadow-[0_4px_12px_rgba(244,63,94,0.5)] my-3">
          Swetakshi Singh
        </h1>

        <p className="text-sm sm:text-base text-rose-200/80 font-light tracking-wide max-w-sm mx-auto my-4 leading-relaxed">
          Today, the universe celebrates its brightest star. An unforgettable magical surprise awaits you inside. ✨
        </p>

        {/* Animated Gift / Ribbon Box Visual */}
        <div className="relative my-8 flex justify-center">
          <div className="relative group cursor-pointer" onClick={handleOpen}>
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 opacity-50 blur-xl group-hover:opacity-80 transition duration-500" />
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 flex items-center justify-center shadow-2xl border-2 border-pink-200/40 transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2">
              {/* Ribbon cross */}
              <div className="absolute inset-y-0 w-6 bg-gradient-to-r from-amber-300 to-yellow-400 shadow-md" />
              <div className="absolute inset-x-0 h-6 bg-gradient-to-b from-amber-300 to-yellow-400 shadow-md" />
              <Gift className="relative z-10 h-14 w-14 text-white drop-shadow-lg animate-bounce" />
            </div>

            {/* Glowing seal tag */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-rose-950/90 text-rose-200 text-xs px-3 py-1 rounded-full border border-rose-400/50 shadow-lg flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-300" />
              <span>Tap the Gift to Open</span>
            </div>
          </div>
        </div>

        {/* Big Tap Button */}
        <button
          onClick={handleOpen}
          disabled={isOpening}
          className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-bold text-white rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-pink-500 transition-all duration-300 shadow-[0_0_30px_rgba(244,63,94,0.6)] hover:shadow-[0_0_45px_rgba(244,63,94,0.9)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Sparkles className="h-5 w-5 text-amber-300 group-hover:rotate-45 transition-transform" />
          <span>Open Swetakshi&apos;s Birthday World</span>
          <Heart className="h-5 w-5 text-pink-300 fill-pink-300 group-hover:scale-125 transition-transform" />
        </button>

        {/* Audio hint */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-rose-300/60 font-medium">
          <Music className="h-3.5 w-3.5 animate-pulse text-pink-400" />
          <span>Best experienced with sound turned ON 🎧</span>
        </div>
      </div>
    </div>
  );
};
