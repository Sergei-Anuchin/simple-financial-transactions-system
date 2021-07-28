import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';

import { Account } from './account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async checkIfAccountByIdExistsAndGetHim(id: number): Promise<Account> {
    const account = await this.accountsRepository.findOne(id);
    if (!account) {
      throw new HttpException({
        status: StatusCodes.NOT_FOUND,
        error: `Account by id ${id} not found`,
      }, StatusCodes.NOT_FOUND);
    }

    return account;
  }

  getUserAccounts(userId: number): Promise<Account[]> {
    return this.accountsRepository.find({ where: { userId } });
  }

  async getTotalUserBalance(userId: number): Promise<number> {
    const { totalUserBalance } = await this.accountsRepository.createQueryBuilder('account')
      .where({ userId })
      .select("SUM(balance)", "totalUserBalance")
      .getRawOne();

    return Number(totalUserBalance);
  }

  async getUserAccountIds(userId: number): Promise<number[]> {
    const ids = await this.accountsRepository.createQueryBuilder('account')
      .where({ userId })
      .select("id")
      .getRawMany();

    return ids.map(idObject => idObject.id);
  }
}
