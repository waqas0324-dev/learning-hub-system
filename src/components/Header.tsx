import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Menu, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { language, setLanguage, theme, toggleTheme, fontSize, setFontSize, t } = useApp();
  const navigate = useNavigate();

  const goHome = () => navigate('/');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-3 md:px-4 border-b"
      style={{ 
        backgroundColor: 'var(--surface)', 
        borderColor: 'var(--border)',
        color: 'var(--text-primary)'
      }}>
      {/* Left: Hamburger */}
      <button
        onClick={onMenuToggle}
        className="p-2 rounded-lg hover:opacity-80 transition-opacity flex-shrink-0"
        style={{ color: 'var(--text-primary)' }}
        aria-label="Menu"
      >
        <Menu size={22} />
      </button>

      {/* Center: Title - absolutely centered */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center cursor-pointer select-none" onClick={goHome}>
        {language === 'en' && (
          <h1 className="text-sm md:text-lg font-bold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
            Solar System Learning Hub
          </h1>
        )}
        {language === 'ur' && (
          <h1 className="font-urdu text-sm md:text-lg font-bold whitespace-nowrap" dir="rtl" style={{ color: 'var(--text-primary)' }}>
            سولر سسٹم لرننگ ہب
          </h1>
        )}
        {language === 'both' && (
          <div className="flex flex-col items-center leading-tight">
            <span className="text-xs md:text-base font-bold" style={{ color: 'var(--text-primary)' }}>Solar System Learning Hub</span>
            <span className="font-urdu text-xs md:text-sm font-bold" dir="rtl" style={{ color: 'var(--text-secondary)' }}>سولر سسٹم لرننگ ہب</span>
          </div>
        )}
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-1 ml-auto flex-shrink-0">
        {/* Language buttons */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setLanguage('en')}
            className={`px-1.5 py-1 text-xs rounded transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : 'hover:opacity-80'}`}
            style={language !== 'en' ? { color: 'var(--text-secondary)' } : {}}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('ur')}
            className={`px-1.5 py-1 text-xs rounded font-urdu transition-colors ${language === 'ur' ? 'bg-blue-600 text-white' : 'hover:opacity-80'}`}
            style={language !== 'ur' ? { color: 'var(--text-secondary)' } : {}}
          >
            اردو
          </button>
          <button
            onClick={() => setLanguage('both')}
            className={`px-1.5 py-1 text-xs rounded transition-colors ${language === 'both' ? 'bg-blue-600 text-white' : 'hover:opacity-80'}`}
            style={language !== 'both' ? { color: 'var(--text-secondary)' } : {}}
          >
            Both
          </button>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg hover:opacity-80 transition-opacity"
          style={{ color: 'var(--text-secondary)' }}
          aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Font size controls */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setFontSize('sm')}
            className={`px-1.5 py-1 rounded transition-colors ${fontSize === 'sm' ? 'bg-blue-600 text-white' : 'hover:opacity-80'}`}
            style={fontSize !== 'sm' ? { color: 'var(--text-secondary)' } : {}}
            title={t('decreaseFont')}
            aria-label={t('decreaseFont')}
          >
            A<sup className="text-[8px]">−</sup>
          </button>
          <button
            onClick={() => setFontSize('md')}
            className={`px-1.5 py-1 rounded text-xs transition-colors ${fontSize === 'md' ? 'bg-blue-600 text-white' : 'hover:opacity-80'}`}
            style={fontSize !== 'md' ? { color: 'var(--text-secondary)' } : {}}
            title={t('resetFont')}
            aria-label={t('resetFont')}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('lg')}
            className={`px-1.5 py-1 rounded transition-colors ${fontSize === 'lg' ? 'bg-blue-600 text-white' : 'hover:opacity-80'}`}
            style={fontSize !== 'lg' ? { color: 'var(--text-secondary)' } : {}}
            title={t('increaseFont')}
            aria-label={t('increaseFont')}
          >
            A<sup className="text-[8px]">+</sup>
          </button>
        </div>
      </div>
    </header>
  );
}
