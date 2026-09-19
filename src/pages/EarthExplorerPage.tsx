import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { BilingualFlowchart } from '../components/BilingualFlowchart';
import { InteractiveDiagram } from '../components/InteractiveDiagram';
import { CheckCircle, XCircle, Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================
// WATER CYCLE ANIMATION COMPONENT
// ============================================
function WaterCycleAnimation() {
  const { language } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);

  const steps = [
    { en: 'Sun heats ocean', ur: 'سورج سمندر کو گرم کرتا ہے', icon: '☀️' },
    { en: 'Evaporation', ur: 'بخارات بننا', icon: '💨' },
    { en: 'Transpiration from plants', ur: 'پودوں سے بخارات', icon: '🌿' },
    { en: 'Condensation → Clouds', ur: 'بادل بننا', icon: '☁️' },
    { en: 'Precipitation', ur: 'بارش یا برف', icon: '🌧️' },
    { en: 'Collection in rivers/lakes', ur: 'دریاؤں/جھیلوں میں جمع', icon: '🏞️' },
    { en: 'Runoff to oceans', ur: 'سمندروں تک بہاؤ', icon: '🌊' }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 2000 / speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed, steps.length]);

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return en;
    if (language === 'ur') return ur;
    return <>{en}<span className="block font-urdu text-xs mt-1" dir="rtl">{ur}</span></>;
  };

  return (
    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
      <div className="relative h-40 mb-4 rounded-lg overflow-hidden" style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #4682B4 50%, #2E8B57 100%)' }}>
        {/* Sun */}
        <div className="absolute top-2 left-2 w-12 h-12 rounded-full" style={{ background: 'radial-gradient(circle, #FFD700, #FFA500)', boxShadow: '0 0 20px #FFD700' }} />
        
        {/* Ocean */}
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(180deg, #4682B4, #1E90FF)' }} />
        
        {/* Clouds */}
        <div className="absolute top-4 right-8 w-20 h-10 rounded-full" style={{ backgroundColor: '#fff', opacity: 0.8 }} />
        <div className="absolute top-6 right-20 w-16 h-8 rounded-full" style={{ backgroundColor: '#fff', opacity: 0.7 }} />
        
        {/* Plants */}
        <div className="absolute bottom-16 left-8 text-2xl">🌿</div>
        <div className="absolute bottom-16 left-20 text-2xl">🌳</div>
        
        {/* Current step indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/70 rounded-lg p-3 text-center">
            <div className="text-3xl mb-1">{steps[currentStep].icon}</div>
            <div className="text-sm font-medium text-white">
              {renderText(steps[currentStep].en, steps[currentStep].ur)}
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full transition-all duration-500" style={{ width: `${((currentStep + 1) / steps.length) * 100}%`, backgroundColor: '#4CAF50' }} />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
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
// PLATE TECTONICS ANIMATION COMPONENT
// ============================================
function PlateTectonicsAnimation() {
  const { language } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { en: 'Earth\'s crust with plates', ur: 'زمین کی کرسٹ پلیٹوں کے ساتھ', icon: '🌍' },
    { en: 'Divergent boundary', ur: 'ڈائورجنٹ باؤنڈری', icon: '↔️' },
    { en: 'New crust forms', ur: 'نئی کرسٹ بنتی ہے', icon: '🔥' },
    { en: 'Convergent boundary', ur: 'کنورجنٹ باؤنڈری', icon: '→←' },
    { en: 'Mountains/volcanoes', ur: 'پہاڑ/آتش فشاں', icon: '🏔️' },
    { en: 'Transform boundary', ur: 'ٹرانسفارم باؤنڈری', icon: '↑↓' },
    { en: 'Earthquakes', ur: 'زلزلے', icon: '💥' }
  ];

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
      <div className="relative h-40 mb-4 rounded-lg overflow-hidden" style={{ background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)' }}>
        {/* Tectonic plates visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Plate 1 */}
            <div className="absolute top-1/4 left-0 w-1/2 h-1/2 rounded" style={{ 
              backgroundColor: '#8B4513',
              border: '2px solid #654321',
              transform: isPlaying ? `translateX(${Math.sin(currentStep * 0.5) * 10}px)` : 'translateX(0)',
              transition: 'transform 0.5s'
            }} />
            {/* Plate 2 */}
            <div className="absolute top-1/4 right-0 w-1/2 h-1/2 rounded" style={{ 
              backgroundColor: '#A0522D',
              border: '2px solid #654321',
              transform: isPlaying ? `translateX(${Math.cos(currentStep * 0.5) * 10}px)` : 'translateX(0)',
              transition: 'transform 0.5s'
            }} />
          </div>
        </div>
        
        {/* Current step indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/70 rounded-lg p-3 text-center">
            <div className="text-3xl mb-1">{steps[currentStep].icon}</div>
            <div className="text-sm font-medium text-white">
              {renderText(steps[currentStep].en, steps[currentStep].ur)}
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full transition-all duration-500" style={{ width: `${((currentStep + 1) / steps.length) * 100}%`, backgroundColor: '#FF6B6B' }} />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
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
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export function EarthExplorerPage() {
  const { language } = useApp();
  
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('sslh-earth-quiz-best');
    return saved ? parseInt(saved) : 0;
  });

  // Continent selection
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

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

  // Continents data
  const continents = [
    {
      id: 'asia',
      name: { en: 'Asia', ur: 'ایشیا' },
      area: '44.58 million km²',
      population: '4.7 billion',
      features: { en: 'Mount Everest, diverse climates, rich cultures', ur: 'ماؤنٹ ایورسٹ، متنوع موسم، امیر ثقافتیں' },
      color: '#FF6B6B'
    },
    {
      id: 'africa',
      name: { en: 'Africa', ur: 'افریقہ' },
      area: '30.37 million km²',
      population: '1.4 billion',
      features: { en: 'Sahara Desert, rich wildlife, diverse resources', ur: 'صحارا صحرا، امیر جنگلی حیات، متنوع وسائل' },
      color: '#4ECDC4'
    },
    {
      id: 'north-america',
      name: { en: 'North America', ur: 'شمالی امریکہ' },
      area: '24.71 million km²',
      population: '579 million',
      features: { en: 'USA, Canada, Mexico, diverse geography', ur: 'امریکہ، کینیڈا، میکسیکو، متنوع جغرافیہ' },
      color: '#45B7D1'
    },
    {
      id: 'south-america',
      name: { en: 'South America', ur: 'جنوبی امریکہ' },
      area: '17.84 million km²',
      population: '423 million',
      features: { en: 'Amazon Rainforest, Andes mountains', ur: 'ایمیزون بارانی جنگل، اینڈیز پہاڑ' },
      color: '#96CEB4'
    },
    {
      id: 'antarctica',
      name: { en: 'Antarctica', ur: 'انٹارکٹکا' },
      area: '14.20 million km²',
      population: '~1,000-5,000 (researchers)',
      features: { en: 'Coldest continent, covered in ice', ur: 'سب سے ٹھنڈا براعظم، برف سے ڈھکا' },
      color: '#DDA0DD'
    },
    {
      id: 'europe',
      name: { en: 'Europe', ur: 'یورپ' },
      area: '10.18 million km²',
      population: '746 million',
      features: { en: 'Many countries, rich history, diverse landscapes', ur: 'بہت سے ممالک، امیر تاریخ، متنوع خطے' },
      color: '#FFEAA7'
    },
    {
      id: 'australia',
      name: { en: 'Australia/Oceania', ur: 'آسٹریلیا/اوشیانا' },
      area: '8.53 million km²',
      population: '43 million',
      features: { en: 'Smallest continent, unique wildlife', ur: 'سب سے چھوٹا براعظم، منفرد جنگلی حیات' },
      color: '#FFA07A'
    }
  ];

  // Quiz questions
  const quizQuestions = [
    { question: { en: 'What percentage of Earth\'s surface is water?', ur: 'زمین کی سطح کا کتنا فیصد پانی ہے؟' }, options: [{ en: '50%', ur: '۵۰٪' }, { en: '71%', ur: '۷۱٪' }, { en: '90%', ur: '۹۰٪' }, { en: '30%', ur: '۳۰٪' }], correct: 1, explanation: { en: 'About 71% of Earth\'s surface is covered by water.', ur: 'زمین کی سطح کا تقریباً 71% حصہ پانی سے ڈھکا ہوا ہے۔' } },
    { question: { en: 'Two main gases in atmosphere?', ur: 'فضا میں دو مرکزی گیسیں؟' }, options: [{ en: 'Oxygen and CO2', ur: 'آکسیجن اور CO2' }, { en: 'Nitrogen and Oxygen', ur: 'نائٹروجن اور آکسیجن' }, { en: 'Hydrogen and Helium', ur: 'ہائیڈروجن اور ہیلیم' }, { en: 'Methane and Nitrogen', ur: 'میتھین اور نائٹروجن' }], correct: 1, explanation: { en: 'Earth\'s atmosphere is 78% nitrogen, 21% oxygen.', ur: 'زمین کی فضا 78% نائٹروجن، 21% آکسیجن ہے۔' } },
    { question: { en: 'Which layer is liquid metal?', ur: 'کون سی تہہ مائع دھات ہے؟' }, options: [{ en: 'Inner core', ur: 'اندرونی مرکزہ' }, { en: 'Outer core', ur: 'بیرونی مرکزہ' }, { en: 'Mantle', ur: 'مینٹل' }, { en: 'Crust', ur: 'کرسٹ' }], correct: 1, explanation: { en: 'The outer core is liquid metal (iron and nickel).', ur: 'بیرونی مرکزہ مائع دھات (لوہا اور نکل) ہے۔' } },
    { question: { en: 'What drives the water cycle?', ur: 'آبی چکر کو کیا چلاتا ہے؟' }, options: [{ en: 'Moon', ur: 'چاند' }, { en: 'Sun\'s heat', ur: 'سورج کی حرارت' }, { en: 'Wind', ur: 'ہوا' }, { en: 'Gravity only', ur: 'صرف کششِ ثقل' }], correct: 1, explanation: { en: 'The Sun\'s heat drives evaporation in the water cycle.', ur: 'سورج کی حرارت آبی چکر میں بخارات بننے کو چلاتی ہے۔' } },
    { question: { en: 'What is transpiration?', ur: 'ٹرانسپائریشن کیا ہے؟' }, options: [{ en: 'Water evaporating from plants', ur: 'پودوں سے پانی کا بخارات بننا' }, { en: 'Rain falling', ur: 'بارش گرنا' }, { en: 'Water freezing', ur: 'پانی کا جمنا' }, { en: 'Clouds forming', ur: 'بادل بننا' }], correct: 0, explanation: { en: 'Transpiration is water vapor released by plants.', ur: 'ٹرانسپائریشن پودوں سے خارج ہونے والے پانی کے بخارات ہیں۔' } },
    { question: { en: 'How many continents?', ur: 'کتنے براعظم ہیں؟' }, options: [{ en: '5', ur: '۵' }, { en: '6', ur: '۶' }, { en: '7', ur: '۷' }, { en: '8', ur: '۸' }], correct: 2, explanation: { en: 'Earth has seven continents.', ur: 'زمین کے سات براعظم ہیں۔' } },
    { question: { en: 'Largest continent?', ur: 'سب سے بڑا براعظم؟' }, options: [{ en: 'Africa', ur: 'افریقہ' }, { en: 'Asia', ur: 'ایشیا' }, { en: 'North America', ur: 'شمالی امریکہ' }, { en: 'Europe', ur: 'یورپ' }], correct: 1, explanation: { en: 'Asia is the largest continent.', ur: 'ایشیا سب سے بڑا براعظم ہے۔' } },
    { question: { en: 'What causes earthquakes?', ur: 'زلزلے کس کی وجہ سے آتے ہیں؟' }, options: [{ en: 'Wind', ur: 'ہوا' }, { en: 'Plate tectonics', ur: 'پلیٹ ٹیکٹونکس' }, { en: 'Rain', ur: 'بارش' }, { en: 'Sun', ur: 'سورج' }], correct: 1, explanation: { en: 'Earthquakes occur at tectonic plate boundaries.', ur: 'زلزلے ٹیکٹونک پلیٹ باؤنڈریز پر آتے ہیں۔' } },
    { question: { en: 'What are tectonic plates?', ur: 'ٹیکٹونک پلیٹس کیا ہیں؟' }, options: [{ en: 'Clouds', ur: 'بادل' }, { en: 'Large pieces of Earth\'s crust', ur: 'زمین کی کرسٹ کے بڑے ٹکڑے' }, { en: 'Ocean waves', ur: 'سمندری لہریں' }, { en: 'Mountains', ur: 'پہاڑ' }], correct: 1, explanation: { en: 'Tectonic plates are large pieces of Earth\'s crust.', ur: 'ٹیکٹونک پلیٹس زمین کی کرسٹ کے بڑے ٹکڑے ہیں۔' } },
    { question: { en: 'At divergent boundaries?', ur: 'ڈائورجنٹ باؤنڈریز پر؟' }, options: [{ en: 'Plates collide', ur: 'پلیٹس ٹکراتی ہیں' }, { en: 'Plates move apart, new crust forms', ur: 'پلیٹس الگ ہوتی ہیں، نئی کرسٹ بنتی ہے' }, { en: 'Plates slide past', ur: 'پلیٹس پھسلتی ہیں' }, { en: 'Nothing happens', ur: 'کچھ نہیں ہوتا' }], correct: 1, explanation: { en: 'At divergent boundaries, plates move apart and new crust forms.', ur: 'ڈائورجنٹ باؤنڈریز پر پلیٹس الگ ہوتی ہیں اور نئی کرسٹ بنتی ہے۔' } },
    { question: { en: 'At convergent boundaries?', ur: 'کنورجنٹ باؤنڈریز پر؟' }, options: [{ en: 'Plates move apart', ur: 'پلیٹس الگ ہوتی ہیں' }, { en: 'Plates collide, mountains/volcanoes form', ur: 'پلیٹس ٹکراتی ہیں، پہاڑ/آتش فشاں بنتے ہیں' }, { en: 'Plates slide past', ur: 'پلیٹس پھسلتی ہیں' }, { en: 'Nothing', ur: 'کچھ نہیں' }], correct: 1, explanation: { en: 'At convergent boundaries, plates collide forming mountains or volcanoes.', ur: 'کنورجنٹ باؤنڈریز پر پلیٹس ٹکراتی ہیں جس سے پہاڑ یا آتش فشاں بنتے ہیں۔' } },
    { question: { en: 'Ozone layer function?', ur: 'اوزون کی تہہ کا کام؟' }, options: [{ en: 'Provides oxygen', ur: 'آکسیجن فراہم کرتی ہے' }, { en: 'Absorbs harmful UV radiation', ur: 'نقصان دہ UV تابکاری جذب کرتی ہے' }, { en: 'Creates weather', ur: 'موسم بناتی ہے' }, { en: 'Nothing', ur: 'کچھ نہیں' }], correct: 1, explanation: { en: 'The ozone layer absorbs harmful ultraviolet radiation.', ur: 'اوزون کی تہہ نقصان دہ الٹرا وائلٹ تابکاری کو جذب کرتی ہے۔' } },
    { question: { en: 'Which climate zone is warm year-round?', ur: 'کون سا آب و ہوا علاقہ سال بھر گرم ہے؟' }, options: [{ en: 'Polar', ur: 'پولر' }, { en: 'Temperate', ur: 'معتدل' }, { en: 'Tropical', ur: 'استوائی' }, { en: 'Desert', ur: 'صحرا' }], correct: 2, explanation: { en: 'Tropical zones near the equator are warm year-round.', ur: 'استوا کے قریب استوائی علاقے سال بھر گرم ہوتے ہیں۔' } },
    { question: { en: 'What % of Earth\'s water is freshwater?', ur: 'زمین کے پانی کا کتنا فیصد تازہ پانی ہے؟' }, options: [{ en: '50%', ur: '۵۰٪' }, { en: '25%', ur: '۲۵٪' }, { en: 'About 3%', ur: 'تقریباً ۳٪' }, { en: '10%', ur: '۱۰٪' }], correct: 2, explanation: { en: 'Only about 3% of Earth\'s water is freshwater.', ur: 'زمین کے پانی کا صرف تقریباً 3% تازہ پانی ہے۔' } },
    { question: { en: 'Where is most freshwater stored?', ur: 'زیادہ تر تازہ پانی کہاں محفوظ ہے؟' }, options: [{ en: 'Rivers', ur: 'دریاؤں میں' }, { en: 'Ice caps and glaciers', ur: 'برفی چوٹیوں اور گلیشیئرز میں' }, { en: 'Lakes', ur: 'جھیلوں میں' }, { en: 'Groundwater', ur: 'زیر زمین پانی میں' }], correct: 1, explanation: { en: 'Most freshwater is stored in ice caps and glaciers.', ur: 'زیادہ تر تازہ پانی برفی چوٹیوں اور گلیشیئرز میں محفوظ ہے۔' } },
    { question: { en: 'Highest point on Earth?', ur: 'زمین کا بلند ترین نقطہ؟' }, options: [{ en: 'Mariana Trench', ur: 'ماریانا ٹرینچ' }, { en: 'Mount Everest', ur: 'ماؤنٹ ایورسٹ' }, { en: 'K2', ur: 'کے 2' }, { en: 'Kilimanjaro', ur: 'کلیمانجارو' }], correct: 1, explanation: { en: 'Mount Everest is the highest point on Earth.', ur: 'ماؤنٹ ایورسٹ زمین کا بلند ترین نقطہ ہے۔' } },
    { question: { en: 'Deepest point on Earth?', ur: 'زمین کا گہرائی ترین نقطہ؟' }, options: [{ en: 'Mount Everest', ur: 'ماؤنٹ ایورسٹ' }, { en: 'Mariana Trench', ur: 'ماریانا ٹرینچ' }, { en: 'Grand Canyon', ur: 'گرینڈ کینین' }, { en: 'Dead Sea', ur: 'مردار سمندر' }], correct: 1, explanation: { en: 'The Mariana Trench is the deepest point on Earth.', ur: 'ماریانا ٹرینچ زمین کا گہرائی ترین نقطہ ہے۔' } },
    { question: { en: 'What are fossil fuels?', ur: 'فوسل فیول کیا ہیں؟' }, options: [{ en: 'Renewable energy', ur: 'قابلِ تجدید توانائی' }, { en: 'Coal, oil, natural gas', ur: 'کوئلہ، تیل، قدرتی گیس' }, { en: 'Solar panels', ur: 'شمسی پینل' }, { en: 'Wind turbines', ur: 'ہوا ٹربائنز' }], correct: 1, explanation: { en: 'Fossil fuels are coal, oil, and natural gas.', ur: 'فوسل فیول کوئلہ، تیل اور قدرتی گیس ہیں۔' } },
    { question: { en: 'Two renewable energy sources?', ur: 'دو قابلِ تجدید توانائی کے ذرائع؟' }, options: [{ en: 'Coal and oil', ur: 'کوئلہ اور تیل' }, { en: 'Solar and wind', ur: 'شمسی اور ہوا' }, { en: 'Gas and coal', ur: 'گیس اور کوئلہ' }, { en: 'Nuclear and gas', ur: 'جوہری اور گیس' }], correct: 1, explanation: { en: 'Solar and wind are renewable energy sources.', ur: 'شمسی اور ہوا قابلِ تجدید توانائی کے ذرائع ہیں۔' } },
    { question: { en: 'Earth rotation time?', ur: 'زمین کی گردش کا وقت؟' }, options: [{ en: '12 hours', ur: '۱۲ گھنٹے' }, { en: '24 hours', ur: '۲۴ گھنٹے' }, { en: '48 hours', ur: '۴۸ گھنٹے' }, { en: '1 week', ur: '۱ ہفتہ' }], correct: 1, explanation: { en: 'Earth rotates once every 24 hours.', ur: 'زمین ہر 24 گھنٹوں میں ایک بار گھومتی ہے۔' } },
    { question: { en: 'Earth orbit time?', ur: 'زمین کے مدار کا وقت؟' }, options: [{ en: '24 hours', ur: '۲۴ گھنٹے' }, { en: '30 days', ur: '۳۰ دن' }, { en: '365.25 days', ur: '۳۶۵.۲۵ دن' }, { en: '100 days', ur: '۱۰۰ دن' }], correct: 2, explanation: { en: 'Earth orbits the Sun in about 365.25 days.', ur: 'زمین تقریباً 365.25 دنوں میں سورج کا چکر لگاتی ہے۔' } },
    { question: { en: 'How old is Earth?', ur: 'زمین کتنی پرانی ہے؟' }, options: [{ en: '1 million years', ur: '۱۰ لاکھ سال' }, { en: '100 million years', ur: '۱۰ کروڑ سال' }, { en: '4.5 billion years', ur: '۴.۵ ارب سال' }, { en: '10 billion years', ur: '۱۰ ارب سال' }], correct: 2, explanation: { en: 'Earth is about 4.5 billion years old.', ur: 'زمین تقریباً 4.5 ارب سال پرانی ہے۔' } },
    { question: { en: 'What protects Earth from solar radiation?', ur: 'زمین کو شمسی تابکاری سے کیا بچاتا ہے؟' }, options: [{ en: 'Clouds', ur: 'بادل' }, { en: 'Atmosphere and magnetic field', ur: 'فضا اور مقناطیسی میدان' }, { en: 'Moon', ur: 'چاند' }, { en: 'Nothing', ur: 'کچھ نہیں' }], correct: 1, explanation: { en: 'Earth\'s atmosphere and magnetic field protect from solar radiation.', ur: 'زمین کی فضا اور مقناطیسی میدان شمسی تابکاری سے بچاتے ہیں۔' } },
    { question: { en: 'Why sustainable resource use?', ur: 'پائیدار وسائل کا استعمال کیوں؟' }, options: [{ en: 'For fun', ur: 'تفریح کے لیے' }, { en: 'To protect Earth for future generations', ur: 'آنے والی نسلوں کے لیے زمین کا تحفظ' }, { en: 'No reason', ur: 'کوئی وجہ نہیں' }, { en: 'Only for money', ur: 'صرف پیسے کے لیے' }], correct: 1, explanation: { en: 'Sustainable use protects Earth for future generations.', ur: 'پائیدار استعمال آنے والی نسلوں کے لیے زمین کا تحفظ کرتا ہے۔' } }
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
        localStorage.setItem('sslh-earth-quiz-best', newScore.toString());
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

  return (
    <div className="space-y-12 pb-8">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {renderText('Earth Explorer — Our Home Planet', 'ارتھ ایکسپلورر — ہمارا گھریلو سیارہ')}
        </h1>
      </div>

      {/* Hero Section */}
      <section className="rounded-2xl overflow-hidden border p-6 md:p-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Discover Earth — The Blue Marble', 'زمین کو دریافت کریں — نیلا سنگمرمر')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Earth is the only known planet with life. It has liquid water on its surface, a protective atmosphere and diverse environments from icy poles to tropical rainforests. Understanding Earth helps us appreciate our home and protect it for future generations.',
            'زمین واحد معلوم سیارہ ہے جہاں زندگی موجود ہے۔ اس کی سطح پر مائع پانی، ایک حفاظتی فضا اور برفیلی قطبین سے لے کر استوائی بارانی جنگلات تک متنوع ماحول موجود ہیں۔ زمین کو سمجھنے سے ہمیں اپنے گھر کی قدر کرنے اور آنے والی نسلوں کے لیے اس کے تحفظ میں مدد ملتی ہے۔'
          )}
        </p>
        
        {/* Earth Visual */}
        <div className="flex justify-center mb-6">
          <div className="w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #4a90d9 70%, #1a3a5c)', boxShadow: '0 0 40px rgba(74, 144, 217, 0.4)' }} />
        </div>
        <p className="text-xs italic text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Earth from space — The Blue Marble.', 'خلا سے زمین — نیلا سنگمرمر۔')}
          <br />
          {renderText('Source: NASA', 'ماخذ: ناسا')}
        </p>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { en: 'Structure', ur: 'ساخت', id: 'structure' },
            { en: 'Atmosphere', ur: 'فضا', id: 'atmosphere' },
            { en: 'Oceans', ur: 'سمندر', id: 'oceans' },
            { en: 'Continents', ur: 'براعظم', id: 'continents' },
            { en: 'Plate Tectonics', ur: 'پلیٹ ٹیکٹونکس', id: 'tectonics' },
            { en: 'Climate', ur: 'آب و ہوا', id: 'climate' },
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

      {/* Section 1: Earth's Structure */}
      <section id="structure">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Earth\'s Internal Structure', 'زمین کی اندرونی ساخت')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Earth is made up of several layers. The inner core is a solid ball of iron and nickel. The outer core is liquid metal. The mantle is thick rock that flows slowly over time. The crust is the thin, solid outer layer where we live.',
            'زمین کئی تہوں پر مشتمل ہے۔ اندرونی مرکزہ لوہے اور نکل کا ٹھوس گولا ہے۔ بیرونی مرکزہ مائع دھات ہے۔ مینٹل موٹا پتھر ہے جو وقت کے ساتھ آہستہ آہستہ بہتا ہے۔ کرسٹ پتلی، ٹھوس بیرونی تہہ ہے جہاں ہم رہتے ہیں۔'
          )}
        </p>

        {/* Earth Layers Diagram */}
        <InteractiveDiagram
          labels={[
            { id: 'inner-core', x: 50, y: 50, en: 'Inner Core', ur: 'اندرونی مرکزہ', description: { en: 'Solid iron and nickel, ~5,400°C', ur: 'ٹھوس لوہا اور نکل، تقریباً ۵،۴۰۰ ڈگری' } },
            { id: 'outer-core', x: 50, y: 30, en: 'Outer Core', ur: 'بیرونی مرکزہ', description: { en: 'Liquid metal, creates magnetic field', ur: 'مائع دھات، مقناطیسی میدان بناتی ہے' } },
            { id: 'mantle', x: 30, y: 30, en: 'Mantle', ur: 'مینٹل', description: { en: 'Thick rock, convection drives plates', ur: 'موٹا پتھر، کنویکشن پلیٹس چلاتا ہے' } },
            { id: 'crust', x: 70, y: 20, en: 'Crust', ur: 'کرسٹ', description: { en: 'Thin solid layer, 5-70 km thick', ur: 'پتلی ٹھوس تہہ، ۵-۷۰ کلومیٹر موٹی' } }
          ]}
          title={{ en: 'Earth Layers', ur: 'زمین کی تہیں' }}
          showNotToScale={true}
          fallbackGradient="radial-gradient(circle at 50% 50%, #FF4500 10%, #FF6347 20%, #FF8C00 40%, #8B4513 60%, #654321 80%, #2E8B57)"
        />

        {/* Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { en: 'Inner core: ~5,400°C', ur: 'اندرونی مرکزہ: تقریباً ۵،۴۰۰ ڈگری' },
            { en: 'Outer core: liquid metal', ur: 'بیرونی مرکزہ: مائع دھات' },
            { en: 'Mantle: convection', ur: 'مینٹل: کنویکشن' },
            { en: 'Crust: 5-70 km', ur: 'کرسٹ: ۵-۷۰ کلومیٹر' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              {renderText(fact.en, fact.ur)}
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Atmosphere */}
      <section id="atmosphere">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Earth\'s Atmosphere', 'زمین کی فضا')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Earth\'s atmosphere is a layer of gases surrounding the planet. It contains nitrogen (about 78%), oxygen (about 21%) and small amounts of other gases. The atmosphere protects us from harmful solar radiation, helps regulate temperature and provides the air we breathe.',
            'زمین کی فضا سیارے کے گرد گیسوں کی ایک تہہ ہے۔ اس میں نائٹروجن (تقریباً 78%)، آکسیجن (تقریباً 21%) اور دیگر گیسوں کی چھوٹی مقدار موجود ہے۔ فضا ہمیں نقصان دہ شمسی تابکاری سے بچاتی ہے، درجہ حرارت کو منظم کرنے میں مدد دیتی ہے اور وہ ہوا فراہم کرتی ہے جو ہم سانس لیتے ہیں۔'
          )}
        </p>

        {/* Atmosphere Layers */}
        <InteractiveDiagram
          labels={[
            { id: 'troposphere', x: 50, y: 80, en: 'Troposphere', ur: 'ٹروپوسفیئر', description: { en: '0-12 km, weather occurs here', ur: '۰-۱۲ کلومیٹر، موسم یہاں ہوتا ہے' } },
            { id: 'stratosphere', x: 50, y: 65, en: 'Stratosphere', ur: 'سٹریٹوسفیئر', description: { en: '12-50 km, ozone layer', ur: '۱۲-۵۰ کلومیٹر، اوزون کی تہہ' } },
            { id: 'mesosphere', x: 50, y: 50, en: 'Mesosphere', ur: 'میسوسفیئر', description: { en: '50-80 km, meteors burn', ur: '۵۰-۸۰ کلومیٹر، شہاب جلتے ہیں' } },
            { id: 'thermosphere', x: 50, y: 35, en: 'Thermosphere', ur: 'تھرموسفیئر', description: { en: '80-700 km, auroras', ur: '۸۰-۷۰۰ کلومیٹر، شفق' } },
            { id: 'exosphere', x: 50, y: 20, en: 'Exosphere', ur: 'ایکسوسفیئر', description: { en: '700+ km, edge of space', ur: '۷۰۰+ کلومیٹر، خلا کا کنارہ' } }
          ]}
          title={{ en: 'Atmosphere Layers', ur: 'فضا کی تہیں' }}
          showNotToScale={true}
          fallbackGradient="linear-gradient(180deg, #000033 0%, #000066 20%, #000099 40%, #4169E1 60%, #87CEEB 80%, #E0F6FF)"
        />

        <div className="p-4 rounded-lg mt-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'The ozone layer in the stratosphere absorbs harmful ultraviolet radiation.',
              'سٹریٹوسفیئر میں موجود اوزون کی تہہ نقصان دہ الٹرا وائلٹ تابکاری کو جذب کرتی ہے۔'
            )}
          </p>
        </div>
      </section>

      {/* Section 3: Oceans */}
      <section id="oceans">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Oceans and Water', 'سمندر اور پانی')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'About 71% of Earth\'s surface is covered by water, mostly in oceans. Oceans regulate climate, provide food and support diverse ecosystems. Freshwater is found in rivers, lakes, groundwater and ice. Only a small fraction of Earth\'s water is freshwater available for human use.',
            'زمین کی سطح کا تقریباً 71% حصہ پانی سے ڈھکا ہوا ہے، جو زیادہ تر سمندروں میں ہے۔ سمندر موسم کو منظم کرتے ہیں، خوراک فراہم کرتے ہیں اور متنوع ماحولیاتی نظام کی حمایت کرتے ہیں۔ تازہ پانی دریاؤں، جھیلوں، زیرِ زمین پانی اور برف میں پایا جاتا ہے۔ زمین کے پانی کا صرف ایک چھوٹا سا حصہ انسانی استعمال کے لیے دستیاب تازہ پانی ہے۔'
          )}
        </p>

        {/* World Oceans */}
        <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          {renderText('Five Oceans', 'پانچ سمندر')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { en: 'Pacific', ur: 'بحرالکاہل', size: '168.7M km²' },
            { en: 'Atlantic', ur: 'بحر اوقیانوس', size: '85.1M km²' },
            { en: 'Indian', ur: 'بحر ہند', size: '70.6M km²' },
            { en: 'Southern', ur: 'جنوبی بحر', size: '21.1M km²' },
            { en: 'Arctic', ur: 'شمالی بحر', size: '15.6M km²' }
          ].map((ocean, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="text-2xl mb-2">🌊</div>
              <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? ocean.ur : ocean.en}
                {language === 'both' && <span className="block font-urdu text-xs" dir="rtl">{ocean.ur}</span>}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{ocean.size}</div>
            </div>
          ))}
        </div>

        {/* Freshwater Distribution */}
        <h3 className="text-lg font-bold mb-3 mt-6" style={{ color: 'var(--text-primary)' }}>
          {renderText('Freshwater Distribution', 'تازہ پانی کی تقسیم')}
        </h3>
        <div className="space-y-2">
          {[
            { en: 'Oceans (saltwater)', ur: 'سمندر (کھارا پانی)', percent: 97, color: '#4682B4' },
            { en: 'Ice caps and glaciers', ur: 'برفی چوٹیاں اور گلیشیئر', percent: 2, color: '#87CEEB' },
            { en: 'Groundwater', ur: 'زیر زمین پانی', percent: 0.6, color: '#4169E1' },
            { en: 'Rivers and lakes', ur: 'دریا اور جھیلیں', percent: 0.01, color: '#1E90FF' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-32 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? item.ur : item.en}
                {language === 'both' && <span className="block font-urdu text-xs" dir="rtl">{item.ur}</span>}
              </div>
              <div className="flex-1 h-6 rounded" style={{ backgroundColor: 'var(--surface-muted)' }}>
                <div className="h-full rounded flex items-center px-2" style={{ width: `${Math.max(2, item.percent)}%`, backgroundColor: item.color, color: '#fff' }}>
                  <span className="text-xs font-bold">{item.percent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Water Cycle Animation */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('The Water Cycle', 'آبی چکر')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The water cycle describes how water moves between oceans, atmosphere and land. Heat from the Sun causes evaporation from oceans, lakes and rivers. Plants release water vapor through transpiration. Water vapor condenses into clouds, falls as precipitation (rain or snow), and collects in rivers, lakes, soil and groundwater before evaporating again.',
            'آبی چکر بیان کرتا ہے کہ پانی سمندروں، فضا اور خشکی کے درمیان کیسے حرکت کرتا ہے۔ سورج کی حرارت سمندروں، جھیلوں اور دریاؤں سے بخارات بناتی ہے۔ پودے ٹرانسپائریشن کے ذریعے پانی کے بخارات خارج کرتے ہیں۔ پانی کے بخارات بادل بناتے ہیں، بارش یا برف کی صورت میں گرتے ہیں، اور دریاؤں، جھیلوں، مٹی اور زیرِ زمین پانی میں جمع ہوتے ہیں قبل اس کے کہ دوبارہ بخارات بنیں۔'
          )}
        </p>

        <WaterCycleAnimation />

        {/* Process Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {[
            { en: 'Evaporation', ur: 'بخارات بننا', icon: '💨' },
            { en: 'Transpiration', ur: 'پودوں سے بخارات', icon: '🌿' },
            { en: 'Condensation', ur: 'بادل بننا', icon: '☁️' },
            { en: 'Precipitation', ur: 'بارش یا برف', icon: '🌧️' },
            { en: 'Collection', ur: 'جمع ہونا', icon: '🏞️' },
            { en: 'Runoff', ur: 'بہاؤ', icon: '🌊' }
          ].map((process, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="text-2xl mb-2">{process.icon}</div>
              <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? process.ur : process.en}
                {language === 'both' && <span className="block font-urdu text-xs" dir="rtl">{process.ur}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Continents */}
      <section id="continents">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Continents', 'براعظم')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Earth has seven continents: Asia, Africa, North America, South America, Antarctica, Europe and Australia/Oceania. Continents have diverse landscapes, climates and ecosystems. They are home to most of Earth\'s human population and many different cultures.',
            'زمین کے سات براعظم ہیں: ایشیا، افریقہ، شمالی امریکہ، جنوبی امریکہ، انٹارکٹکا، یورپ اور آسٹریلیا/اوشیانا۔ براعظموں میں متنوع خطے، موسم اور ماحولیاتی نظام ہیں۔ یہ زمین کی زیادہ تر انسانی آبادی اور بہت سی مختلف تہذیبوں کا گھر ہیں۔'
          )}
        </p>

        {/* Continent Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {continents.map((continent) => (
            <button
              key={continent.id}
              onClick={() => setSelectedContinent(continent.id === selectedContinent ? null : continent.id)}
              className="p-3 rounded-xl text-center transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--surface)', border: selectedContinent === continent.id ? `2px solid ${continent.color}` : '1px solid var(--border)' }}
            >
              <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ backgroundColor: continent.color }} />
              <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? continent.name.ur : continent.name.en}
                {language === 'both' && <span className="block font-urdu text-xs" dir="rtl">{continent.name.ur}</span>}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Continent Detail */}
        {selectedContinent && (
          <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
            {(() => {
              const continent = continents.find(c => c.id === selectedContinent);
              if (!continent) return null;
              return (
                <>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {language === 'ur' ? continent.name.ur : continent.name.en}
                    {language === 'both' && <span className="block font-urdu" dir="rtl">{continent.name.ur}</span>}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="font-medium" style={{ color: 'var(--text-secondary)' }}>{renderText('Area:', 'رقبہ:')}</div>
                      <div style={{ color: 'var(--text-primary)' }}>{continent.area}</div>
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: 'var(--text-secondary)' }}>{renderText('Population:', 'آبادی:')}</div>
                      <div style={{ color: 'var(--text-primary)' }}>{continent.population}</div>
                    </div>
                  </div>
                  <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                    {renderText(continent.features.en, continent.features.ur)}
                  </p>
                </>
              );
            })()}
          </div>
        )}
      </section>

      {/* Section 6: Plate Tectonics */}
      <section id="tectonics">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Plate Tectonics', 'پلیٹ ٹیکٹونکس')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Earth\'s crust is broken into large pieces called tectonic plates. These plates float on the mantle and move slowly over time. Plate movements cause earthquakes, volcanoes and mountain building. There are three main types of plate boundaries: divergent, convergent and transform.',
            'زمین کی کرسٹ ٹیکٹونک پلیٹس نامی بڑے ٹکڑوں میں ٹوٹی ہوئی ہے۔ یہ پلیٹس مینٹل پر تیرتی ہیں اور وقت کے ساتھ آہستہ آہستہ حرکت کرتی ہیں۔ پلیٹوں کی حرکت زلزلے، آتش فشاں اور پہاڑوں کی تشکیل کا سبب بنتی ہے۔ پلیٹ باؤنڈریز کی تین بڑی اقسام ہیں: ڈائورجنٹ، کنورجنٹ اور ٹرانسفارم۔'
          )}
        </p>

        <PlateTectonicsAnimation />

        {/* Boundary Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {[
            { en: 'Divergent', ur: 'ڈائورجنٹ', desc: { en: 'Plates move apart', ur: 'پلیٹس الگ ہوتی ہیں' }, icon: '↔️' },
            { en: 'Convergent', ur: 'کنورجنٹ', desc: { en: 'Plates collide', ur: 'پلیٹس ٹکراتی ہیں' }, icon: '→←' },
            { en: 'Transform', ur: 'ٹرانسفارم', desc: { en: 'Plates slide past', ur: 'پلیٹس پھسلتی ہیں' }, icon: '↑↓' }
          ].map((boundary, i) => (
            <div key={i} className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="text-2xl mb-2">{boundary.icon}</div>
              <div className="font-bold" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? boundary.ur : boundary.en}
                {language === 'both' && <span className="block font-urdu text-sm" dir="rtl">{boundary.ur}</span>}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                {renderText(boundary.desc.en, boundary.desc.ur)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Climate Zones */}
      <section id="climate">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Climate Zones', 'آب و ہوا کے علاقے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Earth has different climate zones based on temperature and precipitation. Tropical zones near the equator are warm year-round. Polar zones near the poles are cold. Temperate zones have moderate temperatures with distinct seasons. Deserts are dry, while rainforests are wet and warm.',
            'زمین کے درجہ حرارت اور بارش کی بنیاد پر مختلف آب و ہوا کے علاقے ہیں۔ استوا کے قریب استوائی علاقے سال بھر گرم ہوتے ہیں۔ قطبین کے قریب پولر علاقے سرد ہوتے ہیں۔ معتدل علاقوں میں درمیانہ درجہ حرارت اور واضح موسم ہوتے ہیں۔ صحرا خشک ہوتے ہیں، جبکہ بارانی جنگل نم اور گرم ہوتے ہیں۔'
          )}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { en: 'Tropical', ur: 'استوائی', color: '#FF6B6B', temp: 'Warm' },
            { en: 'Dry', ur: 'خشک', color: '#FFA500', temp: 'Hot/Cold' },
            { en: 'Temperate', ur: 'معتدل', color: '#4ECDC4', temp: 'Moderate' },
            { en: 'Continental', ur: 'براعظمی', color: '#45B7D1', temp: 'Variable' },
            { en: 'Polar', ur: 'پولر', color: '#DDA0DD', temp: 'Cold' }
          ].map((zone, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ backgroundColor: zone.color }} />
              <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? zone.ur : zone.en}
                {language === 'both' && <span className="block font-urdu text-xs" dir="rtl">{zone.ur}</span>}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{zone.temp}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: Natural Resources */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Natural Resources', 'قدرتی وسائل')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Earth provides natural resources that humans use for survival and development. These include water, soil, forests, minerals, fossil fuels and renewable energy sources like solar and wind. Sustainable use of resources is essential for protecting Earth for future generations.',
            'زمین قدرتی وسائل فراہم کرتی ہے جو انسان بقا اور ترقی کے لیے استعمال کرتے ہیں۔ ان میں پانی، مٹی، جنگلات، معدنیات، فوسل فیول اور شمسی اور ہوا جیسے قابلِ تجدید توانائی کے ذرائع شامل ہیں۔ آنے والی نسلوں کے لیے زمین کے تحفظ کے لیے وسائل کا پائیدار استعمال انتہائی ضروری ہے۔'
          )}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { en: 'Water', ur: 'پانی', icon: '💧' },
            { en: 'Soil', ur: 'مٹی', icon: '🌱' },
            { en: 'Forests', ur: 'جنگلات', icon: '🌳' },
            { en: 'Minerals', ur: 'معدنیات', icon: '💎' },
            { en: 'Fossil Fuels', ur: 'فوسل فیول', icon: '⛽' },
            { en: 'Renewable Energy', ur: 'قابلِ تجدید توانائی', icon: '☀️' }
          ].map((resource, i) => (
            <div key={i} className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="text-3xl mb-2">{resource.icon}</div>
              <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? resource.ur : resource.en}
                {language === 'both' && <span className="block font-urdu text-xs" dir="rtl">{resource.ur}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: Image Carousel */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Explore Earth Through Images', 'تصویروں کے ذریعے زمین کو دریافت کریں')}
        </h2>
        <EducationalCarousel
          slides={[
            { imageUrl: '', captionEn: 'Earth from space - Blue Marble', captionUr: 'خلا سے زمین - نیلا سنگمرمر', credit: 'NASA', fallbackGradient: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' },
            { imageUrl: '', captionEn: 'Earth layers diagram', captionUr: 'زمین کی تہوں کا خاکہ', credit: 'Educational diagram', fallbackGradient: 'radial-gradient(circle, #FF4500, #8B4513, #2E8B57)' },
            { imageUrl: '', captionEn: 'Atmosphere layers', captionUr: 'فضا کی تہیں', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(180deg, #000033, #87CEEB)' },
            { imageUrl: '', captionEn: 'World oceans map', captionUr: 'عالمی سمندروں کا نقشہ', credit: 'NASA/NOAA', fallbackGradient: 'radial-gradient(circle, #4682B4, #1E90FF)' },
            { imageUrl: '', captionEn: 'Freshwater distribution', captionUr: 'تازہ پانی کی تقسیم', credit: 'USGS', fallbackGradient: 'linear-gradient(90deg, #4682B4, #87CEEB)' },
            { imageUrl: '', captionEn: 'Water cycle diagram', captionUr: 'آبی چکر کا خاکہ', credit: 'NASA', fallbackGradient: 'linear-gradient(180deg, #87CEEB, #4682B4, #2E8B57)' },
            { imageUrl: '', captionEn: 'World continents', captionUr: 'عالمی براعظم', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #2E8B57, #4682B4)' },
            { imageUrl: '', captionEn: 'Asia highlight', captionUr: 'ایشیا', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #FF6B6B, #2E8B57)' },
            { imageUrl: '', captionEn: 'Africa highlight', captionUr: 'افریقہ', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #4ECDC4, #FFA500)' },
            { imageUrl: '', captionEn: 'North America', captionUr: 'شمالی امریکہ', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #45B7D1, #2E8B57)' },
            { imageUrl: '', captionEn: 'South America', captionUr: 'جنوبی امریکہ', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #96CEB4, #2E8B57)' },
            { imageUrl: '', captionEn: 'Antarctica', captionUr: 'انٹارکٹکا', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #DDA0DD, #FFFFFF)' },
            { imageUrl: '', captionEn: 'Europe', captionUr: 'یورپ', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #FFEAA7, #2E8B57)' },
            { imageUrl: '', captionEn: 'Australia/Oceania', captionUr: 'آسٹریلیا/اوشیانا', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #FFA07A, #4682B4)' },
            { imageUrl: '', captionEn: 'Plate tectonics map', captionUr: 'پلیٹ ٹیکٹونکس نقشہ', credit: 'USGS', fallbackGradient: 'linear-gradient(135deg, #8B4513, #A0522D)' },
            { imageUrl: '', captionEn: 'Divergent boundary', captionUr: 'ڈائورجنٹ باؤنڈری', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(90deg, #8B4513, #FF4500, #8B4513)' },
            { imageUrl: '', captionEn: 'Convergent boundary', captionUr: 'کنورجنٹ باؤنڈری', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(90deg, #8B4513, #FF6347, #8B4513)' },
            { imageUrl: '', captionEn: 'Transform boundary', captionUr: 'ٹرانسفارم باؤنڈری', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(180deg, #8B4513, #FF4500, #8B4513)' },
            { imageUrl: '', captionEn: 'Climate zones map', captionUr: 'آب و ہوا علاقوں کا نقشہ', credit: 'NASA', fallbackGradient: 'linear-gradient(90deg, #FF6B6B, #FFA500, #4ECDC4, #DDA0DD)' },
            { imageUrl: '', captionEn: 'Natural resources', captionUr: 'قدرتی وسائل', credit: 'Educational collage', fallbackGradient: 'linear-gradient(135deg, #4682B4, #2E8B57, #FFA500)' }
          ]}
        />
      </section>

      {/* Section 10: Flowcharts */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Earth System Flowcharts', 'زمین کے نظام کے فلوچارٹس')}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Water Cycle Process', 'آبی چکر کا عمل')}
            </h3>
            <BilingualFlowchart steps={[
              { en: 'Sun heats water', ur: 'سورج پانی گرم کرتا ہے' },
              { en: 'Evaporation', ur: 'بخارات' },
              { en: 'Condensation', ur: 'معاcondensation' },
              { en: 'Clouds form', ur: 'بادل بنتے ہیں' },
              { en: 'Precipitation', ur: 'بارش' },
              { en: 'Collection', ur: 'جمع' }
            ]} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Plate Tectonics Effects', 'پلیٹ ٹیکٹونکس کے اثرات')}
            </h3>
            <BilingualFlowchart steps={[
              { en: 'Plates move', ur: 'پلیٹس حرکت' },
              { en: 'Boundaries interact', ur: 'باؤنڈریز تعامل' },
              { en: 'Earthquakes/Volcanoes', ur: 'زلزلے/آتش فشاں' },
              { en: 'Mountains form', ur: 'پہاڑ بنتے ہیں' }
            ]} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Atmosphere Protection', 'فضا کا تحفظ')}
            </h3>
            <BilingualFlowchart steps={[
              { en: 'Solar radiation', ur: 'شمسی تابکاری' },
              { en: 'Ozone absorbs UV', ur: 'اوزون UV جذب' },
              { en: 'Atmosphere traps heat', ur: 'فضا حرارت روکتی ہے' },
              { en: 'Life protected', ur: 'زندگی محفوظ' }
            ]} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Resource Use', 'وسائل کا استعمال')}
            </h3>
            <BilingualFlowchart steps={[
              { en: 'Extract resources', ur: 'وسائل نکالنا' },
              { en: 'Process materials', ur: 'مواد پروسیس' },
              { en: 'Use products', ur: 'مصنوعات استعمال' },
              { en: 'Generate waste', ur: 'فضول پیدا' },
              { en: 'Need sustainability', ur: 'پائیداری کی ضرورت' }
            ]} />
          </div>
        </div>
      </section>

      {/* Section 11: Fun Facts */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Fun Facts About Earth', 'زمین کے دلچسپ حقائق')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { en: 'Earth is the only known planet with life.', ur: 'زمین واحد معلوم سیارہ ہے جہاں زندگی ہے۔' },
            { en: 'About 71% of Earth\'s surface is water.', ur: 'زمین کی سطح کا تقریباً 71% پانی ہے۔' },
            { en: 'Atmosphere is 78% nitrogen, 21% oxygen.', ur: 'فضا 78% نائٹروجن، 21% آکسیجن ہے۔' },
            { en: 'Earth has seven continents.', ur: 'زمین کے سات براعظم ہیں۔' },
            { en: 'Mount Everest is the highest point.', ur: 'ماؤنٹ ایورسٹ بلند ترین نقطہ ہے۔' },
            { en: 'Mariana Trench is the deepest point.', ur: 'ماریانا ٹرینچ گہرائی ترین نقطہ ہے۔' },
            { en: 'Inner core is as hot as Sun\'s surface.', ur: 'اندرونی مرکزہ سورج کی سطح جتنا گرم ہے۔' },
            { en: 'Magnetic field protects from radiation.', ur: 'مقناطیسی میدان تابکاری سے بچاتا ہے۔' },
            { en: 'Water cycle runs for billions of years.', ur: 'آبی چکر اربوں سال سے چل رہا ہے۔' },
            { en: 'Only 3% of Earth\'s water is freshwater.', ur: 'زمین کے پانی کا صرف 3% تازہ پانی ہے۔' },
            { en: 'Amazon produces 20% of Earth\'s oxygen.', ur: 'ایمیزون زمین کی 20% آکسیجن بناتا ہے۔' },
            { en: 'Crust is broken into tectonic plates.', ur: 'کرسٹ ٹیکٹونک پلیٹس میں ٹوٹی ہے۔' },
            { en: 'Plates move centimeters per year.', ur: 'پلیٹس سالانہ سینٹی میٹر حرکت کرتی ہیں۔' },
            { en: 'Earthquakes occur at plate boundaries.', ur: 'زلزلے پلیٹ باؤنڈریز پر آتے ہیں۔' },
            { en: 'Volcanoes form at plate boundaries.', ur: 'آتش فشاں پلیٹ باؤنڈریز پر بنتے ہیں۔' },
            { en: 'Ozone layer absorbs UV radiation.', ur: 'اوزون تہہ UV تابکاری جذب کرتی ہے۔' },
            { en: 'Earth has diverse climate zones.', ur: 'زمین کے متنوع آب و ہوا علاقے ہیں۔' },
            { en: 'Deserts cover one-third of land.', ur: 'صحرا زمین کا تہائی حصہ ڈھانپتے ہیں۔' },
            { en: 'Forests cover 31% of land area.', ur: 'جنگلات زمین کے 31% رقبے کو ڈھانپتے ہیں۔' },
            { en: 'Fossil fuels are non-renewable.', ur: 'فوسل فیول غیر قابلِ تجدید ہیں۔' },
            { en: 'Solar energy is renewable.', ur: 'شمسی توانائی قابلِ تجدید ہے۔' },
            { en: 'Earth rotates every 24 hours.', ur: 'زمین ہر 24 گھنٹوں میں گھومتی ہے۔' },
            { en: 'Earth orbits Sun in 365.25 days.', ur: 'زمین 365.25 دنوں میں سورج کا چکر لگاتی ہے۔' },
            { en: 'Earth is about 4.5 billion years old.', ur: 'زمین تقریباً 4.5 ارب سال پرانی ہے۔' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm flex items-start gap-2" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              <span className="text-lg">🌍</span>
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
              {renderText('Ready to test what you learned about Earth?', 'کیا آپ زمین کے بارے میں جو سیکھا اس کی جانچ کرنے کے لیے تیار ہیں؟')}
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
              'Educational note: Diagrams simplify real sizes and distances. They are designed to explain Earth\'s systems and processes, not to show exact measurements.',
              'تعلیمی نوٹ: خاکے اصل سائز اور فاصلے کو سادہ بناتے ہیں۔ ان کا مقصد زمین کے نظاموں اور عمل کو سمجھانا ہے، نہ کہ عین مطابق پیمائش دکھانا۔'
            )}
          </p>
        </div>
        <div className="space-y-2">
          {['NASA Earth Science', 'NASA Water Cycle', 'NASA Climate Change', 'NASA Atmosphere Research', 'NOAA', 'USGS'].map((source, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {source}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
