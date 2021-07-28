import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, getManager, EntityManager } from 'typeorm';
import { StatusCodes } from 'http-status-codes';

import { Transaction } from './transaction.entity';
import { Account } from '../accounts/account.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AccountsService } from '../accounts/accounts.service';

const throwBadRequest = message => {
  throw new HttpException({
    status: StatusCodes.BAD_REQUEST,
    error: message,
  }, StatusCodes.BAD_REQUEST);
}
const throwIfSourceAndTargetAccountsMatch = ({ sourceAccountId, targetAccountId }) => {
  if (sourceAccountId === targetAccountId) {
    throwBadRequest('Source and target accounts should not match');
  }
}
const throwIfSumIsNotPositive = sum => {
  if (sum < 0) {
    throwBadRequest('Sum should be positive');
  }
}
const throwIfBalanceHasInsufficientFunds = (balance, sum) => {
  if (balance < sum) {
    throwBadRequest('Source account has insufficient funds');
  }
}

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
