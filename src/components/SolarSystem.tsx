import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import { planets, PlanetData } from '../data/planets';
import { Play, Pause, RotateCcw, Maximize2 } from 'lucide-react';

interface SolarSystemProps {
  onPlanetClick?: (planet: PlanetData) => void;
}

// Planet texture component - shows NASA image with CSS gradient fallback
function PlanetTexture({ planet, size }: { planet: PlanetData; size: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="rounded-full overflow-hidden relative"
      style={{
        width: size,
        height: size,
        background: planet.gradient,
      }}
    >
      {!imgError && (
        <img
          src={planet.imageUrl}
          alt={planet.name.en}
          className="absolute inset-0 w-full h-full object-cover rounded-full"
          onError={() => setImgError(true)}
          loading="lazy"
          draggable={false}
        />
      )}
    </div>
  );
}

export function SolarSystem({ onPlanetClick }: SolarSystemProps) {
  const { language, t, tBoth } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [scale, setScale] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const speeds = [0.25, 0.5, 1, 2, 5];

  const handleFitAll = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;
      // Neptune orbit is 322px radius, need 322*2 + planet size + padding
      const neededDiameter = 322 * 2 + 60 + 34;
      const scaleX = (containerWidth - 20) / neededDiameter;
      const scaleY = (containerHeight - 20) / neededDiameter;
      const newScale = Math.min(1, Math.min(scaleX, scaleY));
      setScale(newScale);
    }
  }, []);

  useEffect(() => {
    handleFitAll();
    window.addEventListener('resize', handleFitAll);
    return () => window.removeEventListener('resize', handleFitAll);
  }, [handleFitAll]);

  const handleReset = () => {
    setSpeed(1);
    setIsPlaying(true);
    setSelectedId(null);
    handleFitAll();
  };

  const handlePlanetClick = (planet: PlanetData) => {
    setSelectedId(planet.id);
    onPlanetClick?.(planet);
  };

  const renderLabel = (planet: PlanetData) => {
    if (language === 'en') {
      return <span className="text-[10px] md:text-xs font-medium">{planet.name.en}</span>;
    }
    if (language === 'ur') {
      return <span className="font-urdu text-[10px] md:text-xs">{planet.name.ur}</span>;
    }
    return (
      <span className="flex flex-col items-center leading-tight">
        <span className="text-[9px] md:text-[10px] font-medium">{planet.name.en}</span>
        <span className="font-urdu text-[9px] md:text-[10px]" dir="rtl">{planet.name.ur}</span>
      </span>
    );
  };

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return <>{en}<br /><span className="font-urdu" dir="rtl">{ur}</span></>;
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 justify-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          aria-label={isPlaying ? t('pause') : t('play')}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          {isPlaying ? t('pause') : t('play')}
        </button>

        <div className="flex items-center gap-1">
          <span className="text-xs mr-1" style={{ color: 'var(--text-secondary)' }}>{t('speed')}:</span>
          {speeds.map(s => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${speed === s ? 'font-bold' : ''}`}
              style={{
                backgroundColor: speed === s ? 'var(--accent)' : 'var(--surface-muted)',
                color: speed === s ? '#fff' : 'var(--text-primary)',
                border: `1px solid ${speed === s ? 'var(--accent)' : 'var(--border)'}`
              }}
              aria-label={`${t('speed')} ${s}x`}
            >
              {s}x
            </button>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors border"
          style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
          aria-label={t('reset')}
        >
          <RotateCcw size={14} />
          {t('reset')}
        </button>

        <button
          onClick={handleFitAll}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors border"
          style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
          aria-label={t('fitAll')}
        >
          <Maximize2 size={14} />
          {t('fitAll')}
        </button>
      </div>

      {/* Orbit Container */}
      <div
        ref={containerRef}
        className="relative mx-auto rounded-2xl overflow-hidden border"
        style={{
          width: '100%',
          maxWidth: '800px',
          height: 'min(700px, 80vh)',
          minHeight: '400px',
          backgroundColor: '#030810',
          borderColor: 'var(--border)',
          boxShadow: '0 0 40px rgba(59, 130, 246, 0.1), inset 0 0 60px rgba(0,0,0,0.5)'
        }}
      >
        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: i % 5 === 0 ? '#aaccff' : '#ffffff',
                opacity: Math.random() * 0.6 + 0.2
              }}
            />
          ))}
        </div>

        {/* Scaled container */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
        >
          {/* Sun */}
          <div className="absolute" style={{ width: 0, height: 0 }}>
            {/* Sun glow */}
            <div
              className="absolute rounded-full"
              style={{
                width: 70,
                height: 70,
                top: -35,
                left: -35,
                background: 'radial-gradient(circle, rgba(255,200,0,0.3) 0%, rgba(255,100,0,0.1) 50%, transparent 70%)',
              }}
            />
            {/* Sun body */}
            <div
              className="absolute rounded-full"
              style={{
                width: 46,
                height: 46,
                top: -23,
                left: -23,
                background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00 60%, #ff4500 85%, #cc2200)',
                boxShadow: '0 0 20px #ff8c00, 0 0 40px #ff450060, 0 0 60px #ff220030',
                zIndex: 10,
                animation: 'sunGlow 4s ease-in-out infinite'
              }}
            />
            {/* Sun label */}
            <div
              className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
              style={{ top: 28, color: '#ffcc00', fontSize: '10px', fontWeight: 600, textShadow: '0 0 6px rgba(0,0,0,0.9)' }}
            >
              {language === 'en' ? 'Sun' : language === 'ur' ? 'سورج' : (
                <span className="flex flex-col items-center">
                  <span>Sun</span>
                  <span className="font-urdu text-[9px]" dir="rtl">سورج</span>
                </span>
              )}
            </div>
          </div>

          {/* Orbits and Planets */}
          {planets.map((planet) => (
            <div key={planet.id} className="absolute" style={{ width: 0, height: 0 }}>
              {/* Orbit ring */}
              <div
                className="absolute rounded-full"
                style={{
                  width: planet.orbitRadius * 2,
                  height: planet.orbitRadius * 2,
                  top: -planet.orbitRadius,
                  left: -planet.orbitRadius,
                  border: '1px solid rgba(100, 150, 255, 0.12)',
                }}
              />
              {/* Orbiting planet wrapper */}
              <div
                className="absolute"
                style={{
                  width: planet.orbitRadius * 2,
                  height: planet.orbitRadius * 2,
                  top: -planet.orbitRadius,
                  left: -planet.orbitRadius,
                  animation: `orbit ${planet.speed / speed}s linear infinite`,
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
              >
                {/* Planet position (top of orbit circle) */}
                <div
                  className="absolute cursor-pointer group"
                  style={{
                    top: -(planet.size / 2),
                    left: planet.orbitRadius - (planet.size / 2),
                    width: planet.size,
                    height: planet.size,
                    // Larger hit area
                    padding: '8px',
                    margin: '-8px',
                    boxSizing: 'content-box',
                  }}
                  onClick={() => handlePlanetClick(planet)}
                  title={planet.name.en}
                >
                  {/* Planet body with texture */}
                  <div className="relative" style={{ width: planet.size, height: planet.size }}>
                    <PlanetTexture planet={planet} size={planet.size} />
                    
                    {/* Saturn rings */}
                    {planet.id === 'saturn' && (
                      <div
                        className="absolute top-1/2 left-1/2 pointer-events-none"
                        style={{
                          transform: 'translate(-50%, -50%) rotateX(65deg)',
                          width: planet.size * 2,
                          height: planet.size * 2,
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            border: `${planet.size * 0.12}px solid rgba(210, 180, 100, 0.5)`,
                            boxShadow: 'inset 0 0 4px rgba(210, 180, 100, 0.3)',
                          }}
                        />
                        <div
                          className="absolute rounded-full"
                          style={{
                            top: '15%',
                            left: '15%',
                            right: '15%',
                            bottom: '15%',
                            border: `${planet.size * 0.08}px solid rgba(180, 150, 80, 0.35)`,
                          }}
                        />
                      </div>
                    )}

                    {/* Selection highlight */}
                    {selectedId === planet.id && (
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          border: '2px solid #60a5fa',
                          boxShadow: '0 0 12px #60a5fa, 0 0 24px #3b82f680',
                          margin: '-4px',
                        }}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap pointer-events-none"
                    style={{
                      top: planet.size + 6,
                      color: selectedId === planet.id ? '#93c5fd' : '#c8d8f0',
                      textShadow: '0 0 6px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.8)',
                      fontWeight: selectedId === planet.id ? 700 : 500,
                    }}
                  >
                    {renderLabel(planet)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <p className="text-center text-xs italic px-4" style={{ color: 'var(--text-secondary)' }}>
        {renderText(
          tBoth('simulationNote').en,
          tBoth('simulationNote').ur
        )}
      </p>
    </div>
  );
}
