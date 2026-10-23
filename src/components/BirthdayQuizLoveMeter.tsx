import React, { useState } from 'react';
import { Sparkles, Heart, CheckCircle2, Award, HelpCircle } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { triggerBirthdayConfetti, triggerGoldenShower } from '../utils/confetti';

interface QuizQ {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const BirthdayQuizLoveMeter: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions: QuizQ[] = [
    {
      question: 'What makes Queen Swetakshi Singh truly one-of-a-kind in the whole universe?',
      options: [
        'Her captivating, heart-melting smile 🌸',
        'Her unmatched grace and golden kind heart 💖',
        'Her sweet laugh and magnetic personality ✨',
        'ALL OF THE ABOVE and a million more reasons! 👑',
      ],
      correctIndex: 3,
      explanation: 'Every single thing about Swetakshi is pure perfection and magic!',
    },
    {
      question: 'What is the cosmic forecast for Swetakshi on her birthday today?',
      options: [
        '100% chance of endless love, golden confetti & sweet surprises! 🎉',
        'Ordinary day (Impossible!) ❌',
        'Just another birthday ❌',
        'A normal Tuesday ❌',
      ],
      correctIndex: 0,
      explanation: 'Today is a grand festival of joy because Queen Swetakshi was born!',
    },
    {
      question: 'What happens the moment Swetakshi Singh walks into any room?',
      options: [
        'The lights dim ❌',
        'Everything becomes 100x brighter, warmer, and sweeter! ✨',
        'Nothing changes ❌',
        'Time speeds up ❌',
      ],
      correctIndex: 1,
      explanation: 'Her positive aura and charm brighten everyone’s day instantly.',
    },
    {
      question: 'How much love and happiness does Swetakshi deserve this year?',
      options: [
        'A normal amount ❌',
        'As much as a mountain ❌',
        'Infinite, boundless, and overflowing beyond the cosmos! 🌌💖',
        'Just a little bit ❌',
      ],
      correctIndex: 2,
      explanation: 'She deserves every ounce of joy and every fulfilled dream in existence!',
    },
  ];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const q = questions[currentQIndex];
    if (index === q.correctIndex) {
      soundManager.playSparkle();
      triggerGoldenShower();
      setScore((s) => s + 1);
    } else {
      soundManager.playSparkle();
    }
  };

  const handleNext = () => {
    soundManager.playSparkle();
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      triggerBirthdayConfetti();
      soundManager.playBirthdayFanfare();
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
    soundManager.playSparkle();
  };

  const currentQ = questions[currentQIndex];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-pink-400/30 text-rose-200 text-xs font-semibold tracking-wider uppercase mb-3">
          <HelpCircle className="h-3.5 w-3.5 text-amber-300" />
          <span>The Royal Birthday Quiz</span>
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-200 mb-3">
          How Well Do You Know Queen Swetakshi? 👑
        </h2>

        <p className="text-sm sm:text-base text-rose-100/70 font-light">
          A fun, heartwarming mini-quiz celebrating everything that makes Swetakshi so unforgettable.
        </p>
      </div>

      <div className="glass-panel-dark rounded-3xl p-6 sm:p-10 border border-pink-500/20 shadow-2xl relative overflow-hidden">
        {!showResult ? (
          <div>
            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-rose-300/80 mb-4 pb-3 border-b border-white/10">
              <span className="font-semibold uppercase tracking-wider text-amber-300">
                Question {currentQIndex + 1} of {questions.length}
              </span>
              <span className="flex items-center gap-1 font-bold">
                <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
                Score: {score}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
              {currentQ.question}
            </h3>

            {/* Option choices */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let btnStyle = 'bg-white/5 border-white/10 text-rose-100 hover:bg-white/10';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-500/25 border-rose-400 text-rose-200';
                  } else {
                    btnStyle = 'bg-white/5 border-white/5 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span className="text-sm sm:text-base">{opt}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next */}
            {isAnswered && (
              <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-400/30 mb-6 animate-fadeIn">
                <p className="text-xs sm:text-sm text-pink-200 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
                  <span>{currentQ.explanation}</span>
                </p>
              </div>
            )}

            {isAnswered && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-lg shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>{currentQIndex + 1 === questions.length ? 'See Final Score' : 'Next Question'}</span>
                  <Sparkles className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Results Stage */
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 text-white shadow-xl animate-bounce mb-2">
              <Award className="h-10 w-10" />
            </div>

            <h3 className="font-serif-luxury text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-rose-200">
              100% Certified Queen Swetakshi Expert! 👑
            </h3>

            <p className="font-handwriting text-2xl text-pink-300">
              Score: {score} / {questions.length} • Absolute Perfection!
            </p>

            <p className="text-sm text-rose-100/80 max-w-md mx-auto leading-relaxed">
              No quiz in the world could ever capture the full extent of your grace, charm, and wonderful heart. Happy Birthday, Swetakshi!
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleRestart}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-rose-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
