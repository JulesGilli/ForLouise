import React from 'react';
import { motion } from 'framer-motion';
import { rewards } from '../data/rewards';
interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}
export function ProgressBar({
  currentQuestion,
  totalQuestions,
  score
}: ProgressBarProps) {
  const progress = currentQuestion / totalQuestions * 100;
  const nextReward = rewards.find((r) => r.threshold > score);
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-purple-200 font-semibold">
          Question {currentQuestion}/{totalQuestions}
        </span>
        {nextReward &&
        <span className="text-yellow-300 font-semibold flex items-center gap-1">
            <span>{nextReward.emoji}</span>
            <span>Prochain palier: {nextReward.threshold} pts</span>
          </span>
        }
      </div>

        <div className="relative h-10 overflow-visible">
            <div className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 bg-purple-900/50 rounded-full backdrop-blur-sm">
                <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                        duration: 0.5,
                        ease: 'easeOut',
                    }}
                />
            </div>

            {rewards.map((reward) => {
                const position = (reward.threshold / totalQuestions) * 100;
                const isUnlocked = score >= reward.threshold;

                return (
                    <div
                        key={reward.threshold}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                        style={{ left: `${position}%` }}
                    >
                        <motion.div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm shadow-lg ${
                                isUnlocked
                                    ? 'bg-yellow-400 border-yellow-300 text-purple-900 shadow-yellow-400/60'
                                    : 'bg-purple-800 border-purple-600 text-purple-300 shadow-purple-900/60'
                            }`}
                            animate={isUnlocked ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            {reward.emoji}
                        </motion.div>
                    </div>
                );
            })}
        </div>
    </div>);

}