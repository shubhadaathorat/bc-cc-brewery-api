import {
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';


export interface BreweryDto {
  name: string;
  breweryType: string;
  street: string;
  city: string;
  county_province: string;
  postal_code: string;
  country: string;
}

export class CreateBreweryDto implements BreweryDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(15)
    breweryType: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    street: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    city: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    county_province: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    postal_code: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(15)
    country: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(15)
    type: string;
}