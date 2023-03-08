import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssociationService } from '../association/association.service';
//import { Country } from './entities/countries.entity';
import { User } from './entities/user.entity';
import { loginDto } from './dto/login-user.dto';
import { Association } from 'src/association/entities/association.entity';
import { Province } from 'src/provinces/entities/province.entity';
import { Country } from 'src/countries/entities/country.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}
  
  @Inject(AssociationService)
  private readonly AssociationService: AssociationService;

  async findOne(id: number) {
    return this.userRepository.findOneBy({id: id});
  }
  
  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async fetchUserDetails(username: string): Promise<User> {
    return await this.userRepository.createQueryBuilder('u')
      .select('u.id', 'userId')
      .addSelect('u.username', 'userName')
      .addSelect('u.email', 'userEmail')
      .addSelect('a.association_name', 'associationName')
      .addSelect('a.id', 'associationId')
      .addSelect('p.province_name', 'proviencName')
      .addSelect('c.country_name', 'countryName')
      .leftJoin(Association, 'a', 'u.associationId = a.id')
      .leftJoin(Province, 'p', 'a.provinceId = p.id')
      .leftJoin(Country, 'c', 'p.countryId = c.id')
      .where(`u.username = '${username}'`)
      .getOne();
  }

  async login(loginDto: loginDto){
    const userLogin = await this.findByUsername(loginDto.username);
    if (!userLogin || userLogin.user_password !== loginDto.password) {
      throw new UnauthorizedException();
    }
    console.log(`userData ${JSON.stringify(userLogin)}`);
    const userInfo = await this.fetchUserDetails(loginDto.username);
    console.log(`associationData ${JSON.stringify(userInfo)}`);

    const payload = {
      status: 'success',
      code: '200',
      data: {
      } 
    };
    return payload;
  }

}
