import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBreweryDto } from './dto/create-brewery.dto';
import { Brewery } from './entities/brewery.entity';
const breweryType = ["micro", "macro", "taproom", "brewpub", "large"];

@Injectable()
export class BreweriesService {
  constructor(
    @InjectRepository(Brewery) private readonly breweryRepository: Repository<Brewery>
  ){}

  async InsertBrewery(createBreweryDto: CreateBreweryDto[]) {
    const responseBrewery = [];
    for (let i = 0; i < createBreweryDto.length; i++) {
      const singleBrewery = createBreweryDto[i];
      let breweryData;
      if(!breweryType.includes(singleBrewery.type)){
        singleBrewery["result"] = 'Rejected';
        breweryData = singleBrewery
      }
      const getBreweryData = await this.getBrewery(singleBrewery.name, singleBrewery.type, singleBrewery.county_province);
      if(getBreweryData){
        singleBrewery["result"] = 'Rejected';
        breweryData = singleBrewery
      } else{
        const InsertBrewery = await this.createBrewery(singleBrewery);
        InsertBrewery["result"] = 'Selected';
        breweryData = InsertBrewery
      }
      responseBrewery.push(breweryData);
    }
    return responseBrewery;
  }

  async createBrewery(createBreweryDto) {
    const breweryData = {
      brewery_name: createBreweryDto.name,
      street_address: createBreweryDto.street,
      city: createBreweryDto.city,
      county_province: createBreweryDto.county_province,
      postal_code: createBreweryDto.postal_code,
      country: createBreweryDto.country,
      brewery_type: createBreweryDto.type,
      is_active: true,
      created_by: 1,
      updated_by: 1
    }
    const result = await this.breweryRepository.save(breweryData);
    return result
  }

  async getBrewery(breweryName, breweryType, county){
    return this.breweryRepository.findOneBy({brewery_name: breweryName, brewery_type:breweryType, county_province: county});
  }

}
