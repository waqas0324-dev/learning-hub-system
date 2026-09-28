import React from 'react';
import { useApp } from '../contexts/AppContext';
import { getCelestialImage } from '../data/imageManifest';

interface VisualLearningPanelProps {
  planetId: string;
  definition: { en: string; ur: string };
  description: { en: string; ur: string };
  avgDistance: string;
  orbitalPeriod: string;
  diameter: string;
}

export function VisualLearningPanel({
  planetId,
  definition,
  description,
  avgDistance,
  orbitalPeriod,
  diameter
}: VisualLearningPanelProps) {
  const { language } = useApp();
  const image = getCelestialImage(planetId);

  const text = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
  };

  const title = {
    mercury: { en: 'Mercury', ur: 'عطارد' },
    venus: { en: 'Venus', ur: 'زہرہ' },
    earth: { en: 'Earth', ur: 'زمین' },
    mars: { en: 'Mars', ur: 'مریخ' },
    jupiter: { en: 'Jupiter', ur: 'مشتری' },
    saturn: { en: 'Saturn', ur: 'زحل' },
    uranus: { en: 'Uranus', ur: 'یورینس' },
    neptune: { en: 'Neptune', ur: 'نیپچون' }
  }[planetId] || { en: planetId, ur: planetId };

  return (
    <section className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="p-5 md:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.2fr)] gap-6 items-stretch">
          <div className="relative rounded-2xl overflow-hidden min-h-[240px] lg:min-h-[300px] flex items-center justify-center" style={{ background: 'radial-gradient(circle at 50% 50%, #15264a 0%, #07101f 62%, #020611 100%)' }}>
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-36 h-36 rounded-full border border-white/10 animate-pulse" />
              <div className="absolute w-56 h-56 rounded-full border border-white/10" />
              <div className="absolute w-72 h-72 rounded-full border border-white/5" />
              <div className="absolute w-5 h-5 rounded-full bg-amber-300 shadow-[0_0_35px_10px_rgba(251,191,36,.45)] left-[13%] top-[47%]" />
              <div className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_18px_4px_rgba(255,255,255,.5)]" style={{ animation: 'planet-orbit 6s linear infinite' }} />
              <img src={image.fullDiskImageUrl} alt={language === 'ur' ? image.altText.ur : image.altText.en} className="relative z-10 w-44 h-44 md:w-52 md:h-52 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,.22)]" />
            </div>
            <div className="absolute bottom-3 left-3 right-3 z-20 px-3 py-2 rounded-xl backdrop-blur-sm bg-black/45 border border-white/10">
              <div className="text-sm font-semibold text-white">{text(title.en, title.ur)}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--accent)' }}>{text('Definition', 'تعریف')}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{text(title.en, title.ur)}</h3>
              <p className="text-sm md:text-base leading-7" style={{ color: 'var(--text-secondary)' }}>{text(definition.en, definition.ur)}</p>
            </div>

            <div className="rounded-xl p-4 border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-muted)' }}>
              <div className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{text('What this means', 'اس کا مطلب')}</div>
              <p className="text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>{text(description.en, description.ur)}</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: { en: 'Diameter', ur: 'قطر' }, value: diameter },
                { label: { en: 'Sun distance', ur: 'سورج سے فاصلہ' }, value: avgDistance },
                { label: { en: 'Orbit period', ur: 'مداری مدت' }, value: orbitalPeriod }
              ].map(item => (
                <div key={item.label.en} className="rounded-xl p-3 border text-center" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-[11px] mb-1" style={{ color: 'var(--text-secondary)' }}>{text(item.label.en, item.label.ur)}</div>
                  <div className="text-xs md:text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-xl border p-4 overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{text('Animated sunlight', 'سورج کی روشنی کی حرکت')}</div>
            <div className="relative h-28 rounded-lg overflow-hidden" style={{ background: 'linear-gradient(90deg,#ff9d00 0%,#21182d 42%,#07101f 100%)' }}>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-amber-300 shadow-[0_0_30px_10px_rgba(251,191,36,.5)]" />
              {[0,1,2,3,4].map(i => (
                <span key={i} className="absolute left-16 top-1/2 h-px bg-amber-200/70" style={{ width: 42 + i * 22, transform: `translateY(${(i - 2) * 13}px) rotate(${(i - 2) * 4}deg)`, transformOrigin: 'left center', animation: 'ray-flow 1.8s ease-in-out infinite', animationDelay: `${i * .18}s` }} />
              ))}
              <div className="absolute right-7 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full overflow-hidden border border-white/20 bg-slate-900">
                <img src={image.fullDiskImageUrl} alt="" className="w-full h-full object-contain" />
              </div>
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>{text('Light travels outward from the Sun and reaches the planet.', 'روشنی سورج سے باہر کی طرف سفر کرتی ہے اور سیارے تک پہنچتی ہے۔')}</p>
          </div>

          <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)' }}>
            <div className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{text('Visual learning flow', 'بصری سیکھنے کا فلو')}</div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-center">
              {[
                { en: 'Sun', ur: 'سورج' },
                { en: 'Light', ur: 'روشنی' },
                { en: title.en, ur: title.ur },
                { en: 'Observation', ur: 'مشاہدہ' }
              ].map((step, i, arr) => (
                <React.Fragment key={step.en}>
                  <div className="min-w-[78px] rounded-xl border px-3 py-3" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-muted)' }}>
                    <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{text(step.en, step.ur)}</div>
                  </div>
                  {i < arr.length - 1 && <div className="text-lg" style={{ color: 'var(--accent)' }}>→</div>}
                </React.Fragment>
              ))}
            </div>
            <p className="text-xs mt-3 text-center" style={{ color: 'var(--text-secondary)' }}>{text('The diagram explains the relationship instead of replacing it with generic text.', 'یہ خاکہ تعلق کو صرف عام متن کے بجائے بصری انداز میں سمجھاتا ہے۔')}</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes planet-orbit { from { transform: rotate(0deg) translateX(116px) rotate(0deg); } to { transform: rotate(360deg) translateX(116px) rotate(-360deg); } }
        @keyframes ray-flow { 0%,100% { opacity:.25; transform-origin:left center; } 50% { opacity:1; } }
      `}</style>
    </section>
  );
}
