import React, { useState } from 'react';
import { HelpCircle, Check, Sparkles, RefreshCw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "When a disagreement breaks out between Mandip and Prachi, what is the inevitable outcome?",
    options: [
      "Prachi wins because Mandip naturally concedes",
      "They order food and forget why they were arguing",
      "They burst out laughing mid-sentence",
      "All of the above—pure sibling harmony!",
    ],
    correctIndex: 3,
    explanation: "No matter how serious the debate started, brother-sister love always takes over within minutes!",
  },
  {
    id: 2,
    question: "What is Mandip's official honorary job description in Prachi's life?",
    options: [
      "Unpaid Tech Support & Wi-Fi Whisperer",
      "Chief Guardian & Unconditional Cheerleader",
      "Midnight Snack & Dessert Delivery Chauffeur",
      "Every single one of these roles, proudly!",
    ],
    correctIndex: 3,
    explanation: "Being Prachi's brother means wearing every hat with love and dedication.",
  },
  {
    id: 3,
    question: "If life throws an unexpected hurdle at Prachi, what is Mandip's instant reaction?",
    options: [
      "Step in as backup before she even has to ask",
      "Listen, strategize, and help her conquer it",
      "Remind her that she is 10x stronger than she realizes",
      "All three—backing her up with 100% loyalty",
    ],
    correctIndex: 3,
    explanation: "An elder brother's loyalty never sleeps when his sister needs him.",
  },
  {
    id: 4,
    question: "What is the unbreakable law of the Mandip & Prachi bond?",
    options: [
      "Distance, years, or busy schedules cannot diminish it",
      "There is always room for another inside joke",
      "Siblings are lifetime anchors to home and heart",
      "The bond remains solid and eternal forever",
    ],
    correctIndex: 3,
    explanation: "Brothers and sisters carry a piece of each other's childhood and future forever.",
  },
];

export const BrotherSisterQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: number, optionIdx: number) => {
    soundManager.playChime(550 + optionIdx * 50, 0.3);
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleFinish = () => {
    setShowResults(true);
    soundManager.playCelebrationChord();
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#f43f5e', '#38bdf8'],
    });
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const allAnswered = QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <section id="quiz" className="py-16 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Sibling Connection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-white">
            The Mandip &amp; Prachi <span className="gold-gradient-text">Bond Quiz</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            A playful test of our sibling chemistry, inside jokes, and unspoken loyalty
          </p>
        </div>

        {/* Quiz Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/25 shadow-2xl">
          {showResults ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-500/10">
                <Trophy className="w-8 h-8" />
              </div>
              <span className="text-xs font-display tracking-widest text-amber-400 uppercase font-semibold">
                Perfect Sibling Score • 100% Affinity
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-white mt-1 mb-4">
                The Gold Standard of Brother &amp; Sister Love
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-8">
                Mandip and Prachi are not just siblings by blood—they are lifelong confidants, partners in crime, and each other's greatest supporter.
              </p>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 mx-auto cursor-pointer transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Play Trivia Again</span>
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {QUESTIONS.map((q, idx) => (
                <div key={q.id} className="pb-6 border-b border-slate-800/80 last:border-b-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-bold font-mono flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-editorial font-semibold text-white">
                      {q.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelect(q.id, optIdx)}
                          className={`p-3.5 rounded-xl text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                            isChosen
                              ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                              : 'bg-slate-950/70 hover:bg-slate-900 text-slate-300 border border-slate-800'
                          }`}
                        >
                          <span>{opt}</span>
                          {isChosen && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {Object.keys(selectedAnswers).length} of {QUESTIONS.length} answered
                </span>
                <button
                  disabled={!allAnswered}
                  onClick={handleFinish}
                  className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    allAnswered
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reveal Sister Score</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
