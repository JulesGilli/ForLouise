import React from 'react';
import { motion } from 'framer-motion';
import { Reward } from '../data/rewards';
import { Gift, Sparkles } from 'lucide-react';
interface MilestoneRevealProps {
  reward: Reward;
  onContinue: () => void;
}
export function MilestoneReveal({ reward, onContinue }: MilestoneRevealProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated sparkles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) =>
        <motion.div
          key={i}
          className="absolute text-yellow-300"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 30 + 20}px`
          }}
          initial={{
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}>
          
            ✨
          </motion.div>
        )}
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <motion.div
          initial={{
            scale: 0,
            rotate: -180
          }}
          animate={{
            scale: 1,
            rotate: 0
          }}
          transition={{
            type: 'spring',
            duration: 1
          }}
          className="flex justify-center">
          
          <div className="relative">
            <motion.div
              className="text-9xl"
              animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}>
              
              {reward.emoji}
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}>
              
              <Sparkles className="w-12 h-12 text-yellow-300" />
            </motion.div>
          </div>
        </motion.div>

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
          className="space-y-4">
          
          <h1 className="text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 font-bold">
            PALIER DÉBLOQUÉ !
          </h1>

          <div className="bg-purple-800/80 backdrop-blur-sm border-4 border-yellow-400 rounded-3xl p-8 shadow-2xl shadow-yellow-500/50">
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                delay: 0.8,
                type: 'spring'
              }}>
              
              <Gift className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl text-white font-bold mb-4">
              {reward.title}
            </h2>

            <p className="text-xl text-purple-200 font-semibold">
              {reward.description}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 1.2
          }}
          className="flex items-start gap-3 bg-green-600/90 border-2 border-green-400 rounded-2xl p-6 shadow-lg">
          
          <div className="text-4xl">🎙️</div>
          <p className="text-white font-bold text-xl flex-1 text-left">
            Félicitations Louise ! Tu es incroyable ! Continue comme ça ! 🎉
          </p>
        </motion.div>

        <motion.button
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
          onClick={onContinue}
          className="px-12 py-6 text-2xl font-bold text-purple-900 bg-gradient-to-r from-yellow-300 to-pink-400 rounded-full shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/80 transition-all"
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.95
          }}>
          
          Continuer le Quiz 🚀
        </motion.button>
      </div>
    </div>);

}