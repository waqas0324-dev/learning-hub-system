export interface PlanetData {
  id: string;
  name: { en: string; ur: string };
  diameter: string;
  avgDistance: string;
  orbitalPeriod: string;
  color: string;
  gradient: string; // CSS gradient fallback texture
  size: number; // visual size in px
  orbitRadius: number; // visual orbit radius in px
  speed: number; // animation duration in seconds (base at 1x)
  fact: { en: string; ur: string };
  imageUrl: string; // NASA/public domain image
  imageCredit: string;
}

// NASA image URLs from images-assets.nasa.gov (public domain)
// Fallback: CSS gradients that match each planet's real appearance
export const planets: PlanetData[] = [
  {
    id: 'mercury',
    name: { en: 'Mercury', ur: 'عطارد' },
    diameter: '4,879 km',
    avgDistance: '57.9 million km',
    orbitalPeriod: '88 Earth days',
    color: '#8c7e6d',
    gradient: 'radial-gradient(circle at 35% 35%, #b8a898, #8c7e6d 40%, #5a4e42 80%, #3d352c)',
    size: 22,
    orbitRadius: 58,
    speed: 5,
    fact: { en: 'Closest planet to the Sun.', ur: 'سورج کے سب سے قریب سیارہ۔' },
    imageUrl: 'https://images-assets.nasa.gov/image/PIA21188/PIA21188~small.jpg',
    imageCredit: 'NASA/JPL-Caltech/MESSENGER'
  },
  {
    id: 'venus',
    name: { en: 'Venus', ur: 'زہرہ' },
    diameter: '12,104 km',
    avgDistance: '108.2 million km',
    orbitalPeriod: 'about 225 Earth days',
    color: '#e8c468',
    gradient: 'radial-gradient(circle at 35% 35%, #f5e6a8, #e8c468 35%, #c4943a 65%, #8b6914)',
    size: 30,
    orbitRadius: 88,
    speed: 12,
    fact: { en: 'The hottest planet in the Solar System.', ur: 'سولر سسٹم کا سب سے گرم سیارہ۔' },
    imageUrl: 'https://images-assets.nasa.gov/image/PIA23792/PIA23792~small.jpg',
    imageCredit: 'NASA/JPL-Caltech'
  },
  {
    id: 'earth',
    name: { en: 'Earth', ur: 'زمین' },
    diameter: '12,756 km',
    avgDistance: '149.6 million km',
    orbitalPeriod: 'about 365.25 days',
    color: '#4a90d9',
    gradient: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #4a90d9 70%, #1a3a5c)',
    size: 32,
    orbitRadius: 118,
    speed: 20,
    fact: { en: 'The only known world with life.', ur: 'اب تک معلوم واحد دنیا جہاں زندگی موجود ہے۔' },
    imageUrl: 'https://images-assets.nasa.gov/image/PIA18033/PIA18033~small.jpg',
    imageCredit: 'NASA/NOAA/ESFC'
  },
  {
    id: 'mars',
    name: { en: 'Mars', ur: 'مریخ' },
    diameter: '6,792 km',
    avgDistance: '227.9 million km',
    orbitalPeriod: 'about 687 Earth days',
    color: '#c1440e',
    gradient: 'radial-gradient(circle at 35% 35%, #e8845a, #c1440e 40%, #8b2500 70%, #5c1800)',
    size: 26,
    orbitRadius: 152,
    speed: 38,
    fact: { en: 'Known as the Red Planet.', ur: 'سرخ سیارے کے نام سے مشہور ہے۔' },
    imageUrl: 'https://images-assets.nasa.gov/image/PIA22974/PIA22974~small.jpg',
    imageCredit: 'NASA/JPL-Caltech/MSSS'
  },
  {
    id: 'jupiter',
    name: { en: 'Jupiter', ur: 'مشتری' },
    diameter: '142,984 km',
    avgDistance: '778.3 million km',
    orbitalPeriod: 'about 11.86 Earth years',
    color: '#c88b3a',
    gradient: 'radial-gradient(ellipse at 40% 40%, #f0d8a8, #c88b3a 25%, #a06828 40%, #d4a860 50%, #8b5e20 65%, #c88b3a 80%, #6b4010)',
    size: 50,
    orbitRadius: 198,
    speed: 240,
    fact: { en: 'The largest planet in the Solar System.', ur: 'سولر سسٹم کا سب سے بڑا سیارہ۔' },
    imageUrl: 'https://images-assets.nasa.gov/image/PIA21774/PIA21774~small.jpg',
    imageCredit: 'NASA/JPL-Caltech/SwRI/MSSS/Gerald Eichstädt'
  },
  {
    id: 'saturn',
    name: { en: 'Saturn', ur: 'زحل' },
    diameter: '120,536 km',
    avgDistance: '1,429 million km',
    orbitalPeriod: 'about 29.45 Earth years',
    color: '#e8d088',
    gradient: 'radial-gradient(ellipse at 40% 40%, #f5ecc8, #e8d088 30%, #c4a858 55%, #a08838 75%, #786020)',
    size: 44,
    orbitRadius: 244,
    speed: 590,
    fact: { en: 'Famous for its bright ring system.', ur: 'اپنے روشن حلقوں کے نظام کی وجہ سے مشہور ہے۔' },
    imageUrl: 'https://images-assets.nasa.gov/image/PIA20029/PIA20029~small.jpg',
    imageCredit: 'NASA/JPL-Caltech/Space Science Institute'
  },
  {
    id: 'uranus',
    name: { en: 'Uranus', ur: 'یورینس' },
    diameter: '51,118 km',
    avgDistance: '2,871 million km',
    orbitalPeriod: 'about 84 Earth years',
    color: '#7ec8e3',
    gradient: 'radial-gradient(circle at 35% 35%, #b8e8f0, #7ec8e3 40%, #4a98b8 70%, #2a6888)',
    size: 36,
    orbitRadius: 284,
    speed: 1680,
    fact: { en: 'Rotates with an extreme tilt.', ur: 'بہت زیادہ جھکاؤ کے ساتھ گردش کرتا ہے۔' },
    imageUrl: 'https://images-assets.nasa.gov/image/PIA01464/PIA01464~small.jpg',
    imageCredit: 'NASA/JPL-Caltech/Voyager 2'
  },
  {
    id: 'neptune',
    name: { en: 'Neptune', ur: 'نیپچون' },
    diameter: '49,528 km',
    avgDistance: '4,495 million km',
    orbitalPeriod: 'about 164.8 Earth years',
    color: '#3355cc',
    gradient: 'radial-gradient(circle at 35% 35%, #6688ee, #3355cc 40%, #2244aa 65%, #112266)',
    size: 34,
    orbitRadius: 322,
    speed: 3300,
    fact: { en: 'The farthest major planet from the Sun.', ur: 'سورج سے سب سے دور بڑا سیارہ۔' },
    imageUrl: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~small.jpg',
    imageCredit: 'NASA/JPL-Caltech/Voyager 2'
  }
];

// Sun data for display
export const sunData = {
  id: 'sun',
  name: { en: 'Sun', ur: 'سورج' },
  imageUrl: 'https://images-assets.nasa.gov/image/PIA17463/PIA17463~small.jpg',
  imageCredit: 'NASA/SDO/AIA',
  gradient: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00 60%, #ff4500 85%, #cc2200)'
};
