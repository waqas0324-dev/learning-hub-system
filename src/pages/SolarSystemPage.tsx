import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { SolarSystem } from '../components/SolarSystem';
import { PlanetModal } from '../components/PlanetModal';
import { PlanetImage } from '../components/PlanetImage';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { BilingualFlowchart } from '../components/BilingualFlowchart';
import { planets, PlanetData } from '../data/planets';
import { getCelestialImage } from '../data/imageManifest';
import { CheckCircle, XCircle } from 'lucide-react';

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
      <div
        className="relative min-h-[200px] flex items-center justify-center overflow-hidden"
        style={{ background: fallbackGradient || 'var(--surface-muted)' }}
      >
        {!imgError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-auto max-h-[400px] object-contain"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="p-8 text-center w-full min-h-[200px] flex flex-col items-center justify-center" style={{ background: 'var(--surface-muted)' }}>
            <div className="w-24 h-24 rounded-full mb-4 border grid place-items-center font-black" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>NASA</div>
            <div className="font-bold" style={{ color: 'var(--text-primary)' }}>NASA image unavailable</div>
            <div className="font-urdu text-sm mt-1" dir="rtl" style={{ color: 'var(--text-secondary)' }}>ناسا کی تصویر دستیاب نہیں</div>
          </div>
        )}
      </div>
      <figcaption className="p-4" style={{ background: 'var(--surface)' }}>
        <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
          {language === 'ur' ? <span className="font-urdu" dir="rtl">{captionUr}</span> : captionEn}
          {language === 'both' && <span className="block font-urdu mt-1" dir="rtl">{captionUr}</span>}
        </div>
        <div className="text-xs mt-2 opacity-60">{credit}</div>
      </figcaption>
    </figure>
  );
}

// ============================================
// DAY / YEAR VISUAL
// ============================================
function DayYearAnimation() {
  const { language } = useApp();
  const text = (en: string, ur: string) =>
    language === 'ur' ? <span className="font-urdu" dir="rtl">{ur}</span> :
    language === 'both' ? <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></> : <span>{en}</span>;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-black uppercase tracking-wide opacity-60">{text('Day = rotation', 'دن = محوری گردش')}</div>
        <div className="mt-4 h-28 rounded-xl bg-slate-950 grid place-items-center overflow-hidden">
          <div className="w-16 h-16 rounded-full border-4 border-cyan-300/70 relative animate-spin">
            <div className="absolute left-1/2 top-1/2 h-1 w-1/2 origin-left bg-cyan-300" />
          </div>
        </div>
        <p className="mt-3 text-sm opacity-70">{text('One spin around its axis measures a planet day.', 'اپنے محور کے گرد ایک چکر سیارے کے دن کی پیمائش ہے۔')}</p>
      </div>
      <div className="rounded-2xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-black uppercase tracking-wide opacity-60">{text('Year = orbit', 'سال = مداری گردش')}</div>
        <div className="mt-4 h-28 rounded-xl bg-slate-950 grid place-items-center">
          <div className="relative w-40 h-20 border border-violet-300/60 rounded-[50%]">
            <div className="absolute -left-3 top-7 w-6 h-6 rounded-full bg-amber-300" />
            <div className="absolute right-1 top-6 w-7 h-7 rounded-full bg-cyan-300 animate-pulse" />
          </div>
        </div>
        <p className="mt-3 text-sm opacity-70">{text('One orbit around the Sun measures a planet year.', 'سورج کے گرد ایک مکمل مدار سیارے کے سال کی پیمائش ہے۔')}</p>
      </div>
    </div>
  );
}

// ============================================
// SOLAR SYSTEM IMAGE GALLERY
// ============================================
function ImageCarousel() {
  const slides = [
    { src: 'https://images-assets.nasa.gov/image/PIA01341/PIA01341~medium.jpg', en: 'Solar System overview', ur: 'نظامِ شمسی کا جائزہ' },
    { src: 'https://images-assets.nasa.gov/image/PIA18033/PIA18033~small.jpg', en: 'Earth from space', ur: 'خلا سے زمین' },
    { src: 'https://images-assets.nasa.gov/image/PIA20038/PIA20038~small.jpg', en: 'Pluto', ur: 'پلوٹو' }
  ];
  const { language } = useApp();
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {slides.map((s) => (
        <figure key={s.src} className="overflow-hidden rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <img src={s.src} alt={s.en} className="h-48 w-full object-cover" loading="lazy" />
          <figcaption className="p-4 font-semibold">
            {language === 'ur' ? <span className="font-urdu" dir="rtl">{s.ur}</span> : s.en}
            {language === 'both' && <span className="block font-urdu mt-1" dir="rtl">{s.ur}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

// ============================================
// MINI KNOWLEDGE QUIZ
// ============================================
const quizQuestions = [
  { question: { en: 'Which planet is the largest?', ur: 'سب سے بڑا سیارہ کون سا ہے؟' }, options: [{en:'Jupiter',ur:'مشتری'},{en:'Earth',ur:'زمین'},{en:'Mars',ur:'مریخ'}], correct: 0, explanation: {en:'Jupiter is the largest planet in our Solar System.',ur:'مشتری ہمارے نظامِ شمسی کا سب سے بڑا سیارہ ہے۔'} },
  { question: { en: 'What keeps planets in orbit around the Sun?', ur: 'سیاروں کو سورج کے گرد مدار میں کیا رکھتا ہے؟' }, options: [{en:'Gravity',ur:'کششِ ثقل'},{en:'Sound',ur:'آواز'},{en:'Light only',ur:'صرف روشنی'}], correct: 0, explanation: {en:'The Sun’s gravity helps keep planets in orbit.',ur:'سورج کی کششِ ثقل سیاروں کو مدار میں رکھنے میں مدد دیتی ہے۔'} },
  { question: { en: 'Which planet is closest to the Sun?', ur: 'سورج کے سب سے قریب کون سا سیارہ ہے؟' }, options: [{en:'Mercury',ur:'عطارد'},{en:'Venus',ur:'زہرہ'},{en:'Neptune',ur:'نیپچون'}], correct: 0, explanation: {en:'Mercury is the innermost planet.',ur:'عطارد سب سے اندرونی سیارہ ہے۔'} }
];

function Quiz() {
  const { language } = useApp();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const renderText = (en: string, ur: string) =>
    language === 'ur' ? <span className="font-urdu" dir="rtl">{ur}</span> :
    language === 'both' ? <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></> : <span>{en}</span>;

  const question = quizQuestions[currentQ];
  const answer = (idx: number) => {
    if (selected !== null || finished) return;
    setSelected(idx);
    if (idx === question.correct) setScore(s => s + 1);
  };
  const next = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };
  const reset = () => { setCurrentQ(0); setSelected(null); setScore(0); setFinished(false); };

  if (finished) return (
    <div className="rounded-2xl border p-6 text-center" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="text-3xl font-black">{score}/{quizQuestions.length}</div>
      <p className="mt-2 opacity-70">{renderText('Quiz complete.', 'کوئز مکمل ہوگیا۔')}</p>
      <button onClick={reset} className="mt-4 rounded-xl px-5 py-2 font-bold" style={{ background: 'var(--accent)', color: '#fff' }}>{renderText('Try again', 'دوبارہ کوشش کریں')}</button>
    </div>
  );

  return (
    <div className="rounded-2xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex justify-between gap-4 mb-4 text-sm font-semibold opacity-70">
        <span>{renderText(`Question ${currentQ + 1} of ${quizQuestions.length}`, `سوال ${currentQ + 1} از ${quizQuestions.length}`)}</span>
        <span>{renderText(`Score: ${score}`, `اسکور: ${score}`)}</span>
      </div>
      <h3 className="text-lg font-bold mb-4">{renderText(question.question.en, question.question.ur)}</h3>
      <div className="space-y-2">
        {question.options.map((opt, idx) => (
          <button key={idx} onClick={() => answer(idx)} disabled={selected !== null} className="w-full rounded-xl border px-4 py-3 text-left" style={{
            background: selected === idx ? (idx === question.correct ? '#10b98120' : '#ef444420') : 'var(--surface-muted)',
            borderColor: selected !== null && idx === question.correct ? '#10b981' : 'var(--border)'
          }}>
            {renderText(opt.en, opt.ur)}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="mt-4 rounded-xl border p-4">
          <div className="flex items-center gap-2 font-bold">
            {selected === question.correct ? <CheckCircle size={18} /> : <XCircle size={18} />}
            {renderText(selected === question.correct ? 'Correct!' : 'Incorrect', selected === question.correct ? 'درست!' : 'غلط')}
          </div>
          <p className="mt-2 text-sm opacity-70">{renderText(question.explanation.en, question.explanation.ur)}</p>
          <button onClick={next} className="mt-4 w-full rounded-xl py-2 font-bold" style={{ background: 'var(--accent)', color: '#fff' }}>
            {renderText(currentQ < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz', currentQ < quizQuestions.length - 1 ? 'اگلا سوال' : 'کوئز مکمل کریں')}
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================
// FORMATION ANIMATION — VISUAL SOLAR NEBULA MODEL
// ============================================
function FormationAnimation() {
  const { language } = useApp();
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0);

  const steps = [
    { en:'Giant cloud collapses', ur:'بڑا بادل سکڑتا ہے', phase:'cloud' },
    { en:'Young Sun forms at the center', ur:'مرکز میں نوجوان سورج بنتا ہے', phase:'sun' },
    { en:'Spinning disk forms', ur:'گھومتی ہوئی قرص بنتی ہے', phase:'disk' },
    { en:'Particles collide and stick', ur:'ذرات ٹکراتے اور جڑتے ہیں', phase:'particles' },
    { en:'Planets grow from the disk', ur:'قرص سے سیارے بنتے ہیں', phase:'planets' }
  ];

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setStep(s => (s + 1) % steps.length), 2600);
    return () => window.clearInterval(id);
  }, [playing, steps.length]);

  const render = (en:string, ur:string) =>
    language === 'ur'
      ? <span className="font-urdu" dir="rtl">{ur}</span>
      : language === 'both'
        ? <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>
        : <span>{en}</span>;

  const phase = steps[step].phase;

  return (
    <div className="rounded-3xl border overflow-hidden" style={{background:'linear-gradient(135deg,#050816,#0f172a)',borderColor:'var(--border)'}}>
      <div className="p-5 md:p-7 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="formation-stage relative h-[330px] md:h-[390px] rounded-2xl overflow-hidden" data-phase={phase}>
            <div className="formation-stars" />
            <div className="formation-cloud" />
            <div className="formation-core" />
            <div className="formation-disk" />
            <div className="formation-particles">
              {Array.from({length:18}).map((_,i)=><i key={i} style={{'--i':i} as React.CSSProperties} />)}
            </div>
            <div className="formation-planets">
              {[0,1,2,3,4,5].map(i=><b key={i} style={{'--i':i} as React.CSSProperties} />)}
            </div>
            <div className="absolute inset-x-0 bottom-4 text-center text-white/80 text-xs md:text-sm">
              {render('Simplified animated model — not to scale','سادہ متحرک سائنسی ماڈل — حقیقی پیمانے پر نہیں')}
            </div>
          </div>
        </div>
        <div className="lg:w-[330px]">
          <p className="text-xs uppercase tracking-[0.18em] font-black text-cyan-300">4.6 BILLION YEARS AGO</p>
          <h3 className="text-2xl font-black text-white mt-2">{render('How the Solar System formed','نظامِ شمسی کیسے بنا')}</h3>
          <p className="text-sm text-slate-300 mt-3 leading-6">{render(
            'Watch the gas-and-dust cloud collapse, the young Sun appear, the disk spin, particles collide, and planets grow.',
            'گیس اور گرد کے بادل کے سکڑنے، نوجوان سورج کے بننے، قرص کے گھومنے، ذرات کے ٹکرانے اور سیاروں کے بننے کا عمل دیکھیں۔'
          )}</p>
          <div className="mt-5 space-y-2">
            {steps.map((s,i)=>(
              <button key={s.phase} onClick={()=>{setPlaying(false);setStep(i)}} className="w-full text-left rounded-xl border p-3 transition-all" style={{background:i===step?'rgba(59,130,246,.18)':'rgba(15,23,42,.7)',borderColor:i===step?'#3b82f6':'#334155'}}>
                <div className="text-[11px] uppercase tracking-wider text-blue-300">Step {i+1}</div>
                <div className="text-sm font-bold text-white mt-1">{render(s.en,s.ur)}</div>
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={()=>setPlaying(v=>!v)} className="flex-1 rounded-xl py-2.5 font-bold text-sm" style={{background:'#3b82f6',color:'#fff'}}>{playing ? render('Pause','روکیں') : render('Play animation','اینیمیشن چلائیں')}</button>
            <button onClick={()=>{setStep(0);setPlaying(true)}} className="rounded-xl border px-4 py-2.5 text-sm font-bold text-white" style={{borderColor:'#334155'}}>↻</button>
          </div>
        </div>
      </div>
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
            src="https://images-assets.nasa.gov/image/PIA01341/PIA01341~medium.jpg"
            alt="Solar System overview"
            captionEn="A simplified view of the Solar System."
            captionUr="نظامِ شمسی کا ایک سادہ منظر۔"
            credit="NASA planetary montage — visual context only"
            fallbackGradient="radial-gradient(circle at 40% 40%, #ffcc00, #ff8c00 20%, #4a90d9 40%, #1a3a5c 60%, #0a0e27)"
          />
          <p className="text-xs italic text-center mt-2" style={{ color: 'var(--text-secondary)' }}>
            {language === 'en' && 'Educational illustration — not to scale.'}
            {language === 'ur' && <span className="font-urdu" dir="rtl">تعلیمی خاکہ — حقیقی پیمانے پر نہیں۔</span>}
            {language === 'both' && (
              <>
                Educational illustration — not to scale.
                <br />
                <span className="font-urdu" dir="rtl">تعلیمی خاکہ — حقیقی پیمانے پر نہیں۔</span>
              </>
            )}
          </p>
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

      {/* SECTION 2.5: PLANET IMAGE CAROUSEL */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Planet Gallery', 'سیاروں کی گیلری')}
        </h2>
        <EducationalCarousel
          slides={planets.map(planet => ({
            imageUrl: getCelestialImage(planet.imageId).fullDiskImageUrl,
            captionEn: `${planet.name.en} - ${planet.fact.en}`,
            captionUr: `${planet.name.ur} - ${planet.fact.ur}`,
            credit: getCelestialImage(planet.imageId).credit,
            fallbackGradient: planet.gradient,
            link: `/planets/${planet.id}`
          }))}
        />
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
        <BilingualFlowchart
          steps={[
            { en: 'Planet moves forward', ur: 'سیارہ آگے حرکت کرتا ہے' },
            { en: "Sun's gravity pulls inward", ur: 'سورج کی کششِ ثقل اندر کھینچتی ہے' },
            { en: 'Curved path forms', ur: 'خمیدہ راستہ بنتا ہے' },
            { en: 'Planet stays in orbit', ur: 'سیارہ مدار میں رہتا ہے' }
          ]}
        />
      </section>

      {/* SECTION 4: EIGHT PLANETS - Simple Preview */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('The Eight Planets', 'آٹھ سیارے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Click on any planet to learn more about it.',
            'کسی بھی سیارے پر کلک کریں اور اس کے بارے میں مزید جانیں۔'
          )}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {planets.map((planet) => (
            <button
              key={planet.id}
              onClick={() => navigate(`/planets/${planet.id}`)}
              className="rounded-xl p-4 border transition-all hover:shadow-lg hover:scale-105 text-center"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <PlanetImage planetId={planet.imageId} size={100} />
              <h3 className="font-bold mt-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? planet.name.ur : planet.name.en}
                {language === 'both' && <span className="block font-urdu text-xs mt-1" dir="rtl">{planet.name.ur}</span>}
              </h3>
            </button>
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
        <BilingualFlowchart
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
        <BilingualFlowchart
          steps={[
            { en: 'Planet rotation', ur: 'سیارے کی محوری گردش' },
            { en: 'One complete spin', ur: 'ایک مکمل چکر' },
            { en: 'Length of day', ur: 'دن کی مدت' }
          ]}
        />
        <BilingualFlowchart
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
            { title: { en: 'Moons', ur: 'چاند' }, desc: { en: 'Moons are natural satellites that orbit planets or dwarf planets. Some planets have no moons, while giant planets can have many. The number of moons depends on gravity, formation history and the ability to capture or keep smaller objects.', ur: 'چاند قدرتی سیارہ نما ساتھی ہوتے ہیں جو سیاروں یا بونے سیاروں کے گرد گردش کرتے ہیں۔ کچھ سیاروں کے کوئی چاند نہیں ہوتے، جبکہ دیو سیاروں کے بہت سے چاند ہو سکتے ہیں۔ چاندوں کی تعداد کششِ ثقل، تشکیل کی تاریخ اور چھوٹے اجسام کو اپنی طرف کھینچنے یا محفوظ رکھنے کی صلاحیت پر منحصر ہوتی ہے。' }, img: 'https://images-assets.nasa.gov/image/PIA00405/PIA00405~small.jpg', gradient: 'radial-gradient(circle at 35% 35%, #d4d4d4, #a0a0a0 40%, #505050)' },
            { title: { en: 'Asteroids', ur: 'سیارچے' }, desc: { en: 'Asteroids are rocky objects that orbit the Sun. Many are found in the asteroid belt between Mars and Jupiter, but asteroids also exist in other regions of the Solar System.', ur: 'سیارچے پتھریلے اجسام ہیں جو سورج کے گرد گردش کرتے ہیں۔ بہت سے سیارچے مریخ اور مشتری کے درمیان سیارچوں کی پٹی میں پائے جاتے ہیں، لیکن نظامِ شمسی کے دوسرے علاقوں میں بھی سیارچے موجود ہیں۔' }, img: 'https://images-assets.nasa.gov/image/PIA24471/PIA24471~small.jpg', gradient: 'radial-gradient(circle at 35% 35%, #a08060, #6b5040 40%, #3d2d20)' },
            { title: { en: 'Comets', ur: 'دمدار ستارے' }, desc: { en: 'Comets are icy objects that orbit the Sun. When a comet comes close to the Sun, heat can turn some of its ice into gas and release dust. This can create a glowing cloud and a tail.', ur: 'دمدار ستارے برفیلے اجسام ہیں جو سورج کے گرد گردش کرتے ہیں۔ جب کوئی دمدار ستارہ سورج کے قریب آتا ہے تو حرارت اس کی کچھ برف کو گیس میں تبدیل کر سکتی ہے اور گرد خارج ہو سکتی ہے۔ اس سے ایک روشن غلاف اور دم بن سکتی ہے۔' }, img: 'https://images-assets.nasa.gov/image/PIA23165/PIA23165~small.jpg', gradient: 'radial-gradient(circle at 30% 30%, #e0e8ff, #8090c0 40%, #203060)' },
            { title: { en: 'Dwarf Planets', ur: 'بونے سیارے' }, desc: { en: 'A dwarf planet orbits the Sun and is rounded by its own gravity, but it has not cleared other objects from its orbital neighborhood. Pluto is a well-known dwarf planet.', ur: 'بونا سیارہ سورج کے گرد گردش کرتا ہے اور اپنی کششِ ثقل کی وجہ سے تقریباً گول ہوتا ہے، لیکن اس نے اپنے مداری علاقے سے دوسرے اجسام کو صاف نہیں کیا ہوتا۔ پلوٹو ایک مشہور بونا سیارہ ہے۔' }, img: 'https://images-assets.nasa.gov/image/PIA20038/PIA20038~small.jpg', gradient: 'radial-gradient(circle at 35% 35%, #d4c4a8, #a08868 40%, #504030)' }
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
          {renderText('Watch the physical process as an animated visual model.', 'اس جسمانی عمل کو متحرک بصری ماڈل میں دیکھیں۔')}
        </p>
        <FormationAnimation />
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
