"use client";

import confetti from "canvas-confetti";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

import { confettiAtom } from "@/stores/confetti";

export const Confetti = () => {
  const [isPlaying, setIsPlaying] = useAtom(confettiAtom);

  const fireLeftConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0, y: 0.5 },
      angle: 60,
      startVelocity: 60,
      gravity: 0.8,
      colors: [
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
      ],
    });
  };

  const fireRightConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 1, y: 0.5 },
      angle: 120,
      startVelocity: 60,
      gravity: 0.8,
      colors: [
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
      ],
    });
  };

  const startConfetti = () => {
    setIsPlaying(true);

    fireLeftConfetti();

    setTimeout(() => {
      fireRightConfetti();
    }, 150);

    const leftInterval = setInterval(fireLeftConfetti, 1200);
    const rightInterval = setInterval(fireRightConfetti, 1200);

    setTimeout(() => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
      setIsPlaying(false);
    }, 1000);
  };

  useEffect(() => {
    if (isPlaying) {
      startConfetti();
    }
  }, [isPlaying, startConfetti]);

  return <div className="sr-only" />;
};