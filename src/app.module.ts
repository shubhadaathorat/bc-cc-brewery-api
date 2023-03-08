import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { loginModule } from './modules/user/users.module';
import { UsersModule } from './users/users.module';
import { AssociationModule } from './association/association.module';
import { CountriesModule } from './countries/countries.module';
import { ProvincesModule } from './provinces/provinces.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    //loginModule,
    TypeOrmModule.forRootAsync({
      // initializing the TypeOrmModule async to wait the ConfigModule initialization so we can use the env variables
      imports: [ConfigModule], // we import the ConfigModule
      inject: [ConfigService], // and then from the ConfigModule, we inject the ConfigService
      useFactory: async (configService: ConfigService) => {
        console.log(`test`);
        console.log(configService.get('POSTGRES_PASSWORD').toString());
        console.log(configService.get('POSTGRES_HOST'));
        console.log(configService.get('POSTGRES_USERNAME'));
        console.log(configService.get('POSTGRES_DATABASE'));
        const isProd = configService.get('STAGE') === 'prod';

        return {
          ssl: isProd,
          extra: { ssl: isProd ? { rejectUnauthorized: false } : null },
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USERNAME'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
          entities: ['dist/**/*.entity{.ts,.js}'],
        };
      },
    }),
    UsersModule,
    AssociationModule,
    CountriesModule,
    ProvincesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
