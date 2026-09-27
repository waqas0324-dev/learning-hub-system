import React, { useEffect, useState } from 'react';
import { Sun, Zap, BatteryCharging, Home, ArrowRight, CheckCircle2, CircuitBoard, Activity, Grid3X3 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

type Step = { en: string; ur: string; titleEn: string; titleUr: string; detailEn: string; detailUr: string };

const steps: Step[] = [
  { en: '1. Sunlight', ur: '۱۔ سورج کی روشنی', titleEn: 'Photons reach the solar cells', titleUr: 'فوٹون سولر سیلز تک پہنچتے ہیں', detailEn: 'Sunlight carries energy in photons. When photons are absorbed by semiconductor material in a PV cell, they transfer energy to electrons.', detailUr: 'سورج کی روشنی فوٹونز کی شکل میں توانائی لاتی ہے۔ PV سیل کے سیمی کنڈکٹر میں جذب ہونے پر فوٹون الیکٹرانوں کو توانائی منتقل کرتے ہیں۔' },
  { en: '2. PV cell', ur: '۲۔ PV سیل', titleEn: 'Electrons begin to flow', titleUr: 'الیکٹران حرکت کرنا شروع کرتے ہیں', detailEn: 'The photovoltaic effect creates an electrical current. Many cells are connected together to form a module or solar panel.', detailUr: 'فوٹووولٹائک اثر برقی رو پیدا کرتا ہے۔ بہت سے سیلز کو جوڑ کر ایک ماڈیول یا سولر پینل بنایا جاتا ہے۔' },
  { en: '3. DC power', ur: '۳۔ DC بجلی', titleEn: 'Panels deliver direct current', titleUr: 'پینلز ڈائریکٹ کرنٹ دیتے ہیں', detailEn: 'The panel output is direct current (DC). Conductors carry that DC power toward the inverter or charge controller.', detailUr: 'پینل سے حاصل ہونے والی بجلی ڈائریکٹ کرنٹ (DC) ہوتی ہے۔ تاریں اس DC بجلی کو انورٹر یا چارج کنٹرولر تک پہنچاتی ہیں۔' },
  { en: '4. Inverter', ur: '۴۔ انورٹر', titleEn: 'DC becomes AC', titleUr: 'DC کو AC میں تبدیل کیا جاتا ہے', detailEn: 'The inverter converts DC electricity into alternating current (AC), the form used by most household appliances and the electrical grid.', detailUr: 'انورٹر DC بجلی کو الٹرنیٹنگ کرنٹ (AC) میں تبدیل کرتا ہے، جسے زیادہ تر گھریلو آلات اور برقی گرڈ استعمال کرتے ہیں۔' },
  { en: '5. Load / grid', ur: '۵۔ استعمال / گرڈ', titleEn: 'Electricity powers loads or enters the grid', titleUr: 'بجلی آلات چلاتی یا گرڈ میں جاتی ہے', detailEn: 'AC electricity can power lights, fans and other loads. A grid-connected system can also send suitable excess power to the grid.', detailUr: 'AC بجلی لائٹس، پنکھوں اور دیگر آلات کو چلا سکتی ہے۔ گرڈ سے منسلک نظام مناسب اضافی بجلی گرڈ کو بھی دے سکتا ہے۔' },
  { en: '6. Battery', ur: '۶۔ بیٹری', titleEn: 'Energy can be stored', titleUr: 'توانائی محفوظ بھی کی جا سکتی ہے', detailEn: 'A battery system stores electrical energy for later use, such as at night or during an outage, depending on the system design.', detailUr: 'بیٹری نظام بجلی کو بعد میں استعمال کرنے کے لیے محفوظ کر سکتا ہے، مثلاً رات کے وقت یا بجلی بند ہونے کی صورت میں، نظام کے ڈیزائن کے مطابق۔' }
];

export function SolarEnergyPage() {
  const { language } = useApp();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const text = (en: string, ur: string) => language === 'en' ? <>{en}</> : language === 'ur' ? <span className="font-urdu" dir="rtl">{ur}</span> : <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
  useEffect(() => { if (!playing) return; const id = window.setInterval(() => setActive((v) => (v + 1) % steps.length), 3200); return () => window.clearInterval(id); }, [playing]);

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-3xl p-8 md:p-12 border overflow-hidden relative" style={{background:'linear-gradient(135deg,#422006,#a16207,#0f172a)',borderColor:'var(--border)'}}>
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-amber-300/20 blur-3xl"/><Sun size={48} className="text-amber-300 relative"/>
        <h1 className="text-4xl md:text-6xl font-black text-white mt-4 relative">{text('Solar Energy — From Sunlight to Electricity','شمسی توانائی — سورج کی روشنی سے بجلی تک')}</h1>
        <p className="mt-4 max-w-4xl text-white/80 leading-7 relative">{text('Follow the real photovoltaic energy path: photons → PV cells → DC electricity → inverter → AC loads/grid, with optional battery storage.','حقیقی فوٹو وولٹائک عمل سمجھیں: فوٹونز → PV سیلز → DC بجلی → انورٹر → AC آلات/گرڈ، اور ضرورت کے مطابق بیٹری اسٹوریج۔')}</p>
      </section>

      <section className="rounded-3xl border p-5 md:p-7" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
        <div className="flex items-center justify-between gap-3 mb-5"><div><h2 className="text-2xl font-black">{text('Live Solar-to-Electricity Demonstration','سورج سے بجلی بننے کا لائیو مظاہرہ')}</h2><p className="text-sm opacity-70 mt-1">{text('Click a stage or let the demonstration play automatically.','کسی مرحلے پر کلک کریں یا مظاہرہ خودکار طور پر چلنے دیں۔')}</p></div><button onClick={()=>setPlaying(!playing)} className="px-4 py-2 rounded-xl border font-bold" style={{borderColor:'var(--border)'}}>{playing ? text('Pause','روکیں') : text('Play','چلائیں')}</button></div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">{steps.map((s,i)=><button key={s.en} onClick={()=>{setActive(i);setPlaying(false)}} className="rounded-xl border p-3 text-left transition-all" style={{borderColor:i===active?'var(--accent)':'var(--border)',backgroundColor:i===active?'color-mix(in srgb,var(--accent) 13%,var(--surface))':'var(--surface-muted)'}}><span className="text-xs font-bold">{text(s.en,s.ur)}</span></button>)}</div>

        <div className="mt-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-700 p-5 md:p-8 overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 min-h-[220px]">
            <div className="text-center"><Sun size={64} className="text-amber-300 mx-auto animate-pulse"/><span className="text-white/80 text-xs block mt-1">{text('Sunlight','سورج کی روشنی')}</span></div><ArrowRight className="text-amber-300 hidden sm:block"/>
            <div className="relative text-center"><div className="grid grid-cols-4 gap-1 p-3 rounded-xl border-2 border-cyan-300/50 bg-blue-950 shadow-[0_0_35px_rgba(34,211,238,.18)]">{Array.from({length:12}).map((_,i)=><span key={i} className="w-4 h-3 rounded-sm bg-cyan-300/60" />)}</div><span className="text-white/80 text-xs block mt-2">{text('PV panel','PV پینل')}</span></div><ArrowRight className="text-amber-300 hidden sm:block"/>
            <div className="relative text-center"><div className="w-24 h-20 rounded-xl border border-yellow-300/40 bg-slate-800 flex items-center justify-center"><CircuitBoard className="text-yellow-200" size={42}/><span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-yellow-400 text-slate-950 font-black">DC</span></div><span className="text-white/80 text-xs block mt-2">{text('DC electricity','DC بجلی')}</span></div><ArrowRight className="text-amber-300 hidden sm:block"/>
            <div className="relative text-center"><div className="w-24 h-20 rounded-xl border border-violet-300/40 bg-violet-950/40 flex items-center justify-center"><Zap className="text-violet-200" size={42}/><span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-violet-300 text-slate-950 font-black">AC</span></div><span className="text-white/80 text-xs block mt-2">{text('Inverter','انورٹر')}</span></div><ArrowRight className="text-amber-300 hidden sm:block"/>
            <div className="flex gap-4 text-center"><div><Home className="text-white mx-auto" size={42}/><span className="text-white/80 text-xs block">{text('Home loads','گھریلو آلات')}</span></div><div><Grid3X3 className="text-cyan-200 mx-auto" size={42}/><span className="text-white/80 text-xs block">{text('Grid','گرڈ')}</span></div><div><BatteryCharging className="text-emerald-200 mx-auto" size={42}/><span className="text-white/80 text-xs block">{text('Battery','بیٹری')}</span></div></div>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden mt-2"><div className="h-full bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300 transition-all duration-700" style={{width: String(18 + active * 15) + '%'}}/></div>
        </div>

        <div className="mt-5 rounded-2xl border p-5" style={{backgroundColor:'var(--surface-muted)',borderColor:'var(--border)'}}><div className="flex items-center gap-3"><Activity className="text-cyan-400"/><h3 className="text-xl font-bold">{text(steps[active].titleEn,steps[active].titleUr)}</h3></div><p className="mt-3 leading-7 text-sm md:text-base opacity-80">{text(steps[active].detailEn,steps[active].detailUr)}</p></div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        {[
          {Icon: Zap, en:'What actually happens inside a PV cell?', ur:'PV سیل کے اندر اصل میں کیا ہوتا ہے؟', enD:'A semiconductor absorbs sunlight and transfers energy to electrons. The resulting charge movement is extracted through electrical contacts as current.', urD:'سیمی کنڈکٹر سورج کی روشنی جذب کر کے الیکٹرانوں کو توانائی دیتا ہے۔ چارج کی یہ حرکت برقی رابطوں کے ذریعے کرنٹ کی صورت میں حاصل کی جاتی ہے۔'},
          {Icon: BatteryCharging, en:'Where does the electricity go?', ur:'بجلی کہاں جاتی ہے؟', enD:'After conversion to AC, electricity can supply local loads. Depending on the system, excess energy may go to the grid or a battery can store energy for later.', urD:'AC میں تبدیل ہونے کے بعد بجلی مقامی آلات کو چلا سکتی ہے۔ نظام کے مطابق اضافی توانائی گرڈ کو دی جا سکتی ہے یا بیٹری میں محفوظ ہو سکتی ہے۔'}
        ].map(({Icon,en,ur,enD,urD})=><div key={en} className="rounded-2xl border p-6" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}><Icon className="text-cyan-400" size={30}/><h2 className="font-bold text-xl mt-3">{text(en,ur)}</h2><p className="mt-3 text-sm leading-6 opacity-75">{text(enD,urD)}</p></div>)}
      </section>

      <div className="rounded-2xl border p-5 text-sm opacity-80" style={{backgroundColor:'var(--surface-muted)',borderColor:'var(--border)'}}>{text('Science basis: PV cells convert sunlight to electricity; solar panels produce DC and inverters convert DC to AC for typical household/grid use.','سائنسی بنیاد: PV سیلز سورج کی روشنی کو بجلی میں تبدیل کرتے ہیں؛ سولر پینلز DC پیدا کرتے ہیں اور انورٹر DC کو AC میں تبدیل کرتا ہے جو عام گھریلو اور گرڈ استعمال کے لیے موزوں ہے۔')}</div>
    </div>
  );
}
