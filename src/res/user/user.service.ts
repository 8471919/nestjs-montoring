import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { FindOneUserOutputDto } from 'src/dtos/user/find-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserMainPage(): Promise<string> {
    return 'User Main Page';
  }

  async signUp(
    email: string,
    password: string,
    nickname: string,
  ): Promise<true> {
    // 비밀번호 암호화
    const hashedPassword = bcrypt.hashSync(password, 10);

    const isCreated = await this.userRepository.createUser(
      email,
      hashedPassword,
      nickname,
    );

    return isCreated;
  }

  async getUserInfo(userId: number): Promise<FindOneUserOutputDto> {
    const user = await this.userRepository.findOneUser(userId);

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return user;
  }
}
