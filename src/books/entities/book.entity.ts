import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import { ManyToMany } from 'typeorm';

@ObjectType()
export class Book {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, { description: 'Title of the book!' })
  title: string;

  @Field(() => String, { description: 'Author of the book' })
  author: string;

  @Field(() => String, { description: 'Description of the book' })
  description: string;

  @Field(() => Number, { description: 'Price of the book!' })
  price: number;

  @Field(() => Date, { defaultValue: new Date() })
  created_at: Date;

  @Field(() => Boolean, {
    description: 'Status of the book',
    defaultValue: false,
  })
  isActive: boolean = false;

  @ManyToMany(() => Order)
  orders: Order[];
}
