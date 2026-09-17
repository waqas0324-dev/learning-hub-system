import React from 'react';
import { useApp } from '../contexts/AppContext';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizFeedbackProps {
  isCorrect: boolean;
  explanation: { en: string; ur: string };
  className?: string;
}

/**
 * QuizFeedback Component
 * 
 * Shared quiz feedback component for correct/wrong answers.
 * Features:
 * - Green success state for correct answers
 * - Red error state for wrong answers
 * - Checkmark/X icons
 * - Bilingual explanations
 * - Consistent styling across all quizzes
 * - Accessible design
 */
export function QuizFeedback({ isCorrect, explanation, className = '' }: QuizFeedbackProps) {
  const { language } = useApp();

  const bgColor = isCorrect ? '#10b98115' : '#ef444415';
  const borderColor = isCorrect ? '#10b981' : '#ef4444';
  const textColor = isCorrect ? '#10b981' : '#ef4444';

  return (
    <div 
      className={`p-4 rounded-lg ${className}`}
      style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}` }}
    >
      {/* Icon and status */}
      <div className="flex items-center gap-2 mb-2">
        {isCorrect ? (
          <CheckCircle size={20} style={{ color: textColor }} />
        ) : (
          <XCircle size={20} style={{ color: textColor }} />
        )}
        <span className="font-semibold" style={{ color: textColor }}>
          {isCorrect 
            ? (language === 'en' ? 'Correct!' : language === 'ur' ? 'درست!' : 'Correct!')
            : (language === 'en' ? 'Incorrect' : language === 'ur' ? 'غلط' : 'Incorrect')
          }
          {language === 'both' && (
            <span className="font-urdu ml-2" dir="rtl">
              {isCorrect ? 'درست!' : 'غلط'}
            </span>
          )}
        </span>
      </div>

      {/* Explanation */}
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {language === 'en' && explanation.en}
        {language === 'ur' && <span className="font-urdu" dir="rtl">{explanation.ur}</span>}
        {language === 'both' && (
          <>
            {explanation.en}
            <span className="block font-urdu mt-1" dir="rtl">{explanation.ur}</span>
          </>
        )}
      </p>
    </div>
  );
}

/**
 * QuizQuestion Component
 * 
 * Complete quiz question with options and feedback.
 */
interface QuizOption {
  en: string;
  ur: string;
}

interface QuizQuestionData {
  question: { en: string; ur: string };
  options: QuizOption[];
  correct: number;
  explanation: { en: string; ur: string };
}

interface QuizQuestionProps {
  questionData: QuizQuestionData;
  onAnswer: (selectedIndex: number) => void;
  selectedAnswer: number | null;
  showFeedback: boolean;
}

export function QuizQuestion({ 
  questionData, 
  onAnswer, 
  selectedAnswer,
  showFeedback 
}: QuizQuestionProps) {
  const { language } = useApp();

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return <>{en}<span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
  };

  return (
    <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      {/* Question */}
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {renderText(questionData.question.en, questionData.question.ur)}
      </h3>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {questionData.options.map((opt, idx) => {
          let style: React.CSSProperties = { 
            backgroundColor: 'var(--surface-muted)', 
            borderColor: 'var(--border)', 
            color: 'var(--text-primary)' 
          };
          
          if (showFeedback) {
            if (idx === questionData.correct) {
              style = { backgroundColor: '#10b98120', borderColor: '#10b981', color: '#10b981' };
            } else if (idx === selectedAnswer && idx !== questionData.correct) {
              style = { backgroundColor: '#ef444420', borderColor: '#ef4444', color: '#ef4444' };
            }
          }

          return (
            <button
              key={idx}
              onClick={() => onAnswer(idx)}
              disabled={showFeedback}
              className="w-full text-left px-4 py-3 rounded-lg border transition-colors"
              style={style}
            >
              {renderText(opt.en, opt.ur)}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && selectedAnswer !== null && (
        <QuizFeedback
          isCorrect={selectedAnswer === questionData.correct}
          explanation={questionData.explanation}
        />
      )}
    </div>
  );
}
