import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class FindOneUserOutputDto extends PickType(UserEntity, [
  'email',
  'nickname',
  'createdAt', // 회원가입 일자
] as const) {}
