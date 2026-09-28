import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Lightbulb, FlaskConical, BookOpen } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

type Topic = {
  title: string;
  ur: string;
  intro: string;
  introUr: string;
  sections: { heading: string; headingUr: string; body: string; bodyUr: string }[];
  facts: string[];
  next: { label: string; path: string }[];
};

const topics: Record<string, Topic> = {
  'why-is-the-sky-blue': {
    title: 'Why Is the Sky Blue?', ur: 'آسمان نیلا کیوں نظر آتا ہے؟',
    intro: 'Sunlight looks white, but it contains many wavelengths of visible light. Earth’s atmosphere scatters the shorter blue wavelengths more strongly than the longer red wavelengths, so blue light reaches our eyes from many directions across the daytime sky.',
    introUr: 'سورج کی روشنی سفید نظر آتی ہے لیکن اس میں مختلف طولِ موج کی روشنی شامل ہوتی ہے۔ زمین کا ماحول نیلی روشنی کو سرخ روشنی کے مقابلے میں زیادہ بکھیرتا ہے، اسی لیے دن کے وقت آسمان نیلا دکھائی دیتا ہے۔',
    sections: [
      { heading: '1. Sunlight enters the atmosphere', headingUr: '1۔ سورج کی روشنی ماحول میں داخل ہوتی ہے', body: 'Sunlight travels through space and reaches Earth’s atmosphere. Air molecules interact with the incoming light.', bodyUr: 'سورج کی روشنی خلا سے سفر کرکے زمین کے ماحول تک پہنچتی ہے۔ ہوا کے سالمات اس روشنی کے ساتھ تعامل کرتے ہیں۔' },
      { heading: '2. Blue light scatters strongly', headingUr: '2۔ نیلی روشنی زیادہ بکھرتی ہے', body: 'Shorter wavelengths such as blue are scattered in many directions. Red and orange wavelengths are scattered less strongly.', bodyUr: 'چھوٹی طولِ موج والی نیلی روشنی کئی سمتوں میں زیادہ بکھرتی ہے جبکہ سرخ اور نارنجی روشنی نسبتاً کم بکھرتی ہے۔' },
      { heading: '3. Sunset changes the path', headingUr: '3۔ غروبِ آفتاب پر راستہ بدل جاتا ہے', body: 'At sunset, sunlight travels through more atmosphere. Much of the blue light is scattered away, leaving more red and orange light along the direct path to our eyes.', bodyUr: 'غروبِ آفتاب کے وقت روشنی کو ماحول کی زیادہ موٹی تہہ سے گزرنا پڑتا ہے۔ نیلی روشنی زیادہ بکھر جاتی ہے اور ہماری آنکھوں تک سرخ اور نارنجی روشنی زیادہ نمایاں پہنچتی ہے۔' }
    ],
    facts: ['Blue light has a shorter wavelength than red light.', 'Atmospheric scattering is responsible for the daytime blue sky.', 'Sunsets can appear red or orange because the light travels through more atmosphere.'],
    next: [{label:'Earth Explorer',path:'/earth'},{label:'Moon, Sun & Stars',path:'/moon-sun-stars'}]
  },
  'what-is-gravity': {
    title: 'What Is Gravity?', ur: 'کششِ ثقل کیا ہے؟',
    intro: 'Gravity is the attraction between objects with mass. On Earth, gravity pulls objects toward the planet’s center and keeps the Moon in orbit. The strength of gravity changes from world to world.',
    introUr: 'کششِ ثقل کمیت رکھنے والی اشیاء کے درمیان کشش ہے۔ زمین پر یہی قوت اشیاء کو زمین کے مرکز کی طرف کھینچتی ہے اور چاند کو مدار میں رکھنے میں اہم کردار ادا کرتی ہے۔',
    sections: [
      { heading: 'Mass and gravity', headingUr: 'کمیت اور کششِ ثقل', body: 'More mass generally means stronger gravitational attraction. Distance also matters: gravitational attraction becomes weaker as objects get farther apart.', bodyUr: 'زیادہ کمیت عموماً زیادہ کشش پیدا کرتی ہے۔ فاصلہ بھی اہم ہے؛ اشیاء کے درمیان فاصلہ بڑھنے سے کشش کم ہوتی ہے۔' },
      { heading: 'Why do planets orbit?', headingUr: 'سیارے مدار میں کیوں گھومتے ہیں؟', body: 'A planet’s forward motion combines with the Sun’s gravity. Instead of flying straight away or falling directly into the Sun, the planet follows an orbit.', bodyUr: 'سیارے کی آگے کی حرکت اور سورج کی کشش مل کر مدار بناتی ہیں۔ سیارہ نہ سیدھا دور جاتا ہے اور نہ براہِ راست سورج میں گرتا ہے بلکہ مدار میں گردش کرتا ہے۔' },
      { heading: 'Gravity feels different on each planet', headingUr: 'ہر سیارے پر کشش مختلف محسوس ہوتی ہے', body: 'Your mass would stay the same on another planet, but your weight would change because the local gravitational acceleration is different.', bodyUr: 'دوسرے سیارے پر آپ کی کمیت وہی رہے گی لیکن وزن بدل جائے گا کیونکہ وہاں کششِ ثقل مختلف ہوگی۔' }
    ],
    facts: ['Earth’s gravity gives objects their familiar weight.', 'The Sun’s gravity keeps the planets bound to the Solar System.', 'Planetary gravity depends strongly on mass and radius.'],
    next: [{label:'Age & Weight Calculator',path:'/calculator'},{label:'Learning Games',path:'/games'}]
  },
  'how-do-moon-phases-work': {
    title: 'How Do Moon Phases Work?', ur: 'چاند کی مختلف شکلیں کیوں نظر آتی ہیں؟',
    intro: 'The Moon does not make its own visible light. Sunlight illuminates half of the Moon, and as the Moon orbits Earth, we see different portions of that illuminated half.',
    introUr: 'چاند اپنی روشنی خود پیدا نہیں کرتا۔ سورج چاند کے آدھے حصے کو روشن کرتا ہے اور چاند کے زمین کے گرد گردش کرنے سے ہمیں روشن حصے کی مختلف مقدار نظر آتی ہے۔',
    sections: [
      { heading: 'New Moon', headingUr: 'نیا چاند', body: 'The illuminated side faces mostly away from Earth, so the Moon is difficult to see in the daytime sky.', bodyUr: 'روشن حصہ زیادہ تر زمین سے مخالف سمت میں ہوتا ہے، اس لیے چاند آسمان میں بہت کم نظر آتا ہے۔' },
      { heading: 'First and third quarter', headingUr: 'پہلا اور آخری چوتھائی', body: 'Around quarter phases, about half of the visible lunar disk is illuminated.', bodyUr: 'چوتھائی مراحل میں ہمیں چاند کے دکھائی دینے والے حصے کا تقریباً آدھا روشن حصہ نظر آتا ہے۔' },
      { heading: 'Full Moon', headingUr: 'پورا چاند', body: 'The Moon is on the opposite side of Earth from the Sun, so the Earth-facing side is strongly illuminated.', bodyUr: 'چاند سورج کے مقابل زمین کی دوسری سمت ہوتا ہے، اس لیے زمین کی طرف والا حصہ زیادہ روشن نظر آتا ہے۔' }
    ],
    facts: ['A lunar phase cycle takes about 29.5 days.', 'Moon phases are caused by geometry, not Earth’s shadow.', 'Earth’s shadow is mainly involved during a lunar eclipse.'],
    next: [{label:'Eclipse Simulator',path:'/eclipses'},{label:'Moon, Sun & Stars',path:'/moon-sun-stars'}]
  },
  'what-is-the-water-cycle': {
    title: 'What Is the Water Cycle?', ur: 'آبی چکر کیا ہے؟',
    intro: 'Earth’s water constantly moves between the atmosphere, land, oceans and living systems. Evaporation, condensation, precipitation, runoff, infiltration and collection are key parts of this continuous cycle.',
    introUr: 'زمین کا پانی مسلسل ماحول، خشکی، سمندروں اور جاندار نظاموں کے درمیان حرکت کرتا ہے۔ تبخیر، تکثیف، بارش، بہاؤ، زمین میں جذب ہونا اور جمع ہونا اس چکر کے اہم مراحل ہیں۔',
    sections: [
      { heading: 'Evaporation', headingUr: 'تبخیر', body: 'Energy from the Sun changes liquid water into water vapor. Plants also release water vapor through transpiration.', bodyUr: 'سورج کی توانائی مائع پانی کو آبی بخارات میں بدلتی ہے۔ پودے بھی transpiration کے ذریعے پانی کے بخارات خارج کرتے ہیں۔' },
      { heading: 'Condensation', headingUr: 'تکثیف', body: 'As moist air rises and cools, water vapor can condense into tiny droplets that form clouds.', bodyUr: 'جب نم ہوا اوپر جا کر ٹھنڈی ہوتی ہے تو آبی بخارات چھوٹی بوندوں میں تبدیل ہو کر بادل بنا سکتے ہیں۔' },
      { heading: 'Precipitation and collection', headingUr: 'بارش اور جمع ہونا', body: 'Water returns as rain, snow or other precipitation and eventually flows into rivers, lakes, groundwater and oceans.', bodyUr: 'پانی بارش، برف یا دوسری صورتوں میں واپس آتا ہے اور بالآخر دریاؤں، جھیلوں، زیرِ زمین پانی اور سمندروں میں جمع ہوتا ہے۔' }
    ],
    facts: ['The water cycle is powered largely by solar energy and gravity.', 'Water can change between solid, liquid and gas.', 'The same water molecules can circulate through many parts of Earth’s system.'],
    next: [{label:'Oceans & Water Cycle',path:'/oceans'},{label:'Earth Explorer',path:'/earth'}]
  },
  'how-do-solar-panels-work': {
    title: 'How Do Solar Panels Work?', ur: 'سولر پینلز کیسے کام کرتے ہیں؟',
    intro: 'Solar photovoltaic cells convert light energy into electrical energy. A complete home system can then route DC electricity through an inverter to supply AC power to household loads, with batteries or the grid handling storage or excess energy.',
    introUr: 'سولر فوٹو وولٹائک سیلز روشنی کی توانائی کو برقی توانائی میں تبدیل کرتے ہیں۔ مکمل نظام میں DC بجلی inverter سے گزر کر AC بنتی ہے اور پھر گھر کے آلات کو دی جا سکتی ہے؛ اضافی توانائی battery یا grid کے ساتھ manage کی جا سکتی ہے۔',
    sections: [
      { heading: 'Light reaches the PV cells', headingUr: 'روشنی PV سیلز تک پہنچتی ہے', body: 'Photons from sunlight transfer energy to the semiconductor material inside photovoltaic cells.', bodyUr: 'سورج کی روشنی کے photons فوٹو وولٹائک سیل کے semiconductor material کو توانائی دیتے ہیں۔' },
      { heading: 'The cells produce DC electricity', headingUr: 'سیلز DC بجلی بناتے ہیں', body: 'The photovoltaic effect creates an electrical current. Solar panels therefore produce direct current (DC).', bodyUr: 'فوٹو وولٹائک اثر برقی رو پیدا کرتا ہے۔ اس لیے سولر پینلز direct current یعنی DC پیدا کرتے ہیں۔' },
      { heading: 'The inverter supplies AC power', headingUr: 'inverter AC بجلی فراہم کرتا ہے', body: 'An inverter converts DC electricity into alternating current (AC), which can power common household equipment.', bodyUr: 'inverter DC بجلی کو alternating current یعنی AC میں تبدیل کرتا ہے، جو عام گھریلو آلات چلا سکتی ہے۔' }
    ],
    facts: ['Photovoltaic means light-to-electricity conversion.', 'PV modules produce DC electricity.', 'Inverters are essential in systems that use AC household loads.'],
    next: [{label:'Solar Energy Lab',path:'/solar-energy'},{label:'Energy Resources',path:'/resources'}]
  },
  'what-is-a-solar-eclipse': {
    title: 'What Is a Solar Eclipse?', ur: 'سورج گرہن کیا ہے؟',
    intro: 'A solar eclipse occurs when the Moon passes between the Sun and Earth and its shadow falls on part of Earth. Total, partial and annular eclipses depend on the Moon’s apparent size and the exact alignment.',
    introUr: 'سورج گرہن اس وقت ہوتا ہے جب چاند سورج اور زمین کے درمیان آ کر اپنا سایہ زمین کے کسی حصے پر ڈالتا ہے۔ گرہن کی قسم alignment اور چاند کے ظاہری سائز پر منحصر ہوتی ہے۔',
    sections: [
      { heading: 'Alignment', headingUr: 'صف بندی', body: 'The Sun, Moon and Earth must be closely aligned. Eclipses do not happen every month because the Moon’s orbit is tilted relative to Earth’s orbital plane.', bodyUr: 'سورج، چاند اور زمین کی قریباً ایک لائن میں صف بندی ضروری ہے۔ ہر ماہ گرہن نہیں ہوتا کیونکہ چاند کا مدار زمین کے مدار کے مقابلے میں جھکا ہوا ہے۔' },
      { heading: 'Umbra and penumbra', headingUr: 'سایہ اور نیم سایہ', body: 'The Moon casts a central umbra and a wider penumbra. Observers in different parts of these regions see different eclipse appearances.', bodyUr: 'چاند مرکزی umbra اور وسیع penumbra بناتا ہے۔ ان علاقوں میں موجود لوگوں کو گرہن کی مختلف شکلیں نظر آ سکتی ہیں۔' },
      { heading: 'Never look directly at the Sun', headingUr: 'سورج کو براہِ راست نہ دیکھیں', body: 'Viewing the Sun requires proper certified solar viewing equipment. Ordinary sunglasses are not a safe substitute.', bodyUr: 'سورج کو دیکھنے کے لیے مناسب certified solar viewing equipment ضروری ہے۔ عام sunglasses محفوظ متبادل نہیں ہیں۔' }
    ],
    facts: ['A solar eclipse occurs at new moon geometry.', 'Only a limited area of Earth experiences a given eclipse directly.', 'Solar viewing requires appropriate eye protection.'],
    next: [{label:'Interactive Eclipse Simulator',path:'/eclipses'},{label:'Moon, Sun & Stars',path:'/moon-sun-stars'}]
  }
};

export function LearnTopicPage() {
  const { slug } = useParams();
  const { language, progress, markComplete } = useApp();
  const topic = slug ? topics[slug] : undefined;
  const text = (en: string, ur: string) => language === 'ur' ? <span className="font-urdu" dir="rtl">{ur}</span> : language === 'both' ? <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></> : <>{en}</>;

  if (!topic) return <div className="rounded-3xl border p-10 text-center"><h1 className="text-2xl font-bold">Topic not found</h1><Link className="text-blue-400 mt-3 inline-block" to="/search">Search the Learning Hub</Link></div>;

  return (
    <article className="space-y-7 pb-12">
      <header className="rounded-3xl border p-7 md:p-10" style={{background:'linear-gradient(135deg,rgba(37,99,235,.18),rgba(124,58,237,.12))',borderColor:'var(--border)'}}>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-blue-400"><BookOpen size={15}/> Visual Learning Topic</div>
        <h1 className="text-3xl md:text-5xl font-black mt-3">{text(topic.title, topic.ur)}</h1>
        <p className="text-base md:text-lg leading-8 mt-5 max-w-4xl" style={{color:'var(--text-secondary)'}}>{text(topic.intro, topic.introUr)}</p>
      </header>

      <section className="grid md:grid-cols-3 gap-4">
        {topic.sections.map((s, i) => (
          <div key={s.heading} className="rounded-2xl border p-5" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
            <div className="w-9 h-9 rounded-xl grid place-items-center bg-blue-500/10 text-blue-400 font-bold">{i+1}</div>
            <h2 className="font-extrabold mt-4">{text(s.heading,s.headingUr)}</h2>
            <p className="text-sm leading-7 mt-3" style={{color:'var(--text-secondary)'}}>{text(s.body,s.bodyUr)}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border p-6 md:p-8" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
        <div className="flex items-center gap-2 text-amber-400"><Lightbulb size={20}/><h2 className="font-extrabold">{text('Key ideas to remember','اہم نکات')}</h2></div>
        <div className="grid md:grid-cols-3 gap-3 mt-5">
          {topic.facts.map(f => <div key={f} className="rounded-2xl p-4 bg-amber-500/5 border border-amber-500/10 flex gap-2 text-sm leading-6"><CheckCircle2 size={17} className="text-emerald-400 shrink-0 mt-1"/>{f}</div>)}
        </div>
      </section>

      <section className="rounded-3xl border p-6 md:p-8" style={{backgroundColor:'var(--surface)',borderColor:'var(--border)'}}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-emerald-400"><CheckCircle2 size={20}/><h2 className="font-extrabold">{text('Lesson progress','سبق کی پیش رفت')}</h2></div>
          <button onClick={() => markComplete('/learn/' + slug)} className="rounded-xl px-4 py-2 text-white font-bold" style={{backgroundColor: progress.completed.includes('/learn/' + slug) ? '#059669' : 'var(--accent)'}}>{progress.completed.includes('/learn/' + slug) ? text('Completed ✓','مکمل ✓') : text('Mark lesson complete','سبق مکمل کریں')}</button>
        </div>
        <div className="flex items-center gap-2 text-purple-400 mt-7"><FlaskConical size={20}/><h2 className="font-extrabold">{text('Continue exploring','مزید دریافت کریں')}</h2></div>
        <div className="flex flex-wrap gap-3 mt-4">
          {topic.next.map(n => <Link key={n.path} to={n.path} className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold hover:border-blue-500" style={{borderColor:'var(--border)'}}>{n.label}<ArrowRight size={15}/></Link>)}
        </div>
      </section>
    </article>
  );
}
