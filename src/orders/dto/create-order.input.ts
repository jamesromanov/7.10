import { InputType, Field, Float, ID, Int } from '@nestjs/graphql';
import { BookModel } from 'src/books/entities/book,model';

@InputType()
export class CreateOrderInput {
  @Field(() => [Int!]!, { description: 'Books of the order' })
  books: BookModel[];

  @Field(() => Float, { description: 'Total price of the order' })
  total_price: number;

  @Field(() => Boolean, {
    description: 'Status of the order',
    defaultValue: false,
    nullable: true,
  })
  isDeleted: boolean;
}
