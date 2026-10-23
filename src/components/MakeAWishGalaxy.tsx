import React, { useState, useEffect, useRef } from 'react';
import { WishItem } from '../types';
import { INITIAL_WISHES } from '../data/initialData';
import { Send, Star, Moon, Heart, Wand2 } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { triggerGoldenShower } from '../utils/confetti';

export const MakeAWishGalaxy: React.FC = () => {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [wishText, setWishText] = useState('');
  const [wishCategory, setWishCategory] = useState<'love' | 'happiness' | 'dreams' | 'success'>('love');
  const [isShooting, setIsShooting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('swetakshi_wishes');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch {
        setWishes(INITIAL_WISHES);
      }
    } else {
      setWishes(INITIAL_WISHES);
    }
  }, []);

  // Cosmic canvas animation with shooting star
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    const height = (canvas.height = 320);

    const stars: { x: number; y: number; r: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    let shootingStar: { x: number; y: number; len: number; speed: number; opacity: number } | null = null;

    if (isShooting) {
      shootingStar = {
        x: Math.random() * (width / 2),
        y: Math.random() * 50,
        len: 120,
        speed: 16,
        opacity: 1,
      };
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw starry sky
      for (const s of stars) {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, s.alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw active shooting star
      if (shootingStar && shootingStar.opacity > 0) {
        ctx.save();
        const grad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - shootingStar.len,
          shootingStar.y - shootingStar.len * 0.5
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
        grad.addColorStop(0.3, `rgba(251, 191, 36, ${shootingStar.opacity * 0.8})`);
        grad.addColorStop(1, 'rgba(244, 63, 94, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - shootingStar.len,
          shootingStar.y - shootingStar.len * 0.5
        );
        ctx.stroke();
        ctx.restore();

        shootingStar.x += shootingStar.speed;
        shootingStar.y += shootingStar.speed * 0.5;
        shootingStar.opacity -= 0.015;

        if (shootingStar.opacity <= 0) {
          shootingStar = null;
          setIsShooting(false);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isShooting]);

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    soundManager.playShootingStar();
    setIsShooting(true);

    const colors = ['#f43f5e', '#fbbf24', '#ec4899', '#a855f7', '#38bdf8'];
    const newWish: WishItem = {
      id: 'w-' + Date.now(),
      author: authorName.trim() || 'With Deep Affection',
      text: wishText.trim(),
      category: wishCategory,
      timestamp: 'Just now',
      sparkleColor: colors[Math.floor(Math.random() * colors.length)],
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('swetakshi_wishes', JSON.stringify(updated));

    setWishText('');
    setAuthorName('');
    triggerGoldenShower();
  };

  return (
    <section id="wishes" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-pink-400/30 text-rose-200 text-xs font-semibold tracking-wider uppercase mb-3">
          <Moon className="h-3.5 w-3.5 text-amber-300" />
          <span>The Cosmic Wishing Well</span>
          <Star className="h-3.5 w-3.5 text-amber-300" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-200 mb-3">
          Make a Birthday Wish for Swetakshi ⭐
        </h2>

        <p className="text-sm sm:text-base text-rose-100/70 font-light">
          Send a glowing shooting star across the cosmic sky with your deepest prayer and birthday wish.
        </p>
      </div>

      {/* Interactive Galaxy Stage with Cosmic Canvas */}
      <div className="glass-panel-dark rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-2xl relative overflow-hidden mb-12">
        {/* Star Canvas */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#08020e] via-[#120520] to-[#1c082e] border border-pink-500/20 mb-8">
          <canvas ref={canvasRef} className="w-full h-48 sm:h-56 block" />
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs text-amber-200">
            <Wand2 className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
            <span>Galaxy of Wishes: {wishes.length} Stars Glowing</span>
          </div>

          <div className="absolute bottom-4 right-4 text-xs text-rose-200/70">
            🌌 Every wish lights up a real star
          </div>
        </div>

        {/* Wish Submission Form */}
        <form onSubmit={handleSubmitWish} className="space-y-4 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1">
                Your Name / Signature
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Someone who adores you ❤️"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1">
                Wish Type
              </label>
              <select
                value={wishCategory}
                onChange={(e) => setWishCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1d0a29] border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="love">💖 Unconditional Love</option>
                <option value="happiness">🌸 Endless Happiness</option>
                <option value="dreams">🌟 Big Dreams & Success</option>
                <option value="success">👑 Triumphs & Milestones</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-rose-200 mb-1">
              Your Secret Birthday Wish for Queen Swetakshi
            </label>
            <textarea
              required
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              rows={3}
              placeholder="Write a sweet prayer, romantic blessing, or birthday dream for Swetakshi..."
              className="w-full p-4 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-white/30 resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-center pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-400 hover:to-pink-400 shadow-xl shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Launch Wish to the Galaxy 🌠</span>
            </button>
          </div>
        </form>
      </div>

      {/* Wishes Display Constellation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {wishes.map((wish) => (
          <div
            key={wish.id}
            className="glass-panel-dark rounded-2xl p-5 border border-pink-500/20 shadow-lg flex flex-col justify-between hover:border-pink-400/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-rose-300/70">
                <span className="font-semibold text-pink-300 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                  {wish.author}
                </span>
                <span>{wish.timestamp}</span>
              </div>
              <p className="font-serif-luxury italic text-sm text-rose-100/90 leading-relaxed pt-1">
                &ldquo;{wish.text}&rdquo;
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-rose-300/60 font-medium">
              <span className="capitalize">Category: {wish.category}</span>
              <Heart className="h-3 w-3 text-pink-400 fill-pink-400" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
