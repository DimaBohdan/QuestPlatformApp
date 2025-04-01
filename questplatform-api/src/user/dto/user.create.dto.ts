import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'The nickname' })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({ description: 'E-mail' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The profile photo' })
  @IsNotEmpty()
  @IsString()
  avatar: string;
}
