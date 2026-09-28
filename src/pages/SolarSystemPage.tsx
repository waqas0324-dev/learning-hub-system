import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { SolarSystem } from '../components/SolarSystem';
import { PlanetModal } from '../components/PlanetModal';
import { PlanetImage } from '../components/PlanetImage';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { BilingualFlowchart } from '../components/BilingualFlowchart';
import { InteractiveDiagram } from '../components/InteractiveDiagram';
import { planets, PlanetData } from '../data/planets';
import { getCelestialImage } from '../data/imageManifest';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Play, Pause, ArrowRight, RotateCw, Orbit } from 'lucide-react';



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
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 min-h-[200px] flex items-center justify-center overflow-hidden">
        {!imgError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-auto max-h-[400px] object-contain"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="p-8 text-center w-full h-full flex flex-col items-center justify-center" style={{ background: 'var(--surface-muted)' }}>
            <div className="w-24 h-24 rounded-full mb-4 border grid place-items-center" style={{borderColor:'var(--border)',color:'var(--text-secondary)'}}>NASA</div>
            <div className="font-bold" style={{color:'var(--text-primary)'}}>NASA image unavailable</div>
            <div className="font-urdu text-sm mt-1" dir="rtl" style={{color:'var(--text-secondary)'}}>ناسا کی تصویر دستیاب نہیں</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: '#ef4444' }}>{incorrect}</div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{language === 'ur' ? 'غلط' : 'Incorrect'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{bestScore}</div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{language === 'ur' ? 'بہترین' : 'Best'}</div>
          </div>
        </div>
        <button onClick={handleRetry} className="px-6 py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          {renderText('Retry Quiz', 'دوبارہ کوشش')}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {renderText(`Question ${currentQ + 1} of ${quizQuestions.length}`, `سوال ${currentQ + 1} از ${quizQuestions.length}`)}
        </span>
        <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
          {renderText(`Score: ${score}`, `اسکور: ${score}`)}
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {renderText(question.question.en, question.question.ur)}
      </h3>
      <div className="space-y-2 mb-4">
        {question.options.map((opt, idx) => {
          let style: React.CSSProperties = { backgroundColor: 'var(--surface-muted)', borderColor: 'var(--border)', color: 'var(--text-primary)' };
          if (showResult) {
            if (idx === question.correct) style = { backgroundColor: '#10b98120', borderColor: '#10b981', color: '#10b981' };
            else if (idx === selected && idx !== question.correct) style = { backgroundColor: '#ef444420', borderColor: '#ef4444', color: '#ef4444' };
          }
          return (
            <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered} className="w-full text-left px-4 py-3 rounded-lg border transition-colors" style={style}>
              {renderText(opt.en, opt.ur)}
            </button>
          );
        })}
      </div>
      {showResult && (
        <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: selected === question.correct ? '#10b98115' : '#ef444415', border: `1px solid ${selected === question.correct ? '#10b981' : '#ef4444'}` }}>
          <div className="flex items-center gap-2 mb-2">
            {selected === question.correct ? <CheckCircle size={20} style={{ color: '#10b981' }} /> : <XCircle size={20} style={{ color: '#ef4444' }} />}
            <span className="font-semibold" style={{ color: selected === question.correct ? '#10b981' : '#ef4444' }}>
              {selected === question.correct ? renderText('Correct!', 'درست!') : renderText('Incorrect. Here is the correct answer.', 'یہ جواب درست نہیں ہے۔ درست جواب یہ ہے۔')}
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {renderText(question.explanation.en, question.explanation.ur)}
          </p>
        </div>
      )}
      {answered && (
        <button onClick={handleNext} className="w-full py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          {renderText(currentQ < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz', currentQ < quizQuestions.length - 1 ? 'اگلا سوال' : 'کوئز مکمل')}
        </button>
      )}
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
          {renderText('Simplified scientific formation model.', 'نظامِ شمسی کی تشکیل کا سادہ سائنسی نمونہ۔')}
        </p>
        <BilingualFlowchart
          steps={[
            { en: 'Giant cloud of gas and dust', ur: 'گیس اور گرد کا بہت بڑا بادل' },
            { en: 'Gravity pulls inward', ur: 'کششِ ثقل اندر کھینچتی ہے' },
            { en: 'Young Sun forms', ur: 'نوجوان سورج بنتا ہے' },
            { en: 'Spinning disk forms', ur: 'گھومتی قرص بنتی ہے' },
            { en: 'Particles collide', ur: 'ذرات ٹکراتے ہیں' },
            { en: 'Planets form', ur: 'سیارے بنتے ہیں' }
          ]}
        />
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
