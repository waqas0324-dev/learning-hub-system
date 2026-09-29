import React, { useEffect, useMemo, useState } from 'react';
import { Pause, Play, RotateCcw, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import '../styles/earth-process.css';

type AnimationType = 'water' | 'plates';
type Step = { en: string; ur: string; detailEn: string; detailUr: string };

const waterSteps: Step[] = [
  { en: 'Sun heats the ocean', ur: 'سورج سمندر کو گرم کرتا ہے', detailEn: 'Solar energy warms surface water and provides the energy that drives evaporation.', detailUr: 'سورج کی توانائی سمندر کی سطح کے پانی کو گرم کرتی ہے اور تبخیر کے لیے توانائی فراہم کرتی ہے۔' },
  { en: 'Evaporation', ur: 'تبخیر', detailEn: 'Liquid water changes into invisible water vapor and rises from the ocean surface.', detailUr: 'مائع پانی آبی بخارات میں تبدیل ہو کر سمندر کی سطح سے اوپر اٹھتا ہے۔' },
  { en: 'Transpiration', ur: 'نباتاتی تبخیر', detailEn: 'Plants release water vapor through tiny openings in their leaves.', detailUr: 'پودے اپنے پتوں کے باریک سوراخوں کے ذریعے آبی بخارات خارج کرتے ہیں۔' },
  { en: 'Condensation', ur: 'تکثیف', detailEn: 'Rising moist air cools. Water vapor condenses into tiny droplets and clouds grow.', detailUr: 'اوپر اٹھتی نم ہوا ٹھنڈی ہوتی ہے۔ آبی بخارات ننھی بوندوں میں بدل کر بادل بناتے ہیں۔' },
  { en: 'Precipitation', ur: 'بارش / برف باری', detailEn: 'When droplets or ice crystals become heavy enough, water falls as rain or snow.', detailUr: 'جب بوندیں یا برف کے ذرات کافی بھاری ہو جائیں تو پانی بارش یا برف کی صورت میں زمین پر گرتا ہے۔' },
  { en: 'Collection', ur: 'جمع ہونا', detailEn: 'Water collects in rivers, lakes, soil and groundwater and eventually returns to the ocean.', detailUr: 'پانی دریاؤں، جھیلوں، مٹی اور زیرِ زمین پانی میں جمع ہوتا ہے اور بالآخر سمندر تک پہنچتا ہے۔' },
  { en: 'Runoff → ocean', ur: 'بہاؤ → سمندر', detailEn: 'Gravity moves water downhill through streams and rivers, closing the continuous cycle.', detailUr: 'کششِ ثقل پانی کو ڈھلوان کے ساتھ ندیوں اور دریاؤں میں بہاتی ہے اور چکر دوبارہ شروع ہوتا ہے۔' }
];

const plateSteps: Step[] = [
  { en: 'Tectonic plates', ur: 'ٹیکٹونک پلیٹس', detailEn: 'Earth’s rigid lithosphere is divided into large plates that move slowly over the hotter, weaker asthenosphere.', detailUr: 'زمین کا سخت لیتھوسفیئر بڑی پلیٹوں میں تقسیم ہے جو نسبتاً نرم اور گرم استھینوسفیئر پر آہستہ حرکت کرتی ہیں۔' },
  { en: 'Divergent boundary', ur: 'ڈائورجنٹ باؤنڈری', detailEn: 'Plates move apart. Hot mantle rises and new crust forms at spreading centers.', detailUr: 'پلیٹس ایک دوسرے سے دور ہوتی ہیں۔ گرم مینٹل اوپر آتا ہے اور نئی کرسٹ بنتی ہے۔' },
  { en: 'Convergent boundary', ur: 'کنورجنٹ باؤنڈری', detailEn: 'Plates move toward each other. One plate may subduct, or continents may collide and build mountains.', detailUr: 'پلیٹس ایک دوسرے کی طرف بڑھتی ہیں۔ ایک پلیٹ دوسری کے نیچے جا سکتی ہے یا براعظم ٹکرا کر پہاڑ بنا سکتے ہیں۔' },
  { en: 'Transform boundary', ur: 'ٹرانسفارم باؤنڈری', detailEn: 'Plates slide horizontally past one another along faults, where earthquakes can occur.', detailUr: 'پلیٹس فالٹس کے ساتھ ایک دوسرے کے پہلو سے افقی طور پر گزرتی ہیں جہاں زلزلے آ سکتے ہیں۔' }
];

function Bilingual({ en, ur }: { en: string; ur: string }) {
  const { language } = useApp();
  if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
  if (language === 'both') return <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
  return <span>{en}</span>;
}

export function EarthProcessAnimation({ type }: { type: AnimationType }) {
  const { language } = useApp();
  const steps = type === 'water' ? waterSteps : plateSteps;
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setStep(s => (s + 1) % steps.length), 2600 / speed);
    return () => window.clearInterval(id);
  }, [playing, speed, steps.length]);

  const phase = useMemo(
    () => type === 'water'
      ? ['heat','evaporation','transpiration','condensation','precipitation','collection','runoff'][step]
      : ['plates','divergent','convergent','transform'][step],
    [type, step]
  );
  const next = () => setStep(s => (s + 1) % steps.length);
  const prev = () => setStep(s => (s - 1 + steps.length) % steps.length);
  const reset = () => { setPlaying(false); setStep(0); };
  const isWater = type === 'water';

  return (
    <section className="earth-process-card">
      <div className="earth-process-header">
        <div>
          <div className="earth-process-kicker">{isWater ? 'VISUAL SIMULATION • WATER CYCLE' : 'VISUAL SIMULATION • PLATE TECTONICS'}</div>
          <h3>{isWater ? <Bilingual en="Watch the complete water cycle" ur="مکمل آبی چکر حرکت میں دیکھیں" /> : <Bilingual en="Watch tectonic plates actually move" ur="ٹیکٹونک پلیٹس کی حقیقی حرکت کا ماڈل دیکھیں" />}</h3>
          <p>{isWater
            ? <Bilingual en="Sunlight heats the ocean → vapor rises → clouds form → rain falls → water runs back to rivers and the ocean." ur="سورج سمندر کو گرم کرتا ہے → بخارات اوپر اٹھتے ہیں → بادل بنتے ہیں → بارش گرتی ہے → پانی دوبارہ دریاؤں اور سمندر تک جاتا ہے۔" />
            : <Bilingual en="See the three major boundary motions: apart, together, and sliding past." ur="تین بڑی پلیٹ حرکات دیکھیں: دور ہونا، ٹکرانا اور ایک دوسرے کے پہلو سے سرکنا۔" />}
          </p>
        </div>
        <span className="earth-process-step">{step + 1}/{steps.length}</span>
      </div>

      <div className={`earth-process-scene ${isWater ? 'water-scene' : 'plates-scene'} phase-${phase}`}>
        {isWater ? (
          <>
            <div className="water-sky-glow" />
            <div className="water-sun"><span /></div>
            <div className="water-sun-label"><Bilingual en="SUN • HEAT" ur="سورج • حرارت" /></div>
            <div className="water-ocean">
              <div className="water-wave wave-a" /><div className="water-wave wave-b" /><div className="water-wave wave-c" />
              <div className="water-ocean-label"><Bilingual en="OCEAN WATER" ur="سمندری پانی" /></div>
            </div>
            <div className="water-land"><div className="water-hill" /><div className="water-tree"><i /><b /><em /></div><div className="water-river" /></div>
            <div className="water-heat-rays">{Array.from({length:8}).map((_,i)=><i key={i} style={{'--i':i} as React.CSSProperties} />)}</div>
            <div className="water-vapor">{Array.from({length:10}).map((_,i)=><i key={i} style={{'--i':i} as React.CSSProperties} />)}</div>
            <div className="water-cloud cloud-one"><i /><b /><em /></div>
            <div className="water-cloud cloud-two"><i /><b /><em /></div>
            <div className="water-rain">{Array.from({length:18}).map((_,i)=><i key={i} style={{'--i':i} as React.CSSProperties} />)}</div>
            <div className="water-runoff-dots">{Array.from({length:8}).map((_,i)=><i key={i} style={{'--i':i} as React.CSSProperties} />)}</div>
            <div className="water-callout callout-heat"><span>1</span><Bilingual en="Heat" ur="حرارت" /></div>
            <div className="water-callout callout-evap"><span>2</span><Bilingual en="Evaporation" ur="تبخیر" /></div>
            <div className="water-callout callout-cloud"><span>4</span><Bilingual en="Clouds" ur="بادل" /></div>
            <div className="water-callout callout-rain"><span>5</span><Bilingual en="Rain" ur="بارش" /></div>
            <div className="water-callout callout-runoff"><span>7</span><Bilingual en="Runoff" ur="بہاؤ" /></div>
            <div className="earth-scene-caption"><Bilingual en={steps[step].en} ur={steps[step].ur} /></div>
          </>
        ) : (
          <>
            <div className="plate-mantle"><div className="magma magma-a"/><div className="magma magma-b"/><div className="magma magma-c"/></div>
            <div className="plate-crust plate-left"><span>PLATE A</span></div>
            <div className="plate-crust plate-right"><span>PLATE B</span></div>
            <div className="plate-boundary-line" />
            <div className="plate-rift"><i/><i/><i/></div>
            <div className="plate-mountain"><i/><b/><em/></div>
            <div className="plate-volcano"><i/><b/></div>
            <div className="plate-quake">{Array.from({length:4}).map((_,i)=><i key={i}/>)}</div>
            <div className="plate-arrow arrow-left">←</div><div className="plate-arrow arrow-right">→</div>
            <div className="plate-label plate-boundary-label"><Bilingual en={steps[step].en} ur={steps[step].ur} /></div>
            <div className="earth-scene-caption"><Bilingual en={steps[step].detailEn} ur={steps[step].detailUr} /></div>
          </>
        )}
      </div>

      <div className="earth-process-controls">
        <button onClick={() => setPlaying(v => !v)} className="earth-control primary">{playing ? <Pause size={17}/> : <Play size={17}/>}<Bilingual en={playing ? 'Pause' : 'Play'} ur={playing ? 'روکیں' : 'چلائیں'} /></button>
        <button onClick={reset} className="earth-control"><RotateCcw size={17}/><Bilingual en="Reset" ur="دوبارہ" /></button>
        <button onClick={prev} className="earth-control icon-only" aria-label="Previous"><ChevronLeft size={18}/></button>
        <div className="earth-speed"><span>{language === 'ur' ? 'رفتار' : 'Speed'}</span>{[0.7,1,1.5].map(v => <button key={v} onClick={() => setSpeed(v)} className={speed === v ? 'active' : ''}>{v}×</button>)}</div>
        <button onClick={next} className="earth-control icon-only" aria-label="Next"><ChevronRight size={18}/></button>
      </div>

      <div className="earth-process-lesson"><div className="lesson-number">{step + 1}</div><div><h4><Bilingual en={steps[step].en} ur={steps[step].ur} /></h4><p><Bilingual en={steps[step].detailEn} ur={steps[step].detailUr} /></p></div></div>

      {isWater && (
        <div className="earth-real-video">
          <div><strong><Bilingual en="Real NASA animation" ur="NASA کی اصل اینیمیشن" /></strong><p><Bilingual en="Official NASA visualization: ocean evaporation → clouds → precipitation → return to the ocean." ur="NASA کی اصل بصری اینیمیشن: سمندر سے بخارات → بادل → بارش → دوبارہ سمندر تک واپسی۔" /></p></div>
          <video controls preload="metadata" poster="https://svs.gsfc.nasa.gov/vis/a010000/a010500/a010501/water_cycle_appletv_1280x720_web.png" className="w-full rounded-2xl" src="https://svs.gsfc.nasa.gov/vis/a010000/a010500/a010501/water_cycle_appletv_1280x720.webmhd.webm" />
          <a href="https://svs.gsfc.nasa.gov/10501" target="_blank" rel="noreferrer" className="earth-source-link"><ExternalLink size={15}/> NASA SVS — Water Cycle</a>
        </div>
      )}
      {!isWater && <div className="earth-source-link-wrap"><a href="https://www.usgs.gov/media/images/tectonic-plates-earth" target="_blank" rel="noreferrer" className="earth-source-link"><ExternalLink size={15}/> USGS reference — Tectonic Plates of the Earth</a></div>}
    </section>
  );
}
