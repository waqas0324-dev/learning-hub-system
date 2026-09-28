import React from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, CheckCircle2, Flame, Gamepad2, Target, Trophy } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const lessons = [
 {path:'/solar-system',en:'Solar System',ur:'نظامِ شمسی'},{path:'/planets',en:'Planets',ur:'سیارے'},
 {path:'/eclipses',en:'Eclipses',ur:'گرہن'},{path:'/earth',en:'Earth Explorer',ur:'زمین کو جانیں'},
 {path:'/solar-energy',en:'Solar Energy',ur:'شمسی توانائی'},{path:'/scientists',en:'Scientists & Missions',ur:'سائنسدان اور مشنز'},
 {path:'/mission-control',en:'Mission Control',ur:'مشن کنٹرول'},{path:'/games',en:'Learning Games',ur:'تعلیمی گیمز'},
 {path:'/quiz',en:'Quiz Center',ur:'کوئز مرکز'}
];

function T({en,ur,language}:{en:string;ur:string;language:string}) {
 if(language==='ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
 if(language==='both') return <><span>{en}</span><span className="block font-urdu mt-1 text-xs" dir="rtl">{ur}</span></>;
 return <span>{en}</span>;
}

export function DashboardPage(){
 const {language,progress,markComplete}=useApp();
 const completed=new Set(progress.completed);
 const completedCore=lessons.filter(l=>completed.has(l.path)).length;
 const pct=Math.round((completedCore/lessons.length)*100);
 const level=Math.floor(completed.size/3)+1;
 const badges=[
  {ok:completedCore>=1,icon:BookOpen,en:'First Lesson',ur:'پہلا سبق'},
  {ok:completedCore>=5,icon:Target,en:'Explorer',ur:'محقق'},
  {ok:progress.quizBest>=7,icon:Trophy,en:'Quiz Master',ur:'کوئز ماسٹر'},
  {ok:completedCore>=9,icon:Award,en:'Space Scholar',ur:'خلائی اسکالر'}
 ];
 return <div className="space-y-7 pb-12">
  <section className="rounded-3xl p-7 md:p-10 text-white overflow-hidden relative" style={{background:'radial-gradient(circle at 80% 10%,rgba(56,189,248,.32),transparent 28%),linear-gradient(135deg,#071126,#172554 58%,#312e81)'}}>
   <div className="relative z-10"><div className="flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-[.2em]"><Flame size={18}/> Learning Dashboard</div>
   <h1 className="text-4xl md:text-5xl font-black mt-3"><T en="Your Learning Dashboard" ur="آپ کا تعلیمی ڈیش بورڈ" language={language}/></h1>
   <p className="mt-3 text-white/70 max-w-2xl"><T en="Track completed lessons, quiz performance and your next learning steps." ur="مکمل کیے گئے اسباق، کوئز کی کارکردگی اور اگلے تعلیمی مراحل دیکھیں۔" language={language}/></p></div>
  </section>
  <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
   {[[BookOpen,String(progress.completed.length),'Lessons completed','مکمل اسباق'],[Target,pct+'%','Learning progress','تعلیمی پیش رفت'],[Trophy,String(progress.quizBest),'Best quiz score','بہترین کوئز اسکور'],[Award,'Level '+level,'Explorer level','ایکسپلورر لیول']].map(([Icon,value,en,ur]:any)=><div key={en} className="rounded-2xl border p-5" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}><Icon size={22} style={{color:'var(--accent)'}}/><div className="text-3xl font-black mt-3">{value}</div><div className="font-bold mt-1"><T en={en} ur={ur} language={language}/></div></div>)}
  </section>
  <section className="rounded-3xl border p-6 md:p-8" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
   <div className="flex justify-between gap-4 items-end"><div><h2 className="text-2xl font-black"><T en="Learning progress" ur="تعلیمی پیش رفت" language={language}/></h2><p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>{completedCore} of {lessons.length} core activities completed</p></div><span className="font-black text-blue-400">{pct}%</span></div>
   <div className="h-3 rounded-full mt-5 overflow-hidden" style={{backgroundColor:'var(--surface-muted)'}}><div className="h-full rounded-full transition-all" style={{width:pct+'%',backgroundColor:'var(--accent)'}}/></div>
  </section>
  <section className="grid md:grid-cols-2 gap-4">
   {lessons.map(l=>{const done=completed.has(l.path);return <Link key={l.path} to={l.path} className="rounded-2xl border p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-transform" style={{backgroundColor:'var(--surface)',borderColor:done?'rgba(16,185,129,.45)':'var(--border)'}}><div className="w-11 h-11 rounded-xl grid place-items-center" style={{backgroundColor:done?'rgba(16,185,129,.12)':'var(--surface-muted)',color:done?'#10b981':'var(--accent)'}}>{done?<CheckCircle2/>:<Gamepad2/>}</div><div className="flex-1"><div className="font-bold"><T en={l.en} ur={l.ur} language={language}/></div><div className="text-xs mt-1" style={{color:'var(--text-secondary)'}}>{done?'Completed':'Open lesson and mark complete'}</div></div><button onClick={(e)=>{e.preventDefault();markComplete(l.path)}} className="rounded-lg border px-3 py-2 text-xs font-bold">{done?'Done':'Complete'}</button></Link>})}
  </section>
  <section className="rounded-3xl border p-6" style={{backgroundColor:'var(--surface-muted)',borderColor:'var(--border)'}}><h2 className="font-black text-xl"><T en="Badges" ur="بیجز" language={language}/></h2>
   <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">{badges.map(b=>{const Icon=b.icon;return <div key={b.en} className="rounded-2xl border p-4" style={{borderColor:b.ok?'rgba(234,179,8,.4)':'var(--border)',opacity:b.ok?1:.5}}><Icon size={22}/><div className="font-bold mt-2"><T en={b.en} ur={b.ur} language={language}/></div><div className="text-xs mt-1">{b.ok?'Unlocked':'Locked'}</div></div>})}</div>
  </section>
 </div>;
}