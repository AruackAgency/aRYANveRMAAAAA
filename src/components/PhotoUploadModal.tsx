import React, { useState } from 'react';
import { PhotoItem } from '../types';
import { X, Upload, Check, RotateCcw, ImagePlus, Sparkles } from 'lucide-react';
import { DEFAULT_PHOTOS } from '../data/initialData';
import { soundManager } from '../utils/soundEffects';
import { triggerBirthdayConfetti } from '../utils/confetti';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  onSavePhotos: (photos: PhotoItem[]) => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  photos,
  onSavePhotos,
}) => {
  const [editedPhotos, setEditedPhotos] = useState<PhotoItem[]>(photos);
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const currentPhoto = editedPhotos[activeSlot] || editedPhotos[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    soundManager.playSparkle();
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const updated = [...editedPhotos];
      updated[activeSlot] = {
        ...updated[activeSlot],
        imageUrl: dataUrl,
        userUploaded: true,
      };
      setEditedPhotos(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleFieldChange = (field: keyof PhotoItem, value: any) => {
    const updated = [...editedPhotos];
    updated[activeSlot] = {
      ...updated[activeSlot],
      [field]: value,
    };
    setEditedPhotos(updated);
  };

  const handleSaveAll = () => {
    onSavePhotos(editedPhotos);
    localStorage.setItem('swetakshi_4_photos', JSON.stringify(editedPhotos));
    soundManager.playRomanticChord();
    triggerBirthdayConfetti();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleResetDefaults = () => {
    setEditedPhotos(DEFAULT_PHOTOS);
    onSavePhotos(DEFAULT_PHOTOS);
    localStorage.removeItem('swetakshi_4_photos');
    soundManager.playSparkle();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl glass-panel-dark border border-pink-500/30 shadow-2xl p-6 sm:p-8 my-8 text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-pink-500/20 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-400/30 text-pink-300">
              <ImagePlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-xl text-white">
                Customize Her 4 Photos
              </h3>
              <p className="text-xs text-rose-200/70">
                Upload her real photos and add your personalized romantic memories
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 4 Photo Slot Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {editedPhotos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => {
                soundManager.playSparkle();
                setActiveSlot(index);
              }}
              className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                activeSlot === index
                  ? 'bg-rose-500/30 border-pink-400 shadow-md shadow-pink-500/30'
                  : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="h-12 w-12 rounded-lg overflow-hidden bg-black shrink-0 border border-white/20">
                <img src={photo.imageUrl} alt={photo.title} className="h-full w-full object-cover" />
              </div>
              <div className="hidden sm:block min-w-0 flex-1">
                <span className="text-[10px] font-bold text-amber-300 uppercase block truncate">
                  {photo.chapter}
                </span>
                <span className="text-xs font-semibold text-white truncate block">
                  {photo.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Slot Editor */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Photo Preview & File Picker */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-pink-400/30 bg-black shadow-xl group">
              <img
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                className="w-full h-full object-cover"
              />

              {/* Upload Overlay */}
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 cursor-pointer p-4 text-center">
                <Upload className="h-8 w-8 text-pink-300 animate-bounce" />
                <span className="text-xs font-bold text-white">
                  Click to Upload New Photo
                </span>
                <span className="text-[10px] text-rose-200/80">
                  Supports JPG, PNG, WEBP, Camera Roll
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Direct upload button */}
            <label className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 text-xs font-bold text-pink-200 cursor-pointer transition-all">
              <Upload className="h-4 w-4" />
              <span>Choose Photo from Device</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Form Inputs for this photo */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1">
                Chapter / Memory Title
              </label>
              <input
                type="text"
                value={currentPhoto.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1">
                Sweet Subtitle / Compliment
              </label>
              <input
                type="text"
                value={currentPhoto.subtitle}
                onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1">
                Why this photo is so special to you
              </label>
              <textarea
                value={currentPhoto.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                rows={3}
                className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-rose-200 mb-1">
                  Location / Atmosphere Tag
                </label>
                <input
                  type="text"
                  value={currentPhoto.locationTag}
                  onChange={(e) => handleFieldChange('locationTag', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:ring-2 focus:ring-pink-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 mb-1">
                  Date / Memory Tag
                </label>
                <input
                  type="text"
                  value={currentPhoto.dateTag}
                  onChange={(e) => handleFieldChange('dateTag', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:ring-2 focus:ring-pink-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1">
                Dedicated Romantic Quote
              </label>
              <input
                type="text"
                value={currentPhoto.quote}
                onChange={(e) => handleFieldChange('quote', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="mt-8 pt-4 border-t border-pink-500/20 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset to Original Photos</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-rose-200 hover:bg-white/10 transition-all cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-pink-500 shadow-lg shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" />
                  <span>Saved! ✨</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Save All 4 Photos</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
