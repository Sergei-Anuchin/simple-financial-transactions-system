import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from "typeorm";

import { AccountsModule } from './modules/accounts/accounts.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/user.entity';
import { Account } from './modules/accounts/account.entity';
import { Transaction } from './modules/transactions/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...await getConnectionOptions(),
          autoLoadEntities: true,
          entities: [
            User,
            Account,
            Transaction,
          ],
        }
      },
    }),
    AccountsModule,
    TransactionsModule,
    UsersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [],
})
export class AppModule {}
