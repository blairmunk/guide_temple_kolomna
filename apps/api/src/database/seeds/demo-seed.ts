import { AppDataSource } from '../data-source';

const demoData = [
  {
    slug: 'troitskiy-temple',
    title: { ru: 'Троицкий храм', en: 'Trinity Church' },
    summary: { 
      ru: 'Главный храм прихода, построенный в XIX веке',
      en: 'Main parish church built in the 19th century'
    },
    body: { 
      ru: 'Троицкий храм является центром духовной жизни прихода. Построен в традиционном русском стиле с элементами ампира.',
      en: 'Trinity Church is the center of the parish spiritual life. Built in traditional Russian style with empire elements.'
    },
    lat: 55.066639,
    lng: 38.841417,
    visitTimeMin: 15,
    categories: ['храм', 'архитектура'],
    tags: ['главное', 'история'],
    accessibility: { mgn: false, stroller: true },
    media: []
  },
  {
    slug: 'bell-tower',
    title: { ru: 'Колокольня', en: 'Bell Tower' },
    summary: { 
      ru: 'Историческая колокольня XVIII века',
      en: 'Historic bell tower from 18th century'
    },
    body: {
      ru: 'Колокольня была построена в XVIII веке и является одним из старейших сооружений комплекса.',
      en: 'The bell tower was built in the 18th century and is one of the oldest structures in the complex.'
    },
    lat: 55.066700,
    lng: 38.841500,
    visitTimeMin: 10,
    categories: ['архитектура'],
    tags: ['детям', 'звон'],
    accessibility: { mgn: false, stroller: false },
    media: []
  },
  {
    slug: 'parish-house',
    title: { ru: 'Приходской дом', en: 'Parish House' },
    summary: { 
      ru: 'Здание для проведения собраний и мероприятий',
      en: 'Building for meetings and events'
    },
    lat: 55.066500,
    lng: 38.841300,
    visitTimeMin: 5,
    categories: ['здания'],
    tags: ['современное'],
    accessibility: { mgn: true, stroller: true },
    media: []
  },
  {
    slug: 'holy-spring',
    title: { ru: 'Святой источник', en: 'Holy Spring' },
    summary: { 
      ru: 'Освященный источник для омовения',
      en: 'Blessed spring for ablutions'
    },
    lat: 55.066400,
    lng: 38.841600,
    visitTimeMin: 8,
    categories: ['святыни'],
    tags: ['вода', 'благословение'],
    accessibility: { mgn: false, stroller: true },
    media: []
  },
  {
    slug: 'cemetery',
    title: { ru: 'Приходское кладбище', en: 'Parish Cemetery' },
    summary: { 
      ru: 'Историческое кладбище при храме',
      en: 'Historic cemetery at the church'
    },
    lat: 55.066800,
    lng: 38.841200,
    visitTimeMin: 12,
    categories: ['история'],
    tags: ['память', 'тишина'],
    accessibility: { mgn: false, stroller: false },
    media: []
  }
];

async function seed() {
  try {
    await AppDataSource.initialize();
    
    const queryRunner = AppDataSource.createQueryRunner();
    
    for (const poi of demoData) {
      await queryRunner.query(`
        INSERT INTO poi (slug, title, summary, body, lat, lng, visit_time_min, categories, tags, accessibility, media)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (slug) DO NOTHING
      `, [
        poi.slug,
        JSON.stringify(poi.title),
        JSON.stringify(poi.summary),
        JSON.stringify(poi.body),
        poi.lat,
        poi.lng,
        poi.visitTimeMin,
        poi.categories,
        poi.tags,
        JSON.stringify(poi.accessibility),
        JSON.stringify(poi.media)
      ]);
    }
    
    await queryRunner.release();
    await AppDataSource.destroy();
    
    console.log('✅ Demo data seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
