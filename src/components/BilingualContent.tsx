import React from 'react';
import { useApp } from '../contexts/AppContext';

interface BilingualContentProps {
  en: string;
  ur: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  urduClassName?: string;
}

/**
 * BilingualContent Component
 * 
 * Reusable component for rendering bilingual content correctly.
 * Features:
 * - English mode: English only
 * - Urdu mode: Urdu only with RTL and Nastaliq font
 * - Both mode: English first, Urdu directly underneath with clear spacing
 * - Never side-by-side layout
 * - Works for headings, paragraphs, captions, tooltips, cards
 * - Proper semantic HTML tags
 * - Responsive design
 */
export function BilingualContent({ 
  en, 
  ur, 
  as: Tag = 'p', 
  className = '',
  urduClassName = ''
}: BilingualContentProps) {
  const { language } = useApp();

  if (language === 'en') {
    return <Tag className={className}>{en}</Tag>;
  }

  if (language === 'ur') {
    return (
      <Tag className={`font-urdu ${className} ${urduClassName}`} dir="rtl">
        {ur}
      </Tag>
    );
  }

  // Both mode: English first, then Urdu below
  return (
    <Tag className={className}>
      <span>{en}</span>
      <span 
        className={`block font-urdu mt-2 ${urduClassName}`} 
        dir="rtl"
      >
        {ur}
      </span>
    </Tag>
  );
}

/**
 * BilingualHeading - Convenience component for headings
 */
export function BilingualHeading({ 
  en, 
  ur, 
  level = 2, 
  className = '' 
}: { 
  en: string; 
  ur: string; 
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}) {
  const tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return <BilingualContent en={en} ur={ur} as={tag} className={className} />;
}

/**
 * BilingualParagraph - Convenience component for paragraphs
 */
export function BilingualParagraph({ 
  en, 
  ur, 
  className = '' 
}: { 
  en: string; 
  ur: string; 
  className?: string;
}) {
  return <BilingualContent en={en} ur={ur} as="p" className={className} />;
}

/**
 * BilingualCaption - Convenience component for image captions
 */
export function BilingualCaption({ 
  en, 
  ur, 
  className = '' 
}: { 
  en: string; 
  ur: string; 
  className?: string;
}) {
  return (
    <BilingualContent 
      en={en} 
      ur={ur} 
      as="p" 
      className={`text-xs italic ${className}`} 
    />
  );
}
