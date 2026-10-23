import React, { useState, useEffect } from 'react';
import { Heart, Crown, ArrowUp, Sparkles, Music } from 'lucide-react';
import { triggerHeartConfetti, triggerGoldenShower } from '../utils/confetti';
import { soundManager } from '../utils/soundEffects';

interface FooterProps {
  onSendHearts: () => void;
  heartsCount: number;
}

export const Footer: React.FC<FooterProps> = ({ onSendHearts, heartsCount }) => {
  const [secondsSpent, setSecondsSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs}s`;
  };

  const handleBarrageHearts = () => {
    soundManager.playHeartPop();
    soundManager.playSparkle();
    triggerHeartConfetti();
    triggerGoldenShower();
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        onSendHearts();
      }, i * 80);
    }
  };

  const scrollToTop = () => {
    soundManager.playSparkle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-pink-500/20 bg-[#0d0412]/90 backdrop-blur-2xl text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-48 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-8">
        {/* Crown Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500/15 via-rose-500/15 to-amber-500/15 border border-pink-400/30 text-xs font-semibold tracking-wider text-rose-200">
          <Crown className="h-4 w-4 text-amber-300 animate-bounce" />
          <span>CELEBRATING QUEEN SWETAKSHI SINGH</span>
          <Crown className="h-4 w-4 text-amber-300 animate-bounce" />
        </div>

        {/* Big Heart Reaction Trigger */}
        <div className="space-y-3">
          <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200">
            Show Her Infinite Love Today
          </h3>
          <p className="text-sm text-rose-200/70 max-w-md mx-auto">
            Tap the button below to blast hundreds of floating hearts and confetti into the sky!
          </p>

          <div className="pt-2">
            <button
              onClick={handleBarrageHearts}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-pink-500 shadow-[0_0_35px_rgba(244,63,94,0.5)] hover:shadow-[0_0_55px_rgba(244,63,94,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Heart className="h-6 w-6 fill-white text-white group-hover:scale-125 transition-transform animate-pulse" />
              <span>Blast Hearts for Swetakshi ({heartsCount})</span>
              <Sparkles className="h-5 w-5 text-amber-300 group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </div>

        {/* Live celebration ticker */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-rose-300/80 pt-4">
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            ⏳ Celebrating for: <span className="font-bold text-pink-300">{formatTime(secondsSpent)}</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
            <Music className="h-3.5 w-3.5 text-pink-400" />
            <span>Romantic Birthday Serenade Playing</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            ✨ Total Love Taps: <span className="font-bold text-amber-300">{heartsCount}</span>
          </div>
        </div>

        {/* Footer bottom credit & Back to top */}
        <div className="w-full pt-8 border-t border-pink-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-300/60">
          <div className="flex items-center gap-1.5 font-light">
            <span>Handcrafted with all my love & devotion for</span>
            <strong className="text-pink-300 font-serif-luxury text-sm">Swetakshi Singh</strong>
            <span>💖</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5 text-pink-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
