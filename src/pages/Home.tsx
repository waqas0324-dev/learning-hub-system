import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { SolarSystem } from '../components/SolarSystem';
import { PlanetModal } from '../components/PlanetModal';
import { planets, PlanetData } from '../data/planets';
import {
  Rocket, Globe, Cloud, Mountain, Sun, Waves, Users, BookOpen,
  BarChart3, Calculator, HelpCircle, Gamepad2, Award, Target, Zap
} from 'lucide-react';

// Planet texture thumbnail component
function PlanetThumb({ planet, size }: { planet: PlanetData; size: number }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      className="rounded-full overflow-hidden flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: planet.gradient,
      }}
    >
      {!imgError && (
        <img
          src={planet.imageUrl}
          alt={planet.name.en}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          loading="lazy"
          draggable={false}
        />
      )}
    </div>
  );
}

export function HomePage() {
  const { language, t, tBoth } = useApp();
  const navigate = useNavigate();
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const solarSystemRef = useRef<HTMLDivElement>(null);

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

  const learningPaths = [
    { icon: <Globe size={24} />, title: { en: 'Planets', ur: 'سیارے' }, path: '/planets' },
    { icon: <Sun size={24} />, title: { en: 'Moon, Sun & Stars', ur: 'چاند، سورج اور تارے' }, path: '/moon-sun-stars' },
    { icon: <Target size={24} />, title: { en: 'Eclipses', ur: 'گرہن' }, path: '/eclipses' },
    { icon: <Users size={24} />, title: { en: 'Scientists & Missions', ur: 'سائنسدان اور مشنز' }, path: '/scientists' },
    { icon: <Mountain size={24} />, title: { en: 'Earth Explorer', ur: 'زمین کو جانیں' }, path: '/earth' },
    { icon: <Waves size={24} />, title: { en: 'Oceans & Water Cycle', ur: 'سمندر اور آبی چکر' }, path: '/oceans' },
    { icon: <Cloud size={24} />, title: { en: 'Weather & Climate', ur: 'موسم اور آب و ہوا' }, path: '/weather' },
    { icon: <BookOpen size={24} />, title: { en: 'Dams & Water Resources', ur: 'ڈیم اور آبی وسائل' }, path: '/dams' },
    { icon: <Zap size={24} />, title: { en: 'Solar Energy', ur: 'شمسی توانائی' }, path: '/solar-energy' },
  ];

  return (
    <div className="space-y-12 pb-8">
      {/* SECTION 1: COMPACT INTRO */}
      <section className="text-center px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          {renderText('Explore the Solar System', 'سولر سسٹم دریافت کریں')}
        </h1>
        <p className="text-sm md:text-base max-w-2xl mx-auto mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Explore the Sun and all eight planets through an interactive moving model. Click any planet to see its name, size, distance from the Sun and orbital period.',
            'سورج اور آٹھوں سیاروں کو ایک تفاعلی حرکت کرتے ہوئے نمونے کے ذریعے دریافت کریں۔ کسی بھی سیارے پر کلک کریں اور اس کا نام، سائز، سورج سے فاصلہ اور مداری مدت دیکھیں۔'
          )}
        </p>
        <button
          onClick={() => navigate('/planets')}
          className="px-5 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          {renderText('Explore Planets', 'سیارے دریافت کریں')}
        </button>
      </section>

      {/* SECTION 2: SOLAR SYSTEM ANIMATION - MAIN FEATURE */}
      <section ref={solarSystemRef} className="px-2 md:px-4">
        <div className="text-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {renderText('Our Solar System in Motion', 'حرکت میں ہمارا سولر سسٹم')}
          </h2>
          <p className="text-sm mt-2 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'Watch all eight planets travel around the Sun. Click a planet to see its name, size, distance from the Sun and orbital period.',
              'آٹھوں سیاروں کو سورج کے گرد حرکت کرتے دیکھیں۔ کسی سیارے پر کلک کریں اور اس کا نام، سائز، سورج سے فاصلہ اور مداری مدت دیکھیں۔'
            )}
          </p>
        </div>
        <SolarSystem onPlanetClick={setSelectedPlanet} />
      </section>

      {/* SECTION 3: PLANET QUICK CARDS */}
      <section className="px-2 md:px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('planetQuickCards')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {planets.map(planet => (
            <div
              key={planet.id}
              className="rounded-xl p-4 border text-center transition-all hover:scale-[1.03] hover:shadow-lg cursor-pointer group"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              onClick={() => setSelectedPlanet(planet)}
            >
              <div className="flex justify-center mb-3">
                <PlanetThumb planet={planet} size={52} />
              </div>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? planet.name.ur : planet.name.en}
                {language === 'both' && (
                  <span className="block font-urdu text-xs font-normal mt-0.5" dir="rtl" style={{ color: 'var(--text-secondary)' }}>
                    {planet.name.ur}
                  </span>
                )}
              </h3>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {language === 'ur' ? planet.fact.ur : planet.fact.en}
                {language === 'both' && (
                  <span className="block font-urdu mt-1" dir="rtl">{planet.fact.ur}</span>
                )}
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); navigate('/planets'); }}
                className="mt-3 text-xs px-4 py-1.5 rounded-full font-medium transition-colors group-hover:opacity-90"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                {t('explore')}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: LEARNING PATHS */}
      <section className="px-2 md:px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('learningPaths')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-5xl mx-auto">
          {learningPaths.map((lp, i) => (
            <button
              key={i}
              onClick={() => navigate(lp.path)}
              className="rounded-xl p-4 border text-left transition-all hover:scale-[1.02] hover:shadow-lg group"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="mb-2 transition-transform group-hover:scale-110" style={{ color: 'var(--accent)' }}>{lp.icon}</div>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? lp.title.ur : lp.title.en}
                {language === 'both' && (
                  <span className="block font-urdu text-xs font-normal mt-0.5" dir="rtl" style={{ color: 'var(--text-secondary)' }}>
                    {lp.title.ur}
                  </span>
                )}
              </h3>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 5: TOOLS AND PRACTICE */}
      <section className="px-2 md:px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('toolsAndPractice')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { icon: <BarChart3 size={28} />, title: tBoth('planetComparison'), desc: tBoth('compareDesc'), path: '/comparison' },
            { icon: <Calculator size={28} />, title: { en: 'Space Age & Weight Calculator', ur: 'خلا میں عمر اور وزن کا کیلکولیٹر' }, desc: tBoth('calcDesc'), path: '/calculator' },
            { icon: <HelpCircle size={28} />, title: tBoth('quizCenter'), desc: tBoth('quizDesc'), path: '/quiz' },
            { icon: <Gamepad2 size={28} />, title: tBoth('learningGames'), desc: tBoth('gamesDesc'), path: '/games' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className="rounded-xl p-5 border text-left transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="mb-3" style={{ color: 'var(--cyan)' }}>{item.icon}</div>
              <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? item.title.ur : item.title.en}
                {language === 'both' && (
                  <span className="block font-urdu text-xs font-normal mt-0.5" dir="rtl">{item.title.ur}</span>
                )}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {language === 'ur' ? item.desc.ur : item.desc.en}
                {language === 'both' && <span className="block font-urdu mt-1" dir="rtl">{item.desc.ur}</span>}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 6: LEARNING PROGRESS */}
      <section className="px-2 md:px-4">
        <div className="max-w-lg mx-auto rounded-xl p-6 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h2 className="text-lg font-bold text-center mb-4 flex items-center justify-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Award size={20} style={{ color: 'var(--accent)' }} />
            {t('yourJourney')}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: t('pagesExplored'), value: '0' },
              { label: t('quizzesCompleted'), value: '0' },
              { label: t('bestScore'), value: '0%' },
              { label: t('badgeEarned'), value: '—' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{stat.value}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FEATURED LESSON */}
      <section className="px-2 md:px-4">
        <div className="max-w-2xl mx-auto rounded-xl p-6 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <BookOpen size={20} style={{ color: 'var(--purple)' }} />
            {t('featuredLesson')}
          </h2>
          <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText("Why don't eclipses happen every month?", 'گرہن ہر مہینے کیوں نہیں لگتا؟')}
          </p>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              "The Moon's orbit is tilted compared with Earth's orbit around the Sun. Most months, the Moon passes slightly above or below the exact alignment needed for an eclipse.",
              "چاند کا مدار سورج کے گرد زمین کے مدار کے مقابلے میں جھکا ہوا ہے۔ زیادہ تر مہینوں میں چاند گرہن کے لیے ضروری بالکل سیدھی ترتیب کے اوپر یا نیچے سے گزر جاتا ہے۔"
            )}
          </p>
          <button
            onClick={() => navigate('/eclipses')}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            {t('learnAboutEclipses')}
          </button>
        </div>
      </section>

      {/* SECTION 8: ABOUT PREVIEW */}
      <section className="px-2 md:px-4">
        <div className="max-w-2xl mx-auto rounded-xl p-6 border text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {t('aboutPreview')}
          </h2>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'Solar System Learning Hub is designed to make science easier to understand through interactive simulations, images, diagrams, quizzes and educational games.',
              'سولر سسٹم لرننگ ہب کو اس طرح بنایا گیا ہے کہ تفاعلی نمونوں، تصاویر، خاکوں، کوئزز اور تعلیمی گیمز کے ذریعے سائنس کو آسانی سے سمجھا جا سکے۔'
            )}
          </p>
          <button
            onClick={() => navigate('/about')}
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-80"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            {t('aboutProject')}
          </button>
        </div>
      </section>

      {/* Planet Modal */}
      <PlanetModal planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
    </div>
  );
}
