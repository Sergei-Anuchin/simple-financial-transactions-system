import { Resolver, Query, Args, Int } from '@nestjs/graphql';

import { GetTotalUserBalanceDto } from './dto/get-total-user-balance.dto';
import { GetAllUserTransactionsDto } from './dto/get-all-user-transactions.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => GetTotalUserBalanceDto, { name: 'getTotalUserBalance' })
    async getTotalUserBalance(@Args('id', { type: () => Int }) id: number) {
        return this.usersService.getTotalBalanceById(id);
    }

    @Query(() => [User], { name: 'getUsers', nullable: 'items' })
    async getUsers() {
        return this.usersService.getAll();
    }

    @Query(() => GetAllUserTransactionsDto, { name: 'getUserTransactions', nullable: false })
    async getUserTransactions(@Args('id', { type: () => Int }) id: number) {
        return this.usersService.getUserTransactions(id);
    }
}
