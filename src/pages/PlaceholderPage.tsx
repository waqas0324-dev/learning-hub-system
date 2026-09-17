import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { BilingualText } from '../components/BilingualText';
import { ArrowLeft, Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: { en: string; ur: string };
  icon: React.ReactNode;
}

export function PlaceholderPage({ title, icon }: PlaceholderPageProps) {
  const { language, t, tBoth } = useApp();
  const navigate = useNavigate();

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return <>{en}<span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center rounded-2xl p-8 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="mb-4 flex justify-center" style={{ color: 'var(--accent)' }}>
          {icon}
        </div>
        <h1 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {language === 'ur' ? title.ur : title.en}
          {language === 'both' && (
            <span className="block font-urdu text-lg font-normal mt-1" dir="rtl" style={{ color: 'var(--text-secondary)' }}>{title.ur}</span>
          )}
        </h1>
        <div className="flex items-center justify-center gap-2 mb-4" style={{ color: 'var(--warning)' }}>
          <Construction size={20} />
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            tBoth('comingSoon').en,
            tBoth('comingSoon').ur
          )}
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2"
          style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)' }}
        >
          <ArrowLeft size={14} />
          {t('backHome')}
        </button>
      </div>
    </div>
  );
}
