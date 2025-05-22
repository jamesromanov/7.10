import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderedBulkOperation, Repository } from 'typeorm';
import { OrderModel } from './entities/order.mode;';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { BooksService } from 'src/books/books.service';
import { User } from 'src/users/entities/user.entity';
import { FlatESLint } from 'eslint/use-at-your-own-risk';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderModel) private orderRepo: Repository<OrderModel>,
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
    private bookService: BooksService,
  ) {}
  async create(createOrderInput: CreateOrderInput, req: Request) {
    const userId = req.user?.id;
    if (userId) {
      const user = await this.userService.findOne(userId);

      const books = await this.bookService.find(createOrderInput.books);
      if (books.length === 0) throw new NotFoundException('Books not found :(');
      createOrderInput.books = books;
      const order = this.orderRepo.create({
        user,
        ...createOrderInput,
      });
      return await this.orderRepo.save(order);
    }
  }

  async findAll(req: Request) {
    const userId = req.user?.id;
    if (userId) {
      const user = await this.userService.findOne(userId);
      if (!user) throw new BadRequestException('Pls login or register');
      return await this.orderRepo.find({
        where: { isDeleted: false, user },
        relations: ['user'],
      });
    }
  }

  async findOne(id: number, req: Request) {
    const userId = req.user?.id;
    if (userId) {
      const user = await this.userService.findOne(userId);
      if (!user) throw new UnauthorizedException('Pls login or register!');
      const order = await this.orderRepo.findOne({
        where: { id, isDeleted: false, user },
        relations: ['user'],
      });

      if (!order) throw new NotFoundException('No orders found');
      return order;
    }
  }

  async update(id: number, updateOrderInput: UpdateOrderInput, req: Request) {
    const userId = req.user?.id;
    if (userId) {
      const user = await this.userService.findOne(userId);
      if (!user) throw new UnauthorizedException('Pls login or register!');
      const order = await this.orderRepo.findOne({
        where: { id, isDeleted: false, user },
        relations: ['user'],
      });
      if (!order) throw new NotFoundException('No orders found');
      Object.assign(order, updateOrderInput);
      return await this.orderRepo.save(order);
    }
  }

  async remove(id: number, req: Request) {
    const userId = req.user?.id;
    if (userId) {
      const user = await this.userService.findOne(userId);
      if (!user) throw new UnauthorizedException('Pls login or register!');
      const order = await this.orderRepo.findOne({
        where: { id, isDeleted: false, user },
      });
      if (!order) throw new NotFoundException('No orders found');
      order.isDeleted = true;
      await this.orderRepo.save(order);
      return order;
    }
  }
}
