import React, { useState, useRef } from 'react';
import { PhotoItem } from '../types';
import { Download, Sparkles, Crown, Palette, Type, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import { soundManager } from '../utils/soundEffects';
import { triggerBirthdayConfetti } from '../utils/confetti';

interface KeepsakeCardGeneratorProps {
  photos: PhotoItem[];
}

export const KeepsakeCardGenerator: React.FC<KeepsakeCardGeneratorProps> = ({ photos }) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<number>(photos[0]?.id || 1);
  const [frameStyle, setFrameStyle] = useState<'rosegold' | 'vintage' | 'velvet' | 'starlight'>('rosegold');
  const [customSender, setCustomSender] = useState('With All My Heart & Love ❤️');
  const [selectedQuote, setSelectedQuote] = useState('Happy Birthday to the girl who brings magic wherever she goes!');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  const activePhoto = photos.find((p) => p.id === selectedPhotoId) || photos[0];

  const quotesList = [
    'Happy Birthday to the girl who brings magic wherever she goes!',
    'Out of 8 billion people, there is only one Queen Swetakshi Singh.',
    'May your year ahead be as breathtaking and radiant as your smile.',
    'Today we celebrate the most wonderful soul to ever walk the earth.',
  ];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsGenerating(true);
      soundManager.playSparkle();

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Swetakshi-Singh-Birthday-Keepsake.png`;
      link.click();

      setIsGenerating(false);
      setDownloadSuccess(true);
      triggerBirthdayConfetti();
      soundManager.playBirthdayFanfare();
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating card image:', err);
      setIsGenerating(false);
      alert('Could not download image directly. You can take a quick screenshot of this beautiful card!');
    }
  };

  const frameClasses = {
    rosegold: 'bg-gradient-to-br from-[#2a1024] via-[#1c0a1a] to-[#2f1022] border-4 border-pink-400/60 shadow-[0_0_40px_rgba(244,63,94,0.3)]',
    vintage: 'bg-[#fdf8f0] text-slate-900 border-8 border-[#f4eedf] shadow-2xl',
    velvet: 'bg-gradient-to-br from-[#1e0410] via-[#2f071a] to-[#14020a] border-4 border-rose-500/70 shadow-[0_0_45px_rgba(225,29,72,0.4)]',
    starlight: 'bg-gradient-to-br from-[#0b051e] via-[#180a3a] to-[#0a0418] border-4 border-amber-300/60 shadow-[0_0_40px_rgba(251,191,36,0.3)]',
  };

  const isVintage = frameStyle === 'vintage';

  return (
    <section id="card-maker" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-pink-400/30 text-rose-200 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>Keepsake Poster Creator</span>
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-200 mb-3">
          Swetakshi&apos;s Birthday Keepsake Card 🖼️
        </h2>

        <p className="text-sm sm:text-base text-rose-100/70 font-light">
          Customize an aesthetic birthday poster card with her picture and download it in high resolution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Card Preview Stage */}
        <div className="lg:col-span-7 flex justify-center">
          <div
            ref={cardRef}
            className={`w-full max-w-md p-6 sm:p-8 rounded-3xl transition-all duration-300 relative overflow-hidden ${frameClasses[frameStyle]}`}
          >
            {/* Header Monogram & Crown */}
            <div className="text-center space-y-1 mb-4">
              <div className="inline-flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-amber-400">
                <Crown className="h-3.5 w-3.5" />
                <span>BIRTHDAY KEEPSAKE EDITION</span>
                <Crown className="h-3.5 w-3.5" />
              </div>
              <h3 className={`font-serif-luxury font-black text-2xl sm:text-3xl ${isVintage ? 'text-slate-900' : 'text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200'}`}>
                Swetakshi Singh
              </h3>
            </div>

            {/* Photo Framed */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 mb-5 bg-black">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 text-[10px] text-amber-200 font-semibold">
                ✨ {activePhoto.chapter}
              </div>
            </div>

            {/* Quote Body */}
            <div className="space-y-3 text-center">
              <p className={`font-serif-luxury italic text-sm sm:text-base leading-snug px-2 ${isVintage ? 'text-slate-800' : 'text-rose-100'}`}>
                &ldquo;{selectedQuote}&rdquo;
              </p>

              <div className={`pt-3 border-t ${isVintage ? 'border-slate-300' : 'border-white/15'} flex items-center justify-between text-xs`}>
                <span className={`font-handwriting text-lg ${isVintage ? 'text-rose-700' : 'text-pink-300'}`}>
                  {customSender}
                </span>
                <span className={`font-serif-luxury font-semibold ${isVintage ? 'text-slate-600' : 'text-amber-300'}`}>
                  Forever Cherished ✨
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customization Controls */}
        <div className="lg:col-span-5 glass-panel-dark rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-xl space-y-6">
          {/* Photo Selector */}
          <div>
            <label className="block text-xs font-semibold text-rose-200 mb-2 flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5 text-pink-400" />
              <span>Select One of Her 4 Photos:</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {photos.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    soundManager.playSparkle();
                    setSelectedPhotoId(p.id);
                  }}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedPhotoId === p.id
                      ? 'border-pink-400 scale-105 shadow-md shadow-pink-500/50'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Aesthetic Frame Styles */}
          <div>
            <label className="block text-xs font-semibold text-rose-200 mb-2">
              Aesthetic Frame Theme:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'rosegold', label: '🌸 Rose Gold' },
                { id: 'vintage', label: '📜 Vintage Cream' },
                { id: 'velvet', label: '🍷 Crimson Velvet' },
                { id: 'starlight', label: '🌌 Starlight Indigo' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    soundManager.playSparkle();
                    setFrameStyle(style.id as any);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                    frameStyle === style.id
                      ? 'bg-rose-500/30 border-pink-400 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-rose-200/80 hover:bg-white/10'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quote Selection */}
          <div>
            <label className="block text-xs font-semibold text-rose-200 mb-2 flex items-center gap-1.5">
              <Type className="h-3.5 w-3.5 text-pink-400" />
              <span>Birthday Message:</span>
            </label>
            <select
              value={selectedQuote}
              onChange={(e) => setSelectedQuote(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1e0a2b] border border-white/15 text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-400 mb-2"
            >
              {quotesList.map((q, idx) => (
                <option key={idx} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          {/* Sender Signature */}
          <div>
            <label className="block text-xs font-semibold text-rose-200 mb-1">
              Custom Sender Note / Signature:
            </label>
            <input
              type="text"
              value={customSender}
              onChange={(e) => setCustomSender(e.target.value)}
              placeholder="e.g. With all my love ❤️"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-white/30"
            />
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-pink-500 shadow-xl shadow-rose-600/40 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isGenerating ? (
              <span>Generating High-Res Card... ✨</span>
            ) : downloadSuccess ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span>Downloaded Successfully! 💖</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 text-amber-300" />
                <span>Download Keepsake Card (PNG)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
