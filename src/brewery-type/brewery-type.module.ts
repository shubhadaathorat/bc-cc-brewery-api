import { Module } from '@nestjs/common';
import { BreweryTypeService } from './brewery-type.service';
import { BreweryTypeController } from './brewery-type.controller';
import { BreweryType } from './entities/brewery-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BreweryType])],
  controllers: [BreweryTypeController],
  providers: [BreweryTypeService],
  exports: [BreweryTypeService]
})
export class BreweryTypeModule {}
