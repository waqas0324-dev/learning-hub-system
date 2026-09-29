import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Factory, Droplets, Gauge, Zap, Shield, Mountain, Waves, ExternalLink } from 'lucide-react';
import { DamProcessAnimation } from '../components/DamProcessAnimation';
import { useApp } from '../contexts/AppContext';

type Step={title:string;ur:string;body:string;icon:React.ReactNode};
const steps:Step[]=[
 {title:'Catchment & rainfall',ur:'پانی جمع ہونے والا علاقہ اور بارش',body:'Rain, snowmelt and tributary flow collect water across the upstream catchment. The reservoir does not create water; it stores incoming flow over time.',icon:<Cloud/>},
 {title:'Reservoir',ur:'ریزروائر',body:'A reservoir stores water behind the dam. Storage can help regulate seasonal flow, supply water, reduce some flood peaks and provide an elevation difference for hydropower.',icon:<Droplets/>},
 {title:'Intake & gates',ur:'انٹیک اور گیٹس',body:'Controlled openings admit water into the hydraulic system. Gates can regulate flow and isolate equipment for operation or maintenance.',icon:<Gauge/>},
 {title:'Penstock',ur:'پین اسٹاک',body:'In many hydropower plants, a pressurized pipe or tunnel carries water toward the turbine. The available head and flow determine much of the potential power.',icon:<Waves/>},
 {title:'Turbine',ur:'ٹربائن',body:'Moving water transfers energy to turbine blades. The turbine converts hydraulic energy into mechanical rotational energy.',icon:<Factory/>},
 {title:'Generator',ur:'جنریٹر',body:'The turbine shaft spins a generator. Electromagnetic induction converts mechanical rotation into electrical energy.',icon:<Zap/>},
 {title:'Tailrace & downstream river',ur:'ٹیل ریس اور نیچے کا دریا',body:'After passing through the turbine, water returns to the river through the tailrace and continues downstream.',icon:<ArrowLeft/>}
];
function Cloud(){return <span className="text-cyan-500 text-xl">☁</span>}
function T({en,ur}:{en:string;ur:string}){const{language}=useApp();if(language==='ur')return <span className="font-urdu" dir="rtl">{ur}</span>;if(language==='both')return <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;return <span>{en}</span>}

export function DamDetailPage(){
 return <div className="space-y-9 pb-16">
  <Link to="/dams" className="inline-flex items-center gap-2 font-bold text-cyan-500"><ArrowLeft size={18}/><T en="Back to Dams Lab" ur="ڈیم لیب پر واپس جائیں"/></Link>
  <section className="relative overflow-hidden rounded-[2rem] border p-7 md:p-11 text-white" style={{background:'radial-gradient(circle at 75% 20%,rgba(14,165,233,.35),transparent 30%),linear-gradient(135deg,#052e16,#064e3b 48%,#082f49)',borderColor:'rgba(110,231,183,.2)'}}>
   <div className="absolute right-8 top-8 opacity-15"><Factory size={150}/></div>
   <div className="relative max-w-4xl"><div className="text-xs tracking-[.2em] font-black text-emerald-300">HYDROPOWER ENGINEERING</div><h1 className="mt-3 text-4xl md:text-6xl font-black"><T en="How a Dam Turns Water into Electricity" ur="ڈیم پانی کو بجلی میں کیسے تبدیل کرتا ہے؟"/></h1><p className="mt-5 text-white/80 leading-8"><T en="Follow one water molecule from rainfall and reservoir storage through intake, penstock, turbine and generator, then back into the river." ur="بارش کے پانی کے ریزروائر میں جمع ہونے سے لے کر intake، penstock، turbine اور generator تک ایک پانی کے سالمے کا سفر دیکھیں، پھر اسے دوبارہ دریا میں واپس آتے دیکھیں۔"/></p></div>
  </section>
  <DamProcessAnimation/>
  <section className="grid md:grid-cols-2 gap-5">{steps.map((s,i)=><article key={s.title} className="rounded-3xl border p-6" style={{background:'var(--surface)',borderColor:'var(--border)'}}><div className="flex gap-4"><div className="w-11 h-11 rounded-2xl bg-cyan-500/10 grid place-items-center text-cyan-500 shrink-0">{s.icon}</div><div><div className="text-xs font-black text-cyan-500">STEP {i+1}</div><h2 className="mt-1 text-xl font-black" style={{color:'var(--text-primary)'}}><T en={s.title} ur={s.ur}/></h2><p className="mt-3 text-sm leading-7" style={{color:'var(--text-secondary)'}}>{s.body}</p></div></div></article>)}</section>
  <section className="rounded-3xl border p-6 md:p-8" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
   <div className="flex items-center gap-3"><Gauge className="text-amber-500"/><h2 className="text-2xl md:text-3xl font-black" style={{color:'var(--text-primary)'}}><T en="The power equation" ur="بجلی کی طاقت کا بنیادی تعلق"/></h2></div>
   <div className="mt-5 rounded-2xl bg-slate-950 text-white p-6 text-center"><div className="text-3xl md:text-5xl font-black tracking-wide">P ≈ ρ g Q H η</div><p className="mt-4 text-sm text-white/70">P = power · ρ = water density · g = gravitational acceleration · Q = flow rate · H = hydraulic head · η = efficiency</p></div>
   <p className="mt-4 text-sm leading-7" style={{color:'var(--text-secondary)'}}>This simplified relationship shows why both water flow and elevation/head matter. Real plants also have hydraulic losses, generator losses and operating constraints.</p>
  </section>
  <section className="grid md:grid-cols-2 gap-5">
   <article className="rounded-3xl border p-6" style={{background:'var(--surface)',borderColor:'var(--border)'}}><Shield className="text-emerald-500"/><h2 className="mt-3 text-2xl font-black" style={{color:'var(--text-primary)'}}><T en="Dam types" ur="ڈیم کی اقسام"/></h2><ul className="mt-4 space-y-3 text-sm leading-7" style={{color:'var(--text-secondary)'}}>{['Gravity dam — resists water pressure largely through its mass.','Arch dam — transfers much of the load into the surrounding canyon walls.','Embankment dam — uses compacted earth or rockfill.','Buttress dam — uses structural supports to resist water pressure.'].map(x=><li key={x}>• {x}</li>)}</ul></article>
   <article className="rounded-3xl border p-6" style={{background:'var(--surface)',borderColor:'var(--border)'}}><Mountain className="text-amber-500"/><h2 className="mt-3 text-2xl font-black" style={{color:'var(--text-primary)'}}><T en="What else does a dam do?" ur="ڈیم بجلی کے علاوہ کیا کرتا ہے؟"/></h2><ul className="mt-4 space-y-3 text-sm leading-7" style={{color:'var(--text-secondary)'}}>{['Water supply and seasonal storage','Irrigation support','Flood-flow management','Navigation in some river systems','Recreation and fisheries in some reservoirs','Potential ecological and sediment impacts that must be managed'].map(x=><li key={x}>• {x}</li>)}</ul></article>
  </section>
  <section className="rounded-3xl border p-6" style={{background:'var(--surface-muted)',borderColor:'var(--border)'}}><h2 className="text-2xl font-black" style={{color:'var(--text-primary)'}}>Official engineering reference</h2><p className="mt-2 text-sm" style={{color:'var(--text-secondary)'}}>USGS explains the basic hydropower sequence: reservoir → intake/penstock → turbine → generator → downstream water.</p><a href="https://www.usgs.gov/water-science-school/science/hydroelectric-power-how-it-works" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-cyan-500 font-bold">Open USGS reference <ExternalLink size={16}/></a></section>
 </div>
}
