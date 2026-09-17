export interface PlanetData {
  id: string;
  name: { en: string; ur: string };
  diameter: string;
  avgDistance: string;
  orbitalPeriod: string;
  color: string;
  size: number; // visual size in px
  orbitRadius: number; // visual orbit radius in px
  speed: number; // animation duration in seconds (base)
  fact: { en: string; ur: string };
  emoji: string;
}

export const planets: PlanetData[] = [
  {
    id: 'mercury',
    name: { en: 'Mercury', ur: 'عطارد' },
    diameter: '4,879 km',
    avgDistance: '57.9 million km',
    orbitalPeriod: '88 Earth days',
    color: '#a0a0a0',
    size: 8,
    orbitRadius: 60,
    speed: 4.8,
    fact: { en: 'Closest planet to the Sun.', ur: 'سورج کے سب سے قریب سیارہ۔' },
    emoji: '☿'
  },
  {
    id: 'venus',
    name: { en: 'Venus', ur: 'زہرہ' },
    diameter: '12,104 km',
    avgDistance: '108.2 million km',
    orbitalPeriod: 'about 225 Earth days',
    color: '#e8c468',
    size: 12,
    orbitRadius: 90,
    speed: 12.4,
    fact: { en: 'The hottest planet in the Solar System.', ur: 'سولر سسٹم کا سب سے گرم سیارہ۔' },
    emoji: '♀'
  },
  {
    id: 'earth',
    name: { en: 'Earth', ur: 'زمین' },
    diameter: '12,756 km',
    avgDistance: '149.6 million km',
    orbitalPeriod: 'about 365.25 days',
    color: '#4a90d9',
    size: 13,
    orbitRadius: 120,
    speed: 20,
    fact: { en: 'The only known world with life.', ur: 'اب تک معلوم واحد دنیا جہاں زندگی موجود ہے۔' },
    emoji: '🌍'
  },
  {
    id: 'mars',
    name: { en: 'Mars', ur: 'مریخ' },
    diameter: '6,792 km',
    avgDistance: '227.9 million km',
    orbitalPeriod: 'about 687 Earth days',
    color: '#c1440e',
    size: 10,
    orbitRadius: 155,
    speed: 37.6,
    fact: { en: 'Known as the Red Planet.', ur: 'سرخ سیارے کے نام سے مشہور ہے۔' },
    emoji: '♂'
  },
  {
    id: 'jupiter',
    name: { en: 'Jupiter', ur: 'مشتری' },
    diameter: '142,984 km',
    avgDistance: '778.3 million km',
    orbitalPeriod: 'about 11.86 Earth years',
    color: '#c88b3a',
    size: 28,
    orbitRadius: 200,
    speed: 237,
    fact: { en: 'The largest planet in the Solar System.', ur: 'سولر سسٹم کا سب سے بڑا سیارہ۔' },
    emoji: '♃'
  },
  {
    id: 'saturn',
    name: { en: 'Saturn', ur: 'زحل' },
    diameter: '120,536 km',
    avgDistance: '1,429 million km',
    orbitalPeriod: 'about 29.45 Earth years',
    color: '#e8d088',
    size: 24,
    orbitRadius: 250,
    speed: 589,
    fact: { en: 'Famous for its bright ring system.', ur: 'اپنے روشن حلقوں کے نظام کی وجہ سے مشہور ہے۔' },
    emoji: '♄'
  },
  {
    id: 'uranus',
    name: { en: 'Uranus', ur: 'یورینس' },
    diameter: '51,118 km',
    avgDistance: '2,871 million km',
    orbitalPeriod: 'about 84 Earth years',
    color: '#7ec8e3',
    size: 18,
    orbitRadius: 295,
    speed: 1680,
    fact: { en: 'Rotates with an extreme tilt.', ur: 'بہت زیادہ جھکاؤ کے ساتھ گردش کرتا ہے۔' },
    emoji: '♅'
  },
  {
    id: 'neptune',
    name: { en: 'Neptune', ur: 'نیپچون' },
    diameter: '49,528 km',
    avgDistance: '4,495 million km',
    orbitalPeriod: 'about 164.8 Earth years',
    color: '#4169e1',
    size: 17,
    orbitRadius: 340,
    speed: 3296,
    fact: { en: 'The farthest major planet from the Sun.', ur: 'سورج سے سب سے دور بڑا سیارہ۔' },
    emoji: '♆'
  }
];
