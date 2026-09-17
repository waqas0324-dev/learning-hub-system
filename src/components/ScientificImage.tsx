import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { getCelestialImage } from '../data/imageManifest';

interface ScientificImageProps {
  subjectId: string;
  size?: number;
  className?: string;
  showCaption?: boolean;
  showCredit?: boolean;
  enableLightbox?: boolean;
}

/**
 * ScientificImage Component
 * 
 * Reusable component for displaying authentic scientific images.
 * Features:
 * - Stable subjectId mapping to correct image
 * - Bilingual captions and credits
 * - Loading and error states
 * - CSS gradient fallback (never wrong object)
 * - Optional lightbox for enlargement
 * - 1:1 aspect ratio preservation
 * - Responsive design
 */
export function ScientificImage({ 
  subjectId, 
  size = 120, 
  className = '', 
  showCaption = false, 
  showCredit = false,
  enableLightbox = false 
}: ScientificImageProps) {
  const { language } = useApp();
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const imageData = getCelestialImage(subjectId);

  const handleImageClick = () => {
    if (enableLightbox && !imgError) {
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => setLightboxOpen(false);

  return (
    <>
      <figure className={`inline-block ${className}`}>
        <div
          className={`relative overflow-hidden rounded-full ${enableLightbox && !imgError ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
          style={{
            width: size,
            height: size,
            aspectRatio: '1 / 1',
            background: imageData.fallbackGradient,
          }}
          onClick={handleImageClick}
        >
          {/* Loading indicator */}
          {!imgLoaded && !imgError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
          
          {/* Image */}
          {!imgError && (
            <img
              src={imageData.fullDiskImageUrl}
              alt={language === 'ur' ? imageData.altText.ur : imageData.altText.en}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ objectPosition: 'center' }}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              loading="lazy"
              draggable={false}
            />
          )}
          
          {/* Error fallback */}
          {imgError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white text-xs p-2">
                <div className="text-2xl mb-1">📷</div>
                <div>{language === 'ur' ? 'تصویر دستیاب نہیں' : 'Image unavailable'}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Caption and Credit */}
        {(showCaption || showCredit) && (
          <figcaption className="mt-2 text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
            {showCaption && (
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {language === 'en' && imageData.caption.en}
                {language === 'ur' && <span className="font-urdu" dir="rtl">{imageData.caption.ur}</span>}
                {language === 'both' && (
                  <>
                    {imageData.caption.en}
                    <span className="block font-urdu mt-1" dir="rtl">{imageData.caption.ur}</span>
                  </>
                )}
              </p>
            )}
            {showCredit && (
              <>
                <p className="mt-1">
                  {language === 'en' && `Image credit: ${imageData.credit}`}
                  {language === 'ur' && <span className="font-urdu" dir="rtl">تصویر کا حوالہ: {imageData.credit}</span>}
                  {language === 'both' && (
                    <>
                      Image credit: {imageData.credit}
                      <span className="block font-urdu mt-0.5" dir="rtl">تصویر کا حوالہ: {imageData.credit}</span>
                    </>
                  )}
                </p>
                <p className="mt-0.5 opacity-70">
                  {language === 'en' && `Source: ${imageData.sourceName}`}
                  {language === 'ur' && <span className="font-urdu" dir="rtl">ماخذ: {imageData.sourceName}</span>}
                  {language === 'both' && (
                    <>
                      Source: {imageData.sourceName}
                      <span className="block font-urdu mt-0.5" dir="rtl">ماخذ: {imageData.sourceName}</span>
                    </>
                  )}
                </p>
              </>
            )}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl hover:opacity-80"
            aria-label="Close"
          >
            ×
          </button>
          <div className="max-w-4xl max-h-[90vh] relative">
            <img
              src={imageData.fullDiskImageUrl}
              alt={language === 'ur' ? imageData.altText.ur : imageData.altText.en}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center text-white">
              <p className="font-medium">
                {language === 'en' && imageData.caption.en}
                {language === 'ur' && <span className="font-urdu" dir="rtl">{imageData.caption.ur}</span>}
                {language === 'both' && (
                  <>
                    {imageData.caption.en}
                    <span className="block font-urdu mt-1" dir="rtl">{imageData.caption.ur}</span>
                  </>
                )}
              </p>
              <p className="text-sm mt-2 opacity-80">
                {imageData.credit} | {imageData.sourceName}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
