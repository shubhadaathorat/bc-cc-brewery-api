import { Controller,  Post, Body, Param, Get, Query } from '@nestjs/common';
import { BreweriesService } from './breweries.service';
import { CreateBreweryDto } from './dto/create-brewery.dto';

@Controller('breweries')
export class BreweriesController {
  constructor(private readonly breweriesService: BreweriesService) {}

  @Post()
  create(@Body() createBreweryDto: CreateBreweryDto[]) {
    return this.breweriesService.InsertBrewery(createBreweryDto);
  }

  @Get("mismatch")
  mismatch(@Query('type') type: string,
           @Query('provience') provience: string) {
    if(type === "ministry"){
      console.log(`provience ${provience}`)
      return this.breweriesService.checkMinistryMismatch(provience);
    } else if(type === 'association'){
      return this.breweriesService.checkAssociationMistmatch(provience);
    } else {
      return {
        "message": "wrong type of mismatch"
      }
    }
  }
}
