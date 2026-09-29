import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { planets } from '../data/planets';

const SITE_NAME = 'Solar System Learning Hub';

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
  '/water-atlas': { title: 'Earth Water Atlas | Oceans, Rivers, Lakes, Groundwater & Dams', description: 'Explore Earth water distribution, the five ocean basins, major rivers and lakes, groundwater, glaciers, dams and hydropower with interactive explanations and NASA visualizations.', keywords: 'Earth water atlas, oceans, rivers, lakes, groundwater, glaciers, dams, hydropower, water cycle' },
  '/weather': { title: 'Weather & Climate | Interactive Earth Science Learning', description: 'Learn how weather and climate work through visual explanations and interactive learning content.', keywords: 'weather, climate, atmosphere, earth science' },
  '/dams': { title: 'Dams & Water Resources | Engineering & Earth Science', description: 'Learn how dams work, why reservoirs matter and how water resources are managed.', keywords: 'dams, reservoirs, water resources, engineering' },
  '/solar-energy': { title: 'Solar Energy | Photovoltaic Cells & Power Flow Simulation', description: 'See how sunlight becomes electricity through photovoltaic cells, DC current, an inverter and home loads.', keywords: 'solar energy, photovoltaic cells, solar panels, inverter, renewable energy' },
  '/quiz': { title: 'Space & Earth Science Quiz Center | Test Your Knowledge', description: 'Test your astronomy and Earth science knowledge with interactive quizzes and score tracking.', keywords: 'science quiz, astronomy quiz, space quiz, earth science quiz' },
  '/games': { title: 'Learning Games | Space & Planet Science Arcade', description: 'Play interactive educational games about planets, gravity, eclipses and space science.', keywords: 'space games, astronomy games, planet games, educational games' },
  '/glossary': { title: 'Astronomy & Earth Science Glossary', description: 'Look up clear explanations of important astronomy, planetary science and Earth science terms.', keywords: 'astronomy glossary, science glossary, planet terms' },
  '/resources': { title: 'Space Science Resources | NASA Learning & Interactive Tools', description: 'Explore curated NASA learning resources, 3D tools, mission pages, interactives and educational materials.', keywords: 'NASA resources, space education, astronomy resources, science learning' },
  '/mission-control': { title: 'Space Mission Control Center | NASA Mission Learning', description: 'Explore selected NASA planetary missions, targets, timelines and scientific goals in an interactive mission control dashboard.', keywords: 'NASA missions, space mission control, Europa Clipper, Psyche, New Horizons, Cassini, Galileo' },
  '/3d-explorer': { title: '3D Space Explorer | NASA Eyes Interactive', description: 'Explore planets, spacecraft and missions in an interactive 3D experience powered by NASA Eyes.', keywords: '3D solar system, NASA Eyes, interactive space, spacecraft simulation' },
  '/dashboard': { title: 'Learning Dashboard | Solar System Learning Hub', description: 'Track completed lessons, quiz performance, learning progress and achievement badges.', keywords: 'learning dashboard, student progress, science learning progress' },
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
    const waterSlug = pathname.startsWith('/water-atlas/') ? pathname.split('/')[2] : '';

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

    const waterTitles: Record<string, { title:string; description:string; keywords:string }> = {
      'ocean-pacific': { title:'Pacific Ocean | Size, Depth, Currents & Science', description:'Explore the Pacific Ocean: size, depth, currents, plate tectonics, ecosystems and its role in the global ocean.', keywords:'Pacific Ocean, ocean size, ocean depth, currents, Mariana Trench' },
      'ocean-atlantic': { title:'Atlantic Ocean | Size, Currents & Global Circulation', description:'Explore the Atlantic Ocean, its size, circulation, currents and role in Earth systems.', keywords:'Atlantic Ocean, ocean currents, global circulation' },
      'ocean-indian': { title:'Indian Ocean | Monsoons, Currents & Water Science', description:'Explore the Indian Ocean, monsoon winds, circulation and marine systems.', keywords:'Indian Ocean, monsoon, ocean currents' },
      'ocean-southern': { title:'Southern Ocean | Antarctica, Currents & Climate', description:'Explore the Southern Ocean around Antarctica and its role in global ocean circulation.', keywords:'Southern Ocean, Antarctica, Antarctic Circumpolar Current' },
      'ocean-arctic': { title:'Arctic Ocean | Sea Ice, Climate & Ecosystems', description:'Explore the Arctic Ocean, sea ice, polar ecosystems and high-latitude water systems.', keywords:'Arctic Ocean, sea ice, polar ocean' },
      'river-nile': { title:'Nile River | Basin, Flow & Water Science', description:'Explore the Nile River system, headwaters, flow, basin and importance to northeastern Africa.', keywords:'Nile River, Nile Basin, river science' },
      'river-amazon': { title:'Amazon River | Discharge, Basin & Water Cycle', description:'Explore the Amazon River system, exceptional discharge, basin and freshwater transport.', keywords:'Amazon River, Amazon Basin, river discharge' },
      'river-yangtze': { title:'Yangtze River | Basin, Flow & Freshwater Science', description:'Explore the Yangtze River system, basin, flow and importance to China.', keywords:'Yangtze River, river basin, freshwater' },
      'river-mississippi': { title:'Mississippi–Missouri | River Basin & Water Flow', description:'Explore the Mississippi–Missouri river system, basin, tributaries and water management.', keywords:'Mississippi River, Missouri River, river basin' },
      'lake-caspian': { title:'Caspian Sea | Enclosed Lake & Water System', description:'Explore the Caspian Sea as the world’s largest enclosed inland water body, its salinity and water balance.', keywords:'Caspian Sea, largest lake, enclosed lake' },
      'lake-superior': { title:'Lake Superior | Great Lakes Freshwater Science', description:'Explore Lake Superior, the largest Great Lake by surface area and a major freshwater store.', keywords:'Lake Superior, Great Lakes, freshwater' },
      'lake-victoria': { title:'Lake Victoria | African Freshwater Ecosystem', description:'Explore Lake Victoria, its water inputs, outflow, ecosystem and basin pressures.', keywords:'Lake Victoria, Africa lake, freshwater ecosystem' },
      'lake-baikal': { title:'Lake Baikal | Deepest Lake & Freshwater Store', description:'Explore Lake Baikal, its depth, ancient rift setting and exceptional freshwater store.', keywords:'Lake Baikal, deepest lake, freshwater' },
      'lake-tanganyika': { title:'Lake Tanganyika | Deep Rift Lake Science', description:'Explore Lake Tanganyika, its deep rift basin, water movement and freshwater ecosystem.', keywords:'Lake Tanganyika, rift lake, freshwater' },
      'water-oceans': { title:'Earth Ocean Water | 96.5% of Earth Water', description:'Learn how much water is stored in Earth’s oceans, why it is saline and how it drives the water cycle.', keywords:'Earth ocean water, 96.5 percent, water distribution' },
      'water-groundwater': { title:'Groundwater | Aquifers, Recharge & Water Movement', description:'Learn how groundwater is stored, recharged and moved through aquifers beneath Earth’s surface.', keywords:'groundwater, aquifer, recharge, water cycle' },
      'water-glaciers': { title:'Glaciers & Ice Sheets | Earth Freshwater Store', description:'Learn how glaciers and ice sheets store freshwater, flow and release meltwater.', keywords:'glaciers, ice sheets, freshwater, meltwater' },
      'water-atmosphere': { title:'Atmospheric Water | Vapor, Clouds & Precipitation', description:'Learn how water vapor moves through the atmosphere and becomes clouds and precipitation.', keywords:'atmospheric water, water vapor, clouds, precipitation' }
    };
    const waterMeta = waterSlug ? waterTitles[waterSlug] : undefined;

    const base = routeMeta[pathname] || {
      title: 'Space & Earth Science Learning Hub',
      description: 'Interactive learning resources for astronomy, planetary science and Earth science.',
      keywords: 'space science, astronomy, earth science, learning'
    };

    const meta = waterMeta ? waterMeta : topic ? topic : planet ?
      title: `${planet.name.en} | Planet Facts, Images & Interactive Learning`,
      description: `Learn about ${planet.name.en}: size, distance from the Sun, orbital period, key facts and NASA imagery in an interactive learning page.`,
      keywords: `${planet.name.en}, ${planet.name.en} facts, ${planet.name.en} planet, solar system`
    } : base;

    const siteUrl = window.location.origin;
    const canonical = `${siteUrl}${pathname === '/' ? '/' : pathname}`;
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
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: siteUrl + '/' },
      ...breadcrumbItems.map((part, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: part === planetId && planet ? planet.name.en : part.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        item: siteUrl + '/' + breadcrumbItems.slice(0, index + 1).join('/')
      }))
    ];

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebSite', '@id': siteUrl + '/#website', name: SITE_NAME, url: siteUrl + '/', description: 'Interactive Space & Earth Science Learning Platform' },
        { '@type': 'EducationalOrganization', '@id': siteUrl + '/#organization', name: SITE_NAME, url: siteUrl + '/', description: 'Interactive bilingual space and Earth science learning platform.' },
        { '@type': 'BreadcrumbList', itemListElement: breadcrumb },
        { '@type': 'LearningResource', name: meta.title, description: meta.description, url: canonical, educationalUse: 'instruction', learningResourceType: 'interactive lesson' }
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
