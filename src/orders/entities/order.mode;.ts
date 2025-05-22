import { Field } from '@nestjs/graphql';
import { BookModel } from 'src/books/entities/book,model';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { UserModel } from 'src/users/entities/user.mode';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class OrderModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserModel, { nullable: false })
  @JoinColumn({ name: 'user' })
  user: UserModel;

  @ManyToMany(() => BookModel, (book) => book.id, {
    nullable: false,
    onDelete: 'NO ACTION',
  })
  @JoinTable({ joinColumn: { referencedColumnName: 'id' } })
  books: BookModel[];

  @Column()
  total_price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean = false;
}
