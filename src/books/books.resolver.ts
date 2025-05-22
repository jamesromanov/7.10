import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { UseGuards } from '@nestjs/common';
import { GqlQuard } from 'src/auth/authguards/auth.guard';
import { RolesGuard } from 'src/auth/authguards/role.guard';
import { Roles } from 'src/auth/roles';
import { UserRole } from 'src/users/user.role';

@UseGuards(GqlQuard, RolesGuard)
@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Roles(UserRole.USER)
  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.booksService.create(createBookInput);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.findOne(id);
  }
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Mutation(() => Book)
  updateBook(
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
    @Args('id') id: number,
  ) {
    return this.booksService.update(id, updateBookInput);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.remove(id);
  }
}
