import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { SolarSystem } from '../components/SolarSystem';
import { PlanetModal } from '../components/PlanetModal';
import { planets, PlanetData } from '../data/planets';
import { BilingualText } from '../components/BilingualText';
import {
  Rocket, Globe, Cloud, Mountain, Sun, Waves, Users, BookOpen,
  BarChart3, Calculator, HelpCircle, Gamepad2, Award, Target
} from 'lucide-react';

export function HomePage() {
  const { language, t, tBoth } = useApp();
  const navigate = useNavigate();
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const solarSystemRef = useRef<HTMLDivElement>(null);

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return <>{en}<span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
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
    { icon: <Rocket size={24} />, title: { en: 'Solar Energy', ur: 'شمسی توانائی' }, path: '/solar-energy' },
  ];

  return (
    <div className="space-y-16 pb-8">
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden rounded-2xl mx-4 md:mx-0" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c0a09 100%)' }}>
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white" style={{
              width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: Math.random() * 0.8
            }} />
          ))}
        </div>
        <div className="relative z-10 py-12 md:py-20 px-6 md:px-12 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
            {renderText('Explore Space, Earth and Science', 'خلا، زمین اور سائنس کو دریافت کریں')}
          </h1>
          <p className="text-sm md:text-base text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            {renderText(
              'Solar System Learning Hub is an interactive educational website where learners can explore the Sun, planets, the Moon, eclipses, Earth, weather, oceans, solar energy, space missions and scientific discoveries.',
              'سولر سسٹم لرننگ ہب ایک تفاعلی تعلیمی ویب سائٹ ہے جہاں سیکھنے والے سورج، سیاروں، چاند، گرہنوں، زمین، موسم، سمندروں، شمسی توانائی، خلائی مشنز اور سائنسی دریافتوں کے بارے میں جان سکتے ہیں۔'
            )}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate('/solar-system')}
              className="px-6 py-2.5 rounded-lg font-semibold text-sm text-white transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            >
              {renderText('Start Learning', 'سیکھنا شروع کریں')}
            </button>
            <button
              onClick={() => solarSystemRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 rounded-lg font-semibold text-sm border border-blue-400/50 text-blue-200 hover:bg-blue-500/10 transition-colors"
            >
              {renderText('Explore the Solar System', 'سولر سسٹم دریافت کریں')}
            </button>
          </div>
          {/* Hero visual - space illustration placeholder */}
          <div className="mt-8 mx-auto max-w-md">
            <div className="rounded-xl overflow-hidden border border-blue-500/20 bg-gradient-to-b from-indigo-900/30 to-black/50 p-4">
              <div className="flex justify-center items-center h-32">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 shadow-lg shadow-orange-500/50" />
                  <div className="absolute -top-2 -right-8 w-6 h-6 rounded-full bg-blue-400 animate-pulse" />
                  <div className="absolute top-8 -left-10 w-4 h-4 rounded-full bg-red-400" />
                  <div className="absolute -bottom-4 right-4 w-5 h-5 rounded-full bg-green-400" />
                </div>
              </div>
              <p className="text-xs text-blue-200 text-center mt-2">
                {renderText('Educational illustration — Solar System overview', 'تعلیمی خاکہ — نظامِ شمسی کا جائزہ')}
              </p>
              <p className="text-[10px] text-blue-300/60 text-center">Source: Educational illustration</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SOLAR SYSTEM ANIMATION */}
      <section ref={solarSystemRef} className="px-4 md:px-0">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {renderText('Our Solar System in Motion', 'حرکت میں ہمارا سولر سسٹم')}
          </h2>
          <p className="text-sm mt-2 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'Watch the eight planets travel around the Sun. Click a planet to preview its name, size, distance from the Sun and orbital period.',
              'آٹھ سیاروں کو سورج کے گرد حرکت کرتے ہوئے دیکھیں۔ کسی سیارے پر کلک کریں اور اس کا نام، سائز، سورج سے فاصلہ اور مداری مدت کا مختصر تعارف دیکھیں۔'
            )}
          </p>
        </div>
        <SolarSystem onPlanetClick={setSelectedPlanet} />
      </section>

      {/* SECTION 3: PLANET QUICK CARDS */}
      <section className="px-4 md:px-0">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('planetQuickCards')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {planets.map(planet => (
            <div
              key={planet.id}
              className="rounded-xl p-4 border text-center transition-transform hover:scale-105 cursor-pointer"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              onClick={() => setSelectedPlanet(planet)}
            >
              <div
                className="w-10 h-10 rounded-full mx-auto mb-2"
                style={{ backgroundColor: planet.color, boxShadow: `0 0 10px ${planet.color}60` }}
              />
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? planet.name.ur : planet.name.en}
                {language === 'both' && <span className="block font-urdu text-xs font-normal" dir="rtl">{planet.name.ur}</span>}
              </h3>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                {language === 'ur' ? planet.fact.ur : planet.fact.en}
                {language === 'both' && <span className="block font-urdu mt-0.5" dir="rtl">{planet.fact.ur}</span>}
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); navigate('/planets'); }}
                className="mt-2 text-xs px-3 py-1 rounded-full font-medium"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                {t('explore')}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: LEARNING PATHS */}
      <section className="px-4 md:px-0">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('learningPaths')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
          {learningPaths.map((lp, i) => (
            <button
              key={i}
              onClick={() => navigate(lp.path)}
              className="rounded-xl p-4 border text-left transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="mb-2" style={{ color: 'var(--accent)' }}>{lp.icon}</div>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? lp.title.ur : lp.title.en}
                {language === 'both' && <span className="block font-urdu text-xs font-normal" dir="rtl">{lp.title.ur}</span>}
              </h3>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 5: TOOLS AND PRACTICE */}
      <section className="px-4 md:px-0">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('toolsAndPractice')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
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
                {language === 'both' && <span className="block font-urdu text-xs font-normal mt-0.5" dir="rtl">{item.title.ur}</span>}
              </h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {language === 'ur' ? item.desc.ur : item.desc.en}
                {language === 'both' && <span className="block font-urdu mt-0.5" dir="rtl">{item.desc.ur}</span>}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 6: LEARNING PROGRESS */}
      <section className="px-4 md:px-0">
        <div className="max-w-lg mx-auto rounded-xl p-6 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h2 className="text-lg font-bold text-center mb-4 flex items-center justify-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Award size={20} style={{ color: 'var(--accent)' }} />
            {t('yourJourney')}
          </h2>
          <div className="grid grid-cols-2 gap-4">
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
      <section className="px-4 md:px-0">
        <div className="max-w-2xl mx-auto rounded-xl p-6 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <BookOpen size={20} style={{ color: 'var(--purple)' }} />
            {t('featuredLesson')}
          </h2>
          <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText("Why don't eclipses happen every month?", 'گرہن ہر مہینے کیوں نہیں لگتا؟')}
          </p>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              "The Moon's orbit is tilted compared with Earth's orbit around the Sun. Most months, the Moon passes slightly above or below the exact alignment needed for an eclipse.",
              "چاند کا مدار سورج کے گرد زمین کے مدار کے مقابلے میں جھکا ہوا ہے۔ زیادہ تر مہینوں میں چاند گرہن کے لیے ضروری بالکل سیدھی ترتیب کے اوپر یا نیچے سے گزر جاتا ہے۔"
            )}
          </p>
          <button
            onClick={() => navigate('/eclipses')}
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            {t('learnAboutEclipses')}
          </button>
        </div>
      </section>

      {/* SECTION 8: ABOUT PREVIEW */}
      <section className="px-4 md:px-0">
        <div className="max-w-2xl mx-auto rounded-xl p-6 border text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {t('aboutPreview')}
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'Solar System Learning Hub is designed to make science easier to understand through interactive simulations, images, diagrams, quizzes and educational games.',
              'سولر سسٹم لرننگ ہب کو اس طرح بنایا گیا ہے کہ تفاعلی نمونوں، تصاویر، خاکوں، کوئزز اور تعلیمی گیمز کے ذریعے سائنس کو آسانی سے سمجھا جا سکے۔'
            )}
          </p>
          <button
            onClick={() => navigate('/about')}
            className="px-4 py-2 rounded-lg text-sm font-medium border"
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
