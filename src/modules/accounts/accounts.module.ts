import { Module } from '@nestjs/common';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';
import { Account } from './account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountsResolver, AccountsService],
  exports: [TypeOrmModule],
})
export class AccountsModule {}
