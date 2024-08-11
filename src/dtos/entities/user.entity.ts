import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class UserEntity {
  @ApiProperty({
    type: Number,
    description: '유저의 식별자입니다.',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: String,
    description: '이메일 입니다.',
    example: 'example@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: '비밀번호 입니다.',
    example: 'abcd123455678',
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 30)
  password: string;

  @ApiProperty({
    type: String,
    description: '닉네임 입니다.',
    example: 'nickname',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  nickname: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsDateString()
  deletedAt: Date | null;
}
