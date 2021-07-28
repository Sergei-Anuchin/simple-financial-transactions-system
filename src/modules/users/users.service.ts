import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AccountsService } from '../accounts/accounts.service';
import { TransactionsService } from '../transactions/transactions.service';
import { TotalUserBalanceDto } from './dto/totalUserBalance.dto';
import { AllUserTransactionsDto } from './dto/allUserTransactions.dto';

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

  async getTotalBalanceById(id: number): Promise<TotalUserBalanceDto> {
    await this.checkIfUserByIdExistsAndGetHim(id);

    const totalUserBalance = await this.accountsService.getTotalUserBalance(id);
    return { totalUserBalance };
  }

  async getUserTransactions(id: number): Promise<AllUserTransactionsDto> {
    await this.checkIfUserByIdExistsAndGetHim(id);

    const accountIds = await this.accountsService.getUserAccountIds(id);
    const sourceTransactions = await this.transactionsService.getAllSourceTransactions(accountIds);
    const targetTransactions = await this.transactionsService.getAllTargetTransactions(accountIds);

    return { sourceTransactions, targetTransactions };
  }
}
