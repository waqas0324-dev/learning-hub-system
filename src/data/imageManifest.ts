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
    fullDiskImageUrl: 'https://science.nasa.gov/wp-content/uploads/2023/06/sun-latest.jpg',
    thumbnailUrl: 'https://science.nasa.gov/wp-content/uploads/2023/06/sun-latest.jpg?w=150',
    altText: { en: 'The Sun - our nearest star captured by SDO', ur: 'سورج — ہمارا قریب ترین ستارہ ایس ڈی او سے لی گئی تصویر' },
    caption: { en: 'The Sun as captured by NASA\'s Solar Dynamics Observatory showing solar activity.', ur: 'ناسا کے سولر ڈائنامکس آبزرویٹری سے لی گئی سورج کی تصویر جو شمسی سرگرمی دکھاتی ہے۔' },
    credit: 'NASA/SDO',
    sourceName: 'NASA Science',
    sourceUrl: 'https://science.nasa.gov/sun/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #fff7a0, #ffcc00 30%, #ff8c00 60%, #ff4500 85%, #cc2200)'
  },
  mercury: {
    id: 'mercury',
    fullDiskImageUrl: 'https://solarsystem.nasa.gov/system/resources/detail/658/PIA15190_702x702.jpg',
    thumbnailUrl: 'https://solarsystem.nasa.gov/system/resources/detail/658/PIA15190_250x250.jpg',
    altText: { en: 'Mercury - full globe view from MESSENGER mission', ur: 'عطارد — میسنجر مشن سے مکمل کرہ نما منظر' },
    caption: { en: 'Mercury as captured by NASA MESSENGER spacecraft showing detailed cratered surface.', ur: 'NASA میسنجر خلائی جہاز سے لی گئی عطارد کی تفصیلی تصویر جس میں گڑھوں والی سطح نظر آ رہی ہے۔' },
    credit: 'NASA/Johns Hopkins University APL/Carnegie Institution of Washington',
    sourceName: 'NASA Solar System Exploration',
    sourceUrl: 'https://solarsystem.nasa.gov/planets/mercury/overview/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #c8beb0, #8c7e6d 40%, #5a4e42 70%, #3d352c)'
  },
  venus: {
    id: 'venus',
    fullDiskImageUrl: 'https://solarsystem.nasa.gov/system/resources/detail/659/PIA00280_702x702.jpg',
    thumbnailUrl: 'https://solarsystem.nasa.gov/system/resources/detail/659/PIA00280_250x250.jpg',
    altText: { en: 'Venus - global view from Magellan radar mapping', ur: 'زہرہ — میجلن ریڈار میپنگ سے عالمی منظر' },
    caption: { en: 'Venus as mapped by NASA Magellan mission showing surface features through clouds.', ur: 'NASA میجلن مشن سے بنایا گیا زہرہ کا نقشہ جو بادلوں کے ذریعے سطحی خصوصیات دکھاتا ہے۔' },
    credit: 'NASA/JPL',
    sourceName: 'NASA Solar System Exploration',
    sourceUrl: 'https://solarsystem.nasa.gov/planets/venus/overview/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #f5e6a8, #e8c468 35%, #c4943a 65%, #8b6914)'
  },
  earth: {
    id: 'earth',
    fullDiskImageUrl: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57723/globe_west_2048.jpg',
    thumbnailUrl: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57723/globe_west_2048_thumb.jpg',
    altText: { en: 'Earth - The Blue Marble as seen from space', ur: 'زمین — نیلا سنگمرمر جیسا کہ خلا سے نظر آتا ہے' },
    caption: { en: 'Earth as captured by NASA showing the Blue Marble view with continents and oceans visible.', ur: 'NASA سے لی گئی زمین کی تصویر جو نیلا سنگمرمر دکھاتی ہے جس میں براعظم اور سمندر نظر آ رہے ہیں۔' },
    credit: 'NASA Earth Observatory/Robert Simmon',
    sourceName: 'NASA Earth Observatory',
    sourceUrl: 'https://earthobservatory.nasa.gov/images/57723/december-2011',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #7ec8e3, #4a90d9 30%, #2d6b3f 50%, #4a90d9 70%, #1a3a5c)'
  },
  mars: {
    id: 'mars',
    fullDiskImageUrl: 'https://solarsystem.nasa.gov/system/resources/detail/660/PIA01482_702x702.jpg',
    thumbnailUrl: 'https://solarsystem.nasa.gov/system/resources/detail/660/PIA01482_250x250.jpg',
    altText: { en: 'Mars - global view from Viking Orbiter', ur: 'مریخ — وائکنگ آربیٹر سے عالمی منظر' },
    caption: { en: 'Mars as captured by NASA Viking Orbiter showing the red planet with polar ice caps.', ur: 'NASA وائکنگ آربیٹر سے لی گئی مریخ کی تصویر جو سرخ سیارہ قطبی برف کی چوٹیوں کے ساتھ دکھاتی ہے۔' },
    credit: 'NASA/JPL-Caltech',
    sourceName: 'NASA Solar System Exploration',
    sourceUrl: 'https://solarsystem.nasa.gov/planets/mars/overview/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #e8845a, #c1440e 40%, #8b2500 70%, #5c1800)'
  },
  jupiter: {
    id: 'jupiter',
    fullDiskImageUrl: 'https://solarsystem.nasa.gov/system/resources/detail/661/PIA21774_702x702.jpg',
    thumbnailUrl: 'https://solarsystem.nasa.gov/system/resources/detail/661/PIA21774_250x250.jpg',
    altText: { en: 'Jupiter - the largest planet from Juno mission', ur: 'مشتری — جونو مشن سے سب سے بڑا سیارہ' },
    caption: { en: 'Jupiter as captured by NASA Juno spacecraft showing detailed cloud bands and Great Red Spot.', ur: 'NASA جونو خلائی جہاز سے لی گئی مشتری کی تصویر جو تفصیلی بادل کی پٹیاں اور عظیم سرخ دھبہ دکھاتی ہے۔' },
    credit: 'NASA/JPL-Caltech/SwRI/MSSS/Gerald Eichstädt/Seán Doran',
    sourceName: 'NASA Solar System Exploration',
    sourceUrl: 'https://solarsystem.nasa.gov/planets/jupiter/overview/',
    fallbackGradient: 'radial-gradient(ellipse at 40% 40%, #f0d8a8, #c88b3a 25%, #a06828 40%, #d4a860 50%, #8b5e20 65%, #c88b3a 80%, #6b4010)'
  },
  saturn: {
    id: 'saturn',
    fullDiskImageUrl: 'https://solarsystem.nasa.gov/system/resources/detail/662/PIA20029_702x702.jpg',
    thumbnailUrl: 'https://solarsystem.nasa.gov/system/resources/detail/662/PIA20029_250x250.jpg',
    altText: { en: 'Saturn and its magnificent ring system from Cassini', ur: 'زحل اور اس کا شاندار حلقوں کا نظام کاسینی سے' },
    caption: { en: 'Saturn and its rings as captured by NASA Cassini spacecraft showing detailed ring structure.', ur: 'NASA کاسینی خلائی جہاز سے لی گئی زحل کی تصویر جو تفصیلی حلقوں کی ساخت دکھاتی ہے۔' },
    credit: 'NASA/JPL-Caltech/Space Science Institute',
    sourceName: 'NASA Solar System Exploration',
    sourceUrl: 'https://solarsystem.nasa.gov/planets/saturn/overview/',
    fallbackGradient: 'radial-gradient(ellipse at 40% 40%, #f5ecc8, #e8d088 30%, #c4a858 55%, #a08838 75%, #786020)'
  },
  uranus: {
    id: 'uranus',
    fullDiskImageUrl: 'https://solarsystem.nasa.gov/system/resources/detail/663/PIA01464_702x702.jpg',
    thumbnailUrl: 'https://solarsystem.nasa.gov/system/resources/detail/663/PIA01464_250x250.jpg',
    altText: { en: 'Uranus - the tilted ice giant from Voyager 2', ur: 'یورینس — وائجر 2 سے جھکا ہوا برفانی دیو' },
    caption: { en: 'Uranus as captured by NASA Voyager 2 spacecraft showing its pale blue-green appearance.', ur: 'NASA وائجر 2 خلائی جہاز سے لی گئی یورینس کی تصویر جو اس کا ہلکا نیلا سبز رنگ دکھاتی ہے۔' },
    credit: 'NASA/JPL-Caltech/Voyager 2',
    sourceName: 'NASA Solar System Exploration',
    sourceUrl: 'https://solarsystem.nasa.gov/planets/uranus/overview/',
    fallbackGradient: 'radial-gradient(circle at 35% 35%, #b8e8f0, #7ec8e3 40%, #4a98b8 70%, #2a6888)'
  },
  neptune: {
    id: 'neptune',
    fullDiskImageUrl: 'https://solarsystem.nasa.gov/system/resources/detail/664/PIA01492_702x702.jpg',
    thumbnailUrl: 'https://solarsystem.nasa.gov/system/resources/detail/664/PIA01492_250x250.jpg',
    altText: { en: 'Neptune - the deep blue ice giant from Voyager 2', ur: 'نیپچون — وائجر 2 سے گہرا نیلا برفانی دیو' },
    caption: { en: 'Neptune as captured by NASA Voyager 2 spacecraft showing its deep blue color.', ur: 'NASA وائجر 2 خلائی جہاز سے لی گئی نیپچون کی تصویر جو اس کا گہرا نیلا رنگ دکھاتی ہے۔' },
    credit: 'NASA/JPL-Caltech/Voyager 2',
    sourceName: 'NASA Solar System Exploration',
    sourceUrl: 'https://solarsystem.nasa.gov/planets/neptune/overview/',
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
