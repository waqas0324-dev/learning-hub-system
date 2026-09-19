import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ScientificImage } from '../components/ScientificImage';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { BilingualFlowchart } from '../components/BilingualFlowchart';
import { InteractiveDiagram } from '../components/InteractiveDiagram';
import { CheckCircle, XCircle, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

export function MoonSunStarsPage() {
  const navigate = useNavigate();
  const { language } = useApp();
  
  // Moon phases carousel state
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phasePlaying, setPhasePlaying] = useState(false);
  
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('sslh-moon-sun-stars-quiz-best');
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

  // Moon phases data
  const moonPhases = [
    {
      name: { en: 'New Moon', ur: 'نیا چاند' },
      day: '0',
      en: 'At new Moon, the Moon is located roughly between Earth and the Sun. The sunlit half faces mostly away from Earth, so the Moon is difficult or impossible to see in the daytime glare. A solar eclipse can occur only near a new Moon, but it does not happen every month because the Moon\'s orbit is tilted.',
      ur: 'نئے چاند کے وقت چاند تقریباً زمین اور سورج کے درمیان ہوتا ہے۔ اس کا سورج سے روشن نصف حصہ زیادہ تر زمین سے دوسری طرف ہوتا ہے، اس لیے دن کی تیز روشنی میں چاند کو دیکھنا مشکل یا ناممکن ہوتا ہے۔ سورج گرہن صرف نئے چاند کے قریب ہو سکتا ہے، لیکن ہر مہینے نہیں ہوتا کیونکہ چاند کا مدار جھکا ہوا ہے۔'
    },
    {
      name: { en: 'Waxing Crescent', ur: 'بڑھتا ہوا ہلال' },
      day: '3–4',
      en: 'After new Moon, a thin curved strip of light becomes visible. This is called a waxing crescent because the visible illuminated part is growing each evening.',
      ur: 'نئے چاند کے بعد روشنی کی ایک باریک خم دار پٹی نظر آنا شروع ہوتی ہے۔ اسے بڑھتا ہوا ہلال کہتے ہیں کیونکہ ہر شام نظر آنے والا روشن حصہ بڑا ہوتا جاتا ہے۔'
    },
    {
      name: { en: 'First Quarter', ur: 'پہلی تربیع' },
      day: '7',
      en: 'At first quarter, about half of the Moon\'s visible disk appears illuminated. The name does not mean the Moon is only one-quarter lit; it means the Moon has completed about one-quarter of its orbit around Earth since new Moon.',
      ur: 'پہلی تربیع کے وقت چاند کی نظر آنے والی قرص کا تقریباً آدھا حصہ روشن دکھائی دیتا ہے۔ اس نام کا مطلب یہ نہیں کہ چاند صرف ایک چوتھائی روشن ہے؛ اس کا مطلب ہے کہ نئے چاند کے بعد چاند زمین کے گرد اپنے مدار کا تقریباً ایک چوتھائی حصہ مکمل کر چکا ہوتا ہے۔'
    },
    {
      name: { en: 'Waxing Gibbous', ur: 'بڑھتا ہوا محدب چاند' },
      day: '10–11',
      en: 'More than half of the visible Moon is illuminated, but it is not yet full. The illuminated portion continues to grow each night.',
      ur: 'چاند کا نظر آنے والا آدھے سے زیادہ حصہ روشن ہوتا ہے، مگر ابھی پورا چاند نہیں بنتا۔ روشن حصہ ہر رات بڑھتا رہتا ہے۔'
    },
    {
      name: { en: 'Full Moon', ur: 'پورا چاند' },
      day: '14–15',
      en: 'At full Moon, Earth is roughly between the Sun and the Moon. The Moon\'s Earth-facing side is almost fully illuminated, so it appears as a bright round disk. A lunar eclipse can occur only near a full Moon, but not every full Moon produces an eclipse.',
      ur: 'پورے چاند کے وقت زمین تقریباً سورج اور چاند کے درمیان ہوتی ہے۔ چاند کا زمین کی طرف والا حصہ تقریباً مکمل طور پر روشن ہوتا ہے، اس لیے یہ ایک روشن گول قرص کی طرح دکھائی دیتا ہے۔ چاند گرہن صرف پورے چاند کے قریب ہو سکتا ہے، مگر ہر پورے چاند پر گرہن نہیں ہوتا۔'
    },
    {
      name: { en: 'Waning Gibbous', ur: 'گھٹتا ہوا محدب چاند' },
      day: '18–19',
      en: 'After full Moon, the visible illuminated part starts to decrease. The Moon is still more than half illuminated from our view, but it gets smaller night by night.',
      ur: 'پورے چاند کے بعد نظر آنے والا روشن حصہ کم ہونا شروع ہوتا ہے۔ ہماری نظر سے چاند کا آدھے سے زیادہ حصہ ابھی روشن ہوتا ہے، مگر یہ رات بہ رات چھوٹا ہوتا جاتا ہے۔'
    },
    {
      name: { en: 'Last Quarter', ur: 'آخری تربیع' },
      day: '22',
      en: 'At last quarter, about half of the Moon\'s visible disk is illuminated again, but the opposite half is lit compared with first quarter. The Moon has now completed about three-quarters of its orbit since new Moon.',
      ur: 'آخری تربیع کے وقت چاند کی نظر آنے والی قرص کا تقریباً آدھا حصہ پھر سے روشن ہوتا ہے، مگر پہلی تربیع کے مقابلے میں دوسری سمت کا حصہ روشن دکھائی دیتا ہے۔ اب چاند نئے چاند کے بعد اپنے مدار کا تقریباً تین چوتھائی حصہ مکمل کر چکا ہوتا ہے۔'
    },
    {
      name: { en: 'Waning Crescent', ur: 'گھٹتا ہوا ہلال' },
      day: '25–26',
      en: 'Near the end of the lunar cycle, only a thin crescent remains visible before the Moon returns to the new Moon phase. The visible illuminated part is shrinking.',
      ur: 'قمری چکر کے اختتام کے قریب صرف ایک باریک ہلال نظر آتا ہے، پھر چاند دوبارہ نئے چاند کی حالت میں واپس آتا ہے۔ نظر آنے والا روشن حصہ کم ہوتا جا رہا ہوتا ہے۔'
    }
  ];

  // Auto-play moon phases
  useEffect(() => {
    if (!phasePlaying) return;
    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % moonPhases.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [phasePlaying]);

  // Quiz questions
  const quizQuestions = [
    {
      question: { en: 'What is the Sun?', ur: 'سورج کیا ہے؟' },
      options: [
        { en: 'A planet', ur: 'ایک سیارہ' },
        { en: 'A star', ur: 'ایک ستارہ' },
        { en: 'A moon', ur: 'ایک چاند' },
        { en: 'An asteroid', ur: 'ایک سیارچہ' }
      ],
      correct: 1,
      explanation: { en: 'The Sun is a star at the center of our Solar System.', ur: 'سورج ہمارے نظامِ شمسی کے مرکز میں ایک ستارہ ہے۔' }
    },
    {
      question: { en: 'Why does the Sun shine?', ur: 'سورج کیوں چمکتا ہے؟' },
      options: [
        { en: 'It is burning like fire', ur: 'یہ آگ کی طرح جل رہا ہے' },
        { en: 'Nuclear fusion in its core', ur: 'اس کے مرکز میں جوہری ملاپ' },
        { en: 'It reflects light from stars', ur: 'یہ ستاروں کی روشنی منعکس کرتا ہے' },
        { en: 'It is made of ice', ur: 'یہ برف سے بنا ہے' }
      ],
      correct: 1,
      explanation: { en: 'Nuclear fusion in the Sun\'s core releases enormous energy as light and heat.', ur: 'سورج کے مرکز میں جوہری ملاپ سے روشنی اور حرارت کی صورت میں بہت زیادہ توانائی خارج ہوتی ہے۔' }
    },
    {
      question: { en: 'What is nuclear fusion?', ur: 'جوہری ملاپ کیا ہے؟' },
      options: [
        { en: 'Splitting atoms apart', ur: 'ایٹموں کو توڑنا' },
        { en: 'Joining atomic nuclei together', ur: 'ایٹمی مرکزوں کو جوڑنا' },
        { en: 'Burning fuel', ur: 'ایندھن جلانا' },
        { en: 'Cooling down matter', ur: 'مادے کو ٹھنڈا کرنا' }
      ],
      correct: 1,
      explanation: { en: 'Nuclear fusion is the process where atomic nuclei join together, releasing energy.', ur: 'جوہری ملاپ وہ عمل ہے جس میں ایٹمی مرکزے آپس میں جڑتے ہیں اور توانائی خارج ہوتی ہے۔' }
    },
    {
      question: { en: 'Does the Moon create its own visible light?', ur: 'کیا چاند اپنی مرئی روشنی خود پیدا کرتا ہے؟' },
      options: [
        { en: 'Yes, like the Sun', ur: 'ہاں، سورج کی طرح' },
        { en: 'No, it reflects sunlight', ur: 'نہیں، یہ سورج کی روشنی منعکس کرتا ہے' },
        { en: 'Only at night', ur: 'صرف رات کو' },
        { en: 'Only during full Moon', ur: 'صرف پورے چاند کے وقت' }
      ],
      correct: 1,
      explanation: { en: 'The Moon shines because it reflects sunlight; it does not produce its own visible light.', ur: 'چاند سورج کی روشنی منعکس کرنے کی وجہ سے چمکتا ہے؛ یہ اپنی مرئی روشنی خود پیدا نہیں کرتا۔' }
    },
    {
      question: { en: 'What causes Moon phases?', ur: 'چاند کی حالتیں کس کی وجہ سے بنتی ہیں؟' },
      options: [
        { en: 'Earth\'s shadow', ur: 'زمین کا سایہ' },
        { en: 'Our changing view of the Moon\'s sunlit half', ur: 'چاند کے سورج سے روشن نصف حصے کا بدلتا ہوا نظارہ' },
        { en: 'The Moon changing shape', ur: 'چاند کی شکل بدلنا' },
        { en: 'Clouds covering the Moon', ur: 'بادل چاند کو ڈھانپ لیتے ہیں' }
      ],
      correct: 1,
      explanation: { en: 'Moon phases are caused by our changing view of the Moon\'s sunlit half as it orbits Earth.', ur: 'چاند کی حالتیں زمین کے گرد چاند کے مدار میں اس کے سورج سے روشن نصف حصے کے بدلتے ہوئے نظارے کی وجہ سے بنتی ہیں۔' }
    },
    {
      question: { en: 'How long is the Moon phase cycle?', ur: 'چاند کی حالتوں کا چکر کتنا لمبا ہوتا ہے؟' },
      options: [
        { en: 'About 7 days', ur: 'تقریباً 7 دن' },
        { en: 'About 29.5 days', ur: 'تقریباً 29.5 دن' },
        { en: 'About 365 days', ur: 'تقریباً 365 دن' },
        { en: 'About 24 hours', ur: 'تقریباً 24 گھنٹے' }
      ],
      correct: 1,
      explanation: { en: 'The Moon phase cycle takes about 29.5 days from one new Moon to the next.', ur: 'چاند کی حالتوں کا چکر ایک نئے چاند سے اگلے نئے چاند تک تقریباً 29.5 دن لیتا ہے۔' }
    },
    {
      question: { en: 'Why do we usually see the same side of the Moon?', ur: 'ہم عموماً چاند کا ایک ہی رخ کیوں دیکھتے ہیں؟' },
      options: [
        { en: 'The Moon does not rotate', ur: 'چاند گھومتا نہیں' },
        { en: 'Moon rotation period equals its orbit period', ur: 'چاند کی گردش کی مدت اس کے مدار کی مدت کے برابر ہے' },
        { en: 'Earth blocks the other side', ur: 'زمین دوسری طرف کو روکتی ہے' },
        { en: 'The other side is always dark', ur: 'دوسری طرف ہمیشہ تاریک ہوتی ہے' }
      ],
      correct: 1,
      explanation: { en: 'The Moon rotates on its axis in about the same time it takes to orbit Earth, so the same side faces us.', ur: 'چاند اپنے محور کے گرد تقریباً اتنے ہی وقت میں گھومتا ہے جتنا وقت اسے زمین کے گرد ایک چکر مکمل کرنے میں لگتا ہے، اس لیے ایک ہی رخ ہماری طرف رہتا ہے۔' }
    },
    {
      question: { en: 'What causes craters on the Moon?', ur: 'چاند پر گڑھے کس کی وجہ سے بنتے ہیں؟' },
      options: [
        { en: 'Volcanoes', ur: 'آتش فشاں' },
        { en: 'Asteroid and meteoroid impacts', ur: 'سیارچوں اور شہابی اجسام کے ٹکراؤ' },
        { en: 'Wind erosion', ur: 'ہوا سے کٹاؤ' },
        { en: 'Water flow', ur: 'پانی کا بہاؤ' }
      ],
      correct: 1,
      explanation: { en: 'Most lunar craters formed when asteroids and meteoroids struck the Moon long ago.', ur: 'چاند کے زیادہ تر گڑھے بہت عرصہ پہلے سیارچوں اور شہابی اجسام کے ٹکرانے سے بنے۔' }
    },
    {
      question: { en: 'What causes day and night on Earth?', ur: 'زمین پر دن اور رات کس کی وجہ سے ہوتے ہیں؟' },
      options: [
        { en: 'Earth orbiting the Sun', ur: 'زمین کا سورج کے گرد گھومنا' },
        { en: 'Earth rotating on its axis', ur: 'زمین کا اپنے محور پر گھومنا' },
        { en: 'The Moon blocking the Sun', ur: 'چاند کا سورج کو روکنا' },
        { en: 'Clouds moving across Earth', ur: 'بادل زمین پر حرکت کرنا' }
      ],
      correct: 1,
      explanation: { en: 'Earth rotates once in about 24 hours, creating day and night as different parts face the Sun.', ur: 'زمین تقریباً 24 گھنٹوں میں ایک چکر مکمل کرتی ہے، جس سے مختلف حصے سورج کی طرف اور دور ہو کر دن اور رات بناتے ہیں۔' }
    },
    {
      question: { en: 'Why does the Moon rise later each day?', ur: 'چاند ہر روز بعد میں کیوں طلوع ہوتا ہے؟' },
      options: [
        { en: 'Earth rotates slower', ur: 'زمین آہستہ گھومتی ہے' },
        { en: 'The Moon moves along its orbit around Earth', ur: 'چاند زمین کے گرد اپنے مدار میں آگے بڑھتا ہے' },
        { en: 'The Sun moves faster', ur: 'سورج تیزی سے حرکت کرتا ہے' },
        { en: 'Stars push the Moon', ur: 'ستارے چاند کو دھکیلتے ہیں' }
      ],
      correct: 1,
      explanation: { en: 'The Moon rises about 50 minutes later each day because it moves along its orbit around Earth.', ur: 'چاند اوسطاً ہر روز تقریباً 50 منٹ بعد طلوع ہوتا ہے کیونکہ وہ زمین کے گرد اپنے مدار میں آگے بڑھتا رہتا ہے۔' }
    },
    {
      question: { en: 'What are stars mostly made of?', ur: 'ستارے بنیادی طور پر کس سے بنے ہوتے ہیں؟' },
      options: [
        { en: 'Rock and metal', ur: 'چٹان اور دھات' },
        { en: 'Hydrogen and helium', ur: 'ہائیڈروجن اور ہیلیم' },
        { en: 'Ice and dust', ur: 'برف اور گرد' },
        { en: 'Carbon dioxide', ur: 'کاربن ڈائی آکسائیڈ' }
      ],
      correct: 1,
      explanation: { en: 'Most stars are made mostly of hydrogen and helium.', ur: 'زیادہ تر ستارے بنیادی طور پر ہائیڈروجن اور ہیلیم پر مشتمل ہوتے ہیں۔' }
    },
    {
      question: { en: 'How do stars form?', ur: 'ستارے کیسے بنتے ہیں؟' },
      options: [
        { en: 'From explosions', ur: 'دھماکوں سے' },
        { en: 'In gas and dust clouds called nebulae', ur: 'گیس اور گرد کے بادلوں میں جنہیں سحابیہ کہتے ہیں' },
        { en: 'From planets colliding', ur: 'سیاروں کے ٹکرانے سے' },
        { en: 'From black holes', ur: 'بلیک ہولز سے' }
      ],
      correct: 1,
      explanation: { en: 'Stars begin in giant clouds of gas and dust called nebulae, where gravity pulls matter together.', ur: 'ستارے گیس اور گرد کے بہت بڑے بادلوں میں پیدا ہوتے ہیں جنہیں سحابیہ کہا جاتا ہے، جہاں کششِ ثقل مادے کو اکٹھا کرتی ہے۔' }
    },
    {
      question: { en: 'Which star colors are generally hotter?', ur: 'کون سے ستاروں کے رنگ عمومی طور پر زیادہ گرم ہوتے ہیں؟' },
      options: [
        { en: 'Red and orange', ur: 'سرخ اور نارنجی' },
        { en: 'Blue and white', ur: 'نیلا اور سفید' },
        { en: 'Yellow and green', ur: 'پیلا اور سبز' },
        { en: 'All colors are the same temperature', ur: 'تمام رنگ ایک ہی درجہ حرارت کے ہوتے ہیں' }
      ],
      correct: 1,
      explanation: { en: 'Hotter stars tend to look bluer or whiter, while cooler stars tend to look orange or red.', ur: 'زیادہ گرم ستارے نیلے یا سفید دکھائی دیتے ہیں، جبکہ نسبتاً ٹھنڈے ستارے نارنجی یا سرخ ہوتے ہیں۔' }
    },
    {
      question: { en: 'What is Proxima Centauri?', ur: 'پروکسیما سینٹوری کیا ہے؟' },
      options: [
        { en: 'A planet', ur: 'ایک سیارہ' },
        { en: 'The nearest star to our Solar System', ur: 'ہمارے نظامِ شمسی کے قریب ترین ستارہ' },
        { en: 'A galaxy', ur: 'ایکہ کہکشاں' },
        { en: 'A moon of Jupiter', ur: 'مشتری کا چاند' }
      ],
      correct: 1,
      explanation: { en: 'Proxima Centauri is the nearest individual star to our Solar System, about 4.24 light-years away.', ur: 'پروکسیما سینٹوری ہمارے نظامِ شمسی کے قریب ترین انفرادی ستارہ ہے، جو تقریباً 4.24 نوری سال دور ہے۔' }
    },
    {
      question: { en: 'What is a light-year?', ur: 'نوری سال کیا ہے؟' },
      options: [
        { en: 'A unit of time', ur: 'وقت کی اکائی' },
        { en: 'A unit of distance', ur: 'فاصلے کی اکائی' },
        { en: 'A type of star', ur: 'ستارے کی قسم' },
        { en: 'A year on another planet', ur: 'دوسرے سیارے پر ایک سال' }
      ],
      correct: 1,
      explanation: { en: 'A light-year is the distance light travels in one year; it is a distance unit, not a time unit.', ur: 'نوری سال وہ فاصلہ ہے جو روشنی ایک سال میں طے کرتی ہے؛ یہ وقت نہیں بلکہ فاصلے کی اکائی ہے۔' }
    },
    {
      question: { en: 'What is a constellation?', ur: 'برج کیا ہے؟' },
      options: [
        { en: 'A single bright star', ur: 'ایک روشن ستارہ' },
        { en: 'A recognized pattern or region of stars', ur: 'ستاروں کا تسلیم شدہ نمونہ یا خطہ' },
        { en: 'A type of planet', ur: 'سیارے کی قسم' },
        { en: 'A galaxy', ur: 'ایک کہکشاں' }
      ],
      correct: 1,
      explanation: { en: 'A constellation is a recognized pattern or region of the sky made up of stars.', ur: 'برج آسمان میں ستاروں کا کوئی تسلیم شدہ نمونہ یا خطہ ہوتا ہے۔' }
    },
    {
      question: { en: 'What is the difference between Moon phases and eclipses?', ur: 'چاند کی حالتوں اور گرہن میں کیا فرق ہے؟' },
      options: [
        { en: 'They are the same thing', ur: 'دونوں ایک ہی چیز ہیں' },
        { en: 'Phases happen monthly; eclipses are special alignments', ur: 'حالتیں ماہانہ ہوتی ہیں؛ گرہن خاص سیدھ میں ہوتے ہیں' },
        { en: 'Eclipses happen every month', ur: 'گرہن ہر مہینے ہوتے ہیں' },
        { en: 'Phases only happen at night', ur: 'حالتیں صرف رات کو ہوتی ہیں' }
      ],
      correct: 1,
      explanation: { en: 'Moon phases happen every month; eclipses are special alignments that do not occur every month.', ur: 'چاند کی حالتیں ہر مہینے ہوتی ہیں؛ گرہن خاص قسم کی سیدھ ہیں جو ہر مہینے نہیں ہوتیں۔' }
    },
    {
      question: { en: 'What alignment causes a solar eclipse?', ur: 'سورج گرہن کس سیدھ سے ہوتا ہے؟' },
      options: [
        { en: 'Earth between Sun and Moon', ur: 'سورج اور چاند کے درمیان زمین' },
        { en: 'Moon between Earth and Sun', ur: 'زمین اور سورج کے درمیان چاند' },
        { en: 'Sun between Earth and Moon', ur: 'زمین اور چاند کے درمیان سورج' },
        { en: 'Any random alignment', ur: 'کوئی بھی بےترتیب سیدھ' }
      ],
      correct: 1,
      explanation: { en: 'A solar eclipse happens when the Moon moves between Earth and the Sun.', ur: 'سورج گرہن اس وقت ہوتا ہے جب چاند زمین اور سورج کے درمیان آ جائے۔' }
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
        localStorage.setItem('sslh-moon-sun-stars-quiz-best', newScore.toString());
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
          {renderText('The Moon, the Sun and the Stars', 'چاند، سورج اور تارے')}
        </h1>
      </div>

      {/* Hero Section */}
      <section className="rounded-2xl overflow-hidden border p-6 md:p-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Meet Our Nearest Neighbors in Space', 'خلا میں ہمارے قریب ترین پڑوسیوں سے ملیں')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Sun gives Earth light and heat. The Moon is Earth\'s natural companion and changes its appearance throughout the month. The stars we see at night are distant suns, many of them far larger or brighter than our own Sun.',
            'سورج زمین کو روشنی اور حرارت دیتا ہے۔ چاند زمین کا قدرتی ساتھی ہے اور مہینے کے دوران اپنی شکل بدلتا ہوا دکھائی دیتا ہے۔ رات کو نظر آنے والے ستارے دور دراز سورج ہیں، جن میں سے بہت سے ہمارے سورج سے بڑے یا زیادہ روشن ہیں۔'
          )}
        </p>
        <div className="flex justify-center mb-6">
          <div className="relative w-64 h-64">
            {/* Sun */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00 60%, #ff4500)', boxShadow: '0 0 30px #ff8c00, 0 0 60px #ff450060' }} />
            {/* Earth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-blue-400/30" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
            {/* Moon */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0 50%, #606060)' }} />
          </div>
        </div>
        <p className="text-xs italic text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Educational illustration — not to scale.', 'تعلیمی خاکہ — حقیقی پیمانے پر نہیں۔')}
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { en: 'The Sun', ur: 'سورج', id: 'sun' },
            { en: 'The Moon', ur: 'چاند', id: 'moon' },
            { en: 'Moon Phases', ur: 'چاند کی حالتیں', id: 'phases' },
            { en: 'Stars', ur: 'ستارے', id: 'stars' },
            { en: 'Constellations', ur: 'برج', id: 'constellations' },
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

      {/* Section 1: The Sun */}
      <section id="sun">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('The Sun — Our Star', 'سورج — ہمارا ستارہ')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Sun is the star at the center of our Solar System. It is a huge, hot ball of plasma, a state of matter made of electrically charged particles. Its gravity holds the Solar System together and keeps the planets moving in their orbits. The Sun is not a solid burning ball like a campfire; it shines because nuclear fusion in its core releases enormous amounts of energy.',
            'سورج ہمارے نظامِ شمسی کے مرکز میں موجود ایک ستارہ ہے۔ یہ پلازما کا ایک بہت بڑا اور انتہائی گرم گولا ہے؛ پلازما مادے کی ایسی حالت ہے جس میں برقی چارج رکھنے والے ذرات موجود ہوتے ہیں۔ سورج کی کششِ ثقل نظامِ شمسی کو ایک ساتھ رکھتی ہے اور سیاروں کو ان کے مدار میں حرکت دیتی ہے۔ سورج کیمپ فائر کی طرح کوئی ٹھوس جلتا ہوا گولا نہیں ہے؛ یہ اس لیے چمکتا ہے کیونکہ اس کے مرکز میں جوہری ملاپ سے بہت زیادہ توانائی خارج ہوتی ہے۔'
          )}
        </p>
        
        {/* Sun Image */}
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00 60%, #ff4500 85%, #cc2200)', boxShadow: '0 0 40px #ff8c00, 0 0 80px #ff450060' }} />
        </div>
        <p className="text-xs italic text-center mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText('The Sun — our nearest star.', 'سورج — ہمارا قریب ترین ستارہ۔')}
          <br />
          {renderText('Source: NASA/SDO', 'ماخذ: ناسا/ایس ڈی او')}
        </p>

        {/* Sun Layers Diagram */}
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          {renderText('Sun Layers', 'سورج کی تہیں')}
        </h3>
        <InteractiveDiagram
          labels={[
            { id: 'core', x: 50, y: 50, en: 'Core', ur: 'مرکز', description: { en: 'Where nuclear fusion occurs. Temperature about 15 million °C.', ur: 'جہاں جوہری ملاپ ہوتا ہے۔ درجہ حرارت تقریباً 1.5 کروڑ ڈگری سیلسیس۔' } },
            { id: 'radiative', x: 35, y: 35, en: 'Radiative Zone', ur: 'شعاعی تہہ', description: { en: 'Energy moves outward through radiation.', ur: 'توانائی شعاعوں کے ذریعے باہر کی طرف حرکت کرتی ہے۔' } },
            { id: 'convective', x: 65, y: 35, en: 'Convective Zone', ur: 'حرارتی نقل و حمل کی تہہ', description: { en: 'Hot plasma rises and cooler plasma sinks.', ur: 'گرم پلازما اوپر اٹھتا ہے اور ٹھنڈا پلازما نیچے آتا ہے۔' } },
            { id: 'photosphere', x: 50, y: 20, en: 'Photosphere', ur: 'مرئی سطح', description: { en: 'The visible surface of the Sun.', ur: 'سورج کی نظر آنے والی سطح۔' } },
            { id: 'chromosphere', x: 30, y: 65, en: 'Chromosphere', ur: 'رنگی تہہ', description: { en: 'A layer above the photosphere.', ur: 'مرئی سطح کے اوپر کی تہہ۔' } },
            { id: 'corona', x: 70, y: 65, en: 'Corona', ur: 'بیرونی تاج', description: { en: 'The outer atmosphere, visible during eclipses.', ur: 'بیرونی فضا، گرہن کے دوران نظر آتی ہے۔' } }
          ]}
          title={{ en: 'Interactive Sun Layers', ur: 'تفاعلی سورج کی تہیں' }}
          showNotToScale={true}
          fallbackGradient="radial-gradient(circle at 50% 50%, #fff7a0, #ffcc00 20%, #ff8c00 40%, #ff4500 60%, #cc2200 80%, #660000)"
        />

        {/* Nuclear Fusion Flowchart */}
        <h3 className="text-xl font-bold mb-3 mt-6" style={{ color: 'var(--text-primary)' }}>
          {renderText('Why Does the Sun Shine?', 'سورج کیوں چمکتا ہے؟')}
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Deep inside the Sun, extreme pressure and temperature allow hydrogen nuclei to join together and form helium. This process is called nuclear fusion. A tiny amount of mass is converted into energy, which slowly travels outward and finally leaves the Sun as light and heat.',
            'سورج کے بہت گہرے اندر انتہائی دباؤ اور درجہ حرارت ہائیڈروجن کے مرکزوں کو آپس میں مل کر ہیلیم بنانے کے قابل بناتے ہیں۔ اس عمل کو جوہری ملاپ کہتے ہیں۔ کمیت کا ایک نہایت چھوٹا حصہ توانائی میں تبدیل ہوتا ہے، جو آہستہ آہستہ باہر کی طرف سفر کرتی ہے اور آخرکار روشنی اور حرارت کی صورت میں سورج سے نکلتی ہے۔'
          )}
        </p>
        <BilingualFlowchart
          steps={[
            { en: 'Hydrogen nuclei', ur: 'ہائیڈروجن کے مرکزے' },
            { en: 'Nuclear fusion', ur: 'جوہری ملاپ' },
            { en: 'Helium + energy', ur: 'ہیلیم + توانائی' },
            { en: 'Energy moves outward', ur: 'توانائی باہر جاتی ہے' },
            { en: 'Sunlight and heat', ur: 'سورج کی روشنی اور حرارت' }
          ]}
        />

        {/* Sun Facts Dashboard */}
        <h3 className="text-xl font-bold mb-3 mt-6" style={{ color: 'var(--text-primary)' }}>
          {renderText('Sun Facts', 'سورج کے حقائق')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { en: 'Type: G-type main-sequence star', ur: 'قسم: جی قسم کا مرکزی سلسلہ ستارہ' },
            { en: 'Diameter: ~1,392,700 km', ur: 'قطر: تقریباً 13,92,700 کلومیٹر' },
            { en: 'Age: ~4.6 billion years', ur: 'عمر: تقریباً 4.6 ارب سال' },
            { en: 'Surface: ~5,500°C', ur: 'سطح: تقریباً 5,500 ڈگری' },
            { en: 'Core: ~15 million°C', ur: 'مرکز: تقریباً 1.5 کروڑ ڈگری' },
            { en: 'Distance: ~149.6 million km', ur: 'فاصلہ: تقریباً 14.96 کروڑ کلومیٹر' },
            { en: 'Light travel: ~8 min 20 sec', ur: 'روشنی کا سفر: تقریباً 8 منٹ 20 سیکنڈ' },
            { en: 'Mass: 99.8% of Solar System', ur: 'کمیت: نظامِ شمسی کا 99.8٪' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              {renderText(fact.en, fact.ur)}
            </div>
          ))}
        </div>

        {/* Why Sun Matters */}
        <h3 className="text-xl font-bold mb-3 mt-6" style={{ color: 'var(--text-primary)' }}>
          {renderText('Why the Sun Matters', 'سورج کیوں اہم ہے')}
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Sun provides the energy that warms Earth\'s surface and atmosphere. It drives the water cycle by causing evaporation, supports plant growth through photosynthesis, and helps create many weather patterns.',
            'سورج وہ توانائی فراہم کرتا ہے جو زمین کی سطح اور فضا کو گرم کرتی ہے۔ یہ بخارات بننے کے عمل کے ذریعے آبی چکر کو چلاتا ہے، ضیائی تالیف کے ذریعے پودوں کی نشوونما میں مدد دیتا ہے، اور موسم کے بہت سے نمونے بنانے میں کردار ادا کرتا ہے۔'
          )}
        </p>
        <BilingualFlowchart
          steps={[
            { en: 'Sunlight', ur: 'سورج کی روشنی' },
            { en: 'Warms land/oceans', ur: 'خشکی/سمندر گرم' },
            { en: 'Evaporation', ur: 'بخارات' },
            { en: 'Clouds form', ur: 'بادل بنتے ہیں' },
            { en: 'Rain/snow', ur: 'بارش/برف' }
          ]}
        />
      </section>

      {/* Section 2: The Moon */}
      <section id="moon">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('The Moon — Earth\'s Natural Satellite', 'چاند — زمین کا قدرتی سیارہ نما ساتھی')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Moon is Earth\'s only natural satellite. It is a rocky world that orbits Earth and shines because it reflects sunlight. The Moon does not make its own visible light like the Sun. Its surface has craters, mountains, dark plains called maria and dust-like material called regolith.',
            'چاند زمین کا واحد قدرتی سیارہ نما ساتھی ہے۔ یہ ایک پتھریلی دنیا ہے جو زمین کے گرد گردش کرتی ہے اور سورج کی روشنی منعکس کرنے کی وجہ سے چمکتا ہوا دکھائی دیتا ہے۔ چاند سورج کی طرح اپنی مرئی روشنی خود پیدا نہیں کرتا۔ اس کی سطح پر گڑھے، پہاڑ، مَیریا کہلانے والے تاریک میدان اور ریگولتھ نامی گرد جیسا مادہ موجود ہے۔'
          )}
        </p>

        {/* Moon Image */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0 40%, #606060 70%, #404040)', boxShadow: '0 0 20px rgba(200, 200, 200, 0.3)' }} />
        </div>
        <p className="text-xs italic text-center mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText('The Moon — Earth\'s natural satellite.', 'چاند — زمین کا قدرتی سیارہ نما ساتھی۔')}
          <br />
          {renderText('Source: NASA/Apollo', 'ماخذ: ناسا/اپولو')}
        </p>

        {/* Moon Facts Dashboard */}
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          {renderText('Moon Facts', 'چاند کے حقائق')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { en: 'Distance: ~384,400 km', ur: 'فاصلہ: تقریباً 3,84,400 کلومیٹر' },
            { en: 'Diameter: ~3,475 km', ur: 'قطر: تقریباً 3,475 کلومیٹر' },
            { en: 'Gravity: ~1/6 of Earth', ur: 'کششِ ثقل: زمین کا تقریباً 1/6' },
            { en: 'Orbital period: ~27.3 days', ur: 'مداری مدت: تقریباً 27.3 دن' },
            { en: 'Phase cycle: ~29.5 days', ur: 'حالتوں کا چکر: تقریباً 29.5 دن' },
            { en: 'Atmosphere: extremely thin', ur: 'فضا: انتہائی پتلی' },
            { en: 'Surface: rocky, cratered', ur: 'سطح: پتھریلی، گڑھوں والی' },
            { en: 'Natural moons of Earth: 1', ur: 'زمین کے قدرتی چاند: 1' }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              {renderText(fact.en, fact.ur)}
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Moon Orbit and Same Side */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Why Do We Usually See the Same Side of the Moon?', 'ہم عموماً چاند کا ایک ہی رخ کیوں دیکھتے ہیں؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Moon rotates on its axis in about the same amount of time that it takes to orbit Earth. This synchronized motion is often called tidal locking. Because of this, the same hemisphere usually faces Earth. The far side of the Moon is not permanently dark; it receives sunlight too, but it is usually turned away from Earth.',
            'چاند اپنے محور کے گرد تقریباً اتنے ہی وقت میں گھومتا ہے جتنا وقت اسے زمین کے گرد ایک چکر مکمل کرنے میں لگتا ہے۔ اس ہم آہنگ حرکت کو اکثر مدّی قفل بندی کہا جاتا ہے۔ اسی وجہ سے چاند کا تقریباً ایک ہی نصف کرہ عموماً زمین کی طرف رہتا ہے۔ چاند کا دور والا حصہ ہمیشہ تاریک نہیں رہتا؛ اسے بھی سورج کی روشنی ملتی ہے، لیکن وہ زیادہ تر زمین کی طرف نہیں ہوتا۔'
          )}
        </p>

        {/* Earth-Moon Orbit Animation */}
        <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-48">
              {/* Earth */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
              {/* Orbit path */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-gray-400/30" />
              {/* Moon orbiting */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40" style={{ animation: 'orbit 10s linear infinite' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0 40%, #606060)' }} />
              </div>
            </div>
          </div>
          <p className="text-xs italic text-center" style={{ color: 'var(--text-secondary)' }}>
            {renderText('Educational animation — not to scale.', 'تعلیمی حرکت — حقیقی پیمانے پر نہیں۔')}
          </p>
        </div>

        <BilingualFlowchart
          steps={[
            { en: 'Moon rotation period', ur: 'چاند کی محوری گردش کی مدت' },
            { en: '≈ Moon orbit period', ur: '≈ چاند کی مداری مدت' },
            { en: 'Same side faces Earth', ur: 'ایک ہی رخ زمین کی طرف' }
          ]}
        />
      </section>

      {/* Section 4: Moon Surface and Craters */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Why Does the Moon Have So Many Craters?', 'چاند پر اتنے زیادہ گڑھے کیوں ہیں؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Most lunar craters formed when asteroids and meteoroids struck the Moon long ago. Because the Moon has almost no thick atmosphere, rain, rivers or strong wind, many old craters remain visible for a very long time. On Earth, weather and plate movement erase many impact marks over time.',
            'چاند کے زیادہ تر گڑھے بہت عرصہ پہلے سیارچوں اور شہابی اجسام کے ٹکرانے سے بنے۔ چونکہ چاند پر کوئی موٹی فضا، بارش، دریا یا تیز ہوائیں موجود نہیں ہیں، اس لیے پرانے گڑھے بہت طویل عرصے تک واضح رہتے ہیں۔ زمین پر موسم اور زمینی پلیٹوں کی حرکت بہت سے ٹکراؤ کے نشانات کو وقت کے ساتھ مٹا دیتی ہے۔'
          )}
        </p>

        {/* Earth vs Moon Surface Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Earth', 'زمین')}
            </h3>
            <div className="space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <p>{renderText('+ Atmosphere', '+ فضا')}</p>
              <p>{renderText('+ Rain', '+ بارش')}</p>
              <p>{renderText('+ Rivers', '+ دریا')}</p>
              <p>{renderText('+ Wind', '+ ہوا')}</p>
              <p>{renderText('+ Plate movement', '+ پلیٹوں کی حرکت')}</p>
              <p className="font-semibold mt-2" style={{ color: 'var(--accent)' }}>
                {renderText('→ Erosion changes surface', '→ کٹاؤ سطح بدلتی ہے')}
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Moon', 'چاند')}
            </h3>
            <div className="space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <p>{renderText('− Almost no atmosphere', '− تقریباً کوئی فضا نہیں')}</p>
              <p>{renderText('− No rain', '− کوئی بارش نہیں')}</p>
              <p>{renderText('− No rivers', '− کوئی دریا نہیں')}</p>
              <p className="font-semibold mt-2" style={{ color: 'var(--accent)' }}>
                {renderText('→ Craters stay visible', '→ گڑھے نظر آتے رہتے ہیں')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Moon Phases */}
      <section id="phases">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Why Does the Moon Change Shape?', 'چاند کی شکل کیوں بدلتی ہوئی نظر آتی ہے؟')}
        </h2>
        
        {/* Misconception Card */}
        <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: 'var(--warning)', border: '1px solid var(--border)' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('Common Misconception', 'عام غلط فہمی')}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
            {renderText(
              'Moon phases are not caused by Earth\'s shadow. They are caused by our changing view of the Moon\'s sunlit half as the Moon travels around Earth.',
              'چاند کی حالتیں زمین کے سائے کی وجہ سے نہیں بنتیں۔ یہ اس لیے دکھائی دیتی ہیں کیونکہ چاند کے زمین کے گرد گھومنے کے ساتھ ہمیں اس کے سورج سے روشن نصف حصے کا مختلف حصہ نظر آتا ہے۔'
            )}
          </p>
        </div>

        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The Sun always lights half of the Moon. As the Moon travels around Earth, the angle between the Sun, Earth and Moon changes. From Earth, we see different amounts of the Moon\'s illuminated half. This changing appearance creates the repeating cycle of lunar phases, which takes about 29.5 days from one new Moon to the next.',
            'سورج ہمیشہ چاند کے آدھے حصے کو روشن کرتا ہے۔ جب چاند زمین کے گرد گردش کرتا ہے تو سورج، زمین اور چاند کے درمیان زاویہ تبدیل ہوتا رہتا ہے۔ زمین سے ہمیں چاند کے روشن نصف حصے کی مختلف مقدار نظر آتی ہے۔ اسی بدلتی ہوئی شکل سے چاند کی حالتوں کا بار بار دہرانے والا چکر بنتا ہے، جو ایک نئے چاند سے اگلے نئے چاند تک تقریباً 29.5 دن لیتا ہے۔'
          )}
        </p>

        {/* 8-Phase Interactive Carousel */}
        <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
          <div className="relative bg-gradient-to-br from-slate-900 to-black min-h-[300px] flex items-center justify-center p-8">
            <div className="text-center">
              {/* Moon phase visual */}
              <div className="w-24 h-24 rounded-full mx-auto mb-4 relative overflow-hidden" style={{ background: '#404040' }}>
                <div className="absolute inset-0" style={{
                  background: currentPhase === 0 ? 'transparent' :
                             currentPhase === 1 ? 'linear-gradient(90deg, transparent 60%, #e0e0e0 60%)' :
                             currentPhase === 2 ? 'linear-gradient(90deg, transparent 50%, #e0e0e0 50%)' :
                             currentPhase === 3 ? 'linear-gradient(90deg, transparent 25%, #e0e0e0 25%)' :
                             currentPhase === 4 ? '#e0e0e0' :
                             currentPhase === 5 ? 'linear-gradient(90deg, #e0e0e0 75%, transparent 75%)' :
                             currentPhase === 6 ? 'linear-gradient(90deg, #e0e0e0 50%, transparent 50%)' :
                             'linear-gradient(90deg, #e0e0e0 40%, transparent 40%)'
                }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {language === 'en' && moonPhases[currentPhase].name.en}
                {language === 'ur' && <span className="font-urdu" dir="rtl">{moonPhases[currentPhase].name.ur}</span>}
                {language === 'both' && (
                  <>
                    {moonPhases[currentPhase].name.en}
                    <span className="block font-urdu text-lg mt-1" dir="rtl">{moonPhases[currentPhase].name.ur}</span>
                  </>
                )}
              </h3>
              <p className="text-xs mb-2" style={{ color: 'var(--accent)' }}>
                {renderText(`Day ${moonPhases[currentPhase].day}`, `دن ${moonPhases[currentPhase].day}`)}
              </p>
              <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                {language === 'en' && moonPhases[currentPhase].en}
                {language === 'ur' && <span className="font-urdu" dir="rtl">{moonPhases[currentPhase].ur}</span>}
                {language === 'both' && (
                  <>
                    {moonPhases[currentPhase].en}
                    <span className="block font-urdu mt-2" dir="rtl">{moonPhases[currentPhase].ur}</span>
                  </>
                )}
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                {renderText(`Phase ${currentPhase + 1} of 8`, `حالت ${currentPhase + 1} از 8`)}
              </p>
            </div>
            <button
              onClick={() => setCurrentPhase((prev) => (prev - 1 + moonPhases.length) % moonPhases.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setCurrentPhase((prev) => (prev + 1) % moonPhases.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="p-4" style={{ backgroundColor: 'var(--surface-muted)' }}>
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setPhasePlaying(!phasePlaying)}
                className="p-2 rounded-lg"
                style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              >
                {phasePlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
            <div className="flex justify-center gap-2">
              {moonPhases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPhase(i)}
                  className="w-3 h-3 rounded-full transition-all"
                  style={{
                    backgroundColor: i === currentPhase ? 'var(--accent)' : 'var(--border)',
                    transform: i === currentPhase ? 'scale(1.3)' : 'scale(1)'
                  }}
                  aria-label={`Phase ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Moon Phase Timeline */}
        <h3 className="text-xl font-bold mb-3 mt-6" style={{ color: 'var(--text-primary)' }}>
          {renderText('Moon Phase Timeline', 'چاند کی حالتوں کا ٹائم لائن')}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ color: 'var(--text-primary)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>{renderText('Day', 'دن')}</th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>{renderText('Phase', 'حالت')}</th>
              </tr>
            </thead>
            <tbody>
              {moonPhases.map((phase, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-muted)' }}>
                  <td className="p-3 border" style={{ borderColor: 'var(--border)' }}>{phase.day}</td>
                  <td className="p-3 border" style={{ borderColor: 'var(--border)' }}>
                    {language === 'en' && phase.name.en}
                    {language === 'ur' && <span className="font-urdu" dir="rtl">{phase.name.ur}</span>}
                    {language === 'both' && <>{phase.name.en}<span className="block font-urdu text-xs" dir="rtl">{phase.name.ur}</span></>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs italic mt-2 text-center" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Approximate days.', 'دن اندازاً ہیں۔')}
        </p>
      </section>

      {/* Section 6: Day, Night, Moonrise */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Why Do the Sun, Moon and Stars Move Across the Sky?', 'سورج، چاند اور تارے آسمان میں حرکت کرتے ہوئے کیوں دکھائی دیتے ہیں؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Earth rotates once in about 24 hours. As Earth spins, different parts of the planet face toward the Sun and then away from it, creating day and night. This rotation also makes the Sun, Moon and stars appear to rise in the east and set in the west. The Moon rises about 50 minutes later on average each day because it moves along its orbit around Earth.',
            'زمین تقریباً 24 گھنٹوں میں اپنے محور کے گرد ایک چکر مکمل کرتی ہے۔ زمین کے گھومنے سے سیارے کے مختلف حصے پہلے سورج کی طرف اور پھر سورج سے دور ہوتے ہیں، جس سے دن اور رات بنتے ہیں۔ یہی گردش سورج، چاند اور ستاروں کو مشرق سے نکلتے اور مغرب میں غروب ہوتے ہوئے ظاہر کرتی ہے۔ چاند اوسطاً ہر روز تقریباً 50 منٹ بعد طلوع ہوتا ہے کیونکہ وہ زمین کے گرد اپنے مدار میں آگے بڑھتا رہتا ہے۔'
          )}
        </p>

        {/* Day/Night Animation */}
        <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-48">
              {/* Sun */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 20px #ff8c00' }} />
              {/* Earth rotating */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full overflow-hidden" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)', animation: 'orbit 8s linear infinite' }}>
                {/* Observer marker */}
                <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-red-500" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2 rounded" style={{ backgroundColor: 'var(--surface)' }}>
              <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{renderText('Sunrise', 'طلوعِ آفتاب')}</div>
            </div>
            <div className="p-2 rounded" style={{ backgroundColor: 'var(--surface)' }}>
              <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{renderText('Noon', 'دوپہر')}</div>
            </div>
            <div className="p-2 rounded" style={{ backgroundColor: 'var(--surface)' }}>
              <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{renderText('Sunset', 'غروبِ آفتاب')}</div>
            </div>
            <div className="p-2 rounded" style={{ backgroundColor: 'var(--surface)' }}>
              <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{renderText('Night', 'رات')}</div>
            </div>
          </div>
          <p className="text-xs italic text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
            {renderText('Exact Moonrise/Moonset times depend on date and location.', 'چاند کے طلوع اور غروب ہونے کے درست اوقات تاریخ اور مقام پر منحصر ہوتے ہیں۔')}
          </p>
        </div>
      </section>

      {/* Section 7: Stars */}
      <section id="stars">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('What Are Stars?', 'ستارے کیا ہوتے ہیں؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'A star is a massive, glowing sphere of hot gas and plasma held together by gravity. Most stars are made mostly of hydrogen and helium. Like the Sun, many stars shine because nuclear fusion in their cores releases energy. Stars can have different masses, temperatures, colors, ages and lifetimes.',
            'ستارہ گرم گیس اور پلازما کا ایک بہت بڑا روشن گولا ہوتا ہے جسے کششِ ثقل ایک ساتھ باندھے رکھتی ہے۔ زیادہ تر ستارے بنیادی طور پر ہائیڈروجن اور ہیلیم پر مشتمل ہوتے ہیں۔ سورج کی طرح بہت سے ستارے اپنے مرکز میں جوہری ملاپ سے توانائی خارج ہونے کی وجہ سے چمکتے ہیں۔ ستاروں کی کمیت، درجہ حرارت، رنگ، عمر اور زندگی کی مدت مختلف ہو سکتی ہے۔'
          )}
        </p>

        {/* Star field image */}
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-md h-48 rounded-xl relative overflow-hidden" style={{ backgroundColor: '#000020' }}>
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.8 + 0.2
                }}
              />
            ))}
          </div>
        </div>

        {/* Star Formation */}
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          {renderText('How Stars Form', 'ستارے کیسے بنتے ہیں')}
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Stars begin in giant clouds of gas and dust called nebulae. Gravity pulls parts of a cloud together. As material falls inward, it becomes denser and hotter, forming a protostar. If the center becomes hot and dense enough, nuclear fusion begins. The object then becomes a true star.',
            'ستارے گیس اور گرد کے بہت بڑے بادلوں میں پیدا ہوتے ہیں جنہیں سحابیہ کہا جاتا ہے۔ کششِ ثقل بادل کے حصوں کو ایک دوسرے کی طرف کھینچتی ہے۔ جب مادہ اندر کی طرف گرتا ہے تو وہ زیادہ گھنا اور گرم ہوتا جاتا ہے اور ایک ابتدائی ستارہ بنتا ہے۔ اگر مرکز کافی گرم اور گھنا ہو جائے تو جوہری ملاپ شروع ہو جاتا ہے۔ پھر وہ جسم ایک حقیقی ستارہ بن جاتا ہے۔'
          )}
        </p>
        <BilingualFlowchart
          steps={[
            { en: 'Nebula', ur: 'سحابیہ' },
            { en: 'Gravity pulls', ur: 'کششِ ثقل کھینچتی ہے' },
            { en: 'Protostar', ur: 'ابتدائی ستارہ' },
            { en: 'Nuclear fusion', ur: 'جوہری ملاپ' },
            { en: 'True star', ur: 'حقیقی ستارہ' }
          ]}
        />

        {/* Star Colors */}
        <h3 className="text-xl font-bold mb-3 mt-6" style={{ color: 'var(--text-primary)' }}>
          {renderText('Star Colors and Temperature', 'ستاروں کے رنگ اور درجہ حرارت')}
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Stars can appear blue, white, yellow, orange or red. In general, hotter stars tend to look bluer or whiter, while cooler stars tend to look orange or red. Color is one clue to temperature, but astronomers use many measurements to understand a star fully.',
            'ستارے نیلے، سفید، پیلے، نارنجی یا سرخ نظر آ سکتے ہیں۔ عمومی طور پر زیادہ گرم ستارے نیلے یا سفید دکھائی دیتے ہیں، جبکہ نسبتاً ٹھنڈے ستارے نارنجی یا سرخ ہوتے ہیں۔ رنگ درجہ حرارت کا ایک اشارہ ہے، لیکن ماہرینِ فلکیات کسی ستارے کو مکمل طور پر سمجھنے کے لیے بہت سی پیمائشوں کا مطالعہ کرتے ہیں۔'
          )}
        </p>
        <div className="flex justify-center gap-2 mb-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mb-1" style={{ backgroundColor: '#4444ff', boxShadow: '0 0 10px #4444ff' }} />
            <div className="text-xs" style={{ color: 'var(--text-primary)' }}>{renderText('Blue', 'نیلا')}</div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{renderText('Hottest', 'سب سے گرم')}</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mb-1" style={{ backgroundColor: '#ffffff', boxShadow: '0 0 10px #ffffff' }} />
            <div className="text-xs" style={{ color: 'var(--text-primary)' }}>{renderText('White', 'سفید')}</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mb-1" style={{ backgroundColor: '#ffff00', boxShadow: '0 0 10px #ffff00' }} />
            <div className="text-xs" style={{ color: 'var(--text-primary)' }}>{renderText('Yellow', 'پیلا')}</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mb-1" style={{ backgroundColor: '#ff8800', boxShadow: '0 0 10px #ff8800' }} />
            <div className="text-xs" style={{ color: 'var(--text-primary)' }}>{renderText('Orange', 'نارنجی')}</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mb-1" style={{ backgroundColor: '#ff0000', boxShadow: '0 0 10px #ff0000' }} />
            <div className="text-xs" style={{ color: 'var(--text-primary)' }}>{renderText('Red', 'سرخ')}</div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{renderText('Coolest', 'سب سے ٹھنڈا')}</div>
          </div>
        </div>
        <p className="text-xs italic text-center" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Simplified educational comparison.', 'سادہ تعلیمی موازنہ۔')}
        </p>

        {/* Nearest Star */}
        <h3 className="text-xl font-bold mb-3 mt-6" style={{ color: 'var(--text-primary)' }}>
          {renderText('Nearest Star Beyond the Sun', 'سورج کے علاوہ قریب ترین ستارہ')}
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'The closest known star system to our Solar System is Alpha Centauri. Proxima Centauri is the nearest individual star in that system, about 4.24 light-years away. A light-year is the distance light travels in one year; it is a distance unit, not a time unit.',
            'ہمارے نظامِ شمسی کے قریب ترین معلوم ستارہ نظام الفا سینٹوری ہے۔ اس نظام میں پروکسیما سینٹوری قریب ترین انفرادی ستارہ ہے، جو تقریباً 4.24 نوری سال دور ہے۔ نوری سال وہ فاصلہ ہے جو روشنی ایک سال میں طے کرتی ہے؛ یہ وقت نہیں بلکہ فاصلے کی اکائی ہے۔'
          )}
        </p>
        <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 15px #ff8c00' }} />
              <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{renderText('Sun', 'سورج')}</div>
            </div>
            <div className="flex-1 mx-4 text-center">
              <div className="h-0.5" style={{ backgroundColor: 'var(--accent)' }} />
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>4.24 light-years</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ backgroundColor: '#ff4444', boxShadow: '0 0 10px #ff4444' }} />
              <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{renderText('Proxima Centauri', 'پروکسیما سینٹوری')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Constellations */}
      <section id="constellations">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Stars and Constellations', 'ستارے اور برج')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'A constellation is a recognized pattern or region of the sky. People in different cultures have connected stars into meaningful patterns for thousands of years. The stars in a constellation may look close together from Earth, but many of them are actually at very different distances in space.',
            'برج آسمان میں ستاروں کا کوئی تسلیم شدہ نمونہ یا خطہ ہوتا ہے۔ مختلف تہذیبوں کے لوگوں نے ہزاروں سال سے ستاروں کو جوڑ کر معنی خیز شکلیں بنائی ہیں۔ کسی برج کے ستارے زمین سے ایک دوسرے کے قریب دکھائی دے سکتے ہیں، لیکن خلا میں ان میں سے بہت سے ستارے حقیقت میں ایک دوسرے سے بہت مختلف فاصلے پر ہوتے ہیں۔'
          )}
        </p>

        {/* Constellation Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { en: 'Orion', ur: 'شکارچی', stars: [[30, 20], [70, 20], [50, 40], [30, 60], [70, 60], [40, 80], [60, 80]] },
            { en: 'Ursa Major', ur: 'دب اکبر', stars: [[20, 30], [40, 25], [60, 30], [80, 35], [75, 55], [55, 60], [35, 55]] },
            { en: 'Cassiopeia', ur: 'ذات الکرسی', stars: [[20, 50], [40, 30], [50, 50], [60, 30], [80, 50]] }
          ].map((constellation, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="h-32 relative mb-2 rounded" style={{ backgroundColor: '#000020' }}>
                <svg className="absolute inset-0 w-full h-full">
                  {constellation.stars.map((star, j) => (
                    <circle key={j} cx={`${star[0]}%`} cy={`${star[1]}%`} r="2" fill="white" />
                  ))}
                  {constellation.stars.slice(0, -1).map((star, j) => (
                    <line key={j} x1={`${star[0]}%`} y1={`${star[1]}%`} x2={`${constellation.stars[j + 1][0]}%`} y2={`${constellation.stars[j + 1][1]}%`} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                  ))}
                </svg>
              </div>
              <h4 className="font-semibold text-center" style={{ color: 'var(--text-primary)' }}>
                {language === 'en' && constellation.en}
                {language === 'ur' && <span className="font-urdu" dir="rtl">{constellation.ur}</span>}
                {language === 'both' && <>{constellation.en}<span className="block font-urdu text-sm" dir="rtl">{constellation.ur}</span></>}
              </h4>
            </div>
          ))}
        </div>
        <p className="text-xs italic text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText('The lines are human-made viewing guides, not physical lines in space.', 'یہ لکیریں انسانوں کی بنائی ہوئی دیکھنے کی رہنما لکیریں ہیں، خلا میں موجود حقیقی لکیریں نہیں۔')}
        </p>
      </section>

      {/* Section 9: Moon Phases vs Eclipses */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Moon Phases and Eclipses Are Not the Same Thing', 'چاند کی حالتیں اور گرہن ایک ہی چیز نہیں ہیں')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Moon phases happen every month because our view of the Moon\'s sunlit half changes. Eclipses are special alignments. A solar eclipse happens when the Moon moves between Earth and the Sun. A lunar eclipse happens when Earth moves between the Sun and Moon. Eclipses do not happen every month because the Moon\'s orbit is tilted compared with Earth\'s orbit around the Sun.',
            'چاند کی حالتیں ہر مہینے بنتی ہیں کیونکہ چاند کے سورج سے روشن نصف حصے کو دیکھنے کا زاویہ بدلتا رہتا ہے۔ گرہن خاص قسم کی سیدھ میں ہونے والے واقعات ہیں۔ سورج گرہن اس وقت ہوتا ہے جب چاند زمین اور سورج کے درمیان آ جائے۔ چاند گرہن اس وقت ہوتا ہے جب زمین سورج اور چاند کے درمیان آ جائے۔ گرہن ہر مہینے اس لیے نہیں ہوتے کیونکہ چاند کا مدار سورج کے گرد زمین کے مدار کے مقابلے میں جھکا ہوا ہے۔'
          )}
        </p>

        {/* Visual Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Moon Phase', 'چاند کی حالت')}
            </h4>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 10px #ff8c00' }} />
              <div className="w-6 h-6 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0)' }} />
              <div className="w-10 h-10 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Changing view angle', 'بدلتا ہوا زاویہ')}
            </p>
          </div>
          <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Solar Eclipse', 'سورج گرہن')}
            </h4>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 10px #ff8c00' }} />
              <div className="w-6 h-6 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0)' }} />
              <div className="w-10 h-10 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Sun → Moon → Earth', 'سورج → چاند → زمین')}
            </p>
          </div>
          <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Lunar Eclipse', 'چاند گرہن')}
            </h4>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00)', boxShadow: '0 0 10px #ff8c00' }} />
              <div className="w-10 h-10 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' }} />
              <div className="w-6 h-6 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0)' }} />
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
              {renderText('Sun → Earth → Moon', 'سورج → زمین → چاند')}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/eclipses')}
          className="w-full md:w-auto px-6 py-2 rounded-lg font-medium"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          {renderText('Learn About Eclipses', 'گرہن کے بارے میں جانیں')}
        </button>
      </section>

      {/* Section 10: Image Carousel */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Image Gallery', 'تصاویر کی گیلری')}
        </h2>
        <EducationalCarousel
          slides={[
            { imageUrl: '', captionEn: 'The Sun - our nearest star', captionUr: 'سورج - ہمارا قریب ترین ستارہ', credit: 'NASA/SDO', fallbackGradient: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00 60%, #ff4500)' },
            { imageUrl: '', captionEn: 'Sun layers diagram', captionUr: 'سورج کی تہوں کا خاکہ', credit: 'Educational diagram', fallbackGradient: 'radial-gradient(circle at 50% 50%, #fff7a0, #ff8c00 40%, #cc2200)' },
            { imageUrl: '', captionEn: 'Earth-Moon orbit', captionUr: 'زمین-چاند کا مدار', credit: 'Educational diagram', fallbackGradient: 'radial-gradient(circle at 40% 40%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' },
            { imageUrl: '', captionEn: 'The Moon - full disk', captionUr: 'چاند - مکمل قرص', credit: 'NASA/Apollo', fallbackGradient: 'radial-gradient(circle at 35% 35%, #e0e0e0, #a0a0a0 40%, #606060)' },
            { imageUrl: '', captionEn: 'Moon surface with craters', captionUr: 'چاند کی سطح گڑھوں کے ساتھ', credit: 'NASA', fallbackGradient: 'radial-gradient(circle at 35% 35%, #c0c0c0, #808080 40%, #404040)' },
            { imageUrl: '', captionEn: 'New Moon phase', captionUr: 'نئے چاند کی حالت', credit: 'Educational diagram', fallbackGradient: 'radial-gradient(circle, #404040, #202020)' },
            { imageUrl: '', captionEn: 'First Quarter Moon', captionUr: 'پہلی تربیع کا چاند', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(90deg, #404040 50%, #e0e0e0 50%)' },
            { imageUrl: '', captionEn: 'Full Moon', captionUr: 'پورا چاند', credit: 'NASA', fallbackGradient: 'radial-gradient(circle at 35% 35%, #f0f0f0, #c0c0c0 40%, #808080)' },
            { imageUrl: '', captionEn: 'Moon phase cycle diagram', captionUr: 'چاند کی حالتوں کا چکر', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(90deg, #202020, #e0e0e0, #202020)' },
            { imageUrl: '', captionEn: 'Day and night on Earth', captionUr: 'زمین پر دن اور رات', credit: 'NASA', fallbackGradient: 'linear-gradient(90deg, #000020 50%, #4a90d9 50%)' },
            { imageUrl: '', captionEn: 'Star field', captionUr: 'ستاروں کا میدان', credit: 'NASA/Hubble', fallbackGradient: 'radial-gradient(circle at 50% 50%, #000040, #000020)' },
            { imageUrl: '', captionEn: 'Nebula - star formation', captionUr: 'سحابیہ - ستاروں کی تشکیل', credit: 'NASA/Hubble', fallbackGradient: 'radial-gradient(circle at 30% 40%, #4400aa, #220066 40%, #000020)' },
            { imageUrl: '', captionEn: 'Star color-temperature diagram', captionUr: 'ستاروں کے رنگ-درجہ حرارت کا خاکہ', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(90deg, #4444ff, #ffffff, #ffff00, #ff8800, #ff0000)' },
            { imageUrl: '', captionEn: 'Proxima Centauri distance', captionUr: 'پروکسیما سینٹوری کا فاصلہ', credit: 'Educational diagram', fallbackGradient: 'radial-gradient(circle at 20% 50%, #ffcc00, #000020 40%)' },
            { imageUrl: '', captionEn: 'Orion constellation', captionUr: 'برج شکارچی', credit: 'Educational diagram', fallbackGradient: 'radial-gradient(circle at 50% 50%, #000040, #000020)' },
            { imageUrl: '', captionEn: 'Moon phases vs eclipses', captionUr: 'چاند کی حالتیں بمقابلہ گرہن', credit: 'Educational diagram', fallbackGradient: 'linear-gradient(90deg, #202020, #ffcc00, #202020)' }
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
            { en: 'The Sun is the only star in our Solar System.', ur: 'سورج ہمارے نظامِ شمسی کا واحد ستارہ ہے۔' },
            { en: 'Sunlight takes about 8 minutes 20 seconds to reach Earth.', ur: 'سورج کی روشنی کو زمین تک پہنچنے میں تقریباً 8 منٹ 20 سیکنڈ لگتے ہیں۔' },
            { en: 'The Moon reflects sunlight.', ur: 'چاند سورج کی روشنی منعکس کرتا ہے۔' },
            { en: 'Moon phases repeat in about 29.5 days.', ur: 'چاند کی حالتیں تقریباً 29.5 دن میں دہرائی جاتی ہیں۔' },
            { en: 'The Moon\'s far side is not permanently dark.', ur: 'چاند کا دور والا حصہ ہمیشہ تاریک نہیں ہوتا۔' },
            { en: 'We see mostly same side because of synchronized rotation.', ur: 'ہم زیادہ تر ایک ہی رخ دیکھتے ہیں کیونکہ گردش ہم آہنگ ہے۔' },
            { en: 'Moon gravity is about one-sixth Earth gravity.', ur: 'چاند کی کششِ ثقل زمین کی کششِ ثقل کا تقریباً چھٹا حصہ ہے۔' },
            { en: 'Moon has many impact craters.', ur: 'چاند پر بہت سے ٹکراؤ کے گڑھے ہیں۔' },
            { en: 'Earth rotation creates day and night.', ur: 'زمین کی گردش دن اور رات بناتی ہے۔' },
            { en: 'Moon rises later each day on average.', ur: 'چاند اوسطاً ہر روز بعد میں طلوع ہوتا ہے۔' },
            { en: 'Stars are mostly hydrogen and helium.', ur: 'ستارے بنیادی طور پر ہائیڈروجن اور ہیلیم سے بنے ہوتے ہیں۔' },
            { en: 'Stars form in gas and dust clouds.', ur: 'ستارے گیس اور گرد کے بادلوں میں بنتے ہیں۔' },
            { en: 'Star colors give clues about temperature.', ur: 'ستاروں کے رنگ درجہ حرارت کے بارے میں اشارے دیتے ہیں۔' },
            { en: 'Proxima Centauri is about 4.24 light-years away.', ur: 'پروکسیما سینٹوری تقریباً 4.24 نوری سال دور ہے۔' },
            { en: 'A light-year is a distance, not a time.', ur: 'نوری سال فاصلہ ہے، وقت نہیں۔' },
            { en: 'Constellation lines are human-made guides.', ur: 'برجوں کی لکیریں انسانوں کی بنائی ہوئی رہنما لکیریں ہیں۔' }
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
              {renderText('Ready to test what you learned about the Moon, Sun and Stars?', 'کیا آپ چاند، سورج اور ستاروں کے بارے میں جو سیکھا اس کی جانچ کرنے کے لیے تیار ہیں؟')}
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
              'Educational note: Moon, Sun and star diagrams simplify real distances and sizes. They are designed to explain motion, light and geometry, not to show the Solar System at true scale.',
              'تعلیمی نوٹ: چاند، سورج اور ستاروں کے خاکے اصل فاصلے اور سائز کو سادہ بناتے ہیں۔ ان کا مقصد حرکت، روشنی اور جیومیٹری کو سمجھانا ہے، نہ کہ نظامِ شمسی کو حقیقی پیمانے پر دکھانا۔'
            )}
          </p>
        </div>
        <div className="space-y-2">
          {['NASA Science', 'NASA Moon Exploration', 'NASA Sun', 'NASA Space Place', 'NASA JPL Education', 'NASA Scientific Visualization Studio'].map((source, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {source}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
