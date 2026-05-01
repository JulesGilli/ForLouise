import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { rewards } from '../data/rewards';
import { Trophy, Lock, CheckCircle, RotateCcw, Gift, Star } from 'lucide-react';

interface FinalScreenProps {
  score: number;
  onRestart: () => void;
}

export function FinalScreen({ score, onRestart }: FinalScreenProps) {
  const [displayedScore, setDisplayedScore] = useState(score);
  const [isBonusActive, setIsBonusActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Confetti celebration
    if (displayedScore === 20) {
      const duration = 5000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: {
            x: 0
          },
          colors: ['#ec4899', '#a855f7', '#fbbf24']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: {
            x: 1
          },
          colors: ['#ec4899', '#a855f7', '#fbbf24']
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [displayedScore === 20]);

  const handleBonusPoints = () => {
    setShowPopup(true);
    setTimeout(() => {
      setIsBonusActive(true);
      const interval = setInterval(() => {
        setDisplayedScore(prev => {
          if (prev < 20) return prev + 1;
          clearInterval(interval);
          return 20;
        });
      }, 200);
    }, 2000);
  };

  const percentage = Math.round(displayedScore / 20 * 100);
  const getMessage = () => {
    if (score === 20) return 'PARFAIT ! Tu es une championne absolue ! 👑';
    if (score >= 16) return 'Extraordinaire ! Quel talent ! 🌟';
    if (score >= 12) return 'Excellent ! Tu as assuré ! 🎉';
    if (score >= 8) return 'Très bien ! Belle performance ! 💪';
    return "Bravo d'avoir participé ! 🎊";
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            type: 'spring',
            duration: 1
          }}
          className="text-center space-y-4">
          
          <h1 className="text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 font-bold">
            QUIZ TERMINÉ !
          </h1>

          <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            transition={{
              delay: 0.3,
              type: 'spring'
            }}
            className="inline-block">
            
            <Trophy className="w-24 h-24 text-yellow-300 mx-auto" />
          </motion.div>
        </motion.div>

        {/* Score display */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.5
          }}
          className="bg-gradient-to-br from-purple-800 to-pink-800 border-4 border-yellow-400 rounded-3xl p-8 shadow-2xl text-center">
          
          <p className="text-2xl text-purple-200 font-semibold mb-4">
            Ton score final
          </p>
          <motion.div
            className="text-8xl md:text-9xl font-bold text-yellow-300"
            animate={displayedScore === 20 ? {
              scale: [1, 1.1, 1]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity
            }}>
            
            {displayedScore}/20
          </motion.div>
          <p className="text-3xl text-white font-bold mt-4">{percentage}%</p>
        </motion.div>

        {/* Host final message */}
        <motion.div
          initial={{
            opacity: 0,
            x: -50
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            delay: 0.7
          }}
          className="flex items-start gap-3 bg-purple-800/90 border-2 border-purple-400 rounded-2xl p-6 shadow-lg">
          
          <div className="text-5xl">🎙️</div>
          <div className="flex-1 text-left">
            <p className="text-white font-bold text-2xl mb-2">{getMessage()}</p>
            <p className="text-purple-200 text-lg">
              Joyeux anniversaire Louise ! J'espère que tu as adoré ce quiz show
              ! Profite bien de tous tes cadeaux ! 🎁💝
            </p>
          </div>
        </motion.div>

        {/* Rewards list */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.9
          }}
          className="space-y-4">
          
          <h2 className="text-3xl text-white font-bold text-center mb-6">
            Tes Récompenses 🎁
          </h2>

          <div className="grid gap-4">
            {rewards.map((reward, index) => {
              const isUnlocked = displayedScore >= reward.threshold;
              return (
                <motion.div
                  key={reward.threshold}
                  initial={{
                    opacity: 0,
                    x: -50
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: 1 + index * 0.1
                  }}
                  layout
                  className={`p-6 rounded-2xl border-2 flex items-center gap-4 transition-colors duration-500 ${isUnlocked ? 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-400 shadow-lg shadow-green-500/50' : 'bg-purple-900/50 border-purple-600 opacity-60'}`}>
                  
                  <div className="text-5xl">{reward.emoji}</div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {reward.title}
                    </h3>
                    <p className="text-purple-200">{reward.description}</p>
                  </div>

                  <div className="text-3xl">
                    {isUnlocked ?
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      <CheckCircle className="w-10 h-10 text-green-300" />
                    </motion.div> :

                    <Lock className="w-10 h-10 text-purple-400" />
                    }
                  </div>
                </motion.div>);

            })}
          </div>
        </motion.div>

        {/* Action button */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: 1.5
          }}
          className="text-center">
          
          {displayedScore < 20 && !showPopup ? (
            <button
              onClick={handleBonusPoints}
              className="px-12 py-6 text-2xl font-bold text-purple-900 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full shadow-2xl shadow-yellow-500/50 hover:shadow-yellow-500/80 transition-all inline-flex items-center gap-3 transform hover:scale-105 active:scale-95">
              <Gift className="w-8 h-8" />
              Récupérer les cadeaux
            </button>
          ) : (
            displayedScore === 20 && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onRestart}
                className="px-12 py-6 text-2xl font-bold text-purple-900 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/80 transition-all inline-flex items-center gap-3">
                <RotateCcw className="w-8 h-8" />
                Rejouer
              </motion.button>
            )
          )}
        </motion.div>
      </div>

      {/* Bonus Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              className="bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 p-1 rounded-3xl max-w-md w-full shadow-2xl">
              <div className="bg-purple-900 rounded-[22px] p-8 text-center space-y-6">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="inline-block"
                >
                  <Star className="w-20 h-20 text-yellow-300 fill-yellow-300" />
                </motion.div>
                
                <h3 className="text-3xl font-bold text-white leading-tight">
                  Point Bonus Spécial ! 🌟
                </h3>
                
                <p className="text-xl text-purple-100 italic">
                  "Parce que tu es la meilleure des sœurs et que c'est ton anniversaire..."
                </p>

                <div className="py-4">
                  {!isBonusActive ? (
                    <div className="flex justify-center gap-2">
                      <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce" />
                      <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-2xl font-bold text-yellow-300"
                    >
                      Ajout des points en cours...
                    </motion.div>
                  )}
                </div>

                {displayedScore === 20 && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setShowPopup(false)}
                    className="w-full py-4 bg-yellow-400 text-purple-900 font-bold rounded-xl text-xl hover:bg-yellow-300 transition-colors"
                  >
                    Génial ! ✨
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>);

}