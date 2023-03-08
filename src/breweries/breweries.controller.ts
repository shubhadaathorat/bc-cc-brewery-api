import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreweriesService } from './breweries.service';
import { CreateBreweryDto, BreweryDto } from './dto/create-brewery.dto';
import { Brewery } from './entities/brewery.entity';

@Controller('breweries')
export class BreweriesController {
  constructor(private readonly breweriesService: BreweriesService) {}

  @Post()
  create(@Body() createBreweryDto: CreateBreweryDto[]) {
    return this.breweriesService.InsertBrewery(createBreweryDto);
  }

  // @Get()
  // findAll() {
  //   return this.breweriesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.breweriesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBreweryDto: UpdateBreweryDto) {
  //   return this.breweriesService.update(+id, updateBreweryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.breweriesService.remove(+id);
  // }
}
