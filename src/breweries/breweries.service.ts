import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBreweryDto } from './dto/create-brewery.dto';
import { Brewery } from './entities/brewery.entity';
import axios from 'axios';
const breweryType = ["micro", "macro", "taproom", "brewpub", "large"];
const ministryAPI = "https://api.openbrewerydb.org/breweries";

@Injectable()
export class BreweriesService {
  constructor(
    @InjectRepository(Brewery) 
    private readonly breweryRepository: Repository<Brewery>
  ){}
  
  async InsertBrewery(createBreweryDto: CreateBreweryDto[]) {
    const responseBrewery = [];
    for (let i = 0; i < createBreweryDto.length; i++) {
      const singleBrewery = createBreweryDto[i];
      const brewerDatamapping = {
        brewery_name: singleBrewery.name,
        street_address: singleBrewery.street,
        city: singleBrewery.city,
        county_province: singleBrewery.county_province,
        postal_code: singleBrewery.postal_code,
        country: singleBrewery.country,
        brewery_type: singleBrewery.type
      };
      let breweryData;
      if(!breweryType.includes(brewerDatamapping.brewery_type)){
        brewerDatamapping["result"] = 'Rejected';
        breweryData = brewerDatamapping
      }
      const getBreweryData = await this.getBrewery(singleBrewery.name, singleBrewery.type, singleBrewery.county_province);
      if(getBreweryData){
        brewerDatamapping["result"] = 'Rejected';
        breweryData = brewerDatamapping;
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

  async getBrewery(breweryName: string, breweryType, county: string){
    return this.breweryRepository.findOneBy({brewery_name: breweryName, brewery_type:breweryType, county_province: county});
  }

  async getBreweryByProvience(Provience: string){
    const getBrewery = await this.breweryRepository.createQueryBuilder()
                              .select("id", "breweryId")
                              .addSelect("brewery_name", "breweryName")
                              .addSelect("street_address", "streetAddress")
                              .addSelect("city", "city")
                              .addSelect("county_province", "countyProvince")
                              .addSelect("postal_code", "postalCode")
                              .addSelect("country", "country")
                              .addSelect("brewery_type", "breweryType")
                              .where(`county_province = '${Provience}'`)
                              .getRawMany();
    return getBrewery;
  }

  async fetchMinistryBrewery(provience: string){
    console.log(`API URL ${ministryAPI}?by_state=${provience}`);
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 15000 
    };
    const response = await axios.get(`${ministryAPI}?by_state=east_sussex`, options);
    return response?.data;
  }

  async checkMinistryMismatch(provience){
    const associationBrewery = await this.getBreweryByProvience(provience);
    const ministryBrewery = await this.fetchMinistryBrewery(provience);
    const results = associationBrewery.filter(({ breweryName: n1,breweryType:b1,countyProvince:c1 }) => 
    !ministryBrewery.some(({  name: n2,brewery_type:b2,county_province:c2 }) => (n1 == n2) && (b1 == b2) && (c1==c2)));
    return results;
  }

  async checkAssociationMistmatch(provience){
    const associationBrewery = await this.getBreweryByProvience(provience);
    const ministryBrewery = await this.fetchMinistryBrewery(provience);
    const results = ministryBrewery.filter(({ name: n1,brewery_type:b1,county_province:c1 }) => 
    !associationBrewery.some(({  breweryName: n2,breweryType:b2,countyProvince:c2 }) => (n1 == n2) && (b1 == b2) && (c1==c2)));
    return results;
  }
}
