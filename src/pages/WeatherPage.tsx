import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Sun, Cloud, Wind, Thermometer, Droplets, ArrowRight } from 'lucide-react';

export function WeatherPage() {
 const {language}=useApp();
 const text=(en:string,ur:string)=>language==='en'?<>{en}</>:language==='ur'?<span className="font-urdu" dir="rtl">{ur}</span>:<><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
 return <div className="space-y-8 pb-10">
  <section className="rounded-3xl p-8 md:p-12 border overflow-hidden" style={{background:'linear-gradient(135deg,#0b1930,#164e63,#0f766e)',borderColor:'var(--border)'}}>
   <Sun size={40} className="text-amber-300 mb-5"/>
   <h1 className="text-4xl md:text-6xl font-black text-white">{text('Weather & Climate','موسم اور آب و ہوا')}</h1>
   <p className="mt-4 max-w-3xl text-white/75 leading-7">{text('Weather describes short-term atmospheric conditions; climate describes long-term patterns. Learn how sunlight, pressure, water and wind interact.','موسم قلیل مدتی فضائی حالات کو بیان کرتا ہے جبکہ آب و ہوا طویل مدتی نمونوں کو بیان کرتی ہے۔ سورج کی روشنی، دباؤ، پانی اور ہوا کے باہمی تعلق کو سمجھیں۔')}</p>
  </section>
  <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
   {[[Thermometer,'Temperature','درجہ حرارت','How hot or cold the air is.'],[Droplets,'Humidity','نمی','The amount of water vapor in air.'],[Wind,'Wind','ہوا','Moving air caused by pressure differences.'],[Cloud,'Clouds','بادل','Visible collections of tiny water droplets or ice crystals.']].map(([I,en,ur,d])=>{const Icon=I as any;return <div className="rounded-2xl border p-5" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}><Icon size={28} style={{color:'var(--accent)'}}/><h3 className="font-bold mt-3">{text(en as string,ur as string)}</h3><p className="text-sm mt-2" style={{color:'var(--text-secondary)'}}>{text(d as string,d as string)}</p></div>})}
  </section>
  <section className="rounded-2xl border p-6" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
   <h2 className="text-2xl font-bold mb-6">{text('How weather forms','موسم کیسے بنتا ہے')}</h2>
   <div className="flex flex-wrap items-center justify-center gap-3">
    {['Sun heats surface','Air warms and rises','Pressure changes','Wind moves','Clouds form','Rain may fall'].map((x,i)=><React.Fragment key={x}><div className="rounded-xl border p-4 text-center min-w-[130px]" style={{borderColor:'var(--border)',backgroundColor:'var(--surface-muted)'}}><div className="text-xs font-semibold">{text(x,['سورج سطح گرم کرتا ہے','گرم ہوا اوپر اٹھتی ہے','دباؤ بدلتا ہے','ہوا حرکت کرتی ہے','بادل بنتے ہیں','بارش ہو سکتی ہے'][i])}</div></div>{i<5&&<ArrowRight size={18} style={{color:'var(--accent)'}}/>}</React.Fragment>)}
   </div>
  </section>
 </div>
}