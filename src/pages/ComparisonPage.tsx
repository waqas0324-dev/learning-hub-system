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
      question: { en: `Which planet is farther from the Sun?`, ur: `کون سا سیارہ سورج سے زیادہ دور ہے؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: parseFloat(detailA.avgDistance.replace(/[^0-9.]/g, '')) < parseFloat(detailB.avgDistance.replace(/[^0-9.]/g, '')) ? 1 : 0,
      explanation: { en: `${planetB.name.en} is farther from the Sun.`, ur: `${planetB.name.ur} سورج سے زیادہ دور ہے۔` }
    },
    {
      question: { en: `Which planet has stronger gravity?`, ur: `کس سیارے کی کششِ ثقل زیادہ مضبوط ہے؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: parseFloat(detailA.gravity.replace(/[^0-9.]/g, '')) > parseFloat(detailB.gravity.replace(/[^0-9.]/g, '')) ? 0 : 1,
      explanation: { en: `${parseFloat(detailA.gravity) > parseFloat(detailB.gravity) ? planetA.name.en : planetB.name.en} has stronger gravity.`, ur: `${parseFloat(detailA.gravity) > parseFloat(detailB.gravity) ? planetA.name.ur : planetB.name.ur} کی کششِ ثقل زیادہ مضبوط ہے۔` }
    },
    {
      question: { en: `Which planet has a longer year?`, ur: `کس سیارے کا سال لمبا ہے؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: parseFloat(detailA.yearLength.replace(/[^0-9.]/g, '')) < parseFloat(detailB.yearLength.replace(/[^0-9.]/g, '')) ? 1 : 0,
      explanation: { en: `${planetB.name.en} has a longer year.`, ur: `${planetB.name.ur} کا سال لمبا ہے۔` }
    },
    {
      question: { en: `Which planet is larger?`, ur: `کون سا سیارہ بڑا ہے؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: parseFloat(detailA.diameter.replace(/[^0-9.]/g, '')) > parseFloat(detailB.diameter.replace(/[^0-9.]/g, '')) ? 0 : 1,
      explanation: { en: `${parseFloat(detailA.diameter) > parseFloat(detailB.diameter) ? planetA.name.en : planetB.name.en} is larger.`, ur: `${parseFloat(detailA.diameter) > parseFloat(detailB.diameter) ? planetA.name.ur : planetB.name.ur} بڑا ہے۔` }
    },
    {
      question: { en: `Which planet has more known moons?`, ur: `کس سیارے کے معلوم چاند زیادہ ہیں؟` },
      options: [{ en: planetA.name.en, ur: planetA.name.ur }, { en: planetB.name.en, ur: planetB.name.ur }],
      correct: parseInt(detailA.moons) > parseInt(detailB.moons) ? 0 : 1,
      explanation: { en: `${planetA.name.en} has ${detailA.moons} moons, ${planetB.name.en} has ${detailB.moons}.`, ur: `${planetA.name.ur} کے ${detailA.moons} چاند ہیں، ${planetB.name.ur} کے ${detailB.moons}۔` }
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
      </section>

      {/* Section 7: Flowcharts */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Understanding the Differences', 'فرق کو سمجھنا')}
        </h2>
        <BilingualFlowchart
          steps={[
            { en: 'Distance from Sun', ur: 'سورج سے فاصلہ' },
            { en: 'Orbit size', ur: 'مدار کا حجم' },
            { en: 'Time to orbit', ur: 'چکر مکمل کرنے کا وقت' },
            { en: 'Year length', ur: 'سال کی مدت' }
          ]}
        />
        <BilingualFlowchart
          steps={[
            { en: 'Distance from Sun', ur: 'سورج سے فاصلہ' },
            { en: '+ Atmosphere', ur: '+ فضا' },
            { en: '+ Heat retention', ur: '+ حرارت محفوظ رکھنا' },
            { en: 'Temperature', ur: 'درجہ حرارت' }
          ]}
        />
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
              captionEn: `${planetA.name.en} - Full view`,
              captionUr: `${planetA.name.ur} - مکمل منظر`,
              credit: getCelestialImage(planetAId).credit,
              fallbackGradient: planetA.gradient
            },
            {
              imageUrl: getCelestialImage(planetBId).fullDiskImageUrl,
              captionEn: `${planetB.name.en} - Full view`,
              captionUr: `${planetB.name.ur} - مکمل منظر`,
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
