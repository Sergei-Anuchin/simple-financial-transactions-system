import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TotalUserBalanceDto {
    @Field(type => Int)
    readonly totalUserBalance: number;
}
