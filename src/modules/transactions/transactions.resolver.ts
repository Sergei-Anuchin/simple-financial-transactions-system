import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Resolver(() => Transaction)
export class TransactionsResolver {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Mutation(() => Transaction, { name: 'createTransaction' })
    async createTransaction(@Args('createTransactionData') createTransactionData: CreateTransactionDto) {
        return this.transactionsService.create(createTransactionData);
    }
}
