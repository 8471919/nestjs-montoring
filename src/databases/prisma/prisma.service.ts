import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // PrismaService가 생성될 때 실행되는 함수
  async onModuleInit() {
    await this.$connect();
  }

  // 서버가 꺼질 때, 실행되는 함수
  async enableShutdownHooks() {
    process.on('beforeExit', async () => {
      await this.$disconnect();
    });
  }
}
