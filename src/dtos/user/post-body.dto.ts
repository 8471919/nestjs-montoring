import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class SignUpBodyDto extends PickType(UserEntity, [
  'email',
  'password',
  'nickname',
] as const) {}
