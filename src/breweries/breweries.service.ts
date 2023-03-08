import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { BreweryTypeService } from 'src/brewery-type/brewery-type.service';
import { Repository } from 'typeorm';
import { CreateBreweryDto } from './dto/create-brewery.dto';
import { Brewery } from './entities/brewery.entity';

@Injectable()
export class BreweriesService {
  constructor(
    @InjectRepository(Brewery) private readonly breweryRepository: Repository<Brewery>
  ){}

  // @Inject(BreweryTypeService)
  // private readonly BreweryTypeService: BreweryTypeService;

  async InsertBrewery(createBreweryDto: CreateBreweryDto[]) {
    const responseBrewery = [];
    for (let i = 0; i < createBreweryDto.length; i++) {
      const singleBrewery = createBreweryDto[i]
      const breweryData = await this.createBrewery(singleBrewery);
      responseBrewery.push(breweryData);
    }
    console.log(`responseBrewery ${JSON.stringify(responseBrewery)}`);
    return responseBrewery;
  }

  async createBrewery(createBreweryDto) {
    try{
        // const breweryTypeId = await this.BreweryTypeService.findByBreweryType(createBreweryDto.breweryType);
        const breweryData = {
          brewery_name: createBreweryDto.name,
          // brewery_type: breweryTypeId,
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
    } catch(e){
        throw e;
    }
  }

  // findAll() {
  //   return `This action returns all breweries`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} brewery`;
  // }

}
