import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from '../accounts/accounts.module';
import { AccountsService } from '../accounts/accounts.service';
import { TransactionsModule } from '../transactions/transactions.module';
import { TransactionsService } from '../transactions/transactions.service';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AccountsModule,
    TransactionsModule,
  ],
  providers: [
    UsersResolver,
    UsersService,
    AccountsService,
    TransactionsService,
  ],
  exports: [TypeOrmModule],
})
export class UsersModule {}
