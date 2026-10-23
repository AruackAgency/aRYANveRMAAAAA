import React, { useState, useEffect } from 'react';
import { Crown, Volume2, VolumeX, Sparkles, ImagePlus, Menu, X, Heart } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { triggerGoldenShower } from '../utils/confetti';

interface NavbarProps {
  onOpenPhotoModal: () => void;
  onSendHearts: () => void;
  heartsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPhotoModal,
  onSendHearts,
  heartsCount,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundManager.setMuted(nextMute);
    if (!nextMute) {
      soundManager.playSparkle();
    }
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      soundManager.stopBackgroundMelody();
      setIsPlayingMusic(false);
    } else {
      soundManager.startBackgroundMelody();
      setIsPlayingMusic(true);
      soundManager.playRomanticChord();
    }
  };

  const navLinks = [
    { label: '4 Photos', href: '#photos' },
    { label: 'Blow Candles', href: '#cake' },
    { label: 'Love Letter', href: '#letter' },
    { label: 'Why You', href: '#reasons' },
    { label: 'Wish Galaxy', href: '#wishes' },
    { label: 'Card Maker', href: '#card-maker' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-2 bg-[#14081c]/85 backdrop-blur-xl border-b border-pink-500/20 shadow-lg shadow-rose-950/40'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            triggerGoldenShower(0.1, 0.1);
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-[2px] shadow-md shadow-rose-500/30 group-hover:rotate-12 transition-transform">
            <div className="h-full w-full rounded-full bg-[#180924] flex items-center justify-center">
              <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-amber-300 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="font-serif-luxury font-bold text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200">
              Swetakshi Singh
            </span>
            <span className="block text-[10px] text-pink-300/70 tracking-widest uppercase font-medium">
              Birthday Edition ✨
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => soundManager.playSparkle()}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-rose-100/90 hover:text-white hover:bg-rose-500/20 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Photo Manager / Upload Button */}
          <button
            onClick={() => {
              soundManager.playRomanticChord();
              onOpenPhotoModal();
            }}
            title="Upload / Change Her Photos"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-200 bg-rose-500/15 hover:bg-rose-500/30 border border-rose-400/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ImagePlus className="h-3.5 w-3.5 text-pink-300" />
            <span>Manage 4 Photos</span>
          </button>

          {/* Heart react count button */}
          <button
            onClick={onSendHearts}
            title="Send Love Reaction"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 shadow-md shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Heart className="h-3.5 w-3.5 fill-white text-white animate-pulse" />
            <span>{heartsCount}</span>
          </button>

          {/* BGM Toggle with visualizer bars */}
          <button
            onClick={toggleMusic}
            title={isPlayingMusic ? 'Pause Romantic Melody' : 'Play Romantic Melody'}
            className="relative flex items-center justify-center h-9 w-9 rounded-full bg-white/10 border border-white/15 text-rose-200 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            {isPlayingMusic ? (
              <div className="flex items-end gap-[2px] h-3.5">
                <span className="w-[3px] bg-pink-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3.5" />
                <span className="w-[3px] bg-amber-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2.5" />
                <span className="w-[3px] bg-rose-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-4" />
              </div>
            ) : (
              <Sparkles className="h-4 w-4 text-pink-300" />
            )}
          </button>

          {/* Mute Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 border border-white/15 text-rose-200 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-rose-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-pink-300" />
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-full bg-white/10 border border-white/15 text-rose-200 hover:text-white transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#180924]/95 border-b border-pink-500/20 backdrop-blur-2xl px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                soundManager.playSparkle();
                setMobileMenuOpen(false);
              }}
              className="block px-4 py-2 rounded-xl text-sm font-medium text-rose-100 hover:bg-rose-500/20"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              soundManager.playRomanticChord();
              setMobileMenuOpen(false);
              onOpenPhotoModal();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-200 bg-rose-500/20 border border-rose-400/30"
          >
            <ImagePlus className="h-4 w-4 text-pink-300" />
            <span>Manage Her 4 Photos</span>
          </button>
        </div>
      )}
    </header>
  );
};
