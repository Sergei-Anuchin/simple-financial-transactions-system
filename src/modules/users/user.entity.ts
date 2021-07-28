import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Account } from '../accounts/account.entity';

@ObjectType()
@Entity()
export class User {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @OneToMany(
        () => Account,
        account => account.user,
    )
    accounts?: Account[];
}
