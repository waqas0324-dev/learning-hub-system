import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { getCelestialImage, CelestialImage } from '../data/imageManifest';

interface PlanetImageProps {
  planetId: string;
  size?: number;
  className?: string;
  showCaption?: boolean;
  showCredit?: boolean;
}

/**
 * PlanetImage Component
 * 
 * Renders a planet image with proper 1:1 aspect ratio.
 * Uses stable planet ID mapping to ensure correct image.
 * Falls back to CSS gradient if image fails to load.
 * Never shows wrong planet's image.
 */
export function PlanetImage({ planetId, size = 120, className = '', showCaption = false, showCredit = false }: PlanetImageProps) {
  const { language } = useApp();
  const [imgError, setImgError] = useState(false);
  const image: CelestialImage = getCelestialImage(planetId);

  return (
    <figure className={`inline-block ${className}`}>
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: size,
          height: size,
          aspectRatio: '1 / 1',
          background: image.fallbackGradient,
        }}
      >
        {!imgError && (
          <img
            src={image.fullDiskImageUrl}
            alt={language === 'ur' ? image.altText.ur : image.altText.en}
            className="absolute inset-0 w-full h-full object-contain"
            style={{ objectPosition: 'center' }}
            onError={() => setImgError(true)}
            loading="lazy"
            draggable={false}
          />
        )}
      </div>
      {(showCaption || showCredit) && (
        <figcaption className="mt-2 text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
          {showCaption && (
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {language === 'en' && image.caption.en}
              {language === 'ur' && <span className="font-urdu" dir="rtl">{image.caption.ur}</span>}
              {language === 'both' && (
                <>
                  {image.caption.en}
                  <span className="block font-urdu mt-1" dir="rtl">{image.caption.ur}</span>
                </>
              )}
            </p>
          )}
          {showCredit && (
            <>
              <p className="mt-1">
                {language === 'en' && `Image credit: ${image.credit}`}
                {language === 'ur' && <span className="font-urdu" dir="rtl">تصویر کا حوالہ: {image.credit}</span>}
                {language === 'both' && (
                  <>
                    Image credit: {image.credit}
                    <span className="block font-urdu mt-0.5" dir="rtl">تصویر کا حوالہ: {image.credit}</span>
                  </>
                )}
              </p>
              <p className="mt-0.5 opacity-70">
                {language === 'en' && `Source: ${image.sourceName}`}
                {language === 'ur' && <span className="font-urdu" dir="rtl">ماخذ: {image.sourceName}</span>}
                {language === 'both' && (
                  <>
                    Source: {image.sourceName}
                    <span className="block font-urdu mt-0.5" dir="rtl">ماخذ: {image.sourceName}</span>
                  </>
                )}
              </p>
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * PlanetImageWithRings Component
 * 
 * Renders Saturn with separate ring layer.
 * Saturn body remains circular; rings are wider/elliptical.
 */
export function PlanetImageWithRings({ planetId, size = 120, className = '' }: { planetId: string; size?: number; className?: string }) {
  const [imgError, setImgError] = useState(false);
  const image = getCelestialImage(planetId);
  const isSaturn = planetId === 'saturn';

  if (!isSaturn) {
    return <PlanetImage planetId={planetId} size={size} className={className} />;
  }

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size * 1.8, height: size * 1.2 }}>
      {/* Ring layer (behind planet) */}
      <div
        className="absolute top-1/2 left-1/2 pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%) rotateX(65deg)',
          width: size * 2,
          height: size * 2,
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `${size * 0.12}px solid rgba(210, 180, 100, 0.6)`,
            boxShadow: 'inset 0 0 6px rgba(210, 180, 100, 0.4)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: '15%',
            left: '15%',
            right: '15%',
            bottom: '15%',
            border: `${size * 0.08}px solid rgba(180, 150, 80, 0.4)`,
          }}
        />
      </div>
      {/* Planet body (circular, 1:1) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden"
        style={{
          width: size,
          height: size,
          aspectRatio: '1 / 1',
          background: image.fallbackGradient,
          zIndex: 1,
        }}
      >
        {!imgError && (
          <img
            src={image.fullDiskImageUrl}
            alt={image.altText.en}
            className="w-full h-full object-contain"
            style={{ objectPosition: 'center' }}
            onError={() => setImgError(true)}
            loading="lazy"
            draggable={false}
          />
        )}
      </div>
    </div>
  );
}
