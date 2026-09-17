import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/Home';
import { PlaceholderPage } from './pages/PlaceholderPage';
import {
  Globe, Rocket, BarChart3, Calculator, Sun, Target, Users,
  Mountain, Waves, Cloud, BookOpen, Zap, HelpCircle, Gamepad2,
  Languages, Info
} from 'lucide-react';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>
      <Header onMenuToggle={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 pt-20 pb-8 max-w-6xl mx-auto w-full px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solar-system" element={
            <PlaceholderPage title={{ en: 'Solar System', ur: 'نظامِ شمسی' }} icon={<Rocket size={48} />} />
          } />
          <Route path="/planets" element={
            <PlaceholderPage title={{ en: 'Planets', ur: 'سیارے' }} icon={<Globe size={48} />} />
          } />
          <Route path="/comparison" element={
            <PlaceholderPage title={{ en: 'Planet Comparison', ur: 'سیاروں کا موازنہ' }} icon={<BarChart3 size={48} />} />
          } />
          <Route path="/calculator" element={
            <PlaceholderPage title={{ en: 'Age & Weight Calculator', ur: 'عمر اور وزن کیلکولیٹر' }} icon={<Calculator size={48} />} />
          } />
          <Route path="/moon-sun-stars" element={
            <PlaceholderPage title={{ en: 'Moon, Sun & Stars', ur: 'چاند، سورج اور تارے' }} icon={<Sun size={48} />} />
          } />
          <Route path="/eclipses" element={
            <PlaceholderPage title={{ en: 'Eclipses', ur: 'گرہن' }} icon={<Target size={48} />} />
          } />
          <Route path="/scientists" element={
            <PlaceholderPage title={{ en: 'Scientists & Missions', ur: 'سائنسدان اور مشنز' }} icon={<Users size={48} />} />
          } />
          <Route path="/earth" element={
            <PlaceholderPage title={{ en: 'Earth Explorer', ur: 'زمین کو جانیں' }} icon={<Mountain size={48} />} />
          } />
          <Route path="/oceans" element={
            <PlaceholderPage title={{ en: 'Oceans & Water Cycle', ur: 'سمندر اور آبی چکر' }} icon={<Waves size={48} />} />
          } />
          <Route path="/weather" element={
            <PlaceholderPage title={{ en: 'Weather & Climate', ur: 'موسم اور آب و ہوا' }} icon={<Cloud size={48} />} />
          } />
          <Route path="/dams" element={
            <PlaceholderPage title={{ en: 'Dams & Water Resources', ur: 'ڈیم اور آبی وسائل' }} icon={<BookOpen size={48} />} />
          } />
          <Route path="/solar-energy" element={
            <PlaceholderPage title={{ en: 'Solar Energy', ur: 'شمسی توانائی' }} icon={<Zap size={48} />} />
          } />
          <Route path="/quiz" element={
            <PlaceholderPage title={{ en: 'Quiz Center', ur: 'کوئز مرکز' }} icon={<HelpCircle size={48} />} />
          } />
          <Route path="/games" element={
            <PlaceholderPage title={{ en: 'Learning Games', ur: 'تعلیمی گیمز' }} icon={<Gamepad2 size={48} />} />
          } />
          <Route path="/glossary" element={
            <PlaceholderPage title={{ en: 'Glossary', ur: 'اصطلاحات' }} icon={<Languages size={48} />} />
          } />
          <Route path="/about" element={
            <PlaceholderPage title={{ en: 'About & Sources', ur: 'تعارف اور ماخذ' }} icon={<Info size={48} />} />
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
