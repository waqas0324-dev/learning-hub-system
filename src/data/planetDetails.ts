// Complete planet detail data for all 8 planets
// Each planet has stable ID-based content

export interface PlanetDetail {
  id: string;
  type: { en: string; ur: string };
  diameter: string;
  avgDistance: string;
  dayLength: string;
  yearLength: string;
  avgTemp: string;
  gravity: string;
  moons: string;
  rings: { en: string; ur: string };
  coreDescription: { en: string; ur: string };
  detailedDescription: { en: string; ur: string };
  surfaceSection: { en: string; ur: string };
  atmosphereSection: { en: string; ur: string };
  temperatureExplanation: { en: string; ur: string };
  moonsAndRingsDetail: { en: string; ur: string };
  seasonsSection: { en: string; ur: string };
  habitability: { en: string; ur: string };
  missions: { name: string; type: { en: string; ur: string }; year: string }[];
  funFacts: { en: string; ur: string }[];
  quiz: {
    question: { en: string; ur: string };
    options: { en: string; ur: string }[];
    correct: number;
    explanation: { en: string; ur: string };
  }[];
  namedMoons?: string[];
  axisTilt?: string;
}

export const planetDetails: Record<string, PlanetDetail> = {
  mercury: {
    id: 'mercury',
    type: { en: 'Rocky terrestrial planet', ur: 'پتھریلا زمینی سیارہ' },
    diameter: '4,879 km',
    avgDistance: '57.9 million km',
    dayLength: 'About 58.6 Earth days',
    yearLength: '88 Earth days',
    avgTemp: 'About 167°C',
    gravity: '0.38 Earth gravity',
    moons: '0',
    rings: { en: 'No', ur: 'نہیں' },
    coreDescription: {
      en: 'Mercury is the closest planet to the Sun and the smallest of the eight planets. It is a rocky world covered with impact craters. Mercury has almost no atmosphere to hold heat, so its surface experiences large temperature changes between day and night.',
      ur: 'عطارد سورج کے سب سے قریب اور آٹھ سیاروں میں سب سے چھوٹا سیارہ ہے۔ یہ ایک پتھریلی دنیا ہے جس کی سطح پر ٹکراؤ سے بنے ہوئے بہت سے گڑھے ہیں۔ عطارد کی فضا تقریباً نہ ہونے کے برابر ہے، اس لیے اس کی سطح پر دن اور رات کے درجہ حرارت میں بہت بڑا فرق آتا ہے۔'
    },
    detailedDescription: {
      en: 'Mercury is the first planet from the Sun. It is a small rocky world, only slightly larger than Earth\'s Moon. Its surface is covered with thousands of craters from asteroid impacts over billions of years. Because Mercury has almost no atmosphere, it cannot trap heat, leading to extreme temperature differences between its sunlit side and dark side.',
      ur: 'عطارد سورج سے پہلا سیارہ ہے۔ یہ ایک چھوٹی پتھریلی دنیا ہے جو زمین کے چاند سے صرف تھوڑی سی بڑی ہے۔ اس کی سطح اربوں سالوں میں سیارچوں کے ٹکراؤ سے بنے ہزاروں گڑھوں سے ڈھکی ہوئی ہے۔ چونکہ عطارد کی فضا تقریباً نہیں ہے، اس لیے یہ حرارت محفوظ نہیں رکھ سکتی، جس کی وجہ سے اس کے روشن اور تاریک حصے کے درجہ حرارت میں بہت بڑا فرق آتا ہے۔'
    },
    surfaceSection: {
      en: 'Mercury\'s surface is heavily cratered, similar to Earth\'s Moon. It has large impact basins, smooth plains, and tall cliffs called scarps formed as the planet cooled and shrank. The surface is covered with a layer of fine dust called regolith.',
      ur: 'عطارد کی سطح بہت زیادہ گڑھوں والی ہے، جو زمین کے چاند سے ملتی جلتی ہے۔ اس پر بڑے ٹکراؤ کے حوض، ہموار میدان اور دراڑیں ہیں جو سیارے کے ٹھنڈا ہو کر سکڑنے سے بنیں۔ سطح ریگولتھ کہلانے والی باریک گرد کی تہہ سے ڈھکی ہوئی ہے۔'
    },
    atmosphereSection: {
      en: 'Mercury has an extremely thin exosphere, not a true atmosphere. It contains trace amounts of oxygen, sodium, hydrogen, helium and potassium. This thin layer cannot retain heat or protect the surface from solar radiation.',
      ur: 'عطارد کی انتہائی پتلی بیرونی تہہ ہے، اصل فضا نہیں۔ اس میں آکسیجن، سوڈیم، ہائیڈروجن، ہیلیم اور پوٹاشیم کی معمولی مقدار موجود ہے۔ یہ پتلی تہہ حرارت محفوظ نہیں رکھ سکتی اور نہ ہی سطح کو شمسی شعاعوں سے بچا سکتی ہے۔'
    },
    temperatureExplanation: {
      en: 'The average temperature is about 167°C, but it ranges from about 430°C during the day to about -180°C at night. Without an atmosphere to trap heat, the sunlit side becomes extremely hot while the dark side becomes extremely cold.',
      ur: 'اوسط درجہ حرارت تقریباً 167°C ہے، لیکن یہ دن میں تقریباً 430°C سے رات میں تقریباً -180°C تک بدل سکتا ہے۔ حرارت محفوظ رکھنے والی فضا نہ ہونے کی وجہ سے روشن حصہ انتہائی گرم اور تاریک حصہ انتہائی سرد ہو جاتا ہے۔'
    },
    moonsAndRingsDetail: {
      en: 'Mercury has no moons and no rings. Its proximity to the Sun and weak gravity make it difficult to capture or hold onto any natural satellites.',
      ur: 'عطارد کا کوئی چاند نہیں اور نہ ہی کوئی حلقے ہیں۔ سورج کے قریب ہونے اور کمزور کششِ ثقل کی وجہ سے اس کے لیے قدرتی سیارہ نما پکڑنا یا اپنے پاس رکھنا مشکل ہے۔'
    },
    seasonsSection: {
      en: 'Mercury has almost no axial tilt (about 0.03 degrees), so it does not experience seasons like Earth. However, some craters near its poles are permanently shadowed and may contain water ice.',
      ur: 'عطارد کا محوری جھکاؤ تقریباً نہیں ہے (تقریباً 0.03 ڈگری)، اس لیے زمین کی طرح اس پر موسم نہیں بدلتے۔ البتہ اس کے قطبین کے قریب کچھ گڑھے ہمیشہ سائے میں رہتے ہیں اور ان میں برف ہو سکتی ہے۔'
    },
    habitability: {
      en: 'Humans cannot live on Mercury. The extreme temperatures, lack of atmosphere, and intense solar radiation make it impossible for life without advanced protection. A future protected research habitat is a topic of study, but it is not a place where people can currently live naturally.',
      ur: 'انسان عطارد پر نہیں رہ سکتے۔ انتہائی درجہ حرارت، فضا کی عدم موجودگی اور شدید شمسی شعاعیں جدید حفاظت کے بغیر زندگی کو ناممکن بناتی ہیں۔ کچھ دنیاؤں پر مستقبل کی محفوظ تحقیقی رہائش گاہ کا مطالعہ کیا جاتا ہے، لیکن انسان وہاں اس وقت قدرتی طور پر نہیں رہ سکتے۔'
    },
    missions: [
      { name: 'Mariner 10', type: { en: 'Flyby', ur: 'پرواز' }, year: '1974-1975' },
      { name: 'MESSENGER', type: { en: 'Orbiter', ur: 'مدار گرد' }, year: '2011-2015' },
      { name: 'BepiColombo', type: { en: 'Orbiter (ESA/JAXA)', ur: 'مدار گرد (ESA/JAXA)' }, year: '2025-present' }
    ],
    funFacts: [
      { en: 'Mercury is the smallest planet in the Solar System.', ur: 'عطارد نظامِ شمسی کا سب سے چھوٹا سیارہ ہے۔' },
      { en: 'It is the closest planet to the Sun.', ur: 'یہ سورج کے سب سے قریب سیارہ ہے۔' },
      { en: 'A year on Mercury is only 88 Earth days.', ur: 'عطارد پر ایک سال صرف 88 زمینی دن ہے۔' },
      { en: 'Mercury has no moons or rings.', ur: 'عطارد کا کوئی چاند یا حلقے نہیں ہیں۔' },
      { en: 'It has the most eccentric orbit of all planets.', ur: 'اس کا مدار تمام سیاروں میں سب سے زیادہ بیضوی ہے۔' },
      { en: 'Mercury is only slightly larger than Earth\'s Moon.', ur: 'عطارد زمین کے چاند سے صرف تھوڑا سا بڑا ہے۔' },
      { en: 'Its surface temperature can reach 430°C during the day.', ur: 'اس کی سطح کا درجہ حرارت دن میں 430°C تک پہنچ سکتا ہے۔' },
      { en: 'Mercury has ice in permanently shadowed polar craters.', ur: 'عطارد کے مستقل سائے والے قطبی گڑھوں میں برف موجود ہے۔' },
      { en: 'It has a large iron core making up about 85% of its radius.', ur: 'اس کا لوہے کا بڑا مرکز ہے جو اس کے رداس کا تقریباً 85% ہے۔' },
      { en: 'Mercury has tall cliffs called scarps formed by cooling.', ur: 'عطارد پر ٹھنڈا ہونے سے بنی اونچی دراڑیں ہیں جنہیں scarps کہتے ہیں۔' }
    ],
    quiz: [
      { question: { en: 'Which planet is closest to the Sun?', ur: 'سورج کے سب سے قریب کون سا سیارہ ہے؟' }, options: [{ en: 'Venus', ur: 'زہرہ' }, { en: 'Mercury', ur: 'عطارد' }, { en: 'Earth', ur: 'زمین' }, { en: 'Mars', ur: 'مریخ' }], correct: 1, explanation: { en: 'Mercury is the closest planet to the Sun.', ur: 'عطارد سورج کے سب سے قریب سیارہ ہے۔' } },
      { question: { en: 'What type of planet is Mercury?', ur: 'عطارد کس قسم کا سیارہ ہے؟' }, options: [{ en: 'Gas giant', ur: 'گیس دیو' }, { en: 'Ice giant', ur: 'برفانی دیو' }, { en: 'Rocky terrestrial', ur: 'پتھریلا زمینی' }, { en: 'Dwarf planet', ur: 'بونا سیارہ' }], correct: 2, explanation: { en: 'Mercury is a rocky terrestrial planet.', ur: 'عطارد ایک پتھریلا زمینی سیارہ ہے۔' } },
      { question: { en: 'How many moons does Mercury have?', ur: 'عطارد کے کتنے چاند ہیں؟' }, options: [{ en: '0', ur: '۰' }, { en: '1', ur: '۱' }, { en: '2', ur: '۲' }, { en: '5', ur: '۵' }], correct: 0, explanation: { en: 'Mercury has no moons.', ur: 'عطارد کا کوئی چاند نہیں ہے۔' } },
      { question: { en: 'What is Mercury\'s diameter?', ur: 'عطارد کا قطر کیا ہے؟' }, options: [{ en: '4,879 km', ur: '۴،۸۷۹ کلومیٹر' }, { en: '12,104 km', ur: '۱۲،۱۰۴ کلومیٹر' }, { en: '6,792 km', ur: '۶،۷۹۲ کلومیٹر' }, { en: '12,756 km', ur: '۱۲،۷۵۶ کلومیٹر' }], correct: 0, explanation: { en: 'Mercury\'s diameter is 4,879 km.', ur: 'عطارد کا قطر ۴،۸۷۹ کلومیٹر ہے۔' } },
      { question: { en: 'How long is a year on Mercury?', ur: 'عطارد پر ایک سال کتنا لمبا ہے؟' }, options: [{ en: '88 Earth days', ur: '۸۸ زمینی دن' }, { en: '225 Earth days', ur: '۲۲۵ زمینی دن' }, { en: '365 days', ur: '۳۶۵ دن' }, { en: '687 Earth days', ur: '۶۸۷ زمینی دن' }], correct: 0, explanation: { en: 'A year on Mercury is 88 Earth days.', ur: 'عطارد پر ایک سال ۸۸ زمینی دن ہے۔' } },
      { question: { en: 'Does Mercury have rings?', ur: 'کیا عطارد کے حلقے ہیں؟' }, options: [{ en: 'Yes, bright rings', ur: 'ہاں، روشن حلقے' }, { en: 'Yes, faint rings', ur: 'ہاں، مدھم حلقے' }, { en: 'No rings', ur: 'کوئی حلقے نہیں' }, { en: 'Only during eclipse', ur: 'صرف گرہن کے دوران' }], correct: 2, explanation: { en: 'Mercury has no rings.', ur: 'عطارد کے کوئی حلقے نہیں ہیں۔' } },
      { question: { en: 'What is the average temperature on Mercury?', ur: 'عطارد کا اوسط درجہ حرارت کیا ہے؟' }, options: [{ en: 'About 167°C', ur: 'تقریباً ۱۶۷°C' }, { en: 'About 15°C', ur: 'تقریباً ۱۵°C' }, { en: 'About -65°C', ur: 'تقریباً منفی ۶۵°C' }, { en: 'About -195°C', ur: 'تقریباً منفی ۱۹۵°C' }], correct: 0, explanation: { en: 'Average temperature on Mercury is about 167°C.', ur: 'عطارد کا اوسط درجہ حرارت تقریباً ۱۶۷°C ہے۔' } },
      { question: { en: 'Which spacecraft orbited Mercury?', ur: 'کس خلائی جہاز نے عطارد کا مدار لگایا؟' }, options: [{ en: 'Voyager', ur: 'وایجئر' }, { en: 'MESSENGER', ur: 'میسنجر' }, { en: 'Cassini', ur: 'کاسینی' }, { en: 'Galileo', ur: 'گلیلیو' }], correct: 1, explanation: { en: 'MESSENGER orbited Mercury from 2011 to 2015.', ur: 'میسنجر نے ۲۰۱۱ سے ۲۰۱۵ تک عطارد کا مدار لگایا۔' } },
      { question: { en: 'Mercury is similar in size to:', ur: 'عطارد کا سائز کس سے ملتا ہے:' }, options: [{ en: 'Jupiter', ur: 'مشتری' }, { en: 'Earth\'s Moon', ur: 'زمین کے چاند' }, { en: 'Saturn', ur: 'زحل' }, { en: 'The Sun', ur: 'سورج' }], correct: 1, explanation: { en: 'Mercury is only slightly larger than Earth\'s Moon.', ur: 'عطارد زمین کے چاند سے صرف تھوڑا سا بڑا ہے۔' } },
      { question: { en: 'What covers Mercury\'s surface?', ur: 'عطارد کی سطح کیا ڈھکی ہے؟' }, options: [{ en: 'Oceans', ur: 'سمندر' }, { en: 'Thick clouds', ur: 'گھنے بادل' }, { en: 'Impact craters', ur: 'ٹکراؤ کے گڑھے' }, { en: 'Ice sheets', ur: 'برف کی چادریں' }], correct: 2, explanation: { en: 'Mercury\'s surface is covered with impact craters.', ur: 'عطارد کی سطح ٹکراؤ کے گڑھوں سے ڈھکی ہوئی ہے۔' } },
      { question: { en: 'What is Mercury\'s relative gravity?', ur: 'عطارد کی نسبتی کششِ ثقل کیا ہے؟' }, options: [{ en: '0.38 Earth gravity', ur: 'زمین کا ۰.۳۸ گنا' }, { en: '1.00 Earth gravity', ur: 'زمین کا ۱.۰۰ گنا' }, { en: '2.53 Earth gravity', ur: 'زمین کا ۲.۵۳ گنا' }, { en: '0.91 Earth gravity', ur: 'زمین کا ۰.۹۱ گنا' }], correct: 0, explanation: { en: 'Mercury\'s gravity is 0.38 of Earth\'s.', ur: 'عطارد کی کششِ ثقل زمین کا ۰.۳۸ گنا ہے۔' } },
      { question: { en: 'Why does Mercury have extreme temperature changes?', ur: 'عطارد پر درجہ حرارت میں شدید تبدیلی کیوں ہے؟' }, options: [{ en: 'It is very far from the Sun', ur: 'یہ سورج سے بہت دور ہے' }, { en: 'Almost no atmosphere to hold heat', ur: 'حرارت روکنے کے لیے فضا تقریباً نہیں' }, { en: 'It has many volcanoes', ur: 'اس پر بہت سے آتش فشاں ہیں' }, { en: 'It rotates very slowly', ur: 'یہ بہت آہستہ گھومتا ہے' }], correct: 1, explanation: { en: 'Without an atmosphere, Mercury cannot trap heat.', ur: 'فضا نہ ہونے کی وجہ سے عطارد حرارت محفوظ نہیں رکھ سکتا۔' } },
      { question: { en: 'How long is a day on Mercury?', ur: 'عطارد پر ایک دن کتنا لمبا ہے؟' }, options: [{ en: '24 hours', ur: '۲۴ گھنٹے' }, { en: 'About 58.6 Earth days', ur: 'تقریباً ۵۸.۶ زمینی دن' }, { en: '88 Earth days', ur: '۸۸ زمینی دن' }, { en: '10 hours', ur: '۱۰ گھنٹے' }], correct: 1, explanation: { en: 'A day on Mercury is about 58.6 Earth days.', ur: 'عطارد پر ایک دن تقریباً ۵۸.۶ زمینی دن ہے۔' } },
      { question: { en: 'What is Mercury\'s average distance from the Sun?', ur: 'سورج سے عطارد کا اوسط فاصلہ کیا ہے؟' }, options: [{ en: '57.9 million km', ur: '۵۷.۹ ملین کلومیٹر' }, { en: '149.6 million km', ur: '۱۴۹.۶ ملین کلومیٹر' }, { en: '227.9 million km', ur: '۲۲۷.۹ ملین کلومیٹر' }, { en: '778.3 million km', ur: '۷۷۸.۳ ملین کلومیٹر' }], correct: 0, explanation: { en: 'Mercury is 57.9 million km from the Sun.', ur: 'عطارد سورج سے ۵۷.۹ ملین کلومیٹر دور ہے۔' } },
      { question: { en: 'Can humans live on Mercury?', ur: 'کیا انسان عطارد پر رہ سکتے ہیں؟' }, options: [{ en: 'Yes, easily', ur: 'ہاں، آسانی سے' }, { en: 'Only in summer', ur: 'صرف گرمیوں میں' }, { en: 'No, extreme conditions', ur: 'نہیں، انتہائی حالات' }, { en: 'Only at the poles', ur: 'صرف قطبین پر' }], correct: 2, explanation: { en: 'Extreme temperatures and no atmosphere make it impossible.', ur: 'انتہائی درجہ حرارت اور فضا نہ ہونے کی وجہ سے یہ ناممکن ہے۔' } }
    ],
    axisTilt: '0.03 degrees'
  },

  venus: {
    id: 'venus',
    type: { en: 'Rocky terrestrial planet', ur: 'پتھریلا زمینی سیارہ' },
    diameter: '12,104 km',
    avgDistance: '108.2 million km',
    dayLength: 'About 243 Earth days',
    yearLength: 'About 225 Earth days',
    avgTemp: 'About 464°C',
    gravity: '0.91 Earth gravity',
    moons: '0',
    rings: { en: 'No', ur: 'نہیں' },
    coreDescription: {
      en: 'Venus is the second planet from the Sun. It is similar in size to Earth, but its environment is extremely different. Venus has a very thick atmosphere made mostly of carbon dioxide. This atmosphere traps heat strongly through a greenhouse effect, making Venus the hottest planet in the Solar System.',
      ur: 'زہرہ سورج سے دوسرا سیارہ ہے۔ اس کا سائز زمین سے ملتا جلتا ہے، لیکن اس کا ماحول بہت مختلف اور انتہائی سخت ہے۔ زہرہ کی بہت گھنی فضا زیادہ تر کاربن ڈائی آکسائیڈ پر مشتمل ہے۔ یہ فضا گرین ہاؤس اثر کے ذریعے حرارت کو بہت زیادہ روک لیتی ہے، جس کی وجہ سے زہرہ نظامِ شمسی کا سب سے گرم سیارہ ہے۔'
    },
    detailedDescription: {
      en: 'Venus is often called Earth\'s twin because of its similar size, but conditions on Venus are extremely hostile. Its thick atmosphere creates a powerful greenhouse effect that raises surface temperatures to about 464°C. The atmospheric pressure on Venus is about 92 times that of Earth, similar to being 900 meters underwater on Earth.',
      ur: 'زہرہ کو اکثر زمین کا جڑواں کہا جاتا ہے کیونکہ اس کا سائز ملتا جلتا ہے، لیکن زہرہ کے حالات انتہائی دشمن ہیں۔ اس کی گھنی فضا طاقتور گرین ہاؤس اثر پیدا کرتی ہے جو سطح کے درجہ حرارت کو تقریباً ۴۶۴°C تک بڑھا دیتی ہے۔ زہرہ پر فضائی دباؤ زمین کے مقابلے میں تقریباً ۹۲ گنا ہے، جو زمین پر ۹۰۰ میٹر پانی کے نیچے ہونے جیسا ہے۔'
    },
    surfaceSection: {
      en: 'Venus has a rocky surface with vast plains, highland regions, and thousands of volcanoes. Its surface is hidden beneath thick clouds of sulfuric acid. Radar mapping has revealed mountains, valleys and large impact craters.',
      ur: 'زہرہ کی پتھریلی سطح پر وسیع میدان، اونچے علاقے اور ہزاروں آتش فشاں ہیں۔ اس کی سطح سلفیورک ایسڈ کے گھنے بادلوں کے نیچے چھپی ہوئی ہے۔ ریڈار نقشہ سازی سے پہاڑ، وادیاں اور بڑے ٹکراؤ کے گڑھے سامنے آئے ہیں۔'
    },
    atmosphereSection: {
      en: 'Venus has an extremely thick atmosphere made of about 96.5% carbon dioxide and 3.5% nitrogen. The clouds are made of sulfuric acid droplets. This dense atmosphere creates the strongest greenhouse effect in the Solar System.',
      ur: 'زہرہ کی بہت گھنی فضا ہے جو تقریباً ۹۶.۵% کاربن ڈائی آکسائیڈ اور ۳.۵% نائٹروجن پر مشتمل ہے۔ بادل سلفیورک ایسڈ کے قطروں سے بنے ہیں۔ یہ گھنی فضا نظامِ شمسی میں سب سے مضبوط گرین ہاؤس اثر پیدا کرتی ہے۔'
    },
    temperatureExplanation: {
      en: 'The average temperature is about 464°C, making Venus the hottest planet. The thick carbon dioxide atmosphere traps heat through a powerful greenhouse effect. Unlike Mercury, Venus\'s temperature stays nearly the same day and night and at the equator and poles.',
      ur: 'اوسط درجہ حرارت تقریباً ۴۶۴°C ہے، جس کی وجہ سے زہرہ سب سے گرم سیارہ ہے۔ گھنی کاربن ڈائی آکسائیڈ فضا طاقتور گرین ہاؤس اثر کے ذریعے حرارت کو روک لیتی ہے۔ عطارد کے برعکس، زہرہ کا درجہ حرارت دن رات اور خط استوا اور قطبین پر تقریباً ایک جیسا رہتا ہے۔'
    },
    moonsAndRingsDetail: {
      en: 'Venus has no moons and no rings. Scientists are not certain why Venus has no moon, but it may be related to its unusual slow retrograde rotation.',
      ur: 'زہرہ کا کوئی چاند نہیں اور نہ ہی کوئی حلقے ہیں۔ سائنسدانوں کو یقین نہیں کہ زہرہ کا چاند کیوں نہیں، لیکن یہ اس کی غیر معمولی آہستہ الٹی گردش سے متعلق ہو سکتا ہے۔'
    },
    seasonsSection: {
      en: 'Venus has a very small axial tilt of about 3 degrees, so it does not experience significant seasons. Its thick atmosphere distributes heat evenly around the planet.',
      ur: 'زہرہ کا محوری جھکاؤ تقریباً ۳ ڈگری ہے، اس لیے اس پر نمایاں موسم نہیں بدلتے۔ اس کی گھنی فضا حرارت کو سیارے کے گرد یکساں طور پر تقسیم کرتی ہے۔'
    },
    habitability: {
      en: 'Humans cannot live on Venus. The extreme heat of 464°C, crushing atmospheric pressure 92 times Earth\'s, and toxic sulfuric acid clouds make it impossible for life. A future protected research habitat is a topic of study, but it is not a place where people can currently live naturally.',
      ur: 'انسان زہرہ پر نہیں رہ سکتے۔ ۴۶۴°C کی انتہائی حرارت، زمین سے ۹۲ گنا زیادہ فضائی دباؤ اور زہریلے سلفیورک ایسڈ کے بادل زندگی کو ناممکن بناتے ہیں۔ کچھ دنیاؤں پر مستقبل کی محفوظ تحقیقی رہائش گاہ کا مطالعہ کیا جاتا ہے، لیکن انسان وہاں اس وقت قدرتی طور پر نہیں رہ سکتے۔'
    },
    missions: [
      { name: 'Mariner 2', type: { en: 'Flyby', ur: 'پرواز' }, year: '1962' },
      { name: 'Venera missions', type: { en: 'Orbiter/Lander', ur: 'مدار گرد/لینڈر' }, year: '1961-1984' },
      { name: 'Magellan', type: { en: 'Orbiter', ur: 'مدار گرد' }, year: '1990-1994' },
      { name: 'Akatsuki', type: { en: 'Orbiter (JAXA)', ur: 'مدار گرد (JAXA)' }, year: '2015-present' }
    ],
    funFacts: [
      { en: 'Venus is the hottest planet in the Solar System.', ur: 'زہرہ نظامِ شمسی کا سب سے گرم سیارہ ہے۔' },
      { en: 'It rotates backwards compared to most planets.', ur: 'یہ زیادہ تر سیاروں کے مقابلے میں الٹی سمت گھومتا ہے۔' },
      { en: 'A day on Venus is longer than its year.', ur: 'زہرہ پر ایک دن اس کے سال سے بھی لمبا ہے۔' },
      { en: 'Venus is similar in size to Earth.', ur: 'زہرہ کا سائز زمین سے ملتا جلتا ہے۔' },
      { en: 'Its atmosphere is 96.5% carbon dioxide.', ur: 'اس کی فضا ۹۶.۵% کاربن ڈائی آکسائیڈ ہے۔' },
      { en: 'Venus has no moons.', ur: 'زہرہ کا کوئی چاند نہیں ہے۔' },
      { en: 'Surface pressure is 92 times Earth\'s.', ur: 'سطح کا دباؤ زمین کا ۹۲ گنا ہے۔' },
      { en: 'Venus is the brightest planet in our sky.', ur: 'زہرہ ہمارے آسمان کا سب سے روشن سیارہ ہے۔' },
      { en: 'It rains sulfuric acid in Venus\'s clouds.', ur: 'زہرہ کے بادلوں میں سلفیورک ایسڈ کی بارش ہوتی ہے۔' },
      { en: 'Venus is sometimes called Earth\'s twin.', ur: 'زہرہ کو کبھی کبھی زمین کا جڑواں کہا جاتا ہے۔' }
    ],
    quiz: [
      { question: { en: 'Which planet is the hottest?', ur: 'سب سے گرم سیارہ کون سا ہے؟' }, options: [{ en: 'Mercury', ur: 'عطارد' }, { en: 'Venus', ur: 'زہرہ' }, { en: 'Mars', ur: 'مریخ' }, { en: 'Jupiter', ur: 'مشتری' }], correct: 1, explanation: { en: 'Venus is the hottest planet due to greenhouse effect.', ur: 'گرین ہاؤس اثر کی وجہ سے زہرہ سب سے گرم سیارہ ہے۔' } },
      { question: { en: 'What is Venus\'s main atmospheric gas?', ur: 'زہرہ کی فضا کی بنیادی گیس کیا ہے؟' }, options: [{ en: 'Oxygen', ur: 'آکسیجن' }, { en: 'Nitrogen', ur: 'نائٹروجن' }, { en: 'Carbon dioxide', ur: 'کاربن ڈائی آکسائیڈ' }, { en: 'Hydrogen', ur: 'ہائیڈروجن' }], correct: 2, explanation: { en: 'Venus\'s atmosphere is about 96.5% carbon dioxide.', ur: 'زہرہ کی فضا تقریباً ۹۶.۵% کاربن ڈائی آکسائیڈ ہے۔' } },
      { question: { en: 'How many moons does Venus have?', ur: 'زہرہ کے کتنے چاند ہیں؟' }, options: [{ en: '0', ur: '۰' }, { en: '1', ur: '۱' }, { en: '2', ur: '۲' }, { en: '27', ur: '۲۷' }], correct: 0, explanation: { en: 'Venus has no moons.', ur: 'زہرہ کا کوئی چاند نہیں ہے۔' } },
      { question: { en: 'What is Venus\'s diameter?', ur: 'زہرہ کا قطر کیا ہے؟' }, options: [{ en: '4,879 km', ur: '۴،۸۷۹ کلومیٹر' }, { en: '12,104 km', ur: '۱۲،۱۰۴ کلومیٹر' }, { en: '6,792 km', ur: '۶،۷۹۲ کلومیٹر' }, { en: '142,984 km', ur: '۱۴۲،۹۸۴ کلومیٹر' }], correct: 1, explanation: { en: 'Venus\'s diameter is 12,104 km.', ur: 'زہرہ کا قطر ۱۲،۱۰۴ کلومیٹر ہے۔' } },
      { question: { en: 'What makes Venus so hot?', ur: 'زہرہ اتنا گرم کیوں ہے؟' }, options: [{ en: 'It is closest to the Sun', ur: 'یہ سورج کے سب سے قریب ہے' }, { en: 'Greenhouse effect from thick CO2 atmosphere', ur: 'گھنی CO2 فضا سے گرین ہاؤس اثر' }, { en: 'Volcanic activity only', ur: 'صرف آتش فشانی سرگرمی' }, { en: 'Its large size', ur: 'اس کا بڑا سائز' }], correct: 1, explanation: { en: 'The thick CO2 atmosphere traps heat through greenhouse effect.', ur: 'گھنی CO2 فضا گرین ہاؤس اثر سے حرارت روکتی ہے۔' } },
      { question: { en: 'How long is a year on Venus?', ur: 'زہرہ پر ایک سال کتنا لمبا ہے؟' }, options: [{ en: '88 days', ur: '۸۸ دن' }, { en: '225 Earth days', ur: '۲۲۵ زمینی دن' }, { en: '365 days', ur: '۳۶۵ دن' }, { en: '687 days', ur: '۶۸۷ دن' }], correct: 1, explanation: { en: 'A year on Venus is about 225 Earth days.', ur: 'زہرہ پر ایک سال تقریباً ۲۲۵ زمینی دن ہے۔' } },
      { question: { en: 'What is special about Venus\'s rotation?', ur: 'زہرہ کی گردش میں کیا خاص ہے؟' }, options: [{ en: 'It is the fastest', ur: 'یہ سب سے تیز ہے' }, { en: 'It rotates backwards (retrograde)', ur: 'یہ الٹی سمت گھومتا ہے' }, { en: 'It does not rotate', ur: 'یہ نہیں گھومتا' }, { en: 'It rotates in 10 hours', ur: 'یہ ۱۰ گھنٹے میں گھومتا ہے' }], correct: 1, explanation: { en: 'Venus rotates in retrograde (backwards).', ur: 'زہرہ الٹی سمت (retrograde) میں گھومتا ہے۔' } },
      { question: { en: 'What are Venus\'s clouds made of?', ur: 'زہرہ کے بادل کس سے بنے ہیں؟' }, options: [{ en: 'Water vapor', ur: 'آبی بخارات' }, { en: 'Sulfuric acid', ur: 'سلفیورک ایسڈ' }, { en: 'Methane', ur: 'میتھین' }, { en: 'Oxygen', ur: 'آکسیجن' }], correct: 1, explanation: { en: 'Venus\'s clouds are made of sulfuric acid droplets.', ur: 'زہرہ کے بادل سلفیورک ایسڈ کے قطروں سے بنے ہیں۔' } },
      { question: { en: 'What is Venus\'s average temperature?', ur: 'زہرہ کا اوسط درجہ حرارت کیا ہے؟' }, options: [{ en: 'About 15°C', ur: 'تقریباً ۱۵°C' }, { en: 'About 167°C', ur: 'تقریباً ۱۶۷°C' }, { en: 'About 464°C', ur: 'تقریباً ۴۶۴°C' }, { en: 'About -110°C', ur: 'تقریباً منفی ۱۱۰°C' }], correct: 2, explanation: { en: 'Venus\'s average temperature is about 464°C.', ur: 'زہرہ کا اوسط درجہ حرارت تقریباً ۴۶۴°C ہے۔' } },
      { question: { en: 'Which spacecraft mapped Venus\'s surface?', ur: 'کس خلائی جہاز نے زہرہ کی سطح کا نقشہ بنایا؟' }, options: [{ en: 'Voyager', ur: 'وایجئر' }, { en: 'Magellan', ur: 'میجلن' }, { en: 'Cassini', ur: 'کاسینی' }, { en: 'New Horizons', ur: 'نیو ہورائزنز' }], correct: 1, explanation: { en: 'Magellan mapped Venus using radar from 1990-1994.', ur: 'میجلن نے ۱۹۹۰-۱۹۹۴ میں ریڈار سے زہرہ کا نقشہ بنایا۔' } },
      { question: { en: 'Venus is sometimes called:', ur: 'زہرہ کو کبھی کبھی کہا جاتا ہے:' }, options: [{ en: 'The Red Planet', ur: 'سرخ سیارہ' }, { en: 'Earth\'s twin', ur: 'زمین کا جڑواں' }, { en: 'The Gas Giant', ur: 'گیس دیو' }, { en: 'The Ice Giant', ur: 'برفانی دیو' }], correct: 1, explanation: { en: 'Venus is called Earth\'s twin due to similar size.', ur: 'زہرہ کو ملتے جلتے سائز کی وجہ سے زمین کا جڑواں کہا جاتا ہے۔' } },
      { question: { en: 'Does Venus have rings?', ur: 'کیا زہرہ کے حلقے ہیں؟' }, options: [{ en: 'Yes, bright rings', ur: 'ہاں، روشن حلقے' }, { en: 'Yes, faint rings', ur: 'ہاں، مدھم حلقے' }, { en: 'No rings', ur: 'کوئی حلقے نہیں' }, { en: 'Only during eclipse', ur: 'صرف گرہن کے دوران' }], correct: 2, explanation: { en: 'Venus has no rings.', ur: 'زہرہ کے کوئی حلقے نہیں ہیں۔' } },
      { question: { en: 'What is Venus\'s surface pressure compared to Earth?', ur: 'زمین کے مقابلے میں زہرہ کا سطحی دباؤ کیا ہے؟' }, options: [{ en: 'Half of Earth\'s', ur: 'زمین کا آدھا' }, { en: 'Same as Earth\'s', ur: 'زمین جتنا' }, { en: '92 times Earth\'s', ur: 'زمین کا ۹۲ گنا' }, { en: '1000 times Earth\'s', ur: 'زمین کا ۱۰۰۰ گنا' }], correct: 2, explanation: { en: 'Venus\'s surface pressure is about 92 times Earth\'s.', ur: 'زہرہ کا سطحی دباؤ زمین کا تقریباً ۹۲ گنا ہے۔' } },
      { question: { en: 'How long is a day on Venus?', ur: 'زہرہ پر ایک دن کتنا لمبا ہے؟' }, options: [{ en: '24 hours', ur: '۲۴ گھنٹے' }, { en: 'About 243 Earth days', ur: 'تقریباً ۲۴۳ زمینی دن' }, { en: 'About 10 hours', ur: 'تقریباً ۱۰ گھنٹے' }, { en: 'About 58 days', ur: 'تقریباً ۵۸ دن' }], correct: 1, explanation: { en: 'A day on Venus is about 243 Earth days.', ur: 'زہرہ پر ایک دن تقریباً ۲۴۳ زمینی دن ہے۔' } },
      { question: { en: 'Can humans live on Venus?', ur: 'کیا انسان زہرہ پر رہ سکتے ہیں؟' }, options: [{ en: 'Yes, in some areas', ur: 'ہاں، کچھ علاقوں میں' }, { en: 'Only at the poles', ur: 'صرف قطبین پر' }, { en: 'No, extreme heat and pressure', ur: 'نہیں، انتہائی حرارت اور دباؤ' }, { en: 'Only underground', ur: 'صرف زیر زمین' }], correct: 2, explanation: { en: 'Extreme heat and pressure make it impossible.', ur: 'انتہائی حرارت اور دباؤ کی وجہ سے یہ ناممکن ہے۔' } }
    ],
    axisTilt: '177.4 degrees (retrograde)'
  },

  earth: {
    id: 'earth',
    type: { en: 'Rocky terrestrial planet', ur: 'پتھریلا زمینی سیارہ' },
    diameter: '12,756 km',
    avgDistance: '149.6 million km',
    dayLength: 'About 24 hours',
    yearLength: 'About 365.25 days',
    avgTemp: 'About 15°C',
    gravity: '1.00 Earth gravity',
    moons: '1',
    rings: { en: 'No', ur: 'نہیں' },
    coreDescription: {
      en: 'Earth is the third planet from the Sun and the only world currently known to support life. It has oceans, liquid water, a breathable atmosphere, weather, a magnetic field and one natural Moon. Earth\'s surface is more than 70 percent covered by water.',
      ur: 'زمین سورج سے تیسرا سیارہ ہے اور اب تک معلوم واحد دنیا ہے جہاں زندگی موجود ہے۔ اس پر سمندر، مائع پانی، سانس لینے کے قابل فضا، موسم، مقناطیسی میدان اور ایک قدرتی چاند موجود ہے۔ زمین کی سطح کے 70 فیصد سے زیادہ حصے پر پانی پھیلا ہوا ہے۔'
    },
    detailedDescription: {
      en: 'Earth is unique in the Solar System because it supports life. Its distance from the Sun, atmosphere composition, magnetic field and liquid water create conditions suitable for living organisms. Earth has a dynamic surface with tectonic plates, volcanoes, mountains and oceans.',
      ur: 'زمین نظامِ شمسی میں منفرد ہے کیونکہ یہ زندگی کو سہارا دیتی ہے۔ سورج سے اس کا فاصلہ، فضا کی ساخت، مقناطیسی میدان اور مائع پانی جانداروں کے لیے مناسب حالات پیدا کرتے ہیں۔ زمین کی سطح متحرک ہے جس پر ٹیکٹونک پلیٹیں، آتش فشاں، پہاڑ اور سمندر ہیں۔'
    },
    surfaceSection: {
      en: 'Earth\'s surface includes oceans, continents, mountains, valleys, deserts, forests and ice caps. Tectonic plates slowly move, creating earthquakes, volcanoes and mountain ranges. About 71% of the surface is covered by oceans.',
      ur: 'زمین کی سطح پر سمندر، براعظم، پہاڑ، وادیاں، صحرا، جنگلات اور برف کی ٹوپیاں ہیں۔ ٹیکٹونک پلیٹیں آہستہ آہستہ حرکت کرتی ہیں جو زلزلے، آتش فشاں اور پہاڑی سلسلے بناتی ہیں۔ سطح کا تقریباً ۷۱% حصہ سمندروں سے ڈھکا ہوا ہے۔'
    },
    atmosphereSection: {
      en: 'Earth\'s atmosphere is about 78% nitrogen and 21% oxygen, with small amounts of argon, carbon dioxide and other gases. It protects life from harmful radiation, helps regulate temperature, and enables the water cycle and weather.',
      ur: 'زمین کی فضا تقریباً ۷۸% نائٹروجن اور ۲۱% آکسیجن ہے، ساتھ ہی معمولی مقدار میں آرگان، کاربن ڈائی آکسائیڈ اور دیگر گیسیں ہیں۔ یہ زندگی کو نقصان دہ شعاعوں سے بچاتی ہے، درجہ حرارت کو متوازن رکھتی ہے، اور آبی چکر اور موسم کو ممکن بناتی ہے۔'
    },
    temperatureExplanation: {
      en: 'The average temperature is about 15°C. Earth\'s atmosphere and oceans help distribute heat around the planet. The greenhouse effect keeps Earth warm enough for life, but human activities are increasing greenhouse gases and changing the climate.',
      ur: 'اوسط درجہ حرارت تقریباً ۱۵°C ہے۔ زمین کی فضا اور سمندر حرارت کو سیارے کے گرد تقسیم کرنے میں مدد کرتے ہیں۔ گرین ہاؤس اثر زمین کو زندگی کے لیے مناسب گرم رکھتا ہے، لیکن انسانی سرگرمیاں گرین ہاؤس گیسیں بڑھا رہی ہیں اور آب و ہوا تبدیل کر رہی ہیں۔'
    },
    moonsAndRingsDetail: {
      en: 'Earth has one natural moon, simply called the Moon. It is the fifth largest moon in the Solar System. The Moon stabilizes Earth\'s axial tilt and creates tides. Earth has no rings.',
      ur: 'زمین کا ایک قدرتی چاند ہے جسے سادہ طور پر چاند کہتے ہیں۔ یہ نظامِ شمسی کا پانچواں سب سے بڑا چاند ہے۔ چاند زمین کے محوری جھکاؤ کو مستحکم رکھتا ہے اور جزر و مد پیدا کرتا ہے۔ زمین کے کوئی حلقے نہیں ہیں۔'
    },
    seasonsSection: {
      en: 'Earth has an axial tilt of about 23.5 degrees, which creates four seasons: spring, summer, autumn and winter. As Earth orbits the Sun, different hemispheres receive more direct sunlight at different times of year.',
      ur: 'زمین کا محوری جھکاؤ تقریباً ۲۳.۵ ڈگری ہے جو چار موسم بناتا ہے: بہار، گرمی، خزاں اور سردی۔ جیسے زمین سورج کے گرد گھومتی ہے، سال کے مختلف اوقات میں مختلف نصف کرے زیادہ براہ راست روشنی حاصل کرتے ہیں۔'
    },
    habitability: {
      en: 'Earth is the only planet where humans and other life forms currently live naturally. It has the right temperature, liquid water, breathable air and protection from radiation. No other planet currently supports natural human life.',
      ur: 'زمین واحد سیارہ ہے جہاں انسان اور دیگر جاندار قدرتی طور پر رہتے ہیں۔ اس کا درجہ حرارت، مائع پانی، سانس لینے کے قابل ہوا اور شعاعوں سے حفاظت مناسب ہے۔ کوئی دوسرا سیارہ فی الحال قدرتی انسانی زندگی کو سہارا نہیں دیتا۔'
    },
    missions: [
      { name: 'Apollo missions', type: { en: 'Crewed Moon landing', ur: 'عملے کی چاند پر لینڈنگ' }, year: '1969-1972' },
      { name: 'International Space Station', type: { en: 'Space station', ur: 'خلائی اسٹیشن' }, year: '2000-present' },
      { name: 'Hubble Space Telescope', type: { en: 'Space telescope', ur: 'خلائی دوربین' }, year: '1990-present' },
      { name: 'Many Earth observation satellites', type: { en: 'Satellites', ur: 'مصنوعی سیارے' }, year: '1960s-present' }
    ],
    funFacts: [
      { en: 'Earth is the only known planet with life.', ur: 'زمین زندگی والا معلوم واحد سیارہ ہے۔' },
      { en: 'About 71% of Earth\'s surface is water.', ur: 'زمین کی سطح کا تقریباً ۷۱% حصہ پانی ہے۔' },
      { en: 'Earth\'s atmosphere is 78% nitrogen and 21% oxygen.', ur: 'زمین کی فضا ۷۸% نائٹروجن اور ۲۱% آکسیجن ہے۔' },
      { en: 'Earth has one natural moon.', ur: 'زمین کا ایک قدرتی چاند ہے۔' },
      { en: 'Earth\'s magnetic field protects us from solar radiation.', ur: 'زمین کا مقناطیسی میدان ہمیں شمسی شعاعوں سے بچاتا ہے۔' },
      { en: 'Earth rotates at about 1,670 km/h at the equator.', ur: 'زمین خط استوا پر تقریباً ۱،۶۷۰ کلومیٹر فی گھنٹہ کی رفتار سے گھومتی ہے۔' },
      { en: 'Earth is about 4.5 billion years old.', ur: 'زمین تقریباً ۴.۵ ارب سال پرانی ہے۔' },
      { en: 'Earth has a dynamic surface with tectonic plates.', ur: 'زمین کی سطح متحرک ہے جس پر ٹیکٹونک پلیٹیں ہیں۔' },
      { en: 'Earth\'s atmosphere extends about 10,000 km upward.', ur: 'زمین کی فضا تقریباً ۱۰،۰۰۰ کلومیٹر اوپر تک پھیلی ہوئی ہے۔' },
      { en: 'Earth is the densest planet in the Solar System.', ur: 'زمین نظامِ شمسی کا سب سے کثیف سیارہ ہے۔' }
    ],
    quiz: [
      { question: { en: 'Which planet is known to support life?', ur: 'کون سا سیارہ زندگی کو سہارا دیتا ہے؟' }, options: [{ en: 'Mars', ur: 'مریخ' }, { en: 'Venus', ur: 'زہرہ' }, { en: 'Earth', ur: 'زمین' }, { en: 'Jupiter', ur: 'مشتری' }], correct: 2, explanation: { en: 'Earth is the only known planet with life.', ur: 'زمین زندگی والا معلوم واحد سیارہ ہے۔' } },
      { question: { en: 'What percentage of Earth is covered by water?', ur: 'زمین کا کتنا فیصد حصہ پانی سے ڈھکا ہے؟' }, options: [{ en: 'About 30%', ur: 'تقریباً ۳۰%' }, { en: 'About 50%', ur: 'تقریباً ۵۰%' }, { en: 'About 71%', ur: 'تقریباً ۷۱%' }, { en: 'About 90%', ur: 'تقریباً ۹۰%' }], correct: 2, explanation: { en: 'About 71% of Earth\'s surface is water.', ur: 'زمین کی سطح کا تقریباً ۷۱% حصہ پانی ہے۔' } },
      { question: { en: 'How many moons does Earth have?', ur: 'زمین کے کتنے چاند ہیں؟' }, options: [{ en: '0', ur: '۰' }, { en: '1', ur: '۱' }, { en: '2', ur: '۲' }, { en: '4', ur: '۴' }], correct: 1, explanation: { en: 'Earth has one natural moon.', ur: 'زمین کا ایک قدرتی چاند ہے۔' } },
      { question: { en: 'What is Earth\'s main atmospheric gas?', ur: 'زمین کی فضا کی بنیادی گیس کیا ہے؟' }, options: [{ en: 'Oxygen (21%)', ur: 'آکسیجن (۲۱%)' }, { en: 'Nitrogen (78%)', ur: 'نائٹروجن (۷۸%)' }, { en: 'Carbon dioxide', ur: 'کاربن ڈائی آکسائیڈ' }, { en: 'Hydrogen', ur: 'ہائیڈروجن' }], correct: 1, explanation: { en: 'Earth\'s atmosphere is about 78% nitrogen.', ur: 'زمین کی فضا تقریباً ۷۸% نائٹروجن ہے۔' } },
      { question: { en: 'What is Earth\'s axial tilt?', ur: 'زمین کا محوری جھکاؤ کیا ہے؟' }, options: [{ en: '0 degrees', ur: '۰ ڈگری' }, { en: 'About 23.5 degrees', ur: 'تقریباً ۲۳.۵ ڈگری' }, { en: 'About 90 degrees', ur: 'تقریباً ۹۰ ڈگری' }, { en: 'About 98 degrees', ur: 'تقریباً ۹۸ ڈگری' }], correct: 1, explanation: { en: 'Earth\'s axial tilt is about 23.5 degrees.', ur: 'زمین کا محوری جھکاؤ تقریباً ۲۳.۵ ڈگری ہے۔' } },
      { question: { en: 'What is Earth\'s average temperature?', ur: 'زمین کا اوسط درجہ حرارت کیا ہے؟' }, options: [{ en: 'About -65°C', ur: 'تقریباً منفی ۶۵°C' }, { en: 'About 15°C', ur: 'تقریباً ۱۵°C' }, { en: 'About 167°C', ur: 'تقریباً ۱۶۷°C' }, { en: 'About 464°C', ur: 'تقریباً ۴۶۴°C' }], correct: 1, explanation: { en: 'Earth\'s average temperature is about 15°C.', ur: 'زمین کا اوسط درجہ حرارت تقریباً ۱۵°C ہے۔' } },
      { question: { en: 'How long is a year on Earth?', ur: 'زمین پر ایک سال کتنا لمبا ہے؟' }, options: [{ en: '88 days', ur: '۸۸ دن' }, { en: '225 days', ur: '۲۲۵ دن' }, { en: 'About 365.25 days', ur: 'تقریباً ۳۶۵.۲۵ دن' }, { en: '687 days', ur: '۶۸۷ دن' }], correct: 2, explanation: { en: 'A year on Earth is about 365.25 days.', ur: 'زمین پر ایک سال تقریباً ۳۶۵.۲۵ دن ہے۔' } },
      { question: { en: 'What protects Earth from solar radiation?', ur: 'زمین کو شمسی شعاعوں سے کیا بچاتا ہے؟' }, options: [{ en: 'The oceans', ur: 'سمندر' }, { en: 'The magnetic field and atmosphere', ur: 'مقناطیسی میدان اور فضا' }, { en: 'The Moon', ur: 'چاند' }, { en: 'The rings', ur: 'حلقے' }], correct: 1, explanation: { en: 'Earth\'s magnetic field and atmosphere protect from radiation.', ur: 'زمین کا مقناطیسی میدان اور فضا شعاعوں سے بچاتی ہے۔' } },
      { question: { en: 'What is Earth\'s diameter?', ur: 'زمین کا قطر کیا ہے؟' }, options: [{ en: '4,879 km', ur: '۴،۸۷۹ کلومیٹر' }, { en: '6,792 km', ur: '۶،۷۹۲ کلومیٹر' }, { en: '12,756 km', ur: '۱۲،۷۵۶ کلومیٹر' }, { en: '142,984 km', ur: '۱۴۲،۹۸۴ کلومیٹر' }], correct: 2, explanation: { en: 'Earth\'s diameter is 12,756 km.', ur: 'زمین کا قطر ۱۲،۷۵۶ کلومیٹر ہے۔' } },
      { question: { en: 'Does Earth have rings?', ur: 'کیا زمین کے حلقے ہیں؟' }, options: [{ en: 'Yes, bright rings', ur: 'ہاں، روشن حلقے' }, { en: 'Yes, faint rings', ur: 'ہاں، مدھم حلقے' }, { en: 'No rings', ur: 'کوئی حلقے نہیں' }, { en: 'Only in winter', ur: 'صرف سردیوں میں' }], correct: 2, explanation: { en: 'Earth has no rings.', ur: 'زمین کے کوئی حلقے نہیں ہیں۔' } },
      { question: { en: 'What creates Earth\'s seasons?', ur: 'زمین کے موسم کیا بناتے ہیں؟' }, options: [{ en: 'Distance from the Sun', ur: 'سورج سے فاصلہ' }, { en: 'Axial tilt of 23.5 degrees', ur: '۲۳.۵ ڈگری کا محوری جھکاؤ' }, { en: 'The Moon', ur: 'چاند' }, { en: 'Ocean currents only', ur: 'صرف سمندری دھاریں' }], correct: 1, explanation: { en: 'Earth\'s axial tilt creates seasons.', ur: 'زمین کا محوری جھکاؤ موسم بناتا ہے۔' } },
      { question: { en: 'How old is Earth?', ur: 'زمین کتنی پرانی ہے؟' }, options: [{ en: '1 million years', ur: '۱۰ لاکھ سال' }, { en: '100 million years', ur: '۱۰ کروڑ سال' }, { en: 'About 4.5 billion years', ur: 'تقریباً ۴.۵ ارب سال' }, { en: 'About 10 billion years', ur: 'تقریباً ۱۰ ارب سال' }], correct: 2, explanation: { en: 'Earth is about 4.5 billion years old.', ur: 'زمین تقریباً ۴.۵ ارب سال پرانی ہے۔' } },
      { question: { en: 'What is Earth\'s position from the Sun?', ur: 'سورج سے زمین کا نمبر کیا ہے؟' }, options: [{ en: 'First', ur: 'پہلا' }, { en: 'Second', ur: 'دوسرا' }, { en: 'Third', ur: 'تیسرا' }, { en: 'Fourth', ur: 'چوتھا' }], correct: 2, explanation: { en: 'Earth is the third planet from the Sun.', ur: 'زمین سورج سے تیسرا سیارہ ہے۔' } },
      { question: { en: 'What makes Earth unique in the Solar System?', ur: 'زمین کو نظامِ شمسی میں منفرد کیا بناتا ہے؟' }, options: [{ en: 'It has the most moons', ur: 'اس کے سب سے زیادہ چاند ہیں' }, { en: 'It supports life', ur: 'یہ زندگی کو سہارا دیتی ہے' }, { en: 'It is the largest', ur: 'یہ سب سے بڑا ہے' }, { en: 'It has rings', ur: 'اس کے حلقے ہیں' }], correct: 1, explanation: { en: 'Earth is the only known planet with life.', ur: 'زمین زندگی والا معلوم واحد سیارہ ہے۔' } },
      { question: { en: 'What percentage of Earth\'s atmosphere is oxygen?', ur: 'زمین کی فضا میں آکسیجن کتنے فیصد ہے؟' }, options: [{ en: 'About 10%', ur: 'تقریباً ۱۰%' }, { en: 'About 21%', ur: 'تقریباً ۲۱%' }, { en: 'About 50%', ur: 'تقریباً ۵۰%' }, { en: 'About 78%', ur: 'تقریباً ۷۸%' }], correct: 1, explanation: { en: 'Earth\'s atmosphere is about 21% oxygen.', ur: 'زمین کی فضا تقریباً ۲۱% آکسیجن ہے۔' } }
    ],
    axisTilt: '23.5 degrees',
    namedMoons: ['Moon / چاند']
  },

  mars: {
    id: 'mars',
    type: { en: 'Rocky terrestrial planet', ur: 'پتھریلا زمینی سیارہ' },
    diameter: '6,792 km',
    avgDistance: '227.9 million km',
    dayLength: 'About 24.6 hours',
    yearLength: 'About 687 Earth days',
    avgTemp: 'About -65°C',
    gravity: '0.38 Earth gravity',
    moons: '2: Phobos and Deimos',
    rings: { en: 'No', ur: 'نہیں' },
    coreDescription: {
      en: 'Mars is the fourth planet from the Sun and is known as the Red Planet. Iron-rich dust gives Mars its reddish color. Mars is cold and has a thin atmosphere made mostly of carbon dioxide. It has polar ice, dusty plains, giant volcanoes, deep canyons and evidence that liquid water flowed on its surface long ago.',
      ur: 'مریخ سورج سے چوتھا سیارہ ہے اور اسے سرخ سیارہ کہا جاتا ہے۔ لوہے سے بھرپور گرد مریخ کو سرخی مائل رنگ دیتی ہے۔ مریخ سرد ہے اور اس کی فضا زیادہ تر کاربن ڈائی آکسائیڈ پر مشتمل بہت پتلی فضا ہے۔ اس پر قطبی برف، گرد آلود میدان، بہت بڑے آتش فشاں، گہری گھاٹیاں اور یہ شواہد موجود ہیں کہ بہت عرصہ پہلے اس کی سطح پر مائع پانی بہتا تھا۔'
    },
    detailedDescription: {
      en: 'Mars is a cold desert world with the largest volcano (Olympus Mons) and one of the deepest canyons (Valles Marineris) in the Solar System. Evidence suggests Mars once had rivers, lakes and possibly an ocean. Today, water exists mainly as ice at the poles and underground.',
      ur: 'مریخ ایک سرد صحرائی دنیا ہے جس پر نظامِ شمسی کا سب سے بڑا آتش فشاں (اولمپس مونز) اور سب سے گہری گھاٹیوں میں سے ایک (ویلیز میرینیرس) ہے۔ شواہد بتاتے ہیں کہ مریخ پر ایک وقت میں دریا، جھیلیں اور شاید ایک سمندر تھا۔ آج پانی زیادہ تر قطبین پر برف اور زیر زمین موجود ہے۔'
    },
    surfaceSection: {
      en: 'Mars has a rocky, dusty surface with red iron oxide (rust). It has vast plains, giant volcanoes, deep canyons, polar ice caps and evidence of ancient river valleys. Olympus Mons is the tallest volcano in the Solar System at about 22 km high.',
      ur: 'مریخ کی پتھریلی، گرد آلود سطح پر سرخ آئرن آکسائیڈ (زنگ) ہے۔ اس پر وسیع میدان، بہت بڑے آتش فشاں، گہری گھاٹیاں، قطبی برف کی ٹوپیاں اور قدیم دریاؤں کی وادیوں کے شواہد ہیں۔ اولمپس مونز نظامِ شمسی کا سب سے اونچا آتش فشاں ہے جو تقریباً ۲۲ کلومیٹر اونچا ہے۔'
    },
    atmosphereSection: {
      en: 'Mars has a very thin atmosphere made of about 95% carbon dioxide, 2.7% nitrogen and 1.6% argon. The thin atmosphere cannot hold much heat, making Mars cold. Dust storms can cover the entire planet for months.',
      ur: 'مریخ کی بہت پتلی فضا ہے جو تقریباً ۹۵% کاربن ڈائی آکسائیڈ، ۲.۷% نائٹروجن اور ۱.۶% آرگان پر مشتمل ہے۔ پتلی فضا زیادہ حرارت نہیں روک سکتی، جس سے مریخ سرد ہے۔ گرد کے طوفان پورے سیارے کو مہینوں تک ڈھانپ سکتے ہیں۔'
    },
    temperatureExplanation: {
      en: 'The average temperature is about -65°C. Mars is cold because it is far from the Sun and has a thin atmosphere that cannot retain heat. Temperatures range from about 20°C at the equator in summer to about -153°C at the poles in winter.',
      ur: 'اوسط درجہ حرارت تقریباً منفی ۶۵°C ہے۔ مریخ سرد ہے کیونکہ یہ سورج سے دور ہے اور اس کی پتلی فضا حرارت محفوظ نہیں رکھ سکتی۔ درجہ حرارت گرمیوں میں خط استوا پر تقریباً ۲۰°C سے سردیوں میں قطبین پر تقریباً منفی ۱۵۳°C تک ہوتا ہے۔'
    },
    moonsAndRingsDetail: {
      en: 'Mars has two small moons: Phobos and Deimos. They are likely captured asteroids. Phobos is slowly spiraling inward and may eventually break apart. Mars has no rings.',
      ur: 'مریخ کے دو چھوٹے چاند ہیں: فوبوس اور ڈیموس۔ یہ شاید پکڑے ہوئے سیارچے ہیں۔ فوبوس آہستہ آہستہ اندر کی طرف گھوم رہا ہے اور شاید آخرکار ٹوٹ جائے۔ مریخ کے کوئی حلقے نہیں ہیں۔'
    },
    seasonsSection: {
      en: 'Mars has an axial tilt of about 25 degrees, similar to Earth, so it has seasons. However, its year is almost twice as long as Earth\'s, so each season lasts about six Earth months. Mars\'s elliptical orbit makes its seasons unequal in length.',
      ur: 'مریخ کا محوری جھکاؤ تقریباً ۲۵ ڈگری ہے، جو زمین سے ملتا جلتا ہے، اس لیے اس پر موسم بدلتے ہیں۔ البتہ اس کا سال زمین سے تقریباً دگنا لمبا ہے، اس لیے ہر موسم تقریباً چھ زمینی مہینے رہتا ہے۔ مریخ کا بیضوی مدار اس کے موسموں کو لمبائی میں غیر مساوی بناتا ہے۔'
    },
    habitability: {
      en: 'Humans cannot live on Mars naturally. The cold temperatures, thin atmosphere, lack of breathable air and radiation exposure make it impossible without advanced protection. A future protected research habitat is a topic of study, but it is not a place where people can currently live naturally.',
      ur: 'انسان مریخ پر قدرتی طور پر نہیں رہ سکتے۔ سرد درجہ حرارت، پتلی فضا، سانس لینے کے قابل ہوا کی کمی اور شعاعوں کا سامنا جدید حفاظت کے بغیر ناممکن بناتے ہیں۔ کچھ دنیاؤں پر مستقبل کی محفوظ تحقیقی رہائش گاہ کا مطالعہ کیا جاتا ہے، لیکن انسان وہاں اس وقت قدرتی طور پر نہیں رہ سکتے۔'
    },
    missions: [
      { name: 'Mariner 4', type: { en: 'Flyby', ur: 'پرواز' }, year: '1965' },
      { name: 'Viking 1 & 2', type: { en: 'Orbiter/Lander', ur: 'مدار گرد/لینڈر' }, year: '1976' },
      { name: 'Mars Global Surveyor', type: { en: 'Orbiter', ur: 'مدار گرد' }, year: '1997-2006' },
      { name: 'Spirit & Opportunity', type: { en: 'Rovers', ur: 'روورز' }, year: '2004' },
      { name: 'Curiosity', type: { en: 'Rover', ur: 'روور' }, year: '2012-present' },
      { name: 'Perseverance', type: { en: 'Rover', ur: 'روور' }, year: '2021-present' }
    ],
    funFacts: [
      { en: 'Mars is called the Red Planet.', ur: 'مریخ کو سرخ سیارہ کہا جاتا ہے۔' },
      { en: 'Mars has the tallest volcano in the Solar System: Olympus Mons.', ur: 'مریخ پر نظامِ شمسی کا سب سے اونچا آتش فشاں ہے: اولمپس مونز۔' },
      { en: 'Mars has two small moons: Phobos and Deimos.', ur: 'مریخ کے دو چھوٹے چاند ہیں: فوبوس اور ڈیموس۔' },
      { en: 'A day on Mars is about 24.6 hours, similar to Earth.', ur: 'مریخ پر ایک دن تقریباً ۲۴.۶ گھنٹے ہے، زمین سے ملتا جلتا۔' },
      { en: 'Mars has seasons similar to Earth due to its axial tilt.', ur: 'مریخ پر زمین جیسے موسم ہیں کیونکہ اس کا محوری جھکاؤ ملتا جلتا ہے۔' },
      { en: 'Evidence suggests Mars once had liquid water on its surface.', ur: 'شواہد بتاتے ہیں کہ مریخ پر ایک وقت میں مائع پانی تھا۔' },
      { en: 'Mars has a very thin atmosphere mostly of carbon dioxide.', ur: 'مریخ کی بہت پتلی فضا ہے جو زیادہ تر کاربن ڈائی آکسائیڈ ہے۔' },
      { en: 'Dust storms on Mars can cover the entire planet.', ur: 'مریخ پر گرد کے طوفان پورے سیارے کو ڈھانپ سکتے ہیں۔' },
      { en: 'Mars has polar ice caps made of water ice and frozen CO2.', ur: 'مریخ کے قطبی برف کے ٹوپے ہیں جو پانی کی برف اور جمی CO2 سے بنے ہیں۔' },
      { en: 'Mars has the Valles Marineris canyon, over 4,000 km long.', ur: 'مریخ پر ویلیز میرینیرس گھاٹی ہے جو ۴،۰۰۰ کلومیٹر سے زیادہ لمبی ہے۔' }
    ],
    quiz: [
      { question: { en: 'What is Mars known as?', ur: 'مریخ کس نام سے مشہور ہے؟' }, options: [{ en: 'The Blue Planet', ur: 'نیلا سیارہ' }, { en: 'The Red Planet', ur: 'سرخ سیارہ' }, { en: 'The Gas Giant', ur: 'گیس دیو' }, { en: 'The Ice Giant', ur: 'برفانی دیو' }], correct: 1, explanation: { en: 'Mars is called the Red Planet.', ur: 'مریخ کو سرخ سیارہ کہا جاتا ہے۔' } },
      { question: { en: 'How many moons does Mars have?', ur: 'مریخ کے کتنے چاند ہیں؟' }, options: [{ en: '0', ur: '۰' }, { en: '1', ur: '۱' }, { en: '2', ur: '۲' }, { en: '16', ur: '۱۶' }], correct: 2, explanation: { en: 'Mars has 2 moons: Phobos and Deimos.', ur: 'مریخ کے ۲ چاند ہیں: فوبوس اور ڈیموس۔' } },
      { question: { en: 'What is the tallest volcano in the Solar System?', ur: 'نظامِ شمسی کا سب سے اونچا آتش فشاں کون سا ہے؟' }, options: [{ en: 'Mount Everest', ur: 'ماؤنٹ ایورسٹ' }, { en: 'Olympus Mons on Mars', ur: 'مریخ پر اولمپس مونز' }, { en: 'Mauna Loa', ur: 'ماؤنا لوا' }, { en: 'Maxwell Montes on Venus', ur: 'زہرہ پر میکسویل مونٹیس' }], correct: 1, explanation: { en: 'Olympus Mons on Mars is the tallest volcano.', ur: 'مریخ پر اولمپس مونز سب سے اونچا آتش فشاں ہے۔' } },
      { question: { en: 'What is Mars\'s average temperature?', ur: 'مریخ کا اوسط درجہ حرارت کیا ہے؟' }, options: [{ en: 'About 15°C', ur: 'تقریباً ۱۵°C' }, { en: 'About 167°C', ur: 'تقریباً ۱۶۷°C' }, { en: 'About -65°C', ur: 'تقریباً منفی ۶۵°C' }, { en: 'About -200°C', ur: 'تقریباً منفی ۲۰۰°C' }], correct: 2, explanation: { en: 'Mars\'s average temperature is about -65°C.', ur: 'مریخ کا اوسط درجہ حرارت تقریباً منفی ۶۵°C ہے۔' } },
      { question: { en: 'What gives Mars its red color?', ur: 'مریخ کو سرخ رنگ کیا دیتا ہے؟' }, options: [{ en: 'Copper', ur: 'تانبا' }, { en: 'Iron oxide (rust)', ur: 'آئرن آکسائیڈ (زنگ)' }, { en: 'Red clouds', ur: 'سرخ بادل' }, { en: 'Lava', ur: 'لاوا' }], correct: 1, explanation: { en: 'Iron-rich dust (rust) gives Mars its red color.', ur: 'لوہے سے بھرپور گرد (زنگ) مریخ کو سرخ رنگ دیتی ہے۔' } },
      { question: { en: 'What is Mars\'s atmosphere mostly made of?', ur: 'مریخ کی فضا زیادہ تر کس سے بنی ہے؟' }, options: [{ en: 'Oxygen', ur: 'آکسیجن' }, { en: 'Nitrogen', ur: 'نائٹروجن' }, { en: 'Carbon dioxide', ur: 'کاربن ڈائی آکسائیڈ' }, { en: 'Hydrogen', ur: 'ہائیڈروجن' }], correct: 2, explanation: { en: 'Mars\'s atmosphere is about 95% carbon dioxide.', ur: 'مریخ کی فضا تقریباً ۹۵% کاربن ڈائی آکسائیڈ ہے۔' } },
      { question: { en: 'How long is a year on Mars?', ur: 'مریخ پر ایک سال کتنا لمبا ہے؟' }, options: [{ en: '88 days', ur: '۸۸ دن' }, { en: '225 days', ur: '۲۲۵ دن' }, { en: '365 days', ur: '۳۶۵ دن' }, { en: 'About 687 Earth days', ur: 'تقریباً ۶۸۷ زمینی دن' }], correct: 3, explanation: { en: 'A year on Mars is about 687 Earth days.', ur: 'مریخ پر ایک سال تقریباً ۶۸۷ زمینی دن ہے۔' } },
      { question: { en: 'What evidence suggests Mars once had water?', ur: 'کون سے شواہد بتاتے ہیں کہ مریخ پر ایک وقت میں پانی تھا؟' }, options: [{ en: 'Oceans still exist', ur: 'سمندر ابھی موجود ہیں' }, { en: 'River valleys and mineral deposits', ur: 'دریاؤں کی وادیاں اور معدنی ذخائر' }, { en: 'It rains on Mars', ur: 'مریخ پر بارش ہوتی ہے' }, { en: 'No evidence exists', ur: 'کوئی شواہد نہیں' }], correct: 1, explanation: { en: 'River valleys and minerals suggest past water.', ur: 'دریاؤں کی وادیاں اور معدنیات ماضی کے پانی کی نشاندہی کرتی ہیں۔' } },
      { question: { en: 'What are Mars\'s moons named?', ur: 'مریخ کے چاندوں کے کیا نام ہیں؟' }, options: [{ en: 'Io and Europa', ur: 'آیو اور یوروپا' }, { en: 'Titan and Enceladus', ur: 'ٹائٹن اور اینسیلاڈس' }, { en: 'Phobos and Deimos', ur: 'فوبوس اور ڈیموس' }, { en: 'Triton and Nereid', ur: 'ٹرائٹن اور نیریڈ' }], correct: 2, explanation: { en: 'Mars\'s moons are Phobos and Deimos.', ur: 'مریخ کے چاند فوبوس اور ڈیموس ہیں۔' } },
      { question: { en: 'What is Mars\'s diameter?', ur: 'مریخ کا قطر کیا ہے؟' }, options: [{ en: '4,879 km', ur: '۴،۸۷۹ کلومیٹر' }, { en: '6,792 km', ur: '۶،۷۹۲ کلومیٹر' }, { en: '12,104 km', ur: '۱۲،۱۰۴ کلومیٹر' }, { en: '12,756 km', ur: '۱۲،۷۵۶ کلومیٹر' }], correct: 1, explanation: { en: 'Mars\'s diameter is 6,792 km.', ur: 'مریخ کا قطر ۶،۷۹۲ کلومیٹر ہے۔' } },
      { question: { en: 'Which rover is currently on Mars?', ur: 'کون سا روور فی الحال مریخ پر ہے؟' }, options: [{ en: 'Spirit', ur: 'سپیرٹ' }, { en: 'Opportunity', ur: 'آپارچونٹی' }, { en: 'Perseverance', ur: 'پرسیویرنس' }, { en: 'Sojourner', ur: 'سوجورنر' }], correct: 2, explanation: { en: 'Perseverance landed on Mars in 2021.', ur: 'پرسیویرنس ۲۰۲۱ میں مریخ پر اترا۔' } },
      { question: { en: 'Does Mars have rings?', ur: 'کیا مریخ کے حلقے ہیں؟' }, options: [{ en: 'Yes, bright rings', ur: 'ہاں، روشن حلقے' }, { en: 'Yes, faint rings', ur: 'ہاں، مدھم حلقے' }, { en: 'No rings', ur: 'کوئی حلقے نہیں' }, { en: 'Only during eclipse', ur: 'صرف گرہن کے دوران' }], correct: 2, explanation: { en: 'Mars has no rings.', ur: 'مریخ کے کوئی حلقے نہیں ہیں۔' } },
      { question: { en: 'What is Mars\'s position from the Sun?', ur: 'سورج سے مریخ کا نمبر کیا ہے؟' }, options: [{ en: 'Second', ur: 'دوسرا' }, { en: 'Third', ur: 'تیسرا' }, { en: 'Fourth', ur: 'چوتھا' }, { en: 'Fifth', ur: 'پانچواں' }], correct: 2, explanation: { en: 'Mars is the fourth planet from the Sun.', ur: 'مریخ سورج سے چوتھا سیارہ ہے۔' } },
      { question: { en: 'Can humans live on Mars naturally?', ur: 'کیا انسان مریخ پر قدرتی طور پر رہ سکتے ہیں؟' }, options: [{ en: 'Yes, easily', ur: 'ہاں، آسانی سے' }, { en: 'Only in summer', ur: 'صرف گرمیوں میں' }, { en: 'No, needs protection', ur: 'نہیں، حفاظت ضروری' }, { en: 'Only at the equator', ur: 'صرف خط استوا پر' }], correct: 2, explanation: { en: 'Mars is too cold with thin atmosphere for natural human life.', ur: 'مریخ قدرتی انسانی زندگی کے لیے بہت سرد اور پتلی فضا والا ہے۔' } },
      { question: { en: 'What is the Valles Marineris?', ur: 'ویلیز میرینیرس کیا ہے؟' }, options: [{ en: 'A volcano', ur: 'ایک آتش فشاں' }, { en: 'A large canyon system', ur: 'ایک بڑی گھاٹیوں کا نظام' }, { en: 'A moon', ur: 'ایک چاند' }, { en: 'An ocean', ur: 'ایک سمندر' }], correct: 1, explanation: { en: 'Valles Marineris is a large canyon on Mars.', ur: 'ویلیز میرینیرس مریخ پر ایک بڑی گھاٹیوں کا نظام ہے۔' } }
    ],
    axisTilt: '25.2 degrees',
    namedMoons: ['Phobos / فوبوس', 'Deimos / ڈیموس']
  },

  jupiter: {
    id: 'jupiter',
    type: { en: 'Gas giant', ur: 'گیس دیو' },
    diameter: '142,984 km',
    avgDistance: '778.3 million km',
    dayLength: 'About 9.9 hours',
    yearLength: 'About 11.86 Earth years',
    avgTemp: 'About -110°C',
    gravity: '2.53 Earth gravity',
    moons: '95 known moons',
    rings: { en: 'Yes, faint rings', ur: 'ہاں، مدھم حلقے' },
    coreDescription: {
      en: 'Jupiter is the largest planet in the Solar System. It is a gas giant made mostly of hydrogen and helium. Jupiter has colorful cloud bands, powerful storms, a strong magnetic field, faint rings and many moons. Jupiter does not have a normal solid surface like Earth where a person could stand.',
      ur: 'مشتری نظامِ شمسی کا سب سے بڑا سیارہ ہے۔ یہ ایک گیس دیو ہے جو زیادہ تر ہائیڈروجن اور ہیلیم پر مشتمل ہے۔ مشتری پر رنگین بادلوں کی پٹیاں، طاقتور طوفان، مضبوط مقناطیسی میدان، مدھم حلقے اور بہت سے چاند موجود ہیں۔ مشتری کی زمین جیسی عام ٹھوس سطح نہیں ہے جس پر انسان کھڑا ہو سکے۔'
    },
    detailedDescription: {
      en: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is more massive than all other planets combined. Jupiter\'s Great Red Spot is a giant storm larger than Earth that has been raging for hundreds of years. Jupiter acts like a mini solar system with its many moons.',
      ur: 'مشتری سورج سے پانچواں اور نظامِ شمسی کا سب سے بڑا سیارہ ہے۔ یہ تمام دوسرے سیاروں کی مجموعی کمیت سے زیادہ بھاری ہے۔ مشتری کا عظیم سرخ دھبہ زمین سے بڑا ایک عظیم طوفان ہے جو سینکڑوں سالوں سے جاری ہے۔ مشتری اپنے بہت سے چاندوں کے ساتھ ایک چھوٹے نظامِ شمسی کی طرح کام کرتا ہے۔'
    },
    surfaceSection: {
      en: 'Jupiter does not have a solid surface like Earth. As you go deeper, the gas becomes denser and eventually turns into a liquid metallic hydrogen layer. The visible "surface" is actually the top of the cloud layers.',
      ur: 'مشتری کی زمین جیسی ٹھوس سطح نہیں ہے۔ جیسے جیسے آپ نیچے جاتے ہیں، گیس گھنی ہوتی جاتی ہے اور آخرکار مائع دھاتی ہائیڈروجن کی تہہ بن جاتی ہے۔ نظر آنے والی "سطح" دراصل بادل کی تہوں کا اوپری حصہ ہے۔'
    },
    atmosphereSection: {
      en: 'Jupiter\'s atmosphere is made mostly of hydrogen (about 90%) and helium (about 10%), with traces of methane, ammonia and water vapor. It has colorful cloud bands and powerful storms including the Great Red Spot.',
      ur: 'مشتری کی فضا زیادہ تر ہائیڈروجن (تقریباً ۹۰%) اور ہیلیم (تقریباً ۱۰%) پر مشتمل ہے، ساتھ ہی میتھین، امونیا اور آبی بخارات کی معمولی مقدار ہے۔ اس پر رنگین بادل کی پٹیاں اور عظیم سرخ دھبے سمیت طاقتور طوفان ہیں۔'
    },
    temperatureExplanation: {
      en: 'The average cloud-top temperature is about -110°C. Jupiter is cold because it is far from the Sun, but it radiates more heat than it receives from the Sun due to internal heat from its formation.',
      ur: 'بادل کی چوٹی کا اوسط درجہ حرارت تقریباً منفی ۱۱۰°C ہے۔ مشتری سرد ہے کیونکہ یہ سورج سے دور ہے، لیکن یہ سورج سے جتنی حرارت حاصل کرتا ہے اس سے زیادہ خارج کرتا ہے کیونکہ اس کی تشکیل سے اندرونی حرارت آتی ہے۔'
    },
    moonsAndRingsDetail: {
      en: 'Jupiter has 95 known moons. The four largest are the Galilean moons: Io (volcanic), Europa (icy ocean), Ganymede (largest moon in Solar System) and Callisto (heavily cratered). Jupiter also has faint rings made of dust.',
      ur: 'مشتری کے ۹۵ معلوم چاند ہیں۔ چار سب سے بڑے گلیلیائی چاند ہیں: آیو (آتش فشانی)، یوروپا (برفیلا سمندر)، گینی میڈ (نظامِ شمسی کا سب سے بڑا چاند) اور کیلسٹو (بہت زیادہ گڑھوں والا)۔ مشتری کے گرد کے ذرات سے بنے مدھم حلقے بھی ہیں۔'
    },
    seasonsSection: {
      en: 'Jupiter has a very small axial tilt of about 3 degrees, so it does not experience significant seasons like Earth. Its weather patterns are driven more by internal heat than by sunlight.',
      ur: 'مشتری کا محوری جھکاؤ تقریباً ۳ ڈگری ہے، اس لیے زمین کی طرح اس پر نمایاں موسم نہیں بدلتے۔ اس کے موسمی نمونے سورج کی روشنی سے زیادہ اندرونی حرارت سے چلتے ہیں۔'
    },
    habitability: {
      en: 'Humans cannot live on Jupiter. It has no solid surface to stand on, extreme pressures, dangerous radiation belts and an atmosphere of hydrogen and helium. A future protected research habitat is a topic of study, but it is not a place where people can currently live naturally.',
      ur: 'انسان مشتری پر نہیں رہ سکتے۔ اس پر کھڑے ہونے کے لیے کوئی ٹھوس سطح نہیں، انتہائی دباؤ، خطرناک شعاعی کمربند اور ہائیڈروجن اور ہیلیم کی فضا ہے۔ کچھ دنیاؤں پر مستقبل کی محفوظ تحقیقی رہائش گاہ کا مطالعہ کیا جاتا ہے، لیکن انسان وہاں اس وقت قدرتی طور پر نہیں رہ سکتے۔'
    },
    missions: [
      { name: 'Pioneer 10 & 11', type: { en: 'Flyby', ur: 'پرواز' }, year: '1973-1974' },
      { name: 'Voyager 1 & 2', type: { en: 'Flyby', ur: 'پرواز' }, year: '1979' },
      { name: 'Galileo', type: { en: 'Orbiter', ur: 'مدار گرد' }, year: '1995-2003' },
      { name: 'Juno', type: { en: 'Orbiter', ur: 'مدار گرد' }, year: '2016-present' },
      { name: 'Europa Clipper', type: { en: 'Mission to Europa', ur: 'یوروپا کا مشن' }, year: '2024-launched' }
    ],
    funFacts: [
      { en: 'Jupiter is the largest planet in the Solar System.', ur: 'مشتری نظامِ شمسی کا سب سے بڑا سیارہ ہے۔' },
      { en: 'Jupiter has at least 95 known moons.', ur: 'مشتری کے کم از کم ۹۵ معلوم چاند ہیں۔' },
      { en: 'The Great Red Spot is a storm larger than Earth.', ur: 'عظیم سرخ دھبہ زمین سے بڑا طوفان ہے۔' },
      { en: 'Jupiter could fit all other planets inside it.', ur: 'مشتری میں تمام دوسرے سیارے سما سکتے ہیں۔' },
      { en: 'Jupiter has the shortest day of all planets: about 9.9 hours.', ur: 'مشتری کا دن تمام سیاروں میں سب سے چھوٹا ہے: تقریباً ۹.۹ گھنٹے۔' },
      { en: 'Jupiter has faint rings made of dust.', ur: 'مشتری کے گرد کے ذرات سے بنے مدھم حلقے ہیں۔' },
      { en: 'Jupiter\'s moon Europa may have an ocean under its ice.', ur: 'مشتری کے چاند یوروپا کی برف کے نیچے سمندر ہو سکتا ہے۔' },
      { en: 'Jupiter\'s moon Ganymede is the largest moon in the Solar System.', ur: 'مشتری کا چاند گینی میڈ نظامِ شمسی کا سب سے بڑا چاند ہے۔' },
      { en: 'Jupiter acts like a shield, deflecting asteroids.', ur: 'مشتری ڈھال کی طرح کام کرتا ہے، سیارچوں کو موڑتا ہے۔' },
      { en: 'Jupiter is more massive than all other planets combined.', ur: 'مشتری تمام دوسرے سیاروں کی مجموعی کمیت سے زیادہ بھاری ہے۔' }
    ],
    quiz: [
      { question: { en: 'Which is the largest planet?', ur: 'سب سے بڑا سیارہ کون سا ہے؟' }, options: [{ en: 'Saturn', ur: 'زحل' }, { en: 'Jupiter', ur: 'مشتری' }, { en: 'Neptune', ur: 'نیپچون' }, { en: 'Earth', ur: 'زمین' }], correct: 1, explanation: { en: 'Jupiter is the largest planet.', ur: 'مشتری سب سے بڑا سیارہ ہے۔' } },
      { question: { en: 'What type of planet is Jupiter?', ur: 'مشتری کس قسم کا سیارہ ہے؟' }, options: [{ en: 'Rocky', ur: 'پتھریلا' }, { en: 'Gas giant', ur: 'گیس دیو' }, { en: 'Ice giant', ur: 'برفانی دیو' }, { en: 'Dwarf', ur: 'بونا' }], correct: 1, explanation: { en: 'Jupiter is a gas giant.', ur: 'مشتری ایک گیس دیو ہے۔' } },
      { question: { en: 'What is the Great Red Spot?', ur: 'عظیم سرخ دھبہ کیا ہے؟' }, options: [{ en: 'A volcano', ur: 'ایک آتش فشاں' }, { en: 'A giant storm', ur: 'ایک عظیم طوفان' }, { en: 'A moon', ur: 'ایک چاند' }, { en: 'A crater', ur: 'ایک گڑھا' }], correct: 1, explanation: { en: 'The Great Red Spot is a giant storm on Jupiter.', ur: 'عظیم سرخ دھبہ مشتری پر ایک عظیم طوفان ہے۔' } },
      { question: { en: 'How many known moons does Jupiter have?', ur: 'مشتری کے کتنے معلوم چاند ہیں؟' }, options: [{ en: '2', ur: '۲' }, { en: '16', ur: '۱۶' }, { en: '95', ur: '۹۵' }, { en: '140+', ur: '۱۴۰+' }], correct: 2, explanation: { en: 'Jupiter has 95 known moons.', ur: 'مشتری کے ۹۵ معلوم چاند ہیں۔' } },
      { question: { en: 'What is Jupiter mostly made of?', ur: 'مشتری زیادہ تر کس سے بنا ہے؟' }, options: [{ en: 'Rock and metal', ur: 'چٹان اور دھات' }, { en: 'Hydrogen and helium', ur: 'ہائیڈروجن اور ہیلیم' }, { en: 'Ice', ur: 'برف' }, { en: 'Carbon dioxide', ur: 'کاربن ڈائی آکسائیڈ' }], correct: 1, explanation: { en: 'Jupiter is mostly hydrogen and helium.', ur: 'مشتری زیادہ تر ہائیڈروجن اور ہیلیم ہے۔' } },
      { question: { en: 'How long is a day on Jupiter?', ur: 'مشتری پر ایک دن کتنا لمبا ہے؟' }, options: [{ en: '24 hours', ur: '۲۴ گھنٹے' }, { en: 'About 9.9 hours', ur: 'تقریباً ۹.۹ گھنٹے' }, { en: 'About 10.7 hours', ur: 'تقریباً ۱۰.۷ گھنٹے' }, { en: 'About 17 hours', ur: 'تقریباً ۱۷ گھنٹے' }], correct: 1, explanation: { en: 'A day on Jupiter is about 9.9 hours.', ur: 'مشتری پر ایک دن تقریباً ۹.۹ گھنٹے ہے۔' } },
      { question: { en: 'Which is Jupiter\'s largest moon?', ur: 'مشتری کا سب سے بڑا چاند کون سا ہے؟' }, options: [{ en: 'Io', ur: 'آیو' }, { en: 'Europa', ur: 'یوروپا' }, { en: 'Ganymede', ur: 'گینی میڈ' }, { en: 'Callisto', ur: 'کیلسٹو' }], correct: 2, explanation: { en: 'Ganymede is the largest moon in the Solar System.', ur: 'گینی میڈ نظامِ شمسی کا سب سے بڑا چاند ہے۔' } },
      { question: { en: 'Does Jupiter have rings?', ur: 'کیا مشتری کے حلقے ہیں؟' }, options: [{ en: 'No rings', ur: 'کوئی حلقے نہیں' }, { en: 'Yes, bright icy rings', ur: 'ہاں، روشن برفیلے حلقے' }, { en: 'Yes, faint dust rings', ur: 'ہاں، مدھم گرد کے حلقے' }, { en: 'Only during eclipse', ur: 'صرف گرہن کے دوران' }], correct: 2, explanation: { en: 'Jupiter has faint rings made of dust.', ur: 'مشتری کے گرد کے ذرات سے بنے مدھم حلقے ہیں۔' } },
      { question: { en: 'What is Jupiter\'s diameter?', ur: 'مشتری کا قطر کیا ہے؟' }, options: [{ en: '49,528 km', ur: '۴۹،۵۲۸ کلومیٹر' }, { en: '120,536 km', ur: '۱۲۰،۵۳۶ کلومیٹر' }, { en: '142,984 km', ur: '۱۴۲،۹۸۴ کلومیٹر' }, { en: '51,118 km', ur: '۵۱،۱۱۸ کلومیٹر' }], correct: 2, explanation: { en: 'Jupiter\'s diameter is 142,984 km.', ur: 'مشتری کا قطر ۱۴۲،۹۸۴ کلومیٹر ہے۔' } },
      { question: { en: 'How long is a year on Jupiter?', ur: 'مشتری پر ایک سال کتنا لمبا ہے؟' }, options: [{ en: '88 days', ur: '۸۸ دن' }, { en: 'About 12 Earth years', ur: 'تقریباً ۱۲ زمینی سال' }, { en: 'About 29 Earth years', ur: 'تقریباً ۲۹ زمینی سال' }, { en: 'About 84 Earth years', ur: 'تقریباً ۸۴ زمینی سال' }], correct: 1, explanation: { en: 'A year on Jupiter is about 11.86 Earth years.', ur: 'مشتری پر ایک سال تقریباً ۱۱.۸۶ زمینی سال ہے۔' } },
      { question: { en: 'What is Jupiter\'s position from the Sun?', ur: 'سورج سے مشتری کا نمبر کیا ہے؟' }, options: [{ en: 'Third', ur: 'تیسرا' }, { en: 'Fourth', ur: 'چوتھا' }, { en: 'Fifth', ur: 'پانچواں' }, { en: 'Sixth', ur: 'چھٹا' }], correct: 2, explanation: { en: 'Jupiter is the fifth planet from the Sun.', ur: 'مشتری سورج سے پانچواں سیارہ ہے۔' } },
      { question: { en: 'Which moon of Jupiter may have an ocean?', ur: 'مشتری کا کون سا چاند سمندر رکھتا ہو سکتا ہے؟' }, options: [{ en: 'Io', ur: 'آیو' }, { en: 'Europa', ur: 'یوروپا' }, { en: 'Ganymede', ur: 'گینی میڈ' }, { en: 'Callisto', ur: 'کیلسٹو' }], correct: 1, explanation: { en: 'Europa may have a subsurface ocean.', ur: 'یوروپا کے زیرِ سطح سمندر ہو سکتا ہے۔' } },
      { question: { en: 'What is Jupiter\'s average temperature?', ur: 'مشتری کا اوسط درجہ حرارت کیا ہے؟' }, options: [{ en: 'About 15°C', ur: 'تقریباً ۱۵°C' }, { en: 'About -65°C', ur: 'تقریباً منفی ۶۵°C' }, { en: 'About -110°C', ur: 'تقریباً منفی ۱۱۰°C' }, { en: 'About -200°C', ur: 'تقریباً منفی ۲۰۰°C' }], correct: 2, explanation: { en: 'Jupiter\'s cloud-top temperature is about -110°C.', ur: 'مشتری کے بادل کی چوٹی کا درجہ حرارت تقریباً منفی ۱۱۰°C ہے۔' } },
      { question: { en: 'Which spacecraft is currently orbiting Jupiter?', ur: 'کون سا خلائی جہاز فی الحال مشتری کا مدار لگا رہا ہے؟' }, options: [{ en: 'Voyager', ur: 'وایجئر' }, { en: 'Cassini', ur: 'کاسینی' }, { en: 'Juno', ur: 'جونو' }, { en: 'New Horizons', ur: 'نیو ہورائزنز' }], correct: 2, explanation: { en: 'Juno has been orbiting Jupiter since 2016.', ur: 'جونو ۲۰۱۶ سے مشتری کا مدار لگا رہا ہے۔' } },
      { question: { en: 'Can humans live on Jupiter?', ur: 'کیا انسان مشتری پر رہ سکتے ہیں؟' }, options: [{ en: 'Yes, on the surface', ur: 'ہاں، سطح پر' }, { en: 'Only on its moons', ur: 'صرف اس کے چاندوں پر' }, { en: 'No, no solid surface', ur: 'نہیں، کوئی ٹھوس سطح نہیں' }, { en: 'Only at the poles', ur: 'صرف قطبین پر' }], correct: 2, explanation: { en: 'Jupiter has no solid surface for humans to stand on.', ur: 'مشتری پر انسان کے کھڑے ہونے کے لیے کوئی ٹھوس سطح نہیں ہے۔' } }
    ],
    axisTilt: '3.1 degrees',
    namedMoons: ['Io / آیو', 'Europa / یوروپا', 'Ganymede / گینی میڈ', 'Callisto / کیلسٹو']
  },

  saturn: {
    id: 'saturn',
    type: { en: 'Gas giant', ur: 'گیس دیو' },
    diameter: '120,536 km',
    avgDistance: '1,429 million km',
    dayLength: 'About 10.7 hours',
    yearLength: 'About 29.45 Earth years',
    avgTemp: 'About -140°C',
    gravity: '1.07 Earth gravity',
    moons: 'More than 140 known moons',
    rings: { en: 'Yes, bright icy ring system', ur: 'ہاں، روشن برفیلے حلقوں کا نظام' },
    coreDescription: {
      en: 'Saturn is a gas giant famous for its bright ring system. Its rings are made mostly of ice particles mixed with rock and dust. Saturn has many moons and a deep atmosphere. Like Jupiter, Saturn does not have a normal solid surface like Earth.',
      ur: 'زحل ایک گیس دیو سیارہ ہے جو اپنے روشن حلقوں کے نظام کی وجہ سے مشہور ہے۔ اس کے حلقے زیادہ تر برف کے ذرات کے ساتھ چٹان اور گرد سے بنے ہیں۔ زحل کے بہت سے چاند اور ایک گہری فضا موجود ہے۔ مشتری کی طرح زحل کی بھی زمین جیسی عام ٹھوس سطح نہیں ہے۔'
    },
    detailedDescription: {
      en: 'Saturn is the sixth planet from the Sun and the second largest. It is best known for its spectacular ring system, which is made of billions of ice and rock particles. Saturn is so light that it would float in water if there were a large enough ocean.',
      ur: 'زحل سورج سے چھٹا اور دوسرا سب سے بڑا سیارہ ہے۔ یہ اپنے شاندار حلقوں کے نظام کی وجہ سے سب سے زیادہ مشہور ہے، جو اربوں برف اور چٹان کے ذرات سے بنے ہیں۔ زحل اتنا ہلکا ہے کہ اگر کوئی بہت بڑا سمندر ہوتا تو یہ پانی پر تیر سکتا تھا۔'
    },
    surfaceSection: {
      en: 'Saturn does not have a solid surface. It is made mostly of hydrogen and helium. Deep inside, the pressure is so great that hydrogen becomes metallic. The visible cloud tops are the closest thing to a "surface" we can observe.',
      ur: 'زحل کی کوئی ٹھوس سطح نہیں ہے۔ یہ زیادہ تر ہائیڈروجن اور ہیلیم سے بنا ہے۔ اندر گہرائی میں دباؤ اتنا زیادہ ہے کہ ہائیڈروجن دھاتی بن جاتی ہے۔ نظر آنے والے بادل کی چوٹیاں وہ "سطح" ہیں جو ہم دیکھ سکتے ہیں۔'
    },
    atmosphereSection: {
      en: 'Saturn\'s atmosphere is about 96% hydrogen and 3% helium, with traces of methane and other gases. It has cloud bands and occasional massive storms. Winds can reach speeds of about 1,800 km/h near the equator.',
      ur: 'زحل کی فضا تقریباً ۹۶% ہائیڈروجن اور ۳% ہیلیم ہے، ساتھ ہی میتھین اور دیگر گیسیں ہیں۔ اس پر بادل کی پٹیاں اور کبھی کبھار بہت بڑے طوفان ہوتے ہیں۔ خط استوا کے قریب ہوائیں تقریباً ۱،۸۰۰ کلومیٹر فی گھنٹہ کی رفتار تک پہنچ سکتی ہیں۔'
    },
    temperatureExplanation: {
      en: 'The average cloud-top temperature is about -140°C. Saturn is cold because it is far from the Sun. Like Jupiter, Saturn radiates more heat than it receives from the Sun due to internal processes.',
      ur: 'بادل کی چوٹی کا اوسط درجہ حرارت تقریباً منفی ۱۴۰°C ہے۔ زحل سرد ہے کیونکہ یہ سورج سے دور ہے۔ مشتری کی طرح، زحل اندرونی عمل کی وجہ سے سورج سے حاصل کرنے سے زیادہ حرارت خارج کرتا ہے۔'
    },
    moonsAndRingsDetail: {
      en: 'Saturn has more than 140 known moons. The largest is Titan, which has a thick atmosphere and liquid methane lakes. Enceladus has geysers that spray water ice into space. Saturn\'s rings are the most visible in the Solar System, made of billions of ice particles.',
      ur: 'زحل کے ۱۴۰ سے زیادہ معلوم چاند ہیں۔ سب سے بڑا ٹائٹن ہے جس کی گھنی فضا اور مائع میتھین کی جھیلیں ہیں۔ اینسیلاڈس کے آب فشیں ہیں جو پانی کی برف خلا میں چھڑکتی ہیں۔ زحل کے حلقے نظامِ شمسی میں سب سے نمایاں ہیں، جو اربوں برف کے ذرات سے بنے ہیں۔'
    },
    seasonsSection: {
      en: 'Saturn has an axial tilt of about 27 degrees, similar to Earth and Mars, so it has seasons. However, since Saturn\'s year is about 29 Earth years, each season lasts more than 7 Earth years.',
      ur: 'زحل کا محوری جھکاؤ تقریباً ۲۷ ڈگری ہے، جو زمین اور مریخ سے ملتا جلتا ہے، اس لیے اس پر موسم بدلتے ہیں۔ البتہ چونکہ زحل کا سال تقریباً ۲۹ زمینی سال ہے، ہر موسم ۷ زمینی سال سے زیادہ رہتا ہے۔'
    },
    habitability: {
      en: 'Humans cannot live on Saturn. It has no solid surface, extreme pressures, cold temperatures and an atmosphere of hydrogen and helium. Some of its moons, like Titan, are studied for future exploration. A future protected research habitat is a topic of study, but it is not a place where people can currently live naturally.',
      ur: 'انسان زحل پر نہیں رہ سکتے۔ اس کی کوئی ٹھوس سطح نہیں، انتہائی دباؤ، سرد درجہ حرارت اور ہائیڈروجن اور ہیلیم کی فضا ہے۔ اس کے کچھ چاند، جیسے ٹائٹن، مستقبل کی دریافت کے لیے مطالعہ کیے جاتے ہیں۔ کچھ دنیاؤں پر مستقبل کی محفوظ تحقیقی رہائش گاہ کا مطالعہ کیا جاتا ہے، لیکن انسان وہاں اس وقت قدرتی طور پر نہیں رہ سکتے۔'
    },
    missions: [
      { name: 'Pioneer 11', type: { en: 'Flyby', ur: 'پرواز' }, year: '1979' },
      { name: 'Voyager 1 & 2', type: { en: 'Flyby', ur: 'پرواز' }, year: '1980-1981' },
      { name: 'Cassini-Huygens', type: { en: 'Orbiter/Lander', ur: 'مدار گرد/لینڈر' }, year: '2004-2017' }
    ],
    funFacts: [
      { en: 'Saturn is famous for its bright ring system.', ur: 'زحل اپنے روشن حلقوں کے نظام کی وجہ سے مشہور ہے۔' },
      { en: 'Saturn has more than 140 known moons.', ur: 'زحل کے ۱۴۰ سے زیادہ معلوم چاند ہیں۔' },
      { en: 'Saturn would float in water because it is less dense than water.', ur: 'زحل پانی پر تیر سکتا ہے کیونکہ یہ پانی سے کم کثیف ہے۔' },
      { en: 'Saturn\'s moon Titan has a thick atmosphere.', ur: 'زحل کے چاند ٹائٹن کی گھنی فضا ہے۔' },
      { en: 'Saturn\'s rings are made mostly of ice particles.', ur: 'زحل کے حلقے زیادہ تر برف کے ذرات سے بنے ہیں۔' },
      { en: 'Saturn is the second largest planet.', ur: 'زحل دوسرا سب سے بڑا سیارہ ہے۔' },
      { en: 'Saturn\'s moon Enceladus has geysers spraying water ice.', ur: 'زحل کے چاند اینسیلاڈس کی آب فشیں پانی کی برف چھڑکتی ہیں۔' },
      { en: 'Saturn has the lowest density of all planets.', ur: 'زحل کی کثافت تمام سیاروں میں سب سے کم ہے۔' },
      { en: 'Winds on Saturn can reach 1,800 km/h.', ur: 'زحل پر ہوائیں ۱،۸۰۰ کلومیٹر فی گھنٹہ تک پہنچ سکتی ہیں۔' },
      { en: 'A year on Saturn is about 29.5 Earth years.', ur: 'زحل پر ایک سال تقریباً ۲۹.۵ زمینی سال ہے۔' }
    ],
    quiz: [
      { question: { en: 'What is Saturn famous for?', ur: 'زحل کس لیے مشہور ہے؟' }, options: [{ en: 'Its red color', ur: 'اس کے سرخ رنگ' }, { en: 'Its bright ring system', ur: 'اس کے روشن حلقوں کا نظام' }, { en: 'Being the largest', ur: 'سب سے بڑا ہونے' }, { en: 'Having life', ur: 'زندگی ہونے' }], correct: 1, explanation: { en: 'Saturn is famous for its bright rings.', ur: 'زحل اپنے روشن حلقوں کی وجہ سے مشہور ہے۔' } },
      { question: { en: 'What type of planet is Saturn?', ur: 'زحل کس قسم کا سیارہ ہے؟' }, options: [{ en: 'Rocky', ur: 'پتھریلا' }, { en: 'Gas giant', ur: 'گیس دیو' }, { en: 'Ice giant', ur: 'برفانی دیو' }, { en: 'Dwarf', ur: 'بونا' }], correct: 1, explanation: { en: 'Saturn is a gas giant.', ur: 'زحل ایک گیس دیو ہے۔' } },
      { question: { en: 'What are Saturn\'s rings mostly made of?', ur: 'زحل کے حلقے زیادہ تر کس سے بنے ہیں؟' }, options: [{ en: 'Gas', ur: 'گیس' }, { en: 'Ice particles', ur: 'برف کے ذرات' }, { en: 'Rock only', ur: 'صرف چٹان' }, { en: 'Metal', ur: 'دھات' }], correct: 1, explanation: { en: 'Saturn\'s rings are mostly ice particles.', ur: 'زحل کے حلقے زیادہ تر برف کے ذرات ہیں۔' } },
      { question: { en: 'What is Saturn\'s largest moon?', ur: 'زحل کا سب سے بڑا چاند کون سا ہے؟' }, options: [{ en: 'Enceladus', ur: 'اینسیلاڈس' }, { en: 'Titan', ur: 'ٹائٹن' }, { en: 'Rhea', ur: 'ریا' }, { en: 'Dione', ur: 'ڈیونی' }], correct: 1, explanation: { en: 'Titan is Saturn\'s largest moon.', ur: 'ٹائٹن زحل کا سب سے بڑا چاند ہے۔' } },
      { question: { en: 'Would Saturn float in water?', ur: 'کیا زحل پانی پر تیر سکتا ہے؟' }, options: [{ en: 'No, it would sink', ur: 'نہیں، یہ ڈوب جائے گا' }, { en: 'Yes, it is less dense than water', ur: 'ہاں، یہ پانی سے کم کثیف ہے' }, { en: 'Only if heated', ur: 'صرف گرم کرنے پر' }, { en: 'Only its rings float', ur: 'صرف اس کے حلقے تیرتے ہیں' }], correct: 1, explanation: { en: 'Saturn is less dense than water.', ur: 'زحل پانی سے کم کثیف ہے۔' } },
      { question: { en: 'How many known moons does Saturn have?', ur: 'زحل کے کتنے معلوم چاند ہیں؟' }, options: [{ en: '2', ur: '۲' }, { en: '53', ur: '۵۳' }, { en: '95', ur: '۹۵' }, { en: 'More than 140', ur: '۱۴۰ سے زیادہ' }], correct: 3, explanation: { en: 'Saturn has more than 140 known moons.', ur: 'زحل کے ۱۴۰ سے زیادہ معلوم چاند ہیں۔' } },
      { question: { en: 'What is Saturn\'s diameter?', ur: 'زحل کا قطر کیا ہے؟' }, options: [{ en: '51,118 km', ur: '۵۱،۱۱۸ کلومیٹر' }, { en: '120,536 km', ur: '۱۲۰،۵۳۶ کلومیٹر' }, { en: '142,984 km', ur: '۱۴۲،۹۸۴ کلومیٹر' }, { en: '49,528 km', ur: '۴۹،۵۲۸ کلومیٹر' }], correct: 1, explanation: { en: 'Saturn\'s diameter is 120,536 km.', ur: 'زحل کا قطر ۱۲۰،۵۳۶ کلومیٹر ہے۔' } },
      { question: { en: 'How long is a year on Saturn?', ur: 'زحل پر ایک سال کتنا لمبا ہے؟' }, options: [{ en: 'About 12 years', ur: 'تقریباً ۱۲ سال' }, { en: 'About 29.5 years', ur: 'تقریباً ۲۹.۵ سال' }, { en: 'About 84 years', ur: 'تقریباً ۸۴ سال' }, { en: 'About 165 years', ur: 'تقریباً ۱۶۵ سال' }], correct: 1, explanation: { en: 'A year on Saturn is about 29.45 Earth years.', ur: 'زحل پر ایک سال تقریباً ۲۹.۴۵ زمینی سال ہے۔' } },
      { question: { en: 'Which spacecraft orbited Saturn?', ur: 'کس خلائی جہاز نے زحل کا مدار لگایا؟' }, options: [{ en: 'Voyager', ur: 'وایجئر' }, { en: 'Juno', ur: 'جونو' }, { en: 'Cassini-Huygens', ur: 'کاسینی-ہائیگنز' }, { en: 'New Horizons', ur: 'نیو ہورائزنز' }], correct: 2, explanation: { en: 'Cassini-Huygens orbited Saturn from 2004 to 2017.', ur: 'کاسینی-ہائیگنز نے ۲۰۰۴ سے ۲۰۱۷ تک زحل کا مدار لگایا۔' } },
      { question: { en: 'What is Saturn\'s average temperature?', ur: 'زحل کا اوسط درجہ حرارت کیا ہے؟' }, options: [{ en: 'About 15°C', ur: 'تقریباً ۱۵°C' }, { en: 'About -110°C', ur: 'تقریباً منفی ۱۱۰°C' }, { en: 'About -140°C', ur: 'تقریباً منفی ۱۴۰°C' }, { en: 'About -195°C', ur: 'تقریباً منفی ۱۹۵°C' }], correct: 2, explanation: { en: 'Saturn\'s average temperature is about -140°C.', ur: 'زحل کا اوسط درجہ حرارت تقریباً منفی ۱۴۰°C ہے۔' } },
      { question: { en: 'What is Saturn\'s position from the Sun?', ur: 'سورج سے زحل کا نمبر کیا ہے؟' }, options: [{ en: 'Fourth', ur: 'چوتھا' }, { en: 'Fifth', ur: 'پانچواں' }, { en: 'Sixth', ur: 'چھٹا' }, { en: 'Seventh', ur: 'ساتواں' }], correct: 2, explanation: { en: 'Saturn is the sixth planet from the Sun.', ur: 'زحل سورج سے چھٹا سیارہ ہے۔' } },
      { question: { en: 'Which moon of Saturn has lakes of liquid methane?', ur: 'زحل کے کس چاند پر مائع میتھین کی جھیلیں ہیں؟' }, options: [{ en: 'Enceladus', ur: 'اینسیلاڈس' }, { en: 'Titan', ur: 'ٹائٹن' }, { en: 'Rhea', ur: 'ریا' }, { en: 'Mimas', ur: 'میماس' }], correct: 1, explanation: { en: 'Titan has lakes of liquid methane.', ur: 'ٹائٹن پر مائع میتھین کی جھیلیں ہیں۔' } },
      { question: { en: 'What is Saturn mostly made of?', ur: 'زحل زیادہ تر کس سے بنا ہے؟' }, options: [{ en: 'Rock', ur: 'چٹان' }, { en: 'Hydrogen and helium', ur: 'ہائیڈروجن اور ہیلیم' }, { en: 'Ice only', ur: 'صرف برف' }, { en: 'Iron', ur: 'لوہا' }], correct: 1, explanation: { en: 'Saturn is mostly hydrogen and helium.', ur: 'زحل زیادہ تر ہائیڈروجن اور ہیلیم ہے۔' } },
      { question: { en: 'How long is a day on Saturn?', ur: 'زحل پر ایک دن کتنا لمبا ہے؟' }, options: [{ en: '24 hours', ur: '۲۴ گھنٹے' }, { en: 'About 10.7 hours', ur: 'تقریباً ۱۰.۷ گھنٹے' }, { en: 'About 17 hours', ur: 'تقریباً ۱۷ گھنٹے' }, { en: 'About 16 hours', ur: 'تقریباً ۱۶ گھنٹے' }], correct: 1, explanation: { en: 'A day on Saturn is about 10.7 hours.', ur: 'زحل پر ایک دن تقریباً ۱۰.۷ گھنٹے ہے۔' } },
      { question: { en: 'Can humans live on Saturn?', ur: 'کیا انسان زحل پر رہ سکتے ہیں؟' }, options: [{ en: 'Yes, on the surface', ur: 'ہاں، سطح پر' }, { en: 'Only on Titan', ur: 'صرف ٹائٹن پر' }, { en: 'No, no solid surface', ur: 'نہیں، کوئی ٹھوس سطح نہیں' }, { en: 'Only in the rings', ur: 'صرف حلقوں میں' }], correct: 2, explanation: { en: 'Saturn has no solid surface.', ur: 'زحل کی کوئی ٹھوس سطح نہیں ہے۔' } }
    ],
    axisTilt: '26.7 degrees',
    namedMoons: ['Titan / ٹائٹن', 'Enceladus / اینسیلاڈس', 'Rhea / ریا', 'Dione / ڈیونی']
  },

  uranus: {
    id: 'uranus',
    type: { en: 'Ice giant', ur: 'برفانی دیو' },
    diameter: '51,118 km',
    avgDistance: '2,871 million km',
    dayLength: 'About 17.2 hours',
    yearLength: 'About 84 Earth years',
    avgTemp: 'About -195°C',
    gravity: '0.89 Earth gravity',
    moons: '28',
    rings: { en: 'Yes, faint rings', ur: 'ہاں، مدھم حلقے' },
    coreDescription: {
      en: 'Uranus is an ice giant. It appears blue-green because methane in its atmosphere absorbs red light. Uranus has an extreme axial tilt of about 98 degrees, so it appears to rotate on its side. It has faint rings and many moons.',
      ur: 'یورینس ایک برفانی دیو سیارہ ہے۔ اس کی فضا میں میتھین سرخ روشنی کو جذب کرتی ہے، اس لیے یہ نیلا سبز دکھائی دیتا ہے۔ یورینس کا محوری جھکاؤ تقریباً ۹۸ درجے ہے، اس لیے یہ پہلو کے بل گھومتا ہوا دکھائی دیتا ہے۔ اس کے مدھم حلقے اور بہت سے چاند ہیں۔'
    },
    detailedDescription: {
      en: 'Uranus is the seventh planet from the Sun and the third largest. It is called an ice giant because it has a lot of water, methane and ammonia ices in its interior. Its extreme tilt means its poles get more sunlight than its equator during parts of its year.',
      ur: 'یورینس سورج سے ساتواں اور تیسرا سب سے بڑا سیارہ ہے۔ اسے برفانی دیو کہا جاتا ہے کیونکہ اس کے اندر بہت زیادہ پانی، میتھین اور امونیا کی برف ہے۔ اس کا انتہائی جھکاؤ اس بات کا مطلب ہے کہ اس کے سال کے کچھ حصوں میں اس کے قطبین کو خط استوا سے زیادہ روشنی ملتی ہے۔'
    },
    surfaceSection: {
      en: 'Uranus does not have a solid surface. Below its atmosphere of hydrogen, helium and methane lies a deep mantle of water, ammonia and methane ices. At the center is a small rocky core.',
      ur: 'یورینس کی کوئی ٹھوس سطح نہیں ہے۔ ہائیڈروجن، ہیلیم اور میتھین کی فضا کے نیچے پانی، امونیا اور میتھین کی برف کی گہری رداء ہے۔ مرکز میں ایک چھوٹا پتھریلا مرکزہ ہے۔'
    },
    atmosphereSection: {
      en: 'Uranus\'s atmosphere is about 83% hydrogen, 15% helium and 2% methane. The methane absorbs red light, giving Uranus its blue-green color. Winds can reach about 900 km/h.',
      ur: 'یورینس کی فضا تقریباً ۸۳% ہائیڈروجن، ۱۵% ہیلیم اور ۲% میتھین پر مشتمل ہے۔ میتھین سرخ روشنی جذب کرتی ہے، جس سے یورینس نیلا سبز دکھائی دیتا ہے۔ ہوائیں تقریباً ۹۰۰ کلومیٹر فی گھنٹہ تک پہنچ سکتی ہیں۔'
    },
    temperatureExplanation: {
      en: 'The average temperature is about -195°C, making Uranus one of the coldest planets. It is far from the Sun and has little internal heat compared to Jupiter and Saturn.',
      ur: 'اوسط درجہ حرارت تقریباً منفی ۱۹۵°C ہے، جو یورینس کو سرد ترین سیاروں میں سے ایک بناتا ہے۔ یہ سورج سے دور ہے اور مشتری اور زحل کے مقابلے میں اس کی اندرونی حرارت کم ہے۔'
    },
    moonsAndRingsDetail: {
      en: 'Uranus has 28 known moons, named after characters from Shakespeare and Alexander Pope. The largest are Titania, Oberon, Ariel, Umbriel and Miranda. Uranus has 13 known faint rings made of dark particles.',
      ur: 'یورینس کے ۲۸ معلوم چاند ہیں، جن کے نام شیکسپیئر اور الیگزینڈر پوپ کے کرداروں پر رکھے گئے ہیں۔ سب سے بڑے ٹائٹانیا، اوبیرون، ایریئل، امبریئل اور مرانڈا ہیں۔ یورینس کے ۱۳ معلوم مدھم حلقے ہیں جو تاریک ذرات سے بنے ہیں۔'
    },
    seasonsSection: {
      en: 'Uranus has an extreme axial tilt of about 98 degrees, so it essentially rotates on its side. This creates extreme seasons where each pole gets about 42 years of continuous sunlight followed by 42 years of darkness.',
      ur: 'یورینس کا محوری جھکاؤ تقریباً ۹۸ درجے ہے، اس لیے یہ بنیادی طور پر پہلو کے بل گھومتا ہے۔ اس سے انتہائی موسم بنتے ہیں جہاں ہر قطب کو تقریباً ۴۲ سال مسلسل روشنی اور پھر ۴۲ سال اندھیرا ملتا ہے۔'
    },
    habitability: {
      en: 'Humans cannot live on Uranus. It has no solid surface, extreme cold, high pressures and an atmosphere of hydrogen, helium and methane. A future protected research habitat is a topic of study, but it is not a place where people can currently live naturally.',
      ur: 'انسان یورینس پر نہیں رہ سکتے۔ اس کی کوئی ٹھوس سطح نہیں، انتہائی سردی، زیادہ دباؤ اور ہائیڈروجن، ہیلیم اور میتھین کی فضا ہے۔ کچھ دنیاؤں پر مستقبل کی محفوظ تحقیقی رہائش گاہ کا مطالعہ کیا جاتا ہے، لیکن انسان وہاں اس وقت قدرتی طور پر نہیں رہ سکتے۔'
    },
    missions: [
      { name: 'Voyager 2', type: { en: 'Flyby', ur: 'پرواز' }, year: '1986' }
    ],
    funFacts: [
      { en: 'Uranus rotates on its side with a 98-degree tilt.', ur: 'یورینس ۹۸ ڈگری کے جھکاؤ کے ساتھ پہلو کے بل گھومتا ہے۔' },
      { en: 'Uranus is an ice giant.', ur: 'یورینس ایک برفانی دیو ہے۔' },
      { en: 'Methane gives Uranus its blue-green color.', ur: 'میتھین یورینس کو نیلا سبز رنگ دیتی ہے۔' },
      { en: 'Uranus has 28 known moons.', ur: 'یورینس کے ۲۸ معلوم چاند ہیں۔' },
      { en: 'Uranus has 13 known faint rings.', ur: 'یورینس کے ۱۳ معلوم مدھم حلقے ہیں۔' },
      { en: 'Uranus was the first planet discovered with a telescope.', ur: 'یورینس دوربین سے دریافت ہونے والا پہلا سیارہ تھا۔' },
      { en: 'Each pole of Uranus gets 42 years of sunlight.', ur: 'یورینس کے ہر قطب کو ۴۲ سال کی روشنی ملتی ہے۔' },
      { en: 'Uranus is the third largest planet.', ur: 'یورینس تیسرا سب سے بڑا سیارہ ہے۔' },
      { en: 'Uranus has the coldest atmosphere of any planet.', ur: 'یورینس کی فضا کسی بھی سیارے کی سب سے سرد ہے۔' },
      { en: 'Uranus\'s moons are named after literary characters.', ur: 'یورینس کے چاندوں کے نام ادبی کرداروں پر ہیں۔' }
    ],
    quiz: [
      { question: { en: 'What type of planet is Uranus?', ur: 'یورینس کس قسم کا سیارہ ہے؟' }, options: [{ en: 'Rocky', ur: 'پتھریلا' }, { en: 'Gas giant', ur: 'گیس دیو' }, { en: 'Ice giant', ur: 'برفانی دیو' }, { en: 'Dwarf', ur: 'بونا' }], correct: 2, explanation: { en: 'Uranus is an ice giant.', ur: 'یورینس ایک برفانی دیو ہے۔' } },
      { question: { en: 'What gives Uranus its blue-green color?', ur: 'یورینس کو نیلا سبز رنگ کیا دیتا ہے؟' }, options: [{ en: 'Oxygen', ur: 'آکسیجن' }, { en: 'Methane', ur: 'میتھین' }, { en: 'Water', ur: 'پانی' }, { en: 'Iron', ur: 'لوہا' }], correct: 1, explanation: { en: 'Methane absorbs red light, giving blue-green color.', ur: 'میتھین سرخ روشنی جذب کرتی ہے، نیلا سبز رنگ دیتی ہے۔' } },
      { question: { en: 'What is special about Uranus\'s rotation?', ur: 'یورینس کی گردش میں کیا خاص ہے؟' }, options: [{ en: 'It is the fastest', ur: 'یہ سب سے تیز ہے' }, { en: 'It rotates on its side (98° tilt)', ur: 'یہ پہلو کے بل گھومتا ہے (۹۸° جھکاؤ)' }, { en: 'It does not rotate', ur: 'یہ نہیں گھومتا' }, { en: 'It rotates backwards', ur: 'یہ الٹی سمت گھومتا ہے' }], correct: 1, explanation: { en: 'Uranus has a 98-degree axial tilt.', ur: 'یورینس کا محوری جھکاؤ ۹۸ ڈگری ہے۔' } },
      { question: { en: 'How many moons does Uranus have?', ur: 'یورینس کے کتنے چاند ہیں؟' }, options: [{ en: '0', ur: '۰' }, { en: '16', ur: '۱۶' }, { en: '28', ur: '۲۸' }, { en: '95', ur: '۹۵' }], correct: 2, explanation: { en: 'Uranus has 28 known moons.', ur: 'یورینس کے ۲۸ معلوم چاند ہیں۔' } },
      { question: { en: 'What is Uranus\'s average temperature?', ur: 'یورینس کا اوسط درجہ حرارت کیا ہے؟' }, options: [{ en: 'About -65°C', ur: 'تقریباً منفی ۶۵°C' }, { en: 'About -110°C', ur: 'تقریباً منفی ۱۱۰°C' }, { en: 'About -140°C', ur: 'تقریباً منفی ۱۴۰°C' }, { en: 'About -195°C', ur: 'تقریباً منفی ۱۹۵°C' }], correct: 3, explanation: { en: 'Uranus\'s average temperature is about -195°C.', ur: 'یورینس کا اوسط درجہ حرارت تقریباً منفی ۱۹۵°C ہے۔' } },
      { question: { en: 'How long is a year on Uranus?', ur: 'یورینس پر ایک سال کتنا لمبا ہے؟' }, options: [{ en: 'About 12 years', ur: 'تقریباً ۱۲ سال' }, { en: 'About 29 years', ur: 'تقریباً ۲۹ سال' }, { en: 'About 84 years', ur: 'تقریباً ۸۴ سال' }, { en: 'About 165 years', ur: 'تقریباً ۱۶۵ سال' }], correct: 2, explanation: { en: 'A year on Uranus is about 84 Earth years.', ur: 'یورینس پر ایک سال تقریباً ۸۴ زمینی سال ہے۔' } },
      { question: { en: 'Which spacecraft visited Uranus?', ur: 'کس خلائی جہاز نے یورینس کا دورہ کیا؟' }, options: [{ en: 'Voyager 1', ur: 'وایجئر ۱' }, { en: 'Voyager 2', ur: 'وایجئر ۲' }, { en: 'Cassini', ur: 'کاسینی' }, { en: 'Juno', ur: 'جونو' }], correct: 1, explanation: { en: 'Voyager 2 flew by Uranus in 1986.', ur: 'وایجئر ۲ نے ۱۹۸۶ میں یورینس کا دورہ کیا۔' } },
      { question: { en: 'What is Uranus\'s diameter?', ur: 'یورینس کا قطر کیا ہے؟' }, options: [{ en: '49,528 km', ur: '۴۹،۵۲۸ کلومیٹر' }, { en: '51,118 km', ur: '۵۱،۱۱۸ کلومیٹر' }, { en: '120,536 km', ur: '۱۲۰،۵۳۶ کلومیٹر' }, { en: '12,756 km', ur: '۱۲،۷۵۶ کلومیٹر' }], correct: 1, explanation: { en: 'Uranus\'s diameter is 51,118 km.', ur: 'یورینس کا قطر ۵۱،۱۱۸ کلومیٹر ہے۔' } },
      { question: { en: 'Does Uranus have rings?', ur: 'کیا یورینس کے حلقے ہیں؟' }, options: [{ en: 'No rings', ur: 'کوئی حلقے نہیں' }, { en: 'Yes, bright rings like Saturn', ur: 'ہاں، زحل جیسے روشن حلقے' }, { en: 'Yes, faint rings', ur: 'ہاں، مدھم حلقے' }, { en: 'Only during eclipse', ur: 'صرف گرہن کے دوران' }], correct: 2, explanation: { en: 'Uranus has 13 known faint rings.', ur: 'یورینس کے ۱۳ معلوم مدھم حلقے ہیں۔' } },
      { question: { en: 'What is Uranus\'s position from the Sun?', ur: 'سورج سے یورینس کا نمبر کیا ہے؟' }, options: [{ en: 'Fifth', ur: 'پانچواں' }, { en: 'Sixth', ur: 'چھٹا' }, { en: 'Seventh', ur: 'ساتواں' }, { en: 'Eighth', ur: 'آٹھواں' }], correct: 2, explanation: { en: 'Uranus is the seventh planet from the Sun.', ur: 'یورینس سورج سے ساتواں سیارہ ہے۔' } },
      { question: { en: 'How long is a day on Uranus?', ur: 'یورینس پر ایک دن کتنا لمبا ہے؟' }, options: [{ en: 'About 10 hours', ur: 'تقریباً ۱۰ گھنٹے' }, { en: 'About 17.2 hours', ur: 'تقریباً ۱۷.۲ گھنٹے' }, { en: 'About 24 hours', ur: 'تقریباً ۲۴ گھنٹے' }, { en: 'About 16 hours', ur: 'تقریباً ۱۶ گھنٹے' }], correct: 1, explanation: { en: 'A day on Uranus is about 17.2 hours.', ur: 'یورینس پر ایک دن تقریباً ۱۷.۲ گھنٹے ہے۔' } },
      { question: { en: 'What is Uranus mostly made of inside?', ur: 'یورینس اندر سے زیادہ تر کس سے بنا ہے؟' }, options: [{ en: 'Solid rock', ur: 'ٹھوس چٹان' }, { en: 'Water, methane and ammonia ices', ur: 'پانی، میتھین اور امونیا کی برف' }, { en: 'Pure hydrogen', ur: 'خالص ہائیڈروجن' }, { en: 'Iron core only', ur: 'صرف لوہے کا مرکز' }], correct: 1, explanation: { en: 'Uranus has water, methane and ammonia ices.', ur: 'یورینس میں پانی، میتھین اور امونیا کی برف ہے۔' } },
      { question: { en: 'What was unique about Uranus\'s discovery?', ur: 'یورینس کی دریافت میں کیا منفرد تھا؟' }, options: [{ en: 'Found by astronauts', ur: 'خلا بازوں نے دریافت کیا' }, { en: 'First planet found with a telescope', ur: 'دوربین سے دریافت ہونے والا پہلا سیارہ' }, { en: 'Found by accident', ur: 'حادثاتی طور پر ملا' }, { en: 'Found by robots', ur: 'روبوٹس نے دریافت کیا' }], correct: 1, explanation: { en: 'Uranus was the first planet discovered with a telescope.', ur: 'یورینس دوربین سے دریافت ہونے والا پہلا سیارہ تھا۔' } },
      { question: { en: 'What are Uranus\'s moons named after?', ur: 'یورینس کے چاندوں کے نام کس پر ہیں؟' }, options: [{ en: 'Greek gods', ur: 'یونانی دیوتا' }, { en: 'Literary characters', ur: 'ادبی کردار' }, { en: 'Roman emperors', ur: 'رومن شہنشاہ' }, { en: 'Scientists', ur: 'سائنسدان' }], correct: 1, explanation: { en: 'Uranus\'s moons are named after literary characters.', ur: 'یورینس کے چاندوں کے نام ادبی کرداروں پر ہیں۔' } },
      { question: { en: 'Can humans live on Uranus?', ur: 'کیا انسان یورینس پر رہ سکتے ہیں؟' }, options: [{ en: 'Yes', ur: 'ہاں' }, { en: 'Only in summer', ur: 'صرف گرمیوں میں' }, { en: 'No, extreme conditions', ur: 'نہیں، انتہائی حالات' }, { en: 'Only on its moons', ur: 'صرف اس کے چاندوں پر' }], correct: 2, explanation: { en: 'Uranus has no solid surface and extreme cold.', ur: 'یورینس کی کوئی ٹھوس سطح نہیں اور انتہائی سردی ہے۔' } }
    ],
    axisTilt: '97.8 degrees',
    namedMoons: ['Titania / ٹائٹانیا', 'Oberon / اوبیرون', 'Ariel / ایریئل', 'Umbriel / امبریئل', 'Miranda / مرانڈا']
  },

  neptune: {
    id: 'neptune',
    type: { en: 'Ice giant', ur: 'برفانی دیو' },
    diameter: '49,528 km',
    avgDistance: '4,495 million km',
    dayLength: 'About 16.1 hours',
    yearLength: 'About 164.8 Earth years',
    avgTemp: 'About -200°C',
    gravity: '1.14 Earth gravity',
    moons: '16',
    rings: { en: 'Yes, faint rings', ur: 'ہاں، مدھم حلقے' },
    coreDescription: {
      en: 'Neptune is the farthest major planet from the Sun. It is an ice giant with a deep blue appearance and extremely fast winds. It has faint rings and several moons. Neptune takes almost 165 Earth years to complete one orbit around the Sun.',
      ur: 'نیپچون سورج سے سب سے دور بڑا سیارہ ہے۔ یہ ایک برفانی دیو ہے جس کا رنگ گہرا نیلا دکھائی دیتا ہے اور اس کی فضا میں انتہائی تیز ہوائیں چلتی ہیں۔ اس کے مدھم حلقے اور کئی چاند ہیں۔ نیپچون کو سورج کے گرد ایک چکر مکمل کرنے میں تقریباً 165 زمینی سال لگتے ہیں۔'
    },
    detailedDescription: {
      en: 'Neptune is the eighth and farthest major planet from the Sun. It was the first planet found by mathematical prediction rather than observation. Neptune has the strongest winds in the Solar System, reaching speeds of about 2,100 km/h.',
      ur: 'نیپچون سورج سے آٹھواں اور سب سے دور بڑا سیارہ ہے۔ یہ مشاہدے کے بجائے ریاضیاتی پیشگوئی سے دریافت ہونے والا پہلا سیارہ تھا۔ نیپچون پر نظامِ شمسی کی سب سے تیز ہوائیں چلتی ہیں، جن کی رفتار تقریباً ۲،۱۰۰ کلومیٹر فی گھنٹہ تک پہنچتی ہے۔'
    },
    surfaceSection: {
      en: 'Neptune does not have a solid surface. Like Uranus, it has a deep atmosphere of hydrogen, helium and methane overlying a mantle of water, ammonia and methane ices, with a small rocky core at the center.',
      ur: 'نیپچون کی کوئی ٹھوس سطح نہیں ہے۔ یورینس کی طرح، اس کی ہائیڈروجن، ہیلیم اور میتھین کی گہری فضا ہے جو پانی، امونیا اور میتھین کی برف کی رداء پر ہے، اور مرکز میں ایک چھوٹا پتھریلا مرکزہ ہے۔'
    },
    atmosphereSection: {
      en: 'Neptune\'s atmosphere is about 80% hydrogen, 19% helium and 1% methane. The methane gives it a deep blue color, deeper than Uranus. Neptune has the fastest winds in the Solar System, up to about 2,100 km/h.',
      ur: 'نیپچون کی فضا تقریباً ۸۰% ہائیڈروجن، ۱۹% ہیلیم اور ۱% میتھین پر مشتمل ہے۔ میتھین اسے گہرا نیلا رنگ دیتی ہے، یورینس سے گہرا۔ نیپچون پر نظامِ شمسی کی سب سے تیز ہوائیں چلتی ہیں، تقریباً ۲،۱۰۰ کلومیٹر فی گھنٹہ تک۔'
    },
    temperatureExplanation: {
      en: 'The average temperature is about -200°C, making Neptune one of the coldest planets. Despite being far from the Sun, Neptune radiates more heat than it receives, suggesting internal heat sources.',
      ur: 'اوسط درجہ حرارت تقریباً منفی ۲۰۰°C ہے، جو نیپچون کو سرد ترین سیاروں میں سے ایک بناتا ہے۔ سورج سے دور ہونے کے باوجود، نیپچون حاصل کرنے سے زیادہ حرارت خارج کرتا ہے، جو اندرونی حرارت کے ذرائع کی نشاندہی کرتا ہے۔'
    },
    moonsAndRingsDetail: {
      en: 'Neptune has 16 known moons. The largest is Triton, which orbits backwards (retrograde) and may be a captured Kuiper Belt object. Triton has geysers that spray nitrogen gas. Neptune has 5 known faint rings.',
      ur: 'نیپچون کے ۱۶ معلوم چاند ہیں۔ سب سے بڑا ٹرائٹن ہے جو الٹی سمت (retrograde) میں گردش کرتا ہے اور شاید ایک پکڑا ہوا کائپر بیلٹ جسم ہے۔ ٹرائٹن پر نائٹروجن گیس چھڑکنے والی آب فشیں ہیں۔ نیپچون کے ۵ معلوم مدھم حلقے ہیں۔'
    },
    seasonsSection: {
      en: 'Neptune has an axial tilt of about 28 degrees, similar to Earth and Mars, so it has seasons. Since its year is about 165 Earth years, each season lasts about 40 Earth years.',
      ur: 'نیپچون کا محوری جھکاؤ تقریباً ۲۸ ڈگری ہے، جو زمین اور مریخ سے ملتا جلتا ہے، اس لیے اس پر موسم بدلتے ہیں۔ چونکہ اس کا سال تقریباً ۱۶۵ زمینی سال ہے، ہر موسم تقریباً ۴۰ زمینی سال رہتا ہے۔'
    },
    habitability: {
      en: 'Humans cannot live on Neptune. It has no solid surface, extreme cold, extreme winds and an atmosphere of hydrogen, helium and methane. A future protected research habitat is a topic of study, but it is not a place where people can currently live naturally.',
      ur: 'انسان نیپچون پر نہیں رہ سکتے۔ اس کی کوئی ٹھوس سطح نہیں، انتہائی سردی، انتہائی تیز ہوائیں اور ہائیڈروجن، ہیلیم اور میتھین کی فضا ہے۔ کچھ دنیاؤں پر مستقبل کی محفوظ تحقیقی رہائش گاہ کا مطالعہ کیا جاتا ہے، لیکن انسان وہاں اس وقت قدرتی طور پر نہیں رہ سکتے۔'
    },
    missions: [
      { name: 'Voyager 2', type: { en: 'Flyby', ur: 'پرواز' }, year: '1989' }
    ],
    funFacts: [
      { en: 'Neptune is the farthest major planet from the Sun.', ur: 'نیپچون سورج سے سب سے دور بڑا سیارہ ہے۔' },
      { en: 'Neptune has the fastest winds in the Solar System.', ur: 'نیپچون پر نظامِ شمسی کی سب سے تیز ہوائیں ہیں۔' },
      { en: 'Neptune was found by mathematical prediction.', ur: 'نیپچون ریاضیاتی پیشگوئی سے دریافت ہوا۔' },
      { en: 'A year on Neptune is about 165 Earth years.', ur: 'نیپچون پر ایک سال تقریباً ۱۶۵ زمینی سال ہے۔' },
      { en: 'Neptune is an ice giant with deep blue color.', ur: 'نیپچون گہرے نیلے رنگ کا برفانی دیو ہے۔' },
      { en: 'Neptune\'s moon Triton orbits backwards.', ur: 'نیپچون کا چاند ٹرائٹن الٹی سمت گردش کرتا ہے۔' },
      { en: 'Neptune has 16 known moons.', ur: 'نیپچون کے ۱۶ معلوم چاند ہیں۔' },
      { en: 'Neptune has 5 known faint rings.', ur: 'نیپچون کے ۵ معلوم مدھم حلقے ہیں۔' },
      { en: 'Winds on Neptune can reach 2,100 km/h.', ur: 'نیپچون پر ہوائیں ۲،۱۰۰ کلومیٹر فی گھنٹہ تک پہنچ سکتی ہیں۔' },
      { en: 'Neptune radiates more heat than it receives from the Sun.', ur: 'نیپچون سورج سے حاصل کرنے سے زیادہ حرارت خارج کرتا ہے۔' }
    ],
    quiz: [
      { question: { en: 'Which is the farthest major planet?', ur: 'سب سے دور بڑا سیارہ کون سا ہے؟' }, options: [{ en: 'Uranus', ur: 'یورینس' }, { en: 'Neptune', ur: 'نیپچون' }, { en: 'Saturn', ur: 'زحل' }, { en: 'Pluto', ur: 'پلوٹو' }], correct: 1, explanation: { en: 'Neptune is the farthest major planet.', ur: 'نیپچون سب سے دور بڑا سیارہ ہے۔' } },
      { question: { en: 'What type of planet is Neptune?', ur: 'نیپچون کس قسم کا سیارہ ہے؟' }, options: [{ en: 'Rocky', ur: 'پتھریلا' }, { en: 'Gas giant', ur: 'گیس دیو' }, { en: 'Ice giant', ur: 'برفانی دیو' }, { en: 'Dwarf', ur: 'بونا' }], correct: 2, explanation: { en: 'Neptune is an ice giant.', ur: 'نیپچون ایک برفانی دیو ہے۔' } },
      { question: { en: 'What color is Neptune?', ur: 'نیپچون کا رنگ کیا ہے؟' }, options: [{ en: 'Red', ur: 'سرخ' }, { en: 'Yellow', ur: 'پیلا' }, { en: 'Deep blue', ur: 'گہرا نیلا' }, { en: 'Green', ur: 'سبز' }], correct: 2, explanation: { en: 'Neptune has a deep blue appearance.', ur: 'نیپچون گہرا نیلا دکھائی دیتا ہے۔' } },
      { question: { en: 'How fast are winds on Neptune?', ur: 'نیپچون پر ہوائیں کتنی تیز ہیں؟' }, options: [{ en: 'About 100 km/h', ur: 'تقریباً ۱۰۰ کلومیٹر فی گھنٹہ' }, { en: 'About 900 km/h', ur: 'تقریباً ۹۰۰ کلومیٹر فی گھنٹہ' }, { en: 'About 2,100 km/h', ur: 'تقریباً ۲،۱۰۰ کلومیٹر فی گھنٹہ' }, { en: 'About 5,000 km/h', ur: 'تقریباً ۵،۰۰۰ کلومیٹر فی گھنٹہ' }], correct: 2, explanation: { en: 'Neptune has the fastest winds at about 2,100 km/h.', ur: 'نیپچون پر سب سے تیز ہوائیں تقریباً ۲،۱۰۰ کلومیٹر فی گھنٹہ ہیں۔' } },
      { question: { en: 'How many moons does Neptune have?', ur: 'نیپچون کے کتنے چاند ہیں؟' }, options: [{ en: '0', ur: '۰' }, { en: '16', ur: '۱۶' }, { en: '28', ur: '۲۸' }, { en: '95', ur: '۹۵' }], correct: 1, explanation: { en: 'Neptune has 16 known moons.', ur: 'نیپچون کے ۱۶ معلوم چاند ہیں۔' } },
      { question: { en: 'What is Neptune\'s largest moon?', ur: 'نیپچون کا سب سے بڑا چاند کون سا ہے؟' }, options: [{ en: 'Io', ur: 'آیو' }, { en: 'Titan', ur: 'ٹائٹن' }, { en: 'Triton', ur: 'ٹرائٹن' }, { en: 'Europa', ur: 'یوروپا' }], correct: 2, explanation: { en: 'Triton is Neptune\'s largest moon.', ur: 'ٹرائٹن نیپچون کا سب سے بڑا چاند ہے۔' } },
      { question: { en: 'How was Neptune discovered?', ur: 'نیپچون کیسے دریافت ہوا؟' }, options: [{ en: 'By astronauts', ur: 'خلا بازوں نے' }, { en: 'By mathematical prediction', ur: 'ریاضیاتی پیشگوئی سے' }, { en: 'By accident', ur: 'حادثاتی طور پر' }, { en: 'By telescope survey', ur: 'دوربین سروے سے' }], correct: 1, explanation: { en: 'Neptune was found by mathematical prediction.', ur: 'نیپچون ریاضیاتی پیشگوئی سے دریافت ہوا۔' } },
      { question: { en: 'How long is a year on Neptune?', ur: 'نیپچون پر ایک سال کتنا لمبا ہے؟' }, options: [{ en: 'About 12 years', ur: 'تقریباً ۱۲ سال' }, { en: 'About 29 years', ur: 'تقریباً ۲۹ سال' }, { en: 'About 84 years', ur: 'تقریباً ۸۴ سال' }, { en: 'About 165 years', ur: 'تقریباً ۱۶۵ سال' }], correct: 3, explanation: { en: 'A year on Neptune is about 164.8 Earth years.', ur: 'نیپچون پر ایک سال تقریباً ۱۶۴.۸ زمینی سال ہے۔' } },
      { question: { en: 'What is Neptune\'s average temperature?', ur: 'نیپچون کا اوسط درجہ حرارت کیا ہے؟' }, options: [{ en: 'About -110°C', ur: 'تقریباً منفی ۱۱۰°C' }, { en: 'About -140°C', ur: 'تقریباً منفی ۱۴۰°C' }, { en: 'About -195°C', ur: 'تقریباً منفی ۱۹۵°C' }, { en: 'About -200°C', ur: 'تقریباً منفی ۲۰۰°C' }], correct: 3, explanation: { en: 'Neptune\'s average temperature is about -200°C.', ur: 'نیپچون کا اوسط درجہ حرارت تقریباً منفی ۲۰۰°C ہے۔' } },
      { question: { en: 'What is Neptune\'s diameter?', ur: 'نیپچون کا قطر کیا ہے؟' }, options: [{ en: '49,528 km', ur: '۴۹،۵۲۸ کلومیٹر' }, { en: '51,118 km', ur: '۵۱،۱۱۸ کلومیٹر' }, { en: '120,536 km', ur: '۱۲۰،۵۳۶ کلومیٹر' }, { en: '12,756 km', ur: '۱۲،۷۵۶ کلومیٹر' }], correct: 0, explanation: { en: 'Neptune\'s diameter is 49,528 km.', ur: 'نیپچون کا قطر ۴۹،۵۲۸ کلومیٹر ہے۔' } },
      { question: { en: 'Does Neptune have rings?', ur: 'کیا نیپچون کے حلقے ہیں؟' }, options: [{ en: 'No rings', ur: 'کوئی حلقے نہیں' }, { en: 'Yes, bright rings', ur: 'ہاں، روشن حلقے' }, { en: 'Yes, faint rings', ur: 'ہاں، مدھم حلقے' }, { en: 'Only during eclipse', ur: 'صرف گرہن کے دوران' }], correct: 2, explanation: { en: 'Neptune has 5 known faint rings.', ur: 'نیپچون کے ۵ معلوم مدھم حلقے ہیں۔' } },
      { question: { en: 'What is Neptune\'s position from the Sun?', ur: 'سورج سے نیپچون کا نمبر کیا ہے؟' }, options: [{ en: 'Sixth', ur: 'چھٹا' }, { en: 'Seventh', ur: 'ساتواں' }, { en: 'Eighth', ur: 'آٹھواں' }, { en: 'Ninth', ur: 'نواں' }], correct: 2, explanation: { en: 'Neptune is the eighth planet from the Sun.', ur: 'نیپچون سورج سے آٹھواں سیارہ ہے۔' } },
      { question: { en: 'Which spacecraft visited Neptune?', ur: 'کس خلائی جہاز نے نیپچون کا دورہ کیا؟' }, options: [{ en: 'Voyager 1', ur: 'وایجئر ۱' }, { en: 'Voyager 2', ur: 'وایجئر ۲' }, { en: 'Cassini', ur: 'کاسینی' }, { en: 'New Horizons', ur: 'نیو ہورائزنز' }], correct: 1, explanation: { en: 'Voyager 2 flew by Neptune in 1989.', ur: 'وایجئر ۲ نے ۱۹۸۹ میں نیپچون کا دورہ کیا۔' } },
      { question: { en: 'What is special about Neptune\'s moon Triton?', ur: 'نیپچون کے چاند ٹرائٹن میں کیا خاص ہے؟' }, options: [{ en: 'It is the largest moon', ur: 'یہ سب سے بڑا چاند ہے' }, { en: 'It orbits backwards', ur: 'یہ الٹی سمت گردش کرتا ہے' }, { en: 'It has life', ur: 'اس پر زندگی ہے' }, { en: 'It is very hot', ur: 'یہ بہت گرم ہے' }], correct: 1, explanation: { en: 'Triton orbits in retrograde (backwards).', ur: 'ٹرائٹن الٹی سمت (retrograde) میں گردش کرتا ہے۔' } },
      { question: { en: 'Can humans live on Neptune?', ur: 'کیا انسان نیپچون پر رہ سکتے ہیں؟' }, options: [{ en: 'Yes', ur: 'ہاں' }, { en: 'Only in summer', ur: 'صرف گرمیوں میں' }, { en: 'No, extreme conditions', ur: 'نہیں، انتہائی حالات' }, { en: 'Only underground', ur: 'صرف زیر زمین' }], correct: 2, explanation: { en: 'Neptune has no solid surface and extreme conditions.', ur: 'نیپچون کی کوئی ٹھوس سطح نہیں اور انتہائی حالات ہیں۔' } }
    ],
    axisTilt: '28.3 degrees',
    namedMoons: ['Triton / ٹرائٹن']
  }
};
