import { Controller, Get, Param, Query } from '@nestjs/common';
import { POIService } from './poi.service';

@Controller('poi')
export class POIController {
  constructor(private poiService: POIService) {}

  @Get()
  async findAll(
    @Query('lang') lang: string = 'ru',
    @Query('q') q?: string,
    @Query('tags') tags?: string,
    @Query('bbox') bbox?: string,
  ) {
    return this.poiService.findAll({ lang, q, tags, bbox });
  }

  @Get(':slugOrId')
  async findOne(
    @Param('slugOrId') slugOrId: string,
    @Query('lang') lang: string = 'ru',
  ) {
    return this.poiService.findOne(slugOrId, lang);
  }
}
