import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Orbit, Gamepad2, BrainCircuit, Telescope, Sparkles, BookOpen, Globe2, Zap } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { SolarSystem } from '../components/SolarSystem';
import { PlanetModal } from '../components/PlanetModal';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { PlanetData, planets } from '../data/planets';
import { getCelestialImage } from '../data/imageManifest';

const quickLinks = [
  { title: 'Explore Planets', ur: 'سیارے دریافت کریں', path: '/planets', icon: <Orbit size={22} />, text: 'Facts, NASA images and planet-by-planet learning.' },
  { title: '3D Space Explorer', ur: '3D خلائی ایکسپلورر', path: '/3d-explorer', icon: <Telescope size={22} />, text: 'Explore authentic NASA 3D missions in your browser.' },
  { title: 'Learning Games', ur: 'تعلیمی گیمز', path: '/games', icon: <Gamepad2 size={22} />, text: 'Learn through challenges, matching and simulations.' },
  { title: 'Science Quiz', ur: 'سائنس کوئز', path: '/quiz', icon: <BrainCircuit size={22} />, text: 'Test your astronomy and Earth science knowledge.' },
  { title: 'Earth Explorer', ur: 'زمین کو جانیں', path: '/earth', icon: <Globe2 size={22} />, text: 'Understand atmosphere, oceans, water and climate.' },
  { title: 'Solar Energy', ur: 'شمسی توانائی', path: '/solar-energy', icon: <Zap size={22} />, text: 'See sunlight become electricity through a live flow.' }
];

export function HomePage() {
  const { language } = useApp();
  const navigate = useNavigate();
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [query, setQuery] = useState('');

  const text = (en: string, ur: string) => language === 'ur'
    ? <span className="font-urdu" dir="rtl">{ur}</span>
    : language === 'both'
      ? <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>
      : <>{en}</>;

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search');
  };

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-[2rem] border px-5 py-10 md:px-10 md:py-14" style={{ background: 'radial-gradient(circle at 85% 15%, rgba(59,130,246,.28), transparent 28%), radial-gradient(circle at 10% 90%, rgba(6,182,212,.15), transparent 30%), linear-gradient(135deg,#07111f,#0b1220 55%,#101827)', borderColor: 'var(--border)' }}>
        <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
            <Sparkles size={14} /> Interactive Space & Earth Science
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-5">{text('Explore. Interact. Learn Science.', 'دریافت کریں، تجربہ کریں، سائنس سیکھیں۔')}</h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base leading-7 text-slate-300">{text('A visual learning platform for the Solar System, planets, missions, Earth science, games and experiments.', 'نظامِ شمسی، سیاروں، خلائی مشنز، زمین اور ماحول کی سائنس، گیمز اور تجربات کے لیے ایک visual learning platform۔')}</p>

          <form onSubmit={submitSearch} className="mt-7 flex flex-col sm:flex-row gap-2 max-w-2xl">
            <div className="flex-1 flex items-center gap-3 rounded-2xl border bg-white/5 px-4 py-3 border-white/10">
              <Search size={19} className="text-slate-400" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search planets, eclipses, gravity, oceans..." className="w-full bg-transparent outline-none text-sm text-white placeholder:text-slate-500" aria-label="Search learning topics" />
            </div>
            <button type="submit" className="rounded-2xl bg-blue-600 hover:bg-blue-500 px-6 py-3 font-semibold text-sm text-white transition-colors">{text('Search', 'تلاش')}</button>
          </form>

          <div className="mt-7 flex flex-wrap gap-3 text-xs text-slate-300">
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5">8 Planets</span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5">NASA Imagery</span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5">3D Explorer</span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5">Games + Quizzes</span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5">English + Urdu</span>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3 mb-4 px-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-blue-400">Learning Hub</p>
            <h2 className="text-2xl font-extrabold mt-1">{text('Choose your next exploration', 'اپنی اگلی learning منتخب کریں')}</h2>
          </div>
          <button onClick={() => navigate('/search')} className="hidden sm:inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">Browse all <ArrowRight size={15}/></button>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {quickLinks.map(item => (
            <button key={item.path} onClick={() => navigate(item.path)} className="group text-left rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:border-blue-500/60" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-start justify-between">
                <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">{item.icon}</span>
                <ArrowRight size={17} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-bold mt-4">{item.title}</h3>
              {language !== 'en' && <p className="font-urdu text-sm mt-1" dir="rtl">{item.ur}</p>}
              <p className="text-sm mt-2 leading-6" style={{ color: 'var(--text-secondary)' }}>{item.text}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border p-4 md:p-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-400">Interactive model</p>
            <h2 className="text-2xl font-extrabold mt-1">{text('Solar System Explorer', 'نظامِ شمسی ایکسپلورر')}</h2>
          </div>
          <button onClick={() => navigate('/3d-explorer')} className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold hover:border-blue-500" style={{ borderColor: 'var(--border)' }}>
            <Telescope size={16} /> {text('Open 3D Explorer', '3D ایکسپلورر')}
          </button>
        </div>
        <SolarSystem onPlanetClick={setSelectedPlanet} />
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4 px-1"><BookOpen size={20} className="text-purple-400"/><h2 className="text-2xl font-extrabold">{text('NASA Planet Gallery', 'NASA سیاروں کی گیلری')}</h2></div>
        <EducationalCarousel slides={planets.map(planet => ({
          imageUrl: getCelestialImage(planet.imageId).fullDiskImageUrl,
          captionEn: planet.name.en,
          captionUr: planet.name.ur,
          credit: getCelestialImage(planet.imageId).credit,
          fallbackGradient: planet.gradient
        }))} />
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="text-3xl font-extrabold text-blue-400">08</div><p className="font-semibold mt-1">{text('Major planets', 'اہم سیارے')}</p><p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>{text('Explore each planet separately.', 'ہر سیارے کو الگ explore کریں۔')}</p>
        </div>
        <div className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="text-3xl font-extrabold text-cyan-400">3D</div><p className="font-semibold mt-1">{text('NASA mission explorer', 'NASA مشن ایکسپلورر')}</p><p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>{text('Explore authentic browser-based NASA visualization.', 'حقیقی NASA visualization کو browser میں دیکھیں۔')}</p>
        </div>
        <div className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="text-3xl font-extrabold text-purple-400">∞</div><p className="font-semibold mt-1">{text('Practice & discovery', 'مشق اور دریافت')}</p><p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>{text('Games, quizzes, simulations and resources.', 'گیمز، کوئزز، simulations اور resources۔')}</p>
        </div>
      </section>

      <PlanetModal planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
    </div>
  );
}
