import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccountsService } from '../accounts/accounts.service';
import { TransactionsService } from '../transactions/transactions.service';

import { GetTotalUserBalanceDto } from './dto/get-total-user-balance.dto';
import { GetAllUserTransactionsDto } from './dto/get-all-user-transactions.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private accountsService: AccountsService,
    private transactionsService: TransactionsService,
  ) {}

  async checkIfUserByIdExistsAndGetHim(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getTotalBalanceById(id: number): Promise<GetTotalUserBalanceDto> {
    await this.checkIfUserByIdExistsAndGetHim(id);

    const totalUserBalance = await this.accountsService.getTotalUserBalance(id);
    return { totalUserBalance };
  }

  async getUserTransactions(id: number): Promise<GetAllUserTransactionsDto> {
    await this.checkIfUserByIdExistsAndGetHim(id);

    const accountIds = await this.accountsService.getUserAccountIds(id);
    const sourceTransactions = await this.transactionsService.getAllSourceTransactions(accountIds);
    const targetTransactions = await this.transactionsService.getAllTargetTransactions(accountIds);

    return { sourceTransactions, targetTransactions };
  }
}
