import confetti from 'canvas-confetti';

export const triggerBirthdayConfetti = () => {
  // Multiphase royal confetti burst
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#f43f5e', '#ec4899', '#f59e0b', '#fbbf24', '#e879f9', '#ffffff'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const triggerHeartConfetti = () => {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const skew = 1;

  (function frame() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) return;

    const ticks = Math.max(200, 500 * (timeLeft / duration));
    confetti({
      particleCount: 2,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        y: Math.random() * skew - 0.2,
      },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#f72585', '#ffd166'],
      shapes: ['circle'],
      gravity: 0.6,
      scalar: 1.2,
      drift: 0,
    });

    requestAnimationFrame(frame);
  })();
};

export const triggerGoldenShower = (originX = 0.5, originY = 0.5) => {
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { x: originX, y: originY },
    colors: ['#fbbf24', '#f59e0b', '#fef08a', '#e11d48', '#fda4af'],
    scalar: 1.1,
  });
};
