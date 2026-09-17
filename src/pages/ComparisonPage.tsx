import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { planets } from '../data/planets';
import { planetDetails } from '../data/planetDetails';
import { getCelestialImage } from '../data/imageManifest';
import { ScientificImage } from '../components/ScientificImage';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { BilingualFlowchart } from '../components/BilingualFlowchart';
import { CheckCircle, XCircle, ArrowRightLeft, RotateCcw } from 'lucide-react';

export function ComparisonPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language } = useApp();
  
  const [planetAId, setPlanetAId] = useState('earth');
  const [planetBId, setPlanetBId] = useState('mars');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const planetA = planets.find(p => p.id === planetAId);
  const planetB = planets.find(p => p.id === planetBId);
  const detailA = planetDetails[planetAId];
  const detailB = planetDetails[planetBId];

  useEffect(() => {
    const planetParam = searchParams.get('planet');
    if (planetParam && planets.find(p => p.id === planetParam)) {
      setPlanetAId(planetParam);
      const defaultB = planetParam === 'earth' ? 'mars' : 'earth';
      setPlanetBId(defaultB);
    }
  }, [searchParams]);

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

  const handleSwap = () => {
    const temp = planetAId;
    setPlanetAId(planetBId);
    setPlanetBId(temp);
  };

  const handleReset = () => {
    setPlanetAId('earth');
    setPlanetBId('mars');
  };

  const handlePlanetAChange = (newId: string) => {
    if (newId === planetBId) {
      const otherPlanet = planets.find(p => p.id !== newId && p.id !== planetAId);
      if (otherPlanet) setPlanetBId(otherPlanet.id);
    }
    setPlanetAId(newId);
  };

  const handlePlanetBChange = (newId: string) => {
    if (newId === planetAId) {
      const otherPlanet = planets.find(p => p.id !== newId && p.id !== planetBId);
      if (otherPlanet) setPlanetAId(otherPlanet.id);
    }
    setPlanetBId(newId);
  };

  if (!planetA || !planetB || !detailA || !detailB) return null;

  const quizQuestions = [
    {
      question: { en: `Which planet is larger?`, ur: `کون سا سیارہ بڑا ہے؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: parseFloat(detailA.diameter.replace(/[^0-9.]/g, '')) > parseFloat(detailB.diameter.replace(/[^0-9.]/g, '')) ? 0 : 1,
      explanation: { en: `${parseFloat(detailA.diameter) > parseFloat(detailB.diameter) ? planetA.name.en : planetB.name.en} is larger.`, ur: `${parseFloat(detailA.diameter) > parseFloat(detailB.diameter) ? planetA.name.ur : planetB.name.ur} بڑا ہے۔` }
    },
    {
      question: { en: `Which planet is farther from the Sun?`, ur: `کون سا سیارہ سورج سے زیادہ دور ہے؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: parseFloat(detailA.avgDistance.replace(/[^0-9.]/g, '')) < parseFloat(detailB.avgDistance.replace(/[^0-9.]/g, '')) ? 1 : 0,
      explanation: { en: `${planetB.name.en} is farther from the Sun.`, ur: `${planetB.name.ur} سورج سے زیادہ دور ہے۔` }
    },
    {
      question: { en: `Which planet has the longer year?`, ur: `کس سیارے کا سال لمبا ہے؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: parseFloat(detailA.yearLength.replace(/[^0-9.]/g, '')) < parseFloat(detailB.yearLength.replace(/[^0-9.]/g, '')) ? 1 : 0,
      explanation: { en: `${planetB.name.en} has a longer year.`, ur: `${planetB.name.ur} کا سال لمبا ہے۔` }
    },
    {
      question: { en: `Which planet has stronger gravity?`, ur: `کس سیارے کی کششِ ثقل زیادہ مضبوط ہے؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: parseFloat(detailA.gravity.replace(/[^0-9.]/g, '')) > parseFloat(detailB.gravity.replace(/[^0-9.]/g, '')) ? 0 : 1,
      explanation: { en: `${parseFloat(detailA.gravity) > parseFloat(detailB.gravity) ? planetA.name.en : planetB.name.en} has stronger gravity.`, ur: `${parseFloat(detailA.gravity) > parseFloat(detailB.gravity) ? planetA.name.ur : planetB.name.ur} کی کششِ ثقل زیادہ مضبوط ہے۔` }
    },
    {
      question: { en: `Why does ${planetB.name.en} have lower estimated weight?`, ur: `${planetB.name.ur} کا اندازاً وزن کم کیوں ہے؟` },
      options: [
        { en: 'It is smaller', ur: 'یہ چھوٹا ہے' },
        { en: 'It has weaker gravity', ur: 'اس کی کششِ ثقل کمزور ہے' },
        { en: 'It is farther from Sun', ur: 'یہ سورج سے دور ہے' },
        { en: 'It has no atmosphere', ur: 'اس کی کوئی فضا نہیں' }
      ],
      correct: 1,
      explanation: { en: `${planetB.name.en} has weaker surface gravity, so objects weigh less there.`, ur: `${planetB.name.ur} کی سطحی کششِ ثقل کمزور ہے، اس لیے وہاں اشیاء کا وزن کم ہوتا ہے۔` }
    },
    {
      question: { en: `Which planet has more moons?`, ur: `کس سیارے کے زیادہ چاند ہیں؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: parseInt(detailA.moons) > parseInt(detailB.moons) ? 0 : 1,
      explanation: { en: `${planetA.name.en} has ${detailA.moons} moons, ${planetB.name.en} has ${detailB.moons}.`, ur: `${planetA.name.ur} کے ${detailA.moons} چاند ہیں، ${planetB.name.ur} کے ${detailB.moons}۔` }
    },
    {
      question: { en: `Which planet supports known life?`, ur: `کس سیارے پر معلوم زندگی موجود ہے؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: planetAId === 'earth' ? 0 : planetBId === 'earth' ? 1 : 0,
      explanation: { en: 'Earth is the only known planet with life.', ur: 'زمین اب تک معلوم واحد سیارہ ہے جہاں زندگی موجود ہے۔' }
    },
    {
      question: { en: `Why is ${planetB.name.en} generally colder?`, ur: `${planetB.name.ur} عموماً زیادہ سرد کیوں ہے؟` },
      options: [
        { en: 'It has no Sun', ur: 'اس کا کوئی سورج نہیں' },
        { en: 'It is farther from Sun and has thinner atmosphere', ur: 'یہ سورج سے دور ہے اور اس کی فضا پتلی ہے' },
        { en: 'It rotates slower', ur: 'یہ آہستہ گھومتا ہے' },
        { en: 'It has more moons', ur: 'اس کے زیادہ چاند ہیں' }
      ],
      correct: 1,
      explanation: { en: `${planetB.name.en} is farther from the Sun and has a thinner atmosphere that cannot retain heat as well.`, ur: `${planetB.name.ur} سورج سے دور ہے اور اس کی پتلی فضا حرارت کو اچھی طرح برقرار نہیں رکھ سکتی۔` }
    },
    {
      question: { en: `Which planet has a thicker atmosphere?`, ur: `کس سیارے کی فضا زیادہ گھنی ہے؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: planetAId === 'earth' ? 0 : planetBId === 'earth' ? 1 : 0,
      explanation: { en: `${planetAId === 'earth' ? planetA.name.en : planetB.name.en} has a much thicker atmosphere.`, ur: `${planetAId === 'earth' ? planetA.name.ur : planetB.name.ur} کی فضا بہت زیادہ گھنی ہے۔` }
    },
    {
      question: { en: `Which planet has stable liquid water on much of its surface?`, ur: `کس سیارے کی سطح کے بڑے حصے پر مستحکم مائع پانی ہے؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: planetAId === 'earth' ? 0 : planetBId === 'earth' ? 1 : 0,
      explanation: { en: 'Earth has stable liquid water on its surface.', ur: 'زمین کی سطح پر مستحکم مائع پانی ہے۔' }
    },
    {
      question: { en: `Which planet has a day about 24.6 hours long?`, ur: `کس سیارے کا دن تقریباً 24.6 گھنٹے لمبا ہے؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: planetBId === 'mars' ? 1 : 0,
      explanation: { en: 'Mars has a day (called a sol) of about 24.6 hours.', ur: 'مریخ کا دن (جسے سول کہا جاتا ہے) تقریباً 24.6 گھنٹے کا ہے۔' }
    },
    {
      question: { en: `Have humans traveled to ${planetB.name.en}?`, ur: `کیا انسان ${planetB.name.ur} تک سفر کر چکے ہیں؟` },
      options: [
        { en: 'Yes, many times', ur: 'ہاں، بہت بار' },
        { en: 'No, only robotic spacecraft', ur: 'نہیں، صرف روبوٹک خلائی جہاز' },
        { en: 'Yes, but only once', ur: 'ہاں، لیکن صرف ایک بار' },
        { en: 'We don\'t know', ur: 'ہمیں نہیں معلوم' }
      ],
      correct: 1,
      explanation: { en: `Humans have not traveled to ${planetB.name.en}. Only robotic spacecraft have explored it.`, ur: `انسان ${planetB.name.ur} تک سفر نہیں کر سکے۔ صرف روبوٹک خلائی جہازوں نے اس کی دریافت کی ہے۔` }
    },
    {
      question: { en: `What does a planet's year mean?`, ur: `سیارے کا سال کیا مطلب ہے؟` },
      options: [
        { en: 'How long it takes to rotate once', ur: 'ایک بار گھومنے میں کتنا وقت لگتا ہے' },
        { en: 'How long it takes to orbit the Sun once', ur: 'سورج کے گرد ایک چکر مکمل کرنے میں کتنا وقت لگتا ہے' },
        { en: 'How many moons it has', ur: 'اس کے کتنے چاند ہیں' },
        { en: 'How large the planet is', ur: 'سیارہ کتنا بڑا ہے' }
      ],
      correct: 1,
      explanation: { en: 'A planet\'s year is the time it takes to complete one orbit around the Sun.', ur: 'سیارے کا سال وہ وقت ہے جو اسے سورج کے گرد ایک چکر مکمل کرنے میں لگتا ہے۔' }
    },
    {
      question: { en: `What does gravity affect?`, ur: `کششِ ثقل کیا متاثر کرتی ہے؟` },
      options: [
        { en: 'Only the planet\'s color', ur: 'صرف سیارے کا رنگ' },
        { en: 'Weight, atmosphere retention, and movement', ur: 'وزن، فضا کو برقرار رکھنا اور حرکت' },
        { en: 'Only the number of moons', ur: 'صرف چاندوں کی تعداد' },
        { en: 'Nothing important', ur: 'کچھ بھی اہم نہیں' }
      ],
      correct: 1,
      explanation: { en: 'Gravity affects weight, atmosphere retention, movement, and many other factors.', ur: 'کششِ ثقل وزن، فضا کو برقرار رکھنے، حرکت اور بہت سے دوسرے عوامل کو متاثر کرتی ہے۔' }
    },
    {
      question: { en: `Which statement is correct?`, ur: `کون سا بیان درست ہے؟` },
      options: [
        { en: 'All planets have the same conditions', ur: 'تمام سیاروں کے حالات ایک جیسے ہیں' },
        { en: 'Different planets have very different conditions', ur: 'مختلف سیاروں کے حالات بہت مختلف ہیں' },
        { en: 'Only Earth exists', ur: 'صرف زمین موجود ہے' },
        { en: 'All planets can support life', ur: 'تمام سیارے زندگی کی حمایت کر سکتے ہیں' }
      ],
      correct: 1,
      explanation: { en: 'Different planets have very different conditions based on their size, distance, atmosphere, and other factors.', ur: 'مختلف سیاروں کے حالات ان کے سائز، فاصلے، فضا اور دیگر عوامل کی بنیاد پر بہت مختلف ہیں۔' }
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
          {renderText('Compare Two Planets', 'دو سیاروں کا موازنہ کریں')}
        </h1>
      </div>

      {/* Hero Section */}
      <section className="rounded-2xl overflow-hidden border p-6 md:p-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Discover How Planets Are Different', 'جانیں کہ سیارے ایک دوسرے سے کیسے مختلف ہیں')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {renderText(
            'Choose any two different planets to compare their size, distance from the Sun, day length, year length, temperature, gravity, atmosphere, moons, rings, surface conditions and possibility of human survival.',
            'کسی بھی دو مختلف سیاروں کو منتخب کریں اور ان کے سائز، سورج سے فاصلے، دن کی مدت، سال کی مدت، درجہ حرارت، کششِ ثقل، فضا، چاندوں، حلقوں، سطحی حالات اور انسانوں کے لیے رہنے کے امکانات کا موازنہ کریں۔'
          )}
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <ScientificImage subjectId={planetAId} size={150} showCaption={true} showCredit={true} />
          <div className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>VS</div>
          <ScientificImage subjectId={planetBId} size={150} showCaption={true} showCredit={true} />
        </div>
      </section>

      {/* Section 1: Select Two Planets */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Select Two Planets', 'دو سیارے منتخب کریں')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Planet A', 'پہلا سیارہ')}
            </label>
            <select
              value={planetAId}
              onChange={(e) => handlePlanetAChange(e.target.value)}
              className="w-full p-2 rounded-lg"
              style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
            >
              {planets.map(p => (
                <option key={p.id} value={p.id} disabled={p.id === planetBId}>
                  {language === 'ur' ? p.name.ur : language === 'both' ? `${p.name.en} - ${p.name.ur}` : p.name.en}
                </option>
              ))}
            </select>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {renderText('Planet B', 'دوسرا سیارہ')}
            </label>
            <select
              value={planetBId}
              onChange={(e) => handlePlanetBChange(e.target.value)}
              className="w-full p-2 rounded-lg"
              style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
            >
              {planets.map(p => (
                <option key={p.id} value={p.id} disabled={p.id === planetAId}>
                  {language === 'ur' ? p.name.ur : language === 'both' ? `${p.name.en} - ${p.name.ur}` : p.name.en}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-4 justify-center">
          <button onClick={handleSwap} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
            <ArrowRightLeft size={16} />
            {renderText('Swap Planets', 'سیارے تبدیل کریں')}
          </button>
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <RotateCcw size={16} />
            {renderText('Reset', 'دوبارہ ترتیب دیں')}
          </button>
        </div>
      </section>

      {/* Section 2: Hero Cards */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Selected Planets', 'منتخب سیارے')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[{ planet: planetA, detail: detailA }, { planet: planetB, detail: detailB }].map(({ planet, detail }, idx) => (
            <div key={planet.id} className="rounded-xl p-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="flex justify-center mb-4">
                <ScientificImage subjectId={planet.id} size={120} enableLightbox={true} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2" style={{ color: 'var(--text-primary)' }}>
                {language === 'ur' ? planet.name.ur : planet.name.en}
                {language === 'both' && <span className="block font-urdu text-lg" dir="rtl">{planet.name.ur}</span>}
              </h3>
              <p className="text-sm text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                {renderText(detail.type.en, detail.type.ur)}
              </p>
              <button
                onClick={() => navigate(`/planets/${planet.id}`)}
                className="w-full py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                {renderText('Open Full Planet Lesson', 'سیارے کا مکمل سبق کھولیں')}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Comparison Table */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Full Comparison', 'مکمل موازنہ')}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ color: 'var(--text-primary)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>{renderText('Feature', 'خصوصیت')}</th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>{planetA.name.en}</th>
                <th className="p-3 text-left border" style={{ borderColor: 'var(--border)' }}>{planetB.name.en}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: { en: 'Diameter', ur: 'قطر' }, a: detailA.diameter, b: detailB.diameter },
                { label: { en: 'Distance from Sun', ur: 'سورج سے فاصلہ' }, a: detailA.avgDistance, b: detailB.avgDistance },
                { label: { en: 'Day Length', ur: 'دن کی مدت' }, a: detailA.dayLength, b: detailB.dayLength },
                { label: { en: 'Year Length', ur: 'سال کی مدت' }, a: detailA.yearLength, b: detailB.yearLength },
                { label: { en: 'Temperature', ur: 'درجہ حرارت' }, a: detailA.avgTemp, b: detailB.avgTemp },
                { label: { en: 'Gravity', ur: 'کششِ ثقل' }, a: detailA.gravity, b: detailB.gravity },
                { label: { en: 'Moons', ur: 'چاند' }, a: detailA.moons, b: detailB.moons },
                { label: { en: 'Rings', ur: 'حلقے' }, a: detailA.rings.en, b: detailB.rings.en }
              ].map((row, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-muted)' }}>
                  <td className="p-3 border font-medium" style={{ borderColor: 'var(--border)' }}>
                    {renderText(row.label.en, row.label.ur)}
                  </td>
                  <td className="p-3 border" style={{ borderColor: 'var(--border)' }}>{row.a}</td>
                  <td className="p-3 border" style={{ borderColor: 'var(--border)' }}>{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs italic mt-3 text-center" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Known moon counts can change as new discoveries are confirmed.', 'نئی دریافتوں کی تصدیق کے ساتھ معلوم چاندوں کی تعداد تبدیل ہو سکتی ہے۔')}
        </p>
      </section>

      {/* Section 4: Quick Difference Summary */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Quick Difference Summary', 'فرق کا فوری خلاصہ')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Size */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>📏</span>
              {renderText('Size', 'سائز')}
            </h3>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              {planetAId === 'earth' && planetBId === 'mars' ? renderText(
                'Earth is much larger than Mars. Earth is about 12,756 km wide, while Mars is about 6,792 km wide. Earth\'s larger size and greater mass give it stronger surface gravity than Mars.',
                'زمین مریخ سے بہت بڑی ہے۔ زمین کا قطر تقریباً 12,756 کلومیٹر ہے، جبکہ مریخ کا قطر تقریباً 6,792 کلومیٹر ہے۔ زمین کا بڑا حجم اور زیادہ کمیت اسے مریخ کے مقابلے میں زیادہ مضبوط سطحی کششِ ثقل فراہم کرتی ہے۔'
              ) : renderText(
                `${planetA.name.en} has a diameter of ${detailA.diameter}, while ${planetB.name.en} has a diameter of ${detailB.diameter}.`,
                `${planetA.name.ur} کا قطر ${detailA.diameter} ہے، جبکہ ${planetB.name.ur} کا قطر ${detailB.diameter} ہے۔`
              )}
            </p>
            <p className="text-xs italic" style={{ color: 'var(--accent)' }}>
              {renderText('Why it matters: Size affects gravity, atmosphere retention, and geological activity.', 'اہمیت: سائز کششِ ثقل، فضا کو برقرار رکھنے اور جیالوجیکل سرگرمی کو متاثر کرتا ہے۔')}
            </p>
          </div>

          {/* Distance */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>☀️</span>
              {renderText('Distance from Sun', 'سورج سے فاصلہ')}
            </h3>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              {planetAId === 'earth' && planetBId === 'mars' ? renderText(
                'Earth is closer to the Sun than Mars. Earth is about 149.6 million km from the Sun, while Mars is about 227.9 million km away on average.',
                'زمین مریخ کے مقابلے میں سورج کے زیادہ قریب ہے۔ زمین سورج سے اوسطاً تقریباً 149.6 ملین کلومیٹر دور ہے، جبکہ مریخ تقریباً 227.9 ملین کلومیٹر دور ہے۔'
              ) : renderText(
                `${planetA.name.en} is ${detailA.avgDistance} from the Sun, while ${planetB.name.en} is ${detailB.avgDistance} away.`,
                `${planetA.name.ur} سورج سے ${detailA.avgDistance} دور ہے، جبکہ ${planetB.name.ur} ${detailB.avgDistance} دور ہے۔`
              )}
            </p>
            <p className="text-xs italic" style={{ color: 'var(--accent)' }}>
              {renderText('Why it matters: Distance affects sunlight received, temperature, and year length.', 'اہمیت: فاصلہ حاصل ہونے والی روشنی، درجہ حرارت اور سال کی مدت کو متاثر کرتا ہے۔')}
            </p>
          </div>

          {/* Temperature */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>🌡️</span>
              {renderText('Temperature', 'درجہ حرارت')}
            </h3>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              {planetAId === 'earth' && planetBId === 'mars' ? renderText(
                'Earth is warmer on average than Mars. Earth\'s thicker atmosphere and closer distance to the Sun help it retain and distribute more heat.',
                'زمین اوسطاً مریخ سے زیادہ گرم ہے۔ زمین کی نسبتاً گھنی فضا اور سورج سے کم فاصلے کی وجہ سے یہ زیادہ حرارت کو محفوظ اور پھیلا سکتی ہے۔'
              ) : renderText(
                `${planetA.name.en} averages ${detailA.avgTemp}, while ${planetB.name.en} averages ${detailB.avgTemp}.`,
                `${planetA.name.ur} کا اوسط ${detailA.avgTemp} ہے، جبکہ ${planetB.name.ur} کا اوسط ${detailB.avgTemp} ہے۔`
              )}
            </p>
            <p className="text-xs italic" style={{ color: 'var(--accent)' }}>
              {renderText('Why it matters: Temperature affects whether liquid water can exist and if life is possible.', 'اہمیت: درجہ حرارت اس بات کو متاثر کرتا ہے کہ کیا مائع پانی موجود رہ سکتا ہے اور کیا زندگی ممکن ہے۔')}
            </p>
          </div>

          {/* Day Length */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>⏰</span>
              {renderText('Day Length', 'دن کی مدت')}
            </h3>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              {planetAId === 'earth' && planetBId === 'mars' ? renderText(
                'Earth and Mars have similar day lengths. Earth takes about 24 hours to rotate once, while Mars takes about 24.6 hours.',
                'زمین اور مریخ کے دنوں کی مدت ایک دوسرے سے کافی ملتی ہے۔ زمین تقریباً 24 گھنٹوں میں اپنے محور کے گرد ایک چکر مکمل کرتی ہے، جبکہ مریخ کو تقریباً 24.6 گھنٹے لگتے ہیں۔'
              ) : renderText(
                `${planetA.name.en} has a day length of ${detailA.dayLength}, while ${planetB.name.en} has ${detailB.dayLength}.`,
                `${planetA.name.ur} کا دن ${detailA.dayLength} کا ہے، جبکہ ${planetB.name.ur} کا ${detailB.dayLength} کا ہے۔`
              )}
            </p>
            <p className="text-xs italic" style={{ color: 'var(--accent)' }}>
              {renderText('Why it matters: Day length affects temperature cycles and potential for life.', 'اہمیت: دن کی مدت درجہ حرارت کے چکروں اور زندگی کے امکانات کو متاثر کرتی ہے۔')}
            </p>
          </div>

          {/* Year Length */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>📅</span>
              {renderText('Year Length', 'سال کی مدت')}
            </h3>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              {planetAId === 'earth' && planetBId === 'mars' ? renderText(
                'Mars has a much longer year because it travels on a larger orbit around the Sun. Mars needs about 687 Earth days for one orbit, while Earth needs about 365.25 days.',
                'مریخ کا سال بہت طویل ہے کیونکہ یہ سورج کے گرد زیادہ بڑے مدار میں سفر کرتا ہے۔ مریخ کو ایک چکر مکمل کرنے میں تقریباً 687 زمینی دن لگتے ہیں، جبکہ زمین کو تقریباً 365.25 دن لگتے ہیں۔'
              ) : renderText(
                `${planetA.name.en} has a year of ${detailA.yearLength}, while ${planetB.name.en} has ${detailB.yearLength}.`,
                `${planetA.name.ur} کا سال ${detailA.yearLength} کا ہے، جبکہ ${planetB.name.ur} کا ${detailB.yearLength} کا ہے۔`
              )}
            </p>
            <p className="text-xs italic" style={{ color: 'var(--accent)' }}>
              {renderText('Why it matters: Year length determines seasons and climate patterns.', 'اہمیت: سال کی مدت موسم اور آب و ہوا کے نمونوں کا تعین کرتی ہے۔')}
            </p>
          </div>

          {/* Gravity */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>⚖️</span>
              {renderText('Gravity', 'کششِ ثقل')}
            </h3>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              {planetAId === 'earth' && planetBId === 'mars' ? renderText(
                'Mars has weaker gravity than Earth. A person with an estimated scale weight of 70 kg on Earth would have an estimated scale weight of about 26.6 kg on Mars.',
                'مریخ کی کششِ ثقل زمین سے کمزور ہے۔ جس شخص کا اندازاً وزن زمین پر 70 کلوگرام ہو، اس کا اندازاً وزن مریخ پر تقریباً 26.6 کلوگرام ہوگا۔'
              ) : renderText(
                `${planetA.name.en} has gravity of ${detailA.gravity}, while ${planetB.name.en} has ${detailB.gravity}.`,
                `${planetA.name.ur} کی کششِ ثقل ${detailA.gravity} ہے، جبکہ ${planetB.name.ur} کی ${detailB.gravity} ہے۔`
              )}
            </p>
            <p className="text-xs italic" style={{ color: 'var(--accent)' }}>
              {renderText('Why it matters: Gravity affects weight, atmosphere retention, and human movement.', 'اہمیت: کششِ ثقل وزن، فضا کو برقرار رکھنے اور انسانی حرکت کو متاثر کرتی ہے۔')}
            </p>
          </div>

          {/* Moons */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>🌙</span>
              {renderText('Moons and Rings', 'چاند اور حلقے')}
            </h3>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              {planetAId === 'earth' && planetBId === 'mars' ? renderText(
                'Earth has one large natural Moon. Mars has two small moons named Phobos and Deimos. The number of moons depends on formation history, gravity and captured objects.',
                'زمین کا ایک بڑا قدرتی چاند ہے۔ مریخ کے دو چھوٹے چاند ہیں جنہیں فوبوس اور ڈیموس کہا جاتا ہے۔ چاندوں کی تعداد تشکیل کی تاریخ، کششِ ثقل اور اپنی طرف کھینچے گئے اجسام پر منحصر ہوتی ہے۔'
              ) : renderText(
                `${planetA.name.en} has ${detailA.moons} moons, while ${planetB.name.en} has ${detailB.moons} moons.`,
                `${planetA.name.ur} کے ${detailA.moons} چاند ہیں، جبکہ ${planetB.name.ur} کے ${detailB.moons} چاند ہیں۔`
              )}
            </p>
            <p className="text-xs italic" style={{ color: 'var(--accent)' }}>
              {renderText('Why it matters: Moons affect tides, stability, and scientific study opportunities.', 'اہمیت: چاند جزر و مد، استحکام اور سائنسی مطالعے کے مواقع کو متاثر کرتے ہیں۔')}
            </p>
          </div>

          {/* Atmosphere */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>💨</span>
              {renderText('Atmosphere', 'فضا')}
            </h3>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              {planetAId === 'earth' && planetBId === 'mars' ? renderText(
                'Earth has a much thicker atmosphere with nitrogen and oxygen. Mars has a very thin atmosphere made mostly of carbon dioxide, so humans cannot breathe there naturally.',
                'زمین کی فضا زیادہ گھنی ہے اور اس میں نائٹروجن اور آکسیجن موجود ہیں۔ مریخ کی فضا بہت پتلی ہے اور زیادہ تر کاربن ڈائی آکسائیڈ پر مشتمل ہے، اس لیے انسان وہاں قدرتی طور پر سانس نہیں لے سکتے۔'
              ) : renderText(
                `${planetA.name.en} and ${planetB.name.en} have different atmospheric compositions and densities.`,
                `${planetA.name.ur} اور ${planetB.name.ur} کی فضائی ترکیب اور کثافت مختلف ہے۔`
              )}
            </p>
            <p className="text-xs italic" style={{ color: 'var(--accent)' }}>
              {renderText('Why it matters: Atmosphere protects from radiation, regulates temperature, and enables life.', 'اہمیت: فضا تابکاری سے محفوظ رکھتی ہے، درجہ حرارت کو ریگولیٹ کرتی ہے اور زندگی کو ممکن بناتی ہے۔')}
            </p>
          </div>

          {/* Habitability */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>🌍</span>
              {renderText('Human Survival', 'انسانی بقا')}
            </h3>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              {planetAId === 'earth' && planetBId === 'mars' ? renderText(
                'Earth is the only known planet with life. Mars is important for scientific exploration, but people cannot live there naturally without advanced life-support systems.',
                'زمین اب تک معلوم واحد سیارہ ہے جہاں زندگی موجود ہے۔ مریخ سائنسی تحقیق کے لیے اہم ہے، لیکن جدید زندگی بچانے والے نظاموں کے بغیر انسان وہاں قدرتی طور پر نہیں رہ سکتے۔'
              ) : renderText(
                `${planetA.name.en} and ${planetB.name.en} have very different conditions for human survival.`,
                `${planetA.name.ur} اور ${planetB.name.ur} انسانی بقا کے لیے بہت مختلف حالات رکھتے ہیں۔`
              )}
            </p>
            <p className="text-xs italic" style={{ color: 'var(--accent)' }}>
              {renderText('Why it matters: Understanding habitability helps us search for life and plan future exploration.', 'اہمیت: رہائش کی صلاحیت کو سمجھنا ہمیں زندگی کی تلاش اور مستقبل کی دریافت کی منصوبہ بندی میں مدد دیتا ہے۔')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Detailed Learning Lesson */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {planetAId === 'earth' && planetBId === 'mars' 
            ? renderText('Why Are Earth and Mars Different?', 'زمین اور مریخ مختلف کیوں ہیں؟')
            : renderText(`Why Are ${planetA.name.en} and ${planetB.name.en} Different?`, `کیوں ${planetA.name.ur} اور ${planetB.name.ur} مختلف ہیں؟`)}
        </h2>

        {/* 1. Size, mass and gravity */}
        <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('1. Size, Mass and Gravity', '1. سائز، کمیت اور کششِ ثقل')}
          </h3>
          <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {planetAId === 'earth' && planetBId === 'mars' ? renderText(
              'Earth is much larger than Mars. Earth\'s diameter is about 12,756 km, while Mars is about 6,792 km wide, so Mars is only a little more than half as wide as Earth. Earth also has stronger surface gravity. A person who weighs 70 kg on Earth would have an estimated scale weight of about 26.6 kg on Mars because Mars has roughly 38% of Earth\'s surface gravity. Stronger gravity helps Earth retain a thicker atmosphere than Mars.',
              'زمین مریخ کے مقابلے میں بہت بڑی ہے۔ زمین کا قطر تقریباً 12,756 کلومیٹر ہے، جبکہ مریخ کا قطر تقریباً 6,792 کلومیٹر ہے، اس لیے مریخ زمین کے قطر کے نصف سے کچھ زیادہ ہے۔ زمین کی سطحی کششِ ثقل بھی زیادہ مضبوط ہے۔ جس شخص کا وزن زمین پر 70 کلوگرام ہو، اس کا اندازاً وزن مریخ پر تقریباً 26.6 کلوگرام ہوگا کیونکہ مریخ کی سطحی کششِ ثقل زمین کی کششِ ثقل کا تقریباً 38 فیصد ہے۔ زیادہ مضبوط کششِ ثقل زمین کو مریخ کے مقابلے میں زیادہ گھنی فضا برقرار رکھنے میں مدد دیتی ہے۔'
            ) : renderText(
              `${planetA.name.en} has a diameter of ${detailA.diameter} and gravity of ${detailA.gravity}. ${planetB.name.en} has a diameter of ${detailB.diameter} and gravity of ${detailB.gravity}. The difference in size and mass affects their surface gravity and ability to retain atmosphere.`,
              `${planetA.name.ur} کا قطر ${detailA.diameter} اور کششِ ثقل ${detailA.gravity} ہے۔ ${planetB.name.ur} کا قطر ${detailB.diameter} اور کششِ ثقل ${detailB.gravity} ہے۔ سائز اور کمیت میں فرق ان کی سطحی کششِ ثقل اور فضا کو برقرار رکھنے کی صلاحیت کو متاثر کرتا ہے۔`
            )}
          </p>
          <div className="flex justify-center gap-8 p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-2" style={{ background: planetA.gradient }} />
              <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{planetA.name.en}</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{detailA.diameter}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-2" style={{ background: planetB.gradient }} />
              <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{planetB.name.en}</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{detailB.diameter}</p>
            </div>
          </div>
          <p className="text-xs italic mt-2 text-center" style={{ color: 'var(--text-secondary)' }}>
            {renderText('Educational size comparison — not to scale.', 'تعلیمی سائز کا موازنہ — حقیقی پیمانے پر نہیں۔')}
          </p>
        </div>

        {/* 2. Distance and year */}
        <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('2. Distance from Sun and Year Length', '2. سورج سے فاصلہ اور سال کی مدت')}
          </h3>
          <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {planetAId === 'earth' && planetBId === 'mars' ? renderText(
              'Earth is about 149.6 million km from the Sun, while Mars is about 227.9 million km away on average. Mars travels on a larger path around the Sun. One orbit of Mars takes about 687 Earth days, almost 1.88 Earth years, while Earth completes one orbit in about 365.25 days. This is why a 25-year-old person on Earth is only about 13.3 years old when age is counted in Mars years.',
              'زمین سورج سے اوسطاً تقریباً 149.6 ملین کلومیٹر دور ہے، جبکہ مریخ اوسطاً تقریباً 227.9 ملین کلومیٹر دور ہے۔ مریخ سورج کے گرد زیادہ بڑے راستے پر سفر کرتا ہے۔ مریخ کو سورج کے گرد ایک چکر مکمل کرنے میں تقریباً 687 زمینی دن، یعنی تقریباً 1.88 زمینی سال لگتے ہیں، جبکہ زمین تقریباً 365.25 دن میں اپنا ایک چکر مکمل کرتی ہے۔ اسی وجہ سے زمین پر 25 سال کی عمر رکھنے والا شخص مریخی سالوں کے حساب سے تقریباً 13.3 سال کا ہوگا۔'
            ) : renderText(
              `${planetA.name.en} is ${detailA.avgDistance} from the Sun with a year of ${detailA.yearLength}. ${planetB.name.en} is ${detailB.avgDistance} from the Sun with a year of ${detailB.yearLength}. Greater distance usually means a longer year.`,
              `${planetA.name.ur} سورج سے ${detailA.avgDistance} دور ہے جس کا سال ${detailA.yearLength} ہے۔ ${planetB.name.ur} سورج سے ${detailB.avgDistance} دور ہے جس کا سال ${detailB.yearLength} ہے۔ زیادہ فاصلہ عموماً لمبا سال ہوتا ہے۔`
            )}
          </p>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ background: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00 60%, #ff4500)', boxShadow: '0 0 15px #ff8c00' }} />
              <div className="flex-1 h-1 rounded" style={{ background: 'linear-gradient(90deg, #ff8c00 0%, var(--accent) 100%)' }} />
              <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ background: planetA.gradient }} />
              <div className="flex-1 h-1 rounded" style={{ background: 'linear-gradient(90deg, var(--accent) 0%, var(--purple) 100%)' }} />
              <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ background: planetB.gradient }} />
            </div>
            <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span>{renderText('Sun', 'سورج')}</span>
              <span>{planetA.name.en}</span>
              <span>{planetB.name.en}</span>
            </div>
          </div>
          <p className="text-xs italic mt-2 text-center" style={{ color: 'var(--text-secondary)' }}>
            {renderText('Diagram not to scale — shows relative positions only.', 'ڈائریگرام حقیقی پیمانے پر نہیں — صرف نسبتی پوزیشن دکھاتا ہے۔')}
          </p>
        </div>

        {/* 3. Day length */}
        <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('3. Day Length and Rotation', '3. دن کی مدت اور گردش')}
          </h3>
          <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {planetAId === 'earth' && planetBId === 'mars' ? renderText(
              'Earth and Mars have surprisingly similar day lengths. An Earth day is about 24 hours, while a Mars day, called a sol, is about 24.6 hours. This similarity does not mean the planets are alike in every way. Day length comes mainly from rotation, while temperature, atmosphere and year length depend on other factors as well.',
              'زمین اور مریخ کے دنوں کی مدت حیرت انگیز طور پر ایک جیسی ہے۔ زمین کا ایک دن تقریباً 24 گھنٹے کا ہوتا ہے، جبکہ مریخ کا ایک دن، جسے سول کہا جاتا ہے، تقریباً 24.6 گھنٹے کا ہے۔ یہ مماثلت اس بات کا مطلب نہیں کہ دونوں سیارے ہر لحاظ سے ایک جیسے ہیں۔ دن کی مدت بنیادی طور پر محوری گردش سے بنتی ہے، جبکہ درجہ حرارت، فضا اور سال کی مدت دوسری چیزوں پر بھی منحصر ہوتی ہے۔'
            ) : renderText(
              `${planetA.name.en} has a day length of ${detailA.dayLength}, while ${planetB.name.en} has ${detailB.dayLength}. Day length depends on how fast a planet rotates on its axis.`,
              `${planetA.name.ur} کا دن ${detailA.dayLength} کا ہے، جبکہ ${planetB.name.ur} کا ${detailB.dayLength} کا ہے۔ دن کی مدت اس بات پر منحصر ہوتی ہے کہ سیارہ اپنے محور پر کتنی تیزی سے گھومتا ہے۔`
            )}
          </p>
        </div>

        {/* 4. Temperature and atmosphere */}
        <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('4. Temperature and Atmosphere', '4. درجہ حرارت اور فضا')}
          </h3>
          <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {planetAId === 'earth' && planetBId === 'mars' ? renderText(
              'Earth\'s average temperature is much higher than Mars\'s. Earth is closer to the Sun and has a much thicker atmosphere that helps distribute and retain heat. Mars is farther from the Sun and has a very thin atmosphere, mostly carbon dioxide. Because Mars cannot hold heat as effectively, it is usually very cold, although temperatures can vary greatly with location, season and time of day.',
              'زمین کا اوسط درجہ حرارت مریخ کے مقابلے میں بہت زیادہ ہے۔ زمین سورج کے زیادہ قریب ہے اور اس کی فضا زیادہ گھنی ہے، جو حرارت کو پھیلانے اور کچھ حد تک محفوظ رکھنے میں مدد دیتی ہے۔ مریخ سورج سے زیادہ دور ہے اور اس کی فضا بہت پتلی ہے، جو زیادہ تر کاربن ڈائی آکسائیڈ پر مشتمل ہے۔ چونکہ مریخ حرارت کو زمین کی طرح مؤثر انداز میں برقرار نہیں رکھ سکتا، اس لیے وہاں عموماً بہت سردی ہوتی ہے، اگرچہ جگہ، موسم اور دن کے وقت کے مطابق درجہ حرارت میں کافی فرق آ سکتا ہے۔'
            ) : renderText(
              `${planetA.name.en} averages ${detailA.avgTemp}, while ${planetB.name.en} averages ${detailB.avgTemp}. Temperature depends on distance from Sun, atmosphere thickness, and heat retention ability.`,
              `${planetA.name.ur} کا اوسط ${detailA.avgTemp} ہے، جبکہ ${planetB.name.ur} کا اوسط ${detailB.avgTemp} ہے۔ درجہ حرارت سورج سے فاصلے، فضا کی موٹائی اور حرارت کو برقرار رکھنے کی صلاحیت پر منحصر ہوتا ہے۔`
            )}
          </p>
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{detailA.avgTemp}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{planetA.name.en}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{detailB.avgTemp}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{planetB.name.en}</div>
            </div>
          </div>
          <p className="text-xs italic mt-2 text-center" style={{ color: 'var(--text-secondary)' }}>
            {renderText('Note: Temperature varies by location, altitude, season, day and night.', 'نوٹ: درجہ حرارت جگہ، بلندی، موسم، دن اور رات کے مطابق تبدیل ہوتا ہے۔')}
          </p>
        </div>

        {/* 5. Surface, water and weather */}
        <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('5. Surface, Water and Weather', '5. سطح، پانی اور موسم')}
          </h3>
          <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {planetAId === 'earth' && planetBId === 'mars' ? renderText(
              'Earth has stable liquid water on much of its surface, active oceans, a strong water cycle and a living biosphere. Mars is a cold, dry desert world today, but spacecraft have found strong evidence that liquid water flowed on its surface long ago. Mars has polar ice, dusty plains, giant volcanoes, canyons and global dust storms. These features make Mars scientifically important, but they do not make it naturally safe for people.',
              'زمین کی سطح کے بڑے حصے پر مستحکم مائع پانی، فعال سمندر، مضبوط آبی چکر اور جانداروں پر مشتمل حیاتیاتی نظام موجود ہے۔ مریخ آج ایک سرد اور خشک صحرائی دنیا ہے، لیکن خلائی مشنز نے مضبوط شواہد دریافت کیے ہیں کہ بہت عرصہ پہلے اس کی سطح پر مائع پانی بہتا تھا۔ مریخ پر قطبی برف، گرد آلود میدان، بہت بڑے آتش فشاں، گھاٹیاں اور وسیع گردی طوفان موجود ہیں۔ یہ خصوصیات مریخ کو سائنسی طور پر اہم بناتی ہیں، مگر اسے انسانوں کے لیے قدرتی طور پر محفوظ جگہ نہیں بناتیں۔'
            ) : renderText(
              `${planetA.name.en} and ${planetB.name.en} have very different surface conditions, atmospheres and weather patterns.`,
              `${planetA.name.ur} اور ${planetB.name.ur} کی سطحی حالات، فضا اور موسم کے نمونے بہت مختلف ہیں۔`
            )}
          </p>
        </div>

        {/* 6. Moons and exploration */}
        <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('6. Moons and Exploration', '6. چاند اور دریافت')}
          </h3>
          <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {planetAId === 'earth' && planetBId === 'mars' ? renderText(
              'Earth has one large natural Moon, while Mars has two small moons, Phobos and Deimos. Earth has been studied by astronauts, satellites and Earth-observing missions. Mars has been explored by robotic spacecraft, orbiters, landers and rovers such as Viking, Curiosity and Perseverance. Humans have not traveled to Mars.',
              'زمین کا ایک بڑا قدرتی چاند ہے، جبکہ مریخ کے دو چھوٹے چاند ہیں جنہیں فوبوس اور ڈیموس کہا جاتا ہے۔ زمین کا مطالعہ خلانوردوں، سیٹلائٹس اور زمین کا مشاہدہ کرنے والے مشنز کے ذریعے کیا گیا ہے۔ مریخ کو روبوٹک خلائی جہازوں، مداری مشنز، لینڈرز اور روورز جیسے وائکنگ، کیوروسٹی اور پرسیویرنس نے دریافت کیا ہے۔ انسان ابھی تک مریخ تک سفر نہیں کر سکے۔'
            ) : renderText(
              `${planetA.name.en} has ${detailA.moons} moons and ${planetB.name.en} has ${detailB.moons} moons. Both planets have been studied by various space missions.`,
              `${planetA.name.ur} کے ${detailA.moons} چاند ہیں اور ${planetB.name.ur} کے ${detailB.moons} چاند ہیں۔ دونوں سیاروں کا مطالعہ مختلف خلائی مشنز کے ذریعے کیا گیا ہے۔`
            )}
          </p>
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{detailA.moons}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{planetA.name.en} moons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{detailB.moons}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{planetB.name.en} moons</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Visual Comparisons */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Visual Comparisons', 'بصری موازنہ')}
        </h2>

        {/* Gravity comparison */}
        <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('Gravity Comparison', 'کششِ ثقل کا موازنہ')}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{detailA.gravity}</div>
              <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{planetA.name.en}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {renderText('70 kg person → 70 kg', '70 کلوگرام شخص → 70 کلوگرام')}
              </div>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{detailB.gravity}</div>
              <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{planetB.name.en}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {renderText('70 kg person → estimate varies', '70 کلوگرام شخص → اندازاً مختلف')}
              </div>
            </div>
          </div>
          <p className="text-xs italic mt-2 text-center" style={{ color: 'var(--text-secondary)' }}>
            {renderText('Educational estimate — actual weight depends on local gravity.', 'تعلیمی اندازہ — اصل وزن مقامی کششِ ثقل پر منحصر ہے۔')}
          </p>
        </div>

        {/* Atmosphere comparison */}
        <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {renderText('Atmosphere Comparison', 'فضا کا موازنہ')}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <ScientificImage subjectId={planetAId} size={120} showCaption={true} showCredit={true} />
            <ScientificImage subjectId={planetBId} size={120} showCaption={true} showCredit={true} />
          </div>
        </div>
      </section>

      {/* Section 7: Flowcharts */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Understanding the Differences', 'فرق کو سمجھنا')}
        </h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('Why Years Differ', 'سال مختلف کیوں ہوتے ہیں')}
          </h3>
          <BilingualFlowchart
            steps={[
              { en: 'Distance from Sun', ur: 'سورج سے فاصلہ' },
              { en: 'Orbit size', ur: 'مدار کا حجم' },
              { en: 'Time to orbit', ur: 'چکر مکمل کرنے کا وقت' },
              { en: 'Year length', ur: 'سال کی مدت' }
            ]}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('Why Temperature Differs', 'درجہ حرارت مختلف کیوں ہوتا ہے')}
          </h3>
          <BilingualFlowchart
            steps={[
              { en: 'Distance from Sun', ur: 'سورج سے فاصلہ' },
              { en: '+ Atmosphere', ur: '+ فضا' },
              { en: '+ Heat retention', ur: '+ حرارت محفوظ رکھنا' },
              { en: 'Temperature', ur: 'درجہ حرارت' }
            ]}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('Why Gravity/Weight Differs', 'کششِ ثقل/وزن مختلف کیوں ہوتا ہے')}
          </h3>
          <BilingualFlowchart
            steps={[
              { en: 'Planet mass', ur: 'سیارے کی کمیت' },
              { en: 'Planet size', ur: 'سیارے کا سائز' },
              { en: 'Surface gravity', ur: 'سطحی کششِ ثقل' },
              { en: 'Different weight', ur: 'مختلف وزن' }
            ]}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            {renderText('Why Moon Count Differs', 'چاندوں کی تعداد مختلف کیوں ہوتی ہے')}
          </h3>
          <BilingualFlowchart
            steps={[
              { en: 'Formation history', ur: 'تشکیل کی تاریخ' },
              { en: '+ Gravity', ur: '+ کششِ ثقل' },
              { en: '+ Captured objects', ur: '+ اپنی طرف کھینچے گئے اجسام' },
              { en: 'Moon systems', ur: 'چاندوں کے نظام' }
            ]}
          />
        </div>
      </section>

      {/* Section 8: Carousel */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('See the Differences Through Images', 'تصویروں کے ذریعے فرق دیکھیں')}
        </h2>
        <EducationalCarousel
          slides={[
            {
              imageUrl: getCelestialImage(planetAId).fullDiskImageUrl,
              captionEn: `${planetA.name.en} - Full scientific view`,
              captionUr: `${planetA.name.ur} - مکمل سائنسی منظر`,
              credit: getCelestialImage(planetAId).credit,
              fallbackGradient: planetA.gradient
            },
            {
              imageUrl: getCelestialImage(planetBId).fullDiskImageUrl,
              captionEn: `${planetB.name.en} - Full scientific view`,
              captionUr: `${planetB.name.ur} - مکمل سائنسی منظر`,
              credit: getCelestialImage(planetBId).credit,
              fallbackGradient: planetB.gradient
            },
            {
              imageUrl: getCelestialImage(planetAId).fullDiskImageUrl,
              captionEn: `${planetA.name.en} - Size: ${detailA.diameter}`,
              captionUr: `${planetA.name.ur} - سائز: ${detailA.diameter}`,
              credit: getCelestialImage(planetAId).credit,
              fallbackGradient: planetA.gradient
            },
            {
              imageUrl: getCelestialImage(planetBId).fullDiskImageUrl,
              captionEn: `${planetB.name.en} - Size: ${detailB.diameter}`,
              captionUr: `${planetB.name.ur} - سائز: ${detailB.diameter}`,
              credit: getCelestialImage(planetBId).credit,
              fallbackGradient: planetB.gradient
            },
            {
              imageUrl: getCelestialImage(planetAId).fullDiskImageUrl,
              captionEn: `${planetA.name.en} - Distance: ${detailA.avgDistance}`,
              captionUr: `${planetA.name.ur} - فاصلہ: ${detailA.avgDistance}`,
              credit: getCelestialImage(planetAId).credit,
              fallbackGradient: planetA.gradient
            },
            {
              imageUrl: getCelestialImage(planetBId).fullDiskImageUrl,
              captionEn: `${planetB.name.en} - Distance: ${detailB.avgDistance}`,
              captionUr: `${planetB.name.ur} - فاصلہ: ${detailB.avgDistance}`,
              credit: getCelestialImage(planetBId).credit,
              fallbackGradient: planetB.gradient
            },
            {
              imageUrl: getCelestialImage(planetAId).fullDiskImageUrl,
              captionEn: `${planetA.name.en} - Temperature: ${detailA.avgTemp}`,
              captionUr: `${planetA.name.ur} - درجہ حرارت: ${detailA.avgTemp}`,
              credit: getCelestialImage(planetAId).credit,
              fallbackGradient: planetA.gradient
            },
            {
              imageUrl: getCelestialImage(planetBId).fullDiskImageUrl,
              captionEn: `${planetB.name.en} - Temperature: ${detailB.avgTemp}`,
              captionUr: `${planetB.name.ur} - درجہ حرارت: ${detailB.avgTemp}`,
              credit: getCelestialImage(planetBId).credit,
              fallbackGradient: planetB.gradient
            }
          ]}
        />
      </section>

      {/* Section 10: Quiz */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Test Your Knowledge', 'اپنے علم کی جانچ کریں')}
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

      {/* Section 11: Sources */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Sources', 'ماخذ')}
        </h2>
        <div className="space-y-2">
          {['NASA Planetary Fact Sheets', 'NASA Solar System Exploration', 'NASA Science'].map((source, i) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {source}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
