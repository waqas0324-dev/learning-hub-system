import React, { useState } from 'react';
import { ExternalLink, Maximize2, Rocket, Globe2, Orbit, Info } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const experiences = [
  {
    title: 'NASA Eyes — Solar System',
    ur: 'ناسا آئیز — نظامِ شمسی',
    description: 'Explore planets, moons, spacecraft and missions in browser-based 3D.',
    url: 'https://eyes.nasa.gov/apps/solar-system/#/home',
    icon: <Orbit size={20} />
  },
  {
    title: 'Artemis I Moon Flyby',
    ur: 'آرٹیمس 1 — چاند کے قریب پرواز',
    description: 'Follow a real NASA mission trajectory and explore the Earth–Moon system.',
    url: 'https://eyes.nasa.gov/apps/solar-system/#/sc_artemis_1?rate=1',
    icon: <Rocket size={20} />
  },
  {
    title: 'Eyes on Earth',
    ur: 'زمین کو 3D میں دیکھیں',
    description: 'Explore NASA Earth data and satellites in an immersive 3D environment.',
    url: 'https://eyes.nasa.gov/apps/earth/#/satellites?rate=1',
    icon: <Globe2 size={20} />
  }
];

export function Space3DExplorerPage() {
  const { language } = useApp();
  const [src, setSrc] = useState(experiences[0].url);

  const text = (en: string, ur: string) => language === 'ur'
    ? <span className="font-urdu" dir="rtl">{ur}</span>
    : language === 'both'
      ? <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>
      : <>{en}</>;

  return (
    <div className="space-y-6 pb-10">
      <section className="rounded-3xl overflow-hidden border p-6 md:p-8 relative" style={{ background: 'radial-gradient(circle at 80% 10%, rgba(59,130,246,.25), transparent 35%), linear-gradient(135deg, #07111f, #0f172a)', borderColor: 'var(--border)' }}>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4 bg-blue-500/10 text-blue-300 border border-blue-400/20">
            <Orbit size={14} /> NASA-powered 3D
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">{text('3D Space Explorer', '3D خلائی ایکسپلورر')}</h1>
          <p className="mt-4 text-sm md:text-base text-slate-300 max-w-2xl leading-7">{text('Explore authentic NASA data and mission visualizations without leaving the Learning Hub.', 'حقیقی NASA ڈیٹا اور مشنز کو اسی Learning Hub کے اندر 3D انداز میں explore کریں۔')}</p>
        </div>
      </section>

      <section className="grid lg:grid-cols-[280px_1fr] gap-5">
        <aside className="space-y-2">
          {experiences.map(item => (
            <button key={item.title} onClick={() => setSrc(item.url)} className={`w-full text-left rounded-2xl border p-4 transition-all ${src === item.url ? 'border-blue-500 bg-blue-500/10' : ''}`} style={{ borderColor: src === item.url ? '#3b82f6' : 'var(--border)', backgroundColor: src === item.url ? undefined : 'var(--surface)' }}>
              <div className="flex gap-3">
                <span className="mt-0.5 text-blue-400">{item.icon}</span>
                <span className="min-w-0">
                  <span className="block font-semibold text-sm">{item.title}</span>
                  {language !== 'en' && <span className="block font-urdu text-xs mt-1" dir="rtl">{item.ur}</span>}
                  <span className="block text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>{item.description}</span>
                </span>
              </div>
            </button>
          ))}
          <div className="rounded-2xl border p-4 text-xs leading-5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
            <Info size={16} className="text-cyan-400 mb-2" />
            {text('NASA Eyes is a separate NASA web application embedded here. Some experiences work best on a desktop or laptop.', 'NASA Eyes ایک الگ NASA ویب ایپلیکیشن ہے جسے یہاں embed کیا گیا ہے۔ کچھ 3D تجربات desktop یا laptop پر بہتر چلتے ہیں۔')}
          </div>
        </aside>

        <div className="rounded-3xl overflow-hidden border bg-black" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-300">NASA Eyes Interactive</span>
            <a href={src} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-blue-300 hover:text-white">
              <Maximize2 size={14} /> Open full experience <ExternalLink size={13} />
            </a>
          </div>

          <div className="md:hidden p-5 bg-slate-950">
            <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-300 grid place-items-center"><Orbit size={24}/></div>
                <div>
                  <h3 className="font-black text-white">{text('NASA Eyes 3D experience','NASA Eyes 3D تجربہ')}</h3>
                  <p className="text-xs text-slate-400 mt-1">{text('The full NASA application is opened separately on mobile so its responsive controls do not overlap.','موبائل پر NASA کی مکمل ایپ الگ کھولی جاتی ہے تاکہ اس کے responsive controls ایک دوسرے پر نہ چڑھیں۔')}</p>
                </div>
              </div>
              <a href={src} target="_blank" rel="noreferrer" className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white">
                <ExternalLink size={16}/> {text('Open NASA Eyes','NASA Eyes کھولیں')}
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <iframe
              key={src}
              src={src}
              title="NASA Eyes interactive 3D space explorer"
              className="w-full h-[680px] border-0"
              allow="accelerometer; autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
