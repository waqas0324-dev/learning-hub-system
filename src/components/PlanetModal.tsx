import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { PlanetData } from '../data/planets';
import { X } from 'lucide-react';

interface PlanetModalProps {
  planet: PlanetData | null;
  onClose: () => void;
}

export function PlanetModal({ planet, onClose }: PlanetModalProps) {
  const { language, t, tBoth } = useApp();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  // Reset image error state when planet changes
  useEffect(() => {
    setImgError(false);
  }, [planet?.id]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!planet) return null;

  const handleOpenLesson = () => {
    onClose();
    navigate('/planets');
  };

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return <>{en}<span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl p-6 border shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:opacity-80 transition-opacity"
          style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--surface-muted)' }}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Planet image */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: 120,
                height: 120,
                background: planet.gradient,
                boxShadow: `0 0 30px ${planet.color}60, 0 0 60px ${planet.color}30`
              }}
            >
              {!imgError && (
                <img
                  src={planet.imageUrl}
                  alt={planet.name.en}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                  draggable={false}
                />
              )}
            </div>
            {/* Saturn ring overlay in modal */}
            {planet.id === 'saturn' && (
              <div
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                  transform: 'translate(-50%, -50%) rotateX(65deg)',
                  width: 200,
                  height: 200,
                }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '12px solid rgba(210, 180, 100, 0.5)',
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    top: '18%',
                    left: '18%',
                    right: '18%',
                    bottom: '18%',
                    border: '8px solid rgba(180, 150, 80, 0.35)',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Planet name */}
        <h3 className="text-xl font-bold text-center mb-1" style={{ color: 'var(--text-primary)' }}>
          {language === 'ur' ? planet.name.ur : planet.name.en}
          {language === 'both' && (
            <span className="block font-urdu text-lg font-normal mt-1" dir="rtl" style={{ color: 'var(--text-secondary)' }}>
              {planet.name.ur}
            </span>
          )}
        </h3>

        {/* Image credit */}
        <p className="text-center text-[10px] mb-4" style={{ color: 'var(--text-secondary)' }}>
          {planet.imageCredit}
        </p>

        {/* Data */}
        <div className="space-y-0 mt-4">
          <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {t('diameter')}
            </span>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {planet.diameter}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {t('avgDistance')}
            </span>
            <span className="text-sm font-semibold text-right" style={{ color: 'var(--text-primary)' }}>
              {planet.avgDistance}
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {t('orbitalPeriod')}
            </span>
            <span className="text-sm font-semibold text-right" style={{ color: 'var(--text-primary)' }}>
              {planet.orbitalPeriod}
            </span>
          </div>
        </div>

        {/* Fact */}
        <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
          <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
            {language === 'ur' ? planet.fact.ur : planet.fact.en}
            {language === 'both' && (
              <>
                <br />
                <span className="font-urdu" dir="rtl">{planet.fact.ur}</span>
              </>
            )}
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={handleOpenLesson}
          className="w-full mt-5 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:opacity-90"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          {renderText(tBoth('explorePlanet').en, tBoth('explorePlanet').ur)}
        </button>
      </div>
    </div>
  );
}
