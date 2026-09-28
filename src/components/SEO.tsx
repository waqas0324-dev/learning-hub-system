import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { planets } from '../data/planets';

const SITE_NAME = 'Solar System Learning Hub';
const SITE_URL = 'https://learning-hub-production-7bb6.up.railway.app';

const routeMeta: Record<string, { title: string; description: string; keywords: string }> = {
  '/': {
    title: 'Solar System Learning Hub | Interactive Space & Earth Science',
    description: 'Explore the Solar System, planets, Earth science, eclipses, space missions, weather, oceans, solar energy, quizzes and interactive learning tools.',
    keywords: 'solar system, planets, space science, earth science, astronomy, eclipses, NASA missions, educational games'
  },
  '/solar-system': { title: 'Solar System Explorer | Planets, Orbits & Space Learning', description: 'Explore the Solar System with interactive orbits, planet facts, NASA imagery and visual learning activities.', keywords: 'solar system explorer, planet orbits, solar system facts, astronomy' },
  '/planets': { title: 'Planets | Mercury to Neptune | Solar System Learning Hub', description: 'Learn about all eight planets with facts, comparisons, NASA imagery and interactive planet learning.', keywords: 'planets, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune' },
  '/comparison': { title: 'Planet Comparison | Size, Distance, Gravity & More', description: 'Compare the planets by size, distance from the Sun, orbital period and other scientific properties.', keywords: 'planet comparison, planet size, planet gravity, planet distance' },
  '/calculator': { title: 'Space Age & Weight Calculator | Planet Gravity Tool', description: 'Explore how your age and weight would differ on other worlds using planet gravity.', keywords: 'planet gravity calculator, age on other planets, weight on planets' },
  '/moon-sun-stars': { title: 'Moon, Sun & Stars | Space Science Learning', description: 'Learn about the Sun, Moon, stars and the objects that shape our view of the night sky.', keywords: 'Sun, Moon, stars, astronomy, space science' },
  '/eclipses': { title: 'Solar & Lunar Eclipses | Interactive Eclipse Learning', description: 'Understand solar and lunar eclipses with an interactive shadow and alignment simulation.', keywords: 'solar eclipse, lunar eclipse, eclipse simulation, eclipse science' },
  '/scientists': { title: 'Scientists & Space Missions | Astronomy History & NASA Missions', description: 'Meet scientists and mission teams behind major discoveries in astronomy and planetary exploration.', keywords: 'astronomers, space scientists, NASA missions, Galileo, Cassini, New Horizons' },
  '/earth': { title: 'Earth Explorer | Atmosphere, Oceans, Water & Climate', description: 'Explore Earth systems, atmosphere, oceans, water, climate and planetary science through visual learning.', keywords: 'Earth science, atmosphere, oceans, climate, water cycle' },
  '/oceans': { title: 'Oceans & Water Cycle | Earth Science Learning', description: 'Explore oceans, the water cycle, freshwater and the role of water in Earth systems.', keywords: 'oceans, water cycle, freshwater, earth science' },
  '/weather': { title: 'Weather & Climate | Interactive Earth Science Learning', description: 'Learn how weather and climate work through visual explanations and interactive learning content.', keywords: 'weather, climate, atmosphere, earth science' },
  '/dams': { title: 'Dams & Water Resources | Engineering & Earth Science', description: 'Learn how dams work, why reservoirs matter and how water resources are managed.', keywords: 'dams, reservoirs, water resources, engineering' },
  '/solar-energy': { title: 'Solar Energy | Photovoltaic Cells & Power Flow Simulation', description: 'See how sunlight becomes electricity through photovoltaic cells, DC current, an inverter and home loads.', keywords: 'solar energy, photovoltaic cells, solar panels, inverter, renewable energy' },
  '/quiz': { title: 'Space & Earth Science Quiz Center | Test Your Knowledge', description: 'Test your astronomy and Earth science knowledge with interactive quizzes and score tracking.', keywords: 'science quiz, astronomy quiz, space quiz, earth science quiz' },
  '/games': { title: 'Learning Games | Space & Planet Science Arcade', description: 'Play interactive educational games about planets, gravity, eclipses and space science.', keywords: 'space games, astronomy games, planet games, educational games' },
  '/glossary': { title: 'Astronomy & Earth Science Glossary', description: 'Look up clear explanations of important astronomy, planetary science and Earth science terms.', keywords: 'astronomy glossary, science glossary, planet terms' },
  '/resources': { title: 'Space Science Resources | NASA Learning & Interactive Tools', description: 'Explore curated NASA learning resources, 3D tools, mission pages, interactives and educational materials.', keywords: 'NASA resources, space education, astronomy resources, science learning' },
  '/mission-control': { title: 'Space Mission Control Center | NASA Mission Learning', description: 'Explore selected NASA planetary missions, targets, timelines and scientific goals in an interactive mission control dashboard.', keywords: 'NASA missions, space mission control, Europa Clipper, Psyche, New Horizons, Cassini, Galileo' },
  '/3d-explorer': { title: '3D Space Explorer | NASA Eyes Interactive', description: 'Explore planets, spacecraft and missions in an interactive 3D experience powered by NASA Eyes.', keywords: '3D solar system, NASA Eyes, interactive space, spacecraft simulation' },
  '/about': { title: 'About & Sources | Solar System Learning Hub', description: 'Learn about the educational purpose, sources and science references used by Solar System Learning Hub.', keywords: 'space education, NASA sources, science learning' },
  '/search': { title: 'Search Space & Earth Science Topics | Learning Hub', description: 'Search lessons, planets, missions, Earth science topics, games, quizzes and learning tools.', keywords: 'space science search, astronomy topics, science learning' }
};

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function SEO() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const planetId = pathname.startsWith('/planets/') ? pathname.split('/')[2] : '';
    const planet = planets.find(p => p.id === planetId);
      const topicMeta: Record<string, { title: string; description: string; keywords: string }> = {
      'why-is-the-sky-blue': { title: 'Why Is the Sky Blue? | Light Scattering Explained', description: 'Learn why Earth’s daytime sky looks blue and why sunsets can look red or orange.', keywords: 'why is the sky blue, Rayleigh scattering, sky color' },
      'what-is-gravity': { title: 'What Is Gravity? | Mass, Weight & Orbits Explained', description: 'Learn what gravity is, how mass and distance affect it, and why planets orbit the Sun.', keywords: 'what is gravity, gravity explained, planet gravity, orbits' },
      'how-do-moon-phases-work': { title: 'How Do Moon Phases Work? | Lunar Phases Explained', description: 'Understand new moon, quarter phases and full moon using the geometry of sunlight, Earth and the Moon.', keywords: 'moon phases, lunar phases, full moon, new moon' },
      'what-is-the-water-cycle': { title: 'What Is the Water Cycle? | Evaporation to Rain', description: 'Learn evaporation, condensation, precipitation, runoff and collection in Earth’s water cycle.', keywords: 'water cycle, evaporation, condensation, precipitation' },
      'how-do-solar-panels-work': { title: 'How Do Solar Panels Work? | PV Cells to AC Power', description: 'Learn how photovoltaic cells convert sunlight to DC electricity and how inverters supply AC power.', keywords: 'how solar panels work, photovoltaic cells, solar electricity' },
      'what-is-a-solar-eclipse': { title: 'What Is a Solar Eclipse? | Sun, Moon & Earth Alignment', description: 'Learn how the Moon blocks sunlight, how eclipse shadows work and why solar eclipses do not happen every month.', keywords: 'solar eclipse, eclipse shadow, umbra, penumbra' }
    };
    const topicSlug = pathname.startsWith('/learn/') ? pathname.split('/')[2] : '';
    const topic = topicSlug ? topicMeta[topicSlug] : undefined;

  const base = routeMeta[pathname] || {
      title: 'Space & Earth Science Learning Hub',
      description: 'Interactive learning resources for astronomy, planetary science and Earth science.',
      keywords: 'space science, astronomy, earth science, learning'
    };

    const meta = topic
      ? topic
      : planet
      ? {
          title: `${planet.name.en} | Planet Facts, Images & Interactive Learning`,
          description: `Learn about ${planet.name.en}: size, distance from the Sun, orbital period, key facts and NASA imagery in an interactive learning page.`,
          keywords: `${planet.name.en}, ${planet.name.en} facts, ${planet.name.en} planet, solar system`
        }
      : base;

    const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;
    const noIndex = pathname === '/search' || pathname.includes('?');

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'keywords', meta.keywords);
    upsertMeta('name', 'robots', noIndex ? 'noindex,follow' : 'index,follow,max-image-preview:large');
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    setLink('canonical', canonical);

    const oldSchema = document.getElementById('sslh-seo-schema');
    oldSchema?.remove();

    const breadcrumbItems = pathname.split('/').filter(Boolean);
    const breadcrumb = [
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL + '/' },
      ...breadcrumbItems.map((part, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: part === planetId && planet ? planet.name.en : part.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        item: SITE_URL + '/' + breadcrumbItems.slice(0, index + 1).join('/')
      }))
    ];

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': SITE_URL + '/#website',
          name: SITE_NAME,
          url: SITE_URL + '/',
          description: 'Interactive Space & Earth Science Learning Platform'
        },
        {
          '@type': 'EducationalOrganization',
          '@id': SITE_URL + '/#organization',
          name: SITE_NAME,
          url: SITE_URL + '/',
          description: 'Interactive bilingual space and Earth science learning platform.'
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumb
        },
        {
          '@type': 'LearningResource',
          name: meta.title,
          description: meta.description,
          url: canonical,
          educationalUse: 'instruction',
          learningResourceType: 'interactive lesson'
        }
      ]
    };

    const script = document.createElement('script');
    script.id = 'sslh-seo-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [location.pathname]);

  return null;
}
