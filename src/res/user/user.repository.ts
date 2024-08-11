import { Injectable } from '@nestjs/common';
import { FindOneUserOutputDto } from 'src/dtos/user/find-user.dto';
import { PrismaService } from 'src/databases/prisma/prisma.service';
import { CreateUserInputDto } from 'src/dtos/user/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    email: string,
    hashedPassword: string,
    nickname: string,
  ): Promise<true> {
    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
      },
    });

    return true;
  }

  async findOneUser(userId: number): Promise<FindOneUserOutputDto | null> {
    // SELECT * FROM USER WHERE id = userId LIMIT 1
    const user = await this.prisma.user.findFirst({
      select: {
        email: true,
        nickname: true,
        createdAt: true,
      },
      where: {
        id: userId,
      },
    });

    // duck typing, 구조적 타이핑

    // JOIN 문을 사용할 때, 자체적으로 DB조인, 앱조인
    // DB 조인 : User x Post
    // 앱 조인 : User + Post

    return user;
  }
}
