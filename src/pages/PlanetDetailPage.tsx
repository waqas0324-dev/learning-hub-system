import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { planetDetails } from '../data/planetDetails';
import { getCelestialImage } from '../data/imageManifest';
import { PlanetImage } from '../components/PlanetImage';
import { ScientificImage } from '../components/ScientificImage';
import { EducationalCarousel } from '../components/EducationalCarousel';
import { InteractiveDiagram } from '../components/InteractiveDiagram';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from 'lucide-react';

export function PlanetDetailPage() {
  const { planetId } = useParams<{ planetId: string }>();
  const navigate = useNavigate();
  const { language } = useApp();
  const [selectedPlanet, setSelectedPlanet] = useState<any>(null);

  useEffect(() => {
    if (planetId && planetDetails[planetId]) {
      setSelectedPlanet(planetDetails[planetId]);
    } else {
      navigate('/solar-system');
    }
  }, [planetId, navigate]);

  if (!selectedPlanet) return null;

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

  return (
    <div className="space-y-12 pb-8">
      {/* SECTION 1: HERO */}
      <section className="rounded-2xl overflow-hidden border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <ScientificImage 
                  subjectId={selectedPlanet.id} 
                  size={200} 
                  enableLightbox={true}
                  showCaption={true}
                  showCredit={true}
                />
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: `0 0 60px ${selectedPlanet.id === 'earth' ? '#4a90d9' : selectedPlanet.id === 'mars' ? '#c1440e' : selectedPlanet.id === 'jupiter' ? '#c88b3a' : selectedPlanet.id === 'saturn' ? '#e8d088' : selectedPlanet.id === 'uranus' ? '#7ec8e3' : selectedPlanet.id === 'neptune' ? '#3355cc' : selectedPlanet.id === 'venus' ? '#e8c468' : '#8c7e6d'}40` }} />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {renderText(
                  selectedPlanet.id.charAt(0).toUpperCase() + selectedPlanet.id.slice(1),
                  selectedPlanet.id === 'mercury' ? 'عطارد' :
                  selectedPlanet.id === 'venus' ? 'زہرہ' :
                  selectedPlanet.id === 'earth' ? 'زمین' :
                  selectedPlanet.id === 'mars' ? 'مریخ' :
                  selectedPlanet.id === 'jupiter' ? 'مشتری' :
                  selectedPlanet.id === 'saturn' ? 'زحل' :
                  selectedPlanet.id === 'uranus' ? 'یورینس' :
                  'نیپچون'
                )}
              </h1>
              <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>
                {renderText(selectedPlanet.type.en, selectedPlanet.type.ur)}
              </p>
              <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {renderText(selectedPlanet.coreDescription.en, selectedPlanet.coreDescription.ur)}
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                {renderText('Explore in Orbit', 'مدار میں دریافت کریں')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.5: PLANET IMAGE CAROUSEL */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Image Gallery', 'تصاویر کی گیلری')}
        </h2>
        <EducationalCarousel
          slides={[
            {
              imageUrl: getCelestialImage(selectedPlanet.id).fullDiskImageUrl,
              captionEn: `${selectedPlanet.id.charAt(0).toUpperCase() + selectedPlanet.id.slice(1)} - Full disk view`,
              captionUr: `${selectedPlanet.id === 'mercury' ? 'عطارد' : selectedPlanet.id === 'venus' ? 'زہرہ' : selectedPlanet.id === 'earth' ? 'زمین' : selectedPlanet.id === 'mars' ? 'مریخ' : selectedPlanet.id === 'jupiter' ? 'مشتری' : selectedPlanet.id === 'saturn' ? 'زحل' : selectedPlanet.id === 'uranus' ? 'یورینس' : 'نیپچون'} - مکمل کرہ نما منظر`,
              credit: getCelestialImage(selectedPlanet.id).credit,
              fallbackGradient: selectedPlanet.id === 'earth' ? 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #1a3a5c)' :
                               selectedPlanet.id === 'mars' ? 'radial-gradient(circle at 35% 35%, #e8845a, #c1440e 40%, #5c1800)' :
                               selectedPlanet.id === 'jupiter' ? 'radial-gradient(ellipse at 40% 40%, #f0d8a8, #c88b3a 25%, #6b4010)' :
                               selectedPlanet.id === 'saturn' ? 'radial-gradient(ellipse at 40% 40%, #f5ecc8, #e8d088 30%, #786020)' :
                               selectedPlanet.id === 'uranus' ? 'radial-gradient(circle at 35% 35%, #b8e8f0, #7ec8e3 40%, #2a6888)' :
                               selectedPlanet.id === 'neptune' ? 'radial-gradient(circle at 35% 35%, #6688ee, #3355cc 40%, #112266)' :
                               selectedPlanet.id === 'venus' ? 'radial-gradient(circle at 35% 35%, #f5e6a8, #e8c468 35%, #8b6914)' :
                               'radial-gradient(circle at 35% 35%, #c8beb0, #8c7e6d 40%, #3d352c)'
            }
          ]}
        />
      </section>

      {/* SECTION 2: WHAT IS THIS PLANET? */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText(`What is ${selectedPlanet.id.charAt(0).toUpperCase() + selectedPlanet.id.slice(1)}?`, `${selectedPlanet.id === 'mercury' ? 'عطارد' : selectedPlanet.id === 'venus' ? 'زہرہ' : selectedPlanet.id === 'earth' ? 'زمین' : selectedPlanet.id === 'mars' ? 'مریخ' : selectedPlanet.id === 'jupiter' ? 'مشتری' : selectedPlanet.id === 'saturn' ? 'زحل' : selectedPlanet.id === 'uranus' ? 'یورینس' : 'نیپچون'} کیا ہے؟`)}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.detailedDescription.en, selectedPlanet.detailedDescription.ur)}
        </p>
      </section>

      {/* SECTION 3: BASIC FACTS */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Basic Facts', 'بنیادی حقائق')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: { en: 'Type', ur: 'قسم' }, value: selectedPlanet.type },
            { label: { en: 'Diameter', ur: 'قطر' }, value: { en: selectedPlanet.diameter, ur: selectedPlanet.diameter } },
            { label: { en: 'Distance from Sun', ur: 'سورج سے فاصلہ' }, value: { en: selectedPlanet.avgDistance, ur: selectedPlanet.avgDistance } },
            { label: { en: 'Day Length', ur: 'دن کی لمبائی' }, value: { en: selectedPlanet.dayLength, ur: selectedPlanet.dayLength } },
            { label: { en: 'Year Length', ur: 'سال کی لمبائی' }, value: { en: selectedPlanet.yearLength, ur: selectedPlanet.yearLength } },
            { label: { en: 'Average Temperature', ur: 'اوسط درجہ حرارت' }, value: { en: selectedPlanet.avgTemp, ur: selectedPlanet.avgTemp } },
            { label: { en: 'Gravity', ur: 'کششِ ثقل' }, value: { en: selectedPlanet.gravity, ur: selectedPlanet.gravity } },
            { label: { en: 'Known Moons', ur: 'معلوم چاند' }, value: { en: selectedPlanet.moons, ur: selectedPlanet.moons } },
            { label: { en: 'Rings', ur: 'حلقے' }, value: selectedPlanet.rings }
          ].map((fact, i) => (
            <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                {renderText(fact.label.en, fact.label.ur)}
              </div>
              <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {renderText(fact.value.en, fact.value.ur)}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs italic mt-3 text-center" style={{ color: 'var(--text-secondary)' }}>
          {renderText('Values are approximate educational averages.', 'یہ قدریں تعلیمی مقصد کے لیے اندازاً اوسط ہیں۔')}
        </p>
      </section>

      {/* SECTION 4-13: Detailed sections */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Surface and Structure', 'سطح اور ساخت')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.surfaceSection.en, selectedPlanet.surfaceSection.ur)}
        </p>
        {/* Interactive diagram for planet structure */}
        <InteractiveDiagram
          labels={[
            { id: 'core', x: 50, y: 50, en: 'Core', ur: 'مرکز', description: { en: 'The dense center of the planet', ur: 'سیارے کا گھنا مرکز' } },
            { id: 'mantle', x: 30, y: 30, en: 'Mantle', ur: 'رداء', description: { en: 'Layer surrounding the core', ur: 'مرکز کے گرد کی تہہ' } },
            { id: 'crust', x: 70, y: 20, en: 'Crust', ur: 'پوست', description: { en: 'Outer solid layer', ur: 'بیرونی ٹھوس تہہ' } }
          ]}
          title={{ en: 'Planet Structure', ur: 'سیارے کی ساخت' }}
          showNotToScale={true}
          fallbackGradient={selectedPlanet.id === 'earth' ? 'radial-gradient(circle at 50% 50%, #ff6b35, #4a90d9 40%, #2d6b3f 70%, #1a3a5c)' :
                           selectedPlanet.id === 'mars' ? 'radial-gradient(circle at 50% 50%, #c1440e, #8b2500 50%, #5c1800)' :
                           'radial-gradient(circle at 50% 50%, #c88b3a, #6b4010 50%, #3d2510)'}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Atmosphere and Weather', 'فضا اور موسم')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.atmosphereSection.en, selectedPlanet.atmosphereSection.ur)}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Temperature', 'درجہ حرارت')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.temperatureExplanation.en, selectedPlanet.temperatureExplanation.ur)}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Moons and Rings', 'چاند اور حلقے')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.moonsAndRingsDetail.en, selectedPlanet.moonsAndRingsDetail.ur)}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Seasons', 'موسم')}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.seasonsSection.en, selectedPlanet.seasonsSection.ur)}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText(`Can Humans Live on ${selectedPlanet.id.charAt(0).toUpperCase() + selectedPlanet.id.slice(1)}?`, `کیا انسان ${selectedPlanet.id === 'mercury' ? 'عطارد' : selectedPlanet.id === 'venus' ? 'زہرہ' : selectedPlanet.id === 'earth' ? 'زمین' : selectedPlanet.id === 'mars' ? 'مریخ' : selectedPlanet.id === 'jupiter' ? 'مشتری' : selectedPlanet.id === 'saturn' ? 'زحل' : selectedPlanet.id === 'uranus' ? 'یورینس' : 'نیپچون'} پر رہ سکتے ہیں؟`)}
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {renderText(selectedPlanet.habitability.en, selectedPlanet.habitability.ur)}
        </p>
      </section>

      {/* SECTION 14: FUN FACTS */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Fun Facts', 'دلچسپ حقائق')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {selectedPlanet.funFacts.map((fact: { en: string; ur: string }, i: number) => (
            <div key={i} className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              {renderText(fact.en, fact.ur)}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 16: QUIZ */}
      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Test Your Knowledge', 'اپنے علم کی جانچ کریں')}
        </h2>
        <PlanetQuiz questions={selectedPlanet.quiz} planetId={selectedPlanet.id} />
      </section>

      {/* Navigation buttons */}
      <section className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/comparison"
          className="px-4 py-2 rounded-lg text-sm font-medium border"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          {renderText('Compare this planet', 'اس سیارے کا موازنہ کریں')}
        </Link>
        <Link
          to="/calculator"
          className="px-4 py-2 rounded-lg text-sm font-medium border"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          {renderText('Calculate age and weight', 'عمر اور وزن کا حساب لگائیں')}
        </Link>
        <button
          onClick={() => navigate('/solar-system')}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          {renderText('Back to Solar System', 'نظامِ شمسی پر واپس')}
        </button>
      </section>
    </div>
  );
}

// Planet Quiz Component
function PlanetQuiz({ questions, planetId }: { questions: any[]; planetId: string }) {
  const { language } = useApp();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem(`sslh-${planetId}-quiz-best`);
    return saved ? parseInt(saved) : 0;
  });

  const question = questions[currentQ];

  const renderText = (en: string, ur: string) => {
    if (language === 'en') return <>{en}</>;
    if (language === 'ur') return <span className="font-urdu" dir="rtl">{ur}</span>;
    return <>{en}<span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;
  };

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowResult(true);
    if (idx === question.correct) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem(`sslh-${planetId}-quiz-best`, newScore.toString());
      }
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  };

  if (finished) {
    const incorrect = questions.length - score;
    return (
      <div className="rounded-xl p-6 border text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {renderText('Quiz Complete!', 'کوئز مکمل!')}
        </h3>
        <div className="text-5xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
          {score} / {questions.length}
        </div>
        <div className="flex justify-center gap-6 my-4">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{score}</div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{language === 'ur' ? 'درست' : 'Correct'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: '#ef4444' }}>{incorrect}</div>
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
    );
  }

  return (
    <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {renderText(`Question ${currentQ + 1} of ${questions.length}`, `سوال ${currentQ + 1} از ${questions.length}`)}
        </span>
        <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
          {renderText(`Score: ${score}`, `اسکور: ${score}`)}
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {renderText(question.question.en, question.question.ur)}
      </h3>
      <div className="space-y-2 mb-4">
        {question.options.map((opt: any, idx: number) => {
          let style: React.CSSProperties = { backgroundColor: 'var(--surface-muted)', borderColor: 'var(--border)', color: 'var(--text-primary)' };
          if (showResult) {
            if (idx === question.correct) style = { backgroundColor: '#10b98120', borderColor: '#10b981', color: '#10b981' };
            else if (idx === selected && idx !== question.correct) style = { backgroundColor: '#ef444420', borderColor: '#ef4444', color: '#ef4444' };
          }
          return (
            <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered} className="w-full text-left px-4 py-3 rounded-lg border transition-colors" style={style}>
              {renderText(opt.en, opt.ur)}
            </button>
          );
        })}
      </div>
      {showResult && (
        <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: selected === question.correct ? '#10b98115' : '#ef444415', border: `1px solid ${selected === question.correct ? '#10b981' : '#ef4444'}` }}>
          <div className="flex items-center gap-2 mb-2">
            {selected === question.correct ? <CheckCircle size={20} style={{ color: '#10b981' }} /> : <XCircle size={20} style={{ color: '#ef4444' }} />}
            <span className="font-semibold" style={{ color: selected === question.correct ? '#10b981' : '#ef4444' }}>
              {selected === question.correct ? renderText('Correct!', 'درست!') : renderText('Incorrect. Here is the correct answer.', 'یہ جواب درست نہیں ہے۔ درست جواب یہ ہے۔')}
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {renderText(question.explanation.en, question.explanation.ur)}
          </p>
        </div>
      )}
      {answered && (
        <button onClick={handleNext} className="w-full py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
          {renderText(currentQ < questions.length - 1 ? 'Next Question' : 'Finish Quiz', currentQ < questions.length - 1 ? 'اگلا سوال' : 'کوئز مکمل')}
        </button>
      )}
    </div>
  );
}
