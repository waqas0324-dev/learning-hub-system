import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKey } from '../data/translations';
import { getLocalProgress, saveLocalProgress, LearningProgress } from '../lib/progressStore';

type LanguageMode = 'en' | 'ur' | 'both';
type ThemeMode = 'dark' | 'light';
type FontSize = 'sm' | 'md' | 'lg';

interface AppContextType {
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  t: (key: TranslationKey) => string;
  tBoth: (key: TranslationKey) => { en: string; ur: string };
  dir: string;
  progress: LearningProgress;
  markComplete: (route: string) => void;
  recordQuizScore: (score: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageMode>(() => {
    return (localStorage.getItem('sslh-lang') as LanguageMode) || 'both';
  });
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('sslh-theme') as ThemeMode) || 'dark';
  });
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('sslh-fontsize') as FontSize) || 'md';
  });
  const [progress, setProgress] = useState<LearningProgress>(() => getLocalProgress());

  useEffect(() => {
    localStorage.setItem('sslh-lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('sslh-theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sslh-fontsize', fontSize);
    document.documentElement.className = `${document.documentElement.className.replace(/font-size-\w+/, '')} font-size-${fontSize}`.trim();
    document.documentElement.style.setProperty('--font-size-base', fontSize === 'sm' ? '14px' : fontSize === 'lg' ? '18px' : '16px');
  }, [fontSize]);

  const setLanguage = (lang: LanguageMode) => setLanguageState(lang);
  const toggleTheme = () => setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  const setFontSize = (size: FontSize) => setFontSizeState(size);
  const updateProgress = (next: LearningProgress) => { setProgress(next); saveLocalProgress(next); };
  const markComplete = (route: string) => { const next = { ...progress, completed: progress.completed.includes(route) ? progress.completed : [...progress.completed, route], lastVisited: route }; updateProgress(next); };
  const recordQuizScore = (score: number) => { updateProgress({ ...progress, quizBest: Math.max(progress.quizBest, score), lastVisited: '/quiz' }); };

  const t = (key: TranslationKey): string => {
    const trans = translations[key];
    if (language === 'en') return trans.en;
    if (language === 'ur') return trans.ur;
    return trans.en;
  };

  const tBoth = (key: TranslationKey) => translations[key];

  const dir = language === 'ur' ? 'rtl' : 'ltr';

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, toggleTheme, fontSize, setFontSize, t, tBoth, dir, progress, markComplete, recordQuizScore }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
