import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Edit3, Save, RotateCcw, Copy, Check, LockOpen } from 'lucide-react';
import { DEFAULT_LETTER } from '../data/initialData';
import { soundManager } from '../utils/soundEffects';
import { triggerBirthdayConfetti } from '../utils/confetti';

export const WaxSealedLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [letterText, setLetterText] = useState(DEFAULT_LETTER);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const savedLetter = localStorage.getItem('swetakshi_birthday_letter');
    if (savedLetter) {
      setLetterText(savedLetter);
    }
  }, []);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    soundManager.playWaxSealSnap();
    setIsOpen(true);
    triggerBirthdayConfetti();

    // Start typewriter effect
    let currentIndex = 0;
    const fullText = letterText;
    setDisplayedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 3));
        currentIndex += 3;
      } else {
        setDisplayedText(fullText);
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 20);
  };

  const handleSaveLetter = () => {
    localStorage.setItem('swetakshi_birthday_letter', letterText);
    setIsEditing(false);
    setDisplayedText(letterText);
    setIsTypingComplete(true);
    soundManager.playSparkle();
  };

  const handleResetLetter = () => {
    setLetterText(DEFAULT_LETTER);
    localStorage.setItem('swetakshi_birthday_letter', DEFAULT_LETTER);
    setIsEditing(false);
    setDisplayedText(DEFAULT_LETTER);
    soundManager.playSparkle();
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    soundManager.playSparkle();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="letter" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-pink-400/30 text-rose-200 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>From The Depths of My Heart</span>
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-200 mb-3">
          A Sealed Letter for Swetakshi 💌
        </h2>

        <p className="text-sm sm:text-base text-rose-100/70 font-light">
          Some feelings are too precious for ordinary words. Break the golden wax seal to read what my heart wanted to tell you today.
        </p>
      </div>

      {/* Sealed Envelope State */}
      {!isOpen ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div
            onClick={handleOpenEnvelope}
            className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105 active:scale-95"
          >
            {/* Ambient envelope glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 opacity-40 blur-xl group-hover:opacity-75 transition duration-500" />

            {/* Envelope Box */}
            <div className="relative w-80 sm:w-96 h-56 rounded-2xl bg-gradient-to-br from-[#2a1334] to-[#1a0b22] border-2 border-pink-400/40 shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
              {/* Envelope Flap Lines */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/5 to-transparent border-b border-pink-400/30 clip-triangle" />

              <div className="flex items-center justify-between text-xs text-rose-200/60 z-10">
                <span className="font-serif-luxury uppercase tracking-widest text-[10px]">
                  Confidential & Special
                </span>
                <span>To: Swetakshi Singh 👑</span>
              </div>

              {/* Center Royal Wax Seal */}
              <div className="relative z-20 flex flex-col items-center my-auto">
                <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-[3px] shadow-2xl shadow-amber-500/50 group-hover:rotate-6 transition-transform">
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-rose-800 to-red-900 flex items-center justify-center border-2 border-amber-300/60 shadow-inner">
                    <span className="font-serif-luxury font-black text-3xl text-amber-200 drop-shadow-md">
                      S
                    </span>
                  </div>
                  {/* Floating pulse ring */}
                  <div className="absolute -inset-1 rounded-full border border-amber-300/40 animate-ping" />
                </div>
                <span className="mt-3 text-xs font-semibold text-amber-200 tracking-wider flex items-center gap-1.5">
                  <LockOpen className="h-3.5 w-3.5 text-amber-300 animate-bounce" />
                  <span>Click to Break Wax Seal</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-pink-300/60 z-10 font-handwriting text-base">
                <span>With Endless Warmth</span>
                <Heart className="h-4 w-4 fill-pink-400 text-pink-400" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Unfolded Letter State */
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border-2 border-amber-200/50 shadow-2xl bg-[#fffdfa] text-slate-900 relative transition-all duration-700">
          {/* Royal Letterhead */}
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-rose-800 text-amber-200 flex items-center justify-center font-serif-luxury font-bold text-xl shadow-md">
                S
              </div>
              <div>
                <h3 className="font-serif-luxury font-bold text-lg text-rose-900">
                  Royal Birthday Letter
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Dedicated to Queen Swetakshi Singh
                </p>
              </div>
            </div>

            {/* Letter controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                title="Copy Letter Text"
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all text-xs font-semibold flex items-center gap-1"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playSparkle();
                  setIsEditing(!isEditing);
                }}
                title="Personalize Letter Words"
                className="p-2 rounded-lg bg-pink-100 hover:bg-pink-200 text-rose-800 transition-all text-xs font-semibold flex items-center gap-1"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{isEditing ? 'Close Editor' : 'Edit Words'}</span>
              </button>
            </div>
          </div>

          {/* Letter Body or Editor */}
          {isEditing ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                ✏️ Want to add personal memories, nicknames, or heartfelt sentences? Edit below and tap Save:
              </p>
              <textarea
                value={letterText}
                onChange={(e) => setLetterText(e.target.value)}
                rows={12}
                className="w-full p-4 rounded-xl border border-pink-200 bg-white text-slate-900 font-sans-clean text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 leading-relaxed shadow-inner"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={handleResetLetter}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Default</span>
                </button>
                <button
                  onClick={handleSaveLetter}
                  className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-md flex items-center gap-1.5"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Letter</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="whitespace-pre-line font-serif-luxury text-base sm:text-lg text-slate-800 leading-relaxed tracking-wide">
                {displayedText}
                {!isTypingComplete && (
                  <span className="inline-block w-1.5 h-5 bg-rose-600 ml-1 animate-pulse" />
                )}
              </div>

              {isTypingComplete && (
                <div className="pt-6 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 fill-rose-600 text-rose-600 animate-pulse" />
                    <span className="font-handwriting text-2xl text-rose-800">
                      Forever in awe of you
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Sent with endless adoration</span>
                    <span className="font-serif-luxury font-bold text-sm text-slate-800">
                      Happy Birthday Swetakshi ✨
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
