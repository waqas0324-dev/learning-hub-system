import React from 'react';
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

  if (!planet) return null;

  const handleOpenLesson = () => {
    onClose();
    navigate('/planets');
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl p-6 border shadow-2xl"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:opacity-80"
          style={{ color: 'var(--text-secondary)' }}
        >
          <X size={20} />
        </button>

        {/* Planet visual */}
        <div className="flex justify-center mb-4">
          <div
            className="rounded-full"
            style={{
              width: 80,
              height: 80,
              backgroundColor: planet.color,
              boxShadow: `0 0 30px ${planet.color}, 0 0 60px ${planet.color}40`
            }}
          />
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

        {/* Data */}
        <div className="space-y-3 mt-4">
          <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'var(--border)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              {t('diameter')}
            </span>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {planet.diameter}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'var(--border)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              {t('avgDistance')}
            </span>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {planet.avgDistance}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              {t('orbitalPeriod')}
            </span>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {planet.orbitalPeriod}
            </span>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={handleOpenLesson}
          className="w-full mt-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          {t('openPlanetLesson')}
        </button>
      </div>
    </div>
  );
}
