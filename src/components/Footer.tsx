import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

export function Footer() {
  const { language, t, tBoth } = useApp();
  const year = new Date().getFullYear();
  const footerText = tBoth('footerText');
  const disclaimer = tBoth('educationalDisclaimer');
  const copyright = t('copyright');

  return (
    <footer className="border-t mt-12 py-8 px-4" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
      <div className="max-w-5xl mx-auto text-center space-y-4">
        {/* Footer text */}
        {language === 'en' && <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{footerText.en}</p>}
        {language === 'ur' && <p className="text-sm font-urdu" dir="rtl" style={{ color: 'var(--text-secondary)' }}>{footerText.ur}</p>}
        {language === 'both' && (
          <div className="space-y-1">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{footerText.en}</p>
            <p className="text-sm font-urdu" dir="rtl" style={{ color: 'var(--text-secondary)' }}>{footerText.ur}</p>
          </div>
        )}

        {/* Links */}
        <div className="flex justify-center gap-6 text-sm">
          <Link to="/glossary" className="hover:underline" style={{ color: 'var(--accent)' }}>
            {t('glossary')}
          </Link>
          <Link to="/about" className="hover:underline" style={{ color: 'var(--accent)' }}>
            {t('aboutSources')}
          </Link>
        </div>

        {/* Disclaimer */}
        {language === 'en' && <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{disclaimer.en}</p>}
        {language === 'ur' && <p className="text-xs font-urdu" dir="rtl" style={{ color: 'var(--text-secondary)' }}>{disclaimer.ur}</p>}
        {language === 'both' && (
          <div className="space-y-0.5">
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{disclaimer.en}</p>
            <p className="text-xs font-urdu" dir="rtl" style={{ color: 'var(--text-secondary)' }}>{disclaimer.ur}</p>
          </div>
        )}

        {/* Copyright */}
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          © {year} Solar System Learning Hub. {copyright}
        </p>
      </div>
    </footer>
  );
}
