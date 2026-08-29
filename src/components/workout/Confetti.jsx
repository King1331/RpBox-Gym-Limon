import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

// Confeti liviano (≤20 ráfagas pequeñas, sin sombras pesadas).
export default function Confetti({ fire }) {
  const fired = useRef(false);

  useEffect(() => {
    if (!fire || fired.current) return;
    fired.current = true;

    const colors = ["#f3ff47", "#f55d3b", "#ffffff"];
    const end = Date.now() + 900;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
        scalar: 0.8,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
        scalar: 0.8,
        disableForReducedMotion: true,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };

    confetti({
      particleCount: 20,
      spread: 70,
      origin: { y: 0.5 },
      colors,
      scalar: 0.9,
      disableForReducedMotion: true,
    });
    frame();
  }, [fire]);

  return null;
}