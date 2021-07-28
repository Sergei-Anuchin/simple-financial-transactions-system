import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';

@Resolver(() => Transaction)
export class TransactionsResolver {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Mutation(() => Transaction, { name: 'createTransaction' })
    async createTransaction(@Args('createTransactionData') createTransactionData: CreateTransactionDto) {
        return this.transactionsService.create(createTransactionData);
    }
}
