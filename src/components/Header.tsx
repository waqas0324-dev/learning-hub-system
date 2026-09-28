import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Menu, Sun, Moon, Search } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { language, setLanguage, theme, toggleTheme, fontSize, setFontSize, t } = useApp();
  const navigate = useNavigate();

  const goHome = () => navigate('/');

  const languageControls = (
    <div className="flex items-center gap-1 rounded-lg border p-0.5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-muted)' }}>
      <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-[11px] rounded-md transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : ''}`} style={language !== 'en' ? { color: 'var(--text-secondary)' } : {}}>EN</button>
      <button onClick={() => setLanguage('ur')} className={`px-2 py-1 text-[11px] rounded-md font-urdu transition-colors ${language === 'ur' ? 'bg-blue-600 text-white' : ''}`} style={language !== 'ur' ? { color: 'var(--text-secondary)' } : {}}>اردو</button>
      <button onClick={() => setLanguage('both')} className={`px-2 py-1 text-[11px] rounded-md transition-colors ${language === 'both' ? 'bg-blue-600 text-white' : ''}`} style={language !== 'both' ? { color: 'var(--text-secondary)' } : {}}>Both</button>
    </div>
  );

  const fontControls = (
    <div className="flex items-center gap-0.5 rounded-lg border p-0.5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-muted)' }}>
      <button onClick={() => setFontSize('sm')} className={`px-2 py-1 rounded-md text-xs transition-colors ${fontSize === 'sm' ? 'bg-blue-600 text-white' : ''}`} style={fontSize !== 'sm' ? { color: 'var(--text-secondary)' } : {}} title={t('decreaseFont')} aria-label={t('decreaseFont')}>A<sup className="text-[8px]">−</sup></button>
      <button onClick={() => setFontSize('md')} className={`px-2 py-1 rounded-md text-xs transition-colors ${fontSize === 'md' ? 'bg-blue-600 text-white' : ''}`} style={fontSize !== 'md' ? { color: 'var(--text-secondary)' } : {}} title={t('resetFont')} aria-label={t('resetFont')}>A</button>
      <button onClick={() => setFontSize('lg')} className={`px-2 py-1 rounded-md text-xs transition-colors ${fontSize === 'lg' ? 'bg-blue-600 text-white' : ''}`} style={fontSize !== 'lg' ? { color: 'var(--text-secondary)' } : {}} title={t('increaseFont')} aria-label={t('increaseFont')}>A<sup className="text-[8px]">+</sup></button>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 md:h-16 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
      <div className="h-[52px] md:h-16 flex items-center px-3 md:px-4">
        <button onClick={onMenuToggle} className="p-2 rounded-lg hover:bg-white/5 transition-colors flex-shrink-0" style={{ color: 'var(--text-primary)' }} aria-label="Menu">
          <Menu size={24} />
        </button>

        <div className="flex-1 min-w-0 flex justify-center px-2 cursor-pointer select-none" onClick={goHome}>
          <div className="text-center min-w-0 max-w-[210px] md:max-w-none">
            {language === 'en' && <h1 className="text-[13px] sm:text-sm md:text-lg font-bold truncate" style={{ color: 'var(--text-primary)' }}>Solar System Learning Hub</h1>}
            {language === 'ur' && <h1 className="font-urdu text-[14px] md:text-lg font-bold truncate" dir="rtl" style={{ color: 'var(--text-primary)' }}>سولر سسٹم لرننگ ہب</h1>}
            {language === 'both' && (
              <div className="flex flex-col items-center leading-[1.05]">
                <span className="text-[12px] sm:text-sm md:text-base font-bold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>Solar System Learning Hub</span>
                <span className="font-urdu text-[11px] sm:text-xs md:text-sm whitespace-nowrap" dir="rtl" style={{ color: 'var(--text-secondary)' }}>سولر سسٹم لرننگ ہب</span>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
          <button onClick={() => navigate('/search')} className="p-2 rounded-lg hover:bg-white/5" style={{ color: 'var(--text-secondary)' }} aria-label="Search"><Search size={18}/></button>
          {languageControls}
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-white/5" style={{ color: 'var(--text-secondary)' }} aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
          {fontControls}
        </div>
      </div>

      <div className="md:hidden h-7 px-3 flex items-center justify-end gap-1.5 border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-muted)' }}>
        <button onClick={() => navigate('/search')} className="p-1 rounded-md" style={{ color: 'var(--text-secondary)' }} aria-label="Search"><Search size={15}/></button>
        {languageControls}
        <button onClick={toggleTheme} className="p-1 rounded-md" style={{ color: 'var(--text-secondary)' }} aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}>{theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}</button>
        {fontControls}
      </div>
    </header>
  );
}
