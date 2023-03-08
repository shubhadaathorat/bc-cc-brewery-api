import { Controller, Get, Param } from '@nestjs/common';
import { ProvincesService } from './provinces.service';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provincesService.findOne(+id);
  }
}
