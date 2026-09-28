import React,{useEffect,useState}from'react';
import{Sun,Zap,BatteryCharging,Home,Play,Pause,RotateCcw,Grid3X3,Lightbulb,Wind,Tv}from'lucide-react';
import{useApp}from'../contexts/AppContext';

const stages=[
{key:'sun',en:'Sunlight',ur:'سورج کی روشنی',titleEn:'Sunlight reaches the solar cells',titleUr:'سورج کی روشنی سولر سیلز تک پہنچتی ہے',detailEn:'The Sun stays fixed while photons are shown moving toward the photovoltaic cells on the roof.',detailUr:'سورج اپنی جگہ قائم رہتا ہے جبکہ فوٹونز چھت پر موجود فوٹو وولٹائک سیلز کی طرف حرکت کرتے دکھائی دیتے ہیں۔'},
{key:'panel',en:'PV Cells',ur:'PV سیلز',titleEn:'PV cells transfer light energy to electrons',titleUr:'PV سیلز روشنی کی توانائی الیکٹرانوں کو دیتے ہیں',detailEn:'The photovoltaic semiconductor absorbs sunlight and produces charge movement.',detailUr:'فوٹووولٹائک سیمی کنڈکٹر سورج کی روشنی جذب کر کے چارج کی حرکت پیدا کرتا ہے۔'},
{key:'dc',en:'DC Current',ur:'DC کرنٹ',titleEn:'DC electricity leaves the panel',titleUr:'DC بجلی پینل سے نکلتی ہے',detailEn:'PV modules produce direct-current electricity and the animated packets travel toward the inverter.',detailUr:'PV ماڈیول DC بجلی پیدا کرتے ہیں اور متحرک ذرات انورٹر کی طرف جاتے ہیں۔'},
{key:'inverter',en:'Inverter',ur:'انورٹر',titleEn:'The inverter converts DC to AC',titleUr:'انورٹر DC کو AC میں تبدیل کرتا ہے',detailEn:'The inverter changes the PV system DC output into AC electricity for typical household loads and grid connection.',detailUr:'انورٹر PV نظام کی DC بجلی کو AC میں تبدیل کرتا ہے جو عام گھریلو لوڈز اور گرڈ کنکشن کے لیے استعمال ہوتی ہے۔'},
{key:'home',en:'Home Loads',ur:'گھر کے آلات',titleEn:'AC power runs household appliances',titleUr:'AC بجلی گھریلو آلات چلاتی ہے',detailEn:'The demo shows a light, fan/air-conditioner and TV receiving AC power.',detailUr:'مظاہرے میں بلب، پنکھا/اے سی اور ٹی وی کو AC بجلی سے چلتے دکھایا گیا ہے۔'},
{key:'storage',en:'Grid + Battery',ur:'گرڈ + بیٹری',titleEn:'Power can connect to the grid or storage',titleUr:'بجلی گرڈ یا بیٹری سے منسلک ہو سکتی ہے',detailEn:'Depending on system design, suitable power can go to the grid and a battery can store energy for later use.',detailUr:'نظام کے ڈیزائن کے مطابق مناسب بجلی گرڈ کو دی جا سکتی ہے اور بیٹری میں بعد کے استعمال کے لیے محفوظ کی جا سکتی ہے۔'}
];

function B({en,ur,language}:{en:string;ur:string;language:string}){if(language==='ur')return <span className="font-urdu" dir="rtl">{ur}</span>;if(language==='both')return <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;return <span>{en}</span>}

export function SolarEnergyPage(){
const{language}=useApp();const[active,setActive]=useState(0);const[playing,setPlaying]=useState(true);
useEffect(()=>{if(!playing)return;const id=window.setInterval(()=>setActive(v=>(v+1)%stages.length),3000);return()=>window.clearInterval(id)},[playing]);
const select=(i:number)=>{setActive(i);setPlaying(false)};const current=stages[active];
return <div className="space-y-8 pb-12">
<style>{`
@keyframes ray{0%{stroke-dashoffset:28;opacity:.3}50%{opacity:1}100%{stroke-dashoffset:0;opacity:.3}}
@keyframes flow{0%{transform:translateX(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateX(285px);opacity:0}}
@keyframes inverter{0%,100%{filter:drop-shadow(0 0 0 transparent)}50%{filter:drop-shadow(0 0 14px rgba(167,139,250,.8))}}
@keyframes appliance{0%,100%{opacity:.45}50%{opacity:1;filter:drop-shadow(0 0 12px rgba(250,204,21,.9))}}
@keyframes wave{to{stroke-dashoffset:-36}}
.solar-ray{animation:ray 1.2s linear infinite}.solar-inverter{animation:inverter 1.7s ease-in-out infinite}.solar-appliance{animation:appliance 1.5s ease-in-out infinite}.solar-wave{stroke-dasharray:10 8;animation:wave .8s linear infinite}
@media(prefers-reduced-motion:reduce){.solar-ray,.solar-inverter,.solar-appliance,.solar-wave{animation:none!important}}
`}</style>

<section className="rounded-3xl border p-7 md:p-10" style={{background:'linear-gradient(135deg,#0b1220,#172554 55%,#3b2408)',borderColor:'var(--border)'}}>
<div className="max-w-5xl"><div className="flex items-center gap-3 text-amber-300"><Sun size={32}/><span className="text-xs font-black uppercase tracking-[.22em]">Interactive Solar Energy Lab</span></div>
<h1 className="mt-4 text-4xl font-black text-white md:text-6xl"><B en="From Sunlight to Electricity" ur="سورج کی روشنی سے بجلی تک" language={language}/></h1>
<p className="mt-4 max-w-4xl text-base leading-7 text-white/75"><B en="Sun → roof PV cells → DC → inverter → AC → home appliances, grid and battery." ur="سورج → چھت کے PV سیلز → DC → انورٹر → AC → گھر کے آلات، گرڈ اور بیٹری۔" language={language}/></p></div>
</section>

<section className="rounded-3xl border p-4 md:p-7" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
<div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-2xl font-black"><B en="Live solar-to-electricity demonstration" ur="سورج سے بجلی بننے کا لائیو مظاہرہ" language={language}/></h2><p className="mt-1 text-sm opacity-65"><B en="The Sun is fixed. Energy particles move through the real process." ur="سورج اپنی جگہ قائم ہے۔ توانائی کے ذرات پورے عمل میں حرکت کرتے ہیں۔" language={language}/></p></div>
<div className="flex gap-2"><button onClick={()=>setPlaying(v=>!v)} className="flex items-center gap-2 rounded-xl border px-4 py-2 font-bold">{playing?<Pause size={17}/>:<Play size={17}/>}<B en={playing?'Pause':'Play'} ur={playing?'روکیں':'چلائیں'} language={language}/></button><button onClick={()=>{setActive(0);setPlaying(true)}} className="rounded-xl border p-2"><RotateCcw size={17}/></button></div></div>

<div className="mt-5 overflow-hidden rounded-3xl border bg-slate-950 p-2 md:p-4">
<svg viewBox="0 0 1400 760" className="w-full h-auto" role="img" aria-label="Live solar photovoltaic energy conversion demonstration">
<defs><linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#071126"/><stop offset=".72" stopColor="#102344"/><stop offset="1" stopColor="#183b3c"/></linearGradient><linearGradient id="roof2"><stop stopColor="#64748b"/><stop offset="1" stopColor="#1e293b"/></linearGradient><linearGradient id="panel2"><stop stopColor="#0e7490"/><stop offset=".55" stopColor="#164e63"/><stop offset="1" stopColor="#082f49"/></linearGradient><filter id="glow2"><feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<rect width="1400" height="760" rx="30" fill="url(#sky2)"/><text x="70" y="65" fill="#cbd5e1" fontSize="18" fontWeight="900">LIVE PHOTOVOLTAIC ENERGY FLOW</text><text x="70" y="92" fill="#64748b" fontSize="14">Sun fixed • sunlight → PV → DC → inverter → AC → appliances</text>

<g><circle cx="190" cy="190" r="92" fill="#fbbf24" opacity=".18" filter="url(#glow2)"/><circle cx="190" cy="190" r="58" fill="#f59e0b"/><circle cx="190" cy="190" r="44" fill="#fde68a"/>{[0,45,90,135,180,225,270,315].map(a=><line key={a} x1={190+78*Math.cos(a*Math.PI/180)} y1={190+78*Math.sin(a*Math.PI/180)} x2={190+108*Math.cos(a*Math.PI/180)} y2={190+108*Math.sin(a*Math.PI/180)} stroke="#fcd34d" strokeWidth="8" strokeLinecap="round"/>)}<text x="190" y="305" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">SUN / سورج</text><text x="190" y="331" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="800">LIGHT ENERGY / روشنی</text></g>

<g fill="none" stroke="#fde68a" strokeWidth="7" strokeLinecap="round" strokeDasharray="14 14">{[0,1,2,3,4].map(i=><path key={i} className="solar-ray" d={['M250 170 L520 345','M250 185 L520 373','M250 200 L520 401','M250 215 L520 429','M250 230 L520 457'][i]}/>)}</g>
{playing&&<g fill="#fff7ae">{[0,1,2,3,4].map(i=><circle key={i} r="7" cx="255" cy={170+i*15} className="solar-packet"><animateMotion dur="1.5s" repeatCount="indefinite" begin={i*.25} path={['M0 0 L265 175','M0 0 L265 188','M0 0 L265 201','M0 0 L265 214','M0 0 L265 227'][i]}/></circle>)}</g>}

<g><polygon points="410,395 735,245 1075,395 1028,430 735,310 442,430" fill="url(#roof2)" stroke="#94a3b8" strokeWidth="5"/><polygon points="430,395 735,275 1040,395 1040,610 430,610" fill="#1e293b" stroke="#64748b" strokeWidth="4"/><text x="735" y="575" textAnchor="middle" fill="#e2e8f0" fontSize="24" fontWeight="900">HOME / گھر</text><text x="735" y="602" textAnchor="middle" fill="#64748b" fontSize="14">ROOF-MOUNTED SOLAR SYSTEM</text></g>

<g><polygon points="505,380 705,292 885,368 682,450" fill="url(#panel2)" stroke="#67e8f9" strokeWidth="5"/>{[0,1,2,3,4].map(i=><line key={i} x1={525+i*35} y1={372-i*14} x2={690+i*38} y2={440-i*13} stroke="#67e8f9" strokeOpacity=".55" strokeWidth="2"/>)}{[0,1,2,3].map(i=><line key={i} x1="530" y1={350+i*24} x2="850" y2={344+i*24} stroke="#67e8f9" strokeOpacity=".5" strokeWidth="2"/>)}<text x="700" y="472" textAnchor="middle" fill="#67e8f9" fontSize="20" fontWeight="900">PV CELLS / سولر سیلز</text><text x="700" y="495" textAnchor="middle" fill="#94a3b8" fontSize="13">SUNLIGHT → ELECTRON FLOW</text></g>

<path d="M680 450 C790 500 865 510 940 480" fill="none" stroke="#22d3ee" strokeWidth="12" strokeLinecap="round"/><text x="805" y="535" textAnchor="middle" fill="#67e8f9" fontSize="19" fontWeight="900">DC CURRENT →</text>
{playing&&[0,1,2,3,4].map(i=><circle key={i} r="8" fill="#67e8f9"><animateMotion dur="1.8s" repeatCount="indefinite" begin={i*.3} path="M680 450 C790 500 865 510 940 480"/></circle>)}

<g className="solar-inverter"><rect x="920" y="430" width="190" height="170" rx="24" fill="#312e81" stroke="#c4b5fd" strokeWidth="5"/><rect x="947" y="465" width="136" height="65" rx="12" fill="#111827" stroke="#8b5cf6" strokeWidth="2"/><path d="M960 500 Q980 475 1000 500 T1040 500 T1080 500" fill="none" stroke="#c4b5fd" strokeWidth="5" className="solar-wave"/><text x="1015" y="555" textAnchor="middle" fill="#f5f3ff" fontSize="21" fontWeight="900">INVERTER</text><text x="1015" y="578" textAnchor="middle" fill="#c4b5fd" fontSize="15" fontWeight="800">DC → AC</text></g>

<path d="M1110 515 L1215 515 L1260 430" fill="none" stroke="#a78bfa" strokeWidth="12" strokeLinecap="round"/><text x="1170" y="555" textAnchor="middle" fill="#c4b5fd" fontSize="19" fontWeight="900">AC POWER →</text>
{playing&&[0,1,2,3].map(i=><circle key={i} r="8" fill="#c4b5fd"><animateMotion dur="1.5s" repeatCount="indefinite" begin={i*.25} path="M1110 515 L1215 515 L1260 430"/></circle>)}

<g><rect x="1120" y="155" width="220" height="250" rx="24" fill="#0f172a" stroke="#475569" strokeWidth="3"/><text x="1230" y="190" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">POWERED LOADS</text>
<g className="solar-appliance"><circle cx="1170" cy="250" r="30" fill="#facc15" opacity=".25"/><circle cx="1170" cy="250" r="16" fill="#fde68a" filter="url(#glow2)"/><path d="M1157 275h26M1161 284h18" stroke="#fff" strokeWidth="4"/><text x="1170" y="315" textAnchor="middle" fill="#e2e8f0" fontSize="13">LIGHT</text></g>
<g className="solar-appliance" style={{animationDelay:'.35s'}}><circle cx="1230" cy="250" r="27" fill="#60a5fa" opacity=".2"/><path d="M1230 223v54M1203 250h54M1211 231l38 38M1249 231l-38 38" stroke="#93c5fd" strokeWidth="4"/><text x="1230" y="315" textAnchor="middle" fill="#e2e8f0" fontSize="13">FAN / AC</text></g>
<g className="solar-appliance" style={{animationDelay:'.7s'}}><rect x="1270" y="225" width="45" height="32" rx="4" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="3"/><circle cx="1293" cy="241" r="6" fill="#fff"/><text x="1293" y="315" textAnchor="middle" fill="#e2e8f0" fontSize="13">TV</text></g><text x="1230" y="365" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="900">AC ELECTRICITY ON</text></g>

<path d="M1015 600 L1015 675 L1160 675" fill="none" stroke="#38bdf8" strokeWidth="9"/><path d="M1015 600 L1015 675 L875 675" fill="none" stroke="#34d399" strokeWidth="9"/>
{playing&&<><circle r="7" fill="#38bdf8"><animateMotion dur="1.6s" repeatCount="indefinite" path="M1015 600 L1015 675 L1160 675"/></circle><circle r="7" fill="#34d399"><animateMotion dur="1.6s" repeatCount="indefinite" begin=".5s" path="M1015 600 L1015 675 L875 675"/></circle></>}
<g><rect x="1110" y="635" width="150" height="75" rx="18" fill="#172554" stroke="#60a5fa" strokeWidth="3"/><Grid3X3 x="1165" y="647" size="28" color="#93c5fd"/><text x="1185" y="700" textAnchor="middle" fill="#dbeafe" fontSize="14" fontWeight="900">GRID</text></g>
<g><rect x="800" y="635" width="150" height="75" rx="18" fill="#064e3b" stroke="#6ee7b7" strokeWidth="3"/><BatteryCharging x="835" y="647" size="28" color="#6ee7b7"/><text x="880" y="700" textAnchor="middle" fill="#d1fae5" fontSize="14" fontWeight="900">BATTERY</text></g>
<text x="320" y="350" fill="#cbd5e1" fontSize="13" fontWeight="900">1 • SUNLIGHT</text><text x="525" y="525" fill="#cbd5e1" fontSize="13" fontWeight="900">2 • PV → DC</text><text x="920" y="625" fill="#cbd5e1" fontSize="13" fontWeight="900">3 • CONVERSION</text><text x="1150" y="135" fill="#cbd5e1" fontSize="13" fontWeight="900">4 • AC LOADS</text>
</svg></div>

<div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">{stages.map((s,i)=><button type="button" key={s.key} onClick={()=>select(i)} className="rounded-xl border p-3 text-left" style={{borderColor:i===active?'var(--accent)':'var(--border)',background:i===active?'color-mix(in srgb,var(--accent) 10%,var(--surface))':'var(--surface-muted)'}}><span className="text-[10px] font-black opacity-50">0{i+1}</span><span className="mt-1 block text-sm font-bold"><B en={s.en} ur={s.ur} language={language}/></span></button>)}</div>
</section>

<section className="rounded-3xl border p-6 md:p-8" style={{background:'var(--surface-muted)',borderColor:'var(--border)'}}><div className="flex items-start gap-4"><div className="rounded-2xl p-3 bg-slate-950 text-amber-300"><Zap/></div><div><div className="text-xs font-black uppercase tracking-wider opacity-50">Current stage</div><h2 className="mt-1 text-2xl font-black"><B en={current.titleEn} ur={current.titleUr} language={language}/></h2><p className="mt-3 max-w-5xl text-sm leading-7 opacity-75"><B en={current.detailEn} ur={current.detailUr} language={language}/></p></div></div></section>

<section className="grid gap-4 md:grid-cols-3">{[
[<Sun className="text-amber-300"/>, 'Sunlight / photons','سورج کی روشنی / فوٹونز','Light carries energy to the PV semiconductor.'],
[<Zap className="text-cyan-300"/>, 'PV → DC','PV → DC','The photovoltaic effect creates electrical current in the module.'],
[<Zap className="text-violet-300"/>, 'Inverter → AC','انورٹر → AC','The inverter converts DC into AC.'],
[<Lightbulb className="text-yellow-300"/>, 'Lights','لائٹس','Household lighting receives AC power.'],
[<Wind className="text-blue-300"/>, 'Fan / AC','پنکھا / اے سی','Motors and air-conditioning equipment can use AC power.'],
[<Tv className="text-sky-300"/>, 'TV / appliances','ٹی وی / آلات','Other appliances can receive the converted power.']
].map((x,i)=><div key={i} className="rounded-2xl border p-5" style={{background:'var(--surface)',borderColor:'var(--border)'}}><div className="flex items-center gap-3">{x[0]}<div className="font-black"><B en={x[1] as string} ur={x[2] as string} language={language}/></div></div><p className="mt-3 text-sm leading-6 opacity-65">{x[3]}</p></div>)}</section>

<div className="rounded-2xl border p-5 text-sm leading-7 opacity-80" style={{background:'var(--surface-muted)',borderColor:'var(--border)'}}><B en="Science basis: DOE explains that PV cells absorb sunlight and transfer energy to electrons; PV modules produce DC electricity; and an inverter converts DC to AC for typical household and grid use." ur="سائنسی بنیاد: DOE کے مطابق PV سیلز سورج کی روشنی جذب کر کے الیکٹرانوں کو توانائی دیتے ہیں؛ PV ماڈیول DC بجلی پیدا کرتے ہیں؛ اور انورٹر DC کو AC میں تبدیل کرتا ہے۔" language={language}/></div>
</div>
}