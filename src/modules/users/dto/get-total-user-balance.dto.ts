import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetTotalUserBalanceDto {
    @Field(type => Int)
    readonly totalUserBalance: number;
}
