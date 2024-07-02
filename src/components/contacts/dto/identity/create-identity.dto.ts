import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import {
  PersonType,
  TypeDocument,
} from 'src/common/constants/app/person-identity.app';

export class CreateIdentityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsEnum(TypeDocument)
  typeDocument: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsEnum(PersonType)
  typePerson: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @IsIn([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  dv: number;
}
