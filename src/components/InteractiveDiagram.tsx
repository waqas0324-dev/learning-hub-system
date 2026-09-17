import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';

interface DiagramLabel {
  id: string;
  x: number; // percentage
  y: number; // percentage
  en: string;
  ur: string;
  description?: { en: string; ur: string };
}

interface InteractiveDiagramProps {
  imageUrl?: string;
  fallbackGradient?: string;
  labels: DiagramLabel[];
  title?: { en: string; ur: string };
  className?: string;
  showNotToScale?: boolean;
}

/**
 * InteractiveDiagram Component
 * 
 * Reusable labelled diagram with interactive tooltips.
 * Features:
 * - Bilingual labels
 * - Click/tap for detail tooltips
 * - Proper contrast in dark/light theme
 * - Responsive design
 * - "Not to scale" note for space diagrams
 * - Fallback for missing images
 */
export function InteractiveDiagram({ 
  imageUrl,
  fallbackGradient,
  labels,
  title,
  className = '',
  showNotToScale = false
}: InteractiveDiagramProps) {
  const { language } = useApp();
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const activeLabelData = labels.find(l => l.id === activeLabel);

  return (
    <div className={`my-6 ${className}`}>
      {/* Title */}
      {title && (
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
          {language === 'en' && title.en}
          {language === 'ur' && <span className="font-urdu" dir="rtl">{title.ur}</span>}
          {language === 'both' && (
            <>
              {title.en}
              <span className="block font-urdu text-sm mt-1" dir="rtl">{title.ur}</span>
            </>
          )}
        </h3>
      )}

      {/* Diagram container */}
      <div className="relative rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
        <div 
          className="relative w-full"
          style={{ 
            paddingBottom: '60%', // 5:3 aspect ratio
            background: fallbackGradient || 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
          }}
        >
          {/* Background image */}
          {imageUrl && !imgError && (
            <img
              src={imageUrl}
              alt="Diagram"
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          )}

          {/* Labels */}
          {labels.map((label) => (
            <button
              key={label.id}
              onClick={() => setActiveLabel(activeLabel === label.id ? null : label.id)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-full text-xs font-medium transition-all hover:scale-110"
              style={{
                left: `${label.x}%`,
                top: `${label.y}%`,
                backgroundColor: activeLabel === label.id ? 'var(--accent)' : 'rgba(0,0,0,0.7)',
                color: '#fff',
                border: `2px solid ${activeLabel === label.id ? 'var(--accent)' : 'rgba(255,255,255,0.3)'}`,
                boxShadow: activeLabel === label.id ? '0 0 12px rgba(59, 130, 246, 0.5)' : '0 2px 8px rgba(0,0,0,0.3)',
                zIndex: activeLabel === label.id ? 10 : 1
              }}
            >
              {language === 'en' && label.en}
              {language === 'ur' && <span className="font-urdu" dir="rtl">{label.ur}</span>}
              {language === 'both' && (
                <span className="flex flex-col items-center">
                  <span>{label.en}</span>
                  <span className="font-urdu text-[10px]" dir="rtl">{label.ur}</span>
                </span>
              )}
            </button>
          ))}

          {/* Tooltip */}
          {activeLabelData?.description && (
            <div 
              className="absolute bottom-4 left-4 right-4 p-3 rounded-lg text-sm"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.9)', 
                color: '#fff',
                border: '1px solid var(--accent)',
                zIndex: 20
              }}
            >
              {language === 'en' && activeLabelData.description.en}
              {language === 'ur' && <span className="font-urdu" dir="rtl">{activeLabelData.description.ur}</span>}
              {language === 'both' && (
                <>
                  {activeLabelData.description.en}
                  <span className="block font-urdu mt-1" dir="rtl">{activeLabelData.description.ur}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Not to scale note */}
      {showNotToScale && (
        <p className="text-xs italic text-center mt-2" style={{ color: 'var(--text-secondary)' }}>
          {language === 'en' && 'Educational diagram — not to scale.'}
          {language === 'ur' && <span className="font-urdu" dir="rtl">تعلیمی خاکہ — حقیقی پیمانے پر نہیں۔</span>}
          {language === 'both' && (
            <>
              Educational diagram — not to scale.
              <br />
              <span className="font-urdu" dir="rtl">تعلیمی خاکہ — حقیقی پیمانے پر نہیں۔</span>
            </>
          )}
        </p>
      )}
    </div>
  );
}
