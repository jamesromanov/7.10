import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { UseGuards } from '@nestjs/common';
import { GqlQuard } from 'src/auth/authguards/auth.guard';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/authguards/role.guard';
import { UserRole } from 'src/users/user.role';
import { Roles } from 'src/auth/roles';

@UseGuards(GqlQuard, RolesGuard)
@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(UserRole.USER, UserRole.ADMIN)
  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @Context() { req }: { req: Request },
  ) {
    return this.ordersService.create(createOrderInput, req);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => [Order], { name: 'orders' })
  findAll(@Context() { req }: { req: Request }) {
    return this.ordersService.findAll(req);
  }

  @Roles(UserRole.USER, UserRole.ADMIN)
  @Query(() => Order, { name: 'order' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Context() { req }: { req: Request },
  ) {
    return this.ordersService.findOne(id, req);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Mutation(() => Order)
  updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
    @Args('id') id: number,
    @Context() { req }: { req: Request },
  ) {
    return this.ordersService.update(id, updateOrderInput, req);
  }

  @Roles(UserRole.USER, UserRole.ADMIN)
  @Mutation(() => Order)
  removeOrder(
    @Args('id', { type: () => Int }) id: number,
    @Context() { req }: { req: Request },
  ) {
    return this.ordersService.remove(id, req);
  }
}
