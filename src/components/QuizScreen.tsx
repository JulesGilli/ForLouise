import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../data/questions';
import { HostMessage } from './HostMessage';
import { ProgressBar } from './ProgressBar';
import { Trophy } from 'lucide-react';
interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  onAnswer: (isCorrect: boolean) => void;
}
const correctMessages = [
'Bien joué Louise ! 🎉',
'Excellent ! Tu es au top ! 🌟',
'Parfait ! Continue comme ça ! 💪',
"Bravo ! C'est la bonne réponse ! 🎊",
'Génial ! Tu assures ! 🔥'];

const wrongMessages = [
'Oups, pas cette fois ! 😏',
'Presque ! La prochaine sera la bonne ! 💫',
'Dommage ! Mais tu peux te rattraper ! 🎯',
"Raté ! Mais ne t'inquiète pas ! 💪",
"Ce n'est pas grave, continue ! 🌈"];

const neutralMessages = [
'Alors Louise, quelle est ta réponse ? 🤔',
'Réfléchis bien... Tu peux le faire ! 💭',
'Prends ton temps pour répondre ! ⏰',
'Quelle sera ta réponse ? 🎯',
'À toi de jouer maintenant ! 🎲'];

export function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
  score,
  onAnswer
}: QuizScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hostMessage, setHostMessage] = useState(
    neutralMessages[Math.floor(Math.random() * neutralMessages.length)]
  );
  const [hostMessageType, setHostMessageType] = useState<
    'neutral' | 'correct' | 'wrong'>(
    'neutral');
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setHostMessage(
      neutralMessages[Math.floor(Math.random() * neutralMessages.length)]
    );
    setHostMessageType('neutral');
  }, [question.id]);
  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    const isCorrect = index === question.correctIndex;
    if (isCorrect) {
      setHostMessage(
        correctMessages[Math.floor(Math.random() * correctMessages.length)]
      );
      setHostMessageType('correct');
    } else {
      setHostMessage(
        `${wrongMessages[Math.floor(Math.random() * wrongMessages.length)]} La bonne réponse était : ${question.options[question.correctIndex]}`
      );
      setHostMessageType('wrong');
    }
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1200);
  };
  return (
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-6">
          <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 px-6 py-3 rounded-full font-bold text-xl shadow-lg shadow-yellow-500/50 flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              Score: {score}/20
            </div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
          >
            <ProgressBar
                currentQuestion={questionNumber}
                totalQuestions={totalQuestions}
                score={score}
            />
          </motion.div>

          <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
          >
            <HostMessage message={hostMessage} type={hostMessageType} />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-purple-800/50 backdrop-blur-sm border-2 border-purple-400 rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl text-white font-bold text-center mb-8">
                {question.question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = question.correctIndex === index;
                  const showCorrect = showFeedback && isCorrect;
                  const showWrong = showFeedback && isSelected && !isCorrect;

                  return (
                      <motion.button
                          key={`${question.id}-${index}`}
                          onClick={() => handleAnswer(index)}
                          disabled={showFeedback}
                          className={`p-6 rounded-2xl font-bold text-lg ${
                              showCorrect
                                  ? 'bg-green-500 text-white border-4 border-green-300 shadow-lg shadow-green-500/50'
                                  : showWrong
                                      ? 'bg-red-500 text-white border-4 border-red-300 shadow-lg shadow-red-500/50'
                                      : 'bg-gradient-to-br from-pink-500 to-purple-600 text-white border-2 border-pink-300 hover:shadow-xl hover:shadow-pink-500/50'
                          } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            x: showWrong ? [-10, 10, -10, 10, 0] : 0,
                            scale: showCorrect ? [1, 1.08, 1] : 1,
                          }}
                          transition={{
                            opacity: { duration: 0.3, delay: index * 0.08 },
                            y: { duration: 0.3, delay: index * 0.08 },
                            x: { duration: 0.25 },
                            scale: { duration: 0.25 },
                          }}
                          whileHover={!showFeedback ? { scale: 1.05 } : undefined}
                          whileTap={!showFeedback ? { scale: 0.95 } : undefined}
                      >
                        {option}
                      </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
  );

}