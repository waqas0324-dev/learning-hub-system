import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { planets, PlanetData } from '../data/planets';
import { PlanetImage } from '../components/PlanetImage';
import { getCelestialImage } from '../data/imageManifest';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from 'lucide-react';

// Interactive Flowchart Component
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
    </div>
  );
}

// Planet Carousel Component
function PlanetCarousel() {
  const { language } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % planets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setCurrentSlide((p) => (p - 1 + planets.length) % planets.length);
      if (e.key === 'ArrowRight') setCurrentSlide((p) => (p + 1) % planets.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const planet = planets[currentSlide];
  const imageData = getCelestialImage(planet.imageId);

  return (
    <div className="rounded-xl overflow-hidden border my-6" style={{ borderColor: 'var(--border)' }}>
      <div className="relative bg-gradient-to-br from-slate-900 to-black min-h-[400px] flex items-center justify-center p-8">
        <div className="text-center">
          <PlanetImage planetId={planet.imageId} size={200} />
          <h3 className="text-2xl font-bold mt-4" style={{ color: 'var(--text-primary)' }}>
            {language === 'en' && planet.name.en}
            {language === 'ur' && <span className="font-urdu" dir="rtl">{planet.name.ur}</span>}
            {language === 'both' && (
              <>
                {planet.name.en}
                <span className="block font-urdu text-xl mt-1" dir="rtl">{planet.name.ur}</span>
              </>
            )}
          </h3>
          <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {language === 'en' && planet.fact.en}
            {language === 'ur' && <span className="font-urdu" dir="rtl">{planet.fact.ur}</span>}
            {language === 'both' && (
              <>
                {planet.fact.en}
                <span className="block font-urdu mt-1" dir="rtl">{planet.fact.ur}</span>
              </>
            )}
          </p>
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + planets.length) % planets.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % planets.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="p-4" style={{ backgroundColor: 'var(--surface-muted)' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {currentSlide + 1} / {planets.length}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {planets.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setCurrentSlide(i)}
              className="p-2 rounded-lg text-center transition-all"
              style={{
                backgroundColor: i === currentSlide ? 'var(--accent)' : 'var(--surface)',
                color: i === currentSlide ? '#fff' : 'var(--text-primary)',
                border: `1px solid ${i === currentSlide ? 'var(--accent)' : 'var(--border)'}`
              }}
            >
              <div className="text-xs font-medium">
                {language === 'en' ? p.name.en : language === 'ur' ? p.name.ur : p.name.en}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}



export function PlanetsPage() {
  const { language } = useApp();
  const navigate = useNavigate();

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return <><span>{en}</span><span className="block font-urdu mt-2" dir="rtl">{ur}</span></>;
  };

  return (
    <div className="space-y-12 pb-8">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {renderText('The Eight Planets', 'آٹھ سیارے')}
        </h1>
        <p className="text-sm md:text-base max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Explore all eight planets of our Solar System. Each planet is unique with its own characteristics, size, and distance from the Sun.',
            'ہمارے نظامِ شمسی کے آٹھوں سیاروں کو دریافت کریں۔ ہر سیارہ اپنی خصوصیات، سائز اور سورج سے فاصلے میں منفرد ہے۔'
          )}
        </p>
      </div>

      {/* Planet Carousel */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Planet Gallery', 'سیاروں کی گیلری')}
        </h2>
        <PlanetCarousel />
      </section>

      {/* Planet Order Flowchart */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Order of Planets from the Sun', 'سورج سے سیاروں کی ترتیب')}
        </h2>
        <InteractiveFlowchart
          steps={planets.map(p => ({ en: p.name.en, ur: p.name.ur }))}
        />
      </section>

      {/* All Planet Details - Simple Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          {renderText('Explore Each Planet', 'ہر سیارے کو دریافت کریں')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Click on any planet to see its complete details, images, and facts.',
            'کسی بھی سیارے پر کلک کریں اور اس کی مکمل تفصیلات، تصاویر اور حقائق دیکھیں۔'
          )}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {planets.map((planet, index) => (
            <button
              key={planet.id}
              onClick={() => navigate(`/planets/${planet.id}`)}
              className="rounded-xl p-4 border transition-all hover:shadow-lg hover:scale-105 text-center"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold mb-2" style={{ color: 'var(--accent)' }}>{index + 1}</span>
                <PlanetImage planetId={planet.imageId} size={120} />
                <h3 className="font-bold mt-3" style={{ color: 'var(--text-primary)' }}>
                  {language === 'ur' ? planet.name.ur : planet.name.en}
                  {language === 'both' && <span className="block font-urdu text-sm mt-1" dir="rtl">{planet.name.ur}</span>}
                </h3>
                <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                  {renderText('Click to explore', 'دریافت کرنے کے لیے کلک کریں')}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Inner vs Outer Planets */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Inner Planets vs Outer Planets', 'اندرونی سیارے بمقابلہ بیرونی سیارے')}
        </h2>
        <p className="text-sm md:text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Solar System is divided into two groups: the inner rocky planets (Mercury, Venus, Earth, Mars) and the outer giant planets (Jupiter, Saturn, Uranus, Neptune).',
            'نظامِ شمسی دو گروپوں میں تقسیم ہے: اندرونی پتھریلے سیارے (عطارد، زہرہ، زمین، مریخ) اور بیرونی دیو سیارے (مشتری، زحل، یورینس، نیپچون)۔'
          )}
        </p>
        <InteractiveFlowchart
          steps={[
            { en: 'Inner Rocky Planets', ur: 'اندرونی پتھریلے سیارے' },
            { en: 'Asteroid Belt', ur: 'سیارچوں کی پٹی' },
            { en: 'Gas Giants', ur: 'گیس دیو' },
            { en: 'Ice Giants', ur: 'برفانی دیو' }
          ]}
        />
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse min-w-[600px]" style={{ color: 'var(--text-primary)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>
                  {renderText('Feature', 'خصوصیت')}
                </th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>
                  {renderText('Inner Planets', 'اندرونی سیارے')}
                </th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>
                  {renderText('Outer Planets', 'بیرونی سیارے')}
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { en: ['Planets', 'Mercury, Venus, Earth, Mars', 'Jupiter, Saturn, Uranus, Neptune'], ur: ['سیارے', 'عطارد، زہرہ، زمین، مریخ', 'مشتری، زحل، یورینس، نیپچون'] },
                { en: ['Type', 'Rocky/Terrestrial', 'Gas/Ice Giants'], ur: ['قسم', 'پتھریلے', 'گیس/برفانی دیو'] },
                { en: ['Surface', 'Solid surface', 'No solid surface'], ur: ['سطح', 'ٹھوس سطح', 'کوئی ٹھوس سطح نہیں'] },
                { en: ['Size', 'Smaller', 'Much larger'], ur: ['سائز', 'چھوٹے', 'بہت بڑے'] },
                { en: ['Moons', 'Few or none', 'Many moons'], ur: ['چاند', 'کم یا نہیں', 'بہت سے چاند'] },
                { en: ['Rings', 'No rings', 'All have rings'], ur: ['حلقے', 'کوئی حلقے نہیں', 'سب کے حلقے ہیں'] }
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

      {/* Planet Formation */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('How Did the Planets Form?', 'سیارے کیسے بنے؟')}
        </h2>
        <p className="text-sm md:text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'About 4.6 billion years ago, a giant cloud of gas and dust collapsed under gravity. Most material formed the Sun at the center, while the remaining material formed a spinning disk. Small particles collided and stuck together, gradually forming larger bodies that became the planets.',
            'تقریباً 4.6 ارب سال پہلے، گیس اور گرد کا ایک بہت بڑا بادل کششِ ثقل کی وجہ سے سکڑنے لگا۔ زیادہ تر مادہ مرکز میں سورج بنا، جبکہ باقی مادہ گھومتی ہوئی قرص بن گیا۔ چھوٹے ذرات آپس میں ٹکرائے اور جڑتے گئے، اور آہستہ آہستہ بڑے اجسام بنے جو سیارے بن گئے۔'
          )}
        </p>
        <InteractiveFlowchart
          steps={[
            { en: 'Giant cloud collapses', ur: 'بڑا بادل سکڑتا ہے' },
            { en: 'Sun forms at center', ur: 'مرکز میں سورج بنتا ہے' },
            { en: 'Spinning disk forms', ur: 'گھومتی قرص بنتی ہے' },
            { en: 'Particles collide', ur: 'ذرات ٹکراتے ہیں' },
            { en: 'Planets form', ur: 'سیارے بنتے ہیں' }
          ]}
        />
      </section>

      {/* Fun Facts */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Planet Fun Facts', 'سیاروں کے دلچسپ حقائق')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { en: 'Mercury is the smallest planet and closest to the Sun.', ur: 'عطارد سب سے چھوٹا سیارہ ہے اور سورج کے سب سے قریب ہے۔' },
            { en: 'Venus is the hottest planet due to its thick atmosphere.', ur: 'زہرہ اپنی گھنی فضا کی وجہ سے سب سے گرم سیارہ ہے۔' },
            { en: 'Earth is the only planet known to support life.', ur: 'زمین واحد سیارہ ہے جہاں زندگی موجود ہے۔' },
            { en: 'Mars has the largest volcano in the Solar System.', ur: 'مریخ پر نظامِ شمسی کا سب سے بڑا آتش فشاں ہے۔' },
            { en: 'Jupiter is so large that all other planets could fit inside it.', ur: 'مشتری اتنا بڑا ہے کہ اس میں باقی تمام سیارے آ سکتے ہیں۔' },
            { en: 'Saturn\'s rings are made mostly of ice particles.', ur: 'زحل کے حلقے زیادہ تر برف کے ذرات سے بنے ہیں۔' },
            { en: 'Uranus rotates on its side.', ur: 'یورینس پہلو کے بل گھومتا ہے۔' },
            { en: 'Neptune has the strongest winds in the Solar System.', ur: 'نیپچون پر نظامِ شمسی کی سب سے تیز ہوائیں چلتی ہیں۔' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {renderText(fact.en, fact.ur)}
            </div>
          ))}
        </div>
      </section>

      {/* Sources */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Sources', 'ماخذ')}
        </h2>
        <div className="space-y-2">
          {['NASA Science - science.nasa.gov', 'NASA Planetary Fact Sheets', 'NASA Photojournal', 'NASA Solar System Exploration'].map((source, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {source}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
