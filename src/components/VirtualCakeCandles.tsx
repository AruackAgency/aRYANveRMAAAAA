import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Wind, RotateCcw, Mic, MicOff, Crown } from 'lucide-react';
import { triggerBirthdayConfetti, triggerGoldenShower } from '../utils/confetti';
import { soundManager } from '../utils/soundEffects';

export const VirtualCakeCandles: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [candlesCount, setCandlesCount] = useState(5);
  const [isMicListening, setIsMicListening] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [wishMade, setWishMade] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const extinguishCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setWishMade(true);
    soundManager.playBlowSound();

    setTimeout(() => {
      triggerBirthdayConfetti();
      triggerGoldenShower(0.5, 0.4);
      soundManager.playBirthdayFanfare();
    }, 300);

    // Stop mic if listening
    if (isMicListening) {
      stopMicListening();
    }
  };

  const relightCandles = () => {
    soundManager.playSparkle();
    setCandlesLit(true);
    setWishMade(false);
  };

  const startMicListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsMicListening(true);
      soundManager.playSparkle();

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setMicVolume(Math.min(100, Math.round((avg / 128) * 100)));

        // If high breath / blow detected
        if (avg > 38 && candlesLit) {
          extinguishCandles();
          return;
        }

        animFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.warn('Microphone permission denied or not available:', err);
      alert('Microphone access was denied. You can tap the "Blow Out Candles" button directly!');
      setIsMicListening(false);
    }
  };

  const stopMicListening = () => {
    setIsMicListening(false);
    setMicVolume(0);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopMicListening();
    };
  }, []);

  return (
    <section id="cake" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-pink-400/30 text-rose-200 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>Virtual Candle Blowing Ceremony</span>
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-200 mb-3">
          Make a Wish, Swetakshi 🎂
        </h2>

        <p className="text-sm sm:text-base text-rose-100/70 font-light">
          Close your eyes, think of your sweetest wish, and blow out your birthday candles!
        </p>
      </div>

      {/* Main Cake Stage */}
      <div className="glass-panel-dark rounded-3xl p-6 sm:p-10 border border-pink-500/20 shadow-2xl relative overflow-hidden text-center">
        {/* Cake Visual */}
        <div className="relative py-6 max-w-md mx-auto flex flex-col items-center">
          {/* Candles Container */}
          <div className="flex items-end justify-center gap-4 sm:gap-6 z-20 -mb-2">
            {[...Array(candlesCount)].map((_, i) => (
              <div key={i} className="flex flex-col items-center relative">
                {/* Flame */}
                {candlesLit ? (
                  <div className="relative cursor-pointer group" onClick={extinguishCandles}>
                    <div className="w-4 h-7 rounded-full bg-gradient-to-t from-orange-500 via-yellow-300 to-white animate-flame shadow-[0_0_15px_#f59e0b]" />
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-300 blur-[0.5px]" />
                  </div>
                ) : (
                  /* Smoke puff */
                  <div className="h-7 w-2 flex flex-col items-center justify-end">
                    <div className="w-2 h-2 rounded-full bg-white/40 blur-[1px] animate-[ping_1.5s_ease-out_infinite]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400/30 blur-[1px] animate-[bounce_2s_infinite]" />
                  </div>
                )}

                {/* Candle Wick */}
                <div className="w-0.5 h-2 bg-slate-700" />

                {/* Candle Stick */}
                <div
                  className={`w-3.5 sm:w-4 rounded-t-sm shadow-md transition-all duration-300 ${
                    i % 2 === 0
                      ? 'h-14 sm:h-16 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-500'
                      : 'h-16 sm:h-18 bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-400'
                  }`}
                >
                  {/* Candle stripes pattern */}
                  <div className="w-full h-full opacity-30 flex flex-col justify-between py-1">
                    <div className="h-0.5 bg-white" />
                    <div className="h-0.5 bg-white" />
                    <div className="h-0.5 bg-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3D Tiered Cake Base */}
          <div className="w-full relative z-10 flex flex-col items-center">
            {/* Top Tier */}
            <div className="w-48 sm:w-56 h-16 rounded-t-2xl bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 border-2 border-pink-100/60 shadow-lg relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white/60 to-transparent rounded-t-xl" />
              {/* Frosting drips */}
              <div className="absolute top-0 inset-x-0 flex justify-around">
                {[...Array(7)].map((_, idx) => (
                  <div key={idx} className="w-4 h-3 bg-white/70 rounded-b-full shadow-inner" />
                ))}
              </div>
              <span className="font-handwriting font-bold text-lg sm:text-xl text-rose-800 drop-shadow-xs z-10">
                Queen Swetakshi
              </span>
            </div>

            {/* Middle Tier */}
            <div className="w-64 sm:w-76 h-20 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 border-2 border-pink-200/50 shadow-xl relative flex items-center justify-center">
              <div className="absolute inset-x-0 top-0 h-4 bg-white/40 flex justify-around">
                {[...Array(10)].map((_, idx) => (
                  <div key={idx} className="w-5 h-4 bg-white/80 rounded-b-full shadow-sm" />
                ))}
              </div>
              {/* Delicate pearl decor */}
              <div className="flex gap-3 text-xs text-white/90 font-serif-luxury tracking-widest uppercase">
                <span>✨ Happy Birthday ✨</span>
              </div>
            </div>

            {/* Bottom Tier */}
            <div className="w-80 sm:w-96 h-24 rounded-b-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 border-2 border-pink-300/40 shadow-2xl relative flex items-center justify-center">
              <div className="absolute inset-x-0 top-0 h-4 bg-white/30 flex justify-around">
                {[...Array(14)].map((_, idx) => (
                  <div key={idx} className="w-5 h-4 bg-amber-100/90 rounded-b-full" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-rose-100 font-serif-luxury text-sm">
                <Crown className="h-4 w-4 text-amber-300" />
                <span className="tracking-wider">Forever Radiant & Loved</span>
                <Crown className="h-4 w-4 text-amber-300" />
              </div>
            </div>

            {/* Gold Serving Platter Plate */}
            <div className="w-92 sm:w-[420px] h-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow-2xl border border-amber-200 -mt-1" />
          </div>
        </div>

        {/* Wish Banner Popup when blown */}
        {wishMade && !candlesLit && (
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-amber-500/20 border border-pink-400/40 animate-pulse-glow max-w-lg mx-auto">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-rose-200 mb-2">
              🎉 Your Wish Has Been Sent to the Stars! 🎉
            </h3>
            <p className="text-sm sm:text-base text-rose-100 leading-relaxed font-light">
              May every single dream, prayer, and silent hope in your beautiful heart manifest into reality this year, <strong className="text-pink-300 font-semibold">Swetakshi</strong>! You deserve the world and more.
            </p>
          </div>
        )}

        {/* Interactive Candle Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {candlesLit ? (
            <>
              <button
                onClick={extinguishCandles}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-pink-500 shadow-xl shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Wind className="h-5 w-5 text-sky-200" />
                <span>Blow Out Candles 💨</span>
              </button>

              {/* Mic Mode Toggle */}
              <button
                onClick={isMicListening ? stopMicListening : startMicListening}
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold border backdrop-blur-md transition-all cursor-pointer ${
                  isMicListening
                    ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 text-rose-200 border-white/20'
                }`}
              >
                {isMicListening ? (
                  <>
                    <Mic className="h-4 w-4 text-white" />
                    <span>Blow into mic! ({micVolume}%)</span>
                  </>
                ) : (
                  <>
                    <MicOff className="h-4 w-4 text-pink-300" />
                    <span>Enable Real Mic Blow 🎙️</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={relightCandles}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            >
              <RotateCcw className="h-4 w-4 text-amber-300" />
              <span>Light The Candles Again 🕯️</span>
            </button>
          )}

          {/* Candle count adjuster */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-rose-200">
            <span>Candles:</span>
            <button
              onClick={() => setCandlesCount(Math.max(1, candlesCount - 1))}
              className="h-6 w-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold"
            >
              -
            </button>
            <span className="font-bold text-pink-300">{candlesCount}</span>
            <button
              onClick={() => setCandlesCount(Math.min(9, candlesCount + 1))}
              className="h-6 w-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
