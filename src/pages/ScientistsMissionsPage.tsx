import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { BilingualFlowchart } from '../components/BilingualFlowchart';
import { CheckCircle, XCircle, Play, Pause, RotateCcw, X } from 'lucide-react';

export function ScientistsMissionsPage() {
  const { language } = useApp();
  
  // Modal state
  const [selectedScientist, setSelectedScientist] = useState<string | null>(null);
  
  // Animation states
  const [apolloPlaying, setApolloPlaying] = useState(false);
  const [marsPlaying, setMarsPlaying] = useState(false);
  const [voyagerPlaying, setVoyagerPlaying] = useState(false);
  const [issPlaying, setIssPlaying] = useState(false);
  const [artemisPlaying, setArtemisPlaying] = useState(false);
  const [gravityPlaying, setGravityPlaying] = useState(false);
  const [animPosition, setAnimPosition] = useState(0);
  
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('sslh-scientists-missions-quiz-best');
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

  // Animation effects
  useEffect(() => {
    if (!apolloPlaying && !marsPlaying && !voyagerPlaying && !issPlaying && !artemisPlaying && !gravityPlaying) return;
    const interval = setInterval(() => {
      setAnimPosition((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [apolloPlaying, marsPlaying, voyagerPlaying, issPlaying, artemisPlaying, gravityPlaying]);

  // Scientists data
  const scientists = [
    {
      id: 'copernicus',
      name: { en: 'Nicolaus Copernicus', ur: 'نیکولس کوپرنیکس' },
      lifespan: '1473–1543',
      nationality: { en: 'Polish astronomer', ur: 'پولش ماہر فلکیات' },
      contribution: {
        en: 'Proposed that the Sun, not Earth, is at the center of the Solar System. This heliocentric model changed how people understood planetary motion.',
        ur: 'تجویز پیش کی کہ نظامِ شمسی کے مرکز میں زمین نہیں بلکہ سورج ہے۔ اس سورج مرکزی ماڈل نے لوگوں کی سیاروی حرکت کو سمجھنے کی طریقہ کار کو بدل دیا۔'
      },
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'galileo',
      name: { en: 'Galileo Galilei', ur: 'گیلیلیو گیلیلی' },
      lifespan: '1564–1642',
      nationality: { en: 'Italian astronomer', ur: 'اطالوی ماہر فلکیات' },
      contribution: {
        en: 'Improved the telescope and used it to observe Jupiter\'s four largest moons, phases of Venus and craters on the Moon. His observations supported the idea that not everything orbits Earth.',
        ur: 'دوربین کو بہتر بنایا اور اسے استعمال کرتے ہوئے مشتری کے چار بڑے چاند، زہرہ کی حالتیں اور چاند پر گڑھے دریافت کیے۔ اس کی مشاہدات نے اس خیال کی تائید کی کہ ہر چیز زمین کے گرد گردش نہیں کرتی۔'
      },
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'kepler',
      name: { en: 'Johannes Kepler', ur: 'یوہانس کیپلر' },
      lifespan: '1571–1630',
      nationality: { en: 'German astronomer', ur: 'جرمن ماہر فلکیات' },
      contribution: {
        en: 'Discovered three laws of planetary motion. He showed that planets move in elliptical orbits with the Sun at one focus, not in perfect circles.',
        ur: 'سیاروی حرکت کے تین قوانین دریافت کیے۔ اس نے ثابت کیا کہ سیارے مکمل گول دائروں کی بجائے بیضوی مداروں میں حرکت کرتے ہیں جن کے ایک مرکز میں سورج ہوتا ہے۔'
      },
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'newton',
      name: { en: 'Isaac Newton', ur: 'آئزک نیوٹن' },
      lifespan: '1643–1727',
      nationality: { en: 'English physicist', ur: 'انگریز طبیعیات دان' },
      contribution: {
        en: 'Formulated the laws of motion and universal gravitation. His work explained why planets orbit the Sun and how gravity works on Earth and in space.',
        ur: 'حرکت کے قوانین اور عالمی کششِ ثقل کا نظریہ پیش کیا۔ اس کے کام نے وضاحت کی کہ سیارے سورج کے گرد کیوں گردش کرتے ہیں اور کششِ ثقل زمین اور خلا میں کیسے کام کرتی ہے۔'
      },
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: 'katherine',
      name: { en: 'Katherine Johnson', ur: 'کیتھرین جانسن' },
      lifespan: '1918–2020',
      nationality: { en: 'American mathematician', ur: 'امریکی ریاضی دان' },
      contribution: {
        en: 'Mathematician whose calculations helped determine flight paths for early NASA missions, including crewed flights to the Moon. Her work was essential for mission success and safety.',
        ur: 'ریاضی دان تھیں جن کے حساب کتاب نے ابتدائی ناسا مشنز، بشمول چاند کے لیے خلانوردوں والی پروازوں، کے فلائٹ پاتھ متعین کرنے میں مدد کی۔ ان کا کام مشن کی کامیابی اور حفاظت کے لیے انتہائی ضروری تھا۔'
      },
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 'modern',
      name: { en: 'Modern NASA Scientists', ur: 'جدید ناسا سائنسدان' },
      lifespan: 'Present day',
      nationality: { en: 'International team', ur: 'بین الاقوامی ٹیم' },
      contribution: {
        en: 'Thousands of scientists and engineers work on NASA missions, studying planets, stars, galaxies and space weather. They design instruments, analyze data and plan future human and robotic exploration.',
        ur: 'آج ہزاروں سائنسدان اور انجینئر ناسا کے مشنز پر کام کرتے ہیں، جو سیاروں، ستاروں، کہکشاؤں اور خلا کے موسم کا مطالعہ کرتے ہیں۔ یہ آلات ڈیزائن کرتے ہیں، ڈیٹا کا تجزیہ کرتے ہیں اور مستقبل کی انسانی اور روبوٹک دریافت کی منصوبہ بندی کرتے ہیں۔'
      },
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    }
  ];

  // Quiz questions
  const quizQuestions = [
    {
      question: { en: 'Who proposed the heliocentric model?', ur: 'سورج مرکزی ماڈل کس نے تجویز کیا؟' },
      options: [{ en: 'Galileo', ur: 'گیلیلیو' }, { en: 'Copernicus', ur: 'کوپرنیکس' }, { en: 'Newton', ur: 'نیوٹن' }, { en: 'Kepler', ur: 'کیپلر' }],
      correct: 1,
      explanation: { en: 'Copernicus proposed that the Sun is at the center of the Solar System.', ur: 'کوپرنیکس نے تجویز پیش کی کہ سورج نظامِ شمسی کے مرکز میں ہے۔' }
    },
    {
      question: { en: 'What did Galileo observe with his telescope?', ur: 'گیلیلیو نے اپنی دوربین سے کیا مشاہدہ کیا؟' },
      options: [{ en: 'Only stars', ur: 'صرف ستارے' }, { en: 'Jupiter\'s moons and Venus phases', ur: 'مشتری کے چاند اور زہرہ کی حالتیں' }, { en: 'Only the Moon', ur: 'صرف چاند' }, { en: 'Nothing', ur: 'کچھ نہیں' }],
      correct: 1,
      explanation: { en: 'Galileo observed Jupiter\'s four largest moons, phases of Venus and lunar craters.', ur: 'گیلیلیو نے مشتری کے چار بڑے چاند، زہرہ کی حالتیں اور چاند پر گڑھے دریافت کیے۔' }
    },
    {
      question: { en: 'What are Kepler\'s laws about?', ur: 'کیپلر کے قوانین کن کے بارے میں ہیں؟' },
      options: [{ en: 'Gravity only', ur: 'صرف کششِ ثقل' }, { en: 'Planetary motion', ur: 'سیاروی حرکت' }, { en: 'Light', ur: 'روشنی' }, { en: 'Sound', ur: 'آواز' }],
      correct: 1,
      explanation: { en: 'Kepler discovered three laws describing how planets move in elliptical orbits.', ur: 'کیپلر نے سیاروی حرکت کے تین قوانین دریافت کیے جو بتاتے ہیں کہ سیارے بیضوی مداروں میں کیسے حرکت کرتے ہیں۔' }
    },
    {
      question: { en: 'What did Newton explain?', ur: 'نیوٹن نے کیا وضاحت کی؟' },
      options: [{ en: 'Only planetary motion', ur: 'صرف سیاروی حرکت' }, { en: 'Gravity and motion laws', ur: 'کششِ ثقل اور حرکت کے قوانین' }, { en: 'Only Earth', ur: 'صرف زمین' }, { en: 'Only the Moon', ur: 'صرف چاند' }],
      correct: 1,
      explanation: { en: 'Newton formulated laws of motion and universal gravitation.', ur: 'نیوٹن نے حرکت کے قوانین اور عالمی کششِ ثقل کا نظریہ پیش کیا۔' }
    },
    {
      question: { en: 'What was Katherine Johnson\'s role?', ur: 'کیتھرین جانسن کا کیا کردار تھا؟' },
      options: [{ en: 'Astronaut', ur: 'خلانورد' }, { en: 'Mathematician who calculated flight paths', ur: 'ریاضی دان جنہوں نے فلائٹ پاتھ کا حساب لگایا' }, { en: 'Engineer', ur: 'انجینئر' }, { en: 'Pilot', ur: 'پائلٹ' }],
      correct: 1,
      explanation: { en: 'Katherine Johnson calculated flight paths for NASA missions including Moon flights.', ur: 'کیتھرین جانسن نے ناسا مشنز کے فلائٹ پاتھ کا حساب لگایا بشمول چاند کی پروازیں۔' }
    },
    {
      question: { en: 'What was the first artificial satellite?', ur: 'پہلا مصنوعی سیٹلائٹ کیا تھا؟' },
      options: [{ en: 'Apollo 11', ur: 'اپولو 11' }, { en: 'Sputnik 1', ur: 'سپوٹنک 1' }, { en: 'Voyager 1', ur: 'وائیجر 1' }, { en: 'ISS', ur: 'آئی ایس ایس' }],
      correct: 1,
      explanation: { en: 'Sputnik 1 was the first artificial satellite, launched by the Soviet Union in 1957.', ur: 'سپوٹنک 1 پہلا مصنوعی سیٹلائٹ تھا، جو 1957 میں سوویت یونین نے لانچ کیا۔' }
    },
    {
      question: { en: 'Who was the first human in space?', ur: 'خلا میں پہلا انسان کون تھا؟' },
      options: [{ en: 'Neil Armstrong', ur: 'نیل آرمسٹرانگ' }, { en: 'Yuri Gagarin', ur: 'یوری گاگارن' }, { en: 'John Glenn', ur: 'جان گلین' }, { en: 'Buzz Aldrin', ur: 'بز آلڈرِن' }],
      correct: 1,
      explanation: { en: 'Yuri Gagarin was the first human in space in 1961.', ur: 'یوری گاگارن 1961 میں خلا میں پہلا انسان تھا۔' }
    },
    {
      question: { en: 'Which mission first landed humans on the Moon?', ur: 'کس مشن نے پہلی بار انسانوں کو چاند پر اتارا؟' },
      options: [{ en: 'Apollo 11', ur: 'اپولو 11' }, { en: 'Apollo 13', ur: 'اپولو 13' }, { en: 'Artemis 1', ur: 'آرٹیمس 1' }, { en: 'Viking 1', ur: 'وائکنگ 1' }],
      correct: 0,
      explanation: { en: 'Apollo 11 made the first human Moon landing in 1969.', ur: 'اپولو 11 نے 1969 میں پہلی انسانی چاند لینڈنگ کی۔' }
    },
    {
      question: { en: 'How many astronauts walked on the Moon during Apollo?', ur: 'اپولو کے دوران کتنے خلانوردوں نے چاند پر قدم رکھا؟' },
      options: [{ en: '6', ur: '۶' }, { en: '12', ur: '۱۲' }, { en: '24', ur: '۲۴' }, { en: '2', ur: '۲' }],
      correct: 1,
      explanation: { en: 'Twelve astronauts walked on the Moon during the Apollo program.', ur: 'اپولو پروگرام کے دوران بارہ خلانوردوں نے چاند پر قدم رکھا۔' }
    },
    {
      question: { en: 'What was the first successful Mars orbiter/lander?', ur: 'پہلا کامیاب مریخ مداری جہاز/لینڈر کیا تھا؟' },
      options: [{ en: 'Curiosity', ur: 'کیوروسٹی' }, { en: 'Viking', ur: 'وائکنگ' }, { en: 'Perseverance', ur: 'پرسیویرنس' }, { en: 'Spirit', ur: 'سپرٹ' }],
      correct: 1,
      explanation: { en: 'Viking was the first successful Mars orbiter and lander.', ur: 'وائکنگ پہلا کامیاب مریخ مداری جہاز اور لینڈر تھا۔' }
    },
    {
      question: { en: 'What was the first successful Mars rover?', ur: 'پہلا کامیاب مریخ روور کیا تھا؟' },
      options: [{ en: 'Curiosity', ur: 'کیوروسٹی' }, { en: 'Spirit', ur: 'سپرٹ' }, { en: 'Sojourner', ur: 'سوجورنر' }, { en: 'Opportunity', ur: 'آپارچونٹی' }],
      correct: 2,
      explanation: { en: 'Sojourner was the first successful Mars rover.', ur: 'سوجورنر پہلا کامیاب مریخ روور تھا۔' }
    },
    {
      question: { en: 'Which rover has been on Mars since 2012?', ur: 'کون سا روور 2012 سے مریخ پر ہے؟' },
      options: [{ en: 'Spirit', ur: 'سپرٹ' }, { en: 'Opportunity', ur: 'آپارچونٹی' }, { en: 'Curiosity', ur: 'کیوروسٹی' }, { en: 'Sojourner', ur: 'سوجورنر' }],
      correct: 2,
      explanation: { en: 'Curiosity has been exploring Mars since 2012.', ur: 'کیوروسٹی 2012 سے مریخ کی دریافت کر رہا ہے۔' }
    },
    {
      question: { en: 'What is Perseverance searching for?', ur: 'پرسیویرنس کیا تلاش کر رہا ہے؟' },
      options: [{ en: 'Gold', ur: 'سونا' }, { en: 'Signs of ancient life', ur: 'قدیم زندگی کے آثار' }, { en: 'Water ice only', ur: 'صرف برفانی پانی' }, { en: 'Aliens', ur: 'خلائی مخلوق' }],
      correct: 1,
      explanation: { en: 'Perseverance searches for signs of ancient life on Mars.', ur: 'پرسیویرنس مریخ پر قدیم زندگی کے آثار تلاش کر رہا ہے۔' }
    },
    {
      question: { en: 'What was Ingenuity?', ur: 'انجینیوٹی کیا تھا؟' },
      options: [{ en: 'A rover', ur: 'ایک روور' }, { en: 'First helicopter on another planet', ur: 'دوسرے سیارے پر پہلا ہیلی کاپٹر' }, { en: 'An orbiter', ur: 'ایک مداری جہاز' }, { en: 'A lander', ur: 'ایک لینڈر' }],
      correct: 1,
      explanation: { en: 'Ingenuity was the first helicopter to fly on another planet (Mars).', ur: 'انجینیوٹی دوسرے سیارے (مریخ) پر اڑنے والا پہلا ہیلی کاپٹر تھا۔' }
    },
    {
      question: { en: 'Which spacecraft visited all four giant planets?', ur: 'کس خلائی جہاز نے چاروں دیو سیاروں کا دورہ کیا؟' },
      options: [{ en: 'Voyager 1 and 2', ur: 'وائیجر 1 اور 2' }, { en: 'Apollo', ur: 'اپولو' }, { en: 'ISS', ur: 'آئی ایس ایس' }, { en: 'Hubble', ur: 'ہبل' }],
      correct: 0,
      explanation: { en: 'Voyager 1 and 2 visited Jupiter, Saturn, Uranus and Neptune.', ur: 'وائیجر 1 اور 2 نے مشتری، زحل، یورینس اور نیپچون کا دورہ کیا۔' }
    },
    {
      question: { en: 'Where is Voyager 1 now?', ur: 'وائیجر 1 اب کہاں ہے؟' },
      options: [{ en: 'In Earth orbit', ur: 'زمین کے مدار میں' }, { en: 'On Mars', ur: 'مریخ پر' }, { en: 'In interstellar space', ur: 'بین النجمی خلا میں' }, { en: 'On the Moon', ur: 'چاند پر' }],
      correct: 2,
      explanation: { en: 'Voyager 1 is now in interstellar space.', ur: 'وائیجر 1 اب بین النجمی خلا میں ہے۔' }
    },
    {
      question: { en: 'What is ISS?', ur: 'آئی ایس ایس کیا ہے؟' },
      options: [{ en: 'A planet', ur: 'ایک سیارہ' }, { en: 'International Space Station', ur: 'بین الاقوامی خلائی اسٹیشن' }, { en: 'A rocket', ur: 'ایک راکٹ' }, { en: 'A moon', ur: 'ایک چاند' }],
      correct: 1,
      explanation: { en: 'ISS is the International Space Station, a laboratory in orbit.', ur: 'آئی ایس ایس بین الاقوامی خلائی اسٹیشن ہے، مدار میں ایک لیبارٹری۔' }
    },
    {
      question: { en: 'How long does ISS take to orbit Earth?', ur: 'آئی ایس ایس کو زمین کا چکر لگانے میں کتنا وقت لگتا ہے؟' },
      options: [{ en: '24 hours', ur: '۲۴ گھنٹے' }, { en: 'About 90 minutes', ur: 'تقریباً ۹۰ منٹ' }, { en: '1 year', ur: '۱ سال' }, { en: '1 month', ur: '۱ مہینہ' }],
      correct: 1,
      explanation: { en: 'ISS orbits Earth about every 90 minutes.', ur: 'آئی ایس ایس تقریباً ہر ۹۰ منٹ میں زمین کا چکر لگاتا ہے۔' }
    },
    {
      question: { en: 'Why do astronauts exercise on ISS?', ur: 'خلانورد آئی ایس ایس پر ورزش کیوں کرتے ہیں؟' },
      options: [{ en: 'For fun', ur: 'تفریح کے لیے' }, { en: 'To reduce muscle loss in microgravity', ur: 'مائیکرو گریویٹی میں پٹھوں کے نقصان کو کم کرنے کے لیے' }, { en: 'To pass time', ur: 'وقت گزارنے کے لیے' }, { en: 'They don\'t exercise', ur: 'وہ ورزش نہیں کرتے' }],
      correct: 1,
      explanation: { en: 'Astronauts exercise to reduce muscle loss in microgravity.', ur: 'خلانورد مائیکرو گریویٹی میں پٹھوں کے نقصان کو کم کرنے کے لیے ورزش کرتے ہیں۔' }
    },
    {
      question: { en: 'What is Artemis program goal?', ur: 'آرٹیمس پروگرام کا مقصد کیا ہے؟' },
      options: [{ en: 'Go to Mars', ur: 'مریخ پر جانا' }, { en: 'Return humans to the Moon', ur: 'انسانوں کو چاند پر واپس لے جانا' }, { en: 'Study the Sun', ur: 'سورج کا مطالعہ' }, { en: 'Build a space station', ur: 'خلائی اسٹیشن بنانا' }],
      correct: 1,
      explanation: { en: 'Artemis aims to return humans to the Moon.', ur: 'آرٹیمس کا مقصد انسانوں کو چاند پر واپس لے جانا ہے۔' }
    },
    {
      question: { en: 'Why use Moon for Mars preparation?', ur: 'مریخ کی تیاری کے لیے چاند کیوں استعمال کریں؟' },
      options: [{ en: 'It\'s closer for testing', ur: 'تجربے کے لیے قریب ہے' }, { en: 'It has water', ur: 'اس پر پانی ہے' }, { en: 'It\'s warmer', ur: 'یہ گرم ہے' }, { en: 'No reason', ur: 'کوئی وجہ نہیں' }],
      correct: 0,
      explanation: { en: 'The Moon serves as a testing ground for technologies needed for Mars missions.', ur: 'چاند مریخ مشنز کے لیے درکار ٹیکنالوجیز کے لیے ٹیسٹنگ گراؤنڈ کے طور پر کام کرتا ہے۔' }
    },
    {
      question: { en: 'What is gravity assist?', ur: 'گریویٹی اسسٹ کیا ہے؟' },
      options: [{ en: 'Using planet gravity to change spacecraft speed', ur: 'خلائی جہاز کی رفتار بدلنے کے لیے سیارے کی کششِ ثقل کا استعمال' }, { en: 'Adding fuel', ur: 'اینڈھن شامل کرنا' }, { en: 'Stopping the spacecraft', ur: 'خلائی جہاز کو روکنا' }, { en: 'Nothing', ur: 'کچھ نہیں' }],
      correct: 0,
      explanation: { en: 'Gravity assist uses a planet\'s gravity to change spacecraft speed and direction, saving fuel.', ur: 'گریویٹی اسسٹ ایندھن بچانے کے لیے خلائی جہاز کی رفتار اور سمت بدلنے کے لیے سیارے کی کششِ ثقل کا استعمال کرتا ہے۔' }
    },
    {
      question: { en: 'Which mission tested lunar landing for Apollo?', ur: 'کس مشن نے اپولو کے لیے قمری لینڈنگ کا تجربہ کیا؟' },
      options: [{ en: 'Apollo 10', ur: 'اپولو 10' }, { en: 'Apollo 13', ur: 'اپولو 13' }, { en: 'Viking', ur: 'وائکنگ' }, { en: 'Voyager', ur: 'وائیجر' }],
      correct: 0,
      explanation: { en: 'Apollo 10 tested lunar landing procedures before Apollo 11.', ur: 'اپولو 10 نے اپولو 11 سے پہلے قمری لینڈنگ کے طریقوں کا تجربہ کیا۔' }
    },
    {
      question: { en: 'What do modern Mars orbiters study?', ur: 'جدید مریخ مداری جہاز کیا مطالعہ کرتے ہیں؟' },
      options: [{ en: 'Only rocks', ur: 'صرف پتھر' }, { en: 'Atmosphere, surface and weather', ur: 'فضا، سطح اور موسم' }, { en: 'Only water', ur: 'صرف پانی' }, { en: 'Nothing', ur: 'کچھ نہیں' }],
      correct: 1,
      explanation: { en: 'Modern Mars orbiters study atmosphere, surface and weather.', ur: 'جدید مریخ مداری جہاز فضا، سطح اور موسم کا مطالعہ کرتے ہیں۔' }
    }
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
        localStorage.setItem('sslh-scientists-missions-quiz-best', newScore.toString());
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
          {renderText('Scientists and Space Missions — How We Learned to Explore Space', 'سائنسدان اور خلائی مشنز — ہم نے خلا کو دریافت کرنا کیسے سیکھا')}
        </h1>
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
            <div className="w-20 h-20 rounded-full" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
            <div className="w-20 h-20 rounded-full" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }} />
            <div className="w-20 h-20 rounded-full" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }} />
          </div>
        </div>
        <p className="text-xs italic text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Educational illustration — scientists and missions.', 'تعلیمی خاکہ — سائنسدان اور مشنز۔')}
        </p>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { en: 'Scientists', ur: 'سائنسدان', id: 'scientists' },
            { en: 'Key Discoveries', ur: 'اہم دریافتیں', id: 'discoveries' },
            { en: 'Space Missions', ur: 'خلائی مشنز', id: 'missions' },
            { en: 'Moon Missions', ur: 'چاند کے مشنز', id: 'moon' },
            { en: 'Mars Missions', ur: 'مریخ کے مشنز', id: 'mars' },
            { en: 'Artemis & Future', ur: 'آرٹیمس اور مستقبل', id: 'artemis' },
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
          {renderText('Famous Scientists Who Changed Our View of the Universe', 'مشہور سائنسدان جنہوں نے کائنات کے بارے میں ہمارا نظریہ بدل دیا')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scientists.map((scientist) => (
            <div key={scientist.id} className="rounded-xl p-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="w-16 h-16 rounded-full mx-auto mb-3" style={{ background: scientist.gradient }} />
              <h3 className="font-bold text-center mb-1" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? scientist.name.ur : scientist.name.en}
                {language === 'both' && <span className="block font-urdu text-sm" dir="rtl">{scientist.name.ur}</span>}
              </h3>
              <p className="text-xs text-center mb-2" style={{ color: 'var(--text-secondary)' }}>
                {scientist.lifespan}
              </p>
              <p className="text-xs text-center mb-3" style={{ color: 'var(--accent)' }}>
                {language === 'ur' ? scientist.nationality.ur : scientist.nationality.en}
                {language === 'both' && <span className="block font-urdu" dir="rtl">{scientist.nationality.ur}</span>}
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
            <div className="relative max-w-2xl w-full rounded-2xl p-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedScientist(null)} className="absolute top-3 right-3 p-1 rounded-full" style={{ color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
              {(() => {
                const scientist = scientists.find(s => s.id === selectedScientist);
                if (!scientist) return null;
                return (
                  <>
                    <div className="w-24 h-24 rounded-full mx-auto mb-4" style={{ background: scientist.gradient }} />
                    <h3 className="text-xl font-bold text-center mb-2" style={{ color: 'var(--text-primary)' }}>
                      {language === 'ur' ? scientist.name.ur : scientist.name.en}
                      {language === 'both' && <span className="block font-urdu text-lg" dir="rtl">{scientist.name.ur}</span>}
                    </h3>
                    <p className="text-sm text-center mb-2" style={{ color: 'var(--text-secondary)' }}>
                      {scientist.lifespan} • {language === 'ur' ? scientist.nationality.ur : scientist.nationality.en}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {language === 'ur' ? scientist.contribution.ur : scientist.contribution.en}
                      {language === 'both' && <span className="block font-urdu mt-2" dir="rtl">{scientist.contribution.ur}</span>}
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
          {renderText('How Scientific Discoveries Built Space Exploration', 'سائنسی دریافتوں نے خلائی دریافت کو کیسے بنایا')}
        </h2>
        <BilingualFlowchart
          steps={[
            { en: 'Copernicus: Sun-centered model', ur: 'کوپرنیکس: سورج مرکزی ماڈل' },
            { en: 'Galileo: telescope observations', ur: 'گیلیلیو: دوربینی مشاہدات' },
            { en: 'Kepler: elliptical orbits', ur: 'کیپلر: بیضوی مدار' },
            { en: 'Newton: gravity laws', ur: 'نیوٹن: کششِ ثقل کے قوانین' },
            { en: 'Rocket science', ur: 'راکٹ سائنس' },
            { en: 'Space missions', ur: 'خلائی مشنز' }
          ]}
        />
      </section>

      {/* Section 3: Space Missions Overview */}
      <section id="missions">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Major Space Missions — From First Satellites to Deep Space', 'بڑے خلائی مشنز — پہلے سیٹلائٹس سے گہرے خلا تک')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Space missions include uncrewed robotic spacecraft and crewed human flights. Early missions tested basic rocket technology and Earth orbit. Later missions traveled to the Moon, Mars and outer planets. Today, missions study climate, asteroids, the Sun and distant galaxies.',
            'خلائی مشنز میں بغیر خلانوردوں والے روبوٹک خلائی جہاز اور خلانوردوں والی انسانی پروازیں شامل ہیں۔ ابتدائی مشنز نے بنیادی راکٹ ٹیکنالوجی اور زمین کے مدار کا تجربہ کیا۔ بعد کے مشنز چاند، مریخ اور بیرونی سیاروں تک گئے۔ آج کے مشنز موسم، سیارچوں، سورج اور دور دراز کہکشاؤں کا مطالعہ کرتے ہیں۔'
          )}
        </p>
      </section>

      {/* Section 4: Moon Missions */}
      <section id="moon">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Missions to the Moon — From Apollo to Artemis', 'چاند کے مشنز — اپولو سے آرٹیمس تک')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Moon has been visited by robotic orbiters, landers and rovers, as well as human crews. The Apollo program landed astronauts on the Moon in the late 1960s and early 1970s. Modern missions map the Moon, study its water ice and prepare for future human returns through programs like Artemis.',
            'چاند کا دورہ روبوٹک مداری جہازوں، لینڈرز اور روورز کے علاوہ انسانی عملے نے بھی کیا ہے۔ اپولو پروگرام نے 1960 کی دہائی کے آخر اور 1970 کی دہائی کے شروع میں خلانوردوں کو چاند پر اتارا۔ جدید مشنز چاند کا نقشہ بناتے ہیں، اس کی برفیلی پانی کی برف کا مطالعہ کرتے ہیں اور آرٹیمس جیسے پروگراموں کے ذریعے مستقبل کی انسانی واپسی کی تیاری کرتے ہیں۔'
          )}
        </p>

        {/* Moon Missions Timeline */}
        <div className="space-y-3">
          {[
            { decade: '1950s', en: 'First lunar probes, many unsuccessful.', ur: 'پہلے قمری پروبز، بہت سے ناکام۔' },
            { decade: '1960s', en: 'Race to the Moon, first human landing in 1969.', ur: 'چاند کی دوڑ، 1969 میں پہلی انسانی لینڈنگ۔' },
            { decade: '1970s', en: 'More Apollo landings, lunar sample return.', ur: 'مزید اپولو لینڈنگز، قمری نمونوں کی واپسی۔' },
            { decade: '1990s–2000s', en: 'Robotic orbiters map Moon in detail.', ur: 'روبوٹک مداری جہاز چاند کا تفصیلی نقشہ بناتے ہیں۔' },
            { decade: '2020s', en: 'Artemis program prepares to return humans.', ur: 'آرٹیمس پروگرام انسانوں کی واپسی کی تیاری کرتا ہے۔' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="flex-shrink-0 w-24 text-center">
                <div className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{item.decade}</div>
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

      {/* Section 5: Mars Missions */}
      <section id="mars">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Missions to Mars — Orbiters, Landers and Rovers', 'مریخ کے مشنز — مداری جہاز، لینڈرز اور روورز')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Mars has been explored by many robotic missions. Orbiters study the atmosphere and surface from above. Landers touch down to analyze soil and weather. Rovers drive across the surface, studying rocks, searching for signs of past water and testing technologies for future human exploration.',
            'مریخ کا دورہ بہت سے روبوٹک مشنز نے کیا ہے۔ مداری جہاز اوپر سے فضا اور سطح کا مطالعہ کرتے ہیں۔ لینڈرز زمین پر اتر کر مٹی اور موسم کا تجزیہ کرتے ہیں۔ روورز سطح پر چلتے ہیں، پتھروں کا مطالعہ کرتے ہیں، ماضی کے پانی کے آثار تلاش کرتے ہیں اور مستقبل کی انسانی دریافت کے لیے ٹیکنالوجیز کا تجربہ کرتے ہیں۔'
          )}
        </p>

        {/* Mars Missions Visual */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { en: 'Viking', ur: 'وائکنگ', year: '1976' },
            { en: 'Pathfinder/Sojourner', ur: 'پاتھ فائنڈر/سوجورنر', year: '1997' },
            { en: 'Spirit/Opportunity', ur: 'سپرٹ/آپارچونٹی', year: '2004' },
            { en: 'Curiosity', ur: 'کیوروسٹی', year: '2012' },
            { en: 'Perseverance', ur: 'پرسیویرنس', year: '2021' },
            { en: 'Ingenuity', ur: 'انجینیوٹی', year: '2021' }
          ].map((mission, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ background: 'radial-gradient(circle at 35% 35%, #e8845a, #c1440e 40%, #5c1800)' }} />
              <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? mission.ur : mission.en}
                {language === 'both' && <span className="block font-urdu text-xs" dir="rtl">{mission.ur}</span>}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{mission.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Voyager and Deep Space */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Voyager and Other Deep Space Missions', 'وائیجر اور دیگر گہرے خلا کے مشنز')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Voyager spacecraft flew past Jupiter, Saturn, Uranus and Neptune, sending back the first close-up images of these distant worlds. Voyager 1 and 2 are now in interstellar space, still sending data about the boundary between the Solar System and the rest of the galaxy. Other missions study asteroids, comets, the Sun and distant galaxies.',
            'وائیجر خلائی جہازوں نے مشتری، زحل، یورینس اور نیپچون کے قریب سے پرواز کی اور ان دور دراز دنیاؤں کی پہلی قریبی تصاویر واپس بھیجیں۔ وائیجر 1 اور 2 اب بین النجمی خلا میں ہیں، جو اب بھی نظامِ شمسی اور باقی کہکشاں کے درمیان سرحد کے بارے میں ڈیٹا بھیج رہے ہیں۔ دیگر مشنز سیارچوں، دمدار ستاروں، سورج اور دور دراز کہکشاؤں کا مطالعہ کرتے ہیں۔'
          )}
        </p>

        {/* Voyager Grand Tour Diagram */}
        <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-bold mb-3 text-center" style={{ color: 'var(--text-primary)' }}>
            {renderText('Voyager Grand Tour', 'وائیجر گرینڈ ٹور')}
          </h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 15px #ff8c00' }} />
              <div className="text-xs" style={{ color: 'var(--text-primary)' }}>{renderText('Sun', 'سورج')}</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full mx-auto mb-2" style={{ background: 'radial-gradient(ellipse at 40% 40%, #f0d8a8, #c88b3a 25%, #6b4010)' }} />
              <div className="text-xs" style={{ color: 'var(--text-primary)' }}>{renderText('Jupiter', 'مشتری')}</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full mx-auto mb-2 relative" style={{ background: 'radial-gradient(ellipse at 40% 40%, #f5ecc8, #e8d088 30%, #786020)' }}>
                <div className="absolute inset-0 rounded-full border-2 border-yellow-300/60" style={{ transform: 'scale(1.5)' }} />
              </div>
              <div className="text-xs" style={{ color: 'var(--text-primary)' }}>{renderText('Saturn', 'زحل')}</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ background: 'radial-gradient(circle at 35% 35%, #b8e8f0, #7ec8e3 40%, #2a6888)' }} />
              <div className="text-xs" style={{ color: 'var(--text-primary)' }}>{renderText('Uranus', 'یورینس')}</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ background: 'radial-gradient(circle at 35% 35%, #6688ee, #3355cc 40%, #112266)' }} />
              <div className="text-xs" style={{ color: 'var(--text-primary)' }}>{renderText('Neptune', 'نیپچون')}</div>
            </div>
          </div>
          <p className="text-xs italic text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
            {renderText('Educational diagram — not to scale.', 'تعلیمی خاکہ — حقیقی پیمانے پر نہیں۔')}
          </p>
        </div>
      </section>

      {/* Section 7: International Space Station */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('International Space Station — A Laboratory in Orbit', 'بین الاقوامی خلائی اسٹیشن — مدار میں لیبارٹری')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The International Space Station is a large spacecraft that orbits Earth. It hosts crews from multiple countries who live and work in microgravity. Astronauts conduct experiments in biology, physics, astronomy and technology, and test systems for future deep space missions.',
            'بین الاقوامی خلائی اسٹیشن ایک بڑا خلائی جہاز ہے جو زمین کے گرد گردش کرتا ہے۔ یہ کئی ممالک کے عملے کو میزبانی دیتا ہے جو مائیکرو گریویٹی میں رہتے اور کام کرتے ہیں۔ خلانورد حیاتیات، طبیعیات، فلکیات اور ٹیکنالوجی کے تجربات کرتے ہیں اور مستقبل کے گہرے خلا کے مشنز کے لیے نظاموں کا تجربہ کرتے ہیں۔'
          )}
        </p>

        {/* ISS Animation */}
        <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <div className="relative h-48 mb-4">
            {/* Earth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
            {/* ISS orbiting */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
              style={{
                animation: issPlaying ? 'orbit 10s linear infinite' : 'none',
                transform: `rotate(${animPosition}deg)`
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-gray-400" />
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setIssPlaying(!issPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              {issPlaying ? <Pause size={16} /> : <Play size={16} />}
              {issPlaying ? renderText('Pause', 'روکیں') : renderText('Play', 'چلائیں')}
            </button>
            <button
              onClick={() => { setIssPlaying(false); setAnimPosition(0); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <RotateCcw size={16} />
              {renderText('Reset', 'دوبارہ')}
            </button>
          </div>
        </div>
      </section>

      {/* Section 8: Artemis and Future */}
      <section id="artemis">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Artemis and Future Human Exploration', 'آرٹیمس اور مستقبل کی انسانی دریافت')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Artemis program aims to return humans to the Moon, including the first woman and the first person of color. Artemis missions will test new rockets, spacecraft and lunar landers. The Moon will serve as a testing ground for technologies and operations needed for future human missions to Mars.',
            'آرٹیمس پروگرام کا مقصد انسانوں کو چاند پر واپس لے جانا ہے، بشمول پہلی خاتون اور پہلے غیر سفید فام شخص۔ آرٹیمس مشنز نئے راکٹ، خلائی جہاز اور قمری لینڈرز کا تجربہ کریں گے۔ چاند مستقبل کے مریخ کی انسانی مشنز کے لیے درکار ٹیکنالوجیز اور آپریشنز کے لیے ٹیسٹنگ گراؤنڈ کے طور پر کام کرے گا۔'
          )}
        </p>

        {/* Future Timeline */}
        <div className="space-y-3">
          {[
            { decade: '2020s', en: 'Artemis lunar missions begin.', ur: 'آرٹیمس قمری مشنز شروع ہوتے ہیں۔' },
            { decade: '2030s', en: 'Sustained lunar presence and Mars preparation.', ur: 'مستقل قمری موجودگی اور مریخ کی تیاری۔' },
            { decade: '2040s+', en: 'First human missions to Mars planned.', ur: 'مریخ کے لیے پہلے انسانی مشنز کی منصوبہ بندی۔' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="flex-shrink-0 w-24 text-center">
                <div className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{item.decade}</div>
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

      {/* Section 9: Mission Animations */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Mission Animations', 'مشن کی حرکتیں')}
        </h2>

        {/* Apollo Animation */}
        <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('Apollo Moon Landing', 'اپولو چاند لینڈنگ')}
          </h3>
          <div className="relative h-32 mb-4">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full transition-all duration-100"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0)',
                left: apolloPlaying ? `${20 + (animPosition / 360) * 60}%` : '20%'
              }}
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #c0c0c0, #808080)' }} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setApolloPlaying(!apolloPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              {apolloPlaying ? <Pause size={16} /> : <Play size={16} />}
              {apolloPlaying ? renderText('Pause', 'روکیں') : renderText('Play', 'چلائیں')}
            </button>
          </div>
        </div>

        {/* Mars Rover Animation */}
        <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('Mars Rover Landing', 'مریخ روور لینڈنگ')}
          </h3>
          <div className="relative h-32 mb-4">
            <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(180deg, #000020 0%, #c1440e 100%)' }} />
            <div
              className="absolute top-1/4 w-4 h-4 rounded-full transition-all duration-100"
              style={{
                background: '#e0e0e0',
                left: marsPlaying ? `${10 + (animPosition / 360) * 80}%` : '10%'
              }}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMarsPlaying(!marsPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              {marsPlaying ? <Pause size={16} /> : <Play size={16} />}
              {marsPlaying ? renderText('Pause', 'روکیں') : renderText('Play', 'چلائیں')}
            </button>
          </div>
        </div>

        {/* Voyager Animation */}
        <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('Voyager Grand Tour', 'وائیجر گرینڈ ٹور')}
          </h3>
          <div className="relative h-32 mb-4">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 10px #ff8c00' }} />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-100"
              style={{
                background: '#e0e0e0',
                left: voyagerPlaying ? `${10 + (animPosition / 360) * 80}%` : '10%'
              }}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setVoyagerPlaying(!voyagerPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              {voyagerPlaying ? <Pause size={16} /> : <Play size={16} />}
              {voyagerPlaying ? renderText('Pause', 'روکیں') : renderText('Play', 'چلائیں')}
            </button>
          </div>
        </div>
      </section>

      {/* Section 10: Image Carousel */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Scientists and Missions Gallery', 'سائنسدانوں اور مشنز کی گیلری')}
        </h2>
        <EducationalCarousel
          slides={[
            { imageUrl: '', captionEn: 'Copernicus - heliocentric model', captionUr: 'کوپرنیکس - سورج مرکزی ماڈل', credit: 'Historical illustration', fallbackGradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
            { imageUrl: '', captionEn: 'Galileo - telescope observations', captionUr: 'گیلیلیو - دوربینی مشاہدات', credit: 'Historical illustration', fallbackGradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
            { imageUrl: '', captionEn: 'Kepler - elliptical orbits', captionUr: 'کیپلر - بیضوی مدار', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
            { imageUrl: '', captionEn: 'Newton - gravity laws', captionUr: 'نیوٹن - کششِ ثقل کے قوانین', credit: 'Historical illustration', fallbackGradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
            { imageUrl: '', captionEn: 'Katherine Johnson - mathematician', captionUr: 'کیتھرین جانسن - ریاضی دان', credit: 'NASA', fallbackGradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
            { imageUrl: '', captionEn: 'Modern NASA control room', captionUr: 'جدید ناسا کنٹرول روم', credit: 'NASA', fallbackGradient: 'linear-gradient(135deg, #30cfd0, #330867)' },
            { imageUrl: '', captionEn: 'Early satellite - Sputnik', captionUr: 'ابتدائی سیٹلائٹ - سپوٹنک', credit: 'Historical', fallbackGradient: 'radial-gradient(circle, #808080, #404040)' },
            { imageUrl: '', captionEn: 'Apollo launch', captionUr: 'اپولو لانچ', credit: 'NASA', fallbackGradient: 'linear-gradient(180deg, #000020, #ff8c00)' },
            { imageUrl: '', captionEn: 'Apollo Moon landing', captionUr: 'اپولو چاند لینڈنگ', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #c0c0c0, #404040)' },
            { imageUrl: '', captionEn: 'Astronaut on Moon', captionUr: 'چاند پر خلاباز', credit: 'NASA', fallbackGradient: 'linear-gradient(180deg, #000020, #c0c0c0)' },
            { imageUrl: '', captionEn: 'Viking Mars orbiter', captionUr: 'وائکنگ مریخ مداری جہاز', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #e8845a, #c1440e)' },
            { imageUrl: '', captionEn: 'Mars Pathfinder/Sojourner', captionUr: 'مریخ پاتھ فائنڈر/سوجورنر', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #e8845a, #5c1800)' },
            { imageUrl: '', captionEn: 'Spirit/Opportunity rovers', captionUr: 'سپرٹ/آپارچونٹی روورز', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #e8845a, #8b2500)' },
            { imageUrl: '', captionEn: 'Curiosity rover on Mars', captionUr: 'مریخ پر کیوروسٹی روور', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #e8845a, #c1440e)' },
            { imageUrl: '', captionEn: 'Perseverance + Ingenuity', captionUr: 'پرسیویرنس + انجینیوٹی', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #e8845a, #5c1800)' },
            { imageUrl: '', captionEn: 'Voyager spacecraft', captionUr: 'وائیجر خلائی جہاز', credit: 'NASA', fallbackGradient: 'linear-gradient(135deg, #000020, #4facfe)' },
            { imageUrl: '', captionEn: 'Grand Tour diagram', captionUr: 'گرینڈ ٹور خاکہ', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(90deg, #ffcc00, #c88b3a, #e8d088, #7ec8e3, #3355cc)' },
            { imageUrl: '', captionEn: 'ISS exterior', captionUr: 'آئی ایس ایس بیرونی', credit: 'NASA', fallbackGradient: 'linear-gradient(180deg, #000020, #4a90d9)' },
            { imageUrl: '', captionEn: 'ISS interior lab', captionUr: 'آئی ایس ایس اندرونی لیبارٹری', credit: 'NASA', fallbackGradient: 'linear-gradient(135deg, #808080, #c0c0c0)' },
            { imageUrl: '', captionEn: 'Artemis rocket concept', captionUr: 'آرٹیمس راکٹ تصور', credit: 'NASA', fallbackGradient: 'linear-gradient(180deg, #000020, #ff8c00)' },
            { imageUrl: '', captionEn: 'Moon base concept', captionUr: 'چاند بیس تصور', credit: 'NASA concept art', fallbackGradient: 'radial-gradient(circle, #c0c0c0, #404040)' },
            { imageUrl: '', captionEn: 'Future Mars mission concept', captionUr: 'مستقبل کے مریخ مشن کا تصور', credit: 'NASA concept art', fallbackGradient: 'radial-gradient(circle, #e8845a, #000020)' }
          ]}
        />
      </section>

      {/* Section 11: Flowcharts */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Mission Flowcharts', 'مشن کے فلوچارٹس')}
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('From Idea to Moon Landing', 'خیال سے چاند لینڈنگ تک')}
          </h3>
          <BilingualFlowchart
            steps={[
              { en: 'Scientific theory', ur: 'سائنسی نظریہ' },
              { en: 'Rocket technology', ur: 'راکٹ ٹیکنالوجی' },
              { en: 'Orbital mechanics', ur: 'مداری میکانیات' },
              { en: 'Spacecraft design', ur: 'خلائی جہاز ڈیزائن' },
              { en: 'Mission planning', ur: 'مشن کی منصوبہ بندی' },
              { en: 'Moon landing', ur: 'چاند لینڈنگ' }
            ]}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('Mars Mission Sequence', 'مریخ مشن کی ترتیب')}
          </h3>
          <BilingualFlowchart
            steps={[
              { en: 'Launch from Earth', ur: 'زمین سے لانچ' },
              { en: 'Cruise to Mars', ur: 'مریخ کا سفر' },
              { en: 'Mars orbit insertion', ur: 'مریخ مدار میں داخلہ' },
              { en: 'Entry, descent, landing', ur: 'داخلہ، نزول، لینڈنگ' },
              { en: 'Surface operations', ur: 'سطحی آپریشنز' },
              { en: 'Data return', ur: 'ڈیٹا واپسی' }
            ]}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('Gravity Assist Process', 'گریویٹی اسسٹ کا عمل')}
          </h3>
          <BilingualFlowchart
            steps={[
              { en: 'Spacecraft approaches', ur: 'خلائی جہاز قریب آتا ہے' },
              { en: 'Planet gravity bends path', ur: 'سیارے کی کششِ ثقل راستہ موڑتی ہے' },
              { en: 'Speed changes', ur: 'رفتار بدلتی ہے' },
              { en: 'New path to target', ur: 'منزل کا نیا راستہ' },
              { en: 'Saves fuel', ur: 'اینڈھن بچتا ہے' }
            ]}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('ISS Research Flow', 'آئی ایس ایس تحقیقی بہاؤ')}
          </h3>
          <BilingualFlowchart
            steps={[
              { en: 'Launch cargo/crew', ur: 'سامان/عملہ لانچ' },
              { en: 'Dock to ISS', ur: 'آئی ایس ایس سے ڈاک' },
              { en: 'Conduct experiments', ur: 'تجربات کریں' },
              { en: 'Analyze results', ur: 'نتائج کا تجزیہ' },
              { en: 'Apply knowledge', ur: 'علم کا اطلاق' }
            ]}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('Artemis Architecture', 'آرٹیمس آرکیٹیکچر')}
          </h3>
          <BilingualFlowchart
            steps={[
              { en: 'SLS rocket + Orion', ur: 'ایس ایل ایس راکٹ + اورین' },
              { en: 'Lunar orbit', ur: 'قمری مدار' },
              { en: 'Gateway station', ur: 'گیٹ وے اسٹیشن' },
              { en: 'Lunar lander', ur: 'قمری لینڈر' },
              { en: 'Moon surface', ur: 'چاند کی سطح' },
              { en: 'Return to Earth', ur: 'زمین پر واپسی' }
            ]}
          />
        </div>
      </section>

      {/* Section 12: Fun Facts */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Fun Facts', 'دلچسپ حقائق')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { en: 'Copernicus proposed Sun-centered Solar System.', ur: 'کوپرنیکس نے سورج مرکزی نظامِ شمسی تجویز کیا۔' },
            { en: 'Galileo discovered Jupiter\'s four largest moons.', ur: 'گیلیلیو نے مشتری کے چار بڑے چاند دریافت کیے۔' },
            { en: 'Kepler showed planets move in ellipses.', ur: 'کیپلر نے ثابت کیا کہ سیارے بیضویوں میں حرکت کرتے ہیں۔' },
            { en: 'Newton explained gravity and motion.', ur: 'نیوٹن نے کششِ ثقل اور حرکت کی وضاحت کی۔' },
            { en: 'Katherine Johnson calculated Apollo flight paths.', ur: 'کیتھرین جانسن نے اپولو فلائٹ پاتھ کا حساب لگایا۔' },
            { en: 'First artificial satellite was Sputnik 1.', ur: 'پہلا مصنوعی سیٹلائٹ سپوٹنک 1 تھا۔' },
            { en: 'First human in space was Yuri Gagarin.', ur: 'خلا میں پہلا انسان یوری گاگارن تھا۔' },
            { en: 'Apollo 11 made first human Moon landing in 1969.', ur: 'اپولو 11 نے 1969 میں پہلی انسانی چاند لینڈنگ کی۔' },
            { en: 'Twelve astronauts walked on the Moon during Apollo.', ur: 'اپولو کے دوران بارہ خلانوردوں نے چاند پر قدم رکھا۔' },
            { en: 'Viking was first successful Mars orbiter and lander.', ur: 'وائکنگ پہلا کامیاب مریخ مداری جہاز اور لینڈر تھا۔' },
            { en: 'Sojourner was first successful Mars rover.', ur: 'سوجورنر پہلا کامیاب مریخ روور تھا۔' },
            { en: 'Curiosity has been exploring Mars since 2012.', ur: 'کیوروسٹی 2012 سے مریخ کی دریافت کر رہا ہے۔' },
            { en: 'Perseverance searches for signs of ancient life.', ur: 'پرسیویرنس قدیم زندگی کے آثار تلاش کر رہا ہے۔' },
            { en: 'Ingenuity was first helicopter to fly on another planet.', ur: 'انجینیوٹی دوسرے سیارے پر اڑنے والا پہلا ہیلی کاپٹر تھا۔' },
            { en: 'Voyager 1 and 2 visited all four giant planets.', ur: 'وائیجر 1 اور 2 نے چاروں دیو سیاروں کا دورہ کیا۔' },
            { en: 'Voyager 1 is in interstellar space.', ur: 'وائیجر 1 بین النجمی خلا میں ہے۔' },
            { en: 'ISS has hosted crews from many countries.', ur: 'آئی ایس ایس نے کئی ممالک کے عملے کی میزبانی کی ہے۔' },
            { en: 'ISS orbits Earth about every 90 minutes.', ur: 'آئی ایس ایس تقریباً ہر 90 منٹ میں زمین کا چکر لگاتا ہے۔' },
            { en: 'Astronauts exercise on ISS to reduce muscle loss.', ur: 'خلانورد آئی ایس ایس پر پٹھوں کے نقصان کو کم کرنے کے لیے ورزش کرتے ہیں۔' },
            { en: 'Artemis aims to land first woman on the Moon.', ur: 'آرٹیمس کا مقصد پہلی خاتون کو چاند پر اتارنا ہے۔' },
            { en: 'Moon will be testing ground for Mars missions.', ur: 'چاند مریخ مشنز کے لیے ٹیسٹنگ گراؤنڈ ہوگا۔' },
            { en: 'Gravity assist helps spacecraft save fuel.', ur: 'گریویٹی اسسٹ خلائی جہازوں کو ایندھن بچانے میں مدد دیتا ہے۔' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              {renderText(fact.en, fact.ur)}
            </div>
          ))}
        </div>
      </section>

      {/* Section 13: Quiz */}
      <section id="quiz">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Test Your Knowledge', 'اپنے علم کی جانچ کریں')}
        </h2>
        {!quizStarted ? (
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Ready to test what you learned about scientists and missions?', 'کیا آپ سائنسدانوں اور مشنز کے بارے میں جو سیکھا اس کی جانچ کرنے کے لیے تیار ہیں؟')}
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

      {/* Section 14: Sources */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Sources and Educational Note', 'ماخذ اور تعلیمی نوٹ')}
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
