import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { BilingualFlowchart } from '../components/BilingualFlowchart';
import { CheckCircle, XCircle, Play, Pause, RotateCcw, X, ChevronLeft, ChevronRight, Zap, Rocket, Globe, Satellite, Moon as MoonIcon, Target } from 'lucide-react';

// ============================================
// SCIENTIST PORTRAIT COMPONENT
// ============================================
function ScientistPortrait({ name, gradient, size = 80 }: { name: string; gradient: string; size?: number }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold"
      style={{
        width: size,
        height: size,
        background: gradient,
        fontSize: size * 0.35,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}
    >
      {initials}
    </div>
  );
}

// ============================================
// MISSION ANIMATION COMPONENT
// ============================================
function MissionAnimation({ title, steps, color }: { title: { en: string; ur: string }; steps: { en: string; ur: string; icon: string }[]; color: string }) {
  const { language } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return en;
    if (language === 'ur') return ur;
    return <>{en}<span className="block font-urdu text-xs mt-1" dir="rtl">{ur}</span></>;
  };

  return (
    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
      <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
        {renderText(title.en, title.ur)}
      </h3>
      
      {/* Animation Area */}
      <div className="relative h-32 mb-4 rounded-lg overflow-hidden" style={{ backgroundColor: '#0a0e27' }}>
        {/* Stars background */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-white" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3
          }} />
        ))}
        
        {/* Current step indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">{steps[currentStep].icon}</div>
            <div className="text-sm font-medium" style={{ color: '#fff' }}>
              {renderText(steps[currentStep].en, steps[currentStep].ur)}
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
          <div className="h-full transition-all duration-500" style={{ width: `${((currentStep + 1) / steps.length) * 100}%`, backgroundColor: color }} />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ backgroundColor: color, color: '#fff' }}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            {isPlaying ? (language === 'ur' ? 'روکیں' : 'Pause') : (language === 'ur' ? 'چلائیں' : 'Play')}
          </button>
          <button
            onClick={() => { setIsPlaying(false); setCurrentStep(0); }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <RotateCcw size={12} />
            {language === 'ur' ? 'دوبارہ' : 'Reset'}
          </button>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentStep(prev => (prev - 1 + steps.length) % steps.length)}
            className="p-1.5 rounded-lg border"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <ChevronLeft size={14} />
          </button>
          <span className="px-2 py-1 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            {currentStep + 1}/{steps.length}
          </span>
          <button
            onClick={() => setCurrentStep(prev => (prev + 1) % steps.length)}
            className="p-1.5 rounded-lg border"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      
      <p className="text-xs italic mt-2 text-center" style={{ color: 'var(--text-secondary)' }}>
        {language === 'en' && 'Educational animation — not to scale.'}
        {language === 'ur' && <span className="font-urdu" dir="rtl">تعلیمی حرکت — حقیقی پیمانے پر نہیں۔</span>}
        {language === 'both' && <>Educational animation — not to scale.<span className="block font-urdu" dir="rtl">تعلیمی حرکت — حقیقی پیمانے پر نہیں۔</span></>}
      </p>
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export function ScientistsMissionsPage() {
  const { language } = useApp();
  
  const [selectedScientist, setSelectedScientist] = useState<string | null>(null);
  const [selectedFlowNode, setSelectedFlowNode] = useState<string | null>(null);
  
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('sslh-scientists-quiz-best');
    return saved ? parseInt(saved) : 0;
  });

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return (
      <>
        <span>{en}</span>
        <span className="block font-urdu mt-2" dir="rtl">{ur}</span>
      </>
    );
  };

  // Scientists data
  const scientists = [
    {
      id: 'copernicus',
      name: { en: 'Nicolaus Copernicus', ur: 'نیکولس کوپرنیکس' },
      lifespan: '1473–1543',
      nationality: { en: 'Polish', ur: 'پولش' },
      field: { en: 'Astronomy', ur: 'فلکیات' },
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      contribution: {
        en: 'Proposed that the Sun, not Earth, is at the center of the Solar System. This heliocentric model changed how people understood planetary motion.',
        ur: 'تجویز پیش کی کہ نظامِ شمسی کے مرکز میں زمین نہیں بلکہ سورج ہے۔ اس سورج مرکزی ماڈل نے لوگوں کی سیاروی حرکت کو سمجھنے کی طریقہ کار کو بدل دیا۔'
      },
      bio: {
        en: 'Nicolaus Copernicus was a Renaissance-era mathematician and astronomer who formulated a model of the universe that placed the Sun rather than Earth at the center. His major work "De revolutionibus orbium coelestium" was published just before his death in 1543.',
        ur: 'نیکولس کوپرنیکس ایک نشاۃ الثانیہ کے دور کے ریاضی دان اور ماہر فلکیات تھے جنہوں نے کائنات کا ایک ماڈل بنایا جس میں زمین کی بجائے سورج کو مرکز میں رکھا۔ ان کی اہم کتاب "De revolutionibus orbium coelestium" 1543 میں ان کی وفات سے justo پہلے شائع ہوئی۔'
      }
    },
    {
      id: 'galileo',
      name: { en: 'Galileo Galilei', ur: 'گیلیلیو گیلیلی' },
      lifespan: '1564–1642',
      nationality: { en: 'Italian', ur: 'اطالوی' },
      field: { en: 'Astronomy, Physics', ur: 'فلکیات، طبیعیات' },
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      contribution: {
        en: 'Improved the telescope and observed Jupiter\'s four largest moons, phases of Venus and craters on the Moon. His observations supported the idea that not everything orbits Earth.',
        ur: 'دوربین کو بہتر بنایا اور مشتری کے چار بڑے چاند، زہرہ کی حالتیں اور چاند پر گڑھے دریافت کیے۔ اس کی مشاہدات نے اس خیال کی تائید کی کہ ہر چیز زمین کے گرد گردش نہیں کرتی۔'
      },
      bio: {
        en: 'Galileo Galilei was an Italian astronomer, physicist and engineer, sometimes described as the father of observational astronomy and modern physics. He played a major role in the scientific revolution.',
        ur: 'گیلیلیو گیلیلی ایک اطالوی ماہر فلکیات، طبیعیات دان اور انجینئر تھے، جنہیں بعض اوقات مشاہداتی فلکیات اور جدید طبیعیات کا باپ کہا جاتا ہے۔ انہوں نے سائنسی انقلاب میں اہم کردار ادا کیا۔'
      }
    },
    {
      id: 'kepler',
      name: { en: 'Johannes Kepler', ur: 'یوہانس کیپلر' },
      lifespan: '1571–1630',
      nationality: { en: 'German', ur: 'جرمن' },
      field: { en: 'Astronomy, Mathematics', ur: 'فلکیات، ریاضی' },
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      contribution: {
        en: 'Discovered three laws of planetary motion. He showed that planets move in elliptical orbits with the Sun at one focus, not in perfect circles.',
        ur: 'سیاروی حرکت کے تین قوانین دریافت کیے۔ اس نے ثابت کیا کہ سیارے مکمل گول دائروں کی بجائے بیضوی مداروں میں حرکت کرتے ہیں جن کے ایک مرکز میں سورج ہوتا ہے۔'
      },
      bio: {
        en: 'Johannes Kepler was a German astronomer, mathematician, and astrologer. He is a key figure in the 17th-century scientific revolution, best known for his laws of planetary motion.',
        ur: 'یوہانس کیپلر ایک جرمن ماہر فلکیات، ریاضی دان اور منجم تھا۔ وہ 17ویں صدی کے سائنسی انقلاب میں ایک اہم شخصیت ہے، جو اپنے سیاروی حرکت کے قوانین کے لیے سب سے زیادہ مشہور ہے۔'
      }
    },
    {
      id: 'newton',
      name: { en: 'Isaac Newton', ur: 'آئزک نیوٹن' },
      lifespan: '1643–1727',
      nationality: { en: 'English', ur: 'انگریز' },
      field: { en: 'Physics, Mathematics', ur: 'طبیعیات، ریاضی' },
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      contribution: {
        en: 'Formulated the laws of motion and universal gravitation. His work explained why planets orbit the Sun and how gravity works on Earth and in space.',
        ur: 'حرکت کے قوانین اور عالمی کششِ ثقل کا نظریہ پیش کیا۔ اس کے کام نے وضاحت کی کہ سیارے سورج کے گرد کیوں گردش کرتے ہیں اور کششِ ثقل زمین اور خلا میں کیسے کام کرتی ہے۔'
      },
      bio: {
        en: 'Sir Isaac Newton was an English mathematician, physicist, astronomer, and author who widely recognised as one of the greatest mathematicians and most influential scientists of all time.',
        ur: 'سر آئزک نیوٹن ایک انگریز ریاضی دان، طبیعیات دان، ماہر فلکیات اور مصنف تھا جسے عام طور پر تمام وقت کے عظیم ترین ریاضی دانوں اور بااثر ترین سائنسدانوں میں سے ایک کے طور پر تسلیم کیا جاتا ہے۔'
      }
    },
    {
      id: 'katherine',
      name: { en: 'Katherine Johnson', ur: 'کیتھرین جانسن' },
      lifespan: '1918–2020',
      nationality: { en: 'American', ur: 'امریکی' },
      field: { en: 'Mathematics, Space Science', ur: 'ریاضی، خلائی سائنس' },
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      contribution: {
        en: 'Mathematician whose calculations helped determine flight paths for early NASA missions, including crewed flights to the Moon. Her work was essential for mission success and safety.',
        ur: 'ریاضی دان تھیں جن کے حساب کتاب نے ابتدائی ناسا مشنز، بشمول چاند کے لیے خلانوردوں والی پروازوں، کے فلائٹ پاتھ متعین کرنے میں مدد کی۔ ان کا کام مشن کی کامیابی اور حفاظت کے لیے انتہائی ضروری تھا۔'
      },
      bio: {
        en: 'Katherine Coleman Goble Johnson was an American mathematician whose calculations of orbital mechanics as an employee of NASA were critical to the success of the first U.S. crewed spaceflights.',
        ur: 'کیتھرین کولمین گوبل جانسن ایک امریکی ریاضی دان تھیں جن کے ناسا کی ملازم کے طور پر مداری میکانیات کے حساب کتاب پہلی امریکی خلانوردوں والی خلائی پروازوں کی کامیابی کے لیے اہم تھے۔'
      }
    },
    {
      id: 'modern',
      name: { en: 'Modern NASA Scientists', ur: 'جدید ناسا سائنسدان' },
      lifespan: 'Present day',
      nationality: { en: 'International', ur: 'بین الاقوامی' },
      field: { en: 'Various Fields', ur: 'مختلف شعبے' },
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      contribution: {
        en: 'Thousands of scientists and engineers work on NASA missions, studying planets, stars, galaxies and space weather. They design instruments, analyze data and plan future exploration.',
        ur: 'آج ہزاروں سائنسدان اور انجینئر ناسا کے مشنز پر کام کرتے ہیں، جو سیاروں، ستاروں، کہکشاؤں اور خلا کے موسم کا مطالعہ کرتے ہیں۔ یہ آلات ڈیزائن کرتے ہیں، ڈیٹا کا تجزیہ کرتے ہیں اور مستقبل کی دریافت کی منصوبہ بندی کرتے ہیں۔'
      },
      bio: {
        en: 'Today\'s NASA employs over 17,000 people including scientists, engineers, astronauts and support staff from diverse backgrounds working together to explore the universe.',
        ur: 'آج ناسا میں 17,000 سے زائد لوگ کام کرتے ہیں بشمول سائنسدان، انجینئر، خلانورد اور معاون عملہ جو مختلف پس منظر سے تعلق رکھتے ہیں اور مل کر کائنات کی دریافت کے لیے کام کرتے ہیں۔'
      }
    }
  ];

  // Quiz questions
  const quizQuestions = [
    { question: { en: 'Who proposed heliocentric model?', ur: 'سورج مرکزی ماڈل کس نے تجویز کیا؟' }, options: [{ en: 'Galileo', ur: 'گیلیلیو' }, { en: 'Copernicus', ur: 'کوپرنیکس' }, { en: 'Newton', ur: 'نیوٹن' }, { en: 'Kepler', ur: 'کیپلر' }], correct: 1, explanation: { en: 'Copernicus proposed Sun-centered model in 1543.', ur: 'کوپرنیکس نے 1543 میں سورج مرکزی ماڈل تجویز کیا۔' } },
    { question: { en: 'What did Galileo observe?', ur: 'گیلیلیو نے کیا مشاہدہ کیا؟' }, options: [{ en: 'Only stars', ur: 'صرف ستارے' }, { en: 'Jupiter\'s moons and Venus phases', ur: 'مشتری کے چاند اور زہرہ کی حالتیں' }, { en: 'Only Moon', ur: 'صرف چاند' }, { en: 'Nothing', ur: 'کچھ نہیں' }], correct: 1, explanation: { en: 'Galileo observed Jupiter\'s moons, Venus phases and lunar craters.', ur: 'گیلیلیو نے مشتری کے چاند، زہرہ کی حالتیں اور چاند کے گڑھے دریافت کیے۔' } },
    { question: { en: 'What are Kepler\'s laws about?', ur: 'کیپلر کے قوانین کن کے بارے میں ہیں؟' }, options: [{ en: 'Gravity only', ur: 'صرف کششِ ثقل' }, { en: 'Planetary motion', ur: 'سیاروی حرکت' }, { en: 'Light', ur: 'روشنی' }, { en: 'Sound', ur: 'آواز' }], correct: 1, explanation: { en: 'Kepler discovered laws of planetary motion in elliptical orbits.', ur: 'کیپلر نے بیضوی مداروں میں سیاروی حرکت کے قوانین دریافت کیے۔' } },
    { question: { en: 'What did Newton explain?', ur: 'نیوٹن نے کیا وضاحت کی؟' }, options: [{ en: 'Only planets', ur: 'صرف سیارے' }, { en: 'Gravity and motion laws', ur: 'کششِ ثقل اور حرکت کے قوانین' }, { en: 'Only Earth', ur: 'صرف زمین' }, { en: 'Only Moon', ur: 'صرف چاند' }], correct: 1, explanation: { en: 'Newton formulated laws of motion and universal gravitation.', ur: 'نیوٹن نے حرکت کے قوانین اور عالمی کششِ ثقل بنائے۔' } },
    { question: { en: 'What was Katherine Johnson\'s role?', ur: 'کیتھرین جانسن کا کیا کردار تھا؟' }, options: [{ en: 'Astronaut', ur: 'خلانورد' }, { en: 'Calculated flight paths', ur: 'فلائٹ پاتھ کا حساب لگایا' }, { en: 'Engineer', ur: 'انجینئر' }, { en: 'Pilot', ur: 'پائلٹ' }], correct: 1, explanation: { en: 'Katherine Johnson calculated flight paths for NASA missions.', ur: 'کیتھرین جانسن نے ناسا مشنز کے فلائٹ پاتھ کا حساب لگایا۔' } },
    { question: { en: 'First artificial satellite?', ur: 'پہلا مصنوعی سیٹلائٹ؟' }, options: [{ en: 'Apollo 11', ur: 'اپولو 11' }, { en: 'Sputnik 1', ur: 'سپوٹنک 1' }, { en: 'Voyager 1', ur: 'وائیجر 1' }, { en: 'ISS', ur: 'آئی ایس ایس' }], correct: 1, explanation: { en: 'Sputnik 1 was launched in 1957 by Soviet Union.', ur: 'سپوٹنک 1 1957 میں سوویت یونین نے لانچ کیا۔' } },
    { question: { en: 'First human in space?', ur: 'خلا میں پہلا انسان؟' }, options: [{ en: 'Neil Armstrong', ur: 'نیل آرمسٹرانگ' }, { en: 'Yuri Gagarin', ur: 'یوری گاگارن' }, { en: 'John Glenn', ur: 'جان گلین' }, { en: 'Buzz Aldrin', ur: 'بز آلڈرِن' }], correct: 1, explanation: { en: 'Yuri Gagarin was first human in space in 1961.', ur: 'یوری گاگارن 1961 میں خلا میں پہلا انسان تھا۔' } },
    { question: { en: 'First Moon landing mission?', ur: 'پہلی چاند لینڈنگ مشن؟' }, options: [{ en: 'Apollo 11', ur: 'اپولو 11' }, { en: 'Apollo 13', ur: 'اپولو 13' }, { en: 'Artemis 1', ur: 'آرٹیمس 1' }, { en: 'Viking 1', ur: 'وائکنگ 1' }], correct: 0, explanation: { en: 'Apollo 11 landed first humans on Moon in 1969.', ur: 'اپولو 11 نے 1969 میں پہلے انسان چاند پر اتارے۔' } },
    { question: { en: 'How many walked on Moon in Apollo?', ur: 'اپولو میں کتنوں نے چاند پر قدم رکھا؟' }, options: [{ en: '6', ur: '۶' }, { en: '12', ur: '۱۲' }, { en: '24', ur: '۲۴' }, { en: '2', ur: '۲' }], correct: 1, explanation: { en: 'Twelve astronauts walked on Moon during Apollo.', ur: 'اپولو کے دوران 12 خلانوردوں نے چاند پر قدم رکھا۔' } },
    { question: { en: 'First Mars orbiter/lander?', ur: 'پہلا مریخ مداری جہاز/لینڈر؟' }, options: [{ en: 'Curiosity', ur: 'کیوروسٹی' }, { en: 'Viking', ur: 'وائکنگ' }, { en: 'Perseverance', ur: 'پرسیویرنس' }, { en: 'Spirit', ur: 'سپرٹ' }], correct: 1, explanation: { en: 'Viking was first successful Mars mission.', ur: 'وائکنگ پہلا کامیاب مریخ مشن تھا۔' } },
    { question: { en: 'First Mars rover?', ur: 'پہلا مریخ روور؟' }, options: [{ en: 'Curiosity', ur: 'کیوروسٹی' }, { en: 'Spirit', ur: 'سپرٹ' }, { en: 'Sojourner', ur: 'سوجورنر' }, { en: 'Opportunity', ur: 'آپارچونٹی' }], correct: 2, explanation: { en: 'Sojourner was first successful Mars rover in 1997.', ur: 'سوجورنر 1997 میں پہلا کامیاب مریخ روور تھا۔' } },
    { question: { en: 'Rover on Mars since 2012?', ur: '2012 سے مریخ پر روور؟' }, options: [{ en: 'Spirit', ur: 'سپرٹ' }, { en: 'Opportunity', ur: 'آپارچونٹی' }, { en: 'Curiosity', ur: 'کیوروسٹی' }, { en: 'Sojourner', ur: 'سوجورنر' }], correct: 2, explanation: { en: 'Curiosity has been exploring Mars since 2012.', ur: 'کیوروسٹی 2012 سے مریخ کی دریافت کر رہا ہے۔' } },
    { question: { en: 'What is Perseverance searching for?', ur: 'پرسیویرنس کیا تلاش کر رہا ہے؟' }, options: [{ en: 'Gold', ur: 'سونا' }, { en: 'Signs of ancient life', ur: 'قدیم زندگی کے آثار' }, { en: 'Water only', ur: 'صرف پانی' }, { en: 'Aliens', ur: 'خلائی مخلوق' }], correct: 1, explanation: { en: 'Perseverance searches for signs of ancient life.', ur: 'پرسیویرنس قدیم زندگی کے آثار تلاش کر رہا ہے۔' } },
    { question: { en: 'What was Ingenuity?', ur: 'انجینیوٹی کیا تھا؟' }, options: [{ en: 'A rover', ur: 'ایک روور' }, { en: 'First helicopter on Mars', ur: 'مریخ پر پہلا ہیلی کاپٹر' }, { en: 'An orbiter', ur: 'ایک مداری جہاز' }, { en: 'A lander', ur: 'ایک لینڈر' }], correct: 1, explanation: { en: 'Ingenuity was first helicopter to fly on Mars.', ur: 'انجینیوٹی مریخ پر اڑنے والا پہلا ہیلی کاپٹر تھا۔' } },
    { question: { en: 'Which visited all giant planets?', ur: 'کس نے تمام دیو سیاروں کا دورہ کیا؟' }, options: [{ en: 'Voyager 1 and 2', ur: 'وائیجر 1 اور 2' }, { en: 'Apollo', ur: 'اپولو' }, { en: 'ISS', ur: 'آئی ایس ایس' }, { en: 'Hubble', ur: 'ہبل' }], correct: 0, explanation: { en: 'Voyager 1 and 2 visited Jupiter, Saturn, Uranus, Neptune.', ur: 'وائیجر 1 اور 2 نے مشتری، زحل، یورینس، نیپچون کا دورہ کیا۔' } },
    { question: { en: 'Where is Voyager 1 now?', ur: 'وائیجر 1 اب کہاں ہے؟' }, options: [{ en: 'Earth orbit', ur: 'زمین کا مدار' }, { en: 'On Mars', ur: 'مریخ پر' }, { en: 'Interstellar space', ur: 'بین النجمی خلا' }, { en: 'On Moon', ur: 'چاند پر' }], correct: 2, explanation: { en: 'Voyager 1 entered interstellar space in 2012.', ur: 'وائیجر 1 2012 میں بین النجمی خلا میں داخل ہوا۔' } },
    { question: { en: 'What is ISS?', ur: 'آئی ایس ایس کیا ہے؟' }, options: [{ en: 'A planet', ur: 'ایک سیارہ' }, { en: 'International Space Station', ur: 'بین الاقوامی خلائی اسٹیشن' }, { en: 'A rocket', ur: 'ایک راکٹ' }, { en: 'A moon', ur: 'ایک چاند' }], correct: 1, explanation: { en: 'ISS is International Space Station, lab in orbit.', ur: 'آئی ایس ایس بین الاقوامی خلائی اسٹیشن ہے، مدار میں لیبارٹری۔' } },
    { question: { en: 'ISS orbit time?', ur: 'آئی ایس ایس مدار کا وقت؟' }, options: [{ en: '24 hours', ur: '۲۴ گھنٹے' }, { en: 'About 90 minutes', ur: 'تقریباً ۹۰ منٹ' }, { en: '1 year', ur: '۱ سال' }, { en: '1 month', ur: '۱ مہینہ' }], correct: 1, explanation: { en: 'ISS orbits Earth about every 90 minutes.', ur: 'آئی ایس ایس تقریباً ہر 90 منٹ میں زمین کا چکر لگاتا ہے۔' } },
    { question: { en: 'Why exercise on ISS?', ur: 'آئی ایس ایس پر ورزش کیوں؟' }, options: [{ en: 'For fun', ur: 'تفریح' }, { en: 'Reduce muscle loss', ur: 'پٹھوں کا نقصان کم' }, { en: 'Pass time', ur: 'وقت گزارنا' }, { en: 'Don\'t exercise', ur: 'ورزش نہیں' }], correct: 1, explanation: { en: 'Exercise reduces muscle loss in microgravity.', ur: 'ورزش مائیکرو گریویٹی میں پٹھوں کے نقصان کو کم کرتی ہے۔' } },
    { question: { en: 'Artemis program goal?', ur: 'آرٹیمس پروگرام کا مقصد؟' }, options: [{ en: 'Go to Mars', ur: 'مریخ پر جانا' }, { en: 'Return to Moon', ur: 'چاند پر واپسی' }, { en: 'Study Sun', ur: 'سورج کا مطالعہ' }, { en: 'Build station', ur: 'اسٹیشن بنانا' }], correct: 1, explanation: { en: 'Artemis aims to return humans to Moon.', ur: 'آرٹیمس کا مقصد انسانوں کو چاند پر واپس لے جانا ہے۔' } },
    { question: { en: 'Why Moon for Mars prep?', ur: 'مریخ کی تیاری کے لیے چاند کیوں؟' }, options: [{ en: 'Closer for testing', ur: 'تجربے کے لیے قریب' }, { en: 'Has water', ur: 'پانی ہے' }, { en: 'Warmer', ur: 'گرم' }, { en: 'No reason', ur: 'کوئی وجہ نہیں' }], correct: 0, explanation: { en: 'Moon serves as testing ground for Mars tech.', ur: 'چاند مریخ ٹیکنالوجی کے لیے ٹیسٹنگ گراؤنڈ ہے۔' } },
    { question: { en: 'What is gravity assist?', ur: 'گریویٹی اسسٹ کیا ہے؟' }, options: [{ en: 'Using planet gravity to change speed', ur: 'رفتار بدلنے کے لیے سیارے کی کشش' }, { en: 'Adding fuel', ur: 'اینڈھن شامل' }, { en: 'Stopping', ur: 'روکنا' }, { en: 'Nothing', ur: 'کچھ نہیں' }], correct: 0, explanation: { en: 'Gravity assist uses planet gravity to save fuel.', ur: 'گریویٹی اسسٹ ایندھن بچانے کے لیے سیارے کی کشش استعمال کرتا ہے۔' } },
    { question: { en: 'Which tested Apollo landing?', ur: 'کس نے اپولو لینڈنگ کا تجربہ کیا؟' }, options: [{ en: 'Apollo 10', ur: 'اپولو 10' }, { en: 'Apollo 13', ur: 'اپولو 13' }, { en: 'Viking', ur: 'وائکنگ' }, { en: 'Voyager', ur: 'وائیجر' }], correct: 0, explanation: { en: 'Apollo 10 tested lunar landing before Apollo 11.', ur: 'اپولو 10 نے اپولو 11 سے پہلے قمری لینڈنگ کا تجربہ کیا۔' } },
    { question: { en: 'What do Mars orbiters study?', ur: 'مریخ مداری جہاز کیا مطالعہ کرتے ہیں؟' }, options: [{ en: 'Only rocks', ur: 'صرف پتھر' }, { en: 'Atmosphere, surface, weather', ur: 'فضا، سطح، موسم' }, { en: 'Only water', ur: 'صرف پانی' }, { en: 'Nothing', ur: 'کچھ نہیں' }], correct: 1, explanation: { en: 'Mars orbiters study atmosphere, surface and weather.', ur: 'مریخ مداری جہاز فضا، سطح اور موسم کا مطالعہ کرتے ہیں۔' } }
  ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
    setShowResult(true);
    if (idx === quizQuestions[currentQuestion].correct) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem('sslh-scientists-quiz-best', newScore.toString());
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
    setQuizFinished(false);
  };

  // Animation data
  const moonMissionSteps = [
    { en: 'Launch from Earth', ur: 'زمین سے لانچ', icon: '🚀' },
    { en: 'Trans-lunar injection', ur: 'قمری سفر کا آغاز', icon: '🌍' },
    { en: 'Lunar orbit insertion', ur: 'قمری مدار میں داخلہ', icon: '🌙' },
    { en: 'Module separates', ur: 'ماڈیول الگ ہوتا ہے', icon: '🛸' },
    { en: 'Landing on Moon', ur: 'چاند پر لینڈنگ', icon: '🏁' },
    { en: 'Return to Earth', ur: 'زمین پر واپسی', icon: '🌎' }
  ];

  const marsRoverSteps = [
    { en: 'Cruise to Mars', ur: 'مریخ کا سفر', icon: '🚀' },
    { en: 'Entry into atmosphere', ur: 'فضا میں داخلہ', icon: '🔥' },
    { en: 'Parachute deployment', ur: 'پیراشوٹ کھلنا', icon: '🪂' },
    { en: 'Sky crane maneuver', ur: 'اسکائی کرین', icon: '🏗️' },
    { en: 'Rover touchdown', ur: 'روور لینڈنگ', icon: '🤖' },
    { en: 'Surface exploration', ur: 'سطحی دریافت', icon: '🔬' }
  ];

  const voyagerSteps = [
    { en: 'Launch from Earth', ur: 'زمین سے لانچ', icon: '🚀' },
    { en: 'Jupiter flyby', ur: 'مشتری فلائی بائی', icon: '🪐' },
    { en: 'Saturn flyby', ur: 'زحل فلائی بائی', icon: '💫' },
    { en: 'Uranus flyby', ur: 'یورینس فلائی بائی', icon: '🔵' },
    { en: 'Neptune flyby', ur: 'نیپچون فلائی بائی', icon: '🌀' },
    { en: 'Interstellar space', ur: 'بین النجمی خلا', icon: '✨' }
  ];

  const issSteps = [
    { en: 'Launch crew/cargo', ur: 'عملہ/سامان لانچ', icon: '🚀' },
    { en: 'Dock to ISS', ur: 'آئی ایس ایس سے ڈاک', icon: '🔗' },
    { en: 'Microgravity experiments', ur: 'مائیکرو گریویٹی تجربات', icon: '🔬' },
    { en: 'Spacewalk operations', ur: 'خلائی واک', icon: '🧑‍🚀' },
    { en: 'Data analysis', ur: 'ڈیٹا تجزیہ', icon: '📊' },
    { en: 'Return to Earth', ur: 'زمین پر واپسی', icon: '🌎' }
  ];

  const artemisSteps = [
    { en: 'SLS rocket launch', ur: 'ایس ایل ایس راکٹ لانچ', icon: '🚀' },
    { en: 'Orion spacecraft', ur: 'اورین خلائی جہاز', icon: '🛸' },
    { en: 'Lunar orbit', ur: 'قمری مدار', icon: '🌙' },
    { en: 'Gateway station', ur: 'گیٹ وے اسٹیشن', icon: '🏗️' },
    { en: 'Lunar lander', ur: 'قمری لینڈر', icon: '🛬' },
    { en: 'Moon surface', ur: 'چاند کی سطح', icon: '👨‍🚀' }
  ];

  return (
    <div className="space-y-12 pb-8">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {renderText('Scientists and Space Missions', 'سائنسدان اور خلائی مشنز')}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {renderText('How We Learned to Explore Space', 'ہم نے خلا کو دریافت کرنا کیسے سیکھا')}
        </p>
      </div>

      {/* Hero Section */}
      <section className="rounded-2xl overflow-hidden border p-6 md:p-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Meet the Minds and Missions Behind Space Exploration', 'خلائی دریافت کے پیچھے موجود ذہنوں اور مشنز سے ملیں')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Space exploration is the result of centuries of scientific discoveries and decades of engineering achievements. Astronomers and physicists discovered how planets move. Engineers built rockets and spacecraft. Mission teams turned ideas into real journeys to the Moon, Mars and beyond.',
            'خلائی دریافت کئی صدیوں کی سائنسی دریافتوں اور کئی دہائیوں کی انجینئرنگ کی کامیابیوں کا نتیجہ ہے۔ ماہرینِ فلکیات اور طبیعیات دانوں نے دریافت کیا کہ سیارے کیسے حرکت کرتے ہیں۔ انجینئرز نے راکٹ اور خلائی جہاز بنائے۔ مشن ٹیموں نے خیالات کو چاند، مریخ اور اس سے آگے کے حقیقی سفر میں تبدیل کیا۔'
          )}
        </p>
        
        {/* Hero Visual */}
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-3 gap-4">
            <ScientistPortrait name="Copernicus" gradient="linear-gradient(135deg, #667eea, #764ba2)" size={60} />
            <ScientistPortrait name="Galileo" gradient="linear-gradient(135deg, #f093fb, #f5576c)" size={60} />
            <ScientistPortrait name="Newton" gradient="linear-gradient(135deg, #43e97b, #38f9d7)" size={60} />
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { en: 'Scientists', ur: 'سائنسدان', id: 'scientists' },
            { en: 'Discoveries', ur: 'دریافتیں', id: 'discoveries' },
            { en: 'Missions', ur: 'مشنز', id: 'missions' },
            { en: 'Moon', ur: 'چاند', id: 'moon' },
            { en: 'Mars', ur: 'مریخ', id: 'mars' },
            { en: 'Artemis', ur: 'آرٹیمس', id: 'artemis' },
            { en: 'Quiz', ur: 'کوئز', id: 'quiz' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => document.getElementById(btn.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-80"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              {language === 'ur' ? btn.ur : language === 'both' ? <><span>{btn.en}</span><span className="block font-urdu text-xs" dir="rtl">{btn.ur}</span></> : btn.en}
            </button>
          ))}
        </div>
      </section>

      {/* Section 1: Famous Scientists */}
      <section id="scientists">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Famous Scientists', 'مشہور سائنسدان')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scientists.map((scientist) => (
            <div key={scientist.id} className="rounded-xl p-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <ScientistPortrait name={scientist.name.en} gradient={scientist.gradient} size={80} />
              <h3 className="font-bold text-center mt-3 mb-1" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? scientist.name.ur : scientist.name.en}
                {language === 'both' && <span className="block font-urdu text-sm" dir="rtl">{scientist.name.ur}</span>}
              </h3>
              <p className="text-xs text-center mb-1" style={{ color: 'var(--text-secondary)' }}>
                {scientist.lifespan}
              </p>
              <p className="text-xs text-center mb-3" style={{ color: 'var(--accent)' }}>
                {language === 'ur' ? scientist.nationality.ur : scientist.nationality.en} • {language === 'ur' ? scientist.field.ur : scientist.field.en}
              </p>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                {language === 'ur' ? scientist.contribution.ur : scientist.contribution.en}
                {language === 'both' && <span className="block font-urdu mt-1" dir="rtl">{scientist.contribution.ur}</span>}
              </p>
              <button
                onClick={() => setSelectedScientist(scientist.id)}
                className="w-full py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                {renderText('Learn More', 'مزید جانیں')}
              </button>
            </div>
          ))}
        </div>

        {/* Scientist Modal */}
        {selectedScientist && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setSelectedScientist(null)}>
            <div className="relative max-w-lg w-full rounded-2xl p-6 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedScientist(null)} className="absolute top-3 right-3 p-1 rounded-full" style={{ color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
              {(() => {
                const scientist = scientists.find(s => s.id === selectedScientist);
                if (!scientist) return null;
                return (
                  <>
                    <ScientistPortrait name={scientist.name.en} gradient={scientist.gradient} size={120} />
                    <h3 className="text-xl font-bold text-center mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>
                      {language === 'ur' ? scientist.name.ur : scientist.name.en}
                      {language === 'both' && <span className="block font-urdu text-lg" dir="rtl">{scientist.name.ur}</span>}
                    </h3>
                    <p className="text-sm text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {scientist.lifespan} • {language === 'ur' ? scientist.nationality.ur : scientist.nationality.en}
                    </p>
                    <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: 'var(--surface-muted)' }}>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {language === 'ur' ? scientist.bio.ur : scientist.bio.en}
                        {language === 'both' && <span className="block font-urdu mt-2" dir="rtl">{scientist.bio.ur}</span>}
                      </p>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <strong>{renderText('Contribution:', 'شراکت:')}</strong>
                      <br />
                      {language === 'ur' ? scientist.contribution.ur : scientist.contribution.en}
                      {language === 'both' && <span className="block font-urdu mt-1" dir="rtl">{scientist.contribution.ur}</span>}
                    </p>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </section>

      {/* Section 2: Key Discoveries Flowchart */}
      <section id="discoveries">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('How Discoveries Built Space Exploration', 'دریافتوں نے خلائی دریافت کو کیسے بنایا')}
        </h2>
        <BilingualFlowchart
          steps={[
            { en: 'Copernicus: Sun-centered', ur: 'کوپرنیکس: سورج مرکزی' },
            { en: 'Galileo: Telescope', ur: 'گیلیلیو: دوربین' },
            { en: 'Kepler: Elliptical orbits', ur: 'کیپلر: بیضوی مدار' },
            { en: 'Newton: Gravity', ur: 'نیوٹن: کششِ ثقل' },
            { en: 'Rocket science', ur: 'راکٹ سائنس' },
            { en: 'Space missions', ur: 'خلائی مشنز' }
          ]}
        />
      </section>

      {/* Section 3: Space Missions Timeline */}
      <section id="missions">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Major Space Missions Timeline', 'بڑے خلائی مشنز کی ٹائم لائن')}
        </h2>
        <div className="space-y-3">
          {[
            { era: '1950s', en: 'First artificial satellites (Sputnik, Explorer)', ur: 'پہلے مصنوعی سیٹلائٹس (سپوٹنک، ایکسپلورر)', icon: '🛰️' },
            { era: '1960s', en: 'First humans in space, Moon race begins', ur: 'خلا میں پہلے انسان، چاند کی دوڑ شروع', icon: '🧑‍🚀' },
            { era: '1970s', en: 'Apollo Moon landings, first Mars orbiters', ur: 'اپولو چاند لینڈنگز، پہلے مریخ مداری جہاز', icon: '🌙' },
            { era: '1980s–90s', en: 'Space Shuttle era, Voyager Grand Tour', ur: 'خلائی شٹل کا دور، وائیجر گرینڈ ٹور', icon: '🚀' },
            { era: '2000s–10s', en: 'ISS construction, Mars rovers', ur: 'آئی ایس ایس کی تعمیر، مریخ روورز', icon: '🏗️' },
            { era: '2020s', en: 'Artemis program, Mars sample return', ur: 'آرٹیمس پروگرام، مریخ سے نمونہ واپسی', icon: '🎯' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="flex-shrink-0 w-20 text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-sm font-bold" style={{ color: 'var(--accent)' }}>{item.era}</div>
              </div>
              <div className="flex-1">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {renderText(item.en, item.ur)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Moon Missions Animation */}
      <section id="moon">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Missions to the Moon', 'چاند کے مشنز')}
        </h2>
        <MissionAnimation
          title={{ en: 'Apollo Moon Landing Sequence', ur: 'اپولو چاند لینڈنگ کی ترتیب' }}
          steps={moonMissionSteps}
          color="#667eea"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {[
            { year: '1969', en: 'Apollo 11 first landing', ur: 'اپولو 11 پہلی لینڈنگ' },
            { year: '1972', en: 'Apollo 17 last landing', ur: 'اپولو 17 آخری لینڈنگ' },
            { year: '2020s', en: 'Artemis program begins', ur: 'آرٹیمس پروگرام شروع' }
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{item.year}</div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {renderText(item.en, item.ur)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Mars Rovers Animation */}
      <section id="mars">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Mars Rovers', 'مریخ کے روورز')}
        </h2>
        <MissionAnimation
          title={{ en: 'Mars Rover Landing Sequence', ur: 'مریخ روور لینڈنگ کی ترتیب' }}
          steps={marsRoverSteps}
          color="#c1440e"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { name: 'Sojourner', year: '1997' },
            { name: 'Spirit/Opportunity', year: '2004' },
            { name: 'Curiosity', year: '2012' },
            { name: 'Perseverance', year: '2021' }
          ].map((rover, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="text-2xl mb-1">🤖</div>
              <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{rover.name}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{rover.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Voyager Animation */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Voyager Grand Tour', 'وائیجر گرینڈ ٹور')}
        </h2>
        <MissionAnimation
          title={{ en: 'Voyager Grand Tour Sequence', ur: 'وائیجر گرینڈ ٹور کی ترتیب' }}
          steps={voyagerSteps}
          color="#4facfe"
        />
      </section>

      {/* Section 7: ISS Animation */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('International Space Station', 'بین الاقوامی خلائی اسٹیشن')}
        </h2>
        <MissionAnimation
          title={{ en: 'ISS Operations Sequence', ur: 'آئی ایس ایس آپریشنز کی ترتیب' }}
          steps={issSteps}
          color="#30cfd0"
        />
      </section>

      {/* Section 8: Artemis Animation */}
      <section id="artemis">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Artemis Program', 'آرٹیمس پروگرام')}
        </h2>
        <MissionAnimation
          title={{ en: 'Artemis Mission Sequence', ur: 'آرٹیمس مشن کی ترتیب' }}
          steps={artemisSteps}
          color="#fa709a"
        />
      </section>

      {/* Section 9: Image Carousel */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Scientists and Missions Gallery', 'سائنسدانوں اور مشنز کی گیلری')}
        </h2>
        <EducationalCarousel
          slides={[
            { imageUrl: '', captionEn: 'Copernicus - heliocentric model', captionUr: 'کوپرنیکس - سورج مرکزی ماڈل', credit: 'Historical illustration', fallbackGradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { imageUrl: '', captionEn: 'Galileo with telescope', captionUr: 'گیلیلیو دوربین کے ساتھ', credit: 'Historical illustration', fallbackGradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { imageUrl: '', captionEn: 'Kepler\'s elliptical orbits', captionUr: 'کیپلر کے بیضوی مدار', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
            { imageUrl: '', captionEn: 'Newton\'s gravity', captionUr: 'نیوٹن کی کششِ ثقل', credit: 'Historical illustration', fallbackGradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
            { imageUrl: '', captionEn: 'Katherine Johnson at work', captionUr: 'کیتھرین جانسن کام کرتے ہوئے', credit: 'NASA', fallbackGradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
            { imageUrl: '', captionEn: 'Modern NASA control room', captionUr: 'جدید ناسا کنٹرول روم', credit: 'NASA', fallbackGradient: 'linear-gradient(135deg, #30cfd0, #330867)' },
            { imageUrl: '', captionEn: 'Sputnik 1 satellite', captionUr: 'سپوٹنک 1 سیٹلائٹ', credit: 'Historical', fallbackGradient: 'radial-gradient(circle, #808080, #404040)' },
            { imageUrl: '', captionEn: 'Apollo 11 launch', captionUr: 'اپولو 11 لانچ', credit: 'NASA', fallbackGradient: 'linear-gradient(180deg, #000020, #ff8c00)' },
            { imageUrl: '', captionEn: 'Apollo 11 Moon landing', captionUr: 'اپولو 11 چاند لینڈنگ', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #c0c0c0, #404040)' },
            { imageUrl: '', captionEn: 'Astronaut on Moon', captionUr: 'چاند پر خلاباز', credit: 'NASA', fallbackGradient: 'linear-gradient(180deg, #000020, #c0c0c0)' },
            { imageUrl: '', captionEn: 'Viking Mars orbiter', captionUr: 'وائکنگ مریخ مداری جہاز', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #e8845a, #c1440e)' },
            { imageUrl: '', captionEn: 'Mars Pathfinder/Sojourner', captionUr: 'مریخ پاتھ فائنڈر/سوجورنر', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #e8845a, #5c1800)' },
            { imageUrl: '', captionEn: 'Spirit rover on Mars', captionUr: 'مریخ پر سپرٹ روور', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #e8845a, #8b2500)' },
            { imageUrl: '', captionEn: 'Curiosity rover', captionUr: 'کیوروسٹی روور', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #e8845a, #c1440e)' },
            { imageUrl: '', captionEn: 'Perseverance rover', captionUr: 'پرسیویرنس روور', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #e8845a, #5c1800)' },
            { imageUrl: '', captionEn: 'Ingenuity helicopter', captionUr: 'انجینیوٹی ہیلی کاپٹر', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #e8845a, #8b2500)' },
            { imageUrl: '', captionEn: 'Voyager spacecraft', captionUr: 'وائیجر خلائی جہاز', credit: 'NASA', fallbackGradient: 'linear-gradient(135deg, #000020, #4facfe)' },
            { imageUrl: '', captionEn: 'Grand Tour trajectory', captionUr: 'گرینڈ ٹور راستہ', credit: 'NASA', fallbackGradient: 'linear-gradient(90deg, #ffcc00, #c88b3a, #e8d088, #7ec8e3, #3355cc)' },
            { imageUrl: '', captionEn: 'ISS exterior', captionUr: 'آئی ایس ایس بیرونی', credit: 'NASA', fallbackGradient: 'linear-gradient(180deg, #000020, #4a90d9)' },
            { imageUrl: '', captionEn: 'ISS interior lab', captionUr: 'آئی ایس ایس اندرونی لیبارٹری', credit: 'NASA', fallbackGradient: 'linear-gradient(135deg, #808080, #c0c0c0)' },
            { imageUrl: '', captionEn: 'Artemis SLS rocket', captionUr: 'آرٹیمس ایس ایل ایس راکٹ', credit: 'NASA', fallbackGradient: 'linear-gradient(180deg, #000020, #ff8c00)' },
            { imageUrl: '', captionEn: 'Orion spacecraft', captionUr: 'اورین خلائی جہاز', credit: 'NASA', fallbackGradient: 'linear-gradient(135deg, #30cfd0, #330867)' },
            { imageUrl: '', captionEn: 'Moon base concept', captionUr: 'چاند بیس تصور', credit: 'NASA concept', fallbackGradient: 'radial-gradient(circle, #c0c0c0, #404040)' },
            { imageUrl: '', captionEn: 'Mars mission concept', captionUr: 'مریخ مشن تصور', credit: 'NASA concept', fallbackGradient: 'radial-gradient(circle, #e8845a, #000020)' }
          ]}
        />
      </section>

      {/* Section 10: Flowcharts */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Mission Flowcharts', 'مشن کے فلوچارٹس')}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('From Idea to Moon Landing', 'خیال سے چاند لینڈنگ تک')}
            </h3>
            <BilingualFlowchart steps={[
              { en: 'Scientific theory', ur: 'سائنسی نظریہ' },
              { en: 'Rocket technology', ur: 'راکٹ ٹیکنالوجی' },
              { en: 'Orbital mechanics', ur: 'مداری میکانیات' },
              { en: 'Spacecraft design', ur: 'خلائی جہاز ڈیزائن' },
              { en: 'Mission planning', ur: 'مشن منصوبہ بندی' },
              { en: 'Moon landing', ur: 'چاند لینڈنگ' }
            ]} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Mars Mission Sequence', 'مریخ مشن ترتیب')}
            </h3>
            <BilingualFlowchart steps={[
              { en: 'Launch', ur: 'لانچ' },
              { en: 'Cruise', ur: 'سفر' },
              { en: 'Orbit insertion', ur: 'مدار میں داخلہ' },
              { en: 'Entry/descent', ur: 'داخلہ/نزول' },
              { en: 'Landing', ur: 'لینڈنگ' },
              { en: 'Operations', ur: 'آپریشنز' }
            ]} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Gravity Assist', 'گریویٹی اسسٹ')}
            </h3>
            <BilingualFlowchart steps={[
              { en: 'Approach planet', ur: 'سیارے کے قریب' },
              { en: 'Gravity bends path', ur: 'کشش راستہ موڑتی ہے' },
              { en: 'Speed changes', ur: 'رفتار بدلتی ہے' },
              { en: 'New trajectory', ur: 'نیا راستہ' },
              { en: 'Fuel saved', ur: 'ایندھن بچتا ہے' }
            ]} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('ISS Research Flow', 'آئی ایس ایس تحقیق')}
            </h3>
            <BilingualFlowchart steps={[
              { en: 'Launch', ur: 'لانچ' },
              { en: 'Dock', ur: 'ڈاک' },
              { en: 'Experiments', ur: 'تجربات' },
              { en: 'Analysis', ur: 'تجزیہ' },
              { en: 'Applications', ur: 'اطلاقات' }
            ]} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Artemis Architecture', 'آرٹیمس آرکیٹیکچر')}
            </h3>
            <BilingualFlowchart steps={[
              { en: 'SLS rocket', ur: 'ایس ایل ایس راکٹ' },
              { en: 'Orion', ur: 'اورین' },
              { en: 'Gateway', ur: 'گیٹ وے' },
              { en: 'Lander', ur: 'لینڈر' },
              { en: 'Moon surface', ur: 'چاند سطح' },
              { en: 'Return', ur: 'واپسی' }
            ]} />
          </div>
        </div>
      </section>

      {/* Section 11: Fun Facts */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Fun Facts', 'دلچسپ حقائق')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { en: 'Copernicus proposed Sun-centered Solar System.', ur: 'کوپرنیکس نے سورج مرکزی نظامِ شمسی تجویز کیا۔' },
            { en: 'Galileo discovered Jupiter\'s four largest moons.', ur: 'گیلیلیو نے مشتری کے چار بڑے چاند دریافت کیے۔' },
            { en: 'Kepler showed planets move in ellipses.', ur: 'کیپلر نے ثابت کیا سیارے بیضویوں میں حرکت کرتے ہیں۔' },
            { en: 'Newton explained gravity and motion.', ur: 'نیوٹن نے کششِ ثقل اور حرکت کی وضاحت کی۔' },
            { en: 'Katherine Johnson calculated Apollo paths.', ur: 'کیتھرین جانسن نے اپولو راستوں کا حساب لگایا۔' },
            { en: 'Sputnik 1 was first satellite (1957).', ur: 'سپوٹنک 1 پہلا سیٹلائٹ تھا (1957)۔' },
            { en: 'Yuri Gagarin first human in space (1961).', ur: 'یوری گاگارن خلا میں پہلا انسان (1961)۔' },
            { en: 'Apollo 11 first Moon landing (1969).', ur: 'اپولو 11 پہلی چاند لینڈنگ (1969)۔' },
            { en: '12 astronauts walked on Moon.', ur: '12 خلانوردوں نے چاند پر قدم رکھا۔' },
            { en: 'Viking first Mars orbiter/lander.', ur: 'وائکنگ پہلا مریخ مداری جہاز/لینڈر۔' },
            { en: 'Sojourner first Mars rover (1997).', ur: 'سوجورنر پہلا مریخ روور (1997)۔' },
            { en: 'Curiosity on Mars since 2012.', ur: 'کیوروسٹی 2012 سے مریخ پر۔' },
            { en: 'Perseverance searches for ancient life.', ur: 'پرسیویرنس قدیم زندگی تلاش کر رہا ہے۔' },
            { en: 'Ingenuity first helicopter on Mars.', ur: 'انجینیوٹی مریخ پر پہلا ہیلی کاپٹر۔' },
            { en: 'Voyager visited all giant planets.', ur: 'وائیجر نے تمام دیو سیاروں کا دورہ کیا۔' },
            { en: 'Voyager 1 in interstellar space.', ur: 'وائیجر 1 بین النجمی خلا میں۔' },
            { en: 'ISS hosts many countries.', ur: 'آئی ایس ایس کئی ممالک کی میزبانی کرتا ہے۔' },
            { en: 'ISS orbits every 90 minutes.', ur: 'آئی ایس ایس ہر 90 منٹ میں چکر لگاتا ہے۔' },
            { en: 'Astronauts exercise to reduce muscle loss.', ur: 'خلانورد پٹھوں کے نقصان کو کم کرنے کے لیے ورزش کرتے ہیں۔' },
            { en: 'Artemis to land first woman on Moon.', ur: 'آرٹیمس پہلی خاتون کو چاند پر اتارے گا۔' },
            { en: 'Moon testing ground for Mars.', ur: 'چاند مریخ کے لیے ٹیسٹنگ گراؤنڈ۔' },
            { en: 'Gravity assist saves fuel.', ur: 'گریویٹی اسسٹ ایندھن بچاتا ہے۔' },
            { en: 'Space Shuttle flew 135 missions.', ur: 'اسپیس شٹل نے 135 مشنز اڑائے۔' },
            { en: 'James Webb launched 2021.', ur: 'جیمز ویب 2021 میں لانچ ہوا۔' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm flex items-start gap-2" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              <span className="text-lg">💡</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {renderText(fact.en, fact.ur)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 12: Quiz */}
      <section id="quiz">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Test Your Knowledge', 'اپنا علم جانچیں')}
        </h2>
        {!quizStarted ? (
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Ready to test what you learned?', 'کیا آپ جو سیکھا اس کی جانچ کرنے کے لیے تیار ہیں؟')}
            </p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              {renderText(`Best score: ${bestScore}/${quizQuestions.length}`, `بہترین اسکور: ${bestScore}/${quizQuestions.length}`)}
            </p>
            <button onClick={() => setQuizStarted(true)} className="px-6 py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
              {renderText('Start Quiz', 'کوئز شروع کریں')}
            </button>
          </div>
        ) : quizFinished ? (
          <div className="rounded-xl p-6 text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              {renderText('Quiz Complete!', 'کوئز مکمل!')}
            </h3>
            <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
              {score} / {quizQuestions.length}
            </div>
            <div className="flex justify-center gap-6 my-4">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{score}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{language === 'ur' ? 'درست' : 'Correct'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#ef4444' }}>{quizQuestions.length - score}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{language === 'ur' ? 'غلط' : 'Incorrect'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{bestScore}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{language === 'ur' ? 'بہترین' : 'Best'}</div>
              </div>
            </div>
            <button onClick={handleRetry} className="px-6 py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
              {renderText('Retry Quiz', 'دوبارہ کوشش')}
            </button>
          </div>
        ) : (
          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex justify-between items-center mb-4">
              <span style={{ color: 'var(--text-secondary)' }}>
                {renderText(`Question ${currentQuestion + 1} of ${quizQuestions.length}`, `سوال ${currentQuestion + 1} از ${quizQuestions.length}`)}
              </span>
              <span style={{ color: 'var(--accent)' }}>
                {renderText(`Score: ${score}`, `اسکور: ${score}`)}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {renderText(quizQuestions[currentQuestion].question.en, quizQuestions[currentQuestion].question.ur)}
            </h3>
            <div className="space-y-2 mb-4">
              {quizQuestions[currentQuestion].options.map((opt, idx) => {
                let style = { backgroundColor: 'var(--surface-muted)', borderColor: 'var(--border)', color: 'var(--text-primary)' };
                if (showResult) {
                  if (idx === quizQuestions[currentQuestion].correct) {
                    style = { backgroundColor: '#10b98120', borderColor: '#10b981', color: '#10b981' };
                  } else if (idx === selectedAnswer && idx !== quizQuestions[currentQuestion].correct) {
                    style = { backgroundColor: '#ef444420', borderColor: '#ef4444', color: '#ef4444' };
                  }
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={answered}
                    className="w-full text-left px-4 py-3 rounded-lg border"
                    style={style}
                  >
                    {renderText(opt.en, opt.ur)}
                  </button>
                );
              })}
            </div>
            {showResult && (
              <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: selectedAnswer === quizQuestions[currentQuestion].correct ? '#10b98115' : '#ef444415', border: `1px solid ${selectedAnswer === quizQuestions[currentQuestion].correct ? '#10b981' : '#ef4444'}` }}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedAnswer === quizQuestions[currentQuestion].correct ? <CheckCircle size={20} style={{ color: '#10b981' }} /> : <XCircle size={20} style={{ color: '#ef4444' }} />}
                  <span className="font-semibold" style={{ color: selectedAnswer === quizQuestions[currentQuestion].correct ? '#10b981' : '#ef4444' }}>
                    {selectedAnswer === quizQuestions[currentQuestion].correct ? renderText('Correct!', 'درست!') : renderText('Incorrect', 'غلط')}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {renderText(quizQuestions[currentQuestion].explanation.en, quizQuestions[currentQuestion].explanation.ur)}
                </p>
              </div>
            )}
            {answered && (
              <button onClick={handleNext} className="w-full py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                {renderText(currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz', currentQuestion < quizQuestions.length - 1 ? 'اگلا سوال' : 'کوئز مکمل')}
              </button>
            )}
          </div>
        )}
      </section>

      {/* Section 13: Sources */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Sources and Note', 'ماخذ اور نوٹ')}
        </h2>
        <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'Educational note: Mission diagrams simplify real distances and timelines. They are designed to explain sequence, technology and exploration history, not to show exact trajectories.',
              'تعلیمی نوٹ: مشن کے خاکے اصل فاصلے اور ٹائم لائن کو سادہ بناتے ہیں۔ ان کا مقصد ترتیب، ٹیکنالوجی اور دریافت کی تاریخ کو سمجھانا ہے، نہ کہ عین مطابق راستے دکھانا۔'
            )}
          </p>
        </div>
        <div className="space-y-2">
          {['NASA History', 'NASA Science Missions', 'NASA Moon Missions', 'NASA Mars Missions', 'NASA Voyager', 'NASA ISS', 'NASA Artemis', 'NASA A–Z Missions'].map((source, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {source}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
