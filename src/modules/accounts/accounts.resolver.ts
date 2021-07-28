import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { Account } from './account.entity';

@Resolver(() => Account)
export class AccountsResolver {
    constructor(private readonly accountsService: AccountsService) {}

    @Query(() => [Account], { name: 'getUserAccounts', nullable: 'items' })
    async getUserAccounts(@Args('userId', { type: () => Int }) userId: number) {
        return this.accountsService.getUserAccounts(userId);
    }
}
