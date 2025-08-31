import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POI } from './poi/poi.entity';
import { POIModule } from './poi/poi.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'devpass123',
      database: process.env.DB_NAME || 'kolomna_guide',
      entities: [POI],
      synchronize: true, // Автосоздание схемы для MVP
      logging: true,
    }),
    POIModule,
  ],
})
export class AppModule {}
