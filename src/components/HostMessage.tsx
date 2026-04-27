import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface HostMessageProps {
  message: string;
  type?: 'neutral' | 'correct' | 'wrong' | 'milestone';
}
export function HostMessage({ message, type = 'neutral' }: HostMessageProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [message]);
  useEffect(() => {
    if (currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + message[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, message]);
  const bgColor = {
    neutral: 'bg-purple-800/90',
    correct: 'bg-green-600/90',
    wrong: 'bg-red-600/90',
    milestone: 'bg-yellow-500/90'
  }[type];
  const borderColor = {
    neutral: 'border-purple-400',
    correct: 'border-green-400',
    wrong: 'border-red-400',
    milestone: 'border-yellow-400'
  }[type];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={message}
        initial={{
          opacity: 0,
          y: -20,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.9
        }}
        className="flex items-start gap-3">
        
        <motion.div
          className="text-5xl"
          animate={{
            rotate: [0, -10, 10, -10, 0]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3
          }}>
          
          🎙️
        </motion.div>

        <div
          className={`flex-1 ${bgColor} ${borderColor} border-2 rounded-2xl p-4 shadow-lg backdrop-blur-sm relative`}>
          
          <div className="absolute -left-2 top-4 w-4 h-4 bg-inherit border-l-2 border-b-2 border-inherit transform rotate-45" />
          <p className="text-white font-semibold text-lg">
            {displayedText}
            <motion.span
              animate={{
                opacity: [1, 0]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity
              }}
              className="inline-block ml-1">
              
              |
            </motion.span>
          </p>
        </div>
      </motion.div>
    </AnimatePresence>);

}