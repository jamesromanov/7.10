import { ObjectType, Field, Int, ID, Float, InputType } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Order {
  @Field(() => ID, { description: 'Id of the order' })
  id: number;

  @Field(() => User, { description: 'User of the order' })
  user: User;

  @Field(() => [Book], { description: 'Book of the order' })
  books: Book[];

  @Field(() => Float, { description: 'Total price of the order' })
  total_price: number;

  @Field(() => Date, { description: 'Time of the order' })
  created_at: Date;

  @Field(() => Boolean, {
    description: 'Status of the order',
    defaultValue: false,
  })
  isDeleted: boolean = false;
}
