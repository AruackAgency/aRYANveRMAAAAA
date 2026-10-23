import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
  type: 'petal' | 'sparkle' | 'heart';
}

interface CursorSparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

export const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorSparkles = useRef<CursorSparkle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      '#fda4af', // light rose
      '#fb7185', // pink
      '#f43f5e', // deep rose
      '#fbbf24', // golden star
      '#fef08a', // light yellow
      '#e879f9', // soft purple
    ];

    const particleCount = Math.min(36, Math.floor(window.innerWidth / 35));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const pType: 'petal' | 'sparkle' | 'heart' =
        i % 3 === 0 ? 'petal' : i % 3 === 1 ? 'sparkle' : 'heart';
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: pType === 'petal' ? Math.random() * 9 + 6 : pType === 'heart' ? Math.random() * 8 + 6 : Math.random() * 4 + 2,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: pType,
      });
    }

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (Math.random() > 0.4) {
        cursorSparkles.current.push({
          x: clientX,
          y: clientY,
          size: Math.random() * 6 + 3,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
        if (cursorSparkles.current.length > 30) {
          cursorSparkles.current.shift();
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
      ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawPetal = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      // 4-pointed star
      const s = p.size;
      ctx.moveTo(0, -s * 1.8);
      ctx.quadraticCurveTo(0, 0, s * 1.8, 0);
      ctx.quadraticCurveTo(0, 0, 0, s * 1.8);
      ctx.quadraticCurveTo(0, 0, -s * 1.8, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s * 1.8);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw floating background particles
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.4;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === 'petal') {
          drawPetal(ctx, p);
        } else if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
        } else {
          drawSparkle(ctx, p);
        }
      }

      // Draw cursor sparkle trail
      for (let i = cursorSparkles.current.length - 1; i >= 0; i--) {
        const s = cursorSparkles.current[i];
        s.y -= 0.6;
        s.opacity -= 0.025;
        s.size *= 0.97;

        if (s.opacity <= 0) {
          cursorSparkles.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.opacity);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
};
