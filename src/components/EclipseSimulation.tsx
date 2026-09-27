import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Sun, CircleDot, Globe2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

type Mode = 'solar' | 'lunar';

export function EclipseSimulation() {
  const { language } = useApp();
  const [mode, setMode] = useState<Mode>('lunar');
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0.18);

  const t = (en: string, ur: string) =>
    language === 'en' ? <>{en}</> :
    language === 'ur' ? <span className="font-urdu" dir="rtl">{ur}</span> :
    <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setProgress((p) => (p + 0.004) % 1), 40);
    return () => window.clearInterval(id);
  }, [playing]);

  const reset = () => { setProgress(0.18); setPlaying(false); };
  const isLunar = mode === 'lunar';
  const phase = isLunar ? progress : (progress + 0.5) % 1;
  const eclipseStrength = Math.max(0, 1 - Math.abs(phase - 0.5) / 0.34);
  const moonX = 12 + phase * 76;

  return (
    <section className="rounded-3xl border overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="p-5 md:p-7 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] opacity-60">NASA-inspired educational simulation</div>
            <h2 className="text-2xl md:text-3xl font-black mt-1">{t('Live Eclipse Demonstration', 'گرہن کا لائیو مظاہرہ')}</h2>
            <p className="text-sm mt-2 opacity-70">{t('Interactive geometry — distances and sizes are intentionally compressed.', 'یہ تعلیمی جیومیٹری ہے — فاصلے اور سائز جان بوجھ کر مختصر کیے گئے ہیں۔')}</p>
          </div>
          <div className="flex rounded-xl p-1 gap-1" style={{ backgroundColor: 'var(--surface-muted)' }}>
            {(['solar','lunar'] as Mode[]).map((m) => (
              <button key={m} onClick={() => { setMode(m); setProgress(0.18); setPlaying(true); }}
                className="px-4 py-2 rounded-lg text-sm font-bold"
                style={{ backgroundColor: mode === m ? 'var(--accent)' : 'transparent', color: mode === m ? '#fff' : 'var(--text-primary)' }}>
                {m === 'solar' ? t('Solar eclipse', 'سورج گرہن') : t('Lunar eclipse', 'چاند گرہن')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-7">
        <div className="relative min-h-[300px] md:min-h-[390px] rounded-2xl overflow-hidden bg-[#030712] border border-slate-700">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 25%, #fff 1px, transparent 1.5px), radial-gradient(circle at 75% 35%, #fff 1px, transparent 1.5px), radial-gradient(circle at 55% 80%, #fff 1px, transparent 1.5px)', backgroundSize: '90px 80px, 130px 120px, 160px 130px' }} />

          {isLunar ? (
            <>
              <div className="absolute left-[5%] top-1/2 -translate-y-1/2">
                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full" style={{ background: 'radial-gradient(circle at 35% 30%, #fff7b0, #ffd43b 38%, #ff8c00)', boxShadow: '0 0 55px #ff9f1a' }}>
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-white/80">{t('Sun', 'سورج')}</span>
                </div>
              </div>
              <div className="absolute left-[39%] top-1/2 -translate-y-1/2">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full" style={{ background: 'radial-gradient(circle at 32% 28%, #78c6ff, #2f72c7 35%, #17345c 70%)', boxShadow: '0 0 25px #2b6cb0' }}>
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-white/80">{t('Earth', 'زمین')}</span>
                </div>
                <div className="absolute top-1/2 left-full w-[260px] md:w-[340px] h-20 -translate-y-1/2 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(15,23,42,.08), rgba(0,0,0,.78), rgba(0,0,0,.04))', clipPath: 'polygon(0 35%,100% 0,100% 100%,0 65%)' }} />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 transition-[left] duration-75" style={{ left: String(moonX) + '%' }}>
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full" style={{ background: 'radial-gradient(circle at 32% 28%, #f4f4f4, #a9a9a9 48%, #4b5563)', boxShadow: eclipseStrength > .55 ? '0 0 25px rgba(255,120,80,.28)' : '0 0 10px rgba(255,255,255,.2)' }}>
                  {eclipseStrength > .55 && <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(185,65,42,' + (0.32 * eclipseStrength) + ')' }} />}
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/80">{t('Moon', 'چاند')}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="absolute left-[5%] top-1/2 -translate-y-1/2">
                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full" style={{ background: 'radial-gradient(circle at 35% 30%, #fff7b0, #ffd43b 38%, #ff8c00)', boxShadow: '0 0 55px #ff9f1a' }}>
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-white/80">{t('Sun', 'سورج')}</span>
                </div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 transition-[left] duration-75" style={{ left: String(moonX) + '%' }}>
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-slate-100 via-slate-400 to-slate-700 shadow-xl">
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/80">{t('Moon', 'چاند')}</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-40 md:w-64 h-28" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.7), rgba(0,0,0,.04))', clipPath: 'polygon(0 45%,100% 0,100% 100%,0 55%)' }} />
              </div>
              <div className="absolute right-[7%] top-1/2 -translate-y-1/2">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full" style={{ background: 'radial-gradient(circle at 32% 28%, #78c6ff, #2f72c7 35%, #17345c 70%)', boxShadow: '0 0 25px #2b6cb0' }}>
                  <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(0,0,0,' + (0.08 + eclipseStrength * .55) + ')', clipPath: 'ellipse(' + (30 + eclipseStrength * 45) + '% 55% at ' + (25 + eclipseStrength * 55) + '% 50%)' }} />
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-white/80">{t('Earth', 'زمین')}</span>
                </div>
              </div>
            </>
          )}

          <div className="absolute left-1/2 -translate-x-1/2 top-4 rounded-full px-3 py-1 text-xs font-bold bg-black/50 text-white border border-white/10">
            {isLunar ? t('Sun → Earth → Moon', 'سورج → زمین → چاند') : t('Sun → Moon → Earth', 'سورج → چاند → زمین')}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs bg-black/60 text-white/80 text-center">
            {isLunar
              ? (eclipseStrength > .55 ? t('Moon is inside Earth’s umbra — eclipse phase', 'چاند زمین کے امبرا میں ہے — گرہن کا مرحلہ') : t('Moon is approaching or leaving the shadow', 'چاند سائے میں داخل یا باہر ہو رہا ہے'))
              : (eclipseStrength > .55 ? t('Moon’s shadow reaches Earth — eclipse phase', 'چاند کا سایہ زمین تک پہنچ رہا ہے — گرہن کا مرحلہ') : t('Moon is moving across the Sun–Earth line', 'چاند سورج اور زمین کی سیدھ میں حرکت کر رہا ہے'))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button onClick={() => setPlaying(!playing)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
            {playing ? <Pause size={18}/> : <Play size={18}/>}
            {playing ? t('Pause', 'روکیں') : t('Play', 'چلائیں')}
          </button>
          <button onClick={reset} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border font-bold" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <RotateCcw size={18}/>{t('Reset', 'دوبارہ')}
          </button>
          <div className="flex-1 min-w-[180px]">
            <input aria-label="Animation progress" type="range" min="0" max="1" step="0.001" value={progress} onChange={(e) => { setProgress(Number(e.target.value)); setPlaying(false); }} className="w-full accent-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 p-4 md:p-7 pt-0">
        {[
          [Sun, 'Sunlight', 'سورج کی روشنی', 'The Sun supplies the light that creates the shadow.'],
          [Globe2, 'Shadow geometry', 'سائے کی جیومیٹری', 'Umbra is darker; penumbra is the lighter outer shadow.'],
          [CircleDot, isLunar ? 'Moon crossing Earth’s shadow' : 'Moon casting shadow on Earth', isLunar ? 'چاند زمین کے سائے سے گزرتا ہے' : 'چاند زمین پر سایہ ڈالتا ہے', isLunar ? 'A lunar eclipse happens at full Moon when Earth is between Sun and Moon.' : 'A solar eclipse happens at new Moon when Moon is between Sun and Earth.']
        ].map(([Icon,title,ur,desc],i) => {
          const I = Icon as React.ComponentType<{size?: number; className?: string}>;
          return <div key={i} className="rounded-2xl border p-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-muted)' }}>
            <I size={22} className="text-blue-400"/>
            <h3 className="font-bold mt-2">{t(title as string, ur as string)}</h3>
            <p className="text-xs mt-1 opacity-70">{desc as string}</p>
          </div>;
        })}
      </div>
    </section>
  );
}
