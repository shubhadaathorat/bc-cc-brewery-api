import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private readonly countryRepository: Repository<Country>
  ){}

  async findOne(id: number) {
    return this.countryRepository.findOneBy({id: id});
  }
}
