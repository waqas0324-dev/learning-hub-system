import React from 'react';
import { ExternalLink, BookOpen, Gamepad2, Orbit, Image as ImageIcon, GraduationCap, Rocket } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Link } from 'react-router-dom';

const resources = [
  { title: 'NASA Eyes', ur: 'NASA Eyes', description: 'Browser-based 3D experiences for the Solar System, Earth, asteroids and exoplanets.', url: 'https://science.nasa.gov/eyes/', icon: <Orbit size={22} /> },
  { title: 'NASA Planetary Science Resources', ur: 'NASA Planetary Science Resources', description: 'Mission packages, interactives, student resources, posters and image/video collections.', url: 'https://science.nasa.gov/planetary-science/resources/', icon: <Rocket size={22} /> },
  { title: 'NASA Solar System Resources', ur: 'NASA Solar System Resources', description: 'Curated activities, videos, animations and printable learning materials.', url: 'https://science.nasa.gov/solar-system/resources/resource-packages/', icon: <BookOpen size={22} /> },
  { title: 'NASA Interactives & Games', ur: 'NASA Interactives اور Games', description: 'Interactive science experiences and educational games from NASA.', url: 'https://www.nasa.gov/interactives/', icon: <Gamepad2 size={22} /> },
  { title: 'NASA Learning Catalog', ur: 'NASA Learning Catalog', description: 'Search NASA learning resources for students and educators.', url: 'https://science.nasa.gov/learn/catalog/', icon: <GraduationCap size={22} /> },
  { title: 'NASA Image & Video Resources', ur: 'NASA Image اور Video Resources', description: 'Find authentic NASA imagery and media for space and Earth science topics.', url: 'https://science.nasa.gov/planetary-science/resources/', icon: <ImageIcon size={22} /> }
];

export function ResourcesPage() {
  const { language } = useApp();
  const text = (en: string, ur: string) => language === 'ur' ? <span className="font-urdu" dir="rtl">{ur}</span> : language === 'both' ? <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></> : <>{en}</>;

  return (
    <div className="space-y-7 pb-10">
      <section className="rounded-3xl border p-7 md:p-10" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,.16), rgba(6,182,212,.08))', borderColor: 'var(--border)' }}>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-400">Learning Library</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2">{text('Space Science Resources', 'خلائی سائنس کے وسائل')}</h1>
        <p className="mt-3 max-w-3xl text-sm md:text-base leading-7" style={{ color: 'var(--text-secondary)' }}>{text('A curated gateway to trusted NASA learning tools, interactive simulations, mission resources and authentic imagery.', 'قابلِ اعتماد NASA تعلیمی ٹولز، interactive simulations، mission resources اور حقیقی تصاویر کا منتخب مجموعہ۔')}</p>
      </section>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {resources.map(item => (
          <a key={item.title} href={item.url} target="_blank" rel="noreferrer" className="group rounded-2xl border p-5 hover:-translate-y-1 transition-all" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-start justify-between gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">{item.icon}</div>
              <ExternalLink size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <h2 className="font-bold mt-4">{item.title}</h2>
            {language !== 'en' && <p className="font-urdu text-sm mt-1" dir="rtl">{item.ur}</p>}
            <p className="text-sm mt-3 leading-6" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
          </a>
        ))}
      </div>

      <section className="grid md:grid-cols-3 gap-4">
        <Link to="/3d-explorer" className="rounded-2xl border p-5 hover:border-blue-500 transition-colors" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <Orbit className="text-blue-400" />
          <h3 className="font-bold mt-3">{text('Open 3D Explorer', '3D ایکسپلورر کھولیں')}</h3>
        </Link>
        <Link to="/games" className="rounded-2xl border p-5 hover:border-purple-500 transition-colors" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <Gamepad2 className="text-purple-400" />
          <h3 className="font-bold mt-3">{text('Play Learning Games', 'تعلیمی گیمز کھیلیں')}</h3>
        </Link>
        <Link to="/quiz" className="rounded-2xl border p-5 hover:border-cyan-500 transition-colors" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <BookOpen className="text-cyan-400" />
          <h3 className="font-bold mt-3">{text('Test Your Knowledge', 'اپنی معلومات جانچیں')}</h3>
        </Link>
      </section>
    </div>
  );
}
