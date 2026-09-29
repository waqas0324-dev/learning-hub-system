import React from 'react';
import { useApp } from '../contexts/AppContext';
import { EarthProcessAnimation } from '../components/EarthProcessAnimation';
import { Waves, Droplets, CloudRain, ArrowDown, ArrowUp, Fish, ThermometerSun } from 'lucide-react';

export function OceansPage() {
  const { language } = useApp();

  const text = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return (
      <>
        <span>{en}</span>
        <span className="block font-urdu mt-1" dir="rtl">{ur}</span>
      </>
    );
  };

  const waterStages = [
    { en: 'Evaporation', ur: 'تبخیر', Icon: ArrowUp, desc: 'Water gains heat and rises as vapor.' },
    { en: 'Condensation', ur: 'تکثیف', Icon: CloudRain, desc: 'Water vapor cools and forms clouds.' },
    { en: 'Precipitation', ur: 'بارش', Icon: Droplets, desc: 'Water returns to Earth as rain or snow.' },
    { en: 'Runoff', ur: 'سطحی بہاؤ', Icon: ArrowDown, desc: 'Water flows back toward rivers and oceans.' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-3xl overflow-hidden border border-slate-700 bg-gradient-to-br from-slate-950 via-cyan-950 to-sky-950 p-8 md:p-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-white/10 text-white mb-4">
            <Waves size={15} />
            {text('Water systems', 'آبی نظام')}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white">
            {text('Oceans & Water Cycle', 'سمندر اور آبی چکر')}
          </h1>
          <p className="mt-4 text-white/75 leading-7">
            {text(
              'Learn how ocean water moves through evaporation, condensation, precipitation, runoff and collection — and why oceans regulate Earth’s climate.',
              'سمجھیں کہ سمندری پانی تبخیر، تکثیف، بارش، بہاؤ اور جمع ہونے کے مراحل سے کیسے گزرتا ہے اور سمندر زمین کے موسم کو کیسے متاثر کرتے ہیں۔'
            )}
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {waterStages.map(({ en, ur, Icon, desc }) => (
          <div key={en} className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 bg-white dark:bg-slate-900">
            <Icon size={28} className="text-cyan-500" />
            <h3 className="font-bold mt-3" style={{ color: "var(--text-primary)" }}>{text(en, ur)}</h3>
            <p className="text-sm mt-2 text-slate-600 dark:text-slate-300">{desc}</p>
          </div>
        ))}
      </section>

      <EarthProcessAnimation type="water" />

      <section className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900">
          <Fish size={28} className="text-cyan-500" />
          <h2 className="font-bold text-xl mt-3" style={{ color: "var(--text-primary)" }}>{text('Ocean life', 'سمندری حیات')}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {text(
              'Oceans support food webs from microscopic plankton to large marine animals.',
              'سمندر خوردبینی پلانکٹن سے بڑے سمندری جانوروں تک خوراکی زنجیروں کو سہارا دیتے ہیں۔'
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900">
          <ThermometerSun size={28} className="text-orange-500" />
          <h2 className="font-bold text-xl mt-3">{text('Climate connection', 'آب و ہوا سے تعلق')}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {text(
              'The ocean stores and transports heat, influencing weather and climate around the world.',
              'سمندر حرارت کو ذخیرہ اور منتقل کرتے ہیں، جس سے دنیا بھر کے موسم اور آب و ہوا متاثر ہوتی ہے۔'
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
