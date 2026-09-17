// NASA Official Planet Image Manifest
// All images sourced from NASA public domain image libraries
// Stable IDs ensure correct image-to-planet mapping

export interface CelestialImage {
  id: string;
  fullDiskImageUrl: string;
  thumbnailUrl: string;
  altText: { en: string; ur: string };
  caption: { en: string; ur: string };
  credit: string;
  sourceName: string;
  sourceUrl: string;
  fallbackGradient: string;
}

export const celestialImages: Record<string, CelestialImage> = {
  sun: {
    id: 'sun',
    fullDiskImageUrl: 'https://images-assets.nasa.gov/image/PIA17463/PIA17463~medium.jpg',
    thumbnailUrl: 'https://images-assets.nasa.gov/image/PIA17463/PIA17463~thumb.jpg',
    altText: { en: 'The Sun - our nearest star', ur: 'سورج — ہمارا قریب ترین ستارہ' },
    caption: { en: 'The Sun as seen in scientific imagery from SDO.', ur: 'سائنسی تصویر میں نظر آنے والا سورج۔' },
    credit: 'NASA/SDO',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/sun/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00 60%, #ff4500 85%, #cc2200)'
  },
  mercury: {
    id: 'mercury',
    fullDiskImageUrl: 'https://science.nasa.gov/wp-content/uploads/2023/11/mercury-messenger-globe-pia15162.jpg',
    thumbnailUrl: 'https://science.nasa.gov/wp-content/uploads/2023/11/mercury-messenger-globe-pia15162.jpg?w=150',
    altText: { en: 'Mercury - full globe view from MESSENGER', ur: 'عطارد — میسنجر سے مکمل کرہ نما منظر' },
    caption: { en: 'Mercury as seen by NASA MESSENGER spacecraft showing craters and surface features.', ur: 'NASA میسنجر خلائی جہاز سے نظر آنے والا عطارد جس میں گڑھے اور سطحی خصوصیات نظر آ رہی ہیں۔' },
    credit: 'NASA/Johns Hopkins University APL/Carnegie Institution of Washington',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/mercury/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #c8beb0, #8c7e6d 40%, #5a4e42 70%, #3d352c)'
  },
  venus: {
    id: 'venus',
    fullDiskImageUrl: 'https://images-assets.nasa.gov/image/PIA23792/PIA23792~medium.jpg',
    thumbnailUrl: 'https://images-assets.nasa.gov/image/PIA23792/PIA23792~thumb.jpg',
    altText: { en: 'Venus - the hottest planet', ur: 'زہرہ — سب سے گرم سیارہ' },
    caption: { en: 'Venus as seen in scientific imagery.', ur: 'سائنسی تصویر میں نظر آنے والی زہرہ۔' },
    credit: 'NASA/JPL-Caltech',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/venus/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #f5e6a8, #e8c468 35%, #c4943a 65%, #8b6914)'
  },
  earth: {
    id: 'earth',
    fullDiskImageUrl: 'https://images-assets.nasa.gov/image/PIA18033/PIA18033~medium.jpg',
    thumbnailUrl: 'https://images-assets.nasa.gov/image/PIA18033/PIA18033~thumb.jpg',
    altText: { en: 'Earth - our home world', ur: 'زمین — ہماری اپنی دنیا' },
    caption: { en: 'Earth as seen from space — The Blue Marble.', ur: 'خلا سے نظر آنے والی زمین — نیلا سنگمرمر۔' },
    credit: 'NASA/NOAA/ESFC',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/earth/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #4a90d9 70%, #1a3a5c)'
  },
  mars: {
    id: 'mars',
    fullDiskImageUrl: 'https://science.nasa.gov/wp-content/uploads/2024/03/pia04304-mars.jpg',
    thumbnailUrl: 'https://science.nasa.gov/wp-content/uploads/2024/03/pia04304-mars.jpg?w=150',
    altText: { en: 'Mars - full disk view showing Valles Marineris', ur: 'مریخ — مکمل کرہ نما منظر جس میں ویلیز میرینیرس نظر آ رہا ہے' },
    caption: { en: 'Mars as seen from Viking orbiter showing the Valles Marineris canyon system.', ur: 'Viking orbiter سے نظر آنے والا مریخ جس میں ویلیز میرینیرس وادی کا نظام نظر آ رہا ہے۔' },
    credit: 'NASA/JPL-Caltech',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/mars/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #e8845a, #c1440e 40%, #8b2500 70%, #5c1800)'
  },
  jupiter: {
    id: 'jupiter',
    fullDiskImageUrl: 'https://images-assets.nasa.gov/image/PIA21774/PIA21774~medium.jpg',
    thumbnailUrl: 'https://images-assets.nasa.gov/image/PIA21774/PIA21774~thumb.jpg',
    altText: { en: 'Jupiter - the largest planet', ur: 'مشتری — سب سے بڑا سیارہ' },
    caption: { en: 'Jupiter as seen in scientific imagery from Juno.', ur: 'سائنسی تصویر میں نظر آنے والا مشتری۔' },
    credit: 'NASA/JPL-Caltech/SwRI/MSSS/Gerald Eichstädt',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/jupiter/',
    fallbackGradient: 'radial-gradient(ellipse at 40% 40%, #f0d8a8, #c88b3a 25%, #a06828 40%, #d4a860 50%, #8b5e20 65%, #c88b3a 80%, #6b4010)'
  },
  saturn: {
    id: 'saturn',
    fullDiskImageUrl: 'https://images-assets.nasa.gov/image/PIA20029/PIA20029~medium.jpg',
    thumbnailUrl: 'https://images-assets.nasa.gov/image/PIA20029/PIA20029~thumb.jpg',
    altText: { en: 'Saturn and its rings', ur: 'زحل اور اس کے حلقے' },
    caption: { en: 'Saturn and its rings as seen from Cassini.', ur: 'کاسینی سے نظر آنے والا زحل اور اس کے حلقے۔' },
    credit: 'NASA/JPL-Caltech/Space Science Institute',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/saturn/',
    fallbackGradient: 'radial-gradient(ellipse at 40% 40%, #f5ecc8, #e8d088 30%, #c4a858 55%, #a08838 75%, #786020)'
  },
  uranus: {
    id: 'uranus',
    fullDiskImageUrl: 'https://images-assets.nasa.gov/image/PIA01464/PIA01464~medium.jpg',
    thumbnailUrl: 'https://images-assets.nasa.gov/image/PIA01464/PIA01464~thumb.jpg',
    altText: { en: 'Uranus - the tilted ice giant', ur: 'یورینس — جھکا ہوا برفانی دیو' },
    caption: { en: 'Uranus as seen from Voyager 2.', ur: 'وایجئر 2 سے نظر آنے والا یورینس۔' },
    credit: 'NASA/JPL-Caltech/Voyager 2',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/uranus/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #b8e8f0, #7ec8e3 40%, #4a98b8 70%, #2a6888)'
  },
  neptune: {
    id: 'neptune',
    fullDiskImageUrl: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~medium.jpg',
    thumbnailUrl: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~thumb.jpg',
    altText: { en: 'Neptune - the farthest major planet', ur: 'نیپچون — سب سے دور بڑا سیارہ' },
    caption: { en: 'Neptune as seen from Voyager 2.', ur: 'وایجئر 2 سے نظر آنے والا نیپچون۔' },
    credit: 'NASA/JPL-Caltech/Voyager 2',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/neptune/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #6688ee, #3355cc 40%, #2244aa 65%, #112266)'
  }
};

// Helper function to get image by stable ID
export function getCelestialImage(id: string): CelestialImage {
  return celestialImages[id] || celestialImages['earth']; // Safe fallback to Earth, never wrong planet
}

// Helper to get image URL by ID
export function getImageUrl(id: string, size: 'full' | 'thumb' = 'full'): string {
  const img = getCelestialImage(id);
  return size === 'thumb' ? img.thumbnailUrl : img.fullDiskImageUrl;
}
