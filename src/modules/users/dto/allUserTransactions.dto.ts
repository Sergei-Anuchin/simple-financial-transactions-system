import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Transaction } from '../../transactions/transaction.entity'

@ObjectType()
export class AllUserTransactionsDto {
    @Field(type => [Transaction])
    readonly sourceTransactions: Transaction[];

    @Field(type => [Transaction])
    readonly targetTransactions: Transaction[];
}
