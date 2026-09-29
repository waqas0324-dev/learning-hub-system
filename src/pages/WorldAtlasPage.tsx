import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Globe2, Droplets, CloudSun, Waves, Factory, Sun, Telescope, ArrowRight, PlayCircle, BookOpen, Database } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

type Card={title:string;ur:string;description:string;path:string;icon:React.ReactNode;tag:string};

const cards:Card[]=[
 {title:'Solar System Encyclopedia',ur:'نظامِ شمسی انسائیکلوپیڈیا',description:'Planets, dwarf planets, moons, formation, orbits, atmospheres, missions, hazards and NASA imagery.',path:'/solar-system',icon:<Rocket/>,tag:'SPACE'},
 {title:'Planet-by-Planet Science',ur:'ہر سیارے کی مکمل سائنس',description:'Open each planet for definitions, measurements, visual learning, NASA galleries, missions and explanations.',path:'/planets',icon:<Globe2/>,tag:'SPACE'},
 {title:'Earth Explorer',ur:'زمین کی مکمل دریافت',description:'Earth structure, atmosphere, oceans, continents, tectonics, climate and interactive science.',path:'/earth',icon:<Globe2/>,tag:'EARTH'},
 {title:'Earth Water Atlas',ur:'زمین کا آبی اٹلس',description:'Where Earth water is stored, oceans, rivers, lakes, groundwater, glaciers and the water cycle.',path:'/water-atlas',icon:<Droplets/>,tag:'WATER'},
 {title:'Oceans & Water Cycle',ur:'سمندر اور آبی چکر',description:'Ocean science, evaporation, condensation, precipitation and continuous water movement.',path:'/oceans',icon:<Waves/>,tag:'WATER'},
 {title:'Weather & Climate',ur:'موسم اور آب و ہوا',description:'Atmosphere, clouds, storms, climate processes and the science behind everyday weather.',path:'/weather',icon:<CloudSun/>,tag:'EARTH'},
 {title:'Dams & Hydropower Lab',ur:'ڈیم اور پن بجلی لیب',description:'Reservoir → intake → penstock → turbine → generator, plus dam structure and water control.',path:'/dams',icon:<Factory/>,tag:'ENGINEERING'},
 {title:'Solar Energy Lab',ur:'شمسی توانائی لیب',description:'Sunlight → photovoltaic cells → DC → inverter → AC → home/grid, with animated flow.',path:'/solar-energy',icon:<Sun/>,tag:'ENERGY'},
 {title:'Mission Control',ur:'مشن کنٹرول',description:'Explore major robotic missions, mission status, targets, goals and official NASA references.',path:'/mission-control',icon:<Telescope/>,tag:'MISSIONS'},
 {title:'Scientists & Missions',ur:'سائنسدان اور مشنز',description:'People, spacecraft and planet-by-planet mission dossiers showing how discoveries were made.',path:'/scientists',icon:<BookOpen/>,tag:'RESEARCH'},
 {title:'3D Space Explorer',ur:'تین جہتی خلائی ایکسپلورر',description:'External NASA interactive experiences for exploring the solar system and Earth in 3D.',path:'/3d-explorer',icon:<Rocket/>,tag:'INTERACTIVE'},
 {title:'Resources & Sources',ur:'وسائل اور مستند ماخذ',description:'NASA, JPL and other official science resources collected for deeper study.',path:'/resources',icon:<Database/>,tag:'SOURCES'}
];

function T({en,ur}:{en:string;ur:string}){const{language}=useApp();if(language==='ur')return <span className="font-urdu" dir="rtl">{ur}</span>;if(language==='both')return <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;return <span>{en}</span>}

export function WorldAtlasPage(){
 return <div className="space-y-10 pb-16">
  <section className="relative overflow-hidden rounded-[2rem] border p-7 md:p-12 text-white" style={{background:'radial-gradient(circle at 15% 15%,rgba(14,165,233,.45),transparent 30%),radial-gradient(circle at 85% 80%,rgba(34,197,94,.25),transparent 28%),linear-gradient(135deg,#020617,#082f49 50%,#111827)',borderColor:'rgba(125,211,252,.25)'}}>
   <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-cyan-300/20 animate-pulse"/><div className="absolute right-16 top-16 w-32 h-32 rounded-full border border-cyan-300/20"/>
   <div className="relative max-w-5xl">
    <div className="flex items-center gap-2 text-cyan-300 text-xs font-black tracking-[.22em] uppercase"><Globe2 size={18}/> WORLD KNOWLEDGE ATLAS</div>
    <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight"><T en="Explore the world through connected science" ur="دنیا کو جڑی ہوئی سائنس کے ذریعے دریافت کریں"/></h1>
    <p className="mt-5 max-w-4xl text-white/80 leading-8"><T en="A growing interactive encyclopedia where every major topic opens into its own page: facts, explanations, diagrams, motion, videos, official sources and links to related knowledge." ur="ایک بڑھتا ہوا انٹرایکٹو انسائیکلوپیڈیا جہاں ہر اہم موضوع اپنے مکمل صفحے میں کھلتا ہے: حقائق، وضاحت، ڈایاگرام، موشن، ویڈیوز، مستند ماخذ اور متعلقہ موضوعات۔"/></p>
    <div className="mt-7 flex flex-wrap gap-3">
      <Link to="/planets" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-black text-slate-900 hover:scale-[1.02] transition-transform"><Rocket size={18}/><T en="Explore Space" ur="خلا دریافت کریں"/></Link>
      <Link to="/water-atlas" className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-black text-white hover:scale-[1.02] transition-transform"><Droplets size={18}/><T en="Explore Water" ur="پانی دریافت کریں"/></Link>
    </div>
   </div>
  </section>

  <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
   {[['12+','interactive learning areas','انٹرایکٹو لرننگ ایریاز'],['8','planet detail pages','سیاروں کے تفصیلی صفحات'],['5','named ocean regions','پانچ بڑے سمندری خطے'],['∞','expandable knowledge','مسلسل بڑھتا ہوا علم']].map(([v,en,ur])=><div key={en} className="rounded-2xl border p-5" style={{background:'var(--surface)',borderColor:'var(--border)'}}><div className="text-3xl font-black text-cyan-500">{v}</div><div className="mt-2 font-bold" style={{color:'var(--text-primary)'}}><T en={en} ur={ur}/></div></div>)}
  </section>

  <section>
   <div className="flex items-end justify-between gap-3"><div><p className="text-xs font-black tracking-[.2em] text-cyan-500">LEARN → SEE → WATCH → INTERACT</p><h2 className="text-3xl md:text-4xl font-black mt-2" style={{color:'var(--text-primary)'}}><T en="Choose a knowledge world" ur="علم کی دنیا منتخب کریں"/></h2></div><PlayCircle className="text-cyan-500"/></div>
   <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-5">{cards.map(card=><Link key={card.path} to={card.path} className="group rounded-3xl border p-6 hover:-translate-y-1 transition-all" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
      <div className="flex items-start justify-between gap-4"><div className="w-12 h-12 rounded-2xl grid place-items-center bg-cyan-500/10 text-cyan-500">{card.icon}</div><span className="text-[10px] font-black tracking-[.18em] text-cyan-500">{card.tag}</span></div>
      <h3 className="mt-5 text-xl font-black" style={{color:'var(--text-primary)'}}><T en={card.title} ur={card.ur}/></h3>
      <p className="mt-3 text-sm leading-7" style={{color:'var(--text-secondary)'}}>{card.description}</p>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-500 group-hover:gap-3 transition-all">Open topic <ArrowRight size={16}/></div>
   </Link>)}</div>
  </section>

  <section className="rounded-3xl border p-6 md:p-8" style={{background:'var(--surface-muted)',borderColor:'var(--border)'}}>
   <h2 className="text-2xl md:text-3xl font-black" style={{color:'var(--text-primary)'}}><T en="The standard for every future topic" ur="ہر نئے موضوع کے لیے معیار"/></h2>
   <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-3">{[
    ['01','Definition','تعریف','What is it?'],
    ['02','Measurements','اعداد و پیمائش','How big, far, deep, hot or fast?'],
    ['03','How it works','یہ کیسے کام کرتا ہے؟','Process, cause and effect.'],
    ['04','Visual learning','بصری سیکھنا','Diagrams, motion and interactive graphics.'],
    ['05','Real media','حقیقی میڈیا','Official photos and videos where available.'],
    ['06','Sources','مستند ماخذ','NASA, NOAA, USGS and other authoritative references.']
   ].map(([n,en,ur,d])=><div key={n} className="rounded-2xl border p-5" style={{background:'var(--surface)',borderColor:'var(--border)'}}><span className="text-cyan-500 font-black">{n}</span><h3 className="mt-2 font-black" style={{color:'var(--text-primary)'}}><T en={en} ur={ur}/></h3><p className="mt-2 text-sm" style={{color:'var(--text-secondary)'}}>{d}</p></div>)}</div>
  </section>
 </div>
}
