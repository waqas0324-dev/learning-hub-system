import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { BilingualFlowchart } from '../components/BilingualFlowchart';
import { CheckCircle, XCircle, Play, Pause, RotateCcw, ExternalLink } from 'lucide-react';

export function EclipsesPage() {
  const { language } = useApp();
  
  // Animation states
  const [solarEclipsePlaying, setSolarEclipsePlaying] = useState(false);
  const [lunarEclipsePlaying, setLunarEclipsePlaying] = useState(false);
  const [orbitTiltPlaying, setOrbitTiltPlaying] = useState(false);
  const [moonPosition, setMoonPosition] = useState(0);
  
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('sslh-eclipses-quiz-best');
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
    if (!solarEclipsePlaying && !lunarEclipsePlaying && !orbitTiltPlaying) return;
    const interval = setInterval(() => {
      setMoonPosition((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [solarEclipsePlaying, lunarEclipsePlaying, orbitTiltPlaying]);

  // Quiz questions
  const quizQuestions = [
    {
      question: { en: 'What is an eclipse?', ur: 'گرہن کیا ہے؟' },
      options: [
        { en: 'A type of planet', ur: 'سیارے کی قسم' },
        { en: 'Alignment of Sun, Earth and Moon', ur: 'سورج، زمین اور چاند کی سیدھ' },
        { en: 'A moon phase', ur: 'چاند کی حالت' },
        { en: 'A star explosion', ur: 'ستارے کا دھماکہ' }
      ],
      correct: 1,
      explanation: { en: 'An eclipse is a special alignment of the Sun, Earth and Moon.', ur: 'گرہن سورج، زمین اور چاند کی ایک خاص سیدھ ہے۔' }
    },
    {
      question: { en: 'When do solar eclipses occur?', ur: 'سورج گرہن کب ہوتا ہے؟' },
      options: [
        { en: 'At full Moon', ur: 'پورے چاند کے وقت' },
        { en: 'At new Moon', ur: 'نئے چاند کے وقت' },
        { en: 'Every month', ur: 'ہر مہینے' },
        { en: 'Only at night', ur: 'صرف رات کو' }
      ],
      correct: 1,
      explanation: { en: 'Solar eclipses occur at new Moon when Moon is between Sun and Earth.', ur: 'سورج گرہن نئے چاند کے وقت ہوتا ہے جب چاند سورج اور زمین کے درمیان ہوتا ہے۔' }
    },
    {
      question: { en: 'When do lunar eclipses occur?', ur: 'چاند گرہن کب ہوتا ہے؟' },
      options: [
        { en: 'At new Moon', ur: 'نئے چاند کے وقت' },
        { en: 'At full Moon', ur: 'پورے چاند کے وقت' },
        { en: 'Every week', ur: 'ہر ہفتے' },
        { en: 'Only during day', ur: 'صرف دن کے وقت' }
      ],
      correct: 1,
      explanation: { en: 'Lunar eclipses occur at full Moon when Earth is between Sun and Moon.', ur: 'چاند گرہن پورے چاند کے وقت ہوتا ہے جب زمین سورج اور چاند کے درمیان ہوتی ہے۔' }
    },
    {
      question: { en: 'Why don\'t eclipses happen every month?', ur: 'گرہن ہر مہینے کیوں نہیں ہوتے؟' },
      options: [
        { en: 'The Moon is too far', ur: 'چاند بہت دور ہے' },
        { en: 'Moon\'s orbit is tilted about 5 degrees', ur: 'چاند کا مدار تقریباً 5 ڈگری جھکا ہوا ہے' },
        { en: 'Earth rotates too fast', ur: 'زمین بہت تیزی سے گھومتی ہے' },
        { en: 'The Sun moves away', ur: 'سورج دور چلا جاتا ہے' }
      ],
      correct: 1,
      explanation: { en: 'The Moon\'s orbit is tilted about 5 degrees, so alignment is rare.', ur: 'چاند کا مدار تقریباً 5 ڈگری جھکا ہوا ہے، اس لیے سیدھ نایاب ہے۔' }
    },
    {
      question: { en: 'What is umbra?', ur: 'امبرا کیا ہے؟' },
      options: [
        { en: 'Light outer shadow', ur: 'ہلکا بیرونی سایہ' },
        { en: 'Dark central shadow', ur: 'گہرا مرکزی سایہ' },
        { en: 'A type of cloud', ur: 'بادل کی قسم' },
        { en: 'A planet name', ur: 'سیارے کا نام' }
      ],
      correct: 1,
      explanation: { en: 'Umbra is the darker central shadow where light is completely blocked.', ur: 'امبرا گہرا مرکزی سایہ ہے جہاں روشنی مکمل طور پر رک جاتی ہے۔' }
    },
    {
      question: { en: 'What is penumbra?', ur: 'پینمبرا کیا ہے؟' },
      options: [
        { en: 'Dark central shadow', ur: 'گہرا مرکزی سایہ' },
        { en: 'Lighter outer shadow', ur: 'ہلکا بیرونی سایہ' },
        { en: 'A type of star', ur: 'ستارے کی قسم' },
        { en: 'A moon phase', ur: 'چاند کی حالت' }
      ],
      correct: 1,
      explanation: { en: 'Penumbra is the lighter outer shadow where only part of light is blocked.', ur: 'پینمبرا ہلکا بیرونی سایہ ہے جہاں روشنی کا صرف کچھ حصہ رک جاتا ہے۔' }
    },
    {
      question: { en: 'What alignment causes a solar eclipse?', ur: 'سورج گرہن کس سیدھ سے ہوتا ہے؟' },
      options: [
        { en: 'Earth between Sun and Moon', ur: 'سورج اور چاند کے درمیان زمین' },
        { en: 'Moon between Sun and Earth', ur: 'سورج اور زمین کے درمیان چاند' },
        { en: 'Sun between Earth and Moon', ur: 'زمین اور چاند کے درمیان سورج' },
        { en: 'Any random alignment', ur: 'کوئی بھی بےترتیب سیدھ' }
      ],
      correct: 1,
      explanation: { en: 'Solar eclipse: Sun → Moon → Earth.', ur: 'سورج گرہن: سورج → چاند → زمین۔' }
    },
    {
      question: { en: 'What alignment causes a lunar eclipse?', ur: 'چاند گرہن کس سیدھ سے ہوتا ہے؟' },
      options: [
        { en: 'Moon between Sun and Earth', ur: 'سورج اور زمین کے درمیان چاند' },
        { en: 'Earth between Sun and Moon', ur: 'سورج اور چاند کے درمیان زمین' },
        { en: 'Sun between Earth and Moon', ur: 'زمین اور چاند کے درمیان سورج' },
        { en: 'No alignment needed', ur: 'کوئی سیدھ ضروری نہیں' }
      ],
      correct: 1,
      explanation: { en: 'Lunar eclipse: Sun → Earth → Moon.', ur: 'چاند گرہن: سورج → زمین → چاند۔' }
    },
    {
      question: { en: 'Which eclipse is safe to view directly?', ur: 'کون سا گرہن براہِ راست دیکھنا محفوظ ہے؟' },
      options: [
        { en: 'Solar eclipse', ur: 'سورج گرہن' },
        { en: 'Lunar eclipse', ur: 'چاند گرہن' },
        { en: 'Both are safe', ur: 'دونوں محفوظ ہیں' },
        { en: 'Neither is safe', ur: 'کوئی بھی محفوظ نہیں' }
      ],
      correct: 1,
      explanation: { en: 'Lunar eclipses are safe to view with naked eye.', ur: 'چاند گرہن کو ننگی آنکھ سے دیکھنا محفوظ ہے۔' }
    },
    {
      question: { en: 'Why protect eyes during solar eclipse?', ur: 'سورج گرہن کے دوران آنکھوں کا تحفظ کیوں ضروری ہے؟' },
      options: [
        { en: 'It\'s too dark', ur: 'بہت تاریک ہوتا ہے' },
        { en: 'Sun\'s rays can damage eyes permanently', ur: 'سورج کی شعاعیں آنکھوں کو مستقل نقصان پہنچا سکتی ہیں' },
        { en: 'The Moon is too bright', ur: 'چاند بہت روشن ہوتا ہے' },
        { en: 'It\'s just a tradition', ur: 'یہ صرف ایک روایت ہے' }
      ],
      correct: 1,
      explanation: { en: 'Looking at Sun without protection can cause permanent eye damage.', ur: 'بغیر تحفظ کے سورج کو دیکھنا آنکھوں کو مستقل نقصان پہنچا سکتا ہے۔' }
    },
    {
      question: { en: 'What is an annular eclipse?', ur: 'حلقہ نما گرہن کیا ہے؟' },
      options: [
        { en: 'Moon completely covers Sun', ur: 'چاند سورج کو مکمل ڈھانپ لیتا ہے' },
        { en: 'Moon appears smaller, bright ring visible', ur: 'چاند چھوٹا دکھائی دیتا ہے، چمکدار حلقہ نظر آتا ہے' },
        { en: 'Only part of Moon is covered', ur: 'چاند کا صرف کچھ حصہ ڈھکتا ہے' },
        { en: 'Earth covers the Sun', ur: 'زمین سورج کو ڈھانپ لیتی ہے' }
      ],
      correct: 1,
      explanation: { en: 'Annular eclipse: Moon is farther, appears smaller, bright ring visible.', ur: 'حلقہ نما گرہن: چاند دور ہوتا ہے، چھوٹا دکھائی دیتا ہے، چمکدار حلقہ نظر آتا ہے۔' }
    },
    {
      question: { en: 'What is a partial solar eclipse?', ur: 'جزوی سورج گرہن کیا ہے؟' },
      options: [
        { en: 'Sun completely covered', ur: 'سورج مکمل ڈھک جاتا ہے' },
        { en: 'Only part of Sun is covered by Moon', ur: 'سورج کا صرف کچھ حصہ چاند سے ڈھکتا ہے' },
        { en: 'Moon is completely covered', ur: 'چاند مکمل ڈھک جاتا ہے' },
        { en: 'Earth is covered', ur: 'زمین ڈھک جاتی ہے' }
      ],
      correct: 1,
      explanation: { en: 'Partial solar eclipse: Only part of Sun is covered.', ur: 'جزوی سورج گرہن: سورج کا صرف کچھ حصہ ڈھکتا ہے۔' }
    },
    {
      question: { en: 'What is a total lunar eclipse?', ur: 'مکمل چاند گرہن کیا ہے؟' },
      options: [
        { en: 'Only part of Moon enters umbra', ur: 'چاند کا صرف کچھ حصہ امبرا میں آتا ہے' },
        { en: 'Entire Moon enters Earth\'s umbra', ur: 'پورا چاند زمین کے امبرا میں داخل ہوتا ہے' },
        { en: 'Moon passes through penumbra only', ur: 'چاند صرف پینمبرا سے گزرتا ہے' },
        { en: 'Moon disappears completely', ur: 'چاند مکمل غائب ہو جاتا ہے' }
      ],
      correct: 1,
      explanation: { en: 'Total lunar eclipse: Entire Moon enters Earth\'s umbra.', ur: 'مکمل چاند گرہن: پورا چاند زمین کے امبرا میں داخل ہوتا ہے۔' }
    },
    {
      question: { en: 'Why does Moon turn red during lunar eclipse?', ur: 'چاند گرہن کے دوران چاند سرخ کیوں ہو جاتا ہے؟' },
      options: [
        { en: 'Moon is on fire', ur: 'چاند جل رہا ہے' },
        { en: 'Earth\'s atmosphere bends red light to Moon', ur: 'زمین کی فضا سرخ روشنی کو چاند تک موڑتی ہے' },
        { en: 'Moon reflects Mars', ur: 'چاند مریخ کو منعکس کرتا ہے' },
        { en: 'It\'s an illusion', ur: 'یہ ایک وہم ہے' }
      ],
      correct: 1,
      explanation: { en: 'Earth\'s atmosphere bends red wavelengths to Moon during eclipse.', ur: 'زمین کی فضا گرہن کے دوران سرخ طول موج کو چاند تک موڑتی ہے۔' }
    },
    {
      question: { en: 'What are nodes?', ur: 'نوڈز کیا ہیں؟' },
      options: [
        { en: 'Points where Moon\'s orbit crosses Earth\'s orbit plane', ur: 'وہ نکات جہاں چاند کا مدار زمین کے مدار کے_plane_ کو پار کرتا ہے' },
        { en: 'Types of stars', ur: 'ستاروں کی اقسام' },
        { en: 'Moon phases', ur: 'چاند کی حالتیں' },
        { en: 'Planet names', ur: 'سیاروں کے نام' }
      ],
      correct: 0,
      explanation: { en: 'Nodes are where Moon\'s orbit crosses Earth\'s orbit plane.', ur: 'نوڈز وہ نکات ہیں جہاں چاند کا مدار زمین کے مدار کے_plane_ کو پار کرتا ہے۔' }
    },
    {
      question: { en: 'What causes subtle dimming in penumbral eclipse?', ur: 'نیم سایہ گرہن میں ہلکی مدھمی کس کی وجہ سے ہوتی ہے؟' },
      options: [
        { en: 'Moon enters umbra', ur: 'چاند امبرا میں داخل ہوتا ہے' },
        { en: 'Moon passes through penumbra only', ur: 'چاند صرف پینمبرا سے گزرتا ہے' },
        { en: 'Earth blocks all light', ur: 'زمین تمام روشنی روک لیتی ہے' },
        { en: 'Sun moves away', ur: 'سورج دور چلا جاتا ہے' }
      ],
      correct: 1,
      explanation: { en: 'Penumbral eclipse: Moon passes through penumbra, causing subtle dimming.', ur: 'نیم سایہ گرہن: چاند پینمبرا سے گزرتا ہے، جس سے ہلکی مدھمی ہوتی ہے۔' }
    },
    {
      question: { en: 'Which shadow gives total eclipse?', ur: 'کون سا سایہ مکمل گرہن دیتا ہے؟' },
      options: [
        { en: 'Penumbra', ur: 'پینمبرا' },
        { en: 'Umbra', ur: 'امبرا' },
        { en: 'Both equally', ur: 'دونوں برابر' },
        { en: 'Neither', ur: 'کوئی نہیں' }
      ],
      correct: 1,
      explanation: { en: 'Umbra (dark central shadow) gives total eclipse.', ur: 'امبرا (گہرا مرکزی سایہ) مکمل گرہن دیتا ہے۔' }
    },
    {
      question: { en: 'Which shadow gives partial eclipse?', ur: 'کون سا سایہ جزوی گرہن دیتا ہے؟' },
      options: [
        { en: 'Umbra only', ur: 'صرف امبرا' },
        { en: 'Penumbra', ur: 'پینمبرا' },
        { en: 'No shadow', ur: 'کوئی سایہ نہیں' },
        { en: 'Both equally', ur: 'دونوں برابر' }
      ],
      correct: 1,
      explanation: { en: 'Penumbra (lighter outer shadow) gives partial eclipse.', ur: 'پینمبرا (ہلکا بیرونی سایہ) جزوی گرہن دیتا ہے۔' }
    },
    {
      question: { en: 'How far ahead can eclipses be predicted?', ur: 'گرہن کتنے سال پہلے سے预测 کیے جا سکتے ہیں؟' },
      options: [
        { en: 'Only one day ahead', ur: 'صرف ایک دن پہلے' },
        { en: 'Many years ahead', ur: 'کئی سال پہلے' },
        { en: 'Cannot be predicted', ur: 'predict نہیں کیے جا سکتے' },
        { en: 'Only one month ahead', ur: 'صرف ایک مہینہ پہلے' }
      ],
      correct: 1,
      explanation: { en: 'NASA calculates eclipses many years in advance.', ur: 'ناسا گرہن کئی سال پہلے سے حساب کرتی ہے۔' }
    },
    {
      question: { en: 'What is the difference between Moon phases and eclipses?', ur: 'چاند کی حالتوں اور گرہن میں کیا فرق ہے؟' },
      options: [
        { en: 'They are the same thing', ur: 'دونوں ایک ہی چیز ہیں' },
        { en: 'Phases happen monthly; eclipses are special alignments', ur: 'حالتیں ماہانہ ہوتی ہیں؛ گرہن خاص سیدھ ہیں' },
        { en: 'Eclipses happen every month', ur: 'گرہن ہر مہینے ہوتے ہیں' },
        { en: 'Phases only happen at night', ur: 'حالتیں صرف رات کو ہوتی ہیں' }
      ],
      correct: 1,
      explanation: { en: 'Moon phases happen every month; eclipses are special alignments.', ur: 'چاند کی حالتیں ہر مہینے ہوتی ہیں؛ گرہن خاص سیدھ ہیں۔' }
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
        localStorage.setItem('sslh-eclipses-quiz-best', newScore.toString());
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
          {renderText('Eclipses — When Sun, Earth and Moon Align', 'گرہن — جب سورج، زمین اور چاند ایک سیدھ میں آئیں')}
        </h1>
      </div>

      {/* Hero Section */}
      <section className="rounded-2xl overflow-hidden border p-6 md:p-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Discover Solar and Lunar Eclipses', 'سورج گرہن اور چاند گرہن کو دریافت کریں')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'An eclipse happens when the Sun, Earth and Moon line up in space. A solar eclipse occurs when the Moon passes between the Sun and Earth. A lunar eclipse occurs when Earth passes between the Sun and the Moon. These alignments do not happen every month because the Moon\'s orbit is tilted compared with Earth\'s orbit around the Sun.',
            'گرہن اس وقت ہوتا ہے جب سورج، زمین اور چاند خلا میں ایک سیدھ میں آ جائیں۔ سورج گرہن اس وقت ہوتا ہے جب چاند سورج اور زمین کے درمیان سے گزرے۔ چاند گرہن اس وقت ہوتا ہے جب زمین سورج اور چاند کے درمیان سے گزرے۔ یہ سیدھ ہر مہینے اس لیے نہیں ہوتی کیونکہ چاند کا مدار سورج کے گرد زمین کے مدار کے مقابلے میں جھکا ہوا ہے۔'
          )}
        </p>
        
        {/* Eclipse Visual */}
        <div className="flex justify-center mb-6">
          <div className="relative w-64 h-32">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 20px #ff8c00' }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0)' }} />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
          </div>
        </div>
        <p className="text-xs italic text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Educational diagram — not to scale.', 'تعلیمی خاکہ — حقیقی پیمانے پر نہیں۔')}
        </p>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { en: 'Solar Eclipse', ur: 'سورج گرہن', id: 'solar' },
            { en: 'Lunar Eclipse', ur: 'چاند گرہن', id: 'lunar' },
            { en: 'Types', ur: 'اقسام', id: 'types' },
            { en: 'Geometry', ur: 'جیومیٹری', id: 'geometry' },
            { en: 'Safety', ur: 'حفاظت', id: 'safety' },
            { en: 'Future Eclipses', ur: 'مستقبل کے گرہن', id: 'future' },
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

      {/* Section 1: What Is an Eclipse? */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('What Is an Eclipse?', 'گرہن کیا ہے؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'An eclipse is a special alignment of the Sun, Earth and Moon. When these three bodies line up, one of them can cast a shadow on another. Solar eclipses happen at the new Moon phase, when the Moon is between the Sun and Earth. Lunar eclipses happen at the full Moon phase, when Earth is between the Sun and the Moon. Eclipses do not occur every month because the Moon\'s orbit is tilted, so the three bodies usually miss perfect alignment.',
            'گرہن سورج، زمین اور چاند کی ایک خاص سیدھ ہے۔ جب یہ تینوں اجسام ایک لکیر میں آتے ہیں تو ان میں سے کوئی ایک دوسرے پر سایہ ڈال سکتا ہے۔ سورج گرہن نئے چاند کی حالت میں ہوتا ہے، جب چاند سورج اور زمین کے درمیان ہوتا ہے۔ چاند گرہن پورے چاند کی حالت میں ہوتا ہے، جب زمین سورج اور چاند کے درمیان ہوتی ہے۔ گرہن ہر مہینے اس لیے نہیں ہوتے کیونکہ چاند کا مدار جھکا ہوا ہے، اس لیے یہ تینوں اجسام عام طور پر مکمل سیدھ سے بچ جاتے ہیں۔'
          )}
        </p>
      </section>

      {/* Section 2: Solar Eclipse */}
      <section id="solar">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Solar Eclipse — When the Moon Blocks the Sun', 'سورج گرہن — جب چاند سورج کو ڈھانپ لیتا ہے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'A solar eclipse occurs when the Moon passes between the Sun and Earth, casting a shadow on Earth that either fully or partially blocks the Sun\'s light in some areas. This can happen only near the new Moon phase, but not every new Moon produces a solar eclipse because the Moon\'s orbit is tilted. People inside the Moon\'s shadow see the Sun covered to some degree, while people outside the shadow see a normal Sun.',
            'سورج گرہن اس وقت ہوتا ہے جب چاند سورج اور زمین کے درمیان سے گزرتا ہے اور زمین پر سایہ ڈالتا ہے جو کچھ علاقوں میں سورج کی روشنی کو مکمل یا جزوی طور پر روک لیتا ہے۔ یہ صرف نئے چاند کی حالت کے قریب ہو سکتا ہے، لیکن ہر نیا چاند سورج گرہن پیدا نہیں کرتا کیونکہ چاند کا مدار جھکا ہوا ہے۔ چاند کے سائے میں موجود لوگ سورج کو کسی حد تک ڈھکا ہوا دیکھتے ہیں، جبکہ سائے سے باہر والے لوگ عام سورج دیکھتے ہیں۔'
          )}
        </p>

        {/* Solar Eclipse Geometry */}
        <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('Solar Eclipse Geometry', 'سورج گرہن کی جیومیٹری')}
          </h3>
          <div className="relative h-48 mb-4">
            {/* Sun */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 30px #ff8c00' }} />
            {/* Moon */}
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0)' }} />
            {/* Earth */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
            {/* Umbra */}
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-32 h-4" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.8), rgba(0,0,0,0.3))' }} />
            {/* Penumbra */}
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-40 h-12" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))', zIndex: -1 }} />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {renderText('Umbra', 'امبرا')}
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                {renderText('Dark central shadow — total eclipse', 'گہرا مرکزی سایہ — مکمل گرہن')}
              </p>
            </div>
            <div>
              <div className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {renderText('Penumbra', 'پینمبرا')}
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                {renderText('Lighter outer shadow — partial eclipse', 'ہلکا بیرونی سایہ — جزوی گرہن')}
              </p>
            </div>
          </div>
          <p className="text-xs italic mt-4 text-center" style={{ color: 'var(--text-secondary)' }}>
            {renderText('Educational diagram — not to scale.', 'تعلیمی خاکہ — حقیقی پیمانے پر نہیں۔')}
          </p>
        </div>

        {/* Why Total Solar Eclipses Are Rare */}
        <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('Why Total Solar Eclipses Are Rare', 'مکمل سورج گرہن نایاب کیوں ہیں')}
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'Total solar eclipses are rare at any one place on Earth because the Moon\'s shadow is relatively small. The Moon is much smaller than Earth, so its umbra covers only a narrow path on Earth\'s surface. Most people on the daytime side of Earth will see only a partial eclipse or no eclipse at all.',
              'زمین پر کسی ایک جگہ کے لیے مکمل سورج گرہن نایاب ہوتا ہے کیونکہ چاند کا سایہ نسبتاً چھوٹا ہوتا ہے۔ چاند زمین سے بہت چھوٹا ہے، اس لیے اس کا گہرا سایہ زمین کی سطح پر صرف ایک تنگ راستے کو ڈھانپتا ہے۔ زمین کے دن والے پہلو پر موجود زیادہ تر لوگ صرف جزوی گرہن دیکھیں گے یا کوئی گرہن نہیں دیکھیں گے۔'
            )}
          </p>
        </div>

        {/* Types of Solar Eclipses */}
        <div id="types" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Total Solar Eclipse', 'مکمل سورج گرہن')}
            </h4>
            <div className="flex justify-center mb-2">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 20px #ff8c00' }} />
                <div className="absolute inset-2 rounded-full" style={{ background: '#000' }} />
              </div>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Moon completely covers Sun', 'چاند سورج کو مکمل ڈھانپ لیتا ہے')}
            </p>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Annular Eclipse', 'حلقہ نما گرہن')}
            </h4>
            <div className="flex justify-center mb-2">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 20px #ff8c00' }} />
                <div className="absolute inset-4 rounded-full" style={{ background: '#000' }} />
                <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: '#ffcc00' }} />
              </div>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Moon smaller, bright ring visible', 'چاند چھوٹا، چمکدار حلقہ نظر آتا ہے')}
            </p>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Partial Eclipse', 'جزوی گرہن')}
            </h4>
            <div className="flex justify-center mb-2">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 20px #ff8c00' }} />
                <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(90deg, #000 40%, transparent 40%)' }} />
              </div>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Only part of Sun covered', 'سورج کا صرف کچھ حصہ ڈھکتا ہے')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Lunar Eclipse */}
      <section id="lunar">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Lunar Eclipse — When Earth Blocks Sunlight from the Moon', 'چاند گرہن — جب زمین سورج کی روشنی کو چاند تک پہنچنے سے روکتی ہے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'A lunar eclipse occurs when Earth passes directly between the Sun and Moon, casting a gigantic shadow across the lunar surface and dimming the Moon. This alignment can only occur during a full Moon phase. Unlike a solar eclipse, it is always safe to look at a lunar eclipse with the naked eye.',
            'چاند گرہن اس وقت ہوتا ہے جب زمین سورج اور چاند کے درمیان سے گزرتی ہے اور چاند کی سطح پر ایک بہت بڑا سایہ ڈالتی ہے جس سے چاند مدھم ہو جاتا ہے۔ یہ سیدھ صرف پورے چاند کی حالت میں ممکن ہے۔ سورج گرہن کے برعکس، چاند گرہن کو ننگی آنکھ سے دیکھنا ہمیشہ محفوظ ہوتا ہے۔'
          )}
        </p>

        {/* Lunar Eclipse Geometry */}
        <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('Lunar Eclipse Geometry', 'چاند گرہن کی جیومیٹری')}
          </h3>
          <div className="relative h-48 mb-4">
            {/* Sun */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 30px #ff8c00' }} />
            {/* Earth */}
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
            {/* Moon */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #cc4444, #882222)' }} />
            {/* Umbra */}
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-40 h-6" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.8), rgba(0,0,0,0.3))' }} />
          </div>
          <p className="text-xs italic text-center" style={{ color: 'var(--text-secondary)' }}>
            {renderText('Educational diagram — not to scale.', 'تعلیمی خاکہ — حقیقی پیمانے پر نہیں۔')}
          </p>
        </div>

        {/* Why Lunar Eclipses Turn Red */}
        <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('Why Lunar Eclipses Turn Red', 'چاند گرہن سرخ کیوں ہو جاتے ہیں')}
          </h3>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'During a total lunar eclipse, the Moon often appears dark red or orange. Earth blocks most direct sunlight from reaching the Moon, but some sunlight passes through Earth\'s atmosphere. Shorter wavelengths scatter more easily, while longer red wavelengths bend through the atmosphere and reach the Moon. It is as if all the world\'s sunrises and sunsets are projected onto the Moon.',
              'مکمل چاند گرہن کے دوران چاند اکثر گہرا سرخ یا نارنجی دکھائی دیتا ہے۔ زمین زیادہ تر براہِ راست سورج کی روشنی کو چاند تک پہنچنے سے روک لیتی ہے، لیکن کچھ سورج کی روشنی زمین کی فضا سے گزر جاتی ہے۔ چھوٹی طول موج آسانی سے بکھر جاتی ہے، جبکہ لمبی سرخ طول موج فضا سے مڑ کر چاند تک پہنچتی ہے۔ ایسا لگتا ہے جیسے پوری دنیا کے سورج طلوع اور غروب چاند پر منعکس ہو رہے ہوں۔'
            )}
          </p>
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #cc4444, #882222 50%, #441111)', boxShadow: '0 0 20px #cc4444' }} />
          </div>
        </div>

        {/* Types of Lunar Eclipses */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Total Lunar Eclipse', 'مکمل چاند گرہن')}
            </h4>
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #cc4444, #882222)', boxShadow: '0 0 15px #cc4444' }} />
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Entire Moon in umbra', 'پورا چاند امبرا میں')}
            </p>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Partial Lunar Eclipse', 'جزوی چاند گرہن')}
            </h4>
            <div className="flex justify-center mb-2">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0)' }} />
                <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(90deg, #cc4444 40%, transparent 40%)' }} />
              </div>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Part of Moon in umbra', 'چاند کا کچھ حصہ امبرا میں')}
            </p>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Penumbral Lunar Eclipse', 'نیم سایہ چاند گرہن')}
            </h4>
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #c0c0c0, #909090)' }} />
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Moon in penumbra only', 'چاند صرف پینمبرا میں')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Umbra and Penumbra */}
      <section id="geometry">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Umbra and Penumbra — Two Parts of a Shadow', 'امبرا اور پینمبرا — سائے کے دو حصے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'When a planet or moon blocks light from the Sun, it creates a shadow with two main parts. The umbra is the darker central region where the light source is completely blocked. The penumbra is the lighter outer region where only part of the light is blocked. Observers in the umbra see total eclipses, while observers in the penumbra see partial eclipses.',
            'جب کوئی سیارہ یا چاند سورج کی روشنی کو روکتا ہے تو یہ دو بڑے حصوں پر مشتمل سایہ بناتا ہے۔ امبرا گہرا مرکزی علاقہ ہے جہاں روشنی کا ماخذ مکمل طور پر روک لیا جاتا ہے۔ پینمبرا ہلکا بیرونی علاقہ ہے جہاں روشنی کا صرف کچھ حصہ روکا جاتا ہے۔ امبرا میں موجود ناظرین مکمل گرہن دیکھتے ہیں، جبکہ پینمبرا میں موجود ناظرین جزوی گرہن دیکھتے ہیں۔'
          )}
        </p>

        {/* Shadow Diagram */}
        <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <div className="relative h-48 mb-4">
            {/* Light source */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 30px #ffcc00' }} />
            {/* Object */}
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full" style={{ background: '#404040' }} />
            {/* Umbra */}
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-48 h-8" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.9), rgba(0,0,0,0.4))' }} />
            {/* Penumbra */}
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-56 h-20" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1))', zIndex: -1 }} />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--surface)' }}>
              <div className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                {renderText('Umbra', 'امبرا')}
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                {renderText('Dark central shadow — total eclipse', 'گہرا مرکزی سایہ — مکمل گرہن')}
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--surface)' }}>
              <div className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                {renderText('Penumbra', 'پینمبرا')}
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                {renderText('Lighter outer shadow — partial eclipse', 'ہلکا بیرونی سایہ — جزوی گرہن')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why Eclipses Don't Happen Every Month */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Why Don\'t Eclipses Happen Every Month?', 'گرہن ہر مہینے کیوں نہیں ہوتے؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Moon orbits Earth about once a month, and there is a new Moon and a full Moon every month. However, the Moon\'s orbit is tilted by about 5 degrees compared with Earth\'s orbit around the Sun. Most months the Moon passes slightly above or below the exact line between the Sun and Earth. An eclipse can occur only when the Moon crosses this line at special points called nodes, at the same time as a new or full Moon.',
            'چاند زمین کے گرد تقریباً ہر مہینے ایک بار گردش کرتا ہے، اور ہر مہینے ایک نیا چاند اور ایک پورا چاند ہوتا ہے۔ تاہم، چاند کا مدار سورج کے گرد زمین کے مدار کے مقابلے میں تقریباً 5 ڈگری جھکا ہوا ہے۔ زیادہ تر مہینوں میں چاند سورج اور زمین کی بالکل سیدھ سے تھوڑا اوپر یا نیچے سے گزر جاتا ہے۔ گرہن صرف اس وقت ہو سکتا ہے جب چاند ان خاص نکات پر اس لکیر کو پار کرے جنہیں نوڈز کہتے ہیں، اور یہی وقت نئے یا پورے چاند کے ساتھ مل جائے۔'
          )}
        </p>

        {/* Orbit Tilt Diagram */}
        <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('Orbit Tilt and Nodes', 'مدار کا جھکاؤ اور نوڈز')}
          </h3>
          <div className="relative h-64 mb-4">
            {/* Earth orbit plane */}
            <div className="absolute inset-x-8 top-1/2 h-0.5" style={{ backgroundColor: 'var(--accent)' }} />
            {/* Moon orbit plane (tilted) */}
            <div className="absolute inset-x-16 top-1/2 h-0.5 -rotate-6" style={{ backgroundColor: '#888' }} />
            {/* Earth */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
            {/* Nodes */}
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2" style={{ borderColor: 'var(--accent)' }} />
            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2" style={{ borderColor: 'var(--accent)' }} />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {renderText('Earth\'s orbit plane', 'زمین کا مدار')}
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                {renderText('Blue line', 'نیلی لکیر')}
              </p>
            </div>
            <div>
              <div className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {renderText('Moon\'s orbit (tilted 5°)', 'چاند کا مدار (5° جھکا ہوا)')}
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                {renderText('Gray line', 'سرمئی لکیر')}
              </p>
            </div>
          </div>
          <p className="text-xs italic mt-4 text-center" style={{ color: 'var(--text-secondary)' }}>
            {renderText('Eclipses occur only at nodes (circles).', 'گرہن صرف نوڈز (دائرے) پر ہوتے ہیں۔')}
          </p>
        </div>
      </section>

      {/* Section 6: Solar Eclipse Safety */}
      <section id="safety">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Solar Eclipse Safety — Protect Your Eyes', 'سورج گرہن کی حفاظت — اپنی آنکھوں کا تحفظ کریں')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Looking directly at the Sun without proper protection can cause serious and permanent eye damage. During most phases of a solar eclipse, you must use special solar filters or eclipse glasses that meet international safety standards. It is only safe to look at the Sun with unprotected eyes during the brief period of totality in a total solar eclipse, when the Sun is completely covered.',
            'بغیر مناسب تحفظ کے براہِ راست سورج کو دیکھنا آنکھوں کو شدید اور مستقل نقصان پہنچا سکتا ہے۔ سورج گرہن کے زیادہ تر مراحل کے دوران آپ کو بین الاقوامی حفاظتی معیارات پر پورا اترنے والے خاص شمسی فلٹرز یا گرہن کے چشمے استعمال کرنے چاہئیں۔ صرف مکمل سورج گرہن کی مختصر مکمل تاریکی کے دوران، جب سورج مکمل طور پر ڈھکا ہوا ہو، ننگی آنکھ سے سورج کو دیکھنا محفوظ ہوتا ہے۔'
          )}
        </p>

        {/* Safety Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl" style={{ backgroundColor: '#10b98120', border: '2px solid #10b981' }}>
            <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: '#10b981' }}>
              <CheckCircle size={20} />
              {renderText('Safe Methods', 'محفوظ طریقے')}
            </h4>
            <ul className="space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li>{renderText('✓ Certified eclipse glasses', '✓ تصدیق شدہ گرہن چشمے')}</li>
              <li>{renderText('✓ Solar filters for telescopes', '✓ دوربین کے لیے شمسی فلٹرز')}</li>
              <li>{renderText('✓ Indirect projection methods', '✓ بالواسطہ پروجیکشن طریقے')}</li>
              <li>{renderText('✓ Welder\'s glass #14 or darker', '✓ ویلڈر کا شیشہ نمبر 14 یا گہرا')}</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: '#ef444420', border: '2px solid #ef4444' }}>
            <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: '#ef4444' }}>
              <XCircle size={20} />
              {renderText('Unsafe Methods', 'غیر محفوظ طریقے')}
            </h4>
            <ul className="space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li>{renderText('✗ Regular sunglasses', '✗ عام دھوپ کے چشمے')}</li>
              <li>{renderText('✗ Smoked glass', '✗ دھواں والا شیشہ')}</li>
              <li>{renderText('✗ Exposed film', '✗ ایکسپوزڈ فلم')}</li>
              <li>{renderText('✗ Unfiltered telescopes/binoculars', '✗ بغیر فلٹر دوربین/بائنوکولر')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {renderText('Note:', 'نوٹ:')}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'Lunar eclipses are safe to view with the naked eye.',
              'چاند گرہن کو ننگی آنکھ سے دیکھنا محفوظ ہے۔'
            )}
          </p>
        </div>
      </section>

      {/* Section 7: Future Eclipses */}
      <section id="future">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Upcoming Eclipses', 'آنے والے گرہن')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Eclipses follow predictable patterns. NASA and other space agencies calculate future eclipses many years in advance. Dates and visibility depend on your location on Earth.',
            'گرہن قابلِ پیش گوئی نمونوں کے تحت آتے ہیں۔ ناسا اور دیگر خلائی ایجنسیاں مستقبل کے گرہن کئی سال پہلے سے حساب کرتی ہیں۔ تاریخیں اور نظر آنے کی صلاحیت زمین پر آپ کے مقام پر منحصر ہوتی ہیں۔'
          )}
        </p>

        {/* Future Eclipses Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ color: 'var(--text-primary)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>{renderText('Date', 'تاریخ')}</th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>{renderText('Type', 'قسم')}</th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>{renderText('Visible Regions', 'نظر آنے والے علاقے')}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'August 12, 2026', type: { en: 'Total Solar', ur: 'مکمل سورج' }, regions: { en: 'Arctic, Europe, N. Asia', ur: 'قطب شمالی، یورپ، شمالی ایشیا' } },
                { date: 'March 3, 2026', type: { en: 'Total Lunar', ur: 'مکمل چاند' }, regions: { en: 'Americas, Europe, Africa', ur: 'امریکہ، یورپ، افریقہ' } },
                { date: 'August 2027', type: { en: 'Total Solar', ur: 'مکمل سورج' }, regions: { en: 'N. Africa, Middle East', ur: 'شمالی افریقہ، مشرق وسطیٰ' } },
                { date: 'December 2028', type: { en: 'Total Lunar', ur: 'مکمل چاند' }, regions: { en: 'Widely visible', ur: 'وسیع پیمانے پر نظر آنے والا' } },
                { date: '2029', type: { en: 'Notable Lunar', ur: 'قابل ذکر چاند' }, regions: { en: 'Various regions', ur: 'مختلف علاقے' } }
              ].map((eclipse, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-muted)' }}>
                  <td className="p-3 border" style={{ borderColor: 'var(--border)' }}>{eclipse.date}</td>
                  <td className="p-3 border" style={{ borderColor: 'var(--border)' }}>
                    {renderText(eclipse.type.en, eclipse.type.ur)}
                  </td>
                  <td className="p-3 border" style={{ borderColor: 'var(--border)' }}>
                    {renderText(eclipse.regions.en, eclipse.regions.ur)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs italic mt-4 text-center" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Exact visibility and times depend on your location. Check official eclipse maps for details.',
            'دقیق نظر آنے کی صلاحیت اور اوقات آپ کے مقام پر منحصر ہوتے ہیں۔ تفصیلات کے لیے سرکاری گرہن کے نقشے دیکھیں۔'
          )}
        </p>

        <div className="mt-4 text-center">
          <a
            href="https://eclipse.gsfc.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-lg font-medium"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            <ExternalLink size={16} />
            {renderText('Explore Eclipse Maps', 'گرہن کے نقشے دیکھیں')}
          </a>
        </div>
      </section>

      {/* Section 8: Moon Phases vs Eclipses */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Moon Phases and Eclipses Are Not the Same', 'چاند کی حالتیں اور گرہن ایک ہی چیز نہیں ہیں')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Moon phases happen every month as our view of the Moon\'s sunlit half changes. Eclipses are special alignments that do not happen every month. A solar eclipse can occur only near a new Moon, and a lunar eclipse can occur only near a full Moon, but most new and full Moons do not produce eclipses.',
            'چاند کی حالتیں ہر مہینے اس لیے بنتی ہیں کیونکہ چاند کے سورج سے روشن نصف حصے کو دیکھنے کا زاویہ بدلتا رہتا ہے۔ گرہن خاص قسم کی سیدھ ہیں جو ہر مہینے نہیں ہوتیں۔ سورج گرہن صرف نئے چاند کے قریب ہو سکتا ہے، اور چاند گرہن صرف پورے چاند کے قریب ہو سکتا ہے، لیکن زیادہ تر نئے اور پورے چاند گرہن پیدا نہیں کرتے۔'
          )}
        </p>

        {/* Side-by-side Visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="font-bold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>
              {renderText('Moon Phases', 'چاند کی حالتیں')}
            </h4>
            <div className="flex justify-around mb-2">
              {['🌑', '🌓', '🌕', '🌗'].map((phase, i) => (
                <div key={i} className="text-2xl">{phase}</div>
              ))}
            </div>
            <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Every month', 'ہر مہینے')}
            </p>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="font-bold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>
              {renderText('Eclipses', 'گرہن')}
            </h4>
            <div className="flex justify-around mb-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, #fff7a0, #ff8c00)' }} />
                <div className="absolute inset-1 rounded-full" style={{ background: '#000' }} />
              </div>
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, #cc4444, #882222)' }} />
              </div>
            </div>
            <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Special alignments', 'خاص سیدھ')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 9: Interactive Animations */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Interactive Animations', 'تفاعلی حرکتیں')}
        </h2>

        {/* Solar Eclipse Animation */}
        <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('Solar Eclipse Animation', 'سورج گرہن کی حرکت')}
          </h3>
          <div className="relative h-32 mb-4">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 20px #ff8c00' }} />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-100"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0)',
                left: solarEclipsePlaying ? `${30 + (moonPosition / 360) * 40}%` : '30%'
              }}
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSolarEclipsePlaying(!solarEclipsePlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              {solarEclipsePlaying ? <Pause size={16} /> : <Play size={16} />}
              {solarEclipsePlaying ? renderText('Pause', 'روکیں') : renderText('Play', 'چلائیں')}
            </button>
            <button
              onClick={() => { setSolarEclipsePlaying(false); setMoonPosition(0); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <RotateCcw size={16} />
              {renderText('Reset', 'دوبارہ')}
            </button>
          </div>
        </div>

        {/* Lunar Eclipse Animation */}
        <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('Lunar Eclipse Animation', 'چاند گرہن کی حرکت')}
          </h3>
          <div className="relative h-32 mb-4">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 20px #ff8c00' }} />
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-100"
              style={{
                background: lunarEclipsePlaying && moonPosition > 180 ? 'radial-gradient(circle at 35% 35%, #cc4444, #882222)' : 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0)',
                right: lunarEclipsePlaying ? `${10 + (moonPosition / 360) * 30}%` : '10%'
              }}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLunarEclipsePlaying(!lunarEclipsePlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              {lunarEclipsePlaying ? <Pause size={16} /> : <Play size={16} />}
              {lunarEclipsePlaying ? renderText('Pause', 'روکیں') : renderText('Play', 'چلائیں')}
            </button>
            <button
              onClick={() => { setLunarEclipsePlaying(false); setMoonPosition(0); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <RotateCcw size={16} />
              {renderText('Reset', 'دوبارہ')}
            </button>
          </div>
        </div>
      </section>

      {/* Section 10: Image Carousel */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Eclipse Image Gallery', 'گرہن کی تصاویر')}
        </h2>
        <EducationalCarousel
          slides={[
            { imageUrl: '', captionEn: 'Total solar eclipse', captionUr: 'مکمل سورج گرہن', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #000 30%, #ffcc00 30%, #ff8c00 60%, #000)' },
            { imageUrl: '', captionEn: 'Annular solar eclipse', captionUr: 'حلقہ نما سورج گرہن', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #000 40%, #ffcc00 40%, #ff8c00 60%, #000)' },
            { imageUrl: '', captionEn: 'Partial solar eclipse', captionUr: 'جزوی سورج گرہن', credit: 'NASA', fallbackGradient: 'linear-gradient(90deg, #000 40%, #ffcc00 40%)' },
            { imageUrl: '', captionEn: 'Solar eclipse geometry', captionUr: 'سورج گرہن کی جیومیٹری', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(90deg, #ffcc00, #404040, #4a90d9)' },
            { imageUrl: '', captionEn: 'Total lunar eclipse', captionUr: 'مکمل چاند گرہن', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #cc4444, #882222)' },
            { imageUrl: '', captionEn: 'Partial lunar eclipse', captionUr: 'جزوی چاند گرہن', credit: 'NASA', fallbackGradient: 'linear-gradient(90deg, #cc4444 40%, #e0e0e0 40%)' },
            { imageUrl: '', captionEn: 'Penumbral lunar eclipse', captionUr: 'نیم سایہ چاند گرہن', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #c0c0c0, #909090)' },
            { imageUrl: '', captionEn: 'Lunar eclipse geometry', captionUr: 'چاند گرہن کی جیومیٹری', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(90deg, #ffcc00, #4a90d9, #cc4444)' },
            { imageUrl: '', captionEn: 'Umbra and penumbra', captionUr: 'امبرا اور پینمبرا', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(90deg, #000 50%, #404040 50%)' },
            { imageUrl: '', captionEn: 'Orbit tilt diagram', captionUr: 'مدار کے جھکاؤ کا خاکہ', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(180deg, #4a90d9, #888)' },
            { imageUrl: '', captionEn: 'Red Moon close-up', captionUr: 'سرخ چاند قریب سے', credit: 'NASA', fallbackGradient: 'radial-gradient(circle, #cc4444, #882222, #441111)' },
            { imageUrl: '', captionEn: 'Eclipse path map', captionUr: 'گرہن کے راستے کا نقشہ', credit: 'NASA', fallbackGradient: 'linear-gradient(90deg, #4a90d9, #2d6b3f, #c1440e)' },
            { imageUrl: '', captionEn: 'Safe viewing methods', captionUr: 'محفوظ دیکھنے کے طریقے', credit: 'Educational diagram', fallbackGradient: 'radial-gradient(circle, #10b981, #059669)' },
            { imageUrl: '', captionEn: 'Unsafe viewing examples', captionUr: 'غیر محفوظ دیکھنے کی مثالیں', credit: 'Educational diagram', fallbackGradient: 'radial-gradient(circle, #ef4444, #dc2626)' },
            { imageUrl: '', captionEn: 'Moon phases vs eclipses', captionUr: 'چاند کی حالتیں بمقابلہ گرہن', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(90deg, #e0e0e0, #cc4444)' },
            { imageUrl: '', captionEn: 'Future eclipse example', captionUr: 'مستقبل کے گرہن کی مثال', credit: 'NASA', fallbackGradient: 'linear-gradient(180deg, #000020, #4a90d9)' }
          ]}
        />
      </section>

      {/* Section 11: Fun Facts */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Fun Facts', 'دلچسپ حقائق')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { en: 'Solar eclipses happen at new Moon.', ur: 'سورج گرہن نئے چاند کے وقت ہوتا ہے۔' },
            { en: 'Lunar eclipses happen at full Moon.', ur: 'چاند گرہن پورے چاند کے وقت ہوتا ہے۔' },
            { en: 'Eclipses do not happen every month.', ur: 'گرہن ہر مہینے نہیں ہوتے۔' },
            { en: 'Moon\'s orbit is tilted about 5 degrees.', ur: 'چاند کا مدار تقریباً 5 ڈگری جھکا ہوا ہے۔' },
            { en: 'Umbra is darker central shadow.', ur: 'امبرا گہرا مرکزی سایہ ہے۔' },
            { en: 'Penumbra is lighter outer shadow.', ur: 'پینمبرا ہلکا بیرونی سایہ ہے۔' },
            { en: 'Total solar eclipses are rare at one place.', ur: 'ایک جگہ مکمل سورج گرہن نایاب ہوتا ہے۔' },
            { en: 'Annular eclipses show a bright ring.', ur: 'حلقہ نما گرہن میں چمکدار حلقہ نظر آتا ہے۔' },
            { en: 'Lunar eclipses are safe to view directly.', ur: 'چاند گرہن کو براہِ راست دیکھنا محفوظ ہے۔' },
            { en: 'Looking at Sun without protection can damage eyes.', ur: 'بغیر تحفظ کے سورج کو دیکھنا آنکھوں کو نقصان پہنچا سکتا ہے۔' },
            { en: 'During totality, Sun\'s corona becomes visible.', ur: 'مکمل تاریکی کے دوران سورج کا تاج نظر آتا ہے۔' },
            { en: 'Lunar eclipses can appear red.', ur: 'چاند گرہن سرخ دکھائی دے سکتے ہیں۔' },
            { en: 'Red color comes from Earth\'s atmosphere.', ur: 'سرخ رنگ زمین کی فضا سے آتا ہے۔' },
            { en: 'Penumbral eclipses are subtle.', ur: 'نیم سایہ گرہن ہلکے ہوتے ہیں۔' },
            { en: 'Eclipse paths move across Earth.', ur: 'گرہن کے راستے زمین پر حرکت کرتے ہیں۔' },
            { en: 'NASA calculates eclipses many years ahead.', ur: 'ناسا گرہن کئی سال پہلے سے حساب کرتی ہے۔' },
            { en: 'Solar eclipses can be total, partial or annular.', ur: 'سورج گرہن مکمل، جزوی یا حلقہ نما ہو سکتے ہیں۔' },
            { en: 'Lunar eclipses can be total, partial or penumbral.', ur: 'چاند گرہن مکمل، جزوی یا نیم سایہ ہو سکتے ہیں۔' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              {renderText(fact.en, fact.ur)}
            </div>
          ))}
        </div>
      </section>

      {/* Section 12: Quiz */}
      <section id="quiz">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Test Your Knowledge', 'اپنے علم کی جانچ کریں')}
        </h2>
        {!quizStarted ? (
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Ready to test what you learned about eclipses?', 'کیا آپ گرہن کے بارے میں جو سیکھا اس کی جانچ کرنے کے لیے تیار ہیں؟')}
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
          {renderText('Sources and Educational Note', 'ماخذ اور تعلیمی نوٹ')}
        </h2>
        <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {renderText(
              'Educational note: Eclipse diagrams simplify real sizes and distances. They are designed to explain alignment, shadows and geometry, not to show the Solar System at true scale.',
              'تعلیمی نوٹ: گرہن کے خاکے اصل سائز اور فاصلے کو سادہ بناتے ہیں۔ ان کا مقصد سیدھ، سائے اور جیومیٹری کو سمجھانا ہے، نہ کہ نظامِ شمسی کو حقیقی پیمانے پر دکھانا۔'
            )}
          </p>
        </div>
        <div className="space-y-2">
          {['NASA Eclipses', 'NASA Solar Eclipses Types', 'NASA Lunar Eclipses', 'NASA Future Eclipses', 'NASA Eclipse Safety', 'NASA Scientific Visualization Studio'].map((source, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {source}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
