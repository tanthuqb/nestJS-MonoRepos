import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({})
export class UsersModule {
    providers: [UsersResolver, UsersService];
}
