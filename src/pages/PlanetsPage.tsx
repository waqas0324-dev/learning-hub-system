import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { planets, PlanetData } from '../data/planets';
import { PlanetImage } from '../components/PlanetImage';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { BilingualFlowchart } from '../components/BilingualFlowchart';
import { InteractiveDiagram } from '../components/InteractiveDiagram';
import { getCelestialImage } from '../data/imageManifest';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from 'lucide-react';







export function PlanetsPage() {
  const { language } = useApp();
  const navigate = useNavigate();

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
          {renderText('The Eight Planets', 'آٹھ سیارے')}
        </h1>
        <p className="text-sm md:text-base max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Explore all eight planets of our Solar System. Each planet is unique with its own characteristics, size, and distance from the Sun.',
            'ہمارے نظامِ شمسی کے آٹھوں سیاروں کو دریافت کریں۔ ہر سیارہ اپنی خصوصیات، سائز اور سورج سے فاصلے میں منفرد ہے۔'
          )}
        </p>
      </div>

      {/* Planet Carousel */}
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
            fallbackGradient: planet.gradient
          }))}
        />
      </section>

      {/* Planet Order Flowchart */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Order of Planets from the Sun', 'سورج سے سیاروں کی ترتیب')}
        </h2>
        <BilingualFlowchart
          steps={planets.map(p => ({ en: p.name.en, ur: p.name.ur }))}
        />
      </section>

      {/* All Planet Details - Simple Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          {renderText('Explore Each Planet', 'ہر سیارے کو دریافت کریں')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Click on any planet to see its complete details, images, and facts.',
            'کسی بھی سیارے پر کلک کریں اور اس کی مکمل تفصیلات، تصاویر اور حقائق دیکھیں۔'
          )}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {planets.map((planet, index) => (
            <button
              key={planet.id}
              onClick={() => navigate(`/planets/${planet.id}`)}
              className="rounded-xl p-4 border transition-all hover:shadow-lg hover:scale-105 text-center"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold mb-2" style={{ color: 'var(--accent)' }}>{index + 1}</span>
                <PlanetImage planetId={planet.imageId} size={120} />
                <h3 className="font-bold mt-3" style={{ color: 'var(--text-primary)' }}>
                  {language === 'ur' ? planet.name.ur : planet.name.en}
                  {language === 'both' && <span className="block font-urdu text-sm mt-1" dir="rtl">{planet.name.ur}</span>}
                </h3>
                <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                  {renderText('Click to explore', 'دریافت کرنے کے لیے کلک کریں')}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Inner vs Outer Planets */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Inner Planets vs Outer Planets', 'اندرونی سیارے بمقابلہ بیرونی سیارے')}
        </h2>
        <p className="text-sm md:text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Solar System is divided into two groups: the inner rocky planets (Mercury, Venus, Earth, Mars) and the outer giant planets (Jupiter, Saturn, Uranus, Neptune).',
            'نظامِ شمسی دو گروپوں میں تقسیم ہے: اندرونی پتھریلے سیارے (عطارد، زہرہ، زمین، مریخ) اور بیرونی دیو سیارے (مشتری، زحل، یورینس، نیپچون)۔'
          )}
        </p>
        <BilingualFlowchart
          steps={[
            { en: 'Inner Rocky Planets', ur: 'اندرونی پتھریلے سیارے' },
            { en: 'Asteroid Belt', ur: 'سیارچوں کی پٹی' },
            { en: 'Gas Giants', ur: 'گیس دیو' },
            { en: 'Ice Giants', ur: 'برفانی دیو' }
          ]}
        />
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse min-w-[600px]" style={{ color: 'var(--text-primary)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>
                  {renderText('Feature', 'خصوصیت')}
                </th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>
                  {renderText('Inner Planets', 'اندرونی سیارے')}
                </th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>
                  {renderText('Outer Planets', 'بیرونی سیارے')}
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { en: ['Planets', 'Mercury, Venus, Earth, Mars', 'Jupiter, Saturn, Uranus, Neptune'], ur: ['سیارے', 'عطارد، زہرہ، زمین، مریخ', 'مشتری، زحل، یورینس، نیپچون'] },
                { en: ['Type', 'Rocky/Terrestrial', 'Gas/Ice Giants'], ur: ['قسم', 'پتھریلے', 'گیس/برفانی دیو'] },
                { en: ['Surface', 'Solid surface', 'No solid surface'], ur: ['سطح', 'ٹھوس سطح', 'کوئی ٹھوس سطح نہیں'] },
                { en: ['Size', 'Smaller', 'Much larger'], ur: ['سائز', 'چھوٹے', 'بہت بڑے'] },
                { en: ['Moons', 'Few or none', 'Many moons'], ur: ['چاند', 'کم یا نہیں', 'بہت سے چاند'] },
                { en: ['Rings', 'No rings', 'All have rings'], ur: ['حلقے', 'کوئی حلقے نہیں', 'سب کے حلقے ہیں'] }
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

      {/* Planet Formation */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('How Did the Planets Form?', 'سیارے کیسے بنے؟')}
        </h2>
        <p className="text-sm md:text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'About 4.6 billion years ago, a giant cloud of gas and dust collapsed under gravity. Most material formed the Sun at the center, while the remaining material formed a spinning disk. Small particles collided and stuck together, gradually forming larger bodies that became the planets.',
            'تقریباً 4.6 ارب سال پہلے، گیس اور گرد کا ایک بہت بڑا بادل کششِ ثقل کی وجہ سے سکڑنے لگا۔ زیادہ تر مادہ مرکز میں سورج بنا، جبکہ باقی مادہ گھومتی ہوئی قرص بن گیا۔ چھوٹے ذرات آپس میں ٹکرائے اور جڑتے گئے، اور آہستہ آہستہ بڑے اجسام بنے جو سیارے بن گئے۔'
          )}
        </p>
        <BilingualFlowchart
          steps={[
            { en: 'Giant cloud collapses', ur: 'بڑا بادل سکڑتا ہے' },
            { en: 'Sun forms at center', ur: 'مرکز میں سورج بنتا ہے' },
            { en: 'Spinning disk forms', ur: 'گھومتی قرص بنتی ہے' },
            { en: 'Particles collide', ur: 'ذرات ٹکراتے ہیں' },
            { en: 'Planets form', ur: 'سیارے بنتے ہیں' }
          ]}
        />
      </section>

      {/* Fun Facts */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Planet Fun Facts', 'سیاروں کے دلچسپ حقائق')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { en: 'Mercury is the smallest planet and closest to the Sun.', ur: 'عطارد سب سے چھوٹا سیارہ ہے اور سورج کے سب سے قریب ہے۔' },
            { en: 'Venus is the hottest planet due to its thick atmosphere.', ur: 'زہرہ اپنی گھنی فضا کی وجہ سے سب سے گرم سیارہ ہے۔' },
            { en: 'Earth is the only planet known to support life.', ur: 'زمین واحد سیارہ ہے جہاں زندگی موجود ہے۔' },
            { en: 'Mars has the largest volcano in the Solar System.', ur: 'مریخ پر نظامِ شمسی کا سب سے بڑا آتش فشاں ہے۔' },
            { en: 'Jupiter is so large that all other planets could fit inside it.', ur: 'مشتری اتنا بڑا ہے کہ اس میں باقی تمام سیارے آ سکتے ہیں۔' },
            { en: 'Saturn\'s rings are made mostly of ice particles.', ur: 'زحل کے حلقے زیادہ تر برف کے ذرات سے بنے ہیں۔' },
            { en: 'Uranus rotates on its side.', ur: 'یورینس پہلو کے بل گھومتا ہے۔' },
            { en: 'Neptune has the strongest winds in the Solar System.', ur: 'نیپچون پر نظامِ شمسی کی سب سے تیز ہوائیں چلتی ہیں۔' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {renderText(fact.en, fact.ur)}
            </div>
          ))}
        </div>
      </section>

      {/* Sources */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Sources', 'ماخذ')}
        </h2>
        <div className="space-y-2">
          {['NASA Science - science.nasa.gov', 'NASA Planetary Fact Sheets', 'NASA Photojournal', 'NASA Solar System Exploration'].map((source, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {source}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
