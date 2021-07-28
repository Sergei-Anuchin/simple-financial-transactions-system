import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Transaction } from '../transactions/transaction.entity';

@ObjectType()
@Entity()
export class Account {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => Int)
    @Column()
    userId: number;

    @Field()
    @Column()
    balance: number;

    @ManyToOne(
        () => User,
        user => user.accounts,
        { onDelete: 'CASCADE' },
    )
    user: User;

    @OneToMany(
        () => Transaction,
        sourceTransaction => sourceTransaction.sourceAccount,
    )
    sourceTransactions?: Transaction[];

    @OneToMany(
        () => Transaction,
        targetTransaction => targetTransaction.sourceAccount,
    )
    targetTransactions?: Transaction[];
}
