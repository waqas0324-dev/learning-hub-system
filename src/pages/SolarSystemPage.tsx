import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { planets } from '../data/planets';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// Flowchart Component
function Flowchart({ steps, isUrdu }: { steps: { en: string; ur: string }[]; isUrdu: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 my-6">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="px-3 py-2 rounded-lg text-sm font-medium text-center"
            style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            {isUrdu ? <span className="font-urdu" dir="rtl">{step.ur}</span> : step.en}
          </div>
          {i < steps.length - 1 && (
            <span className="text-lg" style={{ color: 'var(--accent)' }}>→</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Image Card Component
function ImageCard({ src, alt, captionEn, captionUr, credit, fallback }: {
  src: string;
  alt: string;
  captionEn: string;
  captionUr: string;
  credit: string;
  fallback?: string;
}) {
  const { language } = useApp();
  const [imgError, setImgError] = useState(false);

  return (
    <figure className="rounded-xl overflow-hidden border my-4" style={{ borderColor: 'var(--border)' }}>
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 min-h-[200px] flex items-center justify-center">
        {!imgError ? (
          <img src={src} alt={alt} className="w-full h-auto object-cover" onError={() => setImgError(true)} loading="lazy" />
        ) : fallback ? (
          <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>
            <div className="text-4xl mb-2">🪐</div>
            <p className="text-sm">{fallback}</p>
          </div>
        ) : (
          <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>
            <div className="text-4xl mb-2">🌍</div>
            <p className="text-sm">Image unavailable</p>
          </div>
        )}
      </div>
      <figcaption className="p-3 text-center text-xs" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }}>
        {language === 'en' && <p>{captionEn}</p>}
        {language === 'ur' && <p className="font-urdu" dir="rtl">{captionUr}</p>}
        {language === 'both' && (
          <>
            <p>{captionEn}</p>
            <p className="font-urdu mt-1" dir="rtl">{captionUr}</p>
          </>
        )}
        <p className="mt-1 opacity-70">{credit}</p>
      </figcaption>
    </figure>
  );
}

// Quiz Component
interface QuizQuestion {
  question: { en: string; ur: string };
  options: { en: string; ur: string }[];
  correct: number;
  explanation: { en: string; ur: string };
}

const quizQuestions: QuizQuestion[] = [
  {
    question: { en: 'What is at the center of the Solar System?', ur: 'نظامِ شمسی کے مرکز میں کیا ہے؟' },
    options: [
      { en: 'Earth', ur: 'زمین' },
      { en: 'The Sun', ur: 'سورج' },
      { en: 'Jupiter', ur: 'مشتری' },
      { en: 'The Moon', ur: 'چاند' }
    ],
    correct: 1,
    explanation: { en: 'The Sun is at the center of the Solar System.', ur: 'سورج نظامِ شمسی کے مرکز میں ہے۔' }
  },
  {
    question: { en: 'How many planets are in the Solar System?', ur: 'نظامِ شمسی میں کتنے سیارے ہیں؟' },
    options: [
      { en: '7', ur: '۷' },
      { en: '8', ur: '۸' },
      { en: '9', ur: '۹' },
      { en: '10', ur: '۱۰' }
    ],
    correct: 1,
    explanation: { en: 'There are 8 recognized planets in the Solar System.', ur: 'نظامِ شمسی میں ۸ تسلیم شدہ سیارے ہیں۔' }
  },
  {
    question: { en: 'Which planet is closest to the Sun?', ur: 'سورج کے سب سے قریب کون سا سیارہ ہے؟' },
    options: [
      { en: 'Venus', ur: 'زہرہ' },
      { en: 'Earth', ur: 'زمین' },
      { en: 'Mercury', ur: 'عطارد' },
      { en: 'Mars', ur: 'مریخ' }
    ],
    correct: 2,
    explanation: { en: 'Mercury is the closest planet to the Sun.', ur: 'عطارد سورج کے سب سے قریب سیارہ ہے۔' }
  },
  {
    question: { en: 'Which is the hottest planet?', ur: 'سب سے گرم سیارہ کون سا ہے؟' },
    options: [
      { en: 'Mercury', ur: 'عطارد' },
      { en: 'Venus', ur: 'زہرہ' },
      { en: 'Earth', ur: 'زمین' },
      { en: 'Mars', ur: 'مریخ' }
    ],
    correct: 1,
    explanation: { en: 'Venus is the hottest planet due to its thick atmosphere.', ur: 'زہرہ اپنی گھنی فضا کی وجہ سے سب سے گرم سیارہ ہے۔' }
  },
  {
    question: { en: 'Which planet is known as the Red Planet?', ur: 'سرخ سیارہ کسے کہا جاتا ہے؟' },
    options: [
      { en: 'Jupiter', ur: 'مشتری' },
      { en: 'Saturn', ur: 'زحل' },
      { en: 'Mars', ur: 'مریخ' },
      { en: 'Venus', ur: 'زہرہ' }
    ],
    correct: 2,
    explanation: { en: 'Mars is called the Red Planet due to iron-rich dust.', ur: 'مریخ کو لوہے سے بھرپور گرد کی وجہ سے سرخ سیارہ کہا جاتا ہے۔' }
  },
  {
    question: { en: 'Which is the largest planet?', ur: 'سب سے بڑا سیارہ کون سا ہے؟' },
    options: [
      { en: 'Saturn', ur: 'زحل' },
      { en: 'Jupiter', ur: 'مشتری' },
      { en: 'Neptune', ur: 'نیپچون' },
      { en: 'Uranus', ur: 'یورینس' }
    ],
    correct: 1,
    explanation: { en: 'Jupiter is the largest planet in the Solar System.', ur: 'مشتری نظامِ شمسی کا سب سے بڑا سیارہ ہے۔' }
  },
  {
    question: { en: 'Which planet has prominent rings?', ur: 'کس سیارے کے نمایاں حلقے ہیں؟' },
    options: [
      { en: 'Jupiter', ur: 'مشتری' },
      { en: 'Uranus', ur: 'یورینس' },
      { en: 'Saturn', ur: 'زحل' },
      { en: 'Neptune', ur: 'نیپچون' }
    ],
    correct: 2,
    explanation: { en: 'Saturn is famous for its bright ring system.', ur: 'زحل اپنے روشن حلقوں کے نظام کی وجہ سے مشہور ہے۔' }
  },
  {
    question: { en: 'Which planets are gas giants?', ur: 'گیس دیو کون سے سیارے ہیں؟' },
    options: [
      { en: 'Earth and Mars', ur: 'زمین اور مریخ' },
      { en: 'Jupiter and Saturn', ur: 'مشتری اور زحل' },
      { en: 'Uranus and Neptune', ur: 'یورینس اور نیپچون' },
      { en: 'Mercury and Venus', ur: 'عطارد اور زہرہ' }
    ],
    correct: 1,
    explanation: { en: 'Jupiter and Saturn are gas giants.', ur: 'مشتری اور زحل گیس دیو ہیں۔' }
  },
  {
    question: { en: 'Which planets are ice giants?', ur: 'برفانی دیو کون سے سیارے ہیں؟' },
    options: [
      { en: 'Jupiter and Saturn', ur: 'مشتری اور زحل' },
      { en: 'Earth and Mars', ur: 'زمین اور مریخ' },
      { en: 'Uranus and Neptune', ur: 'یورینس اور نیپچون' },
      { en: 'Mercury and Venus', ur: 'عطارد اور زہرہ' }
    ],
    correct: 2,
    explanation: { en: 'Uranus and Neptune are ice giants.', ur: 'یورینس اور نیپچون برفانی دیو ہیں۔' }
  },
  {
    question: { en: 'What is the asteroid belt located between?', ur: 'سیارچوں کی پٹی کہاں واقع ہے؟' },
    options: [
      { en: 'Earth and Mars', ur: 'زمین اور مریخ' },
      { en: 'Mars and Jupiter', ur: 'مریخ اور مشتری' },
      { en: 'Jupiter and Saturn', ur: 'مشتری اور زحل' },
      { en: 'Saturn and Uranus', ur: 'زحل اور یورینس' }
    ],
    correct: 1,
    explanation: { en: 'The asteroid belt is mainly between Mars and Jupiter.', ur: 'سیارچوں کی پٹی زیادہ تر مریخ اور مشتری کے درمیان ہے۔' }
  },
  {
    question: { en: 'What happens when a comet approaches the Sun?', ur: 'جب دمدار ستارہ سورج کے قریب آتا ہے تو کیا ہوتا ہے؟' },
    options: [
      { en: 'It disappears', ur: 'یہ غائب ہو جاتا ہے' },
      { en: 'It develops a tail', ur: 'اس کی دم بن جاتی ہے' },
      { en: 'It becomes a planet', ur: 'یہ سیارہ بن جاتا ہے' },
      { en: 'Nothing changes', ur: 'کچھ نہیں بدلتا' }
    ],
    correct: 1,
    explanation: { en: 'Comets develop glowing tails when near the Sun.', ur: 'دمدار ستارے سورج کے قریب آنے پر روشن دم بناتے ہیں۔' }
  },
  {
    question: { en: 'What is a moon?', ur: 'چاند کیا ہے؟' },
    options: [
      { en: 'A star', ur: 'ایک ستارہ' },
      { en: 'A natural satellite orbiting a planet', ur: 'سیارے کے گرد گردش کرنے والا قدرتی سیارہ نما' },
      { en: 'A type of comet', ur: 'ایک قسم کا دمدار ستارہ' },
      { en: 'A dwarf planet', ur: 'بونا سیارہ' }
    ],
    correct: 1,
    explanation: { en: 'A moon is a natural satellite that orbits a planet.', ur: 'چاند ایک قدرتی سیارہ نما ہے جو سیارے کے گرد گردش کرتا ہے۔' }
  },
  {
    question: { en: 'What defines a dwarf planet?', ur: 'بونے سیارے کی تعریف کیا ہے؟' },
    options: [
      { en: 'It orbits the Sun and is round but has not cleared its orbit', ur: 'یہ سورج کے گرد گردش کرتا ہے اور گول ہے لیکن اس نے اپنا مدار صاف نہیں کیا' },
      { en: 'It is smaller than all moons', ur: 'یہ تمام چاندوں سے چھوٹا ہے' },
      { en: 'It has no gravity', ur: 'اس کی کوئی کششِ ثقل نہیں' },
      { en: 'It is made of gas', ur: 'یہ گیس سے بنا ہے' }
    ],
    correct: 0,
    explanation: { en: 'A dwarf planet orbits the Sun and is round but has not cleared its orbital neighborhood.', ur: 'بونا سیارہ سورج کے گرد گردش کرتا ہے اور گول ہے لیکن اس نے اپنے مداری علاقے سے دوسرے اجسام صاف نہیں کیے۔' }
  },
  {
    question: { en: 'How old is the Solar System?', ur: 'نظامِ شمسی کتنا پرانا ہے؟' },
    options: [
      { en: '1 billion years', ur: '۱ ارب سال' },
      { en: '4.6 billion years', ur: '۴.۶ ارب سال' },
      { en: '10 billion years', ur: '۱۰ ارب سال' },
      { en: '100 million years', ur: '۱۰ کروڑ سال' }
    ],
    correct: 1,
    explanation: { en: 'The Solar System formed about 4.6 billion years ago.', ur: 'نظامِ شمسی تقریباً ۴.۶ ارب سال پہلے بنا۔' }
  },
  {
    question: { en: 'What causes a planet\'s year?', ur: 'سیارے کا سال کس کی وجہ سے ہوتا ہے؟' },
    options: [
      { en: 'Rotation on its axis', ur: 'اپنے محور پر گردش' },
      { en: 'One complete orbit around the Sun', ur: 'سورج کے گرد ایک مکمل مدار' },
      { en: 'The Moon\'s orbit', ur: 'چاند کا مدار' },
      { en: 'The planet\'s tilt', ur: 'سیارے کا جھکاؤ' }
    ],
    correct: 1,
    explanation: { en: 'A planet\'s year is one complete trip around the Sun.', ur: 'سیارے کا سال سورج کے گرد ایک مکمل سفر ہے۔' }
  },
  {
    question: { en: 'Why do outer planets have longer years?', ur: 'بیرونی سیاروں کے سال لمبے کیوں ہوتے ہیں؟' },
    options: [
      { en: 'They rotate faster', ur: 'وہ تیز گردش کرتے ہیں' },
      { en: 'They have larger orbits', ur: 'ان کے مدار بڑے ہوتے ہیں' },
      { en: 'They are colder', ur: 'وہ زیادہ ٹھنڈے ہوتے ہیں' },
      { en: 'They have more moons', ur: 'ان کے زیادہ چاند ہوتے ہیں' }
    ],
    correct: 1,
    explanation: { en: 'Outer planets have larger orbits, so they take longer to complete a year.', ur: 'بیرونی سیاروں کے مدار بڑے ہوتے ہیں، اس لیے انہیں سال مکمل کرنے میں زیادہ وقت لگتا ہے۔' }
  },
  {
    question: { en: 'What is the Sun mostly made of?', ur: 'سورج زیادہ تر کس سے بنا ہے؟' },
    options: [
      { en: 'Rock and metal', ur: 'چٹان اور دھات' },
      { en: 'Hydrogen and helium', ur: 'ہائیڈروجن اور ہیلیم' },
      { en: 'Ice and dust', ur: 'برف اور گرد' },
      { en: 'Carbon dioxide', ur: 'کاربن ڈائی آکسائیڈ' }
    ],
    correct: 1,
    explanation: { en: 'The Sun is mostly hydrogen and helium.', ur: 'سورج زیادہ تر ہائیڈروجن اور ہیلیم پر مشتمل ہے۔' }
  },
  {
    question: { en: 'Which planet has the only known life?', ur: 'کس سیارے پر معلوم واحد زندگی ہے؟' },
    options: [
      { en: 'Mars', ur: 'مریخ' },
      { en: 'Venus', ur: 'زہرہ' },
      { en: 'Earth', ur: 'زمین' },
      { en: 'Jupiter', ur: 'مشتری' }
    ],
    correct: 2,
    explanation: { en: 'Earth is the only known world with life.', ur: 'زمین معلوم واحد دنیا ہے جہاں زندگی موجود ہے۔' }
  }
];

function Quiz() {
  const { language } = useApp();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[currentQ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowResult(true);
    if (idx === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="rounded-xl p-6 border text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {language === 'en' && 'Quiz Complete!'}
          {language === 'ur' && <span className="font-urdu" dir="rtl">کوئز مکمل!</span>}
          {language === 'both' && (
            <>
              Quiz Complete!
              <span className="block font-urdu mt-1" dir="rtl">کوئز مکمل!</span>
            </>
          )}
        </h3>
        <div className="text-4xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
          {score} / {quizQuestions.length}
        </div>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
          {language === 'en' && `You answered ${score} out of ${quizQuestions.length} questions correctly.`}
          {language === 'ur' && <span className="font-urdu" dir="rtl">آپ نے {quizQuestions.length} میں سے {score} سوالات کے درست جواب دیے۔</span>}
          {language === 'both' && (
            <>
              You answered {score} out of {quizQuestions.length} questions correctly.
              <span className="block font-urdu mt-1" dir="rtl">آپ نے {quizQuestions.length} میں سے {score} سوالات کے درست جواب دیے۔</span>
            </>
          )}
        </p>
        <button onClick={handleRetry} className="px-6 py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          {language === 'en' && 'Retry Quiz'}
          {language === 'ur' && <span className="font-urdu" dir="rtl">دوبارہ کوشش کریں</span>}
          {language === 'both' && (
            <>
              Retry Quiz
              <span className="block font-urdu mt-1" dir="rtl">دوبارہ کوشش کریں</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {language === 'en' && `Question ${currentQ + 1} of ${quizQuestions.length}`}
          {language === 'ur' && <span className="font-urdu" dir="rtl">سوال {currentQ + 1} از {quizQuestions.length}</span>}
          {language === 'both' && (
            <>
              Question {currentQ + 1} of {quizQuestions.length}
              <span className="block font-urdu text-xs" dir="rtl">سوال {currentQ + 1} از {quizQuestions.length}</span>
            </>
          )}
        </span>
        <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
          {language === 'en' && `Score: ${score}`}
          {language === 'ur' && <span className="font-urdu" dir="rtl">اسکور: {score}</span>}
          {language === 'both' && (
            <>
              Score: {score}
              <span className="block font-urdu text-xs" dir="rtl">اسکور: {score}</span>
            </>
          )}
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {language === 'en' && question.question.en}
        {language === 'ur' && <span className="font-urdu" dir="rtl">{question.question.ur}</span>}
        {language === 'both' && (
          <>
            {question.question.en}
            <span className="block font-urdu mt-1" dir="rtl">{question.question.ur}</span>
          </>
        )}
      </h3>

      <div className="space-y-2 mb-4">
        {question.options.map((opt, idx) => {
          let style = { backgroundColor: 'var(--surface-muted)', borderColor: 'var(--border)', color: 'var(--text-primary)' };
          if (showResult) {
            if (idx === question.correct) {
              style = { backgroundColor: '#10b98120', borderColor: '#10b981', color: '#10b981' };
            } else if (idx === selected && idx !== question.correct) {
              style = { backgroundColor: '#ef444420', borderColor: '#ef4444', color: '#ef4444' };
            }
          } else if (idx === selected) {
            style = { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' };
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className="w-full text-left px-4 py-3 rounded-lg border transition-colors"
              style={style}
            >
              {language === 'en' && opt.en}
              {language === 'ur' && <span className="font-urdu" dir="rtl">{opt.ur}</span>}
              {language === 'both' && (
                <>
                  {opt.en}
                  <span className="block font-urdu text-sm mt-0.5" dir="rtl">{opt.ur}</span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: selected === question.correct ? '#10b98115' : '#ef444415', border: `1px solid ${selected === question.correct ? '#10b981' : '#ef4444'}` }}>
          <div className="flex items-center gap-2 mb-2">
            {selected === question.correct ? (
              <CheckCircle size={20} style={{ color: '#10b981' }} />
            ) : (
              <XCircle size={20} style={{ color: '#ef4444' }} />
            )}
            <span className="font-semibold" style={{ color: selected === question.correct ? '#10b981' : '#ef4444' }}>
              {selected === question.correct
                ? (language === 'en' ? 'Correct!' : language === 'ur' ? 'درست!' : 'Correct!')
                : (language === 'en' ? 'Incorrect' : language === 'ur' ? 'غلط' : 'Incorrect')}
              {language === 'both' && (
                <span className="font-urdu ml-2" dir="rtl">
                  {selected === question.correct ? 'درست!' : 'غلط'}
                </span>
              )}
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {language === 'en' && question.explanation.en}
            {language === 'ur' && <span className="font-urdu" dir="rtl">{question.explanation.ur}</span>}
            {language === 'both' && (
              <>
                {question.explanation.en}
                <span className="block font-urdu mt-1" dir="rtl">{question.explanation.ur}</span>
              </>
            )}
          </p>
        </div>
      )}

      {answered && (
        <button onClick={handleNext} className="w-full py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          {language === 'en' && (currentQ < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz')}
          {language === 'ur' && <span className="font-urdu" dir="rtl">{currentQ < quizQuestions.length - 1 ? 'اگلا سوال' : 'کوئز مکمل کریں'}</span>}
          {language === 'both' && (
            <>
              {currentQ < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              <span className="block font-urdu text-sm mt-0.5" dir="rtl">{currentQ < quizQuestions.length - 1 ? 'اگلا سوال' : 'کوئز مکمل کریں'}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

export function SolarSystemPage() {
  const { language } = useApp();
  const navigate = useNavigate();

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return (
      <>
        <span>{en}</span>
        <span className="block font-urdu mt-2" dir="rtl">{ur}</span>
      </>
    );
  };

  return (
    <div className="space-y-12 pb-8">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {renderText('Our Solar System', 'ہمارا نظامِ شمسی')}
        </h1>
      </div>

      {/* Hero Section */}
      <section className="rounded-2xl overflow-hidden border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText('A Family of Worlds Around Our Star', 'ہمارے ستارے کے گرد دنیاؤں کا ایک خاندان')}
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'The Solar System is made of the Sun and everything held by its gravity. This includes eight planets, many moons, dwarf planets, asteroids, comets, dust, ice and smaller rocky objects. The Sun is the star at the center, and the planets travel around it in paths called orbits.',
              'نظامِ شمسی سورج اور ان تمام اجسام پر مشتمل ہے جو اس کی کششِ ثقل سے بندھے ہوئے ہیں۔ ان میں آٹھ سیارے، بہت سے چاند، بونے سیارے، سیارچے، دمدار ستارے، گرد، برف اور چھوٹے پتھریلے اجسام شامل ہیں۔ سورج مرکز میں موجود ستارہ ہے اور سیارے اس کے گرد مدار کہلانے والے راستوں پر سفر کرتے ہیں۔'
            )}
          </p>
          <ImageCard
            src="https://images-assets.nasa.gov/image/PIA21474/PIA21474~medium.jpg"
            alt="Solar System illustration"
            captionEn="A simplified view of the Solar System."
            captionUr="نظامِ شمسی کا ایک سادہ منظر۔"
            credit="Educational illustration — not to scale"
          />
        </div>
      </section>

      {/* Section 1: What Is the Solar System? */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('What Is the Solar System?', 'نظامِ شمسی کیا ہے؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Solar System is the group of objects that orbit the Sun because of its gravity. The Sun contains almost all the mass in the Solar System, so its gravity strongly affects the motion of planets, moons, asteroids and comets. The planets do not travel through empty space alone. They are part of a connected system of worlds, moons, rocks, ice and dust.',
            'نظامِ شمسی ان اجسام کا مجموعہ ہے جو سورج کی کششِ ثقل کی وجہ سے اس کے گرد گردش کرتے ہیں۔ سورج میں نظامِ شمسی کی تقریباً ساری کمیت موجود ہے، اس لیے اس کی کششِ ثقل سیاروں، چاندوں، سیارچوں اور دمدار ستاروں کی حرکت پر مضبوط اثر ڈالتی ہے۔ سیارے خالی خلا میں اکیلے سفر نہیں کرتے۔ وہ دنیاؤں، چاندوں، چٹانوں، برف اور گرد کے ایک باہم جڑے ہوئے نظام کا حصہ ہیں۔'
          )}
        </p>
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {renderText('How Gravity Creates Orbits', 'کششِ ثقل مدار کیسے بناتی ہے')}
        </h3>
        <Flowchart
          isUrdu={language === 'ur'}
          steps={[
            { en: "Sun's gravity", ur: 'سورج کی کششِ ثقل' },
            { en: 'Objects move forward', ur: 'اجسام آگے حرکت کرتے ہیں' },
            { en: 'Gravity bends paths', ur: 'کششِ ثقل راستے موڑتی ہے' },
            { en: 'Curved orbits form', ur: 'خمیدہ مدار بنتے ہیں' },
            { en: 'Objects orbit the Sun', ur: 'اجسام سورج کے گرد گردش کرتے ہیں' }
          ]}
        />
      </section>

      {/* Section 2: The Sun */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('The Sun — The Heart of the Solar System', 'سورج — نظامِ شمسی کا مرکز')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Sun is a star at the center of the Solar System. It provides light and heat, and its gravity helps keep planets in orbit. The Sun is made mostly of hydrogen and helium. Deep inside its core, nuclear fusion releases energy that slowly travels outward and leaves the Sun as sunlight and heat.',
            'سورج نظامِ شمسی کے مرکز میں موجود ایک ستارہ ہے۔ یہ روشنی اور حرارت فراہم کرتا ہے، اور اس کی کششِ ثقل سیاروں کو مدار میں رکھنے میں مدد دیتی ہے۔ سورج زیادہ تر ہائیڈروجن اور ہیلیم پر مشتمل ہے۔ اس کے گہرے مرکز میں جوہری ملاپ توانائی خارج کرتا ہے جو آہستہ آہستہ باہر کی طرف جاتی ہے اور سورج سے روشنی اور حرارت کی صورت میں نکلتی ہے۔'
          )}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
          {[
            { en: 'Type: G-type star', ur: 'قسم: جی قسم کا ستارہ' },
            { en: 'Diameter: ~1,392,700 km', ur: 'قطر: تقریباً ۱۳،۹۲،۷۰۰ کلومیٹر' },
            { en: 'Age: ~4.6 billion years', ur: 'عمر: تقریباً ۴.۶ ارب سال' },
            { en: 'Surface: ~5,500°C', ur: 'سطح: تقریباً ۵،۵۰۰ ڈگری' },
            { en: 'Core: ~15 million°C', ur: 'مرکز: تقریباً ۱.۵ کروڑ ڈگری' },
            { en: 'Mass: 99.8% of Solar System', ur: 'کمیت: نظامِ شمسی کا ۹۹.۸٪' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)' }}>
              {language === 'en' && fact.en}
              {language === 'ur' && <span className="font-urdu" dir="rtl">{fact.ur}</span>}
              {language === 'both' && (
                <>
                  {fact.en}
                  <span className="block font-urdu text-xs mt-1" dir="rtl">{fact.ur}</span>
                </>
              )}
            </div>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {renderText('Nuclear Fusion in the Sun', 'سورج میں جوہری ملاپ')}
        </h3>
        <Flowchart
          isUrdu={language === 'ur'}
          steps={[
            { en: 'Hydrogen nuclei', ur: 'ہائیڈروجن کے مرکزے' },
            { en: 'Nuclear fusion', ur: 'جوہری ملاپ' },
            { en: 'Helium + energy', ur: 'ہیلیم + توانائی' },
            { en: 'Energy moves outward', ur: 'توانائی باہر جاتی ہے' },
            { en: 'Sunlight and heat', ur: 'روشنی اور حرارت' }
          ]}
        />
      </section>

      {/* Section 3: Eight Planets */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('The Eight Planets in Order', 'ترتیب کے ساتھ آٹھ سیارے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The eight planets travel around the Sun in a specific order. The four inner planets are Mercury, Venus, Earth and Mars. They are rocky worlds with solid surfaces. The four outer planets are Jupiter, Saturn, Uranus and Neptune. Jupiter and Saturn are gas giants, while Uranus and Neptune are ice giants.',
            'آٹھ سیارے سورج کے گرد ایک خاص ترتیب میں گردش کرتے ہیں۔ اندرونی چار سیارے عطارد، زہرہ، زمین اور مریخ ہیں۔ یہ پتھریلی دنیائیں ہیں جن کی ٹھوس سطحیں ہیں۔ بیرونی چار سیارے مشتری، زحل، یورینس اور نیپچون ہیں۔ مشتری اور زحل گیس دیو ہیں، جبکہ یورینس اور نیپچون برفانی دیو ہیں۔'
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planets.map((planet, i) => (
            <div key={planet.id} className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden" style={{ background: planet.gradient }}>
                    <img src={planet.imageUrl} alt={planet.name.en} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>{i + 1}</span>
                    <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>
                      {language === 'ur' ? planet.name.ur : planet.name.en}
                      {language === 'both' && <span className="font-urdu font-normal text-sm ml-2" dir="rtl">{planet.name.ur}</span>}
                    </h3>
                  </div>
                  <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                    {language === 'ur' ? planet.fact.ur : planet.fact.en}
                    {language === 'both' && <span className="block font-urdu mt-0.5" dir="rtl">{planet.fact.ur}</span>}
                  </p>
                  <button onClick={() => navigate('/planets')} className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                    {language === 'en' && 'Explore Planet'}
                    {language === 'ur' && <span className="font-urdu" dir="rtl">سیارہ دریافت کریں</span>}
                    {language === 'both' && <>Explore Planet<span className="block font-urdu text-[10px]" dir="rtl">سیارہ دریافت کریں</span></>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Continue with more sections... */}
      {/* Section 4: Inner and Outer Planets */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Inner Planets and Outer Planets', 'اندرونی اور بیرونی سیارے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The inner planets are closer to the Sun and are smaller rocky worlds. Mercury, Venus, Earth and Mars have solid surfaces. The outer planets are farther away and much larger. Jupiter and Saturn are gas giants, while Uranus and Neptune are ice giants.',
            'اندرونی سیارے سورج کے زیادہ قریب ہوتے ہیں اور نسبتاً چھوٹی پتھریلی دنیائیں ہیں۔ عطارد، زہرہ، زمین اور مریخ کی ٹھوس سطحیں ہیں۔ بیرونی سیارے زیادہ دور اور بہت بڑے ہیں۔ مشتری اور زحل گیس دیو ہیں، جبکہ یورینس اور نیپچون برفانی دیو ہیں۔'
          )}
        </p>
      </section>

      {/* Section 5: Orbits and Days/Years */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Why Do Planets Have Different Days and Years?', 'سیاروں کے دن اور سال مختلف کیوں ہوتے ہیں؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            "A planet's day is linked to how long it takes to rotate once on its axis. A planet's year is linked to how long it takes to travel once around the Sun.",
            "کسی سیارے کا دن اس وقت سے متعلق ہے جو وہ اپنے محور کے گرد ایک چکر مکمل کرنے میں لیتا ہے۔ کسی سیارے کا سال اس وقت سے متعلق ہے جو وہ سورج کے گرد ایک چکر مکمل کرنے میں لیتا ہے۔"
          )}
        </p>
        <Flowchart
          isUrdu={language === 'ur'}
          steps={[
            { en: 'Planet rotation', ur: 'سیارے کی گردش' },
            { en: 'One complete spin', ur: 'ایک مکمل چکر' },
            { en: 'Length of a day', ur: 'دن کی مدت' }
          ]}
        />
      </section>

      {/* Section 6: Gravity */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Gravity Holds the Solar System Together', 'کششِ ثقل نظامِ شمسی کو ایک ساتھ رکھتی ہے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            "Gravity is the force that attracts objects with mass toward each other. The Sun has far more mass than any planet, so it has the strongest gravitational influence.",
            "کششِ ثقل وہ قوت ہے جو کمیت رکھنے والے اجسام کو ایک دوسرے کی طرف کھینچتی ہے۔ سورج کی کمیت کسی بھی سیارے سے بہت زیادہ ہے، اس لیے نظامِ شمسی میں اس کا کششی اثر سب سے مضبوط ہے۔"
          )}
        </p>
      </section>

      {/* Section 7: Other Members */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Other Members of the Solar System', 'نظامِ شمسی کے دوسرے ارکان')}
        </h2>
        <div className="space-y-4">
          <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--surface-muted)' }}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Moons', 'چاند')}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {renderText(
                'Moons are natural satellites that orbit planets or dwarf planets.',
                'چاند قدرتی سیارہ نما ساتھی ہوتے ہیں جو سیاروں یا بونے سیاروں کے گرد گردش کرتے ہیں۔'
              )}
            </p>
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--surface-muted)' }}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Asteroids', 'سیارچے')}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {renderText(
                'Asteroids are rocky objects that orbit the Sun.',
                'سیارچے پتھریلے اجسام ہیں جو سورج کے گرد گردش کرتے ہیں۔'
              )}
            </p>
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--surface-muted)' }}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Comets', 'دمدار ستارے')}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {renderText(
                'Comets are icy objects that orbit the Sun.',
                'دمدار ستارے برفیلے اجسام ہیں جو سورج کے گرد گردش کرتے ہیں۔'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Section 8: Formation */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('How Did the Solar System Form?', 'نظامِ شمسی کیسے بنا؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Scientists think the Solar System formed about 4.6 billion years ago from a giant cloud of gas and dust.',
            'سائنسدانوں کے مطابق نظامِ شمسی تقریباً 4.6 ارب سال پہلے گیس اور گرد کے ایک بہت بڑے بادل سے بنا۔'
          )}
        </p>
        <p className="text-xs italic mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Educational formation model — simplified.',
            'نظامِ شمسی کی تشکیل کا سادہ تعلیمی نمونہ۔'
          )}
        </p>
      </section>

      {/* Section 9-10: Fun Facts */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Fun Facts', 'دلچسپ حقائق')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { en: 'The Sun is the only star in the Solar System.', ur: 'سورج نظامِ شمسی کا واحد ستارہ ہے۔' },
            { en: 'There are eight recognized planets.', ur: 'آٹھ تسلیم شدہ سیارے ہیں۔' },
            { en: 'Mercury is closest to the Sun.', ur: 'عطارد سورج کے سب سے قریب ہے۔' },
            { en: 'Venus is the hottest planet.', ur: 'زہرہ سب سے گرم سیارہ ہے۔' },
            { en: 'Earth is the only known world with life.', ur: 'زمین معلوم واحد دنیا ہے جہاں زندگی ہے۔' },
            { en: 'Jupiter is the largest planet.', ur: 'مشتری سب سے بڑا سیارہ ہے۔' },
            { en: 'Saturn has a bright ring system.', ur: 'زحل کے روشن حلقے ہیں۔' },
            { en: 'The Solar System is about 4.6 billion years old.', ur: 'نظامِ شمسی تقریباً ۴.۶ ارب سال پرانا ہے۔' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)' }}>
              {language === 'en' && fact.en}
              {language === 'ur' && <span className="font-urdu" dir="rtl">{fact.ur}</span>}
              {language === 'both' && (
                <>
                  {fact.en}
                  <span className="block font-urdu text-xs mt-1" dir="rtl">{fact.ur}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 11: Quiz */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Test Your Knowledge', 'اپنے علم کی جانچ کریں')}
        </h2>
        <Quiz />
      </section>

      {/* Section 12: Sources */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Sources and Educational Note', 'ماخذ اور تعلیمی نوٹ')}
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Educational note: The Solar System is extremely large. The diagrams and animations on this page use compressed distances and adjusted object sizes so that the Sun and planets can be seen clearly together.',
            'تعلیمی نوٹ: نظامِ شمسی بہت وسیع ہے۔ اس صفحے کے خاکوں اور حرکت کرتی تصاویر میں فاصلے مختصر اور اجسام کے سائز تبدیل کر کے دکھائے گئے ہیں تاکہ سورج اور سیارے ایک ساتھ واضح نظر آ سکیں۔'
          )}
        </p>
        <div className="space-y-2">
          {['NASA Science', 'NASA Solar System Exploration', 'NASA Planetary Fact Sheets', 'NASA Photojournal'].map((source, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)' }}>
              {source}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
