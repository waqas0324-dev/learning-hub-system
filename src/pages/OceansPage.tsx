import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Waves, Droplets, CloudRain, ArrowDown, ArrowUp, Fish, ThermometerSun } from 'lucide-react';

export function OceansPage() {
  const { language } = useApp();
  const text=(en:string,ur:string)=>{
    if(language==='en') return <>{en}</>;
    if(language==='ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
  };
  return <div className="space-y-8 pb-10">
    <section className="rounded-3xl overflow-hidden border p-8 md:p-12" style={{background:'linear-gradient(135deg,#061a2b,#0b4f6c 55%,#082f49)',borderColor:'var(--border)'}}>
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-white/10 text-white mb-4"><Waves size={15}/>{text('Water systems','آبی نظام')}</div>
        <h1 className="text-4xl md:text-6xl font-black text-white">{text('Oceans & Water Cycle','سمندر اور آبی چکر')}</h1>
        <p className="mt-4 text-white/75 leading-7">{text('Learn how ocean water moves through evaporation, condensation, precipitation, runoff and collection — and why oceans regulate Earth’s climate.','سمجھیں کہ سمندری پانی تبخیر، تکثیف، بارش، بہاؤ اور جمع ہونے کے مراحل سے کیسے گزرتا ہے اور سمندر زمین کے موسم کو کیسے متاثر کرتے ہیں۔')}</p>
      </div>
    </section>
    <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[['Evaporation','تبخیر',ArrowUp,'Water gains heat and rises as vapor.'],['Condensation','تکثیف',CloudRain,'Water vapor cools and forms clouds.'],['Precipitation','بارش',Droplets,'Water returns to Earth as rain or snow.'],['Runoff','سطحی بہاؤ',ArrowDown,'Water flows back toward rivers and oceans.']].map(([en,ur,Icon,desc])=>{
        const I=Icon as any; return <div className="rounded-2xl border p-5" style={{backgroundColor:'var(--surface)',borderColor:'var(--border')}}><I size={28} style={{color:'var(--accent)'}}/><h3 className="font-bold mt-3">{text(en as string,ur as string)}</h3><p className="text-sm mt-2" style={{color:'var(--text-secondary)'}}>{text(desc as string,desc as string)}</p></div>
      })}
    </section>
    <section className="rounded-2xl border p-6" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
      <h2 className="text-2xl font-bold mb-6">{text('Interactive water-cycle flow','آبی چکر کا بصری فلو')}</h2>
      <div className="relative h-64 rounded-2xl overflow-hidden" style={{background:'linear-gradient(#071a2e 0 45%,#075985 45% 100%)'}}>
        <div className="absolute left-8 bottom-8 w-24 h-24 rounded-full bg-amber-300/90 animate-pulse"/>
        <div className="absolute left-[42%] top-8 w-36 h-16 rounded-full bg-white/20 blur-md"/>
        <div className="absolute right-10 top-10"><CloudRain className="text-white/80" size={42}/></div>
        <div className="absolute left-[43%] bottom-8 flex gap-2">{[0,1,2,3,4].map(i=><Droplets key={i} className="text-cyan-200 animate-bounce" style={{animationDelay:i*120+'ms'}} size={18}/>)}</div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 text-white text-xs">{text('Heat → evaporation → clouds → precipitation → runoff','حرارت → تبخیر → بادل → بارش → سطحی بہاؤ')}</div>
      </div>
    </section>
    <section className="grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border p-6" style={{backgroundColor:'var(--surface)',borderColor:'var(--border')}}><Fish size={28} style={{color:'var(--cyan)'}}/><h2 className="font-bold text-xl mt-3">{text('Ocean life','سمندری حیات')}</h2><p className="mt-2 text-sm leading-6" style={{color:'var(--text-secondary)'}}>{text('Oceans support food webs from microscopic plankton to large marine animals.','سمندر خوردبینی پلانکٹن سے بڑے سمندری جانوروں تک خوراکی زنجیروں کو سہارا دیتے ہیں۔')}</p></div>
      <div className="rounded-2xl border p-6" style={{backgroundColor:'var(--surface)',borderColor:'var(--border')}}><ThermometerSun size={28} style={{color:'var(--orange)'}}/><h2 className="font-bold text-xl mt-3">{text('Climate connection','آب و ہوا سے تعلق')}</h2><p className="mt-2 text-sm leading-6" style={{color:'var(--text-secondary)'}}>{text('The ocean stores and transports heat, influencing weather and climate around the world.','سمندر حرارت کو ذخیرہ اور منتقل کرتے ہیں، جس سے دنیا بھر کے موسم اور آب و ہوا متاثر ہوتی ہے۔')}</p></div>
    </section>
  </div>;
}