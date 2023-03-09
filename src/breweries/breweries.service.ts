import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBreweryDto } from './dto/create-brewery.dto';
import { Brewery } from './entities/brewery.entity';
import axios from 'axios';
const breweryType = ['micro','macro','nano','taproom','brewpub','large','regional','planning','bar','contract','proprietor','closed'];
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
        brewerDatamapping["reason"] = 'Brewery Type is wrong';
        breweryData = brewerDatamapping
      }
      const getBreweryData = await this.getBrewery(singleBrewery.name, singleBrewery.type, singleBrewery.county_province, singleBrewery.postal_code);
      if(getBreweryData){
        brewerDatamapping["result"] = 'Rejected';
        brewerDatamapping["reason"] = 'Duplicate entry';
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

  async getBrewery(breweryName: string, breweryType, county: string, postalCode: string){
    return this.breweryRepository.findOneBy({brewery_name: breweryName, brewery_type:breweryType, county_province: county, postal_code: postalCode});
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
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 15000 
    };
    const response = await axios.get(`${ministryAPI}?by_state=${provience}`, options);
    return response?.data;
  }

  async checkMinistryMismatch(provience){
    const associationBrewery = await this.getBreweryByProvience(provience);
    const ministryBrewery = await this.fetchMinistryBrewery(provience);
    const results = associationBrewery.filter((
      { breweryName: aname,
        breweryType:atype,
        countyProvince:acounty, 
        streetAddress: astreet, 
        city: acity,
        postalCode: pcode,
        country: acountry
      }) => !ministryBrewery.some(({  
        name: mname,
        brewery_type:mtype,
        county_province:mcounty,
        street: mstreet,
        city: mcity,
        postal_code: mcode,
        country: mcountry
      }) => (aname == mname)
       && (atype == mtype) 
       && (acounty == mcounty) 
       && (astreet == mstreet) 
       && (acity == mcity) 
       && (pcode == mcode) 
       && (acountry == mcountry)));
    return results;
  }

  async checkAssociationMistmatch(provience){
    const associationBrewery = await this.getBreweryByProvience(provience);
    const ministryBrewery = await this.fetchMinistryBrewery(provience);
    const results = ministryBrewery.filter((
      { name: mname,
        brewery_type:mtype,
        county_province:mcounty,
        street: mstreet,
        city: mcity,
        postal_code: mcode,
        country: mcountry
      }) => !associationBrewery.some(({ 
        breweryName: aname, 
        breweryType:atype,
        countyProvince:acounty, 
        streetAddress: astreet, 
        city: acity,
        postalCode: pcode,
        country: acountry
      }) => (aname == mname)
       && (atype == mtype) 
       && (acounty == mcounty) 
       && (astreet == mstreet) 
       && (acity == mcity) 
       && (pcode == mcode) 
       && (acountry == mcountry)));
    return results;
  }
}
