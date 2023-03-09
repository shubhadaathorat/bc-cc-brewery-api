import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssociationService } from '../association/association.service';
import { User } from './entities/user.entity';
import { loginDto } from './dto/login-user.dto';
import { Association } from 'src/association/entities/association.entity';
import { Province } from 'src/provinces/entities/province.entity';
import { Country } from 'src/countries/entities/country.entity';
import md5 from "md5"; 

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

  async fetchUserDetails(username: string){
    const userData = await this.userRepository.createQueryBuilder("u")
      .select("u.id", "userId")
      .addSelect("u.username", "userName")
      .addSelect("u.email", "userEmail")
      .addSelect("a.association_name", "associationName")
      .addSelect("a.id", "associationId")
      .addSelect("p.province_name", "proviencName")
      .addSelect("c.country_name", "countryName")
      .leftJoinAndSelect(Association, "a", "u.associationId = a.id")
      .leftJoinAndSelect(Province, "p", "a.provinceId = p.id")
      .leftJoinAndSelect(Country, "c", "p.countryId = c.id")
      .where(`u.username = '${username}'`)
      .getRawAndEntities();
      return userData;
  }

  async login(loginDto: loginDto){
    const userLogin = await this.findByUsername(loginDto.username);
    if (!userLogin || userLogin.user_password !== md5(loginDto.password)) {
      throw new UnauthorizedException();
    }
    const userInformation = await this.fetchUserDetails(loginDto.username);

    const payload = {
      status: 'success',
      code: '200',
      data: {
        userInfo: {
          id: userInformation.raw[0].userId,
          username: userInformation.raw[0].userName,
          emailId: userInformation.raw[0].userEmail,
          association: {
            id: userInformation.raw[0].associationId,
            name: userInformation.raw[0].associationName,
            provienc: userInformation.raw[0].proviencName,
            country: userInformation.raw[0].countryName
          },
          breweryTypes: [
            {"name": "micro"}, 
            {"name":"macro"}, 
            {"name":"taproom"},
            {"name":"brewpub"},
            {"name":"large"}
        ]
          
        }
      } 
    };
    return payload;
  }

}
