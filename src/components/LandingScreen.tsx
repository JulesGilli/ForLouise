import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
interface LandingScreenProps {
  onStart: () => void;
  musicEnabled: boolean;
  onToggleMusic: () => void;
}
export function LandingScreen({
  onStart,
  musicEnabled,
  onToggleMusic
}: LandingScreenProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) =>
        <motion.div
          key={i}
          className="absolute text-yellow-300 opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
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
            opacity: 0,
            y: -50
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8
          }}
          className="space-y-4">
          
          <motion.h1
            className="text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 drop-shadow-2xl"
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}>
            
            Joyeux Anniversaire
          </motion.h1>

          <motion.h2
            className="text-7xl md:text-9xl text-white drop-shadow-2xl"
            animate={{
              textShadow: [
              '0 0 20px rgba(236, 72, 153, 0.5)',
              '0 0 40px rgba(236, 72, 153, 0.8)',
              '0 0 20px rgba(236, 72, 153, 0.5)']

            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}>
            
            Louise 🎉
          </motion.h2>
        </motion.div>

        <motion.p
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 0.5,
            duration: 0.8
          }}
          className="text-xl md:text-2xl text-purple-200 font-semibold">
          
          Prête pour un quiz show extraordinaire ? 🎊
          <br />
          20 questions, 5 cadeaux à débloquer !
        </motion.p>

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
            delay: 1,
            duration: 0.5
          }}
          className="flex flex-col items-center gap-4">
          
          <motion.button
            onClick={onStart}
            className="px-12 py-6 text-2xl md:text-3xl font-bold text-purple-900 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 rounded-full shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/80 transition-all"
            whileHover={{
              scale: 1.1
            }}
            whileTap={{
              scale: 0.95
            }}
            animate={{
              boxShadow: [
              '0 20px 60px rgba(236, 72, 153, 0.5)',
              '0 20px 80px rgba(236, 72, 153, 0.8)',
              '0 20px 60px rgba(236, 72, 153, 0.5)']

            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}>
            
            <span className="flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              Commencer le Jeu
              <Sparkles className="w-8 h-8" />
            </span>
          </motion.button>

          <motion.button
            onClick={onToggleMusic}
            className="px-6 py-3 text-lg font-semibold text-purple-200 bg-purple-800/50 backdrop-blur-sm rounded-full border-2 border-purple-400 hover:bg-purple-700/50 transition-all flex items-center gap-2"
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}>
            
            {musicEnabled ?
            <Volume2 className="w-5 h-5" /> :

            <VolumeX className="w-5 h-5" />
            }
            {musicEnabled ? 'Musique activée' : 'Musique désactivée'}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 1.5,
            duration: 0.8
          }}
          className="text-purple-300 text-sm">
          
          <p>Présenté par ton animateur virtuel préféré 🎙️</p>
        </motion.div>
      </div>
    </div>);

}