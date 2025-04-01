import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'The username' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: 'E-mail' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'The nickname' })
  @IsOptional()
  @IsString()
  nickname?: string;

  //@IsOptional()
  //@IsString()
  //avatar?: string;

  @ApiProperty({ description: 'Main info about user' })
  @IsOptional()
  @IsString()
  info?: string;
}
