import React,{useMemo,useState}from'react';
import{ArrowDown,ArrowUp,CheckCircle2,RotateCcw,Shuffle,Trophy,Target,Orbit,Zap,Layers}from'lucide-react';
import{useApp}from'../contexts/AppContext';
import{getCelestialImage}from'../data/imageManifest';

const planets=[
 {id:'mercury',en:'Mercury',ur:'عطارد',gravity:.38},
 {id:'venus',en:'Venus',ur:'زہرہ',gravity:.91},
 {id:'earth',en:'Earth',ur:'زمین',gravity:1},
 {id:'mars',en:'Mars',ur:'مریخ',gravity:.38},
 {id:'jupiter',en:'Jupiter',ur:'مشتری',gravity:2.34},
 {id:'saturn',en:'Saturn',ur:'زحل',gravity:1.06},
 {id:'uranus',en:'Uranus',ur:'یورینس',gravity:.92},
 {id:'neptune',en:'Neptune',ur:'نیپچون',gravity:1.19}
];

const gameCards=[
 {id:'order',title:'Planet Order',ur:'سیاروں کی ترتیب',desc:'Arrange all planets from the Sun.',icon:Shuffle},
 {id:'match',title:'Planet Match',ur:'سیارہ پہچانیں',desc:'Identify the correct planet from NASA imagery.',icon:Target},
 {id:'gravity',title:'Gravity Challenge',ur:'کششِ ثقل چیلنج',desc:'Calculate your weight on another world.',icon:Orbit},
 {id:'eclipse',title:'Eclipse Builder',ur:'گرہن بنائیں',desc:'Choose the correct Sun–Earth–Moon alignment.',icon:Layers}
];

function Text({en,ur,language}:{en:string;ur:string;language:string}){if(language==='ur')return <span className="font-urdu" dir="rtl">{ur}</span>;if(language==='both')return <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;return <span>{en}</span>}

function shuffle<T>(arr:T[]){return [...arr].sort(()=>Math.random()-.5)}

export function GamesPage(){
 const{language}=useApp();
 const[game,setGame]=useState('order');
 const[order,setOrder]=useState(()=>shuffle(planets));
 const[orderDone,setOrderDone]=useState(false);
 const[orderMoves,setOrderMoves]=useState(0);
 const[matchQ,setMatchQ]=useState(0);
 const[matchScore,setMatchScore]=useState(0);
 const[matchAnswered,setMatchAnswered]=useState<number|null>(null);
 const[gravityPlanet,setGravityPlanet]=useState('moon');
 const[gravityWeight,setGravityWeight]=useState(60);
 const[gravityAnswered,setGravityAnswered]=useState<boolean|null>(null);
 const[eclipseType,setEclipseType]=useState<'solar'|'lunar'>('solar');
 const[eclipseAnswered,setEclipseAnswered]=useState<boolean|null>(null);

 const matchQuestions=useMemo(()=>shuffle(planets).slice(0,5),[]);
 const matchOptions=useMemo(()=>{
   const correct=matchQuestions[matchQ];
   return shuffle([correct,...shuffle(planets.filter(p=>p.id!==correct.id)).slice(0,3)]);
 },[matchQuestions,matchQ]);

 const move=(idx:number,dir:number)=>{
   const a=[...order],j=idx+dir;if(j<0||j>=a.length)return;
   [a[idx],a[j]]=[a[j],a[idx]];setOrder(a);setOrderMoves(v=>v+1);setOrderDone(false);
 };
 const checkOrder=()=>setOrderDone(order.every((p,i)=>p.id===planets[i].id));
 const resetOrder=()=>{setOrder(shuffle(planets));setOrderMoves(0);setOrderDone(false)};

 const answerMatch=(id:string)=>{
   if(matchAnswered!==null)return;
   const correct=matchQuestions[matchQ].id===id;
   setMatchAnswered(matchOptions.findIndex(p=>p.id===id));
   if(correct)setMatchScore(v=>v+1);
 };
 const nextMatch=()=>{
   setMatchAnswered(null);setMatchQ(v=>(v+1)%matchQuestions.length);
 };

 const resetAll=()=>{
   resetOrder();setMatchQ(0);setMatchScore(0);setMatchAnswered(null);
   setGravityAnswered(null);setEclipseAnswered(null);
 };

 const currentMatch=matchQuestions[matchQ];
 const selectedGravity=gravityPlanet==='moon'?{en:'Moon',ur:'چاند',gravity:.165}:planets.find(p=>p.id===gravityPlanet)!;
 const expected=Math.round(gravityWeight*selectedGravity.gravity*10)/10;

 return <div className="space-y-8 pb-12">
  <section className="rounded-3xl p-7 md:p-10 text-white overflow-hidden relative" style={{background:'radial-gradient(circle at 85% 15%,rgba(99,102,241,.5),transparent 30%),linear-gradient(135deg,#071126,#172554 55%,#312e81)'}}>
   <div className="absolute -right-16 -bottom-20 w-72 h-72 rounded-full border border-white/10"/>
   <div className="flex items-center gap-3 text-cyan-300"><Trophy size={28}/><span className="text-xs font-black uppercase tracking-[.2em]">Interactive Space Arcade</span></div>
   <h1 className="mt-4 text-4xl md:text-6xl font-black"><Text en="Learning Games" ur="تعلیمی گیمز" language={language}/></h1>
   <p className="mt-4 max-w-3xl text-white/70 leading-7"><Text en="Multiple playable activities turn astronomy facts into hands-on challenges. Every game gives instant feedback and can be replayed." ur="متعدد گیمز فلکیات کے حقائق کو عملی چیلنجز میں بدلتے ہیں۔ ہر گیم فوری فیڈبیک دیتا ہے اور دوبارہ کھیلا جا سکتا ہے۔" language={language}/></p>
  </section>

  <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
   {gameCards.map(g=>{const Icon=g.icon;return <button key={g.id} onClick={()=>setGame(g.id)} className="text-left rounded-2xl border p-5 transition-all hover:-translate-y-1" style={{backgroundColor:game===g.id?'var(--surface-muted)':'var(--surface)',borderColor:game===g.id?'var(--accent)':'var(--border)',boxShadow:game===g.id?'0 12px 30px rgba(37,99,235,.12)':'none'}}>
    <Icon size={25} style={{color:'var(--accent)'}}/><h2 className="font-black text-lg mt-3"><Text en={g.title} ur={g.ur} language={language}/></h2><p className="text-sm mt-2" style={{color:'var(--text-secondary)'}}>{g.desc}</p>
   </button>})}
  </section>

  {game==='order'&&<section className="rounded-3xl border p-6 md:p-8" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
   <div className="flex flex-wrap justify-between gap-3"><div><h2 className="text-2xl font-black"><Text en="Planet Order Challenge" ur="سیاروں کی ترتیب کا چیلنج" language={language}/></h2><p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>Arrange from the Sun outward • Moves: {orderMoves}</p></div><button onClick={resetOrder} className="rounded-xl border px-4 py-2 font-bold"><RotateCcw size={16} className="inline mr-2"/>Reset</button></div>
   <div className="mt-6 grid gap-2">{order.map((p,i)=><div key={p.id} className="flex items-center gap-3 rounded-2xl border p-3" style={{borderColor:'var(--border)'}}>
    <span className="w-9 h-9 rounded-full grid place-items-center font-black text-white" style={{backgroundColor:'var(--accent)'}}>{i+1}</span><img src={getCelestialImage(p.id).thumbnailUrl} alt={p.en} className="w-12 h-12 rounded-full object-cover border" /><div className="flex-1 font-bold"><Text en={p.en} ur={p.ur} language={language}/></div>
    <button onClick={()=>move(i,-1)} className="rounded-lg border p-2" aria-label="Move up"><ArrowUp size={16}/></button><button onClick={()=>move(i,1)} className="rounded-lg border p-2" aria-label="Move down"><ArrowDown size={16}/></button>
   </div>)}</div>
   <button onClick={checkOrder} className="mt-6 rounded-xl px-5 py-3 text-white font-black" style={{backgroundColor:'var(--accent)'}}>Check Order</button>
   {orderDone&&<div className="mt-5 rounded-2xl p-5 flex items-center gap-3 bg-emerald-500/10 text-emerald-600"><CheckCircle2/><b><Text en="Perfect! All eight planets are in the correct order." ur="بہترین! تمام آٹھ سیارے درست ترتیب میں ہیں۔" language={language}/></b><Trophy className="ml-auto"/></div>}
  </section>}

  {game==='match'&&<section className="rounded-3xl border p-6 md:p-8" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
   <div className="flex justify-between gap-3"><div><h2 className="text-2xl font-black"><Text en="Planet Match" ur="سیارہ پہچانیں" language={language}/></h2><p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>Question {matchQ+1}/{matchQuestions.length} • Score {matchScore}</p></div><button onClick={()=>{setMatchQ(0);setMatchScore(0);setMatchAnswered(null)}} className="rounded-xl border px-4 py-2 font-bold">Restart</button></div>
   <div className="mt-6 rounded-3xl p-5 text-center" style={{backgroundColor:'var(--surface-muted)'}}><p className="font-black text-xl"><Text en="Which planet is shown?" ur="تصویر میں کون سا سیارہ ہے؟" language={language}/></p><img src={getCelestialImage(currentMatch.id).fullDiskImageUrl} alt={currentMatch.en} className="mx-auto mt-5 w-56 h-56 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-4 border-white/20"/></div>
   <div className="grid sm:grid-cols-2 gap-3 mt-5">{matchOptions.map((p,i)=><button key={p.id} onClick={()=>answerMatch(p.id)} className="rounded-2xl border p-4 text-left font-bold transition-all" style={{borderColor:matchAnswered!==null&&p.id===currentMatch.id?'#16a34a':'var(--border)',backgroundColor:matchAnswered!==null&&p.id===currentMatch.id?'rgba(22,163,74,.1)':'var(--surface)'}}><Text en={p.en} ur={p.ur} language={language}/></button>)}</div>
   {matchAnswered!==null&&<div className="mt-5 flex flex-wrap items-center gap-3"><span className="font-bold">{matchAnswered===matchOptions.findIndex(p=>p.id===currentMatch.id)?'Correct!':'The correct answer is '+currentMatch.en+'.'}</span><button onClick={nextMatch} className="rounded-xl px-5 py-2 text-white font-bold" style={{backgroundColor:'var(--accent)'}}>Next</button></div>}
  </section>}

  {game==='gravity'&&<section className="rounded-3xl border p-6 md:p-8" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
   <h2 className="text-2xl font-black"><Text en="Gravity Challenge" ur="کششِ ثقل کا چیلنج" language={language}/></h2>
   <p className="mt-2" style={{color:'var(--text-secondary)'}}>Enter your Earth weight and discover the approximate weight on another world.</p>
   <div className="grid md:grid-cols-2 gap-5 mt-6">
    <label className="rounded-2xl border p-5"><span className="font-bold block mb-2">Earth weight (kg)</span><input type="number" min="1" value={gravityWeight} onChange={e=>{setGravityWeight(Number(e.target.value));setGravityAnswered(null)}} className="w-full rounded-xl border p-3 bg-transparent"/></label>
    <label className="rounded-2xl border p-5"><span className="font-bold block mb-2">Choose world</span><select value={gravityPlanet} onChange={e=>{setGravityPlanet(e.target.value);setGravityAnswered(null)}} className="w-full rounded-xl border p-3 bg-transparent"><option value="moon">Moon — چاند</option>{planets.filter(p=>p.id!=='earth').map(p=><option key={p.id} value={p.id}>{p.en} — {p.ur}</option>)}</select></label>
   </div>
   <div className="mt-5 rounded-2xl p-5" style={{backgroundColor:'var(--surface-muted)'}}><div className="text-sm" style={{color:'var(--text-secondary)'}}>Gravity factor: <b>{selectedGravity.gravity}× Earth</b></div><div className="text-4xl font-black mt-2">{expected} kg</div><div className="text-sm mt-1">Approximate apparent weight • educational calculation</div></div>
   <button onClick={()=>setGravityAnswered(true)} className="mt-5 rounded-xl px-5 py-3 text-white font-black" style={{backgroundColor:'var(--accent)'}}>Reveal Calculation</button>
   {gravityAnswered&&<div className="mt-4 rounded-2xl border p-4"><b>{gravityWeight} × {selectedGravity.gravity} = {expected} kg</b><p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>Your mass stays the same; the gravitational force changes your weight.</p></div>}
  </section>}

  {game==='eclipse'&&<section className="rounded-3xl border p-6 md:p-8" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
   <h2 className="text-2xl font-black"><Text en="Eclipse Builder" ur="گرہن بنائیں" language={language}/></h2><p className="mt-2" style={{color:'var(--text-secondary)'}}>Choose the alignment that produces the selected eclipse.</p>
   <div className="flex gap-2 mt-5">{(['solar','lunar'] as const).map(t=><button key={t} onClick={()=>{setEclipseType(t);setEclipseAnswered(null)}} className="rounded-xl border px-4 py-2 font-bold" style={{borderColor:eclipseType===t?'var(--accent)':'var(--border)'}}>{t==='solar'?'Solar Eclipse — سورج گرہن':'Lunar Eclipse — چاند گرہن'}</button>)}</div>
   <div className="grid md:grid-cols-2 gap-4 mt-6">{[
    {type:'solar',label:'SUN → MOON → EARTH',ur:'سورج → چاند → زمین'},
    {type:'lunar',label:'SUN → EARTH → MOON',ur:'سورج → زمین → چاند'}
   ].map((a)=><button key={a.type} onClick={()=>setEclipseAnswered(a.type===eclipseType)} className="rounded-3xl border p-6" style={{borderColor:eclipseAnswered!==null&&a.type===eclipseType?'#16a34a':'var(--border)',backgroundColor:'var(--surface-muted)'}}>
     <div className="flex justify-center items-center gap-4 text-3xl"><span>☀️</span><span>→</span><span>{a.type==='solar'?'🌑':'🌍'}</span><span>→</span><span>{a.type==='solar'?'🌍':'🌕'}</span></div>
     <div className="font-black mt-4">{a.label}</div><div className="font-urdu mt-1" dir="rtl">{a.ur}</div>
   </button>)}</div>
   {eclipseAnswered!==null&&<div className="mt-5 rounded-2xl p-5 flex items-center gap-3" style={{backgroundColor:eclipseAnswered?'rgba(22,163,74,.1)':'rgba(220,38,38,.1)'}}>{eclipseAnswered?<CheckCircle2/>:<Zap/>}<b>{eclipseAnswered?'Correct alignment!':'Try again — match the Sun, Earth and Moon positions.'}</b></div>}
  </section>}

  <section className="rounded-3xl border p-6 flex flex-wrap items-center gap-4" style={{backgroundColor:'var(--surface-muted)',borderColor:'var(--border)'}}>
   <div><b>Space Arcade</b><p className="text-sm" style={{color:'var(--text-secondary)'}}>4 interactive games • bilingual learning • NASA imagery where applicable</p></div>
   <button onClick={resetAll} className="ml-auto rounded-xl border px-4 py-2 font-bold"><RotateCcw size={16} className="inline mr-2"/>Reset all</button>
  </section>
 </div>
}
