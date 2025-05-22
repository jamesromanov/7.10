import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModel } from './entities/book,model';

@Module({
  imports: [TypeOrmModule.forFeature([BookModel])],
  providers: [BooksResolver, BooksService],
  exports: [BooksService],
})
export class BooksModule {}
