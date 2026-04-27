import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingScreen } from './components/LandingScreen';
import { QuizScreen } from './components/QuizScreen';
import { MilestoneReveal } from './components/MilestoneReveal';
import { FinalScreen } from './components/FinalScreen';
import { questions } from './data/questions';
import { rewards } from './data/rewards';
import { useGameSounds } from './hooks/useGameSounds';
type GameState = 'landing' | 'quiz' | 'milestone' | 'final';
export function App() {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [currentMilestone, setCurrentMilestone] = useState<
    (typeof rewards)[0] | null>(
    null);
  const { playCorrect, playWrong, playMilestone, playClick } = useGameSounds();
  const handleStart = () => {
    playClick();
    setGameState('quiz');
    setCurrentQuestionIndex(0);
    setScore(0);
  };
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      playCorrect();
      const newScore = score + 1;
      setScore(newScore);
      // Check if milestone reached
      const milestone = rewards.find((r) => r.threshold === newScore);
      if (milestone) {
        playMilestone();
        setCurrentMilestone(milestone);
        if (currentQuestionIndex < questions.length - 1) {
          setGameState('milestone');
        } else {
          setGameState('final');
        }
        return;
      }
    } else {
      playWrong();
    }
    // Move to next question or final screen
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameState('final');
    }
  };
  const handleContinueFromMilestone = () => {
    playClick();
    setCurrentMilestone(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setGameState('quiz');
    } else {
      setGameState('final');
    }
  };
  const handleRestart = () => {
    playClick();
    setGameState('landing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentMilestone(null);
  };
  const handleToggleMusic = () => {
    playClick();
    setMusicEnabled((prev) => !prev);
  };
  return (
    <div className="w-full min-h-screen">
      <AnimatePresence mode="wait">
        {gameState === 'landing' &&
        <motion.div
          key="landing"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.5
          }}>
          
            <LandingScreen
            onStart={handleStart}
            musicEnabled={musicEnabled}
            onToggleMusic={handleToggleMusic} />
          
          </motion.div>
        }

        {gameState === 'quiz' &&
        <motion.div
          key="quiz"
          initial={{
            opacity: 0,
            x: 100
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -100
          }}
          transition={{
            duration: 0.5
          }}>
          
            <QuizScreen
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            score={score}
            onAnswer={handleAnswer} />
          
          </motion.div>
        }

        {gameState === 'milestone' && currentMilestone &&
        <motion.div
          key="milestone"
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 0.8
          }}
          transition={{
            duration: 0.5
          }}>
          
            <MilestoneReveal
            reward={currentMilestone}
            onContinue={handleContinueFromMilestone} />
          
          </motion.div>
        }

        {gameState === 'final' &&
        <motion.div
          key="final"
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 0.8
          }}
          transition={{
            duration: 0.5
          }}>
          
            <FinalScreen score={score} onRestart={handleRestart} />
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}