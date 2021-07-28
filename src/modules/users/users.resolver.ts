import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TotalUserBalanceDto } from './dto/totalUserBalance.dto';
import { AllUserTransactionsDto } from './dto/allUserTransactions.dto';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => TotalUserBalanceDto, { name: 'getTotalUserBalance' })
    async getTotalUserBalance(@Args('id', { type: () => Int }) id: number) {
        return this.usersService.getTotalBalanceById(id);
    }

    @Query(() => [User], { name: 'getUsers', nullable: 'items' })
    async getUsers() {
        return this.usersService.getAll();
    }

    @Query(() => AllUserTransactionsDto, { name: 'getUserTransactions', nullable: false })
    async getUserTransactions(@Args('id', { type: () => Int }) id: number) {
        return this.usersService.getUserTransactions(id);
    }
}
