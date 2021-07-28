import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Account } from '../accounts/account.entity';

@ObjectType()
@Entity()
export class Transaction {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => Int)
    @Column()
    sourceAccountId: number;

    @Field(type => Int)
    @Column()
    targetAccountId: number;

    @Field()
    @Column()
    sum: number;

    @ManyToOne(
        () => Account,
        sourceAccount => sourceAccount.sourceTransactions,
        { onDelete: 'CASCADE' },
    )
    sourceAccount: Account;

    @ManyToOne(
        () => Account,
        targetAccount => targetAccount.targetTransactions,
        { onDelete: 'CASCADE' },
    )
    targetAccount: Account;
}
