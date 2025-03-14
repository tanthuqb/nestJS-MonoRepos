import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({
    isAbstract: true
})
export class AbstractModel {
    @Field(() => ID)
    id: number;
}