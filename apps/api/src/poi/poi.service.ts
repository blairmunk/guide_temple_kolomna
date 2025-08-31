import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { POI } from './poi.entity';

@Injectable()
export class POIService implements OnModuleInit {
  constructor(
    @InjectRepository(POI)
    private poiRepository: Repository<POI>,
  ) {}

  async onModuleInit() {
    // Автосоздание тестовых данных при старте
    try {
      const count = await this.poiRepository.count();
      if (count === 0) {
        console.log('🌱 Создаем тестовые POI...');
        
        const testPois = [
          this.poiRepository.create({
            slug: 'troitskiy-temple',
            title: { ru: 'Троицкий храм', en: 'Trinity Church' },
            summary: { 
              ru: 'Главный храм прихода, построенный в XIX веке',
              en: 'Main parish church built in the 19th century'
            },
            body: { 
              ru: 'Троицкий храм является центром духовной жизни прихода. Построен в традиционном русском стиле.',
              en: 'Trinity Church is the center of the parish spiritual life. Built in traditional Russian style.'
            },
            lat: 55.066639,
            lng: 38.841417,
            visitTimeMin: 15,
            categories: ['храм', 'архитектура'],
            tags: ['главное', 'история'],
            accessibility: { mgn: false, stroller: true },
            media: []
          }),
          this.poiRepository.create({
            slug: 'bell-tower',
            title: { ru: 'Колокольня', en: 'Bell Tower' },
            summary: { 
              ru: 'Историческая колокольня XVIII века',
              en: 'Historic bell tower from 18th century'
            },
            lat: 55.066700,
            lng: 38.841500,
            visitTimeMin: 10,
            categories: ['архитектура'],
            tags: ['детям', 'звон'],
            accessibility: { mgn: false, stroller: false },
            media: []
          }),
          this.poiRepository.create({
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
          }),
          this.poiRepository.create({
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
          }),
          this.poiRepository.create({
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
          })
        ];

        await this.poiRepository.save(testPois);
        console.log('✅ Тестовые POI созданы!');
      } else {
        console.log(`📊 Найдено ${count} POI в БД`);
      }
    } catch (error) {
      console.error('❌ Ошибка создания тестовых данных:', error.message);
    }
  }

  async findAll(options: {
    lang?: string;
    q?: string;
    tags?: string;
    bbox?: string;
  } = {}) {
    try {
      const query = this.poiRepository.createQueryBuilder('poi');
      
      if (options.q) {
        query.where(
          `poi.title->>'ru' ILIKE :search OR poi.summary->>'ru' ILIKE :search`,
          { search: `%${options.q}%` }
        );
      }
      
      if (options.tags) {
        const tags = options.tags.split(',');
        query.andWhere('poi.tags && :tags', { tags });
      }
      
      if (options.bbox) {
        const [minLng, minLat, maxLng, maxLat] = options.bbox.split(',').map(Number);
        query.andWhere(
          'poi.lat BETWEEN :minLat AND :maxLat AND poi.lng BETWEEN :minLng AND :maxLng',
          { minLat, maxLat, minLng, maxLng }
        );
      }
      
      return await query.orderBy('poi.visitTimeMin', 'ASC').getMany();
    } catch (error) {
      console.error('Ошибка получения POI:', error.message);
      return [];
    }
  }

  async findOne(slugOrId: string, lang: string = 'ru') {
    try {
      const query = this.poiRepository.createQueryBuilder('poi');
      
      // Проверяем, это UUID или slug
      if (slugOrId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        query.where('poi.id = :id', { id: slugOrId });
      } else {
        query.where('poi.slug = :slug', { slug: slugOrId });
      }
      
      return await query.getOne();
    } catch (error) {
      console.error('Ошибка получения POI:', error.message);
      return null;
    }
  }
}
