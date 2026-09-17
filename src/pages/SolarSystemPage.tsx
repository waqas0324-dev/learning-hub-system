import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { SolarSystem } from '../components/SolarSystem';
import { PlanetModal } from '../components/PlanetModal';
import { planets, PlanetData } from '../data/planets';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from 'lucide-react';

// Enhanced Flowchart Component with clickable steps
function InteractiveFlowchart({ steps }: { steps: { en: string; ur: string }[] }) {
  const { language } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="my-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <button
              onClick={() => setActiveStep(i)}
              className={`px-4 py-3 rounded-lg text-sm font-medium text-center transition-all min-w-[140px] ${
                activeStep === i ? 'scale-105 shadow-lg' : ''
              }`}
              style={{
                backgroundColor: activeStep === i ? 'var(--accent)' : 'var(--surface-muted)',
                color: activeStep === i ? '#fff' : 'var(--text-primary)',
                border: `2px solid ${activeStep === i ? 'var(--accent)' : 'var(--border)'}`,
                boxShadow: activeStep === i ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              {language === 'en' && step.en}
              {language === 'ur' && <span className="font-urdu" dir="rtl">{step.ur}</span>}
              {language === 'both' && (
                <>
                  {step.en}
                  <span className="block font-urdu text-xs mt-1 opacity-90" dir="rtl">{step.ur}</span>
                </>
              )}
            </button>
            {i < steps.length - 1 && (
              <ArrowRight size={20} className="hidden md:block" style={{ color: 'var(--accent)' }} />
            )}
            {i < steps.length - 1 && (
              <div className="md:hidden h-6 w-0.5" style={{ backgroundColor: 'var(--accent)' }} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {language === 'en' && steps[activeStep].en}
          {language === 'ur' && <span className="font-urdu" dir="rtl">{steps[activeStep].ur}</span>}
          {language === 'both' && (
            <>
              {steps[activeStep].en}
              <span className="block font-urdu mt-1" dir="rtl">{steps[activeStep].ur}</span>
            </>
          )}
        </p>
      </div>
      <p className="text-xs italic text-center mt-2" style={{ color: 'var(--text-secondary)' }}>
        {language === 'en' && 'Educational diagram — not to scale.'}
        {language === 'ur' && <span className="font-urdu" dir="rtl">تعلیمی خاکہ — حقیقی پیمانے پر نہیں۔</span>}
        {language === 'both' && (
          <>
            Educational diagram — not to scale.
            <br />
            <span className="font-urdu" dir="rtl">تعلیمی خاکہ — حقیقی پیمانے پر نہیں۔</span>
          </>
        )}
      </p>
    </div>
  );
}

// Image Card Component
function ImageCard({ src, alt, captionEn, captionUr, credit }: {
  src: string;
  alt: string;
  captionEn: string;
  captionUr: string;
  credit: string;
}) {
  const { language } = useApp();
  const [imgError, setImgError] = useState(false);

  return (
    <figure className="rounded-xl overflow-hidden border my-4" style={{ borderColor: 'var(--border)' }}>
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 min-h-[200px] flex items-center justify-center">
        {!imgError ? (
          <img src={src} alt={alt} className="w-full h-auto object-cover" onError={() => setImgError(true)} loading="lazy" />
        ) : (
          <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>
            <div className="w-32 h-32 mx-auto rounded-full mb-4" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 40%, #2d6b3f 60%, #1a3a5c)' }} />
            <p className="text-sm">Educational diagram</p>
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

// Image Carousel Component
function ImageCarousel() {
  const { language } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const slides = [
    { src: 'https://images-assets.nasa.gov/image/PIA17463/PIA17463~medium.jpg', captionEn: 'The Sun', captionUr: 'سورج', credit: 'NASA/SDO' },
    { src: 'https://images-assets.nasa.gov/image/PIA21188/PIA21188~medium.jpg', captionEn: 'Mercury', captionUr: 'عطارد', credit: 'NASA/MESSENGER' },
    { src: 'https://images-assets.nasa.gov/image/PIA23792/PIA23792~medium.jpg', captionEn: 'Venus', captionUr: 'زہرہ', credit: 'NASA/JPL' },
    { src: 'https://images-assets.nasa.gov/image/PIA18033/PIA18033~medium.jpg', captionEn: 'Earth', captionUr: 'زمین', credit: 'NASA/NOAA' },
    { src: 'https://images-assets.nasa.gov/image/PIA22974/PIA22974~medium.jpg', captionEn: 'Mars', captionUr: 'مریخ', credit: 'NASA/MSSS' },
    { src: 'https://images-assets.nasa.gov/image/PIA21774/PIA21774~medium.jpg', captionEn: 'Jupiter', captionUr: 'مشتری', credit: 'NASA/Juno' },
    { src: 'https://images-assets.nasa.gov/image/PIA20029/PIA20029~medium.jpg', captionEn: 'Saturn and its rings', captionUr: 'زحل اور اس کے حلقے', credit: 'NASA/Cassini' },
    { src: 'https://images-assets.nasa.gov/image/PIA01464/PIA01464~medium.jpg', captionEn: 'Uranus', captionUr: 'یورینس', credit: 'NASA/Voyager 2' },
    { src: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~medium.jpg', captionEn: 'Neptune', captionUr: 'نیپچون', credit: 'NASA/Voyager 2' },
    { src: 'https://images-assets.nasa.gov/image/PIA00465/PIA00465~medium.jpg', captionEn: "Earth's Moon", captionUr: 'زمین کا چاند', credit: 'NASA/Apollo' },
    { src: 'https://images-assets.nasa.gov/image/PIA00777/PIA00777~medium.jpg', captionEn: 'Asteroid', captionUr: 'سیارچہ', credit: 'NASA/Galileo' },
    { src: 'https://images-assets.nasa.gov/image/PIA00745/PIA00745~medium.jpg', captionEn: 'Comet', captionUr: 'دمدار ستارہ', credit: 'NASA/Hubble' },
    { src: 'https://images-assets.nasa.gov/image/PIA01482/PIA01482~medium.jpg', captionEn: 'Pluto - dwarf planet', captionUr: 'پلوٹو - بونا سیارہ', credit: 'NASA/New Horizons' },
    { src: 'https://images-assets.nasa.gov/image/PIA17463/PIA17463~medium.jpg', captionEn: 'Solar System formation disk (illustration)', captionUr: 'نظامِ شمسی کی تشکیل کی قرص (تصویر)', credit: 'Educational illustration' },
    { src: 'https://images-assets.nasa.gov/image/PIA21474/PIA21474~medium.jpg', captionEn: 'Full Solar System diagram', captionUr: 'مکمل نظامِ شمسی کا خاکہ', credit: 'NASA' },
    { src: 'https://images-assets.nasa.gov/image/PIA18033/PIA18033~medium.jpg', captionEn: 'Asteroid belt region', captionUr: 'سیارچوں کی پٹی کا علاقہ', credit: 'Educational diagram' }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const [imgError, setImgError] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden border my-6" style={{ borderColor: 'var(--border)' }}>
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 min-h-[300px] flex items-center justify-center">
        {!imgError ? (
          <img
            src={slides[currentSlide].src}
            alt={slides[currentSlide].captionEn}
            className="w-full h-auto max-h-[400px] object-contain"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>
            <div className="w-40 h-40 mx-auto rounded-full mb-4" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 40%, #2d6b3f 60%, #1a3a5c)' }} />
            <p className="text-sm">Educational diagram</p>
          </div>
        )}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="p-4" style={{ backgroundColor: 'var(--surface-muted)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {currentSlide + 1} / {slides.length}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
        <p className="text-sm text-center" style={{ color: 'var(--text-primary)' }}>
          {language === 'en' && slides[currentSlide].captionEn}
          {language === 'ur' && <span className="font-urdu" dir="rtl">{slides[currentSlide].captionUr}</span>}
          {language === 'both' && (
            <>
              {slides[currentSlide].captionEn}
              <span className="block font-urdu mt-1" dir="rtl">{slides[currentSlide].captionUr}</span>
            </>
          )}
        </p>
        <p className="text-xs text-center mt-1" style={{ color: 'var(--text-secondary)' }}>
          {slides[currentSlide].credit}
        </p>
        <div className="flex justify-center gap-1 mt-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: i === currentSlide ? 'var(--accent)' : 'var(--border)',
                transform: i === currentSlide ? 'scale(1.3)' : 'scale(1)'
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Quiz Component with 18 questions
interface QuizQuestion {
  question: { en: string; ur: string };
  options: { en: string; ur: string }[];
  correct: number;
  explanation: { en: string; ur: string };
}

const quizQuestions: QuizQuestion[] = [
  {
    question: { en: 'What is at the center of the Solar System?', ur: 'نظامِ شمسی کے مرکز میں کیا ہے؟' },
    options: [{ en: 'Earth', ur: 'زمین' }, { en: 'The Sun', ur: 'سورج' }, { en: 'Jupiter', ur: 'مشتری' }, { en: 'The Moon', ur: 'چاند' }],
    correct: 1,
    explanation: { en: 'The Sun is at the center of the Solar System.', ur: 'سورج نظامِ شمسی کے مرکز میں ہے۔' }
  },
  {
    question: { en: 'How many planets are in the Solar System?', ur: 'نظامِ شمسی میں کتنے سیارے ہیں؟' },
    options: [{ en: '7', ur: '۷' }, { en: '8', ur: '۸' }, { en: '9', ur: '۹' }, { en: '10', ur: '۱۰' }],
    correct: 1,
    explanation: { en: 'There are 8 recognized planets.', ur: '۸ تسلیم شدہ سیارے ہیں۔' }
  },
  {
    question: { en: 'Which planet is closest to the Sun?', ur: 'سورج کے سب سے قریب کون سا سیارہ ہے؟' },
    options: [{ en: 'Venus', ur: 'زہرہ' }, { en: 'Earth', ur: 'زمین' }, { en: 'Mercury', ur: 'عطارد' }, { en: 'Mars', ur: 'مریخ' }],
    correct: 2,
    explanation: { en: 'Mercury is closest to the Sun.', ur: 'عطارد سورج کے سب سے قریب ہے۔' }
  },
  {
    question: { en: 'Which is the hottest planet?', ur: 'سب سے گرم سیارہ کون سا ہے؟' },
    options: [{ en: 'Mercury', ur: 'عطارد' }, { en: 'Venus', ur: 'زہرہ' }, { en: 'Earth', ur: 'زمین' }, { en: 'Mars', ur: 'مریخ' }],
    correct: 1,
    explanation: { en: 'Venus is hottest due to thick atmosphere.', ur: 'زہرہ گھنی فضا کی وجہ سے سب سے گرم ہے۔' }
  },
  {
    question: { en: 'Which planet is known as the Red Planet?', ur: 'سرخ سیارہ کسے کہا جاتا ہے؟' },
    options: [{ en: 'Jupiter', ur: 'مشتری' }, { en: 'Saturn', ur: 'زحل' }, { en: 'Mars', ur: 'مریخ' }, { en: 'Venus', ur: 'زہرہ' }],
    correct: 2,
    explanation: { en: 'Mars is the Red Planet.', ur: 'مریخ سرخ سیارہ ہے۔' }
  },
  {
    question: { en: 'Which is the largest planet?', ur: 'سب سے بڑا سیارہ کون سا ہے؟' },
    options: [{ en: 'Saturn', ur: 'زحل' }, { en: 'Jupiter', ur: 'مشتری' }, { en: 'Neptune', ur: 'نیپچون' }, { en: 'Uranus', ur: 'یورینس' }],
    correct: 1,
    explanation: { en: 'Jupiter is the largest planet.', ur: 'مشتری سب سے بڑا سیارہ ہے۔' }
  },
  {
    question: { en: 'Which planet has prominent rings?', ur: 'کس سیارے کے نمایاں حلقے ہیں؟' },
    options: [{ en: 'Jupiter', ur: 'مشتری' }, { en: 'Uranus', ur: 'یورینس' }, { en: 'Saturn', ur: 'زحل' }, { en: 'Neptune', ur: 'نیپچون' }],
    correct: 2,
    explanation: { en: 'Saturn has bright rings.', ur: 'زحل کے روشن حلقے ہیں۔' }
  },
  {
    question: { en: 'Which planets are gas giants?', ur: 'گیس دیو کون سے سیارے ہیں؟' },
    options: [{ en: 'Earth and Mars', ur: 'زمین اور مریخ' }, { en: 'Jupiter and Saturn', ur: 'مشتری اور زحل' }, { en: 'Uranus and Neptune', ur: 'یورینس اور نیپچون' }, { en: 'Mercury and Venus', ur: 'عطارد اور زہرہ' }],
    correct: 1,
    explanation: { en: 'Jupiter and Saturn are gas giants.', ur: 'مشتری اور زحل گیس دیو ہیں۔' }
  },
  {
    question: { en: 'Which planets are ice giants?', ur: 'برفانی دیو کون سے ہیں؟' },
    options: [{ en: 'Jupiter and Saturn', ur: 'مشتری اور زحل' }, { en: 'Earth and Mars', ur: 'زمین اور مریخ' }, { en: 'Uranus and Neptune', ur: 'یورینس اور نیپچون' }, { en: 'Mercury and Venus', ur: 'عطارد اور زہرہ' }],
    correct: 2,
    explanation: { en: 'Uranus and Neptune are ice giants.', ur: 'یورینس اور نیپچون برفانی دیو ہیں۔' }
  },
  {
    question: { en: 'What keeps planets in orbit?', ur: 'سیاروں کو مدار میں کیا رکھتا ہے؟' },
    options: [{ en: 'Magnetism', ur: 'مقناطیسیت' }, { en: 'Gravity', ur: 'کششِ ثقل' }, { en: 'Wind', ur: 'ہوا' }, { en: 'Light', ur: 'روشنی' }],
    correct: 1,
    explanation: { en: 'Gravity keeps planets in orbit.', ur: 'کششِ ثقل سیاروں کو مدار میں رکھتی ہے۔' }
  },
  {
    question: { en: 'What is an orbit?', ur: 'مدار کیا ہے؟' },
    options: [{ en: 'A straight line', ur: 'سیدھی لکیر' }, { en: 'A curved path around a larger object', ur: 'بڑے جسم کے گرد خمیدہ راستہ' }, { en: 'A circle in space', ur: 'خلا میں دائرہ' }, { en: 'A planet surface', ur: 'سیارے کی سطح' }],
    correct: 1,
    explanation: { en: 'An orbit is a curved path around a larger object.', ur: 'مدار بڑے جسم کے گرد خمیدہ راستہ ہے۔' }
  },
  {
    question: { en: 'What creates a planet\'s day?', ur: 'سیارے کا دن کیا بناتا ہے؟' },
    options: [{ en: 'Orbit around Sun', ur: 'سورج کے گرد مدار' }, { en: 'Rotation on axis', ur: 'محور پر گردش' }, { en: 'Moon orbit', ur: 'چاند کا مدار' }, { en: 'Sun movement', ur: 'سورج کی حرکت' }],
    correct: 1,
    explanation: { en: 'Rotation on axis creates a day.', ur: 'محور پر گردش دن بناتی ہے۔' }
  },
  {
    question: { en: 'What creates a planet\'s year?', ur: 'سیارے کا سال کیا بناتا ہے؟' },
    options: [{ en: 'Rotation', ur: 'گردش' }, { en: 'One orbit around Sun', ur: 'سورج کے گرد ایک مدار' }, { en: 'Moon phases', ur: 'چاند کے مراحل' }, { en: 'Seasons', ur: 'موسم' }],
    correct: 1,
    explanation: { en: 'One orbit around Sun creates a year.', ur: 'سورج کے گرد ایک مدار سال بناتا ہے۔' }
  },
  {
    question: { en: 'Where is the asteroid belt?', ur: 'سیارچوں کی پٹی کہاں ہے؟' },
    options: [{ en: 'Earth and Mars', ur: 'زمین اور مریخ' }, { en: 'Mars and Jupiter', ur: 'مریخ اور مشتری' }, { en: 'Jupiter and Saturn', ur: 'مشتری اور زحل' }, { en: 'Saturn and Uranus', ur: 'زحل اور یورینس' }],
    correct: 1,
    explanation: { en: 'Asteroid belt is between Mars and Jupiter.', ur: 'سیارچوں کی پٹی مریخ اور مشتری کے درمیان ہے۔' }
  },
  {
    question: { en: 'What is a comet?', ur: 'دمدار ستارہ کیا ہے؟' },
    options: [{ en: 'A star', ur: 'ستارہ' }, { en: 'An icy object that can develop a tail', ur: 'برفیلا جسم جس کی دم بن سکتی ہے' }, { en: 'A planet', ur: 'سیارہ' }, { en: 'A moon', ur: 'چاند' }],
    correct: 1,
    explanation: { en: 'Comets are icy objects that can develop tails.', ur: 'دمدار ستارے برفیلے اجسام ہیں جن کی دم بن سکتی ہے۔' }
  },
  {
    question: { en: 'What is a moon?', ur: 'چاند کیا ہے؟' },
    options: [{ en: 'A star', ur: 'ستارہ' }, { en: 'A natural satellite orbiting a planet', ur: 'سیارے کے گرد قدرتی سیارہ نما' }, { en: 'A comet', ur: 'دمدار ستارہ' }, { en: 'An asteroid', ur: 'سیارچہ' }],
    correct: 1,
    explanation: { en: 'A moon is a natural satellite orbiting a planet.', ur: 'چاند سیارے کے گرد قدرتی سیارہ نما ہے۔' }
  },
  {
    question: { en: 'What is a dwarf planet?', ur: 'بونا سیارہ کیا ہے؟' },
    options: [{ en: 'A small star', ur: 'چھوٹا ستارہ' }, { en: 'Orbits Sun but has not cleared its orbit', ur: 'سورج کے گرد گردش کرتا ہے لیکن مدار صاف نہیں کیا' }, { en: 'A moon', ur: 'چاند' }, { en: 'An asteroid', ur: 'سیارچہ' }],
    correct: 1,
    explanation: { en: 'Dwarf planet orbits Sun but has not cleared its orbit.', ur: 'بونا سیارہ سورج کے گرد گردش کرتا ہے لیکن اس نے مدار صاف نہیں کیا۔' }
  },
  {
    question: { en: 'How old is the Solar System?', ur: 'نظامِ شمسی کتنا پرانا ہے؟' },
    options: [{ en: '1 billion years', ur: '۱ ارب سال' }, { en: '4.6 billion years', ur: '۴.۶ ارب سال' }, { en: '10 billion years', ur: '۱۰ ارب سال' }, { en: '100 million years', ur: '۱۰ کروڑ سال' }],
    correct: 1,
    explanation: { en: 'Solar System is about 4.6 billion years old.', ur: 'نظامِ شمسی تقریباً ۴.۶ ارب سال پرانا ہے۔' }
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
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('sslh-solar-quiz-best') || '0');
  });

  const question = quizQuestions[currentQ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowResult(true);
    if (idx === question.correct) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem('sslh-solar-quiz-best', newScore.toString());
      }
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
          {language === 'both' && <>Quiz Complete!<span className="block font-urdu mt-1" dir="rtl">کوئز مکمل!</span></>}
        </h3>
        <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
          {score} / {quizQuestions.length}
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          {language === 'en' && `Best score: ${bestScore}`}
          {language === 'ur' && <span className="font-urdu" dir="rtl">بہترین اسکور: {bestScore}</span>}
          {language === 'both' && <>Best score: {bestScore}<span className="block font-urdu mt-1" dir="rtl">بہترین اسکور: {bestScore}</span></>}
        </p>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
          {language === 'en' && `You answered ${score} out of ${quizQuestions.length} correctly.`}
          {language === 'ur' && <span className="font-urdu" dir="rtl">آپ نے {quizQuestions.length} میں سے {score} درست جواب دیے۔</span>}
          {language === 'both' && <>You answered {score} out of {quizQuestions.length} correctly.<span className="block font-urdu mt-1" dir="rtl">آپ نے {quizQuestions.length} میں سے {score} درست جواب دیے۔</span></>}
        </p>
        <button onClick={handleRetry} className="px-6 py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          {language === 'en' && 'Retry Quiz'}
          {language === 'ur' && <span className="font-urdu" dir="rtl">دوبارہ کوشش</span>}
          {language === 'both' && <>Retry Quiz<span className="block font-urdu text-sm mt-1" dir="rtl">دوبارہ کوشش</span></>}
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
          {language === 'both' && <>Question {currentQ + 1} of {quizQuestions.length}<span className="block font-urdu text-xs" dir="rtl">سوال {currentQ + 1} از {quizQuestions.length}</span></>}
        </span>
        <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
          {language === 'en' && `Score: ${score}`}
          {language === 'ur' && <span className="font-urdu" dir="rtl">اسکور: {score}</span>}
          {language === 'both' && <>Score: {score}<span className="block font-urdu text-xs" dir="rtl">اسکور: {score}</span></>}
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {language === 'en' && question.question.en}
        {language === 'ur' && <span className="font-urdu" dir="rtl">{question.question.ur}</span>}
        {language === 'both' && <>{question.question.en}<span className="block font-urdu mt-1" dir="rtl">{question.question.ur}</span></>}
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
              {language === 'both' && <>{opt.en}<span className="block font-urdu text-sm mt-0.5" dir="rtl">{opt.ur}</span></>}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: selected === question.correct ? '#10b98115' : '#ef444415', border: `1px solid ${selected === question.correct ? '#10b981' : '#ef4444'}` }}>
          <div className="flex items-center gap-2 mb-2">
            {selected === question.correct ? <CheckCircle size={20} style={{ color: '#10b981' }} /> : <XCircle size={20} style={{ color: '#ef4444' }} />}
            <span className="font-semibold" style={{ color: selected === question.correct ? '#10b981' : '#ef4444' }}>
              {selected === question.correct
                ? (language === 'en' ? 'Correct!' : language === 'ur' ? 'درست!' : 'Correct!')
                : (language === 'en' ? 'Incorrect' : language === 'ur' ? 'غلط' : 'Incorrect')}
              {language === 'both' && <span className="font-urdu ml-2" dir="rtl">{selected === question.correct ? 'درست!' : 'غلط'}</span>}
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {language === 'en' && question.explanation.en}
            {language === 'ur' && <span className="font-urdu" dir="rtl">{question.explanation.ur}</span>}
            {language === 'both' && <>{question.explanation.en}<span className="block font-urdu mt-1" dir="rtl">{question.explanation.ur}</span></>}
          </p>
        </div>
      )}

      {answered && (
        <button onClick={handleNext} className="w-full py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          {language === 'en' && (currentQ < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz')}
          {language === 'ur' && <span className="font-urdu" dir="rtl">{currentQ < quizQuestions.length - 1 ? 'اگلا سوال' : 'کوئز مکمل'}</span>}
          {language === 'both' && <>{currentQ < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}<span className="block font-urdu text-sm mt-0.5" dir="rtl">{currentQ < quizQuestions.length - 1 ? 'اگلا سوال' : 'کوئز مکمل'}</span></>}
        </button>
      )}
    </div>
  );
}

export function SolarSystemPage() {
  const { language } = useApp();
  const navigate = useNavigate();
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return <><span>{en}</span><span className="block font-urdu mt-2" dir="rtl">{ur}</span></>;
  };

  const planetFacts = [
    { en: 'Mercury is the closest planet to the Sun and the smallest of the eight planets.', ur: 'عطارد سورج کے سب سے قریب اور آٹھ سیاروں میں سب سے چھوٹا سیارہ ہے۔' },
    { en: 'Venus has a thick carbon-dioxide atmosphere that traps heat, making it the hottest planet.', ur: 'زہرہ کی گھنی کاربن ڈائی آکسائیڈ فضا حرارت کو روک لیتی ہے، جس کی وجہ سے یہ سب سے گرم سیارہ ہے۔' },
    { en: 'Earth has liquid water, a protective atmosphere and the only known life in the Solar System.', ur: 'زمین پر مائع پانی، حفاظتی فضا اور نظامِ شمسی میں معلوم واحد زندگی موجود ہے۔' },
    { en: 'Mars is known as the Red Planet because iron-rich dust gives it a reddish color.', ur: 'مریخ کو سرخ سیارہ کہا جاتا ہے کیونکہ لوہے سے بھرپور گرد اسے سرخی مائل رنگ دیتی ہے۔' },
    { en: 'Jupiter is the largest planet and has a powerful magnetic field, many moons and faint rings.', ur: 'مشتری سب سے بڑا سیارہ ہے اور اس کا مقناطیسی میدان طاقتور، کئی چاند اور مدھم حلقے ہیں۔' },
    { en: 'Saturn is famous for its bright ring system made mostly of ice particles mixed with rock and dust.', ur: 'زحل اپنے روشن حلقوں کے نظام کی وجہ سے مشہور ہے جو زیادہ تر برف کے ذرات کے ساتھ چٹان اور گرد سے بنا ہے۔' },
    { en: 'Uranus is an ice giant that rotates with an extreme tilt, appearing to roll on its side.', ur: 'یورینس ایک برفانی دیو ہے جو بہت زیادہ جھکاؤ کے ساتھ گردش کرتا ہے اور پہلو کے بل گھومتا ہوا دکھائی دیتا ہے۔' },
    { en: 'Neptune is the farthest major planet and has extremely fast winds in its atmosphere.', ur: 'نیپچون سب سے دور بڑا سیارہ ہے اور اس کی فضا میں بہت تیز ہوائیں چلتی ہیں۔' }
  ];

  return (
    <div className="space-y-12 pb-8">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {renderText('Our Solar System', 'ہمارا نظامِ شمسی')}
        </h1>
      </div>

      {/* Section 1: Hero */}
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
            alt="Solar System"
            captionEn="A simplified view of the Solar System."
            captionUr="نظامِ شمسی کا ایک سادہ منظر۔"
            credit="Educational illustration — not to scale"
          />
        </div>
      </section>

      {/* Section 2: Interactive Animation */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Watch the Solar System in Motion', 'نظامِ شمسی کو حرکت میں دیکھیں')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The planets travel around the Sun because of gravity. Each planet follows its own orbit and takes a different amount of time to complete one journey around the Sun.',
            'سیارے کششِ ثقل کی وجہ سے سورج کے گرد حرکت کرتے ہیں۔ ہر سیارہ اپنا الگ مدار رکھتا ہے اور سورج کے گرد ایک چکر مکمل کرنے میں مختلف وقت لیتا ہے۔'
          )}
        </p>
        <SolarSystem onPlanetClick={setSelectedPlanet} />
        <PlanetModal planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
      </section>

      {/* Section 3: Why Planets Orbit */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Why Do Planets Orbit the Sun?', 'سیارے سورج کے گرد کیوں گردش کرتے ہیں؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Gravity is the force that attracts objects with mass toward each other. The Sun has far more mass than any planet, so its gravity pulls planets inward. At the same time, each planet is moving forward through space. The combination of forward motion and the Sun\'s gravitational pull creates a curved path called an orbit.',
            'کششِ ثقل وہ قوت ہے جو کمیت رکھنے والے اجسام کو ایک دوسرے کی طرف کھینچتی ہے۔ سورج کی کمیت کسی بھی سیارے سے بہت زیادہ ہے، اس لیے اس کی کششِ ثقل سیاروں کو اپنی طرف کھینچتی ہے۔ اسی وقت ہر سیارہ خلا میں آگے کی سمت حرکت کر رہا ہوتا ہے۔ آگے کی حرکت اور سورج کی کششِ ثقل مل کر ایک خمیدہ راستہ بناتی ہیں جسے مدار کہتے ہیں۔'
          )}
        </p>
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {renderText('How Orbits Form', 'مدار کیسے بنتے ہیں')}
        </h3>
        <InteractiveFlowchart
          steps={[
            { en: 'Planet moves forward', ur: 'سیارہ آگے حرکت کرتا ہے' },
            { en: "Sun's gravity pulls inward", ur: 'سورج کی کششِ ثقل اندر کھینچتی ہے' },
            { en: 'Curved path forms', ur: 'خمیدہ راستہ بنتا ہے' },
            { en: 'Planet stays in orbit', ur: 'سیارہ مدار میں رہتا ہے' }
          ]}
        />
      </section>

      {/* Section 4: Eight Planets */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('The Eight Planets in Order', 'ترتیب کے ساتھ آٹھ سیارے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The planets travel around the Sun in a specific order. Mercury, Venus, Earth and Mars are the inner rocky planets. Jupiter and Saturn are gas giants. Uranus and Neptune are ice giants.',
            'سیارے سورج کے گرد ایک خاص ترتیب میں گردش کرتے ہیں۔ عطارد، زہرہ، زمین اور مریخ اندرونی پتھریلے سیارے ہیں۔ مشتری اور زحل گیس دیو ہیں۔ یورینس اور نیپچون برفانی دیو ہیں۔'
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planets.map((planet, i) => (
            <div key={planet.id} className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden" style={{ background: planet.gradient }}>
                    <img src={planet.imageUrl} alt={planet.name.en} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>{i + 1}</span>
                    <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>
                      {language === 'ur' ? planet.name.ur : planet.name.en}
                      {language === 'both' && <span className="font-urdu font-normal text-sm ml-2" dir="rtl">{planet.name.ur}</span>}
                    </h3>
                  </div>
                  <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                    {language === 'ur' ? planetFacts[i].ur : planetFacts[i].en}
                    {language === 'both' && <span className="block font-urdu mt-1" dir="rtl">{planetFacts[i].ur}</span>}
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

      {/* Section 5: Inner vs Outer */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Inner Planets and Outer Planets', 'اندرونی اور بیرونی سیارے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The inner planets are Mercury, Venus, Earth and Mars. They are rocky and have solid surfaces. The outer planets are much larger. Jupiter and Saturn are gas giants, while Uranus and Neptune are ice giants.',
            'اندرونی سیارے عطارد، زہرہ، زمین اور مریخ ہیں۔ یہ پتھریلے ہیں اور ان کی ٹھوس سطحیں ہیں۔ بیرونی سیارے بہت بڑے ہیں۔ مشتری اور زحل گیس دیو ہیں، جبکہ یورینس اور نیپچون برفانی دیو ہیں۔'
          )}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" style={{ color: 'var(--text-primary)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>
                  {language === 'en' && 'Feature'}
                  {language === 'ur' && <span className="font-urdu" dir="rtl">خصوصیت</span>}
                  {language === 'both' && <>Feature<span className="block font-urdu text-xs" dir="rtl">خصوصیت</span></>}
                </th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>
                  {language === 'en' && 'Inner Planets'}
                  {language === 'ur' && <span className="font-urdu" dir="rtl">اندرونی سیارے</span>}
                  {language === 'both' && <>Inner Planets<span className="block font-urdu text-xs" dir="rtl">اندرونی سیارے</span></>}
                </th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>
                  {language === 'en' && 'Outer Planets'}
                  {language === 'ur' && <span className="font-urdu" dir="rtl">بیرونی سیارے</span>}
                  {language === 'both' && <>Outer Planets<span className="block font-urdu text-xs" dir="rtl">بیرونی سیارے</span></>}
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { en: ['Planets', 'Mercury, Venus, Earth, Mars', 'Jupiter, Saturn, Uranus, Neptune'], ur: ['سیارے', 'عطارد، زہرہ، زمین، مریخ', 'مشتری، زحل، یورینس، نیپچون'] },
                { en: ['Type', 'Rocky', 'Gas/Ice giants'], ur: ['قسم', 'پتھریلے', 'گیس/برفانی دیو'] },
                { en: ['Surface', 'Solid', 'No solid surface'], ur: ['سطح', 'ٹھوس', 'کوئی ٹھوس سطح نہیں'] },
                { en: ['Size', 'Smaller', 'Much larger'], ur: ['سائز', 'چھوٹے', 'بہت بڑے'] }
              ].map((row, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-muted)' }}>
                  <td className="p-3 border font-medium" style={{ borderColor: 'var(--border)' }}>
                    {language === 'en' && row.en[0]}
                    {language === 'ur' && <span className="font-urdu" dir="rtl">{row.ur[0]}</span>}
                    {language === 'both' && <>{row.en[0]}<span className="block font-urdu text-xs" dir="rtl">{row.ur[0]}</span></>}
                  </td>
                  <td className="p-3 border" style={{ borderColor: 'var(--border)' }}>
                    {language === 'en' && row.en[1]}
                    {language === 'ur' && <span className="font-urdu" dir="rtl">{row.ur[1]}</span>}
                    {language === 'both' && <>{row.en[1]}<span className="block font-urdu text-xs" dir="rtl">{row.ur[1]}</span></>}
                  </td>
                  <td className="p-3 border" style={{ borderColor: 'var(--border)' }}>
                    {language === 'en' && row.en[2]}
                    {language === 'ur' && <span className="font-urdu" dir="rtl">{row.ur[2]}</span>}
                    {language === 'both' && <>{row.en[2]}<span className="block font-urdu text-xs" dir="rtl">{row.ur[2]}</span></>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 6: Day and Year */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Why Do Planets Have Different Days and Years?', 'سیاروں کے دن اور سال مختلف کیوں ہوتے ہیں؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'A planet\'s day is the time it takes to rotate once on its axis. A planet\'s year is the time it takes to complete one orbit around the Sun.',
            'کسی سیارے کا دن وہ وقت ہے جو اسے اپنے محور کے گرد ایک چکر مکمل کرنے میں لگتا ہے۔ کسی سیارے کا سال وہ وقت ہے جو اسے سورج کے گرد ایک چکر مکمل کرنے میں لگتا ہے۔'
          )}
        </p>
        <InteractiveFlowchart
          steps={[
            { en: 'Planet rotation', ur: 'سیارے کی گردش' },
            { en: 'One complete spin', ur: 'ایک مکمل چکر' },
            { en: 'Length of day', ur: 'دن کی مدت' }
          ]}
        />
        <div className="mt-4 p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('Earth Example', 'زمین کی مثال')}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'Earth rotation ≈ 24 hours (one day)',
              'زمین کی گردش ≈ ۲۴ گھنٹے (ایک دن)'
            )}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'Earth orbit ≈ 365.25 days (one year)',
              'زمین کا مدار ≈ ۳۶۵.۲۵ دن (ایک سال)'
            )}
          </p>
        </div>
      </section>

      {/* Section 7: Other Objects */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('More Than Just Planets', 'سیاروں کے علاوہ بھی بہت کچھ')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: { en: 'Moons', ur: 'چاند' }, desc: { en: 'Moons are natural satellites that orbit planets.', ur: 'چاند قدرتی سیارہ نما ہیں جو سیاروں کے گرد گردش کرتے ہیں۔' } },
            { title: { en: 'Asteroids', ur: 'سیارچے' }, desc: { en: 'Asteroids are rocky objects that orbit the Sun.', ur: 'سیارچے پتھریلے اجسام ہیں جو سورج کے گرد گردش کرتے ہیں۔' } },
            { title: { en: 'Comets', ur: 'دمدار ستارے' }, desc: { en: 'Comets are icy objects that can develop tails near the Sun.', ur: 'دمدار ستارے برفیلے اجسام ہیں جو سورج کے قریب دم بنا سکتے ہیں۔' } },
            { title: { en: 'Dwarf Planets', ur: 'بونے سیارے' }, desc: { en: 'Dwarf planets orbit the Sun but have not cleared their orbit.', ur: 'بونے سیارے سورج کے گرد گردش کرتے ہیں لیکن انہوں نے اپنا مدار صاف نہیں کیا۔' } }
          ].map((item, i) => (
            <div key={i} className="rounded-lg p-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {language === 'en' && item.title.en}
                {language === 'ur' && <span className="font-urdu" dir="rtl">{item.title.ur}</span>}
                {language === 'both' && <>{item.title.en}<span className="block font-urdu text-sm mt-1" dir="rtl">{item.title.ur}</span></>}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {language === 'en' && item.desc.en}
                {language === 'ur' && <span className="font-urdu" dir="rtl">{item.desc.ur}</span>}
                {language === 'both' && <>{item.desc.en}<span className="block font-urdu mt-1" dir="rtl">{item.desc.ur}</span></>}
              </p>
            </div>
          ))}
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
            'Simplified scientific formation model.',
            'نظامِ شمسی کی تشکیل کا سادہ سائنسی نمونہ۔'
          )}
        </p>
        <InteractiveFlowchart
          steps={[
            { en: 'Giant cloud of gas and dust', ur: 'گیس اور گرد کا بہت بڑا بادل' },
            { en: 'Gravity pulls inward', ur: 'کششِ ثقل اندر کھینچتی ہے' },
            { en: 'Young Sun forms', ur: 'نوجوان سورج بنتا ہے' },
            { en: 'Spinning disk forms', ur: 'گھومتی قرص بنتی ہے' },
            { en: 'Particles collide', ur: 'ذرات ٹکراتے ہیں' },
            { en: 'Planets form', ur: 'سیارے بنتے ہیں' }
          ]}
        />
      </section>

      {/* Section 9: Image Carousel */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Solar System Image Gallery', 'نظامِ شمسی کی تصاویر')}
        </h2>
        <ImageCarousel />
      </section>

      {/* Section 10: Fun Facts */}
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
            { en: 'Mars has two small moons.', ur: 'مریخ کے دو چھوٹے چاند ہیں۔' },
            { en: 'Jupiter is the largest planet.', ur: 'مشتری سب سے بڑا سیارہ ہے۔' },
            { en: 'Saturn has a bright ring system.', ur: 'زحل کے روشن حلقے ہیں۔' },
            { en: 'Uranus rotates with a strong tilt.', ur: 'یورینس بہت زیادہ جھکاؤ کے ساتھ گردش کرتا ہے۔' },
            { en: 'Neptune is the farthest major planet.', ur: 'نیپچون سب سے دور بڑا سیارہ ہے۔' },
            { en: 'A planet\'s day and year are different measurements.', ur: 'سیارے کا دن اور سال الگ پیمائشیں ہیں۔' },
            { en: 'Gravity helps keep planets in orbit.', ur: 'کششِ ثقل سیاروں کو مدار میں رکھتی ہے۔' },
            { en: 'The asteroid belt lies between Mars and Jupiter.', ur: 'سیارچوں کی پٹی مریخ اور مشتری کے درمیان ہے۔' },
            { en: 'Comets can develop tails near the Sun.', ur: 'دمدار ستارے سورج کے قریب دم بنا سکتے ہیں۔' },
            { en: 'Dwarf planets orbit the Sun but have not cleared their orbit.', ur: 'بونے سیارے سورج کے گرد گردش کرتے ہیں لیکن مدار صاف نہیں کیا۔' },
            { en: 'The Solar System formed about 4.6 billion years ago.', ur: 'نظامِ شمسی تقریباً ۴.۶ ارب سال پہلے بنا۔' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {language === 'en' && fact.en}
              {language === 'ur' && <span className="font-urdu" dir="rtl">{fact.ur}</span>}
              {language === 'both' && <>{fact.en}<span className="block font-urdu text-xs mt-1" dir="rtl">{fact.ur}</span></>}
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
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {source}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
