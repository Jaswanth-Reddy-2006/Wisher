import confetti from 'canvas-confetti';

/**
 * Fires a dual confetti animation sequence: a massive center explosion
 * followed by a 3-second continuous side-cannon stream.
 */
export const fireConfetti = (primaryColor = '#d30f0f') => {
  // 1. Primary main burst
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.65 },
    colors: [primaryColor, '#111111', '#f5f2eb', '#ffb703', '#219ebc'],
  });

  // 2. Continuous side cannons for celebration feel
  const end = Date.now() + 2 * 1000; // 2 seconds duration

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: [primaryColor, '#111111'],
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: [primaryColor, '#111111'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};
