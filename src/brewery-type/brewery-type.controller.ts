import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreweryTypeService } from './brewery-type.service';
@Controller('brewery-type')
export class BreweryTypeController {
  constructor(private readonly breweryTypeService: BreweryTypeService) {}

  @Get()
  findAll() {
    return this.breweryTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breweryTypeService.findByBreweryType(id);
  }

}
