import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { SolarSystem } from '../components/SolarSystem';
import { PlanetModal } from '../components/PlanetModal';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { PlanetData, planets } from '../data/planets';
import { getCelestialImage } from '../data/imageManifest';

export function HomePage() {
  const { language, t, tBoth } = useApp();
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

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
    <div className="space-y-8 pb-8">
      {/* SECTION 1: COMPACT INTRO */}
      <section className="text-center px-4 pt-4 pb-2">
        <h1 className="text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {renderText('Explore the Solar System', 'سولر سسٹم دریافت کریں')}
        </h1>
        <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Click any planet to open its learning page. Use the sidebar to explore detailed lessons, tools, quizzes and games.',
            'کسی بھی سیارے پر کلک کر کے اس کا تعلیمی صفحہ کھولیں۔ تفصیلی اسباق، ٹولز، کوئزز اور گیمز کے لیے سائیڈ بار استعمال کریں۔'
          )}
        </p>
      </section>

      {/* SECTION 2: SOLAR SYSTEM ANIMATION - MAIN FEATURE */}
      <section className="px-2 md:px-4">
        <SolarSystem onPlanetClick={setSelectedPlanet} />
      </section>

      {/* SECTION 2.5: PLANET IMAGE CAROUSEL */}
      <section className="px-2 md:px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Planet Gallery', 'سیاروں کی گیلری')}
        </h2>
        <EducationalCarousel
          slides={planets.map(planet => ({
            imageUrl: getCelestialImage(planet.imageId).fullDiskImageUrl,
            captionEn: planet.name.en,
            captionUr: planet.name.ur,
            credit: getCelestialImage(planet.imageId).credit,
            fallbackGradient: planet.gradient
          }))}
        />
      </section>

      {/* SECTION 3: SHORT ABOUT SECTION */}
      <section className="px-4 md:px-8 max-w-4xl mx-auto">
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h2 className="text-lg font-bold mb-3 text-center" style={{ color: 'var(--text-primary)' }}>
            {t('aboutThisWebsite')}
          </h2>
          <p className="text-sm leading-relaxed text-center" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              tBoth('aboutWebsiteContent').en,
              tBoth('aboutWebsiteContent').ur
            )}
          </p>
        </div>
      </section>

      {/* SECTION 4: SIDEBAR HINT */}
      <section className="text-center px-4">
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            tBoth('useSidebarHint').en,
            tBoth('useSidebarHint').ur
          )}
        </p>
      </section>

      {/* Planet Modal */}
      <PlanetModal planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
    </div>
  );
}
