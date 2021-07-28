import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { AccountsService } from '../accounts/accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), AccountsModule],
  providers: [TransactionsResolver, TransactionsService, AccountsService],
  exports: [TypeOrmModule],
})
export class TransactionsModule {}
