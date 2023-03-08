import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BreweryType } from './entities/brewery-type.entity';

@Injectable()
export class BreweryTypeService {
  constructor(
    @InjectRepository(BreweryType) private readonly breweryTypeRepository: Repository<BreweryType>
  ){}

  findAll() {
    return `This action returns all breweryType`;
  }

  async findByBreweryType(BreweryType: string) {
    const breweryType = await this.breweryTypeRepository.findOneBy({ type_name: BreweryType });
    return breweryType.id
  }
}
