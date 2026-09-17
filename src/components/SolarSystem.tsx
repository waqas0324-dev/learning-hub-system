import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import { planets, PlanetData } from '../data/planets';
import { Play, Pause, RotateCcw, Maximize2 } from 'lucide-react';

interface SolarSystemProps {
  onPlanetClick?: (planet: PlanetData) => void;
}

export function SolarSystem({ onPlanetClick }: SolarSystemProps) {
  const { language, t, tBoth } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const speeds = [0.25, 0.5, 1, 2, 5];

  const handleFitAll = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const neededWidth = 340 * 2 + 60; // max orbit * 2 + padding
      const newScale = Math.min(1, (containerWidth - 40) / neededWidth);
      setScale(newScale);
    }
  };

  useEffect(() => {
    handleFitAll();
    window.addEventListener('resize', handleFitAll);
    return () => window.removeEventListener('resize', handleFitAll);
  }, []);

  const handleReset = () => {
    setSpeed(1);
    setIsPlaying(true);
    handleFitAll();
  };

  const renderLabel = (planet: PlanetData) => {
    if (language === 'en') return planet.name.en;
    if (language === 'ur') return planet.name.ur;
    return (
      <span className="flex flex-col items-center leading-tight">
        <span className="text-[9px]">{planet.name.en}</span>
        <span className="text-[8px] font-urdu" dir="rtl">{planet.name.ur}</span>
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 justify-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
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
              className={`px-2 py-1 rounded text-xs transition-colors ${speed === s ? 'font-bold' : ''}`}
              style={{
                backgroundColor: speed === s ? 'var(--accent)' : 'var(--surface-muted)',
                color: speed === s ? '#fff' : 'var(--text-primary)'
              }}
            >
              {s}x
            </button>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors"
          style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)' }}
        >
          <RotateCcw size={14} />
          {t('reset')}
        </button>

        <button
          onClick={handleFitAll}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors"
          style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)' }}
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
          maxWidth: '750px',
          height: '400px',
          backgroundColor: '#050a15',
          borderColor: 'var(--border)'
        }}
      >
        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3
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
          <div
            className="absolute rounded-full z-10"
            style={{
              width: 40,
              height: 40,
              background: 'radial-gradient(circle, #fff700, #ff8c00, #ff4500)',
              boxShadow: '0 0 30px #ff8c00, 0 0 60px #ff4500'
            }}
          />

          {/* Orbits and Planets */}
          {planets.map((planet) => (
            <div key={planet.id} className="absolute" style={{ width: 0, height: 0 }}>
              {/* Orbit ring */}
              <div
                className="absolute rounded-full border border-white/10"
                style={{
                  width: planet.orbitRadius * 2,
                  height: planet.orbitRadius * 2,
                  top: -planet.orbitRadius,
                  left: -planet.orbitRadius
                }}
              />
              {/* Orbiting planet */}
              <div
                className={`absolute orbit-animation ${!isPlaying ? 'orbit-paused' : ''}`}
                style={{
                  width: planet.orbitRadius * 2,
                  height: planet.orbitRadius * 2,
                  top: -planet.orbitRadius,
                  left: -planet.orbitRadius,
                  '--orbit-duration': `${planet.speed / speed}s`,
                  animationDuration: `${planet.speed / speed}s`
                } as React.CSSProperties}
              >
                <div
                  className="absolute cursor-pointer group"
                  style={{
                    top: planet.size / 2 - planet.size,
                    left: planet.orbitRadius - planet.size / 2,
                    width: planet.size,
                    height: planet.size
                  }}
                  onClick={() => onPlanetClick?.(planet)}
                >
                  {/* Planet body */}
                  <div
                    className="w-full h-full rounded-full transition-transform hover:scale-150"
                    style={{
                      backgroundColor: planet.color,
                      boxShadow: `0 0 ${planet.size / 2}px ${planet.color}`
                    }}
                  />
                  {/* Saturn ring */}
                  {planet.id === 'saturn' && (
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-yellow-300/60"
                      style={{ width: planet.size * 1.8, height: planet.size * 0.6 }}
                    />
                  )}
                  {/* Label */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap pointer-events-none"
                    style={{
                      top: planet.size + 2,
                      fontSize: '9px',
                      color: '#e2e8f0',
                      textShadow: '0 0 4px rgba(0,0,0,0.8)'
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
        {language === 'en' && tBoth('simulationNote').en}
        {language === 'ur' && <span className="font-urdu" dir="rtl">{tBoth('simulationNote').ur}</span>}
        {language === 'both' && (
          <span>
            {tBoth('simulationNote').en}
            <br />
            <span className="font-urdu" dir="rtl">{tBoth('simulationNote').ur}</span>
          </span>
        )}
      </p>
    </div>
  );
}
