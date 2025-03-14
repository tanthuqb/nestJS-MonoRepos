import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma-client/jobber';

@Injectable()
export class PrismaService extends PrismaClient {
    async onModuleInt() {
        await this.$connect();
    }
}

