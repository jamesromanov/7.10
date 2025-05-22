import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field(() => String, { description: 'Title of the book!' })
  title: string;

  @Field(() => String, { description: 'Author of the book' })
  author: string;

  @Field(() => String, { description: 'Description of the book' })
  description: string;

  @Field(() => Float, { description: 'Price of the book' })
  price: number;

  @Field(() => Boolean, {
    description: 'Status of the book',
    defaultValue: false,
    nullable: true,
  })
  isDeleted?: boolean;
}
