import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { planetDetails } from '../data/planetDetails';
import { getCelestialImage } from '../data/imageManifest';
import { PlanetImage } from '../components/PlanetImage';
import { ScientificImage } from '../components/ScientificImage';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { InteractiveDiagram } from '../components/InteractiveDiagram';
import { BilingualFlowchart } from '../components/BilingualFlowchart';
import { VisualLearningPanel } from '../components/VisualLearningPanel';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Play, Pause, ArrowRight, ExternalLink } from 'lucide-react';

export function PlanetDetailPage() {
  const { planetId } = useParams<{ planetId: string }>();
  const navigate = useNavigate();
  const { language } = useApp();
  const [selectedPlanet, setSelectedPlanet] = useState<any>(null);
  const [gallerySlides, setGallerySlides] = useState<any[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  useEffect(() => {
    if (planetId && planetDetails[planetId]) {
      setSelectedPlanet(planetDetails[planetId]);
    } else {
      navigate('/solar-system');
    }
  }, [planetId, navigate]);

  useEffect(() => {
    if (!selectedPlanet) return;
    const controller = new AbortController();
    const fallback = getCelestialImage(selectedPlanet.id);
    setGalleryLoading(true);
    setGallerySlides([{
      imageUrl: fallback.fullDiskImageUrl,
      captionEn: `${selectedPlanet.id.charAt(0).toUpperCase() + selectedPlanet.id.slice(1)} — official NASA planet view`,
      captionUr: 'ناسا کی مستند سیاروی تصویر',
      credit: fallback.credit,
      fallbackGradient: fallback.fallbackGradient
    }]);

    const loadNASAImages = async () => {
      try {
        const query = encodeURIComponent(`${selectedPlanet.id} planet NASA`);
        const response = await fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image&page_size=24`, { signal: controller.signal });
        if (!response.ok) throw new Error('NASA image search failed');
        const data = await response.json();
        const items = Array.isArray(data?.collection?.items) ? data.collection.items : [];
        const seen = new Set<string>([fallback.fullDiskImageUrl]);
        const extra = items.map((item: any) => {
          const imageUrl = item?.links?.find((link: any) => link.rel === 'preview')?.href;
          const title = item?.data?.[0]?.title;
          if (!imageUrl || !title || seen.has(imageUrl)) return null;
          seen.add(imageUrl);
          return {
            imageUrl,
            captionEn: title,
            captionUr: `ناسا: ${title}`,
            credit: 'NASA Image and Video Library',
            fallbackGradient: fallback.fallbackGradient
          };
        }).filter(Boolean).slice(0, 7);
        if (extra.length) setGallerySlides([{ 
          imageUrl: fallback.fullDiskImageUrl,
          captionEn: `${selectedPlanet.id.charAt(0).toUpperCase() + selectedPlanet.id.slice(1)} — official NASA planet view`,
          captionUr: 'ناسا کی مستند سیاروی تصویر',
          credit: fallback.credit,
          fallbackGradient: fallback.fallbackGradient
        }, ...extra]);
      } catch {
        // Keep the official fallback image when the public NASA search is unavailable.
      } finally {
        setGalleryLoading(false);
      }
    };
    loadNASAImages();
    return () => controller.abort();
  }, [selectedPlanet?.id]);

  if (!selectedPlanet) return null;

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return (
      <>
        <span>{en}</span>
        <span className="block font-urdu mt-2" dir="rtl">{ur}</span>
      </>
    );
  };

  return (
    <div className="space-y-12 pb-8">
      {/* SECTION 1: HERO */}
      <section className="rounded-2xl overflow-hidden border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <ScientificImage 
                  subjectId={selectedPlanet.id} 
                  size={200} 
                  enableLightbox={true}
                  showCaption={false}
                  showCredit={false}
                />
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: `0 0 60px ${selectedPlanet.id === 'earth' ? '#4a90d9' : selectedPlanet.id === 'mars' ? '#c1440e' : selectedPlanet.id === 'jupiter' ? '#c88b3a' : selectedPlanet.id === 'saturn' ? '#e8d088' : selectedPlanet.id === 'uranus' ? '#7ec8e3' : selectedPlanet.id === 'neptune' ? '#3355cc' : selectedPlanet.id === 'venus' ? '#e8c468' : '#8c7e6d'}40` }} />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {renderText(
                  selectedPlanet.id.charAt(0).toUpperCase() + selectedPlanet.id.slice(1),
                  selectedPlanet.id === 'mercury' ? 'عطارد' :
                  selectedPlanet.id === 'venus' ? 'زہرہ' :
                  selectedPlanet.id === 'earth' ? 'زمین' :
                  selectedPlanet.id === 'mars' ? 'مریخ' :
                  selectedPlanet.id === 'jupiter' ? 'مشتری' :
                  selectedPlanet.id === 'saturn' ? 'زحل' :
                  selectedPlanet.id === 'uranus' ? 'یورینس' :
                  'نیپچون'
                )}
              </h1>
              <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>
                {renderText(selectedPlanet.type.en, selectedPlanet.type.ur)}
              </p>
              <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {renderText(selectedPlanet.coreDescription.en, selectedPlanet.coreDescription.ur)}
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                {renderText('Explore in Orbit', 'مدار میں دریافت کریں')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.25: DEFINITION + VISUAL EXPLANATION */}
      <VisualLearningPanel
        planetId={selectedPlanet.id}
        definition={selectedPlanet.coreDescription}
        description={selectedPlanet.detailedDescription}
        avgDistance={selectedPlanet.avgDistance}
        orbitalPeriod={selectedPlanet.yearLength}
        diameter={selectedPlanet.diameter}
      />

      {/* SECTION 1.5: NASA IMAGE GALLERY */}
      <section>
        <div className="flex items-end justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">{renderText('NASA visual gallery', 'ناسا بصری گیلری')}</p>
            <h2 className="text-2xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
              {renderText('Images of this planet', 'اس سیارے کی تصاویر')}
            </h2>
          </div>
          {galleryLoading && <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{renderText('Loading NASA images…', 'ناسا کی تصاویر لوڈ ہو رہی ہیں…')}</span>}
        </div>
        <EducationalCarousel slides={gallerySlides} showCredit={false} />
      </section>

      {/* SECTION 1.6: PLANET VIDEO */}
      <PlanetVideo planetId={selectedPlanet.id} planetName={selectedPlanet.id.charAt(0).toUpperCase() + selectedPlanet.id.slice(1)} />

      {/* SECTION 2: WHAT IS THIS PLANET? */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText(`What is ${selectedPlanet.id.charAt(0).toUpperCase() + selectedPlanet.id.slice(1)}?`, `${selectedPlanet.id === 'mercury' ? 'عطارد' : selectedPlanet.id === 'venus' ? 'زہرہ' : selectedPlanet.id === 'earth' ? 'زمین' : selectedPlanet.id === 'mars' ? 'مریخ' : selectedPlanet.id === 'jupiter' ? 'مشتری' : selectedPlanet.id === 'saturn' ? 'زحل' : selectedPlanet.id === 'uranus' ? 'یورینس' : 'نیپچون'} کیا ہے؟`)}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.detailedDescription.en, selectedPlanet.detailedDescription.ur)}
        </p>
      </section>

      {/* SECTION 3: BASIC FACTS */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Basic Facts', 'بنیادی حقائق')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: { en: 'Type', ur: 'قسم' }, value: selectedPlanet.type },
            { label: { en: 'Diameter', ur: 'قطر' }, value: { en: selectedPlanet.diameter, ur: selectedPlanet.diameter } },
            { label: { en: 'Distance from Sun', ur: 'سورج سے فاصلہ' }, value: { en: selectedPlanet.avgDistance, ur: selectedPlanet.avgDistance } },
            { label: { en: 'Day Length', ur: 'دن کی لمبائی' }, value: { en: selectedPlanet.dayLength, ur: selectedPlanet.dayLength } },
            { label: { en: 'Year Length', ur: 'سال کی لمبائی' }, value: { en: selectedPlanet.yearLength, ur: selectedPlanet.yearLength } },
            { label: { en: 'Average Temperature', ur: 'اوسط درجہ حرارت' }, value: { en: selectedPlanet.avgTemp, ur: selectedPlanet.avgTemp } },
            { label: { en: 'Gravity', ur: 'کششِ ثقل' }, value: { en: selectedPlanet.gravity, ur: selectedPlanet.gravity } },
            { label: { en: 'Known Moons', ur: 'معلوم چاند' }, value: { en: selectedPlanet.moons, ur: selectedPlanet.moons } },
            { label: { en: 'Rings', ur: 'حلقے' }, value: selectedPlanet.rings }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                {renderText(fact.label.en, fact.label.ur)}
              </div>
              <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {renderText(fact.value.en, fact.value.ur)}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs italic mt-3 text-center" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Values are approximate educational averages.', 'یہ قدریں تعلیمی مقصد کے لیے اندازاً اوسط ہیں۔')}
        </p>
      </section>

      {/* SECTION 3.5: SIZE COMPARISON */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Size Comparison with Earth', 'زمین کے مقابلے میں سائز')}
        </h2>
        <div className="flex items-end justify-center gap-4 p-6 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-2" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
            <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
              {renderText('Earth', 'زمین')}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>12,756 km</p>
          </div>
          <div className="text-center">
            <div className="rounded-full mx-auto mb-2" style={{ 
              width: `${Math.max(20, Math.min(120, (parseInt(selectedPlanet.diameter.replace(/[^0-9]/g, '')) / 12756) * 64))}px`,
              height: `${Math.max(20, Math.min(120, (parseInt(selectedPlanet.diameter.replace(/[^0-9]/g, '')) / 12756) * 64))}px`,
              background: getCelestialImage(selectedPlanet.id).fallbackGradient
            }} />
            <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
              {renderText(selectedPlanet.id.charAt(0).toUpperCase() + selectedPlanet.id.slice(1), selectedPlanet.id === 'mercury' ? 'عطارد' : selectedPlanet.id === 'venus' ? 'زہرہ' : selectedPlanet.id === 'earth' ? 'زمین' : selectedPlanet.id === 'mars' ? 'مریخ' : selectedPlanet.id === 'jupiter' ? 'مشتری' : selectedPlanet.id === 'saturn' ? 'زحل' : selectedPlanet.id === 'uranus' ? 'یورینس' : 'نیپچون')}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{selectedPlanet.diameter}</p>
          </div>
        </div>
        <p className="text-xs italic mt-2 text-center" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Visual comparison — not to exact scale.', 'بصری موازنہ — بالکل حقیقی پیمانے پر نہیں۔')}
        </p>
      </section>

      {/* SECTION 3.6: DISTANCE FROM SUN */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Distance from the Sun', 'سورج سے فاصلہ')}
        </h2>
        <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex-shrink-0" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00 60%, #ff4500)', boxShadow: '0 0 20px #ff8c00' }} />
            <div className="flex-1 h-2 rounded-full" style={{ background: 'linear-gradient(90deg, #ff8c00 0%, var(--accent) 100%)' }} />
            <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ background: getCelestialImage(selectedPlanet.id).fallbackGradient }} />
          </div>
          <p className="text-center mt-4 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {renderText(`Average distance: ${selectedPlanet.avgDistance}`, `اوسط فاصلہ: ${selectedPlanet.avgDistance}`)}
          </p>
        </div>
        <p className="text-xs italic mt-2 text-center" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Diagram not to scale — shows relative position only.', 'ڈائریگرام حقیقی پیمانے پر نہیں — صرف نسبتی پوزیشن دکھاتا ہے۔')}
        </p>
      </section>

      {/* SECTION 3.7: ROTATION AND ORBIT */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Rotation and Orbit', 'گردش اور مدار')}
        </h2>
        <BilingualFlowchart
          steps={[
            { en: `Day: ${selectedPlanet.dayLength}`, ur: `دن: ${selectedPlanet.dayLength}` },
            { en: 'One rotation on axis', ur: 'محور پر ایک گردش' },
            { en: `Year: ${selectedPlanet.yearLength}`, ur: `سال: ${selectedPlanet.yearLength}` }
          ]}
        />
      </section>

      {/* SECTION 4-13: Detailed sections */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Surface and Structure', 'سطح اور ساخت')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.surfaceSection.en, selectedPlanet.surfaceSection.ur)}
        </p>
        {/* Interactive diagram for planet structure */}
        <InteractiveDiagram
          labels={[
            { id: 'core', x: 50, y: 50, en: 'Core', ur: 'مرکز', description: { en: 'The dense center of the planet', ur: 'سیارے کا گھنا مرکز' } },
            { id: 'mantle', x: 30, y: 30, en: 'Mantle', ur: 'رداء', description: { en: 'Layer surrounding the core', ur: 'مرکز کے گرد کی تہہ' } },
            { id: 'crust', x: 70, y: 20, en: 'Crust', ur: 'پوست', description: { en: 'Outer solid layer', ur: 'بیرونی ٹھوس تہہ' } }
          ]}
          title={{ en: 'Planet Structure', ur: 'سیارے کی ساخت' }}
          showNotToScale={true}
          fallbackGradient={selectedPlanet.id === 'earth' ? 'radial-gradient(circle at 50% 50%, #ff6b35, #4a90d9 40%, #2d6b3f 70%, #1a3a5c)' :
                           selectedPlanet.id === 'mars' ? 'radial-gradient(circle at 50% 50%, #c1440e, #8b2500 50%, #5c1800)' :
                           'radial-gradient(circle at 50% 50%, #c88b3a, #6b4010 50%, #3d2510)'}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Atmosphere and Weather', 'فضا اور موسم')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.atmosphereSection.en, selectedPlanet.atmosphereSection.ur)}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Temperature', 'درجہ حرارت')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.temperatureExplanation.en, selectedPlanet.temperatureExplanation.ur)}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Moons and Rings', 'چاند اور حلقے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.moonsAndRingsDetail.en, selectedPlanet.moonsAndRingsDetail.ur)}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Seasons', 'موسم')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.seasonsSection.en, selectedPlanet.seasonsSection.ur)}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText(`Can Humans Live on ${selectedPlanet.id.charAt(0).toUpperCase() + selectedPlanet.id.slice(1)}?`, `کیا انسان ${selectedPlanet.id === 'mercury' ? 'عطارد' : selectedPlanet.id === 'venus' ? 'زہرہ' : selectedPlanet.id === 'earth' ? 'زمین' : selectedPlanet.id === 'mars' ? 'مریخ' : selectedPlanet.id === 'jupiter' ? 'مشتری' : selectedPlanet.id === 'saturn' ? 'زحل' : selectedPlanet.id === 'uranus' ? 'یورینس' : 'نیپچون'} پر رہ سکتے ہیں؟`)}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.habitability.en, selectedPlanet.habitability.ur)}
        </p>
      </section>

      {/* SECTION 13.5: MISSIONS AND EXPLORATION */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Missions and Exploration', 'مشنز اور دریافت')}
        </h2>
        <div className="space-y-3">
          {selectedPlanet.missions.map((mission: any, i: number) => (
            <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                  {mission.year}
                </span>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {mission.name}
                </h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {renderText(mission.type.en, mission.type.ur)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 14: FUN FACTS */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Fun Facts', 'دلچسپ حقائق')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {selectedPlanet.funFacts.map((fact: { en: string; ur: string }, i: number) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              {renderText(fact.en, fact.ur)}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 16: QUIZ */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Test Your Knowledge', 'اپنے علم کی جانچ کریں')}
        </h2>
        <PlanetQuiz questions={selectedPlanet.quiz} planetId={selectedPlanet.id} />
      </section>

      {/* SECTION 15: SOURCES */}
      <section className="rounded-2xl border p-5 md:p-6" style={{ backgroundColor: 'var(--surface-muted)', borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">{renderText('References', 'حوالہ جات')}</p>
            <h2 className="text-xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{renderText('Sources used on this page', 'اس صفحے کے استعمال شدہ ماخذ')}</h2>
          </div>
          <ExternalLink size={18} style={{ color: 'var(--accent)' }} />
        </div>
        <div className="space-y-2 text-sm">
          <a href={getCelestialImage(selectedPlanet.id).sourceUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-xl border px-3 py-2 hover:border-blue-500 transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
            <span>{renderText('NASA Science — planet reference', 'NASA Science — سیارے کا حوالہ')}</span><ExternalLink size={14} />
          </a>
          <a href="https://images.nasa.gov/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-xl border px-3 py-2 hover:border-blue-500 transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
            <span>{renderText('NASA Image and Video Library — gallery images', 'NASA Image and Video Library — گیلری کی تصاویر')}</span><ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* Navigation buttons */}
      <section className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/comparison"
          className="px-4 py-2 rounded-lg text-sm font-medium border"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          {renderText('Compare this planet', 'اس سیارے کا موازنہ کریں')}
        </Link>
        <Link
          to="/calculator"
          className="px-4 py-2 rounded-lg text-sm font-medium border"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          {renderText('Calculate age and weight', 'عمر اور وزن کا حساب لگائیں')}
        </Link>
        <button
          onClick={() => navigate('/solar-system')}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          {renderText('Back to Solar System', 'نظامِ شمسی پر واپس')}
        </button>
      </section>
    </div>
  );
}

function PlanetVideo({ planetId, planetName }: { planetId: string; planetName: string }) {
  const { language } = useApp();
  const videos: Record<string, { id: string; title: string }> = {
    mercury: { id: 'ENwD31EDFjc', title: 'MESSENGER at Mercury' },
    earth: { id: 'QOQHHFMLskk', title: 'Blue Marble, Eastern Hemisphere' },
    jupiter: { id: 'r5SuUY7dF1w', title: 'Juno: Mission to Jupiter 360 Video' },
    neptune: { id: '4T6rV_GD2W4', title: 'Neptune and Moons' }
  };
  const video = videos[planetId];

  return (
    <section className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="p-5 md:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">{language === 'ur' ? 'ویڈیو سبق' : 'VIDEO LESSON'}</p>
        <h2 className="text-2xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
          {language === 'ur' ? `${planetName} کی ویڈیو دریافت` : `Explore ${planetName} through video`}
        </h2>
      </div>
      {video ? (
        <div className="aspect-video w-full bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.id}?rel=0`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="mx-5 mb-5 rounded-xl border p-5 text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-muted)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {language === 'ur' ? 'اس سیارے کے لیے NASA ویڈیو وسائل کھولیں۔' : 'Open NASA video resources for this planet.'}
          </p>
          <a href={getCelestialImage(planetId).sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-3 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            {language === 'ur' ? 'NASA ماخذ کھولیں' : 'Open NASA source'} <ExternalLink size={15} />
          </a>
        </div>
      )}
    </section>
  );
}

// Planet Quiz Component
function PlanetQuiz({ questions, planetId }: { questions: any[]; planetId: string }) {
  const { language } = useApp();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem(`sslh-${planetId}-quiz-best`);
    return saved ? parseInt(saved) : 0;
  });

  const question = questions[currentQ];

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return <>{en}<span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
  };

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowResult(true);
    if (idx === question.correct) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem(`sslh-${planetId}-quiz-best`, newScore.toString());
      }
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  };

  if (finished) {
    const incorrect = questions.length - score;
    return (
      <div className="rounded-xl p-6 border text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Quiz Complete!', 'کوئز مکمل!')}
        </h3>
        <div className="text-5xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
          {score} / {questions.length}
        </div>
        <div className="flex justify-center gap-6 my-4">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{score}</div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{language === 'ur' ? 'درست' : 'Correct'}</div>
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
          {renderText(`Question ${currentQ + 1} of ${questions.length}`, `سوال ${currentQ + 1} از ${questions.length}`)}
        </span>
        <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
          {renderText(`Score: ${score}`, `اسکور: ${score}`)}
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {renderText(question.question.en, question.question.ur)}
      </h3>
      <div className="space-y-2 mb-4">
        {question.options.map((opt: any, idx: number) => {
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
          {renderText(currentQ < questions.length - 1 ? 'Next Question' : 'Finish Quiz', currentQ < questions.length - 1 ? 'اگلا سوال' : 'کوئز مکمل')}
        </button>
      )}
    </div>
  );
}
