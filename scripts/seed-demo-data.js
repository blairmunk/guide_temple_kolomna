const { Client } = require('pg');

const demoData = {
  pois: [
    {
      slug: 'troitskiy-temple',
      title: { ru: 'Троицкий храм', en: 'Trinity Church' },
      summary: { ru: 'Главный храм прихода, построенный в XIX веке' },
      body: { ru: 'Троицкий храм является центром духовной жизни прихода. Построен в традиционном русском стиле.' },
      lat: 55.066639,
      lng: 38.841417,
      visitTimeMin: 15,
      categories: ['храм', 'архитектура'],
      tags: ['главное', 'история'],
      media: []
    },
    {
      slug: 'bell-tower',
      title: { ru: 'Колокольня', en: 'Bell Tower' },
      summary: { ru: 'Историческая колокольня XVIII века' },
      lat: 55.066700,
      lng: 38.841500,
      visitTimeMin: 10,
      categories: ['архитектура'],
      tags: ['детям', 'звон'],
      media: []
    }
    // Добавьте остальные 3 POI...
  ]
};

async function seed() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'kolomna_guide',
    user: 'admin',
    password: 'devpass123',
  });

  await client.connect();
  
  for (const poi of demoData.pois) {
    await client.query(`
      INSERT INTO poi (id, slug, title, summary, body, lat, lng, visit_time_min, categories, tags, media)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (slug) DO NOTHING
    `, [
      poi.slug,
      JSON.stringify(poi.title),
      JSON.stringify(poi.summary),
      JSON.stringify(poi.body || {}),
      poi.lat,
      poi.lng,
      poi.visitTimeMin,
      poi.categories,
      poi.tags,
      JSON.stringify(poi.media)
    ]);
  }
  
  await client.end();
  console.log('✅ Demo data seeded!');
}

seed().catch(console.error);
