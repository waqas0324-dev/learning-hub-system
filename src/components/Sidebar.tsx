import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { X, Rocket, Globe, BookOpen, Languages } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: { en: string; ur: string };
  path: string;
}

interface NavGroup {
  title: { en: string; ur: string };
  icon: React.ReactNode;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: { en: 'Space Learning', ur: 'خلائی سیکھنے کے صفحات' },
    icon: <Rocket size={18} />,
    items: [
      { label: { en: 'Solar System', ur: 'نظامِ شمسی' }, path: '/solar-system' },
      { label: { en: 'Planets', ur: 'سیارے' }, path: '/planets' },
      { label: { en: 'Planet Comparison', ur: 'سیاروں کا موازنہ' }, path: '/comparison' },
      { label: { en: 'Age & Weight Calculator', ur: 'عمر اور وزن کیلکولیٹر' }, path: '/calculator' },
      { label: { en: 'Moon, Sun & Stars', ur: 'چاند، سورج اور تارے' }, path: '/moon-sun-stars' },
      { label: { en: 'Eclipses', ur: 'گرہن' }, path: '/eclipses' },
      { label: { en: 'Scientists & Missions', ur: 'سائنسدان اور مشنز' }, path: '/scientists' },
    ]
  },
  {
    title: { en: 'Earth and Environment', ur: 'زمین اور ماحول' },
    icon: <Globe size={18} />,
    items: [
      { label: { en: 'Earth Explorer', ur: 'زمین کو جانیں' }, path: '/earth' },
      { label: { en: 'Oceans & Water Cycle', ur: 'سمندر اور آبی چکر' }, path: '/oceans' },
      { label: { en: 'Weather & Climate', ur: 'موسم اور آب و ہوا' }, path: '/weather' },
      { label: { en: 'Dams & Water Resources', ur: 'ڈیم اور آبی وسائل' }, path: '/dams' },
      { label: { en: 'Solar Energy', ur: 'شمسی توانائی' }, path: '/solar-energy' },
    ]
  },
  {
    title: { en: 'Practice and Information', ur: 'مشق اور معلومات' },
    icon: <BookOpen size={18} />,
    items: [
      { label: { en: 'Quiz Center', ur: 'کوئز مرکز' }, path: '/quiz' },
      { label: { en: 'Learning Games', ur: 'تعلیمی گیمز' }, path: '/games' },
      { label: { en: 'Glossary', ur: 'اصطلاحات' }, path: '/glossary' },
      { label: { en: 'About & Sources', ur: 'تعارف اور ماخذ' }, path: '/about' },
    ]
  }
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { language } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={onClose} />
      )}
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full z-[70] w-72 transform transition-transform duration-300 overflow-y-auto border-r ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <Languages size={20} style={{ color: 'var(--accent)' }} />
            <span className="font-semibold text-sm">
              {language === 'ur' ? 'نیویگیشن' : language === 'both' ? 'Navigation' : 'Navigation'}
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Nav Groups */}
        <nav className="p-3 space-y-4">
          {navGroups.map((group, gi) => (
            <div key={gi}>
              <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
                <span style={{ color: 'var(--accent)' }}>{group.icon}</span>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  {language === 'ur' ? group.title.ur : group.title.en}
                  {language === 'both' && (
                    <span className="font-urdu block text-xs normal-case tracking-normal" dir="rtl">{group.title.ur}</span>
                  )}
                </span>
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <button
                        onClick={() => handleNav(item.path)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive ? 'font-semibold' : 'hover:opacity-90'
                        }`}
                        style={{
                          backgroundColor: isActive ? 'var(--surface-muted)' : 'transparent',
                          color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                          borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent'
                        }}
                      >
                        {language === 'ur' ? item.label.ur : item.label.en}
                        {language === 'both' && (
                          <span className="font-urdu block text-xs mt-0.5" dir="rtl" style={{ color: 'var(--text-secondary)' }}>
                            {item.label.ur}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
