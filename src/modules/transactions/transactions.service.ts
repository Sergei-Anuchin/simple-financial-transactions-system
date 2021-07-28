import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, getManager, EntityManager } from 'typeorm';

import { Account } from '../accounts/account.entity';
import { AccountsService } from '../accounts/accounts.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transaction.entity';
import {
  throwIfSourceAndTargetAccountsMatch,
  throwIfSumIsNotPositive,
  throwIfBalanceHasInsufficientFunds,
} from './transactions.utils';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private accountsService: AccountsService,
  ) {}

  async getAllSourceTransactions(accountIds: number[]): Promise<Transaction[]> {
    return this.transactionsRepository.find({ where: { sourceAccountId: In(accountIds) } });
  }
  async getAllTargetTransactions(accountIds: number[]): Promise<Transaction[]> {
    return this.transactionsRepository.find({ where: { targetAccountId: In(accountIds) } });
  }

  async create(createTransactionData: CreateTransactionDto): Promise<Transaction> {
    throwIfSourceAndTargetAccountsMatch(createTransactionData);
    throwIfSumIsNotPositive(createTransactionData.sum);
    const sourceAccount = await this.accountsService.checkIfAccountByIdExistsAndGetHim(createTransactionData.sourceAccountId);
    throwIfBalanceHasInsufficientFunds(sourceAccount.balance, createTransactionData.sum);
    const targetAccount = await this.accountsService.checkIfAccountByIdExistsAndGetHim(createTransactionData.targetAccountId);

    sourceAccount.balance -= createTransactionData.sum;
    targetAccount.balance += createTransactionData.sum;
    const transaction = await this.transactionsRepository.create(createTransactionData);

    await getManager().transaction(async (transactionManager: EntityManager) => {
      await transactionManager.save(Account, [
        sourceAccount,
        targetAccount,
      ]);
      await transactionManager.save(Transaction, transaction);
    });

    return transaction;
  }
}
