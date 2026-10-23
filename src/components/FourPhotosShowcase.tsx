import React, { useState } from 'react';
import { PhotoItem } from '../types';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Crown,
  Quote,
  LayoutGrid,
  Layers,
  Image as ImageIcon,
  Sliders,
  Upload,
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { triggerGoldenShower } from '../utils/confetti';

interface FourPhotosShowcaseProps {
  photos: PhotoItem[];
  onUpdatePhoto: (updated: PhotoItem) => void;
  onOpenPhotoManager: () => void;
  onOpenLightbox: (photo: PhotoItem) => void;
}

export const FourPhotosShowcase: React.FC<FourPhotosShowcaseProps> = ({
  photos,
  onUpdatePhoto,
  onOpenPhotoManager,
  onOpenLightbox,
}) => {
  const [activeTab, setActiveTab] = useState<'carousel' | 'polaroid' | 'editorial' | 'grid'>('carousel');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const currentPhoto = photos[carouselIndex] || photos[0];

  const handleHeartClick = (photo: PhotoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playHeartPop();
    const updated = {
      ...photo,
      heartCount: photo.heartCount + 1,
    };
    onUpdatePhoto(updated);
    triggerGoldenShower(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
  };

  const nextSlide = () => {
    soundManager.playSparkle();
    setCarouselIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    soundManager.playSparkle();
    setCarouselIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const filterStyle = (filterName?: string) => {
    switch (filterName) {
      case 'warmth':
        return 'sepia(20%) saturate(130%) contrast(105%)';
      case 'rosegold':
        return 'hue-rotate(-15deg) saturate(125%) contrast(108%) brightness(102%)';
      case 'cinematic':
        return 'contrast(115%) saturate(110%) brightness(98%)';
      case 'dreamy':
        return 'brightness(106%) saturate(115%) contrast(98%)';
      default:
        return 'none';
    }
  };

  return (
    <section id="photos" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-pink-400/30 text-rose-200 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>The Memory Vault</span>
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-200 mb-4">
          The 4 Chapters of Swetakshi
        </h2>

        <p className="text-sm sm:text-base text-rose-100/70 font-light leading-relaxed">
          Four extraordinary moments, four glimpses into your enchanting world. Each photograph tells a story of your grace, your warmth, and the beauty you effortlessly radiate.
        </p>

        {/* View mode switcher & photo manager bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
          <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => {
                soundManager.playSparkle();
                setActiveTab('carousel');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'carousel'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                  : 'text-rose-200 hover:text-white'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>3D Spotlight</span>
            </button>

            <button
              onClick={() => {
                soundManager.playSparkle();
                setActiveTab('polaroid');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'polaroid'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                  : 'text-rose-200 hover:text-white'
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Polaroid Wall</span>
            </button>

            <button
              onClick={() => {
                soundManager.playSparkle();
                setActiveTab('editorial');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'editorial'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                  : 'text-rose-200 hover:text-white'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Magazine View</span>
            </button>

            <button
              onClick={() => {
                soundManager.playSparkle();
                setActiveTab('grid');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                  : 'text-rose-200 hover:text-white'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Gallery Grid</span>
            </button>
          </div>

          <button
            onClick={onOpenPhotoManager}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Upload className="h-3.5 w-3.5 text-amber-300" />
            <span>Customize Her 4 Photos</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: 3D SPOTLIGHT CAROUSEL */}
      {activeTab === 'carousel' && (
        <div className="relative max-w-5xl mx-auto">
          {/* Main Card Container */}
          <div className="glass-panel-dark rounded-3xl p-6 sm:p-10 border border-pink-500/20 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Photo Area */}
              <div className="lg:col-span-6 relative group">
                {/* Glow ring */}
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 opacity-40 blur-lg group-hover:opacity-70 transition duration-500" />

                <div
                  className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black cursor-pointer"
                  onClick={() => onOpenLightbox(currentPhoto)}
                >
                  <img
                    src={currentPhoto.imageUrl}
                    alt={currentPhoto.title}
                    style={{ filter: filterStyle(currentPhoto.filter) }}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Fullscreen icon indicator */}
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-white/80 hover:text-white transition-colors">
                    <Maximize2 className="h-4 w-4" />
                  </div>

                  {/* Chapter badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-rose-950/80 backdrop-blur-md border border-rose-400/40 text-amber-200 text-xs font-semibold flex items-center gap-1.5">
                    <Crown className="h-3 w-3 text-amber-300" />
                    <span>{currentPhoto.chapter}</span>
                  </div>

                  {/* Bottom Tags */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                    <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      📍 {currentPhoto.locationTag}
                    </span>
                    <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      🗓️ {currentPhoto.dateTag}
                    </span>
                  </div>
                </div>

                {/* Heart React Floater */}
                <button
                  onClick={(e) => handleHeartClick(currentPhoto, e)}
                  className="absolute -bottom-4 right-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-600/50 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
                >
                  <Heart className="h-4 w-4 fill-white animate-pulse" />
                  <span>{currentPhoto.heartCount} Loves</span>
                </button>
              </div>

              {/* Photo Description & Poetic Note */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-pink-300">
                    {currentPhoto.chapter} • Special Birthday Tribute
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1">
                    {currentPhoto.title}
                  </h3>
                  <p className="text-sm font-handwriting text-pink-300 text-lg mt-0.5">
                    {currentPhoto.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-rose-100/80 leading-relaxed font-light">
                  {currentPhoto.description}
                </p>

                {/* Romantic Quote Card */}
                <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-950/40 to-purple-950/40 border border-pink-400/20 shadow-inner">
                  <Quote className="h-6 w-6 text-pink-400/40 absolute top-3 right-3" />
                  <p className="font-serif-luxury italic text-sm sm:text-base text-rose-200/95 leading-snug">
                    {currentPhoto.quote}
                  </p>
                  <div className="mt-2 text-right">
                    <span className="text-xs text-amber-300 font-medium">
                      — Dedicated to Swetakshi ✨
                    </span>
                  </div>
                </div>

                {/* Navigation controls */}
                <div className="flex items-center justify-between pt-4 border-t border-pink-500/15">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevSlide}
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <span className="text-xs text-rose-300/80 ml-2 font-medium">
                      Photo {carouselIndex + 1} of {photos.length}
                    </span>
                  </div>

                  {/* Thumbnail selectors */}
                  <div className="flex gap-2">
                    {photos.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          soundManager.playSparkle();
                          setCarouselIndex(idx);
                        }}
                        className={`h-9 w-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          carouselIndex === idx
                            ? 'border-pink-400 scale-110 shadow-md shadow-pink-500/50'
                            : 'border-white/20 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: POLAROID MEMORY WALL */}
      {activeTab === 'polaroid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pt-4">
          {photos.map((photo, index) => {
            const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-3'];
            const rotClass = rotations[index % rotations.length];
            return (
              <div
                key={photo.id}
                onClick={() => onOpenLightbox(photo)}
                className={`group relative bg-[#fdfbf7] text-slate-800 p-4 pb-6 rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-0 hover:z-20 cursor-pointer ${rotClass} border border-amber-100`}
              >
                {/* Vintage tape top center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-200/60 backdrop-blur-xs border border-amber-300/40 rotate-1 shadow-sm" />

                {/* Photo image frame */}
                <div className="aspect-square w-full rounded bg-slate-900 overflow-hidden relative mb-4">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    style={{ filter: filterStyle(photo.filter) }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-amber-200 font-semibold uppercase">
                    {photo.chapter}
                  </div>
                </div>

                {/* Handwritten Polaroids Title & Note */}
                <div className="space-y-1.5 text-center">
                  <h4 className="font-serif-luxury font-bold text-base text-slate-900 leading-tight">
                    {photo.title}
                  </h4>
                  <p className="font-caveat text-lg text-rose-600 leading-snug">
                    {photo.subtitle}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {photo.locationTag} • {photo.dateTag}
                  </p>
                </div>

                {/* Bottom interactive heart on Polaroid */}
                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-caveat text-sm text-slate-500">Always loved</span>
                  <button
                    onClick={(e) => handleHeartClick(photo, e)}
                    className="flex items-center gap-1 text-rose-500 hover:text-rose-600 font-bold"
                  >
                    <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                    <span>{photo.heartCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 3: EDITORIAL MAGAZINE LAYOUT */}
      {activeTab === 'editorial' && (
        <div className="space-y-8 max-w-5xl mx-auto">
          {photos.map((photo, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={photo.id}
                className="glass-panel-dark rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-xl overflow-hidden group"
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-12 gap-6 items-center ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`md:col-span-5 relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer ${
                      isEven ? 'md:order-1' : 'md:order-2'
                    }`}
                    onClick={() => onOpenLightbox(photo)}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      style={{ filter: filterStyle(photo.filter) }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="font-serif-luxury tracking-widest uppercase text-amber-300 text-[10px]">
                        EDITION {idx + 1}
                      </span>
                      <button
                        onClick={(e) => handleHeartClick(photo, e)}
                        className="flex items-center gap-1 bg-rose-600/80 px-2.5 py-1 rounded-full text-xs font-bold"
                      >
                        <Heart className="h-3 w-3 fill-white" />
                        <span>{photo.heartCount}</span>
                      </button>
                    </div>
                  </div>

                  <div
                    className={`md:col-span-7 space-y-4 ${
                      isEven ? 'md:order-2' : 'md:order-1'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-pink-300 uppercase tracking-widest">
                      <span>{photo.chapter}</span>
                      <span>•</span>
                      <span>{photo.dateTag}</span>
                    </div>

                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                      {photo.title}
                    </h3>

                    <p className="text-sm sm:text-base text-rose-100/80 leading-relaxed font-light">
                      {photo.description}
                    </p>

                    <div className="p-4 rounded-xl bg-pink-500/10 border-l-4 border-pink-400">
                      <p className="font-handwriting text-lg text-rose-200">
                        {photo.quote}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-rose-300/70">
                        📍 {photo.locationTag}
                      </span>
                      <button
                        onClick={() => onOpenLightbox(photo)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-pink-300 hover:text-pink-200 underline cursor-pointer"
                      >
                        <span>View High Res Details</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 4: ROMANTIC GALLERY GRID */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(photo)}
              className="glass-panel-dark rounded-2xl overflow-hidden border border-pink-500/20 shadow-xl group hover:border-pink-400/50 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  style={{ filter: filterStyle(photo.filter) }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-200 text-[11px] font-semibold">
                  {photo.chapter}
                </div>
                <button
                  onClick={(e) => handleHeartClick(photo, e)}
                  className="absolute bottom-2 right-2 p-2 rounded-full bg-rose-600/90 text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
                >
                  <Heart className="h-3.5 w-3.5 fill-white" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-serif-luxury font-bold text-base text-white group-hover:text-pink-300 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-rose-200/70 mt-1 line-clamp-2">
                    {photo.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-pink-500/15 flex items-center justify-between text-[11px] text-rose-300/80">
                  <span>{photo.dateTag}</span>
                  <span className="text-pink-400 font-semibold">{photo.heartCount} ❤️</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
