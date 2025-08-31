import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POI } from './poi.entity';
import { POIController } from './poi.controller';
import { POIService } from './poi.service';

@Module({
  imports: [TypeOrmModule.forFeature([POI])],
  controllers: [POIController],
  providers: [POIService],
  exports: [POIService],
})
export class POIModule {}
