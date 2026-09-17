import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CarouselSlide {
  imageUrl: string;
  captionEn: string;
  captionUr: string;
  credit: string;
  fallbackGradient?: string;
  link?: string;
}

interface EducationalCarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
  className?: string;
  showControls?: boolean;
  showDots?: boolean;
}

/**
 * EducationalCarousel Component
 * 
 * Reusable image carousel with full controls.
 * Features:
 * - Previous/Next buttons
 * - Pause/Play auto-play
 * - Dot indicators
 * - Keyboard navigation (Arrow keys)
 * - Touch/swipe support
 * - Auto-play no faster than 6 seconds
 * - Bilingual captions
 * - Image credits
 * - Safe fallback for broken images
 * - No stretch/crop errors
 * - Responsive design
 */
export function EducationalCarousel({ 
  slides, 
  autoPlayInterval = 6000,
  className = '',
  showControls = true,
  showDots = true
}: EducationalCarouselProps) {
  const { language } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());
  const touchStartX = useRef(0);

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, Math.max(autoPlayInterval, 6000)); // Minimum 6 seconds
    return () => clearInterval(interval);
  }, [isPlaying, slides.length, autoPlayInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((p) => (p + 1) % slides.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const handleImageError = (index: number) => {
    setImgErrors(prev => new Set(prev).add(index));
  };

  const currentSlideData = slides[currentSlide];
  const hasError = imgErrors.has(currentSlide);

  return (
    <div className={`rounded-xl overflow-hidden border ${className}`} style={{ borderColor: 'var(--border)' }}>
      {/* Slide container */}
      <div 
        className="relative bg-gradient-to-br from-slate-900 to-black min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image */}
        {!hasError ? (
          <img
            key={currentSlide}
            src={currentSlideData.imageUrl}
            alt={language === 'ur' ? currentSlideData.captionUr : currentSlideData.captionEn}
            className="w-full h-full max-h-[400px] object-contain"
            onError={() => handleImageError(currentSlide)}
            loading="lazy"
          />
        ) : (
          <div 
            className="p-8 text-center w-full h-full min-h-[300px] flex flex-col items-center justify-center"
            style={{ background: currentSlideData.fallbackGradient || 'radial-gradient(circle at 40% 40%, #4a90d9, #1a5276, #0a2a4a)' }}
          >
            <div className="w-40 h-40 rounded-full mb-4 opacity-80" style={{ background: currentSlideData.fallbackGradient || 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 40%, #2d6b3f 60%, #1a3a5c)' }} />
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {language === 'en' && 'Educational diagram'}
              {language === 'ur' && <span className="font-urdu" dir="rtl">تعلیمی خاکہ</span>}
              {language === 'both' && <>Educational diagram<br /><span className="font-urdu" dir="rtl">تعلیمی خاکہ</span></>}
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        {showControls && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Caption and controls */}
      <div className="p-4" style={{ backgroundColor: 'var(--surface-muted)' }}>
        {/* Counter and play/pause */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            {currentSlide + 1} / {slides.length}
          </span>
          {showControls && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          )}
        </div>

        {/* Caption */}
        <p className="text-sm text-center font-medium" style={{ color: 'var(--text-primary)' }}>
          {language === 'en' && currentSlideData.captionEn}
          {language === 'ur' && <span className="font-urdu" dir="rtl">{currentSlideData.captionUr}</span>}
          {language === 'both' && (
            <>
              {currentSlideData.captionEn}
              <span className="block font-urdu mt-1" dir="rtl">{currentSlideData.captionUr}</span>
            </>
          )}
        </p>

        {/* Credit */}
        <p className="text-xs text-center mt-1" style={{ color: 'var(--text-secondary)' }}>
          {currentSlideData.credit}
        </p>

        {/* Dots */}
        {showDots && (
          <div className="flex justify-center gap-1.5 mt-3 flex-wrap">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  backgroundColor: i === currentSlide ? 'var(--accent)' : 'var(--border)',
                  transform: i === currentSlide ? 'scale(1.3)' : 'scale(1)'
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
