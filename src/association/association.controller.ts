import { Controller, Get, Param } from '@nestjs/common';
import { AssociationService } from './association.service';

@Controller('association')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.associationService.findOne(+id);
  }
}
