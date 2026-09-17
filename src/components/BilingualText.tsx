import React from 'react';
import { useApp } from '../contexts/AppContext';
import { TranslationKey } from '../data/translations';

interface BilingualTextProps {
  textKey: TranslationKey;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  urduClassName?: string;
}

export function BilingualText({ textKey, className = '', as: Tag = 'p', urduClassName = '' }: BilingualTextProps) {
  const { language, t, tBoth } = useApp();
  const trans = tBoth(textKey);

  if (language === 'en') {
    return <Tag className={className}>{trans.en}</Tag>;
  }

  if (language === 'ur') {
    return <Tag className={`font-urdu ${className} ${urduClassName}`} dir="rtl">{trans.ur}</Tag>;
  }

  // Both mode
  return (
    <Tag className={className}>
      <span>{trans.en}</span>
      <span className={`block font-urdu mt-1 ${urduClassName}`} dir="rtl">{trans.ur}</span>
    </Tag>
  );
}
