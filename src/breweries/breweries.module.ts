import { Module } from '@nestjs/common';
import { BreweriesService } from './breweries.service';
import { BreweriesController } from './breweries.controller';
import { Brewery } from './entities/brewery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BreweryTypeService } from 'src/brewery-type/brewery-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brewery])],
  controllers: [BreweriesController],
  providers: [BreweriesService]
})
export class BreweriesModule {}
