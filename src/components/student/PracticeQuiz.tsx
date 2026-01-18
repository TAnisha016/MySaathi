import { useState } from 'react';
import { ArrowLeft, Lightbulb, MessageCircle, Trophy } from 'lucide-react';
import type { UserProfile } from '../../App';

interface PracticeQuizProps {
  topic: string;
  onClose: () => void;
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
  hint: string;
}

const sampleQuestions: Question[] = [
  {
    question: 'Solve for x:\n2x + 5 = 15',
    options: ['x = 5', 'x = 10', 'x = 7', 'x = 3'],
    correct: 0,
    hint: 'First, subtract 5 from both sides, then divide by 2',
  },
  {
    question: 'What is the area of a rectangle with length 8 cm and width 5 cm?',
    options: ['40 cm²', '13 cm²', '26 cm²', '80 cm²'],
    correct: 0,
    hint: 'Area of rectangle = length × width',
  },
  {
    question: 'If a triangle has angles 60° and 70°, what is the third angle?',
    options: ['50°', '60°', '40°', '30°'],
    correct: 0,
    hint: 'Sum of all angles in a triangle = 180°',
  },
];

export function PracticeQuiz({ topic, onClose, profile, updateProfile }: PracticeQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === question.correct) {
      setScore(score + 30);
      updateProfile({
        points: (profile.points || 0) + 30,
      });
    }

    if (currentQuestion < sampleQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowHint(false);
      }, 500);
    } else {
      setShowResult(true);
      updateProfile({
        topicsMastered: (profile.topicsMastered || 0) + 1,
        hoursLearned: (profile.hoursLearned || 0) + 0.5,
      });
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-[#FF9933] mb-4">Quiz Completed!</h2>
          <div className="bg-[#FFF8F0] rounded-2xl p-6 mb-6">
            <p className="text-4xl font-bold text-[#FF9933] mb-2">{score}</p>
            <p className="text-[#2C3E50]">Total Points Earned</p>
          </div>
          <p className="text-[#2C3E50] mb-6">
            You answered {Math.floor(score / 30)} out of {sampleQuestions.length} questions correctly!
          </p>
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all"
            >
              Back to Practice
            </button>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setShowResult(false);
                setSelectedAnswer(null);
              }}
              className="w-full bg-white text-[#FF9933] border-2 border-[#FF9933] py-4 rounded-2xl font-semibold hover:bg-[#FFF8F0] transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose}>
              <ArrowLeft size={24} className="text-[#2C3E50]" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#2C3E50]">{topic}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1}/{sampleQuestions.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Timer and Points */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#2C3E50]">
            <span>⏱</span>
            <span className="font-semibold">02:45</span>
          </div>
          <div className="flex items-center gap-2 text-[#FFD700]">
            <Trophy size={20} />
            <span className="font-bold text-[#FF9933]">30 pts</span>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <p className="text-lg font-semibold text-[#2C3E50] mb-6 whitespace-pre-line">
            Q{currentQuestion + 1}. {question.question}
          </p>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedAnswer === index
                    ? 'border-[#FF9933] bg-[#FFF8F0]'
                    : 'border-gray-300 bg-white hover:border-[#FF9933]'
                }`}
              >
                <span className="font-semibold text-[#2C3E50]">
                  {String.fromCharCode(65 + index)}) {option}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-[#FFD700]/20 border-2 border-[#FFD700] rounded-3xl p-5">
          <p className="font-semibold text-[#2C3E50] mb-3">Need Help?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex-1 bg-[#FFD700] text-[#2C3E50] py-3 rounded-xl font-semibold hover:bg-[#ffd700dd] transition-all flex items-center justify-center gap-2"
            >
              <Lightbulb size={20} />
              <span>Get Hint (-5 pts)</span>
            </button>
            <button className="flex-1 bg-white border-2 border-[#FF9933] text-[#FF9933] py-3 rounded-xl font-semibold hover:bg-[#FFF8F0] transition-all flex items-center justify-center gap-2">
              <MessageCircle size={20} />
              <span>Ask MySaathi</span>
            </button>
          </div>
          {showHint && (
            <div className="mt-4 bg-white rounded-xl p-4 border-2 border-[#FFD700]">
              <p className="text-sm text-[#2C3E50]">
                💡 <strong>Hint:</strong> {question.hint}
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="w-full bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>Submit Answer</span>
          <span>→</span>
        </button>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-sm text-[#2C3E50] mb-2">
            <span>Progress:</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#FF9933] to-[#FFB366] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
