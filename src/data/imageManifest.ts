// NASA Official Planet Image Manifest
// All images sourced from NASA public domain image libraries (via Wikimedia Commons)
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
    fullDiskImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Sun_from_Space.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sun_from_Space.jpg/600px-Sun_from_Space.jpg',
    altText: { en: 'The Sun - our nearest star', ur: 'سورج — ہمارا قریب ترین ستارہ' },
    caption: { en: 'The Sun as seen from space by NASA.', ur: 'خلا سے نظر آنے والا سورج — ناسا کی تصویر۔' },
    credit: 'NASA',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/sun/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00 60%, #ff4500 85%, #cc2200)'
  },
  mercury: {
    id: 'mercury',
    fullDiskImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/600px-Mercury_in_true_color.jpg',
    altText: { en: 'Mercury - MESSENGER mission image', ur: 'عطارد — میسنجر مشن کی تصویر' },
    caption: { en: 'Mercury in true color as seen by NASA MESSENGER spacecraft.', ur: 'NASA میسنجر خلائی جہاز سے نظر آنے والا عطارد اصلی رنگ میں۔' },
    credit: 'NASA/Johns Hopkins University APL/Arizona State University',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/mercury/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #c8beb0, #8c7e6d 40%, #5a4e42 70%, #3d352c)'
  },
  venus: {
    id: 'venus',
    fullDiskImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Venus_from_Mariner_10.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Venus_from_Mariner_10.jpg/600px-Venus_from_Mariner_10.jpg',
    altText: { en: 'Venus - Mariner 10 image', ur: 'زہرہ — میرینر 10 کی تصویر' },
    caption: { en: 'Venus as seen by NASA Mariner 10 spacecraft.', ur: 'NASA میرینر 10 خلائی جہاز سے نظر آنے والی زہرہ۔' },
    credit: 'NASA/JPL',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/venus/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #f5e6a8, #e8c468 35%, #c4943a 65%, #8b6914)'
  },
  earth: {
    id: 'earth',
    fullDiskImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/The_Blue_Marble_%28reprocessed%29.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28reprocessed%29.jpg/600px-The_Blue_Marble_%28reprocessed%29.jpg',
    altText: { en: 'Earth - The Blue Marble', ur: 'زمین — نیلا سنگمرمر' },
    caption: { en: 'Earth as seen from space - The Blue Marble by NASA.', ur: 'خلا سے نظر آنے والی زمین — نیلا سنگمرمر، ناسا کی تصویر۔' },
    credit: 'NASA',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/earth/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #4a90d9 70%, #1a3a5c)'
  },
  mars: {
    id: 'mars',
    fullDiskImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Mars_Hubble.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Mars_Hubble.jpg/600px-Mars_Hubble.jpg',
    altText: { en: 'Mars - Hubble Space Telescope image', ur: 'مریخ — ہبل خلائی دوربین کی تصویر' },
    caption: { en: 'Mars as seen by Hubble Space Telescope.', ur: 'ہبل خلائی دوربین سے نظر آنے والا مریخ۔' },
    credit: 'NASA/ESA/Hubble Heritage Team',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/mars/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #e8845a, #c1440e 40%, #8b2500 70%, #5c1800)'
  },
  jupiter: {
    id: 'jupiter',
    fullDiskImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/600px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
    altText: { en: 'Jupiter - Hubble Space Telescope image', ur: 'مشتری — ہبل خلائی دوربین کی تصویر' },
    caption: { en: 'Jupiter as seen by Hubble Space Telescope with Great Red Spot.', ur: 'ہبل خلائی دوربین سے نظر آنے والا مشتری عظیم سرخ دھبے کے ساتھ۔' },
    credit: 'NASA/ESA/Hubble Space Telescope',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/jupiter/',
    fallbackGradient: 'radial-gradient(ellipse at 40% 40%, #f0d8a8, #c88b3a 25%, #a06828 40%, #d4a860 50%, #8b5e20 65%, #c88b3a 80%, #6b4010)'
  },
  saturn: {
    id: 'saturn',
    fullDiskImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/600px-Saturn_during_Equinox.jpg',
    altText: { en: 'Saturn - Cassini mission image', ur: 'زحل — کاسینی مشن کی تصویر' },
    caption: { en: 'Saturn and its rings during equinox as seen by NASA Cassini.', ur: 'NASA کاسینی سے نظر آنے والا زحل اور اس کے حلقے اعتدال کے وقت۔' },
    credit: 'NASA/JPL-Caltech/Space Science Institute',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/saturn/',
    fallbackGradient: 'radial-gradient(ellipse at 40% 40%, #f5ecc8, #e8d088 30%, #c4a858 55%, #a08838 75%, #786020)'
  },
  uranus: {
    id: 'uranus',
    fullDiskImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Uranus_as_seen_by_Voyager_2.png',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Uranus_as_seen_by_Voyager_2.png/600px-Uranus_as_seen_by_Voyager_2.png',
    altText: { en: 'Uranus - Voyager 2 image', ur: 'یورینس — وائجر 2 کی تصویر' },
    caption: { en: 'Uranus as seen by NASA Voyager 2 spacecraft.', ur: 'NASA وائجر 2 خلائی جہاز سے نظر آنے والا یورینس۔' },
    credit: 'NASA/JPL-Caltech/Voyager 2',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/uranus/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #b8e8f0, #7ec8e3 40%, #4a98b8 70%, #2a6888)'
  },
  neptune: {
    id: 'neptune',
    fullDiskImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980847%29_flatten_clarity.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980847%29_flatten_clarity.jpg/600px-Neptune_-_Voyager_2_%2829347980847%29_flatten_clarity.jpg',
    altText: { en: 'Neptune - Voyager 2 image', ur: 'نیپچون — وائجر 2 کی تصویر' },
    caption: { en: 'Neptune as seen by NASA Voyager 2 spacecraft.', ur: 'NASA وائجر 2 خلائی جہاز سے نظر آنے والا نیپچون۔' },
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
