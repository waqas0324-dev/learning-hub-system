import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { planets } from '../data/planets';
import { planetDetails } from '../data/planetDetails';
import { getCelestialImage } from '../data/imageManifest';
import { ScientificImage } from '../components/ScientificImage';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { BilingualFlowchart } from '../components/BilingualFlowchart';
import { CheckCircle, XCircle, Calculator as CalculatorIcon } from 'lucide-react';

// Planet calculation data
const planetCalcData = {
  mercury: { orbitalPeriod: 0.241, relativeGravity: 0.38 },
  venus: { orbitalPeriod: 0.615, relativeGravity: 0.91 },
  earth: { orbitalPeriod: 1.000, relativeGravity: 1.00 },
  mars: { orbitalPeriod: 1.881, relativeGravity: 0.38 },
  jupiter: { orbitalPeriod: 11.86, relativeGravity: 2.53 },
  saturn: { orbitalPeriod: 29.45, relativeGravity: 1.07 },
  uranus: { orbitalPeriod: 84.01, relativeGravity: 0.89 },
  neptune: { orbitalPeriod: 164.8, relativeGravity: 1.14 }
};

export function CalculatorPage() {
  const navigate = useNavigate();
  const { language } = useApp();
  
  const [earthAge, setEarthAge] = useState<number>(25);
  const [earthWeight, setEarthWeight] = useState<number>(70);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [selectedPlanet, setSelectedPlanet] = useState<string>('mars');
  const [calculated, setCalculated] = useState(false);
  const [errors, setErrors] = useState<{ age?: string; weight?: string }>({});

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

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

  const validate = () => {
    const newErrors: { age?: string; weight?: string } = {};
    if (earthAge <= 0) newErrors.age = language === 'ur' ? 'عمر 0 سے زیادہ ہونی چاہیے' : 'Age must be greater than 0';
    if (earthWeight <= 0) newErrors.weight = language === 'ur' ? 'وزن 0 سے زیادہ ہونا چاہیے' : 'Weight must be greater than 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (validate()) {
      setCalculated(true);
    }
  };

  const handleReset = () => {
    setEarthAge(25);
    setEarthWeight(70);
    setWeightUnit('kg');
    setSelectedPlanet('mars');
    setCalculated(false);
    setErrors({});
  };

  const handleTryExample = () => {
    setEarthAge(25);
    setEarthWeight(70);
    setWeightUnit('kg');
    setSelectedPlanet('mars');
    setCalculated(true);
    setErrors({});
  };

  const calculatePlanetAge = (planetId: string) => {
    return earthAge / planetCalcData[planetId as keyof typeof planetCalcData].orbitalPeriod;
  };

  const calculatePlanetWeight = (planetId: string) => {
    let weightInKg = earthWeight;
    if (weightUnit === 'lb') {
      weightInKg = earthWeight * 0.453592; // Convert lb to kg
    }
    const resultKg = weightInKg * planetCalcData[planetId as keyof typeof planetCalcData].relativeGravity;
    if (weightUnit === 'lb') {
      return resultKg / 0.453592; // Convert back to lb
    }
    return resultKg;
  };

  const formatAge = (age: number) => {
    return age < 1 ? age.toFixed(2) : age.toFixed(1);
  };

  const formatWeight = (weight: number) => {
    return weight.toFixed(1);
  };

  // Quiz questions
  const quizQuestions = [
    {
      question: { en: 'What determines the length of a planet year?', ur: 'سیارے کے سال کی لمبائی کیا متاثر کرتی ہے؟' },
      options: [
        { en: 'Planet rotation', ur: 'سیارے کی گردش' },
        { en: 'Planet orbit around Sun', ur: 'سورج کے گرد سیارے کا مدار' },
        { en: 'Number of moons', ur: 'چاندوں کی تعداد' },
        { en: 'Planet size', ur: 'سیارے کا سائز' }
      ],
      correct: 1,
      explanation: { en: 'A planet year is the time to complete one orbit around the Sun.', ur: 'سیارے کا سال سورج کے گرد ایک چکر مکمل کرنے کا وقت ہے۔' }
    },
    {
      question: { en: 'What determines the length of a planet day?', ur: 'سیارے کے دن کی لمبائی کیا متاثر کرتی ہے؟' },
      options: [
        { en: 'Planet orbit around Sun', ur: 'سورج کے گرد سیارے کا مدار' },
        { en: 'Planet rotation on axis', ur: 'محور پر سیارے کی گردش' },
        { en: 'Distance from Sun', ur: 'سورج سے فاصلہ' },
        { en: 'Atmosphere thickness', ur: 'فضا کی موٹائی' }
      ],
      correct: 1,
      explanation: { en: 'A planet day is based on rotation on its axis.', ur: 'سیارے کا دن اپنے محور پر گردش پر منحصر ہوتا ہے۔' }
    },
    {
      question: { en: 'Does your mass change on Mars?', ur: 'کیا مریخ پر آپ کی کمیت تبدیل ہوتی ہے؟' },
      options: [
        { en: 'Yes, it decreases', ur: 'ہاں، یہ کم ہو جاتی ہے' },
        { en: 'No, mass stays essentially the same', ur: 'نہیں، کمیت بنیادی طور پر ایک جیسی رہتی ہے' },
        { en: 'Yes, it increases', ur: 'ہاں، یہ بڑھ جاتی ہے' },
        { en: 'It depends on gravity', ur: 'یہ کششِ ثقل پر منحصر ہے' }
      ],
      correct: 1,
      explanation: { en: 'Mass is the amount of matter and stays essentially the same.', ur: 'کمیت مادے کی مقدار ہے اور بنیادی طور پر ایک جیسی رہتی ہے۔' }
    },
    {
      question: { en: 'Why would a scale reading be lower on Mars?', ur: 'مریخ پر ترازو کی پیمائش کم کیوں ہوگی؟' },
      options: [
        { en: 'Because you lose mass', ur: 'کیونکہ آپ کی کمیت کم ہو جاتی ہے' },
        { en: 'Because Mars has weaker gravity', ur: 'کیونکہ مریخ کی کششِ ثقل کمزور ہے' },
        { en: 'Because Mars is colder', ur: 'کیونکہ مریخ زیادہ سرد ہے' },
        { en: 'Because Mars is farther from Sun', ur: 'کیونکہ مریخ سورج سے دور ہے' }
      ],
      correct: 1,
      explanation: { en: 'Mars has weaker surface gravity (0.38g), so the scale shows lower weight.', ur: 'مریخ کی سطحی کششِ ثقل کمزور ہے (0.38g)، اس لیے ترازو کم وزن دکھاتا ہے۔' }
    },
    {
      question: { en: 'Which planet has the highest gravity in this calculator?', ur: 'اس کیلکولیٹر میں کس سیارے کی کششِ ثقل سب سے زیادہ ہے؟' },
      options: [
        { en: 'Earth', ur: 'زمین' },
        { en: 'Saturn', ur: 'زحل' },
        { en: 'Jupiter', ur: 'مشتری' },
        { en: 'Neptune', ur: 'نیپچون' }
      ],
      correct: 2,
      explanation: { en: 'Jupiter has the highest relative gravity at 2.53g.', ur: 'مشتری کی نسبتاً کششِ ثقل سب سے زیادہ ہے 2.53g۔' }
    },
    {
      question: { en: 'Why is your age larger in Mercury years?', ur: 'عطارد کے سالوں میں آپ کی عمر زیادہ کیوں ہے؟' },
      options: [
        { en: 'Because Mercury is smaller', ur: 'کیونکہ عطارد چھوٹا ہے' },
        { en: 'Because Mercury has a shorter orbit', ur: 'کیونکہ عطارد کا مدار چھوٹا ہے' },
        { en: 'Because Mercury is hotter', ur: 'کیونکہ عطارد زیادہ گرم ہے' },
        { en: 'Because Mercury rotates faster', ur: 'کیونکہ عطارد تیزی سے گھومتا ہے' }
      ],
      correct: 1,
      explanation: { en: 'Mercury completes an orbit in only 0.241 Earth years, so you have more Mercury birthdays.', ur: 'عطارد صرف 0.241 زمینی سالوں میں ایک چکر مکمل کرتا ہے، اس لیے آپ کی عطارد کی سالگرہیں زیادہ ہوتی ہیں۔' }
    },
    {
      question: { en: 'What formula calculates planet age?', ur: 'سیاروی عمر کا حساب کس فارمولے سے لگایا جاتا ہے؟' },
      options: [
        { en: 'Earth age × orbital period', ur: 'زمینی عمر × مداری مدت' },
        { en: 'Earth age ÷ orbital period', ur: 'زمینی عمر ÷ مداری مدت' },
        { en: 'Earth age + orbital period', ur: 'زمینی عمر + مداری مدت' },
        { en: 'Earth age - orbital period', ur: 'زمینی عمر - مداری مدت' }
      ],
      correct: 1,
      explanation: { en: 'Planet age = Earth age ÷ orbital period in Earth years.', ur: 'سیاروی عمر = زمین پر عمر ÷ مداری مدت زمینی سالوں میں۔' }
    },
    {
      question: { en: 'What formula estimates weight on a planet?', ur: 'سیارے پر وزن کا اندازہ کس فارمولے سے لگایا جاتا ہے؟' },
      options: [
        { en: 'Earth weight + gravity', ur: 'زمینی وزن + کششِ ثقل' },
        { en: 'Earth weight × relative gravity', ur: 'زمینی وزن × نسبتاً کششِ ثقل' },
        { en: 'Earth weight ÷ gravity', ur: 'زمینی وزن ÷ کششِ ثقل' },
        { en: 'Earth weight - gravity', ur: 'زمینی وزن - کششِ ثقل' }
      ],
      correct: 1,
      explanation: { en: 'Planet weight = Earth weight × relative gravity.', ur: 'سیاروی وزن = زمین پر وزن × نسبتاً کششِ ثقل۔' }
    },
    {
      question: { en: 'Does Jupiter have a normal solid surface?', ur: 'کیا مشتری کی عام ٹھوس سطح ہے؟' },
      options: [
        { en: 'Yes, like Earth', ur: 'ہاں، زمین جیسی' },
        { en: 'No, it is a gas giant', ur: 'نہیں، یہ گیس دیو ہے' },
        { en: 'Yes, but very cold', ur: 'ہاں، لیکن بہت سرد' },
        { en: 'We don\'t know', ur: 'ہمیں نہیں معلوم' }
      ],
      correct: 1,
      explanation: { en: 'Jupiter is a gas giant with no normal solid surface to stand on.', ur: 'مشتری ایک گیس دیو ہے جس کی کھڑے ہونے کے لیے کوئی عام ٹھوس سطح نہیں ہے۔' }
    },
    {
      question: { en: 'Which are rocky planets?', ur: 'کون سے پتھریلے سیارے ہیں؟' },
      options: [
        { en: 'Jupiter, Saturn, Uranus, Neptune', ur: 'مشتری، زحل، یورینس، نیپچون' },
        { en: 'Mercury, Venus, Earth, Mars', ur: 'عطارد، زہرہ، زمین، مریخ' },
        { en: 'Earth and Mars only', ur: 'صرف زمین اور مریخ' },
        { en: 'All eight planets', ur: 'تمام آٹھ سیارے' }
      ],
      correct: 1,
      explanation: { en: 'Mercury, Venus, Earth and Mars are rocky planets with solid surfaces.', ur: 'عطارد، زہرہ، زمین اور مریخ ٹھوس سطح والے پتھریلے سیارے ہیں۔' }
    },
    {
      question: { en: 'What does 1.00g mean?', ur: '1.00g کا کیا مطلب ہے؟' },
      options: [
        { en: 'Zero gravity', ur: 'صفر کششِ ثقل' },
        { en: 'Earth\'s surface gravity', ur: 'زمین کی سطحی کششِ ثقل' },
        { en: 'Jupiter\'s gravity', ur: 'مشتری کی کششِ ثقل' },
        { en: 'No gravity', ur: 'کوئی کششِ ثقل نہیں' }
      ],
      correct: 1,
      explanation: { en: '1.00g represents Earth\'s surface gravity as the reference.', ur: '1.00g زمین کی سطحی کششِ ثقل کو حوالہ کے طور پر ظاہر کرتا ہے۔' }
    },
    {
      question: { en: 'What does 0.38g mean?', ur: '0.38g کا کیا مطلب ہے؟' },
      options: [
        { en: '38% of Earth\'s gravity', ur: 'زمین کی کششِ ثقل کا 38 فیصد' },
        { en: 'No gravity', ur: 'کوئی کششِ ثقل نہیں' },
        { en: '38 times Earth\'s gravity', ur: 'زمین کی کششِ ثقل سے 38 گنا' },
        { en: 'Zero gravity', ur: 'صفر کششِ ثقل' }
      ],
      correct: 0,
      explanation: { en: '0.38g means 38% of Earth\'s surface gravity.', ur: '0.38g کا مطلب زمین کی سطحی کششِ ثقل کا 38 فیصد ہے۔' }
    },
    {
      question: { en: 'Why are calculator results estimates?', ur: 'کیلکولیٹر کے نتائج اندازے کیوں ہیں؟' },
      options: [
        { en: 'Because planets don\'t exist', ur: 'کیونکہ سیارے موجود نہیں' },
        { en: 'Because actual conditions vary and simplify complex physics', ur: 'کیونکہ اصل حالات مختلف ہوتے ہیں اور پیچیدہ طبیعیات کو آسان بناتے ہیں' },
        { en: 'Because the calculator is wrong', ur: 'کیونکہ کیلکولیٹر غلط ہے' },
        { en: 'Because gravity doesn\'t exist', ur: 'کیونکہ کششِ ثقل موجود نہیں' }
      ],
      correct: 1,
      explanation: { en: 'Results use simplified values and don\'t account for all real-world factors.', ur: 'نتائج سادہ قدروں کو استعمال کرتے ہیں اور تمام حقیقی دنیا کے عوامل کا حساب نہیں لگاتے۔' }
    },
    {
      question: { en: 'Which unit can you use in this calculator?', ur: 'اس کیلکولیٹر میں آپ کون سی اکائی استعمال کر سکتے ہیں؟' },
      options: [
        { en: 'Only kilograms', ur: 'صرف کلوگرام' },
        { en: 'Only pounds', ur: 'صرف پاؤنڈ' },
        { en: 'Kilograms or pounds', ur: 'کلوگرام یا پاؤنڈ' },
        { en: 'Only grams', ur: 'صرف گرام' }
      ],
      correct: 2,
      explanation: { en: 'You can choose kilograms (kg) or pounds (lb).', ur: 'آپ کلوگرام (kg) یا پاؤنڈ (lb) منتخب کر سکتے ہیں۔' }
    },
    {
      question: { en: 'Which statement is correct?', ur: 'کون سا بیان درست ہے؟' },
      options: [
        { en: 'You can stand safely on all planets', ur: 'آپ تمام سیاروں پر محفوظ طریقے سے کھڑے ہو سکتے ہیں' },
        { en: 'Giant planets have no normal solid surface', ur: 'دیو سیاروں کی کوئی عام ٹھوس سطح نہیں ہے' },
        { en: 'All planets have the same gravity', ur: 'تمام سیاروں کی کششِ ثقل ایک جیسی ہے' },
        { en: 'Mass changes on different planets', ur: 'مختلف سیاروں پر کمیت تبدیل ہوتی ہے' }
      ],
      correct: 1,
      explanation: { en: 'Gas and ice giants don\'t have normal solid surfaces where you could stand.', ur: 'گیس اور برفانی دیو سیاروں کی کوئی عام ٹھوس سطح نہیں ہے جہاں آپ کھڑے ہو سکیں۔' }
    }
  ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
    setShowResult(true);
    if (idx === quizQuestions[currentQuestion].correct) setScore(score + 1);
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
          {renderText('Space Age and Weight Calculator', 'خلا میں عمر اور وزن کا کیلکولیٹر')}
        </h1>
      </div>

      {/* Hero Section */}
      <section className="rounded-2xl overflow-hidden border p-6 md:p-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('What Would You Weigh and How Old Would You Be on Other Planets?', 'دوسرے سیاروں پر آپ کا وزن اور عمر کتنی ہوگی؟')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Your mass stays essentially the same wherever you go, but your measured weight changes because gravity is different on each planet. Your age in planet-years also changes because each planet takes a different amount of time to travel around the Sun.',
            'آپ کی کمیت بنیادی طور پر ہر جگہ ایک جیسی رہتی ہے، لیکن ناپا جانے والا وزن تبدیل ہو جاتا ہے کیونکہ ہر سیارے کی کششِ ثقل مختلف ہوتی ہے۔ سیاروی سالوں میں آپ کی عمر بھی تبدیل ہوتی ہے کیونکہ ہر سیارہ سورج کے گرد ایک چکر مکمل کرنے میں مختلف وقت لیتا ہے۔'
          )}
        </p>
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)', boxShadow: '0 0 30px rgba(74, 144, 217, 0.3)' }} />
        </div>
        <p className="text-xs italic mt-4 text-center" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Educational illustration — not to scale.', 'تعلیمی خاکہ — حقیقی پیمانے پر نہیں۔')}
        </p>
      </section>

      {/* Section 1: User Input Form */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Enter Your Information', 'اپنی معلومات درج کریں')}
        </h2>
        <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                {renderText('Your Age on Earth', 'زمین پر آپ کی عمر')}
              </label>
              <input
                type="number"
                value={earthAge}
                onChange={(e) => setEarthAge(parseFloat(e.target.value) || 0)}
                className="w-full p-2 rounded-lg"
                style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                step="0.1"
                min="0"
              />
              {errors.age && <p className="text-xs mt-1" style={{ color: 'var(--error)' }}>{errors.age}</p>}
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                {renderText('Enter your age in Earth years.', 'اپنی عمر زمینی سالوں میں درج کریں۔')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                {renderText('Your Weight on Earth', 'زمین پر آپ کا وزن')}
              </label>
              <input
                type="number"
                value={earthWeight}
                onChange={(e) => setEarthWeight(parseFloat(e.target.value) || 0)}
                className="w-full p-2 rounded-lg"
                style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                step="0.1"
                min="0"
              />
              {errors.weight && <p className="text-xs mt-1" style={{ color: 'var(--error)' }}>{errors.weight}</p>}
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                {renderText('Enter your current weight.', 'اپنا موجودہ وزن درج کریں۔')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                {renderText('Weight Unit', 'وزن کی اکائی')}
              </label>
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lb')}
                className="w-full p-2 rounded-lg"
                style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              >
                <option value="kg">{language === 'ur' ? 'کلوگرام (kg)' : 'Kilograms (kg)'}</option>
                <option value="lb">{language === 'ur' ? 'پاؤنڈ (lb)' : 'Pounds (lb)'}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                {renderText('Select a Planet', 'سیارہ منتخب کریں')}
              </label>
              <select
                value={selectedPlanet}
                onChange={(e) => setSelectedPlanet(e.target.value)}
                className="w-full p-2 rounded-lg"
                style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              >
                {planets.map(p => (
                  <option key={p.id} value={p.id}>
                    {language === 'ur' ? p.name.ur : language === 'both' ? `${p.name.en} - ${p.name.ur}` : p.name.en}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6 justify-center">
            <button onClick={handleCalculate} className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
              <CalculatorIcon size={18} />
              {renderText('Calculate', 'حساب کریں')}
            </button>
            <button onClick={handleReset} className="px-6 py-2 rounded-lg font-medium border" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              {renderText('Reset', 'دوبارہ ترتیب دیں')}
            </button>
            <button onClick={handleTryExample} className="px-6 py-2 rounded-lg font-medium border" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              {renderText('Try Example', 'مثال آزمائیں')}
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Calculation Rules */}
      {calculated && (
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText('Calculation Formulas', 'حساب کے فارمولے')}
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <p>{renderText('Planet age = Earth age ÷ orbital period', 'سیاروی عمر = زمین پر عمر ÷ مداری مدت')}</p>
              <p>{renderText('Planet weight = Earth weight × relative gravity', 'سیاروی وزن = زمین پر وزن × نسبتاً کششِ ثقل')}</p>
            </div>
            <p className="text-xs italic mt-4 text-center" style={{ color: 'var(--text-secondary)' }}>
              {renderText('These are simplified educational estimates.', 'یہ سادہ تعلیمی اندازے ہیں۔')}
            </p>
          </div>
        </section>
      )}

      {/* Section 3: Selected Planet Result */}
      {calculated && (
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText(`Your Results on ${planets.find(p => p.id === selectedPlanet)?.name.en}`, `${planets.find(p => p.id === selectedPlanet)?.name.ur} پر آپ کے نتائج`)}
          </h2>
          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--surface)', border: '2px solid var(--accent)' }}>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <ScientificImage subjectId={selectedPlanet} size={150} enableLightbox={true} />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {language === 'ur' ? planets.find(p => p.id === selectedPlanet)?.name.ur : planets.find(p => p.id === selectedPlanet)?.name.en}
                  {language === 'both' && <span className="block font-urdu text-xl" dir="rtl">{planets.find(p => p.id === selectedPlanet)?.name.ur}</span>}
                </h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{renderText('Your Age', 'آپ کی عمر')}</div>
                    <div className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{formatAge(calculatePlanetAge(selectedPlanet))} years</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{renderText('Your Weight', 'آپ کا وزن')}</div>
                    <div className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{formatWeight(calculatePlanetWeight(selectedPlanet))} {weightUnit}</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{renderText('Relative Gravity', 'نسبتاً کششِ ثقل')}</div>
                    <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{planetCalcData[selectedPlanet as keyof typeof planetCalcData].relativeGravity}g</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{renderText('Year Length', 'سال کی مدت')}</div>
                    <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{planetDetails[selectedPlanet].yearLength}</div>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => navigate(`/planets/${selectedPlanet}`)} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                    {renderText('Learn about this planet', 'اس سیارے کے بارے میں جانیں')}
                  </button>
                  <button onClick={() => navigate(`/comparison?planet=${selectedPlanet}`)} className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                    {renderText('Compare with another planet', 'دوسرے سیارے سے موازنہ کریں')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 4: All Eight Planet Results */}
      {calculated && (
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText('Your Results Across All Eight Planets', 'تمام آٹھ سیاروں پر آپ کے نتائج')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {planets.map(planet => (
              <div key={planet.id} className="rounded-xl p-4" style={{ backgroundColor: 'var(--surface)', border: planet.id === selectedPlanet ? '2px solid var(--accent)' : '1px solid var(--border)' }}>
                <div className="flex justify-center mb-3">
                  <ScientificImage subjectId={planet.id} size={80} />
                </div>
                <h3 className="font-bold text-center mb-2" style={{ color: 'var(--text-primary)' }}>
                  {language === 'ur' ? planet.name.ur : planet.name.en}
                  {language === 'both' && <span className="block font-urdu text-sm" dir="rtl">{planet.name.ur}</span>}
                </h3>
                {planet.id === 'earth' && (
                  <div className="text-xs text-center mb-2 px-2 py-1 rounded" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                    {renderText('Your Reference Planet', 'آپ کا بنیادی سیارہ')}
                  </div>
                )}
                {planet.id === selectedPlanet && (
                  <div className="text-xs text-center mb-2 px-2 py-1 rounded" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                    {renderText('Selected Planet', 'منتخب سیارہ')}
                  </div>
                )}
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{renderText('Age', 'عمر')}</div>
                    <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{formatAge(calculatePlanetAge(planet.id))} years</div>
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{renderText('Weight', 'وزن')}</div>
                    <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{formatWeight(calculatePlanetWeight(planet.id))} {weightUnit}</div>
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{renderText('Gravity', 'کششِ ثقل')}</div>
                    <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{planetCalcData[planet.id as keyof typeof planetCalcData].relativeGravity}g</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => navigate(`/planets/${planet.id}`)} className="flex-1 px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                    {renderText('View', 'دیکھیں')}
                  </button>
                  <button onClick={() => navigate(`/comparison?planet=${planet.id}`)} className="flex-1 px-2 py-1 rounded text-xs font-medium border" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                    {renderText('Compare', 'موازنہ')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 5: Why Does Age Change? */}
      {calculated && (
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText('Why Does Your Age Change on Other Planets?', 'دوسرے سیاروں پر آپ کی عمر کیوں بدلتی ہے؟')}
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {renderText(
                'Your age in planet-years changes because a year is not the same length on every planet. A year is the time a planet needs to complete one orbit around the Sun. Mercury travels around the Sun quickly, completing one orbit in about 0.241 Earth years. That means a person has many more Mercury birthdays. Neptune follows a much larger orbit and needs about 164.8 Earth years to go around the Sun once, so the same person has a much smaller age when counted in Neptune years.',
                'سیاروی سالوں میں آپ کی عمر اس لیے تبدیل ہوتی ہے کیونکہ ہر سیارے پر سال کی مدت ایک جیسی نہیں ہوتی۔ سال اس وقت کو کہتے ہیں جو کوئی سیارہ سورج کے گرد ایک چکر مکمل کرنے میں لیتا ہے۔ عطارد سورج کے گرد بہت جلدی چکر مکمل کرتا ہے اور اسے تقریباً 0.241 زمینی سال لگتے ہیں۔ اس کا مطلب ہے کہ کسی شخص کی عطارد کے سالوں میں بہت زیادہ سالگرہیں ہوں گی۔ نیپچون بہت بڑے مدار میں گردش کرتا ہے اور اسے سورج کے گرد ایک چکر مکمل کرنے میں تقریباً 164.8 زمینی سال لگتے ہیں، اس لیے اسی شخص کی عمر نیپچون کے سالوں میں بہت کم ہوگی۔'
              )}
            </p>
            <p className="text-sm italic" style={{ color: 'var(--accent)' }}>
              {renderText(
                'A planet year is different from a planet day. A day depends on rotation, while a year depends on orbit around the Sun.',
                'کسی سیارے کا سال اس کے دن سے مختلف ہوتا ہے۔ دن محوری گردش پر منحصر ہوتا ہے، جبکہ سال سورج کے گرد مدار پر منحصر ہوتا ہے۔'
              )}
            </p>
          </div>
        </section>
      )}

      {/* Section 6: Why Does Weight Change? */}
      {calculated && (
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText('Why Does Your Weight Change on Other Planets?', 'دوسرے سیاروں پر آپ کا وزن کیوں بدلتا ہے؟')}
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {renderText(
                'Your mass stays essentially the same, but your measured weight changes because gravity is different. Gravity is the pull between masses. A planet with stronger surface gravity pulls you more strongly, so a scale would show a higher weight. A planet with weaker gravity pulls you less strongly, so the scale reading would be lower. For example, an estimated 70 kg weight on Earth would become about 26.6 kg on Mars but about 177.1 kg on Jupiter using the simplified relative-gravity calculation.',
                'آپ کی کمیت بنیادی طور پر ایک جیسی رہتی ہے، لیکن ناپا جانے والا وزن تبدیل ہوتا ہے کیونکہ کششِ ثقل مختلف ہوتی ہے۔ کششِ ثقل کمیت رکھنے والے اجسام کے درمیان کھینچنے والی قوت ہے۔ جس سیارے کی سطحی کششِ ثقل زیادہ مضبوط ہو، وہ آپ کو زیادہ قوت سے کھینچے گا، اس لیے ترازو پر وزن زیادہ دکھائی دے گا۔ جس سیارے کی کششِ ثقل کمزور ہو، وہ آپ کو کم کھینچے گا، اس لیے ترازو کی پیمائش کم ہوگی۔ مثال کے طور پر، زمین پر 70 کلوگرام کا اندازاً وزن اس سادہ نسبتاً کششِ ثقل کے حساب سے مریخ پر تقریباً 26.6 کلوگرام اور مشتری پر تقریباً 177.1 کلوگرام ہو جائے گا۔'
              )}
            </p>
          </div>
        </section>
      )}

      {/* Section 7: Mass vs Weight */}
      {calculated && (
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText('Mass vs Weight', 'کمیت بمقابلہ وزن')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                {renderText('Mass', 'کمیت')}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {renderText(
                  'Mass is the amount of matter in an object. Your mass stays essentially the same on Earth, Mars or Jupiter.',
                  'کمیت کسی جسم میں موجود مادے کی مقدار ہے۔ آپ کی کمیت زمین، مریخ یا مشتری پر بنیادی طور پر ایک جیسی رہتی ہے۔'
                )}
              </p>
            </div>
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                {renderText('Weight', 'وزن')}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {renderText(
                  'Weight is the force created when gravity pulls on your mass. Because gravity differs from place to place, your measured weight changes.',
                  'وزن وہ قوت ہے جو کششِ ثقل کے آپ کی کمیت کو کھینچنے سے پیدا ہوتی ہے۔ چونکہ جگہ کے بدلنے سے کششِ ثقل تبدیل ہوتی ہے، اس لیے آپ کا ناپا جانے والا وزن بھی بدلتا ہے۔'
                )}
              </p>
            </div>
          </div>
          <BilingualFlowchart
            steps={[
              { en: 'Same person', ur: 'ایک ہی شخص' },
              { en: 'Same mass', ur: 'ایک جیسی کمیت' },
              { en: 'Different gravity', ur: 'مختلف کششِ ثقل' },
              { en: 'Different weight', ur: 'مختلف وزن' }
            ]}
          />
        </section>
      )}

      {/* Section 8: Flowcharts */}
      {calculated && (
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText('Understanding the Calculations', 'حساب کو سمجھنا')}
          </h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Age Calculation', 'عمر کا حساب')}
            </h3>
            <BilingualFlowchart
              steps={[
                { en: 'Earth age', ur: 'زمین پر عمر' },
                { en: '÷ orbital period', ur: '÷ مداری مدت' },
                { en: 'Planet years', ur: 'سیاروی سال' }
              ]}
            />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Weight Calculation', 'وزن کا حساب')}
            </h3>
            <BilingualFlowchart
              steps={[
                { en: 'Earth weight', ur: 'زمین پر وزن' },
                { en: '× relative gravity', ur: '× نسبتاً کششِ ثقل' },
                { en: 'Planet weight', ur: 'سیاروی وزن' }
              ]}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Why Years Differ', 'سال مختلف کیوں ہوتے ہیں')}
            </h3>
            <BilingualFlowchart
              steps={[
                { en: 'Short orbit', ur: 'چھوٹا مدار' },
                { en: 'Shorter year', ur: 'چھوٹا سال' },
                { en: 'More birthdays', ur: 'زیادہ سالگرہیں' }
              ]}
            />
          </div>
        </section>
      )}

      {/* Section 9: Gravity Comparison Visual */}
      {calculated && (
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText('Compare Gravity', 'کششِ ثقل کا موازنہ کریں')}
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="space-y-3">
              {planets.map(planet => {
                const gravity = planetCalcData[planet.id as keyof typeof planetCalcData].relativeGravity;
                const weight = calculatePlanetWeight(planet.id);
                return (
                  <div key={planet.id} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {language === 'ur' ? planet.name.ur : planet.name.en}
                    </div>
                    <div className="flex-1 h-8 rounded" style={{ backgroundColor: 'var(--surface-muted)' }}>
                      <div className="h-full rounded flex items-center px-2" style={{ width: `${(gravity / 2.53) * 100}%`, backgroundColor: 'var(--accent)', color: '#fff' }}>
                        <span className="text-xs font-bold">{gravity}g</span>
                      </div>
                    </div>
                    <div className="w-24 text-sm text-right" style={{ color: 'var(--text-secondary)' }}>
                      {formatWeight(weight)} {weightUnit}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-sm mt-4 italic" style={{ color: 'var(--text-secondary)' }}>
              {renderText(
                'Stronger gravity creates a higher scale reading. Weaker gravity creates a lower scale reading.',
                'زیادہ مضبوط کششِ ثقل ترازو کی پیمائش زیادہ بناتی ہے۔ کمزور کششِ ثقل ترازو کی پیمائش کم بناتی ہے۔'
              )}
            </p>
          </div>
        </section>
      )}

      {/* Section 12: Can You Stand on Every Planet? */}
      {calculated && (
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText('Could You Stand on Every Planet?', 'کیا آپ ہر سیارے پر کھڑے ہو سکتے ہیں؟')}
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {renderText(
                'The calculator compares gravity, but it does not mean every planet is a safe place to stand. Mercury, Venus, Earth and Mars are rocky planets, although their environments are very different. Jupiter and Saturn are gas giants, while Uranus and Neptune are ice giants. These giant planets do not have a normal solid surface like Earth\'s surface where a person could stand. Their deep atmospheres, pressure, temperatures and winds are extremely dangerous.',
                'یہ کیلکولیٹر کششِ ثقل کا موازنہ کرتا ہے، لیکن اس کا مطلب یہ نہیں کہ ہر سیارہ کھڑے ہونے کے لیے محفوظ جگہ ہے۔ عطارد، زہرہ، زمین اور مریخ پتھریلے سیارے ہیں، اگرچہ ان کے ماحول بہت مختلف ہیں۔ مشتری اور زحل گیس دیو ہیں، جبکہ یورینس اور نیپچون برفانی دیو ہیں۔ ان بڑے سیاروں کی زمین جیسی عام ٹھوس سطح نہیں ہوتی جس پر انسان کھڑا ہو سکے۔ ان کی گہری فضا، دباؤ، درجہ حرارت اور ہوائیں انتہائی خطرناک ہیں۔'
              )}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
                <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {renderText('Rocky Planets', 'پتھریلے سیارے')}
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {renderText('Mercury, Venus, Earth, Mars', 'عطارد، زہرہ، زمین، مریخ')}
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
                <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {renderText('Gas Giants', 'گیس دیو')}
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {renderText('Jupiter, Saturn', 'مشتری، زحل')}
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
                <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {renderText('Ice Giants', 'برفانی دیو')}
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {renderText('Uranus, Neptune', 'یورینس، نیپچون')}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 13: Key Takeaways */}
      {calculated && (
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText('Key Takeaways', 'اہم نتائج')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { en: 'A planet year is based on orbit around Sun.', ur: 'سیارے کا سال سورج کے گرد مدار پر منحصر ہوتا ہے۔' },
              { en: 'A planet day is based on rotation.', ur: 'سیارے کا دن گردش پر منحصر ہوتا ہے۔' },
              { en: 'Mass stays essentially same.', ur: 'کمیت بنیادی طور پر ایک جیسی رہتی ہے۔' },
              { en: 'Measured weight changes with gravity.', ur: 'ناپا جانے والا وزن کششِ ثقل کے ساتھ بدلتا ہے۔' },
              { en: 'Mercury gives more planet-years for same Earth age.', ur: 'عطارد اسی زمینی عمر کے لیے زیادہ سیاروی سال دیتا ہے۔' },
              { en: 'Neptune gives fewer planet-years for same Earth age.', ur: 'نیپچون اسی زمینی عمر کے لیے کم سیاروی سال دیتا ہے۔' },
              { en: 'Jupiter produces highest estimated scale reading.', ur: 'مشتری سب سے زیادہ اندازاً ترازو پیمائش دیتا ہے۔' },
              { en: 'Giant planets are not normal places to stand.', ur: 'دیو سیارے کھڑے ہونے کی عام جگہیں نہیں ہیں۔' },
              { en: 'Calculator results are educational estimates.', ur: 'کیلکولیٹر کے نتائج تعلیمی اندازے ہیں۔' }
            ].map((takeaway, i) => (
              <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
                {renderText(takeaway.en, takeaway.ur)}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 14: Quiz */}
      {calculated && (
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText('Test Your Understanding', 'اپنی سمجھ کی جانچ کریں')}
          </h2>
          {!quizStarted ? (
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                {renderText('Ready to test what you learned?', 'کیا آپ جو سیکھا اس کی جانچ کرنے کے لیے تیار ہیں؟')}
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
              <div className="text-4xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
                {score} / {quizQuestions.length}
              </div>
              <button onClick={handleRetry} className="px-6 py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                {renderText('Retry Quiz', 'دوبارہ کوشش کریں')}
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
                  {renderText(currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz', currentQuestion < quizQuestions.length - 1 ? 'اگلا سوال' : 'کوئز مکمل کریں')}
                </button>
              )}
            </div>
          )}
        </section>
      )}

      {/* Section 15: Sources */}
      {calculated && (
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {renderText('Sources and Educational Note', 'ماخذ اور تعلیمی نوٹ')}
          </h2>
          <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {renderText(
                'Educational note: This calculator uses simplified relative-gravity values and average orbital periods. Actual conditions vary, and the results do not mean a person could safely visit or stand on every planet.',
                'تعلیمی نوٹ: یہ کیلکولیٹر سادہ نسبتاً کششِ ثقل کی قدروں اور اوسط مداری مدتوں کو استعمال کرتا ہے۔ اصل حالات مختلف ہو سکتے ہیں، اور ان نتائج کا مطلب یہ نہیں کہ انسان ہر سیارے پر محفوظ طریقے سے جا یا کھڑا ہو سکتا ہے۔'
              )}
            </p>
          </div>
          <div className="space-y-2">
            {['NASA Planetary Fact Sheets', 'NASA Solar System Exploration', 'NASA Science'].map((source, i) => (
              <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                {source}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
