import React, { useEffect, useState } from 'react';
import { PhotoItem } from '../types';
import { X, ChevronLeft, ChevronRight, Heart, ZoomIn, ZoomOut, Download, Crown } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { triggerGoldenShower } from '../utils/confetti';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  onClose: () => void;
  onUpdatePhoto: (updated: PhotoItem) => void;
  onNavigate: (photo: PhotoItem) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  photos,
  onClose,
  onUpdatePhoto,
  onNavigate,
}) => {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!photo) return;
      const currentIndex = photos.findIndex((p) => p.id === photo.id);
      if (e.key === 'ArrowRight') {
        const next = photos[(currentIndex + 1) % photos.length];
        onNavigate(next);
        soundManager.playSparkle();
      }
      if (e.key === 'ArrowLeft') {
        const prev = photos[(currentIndex - 1 + photos.length) % photos.length];
        onNavigate(prev);
        soundManager.playSparkle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, photos, onClose, onNavigate]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handleNext = () => {
    soundManager.playSparkle();
    const next = photos[(currentIndex + 1) % photos.length];
    setZoom(1);
    onNavigate(next);
  };

  const handlePrev = () => {
    soundManager.playSparkle();
    const prev = photos[(currentIndex - 1 + photos.length) % photos.length];
    setZoom(1);
    onNavigate(prev);
  };

  const handleHeart = (e: React.MouseEvent) => {
    soundManager.playHeartPop();
    const updated = {
      ...photo,
      heartCount: photo.heartCount + 1,
    };
    onUpdatePhoto(updated);
    triggerGoldenShower(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6 select-none animate-fadeIn">
      {/* Top action bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-rose-950/80 border border-rose-400/40 text-amber-200 text-xs font-semibold flex items-center gap-1.5">
            <Crown className="h-3.5 w-3.5 text-amber-300" />
            <span>{photo.chapter}</span>
          </div>
          <span className="text-xs text-white/70 hidden sm:inline">
            {currentIndex + 1} of {photos.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
            title="Zoom In"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
            title="Zoom Out"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <a
            href={photo.imageUrl}
            download={`Swetakshi-Photo-${photo.id}.jpg`}
            title="Download Full Photo"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
          </a>
          <button
            onClick={onClose}
            title="Close (Esc)"
            className="p-2 rounded-full bg-rose-600/80 hover:bg-rose-500 text-white transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Main Lightbox Content */}
      <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center relative overflow-hidden">
        <div className="relative max-h-[65vh] overflow-hidden rounded-2xl shadow-2xl flex items-center justify-center">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s ease-out' }}
            className="max-h-[65vh] max-w-full object-contain rounded-2xl shadow-2xl"
          />
        </div>

        {/* Captions & Heart Bar */}
        <div className="mt-4 text-center max-w-xl px-4 space-y-1 text-white">
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200">
            {photo.title}
          </h3>
          <p className="font-handwriting text-lg text-pink-300">
            {photo.subtitle}
          </p>
          <p className="font-serif-luxury italic text-xs sm:text-sm text-rose-100/80 pt-1">
            {photo.quote}
          </p>

          <div className="pt-3 flex items-center justify-center gap-3">
            <button
              onClick={handleHeart}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-white animate-pulse" />
              <span>{photo.heartCount} Loves for Swetakshi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
