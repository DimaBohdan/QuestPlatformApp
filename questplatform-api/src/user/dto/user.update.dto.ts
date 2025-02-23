import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  //@IsOptional()
  //@IsString()
  //avatar?: string;

  @IsOptional()
  @IsString()
  info?: string;
}
