import React, { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  color: string;
  duration: number;
  emoji: string;
}

interface FloatingHeartsOverlayProps {
  triggerCount: number;
}

export const FloatingHeartsOverlay: React.FC<FloatingHeartsOverlayProps> = ({ triggerCount }) => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    if (triggerCount === 0) return;

    const emojis = ['💖', '💕', '💗', '✨', '🌸', '👑', '🎂', '🥰'];
    const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24', '#e879f9'];

    const newHearts: FloatingHeart[] = [];
    const count = 6;

    for (let i = 0; i < count; i++) {
      newHearts.push({
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10, // 10% to 90%
        size: Math.random() * 20 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 2 + 2.5,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }

    setHearts((prev) => [...prev, ...newHearts]);

    const timer = setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 4500);

    return () => clearTimeout(timer);
  }, [triggerCount]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 select-none animate-float-up"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            animation: `floatUp ${heart.duration}s ease-out forwards`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.6) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-50vh) scale(1.2) rotate(15deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-110vh) scale(1) rotate(-15deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
