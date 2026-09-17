import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { SolarSystem } from '../components/SolarSystem';
import { PlanetModal } from '../components/PlanetModal';
import { planets, PlanetData } from '../data/planets';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Play, Pause, ArrowRight, RotateCw, Orbit } from 'lucide-react';

// ============================================
// INTERACTIVE FLOWCHART COMPONENT
// ============================================
function InteractiveFlowchart({ steps }: { steps: { en: string; ur: string }[] }) {
  const { language } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="my-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-2 md:gap-1">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <button
              onClick={() => setActiveStep(i)}
              className={`relative px-4 py-3 rounded-lg text-sm font-medium text-center transition-all min-w-[120px] flex-1 ${
                activeStep === i ? 'ring-2 ring-blue-500 ring-offset-2' : ''
              }`}
              style={{
                backgroundColor: activeStep === i ? 'var(--accent)' : 'var(--surface)',
                color: activeStep === i ? '#fff' : 'var(--text-primary)',
                border: `2px solid ${activeStep === i ? 'var(--accent)' : 'var(--border)'}`,
                boxShadow: activeStep === i ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              <div className="text-xs opacity-70 mb-1">Step {i + 1}</div>
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
              <div className="hidden md:flex items-center justify-center px-1">
                <ArrowRight size={20} style={{ color: 'var(--accent)' }} />
              </div>
            )}
            {i < steps.length - 1 && (
              <div className="md:hidden flex justify-center py-1">
                <div className="w-0.5 h-4" style={{ backgroundColor: 'var(--accent)' }} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-lg text-center text-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
        {language === 'en' && steps[activeStep].en}
        {language === 'ur' && <span className="font-urdu" dir="rtl">{steps[activeStep].ur}</span>}
        {language === 'both' && (
          <>
            {steps[activeStep].en}
            <span className="block font-urdu mt-1" dir="rtl">{steps[activeStep].ur}</span>
          </>
        )}
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

// ============================================
// IMAGE CARD COMPONENT WITH FALLBACK
// ============================================
function ImageCard({ src, alt, captionEn, captionUr, credit, fallbackGradient }: {
  src: string;
  alt: string;
  captionEn: string;
  captionUr: string;
  credit: string;
  fallbackGradient?: string;
}) {
  const { language } = useApp();
  const [imgError, setImgError] = useState(false);

  return (
    <figure className="rounded-xl overflow-hidden border my-4" style={{ borderColor: 'var(--border)' }}>
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 min-h-[200px] flex items-center justify-center overflow-hidden">
        {!imgError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-auto max-h-[400px] object-contain"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="p-8 text-center w-full h-full flex flex-col items-center justify-center" style={{ background: fallbackGradient || 'radial-gradient(circle at 40% 40%, #4a90d9, #1a5276, #0a2a4a)' }}>
            <div className="w-32 h-32 rounded-full mb-4" style={{ background: fallbackGradient || 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 40%, #2d6b3f 60%, #1a3a5c)' }} />
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {language === 'en' && 'Educational diagram'}
              {language === 'ur' && <span className="font-urdu" dir="rtl">تعلیمی خاکہ</span>}
              {language === 'both' && <>Educational diagram<br /><span className="font-urdu" dir="rtl">تعلیمی خاکہ</span></>}
            </p>
          </div>
        )}
      </div>
      <figcaption className="p-3 text-center text-xs" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-secondary)' }}>
        {language === 'en' && <p className="font-medium">{captionEn}</p>}
        {language === 'ur' && <p className="font-urdu font-medium" dir="rtl">{captionUr}</p>}
        {language === 'both' && (
          <>
            <p className="font-medium">{captionEn}</p>
            <p className="font-urdu mt-1" dir="rtl">{captionUr}</p>
          </>
        )}
        <p className="mt-1 opacity-70">{credit}</p>
      </figcaption>
    </figure>
  );
}

// ============================================
// IMAGE CAROUSEL COMPONENT
// ============================================
function ImageCarousel() {
  const { language } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());
  const touchStartX = useRef(0);

  const slides = [
    { src: 'https://images-assets.nasa.gov/image/PIA17463/PIA17463~medium.jpg', captionEn: 'The Sun — our nearest star', captionUr: 'سورج — ہمارا قریب ترین ستارہ', credit: 'NASA/SDO', gradient: 'radial-gradient(circle, #fff7a0, #ff8c00, #cc2200)' },
    { src: 'https://images-assets.nasa.gov/image/PIA21188/PIA21188~medium.jpg', captionEn: 'Mercury — closest to the Sun', captionUr: 'عطارد — سورج کے سب سے قریب', credit: 'NASA/MESSENGER', gradient: 'radial-gradient(circle at 35% 35%, #b8a898, #8c7e6d 40%, #3d352c)' },
    { src: 'https://images-assets.nasa.gov/image/PIA23792/PIA23792~medium.jpg', captionEn: 'Venus — the hottest planet', captionUr: 'زہرہ — سب سے گرم سیارہ', credit: 'NASA/JPL', gradient: 'radial-gradient(circle at 35% 35%, #f5e6a8, #e8c468 35%, #8b6914)' },
    { src: 'https://images-assets.nasa.gov/image/PIA18033/PIA18033~medium.jpg', captionEn: 'Earth — our home world', captionUr: 'زمین — ہماری دنیا', credit: 'NASA/NOAA', gradient: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' },
    { src: 'https://images-assets.nasa.gov/image/PIA22974/PIA22974~medium.jpg', captionEn: 'Mars — the Red Planet', captionUr: 'مریخ — سرخ سیارہ', credit: 'NASA/MSSS', gradient: 'radial-gradient(circle at 35% 35%, #e8845a, #c1440e 40%, #5c1800)' },
    { src: 'https://images-assets.nasa.gov/image/PIA00777/PIA00777~medium.jpg', captionEn: 'Asteroid belt region', captionUr: 'سیارچوں کی پٹی کا علاقہ', credit: 'NASA/Galileo', gradient: 'radial-gradient(circle, #8b7355, #5a4a3a, #2d2520)' },
    { src: 'https://images-assets.nasa.gov/image/PIA21774/PIA21774~medium.jpg', captionEn: 'Jupiter — the largest planet', captionUr: 'مشتری — سب سے بڑا سیارہ', credit: 'NASA/Juno', gradient: 'radial-gradient(ellipse at 40% 40%, #f0d8a8, #c88b3a 25%, #6b4010)' },
    { src: 'https://images-assets.nasa.gov/image/PIA20029/PIA20029~medium.jpg', captionEn: 'Saturn and its rings', captionUr: 'زحل اور اس کے حلقے', credit: 'NASA/Cassini', gradient: 'radial-gradient(ellipse at 40% 40%, #f5ecc8, #e8d088 30%, #786020)' },
    { src: 'https://images-assets.nasa.gov/image/PIA01464/PIA01464~medium.jpg', captionEn: 'Uranus — the tilted ice giant', captionUr: 'یورینس — جھکا ہوا برفانی دیو', credit: 'NASA/Voyager 2', gradient: 'radial-gradient(circle at 35% 35%, #b8e8f0, #7ec8e3 40%, #2a6888)' },
    { src: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~medium.jpg', captionEn: 'Neptune — the farthest major planet', captionUr: 'نیپچون — سب سے دور بڑا سیارہ', credit: 'NASA/Voyager 2', gradient: 'radial-gradient(circle at 35% 35%, #6688ee, #3355cc 40%, #112266)' },
    { src: 'https://images-assets.nasa.gov/image/PIA00465/PIA00465~medium.jpg', captionEn: "Earth's Moon", captionUr: 'زمین کا چاند', credit: 'NASA/Apollo', gradient: 'radial-gradient(circle at 35% 35%, #d4d4d4, #a0a0a0 40%, #505050)' },
    { src: 'https://images-assets.nasa.gov/image/PIA00777/PIA00777~medium.jpg', captionEn: 'Asteroid — rocky space object', captionUr: 'سیارچہ — خلائی پتھریلا جسم', credit: 'NASA/Galileo', gradient: 'radial-gradient(circle at 35% 35%, #a08060, #6b5040 40%, #3d2d20)' },
    { src: 'https://images-assets.nasa.gov/image/PIA00745/PIA00745~medium.jpg', captionEn: 'Comet — icy traveler', captionUr: 'دمدار ستارہ — برفیلا مسافر', credit: 'NASA/Hubble', gradient: 'radial-gradient(circle at 30% 30%, #e0e8ff, #8090c0 40%, #203060)' },
    { src: 'https://images-assets.nasa.gov/image/PIA01482/PIA01482~medium.jpg', captionEn: 'Pluto — dwarf planet', captionUr: 'پلوٹو — بونا سیارہ', credit: 'NASA/New Horizons', gradient: 'radial-gradient(circle at 35% 35%, #d4c4a8, #a08868 40%, #504030)' },
    { src: 'https://images-assets.nasa.gov/image/PIA21474/PIA21474~medium.jpg', captionEn: 'Solar System overview diagram', captionUr: 'نظامِ شمسی کا جائزہ خاکہ', credit: 'NASA — Educational illustration', gradient: 'radial-gradient(circle at 40% 40%, #ffcc00, #ff8c00 30%, #1a3a5c 70%, #0a0e27)' },
    { src: 'https://images-assets.nasa.gov/image/PIA18033/PIA18033~medium.jpg', captionEn: 'Full Solar System — educational view', captionUr: 'مکمل نظامِ شمسی — تعلیمی منظر', credit: 'Educational diagram — not to scale', gradient: 'radial-gradient(circle at 40% 40%, #ffcc00, #4a90d9 30%, #0a0e27 70%)' }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
      if (e.key === 'ArrowRight') setCurrentSlide((p) => (p + 1) % slides.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
  };

  const hasError = imgErrors.has(currentSlide);

  return (
    <div className="rounded-xl overflow-hidden border my-6" style={{ borderColor: 'var(--border)' }}>
      <div
        className="relative bg-gradient-to-br from-slate-900 to-black min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {!hasError ? (
          <img
            key={currentSlide}
            src={slides[currentSlide].src}
            alt={slides[currentSlide].captionEn}
            className="w-full h-full max-h-[400px] object-contain"
            onError={() => setImgErrors(prev => new Set(prev).add(currentSlide))}
            loading="lazy"
          />
        ) : (
          <div className="p-8 text-center w-full h-full min-h-[300px] flex flex-col items-center justify-center" style={{ background: slides[currentSlide].gradient }}>
            <div className="w-40 h-40 rounded-full mb-4 opacity-80" style={{ background: slides[currentSlide].gradient }} />
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {language === 'en' && 'Educational diagram'}
              {language === 'ur' && <span className="font-urdu" dir="rtl">تعلیمی خاکہ</span>}
              {language === 'both' && <>Educational diagram<br /><span className="font-urdu" dir="rtl">تعلیمی خاکہ</span></>}
            </p>
          </div>
        )}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="p-4" style={{ backgroundColor: 'var(--surface-muted)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            {currentSlide + 1} / {slides.length}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
        <p className="text-sm text-center font-medium" style={{ color: 'var(--text-primary)' }}>
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
        <div className="flex justify-center gap-1.5 mt-3 flex-wrap">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="w-2.5 h-2.5 rounded-full transition-all"
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

// ============================================
// ROTATION VS ORBIT ANIMATION
// ============================================
function DayYearAnimation() {
  const { language } = useApp();
  const [mode, setMode] = useState<'rotation' | 'orbit'>('rotation');

  return (
    <div className="my-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
      <div className="flex gap-2 mb-4 justify-center">
        <button
          onClick={() => setMode('rotation')}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            backgroundColor: mode === 'rotation' ? 'var(--accent)' : 'var(--surface)',
            color: mode === 'rotation' ? '#fff' : 'var(--text-primary)',
            border: `1px solid ${mode === 'rotation' ? 'var(--accent)' : 'var(--border)'}`
          }}
        >
          {language === 'en' && 'Rotation'}
          {language === 'ur' && <span className="font-urdu" dir="rtl">محوری گردش</span>}
          {language === 'both' && <>Rotation<span className="block font-urdu text-xs" dir="rtl">محوری گردش</span></>}
        </button>
        <button
          onClick={() => setMode('orbit')}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            backgroundColor: mode === 'orbit' ? 'var(--accent)' : 'var(--surface)',
            color: mode === 'orbit' ? '#fff' : 'var(--text-primary)',
            border: `1px solid ${mode === 'orbit' ? 'var(--accent)' : 'var(--border)'}`
          }}
        >
          {language === 'en' && 'Orbit'}
          {language === 'ur' && <span className="font-urdu" dir="rtl">مداری گردش</span>}
          {language === 'both' && <>Orbit<span className="block font-urdu text-xs" dir="rtl">مداری گردش</span></>}
        </button>
      </div>
      <div className="flex justify-center">
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          {mode === 'orbit' && (
            <>
              {/* Sun */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00 60%, #ff4500)', boxShadow: '0 0 20px #ff8c00' }} />
              {/* Orbit path */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52 rounded-full border border-blue-400/30" />
              {/* Earth orbiting */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52" style={{ animation: 'orbit 8s linear infinite' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
              </div>
            </>
          )}
          {mode === 'rotation' && (
            <>
              {/* Earth spinning */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #4a90d9 70%, #1a3a5c)', animation: 'orbit 3s linear infinite', boxShadow: '0 0 15px rgba(74, 144, 217, 0.3)' }} />
              {/* Axis line */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-32 md:h-40" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.5 }} />
            </>
          )}
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {mode === 'rotation'
            ? (language === 'en' ? 'Earth rotation ≈ 24 hours' : language === 'ur' ? 'زمین کی گردش ≈ ۲۴ گھنٹے' : 'Earth rotation ≈ 24 hours')
            : (language === 'en' ? 'Earth orbit ≈ 365.25 days' : language === 'ur' ? 'زمین کا مدار ≈ ۳۶۵.۲۵ دن' : 'Earth orbit ≈ 365.25 days')
          }
          {language === 'both' && (
            <span className="block font-urdu text-sm mt-1" dir="rtl">
              {mode === 'rotation' ? 'زمین کی گردش ≈ ۲۴ گھنٹے' : 'زمین کا مدار ≈ ۳۶۵.۲۵ دن'}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

// ============================================
// QUIZ COMPONENT (18 questions)
// ============================================
interface QuizQuestion {
  question: { en: string; ur: string };
  options: { en: string; ur: string }[];
  correct: number;
  explanation: { en: string; ur: string };
}

const quizQuestions: QuizQuestion[] = [
  { question: { en: 'What is at the center of the Solar System?', ur: 'نظامِ شمسی کے مرکز میں کیا ہے؟' }, options: [{ en: 'Earth', ur: 'زمین' }, { en: 'The Sun', ur: 'سورج' }, { en: 'Jupiter', ur: 'مشتری' }, { en: 'The Moon', ur: 'چاند' }], correct: 1, explanation: { en: 'The Sun is at the center of the Solar System.', ur: 'سورج نظامِ شمسی کے مرکز میں ہے۔' } },
  { question: { en: 'How many recognized planets are there?', ur: 'کتنے تسلیم شدہ سیارے ہیں؟' }, options: [{ en: '7', ur: '۷' }, { en: '8', ur: '۸' }, { en: '9', ur: '۹' }, { en: '10', ur: '۱۰' }], correct: 1, explanation: { en: 'There are 8 recognized planets.', ur: '۸ تسلیم شدہ سیارے ہیں۔' } },
  { question: { en: 'Which planet is closest to the Sun?', ur: 'سورج کے سب سے قریب کون سا سیارہ ہے؟' }, options: [{ en: 'Venus', ur: 'زہرہ' }, { en: 'Earth', ur: 'زمین' }, { en: 'Mercury', ur: 'عطارد' }, { en: 'Mars', ur: 'مریخ' }], correct: 2, explanation: { en: 'Mercury is closest to the Sun.', ur: 'عطارد سورج کے سب سے قریب ہے۔' } },
  { question: { en: 'Which is the hottest planet?', ur: 'سب سے گرم سیارہ کون سا ہے؟' }, options: [{ en: 'Mercury', ur: 'عطارد' }, { en: 'Venus', ur: 'زہرہ' }, { en: 'Earth', ur: 'زمین' }, { en: 'Mars', ur: 'مریخ' }], correct: 1, explanation: { en: 'Venus is hottest due to its thick atmosphere.', ur: 'زہرہ اپنی گھنی فضا کی وجہ سے سب سے گرم ہے۔' } },
  { question: { en: 'Correct order of inner planets?', ur: 'اندرونی سیاروں کی درست ترتیب؟' }, options: [{ en: 'Mars, Earth, Venus, Mercury', ur: 'مریخ، زمین، زہرہ، عطارد' }, { en: 'Mercury, Venus, Earth, Mars', ur: 'عطارد، زہرہ، زمین، مریخ' }, { en: 'Earth, Mars, Jupiter, Saturn', ur: 'زمین، مریخ، مشتری، زحل' }, { en: 'Venus, Mercury, Mars, Earth', ur: 'زہرہ، عطارد، مریخ، زمین' }], correct: 1, explanation: { en: 'Inner planets: Mercury, Venus, Earth, Mars.', ur: 'اندرونی سیارے: عطارد، زہرہ، زمین، مریخ۔' } },
  { question: { en: 'Which are the gas giants?', ur: 'گیس دیو کون سے ہیں؟' }, options: [{ en: 'Earth and Mars', ur: 'زمین اور مریخ' }, { en: 'Jupiter and Saturn', ur: 'مشتری اور زحل' }, { en: 'Uranus and Neptune', ur: 'یورینس اور نیپچون' }, { en: 'Mercury and Venus', ur: 'عطارد اور زہرہ' }], correct: 1, explanation: { en: 'Jupiter and Saturn are gas giants.', ur: 'مشتری اور زحل گیس دیو ہیں۔' } },
  { question: { en: 'Which are the ice giants?', ur: 'برفانی دیو کون سے ہیں؟' }, options: [{ en: 'Jupiter and Saturn', ur: 'مشتری اور زحل' }, { en: 'Earth and Mars', ur: 'زمین اور مریخ' }, { en: 'Uranus and Neptune', ur: 'یورینس اور نیپچون' }, { en: 'Mercury and Venus', ur: 'عطارد اور زہرہ' }], correct: 2, explanation: { en: 'Uranus and Neptune are ice giants.', ur: 'یورینس اور نیپچون برفانی دیو ہیں۔' } },
  { question: { en: 'Why do planets orbit the Sun?', ur: 'سیارے سورج کے گرد کیوں گردش کرتے ہیں؟' }, options: [{ en: 'Because of wind', ur: 'ہوا کی وجہ سے' }, { en: 'Because of gravity', ur: 'کششِ ثقل کی وجہ سے' }, { en: 'Because of light', ur: 'روشنی کی وجہ سے' }, { en: 'Because of magnetism', ur: 'مقناطیسیت کی وجہ سے' }], correct: 1, explanation: { en: "Gravity keeps planets in orbit around the Sun.", ur: 'کششِ ثقل سیاروں کو سورج کے گرد مدار میں رکھتی ہے۔' } },
  { question: { en: 'What is gravity?', ur: 'کششِ ثقل کیا ہے؟' }, options: [{ en: 'A type of light', ur: 'روشنی کی قسم' }, { en: 'A force between objects with mass', ur: 'کمیت والے اجسام کے درمیان قوت' }, { en: 'A type of energy', ur: 'توانائی کی قسم' }, { en: 'A planet movement', ur: 'سیارے کی حرکت' }], correct: 1, explanation: { en: 'Gravity is the force that attracts objects with mass.', ur: 'کششِ ثقل وہ قوت ہے جو کمیت والے اجسام کو کھینچتی ہے۔' } },
  { question: { en: 'What is an orbit?', ur: 'مدار کیا ہے؟' }, options: [{ en: 'A straight line in space', ur: 'خلا میں سیدھی لکیر' }, { en: 'A curved path around a larger object', ur: 'بڑے جسم کے گرد خمیدہ راستہ' }, { en: 'A planet surface', ur: 'سیارے کی سطح' }, { en: 'A type of star', ur: 'ستارے کی قسم' }], correct: 1, explanation: { en: 'An orbit is a curved path around a larger object.', ur: 'مدار بڑے جسم کے گرد خمیدہ راستہ ہے۔' } },
  { question: { en: 'Difference between rotation and revolution?', ur: 'گردش اور مدار میں کیا فرق ہے؟' }, options: [{ en: 'They are the same', ur: 'دونوں ایک ہی ہیں' }, { en: 'Rotation is spinning on axis, revolution is orbiting', ur: 'گردش محور پر گھومنا ہے، مدار سورج کے گرد ہے' }, { en: 'Rotation is for moons only', ur: 'گردش صرف چاند کے لیے ہے' }, { en: 'Revolution is faster', ur: 'مدار تیز ہے' }], correct: 1, explanation: { en: 'Rotation is spinning on axis; revolution is orbiting another body.', ur: 'گردش محور پر گھومنا ہے؛ مدار دوسرے جسم کے گرد ہے۔' } },
  { question: { en: 'What creates a day?', ur: 'دن کیا بناتا ہے؟' }, options: [{ en: 'Orbit around Sun', ur: 'سورج کے گرد مدار' }, { en: 'Rotation on axis', ur: 'محور پر گردش' }, { en: 'Moon phases', ur: 'چاند کے مراحل' }, { en: 'Seasons', ur: 'موسم' }], correct: 1, explanation: { en: 'Rotation on axis creates a day.', ur: 'محور پر گردش دن بناتی ہے۔' } },
  { question: { en: 'What creates a year?', ur: 'سال کیا بناتا ہے؟' }, options: [{ en: 'Rotation', ur: 'گردش' }, { en: 'One orbit around Sun', ur: 'سورج کے گرد ایک مدار' }, { en: 'Moon orbit', ur: 'چاند کا مدار' }, { en: 'Planet tilt', ur: 'سیارے کا جھکاؤ' }], correct: 1, explanation: { en: 'One complete orbit around the Sun creates a year.', ur: 'سورج کے گرد ایک مکمل مدار سال بناتا ہے۔' } },
  { question: { en: 'Where is the asteroid belt?', ur: 'سیارچوں کی پٹی کہاں ہے؟' }, options: [{ en: 'Between Earth and Mars', ur: 'زمین اور مریخ کے درمیان' }, { en: 'Between Mars and Jupiter', ur: 'مریخ اور مشتری کے درمیان' }, { en: 'Between Jupiter and Saturn', ur: 'مشتری اور زحل کے درمیان' }, { en: 'Beyond Neptune', ur: 'نیپچون سے آگے' }], correct: 1, explanation: { en: 'The asteroid belt is mainly between Mars and Jupiter.', ur: 'سیارچوں کی پٹی زیادہ تر مریخ اور مشتری کے درمیان ہے۔' } },
  { question: { en: 'What is a comet?', ur: 'دمدار ستارہ کیا ہے؟' }, options: [{ en: 'A small star', ur: 'چھوٹا ستارہ' }, { en: 'An icy object that can develop a tail', ur: 'برفیلا جسم جس کی دم بن سکتی ہے' }, { en: 'A type of planet', ur: 'سیارے کی قسم' }, { en: 'A moon', ur: 'چاند' }], correct: 1, explanation: { en: 'Comets are icy objects that develop tails near the Sun.', ur: 'دمدار ستارے برفیلے اجسام ہیں جو سورج کے قریب دم بناتے ہیں۔' } },
  { question: { en: 'What is a moon?', ur: 'چاند کیا ہے؟' }, options: [{ en: 'A star', ur: 'ستارہ' }, { en: 'A natural satellite orbiting a planet', ur: 'سیارے کے گرد قدرتی سیارہ نما' }, { en: 'An asteroid', ur: 'سیارچہ' }, { en: 'A comet', ur: 'دمدار ستارہ' }], correct: 1, explanation: { en: 'A moon is a natural satellite orbiting a planet.', ur: 'چاند سیارے کے گرد قدرتی سیارہ نما ہے۔' } },
  { question: { en: 'What is a dwarf planet?', ur: 'بونا سیارہ کیا ہے؟' }, options: [{ en: 'A small star', ur: 'چھوٹا ستارہ' }, { en: 'Orbits Sun but has not cleared its orbit', ur: 'سورج کے گرد گردش کرتا ہے لیکن مدار صاف نہیں کیا' }, { en: 'A large moon', ur: 'بڑا چاند' }, { en: 'An asteroid', ur: 'سیارچہ' }], correct: 1, explanation: { en: 'A dwarf planet orbits the Sun but has not cleared its orbital neighborhood.', ur: 'بونا سیارہ سورج کے گرد گردش کرتا ہے لیکن اس نے مداری علاقہ صاف نہیں کیا۔' } },
  { question: { en: 'How old is the Solar System?', ur: 'نظامِ شمسی کتنا پرانا ہے؟' }, options: [{ en: '1 billion years', ur: '۱ ارب سال' }, { en: '4.6 billion years', ur: '۴.۶ ارب سال' }, { en: '10 billion years', ur: '۱۰ ارب سال' }, { en: '100 million years', ur: '۱۰ کروڑ سال' }], correct: 1, explanation: { en: 'The Solar System formed about 4.6 billion years ago.', ur: 'نظامِ شمسی تقریباً ۴.۶ ارب سال پہلے بنا۔' } }
];

function Quiz() {
  const { language } = useApp();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [bestScore, setBestScore] = useState(() => parseInt(localStorage.getItem('sslh-solar-quiz-best') || '0'));

  const question = quizQuestions[currentQ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowResult(true);
    setAnswers([...answers, idx]);
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
    setAnswers([]);
  };

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return <>{en}<span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
  };

  if (finished) {
    const incorrect = quizQuestions.length - score;
    return (
      <div className="rounded-xl p-6 border text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Quiz Complete!', 'کوئز مکمل!')}
        </h3>
        <div className="text-5xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
          {score} / {quizQuestions.length}
        </div>
        <div className="flex justify-center gap-6 my-4">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{score}</div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{language === 'ur' ? 'درست' : 'Correct'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: '#ef4444' }}>{incorrect}</div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{language === 'ur' ? 'غلط' : 'Incorrect'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{bestScore}</div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{language === 'ur' ? 'بہترین' : 'Best'}</div>
          </div>
        </div>
        <button onClick={handleRetry} className="px-6 py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          {renderText('Retry Quiz', 'دوبارہ کوشش')}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {renderText(`Question ${currentQ + 1} of ${quizQuestions.length}`, `سوال ${currentQ + 1} از ${quizQuestions.length}`)}
        </span>
        <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
          {renderText(`Score: ${score}`, `اسکور: ${score}`)}
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {renderText(question.question.en, question.question.ur)}
      </h3>
      <div className="space-y-2 mb-4">
        {question.options.map((opt, idx) => {
          let style: React.CSSProperties = { backgroundColor: 'var(--surface-muted)', borderColor: 'var(--border)', color: 'var(--text-primary)' };
          if (showResult) {
            if (idx === question.correct) style = { backgroundColor: '#10b98120', borderColor: '#10b981', color: '#10b981' };
            else if (idx === selected && idx !== question.correct) style = { backgroundColor: '#ef444420', borderColor: '#ef4444', color: '#ef4444' };
          }
          return (
            <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered} className="w-full text-left px-4 py-3 rounded-lg border transition-colors" style={style}>
              {renderText(opt.en, opt.ur)}
            </button>
          );
        })}
      </div>
      {showResult && (
        <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: selected === question.correct ? '#10b98115' : '#ef444415', border: `1px solid ${selected === question.correct ? '#10b981' : '#ef4444'}` }}>
          <div className="flex items-center gap-2 mb-2">
            {selected === question.correct ? <CheckCircle size={20} style={{ color: '#10b981' }} /> : <XCircle size={20} style={{ color: '#ef4444' }} />}
            <span className="font-semibold" style={{ color: selected === question.correct ? '#10b981' : '#ef4444' }}>
              {selected === question.correct ? renderText('Correct!', 'درست!') : renderText('Incorrect. Here is the correct answer.', 'یہ جواب درست نہیں ہے۔ درست جواب یہ ہے۔')}
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {renderText(question.explanation.en, question.explanation.ur)}
          </p>
        </div>
      )}
      {answered && (
        <button onClick={handleNext} className="w-full py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          {renderText(currentQ < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz', currentQ < quizQuestions.length - 1 ? 'اگلا سوال' : 'کوئز مکمل')}
        </button>
      )}
    </div>
  );
}

// ============================================
// MAIN SOLAR SYSTEM PAGE
// ============================================
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

  const planetTypes = [
    { en: 'Rocky planet', ur: 'پتھریلا سیارہ' },
    { en: 'Rocky planet', ur: 'پتھریلا سیارہ' },
    { en: 'Rocky planet', ur: 'پتھریلا سیارہ' },
    { en: 'Rocky planet', ur: 'پتھریلا سیارہ' },
    { en: 'Gas giant', ur: 'گیس دیو' },
    { en: 'Gas giant', ur: 'گیس دیو' },
    { en: 'Ice giant', ur: 'برفانی دیو' },
    { en: 'Ice giant', ur: 'برفانی دیو' }
  ];

  return (
    <div className="space-y-12 pb-8">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {renderText('Our Solar System', 'ہمارا نظامِ شمسی')}
        </h1>
      </div>

      {/* SECTION 1: HERO */}
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
            alt="Solar System overview"
            captionEn="A simplified view of the Solar System."
            captionUr="نظامِ شمسی کا ایک سادہ منظر۔"
            credit="Educational illustration — not to scale"
            fallbackGradient="radial-gradient(circle at 40% 40%, #ffcc00, #ff8c00 20%, #4a90d9 40%, #1a3a5c 60%, #0a0e27)"
          />
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE ANIMATION */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Watch the Solar System in Motion', 'نظامِ شمسی کو حرکت میں دیکھیں')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The planets travel around the Sun because of gravity. Each planet follows its own orbit and takes a different amount of time to complete one journey around the Sun. Inner planets move around the Sun more quickly in this educational model, while the outer planets move more slowly.',
            'سیارے کششِ ثقل کی وجہ سے سورج کے گرد حرکت کرتے ہیں۔ ہر سیارہ اپنا الگ مدار رکھتا ہے اور سورج کے گرد ایک چکر مکمل کرنے میں مختلف وقت لیتا ہے۔ اس تعلیمی نمونے میں اندرونی سیارے سورج کے گرد نسبتاً تیزی سے اور بیرونی سیارے نسبتاً آہستہ حرکت کرتے ہیں۔'
          )}
        </p>
        <SolarSystem onPlanetClick={setSelectedPlanet} />
        <PlanetModal planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
      </section>

      {/* SECTION 3: WHY PLANETS ORBIT */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Why Do Planets Orbit the Sun?', 'سیارے سورج کے گرد کیوں گردش کرتے ہیں؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            "Gravity is the force that attracts objects with mass toward each other. The Sun has far more mass than any planet, so its gravity pulls planets inward. At the same time, each planet is moving forward through space. The combination of forward motion and the Sun's gravitational pull creates a curved path called an orbit.",
            "کششِ ثقل وہ قوت ہے جو کمیت رکھنے والے اجسام کو ایک دوسرے کی طرف کھینچتی ہے۔ سورج کی کمیت کسی بھی سیارے سے بہت زیادہ ہے، اس لیے اس کی کششِ ثقل سیاروں کو اپنی طرف کھینچتی ہے۔ اسی وقت ہر سیارہ خلا میں آگے کی سمت حرکت کر رہا ہوتا ہے۔ آگے کی حرکت اور سورج کی کششِ ثقل مل کر ایک خمیدہ راستہ بناتی ہیں جسے مدار کہتے ہیں۔"
          )}
        </p>
        <InteractiveFlowchart
          steps={[
            { en: 'Planet moves forward', ur: 'سیارہ آگے حرکت کرتا ہے' },
            { en: "Sun's gravity pulls inward", ur: 'سورج کی کششِ ثقل اندر کھینچتی ہے' },
            { en: 'Curved path forms', ur: 'خمیدہ راستہ بنتا ہے' },
            { en: 'Planet stays in orbit', ur: 'سیارہ مدار میں رہتا ہے' }
          ]}
        />
      </section>

      {/* SECTION 4: EIGHT PLANETS */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('The Eight Planets in Order', 'ترتیب کے ساتھ آٹھ سیارے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The planets travel around the Sun in a specific order. Mercury, Venus, Earth and Mars are the inner rocky planets. Jupiter and Saturn are gas giants. Uranus and Neptune are ice giants. The outer planets are much farther from the Sun than the inner planets.',
            'سیارے سورج کے گرد ایک خاص ترتیب میں گردش کرتے ہیں۔ عطارد، زہرہ، زمین اور مریخ اندرونی پتھریلے سیارے ہیں۔ مشتری اور زحل گیس دیو ہیں۔ یورینس اور نیپچون برفانی دیو ہیں۔ بیرونی سیارے اندرونی سیاروں کے مقابلے میں سورج سے بہت زیادہ دور ہیں۔'
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planets.map((planet, i) => (
            <div key={planet.id} className="rounded-xl p-4 border transition-all hover:shadow-lg" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden" style={{ background: planet.gradient, boxShadow: `0 0 15px ${planet.color}40` }}>
                    <img src={planet.imageUrl} alt={planet.name.en} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>{i + 1}</span>
                    <h3 className="font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                      {language === 'ur' ? planet.name.ur : planet.name.en}
                      {language === 'both' && <span className="font-urdu font-normal text-sm ml-2" dir="rtl">{planet.name.ur}</span>}
                    </h3>
                  </div>
                  <p className="text-xs mb-1" style={{ color: 'var(--accent)' }}>
                    {language === 'ur' ? planetTypes[i].ur : planetTypes[i].en}
                    {language === 'both' && <span className="font-urdu ml-1" dir="rtl">{planetTypes[i].ur}</span>}
                  </p>
                  <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                    {language === 'ur' ? planetFacts[i].ur : planetFacts[i].en}
                    {language === 'both' && <span className="block font-urdu mt-1" dir="rtl">{planetFacts[i].ur}</span>}
                  </p>
                  <button onClick={() => navigate('/planets')} className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                    {renderText('Explore Planet', 'سیارہ دریافت کریں')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: INNER VS OUTER */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Inner Planets and Outer Planets', 'اندرونی اور بیرونی سیارے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The inner planets are Mercury, Venus, Earth and Mars. They are rocky and have solid surfaces. The outer planets are much larger. Jupiter and Saturn are gas giants, while Uranus and Neptune are ice giants. The giant planets do not have a normal solid surface like Earth where a person could stand.',
            'اندرونی سیارے عطارد، زہرہ، زمین اور مریخ ہیں۔ یہ پتھریلے ہیں اور ان کی ٹھوس سطحیں ہیں۔ بیرونی سیارے بہت بڑے ہیں۔ مشتری اور زحل گیس دیو ہیں، جبکہ یورینس اور نیپچون برفانی دیو ہیں۔ دیو سیاروں کی زمین جیسی عام ٹھوس سطح موجود نہیں جس پر انسان کھڑا ہو سکے۔'
          )}
        </p>
        <InteractiveFlowchart
          steps={[
            { en: 'Closer to Sun', ur: 'سورج کے قریب' },
            { en: 'Inner rocky planets', ur: 'اندرونی پتھریلے سیارے' },
            { en: 'Asteroid belt', ur: 'سیارچوں کی پٹی' },
            { en: 'Outer giant planets', ur: 'بیرونی دیو سیارے' }
          ]}
        />
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse min-w-[500px]" style={{ color: 'var(--text-primary)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>{renderText('Feature', 'خصوصیت')}</th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>{renderText('Inner Planets', 'اندرونی سیارے')}</th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>{renderText('Outer Planets', 'بیرونی سیارے')}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { en: ['Planets', 'Mercury, Venus, Earth, Mars', 'Jupiter, Saturn, Uranus, Neptune'], ur: ['سیارے', 'عطارد، زہرہ، زمین، مریخ', 'مشتری، زحل، یورینس، نیپچون'] },
                { en: ['Type', 'Rocky', 'Gas/Ice giants'], ur: ['قسم', 'پتھریلے', 'گیس/برفانی دیو'] },
                { en: ['Surface', 'Solid', 'No solid surface'], ur: ['سطح', 'ٹھوس', 'کوئی ٹھوس سطح نہیں'] },
                { en: ['Size', 'Smaller', 'Much larger'], ur: ['سائز', 'چھوٹے', 'بہت بڑے'] },
                { en: ['Moons', 'Few or none', 'Many'], ur: ['چاند', 'کم یا نہیں', 'بہت سے'] },
                { en: ['Rings', 'None', 'All have rings'], ur: ['حلقے', 'کوئی نہیں', 'سب کے حلقے ہیں'] }
              ].map((row, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-muted)' }}>
                  <td className="p-3 border font-medium" style={{ borderColor: 'var(--border)' }}>{renderText(row.en[0], row.ur[0])}</td>
                  <td className="p-3 border" style={{ borderColor: 'var(--border)' }}>{renderText(row.en[1], row.ur[1])}</td>
                  <td className="p-3 border" style={{ borderColor: 'var(--border)' }}>{renderText(row.en[2], row.ur[2])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 6: DAY AND YEAR */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Why Do Planets Have Different Days and Years?', 'سیاروں کے دن اور سال مختلف کیوں ہوتے ہیں؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            "A planet's day is the time it takes to rotate once on its axis. A planet's year is the time it takes to complete one orbit around the Sun. A planet far from the Sun usually travels on a larger orbit and takes longer to complete a year. Rotation and orbit are different movements, so a planet can have a short day but a long year.",
            "کسی سیارے کا دن وہ وقت ہے جو اسے اپنے محور کے گرد ایک چکر مکمل کرنے میں لگتا ہے۔ کسی سیارے کا سال وہ وقت ہے جو اسے سورج کے گرد ایک چکر مکمل کرنے میں لگتا ہے۔ سورج سے دور سیارہ عموماً بڑے مدار میں سفر کرتا ہے اور ایک سال مکمل کرنے میں زیادہ وقت لیتا ہے۔ محوری گردش اور مداری گردش الگ حرکتیں ہیں، اس لیے کسی سیارے کا دن چھوٹا لیکن سال طویل ہو سکتا ہے۔"
          )}
        </p>
        <DayYearAnimation />
        <InteractiveFlowchart
          steps={[
            { en: 'Planet rotation', ur: 'سیارے کی محوری گردش' },
            { en: 'One complete spin', ur: 'ایک مکمل چکر' },
            { en: 'Length of day', ur: 'دن کی مدت' }
          ]}
        />
        <InteractiveFlowchart
          steps={[
            { en: 'Planet orbit', ur: 'سیارے کا مدار' },
            { en: 'One trip around Sun', ur: 'سورج کے گرد ایک سفر' },
            { en: 'Length of year', ur: 'سال کی مدت' }
          ]}
        />
      </section>

      {/* SECTION 7: OTHER OBJECTS */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('More Than Just Planets', 'سیاروں کے علاوہ بھی بہت کچھ')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: { en: 'Moons', ur: 'چاند' }, desc: { en: 'Moons are natural satellites that orbit planets or dwarf planets. Some planets have no moons, while giant planets can have many. The number of moons depends on gravity, formation history and the ability to capture or keep smaller objects.', ur: 'چاند قدرتی سیارہ نما ساتھی ہوتے ہیں جو سیاروں یا بونے سیاروں کے گرد گردش کرتے ہیں۔ کچھ سیاروں کے کوئی چاند نہیں ہوتے، جبکہ دیو سیاروں کے بہت سے چاند ہو سکتے ہیں۔ چاندوں کی تعداد کششِ ثقل، تشکیل کی تاریخ اور چھوٹے اجسام کو اپنی طرف کھینچنے یا محفوظ رکھنے کی صلاحیت پر منحصر ہوتی ہے。' }, img: 'https://images-assets.nasa.gov/image/PIA00465/PIA00465~small.jpg', gradient: 'radial-gradient(circle at 35% 35%, #d4d4d4, #a0a0a0 40%, #505050)' },
            { title: { en: 'Asteroids', ur: 'سیارچے' }, desc: { en: 'Asteroids are rocky objects that orbit the Sun. Many are found in the asteroid belt between Mars and Jupiter, but asteroids also exist in other regions of the Solar System.', ur: 'سیارچے پتھریلے اجسام ہیں جو سورج کے گرد گردش کرتے ہیں۔ بہت سے سیارچے مریخ اور مشتری کے درمیان سیارچوں کی پٹی میں پائے جاتے ہیں، لیکن نظامِ شمسی کے دوسرے علاقوں میں بھی سیارچے موجود ہیں۔' }, img: 'https://images-assets.nasa.gov/image/PIA00777/PIA00777~small.jpg', gradient: 'radial-gradient(circle at 35% 35%, #a08060, #6b5040 40%, #3d2d20)' },
            { title: { en: 'Comets', ur: 'دمدار ستارے' }, desc: { en: 'Comets are icy objects that orbit the Sun. When a comet comes close to the Sun, heat can turn some of its ice into gas and release dust. This can create a glowing cloud and a tail.', ur: 'دمدار ستارے برفیلے اجسام ہیں جو سورج کے گرد گردش کرتے ہیں۔ جب کوئی دمدار ستارہ سورج کے قریب آتا ہے تو حرارت اس کی کچھ برف کو گیس میں تبدیل کر سکتی ہے اور گرد خارج ہو سکتی ہے۔ اس سے ایک روشن غلاف اور دم بن سکتی ہے۔' }, img: 'https://images-assets.nasa.gov/image/PIA00745/PIA00745~small.jpg', gradient: 'radial-gradient(circle at 30% 30%, #e0e8ff, #8090c0 40%, #203060)' },
            { title: { en: 'Dwarf Planets', ur: 'بونے سیارے' }, desc: { en: 'A dwarf planet orbits the Sun and is rounded by its own gravity, but it has not cleared other objects from its orbital neighborhood. Pluto is a well-known dwarf planet.', ur: 'بونا سیارہ سورج کے گرد گردش کرتا ہے اور اپنی کششِ ثقل کی وجہ سے تقریباً گول ہوتا ہے، لیکن اس نے اپنے مداری علاقے سے دوسرے اجسام کو صاف نہیں کیا ہوتا۔ پلوٹو ایک مشہور بونا سیارہ ہے۔' }, img: 'https://images-assets.nasa.gov/image/PIA01482/PIA01482~small.jpg', gradient: 'radial-gradient(circle at 35% 35%, #d4c4a8, #a08868 40%, #504030)' }
          ].map((item, i) => (
            <div key={i} className="rounded-xl overflow-hidden border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="h-32 flex items-center justify-center" style={{ background: item.gradient }}>
                <img src={item.img} alt={item.title.en} className="w-20 h-20 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {renderText(item.title.en, item.title.ur)}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {renderText(item.desc.en, item.desc.ur)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: FORMATION */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('How Did the Solar System Form?', 'نظامِ شمسی کیسے بنا؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Scientists think the Solar System formed about 4.6 billion years ago from a giant cloud of gas and dust. Gravity pulled parts of the cloud together. Most material collected at the center and formed the young Sun. The remaining material flattened into a spinning disk. Small particles collided and stuck together, gradually forming larger bodies, planets, moons, asteroids and comets.',
            'سائنسدانوں کے مطابق نظامِ شمسی تقریباً 4.6 ارب سال پہلے گیس اور گرد کے ایک بہت بڑے بادل سے بنا۔ کششِ ثقل نے اس بادل کے حصوں کو ایک دوسرے کی طرف کھینچا۔ زیادہ تر مادہ مرکز میں جمع ہوا اور نوجوان سورج بنا۔ باقی مادہ گھومتی ہوئی قرص کی شکل میں پھیل گیا۔ چھوٹے ذرات آپس میں ٹکرائے اور جڑتے گئے، اور آہستہ آہستہ بڑے اجسام، سیارے، چاند، سیارچے اور دمدار ستارے بنے۔'
          )}
        </p>
        <p className="text-xs italic mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Simplified scientific formation model.', 'نظامِ شمسی کی تشکیل کا سادہ سائنسی نمونہ۔')}
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

      {/* SECTION 9: IMAGE CAROUSEL */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Solar System Image Gallery', 'نظامِ شمسی کی تصاویر')}
        </h2>
        <ImageCarousel />
      </section>

      {/* SECTION 10: FUN FACTS */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Fun Facts', 'دلچسپ حقائق')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { en: 'The Sun is the only star in the Solar System.', ur: 'سورج نظامِ شمسی کا واحد ستارہ ہے۔' },
            { en: 'There are eight recognized planets.', ur: 'نظامِ شمسی میں آٹھ تسلیم شدہ سیارے ہیں۔' },
            { en: 'Mercury is closest to the Sun.', ur: 'عطارد سورج کے سب سے قریب ہے۔' },
            { en: 'Venus is the hottest planet.', ur: 'زہرہ سب سے گرم سیارہ ہے۔' },
            { en: 'Earth is the only known world with life.', ur: 'زمین اب تک معلوم واحد دنیا ہے جہاں زندگی موجود ہے۔' },
            { en: 'Mars has two small moons.', ur: 'مریخ کے دو چھوٹے چاند ہیں۔' },
            { en: 'Jupiter is the largest planet.', ur: 'مشتری سب سے بڑا سیارہ ہے۔' },
            { en: 'Saturn has a bright ring system.', ur: 'زحل کے روشن حلقوں کا نظام ہے۔' },
            { en: 'Uranus rotates with a strong tilt.', ur: 'یورینس بہت زیادہ جھکاؤ کے ساتھ گردش کرتا ہے۔' },
            { en: 'Neptune is the farthest major planet.', ur: 'نیپچون سب سے دور بڑا سیارہ ہے۔' },
            { en: "A planet's day and year are different measurements.", ur: 'کسی سیارے کا دن اور سال الگ پیمائشیں ہیں۔' },
            { en: 'Gravity helps keep planets in orbit.', ur: 'کششِ ثقل سیاروں کو مدار میں رکھنے میں مدد دیتی ہے۔' },
            { en: 'The asteroid belt lies mainly between Mars and Jupiter.', ur: 'سیارچوں کی پٹی زیادہ تر مریخ اور مشتری کے درمیان ہے۔' },
            { en: 'Comets can develop tails near the Sun.', ur: 'دمدار ستارے سورج کے قریب دم بنا سکتے ہیں۔' },
            { en: 'Dwarf planets orbit the Sun but have not cleared their orbital neighborhood.', ur: 'بونے سیارے سورج کے گرد گردش کرتے ہیں لیکن انہوں نے اپنے مداری علاقے کو صاف نہیں کیا ہوتا۔' },
            { en: 'The Solar System formed about 4.6 billion years ago according to current scientific models.', ur: 'موجودہ سائنسی نمونوں کے مطابق نظامِ شمسی تقریباً 4.6 ارب سال پہلے بنا۔' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {renderText(fact.en, fact.ur)}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: QUIZ */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Test Your Knowledge', 'اپنے علم کی جانچ کریں')}
        </h2>
        <Quiz />
      </section>

      {/* SECTION 12: SOURCES */}
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
          {['NASA Science — science.nasa.gov', 'NASA Solar System Exploration — solarsystem.nasa.gov', 'NASA Planetary Fact Sheets — nssdc.gsfc.nasa.gov', 'NASA Photojournal — photojournal.jpl.nasa.gov', 'NASA JPL Education — jpl.nasa.gov/edu'].map((source, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {source}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
