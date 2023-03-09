import { Module } from '@nestjs/common';
import { BreweriesService } from './breweries.service';
import { BreweriesController } from './breweries.controller';
import { Brewery } from './entities/brewery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Brewery]), HttpModule],
  controllers: [BreweriesController],
  providers: [BreweriesService]
})
export class BreweriesModule {}
