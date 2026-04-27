import { useRef, useCallback } from 'react';

export function useGameSounds() {
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const crowd = useRef<HTMLAudioElement | null>(null);

  const playSound = (src: string, volume = 1) => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => {});
  };

  const startAmbience = useCallback(() => {
    if (!bgMusic.current) {
      bgMusic.current = new Audio('/sounds/background.mp3');
      bgMusic.current.loop = true;
      bgMusic.current.volume = 0.25;
    }

    if (!crowd.current) {
      crowd.current = new Audio('/sounds/crowd.mp3');
      crowd.current.loop = true;
      crowd.current.volume = 0.12;
    }

    bgMusic.current.play().catch(() => {});
    crowd.current.play().catch(() => {});
  }, []);

  const stopAmbience = useCallback(() => {
    bgMusic.current?.pause();
    crowd.current?.pause();
  }, []);

  const playCorrect = useCallback(() => {
    playSound('/sounds/correct.mp3', 0.8);
    playSound('/sounds/crowd_correct.mp3', 0.45);
  }, []);

  const playWrong = useCallback(() => {
    playSound('/sounds/wrong.mp3', 0.8);
    playSound('/sounds/crowd_wrong.mp3', 0.45);
  }, []);

  const playMilestone = useCallback(() => {
    playSound('/sounds/milestone.mp3', 1);
  }, []);

  const playClick = useCallback(() => {
    playSound('/sounds/click.mp3', 0.5);
  }, []);

  const playHost = useCallback((type: 'intro' | 'correct' | 'wrong') => {
    const hostSounds = {
      intro: '/sounds/host-intro.mp3',
      correct: '/sounds/host-correct.mp3',
      wrong: '/sounds/host-wrong.mp3',
    };

    playSound(hostSounds[type], 0.9);
  }, []);

  return {
    startAmbience,
    stopAmbience,
    playCorrect,
    playWrong,
    playMilestone,
    playClick,
    playHost,
  };
}