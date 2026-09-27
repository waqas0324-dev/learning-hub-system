import React from 'react';
import { useApp } from '../contexts/AppContext';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export function PlaceholderPage({ title, icon }: { title: { en:string; ur:string }; icon: React.ReactNode }) {
 const {language}=useApp();
 const text=(en:string,ur:string)=>language==='en'?<>{en}</>:language==='ur'?<span className="font-urdu" dir="rtl">{ur}</span>:<><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
 return <div className="space-y-8 pb-10">
  <section className="rounded-3xl p-8 md:p-12 border relative overflow-hidden" style={{background:'linear-gradient(135deg,#0f172a,#1e293b 55%,#312e81)',borderColor:'var(--border)'}}>
   <div className="absolute -right-10 -top-10 opacity-10">{icon}</div>
   <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-white/10 text-white"><Sparkles size={14}/>{text('Learning module','تعلیمی ماڈیول')}</div>
   <h1 className="text-4xl md:text-5xl font-black text-white mt-5">{text(title.en,title.ur)}</h1>
   <p className="mt-4 max-w-2xl text-white/70 leading-7">{text('This module is being upgraded into a complete visual lesson with bilingual explanations, diagrams, interactive activities and knowledge checks.','اس ماڈیول کو مکمل بصری سبق میں اپ گریڈ کیا جا رہا ہے جس میں دو لسانی وضاحتیں، خاکے، interactive سرگرمیاں اور علم کی جانچ شامل ہوگی۔')}</p>
  </section>
  <section className="grid md:grid-cols-3 gap-4">
   {[
    [BookOpen,'Learn','سیکھیں','Structured explanations with Urdu and English.'],
    [Sparkles,'Visualize','بصری طور پر سمجھیں','Diagrams, animations and relevant imagery will explain the concept.'],
    [ArrowRight,'Practice','مشق کریں','Interactive questions and activities reinforce understanding.']
   ].map(([I,en,ur,d])=>{const Icon=I as any;return <div className="rounded-2xl border p-6" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}><Icon size={26} style={{color:'var(--accent)'}}/><h2 className="font-bold text-lg mt-3">{text(en as string,ur as string)}</h2><p className="text-sm mt-2" style={{color:'var(--text-secondary)'}}>{text(d as string,d as string)}</p></div>})}
  </section>
 </div>;
}