import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModel } from './entities/order.mode;';
import { UsersModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';
import { BooksService } from 'src/books/books.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderModel]),
    forwardRef(() => UsersModule),
    BooksModule,
  ],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
