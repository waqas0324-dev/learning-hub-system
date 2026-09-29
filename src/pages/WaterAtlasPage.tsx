import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Waves, Mountain, Factory, Database, PlayCircle, ArrowUp, Snowflake, Globe2, ExternalLink } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { EarthProcessAnimation } from '../components/EarthProcessAnimation';

const oceans=[
 {name:'Pacific Ocean',ur:'بحرالکاہل',area:'~162 million km²',depth:'Deepest ocean basin; average depth ~4 km',note:'Largest and deepest ocean basin; includes the Mariana Trench.'},
 {name:'Atlantic Ocean',ur:'بحرِ اوقیانوس',area:'~106 million km²',depth:'Second-largest ocean basin',note:'Separates the Americas from Europe and Africa and contains major currents.'},
 {name:'Indian Ocean',ur:'بحرِ ہند',area:'~70.6 million km²',depth:'Third-largest ocean basin',note:'Strongly influenced by seasonal monsoon winds.'},
 {name:'Southern Ocean',ur:'بحرِ جنوبی',area:'~21 million km²',depth:'Encircles Antarctica',note:'A major pathway for global ocean circulation around Antarctica.'},
 {name:'Arctic Ocean',ur:'بحرِ منجمد شمالی',area:'~14 million km²',depth:'Smallest and shallowest ocean basin',note:'Contains extensive seasonal and multi-year sea ice.'}
];

const rivers=[
 ['Nile','نیل','~6,650 km','Africa','A very long river system; exact rankings depend on how headwaters are defined.'],
 ['Amazon','ایمیزون','~6,400 km','South America','Carries the greatest river discharge to the ocean.'],
 ['Yangtze','یانگ زی','~6,300 km','Asia','Longest river in Asia and a major freshwater system.'],
 ['Mississippi–Missouri','مسسیپی–میسوری','~6,275 km','North America','One of the major river systems of North America.'],
 ['Yenisei system','ینی سی','~5,500 km','Asia','Major Arctic-draining river system.']
];

const lakes=[
 ['Caspian Sea','بحیرۂ کیسپین','Largest enclosed lake by area; saline'],
 ['Lake Superior','جھیل سپیریئر','Largest freshwater lake by surface area'],
 ['Lake Victoria','جھیل وکٹوریہ','Largest lake in Africa by surface area'],
 ['Lake Baikal','جھیل بائیکال','Deepest freshwater lake and a major freshwater store'],
 ['Lake Tanganyika','جھیل ٹانگانیکا','One of the deepest and longest freshwater lakes']
];

const waterPools=[
 ['Oceans','سمندر','1,338,000,000 km³','~96.5%','Mostly saline'],
 ['Ice caps & glaciers','برفانی چادریں اور گلیشیئر','~24,064,000 km³','~1.74%','Major freshwater store'],
 ['Groundwater','زیرِ زمین پانی','~23,400,000 km³','~1.7%','Fresh + saline; estimates vary'],
 ['Lakes, rivers & streams','جھیلیں، دریا اور ندی نالے','Small fraction','Tiny share','Vital for ecosystems and human use'],
 ['Atmosphere','فضا','~12,900 km³','~0.001%','Water vapor, clouds and precipitation']
];

const detailSlug=(type:string,name:string)=>{
 const key=name.toLowerCase();
 if(type==='ocean') return key.includes('pacific')?'ocean-pacific':key.includes('atlantic')?'ocean-atlantic':key.includes('indian')?'ocean-indian':key.includes('southern')?'ocean-southern':'ocean-arctic';
 if(type==='river') return key.includes('nile')?'river-nile':key.includes('amazon')?'river-amazon':key.includes('yangtze')?'river-yangtze':key.includes('mississippi')?'river-mississippi':'river-yangtze';
 if(type==='lake') return key.includes('caspian')?'lake-caspian':key.includes('superior')?'lake-superior':key.includes('victoria')?'lake-victoria':key.includes('baikal')?'lake-baikal':'lake-tanganyika';
 if(type==='pool') return key.includes('ocean')?'water-oceans':key.includes('groundwater')?'water-groundwater':key.includes('ice')?'water-glaciers':'water-atmosphere';
 return '';
};
function T({en,ur}:{en:string;ur:string}){const{language}=useApp();if(language==='ur')return <span className="font-urdu" dir="rtl">{ur}</span>;if(language==='both')return <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;return <span>{en}</span>}

export function WaterAtlasPage(){
 return <div className="space-y-10 pb-14">
  <section className="relative overflow-hidden rounded-[2rem] border p-7 md:p-12 text-white" style={{background:'radial-gradient(circle at 15% 20%,#0ea5e9 0,transparent 28%),linear-gradient(135deg,#04111f,#082f49 48%,#075985)',borderColor:'rgba(125,211,252,.25)'}}>
   <Globe2 className="absolute right-5 top-5 h-40 w-40 opacity-10"/>
   <div className="relative max-w-5xl">
    <div className="flex items-center gap-2 text-cyan-300 text-xs font-black tracking-[.2em] uppercase"><Droplets size={18}/> Earth Water Atlas</div>
    <h1 className="mt-4 text-4xl md:text-6xl font-black"><T en="Earth's Water — from Ocean to River to Dam" ur="زمین کا پانی — سمندر سے دریا اور ڈیم تک"/></h1>
    <p className="mt-5 max-w-4xl text-white/80 leading-8"><T en="A deep-learning atlas: how much water Earth has, where it is stored, how oceans, rivers, lakes, groundwater and glaciers connect, how dams control flow, and how moving water can become electricity." ur="ایک جامع علمی اٹلس: زمین پر کتنا پانی ہے، کہاں محفوظ ہے، سمندر، دریا، جھیلیں، زیرِ زمین پانی اور گلیشیئر کیسے جڑے ہیں، ڈیم پانی کے بہاؤ کو کیسے قابو کرتے ہیں اور بہتا ہوا پانی بجلی میں کیسے بدلتا ہے۔"/></p>
   </div>
  </section>

  <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
   {[
    ['71%','Earth surface covered by water','زمین کی سطح کا پانی والا حصہ',Waves],
    ['96.5%','Earth water in oceans','زمین کے پانی کا سمندروں میں حصہ',Droplets],
    ['~1.386B km³','Total Earth water','زمین پر کل پانی',Globe2],
    ['55,000+','Dams in ICOLD register','ICOLD رجسٹر میں ڈیم',Factory]
   ].map(([value,en,ur,I])=>{const Icon=I as any;return <div key={String(value)} className="rounded-2xl border p-5" style={{background:'var(--surface)',borderColor:'var(--border)'}}><Icon size={24} style={{color:'var(--accent)'}}/><div className="mt-3 text-3xl font-black" style={{color:'var(--text-primary)'}}>{value}</div><div className="mt-1 font-bold" style={{color:'var(--text-primary)'}}><T en={en as string} ur={ur as string}/></div></div>})}
  </section>

  <section className="rounded-3xl border p-6 md:p-8" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
   <div className="flex items-start gap-3"><Database className="mt-1" style={{color:'var(--accent)'}}/><div><h2 className="text-2xl md:text-3xl font-black" style={{color:'var(--text-primary)'}}><T en="Where is Earth's water?" ur="زمین کا پانی کہاں ہے؟"/></h2><p className="mt-2 leading-7" style={{color:'var(--text-secondary)'}}><T en="These are global estimates. Categories overlap in scientific datasets, and some quantities are difficult to measure precisely." ur="یہ عالمی اندازے ہیں۔ سائنسی ڈیٹا سیٹس میں بعض زمروں میں اوورلیپ ہوتا ہے اور کچھ مقداروں کی درست پیمائش مشکل ہے۔"/></p></div></div>
   <div className="mt-6 grid gap-3">
    {waterPools.map(([en,ur,vol,pct,note])=><Link key={en} to={"/water-atlas/"+detailSlug("pool",en)} className="rounded-2xl border p-4 md:p-5 block hover:-translate-y-0.5 transition-transform" style={{borderColor:'var(--border)',background:'var(--surface-muted)'}}><div className="grid md:grid-cols-[1.3fr_1fr_.7fr_1.5fr] gap-3 items-center"><div className="font-black" style={{color:'var(--text-primary)'}}><T en={en} ur={ur}/></div><div className="font-bold" style={{color:'var(--accent)'}}>{vol}</div><div className="font-bold" style={{color:'var(--text-primary)'}}>{pct}</div><div className="text-sm" style={{color:'var(--text-secondary)'}}>{note}</div></div><span className="mt-3 inline-block text-xs font-black text-cyan-500">Open full explanation →</span></Link>)}
   </div>
  </section>

  <EarthProcessAnimation type="water"/>

  <section className="rounded-3xl border p-6 md:p-8" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
   <h2 className="text-2xl md:text-3xl font-black" style={{color:'var(--text-primary)'}}><T en="What does “Seven Seas” mean?" ur="“سات سمندر” سے کیا مراد ہے؟"/></h2>
   <p className="mt-3 leading-7" style={{color:'var(--text-secondary)'}}><T en="There is no single modern scientific list of exactly seven seas. NOAA explains that the phrase has had different meanings across history. Modern geography more commonly divides the one global ocean into five named regions." ur="جدید سائنس میں بالکل سات سمندروں کی ایک مقررہ فہرست نہیں۔ NOAA کے مطابق Seven Seas کی اصطلاح تاریخ میں مختلف معنوں میں استعمال ہوئی ہے۔ جدید جغرافیہ میں ایک عالمی سمندر کو عموماً پانچ بڑے نامزد خطوں میں تقسیم کیا جاتا ہے۔"/></p>
   <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{['Arctic','North Atlantic','South Atlantic','North Pacific','South Pacific','Indian','Southern'].map((x,i)=><div key={x} className="rounded-2xl border p-4" style={{borderColor:'var(--border)',background:'var(--surface-muted)'}}><span className="text-cyan-500 font-black">{i+1}</span><span className="ml-3 font-bold" style={{color:'var(--text-primary)'}}>{x}</span></div>)}</div>
   <a href="https://oceanservice.noaa.gov/facts/sevenseas.html" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-cyan-500 font-bold">NOAA: Seven Seas <ExternalLink size={16}/></a>
  </section>

  <section className="grid lg:grid-cols-2 gap-5">
   <div className="rounded-3xl border p-6" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
    <h2 className="text-2xl font-black" style={{color:'var(--text-primary)'}}><T en="How does water move?" ur="پانی کیسے حرکت کرتا ہے؟"/></h2>
    <div className="mt-5 space-y-3">
     {[
      ['Ocean heating','سمندر کا گرم ہونا','Sunlight adds energy to surface water.'],
      ['Evaporation','تبخیر','Liquid water becomes water vapor and rises.'],
      ['Condensation','تکثیف','Cooling vapor forms cloud droplets or ice crystals.'],
      ['Precipitation','بارش / برف','Water returns to the surface as rain or snow.'],
      ['Infiltration','زمین میں جذب ہونا','Some water enters soil and can recharge groundwater.'],
      ['Runoff','سطحی بہاؤ','Gravity moves water into streams, rivers, lakes and reservoirs.'],
      ['Discharge','اخراج','Rivers and groundwater ultimately return water to larger water bodies.']
     ].map(([en,ur,d],i)=><div key={String(en)} className="flex gap-3 rounded-2xl border p-4" style={{borderColor:'var(--border)'}}><div className="grid place-items-center w-9 h-9 rounded-full bg-cyan-500 text-white font-black shrink-0">{i+1}</div><div><h3 className="font-black" style={{color:'var(--text-primary)'}}><T en={en} ur={ur}/></h3><p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>{d}</p></div></div>)}
    </div>
   </div>
   <div className="rounded-3xl border p-6" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
    <h2 className="text-2xl font-black" style={{color:'var(--text-primary)'}}><T en="Water is not 'made' by the cycle" ur="آبی چکر پانی کو 'بناتا' نہیں"/></h2>
    <p className="mt-4 leading-7" style={{color:'var(--text-secondary)'}}><T en="The water cycle moves and changes the state and location of existing water. At the molecular level, water is H₂O: two hydrogen atoms bonded to one oxygen atom. Earth's surface cycle mostly changes liquid water, ice and vapor rather than creating new water from nothing." ur="آبی چکر موجود پانی کو جگہ اور حالت کے لحاظ سے منتقل کرتا ہے۔ سالماتی سطح پر پانی H₂O ہے: دو ہائیڈروجن ایٹم اور ایک آکسیجن ایٹم۔ زمین کا سطحی چکر عموماً پانی کو مائع، برف اور بخارات کی حالتوں میں تبدیل کرتا ہے، نئے سرے سے پانی پیدا نہیں کرتا۔"/></p>
    <div className="mt-5 grid grid-cols-3 gap-3 text-center"><div className="rounded-2xl p-4 bg-sky-500/10"><Droplets className="mx-auto text-sky-500"/><b className="block mt-2" style={{color:'var(--text-primary)'}}>H₂O</b><small>Liquid</small></div><div className="rounded-2xl p-4 bg-cyan-500/10"><ArrowUp className="mx-auto text-cyan-500"/><b className="block mt-2" style={{color:'var(--text-primary)'}}>H₂O</b><small>Vapor</small></div><div className="rounded-2xl p-4 bg-blue-500/10"><Snowflake className="mx-auto text-blue-500"/><b className="block mt-2" style={{color:'var(--text-primary)'}}>H₂O</b><small>Ice</small></div></div>
   </div>
  </section>

  <section className="rounded-3xl border p-6 md:p-8" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
   <h2 className="text-2xl md:text-3xl font-black" style={{color:'var(--text-primary)'}}><T en="One global ocean, five named regions" ur="ایک عالمی سمندر، پانچ بڑے نامزد خطے"/></h2>
   <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-5 gap-3">{oceans.map(o=><Link key={o.name} to={"/water-atlas/"+detailSlug("ocean",o.name)} className="rounded-2xl border p-4 block hover:-translate-y-1 transition-transform" style={{borderColor:'var(--border)',background:'var(--surface-muted)'}}><Waves className="text-cyan-500"/><h3 className="mt-3 font-black" style={{color:'var(--text-primary)'}}>{o.name}</h3><div className="font-urdu text-sm mt-1" dir="rtl" style={{color:'var(--text-secondary)'}}>{o.ur}</div><div className="mt-3 text-sm font-bold" style={{color:'var(--accent)'}}>{o.area}</div><p className="mt-2 text-sm" style={{color:'var(--text-secondary)'}}>{o.depth}</p><p className="mt-2 text-sm leading-6" style={{color:'var(--text-secondary)'}}>{o.note}</p><span className="mt-4 inline-block text-xs font-black text-cyan-500">Open full explanation →</span></Link>)}</div>
   <p className="mt-4 text-xs" style={{color:'var(--text-secondary)'}}>Ocean-area figures vary by definition and dataset; the page uses rounded educational values.</p>
  </section>

  <section className="grid lg:grid-cols-2 gap-5">
   <div className="rounded-3xl border p-6" style={{background:'var(--surface)',borderColor:'var(--border)'}}><h2 className="text-2xl font-black" style={{color:'var(--text-primary)'}}><T en="Major river systems" ur="اہم دریائی نظام"/></h2><div className="mt-5 space-y-3">{rivers.map(r=><Link key={r[0]} to={"/water-atlas/"+detailSlug("river",r[0])} className="rounded-2xl border p-4 block hover:-translate-y-0.5 transition-transform" style={{borderColor:'var(--border)',background:'var(--surface-muted)'}}><div className="flex justify-between gap-3"><b style={{color:'var(--text-primary)'}}>{r[0]}</b><span className="text-xs font-bold text-cyan-500">{r[2]}</span></div><div className="font-urdu text-sm" dir="rtl" style={{color:'var(--text-secondary)'}}>{r[1]}</div><div className="text-xs mt-1" style={{color:'var(--text-secondary)'}}>{r[3]} · {r[4]}</div><span className="mt-3 inline-block text-xs font-black text-cyan-500">Open full explanation →</span></Link>)}</div><p className="mt-4 text-xs" style={{color:'var(--text-secondary)'}}>River length rankings are definition-sensitive because a river system may have multiple headwaters.</p></div>
   <div className="rounded-3xl border p-6" style={{background:'var(--surface)',borderColor:'var(--border)'}}><h2 className="text-2xl font-black" style={{color:'var(--text-primary)'}}><T en="Important lakes" ur="اہم جھیلیں"/></h2><div className="mt-5 space-y-3">{lakes.map(l=><Link key={l[0]} to={"/water-atlas/"+detailSlug("lake",l[0])} className="rounded-2xl border p-4 block hover:-translate-y-0.5 transition-transform" style={{borderColor:'var(--border)',background:'var(--surface-muted)'}}><div className="font-black" style={{color:'var(--text-primary)'}}>{l[0]}</div><div className="font-urdu text-sm" dir="rtl" style={{color:'var(--text-secondary)'}}>{l[1]}</div><p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}>{l[2]}</p><span className="mt-3 inline-block text-xs font-black text-cyan-500">Open full explanation →</span></Link>)}</div><p className="mt-4 text-xs" style={{color:'var(--text-secondary)'}}>Lake counts are not a single fixed global number because databases use different size and permanence thresholds.</p></div>
  </section>

  <section className="rounded-3xl border p-6 md:p-8" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
   <div className="flex items-center gap-3"><Factory className="text-amber-500"/><div><h2 className="text-2xl md:text-3xl font-black" style={{color:'var(--text-primary)'}}><T en="Dams: from stored water to electricity" ur="ڈیم: ذخیرہ شدہ پانی سے بجلی تک"/></h2><p className="text-sm mt-1" style={{color:'var(--text-secondary)'}}><T en="ICOLD's continuously updated register contains more than 55,000 dams." ur="ICOLD کے مسلسل اپ ڈیٹ ہونے والے رجسٹر میں 55,000 سے زیادہ ڈیم شامل ہیں۔"/></p></div></div>
   <div className="mt-6 grid md:grid-cols-5 gap-2">{[['Reservoir','ذخیرہ'],['Intake','پانی کا راستہ'],['Penstock','پریشر پائپ'],['Turbine','ٹربائن'],['Generator','جنریٹر']].map((x,i)=><div key={String(x[0])} className="rounded-2xl border p-4 text-center" style={{borderColor:'var(--border)',background:'var(--surface-muted)'}}><div className="w-9 h-9 mx-auto rounded-full grid place-items-center bg-amber-500 text-white font-black">{i+1}</div><b className="block mt-3" style={{color:'var(--text-primary)'}}>{x[0]}</b><span className="font-urdu text-xs" dir="rtl" style={{color:'var(--text-secondary)'}}>{x[1]}</span></div>)}</div>
   <p className="mt-5 leading-7" style={{color:'var(--text-secondary)'}}><T en="A reservoir stores water. When water is released through an intake and penstock, gravity and pressure make it move through a turbine. The turbine turns a generator, which converts mechanical energy into electrical energy. Water then leaves through the tailrace and continues downstream." ur="ریزروائر پانی ذخیرہ کرتا ہے۔ جب پانی intake اور penstock سے چھوڑا جاتا ہے تو کششِ ثقل اور دباؤ اسے ٹربائن کی طرف لے جاتے ہیں۔ ٹربائن جنریٹر کو گھماتی ہے، جو میکانی توانائی کو برقی توانائی میں بدلتا ہے۔ پھر پانی tailrace سے نکل کر نیچے کی طرف بہتا رہتا ہے۔"/></p>
   <a className="inline-flex items-center gap-2 mt-4 text-cyan-500 font-bold" href="/dams"><Factory size={17}/> <T en="Open the full Dams Lab" ur="مکمل ڈیم لیب کھولیں"/></a>
  </section>

  <section className="rounded-3xl border p-6" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
   <div className="flex items-center gap-2"><PlayCircle className="text-red-500"/><h2 className="text-2xl font-black" style={{color:'var(--text-primary)'}}><T en="Real NASA water-cycle videos" ur="NASA کی اصل آبی چکر ویڈیوز"/></h2></div>
   <div className="grid lg:grid-cols-2 gap-5 mt-5">
    <article><h3 className="font-black mb-2" style={{color:'var(--text-primary)'}}>The Water Cycle</h3><video controls preload="metadata" className="w-full rounded-2xl bg-black" poster="https://svs.gsfc.nasa.gov/vis/a010000/a010500/a010501/water_cycle_appletv_1280x720_web.png" src="https://svs.gsfc.nasa.gov/vis/a010000/a010500/a010501/water_cycle_appletv_1280x720.webmhd.webm"/></article>
    <article><h3 className="font-black mb-2" style={{color:'var(--text-primary)'}}>Following the Water</h3><video controls preload="metadata" className="w-full rounded-2xl bg-black" poster="https://svs.gsfc.nasa.gov/vis/a010000/a010800/a010885/wc_globe_4.jpg" src="https://svs.gsfc.nasa.gov/vis/a010000/a010800/a010885/10885_LandGlobe-540-MASTER_high.webmhd.webm"/></article>
   </div>
  </section>

  <section className="rounded-3xl border p-6 md:p-8" style={{background:'var(--surface-muted)',borderColor:'var(--border)'}}><h2 className="text-2xl font-black" style={{color:'var(--text-primary)'}}><T en="How this knowledge hub will grow" ur="یہ نالج ہب کیسے مزید وسیع ہوگا"/></h2><div className="mt-5 grid md:grid-cols-3 gap-3">{[['Planet encyclopedias','ہر سیارے کی مکمل انسائیکلوپیڈیا','Atmosphere, geology, weather, moons, rings, missions, hazards, exploration.'],['Earth atlas','زمین کا مکمل اٹلس','Continents, oceans, seas, rivers, lakes, glaciers, groundwater, weather, climate and resources.'],['Engineering labs','انجینئرنگ لیبز','Dams, hydropower, solar energy, water treatment, electricity generation and real process simulations.']].map(x=><div key={String(x[0])} className="rounded-2xl border p-5" style={{background:'var(--surface)',borderColor:'var(--border)'}}><h3 className="font-black" style={{color:'var(--text-primary)'}}>{x[0]}</h3><div className="font-urdu text-sm mt-1" dir="rtl" style={{color:'var(--text-secondary)'}}>{x[1]}</div><p className="text-sm mt-3 leading-6" style={{color:'var(--text-secondary)'}}>{x[2]}</p></div>)}</div></section>
 </div>
}