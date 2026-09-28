import React,{useMemo,useState}from'react';
import{Search as SearchIcon,ArrowRight,BookOpen,Globe,Gamepad2,Image as ImageIcon}from'lucide-react';
import{useNavigate,useSearchParams}from'react-router-dom';
import{useApp}from'../contexts/AppContext';

const items=[
 {title:'Solar System',ur:'نظامِ شمسی',path:'/solar-system',type:'Lesson',tags:'sun planets orbits solar system'},
 {title:'Planets',ur:'سیارے',path:'/planets',type:'Lesson',tags:'mercury venus earth mars jupiter saturn uranus neptune'},
 {title:'Moon, Sun & Stars',ur:'چاند، سورج اور تارے',path:'/moon-sun-stars',type:'Lesson',tags:'moon phases sun stars nebula'},
 {title:'Eclipses',ur:'گرہن',path:'/eclipses',type:'Interactive',tags:'solar lunar eclipse shadow'},
 {title:'Scientists & Missions',ur:'سائنسدان اور مشنز',path:'/scientists',type:'Missions',tags:'galileo cassini new horizons scientists'},
 {title:'Earth Explorer',ur:'زمین کو جانیں',path:'/earth',type:'Earth Science',tags:'earth atmosphere water continents tectonics'},
 {title:'Oceans & Water Cycle',ur:'سمندر اور آبی چکر',path:'/oceans',type:'Earth Science',tags:'ocean water cycle evaporation'},
 {title:'Weather & Climate',ur:'موسم اور آب و ہوا',path:'/weather',type:'Earth Science',tags:'weather climate clouds temperature'},
 {title:'Dams & Water Resources',ur:'ڈیم اور آبی وسائل',path:'/dams',type:'Earth Science',tags:'dams water reservoirs hydropower'},
 {title:'Solar Energy',ur:'شمسی توانائی',path:'/solar-energy',type:'Energy Lab',tags:'solar panels photovoltaic dc ac inverter battery grid'},
 {title:'Quiz Center',ur:'کوئز مرکز',path:'/quiz',type:'Practice',tags:'quiz questions score'},
 {title:'Learning Games',ur:'تعلیمی گیمز',path:'/games',type:'Games',tags:'games planet order gravity eclipse match'},
 {title:'Glossary',ur:'اصطلاحات',path:'/glossary',type:'Reference',tags:'definitions astronomy terms'},
 {title:'3D Space Explorer',ur:'3D خلائی ایکسپلورر',path:'/3d-explorer',type:'Interactive',tags:'3d nasa eyes missions spacecraft solar system'},
 {title:'Space Resources',ur:'خلائی وسائل',path:'/resources',type:'Resources',tags:'nasa resources interactives education images videos'}
];

export function SearchPage(){
 const{language}=useApp();const navigate=useNavigate();const[params]=useSearchParams();const[q,setQ]=useState(()=>params.get('q')||'');
 const results=useMemo(()=>{const x=q.trim().toLowerCase();if(!x)return items;return items.filter(i=>(i.title+' '+i.ur+' '+i.tags+' '+i.type).toLowerCase().includes(x))},[q]);
 const text=(en:string,ur:string)=>language==='ur'?<span className="font-urdu" dir="rtl">{ur}</span>:language==='both'?<><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>:<span>{en}</span>;
 return <div className="space-y-7 pb-12">
  <section className="rounded-3xl p-7 md:p-10 text-white" style={{background:'linear-gradient(135deg,#0f172a,#1e3a8a,#312e81)'}}><SearchIcon size={30}/><h1 className="mt-4 text-4xl md:text-5xl font-black">{text('Search Learning Hub','لرننگ ہب میں تلاش کریں')}</h1><p className="mt-3 text-white/70">{text('Find lessons, interactive tools, games and reference topics instantly.','اسباق، interactive tools، گیمز اور معلوماتی موضوعات فوراً تلاش کریں۔')}</p></section>
  <section className="rounded-3xl border p-4 md:p-6" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}><div className="flex items-center gap-3 rounded-2xl border px-4 py-3" style={{borderColor:'var(--border)'}}><SearchIcon size={20}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search planets, missions, oceans, games..." className="w-full bg-transparent outline-none"/></div></section>
  <section className="grid md:grid-cols-2 gap-4">{results.map(i=><button key={i.path} onClick={()=>navigate(i.path)} className="text-left rounded-2xl border p-5 hover:-translate-y-1 transition-all" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}><div className="flex items-start gap-4"><div className="w-11 h-11 rounded-xl grid place-items-center" style={{backgroundColor:'var(--surface-muted)',color:'var(--accent)'}}><BookOpen size={20}/></div><div className="flex-1"><span className="text-xs font-black uppercase tracking-wider" style={{color:'var(--accent)'}}>{i.type}</span><h2 className="text-lg font-black mt-1">{text(i.title,i.ur)}</h2><p className="text-sm mt-2" style={{color:'var(--text-secondary)'}}>{i.tags}</p></div><ArrowRight size={18}/></div></button>)}</section>
  {!results.length&&<div className="text-center rounded-2xl border p-10" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}><p className="font-bold">No matching topic found.</p></div>}
 </div>
}