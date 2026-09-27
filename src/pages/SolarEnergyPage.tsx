import React, { useEffect, useState } from 'react';
import { Sun, Zap, BatteryCharging, Home, Play, Pause, RotateCcw, Grid3X3, ArrowRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

type Stage = { key:string; en:string; ur:string; titleEn:string; titleUr:string; detailEn:string; detailUr:string };

const stages: Stage[] = [
  { key:'sun', en:'Sunlight', ur:'سورج کی روشنی', titleEn:'Photons carry energy from the Sun', titleUr:'سورج سے فوٹون توانائی لاتے ہیں', detailEn:'Sunlight reaches the photovoltaic panel. Absorbed light transfers energy to electrons in the semiconductor.', detailUr:'سورج کی روشنی فوٹو وولٹائک پینل تک پہنچتی ہے۔ جذب ہونے والی روشنی سیمی کنڈکٹر کے الیکٹرانوں کو توانائی دیتی ہے۔' },
  { key:'panel', en:'PV Panel', ur:'PV پینل', titleEn:'The PV cells create DC electricity', titleUr:'PV سیلز DC بجلی پیدا کرتے ہیں', detailEn:'The photovoltaic effect creates charge movement. Many cells are connected to form a practical solar module or panel.', detailUr:'فوٹووولٹائک اثر چارج کی حرکت پیدا کرتا ہے۔ بہت سے سیلز مل کر سولر ماڈیول یا پینل بناتے ہیں۔' },
  { key:'dc', en:'DC', ur:'DC', titleEn:'Direct current travels to the inverter', titleUr:'ڈائریکٹ کرنٹ انورٹر تک جاتا ہے', detailEn:'The electrical output from PV modules is DC. Animated charge particles show the direction of this electrical flow.', detailUr:'PV ماڈیولز سے حاصل ہونے والی بجلی DC ہوتی ہے۔ حرکت کرتے ذرات برقی بہاؤ کی سمت دکھاتے ہیں۔' },
  { key:'inverter', en:'Inverter', ur:'انورٹر', titleEn:'The inverter converts DC to AC', titleUr:'انورٹر DC کو AC میں تبدیل کرتا ہے', detailEn:'An inverter converts the panel DC output into AC electricity suitable for typical household loads and grid connection.', detailUr:'انورٹر پینل کی DC بجلی کو AC میں تبدیل کرتا ہے جو عام گھریلو آلات اور گرڈ کے لیے موزوں ہوتی ہے۔' },
  { key:'home', en:'Home', ur:'گھر', titleEn:'AC electricity powers the home', titleUr:'AC بجلی گھر کو چلاتی ہے', detailEn:'After conversion, AC power can supply lights, fans, appliances and other electrical loads.', detailUr:'تبدیلی کے بعد AC بجلی لائٹس، پنکھوں، آلات اور دیگر برقی لوڈز کو چلا سکتی ہے۔' },
  { key:'grid', en:'Grid / Battery', ur:'گرڈ / بیٹری', titleEn:'Energy can go to the grid or storage', titleUr:'توانائی گرڈ یا اسٹوریج میں جا سکتی ہے', detailEn:'A grid-connected system can send suitable excess power to the grid. A battery can store energy for later use, depending on system design.', detailUr:'گرڈ سے منسلک نظام مناسب اضافی بجلی گرڈ کو دے سکتا ہے۔ نظام کے ڈیزائن کے مطابق بیٹری توانائی بعد کے استعمال کے لیے محفوظ کر سکتی ہے۔' }
];

function Bilingual({en,ur,language}:{en:string;ur:string;language:string}) {
  if(language==='ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
  if(language==='both') return <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
  return <span>{en}</span>;
}

function FlowNode({label,active,children,onClick}:{label:React.ReactNode;active:boolean;children:React.ReactNode;onClick:()=>void}) {
  return <button type="button" onClick={onClick} className="group flex min-w-[92px] flex-col items-center gap-2 rounded-2xl border p-3 transition-all" style={{borderColor:active?'var(--accent)':'var(--border)',background:active?'color-mix(in srgb,var(--accent) 12%,var(--surface))':'var(--surface-muted)',transform:active?'translateY(-3px)':'none'}}><div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-950 text-white">{children}</div><span className="text-xs font-bold">{label}</span></button>;
}

export function SolarEnergyPage() {
  const {language}=useApp();
  const [active,setActive]=useState(0);
  const [playing,setPlaying]=useState(true);
  const [dayProgress,setDayProgress]=useState(42);

  useEffect(()=>{ if(!playing) return; const id=window.setInterval(()=>{setActive(v=>(v+1)%stages.length);setDayProgress(v=>v>=100?0:v+4);},2600); return ()=>window.clearInterval(id); },[playing]);

  const stageIndex=(key:string)=>stages.findIndex(s=>s.key===key);
  const isActive=(key:string)=>stageIndex(key)===active;
  const current=stages[active];

  return <div className="space-y-8 pb-12">
    <section className="relative overflow-hidden rounded-3xl border p-7 md:p-10" style={{background:'linear-gradient(135deg,#111827 0%,#172554 48%,#422006 100%)',borderColor:'var(--border)'}}>
      <div className="relative z-10 max-w-5xl">
        <div className="flex items-center gap-3 text-amber-300"><Sun size={34}/><span className="text-xs font-black uppercase tracking-[0.22em]">Interactive PV Demonstration</span></div>
        <h1 className="mt-4 text-4xl font-black text-white md:text-6xl"><Bilingual en="Solar Energy: Sunlight to Electricity" ur="شمسی توانائی: سورج کی روشنی سے بجلی تک" language={language}/></h1>
        <p className="mt-4 max-w-4xl text-base leading-7 text-white/75"><Bilingual en="Watch the energy pathway happen continuously: sunlight → PV cells → DC → inverter → AC → home/grid/battery." ur="توانائی کا پورا راستہ مسلسل دیکھیں: سورج کی روشنی → PV سیلز → DC → انورٹر → AC → گھر/گرڈ/بیٹری۔" language={language}/></p>
      </div>
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl"/>
    </section>

    <section className="rounded-3xl border p-4 md:p-7" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="text-2xl font-black"><Bilingual en="Live solar-to-electricity demo" ur="سورج سے بجلی بننے کا لائیو مظاہرہ" language={language}/></h2><p className="mt-1 text-sm opacity-65"><Bilingual en="Animated rays, charge flow, DC-to-AC conversion and powered loads." ur="حرکت کرتی روشنی، چارج کا بہاؤ، DC سے AC تبدیلی اور چلتے ہوئے برقی آلات۔" language={language}/></p></div>
        <div className="flex gap-2"><button type="button" onClick={()=>setPlaying(v=>!v)} className="flex items-center gap-2 rounded-xl border px-4 py-2 font-bold" style={{borderColor:'var(--border)'}}>{playing?<Pause size={17}/>:<Play size={17}/>}<Bilingual en={playing?'Pause':'Play'} ur={playing?'روکیں':'چلائیں'} language={language}/></button><button type="button" onClick={()=>{setActive(0);setDayProgress(42);setPlaying(true);}} className="rounded-xl border p-2" style={{borderColor:'var(--border)'}} aria-label="Restart"><RotateCcw size={17}/></button></div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {stages.map((s,i)=><button type="button" key={s.key} onClick={()=>{setActive(i);setPlaying(false);}} className="rounded-xl border p-3 text-left" style={{borderColor:i===active?'var(--accent)':'var(--border)',background:i===active?'color-mix(in srgb,var(--accent) 10%,var(--surface))':'var(--surface-muted)'}}><span className="text-[10px] font-black opacity-50">0{i+1}</span><span className="mt-1 block text-sm font-bold"><Bilingual en={s.en} ur={s.ur} language={language}/></span></button>)}
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border bg-slate-950 p-2 md:p-4" style={{borderColor:'var(--border)'}}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-white/60"><span>Sunrise → noon → sunset</span><span>Day cycle: {dayProgress}%</span></div>
        <svg viewBox="0 0 1200 520" className="h-auto w-full" role="img" aria-label="Animated solar photovoltaic energy flow">
          <defs>
            <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#172554"/><stop offset=".68" stopColor="#0f172a"/><stop offset="1" stopColor="#111827"/></linearGradient>
            <linearGradient id="panel" x1="0" x2="1"><stop offset="0" stopColor="#164e63"/><stop offset="1" stopColor="#0e7490"/></linearGradient>
            <filter id="sunGlow"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <rect x="0" y="0" width="1200" height="520" rx="28" fill="url(#sky)"/>
          <path d="M80 150 C330 10 650 10 880 155" fill="none" stroke="#64748b" strokeOpacity=".25" strokeWidth="2" strokeDasharray="7 8"/>
          <line x1="0" y1="405" x2="1200" y2="405" stroke="#334155" strokeWidth="3"/>

          <g>
            <circle cx="135" cy="120" r="52" fill="#fbbf24" filter="url(#sunGlow)"/><circle cx="135" cy="120" r="36" fill="#fde68a"/>
            <text x="135" y="195" textAnchor="middle" fill="#f8fafc" fontSize="17" fontWeight="800">SUN / سورج</text>
            {playing&&<animateMotion dur="8s" repeatCount="indefinite" path="M0 70 C230 -30 540 -35 760 55"/>}
          </g>

          <g opacity=".95">
            {[0,1,2,3,4].map(i=><g key={i}><path d={'M 190 '+(150+i*16)+' L 445 '+(270+i*4)} stroke="#fcd34d" strokeWidth="5" strokeLinecap="round" strokeDasharray="18 14">{playing&&<animate attributeName="stroke-dashoffset" from="32" to="0" dur="1s" repeatCount="indefinite"/>}</path>{playing&&<circle r="6" fill="#fff7ae"><animateMotion dur="1.5s" repeatCount="indefinite" path={'M 190 '+(150+i*16)+' L 445 '+(270+i*4)}/></circle>}</g>)}
          </g>

          <g>
            <polygon points="405,280 570,250 635,330 470,365" fill="url(#panel)" stroke="#67e8f9" strokeWidth="4"/>
            {[0,1,2,3].map(i=><line key={i} x1={430+i*35} y1={275-i*5} x2={493+i*35} y2={353-i*6} stroke="#67e8f9" strokeOpacity=".55" strokeWidth="2"/>)}
            {[0,1,2].map(i=><line key={i} x1="417" y1={295+i*23} x2="592" y2={264+i*23} stroke="#67e8f9" strokeOpacity=".55" strokeWidth="2"/>)}
            <text x="520" y="392" textAnchor="middle" fill="#f8fafc" fontSize="17" fontWeight="800">PV PANEL / سولر پینل</text>
          </g>

          <path d="M575 330 C650 360 700 350 750 335" fill="none" stroke="#22d3ee" strokeWidth="8"/>
          {playing&&[0,1,2,3,4].map(i=><circle key={i} r="7" fill="#67e8f9"><animateMotion dur="1.5s" begin={i*.28+'s'} repeatCount="indefinite" path="M575 330 C650 360 700 350 750 335"/></circle>)}
          <text x="665" y="385" textAnchor="middle" fill="#67e8f9" fontSize="16" fontWeight="900">DC →</text>

          <g><rect x="750" y="285" width="130" height="105" rx="18" fill="#312e81" stroke="#c4b5fd" strokeWidth="3"/><path d="M775 338 Q792 310 809 338 T843 338" fill="none" stroke="#f5f3ff" strokeWidth="4"/><path d="M775 355 Q792 327 809 355 T843 355" fill="none" stroke="#f5f3ff" strokeWidth="4" opacity=".7"/><text x="815" y="415" textAnchor="middle" fill="#f8fafc" fontSize="17" fontWeight="800">INVERTER</text><text x="815" y="435" textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="700">DC → AC</text></g>

          <path d="M880 337 C935 337 950 280 1000 280" fill="none" stroke="#a78bfa" strokeWidth="8"/>
          {playing&&[0,1,2,3].map(i=><circle key={i} r="7" fill="#c4b5fd"><animateMotion dur="1.2s" begin={i*.25+'s'} repeatCount="indefinite" path="M880 337 C935 337 950 280 1000 280"/></circle>)}
          <text x="925" y="320" textAnchor="middle" fill="#c4b5fd" fontSize="16" fontWeight="900">AC →</text>

          <g><rect x="975" y="220" width="100" height="80" rx="16" fill="#172554" stroke="#93c5fd" strokeWidth="3"/><path d="M995 280 V255 H1018 V280 M1020 280 V242 H1048 V280" stroke="#f8fafc" strokeWidth="5"/><circle cx="1032" cy="250" r="5" fill="#fbbf24" className="animate-pulse"/><text x="1025" y="330" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="800">HOME</text></g>

          <g><line x1="1030" y1="220" x2="1110" y2="150" stroke="#a78bfa" strokeWidth="7"/><line x1="1040" y1="220" x2="1120" y2="150" stroke="#a78bfa" strokeWidth="7"/><line x1="1108" y1="150" x2="1108" y2="285" stroke="#94a3b8" strokeWidth="5"/><line x1="1108" y1="205" x2="1150" y2="205" stroke="#94a3b8" strokeWidth="5"/><text x="1120" y="315" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="800">GRID</text></g>

          <g><rect x="965" y="365" width="110" height="70" rx="16" fill="#064e3b" stroke="#6ee7b7" strokeWidth="3"/><path d="M1010 380 V415 M995 397 H1025" stroke="#6ee7b7" strokeWidth="5"/><text x="1020" y="460" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="800">BATTERY</text></g>
          <text x="600" y="490" textAnchor="middle" fill="#94a3b8" fontSize="14">Educational animation — sizes and distances are intentionally compressed.</text>
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-bold">{['Sunlight','PV cells','DC current','Inverter','AC power','Home / Grid / Battery'].map((x,i)=><React.Fragment key={x}><span className="rounded-full px-3 py-1.5" style={{background:i===active?'var(--accent)':'var(--surface-muted)',color:i===active?'#fff':'var(--text-primary)'}}>{x}</span>{i<5&&<ArrowRight size={14} className="opacity-40"/>}</React.Fragment>)}</div>
    </section>

    <section className="grid gap-4 md:grid-cols-3">{stages.map((s,i)=><button type="button" key={s.key} onClick={()=>{setActive(i);setPlaying(false);}} className="rounded-2xl border p-5 text-left transition-all hover:-translate-y-1" style={{background:'var(--surface)',borderColor:i===active?'var(--accent)':'var(--border)'}}><div className="text-xs font-black opacity-50">STEP {i+1}</div><h3 className="mt-2 text-lg font-black"><Bilingual en={s.titleEn} ur={s.titleUr} language={language}/></h3><p className="mt-2 text-sm leading-6 opacity-70"><Bilingual en={s.detailEn} ur={s.detailUr} language={language}/></p></button>)}</section>

    <section className="grid gap-4 md:grid-cols-3">
      <FlowNode label={<Bilingual en="Sunlight" ur="روشنی" language={language}/>} active={isActive('sun')} onClick={()=>{setActive(stageIndex('sun'));setPlaying(false);}}><Sun className="text-amber-300" size={30}/></FlowNode>
      <FlowNode label={<Bilingual en="PV cells" ur="PV سیلز" language={language}/>} active={isActive('panel')} onClick={()=>{setActive(stageIndex('panel'));setPlaying(false);}}><span className="grid grid-cols-3 gap-1">{Array.from({length:9}).map((_,i)=><span key={i} className="h-2 w-2 rounded-sm bg-cyan-300"/>)}</span></FlowNode>
      <FlowNode label={<Bilingual en="Inverter" ur="انورٹر" language={language}/>} active={isActive('inverter')} onClick={()=>{setActive(stageIndex('inverter'));setPlaying(false);}}><Zap className="text-violet-300" size={30}/></FlowNode>
      <FlowNode label={<Bilingual en="Home" ur="گھر" language={language}/>} active={isActive('home')} onClick={()=>{setActive(stageIndex('home'));setPlaying(false);}}><Home className="text-blue-200" size={30}/></FlowNode>
      <FlowNode label={<Bilingual en="Grid" ur="گرڈ" language={language}/>} active={isActive('grid')} onClick={()=>{setActive(stageIndex('grid'));setPlaying(false);}}><Grid3X3 className="text-cyan-200" size={30}/></FlowNode>
      <FlowNode label={<Bilingual en="Battery" ur="بیٹری" language={language}/>} active={isActive('grid')} onClick={()=>{setActive(stageIndex('grid'));setPlaying(false);}}><BatteryCharging className="text-emerald-300" size={30}/></FlowNode>
    </section>

    <section className="rounded-2xl border p-5 text-sm leading-7 opacity-80" style={{background:'var(--surface-muted)',borderColor:'var(--border)'}}><Bilingual en="Science basis: DOE explains that PV semiconductors absorb sunlight and transfer energy to electrons, PV modules produce DC, and inverters convert DC to AC for typical household and grid use." ur="سائنسی بنیاد: امریکی محکمہ توانائی کے مطابق PV سیمی کنڈکٹر سورج کی روشنی جذب کر کے الیکٹرانوں کو توانائی دیتے ہیں، PV ماڈیول DC پیدا کرتے ہیں، اور انورٹر DC کو AC میں تبدیل کرتا ہے جو عام گھریلو اور گرڈ استعمال کے لیے موزوں ہے۔" language={language}/></section>
  </div>;
}
