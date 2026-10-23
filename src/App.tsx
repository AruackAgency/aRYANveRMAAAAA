import { useState, useEffect } from 'react';
import { PhotoItem } from './types';
import { DEFAULT_PHOTOS } from './data/initialData';
import { BackgroundParticles } from './components/BackgroundParticles';
import { CurtainSurprise } from './components/CurtainSurprise';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FourPhotosShowcase } from './components/FourPhotosShowcase';
import { VirtualCakeCandles } from './components/VirtualCakeCandles';
import { WaxSealedLetter } from './components/WaxSealedLetter';
import { ReasonsDeck } from './components/ReasonsDeck';
import { MakeAWishGalaxy } from './components/MakeAWishGalaxy';
import { ComplimentWheel } from './components/ComplimentWheel';
import { BirthdayQuizLoveMeter } from './components/BirthdayQuizLoveMeter';
import { KeepsakeCardGenerator } from './components/KeepsakeCardGenerator';
import { Footer } from './components/Footer';
import { PhotoLightbox } from './components/PhotoLightbox';
import { PhotoUploadModal } from './components/PhotoUploadModal';
import { FloatingHeartsOverlay } from './components/FloatingHeartsOverlay';
import { soundManager } from './utils/soundEffects';
import { triggerHeartConfetti } from './utils/confetti';

export function App() {
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoItem | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [heartsCount, setHeartsCount] = useState(520);
  const [heartTrigger, setHeartTrigger] = useState(0);

  // Load custom photos & hearts count from localStorage
  useEffect(() => {
    const savedPhotos = localStorage.getItem('swetakshi_4_photos');
    if (savedPhotos) {
      try {
        setPhotos(JSON.parse(savedPhotos));
      } catch (e) {
        console.error('Failed to parse saved photos', e);
      }
    }

    const savedHearts = localStorage.getItem('swetakshi_hearts_count');
    if (savedHearts) {
      setHeartsCount(parseInt(savedHearts, 10));
    }
  }, []);

  const handleUpdatePhoto = (updated: PhotoItem) => {
    const updatedList = photos.map((p) => (p.id === updated.id ? updated : p));
    setPhotos(updatedList);
    localStorage.setItem('swetakshi_4_photos', JSON.stringify(updatedList));
    if (lightboxPhoto && lightboxPhoto.id === updated.id) {
      setLightboxPhoto(updated);
    }
  };

  const handleSaveAllPhotos = (newPhotos: PhotoItem[]) => {
    setPhotos(newPhotos);
  };

  const handleSendHearts = () => {
    soundManager.playHeartPop();
    const nextCount = heartsCount + 1;
    setHeartsCount(nextCount);
    setHeartTrigger((prev) => prev + 1);
    localStorage.setItem('swetakshi_hearts_count', nextCount.toString());
    triggerHeartConfetti();
  };

  return (
    <div className="relative min-h-screen bg-[#0d0314] text-rose-50 overflow-x-hidden selection:bg-pink-500 selection:text-white font-sans-clean">
      {/* Dynamic Canvas Background Particles */}
      <BackgroundParticles />

      {/* Floating Hearts Reaction Overlay */}
      <FloatingHeartsOverlay triggerCount={heartTrigger} />

      {/* Initial Surprise Reveal Unboxing Curtain */}
      {!isSurpriseOpen && (
        <CurtainSurprise onOpen={() => setIsSurpriseOpen(true)} />
      )}

      {/* Main Website Content */}
      <div
        className={`transition-opacity duration-1000 ${
          isSurpriseOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Floating Top Navbar */}
        <Navbar
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
          onSendHearts={handleSendHearts}
          heartsCount={heartsCount}
        />

        <main className="relative z-10 space-y-8">
          {/* Hero Section */}
          <HeroSection
            onOpenPhotoManager={() => setIsPhotoModalOpen(true)}
          />

          {/* 4 Photos Memory Vault Showcase */}
          <FourPhotosShowcase
            photos={photos}
            onUpdatePhoto={handleUpdatePhoto}
            onOpenPhotoManager={() => setIsPhotoModalOpen(true)}
            onOpenLightbox={(photo) => setLightboxPhoto(photo)}
          />

          {/* Virtual Birthday Cake & Blowable Candle Ceremony */}
          <VirtualCakeCandles />

          {/* Animated Wax-Sealed Birthday Love Letter */}
          <WaxSealedLetter />

          {/* 24 Reasons Why Swetakshi Is One in a Billion */}
          <ReasonsDeck />

          {/* Cosmic Make-a-Wish Galaxy */}
          <MakeAWishGalaxy />

          {/* Compliment Generator & Birthday Fortune Cookie */}
          <ComplimentWheel />

          {/* Birthday Quiz & Radiance Meter */}
          <BirthdayQuizLoveMeter />

          {/* Keepsake Card & Poster Generator with Download */}
          <KeepsakeCardGenerator photos={photos} />
        </main>

        {/* Heartfelt Footer */}
        <Footer
          onSendHearts={handleSendHearts}
          heartsCount={heartsCount}
        />
      </div>

      {/* Fullscreen HD Lightbox Modal */}
      {lightboxPhoto && (
        <PhotoLightbox
          photo={lightboxPhoto}
          photos={photos}
          onClose={() => setLightboxPhoto(null)}
          onUpdatePhoto={handleUpdatePhoto}
          onNavigate={(nextPhoto) => setLightboxPhoto(nextPhoto)}
        />
      )}

      {/* 4 Photos Upload & Customizer Modal */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        photos={photos}
        onSavePhotos={handleSaveAllPhotos}
      />
    </div>
  );
}

export default App;
