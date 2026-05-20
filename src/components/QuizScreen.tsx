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
    'Bien joué Loulou ! 🎉',
    'Point faible… t’es trop forte',
    'T’es la boss',
    "Dinguerie que tu saches ça !",
    "Arrête, tu savais ça toi ?",
];

const wrongMessages = [
    'AH AH ! T’as raté !',
    "Vas-y, t’abuses là",
    'Tu perds des cadeaux là, tu sais ?',
    "Y a un lot de consolation si t’es trop nulle",
    "Des problèmes de mémoire peut-être ?",
];

const neutralMessages = [
    'Allez la boss, tu peux le faire',
    'Facile celle-là, non ?',
    "Même moi j’ai la bonne réponse",
    'Attention… celle-là peut faire mal',
    'Petit piège peut-être… ou pas mdr',
];

function playVoiceLine(type: 'correct' | 'wrong' | 'neutral', index: number) {
    const audio = new Audio(`/sounds/${type}Voice_${index + 1}.mp3`);
    audio.volume = 0.9;
    audio.play().catch(() => {});
}

function shuffleQuestion(question: Question): Question {
    const shuffled = question.options
        .map((option, index) => ({
            option,
            originalIndex: index,
        }))
        .sort(() => Math.random() - 0.5);

    return {
        ...question,
        options: shuffled.map((item) => item.option) as [
            string,
            string,
            string,
            string,
        ],
        correctIndex: shuffled.findIndex(
            (item) => item.originalIndex === question.correctIndex,
        ),
    };
}

export function QuizScreen({
                               question,
                               questionNumber,
                               totalQuestions,
                               score,
                               onAnswer,
                           }: QuizScreenProps) {
    const [shuffledQuestion, setShuffledQuestion] = useState<Question>(() =>
        shuffleQuestion(question),
    );
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [trollOffset, setTrollOffset] = useState({ x: 0, y: 0 });

    const [hostMessage, setHostMessage] = useState(
        neutralMessages[Math.floor(Math.random() * neutralMessages.length)],
    );

    const [hostMessageType, setHostMessageType] = useState<
        'neutral' | 'correct' | 'wrong'
    >('neutral');

    useEffect(() => {
        setShuffledQuestion(shuffleQuestion(question));
        setSelectedAnswer(null);
        setShowFeedback(false);
        setTrollOffset({ x: 0, y: 0 });

        const neutralIndex = Math.floor(Math.random() * neutralMessages.length);
        setHostMessage(neutralMessages[neutralIndex]);
        setHostMessageType('neutral');
        playVoiceLine('neutral', neutralIndex);
    }, [question.id, question]);

    const isAnswerCorrect = (index: number) => {
        const selectedOption = shuffledQuestion.options[index];

        if (shuffledQuestion.id === 20) {
            return selectedOption.toLowerCase().includes('jules');
        }

        return index === shuffledQuestion.correctIndex;
    };

    const handleAnswer = (index: number) => {
        if (showFeedback) return;

        const isCorrect = isAnswerCorrect(index);

        setSelectedAnswer(index);
        setShowFeedback(true);

        let nextMessage = '';

        if (isCorrect) {
            const correctIndex = Math.floor(Math.random() * correctMessages.length);
            nextMessage = correctMessages[correctIndex];

            setHostMessage(nextMessage);
            setHostMessageType('correct');
            playVoiceLine('correct', correctIndex);
        } else {
            const wrongIndex = Math.floor(Math.random() * wrongMessages.length);
            nextMessage = wrongMessages[wrongIndex];

            setHostMessage(nextMessage);
            setHostMessageType('wrong');
            playVoiceLine('wrong', wrongIndex);
        }

        const readingTime = Math.max(2200, nextMessage.length * 45);

        setTimeout(() => {
            onAnswer(isCorrect);
        }, readingTime);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
            <div className="max-w-4xl w-full space-y-4 -mt-64">
                <div className="flex justify-center -mb-20">
                    <img
                        src={`${import.meta.env.BASE_URL}images/the-louise-quizz-logo.png`}
                        alt="The Louise Quizz"
                        className="w-full max-w-3xl drop-shadow-2xl"
                    />
                </div>
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
                        key={shuffledQuestion.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                        className="bg-purple-800/50 backdrop-blur-sm border-2 border-purple-400 rounded-3xl p-8 shadow-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl text-white font-bold text-center mb-8">
                            {shuffledQuestion.question}
                        </h2>

                        <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            onMouseMove={(event) => {
                                const trollButton = document.querySelector<HTMLButtonElement>(
                                    '[data-troll-button="true"]',
                                );

                                if (!trollButton || showFeedback) return;

                                const rect = trollButton.getBoundingClientRect();
                                const buttonCenterX = rect.left + rect.width / 2;
                                const buttonCenterY = rect.top + rect.height / 2;
                                const dx = buttonCenterX - event.clientX;
                                const dy = buttonCenterY - event.clientY;
                                const distance = Math.sqrt(dx * dx + dy * dy);
                                const triggerDistance = 240;

                                if (distance > triggerDistance) return;

                                const force = (triggerDistance - distance) / triggerDistance;
                                const strength = 340;
                                const directionX = dx / distance || 1;
                                const directionY = dy / distance || 1;

                                setTrollOffset((prev) => ({
                                    x: prev.x + directionX * force * strength,
                                    y: prev.y + directionY * force * strength,
                                }));
                            }}
                        >
                            {shuffledQuestion.options.map((option, index) => {
                                const isSelected = selectedAnswer === index;
                                const isCorrectAnswer = isAnswerCorrect(index);
                                const showCorrect = showFeedback && isCorrectAnswer;
                                const showWrong =
                                    showFeedback && isSelected && !isCorrectAnswer;

                                const isTrollButton =
                                    shuffledQuestion.id === 20 &&
                                    !option.toLowerCase().includes('jules');

                                return (
                                    <motion.button
                                        data-troll-button={isTrollButton ? 'true' : undefined}
                                        key={`${shuffledQuestion.id}-${option}-${index}`}
                                        onClick={() => {
                                            if (isTrollButton) return;
                                            handleAnswer(index);
                                        }}
                                        disabled={showFeedback}
                                        className={`p-6 rounded-2xl font-bold text-lg ${
                                            showCorrect
                                                ? 'bg-green-500 text-white border-4 border-green-300 shadow-lg shadow-green-500/50'
                                                : showWrong
                                                    ? 'bg-red-500 text-white border-4 border-red-300 shadow-lg shadow-red-500/50'
                                                    : isTrollButton
                                                        ? 'bg-gradient-to-br from-gray-600 to-gray-900 text-white border-2 border-gray-300 hover:shadow-xl'
                                                        : 'bg-gradient-to-br from-pink-500 to-purple-600 text-white border-2 border-pink-300 hover:shadow-xl hover:shadow-pink-500/50'
                                        } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            x: isTrollButton
                                                ? trollOffset.x
                                                : showWrong
                                                    ? [-10, 10, -10, 10, 0]
                                                    : 0,
                                            scale: showCorrect ? [1, 1.08, 1] : 1,
                                        }}
                                        transition={{
                                            opacity: { duration: 0.3, delay: index * 0.08 },
                                            y: { duration: 0.3, delay: index * 0.08 },
                                            x: isTrollButton
                                                ? { type: 'spring', stiffness: 120, damping: 14 }
                                                : { duration: 0.25 },
                                            scale: { duration: 0.25 },
                                        }}
                                        whileHover={
                                            !showFeedback && !isTrollButton
                                                ? { scale: 1.05 }
                                                : undefined
                                        }
                                        whileTap={
                                            !showFeedback && !isTrollButton
                                                ? { scale: 0.95 }
                                                : undefined
                                        }
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