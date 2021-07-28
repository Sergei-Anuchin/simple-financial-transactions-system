import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class CreateTransactionDto {
    @Field()
    @IsNotEmpty()
    sourceAccountId: number;

    @Field()
    @IsNotEmpty()
    targetAccountId: number;

    @Field()
    @IsNotEmpty()
    sum: number;
}
