import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class CreateUserInputDto extends PickType(UserEntity, [
  'email',
  'nickname',
  'password',
] as const) {}
