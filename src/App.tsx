import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/Home';
import { SolarSystemPage } from './pages/SolarSystemPage';
import { PlanetDetailPage } from './pages/PlanetDetailPage';
import { PlanetsPage } from './pages/PlanetsPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { MoonSunStarsPage } from './pages/MoonSunStarsPage';
import { EclipsesPage } from './pages/EclipsesPage';
import { ScientistsMissionsPage } from './pages/ScientistsMissionsPage';
import { EarthExplorerPage } from './pages/EarthExplorerPage';
import { OceansPage } from './pages/OceansPage';
import { WeatherPage } from './pages/WeatherPage';
import { SolarEnergyPage } from './pages/SolarEnergyPage';
import { DamsPage } from './pages/DamsPage';
import { QuizPage } from './pages/QuizPage';
import { GamesPage } from './pages/GamesPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { AboutPage } from './pages/AboutPage';
import { SearchPage } from './pages/SearchPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { Space3DExplorerPage } from './pages/Space3DExplorerPage';
import { SEO } from './components/SEO';
import { LearnTopicPage } from './pages/LearnTopicPage';
import { MissionControlPage } from './pages/MissionControlPage';
import { DashboardPage } from './pages/DashboardPage';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>
      <Header onMenuToggle={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 pt-20 pb-8 w-full px-3 sm:px-4 md:px-6 md:ml-72 transition-[margin] duration-300">
        <div className="max-w-[1180px] mx-auto">
          <SEO />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solar-system" element={<SolarSystemPage />} />
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="/planets/:planetId" element={<PlanetDetailPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/moon-sun-stars" element={<MoonSunStarsPage />} />
          <Route path="/eclipses" element={<EclipsesPage />} />
          <Route path="/scientists" element={<ScientistsMissionsPage />} />
          <Route path="/earth" element={<EarthExplorerPage />} />
          <Route path="/oceans" element={<OceansPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/dams" element={<DamsPage />} />
          <Route path="/solar-energy" element={<SolarEnergyPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/3d-explorer" element={<Space3DExplorerPage />} />
          <Route path="/learn/:slug" element={<LearnTopicPage />} />
          <Route path="/mission-control" element={<MissionControlPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
        </div>
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
