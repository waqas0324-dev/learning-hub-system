import React, { useEffect, useMemo, useState } from 'react';
import { Activity, CircleDot, Clock3, ExternalLink, Radio, Rocket, Satellite, Target, Zap } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

type Mission = {
  name: string; agency: string; target: string; status: 'Active' | 'Completed' | 'Upcoming';
  year: string; description: string; url: string; color: string;
};

const missions: Mission[] = [
  { name: 'Europa Clipper', agency: 'NASA', target: 'Jupiter / Europa', status: 'Active', year: '2024–2030s', description: 'Studies Jupiter’s moon Europa and investigates whether conditions there could support life.', url: 'https://science.nasa.gov/mission/europa-clipper/', color: '#38bdf8' },
  { name: 'Psyche', agency: 'NASA', target: 'Asteroid 16 Psyche', status: 'Active', year: '2023–2029', description: 'Travels to the metal-rich asteroid Psyche to study its composition and history.', url: 'https://science.nasa.gov/mission/psyche/', color: '#f59e0b' },
  { name: 'OSIRIS-REx', agency: 'NASA', target: 'Asteroid Bennu', status: 'Completed', year: '2016–2023', description: 'Returned a sample from asteroid Bennu to Earth for detailed laboratory study.', url: 'https://science.nasa.gov/mission/osiris-rex/', color: '#a78bfa' },
  { name: 'New Horizons', agency: 'NASA', target: 'Pluto / Kuiper Belt', status: 'Active', year: '2006–present', description: 'Explored Pluto up close and continued into the Kuiper Belt after its historic flyby.', url: 'https://science.nasa.gov/mission/new-horizons/', color: '#22c55e' },
  { name: 'Cassini', agency: 'NASA / ESA / ASI', target: 'Saturn', status: 'Completed', year: '1997–2017', description: 'Revolutionized our understanding of Saturn, its rings and its moons.', url: 'https://science.nasa.gov/mission/cassini/', color: '#fb7185' },
  { name: 'Galileo', agency: 'NASA', target: 'Jupiter', status: 'Completed', year: '1989–2003', description: 'First spacecraft to orbit Jupiter and investigate its major moons in depth.', url: 'https://science.nasa.gov/mission/galileo/', color: '#60a5fa' }
];

export function MissionControlPage() {
  const { language } = useApp();
  const [selected, setSelected] = useState(missions[0]);
  const [running, setRunning] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [filter, setFilter] = useState<'All' | Mission['status']>('All');

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds(s => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const visible = useMemo(() => filter === 'All' ? missions : missions.filter(m => m.status === filter), [filter]);
  const text = (en: string, ur: string) => language === 'ur' ? <span className="font-urdu" dir="rtl">{ur}</span> : language === 'both' ? <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></span> : <>{en}</>;

  return (
    <div className="space-y-7 pb-12">
      <section className="relative overflow-hidden rounded-3xl border p-7 md:p-10" style={{ background: 'radial-gradient(circle at 80% 20%,rgba(34,197,94,.16),transparent 28%),linear-gradient(135deg,#06101b,#0f172a)', borderColor: 'var(--border)' }}>
        <div className="absolute right-8 top-8 opacity-20"><Satellite size={120} /></div>
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-emerald-400"><Radio size={15} className="animate-pulse" /> Mission Control</div>
          <h1 className="text-3xl md:text-5xl font-black text-white mt-3">{text('Space Mission Control Center','خلائی مشن کنٹرول سینٹر')}</h1>
          <p className="text-slate-300 mt-4 leading-7">{text('Track selected NASA planetary missions, targets, status and scientific purpose in one learning dashboard.','NASA کے منتخب خلائی مشنز، ان کے targets، status اور سائنسی مقصد کو ایک learning dashboard میں سمجھیں۔')}</p>
        </div>
      </section>

      <section className="grid lg:grid-cols-[1fr_320px] gap-5">
        <div className="rounded-3xl border p-5 md:p-7" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
          <div className="flex flex-wrap gap-2 mb-5">
            {(['All','Active','Completed','Upcoming'] as const).map(f => <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 text-xs font-bold border transition-colors ${filter === f ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40' : ''}`} style={{borderColor: filter === f ? undefined : 'var(--border)'}}>{f}</button>)}
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {visible.map(m => <button key={m.name} onClick={() => setSelected(m)} className={`text-left rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${selected.name === m.name ? 'ring-1 ring-emerald-400/60' : ''}`} style={{borderColor: selected.name === m.name ? m.color : 'var(--border)',backgroundColor:'var(--surface-muted)'}}>
              <div className="flex items-center justify-between gap-3"><span className="font-bold">{m.name}</span><span className="text-[10px] rounded-full px-2 py-1" style={{backgroundColor:m.status==='Active'?'rgba(34,197,94,.12)':'rgba(148,163,184,.12)',color:m.status==='Active'?'#22c55e':'var(--text-secondary)'}}>{m.status}</span></div>
              <p className="text-xs mt-2" style={{color:'var(--text-secondary)'}}>{m.target} · {m.year}</p>
            </button>)}
          </div>
        </div>

        <aside className="rounded-3xl border p-6" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
          <div className="flex items-center gap-2 text-cyan-400"><Target size={19}/><span className="font-bold">{text('Selected Mission','منتخب مشن')}</span></div>
          <h2 className="text-2xl font-black mt-4">{selected.name}</h2>
          <p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>{selected.agency} · {selected.target}</p>
          <div className="mt-5 space-y-3">
            <div><span className="text-xs uppercase tracking-wider" style={{color:'var(--text-secondary)'}}>Mission window</span><p className="font-semibold">{selected.year}</p></div>
            <div><span className="text-xs uppercase tracking-wider" style={{color:'var(--text-secondary)'}}>Status</span><p className="font-semibold">{selected.status}</p></div>
            <p className="text-sm leading-6" style={{color:'var(--text-secondary)'}}>{selected.description}</p>
          </div>
          <a href={selected.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300">NASA mission page <ExternalLink size={14}/></a>
        </aside>
      </section>

      <section className="grid md:grid-cols-4 gap-4">
        <div className="rounded-2xl border p-5" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}><Activity className="text-emerald-400"/><div className="text-2xl font-black mt-3">{missions.filter(m=>m.status==='Active').length}</div><p className="text-sm">{text('Active in this hub','اس hub میں فعال')}</p></div>
        <div className="rounded-2xl border p-5" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}><Rocket className="text-blue-400"/><div className="text-2xl font-black mt-3">{missions.length}</div><p className="text-sm">{text('Mission profiles','مشن پروفائلز')}</p></div>
        <div className="rounded-2xl border p-5" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}><Clock3 className="text-amber-400"/><div className="text-2xl font-black mt-3">{String(Math.floor(seconds/60)).padStart(2,'0')}:{String(seconds%60).padStart(2,'0')}</div><p className="text-sm">{text('Control session','کنٹرول سیشن')}</p></div>
        <button onClick={() => setRunning(v => !v)} className="rounded-2xl border p-5 text-left hover:border-emerald-500" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}><Zap className="text-purple-400"/><p className="font-bold mt-3">{running ? 'Pause control clock' : 'Resume control clock'}</p><p className="text-xs mt-1" style={{color:'var(--text-secondary)'}}>Interactive mission-control UI</p></button>
      </section>
    </div>
  );
}
